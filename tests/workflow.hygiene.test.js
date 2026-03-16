import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseDocument } from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const ROOT_WORKFLOW_DIR = path.join(ROOT_DIR, ".github", "workflows");
const IGNORED_DIRECTORIES = new Set([".git", "node_modules"]);

function collectWorkflowFiles(rootDir) {
  const files = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (!IGNORED_DIRECTORIES.has(entry.name)) stack.push(entryPath);
        continue;
      }

      if (!entry.isFile()) continue;
      if (entry.name.endsWith(".yml") || entry.name.endsWith(".yaml")) {
        const normalized = entryPath.replace(/\\/g, "/");
        if (normalized.includes("/.github/workflows/")) {
          files.push(entryPath);
        }
      }
    }
  }

  return files;
}

describe("workflow hygiene", () => {
  it("keeps workflow files only in the root .github/workflows directory", () => {
    const workflowFiles = collectWorkflowFiles(ROOT_DIR);
    const nonRootWorkflowFiles = workflowFiles.filter(
      (filePath) => !filePath.startsWith(`${ROOT_WORKFLOW_DIR}${path.sep}`)
    );
    expect(nonRootWorkflowFiles).toEqual([]);
  });

  it("has parseable YAML for each root workflow", () => {
    const rootWorkflowFiles = fs
      .readdirSync(ROOT_WORKFLOW_DIR)
      .filter((fileName) => fileName.endsWith(".yml") || fileName.endsWith(".yaml"))
      .map((fileName) => path.join(ROOT_WORKFLOW_DIR, fileName));

    expect(rootWorkflowFiles.length).toBeGreaterThan(0);
    rootWorkflowFiles.forEach((filePath) => {
      const source = fs.readFileSync(filePath, "utf8");
      const document = parseDocument(source);
      expect(document.errors, `${filePath} contains YAML parse errors`).toEqual([]);
    });
  });
});
