import { articles } from "./data/articles.js";
import { generators } from "./data/catalog.js";

export const serviceSeo = {
  "/services/ats-panels": {
    title: "ATS/AMF Panels in Pakistan | NB Engineering",
    description:
      "Explore ATS/AMF panels for generator systems across Pakistan, matched to utility supply, generator controls, electrical configuration and site load.",
    content: {
      eyebrow: "ATS / AMF PANELS",
      heading: "ATS/AMF Panels for Generator Systems",
      intro:
        "NB Engineering provides ATS/AMF panel solutions for generator installations across Pakistan. Panel selection depends on the utility supply, generator controls, electrical configuration and the loads that need to transfer.",
      sections: [
        { title: "Plan the transfer arrangement", text: "An Automatic Transfer Switch (ATS) manages transfer between the normal utility supply and a generator supply. The intended sequence, connected loads and operating requirements should be understood before a panel is selected." },
        { title: "Check generator and electrical compatibility", text: "The panel needs to suit the generator controller, voltage, phase, current and neutral arrangement. Share the generator model and available electrical information so the configuration can be reviewed against the installation." },
        { title: "Coordinate the installation", text: "Panel location, cable routes, protection and access affect the completed system. Installation and commissioning requirements should be confirmed for the specific site and qualified electrical personnel should carry out electrical work." },
      ],
      highlights: ["ATS/AMF panel solutions", "Utility-to-generator transfer", "Generator control compatibility", "Load and electrical requirements", "Site-specific planning", "Pakistan-wide enquiries"],
    },
  },
  "/services/canopy-work": {
    title: "Generator Canopy Work in Pakistan | NB Engineering",
    description:
      "Plan generator canopy fabrication around equipment dimensions, ventilation, exhaust, maintenance access and site conditions across Pakistan.",
    content: {
      eyebrow: "GENERATOR CANOPY WORK",
      heading: "Generator Canopy Fabrication & Site Planning",
      intro:
        "NB Engineering handles generator canopy work for projects across Pakistan. A suitable enclosure must be planned around the generator model, site layout, airflow, exhaust routing and the access needed for operation and maintenance.",
      sections: [
        { title: "Start with the generator and site", text: "Share the generator make and model, dimensions, installation location and any existing layout drawings. These details help define the space, openings and practical constraints for canopy fabrication." },
        { title: "Allow for airflow and exhaust", text: "Ventilation and exhaust arrangements must suit the generator and site. They should be reviewed as part of the design rather than treated as cosmetic details or assumed to be identical across units." },
        { title: "Keep service access in the plan", text: "Doors, clearances and access to routine service points influence whether equipment can be inspected and maintained. Confirm access needs and site constraints before fabrication begins." },
      ],
      highlights: ["Generator canopy fabrication", "Model-specific dimensions", "Ventilation planning", "Exhaust considerations", "Service access", "Project enquiries across Pakistan"],
    },
  },
  "/services/generator-maintenance": {
    title: "Generator Maintenance in Pakistan | NB Engineering",
    description:
      "Arrange generator inspections and preventive maintenance across Pakistan, planned around the equipment model, operating hours and service needs.",
    content: {
      eyebrow: "GENERATOR MAINTENANCE",
      heading: "Generator Maintenance & Inspection",
      intro:
        "NB Engineering provides generator maintenance support for customer sites across Pakistan. The right maintenance plan depends on the generator model, operating hours, duty, site conditions and the manufacturer's service instructions.",
      sections: [
        { title: "Review the unit and its service history", text: "Share the make, model, serial details, run hours, recent alarms and available service records. This helps focus an inspection on the equipment and operating pattern rather than relying on a generic checklist." },
        { title: "Plan preventive work around the manual", text: "Inspection and servicing should follow the manufacturer's schedule and the generator's condition. Fluids, filters, batteries, cooling and fuel systems may need attention according to the specific unit and its duty." },
        { title: "Record findings and next steps", text: "A clear service record helps track operating hours, work completed, parts used and any issues needing follow-up. Tell the technician how the generator is used and what loads it supports." },
      ],
      highlights: ["Generator inspection", "Preventive maintenance planning", "Model- and duty-based service", "Operating-hour and service-history review", "Recorded findings", "Pakistan-wide service enquiries"],
    },
  },
  "/services/generator-purchase": {
    title: "Buy a Generator in Pakistan | NB Engineering",
    description:
      "Get help planning a generator purchase in Pakistan, from load and kVA requirements to duty, site conditions and installation scope.",
    content: {
      eyebrow: "GENERATOR PURCHASE PLANNING",
      heading: "Choose a Generator for Your Requirement",
      intro:
        "Planning a generator purchase starts with the loads and the way the equipment will be used. NB Engineering helps customers across Pakistan compare generator options against the application, operating duty, site and project scope.",
      sections: [
        { title: "Describe the load, not just the building", text: "List the equipment that must run together, note large motors and starting requirements, and identify essential circuits. This gives a more useful basis for discussing kVA and generator configuration than floor area alone." },
        { title: "Compare ratings and configuration", text: "Check the rating basis, voltage, phase, power factor and intended standby or regular operation. Generator options should be compared on the same technical assumptions and reviewed for the site conditions." },
        { title: "Clarify the complete project scope", text: "Confirm what is included in the proposal, such as ATS equipment, canopy, installation, commissioning, transport and after-sales support. Availability, delivery and location-specific requirements should be verified for each enquiry." },
      ],
      highlights: ["Generator purchase planning", "Load and kVA assessment", "Standby and operating-duty comparison", "Site and installation considerations", "Written scope clarification", "Pakistan-wide enquiries"],
    },
  },
  "/services/generator-rental": {
    title: "Generator Rental in Pakistan | NB Engineering",
    description:
      "Explore temporary and project-based generator rental across Pakistan. Match capacity, runtime, site access and connection needs to the project.",
    content: {
      eyebrow: "GENERATOR RENTAL",
      heading: "Temporary Generator Rental for Projects",
      intro:
        "NB Engineering offers project-based generator rental enquiries for temporary power requirements across Pakistan. Rental planning starts with the expected load, operating period, site access and the electrical connection arrangement.",
      sections: [
        { title: "Estimate the temporary load", text: "List the equipment expected to run at the same time and identify motors or other loads with high starting demand. Share voltage, phase and expected operating hours where available so capacity options can be considered." },
        { title: "Plan placement and connection", text: "Provide the project location, delivery access, available placement area and connection point. A qualified person should confirm the temporary electrical installation, protection and transfer arrangements." },
        { title: "Confirm rental scope before delivery", text: "Agree the rental period, transport, fuel responsibilities, included accessories, service arrangements and process for changes to the project. Capacity, availability and service coverage should be confirmed for the specific location and dates." },
      ],
      highlights: ["Temporary and project-based power", "Load and capacity planning", "Site access and placement review", "Connection and transfer considerations", "Rental period and scope clarification", "Enquiries across Pakistan"],
    },
  },
  "/services/generator-repair": {
    title: "Generator Repair in Pakistan | NB Engineering",
    description:
      "Request generator repair and troubleshooting across Pakistan, with fault diagnosis, repair planning and operational checks for generator issues.",
    content: {
      eyebrow: "GENERATOR REPAIR",
      heading: "Generator Repair & Troubleshooting",
      intro:
        "NB Engineering handles generator repair enquiries from sites across Pakistan. Repair planning begins with the model, symptoms, alarm information and service history so the reported fault can be assessed before work is proposed.",
      sections: [
        { title: "Record the symptoms", text: "Share whether the generator fails to start, trips, runs unevenly or has an alarm. Include the model, serial details, run hours, alarm text and any recent changes or repairs." },
        { title: "Inspect and diagnose the fault", text: "Issues may involve mechanical, electrical, fuel, cooling or control systems. Diagnosis should identify the likely cause and the repair scope; do not bypass alarms or protective devices to keep a unit running." },
        { title: "Check operation after repair", text: "Post-repair inspection and operational checks can help confirm the work and identify any remaining concerns. Electrical and mechanical repair work should be handled by qualified personnel using safe procedures." },
      ],
      highlights: ["Generator fault diagnosis", "Mechanical and electrical troubleshooting", "Control-system inspection", "Repair-scope assessment", "Post-repair operational checks", "Repair enquiries across Pakistan"],
    },
  },
  "/services/generator-sales": {
    title: "Generator Sales & Supply in Pakistan | NB Engineering",
    description:
      "Explore generator sales and supply for commercial, industrial and standby power needs across Pakistan, with options selected for your application.",
    content: {
      eyebrow: "GENERATOR SALES & SUPPLY",
      heading: "Diesel Generator Sales & Supply",
      intro:
        "NB Engineering supplies generator options for commercial, industrial and standby applications across Pakistan. The appropriate set depends on the required capacity, load profile, rating basis, site and intended operating duty.",
      sections: [
        { title: "Match the generator to the application", text: "Share the loads to be supported, operating pattern, voltage and site conditions. Motor starting and future load changes can affect generator selection, so capacity should be based on the actual requirement." },
        { title: "Compare equipment specifications", text: "Review model, kVA and kW ratings, fuel type, phase, voltage, duty rating and included configuration. Confirm the exact specification and availability for the generator being quoted." },
        { title: "Coordinate supply with the installation", text: "A generator is part of a power system. Discuss ATS/AMF requirements, canopy, placement, commissioning and service support when confirming the proposed equipment and supply scope." },
      ],
      highlights: ["Diesel generator sales and supply", "Commercial and industrial applications", "Standby generator options", "Capacity and specification review", "ATS/AMF and installation coordination", "Pakistan-wide enquiries"],
    },
  },
  "/services/spare-parts": {
    title: "Generator Spare Parts in Pakistan | NB Engineering",
    description:
      "Find generator spare parts for maintenance and repair across Pakistan. Share the make, model, serial details and part information to check fit.",
    content: {
      eyebrow: "GENERATOR SPARE PARTS",
      heading: "Generator Parts for Maintenance & Repair",
      intro:
        "NB Engineering handles generator spare-parts enquiries from customers across Pakistan. Correct identification matters: parts can vary by generator make, model, serial range and installed component, even when units appear similar.",
      sections: [
        { title: "Identify the generator", text: "Provide the make, model, serial number and a clear photo of the existing part or its label. Include a part number when available so compatibility can be checked against the equipment details." },
        { title: "Describe the service requirement", text: "Explain whether the component is needed for scheduled maintenance, troubleshooting or a repair. The system involved—such as fuel, cooling, electrical or control—can help narrow the enquiry." },
        { title: "Confirm fit and availability", text: "Check compatibility and availability for the specific generator before ordering. Do not assume parts interchange between brands, models or production variants based only on appearance." },
      ],
      highlights: ["Generator maintenance and repair parts", "Make, model and serial identification", "Part-number matching", "Mechanical, electrical and system components", "Compatibility checks", "Parts enquiries across Pakistan"],
    },
  },
};

