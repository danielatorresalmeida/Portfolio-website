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

describe("technical skills card layout contract", () => {
  it("stacks badges above headings and wraps titles at language-aware boundaries", () => {
    const css = fs.readFileSync(
      path.join(ROOT, "assets", "ytech-unified.css"),
      "utf8"
    );
    const contract = css.slice(
      css.indexOf("Technical Skills adaptive layout contract")
    );

    expect(contract).toMatch(
      /#about \.technical-card-head\s*\{[\s\S]*?flex-direction:\s*column;[\s\S]*?align-items:\s*flex-start;/
    );
    expect(contract).toMatch(
      /#about \.technical-card h4\s*\{[\s\S]*?overflow-wrap:\s*normal;[\s\S]*?word-break:\s*normal;[\s\S]*?hyphens:\s*auto;/
    );
  });

  it("uses a comfortable auto-fit minimum instead of fixed breakpoint columns", () => {
    const css = fs.readFileSync(
      path.join(ROOT, "assets", "ytech-unified.css"),
      "utf8"
    );
    const contract = css.slice(
      css.indexOf("Technical Skills adaptive layout contract")
    );

    expect(contract).toMatch(
      /grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(min\(100%,\s*260px\),\s*1fr\)\);/
    );
    expect(contract).not.toMatch(
      /grid-template-columns:\s*repeat\((?:3|4),\s*minmax\(0,\s*1fr\)\)/
    );
  });

  it("keeps long labels intact while reducing only their display size", () => {
    const css = fs.readFileSync(
      path.join(ROOT, "assets", "ytech-unified.css"),
      "utf8"
    );

    for (const key of [
      "about.technical.se.title",
      "about.technical.platforms.title",
      "about.technical.data.title",
      "about.technical.java.title",
    ]) {
      expect(css).toContain(`[data-i18n="${key}"]`);
    }

    expect(css).toMatch(
      /#about \.technical-card h4:is\([\s\S]*?\)\s*\{\s*font-size:\s*clamp\(1rem,\s*1\.15vw,\s*1\.15rem\);/
    );
  });

  it("switches the document language so automatic hyphenation uses the active locale", () => {
    const script = fs.readFileSync(path.join(ROOT, "script.js"), "utf8");

    expect(script).toContain(
      'document.documentElement.lang = currentLanguage === LANG_PT ? "pt-PT" : "en";'
    );
  });
});
