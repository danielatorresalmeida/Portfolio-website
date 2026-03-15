import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it, vi } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INDEX_HTML = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const APP_SCRIPT = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

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

function bootstrapApp(options = {}) {
  const { prefersLight = false, storedTheme, storedLanguage } = options;

  const dom = new JSDOM(INDEX_HTML, {
    url: "http://localhost/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });

  const { window } = dom;
  window.matchMedia = vi.fn(createMatchMedia(prefersLight));
  window.open = vi.fn();
  window.fetch = vi.fn(async () => ({ ok: true }));
  window.scrollTo = vi.fn();
  window.requestAnimationFrame = vi.fn((cb) => window.setTimeout(cb, 16));
  window.cancelAnimationFrame = vi.fn((id) => window.clearTimeout(id));

  if (window.HTMLCanvasElement && window.HTMLCanvasElement.prototype) {
    window.HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
  }

  if (storedTheme) {
    window.localStorage.setItem("resume-theme", storedTheme);
  }
  if (storedLanguage) {
    window.localStorage.setItem("portfolio-language", storedLanguage);
  }

  window.eval(APP_SCRIPT);
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

describe("portfolio interaction flows", () => {
  it("toggles theme and persists the selected mode", () => {
    dom = bootstrapApp({ prefersLight: false });
    const { document, localStorage } = dom.window;
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    expect(root.getAttribute("data-theme")).toBe("dark");

    themeToggle.click();

    expect(root.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("resume-theme")).toBe("light");
    expect(themeToggle.getAttribute("aria-pressed")).toBe("false");
    expect(themeToggle.getAttribute("aria-label")).toBe("Switch to dark theme");
  });

  it("switches language and updates translated navigation labels", () => {
    dom = bootstrapApp();
    const { document, localStorage } = dom.window;
    const langToggle = document.getElementById("lang-toggle");
    const projectsLink = document.querySelector(".topbar .nav a[href=\"#projects\"]");

    expect(document.documentElement.lang).toBe("en");
    expect(projectsLink.textContent.trim()).toBe("Projects");

    langToggle.click();

    expect(document.documentElement.lang).toBe("pt-PT");
    expect(projectsLink.textContent.trim()).toBe("Projetos");
    expect(langToggle.textContent.trim()).toBe("EN");
    expect(localStorage.getItem("portfolio-language")).toBe("pt-PT");
  });

  it("opens and closes the navigation menu via toggle, nav click, and Escape", () => {
    dom = bootstrapApp();
    const { document } = dom.window;
    const topbar = document.querySelector(".topbar");
    const navToggle = document.getElementById("nav-toggle");
    const projectsNavItem = document.querySelector("#main-nav a[href=\"#projects\"]");

    expect(navToggle.getAttribute("aria-expanded")).toBe("false");

    navToggle.click();
    expect(topbar.classList.contains("menu-open")).toBe(true);
    expect(navToggle.getAttribute("aria-expanded")).toBe("true");

    projectsNavItem.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    expect(topbar.classList.contains("menu-open")).toBe(false);
    expect(navToggle.getAttribute("aria-expanded")).toBe("false");

    navToggle.click();
    document.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(topbar.classList.contains("menu-open")).toBe(false);
  });

  it("opens card URL only when non-interactive card regions are clicked", () => {
    dom = bootstrapApp();
    const { document, open } = dom.window;
    const firstCard = document.querySelector(".card[data-href]");
    const liveLink = firstCard.querySelector(".links a");

    firstCard.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    expect(open).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenLastCalledWith(firstCard.getAttribute("data-href"), "_blank", "noopener");

    open.mockClear();

    liveLink.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
    expect(open).not.toHaveBeenCalled();

    firstCard.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(open).not.toHaveBeenCalled();
  });
});
