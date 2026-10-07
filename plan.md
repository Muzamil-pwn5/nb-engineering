# NB Engineering accessibility and compliance update

## Scope

Preserve the existing chill-white and red visual system while addressing the requested UI and compliance items only:

- Replace legacy green loader and scroll-progress colors with the current red accent.
- Restyle the two direct-contact CTAs on `/contact` using the current red/white/black theme.
- Add route-level Privacy Policy and Terms & Conditions pages and footer links.
- Add a small, accessible cookie-consent notice that truthfully states the site currently uses essential local storage only and does not enable analytics or advertising cookies.
- Improve accessibility through skip navigation, semantic labels, named controls, visible focus states, reduced-motion handling, descriptive image alternatives, and clearer CTA labels.
- Audit the current palette for WCAG contrast risks and override the known low-contrast legacy tokens without redesigning other pages.
- Keep `frontend/public/manus-routes.json` synchronized with the new legal routes.
- Publish source changes to GitHub and verify the existing hosting/domain state; do not claim the requested `www.nbengineerings.com` deployment unless its DNS/hosting path is actually available.

## Implementation approach

The React app remains the existing Vite single-page application. `App.jsx` will own the legal routes, route metadata, skip link, site motion/progress behavior, and consent notice. New legal pages will use the existing `Navbar`, `Footer`, `SEO`, and typography primitives. Global CSS overrides will use the existing `--nb-pink`, `--nb-white`, `--nb-ink`, and `--nb-muted` variables so the changes remain aligned with the accepted visual theme. Contact-specific legacy selectors will be overridden narrowly in `index.css`.

Accessibility changes will be conservative: preserve existing content and routes, add explicit names to controls, ensure all rendered images have useful `alt` text, add `aria-live` for form status and consent feedback, and make motion respect `prefers-reduced-motion`. The cookie notice will not introduce analytics, advertising, or third-party tracking.

## Project structure

- `frontend/src/App.jsx`: router, SEO map, scroll progress, skip link, consent notice.
- `frontend/src/pages/PrivacyPolicy.jsx`: privacy disclosure and contact-data practices.
- `frontend/src/pages/Terms.jsx`: website-use terms and limitations.
- `frontend/src/components/Footer.jsx`: legal navigation links.
- `frontend/src/pages/Contact.jsx` and `frontend/src/index.css`: current-theme contact CTAs and accessible labels.
- `frontend/src/index.css` and `frontend/src/ui/site.css`: palette, focus, progress, loader, and contrast corrections.
- `frontend/public/manus-routes.json`: complete static route declarations.
- `.github/workflows/deploy-frontend.yml` and `frontend/public/CNAME`: existing publication path, to be verified rather than assumed.
