# Phase 3 — initial presentation audit

Reviewed on 2026-09-21, before content changes. Portfolio baseline: `c9423b2fdbf4a8d61bddefc4fa2ed2bdacdfb438`.

## Delivery status

DevFlow_Hub PR #53 is OPEN, not merged. Its reviewed head is `0149c8dece62b7245ef59a320a5dc2cd1ca3cbb9`; main remains `9f3cdb1f27bcfd84851d918035adadf76bb2a0d2`. Phase 2 features may be described as validated in that PR, never as already merged. No DevFlow changes or merge form part of this phase.

## Findings

- Homepage title/hero describes a project library rather than a developer and the planned 2027 internship. UI/UX and QA are given equal prominence to development.
- Main CV summary places Angular, Python/FastAPI and Figma alongside stronger demonstrated React/TypeScript and Java/Spring work without distinguishing evidence.
- The supplementary CV explicitly seeks Junior Web Designer/UI/UX roles. This contradicts the new Software Development focus.
- Internship is labelled Aug 2025–Present, and LLM work Aug 2024–Present. End dates/current status need human confirmation before publication.
- Unverified impact figures include 10+, 20%, 30% and 50% across HTML and old documents. They must not propagate to the shared factual source.
- DevFlow is first in the portfolio grid but is described using older academic-delivery status. CV project order starts with TicTacToe. Selected projects should prioritise DevFlow, Portfolio, To-Do and Penguin.
- Technical skills, experience, training and projects are duplicated in static HTML and language dictionaries; tailored pages have additional full copies. The print exports include four- and nine-page CVs.
- Existing education records include prior IEFP module/certification claims, but no official syllabus establishing the current 650-hour programme was found in repository documents. Do not treat previous course lists as its syllabus.
- Training provider, official programme title, module progression and remaining expected modules need confirmation. The user has confirmed 650 technical hours in progress plus a 400-hour curricular internship expected February/March 2027.
- Contact controls already protect against unsolicited text scraping through explicit reveal actions; preserve these controls on public pages.
- Existing SEO describes a broad showcase. Canonical home route and theme/language/accessibility controls should remain coherent after content changes.
- Existing tests include obsolete content expectations requiring a 20% impact claim and six projects. Revise those assertions to enforce truthful content, not preserve unverified figures.

## Implementation approach

One shared factual dataset, small company configurations and a reusable static CV template; no framework migration. Keep the existing public CV route. Preserve one public portfolio and keep company CV variants out of search indexes. Share facts across EN/PT content, portfolio and all variants; vary only summaries, ordering and emphasis.

Company configurations follow the user's supplied emphasis, not assumptions about current vacancies. No application or outreach messages will be sent in this phase.

## Old versions — disposition before approval

No deletion or archival has been approved or performed. SUPERSEDED describes future presentation status, not permission to delete.

| Path/group | Recommendation | Reason |
|---|---|---|
| `index.html`, generated `home/index.html` | KEEP | One portfolio, canonical and compatibility routes |
| `resume-site-only/index.html` | KEEP | Existing public CV route; replace content through shared generation |
| `resume-site-only/assets/Daniela-Torres-Almeida-Resume.pdf` and `...-pt-PT.pdf` | SUPERSEDED | Old nine-page exports; retain files, stop recommending as current |
| Identical PDF copies under `general-it-software/resume/assets/`, `guestcentric-web-designer/resume/assets/`, `rumos-web-developer-lisboa/resume/assets/` | SAFE TO ARCHIVE, after approval | EN copies share one SHA-256, PT copies another; nine pages each |
| `assets/Daniela-Resume.pdf` | SUPERSEDED | Four-page older CV |
| `assets/Daniela-Resume_23_01_26.docx` | SUPERSEDED | Older editable source with unverified impact claims |
| `.tmp_docx_date/resume.zip` | SAFE TO ARCHIVE, after approval | Byte-identical to the DOCX above |
| `assets/~$niela-Resume_23_01_26.docx` | SAFE TO ARCHIVE, after approval | Word temporary lock file |
| `.tmp_*server*.log`, `.tmp_ps_server.log` | SAFE TO ARCHIVE, after approval | Local server output, not application content |
| `assets/Colorido automático2736.pdf` | KEEP as source; publication NEEDS HUMAN CONFIRMATION | Visually verified IEFP certificate: Conceção de Web sites, UFCD 7903, 25h, completed March 2026. Contains personal identifiers; do not reproduce those in CV data or add a public download CTA. Does not establish the current 650h syllabus. |
| `slb-ui-b1fae1/resume/daniela-torres-almeida-cv-web-ui.pdf` | SUPERSEDED | One-page previous Web/UI-targeted CV |
| `general-it-software/`, `guestcentric-web-designer/`, `rumos-web-developer-lisboa/`, `datadog-software-engineer/`, `resume-datadog/`, `programador-software-crm-salesforce/`, `laranjazen-589420303/`, `ytech-fullstack-java-react/`, `slb-ui-b1fae1/` | NEEDS HUMAN CONFIRMATION | Historical targeted pages, potentially shared externally; retain without new homepage links |
| `resume-site-only/reorganiza.html`, nested `resume-site-only/resume-site-only/index.html` | SAFE TO ARCHIVE, after approval | Legacy alternative CV routes; verify external use first |

## Publication dependencies

Resolve internship and LLM dates before changing the live main CV. Confirm training details or explicitly leave module-level claims out. Keep education and language claims conservative; do not infer academic equivalence, CEFR levels or certifications.

Candidate subsequently confirmed both experience end dates as September 2026, retaining August 2025/August 2024 starts respectively. These dates are now safe to use in the shared dataset. The current programme's official syllabus remains pending.
