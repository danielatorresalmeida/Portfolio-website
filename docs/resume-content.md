# Maintaining one professional profile

## Sources of truth

- `resume/data/base.mjs`: common bilingual facts. Dates confirmed by the candidate: FloLabs August 2025–September 2026; LLM Trainer August 2024–September 2026.
- `resume/variants/config.mjs`: company emphasis and ordering only. These are reusable starting points based on the candidate's requested positioning, not researched claims about current vacancies.
- `resume/render.mjs`: shared semantic CV template.
- `resume/shared/cv.css`: shared responsive and A4 print styles.
- `resume-site-only/script.js`: shared language, theme and print behaviour.

The public CV stays at `/resume-site-only/`; six noindex company CVs live at `/resume/variants/<company>/`. They are not six portfolios. The existing `/home/` compatibility route is generated from the single root portfolio. HTML copies are generated outputs, not independent factual documents.

## Editing and validation

```powershell
npm ci
npm run build:resumes
npm run build:profile
npm test
npm run validate:links
$env:RUN_BROWSER_TESTS="true"
npm run test:a11y
npm run test:e2e
npm run test:visual
node scripts/check-profile-browser.mjs
node scripts/export-cv.mjs
```

`export-cv.mjs` exports Master EN/PT plus six English company PDFs. Set `CV_OUTPUT_DIR` to choose the output directory. Exported documents include the existing contact details after the same reveal controls used by the website. CV print layout is two A4 pages at 10.5pt body text; pages remain readable without compressing the full career and four projects into one page.

Inspect PDFs and actual browser snapshots before accepting reference changes. Windows and Linux references remain separate because system fonts differ. Do not loosen thresholds or suppress failed checks.

For a vacancy-specific adjustment, select the nearest company configuration and change summary emphasis/order only. Verify the live vacancy separately. Do not add a technology, qualification, metric, date or achievement in a variant: confirm it and amend the shared factual source first.

## Evidence and limits

- DevFlow Phase 2 is validated at PR #53 head `0149c8d`, but remained OPEN when checked on 2026-09-21. Its system roles/document authorization/demo are explicitly labelled as validated in the pending PR, not merged into main. Recheck status before changing that label.
- Core skills follow demonstrated GitHub work; Python/FastAPI exposure, Firebase, Selenium, automation and UI/UX are additional experience, without arbitrary proficiency scores.
- The candidate confirms 650 technical training hours in progress followed by a 400-hour curricular internship expected February/March 2027. Provider, official title, syllabus and module progression have not yet been supplied; none is invented.
- The existing scanned IEFP certificate confirms only “Conceção de Web sites”, UFCD 7903, 25 hours, completed March 2026. Its personal identifiers are not copied into public profile data. It does not establish the current 650-hour syllabus.
- Education and self-assessed languages retain the existing CV's qualifications without academic equivalence or invented CEFR levels. Prior course lists without supporting documents are not promoted to certified achievements.
- Public To-Do landing page was checked; using tasks requires sign-in. No authenticated Calendar/Firebase integration test was performed in this presentation phase.
- LinkedIn returned HTTP 999 to automated checks. This is not proof of a broken profile; manual verification is still needed.

## Legacy versions

See `phase3-audit.md` for KEEP / SUPERSEDED / SAFE TO ARCHIVE / NEEDS HUMAN CONFIRMATION. No historical PDF, DOCX, targeted-page directory, ZIP or temporary file was deleted or archived. Existing historical URLs remain available but are not promoted on the main portfolio. Legacy `resume-site-only/styles.css` and `supplemental-info.js` are no longer used by the generated Master and are retained pending archival approval.

## Publication

The deployment workflow publishes successful main builds. Feature-branch preparation and a pull request do not update the live site. Review the final profile and remaining factual gaps before integrating the presentation changes. Do not send applications or outreach automatically.
