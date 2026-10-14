import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { businessSchema } from "../src/businessSchema.js";
import { articles } from "../src/data/articles.js";
import { generators, services } from "../src/data/catalog.js";
import { routeSeo, serviceSeo } from "../src/seoRoutes.js";
import { createServiceSchema } from "../src/structuredData.js";

const frontendDir = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(frontendDir, "dist");
const template = await readFile(join(distDir, "index.html"), "utf8");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function canonicalUrl(route) {
  return route === "/" ? "https://nbengineerings.com/" : `https://nbengineerings.com${route}/`;
}

function normalizeInternalLinks(html) {
  return html.replace(/(<a\b[^>]*\bhref=")(\/[^"?#]*)(\?[^"#]*)?(#[^"]*)?("\s*>)/gi, (_match, prefix, path, query = "", hash = "", suffix) => {
    const normalizedPath = path === "/" || path.endsWith("/") ? path : `${path}/`;
    return `${prefix}${normalizedPath}${query}${hash}${suffix}`;
  });
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
  const schema = createServiceSchema(route, metadata);
  return `<script id="nb-engineering-service-schema" type="application/ld+json">${safeJson(schema)}</script>`;
}

function articleSchemaScript(route, article) {
  const canonical = canonicalUrl(route);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: article.title,
    description: article.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: { "@type": "Organization", name: "NB Engineering & Services", "@id": "https://nbengineerings.com/#business" },
    publisher: { "@id": "https://nbengineerings.com/#business" },
    datePublished: article.datePublished,
    dateModified: article.datePublished,
  };
  return `<script id="nb-engineering-article-schema" type="application/ld+json">${safeJson(schema)}</script>`;
}

function linkList(items) {
  return `<ul>${items.map((item) => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>${item.description ? ` — ${escapeHtml(item.description)}` : ""}</li>`).join("\n")}</ul>`;
}

function staticMain(inner) {
  return `<main id="seo-prerendered-content" class="seo-prerendered-content"><article>${inner}</article></main>`;
}

function prerenderServiceContent(metadata) {
  const content = metadata.content;
  const sections = content.sections
    .map((section) => `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p></section>`)
    .join("\n");
  const highlights = content.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
  const related = content.related
    ? `<p><a href="${escapeHtml(content.related.href)}">${escapeHtml(content.related.label)}</a></p>`
    : "";
  return staticMain(`<p>${escapeHtml(content.eyebrow)}</p><h1>${escapeHtml(content.heading)}</h1><p>${escapeHtml(content.intro)}</p>${sections}<section><h2>Service scope</h2><ul>${highlights}</ul></section>${related}<p><a href="/contact">Contact NB Engineering about this service</a></p>`);
}

function prerenderArticleContent(article) {
  const sections = article.sections
    .map((section) => `<section><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}</section>`)
    .join("\n");
  const published = article.datePublished
    ? `<p>Published ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${article.datePublished}T00:00:00Z`))}</p>`
    : "";
  return staticMain(`<p>${escapeHtml(article.category)}</p><h1>${escapeHtml(article.title)}</h1>${published}<p>${escapeHtml(article.intro)}</p>${sections}<aside><h2>Key takeaway</h2><p>${escapeHtml(article.takeaway)}</p></aside>${article.related ? `<p><a href="${escapeHtml(article.related.href)}">${escapeHtml(article.related.label)}</a></p>` : ""}<p><a href="/contact">Contact NB Engineering</a></p>`);
}

function prerenderHome() {
  const serviceLinks = services.map((item) => ({ href: `/services/${item.slug}`, label: item.name, description: item.description }));
  const generatorLinks = generators.map((item) => ({ href: `/generators/${item.slug}`, label: `${item.name} — ${item.kva} kVA`, description: item.description }));
  return staticMain(`<p>Power generation / Pakistan</p><h1>Power that keeps business moving.</h1><p>NB Engineering &amp; Services provides generator supply, rental, installation, maintenance, repair, ATS/AMF panels, canopy work and spare parts for commercial and industrial power requirements across Pakistan.</p><section><h2>Generator and power services</h2><p>Start with the load, site and operating requirements. Explore the service options and contact the team to discuss the scope for your location.</p>${linkList(serviceLinks)}</section><section><h2>Generator range</h2>${linkList(generatorLinks)}</section><section><h2>Plan your power requirement</h2><p>Share the application, estimated capacity, location, existing equipment and required timing. If capacity is uncertain, explain the loads that need power so the requirement can be discussed.</p><p><a href="/contact">Contact NB Engineering</a> · <a href="/guides">Read generator planning guides</a></p></section>`);
}

function prerenderServiceIndex() {
  return staticMain(`<p>Generator services / Pakistan</p><h1>Generator services for commercial and industrial power</h1><p>Explore generator installation, sales, purchase planning, rental, repair, maintenance, ATS/AMF panels, canopy work and spare parts. Service scope and site requirements vary by project and location.</p>${linkList(services.map((item) => ({ href: `/services/${item.slug}`, label: item.name, description: item.description })))}<p><a href="/tarnol">Generator services in Tarnol, Islamabad</a> · <a href="/contact">Discuss a service requirement</a></p>`);
}

