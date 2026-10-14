import { useEffect } from "react";
import { businessSchema } from "../businessSchema.js";

function BusinessSchema() {
  useEffect(() => {
    const schemaId = "nb-engineering-business-schema";
    let schemaScript = document.getElementById(schemaId);

    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = schemaId;
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify(businessSchema);
  }, []);

  return null;
}

export default BusinessSchema;
