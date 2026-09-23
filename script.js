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
const portfolioScriptUrl =
  document.currentScript?.src ||
  document.querySelector('script[src*="script.js"]')?.src ||
  window.location.href;

const THEME_ICONS = {
  // Keep this mapping explicit because legacy file names are inverted.
  light: new URL("assets/dark.png", portfolioScriptUrl).href,
  dark: new URL("assets/light.png", portfolioScriptUrl).href,
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

// Generated profile copy from resume/data/base.mjs; run npm run build:profile.
const TRANSLATIONS = {
  [LANG_EN]: {
  "nav.projects": "Projects",
  "nav.figma": "UI/UX",
  "nav.about": "About",
  "nav.experience": "Experience",
  "nav.contact": "Contact",
  "nav.menu.open": "Open navigation",
  "nav.menu.close": "Close navigation",
  "topbar.cv": "CV",
  "topbar.github": "GitHub",
  "hero.kicker": "Software Developer / Front-End Developer in training",
  "hero.title": "Daniela Torres Almeida",
  "hero.lead": "I build web interfaces and APIs with React, TypeScript and Java/Spring Boot, drawing on practical startup experience and completed Java training.",
  "hero.cta.work": "View Projects",
  "hero.cta.contact": "Contact Me",
  "hero.highlights.0.title": "Practical experience",
  "hero.highlights.0.text": "Front-end interfaces, APIs and automation in a technology startup.",
  "hero.highlights.1.title": "Current training",
  "hero.highlights.1.text": "CESAE Digital · Software Developer · 22 September 2026 - 20 May 2027.",
  "hero.highlights.2.title": "Next step · 2027",
  "hero.highlights.2.text": "400-hour curricular internship, scheduled 1 March - 20 May, with interest in continuing as a Junior Developer.",
  "coreStack.heading": "Technical skills backed by practical work",
  "coreStack.note": "Core technologies are demonstrated in selected projects. Additional experience is listed separately; no arbitrary proficiency scores.",
  "coreStack.frontend.title": "Core · Front-End",
  "projects.heading": "Selected projects",
  "projects.intro": "Four projects showing full-stack implementation, front-end quality and programming fundamentals. Technical details and known limitations are documented in their repositories.",
  "projects.portfolio.status": "Published portfolio",
  "projects.portfolio.demonstrates": "Semantic HTML, accessible interaction and frontend quality workflows.",
  "figma.heading": "UI/UX as a development complement",
  "figma.intro": "I use UI/UX thinking and Figma to support interface structure, responsive layouts and usability decisions. The selected projects above show how those decisions translate into code.",
  "about.heading": "About",
  "courses.heading": "Software Development training",
  "experience.heading": "Experience",
  "contact.heading": "Contact",
  "contact.intro": "Let’s discuss a 400-hour Software Development curricular internship scheduled for 1 March - 20 May 2027, and the possibility of continuing as a Junior Developer if it is a good fit for both sides.",
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
  "hero.cta.cv": "View Resume / CV",
  "coreStack.backend.title": "Core · Backend & data",
  "coreStack.engineering.title": "Core · Engineering foundations",
  "coreStack.additional.title": "Additional experience",
  "projects.devflow.status": "Phase 2 validated in PR #53 · merge pending",
  "projects.devflow.objective": "Manage projects, tasks and team access in a full-stack web application.",
  "projects.devflow.contribution": "Implemented a React/TypeScript client, a Spring Boot REST API and PostgreSQL persistence, with automated backend/frontend validation.",
  "projects.devflow.feature.0": "JWT authentication and project/task workflows",
  "projects.devflow.feature.1": "System roles and project memberships",
  "projects.devflow.feature.2": "Document resource authorization",
  "projects.devflow.feature.3": "Automated tests, CI and reproducible local demo",
  "projects.devflow.demonstrates": "API design, persistence, authorization rules and regression testing.",
  "projects.review": "Validated Phase 2 PR",
  "projects.portfolio.objective": "Present professional experience and technical work in an accessible web portfolio.",
  "projects.portfolio.contribution": "Designed and implemented the responsive interface, bilingual content and browser interactions, with automated checks.",
  "projects.portfolio.feature.0": "Responsive layouts and keyboard navigation",
  "projects.portfolio.feature.1": "English/Portuguese and light/dark themes",
  "projects.portfolio.feature.2": "Unit, accessibility, Selenium and visual checks",
  "projects.todo.status": "Source available",
  "projects.todo.objective": "Organise personal tasks with authentication and calendar integration.",
  "projects.todo.contribution": "Implemented React/TypeScript task flows with Firebase authentication, synchronisation and Google Calendar integration.",
  "projects.todo.feature.0": "Authenticated task management",
  "projects.todo.feature.1": "Task synchronisation",
  "projects.todo.feature.2": "Google Calendar integration and logic tests",
  "projects.todo.demonstrates": "State management, external services and tested task logic.",
  "projects.penguin.status": "Academic C project · local execution",
  "projects.penguin.objective": "Build a terminal game around player choices and progression.",
  "projects.penguin.contribution": "Implemented a modular C game with explicit state, input validation and scoring and game-state logic.",
  "projects.penguin.feature.0": "Modular game logic",
  "projects.penguin.feature.1": "Validated terminal input",
  "projects.penguin.feature.2": "State and session progression",
  "projects.penguin.demonstrates": "Programming fundamentals, control flow and decomposition.",
  "about.story": "After working in music education, hospitality and language-related work, I moved into software development and gained practical experience in a technology startup. I completed the IEFP Java programming pathway in July 2026 and build React/TypeScript and Java/Spring projects. UI/UX supports my implementation and usability decisions. I am currently completing the CESAE Digital Software Developer programme (22 September 2026 - 20 May 2027), with a curricular internship from 1 March to 20 May 2027 and the goal of progressing to a Junior Developer role.",
  "training.description": "Software Developer · CESAE Digital · PRO_MOV by Reskilling4Employment. In progress: 22 Sep 2026 - 20 May 2027. 1050h total: 50h transversal skills, 600h technical training and 400h FPCT (curricular internship), scheduled for 1 Mar - 20 May 2027.",
  "training.demonstrated.title": "Already demonstrated",
  "training.demonstrated.body": "React/TypeScript, Java/Spring Boot, REST APIs, SQL, C, Git, testing and CI are evidenced by the selected projects.",
  "training.developing.title": "Currently developing",
  "training.developing.body": "Strengthening architecture, testing and accessible interfaces through practical projects.",
  "training.expected.title": "Expected before internship",
  "training.expected.body": "CESAE training is scheduled through 28 February 2027, including web development, QA, UML and Android/iOS modules. These are planned learning outcomes, not completed training.",
  "training.additional": "IEFP · Conceção de Web sites (UFCD 7903), 25h, completed March 2026. UI/UX and Figma complement practical interface development.",
  "experience.flolabs.dates": "Aug 2025 - Sep 2026",
  "experience.flolabs.role": "Software Development Intern",
  "experience.flolabs.bullet.0": "Contributed to front-end interfaces and UI/UX implementation using HTML, CSS, JavaScript and TypeScript.",
  "experience.flolabs.bullet.1": "Worked with APIs, automation and integrations, including exposure to Python/FastAPI, alongside a technology team.",
  "experience.flolabs.bullet.2": "Supported testing and documentation of implementation work.",
  "experience.llm.dates": "Aug 2024 - Sep 2026",
  "experience.llm.role": "LLM Trainer · Portuguese & English",
  "experience.llm.bullet.0": "Reviewed AI-generated prompts and responses for linguistic accuracy and cultural relevance.",
  "experience.previous.dates": "2016 - 2025",
  "experience.previous.role": "Earlier experience",
  "experience.previous.bullet.0": "Music educator (2018-2025); cook and baker roles (2016-2018). Experience in communication, teamwork and precise execution.",
  "coreStack.frontend.item.0": "React",
  "coreStack.frontend.item.1": "TypeScript",
  "coreStack.frontend.item.2": "JavaScript",
  "coreStack.frontend.item.3": "HTML",
  "coreStack.frontend.item.4": "CSS",
  "coreStack.frontend.item.5": "Responsive interfaces",
  "coreStack.frontend.item.6": "Accessibility",
  "coreStack.backend.item.0": "Java",
  "coreStack.backend.item.1": "Spring Boot",
  "coreStack.backend.item.2": "REST APIs",
  "coreStack.backend.item.3": "JPA",
  "coreStack.backend.item.4": "PostgreSQL",
  "coreStack.backend.item.5": "SQL",
  "coreStack.engineering.item.0": "C",
  "coreStack.engineering.item.1": "Git",
  "coreStack.engineering.item.2": "GitHub",
  "coreStack.engineering.item.3": "Automated testing",
  "coreStack.engineering.item.4": "GitHub Actions / CI",
  "coreStack.additional.item.0": "Python / FastAPI exposure",
  "coreStack.additional.item.1": "Firebase",
  "coreStack.additional.item.2": "Selenium",
  "coreStack.additional.item.3": "External API integration",
  "coreStack.additional.item.4": "Automation",
  "coreStack.additional.item.5": "Figma / UI/UX",
  "experience.flolabs.organisation": "FloLabs Innovations Group · Remote / US startup",
  "experience.llm.organisation": "Remote",
  "projects.portfolio.demoLabel": "Live site",
  "projects.todo.demoLabel": "Open demo · sign-in required for tasks",
  "training.completed.description": "350h · Completed Jul 2026. Java and Java web development, algorithms, C/C++ fundamentals, SQL, database access, software engineering, development methodologies and programming projects."
},
  [LANG_PT]: {
  "nav.projects": "Projetos",
  "nav.figma": "UI/UX",
  "nav.about": "Sobre",
  "nav.experience": "Experiência",
  "nav.contact": "Contacto",
  "nav.menu.open": "Abrir navegação",
  "nav.menu.close": "Fechar navegação",
  "topbar.cv": "CV",
  "topbar.github": "GitHub",
  "hero.kicker": "Software Developer / Front-End Developer em formação",
  "hero.title": "Daniela Torres Almeida",
  "hero.lead": "Desenvolvo interfaces web e APIs com React, TypeScript e Java/Spring Boot, com experiência prática numa startup e formação de Java concluída.",
  "hero.cta.work": "Ver projetos",
  "hero.cta.contact": "Contactar",
  "hero.highlights.0.title": "Experiência prática",
  "hero.highlights.0.text": "Interfaces frontend, APIs e automação numa startup tecnológica.",
  "hero.highlights.1.title": "Formação atual",
  "hero.highlights.1.text": "CESAE Digital · Software Developer · 22 de setembro de 2026 - 20 de maio de 2027.",
  "hero.highlights.2.title": "Próxima etapa · 2027",
  "hero.highlights.2.text": "Estágio curricular de 400 horas, previsto para 1 de março - 20 de maio, com interesse em continuidade como Junior Developer.",
  "coreStack.heading": "Competências técnicas demonstradas na prática",
  "coreStack.note": "As tecnologias principais são demonstradas nos projetos selecionados. A experiência adicional aparece separadamente, sem níveis arbitrários.",
  "coreStack.frontend.title": "Principais · Front-End",
  "projects.heading": "Projetos selecionados",
  "projects.intro": "Quatro projetos que mostram implementação Full-Stack, qualidade frontend e fundamentos de programação. Os detalhes técnicos e limitações conhecidas estão documentados nos repositórios.",
  "projects.portfolio.status": "Portfolio publicado",
  "projects.portfolio.demonstrates": "HTML semântico, interação acessível e validação de qualidade frontend.",
  "figma.heading": "UI/UX como complemento ao desenvolvimento",
  "figma.intro": "Uso princípios de UI/UX e Figma para apoiar a estrutura das interfaces, layouts responsivos e decisões de usabilidade. Os projetos selecionados mostram como essas decisões se traduzem em código.",
  "about.heading": "Sobre mim",
  "courses.heading": "Formação em Software Development",
  "experience.heading": "Experiência",
  "contact.heading": "Contacto",
  "contact.intro": "Podemos conversar sobre um estágio curricular de 400 horas em Software Development, com início previsto para 1 de março - 20 de maio de 2027, e sobre a possibilidade de continuidade como Junior Developer se houver interesse mútuo.",
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
  "hero.cta.cv": "Ver CV",
  "coreStack.backend.title": "Principais · Backend e dados",
  "coreStack.engineering.title": "Principais · Fundamentos de engenharia",
  "coreStack.additional.title": "Experiência adicional",
  "projects.devflow.status": "Fase 2 validada na PR #53 · merge pendente",
  "projects.devflow.objective": "Gerir projetos, tarefas e acesso de equipas numa aplicação web Full-Stack.",
  "projects.devflow.contribution": "Implementei um cliente React/TypeScript, uma API REST Spring Boot e persistência PostgreSQL, com validação automatizada backend/frontend.",
  "projects.devflow.feature.0": "Autenticação JWT e fluxos de projetos/tarefas",
  "projects.devflow.feature.1": "Papéis globais e memberships de projeto",
  "projects.devflow.feature.2": "Autorização de documentos por recurso",
  "projects.devflow.feature.3": "Testes automatizados, CI e demo local reproduzível",
  "projects.devflow.demonstrates": "Desenho de APIs, persistência, regras de autorização e testes de regressão.",
  "projects.review": "PR da Fase 2 validada",
  "projects.portfolio.objective": "Apresentar experiência profissional e trabalho técnico num portfolio web acessível.",
  "projects.portfolio.contribution": "Desenhei e implementei a interface responsiva, conteúdo bilingue e interações no browser, com verificações automatizadas.",
  "projects.portfolio.feature.0": "Layouts responsivos e navegação por teclado",
  "projects.portfolio.feature.1": "Inglês/Português e temas claro/escuro",
  "projects.portfolio.feature.2": "Testes unitários, acessibilidade, Selenium e verificações visuais",
  "projects.todo.status": "Código disponível",
  "projects.todo.objective": "Organizar tarefas pessoais com autenticação e integração de calendário.",
  "projects.todo.contribution": "Implementei fluxos de tarefas em React/TypeScript com autenticação Firebase, sincronização e integração Google Calendar.",
  "projects.todo.feature.0": "Gestão autenticada de tarefas",
  "projects.todo.feature.1": "Sincronização de tarefas",
  "projects.todo.feature.2": "Integração Google Calendar e testes de lógica",
  "projects.todo.demonstrates": "Gestão de estado, serviços externos e lógica de tarefas testada.",
  "projects.penguin.status": "Projeto académico em C · execução local",
  "projects.penguin.objective": "Construir um jogo de terminal com escolhas do jogador e progressão.",
  "projects.penguin.contribution": "Implementei um jogo modular em C com estado explícito, validação de input e pontuação e lógica de estado do jogo.",
  "projects.penguin.feature.0": "Lógica de jogo modular",
  "projects.penguin.feature.1": "Input de terminal validado",
  "projects.penguin.feature.2": "Estado e pontuação e lógica de estado do jogo",
  "projects.penguin.demonstrates": "Fundamentos de programação, controlo de fluxo e decomposição.",
  "about.story": "Depois de trabalhar em educação musical, hotelaria e tarefas linguísticas, passei para o desenvolvimento de software e adquiri experiência prática numa startup tecnológica. Concluí o percurso IEFP de programação em Java em julho de 2026 e desenvolvo projetos React/TypeScript e Java/Spring. UI/UX complementa as decisões de implementação e usabilidade. Frequento atualmente o programa Software Developer do CESAE Digital (22 de setembro de 2026 - 20 de maio de 2027), com estágio curricular de 1 de março a 20 de maio de 2027 e objetivo de progressão para Junior Developer.",
  "training.description": "Software Developer · CESAE Digital · PRO_MOV by Reskilling4Employment. Em curso: 22 set 2026 - 20 mai 2027. 1050h no total: 50h de competências transversais, 600h de formação técnica e 400h de FPCT (estágio curricular), prevista para 1 mar - 20 mai 2027.",
  "training.demonstrated.title": "Já demonstrado",
  "training.demonstrated.body": "React/TypeScript, Java/Spring Boot, APIs REST, SQL, C, Git, testes e CI têm evidência nos projetos selecionados.",
  "training.developing.title": "Em desenvolvimento",
  "training.developing.body": "A aprofundar arquitetura, testes e interfaces acessíveis através de projetos práticos.",
  "training.expected.title": "Previsto antes do estágio",
  "training.expected.body": "A formação CESAE está prevista até 28 de fevereiro de 2027, incluindo desenvolvimento web, QA, UML e módulos Android/iOS. São aprendizagens previstas, não formação concluída.",
  "training.additional": "IEFP · Conceção de Web sites (UFCD 7903), 25h, concluída em março de 2026. UI/UX e Figma complementam o desenvolvimento prático de interfaces.",
  "experience.flolabs.dates": "Ago 2025 - Set 2026",
  "experience.flolabs.role": "Estagiária de Desenvolvimento de Software",
  "experience.flolabs.bullet.0": "Contribuí para interfaces frontend e implementação de UI/UX com HTML, CSS, JavaScript e TypeScript.",
  "experience.flolabs.bullet.1": "Trabalhei com APIs, automação e integrações, incluindo contacto com Python/FastAPI, numa equipa tecnológica.",
  "experience.flolabs.bullet.2": "Apoiei testes e documentação do trabalho de implementação.",
  "experience.llm.dates": "Ago 2024 - Set 2026",
  "experience.llm.role": "LLM Trainer · Português e Inglês",
  "experience.llm.bullet.0": "Revi prompts e respostas gerados por IA quanto à correção linguística e adequação cultural.",
  "experience.previous.dates": "2016 - 2025",
  "experience.previous.role": "Experiência anterior",
  "experience.previous.bullet.0": "Educação musical (2018-2025); funções de cozinha e padaria (2016-2018). Experiência de comunicação, trabalho em equipa e execução rigorosa.",
  "coreStack.frontend.item.0": "React",
  "coreStack.frontend.item.1": "TypeScript",
  "coreStack.frontend.item.2": "JavaScript",
  "coreStack.frontend.item.3": "HTML",
  "coreStack.frontend.item.4": "CSS",
  "coreStack.frontend.item.5": "Interfaces responsivas",
  "coreStack.frontend.item.6": "Acessibilidade",
  "coreStack.backend.item.0": "Java",
  "coreStack.backend.item.1": "Spring Boot",
  "coreStack.backend.item.2": "REST APIs",
  "coreStack.backend.item.3": "JPA",
  "coreStack.backend.item.4": "PostgreSQL",
  "coreStack.backend.item.5": "SQL",
  "coreStack.engineering.item.0": "C",
  "coreStack.engineering.item.1": "Git",
  "coreStack.engineering.item.2": "GitHub",
  "coreStack.engineering.item.3": "Testes automatizados",
  "coreStack.engineering.item.4": "GitHub Actions / CI",
  "coreStack.additional.item.0": "Contacto com Python / FastAPI",
  "coreStack.additional.item.1": "Firebase",
  "coreStack.additional.item.2": "Selenium",
  "coreStack.additional.item.3": "Integração de APIs externas",
  "coreStack.additional.item.4": "Automação",
  "coreStack.additional.item.5": "Figma / UI/UX",
  "experience.flolabs.organisation": "FloLabs Innovations Group · Remoto / startup americana",
  "experience.llm.organisation": "Remoto",
  "projects.portfolio.demoLabel": "Ver website",
  "projects.todo.demoLabel": "Abrir demo · tarefas requerem autenticação",
  "training.completed.description": "350h · Concluído em jul 2026. Java e aplicações web em Java, algoritmos, fundamentos de C/C++, SQL, acesso a bases de dados, engenharia de software, metodologias de desenvolvimento e projetos de programação."
}
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
