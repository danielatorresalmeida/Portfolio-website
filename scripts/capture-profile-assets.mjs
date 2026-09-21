import fs from 'node:fs';
import { buildChromeDriver, startStaticServer } from '../tests/e2e/_shared.mjs';
const server = await startStaticServer();
let driver;
try {
  driver = await buildChromeDriver();
  await driver.manage().window().setRect({ width: 1366, height: 1000 });
  await driver.get(`${server.baseUrl}/`);
  await driver.executeScript("localStorage.setItem('portfolio-language','en-US');");
  await driver.navigate().refresh();
  await driver.executeAsyncScript('document.fonts.ready.then(arguments[arguments.length-1]);');
  fs.writeFileSync('assets/portfolio-phase3.png', Buffer.from(await driver.takeScreenshot(), 'base64'));
  await driver.get('https://danielatorresalmeida.github.io/To-Do-List-App/');
  await driver.wait(async () => (await driver.findElement({ css: 'body' }).getText()).trim().length > 20, 15000);
  await driver.executeAsyncScript('document.fonts.ready.then(arguments[arguments.length-1]);');
  await driver.executeAsyncScript('const done=arguments[arguments.length-1]; setTimeout(done, 1800);');
  fs.writeFileSync('assets/todo-sign-in.png', Buffer.from(await driver.takeScreenshot(), 'base64'));
  fs.writeFileSync('../../outputs/fase3/todo-live-check.txt', await driver.findElement({ css: 'body' }).getText());
} finally { if(driver) await driver.quit(); await server.close(); }
