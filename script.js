// Footer year
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

const THEME_ICONS = {
  // Keep this mapping explicit because legacy file names are inverted.
  light: "assets/dark.png",
  dark: "assets/light.png",
};

function getStoredValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

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
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.menu.open": "Open navigation",
    "nav.menu.close": "Close navigation",
    "topbar.cv": "CV",
    "topbar.github": "GitHub",
    "hero.kicker": "Portfolio",
    "hero.title": "Hi, I'm <span class=\"accent\">Daniela Torres Almeida</span>",
    "hero.lead": "Frontend Developer focused on React, TypeScript, accessible UI, and responsive web experiences.",
    "hero.cta.work": "View Projects",
    "hero.cta.contact": "Contact Me",
    "hero.highlights.0.title": "Product to production",
    "hero.highlights.0.text": "From UX strategy to front-end implementation and QA validation.",
    "hero.highlights.1.title": "Cross-functional collaboration",
    "hero.highlights.1.text": "Working with international teams across product, design, and research.",
    "hero.highlights.2.title": "Fast, reliable delivery",
    "hero.highlights.2.text": "Rapid prototyping with clean, scalable code and clear documentation.",
    "coreStack.heading": "Core Stack",
    "coreStack.0": "React",
    "coreStack.1": "Next.js",
    "coreStack.2": "TypeScript",
    "coreStack.3": "JavaScript",
    "coreStack.4": "HTML5",
    "coreStack.5": "Tailwind CSS",
    "coreStack.6": "Firebase",
    "coreStack.7": "Python",
    "coreStack.8": "SQL",
    "coreStack.9": "Git/GitHub",
    "coreStack.10": "Selenium",
    "coreStack.11": "Vercel",
    "projects.heading": "Featured Projects",
    "projects.intro": "A curated selection of front-end, QA, and product-driven web projects.",
    "projects.todo.overlay": "React + Firebase to-do app with Google sign-in.",
    "projects.todo.title": "To-Do List App",
    "projects.todo.summary": "Task manager with authentication and persistent, real-time updates.",
    "projects.todo.what": "What I did: Built the frontend interface in React and TypeScript, implemented responsive layouts, and integrated Firebase with Google Auth for a smooth task flow.",
    "projects.todo.problem": "<strong>Problem:</strong> Users needed a simple task manager with authentication and persistent data.",
    "projects.todo.solution": "<strong>Solution:</strong> Built a React + TypeScript app with Firebase and Google Auth.",
    "projects.todo.outcome": "<strong>Outcome:</strong> Delivered a responsive task flow with sign-in and real-time task management.",
    "projects.todo.proof": "Focus: Accessibility, responsiveness, semantic HTML.",
    "projects.todo.description": "React + TypeScript to-do app using Firebase and Google Auth.",
    "projects.portfolio.overlay": "Responsive single-page portfolio with clear navigation and project highlights.",
    "projects.portfolio.title": "Responsive Portfolio",
    "projects.portfolio.summary": "Personal portfolio built to present frontend work with clear navigation.",
    "projects.portfolio.what": "What I did: Built a responsive single-page portfolio, structured reusable sections, and optimized readability and navigation across desktop and mobile. Executed manual website tests (navigation, forms, responsive behavior) and automated Selenium smoke checks on key flows.",
    "projects.portfolio.problem": "<strong>Problem:</strong> Needed a clear personal site to present projects and skills professionally.",
    "projects.portfolio.solution": "<strong>Solution:</strong> Built a responsive single-page portfolio with structured navigation and GitHub Pages deployment.",
    "projects.portfolio.outcome": "<strong>Outcome:</strong> Created a faster, cleaner way for recruiters to review experience and live work.",
    "projects.portfolio.proof": "Built with reusable sections and a mobile-first layout.",
    "projects.meta.default": "Daniela Torres Almeida | Built with HTML/CSS/JS | GitHub Pages",
    "projects.qa.overlay": "Automated API tests with pytest reports and shareable CI-ready output.",
    "projects.qa.title": "API QA Test Suite",
    "projects.qa.summary": "Python API test suite with pytest-html reporting published on GitHub Pages.",
    "projects.qa.what": "What I did: Implemented automated API validation flows in Python with Pytest, generated readable pytest-html reports, and streamlined QA release checks.",
    "projects.qa.problem": "<strong>Problem:</strong> API regressions needed to be detected earlier with clearer reporting.",
    "projects.qa.solution": "<strong>Solution:</strong> Implemented automated API checks with Python + Pytest and generated pytest-html reports.",
    "projects.qa.outcome": "<strong>Outcome:</strong> Enabled faster verification and clearer QA visibility before release updates.",
    "projects.ui.overlay": "Component gallery showcasing reusable UI patterns.",
    "projects.ui.title": "UI Components Showcase",
    "projects.ui.summary": "Reusable UI patterns designed for consistent and scalable interfaces.",
    "projects.ui.what": "What I did: Developed reusable frontend components, added responsive behavior, and refined interactive states for consistency across layouts. Ran manual interaction and accessibility checks plus automated Selenium smoke/regression checks for core component flows.",
    "projects.ui.problem": "<strong>Problem:</strong> Product pages needed reusable UI blocks to reduce duplicated implementation work.",
    "projects.ui.solution": "<strong>Solution:</strong> Built a component showcase with modular HTML, CSS, and JavaScript patterns.",
    "projects.ui.outcome": "<strong>Outcome:</strong> Improved consistency and speed when building new interface sections.",
    "projects.mood.overlay": "Next.js wellness platform built with React, Tailwind CSS, and Vercel deployment.",
    "projects.mood.title": "MoodChanger.ai",
    "projects.mood.summary": "Next.js website for MoodChanger.ai with responsive React sections and clear product messaging.",
    "projects.mood.what": "What I did: Built responsive product and marketing sections in a Next.js + React codebase, refining hierarchy, readability, and conversion flow. Performed manual cross-browser and mobile QA and automated Selenium smoke checks for critical user paths.",
    "projects.mood.problem": "<strong>Problem:</strong> Product information needed to be clearer and easier to scan across devices.",
    "projects.mood.solution": "<strong>Solution:</strong> Implemented responsive Next.js sections with clearer information hierarchy and user flow.",
    "projects.mood.outcome": "<strong>Outcome:</strong> Delivered a clearer interface that better supports user trust and product discovery.",
    "projects.mood.description": "Tech used on the live site: Next.js (React), Tailwind CSS, and Vercel hosting.",
    "projects.robo.overlay": "Next.js storefront and marketing experience with responsive product flows.",
    "projects.robo.title": "RoboCollective.ai",
    "projects.robo.summary": "Next.js-powered robotics storefront with responsive marketing and product pages.",
    "projects.robo.what": "What I did: Built responsive frontend sections, refined information hierarchy, and optimized conversion flow in a React + Next.js environment. Executed manual exploratory website testing and Selenium smoke checks to reduce regressions on key pages.",
    "projects.robo.problem": "<strong>Problem:</strong> The platform needed a clear web presence to communicate product value quickly.",
    "projects.robo.solution": "<strong>Solution:</strong> Developed a responsive landing experience with structured messaging and navigation.",
    "projects.robo.outcome": "<strong>Outcome:</strong> Delivered a clearer, more modern interface aligned with product and growth goals.",
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
    "projects.actions.codeRequest": "Code on request",
    "projects.actions.demo": "Demo",
    "projects.actions.viewSite": "View site",
    "projects.privateRepoNote": "Private repository. Frontend contribution available on request.",
    "about.eyebrow": "Profile",
    "about.heading": "About",
    "about.p1": "I am a frontend developer and UI/UX designer with a strong QA mindset, focused on creating accessible, responsive, and reliable digital products. I work across design, development, and testing to build interfaces that are intuitive for users and maintainable for teams.",
    "about.p2": "Delivered multiple web projects end-to-end, from interface design and implementation to QA validation and deployment.",
    "about.technical.heading": "Technical Skills",
    "about.technical.frontend.title": "Frontend",
    "about.technical.frontend.0": "HTML5",
    "about.technical.frontend.1": "CSS3",
    "about.technical.frontend.2": "JavaScript",
    "about.technical.frontend.3": "React",
    "about.technical.frontend.4": "TypeScript",
    "about.technical.frontend.5": "Next.js",
    "about.technical.design.title": "UI/UX",
    "about.technical.design.0": "Responsive Design",
    "about.technical.design.1": "Accessibility",
    "about.technical.design.2": "Wireframing",
    "about.technical.design.3": "Design Systems",
    "about.technical.design.4": "Figma",
    "about.technical.tools.title": "Tools & Platforms",
    "about.technical.tools.0": "Git / GitHub",
    "about.technical.tools.1": "GitHub Pages",
    "about.technical.tools.2": "GitHub Actions",
    "about.technical.tools.3": "Firebase",
    "about.technical.tools.4": "Google Auth",
    "about.technical.tools.5": "QA Testing",
    "about.technical.tools.6": "API Testing",
    "about.technical.tools.7": "Python",
    "about.technical.tools.8": "Pytest + pytest-html reports",
    "about.technical.tools.9": "Postman",
    "about.technical.tools.10": "Selenium",
    "about.technical.tools.11": "Vercel",
    "about.technical.qa.title": "QA & Testing",
    "about.technical.backend.title": "Backend",
    "about.technical.backend.0": "Java",
    "about.technical.backend.1": "SQL / Database Design",
    "about.technical.backend.2": "PostgreSQL",
    "about.technical.key.heading": "Key Skills",
    "about.technical.key.0": "JavaScript",
    "about.technical.key.1": "React",
    "about.technical.key.2": "Next.js",
    "about.technical.key.3": "UI/UX Design",
    "about.technical.key.4": "Responsive Design",
    "about.technical.key.5": "QA Testing",
    "about.technical.key.6": "API Testing",
    "about.technical.key.7": "GitHub Actions",
    "about.technical.key.8": "Python",
    "about.technical.key.9": "Supabase",
    "about.skills.heading": "Skills",
    "about.skills.0": "UI/UX Design",
    "about.skills.1": "Front-End Development",
    "about.skills.2": "Quality Assurance",
    "about.skills.3": "API Integration",
    "about.skills.4": "Collaboration and Agile",
    "about.skills.5": "Workflow Automation",
    "about.toolbox": "Toolbox",
    "strengths.heading": "Selected Strengths",
    "strengths.0": "Frontend engineering with HTML, CSS, JavaScript, React, TypeScript, and Next.js for responsive interfaces.",
    "strengths.1": "UI/UX execution from Figma to accessible, component-based user experiences.",
    "strengths.2": "Tools and delivery workflow with Git/GitHub, GitHub Actions, Vercel, and Firebase integration.",
    "strengths.3": "QA coverage with manual, API, and Selenium checks plus Pytest reporting.",
    "strengths.4": "Backend and data modeling with Java fundamentals and SQL relational schema design.",
    "strengths.5": "Cross-functional collaboration with product, design, and engineering teams in Portuguese and English.",
    "experience.heading": "Experience",
    "experience.intro": "Practical product experience across UI/UX, front-end development, QA, and automation.",
    "experience.when": "Aug 2025 - Present | Remote",
    "experience.role": "Internship | Web Development and Design | Project Management | QA (Quality Assurance) | Data Analysis | Process Automation | Team Leadership",
    "experience.org": "FloLabs Innovations Group",
    "experience.p1": "FloLabs is a venture studio that co-builds and launches companies across healthcare, entertainment, travel, and space exploration through three pillars: Ventures Studio, Experiential Learning, and the AI Robotics Lab.",
    "experience.p2": "At Hephaestus Labs Institute, we are reimagining trade school models to foster innovation talent and a self-sustaining cycle of education, innovation, and reinvestment.",
    "experience.focusLabel": "Focus projects:",
    "experience.focus.0": "MoodChanger.ai - wellness system using neuroscience, wearable sensors, and adaptive feedback for personalized emotional support.",
    "experience.focus.1": "RoboCollective - collaborative marketplace connecting engineers and organizations to develop and share robotics solutions.",
    "experience.focus.2": "Legal Ventures Institute - legal training paired with product development for scalable solutions.",
    "experience.highlightsLabel": "Highlights:",
    "experience.highlights.0": "Workflow automation and robotic system design.",
    "experience.highlights.1": "UI/UX design for intelligent systems.",
    "experience.highlights.2": "API integration and product development.",
    "experience.highlights.3": "Exposure to embodied AI and robotics research.",
    "experience.highlights.4": "Open-source AI and robotics collaboration.",
    "contact.heading": "Contact",
    "contact.intro": "Interested in junior frontend, UI/UX, or web development opportunities? Let's connect.",
    "contact.actions.email": "Email",
    "contact.actions.linkedin": "LinkedIn",
    "contact.actions.cv": "Download CV",
    "contact.form.label.name": "Name",
    "contact.form.label.email": "Email",
    "contact.form.label.message": "Message",
    "contact.form.name": "Your name",
    "contact.form.email": "you@example.com",
    "contact.form.message": "Tell me about the role, project, or how I can help.",
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
    "footer.meta": "Daniela Torres Almeida | Built with HTML, CSS, JavaScript | Formspree | GitHub Pages",
    "theme.switchToLight": "Switch to light theme",
    "theme.switchToDark": "Switch to dark theme",
    "toTop.label": "Top",
    "toTop.aria": "Back to top",
    "lang.next.aria": "Switch language to European Portuguese",
  },
  [LANG_PT]: {
    "nav.projects": "Projetos",
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.contact": "Contacto",
    "nav.menu.open": "Abrir navegação",
    "nav.menu.close": "Fechar navegação",
    "topbar.cv": "CV",
    "topbar.github": "GitHub",
    "hero.kicker": "Portefólio",
    "hero.title": "Olá, sou a <span class=\"accent\">Daniela Torres Almeida</span>",
    "hero.lead": "Frontend Developer focada em React, TypeScript, interfaces acessíveis e experiências web responsivas.",
    "hero.cta.work": "Ver projetos",
    "hero.cta.contact": "Contactar",
    "hero.highlights.0.title": "Do produto à entrega",
    "hero.highlights.0.text": "Do planeamento de UX à implementação front-end e validação em QA.",
    "hero.highlights.1.title": "Colaboração multidisciplinar",
    "hero.highlights.1.text": "Trabalho com equipas internacionais de produto, design e investigação.",
    "hero.highlights.2.title": "Execução rápida e fiável",
    "hero.highlights.2.text": "Prototipagem acelerada com código limpo, reutilizável e documentação clara.",
    "coreStack.heading": "Core Stack",
    "coreStack.0": "React",
    "coreStack.1": "Next.js",
    "coreStack.2": "TypeScript",
    "coreStack.3": "JavaScript",
    "coreStack.4": "HTML5",
    "coreStack.5": "Tailwind CSS",
    "coreStack.6": "Firebase",
    "coreStack.7": "Python",
    "coreStack.8": "SQL",
    "coreStack.9": "Git/GitHub",
    "coreStack.10": "Selenium",
    "coreStack.11": "Vercel",
    "projects.heading": "Projetos em destaque",
    "projects.intro": "Seleção de projetos em front-end, automação de QA e experiências web orientadas para o produto.",
    "projects.todo.overlay": "Aplicação de tarefas em React + Firebase com autenticação Google.",
    "projects.todo.title": "App de Tarefas",
    "projects.todo.summary": "Gestor de tarefas com autenticação e atualizações persistentes em tempo real.",
    "projects.todo.what": "O que fiz: Construí a interface frontend em React e TypeScript, implementei layouts responsivos e integrei Firebase com Google Auth para um fluxo de tarefas fluido.",
    "projects.todo.problem": "<strong>Problema:</strong> Os utilizadores precisavam de um gestor de tarefas simples com autenticação e dados persistentes.",
    "projects.todo.solution": "<strong>Solução:</strong> Construí uma aplicação React + TypeScript com Firebase e Google Auth.",
    "projects.todo.outcome": "<strong>Resultado:</strong> Entreguei um fluxo de tarefas responsivo com login e gestão de tarefas em tempo real.",
    "projects.todo.proof": "Foco: Acessibilidade, responsividade e HTML semântico.",
    "projects.todo.description": "Aplicação de tarefas em React + TypeScript com Firebase e autenticação Google.",
    "projects.portfolio.overlay": "Portefólio de página única adaptável a diferentes dispositivos, com navegação clara e projetos em destaque.",
    "projects.portfolio.title": "Portefólio Adaptável",
    "projects.portfolio.summary": "Portefólio pessoal criado para apresentar trabalho frontend com navegação clara.",
    "projects.portfolio.what": "O que fiz: Construí um portefólio single-page responsivo, organizei secções reutilizáveis e otimizei legibilidade e navegação em desktop e mobile. Executei testes manuais de website (navegação, formulários, comportamento responsivo) e smoke tests automatizados com Selenium nos fluxos principais.",
    "projects.portfolio.problem": "<strong>Problema:</strong> Era necessário um site pessoal claro para apresentar projetos e competências de forma profissional.",
    "projects.portfolio.solution": "<strong>Solução:</strong> Construí um portefólio single-page responsivo com navegação estruturada e publicação no GitHub Pages.",
    "projects.portfolio.outcome": "<strong>Resultado:</strong> Criei uma forma mais rápida e limpa para recrutadores reverem experiência e trabalho real.",
    "projects.portfolio.proof": "Construído com secções reutilizáveis e abordagem mobile-first.",
    "projects.meta.default": "Daniela Torres Almeida | Desenvolvido com HTML/CSS/JS | GitHub Pages",
    "projects.qa.overlay": "Testes de API automatizados com relatórios pytest e saída partilhável pronta para CI.",
    "projects.qa.title": "Suite de Testes de API (QA)",
    "projects.qa.summary": "Suite de testes de API em Python com relatórios pytest-html publicados no GitHub Pages.",
    "projects.qa.what": "O que fiz: Implementei fluxos automatizados de validação de API em Python com Pytest, gerei relatórios legíveis em pytest-html e simplifiquei verificações de QA antes de release.",
    "projects.qa.problem": "<strong>Problema:</strong> Era necessário detetar regressões de API mais cedo, com relatórios mais claros.",
    "projects.qa.solution": "<strong>Solução:</strong> Implementei verificações automatizadas de API com Python + Pytest e geração de relatórios pytest-html.",
    "projects.qa.outcome": "<strong>Resultado:</strong> Permiti verificação mais rápida e maior visibilidade de QA antes de novas releases.",
    "projects.ui.overlay": "Galeria de componentes com padrões de UI reutilizáveis.",
    "projects.ui.title": "Mostra de Componentes UI",
    "projects.ui.summary": "Padrões de UI reutilizáveis desenhados para interfaces consistentes e escaláveis.",
    "projects.ui.what": "O que fiz: Desenvolvi componentes frontend reutilizáveis, adicionei comportamento responsivo e refinei estados interativos para consistência entre layouts. Realizei validações manuais de interação e acessibilidade, além de smoke/regression checks automatizados com Selenium para fluxos críticos de componentes.",
    "projects.ui.problem": "<strong>Problema:</strong> As páginas de produto precisavam de blocos de UI reutilizáveis para reduzir trabalho duplicado de implementação.",
    "projects.ui.solution": "<strong>Solução:</strong> Construí uma mostra de componentes com padrões modulares em HTML, CSS e JavaScript.",
    "projects.ui.outcome": "<strong>Resultado:</strong> Melhorei a consistência e a velocidade na criação de novas secções de interface.",
    "projects.mood.overlay": "Plataforma de bem-estar em Next.js com React, Tailwind CSS e publicação na Vercel.",
    "projects.mood.title": "MoodChanger.ai",
    "projects.mood.summary": "Website em Next.js para a MoodChanger.ai com secções React responsivas e comunicação clara do produto.",
    "projects.mood.what": "O que fiz: Construí secções de produto e marketing responsivas num código Next.js + React, refinando hierarquia, legibilidade e fluxo de conversão. Executei QA manual cross-browser e mobile, além de smoke checks automatizados com Selenium para jornadas críticas de utilizador.",
    "projects.mood.problem": "<strong>Problema:</strong> A informação do produto precisava de ser mais clara e mais fácil de percorrer em vários dispositivos.",
    "projects.mood.solution": "<strong>Solução:</strong> Implementei secções responsivas em Next.js com melhor hierarquia de informação e fluxo de utilizador.",
    "projects.mood.outcome": "<strong>Resultado:</strong> Entreguei uma interface mais clara que melhora confiança do utilizador e descoberta do produto.",
    "projects.mood.description": "Tecnologias usadas no site atual: Next.js (React), Tailwind CSS e alojamento na Vercel.",
    "projects.robo.overlay": "Experiência de loja e marketing em Next.js com fluxos de produto responsivos.",
    "projects.robo.title": "RoboCollective.ai",
    "projects.robo.summary": "Loja de robótica em Next.js com páginas de marketing e produto responsivas.",
    "projects.robo.what": "O que fiz: Construí secções frontend responsivas, refinei a hierarquia de conteúdo e otimizei o fluxo de conversão num ambiente React + Next.js. Realizei testes manuais exploratórios de website e smoke checks com Selenium para reduzir regressões nas páginas principais.",
    "projects.robo.problem": "<strong>Problema:</strong> A plataforma precisava de uma presença web clara para comunicar rapidamente o valor do produto.",
    "projects.robo.solution": "<strong>Solução:</strong> Desenvolvi uma landing page responsiva com mensagens estruturadas e navegação clara.",
    "projects.robo.outcome": "<strong>Resultado:</strong> Entreguei uma interface mais clara e moderna, alinhada com objetivos de produto e crescimento.",
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
    "projects.actions.codeRequest": "Código mediante pedido",
    "projects.actions.demo": "Demonstração",
    "projects.actions.viewSite": "Ver site",
    "projects.privateRepoNote": "Repositório privado. Contribuição frontend disponível mediante pedido.",
    "about.eyebrow": "Perfil",
    "about.heading": "Sobre",
    "about.p1": "Sou frontend developer e UI/UX designer com forte mentalidade de QA, focada na criação de produtos digitais acessíveis, responsivos e fiáveis. Trabalho entre design, desenvolvimento e testes para criar interfaces intuitivas para utilizadores e sustentáveis para equipas.",
    "about.p2": "Entreguei vários projetos web de ponta a ponta, desde design e implementação até validação em QA e publicação.",
    "about.technical.heading": "Competências Técnicas",
    "about.technical.frontend.title": "Frontend",
    "about.technical.frontend.0": "HTML5",
    "about.technical.frontend.1": "CSS3",
    "about.technical.frontend.2": "JavaScript",
    "about.technical.frontend.3": "React",
    "about.technical.frontend.4": "TypeScript",
    "about.technical.frontend.5": "Next.js",
    "about.technical.design.title": "UI/UX",
    "about.technical.design.0": "Design Responsivo",
    "about.technical.design.1": "Acessibilidade",
    "about.technical.design.2": "Wireframing",
    "about.technical.design.3": "Sistemas de Design",
    "about.technical.design.4": "Figma",
    "about.technical.tools.title": "Ferramentas e Plataformas",
    "about.technical.tools.0": "Git / GitHub",
    "about.technical.tools.1": "GitHub Pages",
    "about.technical.tools.2": "GitHub Actions",
    "about.technical.tools.3": "Firebase",
    "about.technical.tools.4": "Google Auth",
    "about.technical.tools.5": "Testes de QA",
    "about.technical.tools.6": "Testes de API",
    "about.technical.tools.7": "Python",
    "about.technical.tools.8": "Pytest + relatórios pytest-html",
    "about.technical.tools.9": "Postman",
    "about.technical.tools.10": "Selenium",
    "about.technical.tools.11": "Vercel",
    "about.technical.qa.title": "QA e Testes",
    "about.technical.backend.title": "Backend",
    "about.technical.backend.0": "Java",
    "about.technical.backend.1": "SQL / Design de Base de Dados",
    "about.technical.backend.2": "PostgreSQL",
    "about.technical.key.heading": "Competências-chave",
    "about.technical.key.0": "JavaScript",
    "about.technical.key.1": "React",
    "about.technical.key.2": "Next.js",
    "about.technical.key.3": "Design UI/UX",
    "about.technical.key.4": "Design Responsivo",
    "about.technical.key.5": "Testes de QA",
    "about.technical.key.6": "Testes de API",
    "about.technical.key.7": "GitHub Actions",
    "about.technical.key.8": "Python",
    "about.technical.key.9": "Supabase",
    "about.skills.heading": "Competências",
    "about.skills.0": "Design UI/UX",
    "about.skills.1": "Desenvolvimento Front-End",
    "about.skills.2": "Garantia de Qualidade",
    "about.skills.3": "Integração de APIs",
    "about.skills.4": "Colaboração e Métodos Ágeis",
    "about.skills.5": "Automação de fluxos de trabalho",
    "about.toolbox": "Ferramentas",
    "strengths.heading": "Pontos Fortes Selecionados",
    "strengths.0": "Engenharia frontend com HTML, CSS, JavaScript, React, TypeScript e Next.js para interfaces responsivas.",
    "strengths.1": "Execucao UI/UX de Figma para experiencias acessiveis e baseadas em componentes.",
    "strengths.2": "Fluxo de ferramentas e entrega com Git/GitHub, GitHub Actions, Vercel e integracao com Firebase.",
    "strengths.3": "Cobertura de QA com validacoes manuais, testes de API e Selenium, alem de relatorios com Pytest.",
    "strengths.4": "Backend e modelacao de dados com fundamentos de Java e design de esquemas relacionais SQL.",
    "strengths.5": "Colaboracao multidisciplinar com equipas de produto, design e engenharia em portugues e ingles.",
    "experience.heading": "Experiência",
    "experience.intro": "Experiência prática em produto, cruzando UI/UX, desenvolvimento, QA e automação em equipas multidisciplinares.",
    "experience.when": "Ago 2025 - Presente | Remoto",
    "experience.role": "Estágio | Desenvolvimento e Design Web | Gestão de Projetos | QA (Quality Assurance) | Análise de Dados | Automação de Processos | Liderança de Equipas",
    "experience.org": "FloLabs Innovations Group",
    "experience.p1": "FloLabs é um venture studio que co-cria e lança empresas nas áreas de saúde, entretenimento, viagens e exploração espacial através de três pilares: Ventures Studio, Experiential Learning e AI Robotics Lab.",
    "experience.p2": "No Hephaestus Labs Institute, estamos a reinventar modelos de escolas técnicas para formar talento em inovação e criar um ciclo sustentável de educação, inovação e reinvestimento.",
    "experience.focusLabel": "Projetos em destaque:",
    "experience.focus.0": "MoodChanger.ai - sistema de bem-estar com neurociência, sensores wearables e feedback adaptativo para suporte emocional personalizado.",
    "experience.focus.1": "RoboCollective - marketplace colaborativo que liga engenheiros e organizações para criar e partilhar soluções de robótica.",
    "experience.focus.2": "Legal Ventures Institute - formação jurídica combinada com desenvolvimento de produto para soluções adaptáveis.",
    "experience.highlightsLabel": "Destaques:",
    "experience.highlights.0": "Automação de workflows e design de sistemas robóticos.",
    "experience.highlights.1": "Design UI/UX para sistemas inteligentes.",
    "experience.highlights.2": "Integração de APIs e desenvolvimento de produto.",
    "experience.highlights.3": "Exposição à investigação em IA incorporada e robótica.",
    "experience.highlights.4": "Colaboração open-source em IA e robótica.",
    "contact.heading": "Contacto",
    "contact.intro": "Interessado(a) em oportunidades júnior de frontend, UI/UX ou desenvolvimento web? Vamos conversar.",
    "contact.actions.email": "Email",
    "contact.actions.linkedin": "LinkedIn",
    "contact.actions.cv": "Descarregar CV",
    "contact.form.label.name": "Nome",
    "contact.form.label.email": "Email",
    "contact.form.label.message": "Mensagem",
    "contact.form.name": "O teu nome",
    "contact.form.email": "tu@exemplo.com",
    "contact.form.message": "Conta-me sobre a vaga, o projeto ou como posso ajudar.",
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
    "footer.meta": "Daniela Torres Almeida | Desenvolvido com HTML, CSS e JavaScript | Formspree | GitHub Pages",
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

function t(key) {
  return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS[LANG_EN][key] || key;
}

const ORPHAN_TEXT_SELECTOR = ".hero p, .hero li, .section p, .section li, .section .when, .section .where";

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

function setThemeToggleAria(theme) {
  if (!themeToggle) return;
  themeToggle.setAttribute("aria-label", theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark"));
}

function normalizeTheme(value) {
  return value === "light" ? "light" : "dark";
}

function setThemeIcon(theme) {
  if (!themeIcon) return;
  themeIcon.src = theme === "dark" ? THEME_ICONS.dark : THEME_ICONS.light;
}

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

function setNavMenu(open) {
  if (!topbar || !navToggle) return;
  const isOpen = Boolean(open);
  topbar.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  navToggle.setAttribute("aria-label", isOpen ? t("nav.menu.close") : t("nav.menu.open"));
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

function setActiveNavLink(activeId) {
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const active = href === `#${activeId}`;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

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

function applyTranslations(language) {
  currentLanguage = language === LANG_PT ? LANG_PT : LANG_EN;
  setStoredValue(LANGUAGE_KEY, currentLanguage);
  document.documentElement.lang = currentLanguage === LANG_PT ? "pt-PT" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (!key) return;
    el.innerHTML = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (!key) return;
    el.setAttribute("placeholder", t(key));
  });

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
