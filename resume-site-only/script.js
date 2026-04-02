const THEME_KEY = "resume-theme";
const LANGUAGE_KEY = "resume-language";
const LANG_EN = "en";
const LANG_PT = "pt-PT";

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeToggleSrOnly = themeToggle?.querySelector(".sr-only");
const langToggle = document.getElementById("lang-toggle");
const printButton = document.getElementById("print-btn");
const printLabel = printButton?.querySelector(".sr-only");
const homeLink = document.querySelector(".actions > a.home-btn");
const homeLinkSrOnly = homeLink?.querySelector(".sr-only");

const THEME_ICONS = {
  light: "assets/icons8-partly-cloudy-day-94.png",
  dark: "assets/icons8-night-94.png",
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

const metaLine = document.querySelector(".identity .meta");
const introSection = document.getElementById("intro-section");
const expCol = document.getElementById("experience-col");
const skillsCol = document.getElementById("skills-col");
const projectsCol = document.getElementById("projects-col");
const coursesCol = document.getElementById("courses-col");
const educationCol = document.getElementById("education-col");
const strengthsCol = document.getElementById("strengths-col");
const footerParagraph = document.querySelector("footer.footer p");

const WHATSAPP_ICON = '<svg class="meta-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .17 5.34.17 11.9c0 2.1.55 4.16 1.6 5.97L0 24l6.3-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.44Zm-8.45 18.33h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.84 9.84 0 0 1 1.52-12.3 9.84 9.84 0 0 1 16.8 6.96c0 5.43-4.42 9.86-9.86 9.86Zm5.41-7.37c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.23-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01s-.52.07-.8.37c-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z"></path></svg>';
const LINKEDIN_ICON = '<svg class="meta-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22.23 0H1.77A1.77 1.77 0 0 0 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46A1.77 1.77 0 0 0 24 22.23V1.77A1.77 1.77 0 0 0 22.23 0ZM7.12 20.45H3.56V9h3.56v11.45ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm15.11 13.02H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29Z"></path></svg>';
const META_LINE_HTML = `Cascais, Portugal &middot; <a class="meta-link" href="mailto:danielarosadolealtorresalmeida@gmail.com">danielarosadolealtorresalmeida@gmail.com</a> &middot; <a class="meta-link meta-whatsapp" href="https://wa.me/351962046821?text=Hi%20Daniela%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp chat">${WHATSAPP_ICON}<span>WhatsApp</span></a> &middot; <a class="meta-link meta-linkedin" href="https://www.linkedin.com/in/daniela-torres-almeida-945884205/" target="_blank" rel="noopener">${LINKEDIN_ICON}<span>LinkedIn</span></a> &middot; <a class="meta-link" href="https://github.com/danielatorresalmeida" target="_blank" rel="noopener">github.com/danielatorresalmeida</a>`;

const translations = {
  [LANG_EN]: {
    langButton: "PT-PT",
    langButtonAria: "Switch language to European Portuguese",
    backHomeAria: "Back to portfolio home",
    backHomeLabel: "Back to portfolio home",
    themeToggleLabel: "Toggle theme",
    themeSwitchToLight: "Switch to light theme",
    themeSwitchToDark: "Switch to dark theme",
    printAria: "Download CV",
    printLabel: "CV",
    metaLine: META_LINE_HTML,
    objectiveTitle: "Objective",
    objectiveBody:
      "Frontend developer with a background in arts and music education, now focused on building responsive, accessible, and user-centered web interfaces. Experienced in React, JavaScript, TypeScript, UI/UX design, and QA testing. Strong at translating design concepts into clean, maintainable frontend implementations in collaborative environments.",
    experienceTitle: "Experience",
    experienceItems: [
      {
        title: "Software Development Intern - FloLabs Innovations Group",
        when: "Aug 2025 - Present",
        bullets: [
          "Built the Portfolio website and robocollective.ai from scratch, taking both projects from concept to live release.",
          "Delivered 10+ UI/UX improvements across HTML, CSS, JavaScript, PHP, and TypeScript.",
          "Supported back-end development with Python (FastAPI).",
          "Contributed to QA testing and documentation to strengthen release quality.",
          "Cut bug turnaround time by ~20% through structured QA workflows and clearer bug tracking.",
        ],
      },
      {
        title: "LLM Trainer (Portuguese & English) - Remote",
        when: "Aug 2024 - Present",
        bullets: [
          "Reviewed and corrected AI-generated prompts and responses.",
          "Ensured linguistic accuracy and cultural relevance in both languages.",
        ],
      },
      {
        title: "Music Educator (Voice, Piano, Violin, Viola) - Various Institutions",
        when: "2018 - 2025",
        bullets: [
          "Delivered lessons across multiple instruments; strengthened communication, adaptability, and teamwork for agile software teams.",
        ],
      },
      {
        title: "Hospitality - Cook & Baker Roles",
        when: "2016 - 2018",
        where: "Cantinho do Avillez - Gleba Moagem e Padaria - Lagoas Park Hotel",
        bullets: [
          "Food preparation, pastry, and bread-making; developed precision and time management.",
        ],
      },
    ],
    skillsTitle: "Technical Skills",
    skillGroups: [
      {
        title: "Frontend",
        items: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Next.js"],
      },
      {
        title: "UI/UX",
        items: ["Responsive Design", "Accessibility", "Wireframing", "Design Systems", "Figma"],
      },
      {
        title: "QA & Testing",
        items: [
          "QA Testing",
          "API Testing",
          "Postman",
          "Pytest + pytest-html reports",
          "Selenium",
        ],
      },
      {
        title: "DevOps & Deployment",
        items: [
          "Git / GitHub",
          "GitHub Actions",
          "GitHub Pages",
          "Vercel",
          "Firebase",
          "Plesk",
          "Dynadot",
        ],
      },
      {
        title: "Platforms & Integrations",
        items: [
          "OpenCart",
          "WordPress",
          "HubSpot",
          "FillOutForms",
          "Google Auth",
        ],
      },
      {
        title: "Java & Backend",
        items: [
          "Java",
          "Java (Fundamentals)",
          "Java Web Application Development",
          "Python",
        ],
      },
      {
        title: "Databases & Data Modeling",
        items: [
          "SQL Fundamentals",
          "Database Access Technologies",
          "SQL / Database Design",
          "PostgreSQL",
        ],
      },
      {
        title: "Software Engineering Foundations",
        items: [
          "Programming & Algorithms",
          "C/C++ Fundamentals",
          "Software Engineering",
          "Software Development Methodologies",
          "IntelliJ IDEA",
          "Eclipse",
        ],
      },
    ],
    keySkillsTitle: "Key Skills",
    keySkills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "UI/UX Design",
      "UI/UX",
      "Accessibility",
      "Git / GitHub",
      "GitHub Actions",
      "Python",
      "Java Web Development",
      "Algorithms",
      "C/C++",
      "FastAPI",
      "Pytest",
      "SQL Fundamentals",
      "Database Access",
      "SQL/PostgreSQL",
      "Software Engineering",
      "Software Methodologies",
      "Supabase",
      "WordPress",
    ],
    projectsTitle: "Projects",
    projectItems: [
      {
        title: "RoboCollective.ai",
        bullet: "Built responsive frontend sections and conversion-focused page flows in a React + Next.js codebase styled with Tailwind CSS. Ran manual cross-browser QA and Selenium smoke tests for critical pages before release.",
      },
      {
        title: "API QA Test Suite",
        bullet: "Built automated API checks in Python + Pytest, generated pytest-html reports, and published QA outputs on GitHub Pages.",
      },
      {
        title: "To-Do List App",
        bullet: "Built the frontend in React + TypeScript with Firebase and Google Auth, delivering a responsive task flow with persistent real-time data.",
      },
      {
        title: "Responsive Portfolio",
        bullet: "Developed a responsive portfolio interface with structured navigation, reusable sections, and GitHub Pages deployment. Executed manual website test cases and automated Selenium smoke checks for key user flows.",
      },
      {
        title: "UI Components Showcase",
        bullet: "Implemented reusable UI patterns with responsive behavior and consistent interaction states for faster frontend delivery. Added manual interaction/accessibility checks and Selenium smoke/regression checks on core components.",
      },
      {
        title: "MoodChanger.ai",
        bullet: "Built responsive product and marketing sections in a Next.js + React codebase styled with Tailwind CSS and deployed on Vercel. Covered core journeys with manual exploratory testing and Selenium-based smoke checks.",
      },
      {
        title: "Legal Ventures Institute",
        bullet: "Built a public-facing Next.js + React website with modular styling, clear service hierarchy, and optimized contact flow. Applied manual regression testing and Selenium smoke automation for contact and navigation routes.",
      },
      {
        title: "Space Ventures Institute",
        bullet: "Developed responsive venture-focused interfaces in a Next.js + React codebase using Tailwind CSS, deployed on Vercel. Validated responsive behavior manually and used Selenium smoke checks on high-traffic pages.",
      },
      {
        title: "TARRL",
        bullet: "Built responsive frontend sections for the TARRL (Texas Advanced Robotics Research Lab) website, clarifying the remote-first model, research tracks, and application path for global AI and robotics candidates.",
      },
      {
        title: "Mechanic Data Base",
        bullet: "Designed a normalized SQL data model for a mechanic workshop, linking clients, vehicles, work sheets, services, parts, and suppliers with clear primary/foreign key relationships.",
      },
      {
        title: "Bakery Data Base",
        bullet: "Designed a normalized SQL data model for bakery operations, linking customers, orders, products, ingredients, suppliers, and stock movements through clear primary/foreign key relationships.",
      },
    ],
    coursesTitle: "Courses & Certifications",
    courses: [
      "QA & Testing: Fundamentals of Quality Assurance Engineer - Udemy (Jul 2025)",
      "QA & Testing: Foundations of Software Testing and Validation - University of Leeds (Jul 2025)",
      "Web Foundations: Website Design (Feb 2026)",
      "Programming Foundations: Python Software Language - Programming Hub (Aug 2025)",
      "Programming Foundations: Programming - Algorithms (Apr 2026)",
      "Programming Foundations: C/C++ Programming - Fundamentals (Jun 2026)",
      "Java Development: Java Programming (Mar 2026)",
      "Java Development: Java Language Fundamentals (May 2026)",
      "Java Development: Web Application Development in Java (Jul 2026)",
      "Databases: SQL Language Fundamentals (Mar 2026)",
      "Databases: Database Access Technologies (Apr 2026)",
      "Software Engineering: Software Engineering (Jun 2026)",
      "Software Engineering: Software Development Methodologies (Jun 2026)",
      "Projects: Programming Project (Jul 2026)",
      "Projects: Information Systems Technologies and Programming Project (Jul 2026)",
    ],
    educationTitle: "Education",
    educationItems: [
      {
        title: "Diploma in Viola d'Arco (8th Grade) - Final 16/20",
        when: "2006 - 2018",
        text: "Intensive training in viola, voice, choir, and chamber/orchestral performance.",
      },
      {
        title: "Kitchen Management & Production (Level V) - Final 16/20",
        when: "Escola de Hotelaria e Turismo de Setúbal · 2015 - 2016",
      },
      {
        title: "Science & Technology Track (Biology & Geology) - Final 15/20",
        when: "Escola Secundária de Vergílio Ferreira · 2013 - 2015",
      },
    ],
    strengthsTitle: "Key Strengths",
    strengths: [
      "<strong>Frontend Engineering</strong> - building responsive interfaces with HTML, CSS, JavaScript, React, TypeScript, and Next.js.",
      "<strong>UI/UX Execution</strong> - turning design ideas into accessible, component-based user experiences from Figma to production.",
      "<strong>Quality Assurance and Testing</strong> - manual QA, API testing, Selenium checks, and Pytest reporting to reduce regressions.",
      "<strong>Data and Database Engineering</strong> - applying SQL language fundamentals, database access technologies, and PostgreSQL data modeling for structured information systems.",
      "<strong>Java and Backend Development</strong> - working with Java fundamentals, Java web application development, and Python tooling for practical backend workflows.",
      "<strong>Software Engineering and Delivery</strong> - applying algorithms, C/C++ fundamentals, development methodologies, and project execution with Git/GitHub, GitHub Actions, and Vercel.",
    ],
    footerMeta: "Daniela Torres Almeida | Built with HTML, CSS, JavaScript | Hosted on GitHub Pages",
  },
  [LANG_PT]: {
    langButton: "EN",
    langButtonAria: "Mudar idioma para inglês",
    backHomeAria: "Voltar ao portefólio",
    backHomeLabel: "Voltar ao portefólio",
    themeToggleLabel: "Alternar tema",
    themeSwitchToLight: "Mudar para tema claro",
    themeSwitchToDark: "Mudar para tema escuro",
    printAria: "Descarregar CV",
    printLabel: "CV",
    metaLine: META_LINE_HTML,
    objectiveTitle: "Objetivo Profissional",
    objectiveBody:
      "Profissional em transição, com percurso em artes e educação musical, atualmente focada em desenvolvimento de software e garantia de qualidade. Experiência em design de UI/UX, desenvolvimento front-end e testes de QA com Python, JavaScript e tecnologias web modernas. Elevada capacidade de adaptação a novos desafios, colaboração em equipas ágeis e aplicação de criatividade à resolução de problemas. Compromisso com soluções digitais centradas no utilizador e com a entrega de projetos inovadores e orientados para a qualidade.",
    experienceTitle: "Experiência",
    experienceItems: [
      {
        title: "Estagiária de Desenvolvimento de Software - FloLabs Innovations Group",
        when: "Ago 2025 - Presente",
        bullets: [
          "Desenvolvi o Portfolio website e o robocollective.ai de raiz, levando ambos os projetos do conceito a publicacao.",
          "Entreguei mais de 10 melhorias de UI/UX com HTML, CSS, JavaScript, PHP e TypeScript.",
          "Apoio ao desenvolvimento de back-end com Python (FastAPI).",
          "Contribui para testes de QA e documentacao para reforcar a qualidade das releases.",
          "Reduzi o tempo de resposta a erros em ~20% com fluxos de QA estruturados e melhor rastreio de bugs.",
        ],
      },
      {
        title: "LLM Trainer (Português e Inglês) - Remoto",
        when: "Ago 2024 - Presente",
        bullets: [
          "Revisão e correção de prompts e respostas gerados por IA.",
          "Garantia de rigor linguístico e adequação cultural em ambos os idiomas.",
        ],
      },
      {
        title: "Docente de Música (Canto, Piano, Violino e Viola) - Várias Instituições",
        when: "2018 - 2025",
        bullets: [
          "Lecionação em múltiplos instrumentos, reforçando comunicação, adaptabilidade e trabalho em equipa aplicáveis a contextos ágeis de software.",
        ],
      },
      {
        title: "Hotelaria - Funções de Cozinha e Padaria",
        when: "2016 - 2018",
        where: "Cantinho do Avillez - Gleba Moagem e Padaria - Lagoas Park Hotel",
        bullets: [
          "Preparação alimentar, pastelaria e panificação, com desenvolvimento de precisão e gestão de tempo.",
        ],
      },
    ],
    skillsTitle: "Competências Técnicas",
    skillGroups: [
      {
        title: "Frontend",
        items: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Next.js"],
      },
      {
        title: "UI/UX",
        items: ["Design Responsivo", "Acessibilidade", "Wireframing", "Sistemas de Design", "Figma"],
      },
      {
        title: "QA e Testes",
        items: [
          "Testes de QA",
          "Testes de API",
          "Postman",
          "Pytest + relatorios pytest-html",
          "Selenium",
        ],
      },
      {
        title: "DevOps e Deployment",
        items: [
          "Git / GitHub",
          "GitHub Actions",
          "GitHub Pages",
          "Vercel",
          "Firebase",
          "Plesk",
          "Dynadot",
        ],
      },
      {
        title: "Plataformas e Integrações",
        items: [
          "OpenCart",
          "WordPress",
          "HubSpot",
          "FillOutForms",
          "Google Auth",
        ],
      },
      {
        title: "Java e Backend",
        items: [
          "Java",
          "Java (fundamentos)",
          "Desenvolvimento de aplicações web em Java",
          "Python",
        ],
      },
      {
        title: "Bases de Dados e Modelação",
        items: [
          "Fundamentos de SQL",
          "Tecnologias de acesso a base de dados",
          "SQL / Design de Base de Dados",
          "PostgreSQL",
        ],
      },
      {
        title: "Fundamentos de Engenharia de Software",
        items: [
          "Programação e algoritmos",
          "Programação em C/C++ (fundamentos)",
          "Engenharia de software",
          "Metodologias de desenvolvimento de software",
          "IntelliJ IDEA",
          "Eclipse",
        ],
      },
    ],
    keySkillsTitle: "Competências-chave",
    keySkills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Design UI/UX",
      "UI/UX",
      "Acessibilidade",
      "Git / GitHub",
      "GitHub Actions",
      "Python",
      "Desenvolvimento Web em Java",
      "Algoritmos",
      "C/C++",
      "FastAPI",
      "Pytest",
      "Fundamentos de SQL",
      "Acesso a base de dados",
      "SQL/PostgreSQL",
      "Engenharia de software",
      "Metodologias de software",
      "Supabase",
      "WordPress",
    ],
    projectsTitle: "Projetos",
    projectItems: [
      {
        title: "RoboCollective.ai",
        bullet: "Desenvolvi secções frontend responsivas e fluxos de página focados em conversão num código React + Next.js com Tailwind CSS. Executei QA manual cross-browser e smoke tests com Selenium nas páginas críticas.",
      },
      {
        title: "Suite de Testes de API (QA)",
        bullet: "Construi verificacoes automatizadas de API em Python + Pytest, gerei relatorios pytest-html e publiquei saidas de QA no GitHub Pages.",
      },
      {
        title: "App de Tarefas",
        bullet: "Desenvolvi o frontend em React + TypeScript com Firebase e Google Auth, entregando um fluxo de tarefas responsivo com dados persistentes em tempo real.",
      },
      {
        title: "Portefólio Adaptável",
        bullet: "Desenvolvi uma interface de portefólio responsiva com navegação estruturada, secções reutilizáveis e publicação no GitHub Pages. Executei testes manuais de website e smoke checks automatizados com Selenium nos fluxos principais.",
      },
      {
        title: "Mostra de Componentes UI",
        bullet: "Implementei padrões de UI reutilizáveis com comportamento responsivo e estados de interação consistentes para acelerar entregas frontend. Adicionei verificações manuais de interação/acessibilidade e smoke/regression checks com Selenium.",
      },
      {
        title: "MoodChanger.ai",
        bullet: "Construi secções de produto e marketing responsivas num código Next.js + React com Tailwind CSS e deploy na Vercel. Cobri jornadas essenciais com testes manuais exploratórios e smoke checks com Selenium.",
      },
      {
        title: "Legal Ventures Institute",
        bullet: "Construi um website público em Next.js + React com estilos modulares, hierarquia clara de serviços e fluxo de contacto otimizado. Apliquei testes manuais de regressão e automação de smoke tests com Selenium para contacto e navegação.",
      },
      {
        title: "Space Ventures Institute",
        bullet: "Desenvolvi interfaces responsivas para conteúdo venture num código Next.js + React com Tailwind CSS, publicado na Vercel. Validei comportamento responsivo manualmente e usei smoke checks com Selenium nas páginas de maior tráfego.",
      },
      {
        title: "TARRL",
        bullet: "Construi secoes frontend responsivas para o website da TARRL (Texas Advanced Robotics Research Lab), clarificando o modelo remote-first, os research tracks e o caminho de candidatura para candidatos globais de IA e robotica.",
      },
      {
        title: "Mechanic Data Base",
        bullet: "Desenhei um modelo de dados SQL normalizado para uma oficina mecânica, ligando clientes, veículos, folhas de obra, serviços, peças e fornecedores com relações claras de chave primária e estrangeira.",
      },
      {
        title: "Bakery Data Base",
        bullet: "Desenhei um modelo de dados SQL normalizado para operações de pastelaria, ligando clientes, encomendas, produtos, ingredientes, fornecedores e movimentos de stock com relações claras de chave primária e estrangeira.",
      },
    ],
    coursesTitle: "Cursos e Certificações",
    courses: [
      "QA e Testes: Fundamentos de Engenharia de Garantia da Qualidade - Udemy (Jul 2025)",
      "QA e Testes: Fundamentos de Testes e Validação de Software - University of Leeds (Jul 2025)",
      "Fundamentos Web: Conceção de websites (Fev 2026)",
      "Fundamentos de Programação: Linguagem de Programação Python - Programming Hub (Ago 2025)",
      "Fundamentos de Programação: Programação - Algoritmos (Abr 2026)",
      "Fundamentos de Programação: Programação em C/C++ - fundamentos (Jun 2026)",
      "Desenvolvimento Java: Programação em Java (Mar 2026)",
      "Desenvolvimento Java: Fundamentos de linguagem JAVA (Mai 2026)",
      "Desenvolvimento Java: Desenvolvimento de aplicações web em JAVA (Jul 2026)",
      "Bases de Dados: Fundamentos da linguagem SQL (Mar 2026)",
      "Bases de Dados: Tecnologias de acesso a base de dados (Abr 2026)",
      "Engenharia de Software: Engenharia de software (Jun 2026)",
      "Engenharia de Software: Metodologias de desenvolvimento de software (Jun 2026)",
      "Projetos: Projeto de programação (Jul 2026)",
      "Projetos: Projeto de tecnologias e programação de sistemas de informação (Jul 2026)",
    ],
    educationTitle: "Formação",
    educationItems: [
      {
        title: "Diploma em Viola d'Arco (8.º Grau) - Classificação Final 16/20",
        when: "2006 - 2018",
        text: "Formação intensiva em viola d'arco, voz, coro e performance de câmara/orquestra.",
      },
      {
        title: "Gestão e Produção de Cozinha (Nível V) - Classificação Final 16/20",
        when: "Escola de Hotelaria e Turismo de Setúbal · 2015 - 2016",
      },
      {
        title: "Curso de Ciências e Tecnologias (Biologia e Geologia) - Classificação Final 15/20",
        when: "Escola Secundária de Vergílio Ferreira · 2013 - 2015",
      },
    ],
    strengthsTitle: "Pontos Fortes",
    strengths: [
      "<strong>Engenharia Front-End</strong> - interfaces responsivas com HTML, CSS, JavaScript, React, TypeScript e Next.js.",
      "<strong>Execução de UI/UX</strong> - transformar ideias de design em experiências acessíveis e baseadas em componentes, de Figma a produção.",
      "<strong>QA e Testes</strong> - QA manual, testes de API, verificações com Selenium e relatórios com Pytest para reduzir regressão.",
      "<strong>Engenharia de Dados e Bases de Dados</strong> - aplicar fundamentos de SQL, tecnologias de acesso a base de dados e modelação em PostgreSQL para sistemas de informação estruturados.",
      "<strong>Desenvolvimento Java e Backend</strong> - trabalhar com fundamentos de Java, desenvolvimento web em Java e ferramentas Python para fluxos backend práticos.",
      "<strong>Engenharia de Software e Entrega</strong> - aplicar algoritmos, fundamentos de C/C++, metodologias de desenvolvimento e execução de projetos com Git/GitHub, GitHub Actions e Vercel.",
    ],
    footerMeta: "Daniela Torres Almeida | Desenvolvido com HTML, CSS e JavaScript | Publicado no GitHub Pages",
  },
};

