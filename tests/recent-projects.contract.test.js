import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => fs.readFileSync(path.join(root,name), 'utf8');

describe('featured recent projects', () => {
  it('presents OPUS as a case study, not a live Laravel application', () => {
    const doc = new JSDOM(read('index.html')).window.document;
    const opus = doc.querySelector('.recent-project-opus');
    expect(opus).not.toBeNull();
    expect(opus.querySelector('a[href="projects/opus/"]')).not.toBeNull();
    expect(opus.querySelector('a[href="https://github.com/danielatorresalmeida/opus-laravel"]')).not.toBeNull();
    expect(opus.querySelector('[data-i18n="recent.opus.note"]')).not.toBeNull();
    expect(fs.existsSync(path.join(root,'assets/opus-mark.svg'))).toBe(true);
  });

  it('links the published browser task manager and distinguishes simulated sign-in', () => {
    const doc = new JSDOM(read('index.html')).window.document;
    const tasks = doc.querySelector('.recent-project-tasks');
    expect(tasks).not.toBeNull();
    expect(tasks.querySelector('a[href="https://danielatorresalmeida.github.io/gestor-tarefas-inteligente/"]')).not.toBeNull();
    expect(tasks.querySelector('[data-i18n="recent.tasks.note"]')).not.toBeNull();
    expect(doc.querySelectorAll('#project-grid > .card').length).toBe(4);
  });

  it('keeps build-profile aware of the maintained featured fragment', () => {
    const builder = read('scripts/build-profile.mjs');
    expect(builder).toContain('fragments/recent-projects.fragment');
    expect(builder).toContain('${recentProjectsHtml}');
  });
});
