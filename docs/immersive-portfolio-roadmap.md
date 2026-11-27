# Learning by Building — portfolio redesign

## Purpose
Make the visitor discover technical growth through real projects, without obstructing recruiter access to the existing portfolio, CV or contact information.

## Narrative (thematic, not strictly chronological)
| Chapter | Existing evidence (profile.projects key) | Proposed interaction |
|---|---|---|
| Thinking in Logic | penguin | Small state and input-validation demonstration |
| Building for Users | portfolio | Responsive and accessible interface walkthrough |
| Making Applications Interactive | tasks, todo | Compare local browser persistence with authenticated synchronisation |
| Behind the Interface | devflow | Explore API, persistence and authorisation diagrams |
| Connecting Everything | opus | Catalogue and full-stack architecture case study |
| The Next Chapter | future work | Clearly labelled planned learning |

Use verified contributions and current project status from resume/data/base.mjs. Additional repositories may be included only after inspecting their evidence. Do not represent a simulated login as real authentication or a local-only application as a public demo. OPUS import implementation verified in routes/web.php and app/Http/Controllers/OpenOpusController.php: admin-only selective imports, HTTPS requests, validation, transactions, duplicate checks and preservation of local fields. Runtime deployment remains unverified.

## Implementation
1. Build a bilingual, accessible journey view using the existing HTML/CSS/JS stack and shared profile data.
2. Integrate navigation via scripts/build-profile.mjs, then regenerate with npm run build:profile. Preserve home route synchronization and CV consistency.
3. Add optional lightweight interactive exhibits. Prefer original project demos or explicitly labelled simplified examples.
4. Prototype a separate, opt-in 3D gallery only after the core journey works. Load the renderer on request; retain equivalent HTML navigation and reduced-motion support.
5. Run npm test, npm run validate:links, npm run test:a11y, npm run test:e2e and npm run test:visual. Review visual baseline changes before merging.

## Acceptance criteria
- No changes to main or production until review.
- CV, projects and contact remain directly accessible.
- Both English and European Portuguese, light/dark themes, keyboard and mobile navigation work.
- No duplicate factual source for CV/project claims.
- No required 3D, autoplay sound, or motion.
- Clear distinctions between deployed demos, source, pending PRs and future work.
- Verify performance and accessibility before publishing.

## Custom-domain readiness
Follow docs/zero-cost-hosting-roadmap.md. Keep all internal navigation and asset links relative to the page location, compatible with both the GitHub Pages repository prefix and the future domain root. Centralise external deployment URLs and canonical metadata in a build-time configuration; retain existing live URLs until replacements pass HTTPS and smoke checks. Do not link inactive subdomains as demos.

Proposed destinations: www.torresalmeida.com (portfolio, journey, gallery, CV and case studies); tasks and todo subdomains for static applications; opus, devflow and windops subdomains for dynamic services, subject to capacity and individual validation. Domain names are proposals, not active endpoints. GitHub Pages remains suitable for static pages and browser-rendered 3D; Oracle resources are reserved for dynamic services unless a measured benefit supports consolidation.

Oracle provisioning is pending. Verify current Always Free eligibility, ARM64 images, resources and costs before provisioning; no paid resources, DNS edits or mail record changes without approval. OPUS public deployment must initially be read-only or use isolated disposable demo data: the current authenticated-user edit permission is unsuitable for a shared public catalogue. Verify TLS, backups, database isolation, rate limits, file rights and recovery before opening services. Preserve MX, SPF, DKIM and DMARC. Update SEO, CV and external links only after the new destinations are validated.
