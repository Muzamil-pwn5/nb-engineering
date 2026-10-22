# NB Engineering & Services — Full UI Audit

**Audit date:** 22 October 2026  
**Public site:** [nbengineerings.com](https://nbengineerings.com/)  
**Scope:** Published route health, shared visual system, typography, spacing, imagery, responsive behavior, navigation states, local-business proof, and loading animation behavior.

## Overall verdict

NB Engineering has a strong and recognizable editorial-industrial direction. The oversized display typography, white/red palette, dark technical sections, generator imagery, and direct-contact journey are more distinctive than a typical generator supplier site.

The site’s main risk is not weak design. It is accumulated styling complexity. Several generations of global CSS and token overrides coexist, which makes the final appearance dependent on cascade order. The other major issue was inconsistent loading behavior: the premium loader appeared on initial mount, while lazy internal route navigation fell back to an unstyled `Loading page…` state.

This audit pass fixed the two highest-confidence visible inconsistencies:

- Services and ATS / AMF could both appear active in the navbar. The active-state logic is now route-aware.
- Initial load and internal navigation now use the same branded loader language. Initial entry lasts 1.5 seconds; internal route transitions use a shorter 700-millisecond version; the lazy-route fallback is also branded.

## Coverage and route health

The production build generates **45 canonical URLs**. The audit checked the main public families: Home, Services, service details, Generators, generator details, Guides, guide articles, Brands, Tarnol, Spare Parts, Contact, Privacy Policy, and Terms.

The information architecture is coherent:

- Services explains the offer breadth.
- Generators presents the catalogue and individual equipment pages.
- ATS / AMF has a dedicated technical route.
- Guides support planning, maintenance, repair, and buying decisions.
- Contact supports phone, email, Google Business profile, and directions.

No new top-level navigation item is needed right now.

## Findings

### 1. The CSS system has too many layers — high priority

`index.css` and `ui/site.css` contain repeated token declarations and later global overrides. Colors such as `--nb-pink`, `--acid`, `--coral`, `--ink`, and `--paper` are used together, and some legacy compatibility rules still rely on `!important`.

This creates three practical problems:

- A correct component rule can be overridden by a later global rule.
- Page-specific fixes require unusually strong selectors.
- A future brand-color change will require checking several independent blocks.

**Recommendation:** consolidate the design tokens into one authoritative section, then separate global primitives from page-specific styles. Keep one temporary compatibility layer while removing old overrides.

### 2. Loading behavior was inconsistent — fixed in this audit

Previously, `SiteMotion` ran once when the application mounted. A hard refresh could show the branded loader, but internal navigation between lazy-loaded routes used a plain `Loading page…` message.

The loader now has a consistent system:

- **Initial entry:** 1.5-second NB Engineering loader with grid, orbiting logo, technical corner labels, progress bar, and editorial copy.
- **Internal route changes:** a shorter 700-millisecond branded transition keyed to the active pathname.
- **Slow lazy routes:** branded `NB / LOADING — Preparing the next move.` fallback.
- **Reduced motion:** the full-screen loader is disabled for users who request reduced motion.

The timing is appropriate for the current site. The transition should not be extended; it should communicate continuity rather than become a forced delay.

### 3. Navigation active state overlapped — fixed in this audit

The previous `startsWith()` logic marked both **Services** and **ATS / AMF** active on `/services/ats-panels`. The navbar now treats ATS / AMF as an exact route and excludes it from the broader Services active state.

This is a small change with a large clarity benefit: the header now communicates one location at a time.

### 4. Hero treatment is recognizable but not fully normalized — medium priority

Home, Services, Brands, service detail, and generator detail heroes share the same editorial DNA, but the image-to-text balance changes from route to route. Some pages are image-led; others are more like type-led editorial compositions.

Keep the variation, but standardize:

- Eyebrow position and spacing.
- Maximum heading width.
- CTA visibility within the first viewport.
- Overlay strength levels.
- Mobile focal-point positioning.
- White/light-red heading treatment on dark imagery.

### 5. Owned photography is a strong differentiator

The original NB equipment photos add credibility and should remain concentrated in hero, product, and proof contexts. Avoid another generic image gallery. The best rhythm is one strong hero image, one supporting proof/product image, and one direct conversion action.

Repeating the same photograph across unrelated service cards will reduce the impression of a real project history.

### 6. Local-business proof is directionally correct

The Contact page now has the right trust ingredients: business name, category, 5.0 rating, 19 reviews, full landmark address, hours, Google profile action, call action, directions action, and a static map that does not depend on a failing iframe.

The remaining opportunity is verification quality. When the exact Google Place ID is available, use it consistently in the profile link, structured data, and any approved dynamic review integration. Do not present a manually maintained rating summary as a live review feed.

### 7. Typography is distinctive, but copy density varies

Bricolage Grotesque and DM Sans create a strong hierarchy. Large display type is one of the site’s best assets. The main risk is overly dense supporting copy beside very large headlines, especially on mobile.

Keep one main idea per section, two or three lines of supporting copy where possible, and one primary action with one secondary action.

### 8. The footer is useful but dense on mobile

The footer has strong contrast and includes phone, email, Tarnol, hours, social links, and service groups. Keep the coverage, but reduce visual density below 580px through more generous vertical spacing and tighter grouping.

## Page-level review

### Homepage

The homepage has the strongest editorial narrative. Keep the current opening and make the first viewport commercially useful with a compact trust row containing the Google rating, Tarnol location, service range, and one direct action.

The field-photo section is valuable. Add small factual labels only where the capacity, application, or location is documented. Avoid invented specifications.

### Services index

The service grid is clear but taxonomy-heavy. Add a compact “Choose by situation” strip:

- I need a new generator.
- I need temporary power.
- My generator needs repair.
- I need ATS / AMF automation.
- I need maintenance or parts.
- I am not sure what I need.

This helps users choose by problem instead of learning the service structure first.

### Service detail pages

The shared template is clean and reusable. To stop the pages feeling interchangeable, add three service-specific facts below the intro: **Best for**, **Typical scope**, and **Next step**. Use the strongest relevant real photo for each page.

### Generator catalogue

The catalogue correctly behaves like an illustrative range rather than a guaranteed inventory. Make that explicit with a short label such as “Illustrative range — confirm availability.” Keep capacity as the first scanning priority, followed by brand and use case. Every product card should have a clear enquiry path.

### Contact

The Contact page now has the right local proof composition. The static map is more reliable than a remote iframe in this deployment environment. Keep the Google profile and directions actions prominent.

The next conversion improvement should be a lightweight requirement form beside the existing direct contact cards. Useful fields are location, requirement type, approximate capacity/load, and a short message. “Not sure” must be a valid capacity choice.

### Tarnol

Make this the local conversion hub. Put the full address, landmark, map, directions, hours, rating summary, and service-area statement near the top. It should feel like a real operating location rather than only an SEO landing page.

### Brands and Guides

These pages support credibility and search discovery. End every guide with a relevant commercial action such as **Talk through sizing**, **Request maintenance**, or **Ask about an option**. Link brand content to related generator products and support services.

## Responsive review priorities

The next visual regression pass should capture desktop and mobile versions of Home, Services, Generators, ATS / AMF, one service detail page, one generator detail page, Brands, Guides, Contact, and the legal pages.

Pay special attention to:

1. Mobile navigation opening and closing after a route change.
2. Hero image focal points at 375px and 768px.
3. Full-width phone/email actions on narrow Contact layouts.
4. Stacked local-business card and map layout.
5. Product card height consistency.
6. Footer wrapping for email, phone, address, and social actions.
7. Keyboard focus states and reduced-motion behavior.

## Prioritized recommendations

### P0 — Consolidate the design tokens

Create one source of truth for ink, paper, NB red, light red/coral, muted text, borders, hero overlays, focus states, spacing, and motion durations. Remove duplicate root blocks and reduce `!important` usage.

### P1 — Add visual regression snapshots

Use consistent desktop and mobile captures for the representative routes above. Compare navbar, eyebrow, H1, CTA, hero crop, cards, footer, focus state, and loading transition.

### P1 — Verify Google Business identity

Add the exact Place ID and official listing URL when available. Use them in LocalBusiness schema and any approved review integration. Keep the current static summary honest and clearly linked to the public profile.

### P2 — Normalize hero rules

Define heading width, CTA placement, crop position, overlay levels, and mobile behavior for each hero family.

### P2 — Reduce mobile footer density

Keep all useful links but group them more compactly below 580px.

## Final conclusion

NB Engineering does not need a full redesign. The current editorial-industrial direction is worth keeping. The next improvement phase should focus on system consolidation, proof, and conversion clarity.

The highest-impact loading issue has now been addressed: first entry and internal navigation share one premium motion language, while reduced-motion users are not forced through the animation. The remaining highest-impact UI work is consolidating the CSS cascade and running repeatable desktop/mobile visual regression checks.

## References

[1]: https://nbengineerings.com/ "NB Engineering & Services public website"
[2]: https://nbengineerings.com/services/ "NB Engineering services route"
[3]: https://nbengineerings.com/generators/ "NB Engineering generator catalogue"
[4]: https://nbengineerings.com/contact/ "NB Engineering contact route"
[5]: https://nbengineerings.com/tarnol/ "NB Engineering Tarnol route"
[6]: https://nbengineerings.com/guides/ "NB Engineering guides route"
