import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { profile, localize } from '../resume/data/base.mjs';
import { escape } from '../resume/render.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'index.html'), scriptPath = path.join(root, 'script.js');
const dom = new JSDOM(fs.readFileSync(htmlPath, 'utf8')), doc = dom.window.document;
let script = fs.readFileSync(scriptPath, 'utf8');
const start = script.indexOf('const TRANSLATIONS ='), end = script.indexOf('let currentLanguage', start);
const old = Function('LANG_EN', 'LANG_PT', `${script.slice(start, end)}; return TRANSLATIONS;`)('en-US', 'pt-PT');
const maps = { 'en-US': { ...old['en-US'] }, 'pt-PT': { ...old['pt-PT'] } };
const put = (key, en, pt) => { maps['en-US'][key] = en; maps['pt-PT'][key] = pt; return `data-i18n="${key}"`; };
const node = (tag, key, en, pt, extra = '') => `<${tag} ${extra} ${put(key, en, pt)}>${escape(en)}</${tag}>`;

put('hero.kicker', profile.title.en, profile.title['pt-PT']);
put('hero.title', profile.name, profile.name);
put('hero.lead', 'I build web interfaces and APIs with React, TypeScript and Java/Spring Boot, drawing on practical startup experience and ongoing Software Development training.', 'Desenvolvo interfaces web e APIs com React, TypeScript e Java/Spring Boot, com experiência prática numa startup e formação em Software Development em curso.');
put('hero.highlights.0.title', 'Practical experience', 'Experiência prática');
put('hero.highlights.0.text', 'Front-end interfaces, APIs and automation in a technology startup.', 'Interfaces frontend, APIs e automação numa startup tecnológica.');
put('hero.highlights.1.title', 'Training in progress', 'Formação em curso');
put('hero.highlights.1.text', '650 hours of technical Software Development training.', '650 horas de formação técnica em Software Development.');
put('hero.highlights.2.title', 'Next step · 2027', 'Próxima etapa · 2027');
put('hero.highlights.2.text', '400-hour curricular internship, expected February/March, with interest in continuing as a Junior Developer.', 'Estágio curricular de 400 horas, previsto para fevereiro/março, com interesse em continuidade como Junior Developer.');
doc.querySelector('.hero .cta').innerHTML = `<a class="btn btn-light" href="#projects" data-i18n="hero.cta.work">View Projects</a><a class="btn btn-ghost" href="./resume-site-only/" ${put('hero.cta.cv', 'View Resume / CV', 'Ver CV')}>View Resume / CV</a><a class="btn btn-ghost" href="${profile.links.github}" target="_blank" rel="noopener">GitHub</a><a class="btn btn-ghost" href="${profile.links.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a class="btn btn-ghost" href="#contact" data-i18n="hero.cta.contact">Contact Me</a>`;

doc.querySelector('.core-stack').innerHTML = `<div class="container">${node('h2', 'coreStack.heading', 'Technical skills backed by practical work', 'Competências técnicas demonstradas na prática', 'id="core-stack-heading"')}${node('p', 'coreStack.note', 'Core technologies are demonstrated in selected projects. Additional experience is listed separately; no arbitrary proficiency scores.', 'As tecnologias principais são demonstradas nos projetos selecionados. A experiência adicional aparece separadamente, sem níveis arbitrários.', 'class="core-stack-note"')}<div class="core-stack-grid">${Object.entries(profile.skills).map(([id, group]) => `<article class="core-stack-card">${node('h3', `coreStack.${id}.title`, group.title.en, group.title['pt-PT'])}<div class="core-stack-tags">${group.items.map((item, n) => node('span', `coreStack.${id}.item.${n}`, localize(item, 'en'), localize(item, 'pt-PT'))).join('')}</div></article>`).join('')}</div></div>`;

