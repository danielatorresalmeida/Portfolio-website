import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it, vi } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RESUME_HTML = fs.readFileSync(path.join(__dirname, "..", "resume-site-only", "index.html"), "utf8");
const RESUME_SCRIPT = fs.readFileSync(path.join(__dirname, "..", "resume-site-only", "script.js"), "utf8");
const SUPPLEMENTAL_SCRIPT = fs.readFileSync(
  path.join(__dirname, "..", "resume-site-only", "supplemental-info.js"),
  "utf8"
);

function createMatchMedia(prefersLight) {
  return (query) => ({
    matches: query.includes("prefers-color-scheme") ? prefersLight : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

function bootstrapResumeApp(options = {}) {
  const {
    prefersLight = false,
    storedTheme,
    storedLanguage,
    url = "http://localhost/resume-site-only/",
    blockStorage = false,
  } = options;

  const dom = new JSDOM(RESUME_HTML, {
    url,
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });

  const { window } = dom;
  window.matchMedia = vi.fn(createMatchMedia(prefersLight));
  window.print = vi.fn();

  if (blockStorage) {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new window.DOMException("Blocked by browser policy", "SecurityError");
      },
    });
  }

  if (!blockStorage && storedTheme) {
    window.localStorage.setItem("resume-theme", storedTheme);
  }
  if (!blockStorage && storedLanguage) {
    window.localStorage.setItem("resume-language", storedLanguage);
  }

  window.eval(RESUME_SCRIPT);
  window.eval(SUPPLEMENTAL_SCRIPT);
  return dom;
}

let dom;

afterEach(() => {
  if (dom) {
    dom.window.close();
    dom = undefined;
  }
  vi.restoreAllMocks();
});

describe("resume-site-only interaction flows", () => {
  it("applies stored theme and keeps toggle semantics in sync", () => {
    dom = bootstrapResumeApp({ storedTheme: "dark" });
    const { document, localStorage } = dom.window;
    const themeToggle = document.getElementById("theme-toggle");

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(themeToggle.getAttribute("aria-label")).toBe("Switch to light theme");

    themeToggle.click();

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("resume-theme")).toBe("light");
    expect(themeToggle.getAttribute("aria-label")).toBe("Switch to dark theme");
  });

  it("uses URL language for initial render and toggles localized CV download", () => {
    dom = bootstrapResumeApp({
      prefersLight: true,
      url: "http://localhost/resume-site-only/?lang=pt-PT",
    });
    const { document } = dom.window;
    const langToggle = document.getElementById("lang-toggle");
    const langLabel = langToggle.querySelector(".pill-label");
    const printButton = document.getElementById("print-btn");
    const introTitle = document.querySelector("#intro-section h2");
    const skillsTitle = document.querySelector("#skills-col h2");

    expect(document.documentElement.lang).toBe("pt-PT");
    expect(langLabel.textContent.trim()).toBe("EN");
    expect(langToggle.getAttribute("aria-label")).toBe("Mudar idioma para ingl\u00EAs");
    expect(printButton.getAttribute("href")).toContain("Daniela-Torres-Almeida-Resume-pt-PT.pdf");
    expect(introTitle.textContent.trim()).toBe("Objetivo Profissional");
    expect(skillsTitle.textContent.trim()).toBe("Compet\u00EAncias T\u00E9cnicas");
    expect(document.body.textContent).not.toMatch(/[\u00C3\u00C2\uFFFD]/);

    langToggle.click();

    expect(document.documentElement.lang).toBe("en");
    expect(langLabel.textContent.trim()).toBe("PT-PT");
    expect(printButton.getAttribute("href")).toContain("Daniela-Torres-Almeida-Resume.pdf");
  });

  it("keeps initializing when localStorage is blocked", () => {
    dom = bootstrapResumeApp({ blockStorage: true, prefersLight: false });
    const { document } = dom.window;
    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("lang-toggle");

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.lang).toBe("en");

    themeToggle.click();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    langToggle.click();
    expect(document.documentElement.lang).toBe("pt-PT");
  });

  it("updates supplemental-info content when language changes", async () => {
    dom = bootstrapResumeApp({ url: "http://localhost/resume-site-only/" });
    const { document } = dom.window;
    const langToggle = document.getElementById("lang-toggle");
    const leftTitle = document.querySelector("[data-supp-left-title]");
    const rightTitle = document.querySelector("[data-supp-right-title]");

    expect(leftTitle.textContent.trim()).toBe("Additional Information");
    expect(rightTitle.textContent.trim()).toContain("Availability");

    langToggle.click();
    await new Promise((resolve) => dom.window.setTimeout(resolve, 0));

    expect(leftTitle.textContent.trim().toLowerCase()).toContain("inform");
    expect(rightTitle.textContent.trim().toLowerCase()).toContain("dispon");
  });
});
