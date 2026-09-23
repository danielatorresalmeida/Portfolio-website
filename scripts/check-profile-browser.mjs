import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import axe from 'axe-core';
import { buildChromeDriver, startStaticServer } from '../tests/e2e/_shared.mjs';
import { variants } from '../resume/variants/config.mjs';
const output = path.resolve('../../outputs/fase3/browser');
fs.mkdirSync(output, { recursive: true });
const server = await startStaticServer();
let driver;
try {
  driver = await buildChromeDriver();
  for (const id of Object.keys(variants)) {
    const route = id === 'master' ? '/resume-site-only/' : `/resume/variants/${id}/`;
    for (const lang of ['en', 'pt-PT']) {
      await driver.get(`${server.baseUrl}${route}?lang=${lang}`);
      await driver.manage().window().setRect({ width: 390, height: 844 });
      await driver.sendAndGetDevToolsCommand('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
      assert.equal(await driver.executeScript('return window.innerWidth'), 390);
      assert.equal(await driver.executeScript('return document.documentElement.scrollWidth <= window.innerWidth'), true, `${id}/${lang} horizontal overflow`);
      assert.equal(await driver.executeScript('return document.documentElement.lang'), lang);
      await driver.executeScript(axe.source);
      const violations = await driver.executeAsyncScript("const done=arguments[arguments.length-1]; axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa']}}).then(r=>done(r.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))));");
      assert.deepEqual(violations, [], `${id}/${lang} accessibility`);
    }
  }
  for (const width of [390, 1366]) {
    for (const lang of ['en', 'pt-PT']) {
      await driver.manage().window().setRect({ width, height: 1000 });
      await driver.sendAndGetDevToolsCommand('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false });
      await driver.get(`${server.baseUrl}/`);
      await driver.executeScript("localStorage.setItem('portfolio-language',arguments[0]);", lang === 'en' ? 'en-US' : lang);
      await driver.navigate().refresh();
      await driver.executeAsyncScript("const done=arguments[arguments.length-1]; document.querySelectorAll('img').forEach(i=>i.loading='eager'); Promise.all([document.fonts.ready,...[...document.images].map(i=>i.decode().catch(()=>{}))]).then(()=>setTimeout(done,350));");
      await driver.executeAsyncScript("const done=arguments[arguments.length-1]; (async()=>{document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.documentElement.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,800));done();})().catch(e=>done(String(e)));");
      assert.equal(await driver.executeScript('return window.innerWidth'), width);
      assert.equal(await driver.executeScript('return document.documentElement.scrollWidth <= window.innerWidth'), true, `portfolio/${width}/${lang} overflow`);
      const result = await driver.sendAndGetDevToolsCommand('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: await driver.executeScript('return {x:0,y:0,width:document.documentElement.clientWidth,height:document.documentElement.scrollHeight,scale:1}') });
      fs.writeFileSync(path.join(output, `portfolio-${width}-${lang}.png`), Buffer.from(result.data, 'base64'));
    }
  }
  console.log(`All ${Object.keys(variants).length} CVs: EN/PT mobile layout and axe passed; portfolio EN/PT mobile/desktop overflow and captures passed.`);
} finally { if(driver) await driver.quit(); await server.close(); }