const cards = Object.entries(profile.projects).map(([id, p]) => `<article class="card" ${p.demo ? `data-href="${p.demo}" tabindex="0"` : ''} aria-labelledby="project-card-title-${id}"><div class="card-media"><img src="${p.image}" alt="${escape(p.alt)}" width="720" height="480" loading="lazy" decoding="async"></div><div class="card-body">${node('p', `projects.${id}.status`, p.status.en, p.status['pt-PT'], 'class="project-status"')}<h3 id="project-card-title-${id}">${escape(p.name)}</h3>${node('p', `projects.${id}.objective`, p.objective.en, p.objective['pt-PT'], 'class="project-summary"')}${node('p', `projects.${id}.contribution`, p.contribution.en, p.contribution['pt-PT'], 'class="project-contribution"')}<ul class="project-flow">${p.features.map((feature, n) => node('li', `projects.${id}.feature.${n}`, feature.en, feature['pt-PT'])).join('')}</ul>${node('p', `projects.${id}.demonstrates`, p.demonstrates.en, p.demonstrates['pt-PT'], 'class="project-proof"')}<div class="tags">${p.stack.map(item => `<span>${escape(item)}</span>`).join('')}</div><div class="links"><a class="btn btn-light" href="${p.repo}" target="_blank" rel="noopener">GitHub</a>${p.demo ? `<a class="btn btn-ghost" href="${p.demo}" target="_blank" rel="noopener" ${put(`projects.${id}.demoLabel`, p.demoLabel?.en || 'Live site', p.demoLabel?.['pt-PT'] || 'Ver website')}>${escape(p.demoLabel?.en || 'Live site')}</a>` : ''}${p.review ? `<a class="btn btn-ghost" href="${p.review}" target="_blank" rel="noopener" ${put('projects.review', 'Validated Phase 2 PR', 'PR da Fase 2 validada')}>Validated Phase 2 PR</a>` : ''}</div></div></article>`).join('');
doc.querySelector('#projects').innerHTML = `<div class="container">${node('h2', 'projects.heading', 'Selected projects', 'Projetos selecionados')}${node('p', 'projects.intro', 'Four projects showing full-stack implementation, front-end quality and programming fundamentals. Technical details and known limitations are documented in their repositories.', 'Quatro projetos que mostram implementação Full-Stack, qualidade frontend e fundamentos de programação. Os detalhes técnicos e limitações conhecidas estão documentados nos repositórios.', 'class="section-intro"')}<div class="grid cards" id="project-grid">${cards}</div></div>`;

