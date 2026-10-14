const SITE_URL = "https://nbengineerings.com";
const BUSINESS_ID = `${SITE_URL}/#business`;

export function canonicalUrl(pathname) {
  const path = pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
  return `${SITE_URL}${path}`;
}

export function createServiceSchema(pathname, metadata) {
  const url = canonicalUrl(pathname);
  const content = metadata.content;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: content.heading,
        serviceType: content.eyebrow,
        description: metadata.description,
        url,
        areaServed: { "@type": "Country", name: "Pakistan" },
        provider: { "@id": BUSINESS_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: metadata.title,
        description: metadata.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services/` },
          { "@type": "ListItem", position: 3, name: content.heading, item: url },
        ],
      },
    ],
  };
}