export const routeSeo = {
  "/": {
    title: "NB Engineering & Services | Generator Solutions in Pakistan",
    description: "Generator sales, rental, maintenance, repair, ATS/AMF panels and spare parts for commercial and industrial power needs across Pakistan.",
  },
  "/generators": {
    title: "Diesel Generators for Sale in Pakistan | NB Engineering",
    description: "Explore diesel generator options for standby, commercial and industrial applications. Compare models and discuss your power requirement across Pakistan.",
  },
  "/services": {
    title: "Generator Services in Pakistan | NB Engineering",
    description: "Explore generator sales, rental, repair, maintenance, ATS/AMF panels, canopy work and spare parts from NB Engineering.",
  },
  "/brands": {
    title: "Generator Brands in Pakistan | NB Engineering",
    description: "Explore generator brands and equipment options available through NB Engineering. Confirm model specifications and availability for your project.",
  },
  "/contact": {
    title: "Contact NB Engineering | Generator Support in Pakistan",
    description: "Contact NB Engineering for generator supply, maintenance, repair, rental, spare parts and ATS/AMF panel enquiries across Pakistan.",
  },
  "/spare-parts": {
    title: "Generator Spare Parts in Pakistan | NB Engineering",
    description: "Explore generator spare parts for maintenance, repairs and replacement. Contact NB Engineering with your equipment details.",
  },
  "/guides": {
    title: "Generator Guides & Practical Advice | NB Engineering",
    description: "Practical guides to generator selection, installation, maintenance and troubleshooting for customers planning power systems in Pakistan.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | NB Engineering & Services",
    description: "Read the privacy policy for the NB Engineering & Services website and direct-contact information.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | NB Engineering & Services",
    description: "Read the terms and conditions for using the NB Engineering & Services website.",
  },
};

