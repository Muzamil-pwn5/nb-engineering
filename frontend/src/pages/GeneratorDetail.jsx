import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import SEO from "../components/SEO.jsx";
import { getGenerator } from "../api/generators.js";
import "./GeneratorDetail.css";

const generatorImages = {
  "cat-c18-generator": "/images/generators/cat-c18-generator.jpg",
  "cummins-c110d5": "/images/generators/cummins-c110d5.jpg",
  "cummins-c33d5": "/images/generators/cummins-c33d5.jpg",
  "fg-wilson-p110-3": "/images/generators/fg-wilson-p110-3.jpg",
  "fg-wilson-p180p2-180kva": "/images/generators/fg-wilson-p180p2-180kva.jpeg",
  "fg-wilson-p22-5-1s": "/images/generators/fg-wilson-p22-1.jpg",
  "perkins-1104a-generator": "/images/generators/perkins-1104a-generator.jpg",
  "jcb-g200rs-v": "/images/generators/jcb-g200rs-v.jpg",
};

const fallbackGenerators = [
  { name: "FG Wilson P110-3 Diesel Generator", slug: "fg-wilson-p110-3", kva: 110, kw: 88, fuel_type: "Diesel", is_available: true, image_url: generatorImages["fg-wilson-p110-3"], description: "110 kVA diesel generator for dependable commercial and standby power." },
  { name: "Cummins C110D5 Generator", slug: "cummins-c110d5", kva: 110, kw: 88, fuel_type: "Diesel", is_available: true, image_url: generatorImages["cummins-c110d5"], description: "Compact 110 kVA Cummins system for commercial and critical backup applications." },
  { name: "Caterpillar C18 Generator", slug: "cat-c18-generator", kva: 500, kw: 400, fuel_type: "Diesel", is_available: true, image_url: generatorImages["cat-c18-generator"], description: "High-capacity Caterpillar power for demanding industrial operations." },
  { name: "FG Wilson P180P2 Generator", slug: "fg-wilson-p180p2-180kva", kva: 180, kw: 144, fuel_type: "Diesel", is_available: true, image_url: generatorImages["fg-wilson-p180p2-180kva"], description: "180 kVA generator for commercial, industrial and prime-power requirements." },
  { name: "Perkins 1104A Generator", slug: "perkins-1104a-generator", kva: 60, kw: 48, fuel_type: "Diesel", is_available: true, image_url: generatorImages["perkins-1104a-generator"], description: "Reliable 60 kVA Perkins-powered generator for standby requirements." },
  { name: "JCB G200RS-V Generator", slug: "jcb-g200rs-v", kva: 200, kw: 160, fuel_type: "Diesel", is_available: true, image_url: generatorImages["jcb-g200rs-v"], description: "200 kVA JCB generator for commercial, construction and temporary power." },
];

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
        const localGenerator = fallbackGenerators.find((item) => item.slug === slug);
        if (localGenerator) {
          setGenerator(localGenerator);
        } else {
          setError("This generator is not available in the current catalogue.");
        }
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

  const image = generatorImages[generator.slug] || generator.image_url;

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
                    src={image || "/images/generators/cat-c18-generator.jpg"}
                    alt={generator.name}
                    onError={(event) => { event.currentTarget.src = "/images/generators/cat-c18-generator.jpg"; }}
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
