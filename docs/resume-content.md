# Maintaining one professional profile

## Sources of truth

- `resume/data/base.mjs`: common bilingual facts. Dates confirmed by the candidate: FloLabs August 2025–September 2026; LLM Trainer August 2024–September 2026.
- `resume/variants/config.mjs`: company emphasis and ordering only. These are reusable starting points based on the candidate's requested positioning, not researched claims about current vacancies.
- `resume/render.mjs`: shared semantic CV template.
- `resume/shared/cv.css`: shared responsive and A4 print styles.
- `resume-site-only/script.js`: shared language, theme and print behaviour.

The public CV stays at `/resume-site-only/`; eight noindex company CVs live at `/resume/variants/<company>/`. They are not separate portfolios. The existing `/home/` compatibility route is generated from the single root portfolio. HTML copies are generated outputs, not independent factual documents.

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

`export-cv.mjs` exports Master EN/PT plus eight English company PDFs. Set `CV_OUTPUT_DIR` to choose the output directory. Exported documents include the existing contact details after the same reveal controls used by the website. CV print layout is two A4 pages at 10.5pt body text; pages remain readable without compressing the full career and four projects into one page.

Inspect PDFs and actual browser snapshots before accepting reference changes. Windows and Linux references remain separate because system fonts differ. Do not loosen thresholds or suppress failed checks.

For a vacancy-specific adjustment, select the nearest company configuration and change summary emphasis/order only. Verify the live vacancy separately. Do not add a technology, qualification, metric, date or achievement in a variant: confirm it and amend the shared factual source first.

## Evidence and limits

- DevFlow Phase 2 is validated at PR #53 head `0149c8d`, but remained OPEN when checked on 2026-09-23. Its system roles/document authorization/demo are explicitly labelled as validated in the pending PR, not merged into main. Recheck status before changing that label.
- Core skills follow demonstrated GitHub work; Python/FastAPI exposure, Firebase, Selenium, automation and UI/UX are additional experience, without arbitrary proficiency scores.
- Candidate-confirmed CESAE Digital / PRO_MOV Software Developer programme: 22 September 2026 - 20 May 2027, 1050h total (50h transversal, 600h technical, 400h FPCT). FPCT: 1 March - 20 May 2027. The candidate confirmed on 23 September 2026 that the course has started; its status is in progress. Future modules are not completed skills.
- Candidate-confirmed completed pathway: Linguagens de Programação - Programação em JAVA, IEFP / Centro de Emprego e Formação Profissional de Faro, 350h, completed 30 July 2026. The candidate reported verifying the original certificate; it was not independently accessed in this revision. Consolidate the ten UFCD under this official title, without claiming advanced proficiency.
- The previously inspected IEFP certificate for Conceção de Web sites (UFCD 7903, 25h, March 2026) remains separate. Certificate identifiers are not published.
- Education and self-assessed languages retain the existing CV's qualifications without academic equivalence or invented CEFR levels. Prior course lists without supporting documents are not promoted to certified achievements.
- Public To-Do landing page was checked; using tasks requires sign-in. No authenticated Calendar/Firebase integration test was performed in this presentation phase.
- LinkedIn returned HTTP 999 to automated checks. This is not proof of a broken profile; manual verification is still needed.

## Legacy versions

See `phase3-audit.md` for KEEP / SUPERSEDED / SAFE TO ARCHIVE / NEEDS HUMAN CONFIRMATION. No historical PDF, DOCX, targeted-page directory, ZIP or temporary file was deleted or archived. Existing historical URLs remain available but are not promoted on the main portfolio. Legacy `resume-site-only/styles.css` and `supplemental-info.js` are no longer used by the generated Master and are retained pending archival approval.

## Publication

The deployment workflow publishes successful main builds. Feature-branch preparation and a pull request do not update the live site. Review the final profile and remaining factual gaps before integrating the presentation changes. Do not send applications or outreach automatically.

## GMV internship variant

`resume/variants/gmv/` is the GMV Software Engineer internship CV (EN, with PT-PT translation). It preserves the Master title, experience, training and project order; emphasizes Java/Spring Boot, web development, automated testing and CI. Angular and C++ are not added as skills. DevFlow PR #53 was confirmed OPEN and not merged on 2026-09-23.

Export only this variant with `CV_VARIANT=gmv` and `CV_OUTPUT_DIR` set, then run `node scripts/export-cv.mjs`. The filename is `Daniela_Torres_Almeida_CV_GMV_Software_Engineer_Intern.pdf`.

## Celfocus Application Security internship variant

`resume/variants/celfocus-application-security/` is separate from the Master and the generic Celfocus version. It keeps the Software Developer / Front-End Developer in training title and all four projects, emphasizing existing DevFlow authentication, role/resource authorization, negative access-control tests and CI. FloLabs bullets are reordered without new claims. Security skill labels reflect DevFlow PR #53, verified OPEN and not merged at head `0149c8d` on 2026-09-23; they do not imply production security or penetration-testing experience.

Export using `CV_VARIANT=celfocus-application-security` and `CV_OUTPUT_DIR` with `node scripts/export-cv.mjs`. Output: `Daniela_Torres_Almeida_CV_Celfocus_Application_Security_Intern.pdf`.
