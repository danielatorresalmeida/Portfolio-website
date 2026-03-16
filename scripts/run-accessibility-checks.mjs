import process from "node:process";
import axe from "axe-core";
import { buildChromeDriver, shouldRunBrowserChecks, startStaticServer } from "../tests/e2e/_shared.mjs";

const PAGES = [
  { name: "portfolio-home", path: "/" },
  { name: "resume-site", path: "/resume-site-only/" },
];

const AXE_OPTIONS = {
  runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
  rules: {
    // jsdom/browser-rendered checks in CI can be noisy for contrast due anti-aliasing.
    "color-contrast": { enabled: false },
  },
};

function formatViolation(violation) {
  const targets = violation.nodes.slice(0, 3).map((node) => node.target.join(" ")).join(" | ");
  return `${violation.id} (${violation.impact || "unknown"}): ${targets}`;
}

async function run() {
  if (!shouldRunBrowserChecks()) {
    console.log("Skipping accessibility checks. Set RUN_BROWSER_TESTS=true to run locally.");
    return;
  }

  const server = await startStaticServer();
  let driver;
  const failures = [];

  try {
    driver = await buildChromeDriver();

    for (const page of PAGES) {
      await driver.get(`${server.baseUrl}${page.path}`);
      await driver.executeScript("document.documentElement.classList.add('reduce-motion-checks')");
      await driver.executeScript(axe.source);

      const results = await driver.executeAsyncScript(
        `
          const done = arguments[arguments.length - 1];
          const options = arguments[0];
          window.axe
            .run(document, options)
            .then(done)
            .catch((error) => done({ __error: String(error) }));
        `,
        AXE_OPTIONS
      );

      if (results?.__error) {
        failures.push(`${page.name}: axe runtime error: ${results.__error}`);
        continue;
      }

      const seriousViolations = (results.violations || []).filter((violation) =>
        ["serious", "critical"].includes(violation.impact)
      );

      if (seriousViolations.length > 0) {
        seriousViolations.forEach((violation) => {
          failures.push(`${page.name}: ${formatViolation(violation)}`);
        });
      }
    }
  } finally {
    if (driver) await driver.quit();
    await server.close();
  }

  if (failures.length > 0) {
    throw new Error(`Accessibility violations detected:\n- ${failures.join("\n- ")}`);
  }

  console.log("Accessibility checks passed with no serious/critical violations.");
}

run().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
