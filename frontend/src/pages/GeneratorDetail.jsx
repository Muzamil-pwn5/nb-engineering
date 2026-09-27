import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import SEO from "../components/SEO.jsx";
import { getGenerator } from "../api/generators.js";
import "./GeneratorDetail.css";

const generatorImages = {
  "cat-c18-generator":
    "https://s7d2.scene7.com/is/image/Caterpillar/CM20200320-9abe0-8dc3c?hei=1200&op_sharpen=1&qlt=100&wid=1200",

  "cummins-c110d5":
    "https://www.manelservice.com/49862-large_default/cummins-c110d5q-generator-110kva-singlethree-phase-silenced.jpg",

  "cummins-c33d5":
    "https://www.gfepowerproducts.com/cdn/shop/products/Cummins-Diesel-Generator-Canopy-30-110_7.png?v=1654684832&width=1400",

  "fg-wilson-p110-3":
    "https://rentenergo.ru/Files/Products/Large/5a40ead7c7d20.png",

  "fg-wilson-p22-5-1s":
    "https://st.mascus.com/image/product/large/1599af68/fg-wilson-p22-1-22-kva-open-ge%2C19d36562.jpg",

  "perkins-1104a-generator":
    "https://st.mascus.com/image/product/large/6167d2f3/perkins-1104c-44tag2-110-kva-g%2C7429dad9.jpg",
};

function GeneratorDetail() {
  const { slug } = useParams();

  const [generator, setGenerator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGenerator() {
      try {
        setLoading(true);
        setError("");

        const data = await getGenerator(slug);

        setGenerator(data);
      } catch (err) {
        console.error("Failed to load generator:", err);

        setError(
          err.message || "Unable to load this generator."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGenerator();
  }, [slug]);

  if (loading) {
    return (
      <>
        <SEO
          title="Generator Details | NB Engineering & Services | Pakistan"
          description="View generator specifications, features, applications, and inquiry information from NB Engineering & Services."
        />

        <Navbar />

        <main className="generator-detail-page">
          <div className="generator-detail-message">
            Loading generator...
          </div>
        </main>
      </>
    );
  }

  if (error || !generator) {
    return (
      <>
        <SEO
          title="Generator Not Found | NB Engineering & Services"
          description="The requested generator could not be found. Explore available generators from NB Engineering & Services."
        />

        <Navbar />

        <main className="generator-detail-page">
          <div className="generator-detail-message">
            <p className="detail-error">
              {error || "Generator not found."}
            </p>

            <Link
              to="/generators"
              className="detail-back-link"
            >
              ← Back to Generators
            </Link>
          </div>
        </main>
      </>
    );
  }

  const image = generator.image_url || generatorImages[generator.slug];

  const generatorName =
    generator.name || "Generator";

  const generatorModel = generator.model
    ? ` | Model ${generator.model}`
    : "";

  const seoTitle =
    `${generatorName}${generatorModel} | NB Engineering & Services | Pakistan`;

  const seoDescription =
    generator.description ||
    `Explore ${generatorName}${generatorModel}, including specifications, availability, and power generation information from NB Engineering & Services.`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
      />

      <Navbar />

      <main className="generator-detail-page">
        {/* HERO */}
        <section className="generator-detail-hero">
          <div className="generator-detail-container">
            <Link
              to="/generators"
              className="detail-back-link"
            >
              ← Back to Generators
            </Link>

            <div className="generator-detail-hero-grid">
              <div className="generator-detail-image">
                {image ? (
                  <img
                    src={image}
                    alt={generator.name}
                  />
                ) : (
                  <div className="generator-detail-no-image">
                    Image coming soon
                  </div>
                )}
              </div>

              <div className="generator-detail-info">
                <p className="detail-eyebrow">
                  POWER GENERATION
                </p>

                <h1>{generator.name}</h1>

                {generator.model && (
                  <p className="detail-model">
                    Model: {generator.model}
                  </p>
                )}

                {generator.description && (
                  <p className="detail-description">
                    {generator.description}
                  </p>
                )}

                <div className="detail-status-row">
                  <span
                    className={
                      generator.is_available
                        ? "detail-status available"
                        : "detail-status unavailable"
                    }
                  >
                    <span className="status-dot" />

                    {generator.is_available
                      ? "Currently Available"
                      : "Currently Unavailable"}
                  </span>
                </div>

                <div className="detail-actions">
                  <Link
                    to={`/contact?generator=${encodeURIComponent(
                      generator.slug
                    )}`}
                    className="detail-primary-button"
                  >
                    Request to Buy
                  </Link>

                  <Link
                    to="/contact"
                    className="detail-secondary-button"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPECIFICATIONS */}
        <section className="generator-specifications-section">
          <div className="generator-detail-container">
            <div className="detail-section-heading">
              <p className="detail-eyebrow">
                TECHNICAL INFORMATION
              </p>

              <h2>Key Specifications</h2>
            </div>

            <div className="specifications-grid">
              {generator.kva && (
                <div className="specification-item">
                  <span>Power Rating</span>
                  <strong>{generator.kva} kVA</strong>
                </div>
              )}

              {generator.kw && (
                <div className="specification-item">
                  <span>Output</span>
                  <strong>{generator.kw} kW</strong>
                </div>
              )}

              {generator.fuel_type && (
                <div className="specification-item">
                  <span>Fuel Type</span>
                  <strong>{generator.fuel_type}</strong>
                </div>
              )}

              {generator.condition && (
                <div className="specification-item">
                  <span>Condition</span>
                  <strong>{generator.condition}</strong>
                </div>
              )}

              {generator.year && (
                <div className="specification-item">
                  <span>Year</span>
                  <strong>{generator.year}</strong>
                </div>
              )}

              {generator.engine_model && (
                <div className="specification-item">
                  <span>Engine</span>
                  <strong>{generator.engine_model}</strong>
                </div>
              )}

              {generator.alternator_model && (
                <div className="specification-item">
                  <span>Alternator</span>
                  <strong>{generator.alternator_model}</strong>
                </div>
              )}

              {generator.model && (
                <div className="specification-item">
                  <span>Model</span>
                  <strong>{generator.model}</strong>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="generator-about-section">
          <div className="generator-detail-container">
            <div className="generator-about-content">
              <div>
                <p className="detail-eyebrow">
                  ABOUT THIS GENERATOR
                </p>

                <h2>Built for dependable power.</h2>
              </div>

              <div>
                <p>
                  {generator.description ||
                    "Contact NB Engineering & Services for detailed information about this generator, availability, and application requirements."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INQUIRY CTA */}
        <section className="generator-inquiry-section">
          <div className="generator-detail-container">
            <div className="generator-inquiry">
              <div>
                <p className="detail-eyebrow">
                  INTERESTED IN THIS GENERATOR?
                </p>

                <h2>Let's discuss your power requirements.</h2>

                <p>
                  Contact NB Engineering & Services for
                  availability, pricing, specifications, and
                  other information.
                </p>
              </div>

              <Link
                to={`/contact?generator=${encodeURIComponent(
                  generator.slug
                )}`}
                className="detail-inquiry-button"
              >
                Request Information
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default GeneratorDetail;