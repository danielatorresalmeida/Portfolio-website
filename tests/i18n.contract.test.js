import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

function extractObjectBody(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Unable to find marker: ${marker}`);
  }

  const openBraceIndex = source.indexOf("{", markerIndex);
  if (openBraceIndex === -1) {
    throw new Error(`Unable to find object start for marker: ${marker}`);
  }

  let depth = 0;
  let inString = false;
  let quote = "";

  for (let i = openBraceIndex; i < source.length; i += 1) {
    const ch = source[i];
    const prev = source[i - 1];

    if (inString) {
      if (ch === quote && prev !== "\\") {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }

    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(openBraceIndex + 1, i);
      }
    }
  }

  throw new Error(`Unable to find object end for marker: ${marker}`);
}

function extractTopLevelKeys(objectBody) {
  const keys = new Set();
  let depth = 0;
  let inString = false;
  let quote = "";

  for (let i = 0; i < objectBody.length; i += 1) {
    const ch = objectBody[i];
    const prev = objectBody[i - 1];

    if (inString) {
      if (ch === quote && prev !== "\\") {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      if (depth === 0 && ch === '"') {
        let end = i + 1;
        while (end < objectBody.length) {
          const c = objectBody[end];
          const p = objectBody[end - 1];
          if (c === '"' && p !== "\\") break;
          end += 1;
        }
        const key = objectBody.slice(i + 1, end);
        let cursor = end + 1;
        while (cursor < objectBody.length && /\s/.test(objectBody[cursor])) cursor += 1;
        if (objectBody[cursor] === ":") keys.add(key);
      }
      inString = true;
      quote = ch;
      continue;
    }

    if (ch === "{" || ch === "[") depth += 1;
    if (ch === "}" || ch === "]") depth -= 1;
  }

  return keys;
}

function collectDataI18nKeys(htmlSource) {
  const keys = new Set();
  const matches = htmlSource.matchAll(/data-i18n(?:-html|-placeholder)?="([^"]+)"/g);
  for (const match of matches) keys.add(match[1]);
  return keys;
}

function normalizeSkillValue(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, " ")
    .trim();
}

function collectPortfolioSkillValues(translationMap) {
  const keys = Object.keys(translationMap).filter((key) =>
    /^(about\.technical\.(frontend|design|tools|backend|key)\.\d+|coreStack\.\d+)$/.test(key)
  );

  return keys.map((key) => translationMap[key]).filter(Boolean);
}

function loadResumeTranslations(scriptSource) {
  const startMarker = "const translations =";
  const endMarker = "const urlLanguage";
  const start = scriptSource.indexOf(startMarker);
  if (start === -1) throw new Error("Unable to find resume translations declaration");
  const end = scriptSource.indexOf(endMarker, start);
  if (end === -1) throw new Error("Unable to find resume translations end marker");

  const declaration = scriptSource.slice(start, end);
  // META_LINE_HTML is referenced inside the translations object.
  // A placeholder value is sufficient for contract tests.
  return Function(
    "LANG_EN",
    "LANG_PT",
    "META_LINE_HTML",
    `${declaration}; return translations;`
  )("en", "pt-PT", "");
}

function loadMainTranslations(scriptSource) {
  const startMarker = "const TRANSLATIONS =";
  const endMarker = "let currentLanguage";
  const start = scriptSource.indexOf(startMarker);
  if (start === -1) throw new Error("Unable to find main translations declaration");
  const end = scriptSource.indexOf(endMarker, start);
  if (end === -1) throw new Error("Unable to find main translations end marker");

  const declaration = scriptSource.slice(start, end);
  return Function("LANG_EN", "LANG_PT", `${declaration}; return TRANSLATIONS;`)("en-US", "pt-PT");
}

describe("i18n contract", () => {
  it("ensures all data-i18n keys in index.html exist in both EN and PT translation maps", () => {
    const html = fs.readFileSync(path.join(ROOT_DIR, "index.html"), "utf8");
    const script = fs.readFileSync(path.join(ROOT_DIR, "script.js"), "utf8");
    const requiredKeys = collectDataI18nKeys(html);
    const enBlock = extractObjectBody(script, "[LANG_EN]: {");
    const ptBlock = extractObjectBody(script, "[LANG_PT]: {");

    for (const key of requiredKeys) {
      const keyPattern = new RegExp(`"${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s*:`);
      expect(keyPattern.test(enBlock), `missing EN key: ${key}`).toBe(true);
      expect(keyPattern.test(ptBlock), `missing PT key: ${key}`).toBe(true);
    }
  });

  it("keeps top-level translation keys aligned for main and resume scripts", () => {
    const mainScript = fs.readFileSync(path.join(ROOT_DIR, "script.js"), "utf8");
    const mainEn = extractTopLevelKeys(extractObjectBody(mainScript, "[LANG_EN]: {"));
    const mainPt = extractTopLevelKeys(extractObjectBody(mainScript, "[LANG_PT]: {"));
    expect(Array.from(mainEn).sort()).toEqual(Array.from(mainPt).sort());

    const resumeScript = fs.readFileSync(path.join(ROOT_DIR, "resume-site-only", "script.js"), "utf8");
    const resumeEn = extractTopLevelKeys(extractObjectBody(resumeScript, "[LANG_EN]: {"));
    const resumePt = extractTopLevelKeys(extractObjectBody(resumeScript, "[LANG_PT]: {"));
    expect(Array.from(resumeEn).sort()).toEqual(Array.from(resumePt).sort());
  });

  it("prevents mojibake artifacts in resume translations", () => {
    const resumeScript = fs.readFileSync(path.join(ROOT_DIR, "resume-site-only", "script.js"), "utf8");
    const enBlock = extractObjectBody(resumeScript, "[LANG_EN]: {");
    const ptBlock = extractObjectBody(resumeScript, "[LANG_PT]: {");
    const mojibakePattern = /[\u00C3\u00C2\uFFFD]/;

    expect(enBlock).not.toMatch(mojibakePattern);
    expect(ptBlock).not.toMatch(mojibakePattern);
  });

  it("keeps resume section item counts aligned with translation arrays", () => {
    const resumeHtml = fs.readFileSync(path.join(ROOT_DIR, "resume-site-only", "index.html"), "utf8");
    const resumeScript = fs.readFileSync(path.join(ROOT_DIR, "resume-site-only", "script.js"), "utf8");
    const translations = loadResumeTranslations(resumeScript);
    const dom = new JSDOM(resumeHtml);
    const { document } = dom.window;

    const en = translations.en;
    const pt = translations["pt-PT"];

    expect(document.querySelectorAll("#experience-col .item").length).toBe(en.experienceItems.length);
    expect(document.querySelectorAll("#skills-col .skill-group-card").length).toBe(en.skillGroups.length);
    expect(document.querySelectorAll("#projects-col .item").length).toBe(en.projectItems.length);
    expect(document.querySelectorAll("#courses-col li").length).toBe(en.courses.length);
    expect(document.querySelectorAll("#education-col .item").length).toBe(en.educationItems.length);
    expect(document.querySelectorAll("#strengths-col li").length).toBe(en.strengths.length);

    expect(en.experienceItems.length).toBe(pt.experienceItems.length);
    expect(en.skillGroups.length).toBe(pt.skillGroups.length);
    expect(en.projectItems.length).toBe(pt.projectItems.length);
    expect(en.courses.length).toBe(pt.courses.length);
    expect(en.educationItems.length).toBe(pt.educationItems.length);
    expect(en.strengths.length).toBe(pt.strengths.length);

    const experienceNodes = Array.from(document.querySelectorAll("#experience-col .item"));
    experienceNodes.forEach((item, index) => {
      const domBullets = item.querySelectorAll("li").length;
      expect(domBullets).toBe(en.experienceItems[index].bullets.length);
      expect(en.experienceItems[index].bullets.length).toBe(pt.experienceItems[index].bullets.length);
    });

    dom.window.close();
  });

  it("keeps shared portfolio and resume facts aligned", () => {
    const portfolioHtml = fs.readFileSync(path.join(ROOT_DIR, "index.html"), "utf8");
    const portfolioScript = fs.readFileSync(path.join(ROOT_DIR, "script.js"), "utf8");
    const resumeHtml = fs.readFileSync(path.join(ROOT_DIR, "resume-site-only", "index.html"), "utf8");
    const resumeScript = fs.readFileSync(path.join(ROOT_DIR, "resume-site-only", "script.js"), "utf8");

    const mainTranslations = loadMainTranslations(portfolioScript);
    const resumeTranslations = loadResumeTranslations(resumeScript);

    expect(mainTranslations["en-US"]["experience.role"]).toBe("Software Development Intern");
    expect(mainTranslations["pt-PT"]["experience.role"]).toBe("Estagiaria de Desenvolvimento de Software");
    expect(resumeTranslations.en.experienceItems[0].title).toContain("Software Development Intern");
    expect(resumeTranslations["pt-PT"].experienceItems[0].title).toContain("Estagi");

    expect(resumeHtml).toMatch(/20%/);
    expect(resumeTranslations.en.experienceItems[0].bullets[4]).toMatch(/20%/);
    expect(resumeTranslations["pt-PT"].experienceItems[0].bullets[4]).toMatch(/20%/);

    expect(portfolioHtml).toContain('data-cv-en="./resume-site-only/?lang=en&download=1"');
    expect(portfolioHtml).toContain('data-cv-pt="./resume-site-only/?lang=pt-PT&download=1"');
    expect(portfolioScript).toContain('getAttribute("data-cv-en")');
    expect(portfolioScript).toContain('getAttribute("data-cv-pt")');

    const portfolioDom = new JSDOM(portfolioHtml);
    const resumeDom = new JSDOM(resumeHtml);
    const featuredProjects = Array.from(portfolioDom.window.document.querySelectorAll("#project-grid > .card"));
    const featuredTitles = featuredProjects.map((card) =>
      card.querySelector("h3")?.textContent?.trim()
    );
    expect(featuredProjects.length).toBe(3);
    expect(featuredTitles).toEqual([
      "RoboCollective.ai",
      "API QA Test Suite",
      "To-Do List App",
    ]);

    const portfolioExperienceItems = portfolioDom.window.document.querySelectorAll("#experience .timeline .item");
    const resumeExperienceItems = resumeDom.window.document.querySelectorAll("#experience-col .item");
    expect(portfolioExperienceItems.length).toBe(1);
    expect(resumeExperienceItems.length).toBeGreaterThan(portfolioExperienceItems.length);
    portfolioDom.window.close();
    resumeDom.window.close();
  });

  it("keeps all portfolio skill items represented in resume skills", () => {
    const portfolioScript = fs.readFileSync(path.join(ROOT_DIR, "script.js"), "utf8");
    const resumeScript = fs.readFileSync(path.join(ROOT_DIR, "resume-site-only", "script.js"), "utf8");

    const mainTranslations = loadMainTranslations(portfolioScript);
    const resumeTranslations = loadResumeTranslations(resumeScript);

    const languagePairs = [
      { portfolio: "en-US", resume: "en" },
      { portfolio: "pt-PT", resume: "pt-PT" },
    ];

    languagePairs.forEach(({ portfolio, resume }) => {
      const portfolioSkills = collectPortfolioSkillValues(mainTranslations[portfolio]).map(
        normalizeSkillValue
      );
      const resumeSkills = [
        ...resumeTranslations[resume].skillGroups.flatMap((group) => group.items),
        ...resumeTranslations[resume].keySkills,
      ].map(normalizeSkillValue);
      const resumeSkillSet = new Set(resumeSkills);

      Array.from(new Set(portfolioSkills)).forEach((skill) => {
        expect(
          resumeSkillSet.has(skill),
          `missing resume skill for ${portfolio}: ${skill}`
        ).toBe(true);
      });
    });
  });
});
