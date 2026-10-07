import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import SEO from "../components/SEO.jsx";
import { getService } from "../api/services.js";
import "./ServiceDetail.css";

const serviceImages = {
  "generator-sales": "/images/generators/fg-wilson-p110-3.jpg",
  "generator-purchase": "/images/generators/cummins-c110d5.jpg",
  "generator-rental": "/images/generators/jcb-g150rs-v.jpg",
  "generator-repair": "/images/home/services/generator-repair.jpeg",
  "generator-maintenance": "/images/home/services/generator-maintenance.jpeg",
  "ats-panels": "/images/site/ats-panel.jpg",
  "canopy-work": "/images/home/services/canopy-work.jpeg",
  "spare-parts": "/images/site/parts-stock.jpg",
};

const serviceDetails = {
  "generator-sales": {
    eyebrow: "GENERATOR SALES",
    title: "Generator Sales & Supply",
    intro:
      "Reliable generator solutions for commercial, industrial, standby, and other demanding power requirements.",
    sections: [
      {
        title: "Generator Selection",
        text:
          "We help identify generator options according to the required power capacity, application, operating environment, and intended use.",
      },
      {
        title: "New Generator Supply",
        text:
          "Our generator sales service covers equipment suitable for different commercial, industrial, and standby power requirements.",
      },
      {
        title: "Application-Based Solutions",
        text:
          "Generator requirements can vary significantly between sites. We focus on matching the equipment and configuration to the customer's actual application.",
      },
    ],
    highlights: [
      "Commercial generator solutions",
      "Industrial power requirements",
      "Standby power systems",
      "Multiple generator capacities",
      "Application-based equipment selection",
      "Technical support",
    ],
  },

  "generator-purchase": {
    eyebrow: "GENERATOR PURCHASE",
    title: "Purchase the Right Generator",
    intro:
      "Generator purchasing support for customers looking for dependable equipment matched to their power requirements.",
    sections: [
      {
        title: "Requirement Assessment",
        text:
          "Generator capacity, application, operating conditions, and expected usage are important factors when selecting equipment.",
      },
      {
        title: "Equipment Options",
        text:
          "We provide generator options across different capacities and configurations for commercial, industrial, and standby applications.",
      },
      {
        title: "Purchase Support",
        text:
          "Our team can assist customers throughout the equipment selection and purchase process based on their project requirements.",
      },
    ],
    highlights: [
      "Capacity-based selection",
      "Commercial applications",
      "Industrial applications",
      "Standby power",
      "Equipment guidance",
      "Purchase support",
    ],
  },

  "generator-rental": {
    eyebrow: "GENERATOR RENTAL",
    title: "Generator Rental Solutions",
    intro:
      "Temporary and project-based generator rental solutions for customers who need dependable power without purchasing equipment.",
    sections: [
      {
        title: "Temporary Power",
        text:
          "Generator rental can provide temporary power for projects, events, construction sites, backup requirements, and other applications.",
      },
      {
        title: "Capacity Selection",
        text:
          "The appropriate generator depends on the expected load, application, operating period, and site requirements.",
      },
      {
        title: "Rental Support",
        text:
          "We help customers identify a suitable rental solution according to the requirements of the project or temporary power application.",
      },
    ],
    highlights: [
      "Temporary power solutions",
      "Project-based rental",
      "Construction applications",
      "Backup requirements",
      "Multiple capacities",
      "Rental support",
    ],
  },

  "generator-repair": {
    eyebrow: "GENERATOR REPAIR",
    title: "Generator Repair & Troubleshooting",
    intro:
      "Technical repair support for generators experiencing mechanical, electrical, control, or operational problems.",
    sections: [
      {
        title: "Fault Diagnosis",
        text:
          "Generator problems can have different mechanical, electrical, fuel, cooling, or control-system causes. Proper diagnosis helps identify the underlying issue.",
      },
      {
        title: "Repair Work",
        text:
          "Repair requirements depend on the equipment condition and the fault identified during inspection and troubleshooting.",
      },
      {
        title: "Testing & Inspection",
        text:
          "After repair work, equipment can be inspected and tested to verify operation and identify any remaining issues.",
      },
    ],
    highlights: [
      "Fault diagnosis",
      "Mechanical troubleshooting",
      "Electrical troubleshooting",
      "Control-system inspection",
      "Component replacement",
      "Post-repair testing",
    ],
  },

  "generator-maintenance": {
    eyebrow: "GENERATOR MAINTENANCE",
    title: "Generator Maintenance",
    intro:
      "Preventive and routine generator maintenance to help keep power equipment operating in suitable condition.",
    sections: [
      {
        title: "Routine Inspection",
        text:
          "Regular inspection helps identify equipment conditions that may require attention before they develop into larger service issues.",
      },
      {
        title: "Preventive Maintenance",
        text:
          "Maintenance activities can include inspection of relevant generator systems and servicing requirements according to equipment condition.",
      },
      {
        title: "Operational Checks",
        text:
          "Generator operation can be checked as part of maintenance activities to identify abnormal conditions and service requirements.",
      },
    ],
    highlights: [
      "Routine inspections",
      "Preventive maintenance",
      "Equipment checks",
      "Operational inspection",
      "Service support",
      "Generator upkeep",
    ],
  },

  "ats-panels": {
    eyebrow: "ATS PANELS",
    title: "Automatic Transfer Switch Panels",
    intro:
      "ATS panel solutions designed to manage automatic transfer between utility power and generator power.",
    sections: [
      {
        title: "Automatic Power Transfer",
        text:
          "An automatic transfer switch can manage the transfer of electrical load between the normal utility supply and a generator supply when configured for the application.",
      },
      {
        title: "Generator Integration",
        text:
          "ATS panels need to be matched with the generator system and electrical requirements of the installation.",
      },
      {
        title: "Panel Configuration",
        text:
          "Panel configuration depends on the electrical system, generator capacity, load requirements, and intended operating arrangement.",
      },
    ],
    highlights: [
      "Automatic transfer systems",
      "Generator integration",
      "Utility-to-generator transfer",
      "Electrical panel solutions",
      "Application-based configuration",
      "Technical support",
    ],
  },

  "canopy-work": {
    eyebrow: "CANOPY WORK",
    title: "Generator Canopy Work",
    intro:
      "Generator canopy solutions focused on equipment protection, practical installation requirements, and site considerations.",
    sections: [
      {
        title: "Generator Enclosures",
        text:
          "Canopies can provide an enclosure around generator equipment and can be designed according to the equipment and installation requirements.",
      },
      {
        title: "Site Requirements",
        text:
          "Generator enclosure requirements can vary according to location, equipment dimensions, ventilation, access, and operating conditions.",
      },
      {
        title: "Practical Fabrication",
        text:
          "Canopy work can be planned around the generator configuration and the practical requirements of the installation.",
      },
    ],
    highlights: [
      "Generator enclosures",
      "Equipment protection",
      "Site-specific requirements",
      "Ventilation considerations",
      "Access considerations",
      "Canopy fabrication",
    ],
  },

  "spare-parts": {
    eyebrow: "SPARE PARTS",
    title: "Generator Spare Parts",
    intro:
      "Generator spare parts support for maintenance, repair, replacement, and ongoing equipment service requirements.",
    sections: [
      {
        title: "Replacement Parts",
        text:
          "Replacement parts may be required during generator repair and maintenance depending on equipment condition and component wear.",
      },
      {
        title: "Parts for Different Systems",
        text:
          "Generator systems contain multiple mechanical, electrical, fuel, cooling, and control components that may require servicing or replacement.",
      },
      {
        title: "Parts Support",
        text:
          "We help customers identify required parts based on the generator equipment and service requirement.",
      },
    ],
    highlights: [
      "Generator replacement parts",
      "Maintenance parts",
      "Repair components",
      "Mechanical components",
      "Electrical components",
      "Parts identification support",
    ],
  },
};

