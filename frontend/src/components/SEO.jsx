import { useEffect } from "react";

function setMeta(selector, attribute, key, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function SEO({ title, description }) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);

    const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
    const canonicalUrl = `https://nbengineerings.com${pathname}`;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const type = window.location.pathname.startsWith("/guides/") ? "article" : "website";
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "NB Engineering & Services");
    setMeta('meta[property="og:image"]', "property", "og:image", "https://nbengineerings.com/logo.jpeg");
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", "https://nbengineerings.com/logo.jpeg");
  }, [title, description]);

  return null;
}

export default SEO;