function prerenderGeneratorIndex() {
  return staticMain(`<p>Generator catalogue / Pakistan</p><h1>Diesel generators for commercial, industrial and standby applications</h1><p>Compare the models and capacity information listed by NB Engineering. Confirm the exact configuration, documentation and current availability for the unit being considered.</p>${linkList(generators.map((item) => ({ href: `/generators/${item.slug}`, label: `${item.name} — ${item.kva} kVA / ${item.kw} kW`, description: item.description })))}<p><a href="/contact">Ask about generator specifications and availability</a></p>`);
}

function prerenderGeneratorDetail(generator) {
  const specs = [
    ["Model", generator.model], ["Capacity", generator.kva ? `${generator.kva} kVA` : null],
    ["Output", generator.kw ? `${generator.kw} kW` : null], ["Fuel", generator.fuel_type],
    ["Condition", generator.condition], ["Engine", generator.engine_model],
  ].filter(([, value]) => value);
  const specList = `<dl>${specs.map(([name, value]) => `<div><dt>${escapeHtml(name)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("\n")}</dl>`;
  return staticMain(`<p>Generator specification / ${escapeHtml(generator.brand_id ? "Diesel" : "Power system")}</p><h1>${escapeHtml(generator.name)}</h1><p>${escapeHtml(generator.description)}</p>${specList}<p>Confirm the offered unit's full specification, rating basis, configuration and current availability before making a purchase decision.</p><p><a href="/contact?generator=${encodeURIComponent(generator.slug)}">Ask NB Engineering about this generator</a> · <a href="/guides/generator-sizing">Read the generator sizing guide</a></p>`);
}

function prerenderGuidesIndex() {
  return staticMain(`<p>Field notes / power systems</p><h1>Generator guides and practical advice</h1><p>Plain-English guides to generator selection, installation planning, maintenance, rental, repair and power systems. Use the information as a starting point and confirm equipment and site decisions with qualified professionals.</p>${linkList(articles.map((item) => ({ href: `/guides/${item.slug}`, label: item.title, description: item.description })))}<p><a href="/services/generator-installation">Explore generator installation services</a></p>`);
}

function prerenderContact() {
  return staticMain(`<p>Contact / NB Engineering &amp; Services</p><h1>Discuss your generator or power requirement</h1><p>Contact NB Engineering directly about generator installation, supply, service support, rental power, spare parts and technical guidance for projects across Pakistan.</p><ul><li>Telephone: <a href="tel:+923205636673">+92 320 563 6673</a></li><li>Email: <a href="mailto:nbengineerings@gmail.com">nbengineerings@gmail.com</a></li><li>Location: Tarnol, Islamabad, Pakistan</li><li>Hours: Monday–Saturday, 09:00–18:00</li></ul><p>For a useful first discussion, share the site location, application, approximate generator capacity, loads and requested service.</p>`);
}

function prerenderTarnol() {
  return staticMain(`<p>Local generator support / Tarnol, Islamabad</p><h1>Generator services in Tarnol, Islamabad</h1><p>NB Engineering &amp; Services supports generator and power-system requirements from Tarnol, Islamabad, including supply, rental, installation planning, repair, maintenance and spare parts.</p><section><h2>Generator supply</h2><p>Discuss generator options for commercial, industrial and standby applications, with capacity and configuration matched to the actual load.</p><p><a href="/services/generator-sales">Explore generator sales and supply</a></p></section><section><h2>Service and repair</h2><p>Share the generator model, symptoms, alarm information and service history so a repair or maintenance requirement can be assessed properly.</p><p><a href="/services/generator-repair">Explore generator repair support</a></p></section><section><h2>Temporary power</h2><p>Plan rental requirements around the load, operating period, placement, delivery access and electrical connection arrangement.</p><p><a href="/services/generator-rental">Explore generator rental solutions</a></p></section><p>Location: Tarnol, Islamabad, Pakistan. Hours: Monday–Saturday, 09:00–18:00.</p><p><a href="/contact">Contact NB Engineering about a Tarnol requirement</a></p>`);
}

function prerenderSpareParts() {
  const parts = [
    ["Filters & service kits", "Oil, fuel and air filtration components for scheduled servicing and cleaner engine operation."],
    ["Belts, hoses & cooling", "Replacement components for cooling systems, drive assemblies and everyday wear points."],
    ["Electrical components", "Batteries, sensors, relays and control components for starts and operation."],
    ["Engine & generator parts", "Engine-side and alternator-side replacement enquiries across common brands."],
  ];
  return staticMain(`<p>Generator support / Pakistan</p><h1>Generator spare parts and service essentials</h1><p>Share the generator make, model, serial details, part number or a clear component photo to help identify the correct replacement. Confirm fit and availability for the specific unit before ordering.</p>${linkList(parts.map(([label, description]) => ({ href: "/contact", label, description })))}<p><a href="/services/generator-maintenance">Explore generator maintenance</a> · <a href="/contact">Request a part</a></p>`);
}

