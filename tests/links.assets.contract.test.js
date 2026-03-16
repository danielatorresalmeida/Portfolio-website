import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validateLinksAndAssets } from "../scripts/validate-links-assets.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

describe("link and asset integrity", () => {
  it("has no broken local links/assets or missing anchors", () => {
    const result = validateLinksAndAssets(ROOT_DIR);
    expect(result.errors).toEqual([]);
  });
});