const urlLanguage = new URLSearchParams(window.location.search).get("lang");
const shouldAutoPrint = new URLSearchParams(window.location.search).get("download") === "1";
let currentLanguage = urlLanguage || getStoredValue(LANGUAGE_KEY);
if (currentLanguage !== LANG_EN && currentLanguage !== LANG_PT) {
  currentLanguage = LANG_EN;
}

function t(key) {
  return translations[currentLanguage]?.[key] || translations[LANG_EN][key] || "";
}

const ORPHAN_TEXT_SELECTOR = ".resume p, .resume li, .resume .when, .resume .where";

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

function setText(node, value) {
  if (node) node.textContent = value;
}

function setHTML(node, value) {
  if (node) node.innerHTML = value;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function warnCountMismatch(section, domCount, dataCount) {
  if (domCount === dataCount) return;
  console.warn(
    `[resume-i18n] ${section} count mismatch: DOM has ${domCount}, translations have ${dataCount}.`
  );
}

function updateToggleState(mode) {
  if (!themeToggle) return;
  const ariaLabel = mode === "light" ? t("themeSwitchToDark") : t("themeSwitchToLight");
  themeToggle.setAttribute("aria-label", ariaLabel);
  themeToggle.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
  themeToggle.classList.toggle("is-dark", mode === "dark");
  themeToggle.classList.toggle("is-light", mode === "light");
  if (themeIcon) {
    themeIcon.src = mode === "dark" ? THEME_ICONS.dark : THEME_ICONS.light;
  }
}

function applyTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  setStoredValue(THEME_KEY, mode);
  updateToggleState(mode);
}

