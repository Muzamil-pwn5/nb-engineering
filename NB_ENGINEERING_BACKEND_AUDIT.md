# NB Engineering Site / Backend Audit

**Review date:** 2026-10-12  
**Repository:** `Muzamil-pwn5/nb-engineering`  
**Scope:** public site, frontend-to-API wiring, deployed API probes, backend startup/configuration, CI checks, and available tests.

## Executive summary

The backend is **not completely down**. The deployed Railway API is responding, catalog endpoints work, and CORS preflight succeeds for both configured site origins. However, the production setup has several concrete issues that can explain user-facing errors:

1. **`www.nbengineerings.com` has the wrong TLS certificate** (`*.github.io`), so visitors using `www` can get a browser certificate error before the site or API is reached.
2. **The backend health endpoint is `/health`, not `/api/v1/health`**, while the API routes are under `/api/v1`. A monitor or platform health check pointed at `/api/v1/health` will report a false 404.
3. **Inquiry submission intentionally returns HTTP 503 when SMTP is not configured or Gmail delivery fails.** The code saves the inquiry first, then raises 503 if notification delivery fails. This is likely the direct cause of “backend errors” on the contact form if the Railway SMTP variables are missing/invalid.
4. **Backend deployment is not represented in the repository.** The GitHub Actions workflow only deploys the frontend to GitHub Pages. There is no Railway/Docker/Procfile deployment definition, so backend commits will only reach production if a separate out-of-band Railway connection is configured correctly.
5. **The checked-in test suite cannot start without environment variables**, and the frontend lint check currently fails on `process` being undefined in `vite.config.js`.

## Reproduced evidence

### Public site and domains

- `https://nbengineerings.com/` → **HTTP 200**, served by GitHub Pages.
- `https://www.nbengineerings.com/` → certificate mismatch: the certificate is for `*.github.io`, not `www.nbengineerings.com`.
- DNS for `www` points at GitHub Pages infrastructure, but the certificate/custom-domain configuration is incomplete or stale.

### Deployed API

- `https://api.nbengineerings.com/` → **HTTP 200**:
  ```json
  {"message":"NB Engineering & Services API","status":"running"}
  ```
- `https://api.nbengineerings.com/health` → **HTTP 200** after warm-up; repeated checks returned 2–3 second responses.
- `https://api.nbengineerings.com/api/v1/health` → **HTTP 404**:
  ```json
  {"detail":"Not Found"}
  ```
- `https://api.nbengineerings.com/api/v1/brands` → **HTTP 200**.
- `https://api.nbengineerings.com/api/v1/services` → **HTTP 200**.
- CORS `OPTIONS /api/v1/inquiries` → **HTTP 200** for both:
  - `https://nbengineerings.com`
  - `https://www.nbengineerings.com`

The initial `/health` probe timed out once, but five immediate repeat probes succeeded. This looks like Railway cold-start/warm-up latency, not a persistent outage.

### Repository checks

- Latest frontend deployment workflow runs are green.
- Python syntax compilation passes.
- Backend tests fail during collection because required settings are not supplied locally:
  - `DATABASE_URL`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `JWT_SECRET`
- Frontend lint fails in `frontend/vite.config.js` because `process` is not declared in the ESLint environment (four `no-undef` errors).
- Frontend build was not reached because the chained command stopped at lint.

## Root-cause details

### 1. `www` domain certificate/configuration is broken — P0/P1

`frontend/public/CNAME` declares the apex domain, while the monitoring workflow checks only `nbengineerings.com`. The `www` host is still resolving to GitHub Pages but does not have a valid certificate for the requested hostname.

**Impact:** users opening `https://www.nbengineerings.com` may see a hard browser security warning. This can be perceived as the site/backend being broken even though the apex site and API are healthy.

**Fix:** choose one canonical host and enforce it:

- Preferred: redirect `www.nbengineerings.com` to `https://nbengineerings.com`, and configure the redirect/custom-domain certificate in the DNS/hosting provider; or
- Fully configure `www.nbengineerings.com` as an additional GitHub Pages custom domain and ensure its certificate is issued before publishing it anywhere.

