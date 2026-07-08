﻿﻿﻿// Footer year
const yearValue = new Date().getFullYear();
document.querySelectorAll("[data-year]").forEach((yearEl) => {
  yearEl.textContent = yearValue;
});

// === Theme toggle ===
const THEME_KEY = "resume-theme";
const LANGUAGE_KEY = "portfolio-language";
const LANG_EN = "en-US";
const LANG_PT = "pt-PT";
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const langToggle = document.getElementById("lang-toggle");
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");
const contactCvLink = document.getElementById("contact-cv-link");

const THEME_ICONS = {
  // Keep this mapping explicit because legacy file names are inverted.
  light: "assets/dark.png",
  dark: "assets/light.png",
};

// Safe browser-storage read that will not crash in restricted contexts.
function getStoredValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

// Safe browser-storage write that fails silently when blocked.
function setStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore blocked storage (privacy mode / restricted contexts).
  }
}

const TRANSLATIONS = {
  [LANG_EN]: {
    "nav.projects": "Projects",
    "nav.figma": "Figma",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.menu.open": "Open navigation",
    "nav.menu.close": "Close navigation",
    "topbar.cv": "CV",
    "topbar.github": "GitHub",
    "hero.kicker": "Portfolio",
    "hero.title": "Portfolio <span class=\"accent\">Project Showcase</span>",
    "hero.lead": "A collection of frontend, software, UI/UX, and QA-focused projects showing my work across HTML, CSS, JavaScript, TypeScript, Angular, C, Java, Figma, and testing concepts.",
    "hero.cta.work": "View Projects",
    "hero.cta.resume": "Role-Specific Versions",
    "hero.cta.contact": "Contact Me",
    "hero.highlights.0.title": "Project library",
    "hero.highlights.0.text": "Each project is labeled by primary tools, supporting technologies, and practical outcomes.",
    "hero.highlights.1.title": "Cross-skill evidence",
    "hero.highlights.1.text": "The showcase combines web UI, programming logic, and QA/testing work in one place.",
    "hero.highlights.2.title": "Role-ready versions",
    "hero.highlights.2.text": "Separate saved versions are available for General IT/Software, Guestcentric, and Rumos Web Developer opportunities.",
    "coreStack.heading": "Core Skills Across Frontend, Software, UI/UX, and QA",
    "coreStack.note": "Broad project showcase view: technical foundations, interface delivery, and practical validation habits.",
    "coreStack.frontend.title": "Frontend",
    "coreStack.frontend.0": "HTML",
    "coreStack.frontend.1": "CSS",
    "coreStack.frontend.2": "JavaScript",
    "coreStack.frontend.3": "TypeScript",
    "coreStack.frontend.4": "Angular",
    "coreStack.frontend.5": "React",
    "coreStack.frontend.6": "Git / GitHub",
    "coreStack.frontend.7": "REST API Integration",
    "coreStack.design.title": "Design",
    "coreStack.design.0": "Figma",
    "coreStack.design.1": "UI Design",
    "coreStack.design.2": "UX Thinking",
    "coreStack.design.3": "Wireframing",
    "coreStack.design.4": "Prototyping",
    "coreStack.design.5": "Design Systems",
    "coreStack.design.6": "Responsive Layouts",
    "coreStack.practical.title": "Practical Strengths",
    "coreStack.practical.0": "Accessibility Basics",
    "coreStack.practical.1": "Component Thinking",
    "coreStack.practical.2": "Layout Implementation",
    "coreStack.practical.3": "Cross-device Testing",
    "coreStack.practical.4": "Collaboration",
    "coreStack.practical.5": "QA/Testing Concepts",
    "coreStack.programming.title": "Programming / Foundations",
    "coreStack.programming.0": "C",
    "coreStack.programming.1": "Java",
    "coreStack.programming.2": "Python Basics",
    "coreStack.programming.3": "Git / GitHub",
    "coreStack.qa.title": "QA / Testing",
    "coreStack.qa.0": "QA Concepts",
    "coreStack.qa.1": "Manual Testing",
    "coreStack.qa.2": "Debugging",
    "coreStack.qa.3": "Attention to Usability and Detail",
    "coreStack.0": "HTML",
    "coreStack.1": "CSS",
    "coreStack.2": "JavaScript",
    "coreStack.3": "TypeScript",
    "coreStack.4": "Angular",
    "coreStack.5": "React",
    "coreStack.6": "Responsive Web Design",
    "coreStack.7": "REST API Integration",
    "coreStack.8": "UI/UX Design",
    "coreStack.9": "Figma",
    "coreStack.10": "C",
    "coreStack.11": "Java",
    "coreStack.12": "Python Basics",
    "coreStack.13": "Git / GitHub",
    "coreStack.14": "QA Concepts",
    "coreStack.15": "Manual Testing",
    "coreStack.16": "Debugging",
    "coreStack.17": "Attention to Usability and Detail",
    "projects.heading": "Project Showcase",
    "projects.intro": "A broad project library showing languages, tools, and practical skills across web UI, software logic, and QA/testing workflows.",
    "projects.featured.eyebrow": "Project library highlight",
    "projects.featured.title": "DevFlow Hub",
    "projects.featured.overview": "<strong>Overview:</strong> Dashboard concept to organize developers, projects, and growth paths in one clear interface.",
    "projects.featured.problem": "<strong>Problem:</strong> Content and task flows needed clearer hierarchy so teams can scan and act faster.",
    "projects.featured.role": "<strong>My role:</strong> Defined layout structure, component blocks, and information grouping for a more usable dashboard.",
    "projects.featured.design": "<strong>Design decisions:</strong> Prioritized navigation clarity, readable spacing, and section grouping around user tasks.",
    "projects.featured.implementation": "<strong>Frontend decisions:</strong> Built with React component thinking so design choices map directly to reusable UI pieces and API-connected flows.",
    "projects.featured.result": "<strong>Current result:</strong> In-progress concept that demonstrates design-to-code reasoning and responsive layout planning.",
    "projects.featured.next": "<strong>What I would improve next:</strong> Formalize spacing, typography, and component rules into a tighter design system in Figma.",
    "projects.tictactoe.overlay": "Terminal gameplay preview with color-coded board states and tournament-ready match flow.",
    "projects.tictactoe.status": "Terminal C project",
    "projects.tictactoe.title": "Tic Tac Toe / Jogo do Galo in C",
    "projects.tictactoe.summary": "Modular terminal game with AI, tournaments, and testing workflows.",
    "projects.tictactoe.what": "A modular terminal-based Tic Tac Toe game built in C with multiple board sizes, AI difficulty levels, tournaments, save/load, undo, replay, ranking, automatic tests, and colorblind-friendly terminal colors.",
    "projects.tictactoe.mainTool": "<strong>Main tool:</strong> C",
    "projects.tictactoe.secondary": "<strong>Also uses:</strong> Structured programming, game-state logic, AI difficulty control, automated tests.",
    "projects.tictactoe.demonstrates": "<strong>What it demonstrates:</strong> Programming fundamentals, condition handling, modular architecture, and terminal user interaction.",
    "projects.tictactoe.logic": "<strong>Main features:</strong> Multiple board sizes, AI difficulty levels, tournaments, save/load, undo, replay, ranking, and automatic tests.",
    "projects.tictactoe.learning": "<strong>Tech stack:</strong> C, Makefile, MSYS2, GCC, Modular Programming.",
    "projects.tictactoe.proof": "Tech stack: C, Makefile, MSYS2, GCC, Modular Programming.",
    "projects.nextpath.status": "In progress",
    "projects.nextpath.overlay": "DevFlow Hub login and dashboard entry interface for organizing projects, tasks, and teams.",
    "projects.nextpath.title": "DevFlow Hub",
    "projects.nextpath.summary": "Full-stack web application for organizing projects, Agile tasks, and internal growth programs.",
    "projects.nextpath.what": "DevFlow Hub is a full-stack web application for managing developers, projects, Agile tasks, and internal growth programs. It connects a React + TypeScript + Vite frontend to a Java + Spring Boot REST API with PostgreSQL data persistence.",
    "projects.nextpath.mainTool": "<strong>Main stack:</strong> React + TypeScript + Vite (frontend), Java + Spring Boot (backend), PostgreSQL",
    "projects.nextpath.secondary": "<strong>Also uses:</strong> API REST testing with Postman, SQL scripts, UI/UX planning, and responsive layout.",
    "projects.nextpath.demonstrates": "<strong>What it demonstrates:</strong> End-to-end full-stack thinking, from interface structure to backend API logic and persistent data flow.",
    "projects.nextpath.focus": "<strong>Focus:</strong> React component structure, clear data organization, REST API integration, and responsive dashboard layout.",
    "projects.nextpath.learning": "<strong>Learning:</strong> React, TypeScript, Vite, Java, Spring Boot, REST API integration, PostgreSQL, and full-stack architecture.",
    "projects.nextpath.problem": "<strong>Problem:</strong> Dashboard content and actions were hard to scan quickly.",
    "projects.nextpath.role": "<strong>My role:</strong> Organized page hierarchy, grouped user tasks, and defined reusable section patterns.",
    "projects.nextpath.design": "<strong>Design decisions:</strong> Emphasized spacing, visual hierarchy, and cleaner section transitions.",
    "projects.nextpath.implementation": "<strong>Frontend decisions:</strong> Structured the interface for React components, API integration, and responsive behavior across core dashboard views.",
    "projects.nextpath.outcome": "<strong>Outcome:</strong> In-progress concept that better communicates priorities and reduces navigation friction.",
    "projects.nextpath.next": "<strong>Next step:</strong> Refine a reusable design-system layer in Figma (typography, spacing, and component states).",
    "projects.nextpath.proof": "Skills shown: React, TypeScript, Vite, Java, Spring Boot, REST API, PostgreSQL, full-stack architecture.",
    "projects.clinica.overlay": "Clinical management login interface with profile-based access.",
    "projects.clinica.status": "Clinical management project",
    "projects.clinica.title": "Clínica Médica",
    "projects.clinica.summary": "Login entry point for a clinic management system with access by user profile.",
    "projects.clinica.what": "What I did: Built a clean clinic login experience focused on readable form structure, user guidance, and a trustworthy first screen for role-based access.",
    "projects.clinica.mainTool": "<strong>Main focus:</strong> Login UI, account access, and profile-based user flow.",
    "projects.clinica.secondary": "<strong>Also shows:</strong> Form hierarchy, accessible labels, clear feedback areas, and responsive screen composition.",
    "projects.clinica.demonstrates": "<strong>What it demonstrates:</strong> Practical UI structure for a service-management system with a clean authentication entry point.",
    "projects.clinica.problem": "<strong>Problem:</strong> Clinic users need a simple and reliable way to enter the system with the correct access profile.",
    "projects.clinica.solution": "<strong>Solution:</strong> Designed a focused login screen with clear fields, support guidance, and visual emphasis on the main action.",
    "projects.clinica.outcome": "<strong>Outcome:</strong> Created a calm, professional entry point that supports faster authentication and clearer user expectations.",
    "projects.clinica.proof": "Focus: login flow, form UI, healthcare system interface, responsive layout.",
    "projects.todo.overlay": "React + TypeScript app with Firebase auth and persistent real-time task management.",
    "projects.todo.title": "To-Do List App",
    "projects.todo.summary": "Independent frontend build showing clean UI decisions and practical feature implementation.",
    "projects.todo.what": "What I did: Designed and implemented a responsive React + TypeScript interface, integrated Firebase + Google Auth, and delivered a complete task workflow end-to-end.",
    "projects.todo.problem": "<strong>Problem:</strong> Needed a lightweight task app that stays clear and usable across devices.",
    "projects.todo.solution": "<strong>Solution:</strong> Built a responsive React + TypeScript app with secure Google sign-in and persistent Firebase data.",
    "projects.todo.outcome": "<strong>Outcome:</strong> Delivered a polished project demonstrating ownership, execution, and production-style UX.",
    "projects.todo.proof": "Stack: React, TypeScript, Firebase, Google Auth, Vite.",
    "projects.todo.description": "React + TypeScript to-do app using Firebase and Google Auth.",
    "projects.portfolio.overlay": "Responsive single-page portfolio with clear navigation and project highlights.",
    "projects.portfolio.status": "Published project",
    "projects.portfolio.title": "Responsive Portfolio",
    "projects.portfolio.summary": "Personal portfolio built to present frontend work with clear navigation.",
    "projects.portfolio.what": "What I did: Built a responsive single-page portfolio, structured reusable sections, and optimized readability and navigation across desktop and mobile. Executed manual website tests and automated Selenium smoke checks on key flows.",
    "projects.portfolio.mainTool": "<strong>Main tool:</strong> HTML/CSS",
    "projects.portfolio.secondary": "<strong>Also uses:</strong> JavaScript, responsive design, semantic structure, manual QA checks.",
    "projects.portfolio.demonstrates": "<strong>What it demonstrates:</strong> Frontend implementation, design-to-code execution, and recruiter-friendly content architecture.",
    "projects.portfolio.problem": "<strong>Problem:</strong> Needed a clear personal site to present projects and skills professionally.",
    "projects.portfolio.role": "<strong>My role:</strong> Planned structure, wrote content hierarchy, designed interactions, and implemented frontend.",
    "projects.portfolio.design": "<strong>Design decisions:</strong> Clear section rhythm, trust-building layout, and consistent CTA placement.",
    "projects.portfolio.implementation": "<strong>Frontend decisions:</strong> Mobile-first HTML/CSS, reusable section blocks, and bilingual-friendly content hooks.",
    "projects.portfolio.solution": "<strong>Solution:</strong> Built a responsive single-page portfolio with structured navigation and GitHub Pages deployment.",
    "projects.portfolio.outcome": "<strong>Outcome:</strong> Created a cleaner way for recruiters to review experience and live work.",
    "projects.portfolio.next": "<strong>Next step:</strong> Expand component and spacing rules into a documented design system layer.",
    "projects.portfolio.proof": "Built with reusable sections and a mobile-first layout.",
    "projects.meta.default": "Daniela Almeida | Built with HTML/CSS/JS | GitHub Pages",
    "projects.qa.overlay": "Python + Pytest API automation with validation workflows and CI-ready reporting.",
    "projects.qa.title": "API QA Test Suite",
    "projects.qa.summary": "QA automation suite for API regression detection with readable, shareable test evidence.",
    "projects.qa.what": "What I did: Built Python-based API validation workflows, covering status, schema, and business-rule checks with publishable pytest-html reports.",
    "projects.qa.mainTool": "<strong>Main tool:</strong> Python",
    "projects.qa.secondary": "<strong>Also uses:</strong> Pytest, pytest-html, REST API basics, reporting workflow.",
    "projects.qa.demonstrates": "<strong>What it demonstrates:</strong> QA/testing mindset, structured validation, and evidence-driven quality checks.",
    "projects.qa.problem": "<strong>Problem:</strong> Manual API checks were slow and inconsistent before releases.",
    "projects.qa.solution": "<strong>Solution:</strong> Created a reusable Python + Pytest suite with structured assertions and report generation.",
    "projects.qa.outcome": "<strong>Outcome:</strong> Reduced verification time and improved confidence in API quality.",
    "projects.qa.proof": "Stack: Python, Pytest, pytest-html, REST API basics, GitHub Pages.",
    "projects.ui.overlay": "Component gallery showcasing reusable UI patterns.",
    "projects.ui.title": "UI Components Showcase",
    "projects.ui.summary": "Reusable UI patterns designed for consistent and scalable interfaces.",
    "projects.ui.what": "What I did: Developed reusable frontend components, added responsive behavior, and refined interactive states for consistency across layouts.",
    "projects.ui.problem": "<strong>Problem:</strong> Product pages needed reusable UI blocks to reduce duplicated implementation work.",
    "projects.ui.solution": "<strong>Solution:</strong> Built a component showcase with modular HTML, CSS, and JavaScript patterns.",
    "projects.ui.outcome": "<strong>Outcome:</strong> Improved consistency and speed when building new interface sections.",
    "projects.ui.proof": "Stack: HTML5, CSS3, JavaScript, UI/UX, responsive design.",
    "projects.mood.overlay": "Next.js wellness platform built with React, Tailwind CSS, and Vercel deployment.",
    "projects.mood.title": "MoodChanger.ai",
    "projects.mood.summary": "Next.js website for MoodChanger.ai with responsive React sections and clear product messaging.",
    "projects.mood.what": "What I did: Built responsive product and marketing sections in a Next.js + React codebase, refining hierarchy, readability, and conversion flow. Performed manual cross-browser and mobile QA and automated Selenium smoke checks for critical user paths.",
    "projects.mood.problem": "<strong>Problem:</strong> Product information needed to be clearer and easier to scan across devices.",
    "projects.mood.solution": "<strong>Solution:</strong> Implemented responsive Next.js sections with clearer information hierarchy and user flow.",
    "projects.mood.outcome": "<strong>Outcome:</strong> Delivered a clearer interface that better supports user trust and product discovery.",
    "projects.mood.description": "Tech used on the live site: Next.js (React), Tailwind CSS, and Vercel hosting.",
    "projects.robo.overlay": "Live Next.js product website shipped with responsive UX and conversion-focused structure.",
    "projects.robo.title": "RoboCollective.ai",
    "projects.robo.summary": "Production-facing React/Next.js project demonstrating collaboration, responsive delivery, and release readiness.",
    "projects.robo.what": "What I did: Built and refined responsive frontend sections in a live product environment, partnering with stakeholders and validating key flows before release.",
    "projects.robo.problem": "<strong>Problem:</strong> The platform needed a credible web experience to communicate product value quickly.",
    "projects.robo.solution": "<strong>Solution:</strong> Implemented responsive marketing and product flows in Next.js with clearer hierarchy and CTAs.",
    "projects.robo.outcome": "<strong>Outcome:</strong> Shipped production-ready pages that improved clarity and supported business goals.",
    "projects.robo.proof": "Stack: Next.js, React, Tailwind CSS, Vercel.",
    "projects.robo.description": "Tech used on the live site: Next.js (React), Tailwind CSS, and Vercel hosting.",
    "projects.legal.overlay": "Next.js public site with React components, modular styling, and Vercel deployment.",
    "projects.legal.title": "Legal Ventures Institute",
    "projects.legal.summary": "Public-facing Next.js website presenting legal innovation services with clear conversion paths.",
    "projects.legal.what": "What I did: Built responsive React sections in a Next.js codebase, improving content hierarchy, service presentation, and contact flow. Added manual regression testing plus Selenium-based smoke coverage for primary conversion routes.",
    "projects.legal.problem": "<strong>Problem:</strong> The organization needed a clear and trustworthy way to present services online.",
    "projects.legal.solution": "<strong>Solution:</strong> Structured responsive Next.js sections and improved service-to-contact navigation.",
    "projects.legal.outcome": "<strong>Outcome:</strong> Delivered a cleaner, easier-to-navigate site for prospective clients.",
    "projects.legal.description": "Tech used on the live site: Next.js (React), CSS Modules, and Vercel hosting.",
    "projects.space.overlay": "Next.js venture site with React components, Tailwind CSS, and Vercel deployment.",
    "projects.space.title": "Space Ventures Institute",
    "projects.space.summary": "Next.js website for Space Ventures Institute focused on readability and structured navigation.",
    "projects.space.what": "What I did: Developed responsive React interfaces in a Next.js + Tailwind codebase for venture-focused content and clear navigation. Validated releases with manual responsive QA and Selenium smoke tests across core website journeys.",
    "projects.space.problem": "<strong>Problem:</strong> Complex venture and innovation content needed better structure for users.",
    "projects.space.solution": "<strong>Solution:</strong> Built responsive Next.js layouts with clearer content sections and navigation cues.",
    "projects.space.outcome": "<strong>Outcome:</strong> Improved readability and content discoverability across screen sizes.",
    "projects.space.description": "Tech used on the live site: Next.js (React), Tailwind CSS, and Vercel hosting.",
    "projects.tarrl.overlay": "Remote-first Embodied AI research lab and venture playground for open robotics collaboration.",
    "projects.tarrl.title": "TARRL",
    "projects.tarrl.summary": "Public-facing website for Texas Advanced Robotics Research Lab highlighting remote research tracks and applications.",
    "projects.tarrl.what": "What I did: Built and refined responsive frontend sections that communicate TARRL's mission, research tracks, and application flow, with clear hierarchy for global candidates.",
    "projects.tarrl.problem": "<strong>Problem:</strong> Advanced robotics opportunities are often blocked by closed labs, funding limits, or geography.",
    "projects.tarrl.solution": "<strong>Solution:</strong> Created a clear remote-first web experience that explains the open-source model, who it serves, and how to apply.",
    "projects.tarrl.outcome": "<strong>Outcome:</strong> Delivered a stronger digital presence that helps qualified researchers quickly understand the program and take action.",
    "projects.tarrl.description": "Live site focus: Embodied AI, open-source robotics, and remote-first collaboration.",
    "projects.mechanic.overlay": "Relational database model for a mechanic workshop with clients, vehicles, services, and parts flow.",
    "projects.mechanic.title": "Mechanic Data Base",
    "projects.mechanic.summary": "Database schema project designed to organize workshop operations, service history, and parts/supplier management.",
    "projects.mechanic.what": "What I did: Modeled the full relational schema, defined primary/foreign key constraints, and mapped entity relationships to keep client, vehicle, service sheet, and inventory data consistent.",
    "projects.mechanic.problem": "<strong>Problem:</strong> Workshop data was spread across disconnected records, making tracking services and parts difficult.",
    "projects.mechanic.solution": "<strong>Solution:</strong> Designed a normalized SQL schema with linked tables for clients, vehicles, work sheets, services, mechanics, and suppliers.",
    "projects.mechanic.outcome": "<strong>Outcome:</strong> Created a clear, scalable data structure that improves traceability for maintenance history, stock, and service pricing.",
    "projects.mechanic.description": "ER diagram and relational database model for a mechanic workshop management flow.",
    "projects.bakery.overlay": "Relational bakery database model covering customers, orders, products, ingredients, and stock flow.",
    "projects.bakery.title": "Bakery Data Base",
    "projects.bakery.summary": "Database schema project for bakery operations, connecting customers, orders, products, recipes, and inventory.",
    "projects.bakery.what": "What I did: Designed the relational schema, defined primary/foreign key constraints, and mapped order-to-production relationships to keep bakery operations data consistent.",
    "projects.bakery.problem": "<strong>Problem:</strong> Bakery sales, recipes, and stock records were disconnected, making traceability difficult.",
    "projects.bakery.solution": "<strong>Solution:</strong> Built a normalized SQL schema linking customers, orders, products, ingredients, suppliers, and inventory movement.",
    "projects.bakery.outcome": "<strong>Outcome:</strong> Delivered a clear data model that improves operational tracking, planning, and reporting for bakery workflows.",
    "projects.bakery.description": "ER diagram and relational database model for bakery operations and inventory flow.",
    "projects.actions.live": "Live",
    "projects.actions.code": "Code",
    "projects.actions.viewCode": "View Code",
    "projects.actions.codeRequest": "Code on request",
    "projects.actions.demo": "Demo",
    "projects.actions.viewSite": "View site",
    "projects.privateRepoNote": "Private repository. Frontend contribution available on request.",
    "projects.other.heading": "Other Projects",
    "projects.other.intro": "Additional work kept visible for role-specific conversations and deeper portfolio review.",
    "projects.other.responsive": "Responsive Portfolio",
    "projects.other.robo": "RoboCollective.ai",
    "projects.other.robo.note": "Live product website contribution in a React/Next.js environment.",
    "projects.other.mood": "MoodChanger.ai",
    "projects.other.mood.note": "Responsive product and marketing sections in a Next.js site.",
    "projects.other.legal": "Legal Ventures Institute",
    "projects.other.legal.note": "Public-facing Next.js website with service presentation and contact flow.",
    "projects.other.ui": "UI Components Showcase",
    "projects.other.ui.note": "Reusable UI patterns with responsive HTML, CSS, and JavaScript.",
    "projects.other.space": "Space Ventures Institute",
    "projects.other.space.note": "Responsive venture-focused website sections and navigation.",
    "projects.other.caipo": "CAIPO.ai",
    "projects.other.caipo.note": "Frontend sections for wearable and developer kit product communication.",
    "projects.other.tarrl": "TARRL",
    "projects.other.tarrl.note": "Remote-first research lab website with clear program and application content.",
    "projects.other.todo": "To-Do List App",
    "projects.other.todo.note": "React + TypeScript task workflow with Firebase and Google Auth.",
    "projects.other.mechanic": "Mechanic Data Base",
    "projects.other.mechanic.note": "Relational SQL model for workshop clients, vehicles, services, and parts.",
    "projects.other.bakery": "Bakery Data Base",
    "projects.other.bakery.note": "Relational SQL model for bakery orders, products, ingredients, and stock.",
    "figma.heading": "Figma Designs",
    "figma.intro": "Selected design explorations connected to real frontend work. Public Figma links can be added here as each case study is finalized.",
    "figma.nextpath.status": "In progress",
    "figma.nextpath.title": "DevFlow Hub Dashboard Wireframes",
    "figma.nextpath.summary": "Layout and hierarchy exploration for the DevFlow Hub full-stack dashboard experience.",
    "figma.nextpath.proof": "What it shows: section grouping, dashboard scannability, and component-ready structure.",
    "figma.nextpath.todo": "TODO: Add public Figma file URL for this case study.",
    "figma.clinica.status": "Figma project",
    "figma.clinica.title": "Clínica Médica Login UI",
    "figma.clinica.summary": "Interface planning for a clinical management login flow with profile-based access and clear account guidance.",
    "figma.clinica.proof": "What it shows: form hierarchy, trust-focused healthcare UI, and a clean authentication entry screen.",
    "figma.clinica.todo": "TODO: Add public Figma file URL for this case study.",
    "figma.portfolio.status": "Published website support",
    "figma.portfolio.title": "Portfolio UI Planning",
    "figma.portfolio.summary": "Design planning tied to content hierarchy, CTA placement, and responsive layout decisions.",
    "figma.portfolio.proof": "What it shows: design-to-code thinking and browser-ready interface planning.",
    "figma.portfolio.todo": "TODO: Add public Figma file URL for this case study.",
    "figma.system.status": "Design system notes",
    "figma.system.title": "Component and Style Tokens",
    "figma.system.summary": "Ongoing spacing, typography, and reusable component studies to improve consistency.",
    "figma.system.proof": "What it shows: practical foundations for scalable UI implementation.",
    "figma.system.todo": "TODO: Add public Figma file URL for this case study.",
    "figma.restaurant.status": "Figma project",
    "figma.restaurant.title": "Restaurant System Figma Project",
    "figma.restaurant.summary": "Interface planning for a restaurant management system covering ordering, menus, tables, and staff workflow screens.",
    "figma.restaurant.proof": "What it shows: user flows, table management, menu structure, and component-ready screens.",
    "figma.restaurant.todo": "TODO: Add public Figma file URL for this case study.",
    "figma.actions.request": "Request walkthrough",
    "skillsMap.heading": "Skills By Project",
    "skillsMap.intro": "A quick map from technical skills to concrete project evidence.",
    "skillsMap.frontend.title": "Frontend and UI",
    "skillsMap.frontend.0": "<strong>React/TypeScript:</strong> DevFlow Hub",
    "skillsMap.frontend.1": "<strong>HTML/CSS:</strong> Responsive Portfolio, UI Components Showcase",
    "skillsMap.frontend.2": "<strong>JavaScript/TypeScript:</strong> Portfolio interactions, DevFlow Hub concept, To-Do App context",
    "skillsMap.frontend.3": "<strong>Responsive design:</strong> Portfolio and multi-device UI sections",
    "skillsMap.design.title": "Design and UX",
    "skillsMap.design.0": "<strong>Figma/UI/UX:</strong> DevFlow Hub planning, portfolio structure, component-oriented layout choices",
    "skillsMap.design.1": "<strong>Visual hierarchy:</strong> Dashboard sections and recruiter-oriented portfolio content flow",
    "skillsMap.design.2": "<strong>Accessibility basics:</strong> Semantic structure, keyboard-ready interactions, contrast-aware UI decisions",
    "skillsMap.software.title": "Software and QA",
    "skillsMap.software.0": "<strong>C:</strong> Tic-Tac-Toe (modular game logic, conditions, state handling)",
    "skillsMap.software.1": "<strong>Java:</strong> Listed in technical foundations and coursework",
    "skillsMap.software.2": "<strong>Python basics/QA:</strong> API QA Test Suite with validation and reporting",
    "skillsMap.software.3": "<strong>REST API integration concepts:</strong> API QA validation and frontend project context",
    "roleVersions.heading": "Role-Specific Portfolio Versions",
    "roleVersions.intro": "Choose the portfolio and resume version that best matches the role conversation.",
    "roleVersions.general.title": "General IT / Software Version",
    "roleVersions.general.desc": "Tailored for junior frontend, software development, web development, and QA/testing opportunities.",
    "roleVersions.general.portfolio": "Open portfolio version",
    "roleVersions.general.resume": "Open matching resume",
    "roleVersions.guestcentric.title": "Guestcentric Web Designer Version",
    "roleVersions.guestcentric.desc": "Tailored for UI/UX, Figma, HTML/CSS, responsive design, and browser-ready frontend delivery.",
    "roleVersions.guestcentric.portfolio": "Open portfolio version",
    "roleVersions.guestcentric.resume": "Open matching resume",
    "roleVersions.rumos.title": "Rumos Web Developer Lisbon Version",
    "roleVersions.rumos.desc": "Tailored for junior web developer and frontend opportunities with Lisbon hybrid teams.",
    "roleVersions.rumos.portfolio": "Open portfolio version",
    "roleVersions.rumos.resume": "Open matching resume",
    "roleVersions.datadog.title": "Datadog Software Engineer Version",
    "roleVersions.datadog.desc": "Tailored for Datadog Early Career Software Engineer conversations with a frontend-focused engineering angle.",
    "roleVersions.datadog.portfolio": "Open portfolio version",
    "roleVersions.datadog.resume": "Open matching resume",
    "about.eyebrow": "Profile",
    "about.heading": "About",
    "about.p1": "I come from a creative background in arts and music education and transitioned into UI/UX and frontend work. I enjoy building interfaces that are visually clear, practical, and easy to use.",
    "about.p2": "My focus is visual hierarchy, responsive layout, accessibility basics, and design-system thinking, while collaborating with developers so design decisions stay browser-ready.",
    "about.technical.heading": "Technical Skills",
    "about.technical.frontend.title": "Frontend",
    "about.technical.frontend.0": "HTML",
    "about.technical.frontend.1": "CSS",
    "about.technical.frontend.2": "JavaScript",
    "about.technical.frontend.3": "Responsive Web Design",
    "about.technical.frontend.4": "TypeScript",
    "about.technical.frontend.5": "Angular",
    "about.technical.frontend.6": "React",
    "about.technical.frontend.7": "REST API Integration",
    "about.technical.design.title": "UI/UX",
    "about.technical.design.0": "UI/UX Design",
    "about.technical.design.1": "Figma",
    "about.technical.design.2": "User-centered Interfaces",
    "about.technical.tools.title": "Tools & Workflow",
    "about.technical.platforms.title": "Platforms & Integrations",
    "about.technical.tools.0": "Git / GitHub",
    "about.technical.tools.1": "GitHub Pages",
    "about.technical.tools.2": "GitHub Actions",
    "about.technical.tools.3": "Firebase",
    "about.technical.tools.4": "Google Auth",
    "about.technical.tools.5": "QA Concepts",
    "about.technical.tools.6": "Manual Testing",
    "about.technical.tools.7": "React / Next.js",
    "about.technical.tools.8": "Debugging",
    "about.technical.tools.9": "Attention to Usability and Detail",
    "about.technical.tools.10": "Selenium",
    "about.technical.tools.11": "Vercel",
    "about.technical.tools.12": "OpenCart",
    "about.technical.tools.13": "HubSpot",
    "about.technical.tools.14": "FillOutForms",
    "about.technical.tools.15": "Clean Code Basics",
    "about.technical.tools.16": "WordPress",
    "about.technical.tools.17": "Responsive Web Design",
    "about.technical.qa.title": "QA & Testing",
    "about.technical.java.title": "Programming Foundations",
    "about.technical.java.0": "Java",
    "about.technical.java.1": "C",
    "about.technical.java.2": "Python Basics",
    "about.technical.java.3": "Programming Logic",
    "about.technical.data.title": "Databases & Data Modeling",
    "about.technical.data.0": "SQL Fundamentals",
    "about.technical.data.1": "Database Access Technologies",
    "about.technical.data.2": "SQL / Database Design",
    "about.technical.data.3": "PostgreSQL",
    "about.technical.se.title": "Software Engineering Foundations",
    "about.technical.se.0": "Programming & Algorithms",
    "about.technical.se.1": "C/C++ Fundamentals",
    "about.technical.se.2": "Software Engineering",
    "about.technical.se.3": "Software Development Methodologies",
    "about.technical.se.4": "IntelliJ IDEA",
    "about.technical.se.5": "Eclipse",
    "about.technical.backend.title": "Backend & Tooling",
    "about.technical.backend.0": "Java",
    "about.technical.backend.5": "Python",
    "about.technical.backend.1": "SQL / Database Design",
    "about.technical.backend.2": "PostgreSQL",
    "about.technical.backend.3": "IntelliJ IDEA",
    "about.technical.backend.4": "Eclipse",
    "about.technical.key.heading": "Key Skills",
    "about.technical.key.0": "HTML5",
    "about.technical.key.1": "CSS3",
    "about.technical.key.2": "JavaScript",
    "about.technical.key.3": "Responsive Web Design",
    "about.technical.key.4": "UI/UX Design",
    "about.technical.key.5": "Vue.js Learning",
    "about.technical.key.6": "REST API Basics",
    "about.technical.key.7": "Git / GitHub",
    "about.technical.key.8": "QA Testing",
    "about.technical.key.9": "Component-based Thinking",
    "about.skills.heading": "Skills",
    "about.skills.0": "UI/UX Design",
    "about.skills.1": "Front-End Development",
    "about.skills.2": "Quality Assurance",
    "about.skills.3": "API Integration",
    "about.skills.4": "Collaboration and Agile",
    "about.skills.5": "Workflow Automation",
    "about.toolbox": "Toolbox",
    "strengths.heading": "Selected Strengths",
    "strengths.0": "Frontend development with HTML5, CSS3, JavaScript, and responsive layouts for clear, accessible interfaces.",
    "strengths.1": "UI/UX execution from structure to implementation, with attention to usability, visual consistency, and interaction states.",
    "strengths.2": "Vue.js as an active learning focus, supported by component-based thinking from practical frontend work.",
    "strengths.3": "REST API basics, QA testing, and careful validation habits that help catch issues before release.",
    "strengths.4": "Collaboration, problem solving, and clear communication from multidisciplinary work and career transition experience.",
    "strengths.5": "Git/GitHub, GitHub Pages, and Vercel workflows for organizing, publishing, and maintaining web projects.",
    "courses.heading": "Courses & Certifications",
    "courses.intro": "Recent coursework organized by learning track: QA, web foundations, programming, Java, and databases.",
    "courses.0": "QA & Testing: Fundamentals of Quality Assurance Engineer - Udemy (Jul 2025)",
    "courses.1": "QA & Testing: Foundations of Software Testing and Validation - University of Leeds (Jul 2025)",
    "courses.2": "Web Foundations: Website Design - IEFP Certification (Feb 2026)",
    "courses.3": "Programming Foundations: Python Software Language - Programming Hub (Aug 2025)",
    "courses.4": "Programming Foundations: Programming - Algorithms - IEFP Certification (Apr 2026)",
    "courses.5": "Java Development: Java Programming - IEFP Certification (Mar 2026)",
    "courses.6": "Java Development: Java Language Fundamentals - IEFP Certification (May 2026)",
    "courses.7": "Databases: SQL Language Fundamentals - IEFP Certification (Mar 2026)",
    "courses.8": "Databases: Database Access Technologies - IEFP Certification (Apr 2026)",
    "experience.heading": "Experience",
    "experience.intro": "Practical product experience across UI/UX, frontend development, QA, and collaboration in multidisciplinary teams.",
    "experience.when": "Aug 2025 - Present | Remote",
    "experience.role": "Software Development Intern",
    "experience.org": "FloLabs Innovations Group",
    "experience.p1": "Built the Portfolio website and robocollective.ai from scratch, taking both projects from concept to live release.",
    "experience.p2": "Delivered 10+ UI/UX improvements across HTML, CSS, JavaScript, PHP, and TypeScript, supported REST/API-related backend tasks, and reduced bug turnaround time by around 20% through structured QA.",
    "contact.heading": "Contact",
    "contact.intro": "I'm open to junior frontend, software, UI/UX, and QA-influenced opportunities where practical implementation and usability both matter.",
    "contact.actions.email": "Email",
    "contact.actions.linkedin": "LinkedIn",
    "contact.actions.cv": "Download CV",
    "contact.form.label.name": "Name",
    "contact.form.label.email": "Email",
    "contact.form.label.message": "Message",
    "contact.form.name": "Your name",
    "contact.form.email": "you@example.com",
    "contact.form.message": "Share the role, team, timeline, and what you need support with.",
    "contact.form.send": "Send Message",
    "contact.preferEmail": "Prefer email?",
    "contact.preferWhatsapp": "Prefer WhatsApp?",
    "contact.alt.github": "GitHub",
    "contact.github": "GitHub",
    "contact.status.sending": "Sending...",
    "contact.status.success": "Thanks! Your message has been sent.",
    "contact.status.error": "Sorry, something went wrong. Please try again or email me directly.",
    "footer.home": "Home",
    "footer.projects": "Projects",
    "footer.about": "About",
    "footer.experience": "Experience",
    "footer.contact": "Contact",
    "footer.meta": "Daniela Almeida | Built with HTML, CSS, JavaScript | Hosted on GitHub Pages",
    "theme.switchToLight": "Switch to light theme",
    "theme.switchToDark": "Switch to dark theme",
    "toTop.label": "Top",
    "toTop.aria": "Back to top",
    "lang.next.aria": "Switch language to European Portuguese",
  },
  [LANG_PT]: {
    "nav.projects": "Projetos",
    "nav.figma": "Figma",
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.contact": "Contacto",
    "nav.menu.open": "Abrir navegação",
    "nav.menu.close": "Fechar navegação",
    "topbar.cv": "CV",
    "topbar.github": "GitHub",
    "hero.kicker": "Portefólio",
    "hero.title": "Portfolio <span class=\"accent\">Project Showcase</span>",
    "hero.lead": "Uma colecao de projetos de frontend, software, UI/UX e QA, mostrando trabalho em HTML, CSS, JavaScript, TypeScript, Angular, C, Java, Figma e conceitos de testes.",
    "hero.cta.work": "Ver projetos",
    "hero.cta.resume": "Versoes por funcao",
    "hero.cta.contact": "Contactar",
    "hero.highlights.0.title": "Biblioteca de projetos",
    "hero.highlights.0.text": "Cada projeto indica ferramenta principal, tecnologias de apoio e resultados praticos.",
    "hero.highlights.1.title": "Evidencia transversal",
    "hero.highlights.1.text": "O showcase junta UI web, logica de programacao e trabalho de QA/testes num unico espaco.",
    "hero.highlights.2.title": "Versoes por contexto",
    "hero.highlights.2.text": "Existem versoes guardadas para oportunidades gerais de IT/Software, Guestcentric e Rumos Web Developer.",
    "coreStack.heading": "Competencias-Chave em Frontend, Software, UI/UX e QA",
    "coreStack.note": "Visao ampla do portefolio: bases tecnicas, entrega de interface e habitos praticos de validacao.",
    "coreStack.frontend.title": "Frontend",
    "coreStack.frontend.0": "HTML",
    "coreStack.frontend.1": "CSS",
    "coreStack.frontend.2": "JavaScript",
    "coreStack.frontend.3": "TypeScript",
    "coreStack.frontend.4": "Angular",
    "coreStack.frontend.5": "React",
    "coreStack.frontend.6": "Git / GitHub",
    "coreStack.frontend.7": "Integracao com REST API",
    "coreStack.design.title": "Design",
    "coreStack.design.0": "Figma",
    "coreStack.design.1": "Design UI",
    "coreStack.design.2": "Pensamento UX",
    "coreStack.design.3": "Wireframing",
    "coreStack.design.4": "Prototipagem",
    "coreStack.design.5": "Design Systems",
    "coreStack.design.6": "Layouts Responsivos",
    "coreStack.practical.title": "Forcas Praticas",
    "coreStack.practical.0": "Bases de Acessibilidade",
    "coreStack.practical.1": "Pensamento por Componentes",
    "coreStack.practical.2": "Implementacao de Layout",
    "coreStack.practical.3": "Testes em Varios Dispositivos",
    "coreStack.practical.4": "Colaboracao",
    "coreStack.practical.5": "Conceitos de QA/Testes",
    "coreStack.programming.title": "Programacao / Bases",
    "coreStack.programming.0": "C",
    "coreStack.programming.1": "Java",
    "coreStack.programming.2": "Bases de Python",
    "coreStack.programming.3": "Git / GitHub",
    "coreStack.qa.title": "QA / Testes",
    "coreStack.qa.0": "Conceitos de QA",
    "coreStack.qa.1": "Testes manuais",
    "coreStack.qa.2": "Debugging",
    "coreStack.qa.3": "Usabilidade e detalhe",
    "coreStack.0": "HTML",
    "coreStack.1": "CSS",
    "coreStack.2": "JavaScript",
    "coreStack.3": "TypeScript",
    "coreStack.4": "Angular",
    "coreStack.5": "React",
    "coreStack.6": "Design Web Responsivo",
    "coreStack.7": "Integracao com REST API",
    "coreStack.8": "Design UI/UX",
    "coreStack.9": "Figma",
    "coreStack.10": "C",
    "coreStack.11": "Java",
    "coreStack.12": "Bases de Python",
    "coreStack.13": "Git / GitHub",
    "coreStack.14": "Conceitos de QA",
    "coreStack.15": "Testes manuais",
    "coreStack.16": "Debugging",
    "coreStack.17": "Usabilidade e detalhe",
    "projects.heading": "Project Showcase",
    "projects.intro": "Uma biblioteca de projetos com linguagens, ferramentas e competencias praticas em UI web, logica de software e fluxos de QA/testes.",
    "projects.featured.eyebrow": "Destaque da biblioteca",
    "projects.featured.title": "DevFlow Hub",
    "projects.featured.overview": "<strong>Visao geral:</strong> Conceito de dashboard para organizar developers, projetos e percursos de crescimento numa interface clara.",
    "projects.featured.problem": "<strong>Problema:</strong> O conteudo e os fluxos de tarefa precisavam de melhor hierarquia para facilitar leitura e acao rapida.",
    "projects.featured.role": "<strong>O meu papel:</strong> Defini estrutura de layout, blocos de componente e agrupamento de informacao para melhorar a usabilidade.",
    "projects.featured.design": "<strong>Decisoes de design:</strong> Priorizei clareza de navegacao, espacamento legivel e seccoes organizadas por tarefa do utilizador.",
    "projects.featured.implementation": "<strong>Decisoes de implementacao:</strong> Estruturei com pensamento de componentes React para ligar design, reutilizacao e fluxos ligados a API no frontend.",
    "projects.featured.result": "<strong>Resultado atual:</strong> Conceito em progresso que demonstra raciocinio design-to-code e planeamento responsivo.",
    "projects.featured.next": "<strong>Melhoria seguinte:</strong> Formalizar regras de espacamento, tipografia e componentes num design system mais consistente em Figma.",
    "projects.tictactoe.overlay": "Preview de terminal com tabuleiro colorido e fluxo pronto para partidas e torneios.",
    "projects.tictactoe.status": "Projeto de terminal em C",
    "projects.tictactoe.title": "Tic Tac Toe / Jogo do Galo in C",
    "projects.tictactoe.summary": "Jogo modular de terminal com IA, torneios e fluxos de teste.",
    "projects.tictactoe.what": "Jogo do Galo em terminal, modular, desenvolvido em C com multiplos tamanhos de tabuleiro, niveis de dificuldade de IA, torneios, gravar/carregar, undo, replay, ranking, testes automaticos e cores de terminal amigaveis para daltonismo.",
    "projects.tictactoe.mainTool": "<strong>Ferramenta principal:</strong> C",
    "projects.tictactoe.secondary": "<strong>Tambem usa:</strong> Programacao estruturada, logica de estado do jogo, controlo de dificuldade de IA e testes automaticos.",
    "projects.tictactoe.demonstrates": "<strong>O que demonstra:</strong> Fundamentos de programacao, condicoes, arquitetura modular e interacao em terminal.",
    "projects.tictactoe.logic": "<strong>Funcionalidades principais:</strong> Multiplos tamanhos de tabuleiro, dificuldade de IA, torneios, gravar/carregar, undo, replay, ranking e testes automaticos.",
    "projects.tictactoe.learning": "<strong>Stack:</strong> C, Makefile, MSYS2, GCC, Programacao Modular.",
    "projects.tictactoe.proof": "Stack: C, Makefile, MSYS2, GCC, Programacao Modular.",
    "projects.nextpath.status": "Em progresso",
    "projects.nextpath.overlay": "Interface de login e entrada no dashboard do DevFlow Hub para organizar projetos, tarefas e equipas.",
    "projects.nextpath.title": "DevFlow Hub",
    "projects.nextpath.summary": "Aplicacao web full-stack para organizar projetos, tarefas Agile e programas internos de crescimento.",
    "projects.nextpath.what": "O DevFlow Hub e uma aplicacao web full-stack para gerir developers, projetos, tarefas Agile e programas internos de crescimento. Liga um frontend em React + TypeScript + Vite a uma API REST em Java + Spring Boot com persistencia de dados em PostgreSQL.",
    "projects.nextpath.mainTool": "<strong>Stack principal:</strong> React + TypeScript + Vite (frontend), Java + Spring Boot (backend), PostgreSQL",
    "projects.nextpath.secondary": "<strong>Tambem usa:</strong> testes de API REST com Postman, scripts SQL, planeamento UI/UX e layout responsivo.",
    "projects.nextpath.demonstrates": "<strong>O que demonstra:</strong> pensamento full-stack de ponta a ponta, da estrutura da interface a logica de API backend e fluxo persistente de dados.",
    "projects.nextpath.focus": "<strong>Foco:</strong> Estrutura de componentes React, organizacao clara de dados, integracao com API REST e layout responsivo de dashboard.",
    "projects.nextpath.learning": "<strong>Aprendizagem:</strong> React, TypeScript, Vite, Java, Spring Boot, integracao de API REST, PostgreSQL e arquitetura full-stack.",
    "projects.nextpath.problem": "<strong>Problema:</strong> Conteudo e acoes do dashboard eram dificeis de analisar rapidamente.",
    "projects.nextpath.role": "<strong>O meu papel:</strong> Organizei hierarquia da pagina, agrupei tarefas do utilizador e defini padroes de secao reutilizaveis.",
    "projects.nextpath.design": "<strong>Decisoes de design:</strong> Reforcei espacamento, hierarquia visual e transicoes mais limpas entre seccoes.",
    "projects.nextpath.implementation": "<strong>Decisoes de implementacao:</strong> Estruturei a interface para componentes React, integracao com API e comportamento responsivo nas vistas principais do dashboard.",
    "projects.nextpath.outcome": "<strong>Resultado:</strong> Conceito em progresso que comunica melhor prioridades e reduz friccao de navegacao.",
    "projects.nextpath.next": "<strong>Passo seguinte:</strong> Refinar camada de design system em Figma (tipografia, espacamento e estados de componente).",
    "projects.nextpath.proof": "Competencias: React, TypeScript, Vite, Java, Spring Boot, API REST, PostgreSQL, arquitetura full-stack.",
    "projects.clinica.overlay": "Interface de login para gestao clinica com acesso por perfil.",
    "projects.clinica.status": "Projeto de gestao clinica",
    "projects.clinica.title": "Clínica Médica",
    "projects.clinica.summary": "Ponto de entrada para um sistema de gestao clinica com acesso por perfil de utilizador.",
    "projects.clinica.what": "O que fiz: Construí uma experiencia de login limpa para clinica, focada em estrutura de formulario legivel, orientacao do utilizador e um primeiro ecrã confiavel para acesso por perfil.",
    "projects.clinica.mainTool": "<strong>Foco principal:</strong> UI de login, acesso a conta e fluxo de utilizador baseado em perfil.",
    "projects.clinica.secondary": "<strong>Tambem mostra:</strong> Hierarquia de formulario, labels acessiveis, areas de feedback claras e composicao responsiva do ecra.",
    "projects.clinica.demonstrates": "<strong>O que demonstra:</strong> Estrutura pratica de UI para um sistema de gestao de servicos com uma entrada de autenticacao limpa.",
    "projects.clinica.problem": "<strong>Problema:</strong> Utilizadores de uma clinica precisam de uma forma simples e fiavel de entrar no sistema com o perfil de acesso correto.",
    "projects.clinica.solution": "<strong>Solucao:</strong> Desenhei um ecrã de login focado, com campos claros, apoio ao utilizador e destaque visual para a acao principal.",
    "projects.clinica.outcome": "<strong>Resultado:</strong> Criei um ponto de entrada calmo e profissional que apoia autenticacao mais rapida e expectativas mais claras.",
    "projects.clinica.proof": "Foco: fluxo de login, UI de formulario, interface de sistema de saude, layout responsivo.",
    "projects.todo.overlay": "Aplicacao em React + TypeScript com autenticacao Firebase e gestao de tarefas persistente em tempo real.",
    "projects.todo.title": "App de Tarefas",
    "projects.todo.summary": "Projeto frontend independente com UI limpa e implementacao pratica de funcionalidades.",
    "projects.todo.what": "O que fiz: Desenhei e implementei uma interface responsiva em React + TypeScript, integrei Firebase + Google Auth e entreguei o fluxo completo de tarefas de ponta a ponta.",
    "projects.todo.problem": "<strong>Problema:</strong> Era preciso uma app de tarefas leve, clara e usavel em diferentes dispositivos.",
    "projects.todo.solution": "<strong>Solucao:</strong> Desenvolvi uma aplicacao responsiva em React + TypeScript com login Google seguro e dados persistentes no Firebase.",
    "projects.todo.outcome": "<strong>Resultado:</strong> Entreguei um projeto polido que demonstra ownership, execucao e UX em nivel de producao.",
    "projects.todo.proof": "Stack: React, TypeScript, Firebase, Google Auth, Vite.",
    "projects.todo.description": "Aplicação de tarefas em React + TypeScript com Firebase e autenticação Google.",
    "projects.portfolio.overlay": "Portefólio de página única adaptável a diferentes dispositivos, com navegação clara e projetos em destaque.",
    "projects.portfolio.status": "Projeto publicado",
    "projects.portfolio.title": "Portefólio Adaptável",
    "projects.portfolio.summary": "Portefólio pessoal criado para apresentar trabalho frontend com navegação clara.",
    "projects.portfolio.what": "O que fiz: Construí um portefólio single-page responsivo, organizei secções reutilizáveis e otimizei legibilidade e navegação em desktop e mobile. Executei testes manuais de website (navegação, formulários, comportamento responsivo) e smoke tests automatizados com Selenium nos fluxos principais.",
    "projects.portfolio.mainTool": "<strong>Ferramenta principal:</strong> HTML/CSS",
    "projects.portfolio.secondary": "<strong>Tambem usa:</strong> JavaScript, design responsivo, estrutura semantica e verificacoes manuais de QA.",
    "projects.portfolio.demonstrates": "<strong>O que demonstra:</strong> Implementacao frontend, execucao design-to-code e arquitetura de conteudo orientada para recrutadores.",
    "projects.portfolio.problem": "<strong>Problema:</strong> Era necessário um site pessoal claro para apresentar projetos e competências de forma profissional.",
    "projects.portfolio.role": "<strong>O meu papel:</strong> Planeei estrutura, defini hierarquia de conteudo, desenhei interacoes e implementei o frontend.",
    "projects.portfolio.design": "<strong>Decisoes de design:</strong> Ritmo claro de seccoes, layout de confianca e CTAs consistentes.",
    "projects.portfolio.implementation": "<strong>Decisoes de implementacao:</strong> HTML/CSS mobile-first, blocos reutilizaveis e hooks de conteudo bilingue.",
    "projects.portfolio.solution": "<strong>Solução:</strong> Construí um portefólio single-page responsivo com navegação estruturada e publicação no GitHub Pages.",
    "projects.portfolio.outcome": "<strong>Resultado:</strong> Criei uma forma mais limpa para recrutadores reverem experiencia e trabalho real.",
    "projects.portfolio.next": "<strong>Passo seguinte:</strong> Expandir regras de componentes e espacamento para uma camada documentada de design system.",
    "projects.portfolio.proof": "Construído com secções reutilizáveis e abordagem mobile-first.",
    "projects.meta.default": "Daniela Almeida | Desenvolvido com HTML/CSS/JS | GitHub Pages",
    "projects.qa.overlay": "Automacao de API em Python + Pytest com fluxos de validacao e reporting pronto para CI.",
    "projects.qa.title": "Suite de Testes de API (QA)",
    "projects.qa.summary": "Suite de automacao QA para detetar regressões de API com evidencia de testes legivel e partilhavel.",
    "projects.qa.what": "O que fiz: Construi fluxos de validacao de API em Python para status, schema e regras de negocio, com relatorios pytest-html publicaveis.",
    "projects.qa.mainTool": "<strong>Ferramenta principal:</strong> Python",
    "projects.qa.secondary": "<strong>Tambem usa:</strong> Pytest, pytest-html, bases de REST API e fluxo de reporting.",
    "projects.qa.demonstrates": "<strong>O que demonstra:</strong> Mentalidade de QA/testes, validacao estruturada e controlo de qualidade com evidencia.",
    "projects.qa.problem": "<strong>Problema:</strong> As verificacoes manuais de API eram lentas e inconsistentes antes das releases.",
    "projects.qa.solution": "<strong>Solucao:</strong> Criei uma suite reutilizavel em Python + Pytest com assertions estruturadas e geracao de relatorios.",
    "projects.qa.outcome": "<strong>Resultado:</strong> Reduzi o tempo de verificacao e aumentei a confianca na qualidade da API.",
    "projects.qa.proof": "Stack: Python, Pytest, pytest-html, bases de REST API, GitHub Pages.",
    "projects.ui.overlay": "Galeria de componentes com padrões de UI reutilizáveis.",
    "projects.ui.title": "Mostra de Componentes UI",
    "projects.ui.summary": "Padrões de UI reutilizáveis desenhados para interfaces consistentes e escaláveis.",
    "projects.ui.what": "O que fiz: Desenvolvi componentes frontend reutilizáveis, adicionei comportamento responsivo e refinei estados interativos para consistência entre layouts.",
    "projects.ui.problem": "<strong>Problema:</strong> As páginas de produto precisavam de blocos de UI reutilizáveis para reduzir trabalho duplicado de implementação.",
    "projects.ui.solution": "<strong>Solução:</strong> Construí uma mostra de componentes com padrões modulares em HTML, CSS e JavaScript.",
    "projects.ui.outcome": "<strong>Resultado:</strong> Melhorei a consistência e a velocidade na criação de novas secções de interface.",
    "projects.ui.proof": "Stack: HTML5, CSS3, JavaScript, UI/UX, design responsivo.",
    "projects.mood.overlay": "Plataforma de bem-estar em Next.js com React, Tailwind CSS e publicação na Vercel.",
    "projects.mood.title": "MoodChanger.ai",
    "projects.mood.summary": "Website em Next.js para a MoodChanger.ai com secções React responsivas e comunicação clara do produto.",
    "projects.mood.what": "O que fiz: Construí secções de produto e marketing responsivas num código Next.js + React, refinando hierarquia, legibilidade e fluxo de conversão. Executei QA manual cross-browser e mobile, além de smoke checks automatizados com Selenium para jornadas críticas de utilizador.",
    "projects.mood.problem": "<strong>Problema:</strong> A informação do produto precisava de ser mais clara e mais fácil de percorrer em vários dispositivos.",
    "projects.mood.solution": "<strong>Solução:</strong> Implementei secções responsivas em Next.js com melhor hierarquia de informação e fluxo de utilizador.",
    "projects.mood.outcome": "<strong>Resultado:</strong> Entreguei uma interface mais clara que melhora confiança do utilizador e descoberta do produto.",
    "projects.mood.description": "Tecnologias usadas no site atual: Next.js (React), Tailwind CSS e alojamento na Vercel.",
    "projects.robo.overlay": "Website de produto em Next.js publicado em producao com UX responsiva e estrutura orientada a conversao.",
    "projects.robo.title": "RoboCollective.ai",
    "projects.robo.summary": "Projeto React/Next.js em producao que demonstra colaboracao real, entrega responsiva e prontidao para release.",
    "projects.robo.what": "O que fiz: Construí e refinei secções frontend responsivas num ambiente de produto real, em colaboracao com stakeholders e validacao de fluxos criticos antes da release.",
    "projects.robo.problem": "<strong>Problema:</strong> A plataforma precisava de uma experiencia web credivel para comunicar valor de produto rapidamente.",
    "projects.robo.solution": "<strong>Solucao:</strong> Implementei fluxos de marketing e produto responsivos em Next.js com hierarquia e CTAs mais claros.",
    "projects.robo.outcome": "<strong>Resultado:</strong> Publiquei paginas prontas para producao que melhoraram a clareza e suportaram objetivos de negocio.",
    "projects.robo.proof": "Stack: Next.js, React, Tailwind CSS, Vercel.",
    "projects.robo.description": "Tecnologias usadas no site atual: Next.js (React), Tailwind CSS e alojamento na Vercel.",
    "projects.legal.overlay": "Website público em Next.js com componentes React, estilos modulares e publicação na Vercel.",
    "projects.legal.title": "Legal Ventures Institute",
    "projects.legal.summary": "Website público em Next.js que apresenta serviços de inovação legal com caminhos claros de conversão.",
    "projects.legal.what": "O que fiz: Construí secções React responsivas num código Next.js, melhorando hierarquia de conteúdo, apresentação de serviços e fluxo de contacto. Adicionei testes manuais de regressão e cobertura de smoke tests com Selenium nos principais caminhos de conversão.",
    "projects.legal.problem": "<strong>Problema:</strong> A organização precisava de uma forma clara e credível de apresentar serviços online.",
    "projects.legal.solution": "<strong>Solução:</strong> Estruturei secções responsivas em Next.js e melhorei a navegação entre serviços e contacto.",
    "projects.legal.outcome": "<strong>Resultado:</strong> Entreguei um site mais limpo e fácil de navegar para potenciais clientes.",
    "projects.legal.description": "Tecnologias usadas no site atual: Next.js (React), CSS Modules e alojamento na Vercel.",
    "projects.space.overlay": "Website venture em Next.js com componentes React, Tailwind CSS e publicação na Vercel.",
    "projects.space.title": "Space Ventures Institute",
    "projects.space.summary": "Website em Next.js para o Space Ventures Institute, focado em legibilidade e navegação estruturada.",
    "projects.space.what": "O que fiz: Desenvolvi interfaces React responsivas num código Next.js + Tailwind para conteúdo focado em venture e navegação clara. Validei releases com QA manual responsivo e smoke tests com Selenium nas jornadas essenciais do website.",
    "projects.space.problem": "<strong>Problema:</strong> Conteúdo complexo de venture e inovação precisava de melhor estrutura para os utilizadores.",
    "projects.space.solution": "<strong>Solução:</strong> Construí layouts responsivos em Next.js com secções de conteúdo mais claras e pistas de navegação.",
    "projects.space.outcome": "<strong>Resultado:</strong> Melhorei legibilidade e descoberta de conteúdo em diferentes tamanhos de ecrã.",
    "projects.space.description": "Tecnologias usadas no site atual: Next.js (React), Tailwind CSS e alojamento na Vercel.",
    "projects.tarrl.overlay": "Laboratorio remoto-first de Embodied AI e venture playground para colaboracao aberta em robotica.",
    "projects.tarrl.title": "TARRL",
    "projects.tarrl.summary": "Website publico do Texas Advanced Robotics Research Lab com foco em tracks de investigacao remota e candidaturas.",
    "projects.tarrl.what": "O que fiz: Estruturei e refinei secoes frontend responsivas para comunicar a missao da TARRL, os research tracks e o fluxo de candidatura com hierarquia clara para candidatos globais.",
    "projects.tarrl.problem": "<strong>Problema:</strong> O acesso a oportunidades avancadas em robotica e IA costuma ficar limitado por laboratorios fechados, financiamento ou geografia.",
    "projects.tarrl.solution": "<strong>Solucao:</strong> Criei uma experiencia web remote-first clara, explicando o modelo open-source, para quem e e como candidatar-se.",
    "projects.tarrl.outcome": "<strong>Resultado:</strong> Entreguei uma presenca digital mais forte que ajuda investigadores qualificados a entender rapidamente o programa e agir.",
    "projects.tarrl.description": "Foco do site: Embodied AI, robotica open-source e colaboracao remote-first.",
    "projects.mechanic.overlay": "Modelo de base de dados relacional para oficina mecânica com fluxo de clientes, veículos, serviços e peças.",
    "projects.mechanic.title": "Mechanic Data Base",
    "projects.mechanic.summary": "Projeto de esquema de base de dados desenhado para organizar operações de oficina, histórico de serviços e gestão de peças/fornecedores.",
    "projects.mechanic.what": "O que fiz: Modelei o esquema relacional completo, defini restrições de chave primária e estrangeira, e mapeei relações entre entidades para manter consistentes os dados de clientes, veículos, folhas de obra e inventário.",
    "projects.mechanic.problem": "<strong>Problema:</strong> Os dados da oficina estavam distribuídos por registos desconectados, dificultando o controlo de serviços e peças.",
    "projects.mechanic.solution": "<strong>Solução:</strong> Desenhei um esquema SQL normalizado com tabelas ligadas para clientes, veículos, folhas de obra, serviços, mecânicos e fornecedores.",
    "projects.mechanic.outcome": "<strong>Resultado:</strong> Criei uma estrutura de dados clara e escalável que melhora a rastreabilidade do histórico de manutenção, stock e preços de serviço.",
    "projects.mechanic.description": "Diagrama ER e modelo relacional para gestão de dados de uma oficina mecânica.",
    "projects.bakery.overlay": "Modelo de base de dados relacional para pastelaria com fluxo de clientes, encomendas, produtos, ingredientes e stock.",
    "projects.bakery.title": "Bakery Data Base",
    "projects.bakery.summary": "Projeto de esquema de base de dados para operações de pastelaria, ligando clientes, encomendas, produtos, receitas e inventário.",
    "projects.bakery.what": "O que fiz: Desenhei o esquema relacional, defini restrições de chave primária e estrangeira, e mapeei relações entre encomenda e produção para manter consistentes os dados da pastelaria.",
    "projects.bakery.problem": "<strong>Problema:</strong> Vendas, receitas e registos de stock da pastelaria estavam desconectados, dificultando a rastreabilidade.",
    "projects.bakery.solution": "<strong>Solução:</strong> Construí um esquema SQL normalizado que liga clientes, encomendas, produtos, ingredientes, fornecedores e movimentos de inventário.",
    "projects.bakery.outcome": "<strong>Resultado:</strong> Entreguei um modelo de dados claro que melhora o acompanhamento operacional, o planeamento e os relatórios dos fluxos da pastelaria.",
    "projects.bakery.description": "Diagrama ER e modelo relacional para operações de pastelaria e fluxo de inventário.",
    "projects.actions.live": "Online",
    "projects.actions.code": "Código",
    "projects.actions.viewCode": "Ver Código",
    "projects.actions.codeRequest": "Código mediante pedido",
    "projects.actions.demo": "Demonstração",
    "projects.actions.viewSite": "Ver site",
    "projects.privateRepoNote": "Repositório privado. Contribuição frontend disponível mediante pedido.",
    "projects.other.heading": "Outros Projetos",
    "projects.other.intro": "Trabalho adicional mantido visivel para conversas especificas da funcao e analise mais detalhada do portefolio.",
    "projects.other.responsive": "Portfolio Responsivo",
    "projects.other.robo": "RoboCollective.ai",
    "projects.other.robo.note": "Contribuicao para website de produto em ambiente React/Next.js.",
    "projects.other.mood": "MoodChanger.ai",
    "projects.other.mood.note": "Seccoes responsivas de produto e marketing num site Next.js.",
    "projects.other.legal": "Legal Ventures Institute",
    "projects.other.legal.note": "Website publico em Next.js com apresentacao de servicos e fluxo de contacto.",
    "projects.other.ui": "Mostruario de Componentes UI",
    "projects.other.ui.note": "Padroes de UI reutilizaveis com HTML, CSS e JavaScript responsivos.",
    "projects.other.space": "Space Ventures Institute",
    "projects.other.space.note": "Seccoes e navegacao responsivas para website orientado a venture.",
    "projects.other.caipo": "CAIPO.ai",
    "projects.other.caipo.note": "Seccoes frontend para comunicar produto wearable e developer kit.",
    "projects.other.tarrl": "TARRL",
    "projects.other.tarrl.note": "Website de laboratorio remote-first com conteudo claro sobre programa e candidaturas.",
    "projects.other.todo": "App de Tarefas",
    "projects.other.todo.note": "Fluxo de tarefas em React + TypeScript com Firebase e Google Auth.",
    "projects.other.mechanic": "Base de Dados de Oficina",
    "projects.other.mechanic.note": "Modelo SQL relacional para clientes, veiculos, servicos e pecas de oficina.",
    "projects.other.bakery": "Base de Dados de Padaria",
    "projects.other.bakery.note": "Modelo SQL relacional para encomendas, produtos, ingredientes e stock de padaria.",
    "figma.heading": "Designs em Figma",
    "figma.intro": "Exploracoes de design ligadas a trabalho real de frontend. Os links publicos de Figma podem ser adicionados aqui quando cada caso estiver finalizado.",
    "figma.nextpath.status": "Em progresso",
    "figma.nextpath.title": "Wireframes do Dashboard DevFlow Hub",
    "figma.nextpath.summary": "Exploracao de layout e hierarquia para a experiencia de dashboard full-stack do DevFlow Hub.",
    "figma.nextpath.proof": "O que mostra: agrupamento de secoes, leitura rapida do dashboard e estrutura pronta para componentes.",
    "figma.nextpath.todo": "TODO: Adicionar URL publica do ficheiro Figma deste caso.",
    "figma.clinica.status": "Projeto Figma",
    "figma.clinica.title": "UI de Login Clínica Médica",
    "figma.clinica.summary": "Planeamento de interface para um fluxo de login de gestao clinica com acesso por perfil e orientacao clara de conta.",
    "figma.clinica.proof": "O que mostra: hierarquia de formulario, UI de saude orientada para confianca e um ecra de autenticacao limpo.",
    "figma.clinica.todo": "TODO: Adicionar URL publica do ficheiro Figma deste caso.",
    "figma.portfolio.status": "Suporte ao website publicado",
    "figma.portfolio.title": "Planeamento UI do Portfolio",
    "figma.portfolio.summary": "Planeamento de design ligado a hierarquia de conteudo, posicao de CTAs e decisoes de layout responsivo.",
    "figma.portfolio.proof": "O que mostra: pensamento design-to-code e planeamento de interface pronto para browser.",
    "figma.portfolio.todo": "TODO: Adicionar URL publica do ficheiro Figma deste caso.",
    "figma.system.status": "Notas de design system",
    "figma.system.title": "Componentes e Style Tokens",
    "figma.system.summary": "Estudos continuos de espacamento, tipografia e componentes reutilizaveis para melhorar consistencia.",
    "figma.system.proof": "O que mostra: bases praticas para implementacao UI escalavel.",
    "figma.system.todo": "TODO: Adicionar URL publica do ficheiro Figma deste caso.",
    "figma.restaurant.status": "Projeto Figma",
    "figma.restaurant.title": "Projeto Figma Sistema de Restaurante",
    "figma.restaurant.summary": "Planeamento de interface para um sistema de gestao de restaurante com pedidos, menus, mesas e fluxos de trabalho da equipa.",
    "figma.restaurant.proof": "O que mostra: fluxos de utilizador, gestao de mesas, estrutura de menu e ecras prontos para componentes.",
    "figma.restaurant.todo": "TODO: Adicionar URL publica do ficheiro Figma deste caso.",
    "figma.actions.request": "Pedir walkthrough",
    "skillsMap.heading": "Competencias por Projeto",
    "skillsMap.intro": "Mapa rapido entre competencias tecnicas e evidencia concreta em projetos.",
    "skillsMap.frontend.title": "Frontend e UI",
    "skillsMap.frontend.0": "<strong>React/TypeScript:</strong> DevFlow Hub",
    "skillsMap.frontend.1": "<strong>HTML/CSS:</strong> Portefolio Responsivo, Mostruario de Componentes UI",
    "skillsMap.frontend.2": "<strong>JavaScript/TypeScript:</strong> Interacoes do portefolio, conceito DevFlow Hub, contexto da App de Tarefas",
    "skillsMap.frontend.3": "<strong>Design responsivo:</strong> Portefolio e seccoes UI para multiplos dispositivos",
    "skillsMap.design.title": "Design e UX",
    "skillsMap.design.0": "<strong>Figma/UI/UX:</strong> Planeamento DevFlow Hub, estrutura do portefolio, decisoes de layout orientadas por componentes",
    "skillsMap.design.1": "<strong>Hierarquia visual:</strong> Seccoes de dashboard e fluxo de conteudo orientado para recrutadores",
    "skillsMap.design.2": "<strong>Bases de acessibilidade:</strong> Estrutura semantica, interacoes por teclado e decisoes de contraste",
    "skillsMap.software.title": "Software e QA",
    "skillsMap.software.0": "<strong>C:</strong> Tic-Tac-Toe (logica modular, condicoes, estado do jogo)",
    "skillsMap.software.1": "<strong>Java:</strong> Indicado nas bases tecnicas e no percurso de formacao",
    "skillsMap.software.2": "<strong>Bases de Python/QA:</strong> API QA Test Suite com validacao e reporting",
    "skillsMap.software.3": "<strong>Conceitos de integracao REST API:</strong> Validacao de API em QA e contexto de projetos frontend",
    "roleVersions.heading": "Versoes de Portfolio por Funcao",
    "roleVersions.intro": "Escolhe a versao de portfolio e CV que melhor corresponde a conversa sobre a funcao.",
    "roleVersions.general.title": "Versao General IT / Software",
    "roleVersions.general.desc": "Adaptada a oportunidades junior de frontend, desenvolvimento de software, desenvolvimento web e QA/testes.",
    "roleVersions.general.portfolio": "Abrir versao do portfolio",
    "roleVersions.general.resume": "Abrir CV correspondente",
    "roleVersions.guestcentric.title": "Versao Guestcentric Web Designer",
    "roleVersions.guestcentric.desc": "Adaptada a UI/UX, Figma, HTML/CSS, design responsivo e entrega frontend pronta para browser.",
    "roleVersions.guestcentric.portfolio": "Abrir versao do portfolio",
    "roleVersions.guestcentric.resume": "Abrir CV correspondente",
    "roleVersions.rumos.title": "Versao Rumos Web Developer Lisboa",
    "roleVersions.rumos.desc": "Adaptada a oportunidades junior de web developer e frontend em equipas hibridas em Lisboa.",
    "roleVersions.rumos.portfolio": "Abrir versao do portfolio",
    "roleVersions.rumos.resume": "Abrir CV correspondente",
    "roleVersions.datadog.title": "Versao Datadog Software Engineer",
    "roleVersions.datadog.desc": "Adaptada a conversas para Software Engineer Early Career na Datadog, com foco em frontend engineering.",
    "roleVersions.datadog.portfolio": "Abrir versao do portfolio",
    "roleVersions.datadog.resume": "Abrir CV correspondente",
    "about.eyebrow": "Perfil",
    "about.heading": "Sobre",
    "about.p1": "Venho de um percurso criativo em artes e educacao musical e transitei para UI/UX e frontend. Gosto de construir interfaces visualmente claras, praticas e faceis de usar.",
    "about.p2": "Foco-me em hierarquia visual, layout responsivo, bases de acessibilidade e pensamento de design system, colaborando com developers para manter decisoes prontas para browser.",
    "about.technical.heading": "Competências Técnicas",
    "about.technical.frontend.title": "Frontend",
    "about.technical.frontend.0": "HTML",
    "about.technical.frontend.1": "CSS",
    "about.technical.frontend.2": "JavaScript",
    "about.technical.frontend.3": "Design Web Responsivo",
    "about.technical.frontend.4": "TypeScript",
    "about.technical.frontend.5": "Angular",
    "about.technical.frontend.6": "React",
    "about.technical.frontend.7": "Integracao com REST API",
    "about.technical.design.title": "UI/UX",
    "about.technical.design.0": "Design UI/UX",
    "about.technical.design.1": "Figma",
    "about.technical.design.2": "Interfaces centradas no utilizador",
    "about.technical.tools.title": "Ferramentas e Workflow",
    "about.technical.platforms.title": "Plataformas e Integrações",
    "about.technical.tools.0": "Git / GitHub",
    "about.technical.tools.1": "GitHub Pages",
    "about.technical.tools.2": "GitHub Actions",
    "about.technical.tools.3": "Firebase",
    "about.technical.tools.4": "Google Auth",
    "about.technical.tools.5": "Conceitos de QA",
    "about.technical.tools.6": "Testes manuais",
    "about.technical.tools.7": "React / Next.js",
    "about.technical.tools.8": "Debugging",
    "about.technical.tools.9": "Atencao a usabilidade e detalhe",
    "about.technical.tools.10": "Selenium",
    "about.technical.tools.11": "Vercel",
    "about.technical.tools.12": "OpenCart",
    "about.technical.tools.13": "HubSpot",
    "about.technical.tools.14": "FillOutForms",
    "about.technical.tools.15": "Bases de Codigo Limpo",
    "about.technical.tools.16": "WordPress",
    "about.technical.tools.17": "Design Web Responsivo",
    "about.technical.qa.title": "QA e Testes",
    "about.technical.java.title": "Bases de Programacao",
    "about.technical.java.0": "Java",
    "about.technical.java.1": "C",
    "about.technical.java.2": "Bases de Python",
    "about.technical.java.3": "Logica de programacao",
    "about.technical.data.title": "Bases de Dados e Modelação",
    "about.technical.data.0": "Fundamentos de SQL",
    "about.technical.data.1": "Tecnologias de acesso a base de dados",
    "about.technical.data.2": "SQL / Design de Base de Dados",
    "about.technical.data.3": "PostgreSQL",
    "about.technical.se.title": "Fundamentos de Engenharia de Software",
    "about.technical.se.0": "Programação e algoritmos",
    "about.technical.se.1": "Programação em C/C++ (fundamentos)",
    "about.technical.se.2": "Engenharia de software",
    "about.technical.se.3": "Metodologias de desenvolvimento de software",
    "about.technical.se.4": "IntelliJ IDEA",
    "about.technical.se.5": "Eclipse",
    "about.technical.backend.title": "Backend e Ferramentas",
    "about.technical.backend.0": "Java",
    "about.technical.backend.5": "Python",
    "about.technical.backend.1": "SQL / Design de Base de Dados",
    "about.technical.backend.2": "PostgreSQL",
    "about.technical.backend.3": "IntelliJ IDEA",
    "about.technical.backend.4": "Eclipse",
    "about.technical.key.heading": "Competências-chave",
    "about.technical.key.0": "HTML5",
    "about.technical.key.1": "CSS3",
    "about.technical.key.2": "JavaScript",
    "about.technical.key.3": "Design Web Responsivo",
    "about.technical.key.4": "Design UI/UX",
    "about.technical.key.5": "Vue.js em aprendizagem",
    "about.technical.key.6": "Bases de REST API",
    "about.technical.key.7": "Git / GitHub",
    "about.technical.key.8": "Testes de QA",
    "about.technical.key.9": "Pensamento baseado em componentes",
    "about.skills.heading": "Competências",
    "about.skills.0": "Design UI/UX",
    "about.skills.1": "Desenvolvimento Front-End",
    "about.skills.2": "Garantia de Qualidade",
    "about.skills.3": "Integração de APIs",
    "about.skills.4": "Colaboração e Métodos Ágeis",
    "about.skills.5": "Automação de fluxos de trabalho",
    "about.toolbox": "Ferramentas",
    "strengths.heading": "Pontos Fortes Selecionados",
    "strengths.0": "Desenvolvimento frontend com HTML5, CSS3, JavaScript e layouts responsivos para interfaces claras e acessiveis.",
    "strengths.1": "Execucao UI/UX da estrutura a implementacao, com atencao a usabilidade, consistencia visual e estados de interacao.",
    "strengths.2": "Vue.js como foco ativo de aprendizagem, apoiado por pensamento baseado em componentes vindo de trabalho frontend pratico.",
    "strengths.3": "Bases de REST API, testes de QA e habitos de validacao cuidadosa que ajudam a detetar problemas antes da release.",
    "strengths.4": "Colaboracao, resolucao de problemas e comunicacao clara a partir de trabalho multidisciplinar e transicao de carreira.",
    "strengths.5": "Git/GitHub, GitHub Pages e Vercel para organizar, publicar e manter projetos web.",
    "courses.heading": "Cursos e Certificações",
    "courses.intro": "Formação recente organizada por trilhos de aprendizagem: QA, fundamentos web, programação, Java e bases de dados.",
    "courses.0": "QA e Testes: Fundamentos de Engenharia de Garantia da Qualidade - Udemy (Jul 2025)",
    "courses.1": "QA e Testes: Fundamentos de Testes e Validação de Software - University of Leeds (Jul 2025)",
    "courses.2": "Fundamentos Web: Conceção de websites - IEFP Certification (Fev 2026)",
    "courses.3": "Fundamentos de Programação: Linguagem de Programação Python - Programming Hub (Ago 2025)",
    "courses.4": "Fundamentos de Programação: Programação - Algoritmos - IEFP Certification (Abr 2026)",
    "courses.5": "Desenvolvimento Java: Programação em Java - IEFP Certification (Mar 2026)",
    "courses.6": "Desenvolvimento Java: Fundamentos de linguagem JAVA - IEFP Certification (Mai 2026)",
    "courses.7": "Bases de Dados: Fundamentos da linguagem SQL - IEFP Certification (Mar 2026)",
    "courses.8": "Bases de Dados: Tecnologias de acesso a base de dados - IEFP Certification (Abr 2026)",
    "experience.heading": "Experiência",
    "experience.intro": "Experiencia pratica em produto, cruzando UI/UX, desenvolvimento frontend, QA e colaboracao em equipas multidisciplinares.",
    "experience.when": "Ago 2025 - Presente | Remoto",
    "experience.role": "Estagiaria de Desenvolvimento de Software",
    "experience.org": "FloLabs Innovations Group",
    "experience.p1": "Desenvolvi o Portfolio website e o robocollective.ai de raiz, levando ambos os projetos do conceito a publicacao.",
    "experience.p2": "Entreguei mais de 10 melhorias de UI/UX com HTML, CSS, JavaScript, PHP e TypeScript, apoiei tarefas backend relacionadas com REST/API e reduzi o tempo de resposta a erros em cerca de 20% com QA estruturado.",
    "contact.heading": "Contacto",
    "contact.intro": "Estou aberta a oportunidades junior em frontend, software, UI/UX e contextos com QA, onde implementacao pratica e usabilidade contam em conjunto.",
    "contact.actions.email": "Email",
    "contact.actions.linkedin": "LinkedIn",
    "contact.actions.cv": "Descarregar CV",
    "contact.form.label.name": "Nome",
    "contact.form.label.email": "Email",
    "contact.form.label.message": "Mensagem",
    "contact.form.name": "O teu nome",
    "contact.form.email": "tu@exemplo.com",
    "contact.form.message": "Partilhe a vaga, a equipa, o prazo e em que precisa de apoio.",
    "contact.form.send": "Enviar mensagem",
    "contact.preferEmail": "Prefere contacto por email?",
    "contact.preferWhatsapp": "Prefere contacto por WhatsApp?",
    "contact.alt.github": "GitHub",
    "contact.github": "GitHub",
    "contact.status.sending": "A enviar...",
    "contact.status.success": "Mensagem enviada com sucesso.",
    "contact.status.error": "Ocorreu um erro. Tente novamente ou contacte por email.",
    "footer.home": "Início",
    "footer.projects": "Projetos",
    "footer.about": "Sobre",
    "footer.experience": "Experiência",
    "footer.contact": "Contacto",
    "footer.meta": "Daniela Almeida | Desenvolvido com HTML, CSS e JavaScript | Publicado no GitHub Pages",
    "theme.switchToLight": "Mudar para tema claro",
    "theme.switchToDark": "Mudar para tema escuro",
    "toTop.label": "Topo",
    "toTop.aria": "Voltar ao topo",
    "lang.next.aria": "Mudar idioma para inglês",
  },
};

