import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { serviceSeo } from "../src/seoRoutes.js";

const frontendDir = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(frontendDir, "dist");
const template = await readFile(join(distDir, "index.html"), "utf8");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceContent(html, tagPattern, value, label) {
  const escaped = escapeHtml(value);
  const updated = html.replace(tagPattern, `$1${escaped}$2`);
  if (updated === html) {
    throw new Error(`Could not find ${label} tag in frontend/index.html`);
  }
  return updated;
}

for (const [route, metadata] of Object.entries(serviceSeo)) {
  const canonical = `https://nbengineerings.com${route}`;
  let html = template;
  html = replaceContent(html, /(<title>)[\s\S]*?(<\/title>)/i, metadata.title, "title");
  html = replaceContent(
    html,
    /(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/i,
    metadata.description,
    "description",
  );
  html = replaceContent(
    html,
    /(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/>)/i,
    canonical,
    "canonical",
  );
  html = replaceContent(
    html,
    /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/i,
    metadata.title,
    "Open Graph title",
  );
  html = replaceContent(
    html,
    /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/>)/i,
    metadata.description,
    "Open Graph description",
  );
  html = replaceContent(
    html,
    /(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/>)/i,
    canonical,
    "Open Graph URL",
  );
  html = replaceContent(
    html,
    /(<meta\s+name="twitter:title"\s+content=")[^"]*("\s*\/>)/i,
    metadata.title,
    "Twitter title",
  );
  html = replaceContent(
    html,
    /(<meta\s+name="twitter:description"\s+content=")[^"]*("\s*\/>)/i,
    metadata.description,
    "Twitter description",
  );

  const outputPath = join(distDir, route.replace(/^\//, ""), "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
  console.log(`Generated route metadata: ${route}`);
}