doc.querySelector('#figma-designs').innerHTML = `<div class="container">${node('h2', 'figma.heading', 'UI/UX as a development complement', 'UI/UX como complemento ao desenvolvimento')}${node('p', 'figma.intro', 'I use UI/UX thinking and Figma to support interface structure, responsive layouts and usability decisions. The selected projects above show how those decisions translate into code.', 'Uso princípios de UI/UX e Figma para apoiar a estrutura das interfaces, layouts responsivos e decisões de usabilidade. Os projetos selecionados mostram como essas decisões se traduzem em código.', 'class="section-intro"')}</div>`;
put('nav.figma', 'UI/UX', 'UI/UX');
doc.querySelector('#skills-by-project')?.remove();
doc.querySelector('#selected-strengths')?.remove();
doc.querySelector('#about').innerHTML = `<div class="container">${node('h2', 'about.heading', 'About', 'Sobre mim')}${node('p', 'about.story', profile.about.en, profile.about['pt-PT'], 'class="profile-story"')}</div>`;
doc.querySelector('#courses').innerHTML = `<div class="container">${node('h2', 'courses.heading', 'Software Development training', 'Formação em Software Development')}${node('p', 'training.description', profile.training.description.en, profile.training.description['pt-PT'])}<div class="training-grid"><article>${node('h3', 'training.demonstrated.title', 'Already demonstrated', 'Já demonstrado')}${node('p', 'training.demonstrated.body', 'React/TypeScript, Java/Spring Boot, REST APIs, SQL, C, Git, testing and CI are evidenced by the selected projects.', 'React/TypeScript, Java/Spring Boot, APIs REST, SQL, C, Git, testes e CI têm evidência nos projetos selecionados.')}</article><article>${node('h3', 'training.developing.title', 'Currently developing', 'Em desenvolvimento')}${node('p', 'training.developing.body', profile.training.developing.en, profile.training.developing['pt-PT'])}</article><article>${node('h3', 'training.expected.title', 'Expected before internship', 'Previsto antes do estágio')}${node('p', 'training.expected.body', profile.training.expected.en, profile.training.expected['pt-PT'])}</article></div>${node('p', 'training.additional', profile.additionalTraining.en, profile.additionalTraining['pt-PT'])}</div>`;
doc.querySelector('#experience').innerHTML = `<div class="container">${node('h2', 'experience.heading', 'Experience', 'Experiência')}<div class="timeline">${profile.experience.map(job => `<article class="item"><div class="when" ${put(`experience.${job.id}.dates`, typeof job.dates === 'string' ? job.dates : job.dates.en, typeof job.dates === 'string' ? job.dates : job.dates['pt-PT'])}></div><div class="what">${node('h3', `experience.${job.id}.role`, job.role.en, job.role['pt-PT'])}${job.organisation ? node('p', `experience.${job.id}.organisation`, localize(job.organisation, 'en'), localize(job.organisation, 'pt-PT')) : ''}${job.bullets.map((b, n) => node('p', `experience.${job.id}.bullet.${n}`, b.en, b['pt-PT'])).join('')}</div></article>`).join('')}</div></div>`;
put('contact.intro', 'Let’s discuss a 400-hour Software Development curricular internship expected to start in February/March 2027, and the possibility of continuing as a Junior Developer if it is a good fit for both sides.', 'Podemos conversar sobre um estágio curricular de 400 horas em Software Development, com início previsto para fevereiro/março de 2027, e sobre a possibilidade de continuidade como Junior Developer se houver interesse mútuo.');

const title = 'Daniela Torres Almeida | Software Developer / Front-End Developer';
const description = 'Software Developer in training in Cascais, Portugal. React/TypeScript, Java/Spring Boot and APIs. Seeking a 400-hour curricular internship from February/March 2027.';
doc.title = title;
for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) doc.querySelector(selector)?.setAttribute('content', description);
for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) doc.querySelector(selector)?.setAttribute('content', title);
const wanted = new Set();
for (const element of doc.querySelectorAll('*')) for (const attribute of element.attributes) if (attribute.name.startsWith('data-i18n')) wanted.add(attribute.value);
for (const key of Object.keys(maps['en-US'])) if (/^(theme\.|lang\.|toTop\.|contact\.|nav\.menu)/.test(key)) wanted.add(key);
for (const lang of Object.keys(maps)) maps[lang] = Object.fromEntries(Object.entries(maps[lang]).filter(([key]) => wanted.has(key)));
for (const attr of ['data-i18n', 'data-i18n-html', 'data-i18n-placeholder', 'data-i18n-aria']) for (const element of doc.querySelectorAll(`[${attr}]`)) {
  const value = maps['en-US'][element.getAttribute(attr)];
  if (!value) continue;
  if (attr === 'data-i18n-html') element.innerHTML = value;
  else if (attr === 'data-i18n-placeholder') element.setAttribute('placeholder', value);
  else if (attr === 'data-i18n-aria') element.setAttribute('aria-label', value);
  else element.textContent = value;
}
const declaration = `// Generated profile copy from resume/data/base.mjs; run npm run build:profile.\nconst TRANSLATIONS = {\n  [LANG_EN]: ${JSON.stringify(maps['en-US'], null, 2)},\n  [LANG_PT]: ${JSON.stringify(maps['pt-PT'], null, 2)}\n};\n\n`;
// The generated comment is kept outside the replaceable declaration.
script = script.slice(0, start).replace(/\/\/ Generated profile copy[^\n]*\n$/, '') + declaration + script.slice(end);
fs.writeFileSync(scriptPath, script);
fs.writeFileSync(htmlPath, dom.serialize() + '\n');
dom.window.close();
console.log('Updated portfolio content from shared facts. Run npm run sync:home.');