function prerenderBrands() {
  const brands = [
    ["Cummins", "A power-generation brand for commercial, industrial and standby applications."],
    ["FG Wilson", "Diesel generator sets for standby, prime and industrial power applications."],
    ["Perkins", "An engine brand used in generator sets and industrial power equipment."],
    ["Caterpillar", "Generator sets for standby, prime and continuous power requirements."],
    ["Kubota", "Compact diesel-engine technology for power equipment and installations."],
    ["John Deere", "Diesel power technology for demanding applications."],
  ];
  return staticMain(`<p>Equipment / generator brands</p><h1>Generator and engine brands</h1><p>Brand is one part of a generator decision. Compare the exact model, rating, configuration, application, availability and service requirements before selecting equipment.</p>${linkList(brands.map(([label, description]) => ({ href: "/generators", label, description })))}<p><a href="/generators">Browse listed generator models</a> · <a href="/contact">Discuss a generator requirement</a></p>`);
}

function prerenderStaticRoute(route, metadata) {
  if (serviceSeo[route]?.content) return prerenderServiceContent(serviceSeo[route]);
  const article = articles.find((item) => `/guides/${item.slug}` === route);
  if (article) return prerenderArticleContent(article);
  const generator = generators.find((item) => `/generators/${item.slug}` === route);
  if (generator) return prerenderGeneratorDetail(generator);
  if (route === "/") return prerenderHome();
  if (route === "/services") return prerenderServiceIndex();
  if (route === "/generators") return prerenderGeneratorIndex();
  if (route === "/guides") return prerenderGuidesIndex();
  if (route === "/contact") return prerenderContact();
  if (route === "/tarnol") return prerenderTarnol();
  if (route === "/spare-parts") return prerenderSpareParts();
  if (route === "/brands") return prerenderBrands();
  if (route === "/privacy-policy") {
    return staticMain(`<p>Legal / NB Engineering &amp; Services</p><h1>Privacy Policy</h1><p>Read how NB Engineering &amp; Services handles information and essential browser storage on this website. The site does not provide user accounts or collect service requests through forms.</p><p><a href="/contact/">Contact NB Engineering</a> about questions relating to direct communications.</p>`);
  }
  if (route === "/terms-and-conditions") {
    return staticMain(`<p>Legal / NB Engineering &amp; Services</p><h1>Terms &amp; Conditions</h1><p>Read the terms that apply when you access and use the NB Engineering &amp; Services website for information about generator and power-system services.</p><p><a href="/contact/">Contact NB Engineering</a> with questions about the website.</p>`);
  }
  return staticMain(`<h1>${escapeHtml(metadata.title)}</h1><p>${escapeHtml(metadata.description)}</p><p><a href="/contact">Contact NB Engineering</a></p>`);
}

for (const [route, metadata] of Object.entries(routeSeo)) {
  const canonical = canonicalUrl(route);
  let html = template;
  html = replaceContent(html, /(<title>)[\s\S]*?(<\/title>)/i, metadata.title, "title");
  html = replaceContent(html, /(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/i, metadata.description, "description");
  html = replaceContent(html, /(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/>)/i, canonical, "canonical");
  html = replaceContent(html, /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/i, metadata.title, "Open Graph title");
  html = replaceContent(html, /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/>)/i, metadata.description, "Open Graph description");
  html = replaceContent(html, /(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/>)/i, canonical, "Open Graph URL");
  html = replaceContent(html, /(<meta\s+name="twitter:title"\s+content=")[^"]*("\s*\/>)/i, metadata.title, "Twitter title");
  html = replaceContent(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*("\s*\/>)/i, metadata.description, "Twitter description");

  let headExtras = localBusinessScript();
  if (serviceSeo[route]?.content) headExtras += serviceSchemaScript(route, serviceSeo[route]);
  const routeArticle = articles.find((articleItem) => `/guides/${articleItem.slug}` === route);
  if (routeArticle?.datePublished) headExtras += articleSchemaScript(route, routeArticle);
  html = html.replace("</head>", `${headExtras}\n</head>`);

  const staticContent = prerenderStaticRoute(route, metadata);
  html = html.replace('<div id="root"></div>', `${staticContent}<div id="root"></div>`);
  html = normalizeInternalLinks(html);

  const outputPath = join(distDir, route.replace(/^\//, ""), "index.html");
  if (route === "/") {
    await writeFile(join(distDir, "index.html"), html);
  } else {
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
  }
  console.log(`Generated route metadata and body: ${route}`);
}

const sitemapUrls = Object.keys(routeSeo)
  .map((route) => `  <url><loc>${canonicalUrl(route)}</loc></url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;
await writeFile(join(frontendDir, "public", "sitemap.xml"), sitemap);
await writeFile(join(distDir, "sitemap.xml"), sitemap);
console.log(`Generated XML sitemap with ${Object.keys(routeSeo).length} canonical URLs.`);
