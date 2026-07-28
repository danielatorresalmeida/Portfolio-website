import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

const mainPages = ["index.html", "home/index.html"];
const variantPages = [
  "general-it-software/index.html",
  "general-it-software/resume/index.html",
  "general-it-software/resume/resume-site-only/index.html",
  "guestcentric-web-designer/index.html",
  "guestcentric-web-designer/resume/index.html",
  "guestcentric-web-designer/resume/resume-site-only/index.html",
  "rumos-web-developer-lisboa/index.html",
  "rumos-web-developer-lisboa/resume/index.html",
  "rumos-web-developer-lisboa/resume/resume-site-only/index.html",
  "datadog-software-engineer/index.html",
  "resume-datadog/index.html",
  "programador-software-crm-salesforce/index.html",
  "laranjazen-589420303/index.html",
  "resume-site-only/reorganiza.html",
  "ytech-fullstack-java-react/index.html",
  "ytech-fullstack-java-react/resume/index.html",
];
const privateVariantPaths = [
  "general-it-software/",
  "guestcentric-web-designer/",
  "rumos-web-developer-lisboa/",
  "datadog-software-engineer/",
  "resume-datadog/",
  "programador-software-crm-salesforce/",
  "laranjazen-589420303/",
  "ytech-fullstack-java-react/",
  "resume-site-only/reorganiza.html",
];

function readDocument(relativePath) {
  const source = fs.readFileSync(path.join(ROOT, relativePath), "utf8");
  return new JSDOM(source).window.document;
}

describe("role-specific version visibility contract", () => {
  it("keeps variant sections and links off the public root and /home pages", () => {
    for (const relativePath of mainPages) {
      const document = readDocument(relativePath);
      const hrefs = [...document.querySelectorAll("a[href]")].map((link) =>
        link.getAttribute("href")
      );

      expect(document.querySelector("#role-versions"), relativePath).toBeNull();
      expect(hrefs, relativePath).not.toContain("#role-versions");

      for (const privatePath of privateVariantPaths) {
        expect(
          hrefs.some((href) => href?.includes(privatePath)),
          `${relativePath} links to ${privatePath}`
        ).toBe(false);
      }
    }
  });

  it("keeps every directly shared variant out of search indexes", () => {
    for (const relativePath of variantPages) {
      const document = readDocument(relativePath);
      const directive = document
        .querySelector('meta[name="robots"]')
        ?.getAttribute("content")
        ?.toLowerCase()
        .split(",")
        .map((token) => token.trim());

      expect(directive, relativePath).toContain("noindex");
      expect(directive, relativePath).toContain("nofollow");
    }
  });

  it("leaves the main public CV indexable", () => {
    const document = readDocument("resume-site-only/index.html");
    const directive =
      document
        .querySelector('meta[name="robots"]')
        ?.getAttribute("content")
        ?.toLowerCase() ?? "";

    expect(directive).not.toContain("noindex");
  });
});