Object.assign(routeSeo, serviceSeo);

for (const generator of generators) {
  const productName = generator.name.replace(/\s+generator$/i, "");
  routeSeo[`/generators/${generator.slug}`] = {
    title: `${productName} Generator in Pakistan | NB Engineering`,
    description: `${productName} diesel generator: ${generator.kva} kVA for commercial, industrial or standby power. Review specifications and ask about availability across Pakistan.`,
  };
}

const guideTitles = {
  "cat-c18": "CAT C18 500 kVA Generator Guide | NB Engineering",
  "cummins-c110d5": "Cummins C110D5 110 kVA Guide | NB Engineering",
  "cummins-c33d5": "Cummins C33D5 33 kVA Guide | NB Engineering",
  "fg-wilson-p110-3": "FG Wilson P110-3 110 kVA Guide | NB Engineering",
  "fg-wilson-p22-5-1s": "FG Wilson P22.5-1S Generator Guide | NB Engineering",
  "perkins-1104a": "Perkins 1104A 60 kVA Generator Guide | NB Engineering",
  "generator-sizing": "Generator Sizing: kVA & Load Guide | NB Engineering",
  "generator-maintenance": "Generator Maintenance Checklist | NB Engineering",
  "buying-a-generator": "Buying a Generator: What to Check | NB Engineering",
  "generator-rental-guide": "Generator Rental Project Guide | NB Engineering",
  "generator-troubleshooting": "Generator Troubleshooting Guide | NB Engineering",
  "ats-panels-guide": "ATS Panels & Generator Transfer Guide | NB Engineering",
  "repair-or-replace": "Repair or Replace a Generator? | NB Engineering",
  "rent-vs-buy-generator": "Rent or Buy a Generator? | NB Engineering",
  "generator-canopy": "Generator Canopy Planning Guide | NB Engineering",
  "generator-parts": "Generator Spare Parts Guide | NB Engineering",
  "generator-installation-checklist": "Generator Installation Checklist | NB Engineering",
  "generator-fuel-costs": "Generator Fuel Costs: Key Factors | NB Engineering",
  "compare-generator-brands": "Compare Generator Brands & Models | NB Engineering",
};

for (const article of articles) {
  routeSeo[`/guides/${article.slug}`] = {
    title: guideTitles[article.slug] || `${article.title.slice(0, 42).trimEnd()} | NB Engineering`,
    description: article.description,
  };
}
