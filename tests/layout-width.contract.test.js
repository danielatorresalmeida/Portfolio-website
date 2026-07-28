import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

const routeStyles = [
  "style.css",
  "general-it-software/style.css",
  "guestcentric-web-designer/style.css",
  "rumos-web-developer-lisboa/style.css",
  "resume-site-only/styles.css",
  "general-it-software/resume/styles.css",
  "guestcentric-web-designer/resume/styles.css",
  "rumos-web-developer-lisboa/resume/styles.css",
];

describe("bounded layout width contract", () => {
  it("keeps route-level desktop shells capped instead of viewport-sized", () => {
    for (const relativePath of routeStyles) {
      const css = fs.readFileSync(path.join(ROOT, relativePath), "utf8");

      expect(css, relativePath).toMatch(/--content-max-width:\s*1180px/);
      expect(css, relativePath).not.toMatch(
        /--content-max-width:\s*(?:65|92|94|96|100)vw/
      );
    }
  });

  it("loads the shared bounded-width guard after legacy presentation rules", () => {
    const css = fs.readFileSync(
      path.join(ROOT, "assets", "ytech-unified.css"),
      "utf8"
    );
    const guardIndex = css.indexOf("Final bounded-width contract");

    expect(guardIndex).toBeGreaterThan(
      css.indexOf("Final portfolio cascade guard")
    );
    expect(css.slice(guardIndex)).toContain("--yt-layout-max: 1180px");
    expect(css.slice(guardIndex)).toContain("--yt-focus-max: 980px");
    expect(css.slice(guardIndex)).toContain("--yt-reading-max: 760px");
    expect(css.slice(guardIndex)).toContain(
      "max-width: var(--yt-layout-max) !important"
    );
  });
});
