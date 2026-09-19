# Visual reference images

The root PNGs are Windows references. `linux/` contains reviewed Linux CI references because the site's system font stack renders differently across operating systems.

Linux references were reviewed from GitHub Actions run `35435243948` (Chrome 153, Ubuntu runner). They show the delivered DevFlow status and existing page layout. Windows project-grid reference was reviewed after the same content changes.

Tests use dark mode, wait for images and fonts, and keep the original pixel-difference threshold. A missing reference fails the run; it is never silently generated as an approved result. For intentional visual changes, inspect the uploaded actual/diff images before replacing a reference.
