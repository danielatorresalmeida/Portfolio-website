// Export the same generated HTML used on the web, without another factual source.
import fs from 'node:fs';
import path from 'node:path';
import { buildChromeDriver, startStaticServer } from '../tests/e2e/_shared.mjs';
import { variants } from '../resume/variants/config.mjs';
const output = path.resolve(process.env.CV_OUTPUT_DIR || '../../outputs/fase3/CVs');
fs.mkdirSync(output, { recursive: true });
const server = await startStaticServer();
let driver;
try {
  driver = await buildChromeDriver();
  for (const id of Object.keys(variants)) {
    for (const lang of id === 'master' ? ['en', 'pt-PT'] : ['en']) {
      const route = id === 'master' ? '/resume-site-only/' : `/resume/variants/${id}/`;
      await driver.get(`${server.baseUrl}${route}?lang=${lang}`);
      await driver.executeAsyncScript('document.fonts.ready.then(arguments[arguments.length-1]);');
      await driver.executeScript("document.querySelectorAll('.contact-links [data-contact-reveal]').forEach(control => control.click());");
      const result = await driver.sendAndGetDevToolsCommand('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
      const name = id === 'master' ? `CV_Master_Software_Developer_${lang}.pdf` : `CV_${variants[id].company.replaceAll(' ', '_')}_Software_Developer.pdf`;
      fs.writeFileSync(path.join(output, name), Buffer.from(result.data, 'base64'));
      console.log(`Exported ${name}`);
    }
  }
} finally {
  if (driver) await driver.quit();
  await server.close();
}
