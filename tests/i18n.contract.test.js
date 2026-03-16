import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
});