let currentLanguage = getStoredValue(LANGUAGE_KEY);
if (currentLanguage !== LANG_EN && currentLanguage !== LANG_PT) {
  currentLanguage = LANG_EN;
}

// Lookup helper with English fallback.
function t(key) {
  return TRANSLATIONS[currentLanguage]?.[key] ?? TRANSLATIONS[LANG_EN]?.[key] ?? "";
}

const ORPHAN_TEXT_SELECTOR = ".hero p, .hero li, .section p, .section li, .section .when, .section .where";

// Keep the last two words together to avoid lonely trailing words.
function tightenTrailingWords(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parentTag = node.parentElement?.tagName;
        if (parentTag === "SCRIPT" || parentTag === "STYLE") return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let lastTextNode = null;
  while (walker.nextNode()) {
    lastTextNode = walker.currentNode;
  }
  if (!lastTextNode) return;

  const currentValue = lastTextNode.nodeValue;
  if (!/\S+\s+\S+/.test(currentValue)) return;
  lastTextNode.nodeValue = currentValue.replace(/\s+(\S+)\s*$/u, "\u00A0$1");
}

function applyOrphanControl() {
  document.querySelectorAll(ORPHAN_TEXT_SELECTOR).forEach((element) => {
    tightenTrailingWords(element);
  });
}

