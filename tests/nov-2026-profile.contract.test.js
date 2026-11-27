import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { profile, localize } from '../resume/data/base.mjs';
import { variants } from '../resume/variants/config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');

describe('November 2026 professional profile update', () => {
  it('reflects completed CESAE project work and 2027 internship availability', () => {
    expect(profile.projects.opus.status.en).toMatch(/Completed/);
    expect(profile.projects.opus.demo).toBeNull();
    expect(profile.projects.tasks.demo).toContain('github.io');
    expect(profile.summary.en).toContain('21 May 2027');
    expect(profile.summary['pt-PT']).toContain('21 de maio de 2027');
    expect(profile.skills.backend.items).toEqual(expect.arrayContaining(['PHP','Laravel','MySQL','Blade']));
    expect(profile.skills.additional.items.some(x => localize(x,'en') === 'C# (in training)')).toBe(true);
  });

  it('keeps shared CV variants consistent with the source of truth', () => {
    for(const [id,variant] of Object.entries(variants)) {
      expect(variant.projects).toContain('opus');
      expect(variant.projects).toContain('tasks');
      const file = id==='master'?'resume-site-only/index.html':`resume/variants/${id}/index.html`;
      const doc = new JSDOM(read(file)).window.document;
      const data = JSON.parse(doc.getElementById('cv-data').textContent);
      for(const lang of ['en','pt-PT']) {
        const cv = new JSDOM(data.contents[lang]).window.document;
        expect(cv.querySelector('[data-project-id="opus"]')).not.toBeNull();
        expect(cv.querySelector('[data-project-id="tasks"]')).not.toBeNull();
        expect(cv.querySelector('#skills-col').textContent).toContain('Laravel');
      }
    }
  });

  it('shows current information in the homepage and its language variants', () => {
    const html = read('index.html');
    const doc = new JSDOM(html).window.document;
    expect(doc.querySelector('.hero .lead').textContent).toContain('Laravel');
    expect(doc.querySelector('#about').textContent).toContain('music teacher');
    expect(doc.querySelector('#courses').textContent).toContain('Laravel');
    expect(doc.querySelector('#project-grid > .card')).not.toBeNull();
    expect(doc.querySelectorAll('#project-grid > .card')).toHaveLength(4);
    expect(doc.querySelector('.recent-project-opus')).not.toBeNull();
    const script = read('script.js');
    expect(script).toContain('21 de maio de 2027');
    expect(script).toContain('Fui professora de música');
  });
});
