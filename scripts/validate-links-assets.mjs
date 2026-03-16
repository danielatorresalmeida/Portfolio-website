import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const IGNORED_DIRECTORIES = new Set([".git", "node_modules"]);

function collectHtmlFiles(rootDir) {
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

      if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
        files.push(entryPath);
      }
    }
  }

  return files;
}

function isExternalUrl(url) {
  return /^(https?:|mailto:|tel:|javascript:|data:)/i.test(url);
}

function getRelativePath(rootDir, filePath) {
  return path.relative(rootDir, filePath).replace(/\\/g, "/");
}

function readIdsFromHtml(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const ids = new Set();
  const idMatches = source.matchAll(/\sid="([^"]+)"/g);
  for (const match of idMatches) ids.add(match[1]);
  return ids;
}

function getLocalReferences(source) {
  const refs = [];
  const matches = source.matchAll(/\s(?:href|src)="([^"]+)"/g);
  for (const match of matches) {
    const value = match[1].trim();
    if (!value || isExternalUrl(value)) continue;
    refs.push(value);
  }
  return refs;
}

function resolveLocalTarget(rootDir, sourceFilePath, rawRef) {
  if (rawRef.startsWith("#")) {
    return {
      targetFilePath: sourceFilePath,
      hash: rawRef.slice(1),
    };
  }

  const [pathAndQuery, hash = ""] = rawRef.split("#");
  const [rawPathOnly] = pathAndQuery.split("?");
  const decodedPath = decodeURIComponent(rawPathOnly);
  const sourceDir = path.dirname(sourceFilePath);
  let targetPath = decodedPath ? path.resolve(sourceDir, decodedPath) : sourceFilePath;

  if (targetPath.endsWith(path.sep) || (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory())) {
    targetPath = path.join(targetPath, "index.html");
  }

  return {
    targetFilePath: targetPath,
    hash,
  };
}

export function validateLinksAndAssets(rootDir = ".") {
  const resolvedRoot = path.resolve(rootDir);
  const htmlFiles = collectHtmlFiles(resolvedRoot);
  const idsCache = new Map();
  const errors = [];

  const getIds = (filePath) => {
    if (!idsCache.has(filePath)) {
      idsCache.set(filePath, readIdsFromHtml(filePath));
    }
    return idsCache.get(filePath);
  };

  for (const htmlFilePath of htmlFiles) {
    const source = fs.readFileSync(htmlFilePath, "utf8");
    const refs = getLocalReferences(source);

    for (const ref of refs) {
      const { targetFilePath, hash } = resolveLocalTarget(resolvedRoot, htmlFilePath, ref);
      const sourceLabel = getRelativePath(resolvedRoot, htmlFilePath);

      if (!fs.existsSync(targetFilePath) || !fs.statSync(targetFilePath).isFile()) {
        errors.push(`${sourceLabel}: missing local target "${ref}"`);
        continue;
      }

      if (hash) {
        const targetIds = getIds(targetFilePath);
        if (!targetIds.has(hash)) {
          const targetLabel = getRelativePath(resolvedRoot, targetFilePath);
          errors.push(`${sourceLabel}: missing anchor "#${hash}" in ${targetLabel}`);
        }
      }
    }
  }

  return {
    checkedFiles: htmlFiles.length,
    errors,
  };
}

function runCli() {
  const result = validateLinksAndAssets(".");
  if (result.errors.length > 0) {
    console.error("Link/asset validation failed:");
    result.errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log(`Link/asset validation passed for ${result.checkedFiles} HTML file(s).`);
}

const isMainModule = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMainModule) {
  runCli();
}