// Keep the theme toggle label aligned with the current theme state.
function setThemeToggleAria(theme) {
  if (!themeToggle) return;
  themeToggle.setAttribute("aria-label", theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark"));
}

// Normalize unknown values to a valid theme.
function normalizeTheme(value) {
  return value === "light" ? "light" : "dark";
}

// Swap the theme icon file for light/dark mode.
function setThemeIcon(theme) {
  if (!themeIcon) return;
  themeIcon.src = theme === "dark" ? THEME_ICONS.dark : THEME_ICONS.light;
}

// Apply theme to the page and sync all toggle states.
function applyTheme(mode) {
  const theme = normalizeTheme(mode);
  document.documentElement.setAttribute("data-theme", theme);
  setStoredValue(THEME_KEY, theme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    setThemeToggleAria(theme);
    themeToggle.classList.toggle("is-dark", theme === "dark");
    themeToggle.classList.toggle("is-light", theme === "light");
  }
  setThemeIcon(theme);
}

const saved = getStoredValue(THEME_KEY);
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = saved === "light" || saved === "dark" ? saved : prefersLight ? "light" : "dark";
applyTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
});

// Keep fixed topbar from overlapping content.
const topbar = document.querySelector(".topbar");
const syncTopbarOffset = () => {
  if (!topbar) return;
  const height = Math.ceil(topbar.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--topbar-height", `${height}px`);
};
syncTopbarOffset();
window.addEventListener("resize", syncTopbarOffset);

// Control mobile navigation open/close state and related ARIA attributes.
function setNavMenu(open) {
  if (!topbar || !navToggle) return;
  const isOpen = Boolean(open);
  topbar.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  navToggle.setAttribute("aria-label", isOpen ? t("nav.menu.close") : t("nav.menu.open"));
  // Recompute fixed-header offset whenever mobile menu expands/collapses.
  requestAnimationFrame(syncTopbarOffset);
}

navToggle?.addEventListener("click", () => {
  const open = !topbar?.classList.contains("menu-open");
  setNavMenu(open);
});

mainNav?.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    setNavMenu(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavMenu(false);
});

