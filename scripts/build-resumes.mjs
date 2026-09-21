import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { variants } from '../resume/variants/config.mjs';
import { cvPage } from '../resume/render.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
for (const [id, variant] of Object.entries(variants)) {
  const destination = path.join(root, id === 'master' ? 'resume-site-only/index.html' : `resume/variants/${id}/index.html`);
  const content = cvPage(id, variant);
  if (check) {
    if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8') !== content) throw new Error(`Stale CV: ${id}. Run npm run build:resumes.`);
  } else {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content);
  }
}
console.log(`${check ? 'Verified' : 'Generated'} master and six company CVs from shared facts.`);