const fallbackDetails = {
  eyebrow: "NB ENGINEERING & SERVICES",
  title: "Professional Power Service",
  intro:
    "Practical generator and power support based on your equipment and application requirements.",
  sections: [
    {
      title: "Service Overview",
      text:
        "Our team provides practical support for generator and power equipment requirements.",
    },
    {
      title: "Technical Support",
      text:
        "Service requirements vary by equipment, application, and operating conditions. Contact us to discuss your requirement.",
    },
  ],
  highlights: [
    "Professional service support",
    "Generator expertise",
    "Application-based solutions",
    "Technical assistance",
  ],
};

function ServiceDetail() {
  const { slug } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadService() {
      try {
        setLoading(true);
        setError("");

        const data = await getService(slug);

        if (mounted) {
          setService(data);
        }
      } catch (err) {
        console.error("Failed to load service:", err);
        const localService = serviceDetails[slug];
        if (mounted && localService) {
          setService({
            slug,
            name: localService.title,
            description: localService.intro,
          });
        } else if (mounted) {
          setError("This service is not available in the current catalogue.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadService();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <>
        <SEO
          title="Generator Service | NB Engineering & Services | Pakistan"
          description="Explore generator and power service solutions from NB Engineering & Services."
        />

        <Navbar />

        <main className="service-detail-page">
          <div className="service-detail-message">
            Loading service...
          </div>
        </main>
      </>
    );
  }

  if (error || !service) {
    return (
      <>
        <SEO
          title="Service Not Found | NB Engineering & Services"
          description="The requested service could not be found. Explore generator and power services from NB Engineering & Services."
        />

        <Navbar />

        <main className="service-detail-page">
          <div className="service-detail-message service-detail-error">
            <h1>Service Not Found</h1>
            <p>
              {error ||
                "The requested service could not be found."}
            </p>

            <Link
              to="/services"
              className="service-detail-message-link"
            >
              ← Back to Services
            </Link>
          </div>
        </main>
      </>
    );
  }

  const details = serviceDetails[slug] || fallbackDetails;

  const image = serviceImages[slug] || "/images/site/generator-100kva-canopy.png";

  const serviceName =
    service.name || details.title || "Generator Service";

  const seoTitle =
    `${serviceName} | NB Engineering & Services | Pakistan`;

  const seoDescription =
    service.description ||
    details.intro ||
    `Explore ${serviceName} from NB Engineering & Services, including technical support and power generation solutions in Pakistan.`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
      />

      <Navbar />

      <main className="service-detail-page">
        {/* HERO */}
        <section className="service-detail-hero">
          {image && (
            <img
              className="service-detail-hero-image"
              src={image}
              alt={service.name}
              onError={(event) => {
                event.currentTarget.src = "/images/site/generator-100kva-canopy.png";
              }}
            />
          )}

          <div className="service-detail-hero-gradient" />

          <div className="service-detail-hero-content">
            <Link
              to="/services"
              className="service-detail-back"
            >
              ← All Services
            </Link>

            <p className="service-detail-eyebrow">
              {details.eyebrow}
            </p>

            <h1>{details.title}</h1>

            <p className="service-detail-intro">
              {details.intro}
            </p>

            <Link
              to="/contact"
              className="service-detail-primary-button"
            >
              Request This Service
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="service-detail-content">
          <div className="service-detail-content-inner">
            <div className="service-detail-main">
              <p className="service-detail-label">
                SERVICE OVERVIEW
              </p>

              <h2>{service.name}</h2>

              {service.description && (
                <p className="service-detail-description">
                  {service.description}
                </p>
              )}

              <div className="service-detail-sections">
                {details.sections.map((section, index) => (
                  <article
                    key={`${section.title}-${index}`}
                    className="service-detail-section"
                  >
                    <span className="service-detail-section-number">
                      0{index + 1}
                    </span>

                    <div>
                      <h3>{section.title}</h3>
                      <p>{section.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="service-detail-sidebar">
              <div className="service-detail-panel">
                <p className="service-detail-label">
                  WHAT WE PROVIDE
                </p>

                <ul className="service-detail-highlights">
                  {details.highlights.map((item, index) => (
                    <li key={`${item}-${index}`}>
                      <span>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-detail-panel service-detail-contact-panel">
                <p className="service-detail-label">
                  NEED THIS SERVICE?
                </p>

                <h3>
                  Tell us what you need and our team can discuss
                  the requirement with you.
                </h3>

                <Link
                  to="/contact"
                  className="service-detail-contact-button"
                >
                  Get In Touch
                  <span>→</span>
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="service-detail-bottom-cta">
          <div className="service-detail-bottom-cta-inner">
            <div>
              <p className="service-detail-label">
                NB ENGINEERING & SERVICES
              </p>

              <h2>
                Need help with your generator or power
                requirement?
              </h2>
            </div>

            <Link
              to="/contact"
              className="service-detail-bottom-button"
            >
              Contact Us
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default ServiceDetail;
