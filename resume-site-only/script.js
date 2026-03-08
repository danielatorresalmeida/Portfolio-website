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
      "Career-changer with a background in arts and music education, now pursuing a career in software development and quality assurance. Experienced in UI/UX design, front-end development, and QA testing with Python, JavaScript, and modern web technologies. Skilled at adapting quickly to new challenges, collaborating in agile teams, and applying creativity to problem-solving. Passionate about building user-centered digital solutions and contributing to innovative, quality-driven projects.",
    experienceTitle: "Experience",
    experienceItems: [
      {
        title: "Software Development Intern - Flo Labs R&D",
        when: "Aug 2025 - Present",
        bullets: [
          "Designed and implemented 10+ UI/UX features, improving engagement by 50% using HTML, CSS, JavaScript, PHP, and TypeScript.",
          "Supported back-end development with Python (FastAPI).",
          "Assisted in QA testing and documentation to ensure product quality.",
          "Reduced bug turnaround time by approximately 20% through structured QA testing.",
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
        title: "Frontend Development",
        items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Next.js"],
      },
      {
        title: "Design & Layout",
        items: ["UI/UX Design", "Responsive Design", "Wireframing", "Accessibility (WCAG)", "Component Systems"],
      },
      {
        title: "Tools & Workflows",
        items: ["Git / GitHub", "GitHub Actions", "QA Testing", "Postman", "Python Automation", "Supabase"],
      },
    ],
    keySkillsTitle: "Key Skills",
    keySkills: [
      "JavaScript",
      "React",
      "Next.js",
      "UI/UX Design",
      "Responsive Design",
      "QA Testing",
      "API Testing",
      "GitHub Actions",
      "Python",
      "Supabase",
    ],
    projectsTitle: "Projects",
    projectItems: [
      {
        title: "To-Do List App",
        bullet: "React + TypeScript to-do app using Firebase and Google Auth.",
      },
      {
        title: "Responsive Portfolio",
        bullet: "Built with HTML, CSS, and JavaScript; deployed on GitHub Pages with CI/CD via Actions.",
      },
      {
        title: "API QA Test Suite",
        bullet: "Automated API checks with readable status and report links.",
      },
      {
        title: "UI Components Showcase",
        bullet: "Component gallery showcasing reusable UI patterns.",
      },
      {
        title: "MoodChanger.ai",
        bullet: "Website for a wellness platform combining neuroscience, wearable sensors, and adaptive support experiences.",
      },
      {
        title: "RoboCollective.ai",
        bullet: "Built from scratch with HTML, CSS, JavaScript, and Python automations supporting the content workflow.",
      },
      {
        title: "Legal Ventures Institute",
        bullet: "Public-facing site for Legal Ventures Institute with clear service overview and contact flow.",
      },
      {
        title: "Space Ventures Institute",
        bullet: "Public-facing website for Space Ventures Institute focused on venture and innovation content.",
      },
    ],
    coursesTitle: "Courses & Certifications",
    courses: [
      "Python Software Language - Programming Hub (Aug 2025 - Present)",
      "Fundamentals of Quality Assurance Engineer - Udemy (Jul 2025)",
      "Foundations of Software Testing and Validation - University of Leeds (Jul 2025)",
      "Website design - 23/Feb/2026",
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
        when: "Escola de Hotelaria e Turismo de Setubal Â· 2015 - 2016",
      },
      {
        title: "Science & Technology Track (Biology & Geology) - Final 15/20",
        when: "Escola Secundaria de Vergilio Ferreira Â· 2013 - 2015",
      },
    ],
    strengthsTitle: "Key Strengths",
    strengths: [
      "<strong>Frontend Engineering</strong> - building responsive interfaces with HTML, CSS, JavaScript, React, and Next.js.",
      "<strong>UI/UX Execution</strong> - turning design ideas into accessible, component-based user experiences.",
      "<strong>Quality Assurance</strong> - structured QA and API testing to catch defects early and reduce regressions.",
      "<strong>Performance and Reliability</strong> - focus on clean code, cross-browser consistency, and stable releases.",
      "<strong>Automation and CI</strong> - using Python scripts and GitHub Actions to speed up validation and delivery.",
      "<strong>Cross-Functional Collaboration</strong> - clear communication with product, design, and engineering teams in Portuguese and English.",
    ],
    footerMeta: "Daniela Torres Almeida - Built with HTML/CSS/JS - Hosted on GitHub Pages",
  },
  [LANG_PT]: {
    langButton: "EN",
    langButtonAria: "Switch language to English",
    backHomeAria: "Voltar ao portefÃ³lio",
    backHomeLabel: "Voltar ao portefÃ³lio",
    themeToggleLabel: "Alternar tema",
    themeSwitchToLight: "Mudar para tema claro",
    themeSwitchToDark: "Mudar para tema escuro",
    printAria: "Descarregar CV",
    printLabel: "CV",
    metaLine: META_LINE_HTML,
    objectiveTitle: "Objetivo Profissional",
    objectiveBody:
      "Profissional em transiÃ§Ã£o, com percurso em artes e educaÃ§Ã£o musical, atualmente focada em desenvolvimento de software e garantia de qualidade. ExperiÃªncia em design de UI/UX, desenvolvimento front-end e testes de QA com Python, JavaScript e tecnologias web modernas. Elevada capacidade de adaptaÃ§Ã£o a novos desafios, colaboraÃ§Ã£o em equipas Ã¡geis e aplicaÃ§Ã£o de criatividade Ã  resoluÃ§Ã£o de problemas. Compromisso com soluÃ§Ãµes digitais centradas no utilizador e com a entrega de projetos inovadores e orientados para a qualidade.",
    experienceTitle: "ExperiÃªncia",
    experienceItems: [
      {
        title: "EstagiÃ¡ria de Desenvolvimento de Software - Flo Labs R&D",
        when: "Ago 2025 - Presente",
        bullets: [
          "ConceÃ§Ã£o e implementaÃ§Ã£o de mais de 10 funcionalidades de UI/UX, com melhoria de 50% no envolvimento, atravÃ©s de HTML, CSS, JavaScript, PHP e TypeScript.",
          "Apoio ao desenvolvimento de back-end com Python (FastAPI).",
          "ColaboraÃ§Ã£o em testes de QA e documentaÃ§Ã£o para assegurar a qualidade do produto.",
          "ReduÃ§Ã£o do tempo de resposta a erros em cerca de 20% atravÃ©s de testes de QA estruturados.",
        ],
      },
      {
        title: "LLM Trainer (PortuguÃªs e InglÃªs) - Remoto",
        when: "Ago 2024 - Presente",
        bullets: [
          "RevisÃ£o e correÃ§Ã£o de prompts e respostas gerados por IA.",
          "Garantia de rigor linguÃ­stico e adequaÃ§Ã£o cultural em ambos os idiomas.",
        ],
      },
      {
        title: "Docente de MÃºsica (Canto, Piano, Violino e Viola) - VÃ¡rias InstituiÃ§Ãµes",
        when: "2018 - 2025",
        bullets: [
          "LecionaÃ§Ã£o em mÃºltiplos instrumentos, reforÃ§ando comunicaÃ§Ã£o, adaptabilidade e trabalho em equipa aplicÃ¡veis a contextos Ã¡geis de software.",
        ],
      },
      {
        title: "Hotelaria - FunÃ§Ãµes de Cozinha e Padaria",
        when: "2016 - 2018",
        where: "Cantinho do Avillez - Gleba Moagem e Padaria - Lagoas Park Hotel",
        bullets: [
          "PreparaÃ§Ã£o alimentar, pastelaria e panificaÃ§Ã£o, com desenvolvimento de precisÃ£o e gestÃ£o de tempo.",
        ],
      },
    ],
        skillsTitle: "Competências Técnicas",
    skillGroups: [
      {
        title: "Desenvolvimento Front-End",
        items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Next.js"],
      },
      {
        title: "Design e Layout",
        items: ["Design UI/UX", "Design Responsivo", "Wireframing", "Acessibilidade (WCAG)", "Sistemas de Componentes"],
      },
      {
        title: "Ferramentas e Fluxos",
        items: ["Git / GitHub", "GitHub Actions", "Testes de QA", "Postman", "Automação com Python", "Supabase"],
      },
    ],
    keySkillsTitle: "Competências-chave",
    keySkills: [
      "JavaScript",
      "React",
      "Next.js",
      "Design UI/UX",
      "Design Responsivo",
      "Testes de QA",
      "Testes de API",
      "GitHub Actions",
      "Python",
      "Supabase",
    ],
    projectsTitle: "Projetos",
    projectItems: [
      {
        title: "App de Tarefas",
        bullet: "Aplicacao de tarefas em React + TypeScript com Firebase e autenticacao Google.",
      },
      {
        title: "Portefolio Adaptavel",
        bullet: "Desenvolvido com HTML, CSS e JavaScript; publicado em GitHub Pages com CI/CD via Actions.",
      },
      {
        title: "Suite de Testes de API (QA)",
        bullet: "Verificacoes de API automatizadas com estado legivel e acesso direto a relatorios.",
      },
      {
        title: "Mostra de Componentes UI",
        bullet: "Galeria de componentes com padroes de UI reutilizaveis.",
      },
      {
        title: "MoodChanger.ai",
        bullet: "Website para uma plataforma de bem-estar que combina neurociencia, sensores wearables e experiencias de suporte adaptativo.",
      },
      {
        title: "RoboCollective.ai",
        bullet: "Desenvolvido de raiz com HTML, CSS, JavaScript e automacoes em Python para suportar o fluxo de conteudos.",
      },
      {
        title: "Legal Ventures Institute",
        bullet: "Website publico para o Legal Ventures Institute, com apresentacao clara de servicos.",
      },
      {
        title: "Space Ventures Institute",
        bullet: "Website publico para o Space Ventures Institute, focado em inovacao e programas de venture.",
      },
    ],
    coursesTitle: "Cursos e CertificaÃ§Ãµes",
    courses: [
      "Python Software Language - Programming Hub (Ago 2025)",
      "Fundamentals of Quality Assurance Engineer - Udemy (Jul 2025)",
      "Foundations of Software Testing and Validation - University of Leeds (Jul 2025)",
      "Conception of websites - (Feb 2026)",
    ],
    educationTitle: "Formação",
    educationItems: [
      {
        title: "Diploma em Viola d'Arco (8.Âº Grau) - ClassificaÃ§Ã£o Final 16/20",
        when: "2006 - 2018",
        text: "FormaÃ§Ã£o intensiva em viola d'arco, voz, coro e performance de cÃ¢mara/orquestra.",
      },
      {
        title: "GestÃ£o e ProduÃ§Ã£o de Cozinha (NÃ­vel V) - ClassificaÃ§Ã£o Final 16/20",
        when: "Escola de Hotelaria e Turismo de SetÃºbal Â· 2015 - 2016",
      },
      {
        title: "Curso de CiÃªncias e Tecnologias (Biologia e Geologia) - ClassificaÃ§Ã£o Final 15/20",
        when: "Escola SecundÃ¡ria de VergÃ­lio Ferreira Â· 2013 - 2015",
      },
    ],
    strengthsTitle: "Pontos Fortes",
    strengths: [
      "<strong>Engenharia Front-End</strong> - interfaces responsivas com HTML, CSS, JavaScript, React e Next.js.",
      "<strong>Execucao de UI/UX</strong> - transformar ideias de design em experiencias acessiveis e baseadas em componentes.",
      "<strong>Garantia de Qualidade</strong> - QA estruturado e testes de API para detetar falhas cedo e evitar regressao.",
      "<strong>Performance e Fiabilidade</strong> - foco em codigo limpo, consistencia entre browsers e releases estaveis.",
      "<strong>Automacao e CI</strong> - uso de scripts em Python e GitHub Actions para acelerar validacao e entrega.",
      "<strong>Colaboracao Multidisciplinar</strong> - comunicacao clara com equipas de produto, design e engenharia em portugues e ingles.",
    ],
    footerMeta: "Daniela Torres Almeida - Desenvolvido com HTML/CSS/JS - Publicado no GitHub Pages",
  },
};

