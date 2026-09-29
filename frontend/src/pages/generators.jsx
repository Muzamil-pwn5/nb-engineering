import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar.jsx";
import { getGenerators } from "../api/generators.js";
import "./generators.css";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE =
  "https://s7d2.scene7.com/is/image/Caterpillar/CM20190523-014ef-4aa82";

const generatorImages = {
  "fg-wilson-p22-1":
    "/images/generators/fg-wilson-p22-1.jpg",

  "fg-wilson-p110-3":
    "/images/generators/fg-wilson-p110-3.jpg",

  "cummins-c33d5":
    "/images/generators/cummins-c33d5.jpg",

  "cummins-c110d5":
    "/images/generators/cummins-c110d5.jpg",

  "cat-c18-generator":
    "/images/generators/cat-c18-generator.jpg",

  "perkins-1104a-generator":
    "/images/generators/perkins-1104a-generator.jpg",

  "doosan-g60xw":
    "/images/generators/doosan-g60xw.jpg",

  "doosan-g80xw":
    "/images/generators/doosan-g80xw.jpg",

  "doosan-g115xw":
    "/images/generators/doosan-g115xw.jpg",

  "doosan-g150xw":
    "/images/generators/doosan-g150xw.jpg",

  "doosan-g200xw":
    "/images/generators/doosan-g200xw.jpg",

  "jcb-g40rs-v":
    "/images/generators/jcb-g40rs-v.jpg",

  "jcb-g60rs-v":
    "/images/generators/jcb-g60rs-v.jpg",

  "jcb-g100rs-v":
    "/images/generators/jcb-g100rs-v.jpg",

  "jcb-g150rs-v":
    "/images/generators/jcb-g150rs-v.jpg",

  "jcb-g200rs-v":
    "/images/generators/jcb-g200rs-v.jpg",
};

const brandOrder = [
  "FG Wilson",
  "Cummins",
  "Caterpillar",
  "Perkins",
  "Doosan",
  "JCB",
];

const capacityBands = [
  { id: "all", label: "ALL OUTPUTS" },
  { id: "small", label: "20–50 KVA", min: 20, max: 50 },
  { id: "medium", label: "50–100 KVA", min: 50, max: 100 },
  { id: "large", label: "100–250 KVA", min: 100, max: 250 },
  { id: "heavy", label: "250–500 KVA", min: 250, max: 500 },
  { id: "industrial", label: "500+ KVA", min: 500 },
];

function formatNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return value;
  }

  return Number.isInteger(number)
    ? number.toLocaleString()
    : number.toLocaleString(undefined, {
        maximumFractionDigits: 1,
      });
}

function getBrandName(generator) {
  if (generator.brand?.name) {
    return generator.brand.name;
  }

  const name = generator.name?.toLowerCase() || "";

  if (name.includes("fg wilson")) return "FG Wilson";
  if (name.includes("cummins")) return "Cummins";
  if (name.includes("caterpillar") || name.includes("cat ")) {
    return "Caterpillar";
  }
  if (name.includes("perkins")) return "Perkins";
  if (name.includes("doosan")) return "Doosan";
  if (name.includes("jcb")) return "JCB";

  return "Other";
}

function getCapacityBand(kva) {
  const value = Number(kva);

  if (Number.isNaN(value)) {
    return "all";
  }

  if (value < 50) return "small";
  if (value < 100) return "medium";
  if (value < 250) return "large";
  if (value < 500) return "heavy";

  return "industrial";
}

