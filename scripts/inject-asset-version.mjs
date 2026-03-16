import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

export const ASSET_VERSION_TOKEN = "__ASSET_VERSION__";

const IGNORED_DIRECTORIES = new Set([".git", "node_modules"]);

function collectHtmlFiles(rootDir) {
  const htmlFiles = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    entries.forEach((entry) => {
      const entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORIES.has(entry.name)) return;
        stack.push(entryPath);
        return;
      }

      if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
        htmlFiles.push(entryPath);
      }
    });
  }

  return htmlFiles;
}

function countOccurrences(source, token) {
  return source.split(token).length - 1;
}

export function injectAssetVersion(rootDir, version) {
  if (typeof version !== "string" || version.trim() === "") {
    throw new Error("A non-empty version string is required.");
  }

  const resolvedRoot = path.resolve(rootDir);
  const htmlFiles = collectHtmlFiles(resolvedRoot);
  let updatedFiles = 0;
  let replacedTokens = 0;

  htmlFiles.forEach((filePath) => {
    const source = fs.readFileSync(filePath, "utf8");
    if (!source.includes(ASSET_VERSION_TOKEN)) return;

    replacedTokens += countOccurrences(source, ASSET_VERSION_TOKEN);
    const next = source.replaceAll(ASSET_VERSION_TOKEN, version);
    fs.writeFileSync(filePath, next, "utf8");
    updatedFiles += 1;
  });

  return {
    scannedFiles: htmlFiles.length,
    updatedFiles,
    replacedTokens,
  };
}

function parseCliArgs(args) {
  let rootDir = ".";
  let version = "";

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--root") {
      rootDir = args[index + 1] || "";
      index += 1;
      continue;
    }

    if (arg === "--version") {
      version = args[index + 1] || "";
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!version) {
    throw new Error("Missing required argument --version <value>.");
  }

  return { rootDir, version };
}

function runCli() {
  const { rootDir, version } = parseCliArgs(process.argv.slice(2));
  const result = injectAssetVersion(rootDir, version);
  console.log(
    `Injected version ${version} into ${result.updatedFiles} HTML file(s); replaced ${result.replacedTokens} token(s).`
  );
}

const isMainModule = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMainModule) {
  runCli();
}
