import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";

import { getBrands } from "../api/brands";
import { getServices } from "../api/services";
import { getGenerators } from "../api/generators";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const pageRef = useRef(null);

  const fallbackServices = [
    {
      id: "fallback-1",
      number: "01",
      name: "Generator Sales",
      slug: "generator-sales",
      description:
        "Diesel generator solutions for commercial, industrial and backup power requirements.",
    },
    {
      id: "fallback-2",
      number: "02",
      name: "Generator Purchase",
      slug: "generator-purchase",
      description:
        "Power generation equipment selected around your required capacity and application.",
    },
    {
      id: "fallback-3",
      number: "03",
      name: "Generator Rental",
      slug: "generator-rental",
      description:
        "Reliable temporary power for projects, events, emergencies and changing site requirements.",
    },
    {
      id: "fallback-4",
      number: "04",
      name: "Generator Repair",
      slug: "generator-repair",
      description:
        "Technical troubleshooting and repair support for diesel generator systems.",
    },
    {
      id: "fallback-5",
      number: "05",
      name: "Generator Maintenance",
      slug: "generator-maintenance",
      description:
        "Planned servicing and preventive maintenance to keep generator systems dependable.",
    },
    {
      id: "fallback-6",
      number: "06",
      name: "ATS Panels",
      slug: "ats-panels",
      description:
        "Automatic transfer switching and control solutions for dependable backup power.",
    },
    {
      id: "fallback-7",
      number: "07",
      name: "Spare Parts",
      slug: "spare-parts",
      description:
        "Generator components and replacement parts for maintenance and repair requirements.",
    },
    {
      id: "fallback-8",
      number: "08",
      name: "Canopy Work",
      slug: "canopy-work",
      description:
        "Practical generator enclosure and canopy solutions for different installation environments.",
    },
  ];

  const fallbackBrands = [
    {
      id: "fallback-brand-1",
      name: "FG Wilson",
      slug: "fg-wilson",
    },
    {
      id: "fallback-brand-2",
      name: "Cummins",
      slug: "cummins",
    },
    {
      id: "fallback-brand-3",
      name: "Caterpillar",
      slug: "caterpillar",
    },
    {
      id: "fallback-brand-4",
      name: "Perkins",
      slug: "perkins",
    },
  ];

  const fallbackGeneratorImage =
    "https://st.mascus.com/image/product/large/7ce40bd2/fg-wilson-p2250-1-2250-kva-gen%2C9bc94e35.jpg";

  const fallbackGenerators = [
    {
      id: "fallback-generator-1",
      name: "Diesel Generator",
      slug: "diesel-generator",
      image_url: fallbackGeneratorImage,
    },
  ];

  const panelHeroImage =
    "https://upload.wikimedia.org/wikipedia/commons/7/71/Electrical_switchgear.JPG";

  /*
   * Open-frame diesel generator image.
   * Direct image URL so it can be loaded directly by the browser.
   */
  const generatorRangeImage =
    "https://arabic.dieselpowergeneratorset.com/photo/ps160705231-500kva_400kw_electric_diesel_generators_open_type_genset_cummins_generator.jpg";

  const serviceImages = {
    "generator-sales":
      "https://images.unsplash.com/photo-1705051278299-7e64ba21437a?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    "generator-purchase":
      "https://images.unsplash.com/photo-1705051278299-7e64ba21437a?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    "generator-rental":
      "https://st.mascus.com/image/product/large/7ce40bd2/fg-wilson-p2250-1-2250-kva-gen%2C9bc94e35.jpg",
    "generator-repair":
      "https://images.unsplash.com/photo-1653878729171-efea1af9e7a8?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    "generator-maintenance":
      "https://images.unsplash.com/photo-1653878729171-efea1af9e7a8?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    "ats-panels":
      "https://images.unsplash.com/photo-1759692071712-adc78a8516c8?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    "spare-parts":
      "https://images.unsplash.com/photo-1653878729171-efea1af9e7a8?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    "canopy-work":
      "https://images.unsplash.com/photo-1705051278299-7e64ba21437a?auto=format&fit=crop&fm=jpg&q=80&w=1200",
  };

  const [services, setServices] = useState(fallbackServices);
  const [brands, setBrands] = useState(fallbackBrands);
  const [generators, setGenerators] = useState(fallbackGenerators);
  const [apiStatus, setApiStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;

    async function loadBackendData() {
      const results = await Promise.allSettled([
        getServices(),
        getBrands(),
        getGenerators(),
      ]);

      if (!mounted) return;

      const servicesResult = results[0];
      const brandsResult = results[1];
      const generatorsResult = results[2];

      if (
        servicesResult.status === "fulfilled" &&
        Array.isArray(servicesResult.value) &&
        servicesResult.value.length > 0
      ) {
        setServices(servicesResult.value);
      } else {
        console.error("Services API failed:", servicesResult.reason);
      }

      if (
        brandsResult.status === "fulfilled" &&
        Array.isArray(brandsResult.value) &&
        brandsResult.value.length > 0
      ) {
        setBrands(brandsResult.value);
      } else {
        console.error("Brands API failed:", brandsResult.reason);
      }

      if (
        generatorsResult.status === "fulfilled" &&
        Array.isArray(generatorsResult.value) &&
        generatorsResult.value.length > 0
      ) {
        setGenerators(generatorsResult.value);
      } else {
        console.error(
          "Generators API failed:",
          generatorsResult.reason
        );
      }

      const allSucceeded = results.every(
        (result) => result.status === "fulfilled"
      );

      setApiStatus(allSucceeded ? "connected" : "fallback");
    }

    loadBackendData();

    return () => {
      mounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".services-section .section-heading", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 75%",
          once: true,
        },
      });

      gsap.to(".generators-hero-image img", {
        scale: 1.04,
        x: 8,
        scrollTrigger: {
          trigger: ".generators-section",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5,
        },
      });

      /*
       * Generator Range image scroll animation.
       * Matches the smooth scroll-linked behaviour
       * of the surrounding hero sections.
       */
      gsap.to(".generator-range-hero-image img", {
        scale: 1.045,
        x: 8,
        scrollTrigger: {
          trigger: ".generator-range-hero",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5,
        },
      });

      /*
       * Generator Range text fade-in.
       */
      gsap.from(".generator-range-content > *", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".generator-range-hero",
          start: "top 70%",
          once: true,
        },
      });

      gsap.to(".panel-hero-image img", {
        scale: 1.045,
        x: -8,
        scrollTrigger: {
          trigger: ".panel-hero",
          start: "top 85%",
          end: "bottom 15%",
          scrub: 1.5,
        },
      });

      gsap.from(".contact-container > div", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          once: true,
        },
      });

      ScrollTrigger.refresh();

      console.log(
        "GSAP:",
        gsap.version,
        "ScrollTriggers:",
        ScrollTrigger.getAll().length
      );
    }, root);

    return () => ctx.revert();
  }, [services, brands, generators]);

  return (
    <div className="site" ref={pageRef}>
      <Navbar />

      <main>
        <Hero />

        <section className="services-section" id="services">
          <div className="section-container">
            <div className="section-heading">
              <div>
                <p className="section-eyebrow">WHAT WE DO</p>

                <h2>
                  Complete Power
                  <br />
                  <span>Solutions</span>
                </h2>
              </div>

              <p className="section-description">
                From generator supply and rental to
                maintenance, control systems and
                technical support, we cover the
                essential requirements of reliable
                power generation.
              </p>
            </div>

            <div className="services-grid">
              {services.slice(0, 8).map((service, index) => {
                const image =
                  service.image_url ||
                  serviceImages[service.slug] ||
                  serviceImages["generator-sales"];

                return (
                  <ServiceCard
                    key={service.id || service.slug || index}
                    title={service.name}
                    description={service.description}
                    image={image}
                    slug={service.slug}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="generators-section" id="generators">
          <div className="generators-hero-image">
            <img
              src={
                generators[0]?.image_url ||
                fallbackGeneratorImage
              }
              alt={generators[0]?.name || "Diesel generator"}
            />
          </div>

          <div className="generators-hero-overlay" />

          <div className="generators-hero-content">
            <p className="section-eyebrow">
              GENERATOR SOLUTIONS
            </p>

            <h2>
              Power That Keeps
              <br />
              <span>Your Business Running</span>
            </h2>

            <p>
              We provide reliable diesel generators
              for commercial, industrial, and backup
              power needs, backed by installation,
              maintenance, repair, and technical
              support.
            </p>

            <div className="generator-brands">
              {brands.slice(0, 6).map((brand) => (
                <span
                  key={brand.id || brand.slug || brand.name}
                >
                  {brand.name}
                </span>
              ))}
            </div>

            <Link to="/generators" className="primary-button">
              Explore Our Range
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </section>

        {/* GENERATOR RANGE */}
        <section
          className="generator-range-hero"
          id="generator-range"
        >
          <div className="generator-range-hero-image">
            <img
              src={generatorRangeImage}
              alt="Open-frame 500 kVA diesel generator"
            />
          </div>

          <div className="generator-range-hero-overlay" />

          <div className="generator-range-content">
            <p className="section-eyebrow">
              GENERATOR RANGE
            </p>

            <h2>
              Power for
              <br />
              <span>Every Requirement.</span>
            </h2>

            <div className="generator-range-capacity">
              <span>10 KVA</span>

              <span className="capacity-arrow">→</span>

              <span>50 KVA</span>

              <span className="capacity-arrow">→</span>

              <span>100 KVA</span>

              <span className="capacity-arrow">→</span>

              <span>250 KVA</span>

              <span className="capacity-arrow">→</span>

              <span>500+ KVA</span>
            </div>

            <p className="generator-range-description">
              From compact backup systems to high-capacity
              industrial power, we provide generator solutions
              for a wide range of commercial and industrial
              requirements.
            </p>
          </div>
        </section>

        <section className="panel-hero" id="panels">
          <div className="panel-hero-image">
            <img
              src={panelHeroImage}
              alt="Industrial electrical switchgear and power distribution panels"
            />
          </div>

          <div className="panel-hero-overlay" />

          <div className="panel-hero-content">
            <p className="section-eyebrow">
              ELECTRICAL POWER SYSTEMS
            </p>

            <h2>
              Power Control
              <br />
              <span>Beyond the Generator</span>
            </h2>

            <p>
              Engineered electrical panels for
              power distribution, switching,
              protection, and control across
              commercial and industrial facilities.
            </p>

            <Link to="/contact" className="primary-button">
              Discuss Your Panel Requirements
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-container">
            <div>
              <p className="section-eyebrow">
                LET'S TALK POWER
              </p>

              <h2>
                Need a Generator
                <br />
                <span>Solution?</span>
              </h2>

              <p>
                Tell us what power solution you
                are looking for and our team can
                help you determine the right
                direction.
              </p>
            </div>

            <Link to="/contact" className="contact-button">
              Contact NB Engineering
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <strong>NB ENGINEERING & SERVICES</strong>
            <span>Reliable Power. Lasting Solutions.</span>
          </div>

          <p>
            © {new Date().getFullYear()} NB
            Engineering & Services. All rights
            reserved.
          </p>
        </div>
      </footer>

      {apiStatus === "fallback" && (
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 9999,
            background: "#111",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "6px",
            fontSize: "12px",
          }}
        >
          Backend connection issue — showing website data
        </div>
      )}

      <style>{`
        .generator-range-hero {
          position: relative;
          width: 100%;
          min-height: min(760px, 82vh);
          margin-top: 90px;
          margin-bottom: 90px;
          overflow: hidden;
          isolation: isolate;
        }

        .generator-range-hero-image {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .generator-range-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          transform-origin: center center;
          display: block;
          will-change: transform;
        }

        .generator-range-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              90deg,
              rgba(10, 15, 24, 0.9) 0%,
              rgba(10, 15, 24, 0.72) 30%,
              rgba(10, 15, 24, 0.34) 58%,
              rgba(10, 15, 24, 0.08) 100%
            );
          pointer-events: none;
        }

        .generator-range-content {
          position: relative;
          z-index: 2;
          width: min(1240px, calc(100% - 80px));
          min-height: min(760px, 82vh);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 90px 0;
        }

        .generator-range-content .section-eyebrow {
          margin: 0 0 20px;
          color: #f5c400;
        }

        .generator-range-content h2 {
          margin: 0;
          max-width: 850px;
          color: #fff;
          font-size: clamp(48px, 7vw, 96px);
          line-height: 0.96;
          letter-spacing: -0.045em;
          font-weight: 700;
        }

        .generator-range-content h2 span {
          color: #f5c400;
        }

        .generator-range-capacity {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 38px;
          color: #fff;
          font-size: clamp(15px, 1.4vw, 19px);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .generator-range-capacity .capacity-arrow {
          color: #f5c400;
          font-size: 18px;
          font-weight: 400;
        }

        .generator-range-description {
          max-width: 610px;
          margin: 28px 0 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 16px;
          line-height: 1.75;
        }

        @media (max-width: 900px) {
          .generator-range-hero {
            min-height: 680px;
            margin-top: 70px;
            margin-bottom: 70px;
          }

          .generator-range-content {
            width: min(100% - 48px, 720px);
            min-height: 680px;
            padding: 70px 0;
          }

          .generator-range-content h2 {
            font-size: clamp(44px, 9vw, 72px);
          }

          .generator-range-hero-overlay {
            background:
              linear-gradient(
                90deg,
                rgba(10, 15, 24, 0.9) 0%,
                rgba(10, 15, 24, 0.58) 65%,
                rgba(10, 15, 24, 0.22) 100%
              );
          }
        }

        @media (max-width: 600px) {
          .generator-range-hero {
            min-height: 620px;
            margin-top: 55px;
            margin-bottom: 55px;
          }

          .generator-range-content {
            width: calc(100% - 36px);
            min-height: 620px;
            padding: 55px 0;
          }

          .generator-range-content h2 {
            font-size: clamp(42px, 12vw, 58px);
            line-height: 0.98;
          }

          .generator-range-capacity {
            gap: 8px;
            margin-top: 28px;
            font-size: 13px;
          }

          .generator-range-capacity .capacity-arrow {
            font-size: 14px;
          }

          .generator-range-description {
            margin-top: 22px;
            font-size: 14px;
            line-height: 1.65;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .generator-range-hero-image img {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;