import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const RUNTIME_STORAGE_RULES = [
  {
    file: "script.js",
    requiredSnippets: ["function getStoredValue(key)", "function setStoredValue(key, value)"],
    allowedLinePatterns: [
      /^return window\.localStorage\.getItem\(key\);$/,
      /^window\.localStorage\.setItem\(key, value\);$/,
    ],
  },
  {
    file: "resume-site-only/script.js",
    requiredSnippets: ["function getStoredValue(key)", "function setStoredValue(key, value)"],
    allowedLinePatterns: [
      /^return window\.localStorage\.getItem\(key\);$/,
      /^window\.localStorage\.setItem\(key, value\);$/,
    ],
  },
  {
    file: "resume-site-only/supplemental-info.js",
    requiredSnippets: ["function getStoredLanguage()"],
    allowedLinePatterns: [/^return window\.localStorage\.getItem\(LANGUAGE_KEY\);$/],
  },
];

describe("storage safety contract", () => {
  it("uses localStorage only via approved safe helper implementations in runtime scripts", () => {
    for (const rule of RUNTIME_STORAGE_RULES) {
      const fullPath = path.join(ROOT_DIR, rule.file);
      const source = fs.readFileSync(fullPath, "utf8");
      const lines = source.split(/\r?\n/);
      const localStorageLines = lines
        .map((line, index) => ({ line: line.trim(), lineNo: index + 1 }))
        .filter((entry) => entry.line.includes("localStorage"));

      for (const snippet of rule.requiredSnippets) {
        expect(source.includes(snippet), `${rule.file} is missing "${snippet}"`).toBe(true);
      }

      localStorageLines.forEach(({ line, lineNo }) => {
        const isAllowed = rule.allowedLinePatterns.some((pattern) => pattern.test(line));
        expect(isAllowed, `${rule.file}:${lineNo} uses unapproved localStorage access: ${line}`).toBe(true);
      });
    }
  });
});