function GeneratorCard({ generator, index }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  const image =
    !imageError &&
    (generator.image_url || generatorImages[generator.slug]);

  const brand = getBrandName(generator);

  useEffect(() => {
    const card = cardRef.current;
    const imageElement = imageRef.current;

    if (!card || !imageElement) {
      return undefined;
    }

    const moveX = gsap.quickTo(imageElement, "x", {
      duration: 0.55,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(imageElement, "y", {
      duration: 0.55,
      ease: "power3.out",
    });

    const rotate = gsap.quickTo(imageElement, "rotation", {
      duration: 0.55,
      ease: "power3.out",
    });

    const handleMove = (event) => {
      if (window.matchMedia("(hover: none)").matches) {
        return;
      }

      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      moveX(x * 12);
      moveY(y * 8);
      rotate(x * 1.2);
    };

    const handleLeave = () => {
      moveX(0);
      moveY(0);
      rotate(0);
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      to={`/generators/${generator.slug}`}
      className="generator-product"
      style={{
        "--card-index": index,
      }}
      aria-label={`View ${generator.name}`}
    >
      <article>
        <div className="generator-product-topline">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{brand}</span>
        </div>

        <div className="generator-product-image">
          <div className="generator-product-image-grid" />

          {image ? (
            <img
              ref={imageRef}
              src={image}
              alt={generator.name}
              loading={index < 4 ? "eager" : "lazy"}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="generator-image-placeholder">
              GENERATOR
            </div>
          )}

          <div className="generator-product-output">
            <strong>
              {generator.kva ? formatNumber(generator.kva) : "—"}
            </strong>
            <span>KVA</span>
          </div>

          <div className="generator-product-arrow">
            →
          </div>
        </div>

        <div className="generator-product-info">
          <p className="generator-product-brand">
            {brand}
          </p>

          <h2>{generator.name}</h2>

          {generator.model && (
            <p className="generator-product-model">
              {generator.model}
            </p>
          )}

          <div className="generator-product-specs">
            <span>
              <small>OUTPUT</small>
              {generator.kw
                ? `${formatNumber(generator.kw)} kW`
                : "—"}
            </span>

            <span>
              <small>FUEL</small>
              {generator.fuel_type || "DIESEL"}
            </span>

            <span>
              <small>STATUS</small>
              {generator.is_available ? "AVAILABLE" : "UNAVAILABLE"}
            </span>
          </div>

          <div className="generator-product-footer">
            <span>VIEW TECHNICAL DETAILS</span>
            <span>↗</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function Generators() {
  const pageRef = useRef(null);
  const heroImageRef = useRef(null);

  const [generators, setGenerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [selectedCapacity, setSelectedCapacity] = useState("all");

  useEffect(() => {
    async function loadGenerators() {
      try {
        setLoading(true);
        setError("");

        const data = await getGenerators();

        if (!Array.isArray(data)) {
          throw new Error("Invalid generators response from server.");
        }

        setGenerators(data);
      } catch (err) {
        console.error("Failed to load generators:", err);

        setError(
          err.message || "Unable to load generators from the server."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGenerators();
  }, []);

  const availableBrands = useMemo(() => {
    const found = new Set(
      generators.map((generator) => getBrandName(generator))
    );

    return brandOrder.filter((brand) => found.has(brand));
  }, [generators]);

  const filteredGenerators = useMemo(() => {
    return generators.filter((generator) => {
      const brandMatches =
        selectedBrand === "ALL" ||
        getBrandName(generator) === selectedBrand;

      const capacityMatches =
        selectedCapacity === "all" ||
        getCapacityBand(generator.kva) === selectedCapacity;

      return brandMatches && capacityMatches;
    });
  }, [generators, selectedBrand, selectedCapacity]);

  useEffect(() => {
    if (loading || error) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(
          ".generators-page .gsap-reveal, .generator-product",
          {
            opacity: 1,
            y: 0,
            x: 0,
          }
        );

        return;
      }

      gsap.fromTo(
        ".generators-hero-copy > *",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".generators-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        ".generators-intro-panel > *",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".generators-intro-panel",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".generator-product",
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".generators-results",
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".generators-catalog-label",
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".generators-controls",
            start: "top 85%",
          },
        }
      );

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, [loading, error, filteredGenerators.length]);

  const resetFilters = () => {
    setSelectedBrand("ALL");
    setSelectedCapacity("all");
  };

  return (
    <div ref={pageRef} className="generators-page">
      <Navbar />

      <main>
        <section className="generators-hero">
          <div className="generators-hero-media">
            <img
              ref={heroImageRef}
              src={HERO_IMAGE}
              alt="Industrial diesel generator"
            />
          </div>

          <div className="generators-hero-overlay" />

          <div className="generators-hero-copy">
            <p className="generators-kicker gsap-reveal">
              NB ENGINEERING & SERVICES / POWER GENERATION
            </p>

            <h1 className="gsap-reveal">
              THE POWER
              <br />
              <span>CATALOGUE.</span>
            </h1>

            <div className="generators-hero-bottom">
              <p className="generators-hero-description gsap-reveal">
                A working catalogue of diesel generator systems
                across commercial, industrial and standby
                applications.
              </p>

              <a
                href="#generator-catalog"
                className="generators-hero-cta gsap-reveal"
              >
                <span>EXPLORE RANGE</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          <div className="generators-hero-index">
            <span>GEN</span>
            <strong>01</strong>
          </div>
        </section>

        <section className="generators-intro-panel">
          <div className="generators-intro-number">
            01
          </div>

          <div className="generators-intro-copy">
            <p className="generators-section-label">
              ENGINEERED POWER / AVAILABLE RANGE
            </p>

            <h2>
              Built around the
              <br />
              <span>load you need.</span>
            </h2>

            <p>
              Explore generator sets by manufacturer and output.
              Every product shown here is connected to the live
              generator catalogue rather than a separate frontend
              product list.
            </p>
          </div>

          <div className="generators-intro-stat">
            <strong>{generators.length || "—"}</strong>
            <span>CATALOGUE<br />UNITS</span>
          </div>
        </section>

        <section
          className="generators-catalog"
          id="generator-catalog"
        >
          <div className="generators-catalog-head">
            <div>
              <p className="generators-section-label">
                02 / GENERATOR RANGE
              </p>

              <h2>
                Select your
                <br />
                <span>power class.</span>
              </h2>
            </div>

            <p className="generators-catalog-note">
              Filter the live catalogue by manufacturer or
              electrical output.
            </p>
          </div>

          <div className="generators-controls">
            <div className="generators-catalog-label">
              <span>MANUFACTURER</span>
              <strong>{selectedBrand}</strong>
            </div>

            <div className="generators-brand-filter">
              <button
                type="button"
                className={
                  selectedBrand === "ALL"
                    ? "active"
                    : ""
                }
                onClick={() => setSelectedBrand("ALL")}
              >
                ALL
              </button>

              {availableBrands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  className={
                    selectedBrand === brand
                      ? "active"
                      : ""
                  }
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="generators-capacity-filter">
            {capacityBands.map((band) => (
              <button
                key={band.id}
                type="button"
                className={
                  selectedCapacity === band.id
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedCapacity(band.id)
                }
              >
                {band.label}
              </button>
            ))}
          </div>

          <div className="generators-results-head">
            <span>
              {filteredGenerators.length}{" "}
              {filteredGenerators.length === 1
                ? "UNIT"
                : "UNITS"}{" "}
              SHOWN
            </span>

            {(selectedBrand !== "ALL" ||
              selectedCapacity !== "all") && (
              <button
                type="button"
                onClick={resetFilters}
              >
                CLEAR FILTERS ×
              </button>
            )}
          </div>

          {loading && (
            <div className="generators-message">
              <span>LOADING CATALOGUE</span>
              <strong>Preparing generator range...</strong>
            </div>
          )}

          {!loading && error && (
            <div className="generators-message generators-error">
              <span>CATALOGUE ERROR</span>
              <strong>{error}</strong>
            </div>
          )}

          {!loading &&
            !error &&
            filteredGenerators.length === 0 && (
              <div className="generators-message">
                <span>NO MATCHES</span>
                <strong>
                  No generator matches the selected filters.
                </strong>

                <button
                  type="button"
                  onClick={resetFilters}
                >
                  RESET CATALOGUE
                </button>
              </div>
            )}

          {!loading &&
            !error &&
            filteredGenerators.length > 0 && (
              <div className="generators-results">
                {filteredGenerators.map(
                  (generator, index) => (
                    <GeneratorCard
                      key={generator.id}
                      generator={generator}
                      index={index}
                    />
                  )
                )}
              </div>
            )}
        </section>

        <section className="generators-bottom">
          <div className="generators-bottom-line" />

          <p className="generators-section-label">
            03 / ENGINEERING SUPPORT
          </p>

          <h2>
            Need help choosing
            <br />
            <span>the right set?</span>
          </h2>

          <p>
            Tell us your required load, application and operating
            conditions. Our team can help identify the appropriate
            generator configuration.
          </p>

          <Link to="/contact" className="generators-bottom-link">
            <span>CONTACT NB ENGINEERING</span>
            <span>↗</span>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Generators;



