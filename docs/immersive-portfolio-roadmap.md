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

Use verified contributions and current project status from resume/data/base.mjs. Additional repositories may be included only after inspecting their evidence. Do not represent a simulated login as real authentication or a local-only application as a public demo. Confirm OPUS import behaviour against the final source before changing its description.

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