let currentLanguage = localStorage.getItem(LANGUAGE_KEY);
if (currentLanguage !== LANG_EN && currentLanguage !== LANG_PT) {
  currentLanguage = LANG_EN;
}

function t(key) {
  return translations[currentLanguage]?.[key] || translations[LANG_EN][key] || "";
}

function setText(node, value) {
  if (node) node.textContent = value;
}

function setHTML(node, value) {
  if (node) node.innerHTML = value;
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
  localStorage.setItem(THEME_KEY, mode);
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
  const translatedExperience = t("experienceItems");

  experienceItems.forEach((item, index) => {
    const translated = translatedExperience[index];
    if (!translated) return;
    setText(item.querySelector("h3"), translated.title);
    setText(item.querySelector(".when"), translated.when);
    if (translated.where !== undefined) setText(item.querySelector(".where"), translated.where);
    const bullets = item.querySelectorAll("li");
    bullets.forEach((bullet, bulletIndex) => {
      setText(bullet, translated.bullets[bulletIndex] || "");
    });
  });

  const skillsTitle = skillsCol?.querySelector("h2");
  setText(skillsTitle, t("skillsTitle"));
  const skillCards = skillsCol?.querySelectorAll(".skill-group-card") || [];
  const translatedSkills = t("skillGroups");
  skillCards.forEach((card, index) => {
    const group = translatedSkills[index];
    if (!group) return;
    setText(card.querySelector("h4"), group.title);
    const list = card.querySelector(".skill-points");
    if (!list) return;
    list.innerHTML = "";
    const items = Array.isArray(group.items) ? group.items : [];
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
    const keySkills = t("keySkills");
    keySkills.forEach((item) => {
      const chip = document.createElement("span");
      chip.textContent = item;
      keySkillsWrap.appendChild(chip);
    });
  }

  const projectsTitle = projectsCol?.querySelector("h2");
  setText(projectsTitle, t("projectsTitle"));
  const projectItems = projectsCol?.querySelectorAll(".item") || [];
  const translatedProjects = t("projectItems");
  projectItems.forEach((item, index) => {
    const translated = translatedProjects[index];
    if (!translated) return;
    setText(item.querySelector("h3"), translated.title);
    setText(item.querySelector("li"), translated.bullet);
  });

  const coursesTitle = coursesCol?.querySelector("h2");
  setText(coursesTitle, t("coursesTitle"));
  const courseItems = coursesCol?.querySelectorAll("li") || [];
  const translatedCourses = t("courses");
  courseItems.forEach((item, index) => {
    setText(item, translatedCourses[index] || "");
  });

  const educationTitle = educationCol?.querySelector("h2");
  setText(educationTitle, t("educationTitle"));
  const educationItems = educationCol?.querySelectorAll(".item") || [];
  const translatedEducation = t("educationItems");
  educationItems.forEach((item, index) => {
    const translated = translatedEducation[index];
    if (!translated) return;
    setText(item.querySelector("h3"), translated.title);
    setText(item.querySelector(".when"), translated.when);
    if (translated.text !== undefined) setText(item.querySelector("p"), translated.text);
  });

  const strengthsTitle = strengthsCol?.querySelector("h2");
  setText(strengthsTitle, t("strengthsTitle"));
  const strengthItems = strengthsCol?.querySelectorAll("li") || [];
  const translatedStrengths = t("strengths");
  strengthItems.forEach((item, index) => {
    setHTML(item, translatedStrengths[index] || "");
  });

  setHTML(
    footerParagraph,
    `&copy; <span id="year"></span> ${t("footerMeta")}`
  );
  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = new Date().getFullYear();
}

function applyLanguage(language) {
  currentLanguage = language === LANG_PT ? LANG_PT : LANG_EN;
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
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
  updateToggleState(document.documentElement.getAttribute("data-theme") || "dark");
}

const savedTheme = localStorage.getItem(THEME_KEY);
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

printButton?.addEventListener("click", (event) => {
  event.preventDefault();
  window.print();
});

applyLanguage(currentLanguage);