Do not advertise both hosts until the certificate is valid.

### 2. Health-check path mismatch — P1

`backend/app/main.py` defines:

```python
@app.get("/health")
```

All business routers are mounted under `/api/v1`, so `/api/v1/health` does not exist. Any check using the API prefix for health will fail even when the service is healthy.

**Fix:** either document/use `/health` consistently, or add a second compatibility route at `/api/v1/health`. The cleaner option is to keep `/health` as the platform health endpoint and update monitors/deployment settings to use it.

### 3. Inquiry form can return 503 after saving — P1

`backend/app/api/routes/inquiries.py` calls `send_inquiry_notification()` after `create_public_inquiry()`. The email service raises `InquiryNotificationError` when any SMTP setting is missing or Gmail rejects the connection/login, and the route converts that into HTTP 503.

This means the customer sees an error even though the inquiry has already been stored. Retrying can create duplicate inquiries.

**Fix:** make email notification asynchronous/best-effort and return the saved inquiry with a delivery status, or introduce a durable notification/outbox table and retry worker. At minimum:

- Verify Railway has all SMTP variables configured.
- Log a stable notification ID and delivery failure reason.
- Return a non-error response when the database save succeeds, while clearly flagging that email delivery is pending.
- Add idempotency protection to prevent duplicate submissions on retry.

### 4. Backend release path is opaque — P1

`.github/workflows/deploy-frontend.yml` builds and deploys only `frontend/` to GitHub Pages. There is no backend deployment workflow or checked-in Railway configuration. The API is evidently deployed separately on Railway.

**Impact:** code in `backend/` can be merged and appear “deployed” while production still runs an older image/service revision. This makes backend debugging difficult and can leave migrations/configuration out of sync.

**Fix:** establish one explicit release path, preferably:

- Railway connected to the repository with root directory `backend` and a pinned start command; or
- a checked-in Dockerfile/Procfile plus a GitHub Actions deployment workflow.

Add a deploy verification step that checks `/health`, `/openapi.json`, and a read-only catalog endpoint after deployment.

### 5. Test and lint gates are incomplete — P2

The tests import settings at module import time, so they cannot even collect without production-like environment variables. The frontend lint gate fails on a configuration-file global.

**Fix:**

- Add a test settings fixture or a test `.env` using SQLite and safe dummy auth secrets.
- Make tests independent of production data counts such as `assert len(records) == 9`.
- Add `pytest` and a backend test command to CI.
- Fix ESLint globals for `vite.config.js` or rewrite the config to use `import.meta.env`/Vite-supported configuration variables.
- Run `npm run lint && npm run build` in CI and keep both green.

## Recommended order of operations

1. Fix/canonicalize the `www` DNS and certificate configuration.
2. Verify Railway environment variables, especially `DATABASE_URL`, SMTP values, and secrets; inspect Railway logs for inquiry requests and migration startup.
3. Standardize health checks on `GET /health` and add a regression probe to deployment verification.
4. Change inquiry notification handling so a saved inquiry is not reported as a failed submission and retries cannot duplicate it.
5. Make backend deployment reproducible and visible from the repository.
6. Repair the local test/lint gates and add API smoke tests.

## Changes implemented after the audit

- Added `/api/v1/health` as a compatibility alias while retaining `/health` for platform probes.
- Made inquiry email notification delivery a background best-effort task so a saved inquiry returns success even when SMTP is unavailable.
- Added exception logging around background notification delivery.
- Fixed the Vite lint failure by using Vite's `loadEnv` API.
- Replaced production-data-dependent service-history tests with isolated SQLite tests and safe test settings.
- Added a checked-in `backend/Procfile` with a reproducible Uvicorn start command.
- Extended monitoring to probe the API health and read-only catalog endpoints.

The `www` certificate/DNS issue remains an account/DNS-provider configuration item: GitHub Pages is currently configured for the apex custom domain `nbengineerings.com`, while `www.nbengineerings.com` is resolving to GitHub Pages without a matching certificate. The apex domain and API deployment were not replaced because they are currently serving successfully.
