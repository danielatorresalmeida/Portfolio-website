import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");
const CONTACT_SCRIPT = fs.readFileSync(
  path.join(ROOT, "assets", "contact-reveal.js"),
  "utf8"
);

const decode = (codes) => String.fromCharCode(...codes);
const email = decode([
  100, 97, 110, 105, 101, 108, 97, 114, 111, 115, 97, 100, 111, 108,
  101, 97, 108, 116, 111, 114, 114, 101, 115, 97, 108, 109, 101, 105,
  100, 97, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109,
]);
const phoneDigits = decode([51, 53, 49, 57, 54, 50, 48, 52, 54, 56, 50, 49]);

const publicContactSources = [
  "index.html",
  "home/index.html",
  "resume-site-only/index.html",
  "resume-site-only/reorganiza.html",
  "resume-site-only/script.js",
  "resume-site-only/supplemental-info.js",
  "general-it-software/index.html",
  "general-it-software/resume/index.html",
  "general-it-software/resume/script.js",
  "general-it-software/resume/supplemental-info.js",
  "guestcentric-web-designer/index.html",
  "guestcentric-web-designer/resume/index.html",
  "guestcentric-web-designer/resume/script.js",
  "guestcentric-web-designer/resume/supplemental-info.js",
  "rumos-web-developer-lisboa/index.html",
  "rumos-web-developer-lisboa/resume/index.html",
  "rumos-web-developer-lisboa/resume/script.js",
  "rumos-web-developer-lisboa/resume/supplemental-info.js",
  "datadog-software-engineer/index.html",
  "resume-datadog/index.html",
];

let dom;

afterEach(() => {
  dom?.window.close();
  dom = undefined;
});

describe("contact privacy contract", () => {
  it("keeps plaintext email and phone details out of requested public sources", () => {
    for (const relativePath of publicContactSources) {
      const source = fs.readFileSync(path.join(ROOT, relativePath), "utf8");
      expect(source, relativePath).not.toContain(email);
      expect(source, relativePath).not.toContain(phoneDigits);
    }
  });

  it("reveals a usable email link only after activation", () => {
    dom = new JSDOM(
      '<button type="button" data-contact-reveal="email">Reveal email</button>',
      { runScripts: "outside-only", url: "https://example.test/" }
    );
    dom.window.eval(CONTACT_SCRIPT);

    const button = dom.window.document.querySelector("button");
    button.click();

    const link = dom.window.document.querySelector("a");
    expect(link.textContent).toBe(email);
    expect(link.href).toBe(`mailto:${email}`);
  });

  it("reveals contact details before printing", () => {
    dom = new JSDOM(
      '<button type="button" data-contact-reveal="phone">Reveal phone</button>',
      { runScripts: "outside-only", url: "https://example.test/" }
    );
    dom.window.eval(CONTACT_SCRIPT);
    dom.window.dispatchEvent(new dom.window.Event("beforeprint"));

    const link = dom.window.document.querySelector("a");
    expect(link.href).toBe(`tel:+${phoneDigits}`);
    expect(link.textContent).toContain(phoneDigits.slice(-3));
  });
});
