import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import { getServices } from "../api/services.js";
import "./Services.css";

const serviceImages = {
  "generator-sales":
    "https://cpimg.tistatic.com/10280065/b/4/HG-100-KVA-Diesel-Generator..jpg",

  "generator-purchase":
    "https://www.elcospowergenerators.com/wp-content/uploads/2020/10/square_wb_pro.jpg",

  "generator-rental":
    "https://static.wixstatic.com/media/59f0da_a2ef750fc893447cb7f6e8a65ce0258f~mv2.jpeg/v1/fit/w_520%2Ch_464%2Cq_90/59f0da_a2ef750fc893447cb7f6e8a65ce0258f~mv2.jpeg",

  "generator-repair":
    "https://waltpower.com/wp-content/uploads/2025/03/check-steps-of-diesel-generator.jpg",

  "generator-maintenance":
    "https://media.licdn.com/dms/image/v2/D4E22AQE-1L2qS7sFaQ/feedshare-shrink_800/feedshare-shrink_800/0/1695562566416?e=2147483647&t=I6kGyHYr6WTN6EcbRe5k_yPgilNng-FmtN-VsbuXR_E&v=beta",

  "ats-panels":
    "https://www.bimsonpower.com/cdn/shop/files/BP_19010200027_Petrol-ATS_featured-image_13cx9y_600x600_crop_center.png?v=1773815325",

  "canopy-work":
    "https://www.elcospowergenerators.com/wp-content/uploads/2020/10/square_wb_pro.jpg",

  "spare-parts":
    "https://www.tahirandsonz.com/products/generator-parts.webp",
};

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const data = await getServices();

        if (!Array.isArray(data)) {
          throw new Error("Invalid services response from server.");
        }

        setServices(data);
      } catch (err) {
        console.error("Failed to load services:", err);

        setError(
          err.message || "Unable to load services from the server."
        );
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <>
      <Navbar />

      <main className="services-page">
        <section className="services-hero">
          <div className="services-hero-content">
            <p className="services-eyebrow">
              ENGINEERING & POWER SOLUTIONS
            </p>

            <h1>Our Services</h1>

            <p className="services-hero-text">
              Complete generator and power solutions for commercial,
              industrial, standby, and other demanding applications.
            </p>
          </div>
        </section>

        <section className="services-catalog">
          <div className="services-catalog-inner">
            <div className="services-section-heading">
              <div>
                <p className="services-eyebrow">
                  WHAT WE DO
                </p>

                <h2>
                  Power solutions built around your requirements.
                </h2>
              </div>

              <p>
                From generator sales and rental to maintenance,
                repairs, ATS panels, canopy work, and spare parts,
                NB Engineering & Services provides practical power
                solutions for different requirements.
              </p>
            </div>

            {loading && (
              <div className="services-message">
                Loading services...
              </div>
            )}

            {!loading && error && (
              <div className="services-message services-error">
                {error}
              </div>
            )}

            {!loading && !error && services.length === 0 && (
              <div className="services-message">
                No services are currently available.
              </div>
            )}

            {!loading && !error && services.length > 0 && (
              <div className="services-grid">
                {services.map((service, index) => {
                  const image =
                    service.image_url ||
                    serviceImages[service.slug];

                  const imageClass =
                    service.slug === "ats-panels"
                      ? "service-page-image service-ats-image"
                      : "service-page-image";

                  return (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="service-page-card-link"
                      style={{
                        "--service-delay": `${index * 80}ms`,
                      }}
                    >
                      <article className="service-page-card">
                        <div className={imageClass}>
                          {image ? (
                            <img
                              src={image}
                              alt={service.name}
                            />
                          ) : (
                            <div className="service-no-image">
                              Image coming soon
                            </div>
                          )}

                          <div className="service-image-overlay" />
                        </div>

                        <div className="service-page-content">
                          <div className="service-content-main">
                            <h3>{service.name}</h3>

                            {service.description && (
                              <p>{service.description}</p>
                            )}
                          </div>

                          <span className="service-arrow">
                            →
                          </span>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="services-cta">
          <div className="services-cta-inner">
            <div>
              <p className="services-eyebrow">
                NEED A POWER SOLUTION?
              </p>

              <h2>
                Tell us what you need. We'll help you find
                the right solution.
              </h2>
            </div>

            <Link
              to="/contact"
              className="services-cta-button"
            >
              Get In Touch
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Services;