document.addEventListener("click", (event) => {
  if (!topbar || !topbar.classList.contains("menu-open")) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (!topbar.contains(target)) setNavMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) setNavMenu(false);
});

const navLinks = Array.from(document.querySelectorAll(".topbar .nav a[href^='#']"));
const navTargets = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    return href ? document.querySelector(href) : null;
  })
  .filter(Boolean);

// Mark the active navigation link for the current section.
function setActiveNavLink(activeId) {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const active = href === `#${activeId}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

// Highlight the nav item that matches the section currently in view.
function updateActiveNavLink() {
  if (!topbar || !navTargets.length) return;
  const doc = document.documentElement;
  const nearPageEnd = window.scrollY + window.innerHeight >= doc.scrollHeight - 4;

  if (nearPageEnd) {
    const lastSection = navTargets[navTargets.length - 1];
    if (lastSection?.id) setActiveNavLink(lastSection.id);
    return;
  }

  const currentY = window.scrollY + topbar.offsetHeight + 26;
  let activeId = "";

  navTargets.forEach((section) => {
    if (section.offsetTop <= currentY) activeId = section.id;
  });

  if (!activeId) {
    navLinks.forEach((link) => {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    });
    return;
  }

  setActiveNavLink(activeId);
}

window.addEventListener("scroll", updateActiveNavLink, { passive: true });
window.addEventListener("resize", updateActiveNavLink);
updateActiveNavLink();

// === Back-to-top ===
const toTop = document.getElementById("to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 420) toTop?.classList.add("show");
  else toTop?.classList.remove("show");
});
toTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// Reuse one translation pass for text, HTML, and placeholders.
function applyI18nAttribute(attributeName, applyValue) {
  document.querySelectorAll(`[${attributeName}]`).forEach((el) => {
    const key = el.getAttribute(attributeName);
    if (!key) return;
    const value = t(key);
    if (!value) return;
    applyValue(el, value);
  });
}

// Apply all localized labels and content for the selected language.
function applyTranslations(language) {
  currentLanguage = language === LANG_PT ? LANG_PT : LANG_EN;
  setStoredValue(LANGUAGE_KEY, currentLanguage);
  document.documentElement.lang = currentLanguage === LANG_PT ? "pt-PT" : "en";

  applyI18nAttribute("data-i18n", (el, value) => {
    el.textContent = value;
  });
  applyI18nAttribute("data-i18n-html", (el, value) => {
    el.innerHTML = value;
  });
  applyI18nAttribute("data-i18n-placeholder", (el, value) => {
    el.setAttribute("placeholder", value);
  });

  if (contactCvLink) {
    const fallbackHref = contactCvLink.getAttribute("href") || "";
    const href =
      currentLanguage === LANG_PT
        ? contactCvLink.getAttribute("data-cv-pt") || fallbackHref
        : contactCvLink.getAttribute("data-cv-en") || fallbackHref;
    contactCvLink.setAttribute("href", href);
  }

  if (langToggle) {
    langToggle.textContent = currentLanguage === LANG_PT ? "EN" : "PT-PT";
    langToggle.setAttribute("aria-label", t("lang.next.aria"));
  }

  if (navToggle) {
    const menuOpen = topbar?.classList.contains("menu-open");
    navToggle.setAttribute("aria-label", menuOpen ? t("nav.menu.close") : t("nav.menu.open"));
  }

  if (toTop) {
    toTop.textContent = t("toTop.label");
    toTop.setAttribute("aria-label", t("toTop.aria"));
  }

  setThemeToggleAria(document.documentElement.getAttribute("data-theme") || "dark");
  applyOrphanControl();
}

langToggle?.addEventListener("click", () => {
  applyTranslations(currentLanguage === LANG_PT ? LANG_EN : LANG_PT);
});

applyTranslations(currentLanguage);

// === Clickable project cards (mouse only on non-interactive regions) ===
document.querySelectorAll(".card[data-href], .card-link[data-href]").forEach((wrapper) => {
  const target = wrapper.matches(".card") ? wrapper : wrapper.querySelector(".card");
  if (!target) return;

  const isNestedInteractiveTarget = (eventTarget) => {
    if (!(eventTarget instanceof Element)) return false;
    const interactive = eventTarget.closest("a, button, input, textarea, select, summary, [contenteditable='true']");
    return Boolean(interactive && interactive !== target);
  };

  const open = () => {
    const url = wrapper.getAttribute("data-href");
    if (url) window.open(url, "_blank", "noopener");
  };

  target.addEventListener("click", (e) => {
    if (isNestedInteractiveTarget(e.target)) return;
    open();
  });

  target.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (isNestedInteractiveTarget(e.target)) return;
    if (e.key === " ") e.preventDefault();
    open();
  });
});

// === Dot grid background (hero) ===
const dotGrid = document.querySelector(".dot-grid");
if (dotGrid) {
  const canvas = dotGrid.querySelector(".dot-grid__canvas");
  const ctx = canvas?.getContext("2d");
  const hero = dotGrid.closest(".hero") || dotGrid;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const parseColor = (value, fallback) => {
    const safe = fallback || { r: 107, g: 123, b: 255, a: 1 };
    if (!value) return safe;
    const raw = value.trim();
    const hexMatch = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hexMatch) {
      const hex = hexMatch[1];
      const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
      return {
        r: parseInt(full.slice(0, 2), 16),
        g: parseInt(full.slice(2, 4), 16),
        b: parseInt(full.slice(4, 6), 16),
        a: 1,
      };
    }
    const rgbMatch = raw.match(/rgba?\(([^)]+)\)/i);
    if (rgbMatch) {
      const parts = rgbMatch[1].split(",").map((part) => part.trim());
      const toChannel = (input) => {
        if (input.endsWith("%")) return Math.round((parseFloat(input) / 100) * 255);
        return parseFloat(input);
      };
      return {
        r: toChannel(parts[0]),
        g: toChannel(parts[1]),
        b: toChannel(parts[2]),
        a: parts[3] === undefined ? 1 : parseFloat(parts[3]),
      };
    }
    return safe;
  };

  const readNumber = (styles, name, fallback) => {
    const raw = styles.getPropertyValue(name).trim();
    if (!raw) return fallback;
    const value = parseFloat(raw);
    return Number.isFinite(value) ? value : fallback;
  };

  if (ctx && hero) {
    const state = {
      width: 0,
      height: 0,
      dots: [],
      mouse: { x: -9999, y: -9999, vx: 0, vy: 0, speed: 0, lastX: 0, lastY: 0, lastTime: 0 },
      base: parseColor("#6b7bff"),
      active: parseColor("#6b7bff"),
      dotSize: 3,
      gap: 26,
    };

    const settings = {
      proximity: 140,
      speedTrigger: 350,
      shockRadius: 220,
      shockStrength: 0.6,
      maxSpeed: 1400,
      damping: 0.88,
      spring: 0.08,
    };

    const updateFromStyles = () => {
      const styles = getComputedStyle(dotGrid);
      state.dotSize = readNumber(styles, "--dot-grid-size", state.dotSize);
      state.gap = readNumber(styles, "--dot-grid-gap", state.gap);
      state.base = parseColor(styles.getPropertyValue("--dot-grid-color"), state.base);
      state.active = parseColor(styles.getPropertyValue("--dot-grid-active"), state.active);
    };

    const buildGrid = () => {
      state.dots = [];
      const spacing = state.dotSize + state.gap;
      const cols = Math.floor((state.width + state.gap) / spacing);
      const rows = Math.floor((state.height + state.gap) / spacing);
      const gridWidth = cols * spacing - state.gap;
      const gridHeight = rows * spacing - state.gap;
      const startX = (state.width - gridWidth) / 2 + state.dotSize / 2;
      const startY = (state.height - gridHeight) / 2 + state.dotSize / 2;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          state.dots.push({
            x: startX + x * spacing,
            y: startY + y * spacing,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const resize = () => {
      updateFromStyles();
      const rect = dotGrid.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = state.width * dpr;
      canvas.height = state.height * dpr;
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
      if (prefersReducedMotion) drawFrame();
    };

    const mix = (from, to, t) => ({
      r: Math.round(from.r + (to.r - from.r) * t),
      g: Math.round(from.g + (to.g - from.g) * t),
      b: Math.round(from.b + (to.b - from.b) * t),
      a: from.a + (to.a - from.a) * t,
    });

    const applyImpulse = (dot, fx, fy) => {
      if (!Number.isFinite(fx) || !Number.isFinite(fy)) return;
      dot.vx += fx;
      dot.vy += fy;
    };

    const onPointerMove = (event) => {
      const rect = dotGrid.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const now = performance.now();
      const elapsed = state.mouse.lastTime ? now - state.mouse.lastTime : 16;
      const dt = elapsed > 0 ? elapsed : 16;
      const rawVx = ((x - state.mouse.lastX) / dt) * 1000;
      const rawVy = ((y - state.mouse.lastY) / dt) * 1000;
      const vx = Number.isFinite(rawVx) ? rawVx : 0;
      const vy = Number.isFinite(rawVy) ? rawVy : 0;
      const speed = Math.hypot(vx, vy);
      const limiter = speed > settings.maxSpeed && speed > 0 ? settings.maxSpeed / speed : 1;
      const limitedVx = vx * limiter;
      const limitedVy = vy * limiter;
      const limitedSpeed = speed * limiter;

      state.mouse.x = x;
      state.mouse.y = y;
      state.mouse.vx = Number.isFinite(limitedVx) ? limitedVx : 0;
      state.mouse.vy = Number.isFinite(limitedVy) ? limitedVy : 0;
      state.mouse.speed = Number.isFinite(limitedSpeed) ? limitedSpeed : 0;
      state.mouse.lastX = x;
      state.mouse.lastY = y;
      state.mouse.lastTime = now;

      if (state.mouse.speed > settings.speedTrigger) {
        const influence = Math.min(state.mouse.speed / settings.speedTrigger, 2);
        const impulseScale = 0.0025 * influence;
        for (const dot of state.dots) {
          const dx = dot.x - state.mouse.x;
          const dy = dot.y - state.mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < settings.proximity) {
            const falloff = 1 - dist / settings.proximity;
            applyImpulse(dot, state.mouse.vx * impulseScale * falloff, state.mouse.vy * impulseScale * falloff);
          }
        }
      }
    };

    const onPointerLeave = () => {
      state.mouse.x = -9999;
      state.mouse.y = -9999;
      state.mouse.speed = 0;
    };

    const onClick = (event) => {
      const rect = dotGrid.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      for (const dot of state.dots) {
        const dx = dot.x - x;
        const dy = dot.y - y;
        const dist = Math.hypot(dx, dy);
        if (dist < settings.shockRadius && dist > 0) {
          const force = (1 - dist / settings.shockRadius) * settings.shockStrength;
          applyImpulse(dot, (dx / dist) * force, (dy / dist) * force);
        }
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, state.width, state.height);
      for (const dot of state.dots) {
        dot.vx += -dot.ox * settings.spring;
        dot.vy += -dot.oy * settings.spring;
        dot.vx *= settings.damping;
        dot.vy *= settings.damping;
        dot.ox += dot.vx;
        dot.oy += dot.vy;

        const dx = dot.x - state.mouse.x;
        const dy = dot.y - state.mouse.y;
        const dist = Math.hypot(dx, dy);
        const t = dist < settings.proximity ? 1 - dist / settings.proximity : 0;
        const blended = mix(state.base, state.active, t);
        ctx.fillStyle = `rgba(${blended.r}, ${blended.g}, ${blended.b}, ${blended.a})`;
        ctx.beginPath();
        ctx.arc(dot.x + dot.ox, dot.y + dot.oy, state.dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let rafId = null;
    const animate = () => {
      drawFrame();
      rafId = requestAnimationFrame(animate);
    };

    resize();

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(dotGrid);
    else window.addEventListener("resize", resize);

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    hero.addEventListener("click", onClick);

    const themeObserver = new MutationObserver(() => {
      updateFromStyles();
      if (prefersReducedMotion) drawFrame();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(animate);
    } else {
      drawFrame();
    }

    window.addEventListener("beforeunload", () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeEventListener("click", onClick);
    });
  }
}

// === Contact form confirmation ===
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    contactStatus.classList.remove("success", "error");
    contactStatus.textContent = t("contact.status.sending");
    submitButton?.setAttribute("disabled", "disabled");

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        contactStatus.textContent = t("contact.status.success");
        contactStatus.classList.add("success");
        contactForm.reset();
      } else {
        contactStatus.textContent = t("contact.status.error");
        contactStatus.classList.add("error");
      }
    } catch (error) {
      contactStatus.textContent = t("contact.status.error");
      contactStatus.classList.add("error");
    } finally {
      submitButton?.removeAttribute("disabled");
    }
  });
}

// === Scroll reveal ===
const sections = document.querySelectorAll("section");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (sections.length && !prefersReducedMotion && "IntersectionObserver" in window) {
  document.body.classList.add("reveal-on-scroll");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
} else {
  // Fallback: keep sections visible when reveal animation cannot run.
  sections.forEach((section) => section.classList.add("visible"));
}
