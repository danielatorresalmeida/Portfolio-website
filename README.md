# Daniela Torres Almeida — Portfolio

Personal portfolio website showcasing my work as a **Software Developer / Front-End Developer**, including software projects, UI/UX work, professional experience and CV.

🌐 **Live portfolio:**  
[danielatorresalmeida.github.io/Portfolio-website](https://danielatorresalmeida.github.io/Portfolio-website/)

## 🎼 Latest completed project: OPUS (November 2026)

**[OPUS — Classical Music Library](https://github.com/danielatorresalmeida/opus-laravel)** is a completed Laravel/PHP/MySQL application developed during CESAE Digital. It includes a searchable composer-and-works catalogue, authentication, role-based permissions, favourites, image/PDF uploads, and selective Open Opus API import with duplicate checks and preservation of locally edited records.

A bilingual [OPUS project case study](https://danielatorresalmeida.github.io/Portfolio-website/projects/opus/) is also available on this portfolio. The GitHub repository contains the source code and installation instructions. **A public interactive deployment is not yet available**; the portfolio will link to one only after it has been set up and tested.

## 🧭 Free hosting and domain migration

The [zero-additional-cost hosting roadmap](docs/zero-cost-hosting-roadmap.md) explains the current free GitHub Pages deployments, a possible **Oracle Always Free** server for Laravel/Spring Boot, budget risks, backups and a staged migration to `torresalmeida.com`. **No cloud paid plan or DNS change is activated by this documentation.**

To inspect public DNS records **without changing anything**:

```bash
npm run check:dns
```

## ✨ Highlights

- 🌍 Bilingual interface in English and European Portuguese
- 📱 Responsive design for desktop and mobile
- 🌗 Light and dark themes
- ♿ Accessibility-focused navigation and automated accessibility checks
- 💼 Projects, professional experience and UI/UX work
- 📄 Integrated online CV / resume
- 🔎 SEO and Open Graph metadata
- 🧪 Automated unit, accessibility, end-to-end and visual regression testing
- 🚀 Continuous deployment to GitHub Pages

## 🛠️ Tech Stack

**Front-end**

- HTML5
- CSS3
- JavaScript

**Testing & quality**

- Vitest
- Selenium WebDriver
- axe-core
- Visual regression testing
- Automated link and asset validation
- npm audit

**Automation & deployment**

- GitHub Actions
- GitHub Pages
- Node.js

## 🧪 Testing

The project includes several layers of automated validation.

Run the main test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run accessibility checks:

```bash
npm run test:a11y
```

Run Selenium end-to-end smoke tests:

```bash
npm run test:e2e
```

Run visual regression tests:

```bash
npm run test:visual
```

Validate internal links and assets:

```bash
npm run validate:links
```

The GitHub Actions test workflow runs the test suite on **Node.js 18 and Node.js 20**, with additional accessibility, link validation, Selenium and visual regression checks on Node.js 20.

## 🚀 Continuous Deployment

The portfolio is deployed automatically to **GitHub Pages**.

The deployment workflow only runs after the main test workflow completes successfully on the `main` branch.

This means changes must pass the automated validation pipeline before they are published to the live portfolio.

## 💻 Local Setup

Clone the repository:

```bash
git clone https://github.com/danielatorresalmeida/Portfolio-website.git
cd Portfolio-website
```

Install the development dependencies:

```bash
npm install
```

The portfolio is a static website. For local development, serve the repository using a local web server and open the site in your browser.

## 📂 Main Areas

The portfolio includes:

- **Projects** — selected software development work
- **UI/UX** — interface and design work
- **About** — background and current development focus
- **Experience** — professional and practical experience
- **CV / Resume** — dedicated online resume
- **Contact** — GitHub, LinkedIn and contact information

## ♿ Accessibility

Accessibility is treated as part of the development process rather than a final check.

The project includes:

- semantic HTML structure
- keyboard-accessible navigation
- skip navigation
- accessible labels and controls
- automated checks with axe-core
- browser-based accessibility testing in CI

## 🔗 Links

- 🌐 [Portfolio](https://danielatorresalmeida.github.io/Portfolio-website/)
- 💻 [GitHub](https://github.com/danielatorresalmeida)
- 💼 [LinkedIn](https://www.linkedin.com/in/daniela-torres-almeida-945884205/)

---

Built and maintained by **Daniela Torres Almeida**.
