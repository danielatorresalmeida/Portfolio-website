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
  const options = typeof prefersLight === "object" ? prefersLight : { prefersLight };
  const { prefersLight: light = false, prefersReducedMotion = false } = options;
  return (query) => ({
    matches: query.includes("prefers-color-scheme")
      ? light
      : query.includes("prefers-reduced-motion")
      ? prefersReducedMotion
      : false,
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
  const {
    prefersLight = false,
    prefersReducedMotion = false,
    storedTheme,
    storedLanguage,
    blockStorage = false,
    fetchImpl,
    canvasContext,
    requestAnimationFrameImpl,
    cancelAnimationFrameImpl,
  } = options;

  const dom = new JSDOM(INDEX_HTML, {
    url: "http://localhost/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });

  const { window } = dom;
  window.matchMedia = vi.fn(createMatchMedia({ prefersLight, prefersReducedMotion }));
  window.open = vi.fn();
  window.fetch = fetchImpl || vi.fn(async () => ({ ok: true }));
  window.scrollTo = vi.fn();
  window.requestAnimationFrame = requestAnimationFrameImpl || vi.fn((cb) => window.setTimeout(cb, 16));
  window.cancelAnimationFrame = cancelAnimationFrameImpl || vi.fn((id) => window.clearTimeout(id));

  if (window.HTMLCanvasElement && window.HTMLCanvasElement.prototype) {
    window.HTMLCanvasElement.prototype.getContext = vi.fn(() => canvasContext || null);
  }

  if (canvasContext) {
    const dotGrid = window.document.querySelector(".dot-grid");
    if (dotGrid) {
      dotGrid.getBoundingClientRect = vi.fn(() => ({
        left: 0,
        top: 0,
        width: 320,
        height: 180,
        right: 320,
        bottom: 180,
      }));
    }
  }

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
    window.localStorage.setItem("portfolio-language", storedLanguage);
  }

  window.eval(APP_SCRIPT);
  return dom;
}

async function flushAsync(window) {
  await Promise.resolve();
  await new Promise((resolve) => window.setTimeout(resolve, 0));
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

  it("keeps CV button download behavior aligned with selected language", () => {
    dom = bootstrapApp();
    const { document } = dom.window;
    const langToggle = document.getElementById("lang-toggle");
    const cvLink = document.getElementById("contact-cv-link");

    expect(cvLink.getAttribute("href")).toBe("./resume-site-only/?lang=en&download=1");
    expect(cvLink.getAttribute("target")).toBe("_blank");

    langToggle.click();

    expect(cvLink.getAttribute("href")).toBe("./resume-site-only/?lang=pt-PT&download=1");
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

  it("keeps initializing when localStorage is blocked", () => {
    dom = bootstrapApp({ prefersLight: true, blockStorage: true });
    const { document } = dom.window;
    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("lang-toggle");
    const projectsLink = document.querySelector(".topbar .nav a[href=\"#projects\"]");

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(document.documentElement.lang).toBe("en");
    expect(projectsLink.textContent.trim()).toBe("Projects");

    themeToggle.click();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    langToggle.click();
    expect(document.documentElement.lang).toBe("pt-PT");
  });

  it("keeps dot-grid canvas draws finite after fast pointer events", () => {
    const ctx = {
      clearRect: vi.fn(),
      setTransform: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      fillStyle: "",
    };
    dom = bootstrapApp({ canvasContext: ctx, prefersReducedMotion: true });
    const { document, performance } = dom.window;
    const hero = document.querySelector(".hero");
    const nowSpy = vi.spyOn(performance, "now");

    ctx.arc.mockClear();
    nowSpy.mockReturnValue(1000);
    hero.dispatchEvent(new dom.window.MouseEvent("pointermove", { bubbles: true, clientX: 120, clientY: 70 }));
    nowSpy.mockReturnValue(1000);
    hero.dispatchEvent(new dom.window.MouseEvent("pointermove", { bubbles: true, clientX: 140, clientY: 90 }));
    hero.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true, clientX: 180, clientY: 100 }));
    dom.window.dispatchEvent(new dom.window.Event("resize"));

    expect(ctx.arc.mock.calls.length).toBeGreaterThan(0);
    ctx.arc.mock.calls.forEach(([x, y, radius]) => {
      expect(Number.isFinite(x)).toBe(true);
      expect(Number.isFinite(y)).toBe(true);
      expect(Number.isFinite(radius)).toBe(true);
    });
  });

  it("starts and cancels dot-grid RAF lifecycle in non-reduced-motion mode", () => {
    const ctx = {
      clearRect: vi.fn(),
      setTransform: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      fillStyle: "",
    };
    const rafMock = vi.fn(() => 321);
    const cancelRafMock = vi.fn();
    dom = bootstrapApp({
      canvasContext: ctx,
      prefersReducedMotion: false,
      requestAnimationFrameImpl: rafMock,
      cancelAnimationFrameImpl: cancelRafMock,
    });
    const { document } = dom.window;
    const hero = document.querySelector(".hero");
    const removeSpy = vi.spyOn(hero, "removeEventListener");

    expect(rafMock).toHaveBeenCalled();

    dom.window.dispatchEvent(new dom.window.Event("beforeunload"));

    expect(cancelRafMock).toHaveBeenCalledWith(321);
    expect(removeSpy).toHaveBeenCalledWith("pointermove", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("pointerleave", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("click", expect.any(Function));
  });

  it("shows contact success state and re-enables submit button", async () => {
    let resolveFetch;
    const fetchMock = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );
    dom = bootstrapApp({ fetchImpl: fetchMock });
    const { document } = dom.window;
    const form = document.getElementById("contact-form");
    const status = document.getElementById("contact-status");
    const submitButton = form.querySelector('button[type="submit"]');
    const resetSpy = vi.spyOn(form, "reset");

    form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
    expect(status.textContent).toBe("Sending...");
    expect(submitButton.hasAttribute("disabled")).toBe(true);

    resolveFetch({ ok: true });
    await flushAsync(dom.window);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(status.textContent).toBe("Thanks! Your message has been sent.");
    expect(status.classList.contains("success")).toBe(true);
    expect(status.classList.contains("error")).toBe(false);
    expect(submitButton.hasAttribute("disabled")).toBe(false);
    expect(resetSpy).toHaveBeenCalledTimes(1);
  });

  it("shows contact error state when submit fails", async () => {
    const fetchMock = vi.fn(async () => ({ ok: false }));
    dom = bootstrapApp({ fetchImpl: fetchMock });
    const { document } = dom.window;
    const form = document.getElementById("contact-form");
    const status = document.getElementById("contact-status");
    const submitButton = form.querySelector('button[type="submit"]');

    form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
    await flushAsync(dom.window);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(status.textContent).toBe("Sorry, something went wrong. Please try again or email me directly.");
    expect(status.classList.contains("error")).toBe(true);
    expect(status.classList.contains("success")).toBe(false);
    expect(submitButton.hasAttribute("disabled")).toBe(false);
  });

  it("shows contact error state when submit throws", async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error("network down");
    });
    dom = bootstrapApp({ fetchImpl: fetchMock });
    const { document } = dom.window;
    const form = document.getElementById("contact-form");
    const status = document.getElementById("contact-status");
    const submitButton = form.querySelector('button[type="submit"]');

    form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
    await flushAsync(dom.window);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(status.textContent).toBe("Sorry, something went wrong. Please try again or email me directly.");
    expect(status.classList.contains("error")).toBe(true);
    expect(status.classList.contains("success")).toBe(false);
    expect(submitButton.hasAttribute("disabled")).toBe(false);
  });
});
