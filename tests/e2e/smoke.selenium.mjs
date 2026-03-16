import assert from "node:assert/strict";
import process from "node:process";
import { By, Key } from "selenium-webdriver";
import { buildChromeDriver, shouldRunBrowserChecks, startStaticServer } from "./_shared.mjs";

async function waitFor(driver, condition, timeoutMs = 3000) {
  await driver.wait(async () => Boolean(await condition()), timeoutMs);
}

async function fillContactForm(driver) {
  const nameInput = await driver.findElement(By.id("contact-name"));
  const emailInput = await driver.findElement(By.id("contact-email"));
  const messageInput = await driver.findElement(By.id("contact-message"));

  await nameInput.clear();
  await nameInput.sendKeys("Smoke Test");
  await emailInput.clear();
  await emailInput.sendKeys("smoke@example.com");
  await messageInput.clear();
  await messageInput.sendKeys("Automated Selenium check.");
}

async function ensureEnglish(driver) {
  const html = await driver.findElement(By.css("html"));
  const lang = await html.getAttribute("lang");
  if (lang === "en") return;

  await driver.findElement(By.id("lang-toggle")).click();
  await waitFor(driver, async () => (await html.getAttribute("lang")) === "en");
}

async function run() {
  if (!shouldRunBrowserChecks()) {
    console.log("Skipping Selenium smoke tests. Set RUN_BROWSER_TESTS=true to run locally.");
    return;
  }

  const server = await startStaticServer();
  let driver;

  try {
    driver = await buildChromeDriver();
    await driver.get(`${server.baseUrl}/`);
    await driver.manage().window().setRect({ width: 820, height: 1000 });

    const topbar = await driver.findElement(By.css(".topbar"));
    const navToggle = await driver.findElement(By.id("nav-toggle"));
    if (await navToggle.isDisplayed()) {
      await navToggle.click();
      await waitFor(driver, async () => (await topbar.getAttribute("class")).includes("menu-open"));
      await driver.actions().sendKeys(Key.ESCAPE).perform();
      await waitFor(driver, async () => !(await topbar.getAttribute("class")).includes("menu-open"));
    }

    const root = await driver.findElement(By.css("html"));
    const initialTheme = await root.getAttribute("data-theme");
    await driver.findElement(By.id("theme-toggle")).click();
    const updatedTheme = await root.getAttribute("data-theme");
    assert.notEqual(updatedTheme, initialTheme);

    await driver.findElement(By.id("lang-toggle")).click();
    await waitFor(driver, async () => (await driver.findElement(By.css("html")).getAttribute("lang")) === "pt-PT");
    await driver.navigate().refresh();
    await waitFor(driver, async () => (await driver.findElement(By.css("html")).getAttribute("lang")) === "pt-PT");
    assert.equal(await (await driver.findElement(By.css("html"))).getAttribute("data-theme"), updatedTheme);

    await driver.executeScript(`
      window.__openCalls = [];
      window.open = (...args) => { window.__openCalls.push(args); return null; };
      const firstLiveLink = document.querySelector(".card[data-href] .links a");
      if (firstLiveLink) firstLiveLink.addEventListener("click", (event) => event.preventDefault());
    `);
    const firstCardBody = await driver.findElement(By.css(".card[data-href] .card-body"));
    await driver.executeScript("arguments[0].scrollIntoView({ block: 'center' });", firstCardBody);
    await firstCardBody.click();
    assert.equal(await driver.executeScript("return window.__openCalls.length;"), 1);

    const firstLiveLink = await driver.findElement(By.css(".card[data-href] .links a"));
    await firstLiveLink.click();
    assert.equal(await driver.executeScript("return window.__openCalls.length;"), 1);

    await ensureEnglish(driver);

    await driver.executeScript("window.fetch = async () => ({ ok: true });");
    await fillContactForm(driver);
    await driver.findElement(By.css("#contact-form button[type='submit']")).click();
    await waitFor(driver, async () => {
      const status = await driver.findElement(By.id("contact-status"));
      const classes = (await status.getAttribute("class")) || "";
      return classes.includes("success");
    });

    await driver.executeScript("window.fetch = async () => { throw new Error('network'); };");
    await fillContactForm(driver);
    await driver.findElement(By.css("#contact-form button[type='submit']")).click();
    await waitFor(driver, async () => {
      const status = await driver.findElement(By.id("contact-status"));
      const classes = (await status.getAttribute("class")) || "";
      return classes.includes("error");
    });
  } finally {
    if (driver) await driver.quit();
    await server.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
