// Factual source for the public portfolio and every CV. Never edit generated copies.
// Evidence and unresolved details: docs/phase3-audit.md and docs/resume-content.md.
const l = (en, pt) => ({ en, 'pt-PT': pt });
export const profile = {
  name: 'Daniela Torres Almeida',
  location: 'Cascais / Lisbon area, Portugal',
  title: l('Software Developer / Front-End Developer in training', 'Software Developer / Front-End Developer em formação'),
  links: {
    portfolio: 'https://danielatorresalmeida.github.io/Portfolio-website/home/',
    github: 'https://github.com/danielatorresalmeida',
    linkedin: 'https://www.linkedin.com/in/daniela-torres-almeida-945884205/'
  },
  training: {
    technicalHours: 650, internshipHours: 400, status: 'in_progress',
    expectedStart: '2027-02/2027-03', provider: null, officialTitle: null, modules: [],
    description: l('Currently completing a 650-hour Software Development training programme, followed by a 400-hour curricular internship expected to begin in February/March 2027.', 'A frequentar uma formação de Software Development com 650 horas de componente técnica, seguida de um estágio curricular de 400 horas com início previsto para fevereiro/março de 2027.'),
    developing: l('Deepening software development through the current training programme and practical web projects.', 'A aprofundar desenvolvimento de software através da formação atual e de projetos web práticos.'),
    expected: l('Completion of the technical training before the internship. Module-level content awaits confirmation of the official programme.', 'Conclusão da componente técnica antes do estágio. Os conteúdos por módulo aguardam confirmação do programa oficial.')
  },
  summary: l('Software Developer in training focused on Front-End and Full-Stack Web Development, with practical startup experience in interfaces, APIs and automation. Project work combines React/TypeScript with Java/Spring Boot and PostgreSQL. Currently completing 650 hours of technical training ahead of a 400-hour curricular internship expected in February/March 2027, with interest in progressing to a Junior Developer role by mutual agreement.', 'Software Developer em formação, com foco em Front-End e desenvolvimento web Full-Stack e experiência prática numa startup em interfaces, APIs e automação. Os projetos combinam React/TypeScript com Java/Spring Boot e PostgreSQL. A frequentar 650 horas de formação técnica, antes de um estágio curricular de 400 horas previsto para fevereiro/março de 2027, com interesse em continuidade como Junior Developer por acordo mútuo.'),
  about: l('After working in music education, hospitality and language-related work, I moved into software development. An internship at a US technology startup gave me practical experience with front-end interfaces, APIs, automation and collaboration in a technology team. I now build React/TypeScript and Java/Spring projects while completing further Software Development training. UI/UX helps me make implementation decisions around usability. A 400-hour curricular internship, expected in February/March 2027, is the next step towards contributing in a development team and potentially continuing as a Junior Developer.', 'Depois de trabalhar em educação musical, hotelaria e tarefas linguísticas, passei para o desenvolvimento de software. Um estágio numa startup tecnológica americana deu-me experiência prática com interfaces frontend, APIs, automação e colaboração numa equipa tecnológica. Desenvolvo agora projetos React/TypeScript e Java/Spring enquanto frequento formação adicional em Software Development. UI/UX complementa as minhas decisões de implementação e usabilidade. O estágio curricular de 400 horas, previsto para fevereiro/março de 2027, é o próximo passo para contribuir numa equipa de desenvolvimento, com possibilidade de continuidade como Junior Developer.'),
  skills: {
    frontend: { title: l('Core · Front-End', 'Principais · Front-End'), items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Responsive interfaces', 'Accessibility'] },
    backend: { title: l('Core · Backend & data', 'Principais · Backend e dados'), items: ['Java', 'Spring Boot', 'REST APIs', 'JPA', 'PostgreSQL', 'SQL'] },
    engineering: { title: l('Core · Engineering foundations', 'Principais · Fundamentos de engenharia'), items: ['C', 'Git', 'GitHub', 'Automated testing', 'GitHub Actions / CI'] },
    additional: { title: l('Additional experience', 'Experiência adicional'), items: ['Python / FastAPI exposure', 'Firebase', 'Selenium', 'External API integration', 'Automation', 'Figma / UI/UX'] }
  },
  experience: [
    { id: 'flolabs', role: l('Software Development Intern', 'Estagiária de Desenvolvimento de Software'), organisation: 'FloLabs Innovations Group · Remote / US startup', dates: l('Aug 2025 - Sep 2026', 'Ago 2025 - Set 2026'), bullets: [l('Contributed to front-end interfaces and UI/UX implementation using HTML, CSS, JavaScript and TypeScript.', 'Contribuí para interfaces frontend e implementação de UI/UX com HTML, CSS, JavaScript e TypeScript.'), l('Worked with APIs, automation and integrations, including exposure to Python/FastAPI, alongside a technology team.', 'Trabalhei com APIs, automação e integrações, incluindo contacto com Python/FastAPI, numa equipa tecnológica.'), l('Supported testing and documentation of implementation work.', 'Apoiei testes e documentação do trabalho de implementação.')] },
    { id: 'llm', role: l('LLM Trainer · Portuguese & English', 'LLM Trainer · Português e Inglês'), organisation: l('Remote', 'Remoto'), dates: l('Aug 2024 - Sep 2026', 'Ago 2024 - Set 2026'), bullets: [l('Reviewed AI-generated prompts and responses for linguistic accuracy and cultural relevance.', 'Revi prompts e respostas gerados por IA quanto à correção linguística e adequação cultural.')] },
    { id: 'previous', role: l('Earlier experience', 'Experiência anterior'), organisation: '', dates: '2016 - 2025', bullets: [l('Music educator (2018-2025); cook and baker roles (2016-2018). Experience in communication, teamwork and precise execution.', 'Educação musical (2018-2025); funções de cozinha e padaria (2016-2018). Experiência de comunicação, trabalho em equipa e execução rigorosa.')] }
  ],
  education: [
    l('Kitchen Management & Production, Level V course · Escola de Hotelaria e Turismo de Setúbal · 2015-2016', 'Curso de Gestão e Produção de Cozinha, Nível V · Escola de Hotelaria e Turismo de Setúbal · 2015-2016'),
    l('Secondary education, Science & Technology · Escola Secundária de Vergílio Ferreira · 2013-2015', 'Ensino secundário, Ciências e Tecnologias · Escola Secundária de Vergílio Ferreira · 2013-2015'),
    l('Viola d’arco studies, 8th grade · 2006-2018', 'Formação em Viola d’Arco, 8.º grau · 2006-2018')
  ],
  additionalTraining: l('IEFP · Conceção de Web sites (UFCD 7903), 25h, completed March 2026. UI/UX and Figma complement practical interface development.', 'IEFP · Conceção de Web sites (UFCD 7903), 25h, concluída em março de 2026. UI/UX e Figma complementam o desenvolvimento prático de interfaces.'),
  languages: l('Portuguese: native · English: very good spoken and written command (self-assessed)', 'Português: língua materna · Inglês: muito bom domínio oral e escrito (autoavaliação)'),
  projects: {
    devflow: { name: 'DevFlow Hub', repo: 'https://github.com/danielatorresalmeida/DevFlow_Hub', demo: null, review: 'https://github.com/danielatorresalmeida/DevFlow_Hub/pull/53', image: 'assets/devflow-hub.png', stack: ['React', 'TypeScript', 'Java 21', 'Spring Boot', 'PostgreSQL'],
      objective: l('Manage projects, tasks and team access in a full-stack web application.', 'Gerir projetos, tarefas e acesso de equipas numa aplicação web Full-Stack.'),
      contribution: l('Implemented a React/TypeScript client, a Spring Boot REST API and PostgreSQL persistence, with automated backend/frontend validation.', 'Implementei um cliente React/TypeScript, uma API REST Spring Boot e persistência PostgreSQL, com validação automatizada backend/frontend.'),
      features: [l('JWT authentication and project/task workflows', 'Autenticação JWT e fluxos de projetos/tarefas'), l('System roles and project memberships', 'Papéis globais e memberships de projeto'), l('Document resource authorization', 'Autorização de documentos por recurso'), l('Automated tests, CI and reproducible local demo', 'Testes automatizados, CI e demo local reproduzível')],
      demonstrates: l('API design, persistence, authorization rules and regression testing.', 'Desenho de APIs, persistência, regras de autorização e testes de regressão.'),
      status: l('Phase 2 validated in PR #53 · merge pending', 'Fase 2 validada na PR #53 · merge pendente'),
      short: l('Full-stack project/task management with JWT, PostgreSQL and automated validation. System roles, document authorization and a reproducible demo are validated in PR #53; merge pending.', 'Gestão Full-Stack de projetos/tarefas com JWT, PostgreSQL e validação automatizada. Papéis globais, autorização de documentos e demo reproduzível validados na PR #53; merge pendente.') },
    portfolio: { name: 'Portfolio Website', repo: 'https://github.com/danielatorresalmeida/Portfolio-website', demo: 'https://danielatorresalmeida.github.io/Portfolio-website/home/', image: 'assets/project-portfolio.2026-05-14.png', stack: ['HTML', 'CSS', 'JavaScript', 'Selenium'],
      objective: l('Present professional experience and technical work in an accessible web portfolio.', 'Apresentar experiência profissional e trabalho técnico num portfolio web acessível.'),
      contribution: l('Designed and implemented the responsive interface, bilingual content and browser interactions, with automated checks.', 'Desenhei e implementei a interface responsiva, conteúdo bilingue e interações no browser, com verificações automatizadas.'),
      features: [l('Responsive layouts and keyboard navigation', 'Layouts responsivos e navegação por teclado'), l('English/Portuguese and light/dark themes', 'Inglês/Português e temas claro/escuro'), l('Unit, accessibility, Selenium and visual checks', 'Testes unitários, acessibilidade, Selenium e verificações visuais')],
      demonstrates: l('Semantic HTML, accessible interaction and frontend quality workflows.', 'HTML semântico, interação acessível e validação de qualidade frontend.'), status: l('Published portfolio', 'Portfolio publicado'), short: l('Responsive bilingual HTML/CSS/JavaScript portfolio with keyboard navigation, theme controls and automated accessibility, Selenium and visual checks.', 'Portfolio responsivo bilingue em HTML/CSS/JavaScript, com navegação por teclado, temas e verificações automatizadas de acessibilidade, Selenium e regressão visual.') },
    todo: { name: 'To-Do List App', repo: 'https://github.com/danielatorresalmeida/To-Do-List-App', demo: null, image: 'assets/Todo_APP_Shot.png', stack: ['React', 'TypeScript', 'Firebase'],
      objective: l('Organise personal tasks with authentication and calendar integration.', 'Organizar tarefas pessoais com autenticação e integração de calendário.'),
      contribution: l('Implemented React/TypeScript task flows with Firebase authentication, synchronisation and Google Calendar integration.', 'Implementei fluxos de tarefas em React/TypeScript com autenticação Firebase, sincronização e integração Google Calendar.'),
      features: [l('Authenticated task management', 'Gestão autenticada de tarefas'), l('Task synchronisation', 'Sincronização de tarefas'), l('Google Calendar integration and logic tests', 'Integração Google Calendar e testes de lógica')], demonstrates: l('State management, external services and tested task logic.', 'Gestão de estado, serviços externos e lógica de tarefas testada.'), status: l('Source available', 'Código disponível'), short: l('React/TypeScript task application with Firebase authentication, synchronisation, Google Calendar integration and logic tests.', 'Aplicação de tarefas React/TypeScript com autenticação Firebase, sincronização, integração Google Calendar e testes de lógica.') },
    penguin: { name: 'Penguin Fishing Game', repo: 'https://github.com/danielatorresalmeida/Projeto_Final_C_Penguin_Fishing_Game', demo: null, image: 'assets/penguin-fishing-game.png', stack: ['C'],
      objective: l('Build a terminal game around player choices and progression.', 'Construir um jogo de terminal com escolhas do jogador e progressão.'),
      contribution: l('Implemented a modular C game with explicit state, input validation and progression across sessions.', 'Implementei um jogo modular em C com estado explícito, validação de input e progressão entre sessões.'),
      features: [l('Modular game logic', 'Lógica de jogo modular'), l('Validated terminal input', 'Input de terminal validado'), l('State and session progression', 'Estado e progressão entre sessões')], demonstrates: l('Programming fundamentals, control flow and decomposition.', 'Fundamentos de programação, controlo de fluxo e decomposição.'), status: l('Academic C project · local execution', 'Projeto académico em C · execução local'), short: l('Modular C terminal game demonstrating state management, input validation and progression across sessions.', 'Jogo modular de terminal em C que demonstra gestão de estado, validação de input e progressão entre sessões.') }
  }
};

export function localize(value, lang = 'en') {
  if (value === null || typeof value !== 'object') return value;
  if ('en' in value && 'pt-PT' in value) return value[lang] ?? value.en;
  if (Array.isArray(value)) return value.map(item => localize(item, lang));
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, lang)]));
}