function renderResumeText() {
  const introTitle = introSection?.querySelector("h2");
  const introBody = introSection?.querySelector("p");
  setText(introTitle, t("objectiveTitle"));
  setText(introBody, t("objectiveBody"));

  const experienceTitle = expCol?.querySelector("h2");
  setText(experienceTitle, t("experienceTitle"));
  const experienceItems = expCol?.querySelectorAll(".item") || [];
  const translatedExperience = asArray(t("experienceItems"));
  warnCountMismatch("experienceItems", experienceItems.length, translatedExperience.length);

  experienceItems.forEach((item, index) => {
    const translated = translatedExperience[index];
    if (!translated) {
      setText(item.querySelector("h3"), "");
      setText(item.querySelector(".when"), "");
      setText(item.querySelector(".where"), "");
      item.querySelectorAll("li").forEach((bullet) => setText(bullet, ""));
      return;
    }
    setText(item.querySelector("h3"), translated.title);
    setText(item.querySelector(".when"), translated.when);
    if (translated.where !== undefined) setText(item.querySelector(".where"), translated.where);
    const bullets = item.querySelectorAll("li");
    const translatedBullets = asArray(translated.bullets);
    warnCountMismatch(`experienceItems[${index}].bullets`, bullets.length, translatedBullets.length);
    bullets.forEach((bullet, bulletIndex) => {
      setText(bullet, translatedBullets[bulletIndex] || "");
    });
  });

  const skillsTitle = skillsCol?.querySelector("h2");
  setText(skillsTitle, t("skillsTitle"));
  const skillCards = skillsCol?.querySelectorAll(".skill-group-card") || [];
  const translatedSkills = asArray(t("skillGroups"));
  warnCountMismatch("skillGroups", skillCards.length, translatedSkills.length);
  skillCards.forEach((card, index) => {
    const group = translatedSkills[index];
    if (!group) {
      setText(card.querySelector("h4"), "");
      const emptyList = card.querySelector(".skill-points");
      if (emptyList) emptyList.innerHTML = "";
      return;
    }
    setText(card.querySelector("h4"), group.title);
    const list = card.querySelector(".skill-points");
    if (!list) return;
    list.innerHTML = "";
    const items = asArray(group.items);
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  });

  const keySkillsHeading = skillsCol?.querySelector(".skill-key-card h4");
  setText(keySkillsHeading, t("keySkillsTitle"));
  const keySkillsWrap = skillsCol?.querySelector("#key-skills-tags");
  if (keySkillsWrap) {
    keySkillsWrap.innerHTML = "";
    const keySkills = asArray(t("keySkills"));
    keySkills.forEach((item) => {
      const chip = document.createElement("span");
      chip.textContent = item;
      keySkillsWrap.appendChild(chip);
    });
  }

  const projectsTitle = projectsCol?.querySelector("h2");
  setText(projectsTitle, t("projectsTitle"));
  const projectItems = projectsCol?.querySelectorAll(".item") || [];
  const translatedProjects = asArray(t("projectItems"));
  warnCountMismatch("projectItems", projectItems.length, translatedProjects.length);
  projectItems.forEach((item, index) => {
    const translated = translatedProjects[index];
    if (!translated) {
      setText(item.querySelector("h3"), "");
      setText(item.querySelector("li"), "");
      return;
    }
    setText(item.querySelector("h3"), translated.title);
    setText(item.querySelector("li"), translated.bullet);
  });

  const coursesTitle = coursesCol?.querySelector("h2");
  setText(coursesTitle, t("coursesTitle"));
  const courseItems = coursesCol?.querySelectorAll("li") || [];
  const translatedCourses = asArray(t("courses"));
  warnCountMismatch("courses", courseItems.length, translatedCourses.length);
  courseItems.forEach((item, index) => {
    const courseText = translatedCourses[index] || "";
    setText(item, courseText);
  });

  const educationTitle = educationCol?.querySelector("h2");
  setText(educationTitle, t("educationTitle"));
  const educationItems = educationCol?.querySelectorAll(".item") || [];
  const translatedEducation = asArray(t("educationItems"));
  warnCountMismatch("educationItems", educationItems.length, translatedEducation.length);
  educationItems.forEach((item, index) => {
    const translated = translatedEducation[index];
    if (!translated) {
      setText(item.querySelector("h3"), "");
      setText(item.querySelector(".when"), "");
      setText(item.querySelector("p"), "");
      return;
    }
    setText(item.querySelector("h3"), translated.title);
    setText(item.querySelector(".when"), translated.when);
    if (translated.text !== undefined) setText(item.querySelector("p"), translated.text);
  });

  const strengthsTitle = strengthsCol?.querySelector("h2");
  setText(strengthsTitle, t("strengthsTitle"));
  const strengthItems = strengthsCol?.querySelectorAll("li") || [];
  const translatedStrengths = asArray(t("strengths"));
  warnCountMismatch("strengths", strengthItems.length, translatedStrengths.length);
  strengthItems.forEach((item, index) => {
    setHTML(item, translatedStrengths[index] || "");
  });

  setHTML(footerParagraph, `&copy; <span id="year"></span> ${t("footerMeta")}`);
  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = new Date().getFullYear();
}

