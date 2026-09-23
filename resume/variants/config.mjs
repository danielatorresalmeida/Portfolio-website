// Positioning supplied by the candidate, not researched claims about live vacancies.
// Only presentation changes belong here; all factual content lives in data/base.mjs.
export const variants = {
  gmv: {
    company: 'GMV', emphasis: 'Internship: Software Engineer',
    pdfName: 'Daniela_Torres_Almeida_CV_GMV_Software_Engineer_Intern.pdf',
    projects: ['devflow', 'portfolio', 'todo', 'penguin'],
    skills: ['backend', 'frontend', 'engineering', 'additional'], experienceBullets: [0, 1, 2],
    summary: {
      en: 'Software Developer in training with practical full-stack web development experience: Java/Spring Boot REST APIs, PostgreSQL and React/TypeScript interfaces built with HTML, CSS and JavaScript, supported by automated testing and CI. Previous internship at a US-based technology startup involved Front-End development, APIs, integrations and automation. Currently completing the Software Developer programme at CESAE Digital, with a 400-hour curricular internship scheduled from 1 March to 20 May 2027 and an interest in progressing to a Junior Software Developer role.',
      'pt-PT': 'Software Developer em formação, com experiência prática em desenvolvimento web Full-Stack: APIs REST em Java/Spring Boot, PostgreSQL e interfaces React/TypeScript com HTML, CSS e JavaScript, apoiados por testes automatizados e CI. O estágio anterior numa startup tecnológica americana incluiu desenvolvimento Front-End, APIs, integrações e automação. A frequentar atualmente o programa Software Developer no CESAE Digital, com um estágio curricular de 400 horas previsto de 1 de março a 20 de maio de 2027 e interesse em progressão para Junior Software Developer.'
    },
    skillTitles: {
      backend: { en: 'Core · Backend & Software Development', 'pt-PT': 'Principais · Backend e desenvolvimento de software' },
      frontend: { en: 'Core · Web / Front-End', 'pt-PT': 'Principais · Web / Front-End' },
      engineering: { en: 'Engineering foundations', 'pt-PT': 'Fundamentos de engenharia' }
    },
    skillPrefixes: { engineering: ['OOP'] },
    skillOrder: { frontend: [2, 3, 4, 1, 0, 5, 6], engineering: [1, 2, 3, 4, 0] },
    projectDescriptions: { devflow: {
      en: 'Full-stack project-management application with a Java 21/Spring Boot REST API, React/TypeScript frontend, PostgreSQL, JWT authentication, automated backend/frontend tests and CI. System roles and document authorization validated in PR #53; merge pending.',
      'pt-PT': 'Aplicação Full-Stack de gestão de projetos com API REST Java 21/Spring Boot, frontend React/TypeScript, PostgreSQL, autenticação JWT, testes automatizados backend/frontend e CI. Papéis globais e autorização de documentos validados na PR #53; merge pendente.'
    } }
  },
  master: { company: null, emphasis: 'Front-End & Full-Stack Web Development', projects: ['devflow', 'portfolio', 'todo', 'penguin'], skills: ['frontend', 'backend', 'engineering', 'additional'], experienceBullets: [0, 1, 2] },
  celfocus: { company: 'Celfocus', emphasis: 'Software Engineering, Full-Stack Development & APIs', projects: ['devflow', 'todo', 'portfolio', 'penguin'], skills: ['backend', 'frontend', 'engineering', 'additional'], experienceBullets: [1, 0, 2] },
  'premium-minds': { company: 'Premium Minds', emphasis: 'Front-End Development, Accessibility & Testing', projects: ['devflow', 'portfolio', 'todo', 'penguin'], skills: ['frontend', 'engineering', 'backend', 'additional'], experienceBullets: [0, 2, 1] },
  'create-it': { company: 'Create IT', emphasis: 'Software Development across Front-End, REST APIs & Databases', projects: ['devflow', 'portfolio', 'todo', 'penguin'], skills: ['frontend', 'backend', 'engineering', 'additional'], experienceBullets: [0, 1, 2] },
  'capgemini-engineering': { company: 'Capgemini Engineering', emphasis: 'Software Engineering, Java, Automation & Testing', projects: ['devflow', 'penguin', 'portfolio', 'todo'], skills: ['backend', 'engineering', 'frontend', 'additional'], experienceBullets: [1, 2, 0] },
  noesis: { company: 'Noesis', emphasis: 'Software Development, API Integration & Automation', projects: ['devflow', 'todo', 'portfolio', 'penguin'], skills: ['backend', 'frontend', 'engineering', 'additional'], experienceBullets: [1, 0, 2] },
  opensoft: { company: 'Opensoft', emphasis: 'Java / Spring Boot, SQL & Full-Stack Development', projects: ['devflow', 'todo', 'portfolio', 'penguin'], skills: ['backend', 'engineering', 'frontend', 'additional'], experienceBullets: [1, 0, 2] }
};
