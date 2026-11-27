# Portfolio visitor experience — November 2026

## Visitor goal

A recruiter or fellow developer should understand the author's role, see concrete work, find the most relevant projects, inspect technical details and open the online CV or contact section without navigating a long list of links.

## Information hierarchy

1. Short introduction with three clear calls to action: projects, CV and contact.
2. Featured current work and selected project evidence ahead of detailed technology lists.
3. A direct Skills item in the fixed navigation; UI/UX stays available as a portfolio section.
4. Project filter choices: **All projects**, **Online demos**, **Code & case studies**. The categories are based on verified deployment status, not technology claims.
5. The four previous cards show objectives and stacks immediately, with optional technical details in native `<details>` elements.
6. The CV, language toggle, theme toggle and contact information remain directly available.

## Accessibility and progressive enhancement

- Filter buttons use `aria-pressed`, minimum 44px hit targets, a labelled group and a polite result count.
- Filtering changes only the visibility of the six existing project cards; source links and text remain available.
- With JavaScript disabled, the filter control stays hidden and **all projects remain visible**.
- Native `<details>/<summary>` work with keyboard and with JavaScript disabled.
- Project card links and existing clickable-card behavior remain unchanged.
- Mobile body text stays left aligned for easier scanning; other visual choices and the site theme remain intact.
- PT-PT/EN translations come from `scripts/build-profile.mjs` and the shared translation map, not manually edited generated copies.

## Tests

Run `npm run build:profile`, `npm test`, `npm run validate:links`, and browser accessibility/smoke/visual regression checks. Compare changed screenshots before updating their Linux baselines. Keep the old screenshots for unchanged page areas.

This UX revision doesn't introduce third-party trackers, cookies, services or new charges.
