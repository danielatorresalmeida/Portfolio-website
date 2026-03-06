// Footer year
const yearValue = new Date().getFullYear();
document.querySelectorAll("[data-year]").forEach((yearEl) => {
  yearEl.textContent = yearValue;
});

// === Theme toggle ===
const THEME_KEY = "resume-theme";
const LANGUAGE_KEY = "portfolio-language";
const LANG_EN = "en";
const LANG_PT = "pt-PT";
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const langToggle = document.getElementById("lang-toggle");

const THEME_ICONS = {
  light: "assets/icons8-partly-cloudy-day-94.png",
  dark: "assets/icons8-night-94.png",
};

const TRANSLATIONS = {
  [LANG_EN]: {
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "topbar.cv": "CV",
    "hero.kicker": "Portfolio",
    "hero.title": "Hi, I'm <span class=\"accent\">Daniela Torres Almeida</span>",
    "hero.lead": "Product-minded UI/UX Designer and Frontend Developer building clear, high-performance web experiences.",
    "hero.cta.work": "See my work",
    "hero.cta.contact": "Get in touch",
    "hero.highlights.0.title": "Product to production",
    "hero.highlights.0.text": "From UX strategy to front-end implementation and QA validation.",
    "hero.highlights.1.title": "Cross-functional collaboration",
    "hero.highlights.1.text": "Working with international teams across product, design, and research.",
    "hero.highlights.2.title": "Fast, reliable delivery",
    "hero.highlights.2.text": "Rapid prototyping with clean, scalable code and clear documentation.",
    "projects.heading": "Featured Projects",
    "projects.intro": "A curated selection of front-end, QA, and product-driven web projects.",
    "projects.todo.overlay": "React + Firebase to-do app with Google sign-in.",
    "projects.todo.title": "To-Do List App",
    "projects.todo.description": "React + TypeScript to-do app using Firebase and Google Auth.",
    "projects.portfolio.overlay": "Responsive single-page portfolio with clear navigation and project highlights.",
    "projects.portfolio.title": "Responsive Portfolio",
    "projects.meta.default": "Daniela Torres Almeida | Built with HTML/CSS/JS | GitHub Pages",
    "projects.qa.status.loading": "Status: loading...",
    "projects.qa.status.updated": "Updated: --",
    "projects.qa.overlay": "Automated API checks with readable status and report links.",
    "projects.qa.title": "API QA Test Suite",
    "projects.ui.overlay": "Component gallery showcasing reusable UI patterns.",
    "projects.ui.title": "UI Components Showcase",
    "projects.mood.overlay": "Wellness product site built around adaptive feedback and guided emotional support.",
    "projects.mood.title": "MoodChanger.ai",
    "projects.mood.description": "Website for a wellness platform combining neuroscience, wearable sensors, and adaptive support experiences.",
    "projects.robo.overlay": "Custom landing page with bold branding and responsive layout.",
    "projects.robo.title": "RoboCollective.ai",
    "projects.robo.description": "Built from scratch with HTML, CSS, JavaScript, and Python automations supporting the content workflow.",
    "projects.legal.overlay": "Service overview site with clear calls to action.",
    "projects.legal.title": "Legal Ventures Institute",
    "projects.legal.description": "Public-facing site for Legal Ventures Institute with clear service overview and contact flow.",
    "projects.space.overlay": "Website card for Space Ventures Institute with a clear, modern presentation.",
    "projects.space.title": "Space Ventures Institute",
    "projects.space.description": "Public-facing website for Space Ventures Institute focused on venture and innovation content.",
    "projects.actions.live": "Live",
    "projects.actions.code": "Code",
    "projects.actions.demo": "Demo",
    "projects.actions.viewSite": "View site",
    "about.intro": "I design, build, and validate digital products with a strong focus on usability and quality.",
    "about.heading": "About",
    "about.subheading": "Career Summary",
    "about.p1": "A career-changer with a background in arts and music education, currently pursuing a career in software development and quality assurance.",
    "about.p2": "Experienced in UI/UX design, front-end development, and QA testing with proficiency in Python, JavaScript, and modern web technologies. Skilled at adapting quickly to new challenges and collaborating in agile teams, with a focus on problem-solving and creativity. Passionate about building user-centered digital solutions and contributing to innovative, quality-driven projects.",
    "about.skills.heading": "Skills",
    "about.skills.0": "UI/UX Design",
    "about.skills.1": "Front-End Development",
    "about.skills.2": "Quality Assurance",
    "about.skills.3": "API Integration",
    "about.skills.4": "Collaboration and Agile",
    "about.skills.5": "Workflow Automation",
    "about.skills.6": "Robotic System Design",
    "about.toolbox": "Toolbox",
    "experience.heading": "Experience",
    "experience.intro": "Practical product experience across UI/UX, front-end development, QA, and automation.",
    "experience.when": "Aug 2025 - Present | Remote",
    "experience.role": "Internship | Web Design and Development | Project Manager | QA | Data Analyst | Automation and Robotics",
    "experience.org": "FloLabs Innovations Group",
    "experience.p1": "FloLabs is a venture studio that co-builds and launches companies across healthcare, entertainment, travel, and space exploration through three pillars: Ventures Studio, Experiential Learning (Efestos Labs), and the AI Robotics Lab.",
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
    "contact.intro": "Building something meaningful? Let's connect.",
    "contact.form.name": "Your name",
    "contact.form.email": "Email",
    "contact.form.message": "Your message",
    "contact.form.send": "Send",
    "contact.preferEmail": "Prefer email?",
    "contact.linkedin": "LinkedIn",
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
    "topbar.cv": "CV",
    "hero.kicker": "Portefólio",
    "hero.title": "Olá, sou a <span class=\"accent\">Daniela Torres Almeida</span>",
    "hero.lead": "Designer de UI/UX e Frontend Developer, focada em criar experiências web claras, rápidas e orientadas ao utilizador.",
    "hero.cta.work": "Ver projetos",
    "hero.cta.contact": "Entrar em contacto",
    "hero.highlights.0.title": "Do produto à entrega",
    "hero.highlights.0.text": "Do planeamento de UX à implementação front-end e validação em QA.",
    "hero.highlights.1.title": "Colaboração multidisciplinar",
    "hero.highlights.1.text": "Trabalho com equipas internacionais de produto, design e investigação.",
    "hero.highlights.2.title": "Execução rápida e fiável",
    "hero.highlights.2.text": "Prototipagem acelerada com código limpo, escalável e documentação clara.",
    "projects.heading": "Projetos em destaque",
    "projects.intro": "Seleção de projetos em front-end, automação de QA e experiências web orientadas ao produto.",
    "projects.todo.overlay": "Aplicação de tarefas em React + Firebase com autenticação Google.",
    "projects.todo.title": "App de Tarefas",
    "projects.todo.description": "Aplicação de tarefas em React + TypeScript com Firebase e autenticação Google.",
    "projects.portfolio.overlay": "Portefólio single-page responsivo com navegação clara e destaque de projetos.",
    "projects.portfolio.title": "Portefólio Responsivo",
    "projects.meta.default": "Daniela Torres Almeida | Desenvolvido com HTML/CSS/JS | GitHub Pages",
    "projects.qa.status.loading": "Estado: a carregar...",
    "projects.qa.status.updated": "Atualizado: --",
    "projects.qa.overlay": "Verificações de API automatizadas com estado legível e acesso direto a relatórios.",
    "projects.qa.title": "Suite de Testes de API (QA)",
    "projects.ui.overlay": "Galeria de componentes com padrões de UI reutilizáveis.",
    "projects.ui.title": "Mostra de Componentes UI",
    "projects.mood.overlay": "Website de bem-estar centrado em feedback adaptativo e suporte guiado.",
    "projects.mood.title": "MoodChanger.ai",
    "projects.mood.description": "Website para uma plataforma de bem-estar que combina neurociência, sensores wearables e experiências de suporte adaptativo.",
    "projects.robo.overlay": "Landing page personalizada com identidade visual forte e layout responsivo.",
    "projects.robo.title": "RoboCollective.ai",
    "projects.robo.description": "Desenvolvido de raiz com HTML, CSS, JavaScript e automações em Python para suportar o fluxo de conteúdos.",
    "projects.legal.overlay": "Website de serviços com chamadas para ação claras.",
    "projects.legal.title": "Legal Ventures Institute",
    "projects.legal.description": "Website público para o Legal Ventures Institute, com apresentação clara de serviços e fluxo de contacto.",
    "projects.space.overlay": "Cartão de apresentação do Space Ventures Institute com visual moderno e claro.",
    "projects.space.title": "Space Ventures Institute",
    "projects.space.description": "Website público para o Space Ventures Institute, focado em inovação e programas de venture.",
    "projects.actions.live": "Online",
    "projects.actions.code": "Código",
    "projects.actions.demo": "Demonstração",
    "projects.actions.viewSite": "Ver site",
    "about.intro": "Combino design visual, pensamento de produto e rigor de QA para entregar experiências digitais consistentes.",
    "about.heading": "Sobre",
    "about.subheading": "Resumo de carreira",
    "about.p1": "Profissional em transição, com percurso em artes e educação musical, atualmente focada em desenvolvimento de software e garantia de qualidade.",
    "about.p2": "Experiência em design UI/UX, desenvolvimento front-end e testes de QA, com competências em Python, JavaScript e tecnologias web modernas. Adaptação rápida a novos desafios e colaboração em equipas ágeis, com foco em resolução de problemas e criatividade. Apaixonada por criar soluções digitais centradas no utilizador e contribuir para projetos inovadores e orientados para a qualidade.",
    "about.skills.heading": "Competências",
    "about.skills.0": "Design UI/UX",
    "about.skills.1": "Desenvolvimento Front-End",
    "about.skills.2": "Garantia de Qualidade",
    "about.skills.3": "Integração de APIs",
    "about.skills.4": "Colaboração e Métodos Ágeis",
    "about.skills.5": "Automação de fluxos de trabalho",
    "about.skills.6": "Design de Sistemas Robóticos",
    "about.toolbox": "Ferramentas",
    "experience.heading": "Experiência",
    "experience.intro": "Experiência prática em produto, cruzando UI/UX, desenvolvimento, QA e automação em equipas multidisciplinares.",
    "experience.when": "Ago 2025 - Presente | Remoto",
    "experience.role": "Estágio | Web Design e Desenvolvimento | Gestão de Projeto | QA | Análise de Dados | Automação e Robótica",
    "experience.org": "FloLabs Innovations Group",
    "experience.p1": "A FloLabs é um venture studio que co-cria e lança empresas nas áreas de saúde, entretenimento, viagens e exploração espacial através de três pilares: Ventures Studio, Experiential Learning (Efestos Labs) e AI Robotics Lab.",
    "experience.p2": "No Hephaestus Labs Institute, estamos a reinventar modelos de escolas técnicas para formar talento em inovação e criar um ciclo sustentável de educação, inovação e reinvestimento.",
    "experience.focusLabel": "Projetos em foco:",
    "experience.focus.0": "MoodChanger.ai - sistema de bem-estar com neurociência, sensores wearables e feedback adaptativo para suporte emocional personalizado.",
    "experience.focus.1": "RoboCollective - marketplace colaborativo que liga engenheiros e organizações para criar e partilhar soluções de robótica.",
    "experience.focus.2": "Legal Ventures Institute - formação jurídica combinada com desenvolvimento de produto para soluções escaláveis.",
    "experience.highlightsLabel": "Destaques:",
    "experience.highlights.0": "Automação de workflows e design de sistemas robóticos.",
    "experience.highlights.1": "Design UI/UX para sistemas inteligentes.",
    "experience.highlights.2": "Integração de APIs e desenvolvimento de produto.",
    "experience.highlights.3": "Exposição à investigação em IA incorporada e robótica.",
    "experience.highlights.4": "Colaboração open-source em IA e robótica.",
    "contact.heading": "Contacto",
    "contact.intro": "Caso esteja a desenvolver algo com impacto, será um prazer conversar.",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.message": "Mensagem",
    "contact.form.send": "Enviar",
    "contact.preferEmail": "Prefere contacto por email?",
    "contact.linkedin": "LinkedIn",
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

let currentLanguage = localStorage.getItem(LANGUAGE_KEY);
if (currentLanguage !== LANG_EN && currentLanguage !== LANG_PT) {
  currentLanguage = LANG_EN;
}

function t(key) {
  return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS[LANG_EN][key] || key;
}

function setThemeToggleAria(theme) {
  if (!themeToggle) return;
  themeToggle.setAttribute("aria-label", theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark"));
}

function normalizeTheme(value) {
  return value === "light" ? "light" : "dark";
}

function applyTheme(mode) {
  const theme = normalizeTheme(mode);
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    setThemeToggleAria(theme);
    themeToggle.classList.toggle("is-dark", theme === "dark");
    themeToggle.classList.toggle("is-light", theme === "light");
  }
  if (themeIcon) {
    themeIcon.src = theme === "dark" ? THEME_ICONS.dark : THEME_ICONS.light;
  }
}

const saved = localStorage.getItem(THEME_KEY);
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
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
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

  if (toTop) {
    toTop.textContent = t("toTop.label");
    toTop.setAttribute("aria-label", t("toTop.aria"));
  }

  setThemeToggleAria(document.documentElement.getAttribute("data-theme") || "dark");
}

langToggle?.addEventListener("click", () => {
  applyTranslations(currentLanguage === LANG_PT ? LANG_EN : LANG_PT);
});

applyTranslations(currentLanguage);

// === Clickable project cards (works for .card[data-href] OR .card-link[data-href]) ===
document.querySelectorAll(".card[data-href], .card-link[data-href]").forEach((wrapper) => {
  const target = wrapper.matches(".card") ? wrapper : wrapper.querySelector(".card");
  if (!target) return;
  target.style.cursor = "pointer";
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "0");
  if (!target.hasAttribute("role")) target.setAttribute("role", "link");

  const open = () => {
    const url = wrapper.getAttribute("data-href");
    if (url) window.open(url, "_blank", "noopener");
  };

  target.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    open();
  });

  target.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });
});

document.querySelectorAll('.card[role="link"][data-href]').forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const url = card.getAttribute("data-href");
    if (url) window.open(url, "_blank", "noopener");
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const url = card.getAttribute("data-href");
      if (url) window.open(url, "_blank", "noopener");
    }
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
      dot.vx += fx;
      dot.vy += fy;
    };

    const onPointerMove = (event) => {
      const rect = dotGrid.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const now = performance.now();
      const dt = state.mouse.lastTime ? now - state.mouse.lastTime : 16;
      const vx = ((x - state.mouse.lastX) / dt) * 1000;
      const vy = ((y - state.mouse.lastY) / dt) * 1000;
      const speed = Math.hypot(vx, vy);
      const limiter = speed > settings.maxSpeed ? settings.maxSpeed / speed : 1;

      state.mouse.x = x;
      state.mouse.y = y;
      state.mouse.vx = vx * limiter;
      state.mouse.vy = vy * limiter;
      state.mouse.speed = speed * limiter;
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

if (sections.length && !prefersReducedMotion) {
  document.body.classList.add("reveal-on-scroll");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
}

