import { useEffect } from "react";

function BusinessSchema() {
  useEffect(() => {
    const schemaId = "nb-engineering-business-schema";

    const existingSchema =
      document.getElementById(schemaId);

    if (existingSchema) {
      existingSchema.remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://nbengineering.com/#business",

      name: "NB Engineering & Services",

      url: "https://nbengineering.com/",

      logo: "https://nbengineering.com/logo.jpeg",

      image: "https://nbengineering.com/logo.jpeg",

      description:
        "NB Engineering & Services provides generators, power generation solutions, installation, maintenance, repair, rental, spare parts, and after-sales support in Pakistan.",

      areaServed: {
        "@type": "Country",
        name: "Pakistan",
      },

      address: {
        "@type": "PostalAddress",
        addressLocality: "Tarnol",
        addressRegion:
          "Islamabad Capital Territory",
        addressCountry: "PK",
      },

      knowsAbout: [
        "Diesel Generators",
        "Generator Sales",
        "Generator Rental",
        "Generator Installation",
        "Generator Repair",
        "Generator Maintenance",
        "ATS Panels",
        "Generator Canopy Work",
        "Generator Spare Parts",
        "Power Generation Solutions",
      ],
    };

    const script =
      document.createElement("script");

    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent =
      JSON.stringify(schema);

    document.head.appendChild(script);

    return () => {
      const currentSchema =
        document.getElementById(schemaId);

      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, []);

  return null;
}

export default BusinessSchema;