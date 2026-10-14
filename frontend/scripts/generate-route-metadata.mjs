import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { businessSchema } from "../src/businessSchema.js";
import { routeSeo, serviceSeo } from "../src/seoRoutes.js";

const frontendDir = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(frontendDir, "dist");
const template = await readFile(join(distDir, "index.html"), "utf8");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceContent(html, tagPattern, value, label) {
  if (!tagPattern.test(html)) {
    throw new Error(`Could not find ${label} tag in frontend/index.html`);
  }
  const escaped = escapeHtml(value);
  return html.replace(tagPattern, `$1${escaped}$2`);
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function localBusinessScript() {
  return `<script id="nb-engineering-business-schema" type="application/ld+json">${safeJson(businessSchema)}</script>`;
}

function serviceSchemaScript(route, metadata) {
  const canonical = `https://nbengineerings.com${route}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: metadata.content.heading,
    serviceType: metadata.content.eyebrow,
    description: metadata.description,
    url: canonical,
    areaServed: { "@type": "Country", name: "Pakistan" },
    provider: { "@id": "https://nbengineerings.com/#business" },
  };
  return `<script id="nb-engineering-service-schema" type="application/ld+json">${safeJson(schema)}</script>`;
}

function prerenderServiceContent(metadata) {
  const content = metadata.content;
  const sections = content.sections
    .map((section) => `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p></section>`)
    .join("\n");
  const highlights = content.highlights
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("\n");

  return `<main id="seo-prerendered-content" class="seo-prerendered-content"><article><p>${escapeHtml(content.eyebrow)}</p><h1>${escapeHtml(content.heading)}</h1><p>${escapeHtml(content.intro)}</p>${sections}<section><h2>Service scope</h2><ul>${highlights}</ul></section><p><a href="/contact">Contact NB Engineering about this service</a></p></article></main>`;
}

for (const [route, metadata] of Object.entries(routeSeo)) {
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

  let headExtras = localBusinessScript();
  if (serviceSeo[route]?.content) {
    headExtras += serviceSchemaScript(route, serviceSeo[route]);
  }
  html = html.replace("</head>", `${headExtras}\n</head>`);

  const staticContent = serviceSeo[route]?.content
    ? prerenderServiceContent(serviceSeo[route])
    : "";
  html = html.replace('<div id="root"></div>', `${staticContent}<div id="root"></div>`);

  const outputPath = join(distDir, route.replace(/^\//, ""), "index.html");
  if (route === "/") {
    await writeFile(join(distDir, "index.html"), html);
  } else {
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
  }
  console.log(`Generated route metadata: ${route}`);
}

const sitemapUrls = Object.keys(routeSeo)
  .map((route) => `  <url><loc>https://nbengineerings.com${route}</loc></url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;
await writeFile(join(frontendDir, "public", "sitemap.xml"), sitemap);
await writeFile(join(distDir, "sitemap.xml"), sitemap);
console.log(`Generated XML sitemap with ${Object.keys(routeSeo).length} canonical URLs.`);
