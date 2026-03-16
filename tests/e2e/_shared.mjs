import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

export function shouldRunBrowserChecks() {
  return process.env.CI === "true" || process.env.RUN_BROWSER_TESTS === "true";
}

function resolveRequestFile(rootDir, pathname) {
  const safePathname = decodeURIComponent(pathname);
  const initial = path.resolve(rootDir, `.${safePathname}`);

  if (!initial.startsWith(rootDir)) return null;

  if (fs.existsSync(initial) && fs.statSync(initial).isFile()) return initial;

  if (fs.existsSync(initial) && fs.statSync(initial).isDirectory()) {
    const nestedIndex = path.join(initial, "index.html");
    if (fs.existsSync(nestedIndex)) return nestedIndex;
  }

  if (safePathname.endsWith("/")) {
    const indexPath = path.resolve(rootDir, `.${safePathname}index.html`);
    if (indexPath.startsWith(rootDir) && fs.existsSync(indexPath)) return indexPath;
  }

  return null;
}

export async function startStaticServer() {
  const rootDir = path.resolve(__dirname, "..", "..");
  const server = http.createServer((req, res) => {
    const url = new URL(req.url || "/", "http://localhost");
    const filePath = resolveRequestFile(rootDir, url.pathname);

    if (!filePath) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    fs.createReadStream(filePath).pipe(res);
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  const baseUrl = `http://127.0.0.1:${port}`;

  return {
    baseUrl,
    close: () => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve()))),
  };
}

export async function buildChromeDriver() {
  const options = new chrome.Options();
  options.addArguments(
    "--headless=new",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1366,900"
  );

  if (process.env.CHROME_BIN) {
    options.setChromeBinaryPath(process.env.CHROME_BIN);
  }

  return new Builder().forBrowser("chrome").setChromeOptions(options).build();
}
