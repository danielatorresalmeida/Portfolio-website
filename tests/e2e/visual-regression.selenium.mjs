import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { By } from "selenium-webdriver";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { buildChromeDriver, shouldRunBrowserChecks, startStaticServer } from "./_shared.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASELINE_DIR = path.resolve(__dirname, "..", "visual", "baseline");
const ARTIFACT_DIR = path.resolve(__dirname, "..", "visual", "artifacts");

const SNAPSHOTS = [
  { name: "home-hero", path: "/", selector: ".hero .hero-inner" },
  { name: "home-project-grid", path: "/", selector: "#project-grid" },
  { name: "resume-topbar", path: "/resume-site-only/", selector: ".topbar" },
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parsePng(buffer) {
  return PNG.sync.read(buffer);
}

function comparePng(actualBuffer, baselineBuffer) {
  const actual = parsePng(actualBuffer);
  const baseline = parsePng(baselineBuffer);

  if (actual.width !== baseline.width || actual.height !== baseline.height) {
    return {
      diffPixels: Number.POSITIVE_INFINITY,
      diffImage: null,
      dimensionMismatch: true,
      width: actual.width,
      height: actual.height,
    };
  }

  const diff = new PNG({ width: actual.width, height: actual.height });
  const diffPixels = pixelmatch(
    actual.data,
    baseline.data,
    diff.data,
    actual.width,
    actual.height,
    { threshold: 0.12 }
  );

  return {
    diffPixels,
    diffImage: diff,
    dimensionMismatch: false,
    width: actual.width,
    height: actual.height,
  };
}

async function run() {
  if (!shouldRunBrowserChecks()) {
    console.log("Skipping visual regression checks. Set RUN_BROWSER_TESTS=true to run locally.");
    return;
  }

  ensureDir(BASELINE_DIR);
  ensureDir(ARTIFACT_DIR);

  const server = await startStaticServer();
  let driver;
  const failures = [];

  try {
    driver = await buildChromeDriver();

    for (const snapshot of SNAPSHOTS) {
      await driver.get(`${server.baseUrl}${snapshot.path}`);
      await driver.executeScript(`
        document.documentElement.style.setProperty('scroll-behavior', 'auto');
        const style = document.createElement('style');
        style.innerHTML = '* { animation: none !important; transition: none !important; }';
        document.head.appendChild(style);
      `);

      const element = await driver.findElement(By.css(snapshot.selector));
      await driver.executeScript("arguments[0].scrollIntoView({ block: 'start' });", element);

      const base64Png = await element.takeScreenshot(true);
      const actualBuffer = Buffer.from(base64Png, "base64");
      const baselinePath = path.join(BASELINE_DIR, `${snapshot.name}.png`);
      const artifactActualPath = path.join(ARTIFACT_DIR, `${snapshot.name}.actual.png`);

      fs.writeFileSync(artifactActualPath, actualBuffer);

      if (!fs.existsSync(baselinePath)) {
        fs.writeFileSync(baselinePath, actualBuffer);
        console.log(`Created baseline snapshot: ${baselinePath}`);
        continue;
      }

      const baselineBuffer = fs.readFileSync(baselinePath);
      const comparison = comparePng(actualBuffer, baselineBuffer);

      if (comparison.dimensionMismatch) {
        failures.push(`${snapshot.name}: image dimensions changed.`);
        continue;
      }

      const maxDiffPixels = Math.max(20, Math.floor(comparison.width * comparison.height * 0.003));
      if (comparison.diffPixels > maxDiffPixels) {
        const diffPath = path.join(ARTIFACT_DIR, `${snapshot.name}.diff.png`);
        fs.writeFileSync(diffPath, PNG.sync.write(comparison.diffImage));
        failures.push(`${snapshot.name}: ${comparison.diffPixels} pixels differ (max ${maxDiffPixels}).`);
      }
    }
  } finally {
    if (driver) await driver.quit();
    await server.close();
  }

  if (failures.length > 0) {
    throw new Error(`Visual regression failures:\n- ${failures.join("\n- ")}`);
  }

  console.log("Visual regression checks passed.");
}

run().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
