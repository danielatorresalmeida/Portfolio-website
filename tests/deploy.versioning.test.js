import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { ASSET_VERSION_TOKEN, injectAssetVersion } from "../scripts/inject-asset-version.mjs";

let tempRoot;

function writeTempFile(relativePath, content) {
  const filePath = path.join(tempRoot, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
}

afterEach(() => {
  if (tempRoot && fs.existsSync(tempRoot)) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
  tempRoot = undefined;
});

describe("deploy asset version injection", () => {
  it("replaces placeholders in html files and leaves non-html files untouched", () => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "asset-version-test-"));

    const indexHtml = writeTempFile(
      "index.html",
      `<link rel="stylesheet" href="style.css?v=${ASSET_VERSION_TOKEN}"><script src="script.js?v=${ASSET_VERSION_TOKEN}"></script>`
    );
    const nestedHtml = writeTempFile(
      "resume-site-only/index.html",
      `<link rel="stylesheet" href="styles.css?v=${ASSET_VERSION_TOKEN}">`
    );
    const thanksHtml = writeTempFile("thanks.html", `?v=${ASSET_VERSION_TOKEN}`);
    const ignoredDepHtml = writeTempFile("node_modules/demo/index.html", `?v=${ASSET_VERSION_TOKEN}`);
    const nonHtml = writeTempFile("assets/version.txt", ASSET_VERSION_TOKEN);

    const result = injectAssetVersion(tempRoot, "abc12345");

    expect(result.updatedFiles).toBe(3);
    expect(result.replacedTokens).toBe(4);

    expect(fs.readFileSync(indexHtml, "utf8")).not.toContain(ASSET_VERSION_TOKEN);
    expect(fs.readFileSync(nestedHtml, "utf8")).not.toContain(ASSET_VERSION_TOKEN);
    expect(fs.readFileSync(thanksHtml, "utf8")).not.toContain(ASSET_VERSION_TOKEN);
    expect(fs.readFileSync(nonHtml, "utf8")).toContain(ASSET_VERSION_TOKEN);
    expect(fs.readFileSync(ignoredDepHtml, "utf8")).toContain(ASSET_VERSION_TOKEN);
  });

  it("throws for an empty version value", () => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "asset-version-test-"));
    writeTempFile("index.html", `?v=${ASSET_VERSION_TOKEN}`);

    expect(() => injectAssetVersion(tempRoot, "")).toThrow("A non-empty version string is required.");
  });
});