function applyLanguage(language) {
  currentLanguage = language === LANG_PT ? LANG_PT : LANG_EN;
  setStoredValue(LANGUAGE_KEY, currentLanguage);
  document.documentElement.lang = currentLanguage;

  setText(langToggle?.querySelector(".pill-label"), t("langButton"));
  if (langToggle) langToggle.setAttribute("aria-label", t("langButtonAria"));

  if (homeLink) homeLink.setAttribute("aria-label", t("backHomeAria"));
  setText(homeLinkSrOnly, t("backHomeLabel"));
  setText(themeToggleSrOnly, t("themeToggleLabel"));

  if (printButton) printButton.setAttribute("aria-label", t("printAria"));
  setText(printLabel, t("printAria"));
  setHTML(metaLine, t("metaLine"));

  renderResumeText();
  applyOrphanControl();
  updateToggleState(document.documentElement.getAttribute("data-theme") || "dark");
}

const savedTheme = getStoredValue(THEME_KEY);
if (savedTheme === "light" || savedTheme === "dark") {
  applyTheme(savedTheme);
} else {
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(prefersLight ? "light" : "dark");
}

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  applyTheme(currentTheme === "light" ? "dark" : "light");
});

langToggle?.addEventListener("click", () => {
  applyLanguage(currentLanguage === LANG_PT ? LANG_EN : LANG_PT);
});

function isJsDomEnvironment() {
  return /jsdom/i.test(window.navigator?.userAgent || "");
}

function waitForProjectImages(timeoutMs = 3000) {
  if (isJsDomEnvironment()) return Promise.resolve();

  const images = Array.from(document.querySelectorAll(".project-site-shot"));
  if (!images.length) return Promise.resolve();

  images.forEach((img) => {
    img.loading = "eager";
    img.decoding = "async";
  });

  const pending = images.filter((img) => !img.complete || img.naturalWidth === 0);
  if (!pending.length) return Promise.resolve();

  const waits = pending.map(
    (img) =>
      new Promise((resolve) => {
        const done = () => resolve();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      })
  );

  const timeout = new Promise((resolve) => window.setTimeout(resolve, timeoutMs));
  return Promise.race([Promise.all(waits), timeout]);
}

function printResumeWithImages() {
  waitForProjectImages().finally(() => {
    window.print();
  });
}

printButton?.addEventListener("click", () => {
  printResumeWithImages();
});

applyLanguage(currentLanguage);

if (shouldAutoPrint) {
  window.setTimeout(() => {
    printResumeWithImages();
  }, 0);
}
