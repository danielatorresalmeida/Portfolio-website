import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { profile, localize } from '../resume/data/base.mjs';
import { variants } from '../resume/variants/config.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const mainScript = read('script.js');
const declaration = mainScript.slice(mainScript.indexOf('const TRANSLATIONS ='), mainScript.indexOf('let currentLanguage'));
const maps = Function('LANG_EN', 'LANG_PT', `${declaration}; return TRANSLATIONS;`)('en-US', 'pt-PT');
function resume(id = 'master') {
  const dom = new JSDOM(read(id === 'master' ? 'resume-site-only/index.html' : `resume/variants/${id}/index.html`));
  const data = JSON.parse(dom.window.document.getElementById('cv-data').textContent);
  dom.window.close();
  return data;
}
describe('shared factual content and i18n contract', () => {
  it('provides both languages for every live portfolio translation key', () => {
    const dom = new JSDOM(read('index.html'));
    for (const element of dom.window.document.querySelectorAll('*')) {
      for (const attribute of element.attributes) {
        if (!attribute.name.startsWith('data-i18n')) continue;
        expect(maps['en-US'][attribute.value], attribute.value).toBeTruthy();
        expect(maps['pt-PT'][attribute.value], attribute.value).toBeTruthy();
      }
    }
    expect(Object.keys(maps['en-US']).sort()).toEqual(Object.keys(maps['pt-PT']).sort());
    dom.window.close();
  });
  it('keeps completed experience and ongoing training truthful across all variants', () => {
    for (const id of Object.keys(variants)) {
      const data = resume(id);
      for (const lang of ['en', 'pt-PT']) {
        const dom = new JSDOM(data.contents[lang]);
        const text = dom.window.document.body.textContent;
        expect(text).toContain('1050'); expect(text).toContain('600'); expect(text).toContain('350'); expect(text).toContain('400'); expect(text).toContain('2027');
        expect(text).toContain(lang === 'en' ? 'Sep 2026' : 'Set 2026');
        expect(text).not.toMatch(/Present|Presente|20%|30%|50%|10\+|fully secure|production ready/i);
        expect(text).toContain(lang === 'en' ? 'In progress: 22 Sep 2026' : 'Em curso: 22 set 2026');
        expect(text).toContain(lang === 'en' ? 'merge pending' : 'merge pendente');
        dom.window.close();
      }
    }
  });
  it('keeps all variants on the same factual experience, skills and project descriptions', () => {
    for (const [id, variant] of Object.entries(variants)) for (const lang of ['en', 'pt-PT']) {
      const p = localize(profile, lang), dom = new JSDOM(resume(id).contents[lang]);
      const document = dom.window.document;
      for (const job of p.experience) {
        const section = document.querySelector(`[data-experience-id="${job.id}"]`);
        expect(section.textContent).toContain(job.dates);
        for (const bullet of job.bullets) expect(section.textContent).toContain(bullet);
      }
      expect([...document.querySelectorAll('[data-project-id]')].map(e => e.dataset.projectId)).toEqual(variant.projects);
      for (const projectId of variant.projects) expect(document.querySelector(`[data-project-id="${projectId}"]`).textContent).toContain(variant.projectDescriptions?.[projectId] ? localize(variant.projectDescriptions[projectId], lang) : p.projects[projectId].short);
      for (const group of Object.values(p.skills)) for (const skill of group.items) expect(document.querySelector('#skills-col').textContent).toContain(skill);
      dom.window.close();
    }
  });
  it('uses four selected portfolio projects in the agreed order and working CV language routes', () => {
    const dom = new JSDOM(read('index.html')), document = dom.window.document;
    expect([...document.querySelectorAll('#project-grid > .card h3')].map(e => e.textContent)).toEqual(['DevFlow Hub', 'Portfolio Website', 'To-Do List App', 'Penguin Fishing Game']);
    const link = document.getElementById('contact-cv-link');
    expect(link.dataset.cvEn).toBe('./resume-site-only/?lang=en&download=1');
    expect(link.dataset.cvPt).toBe('./resume-site-only/?lang=pt-PT&download=1');
    expect(document.querySelector('#experience').textContent).not.toMatch(/Present|Presente|20%/);
    dom.window.close();
  });
  it('keeps company versions out of search indexes and shares styles/runtime', () => {
    for (const id of Object.keys(variants)) {
      const dom = new JSDOM(read(id === 'master' ? 'resume-site-only/index.html' : `resume/variants/${id}/index.html`));
      const document = dom.window.document;
      if (id !== 'master') expect(document.querySelector('meta[name="robots"]').content).toBe('noindex,nofollow');
      expect(document.querySelector('link[rel="stylesheet"]').href).toContain('resume/shared/cv.css');
      expect(document.querySelector('script[src]').src).toContain('resume-site-only/script.js');
      expect(document.querySelectorAll('h1')).toHaveLength(1);
      dom.window.close();
    }
  });
  it('keeps translated CV sections aligned and free of replacement characters', () => {
    for (const id of Object.keys(variants)) {
      const data = resume(id), en = new JSDOM(data.contents.en), pt = new JSDOM(data.contents['pt-PT']);
      expect([...en.window.document.querySelectorAll('section')].map(e => e.id)).toEqual([...pt.window.document.querySelectorAll('section')].map(e => e.id));
      expect(data.contents['pt-PT']).not.toContain('\uFFFD');
      expect(pt.window.document.querySelector('#intro-section h2').textContent).toBe('Resumo Profissional');
      en.window.close(); pt.window.close();
    }
  });
});
