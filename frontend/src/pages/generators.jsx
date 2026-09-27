import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

import Navbar from "../components/Navbar.jsx";
import { getGenerators } from "../api/generators.js";
import "./generators.css";

<SEO
  title="Generators | NB Engineering & Services"
  description="Explore generator solutions from NB Engineering & Services for commercial, industrial, residential, and critical-power requirements."
  path="/generators"
/>

const pageBackgroundImage =
  "https://s7d2.scene7.com/is/image/Caterpillar/CM20190523-014ef-4aa82";

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

function Generators() {
  const [generators, setGenerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const heroTextRef = useRef(null);

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

  useEffect(() => {
    const animatedElements = document.querySelectorAll(
      ".generator-scroll-reveal"
    );

    if (!animatedElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [generators]);

  useEffect(() => {
    const textElement = heroTextRef.current;

    if (!textElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          textElement.classList.add("is-visible");
        } else {
          textElement.classList.remove("is-visible");
        }
      },
      {
        threshold: 0.2,
        rootMargin: "-40px 0px -120px 0px",
      }
    );

    observer.observe(textElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />

      <main
        className="generators-page"
        style={{
          "--generators-background-image": `url("${pageBackgroundImage}")`,
        }}
      >
        {/* HERO */}
        <section className="generators-hero">
          <div
            ref={heroTextRef}
            className="generators-hero-content generator-scroll-reveal"
          >
            <p className="generators-eyebrow">
              POWER GENERATION
            </p>

            <h1>Generators</h1>

            <p className="generators-intro">
              Reliable power solutions for commercial,
              industrial, standby, and other demanding
              applications.
            </p>

            <Link
              to="#generator-catalog"
              className="generators-hero-link"
            >
              Explore Generators
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* CATALOG */}
        <section
          className="generators-catalog"
          id="generator-catalog"
        >
          <div className="generators-catalog-inner">
            {loading && (
              <div className="generators-message">
                Loading generators...
              </div>
            )}

            {!loading && error && (
              <div className="generators-message generators-error">
                {error}
              </div>
            )}

            {!loading && !error && generators.length === 0 && (
              <div className="generators-message">
                No generators are currently available.
              </div>
            )}

            {!loading && !error && generators.length > 0 && (
              <div className="generators-grid">
                {generators.map((generator, index) => {
                  const image = generator.image_url
                    ? generator.image_url
                    : generatorImages[generator.slug];

                  return (
                    <Link
                      key={generator.id}
                      to={`/generators/${generator.slug}`}
                      className="generator-tile generator-scroll-reveal"
                      style={{
                        "--reveal-delay": `${(index % 2) * 120}ms`,
                      }}
                      aria-label={`Open ${generator.name}`}
                    >
                      <article className="generator-card">
                        <div className="generator-image-container">
                          {image ? (
                            <img
                              src={image}
                              alt={generator.name}
                              className="generator-image"
                            />
                          ) : (
                            <div className="generator-no-image">
                              Image coming soon
                            </div>
                          )}
                        </div>

                        <div className="generator-card-content">
                          <h2>{generator.name}</h2>

                          {generator.model && (
                            <p>{generator.model}</p>
                          )}
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Generators;