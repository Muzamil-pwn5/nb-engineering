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
        console.error("Generators API failed:", generatorsResult.reason);
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
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        ScrollTrigger.refresh();
        return;
      }

      /*
       * PAGE PROGRESS
       */
      gsap.to(".page-scroll-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      /*
       * HERO
       */
      gsap.to(".hero-image-frame img", {
        scale: 1.045,
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      /*
       * SERVICES CHAPTER
       */
      gsap.from(".services-chapter-number", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".services-section .section-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(".services-grid .service-card", {
        y: 45,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 76%",
          once: true,
        },
      });

      /*
       * GENERATOR SOLUTIONS CHAPTER
       */
      gsap.to(".generators-hero-image img", {
        scale: 1.055,
        xPercent: 2,
        ease: "none",
        scrollTrigger: {
          trigger: ".generators-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.from(".generators-chapter-marker", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".generators-section",
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(".generators-hero-content > *", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".generators-section",
          start: "top 68%",
          once: true,
        },
      });

      /*
       * GENERATOR RANGE
       */
      gsap.from(".range-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".generator-range-chapter",
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(".capacity-track-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".generator-range-chapter",
          start: "top 62%",
          once: true,
        },
      });

      gsap.from(".capacity-point", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".capacity-track",
          start: "top 72%",
          once: true,
        },
      });

      gsap.to(".generator-range-image img", {
        scale: 1.04,
        xPercent: -2,
        ease: "none",
        scrollTrigger: {
          trigger: ".generator-range-chapter",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /*
       * ELECTRICAL PANELS
       */
      gsap.from(".panel-visual", {
        x: -55,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".panel-chapter",
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(".panel-hero-content > *", {
        x: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".panel-chapter",
          start: "top 70%",
          once: true,
        },
      });

      /*
       * CONTACT
       */
      gsap.from(".contact-container > *", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 75%",
          once: true,
        },
      });

      /*
       * FOOTER
       */
      gsap.from(".footer", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 92%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [services, brands, generators]);

  return (
    <div className="site" ref={pageRef}>
      <div className="page-scroll-progress" aria-hidden="true">
        <div className="page-scroll-progress-bar" />
      </div>

      <Navbar />

      <main>
        <Hero />

        {/* =========================================================
            CHAPTER 01 — SERVICES
            ========================================================= */}
        <section className="services-section" id="services">
          <div className="chapter-watermark services-chapter-number">
            <span>01</span>
            <small>SERVICES</small>
          </div>

          <div className="section-container">
            <div className="chapter-intro">
              <div className="chapter-index">
                <span>01</span>
                <i />
                <span>WHAT WE DO</span>
              </div>

              <div className="section-heading">
                <div>
                  <p className="section-eyebrow">ENGINEERED SUPPORT</p>

                  <h2>
                    Complete Power
                    <br />
                    <span>Solutions.</span>
                  </h2>
                </div>

                <p className="section-description">
                  From generator supply and rental to maintenance,
                  control systems and technical support, we cover the
                  essential requirements of reliable power generation.
                </p>
              </div>
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

          <div className="chapter-transition services-transition">
            <span />
          </div>
        </section>

        {/* =========================================================
            CHAPTER 02 — GENERATOR SOLUTIONS
            ========================================================= */}
        <section className="generators-section" id="generators">
          <div className="generators-chapter-label">
            <span>02</span>
            <span>GENERATOR SOLUTIONS</span>
          </div>

          <div className="generators-frame">
            <div className="generators-hero-image">
              <img
                src={
                  generators[0]?.image_url || fallbackGeneratorImage
                }
                alt={generators[0]?.name || "Diesel generator"}
              />
            </div>

            <div className="generators-hero-overlay" />

            <div className="generators-chapter-marker" />

            <div className="generators-hero-content">
              <p className="section-eyebrow">GENERATOR SOLUTIONS</p>

              <h2>
                Power That Keeps
                <br />
                <span>Your Business Running.</span>
              </h2>

              <p>
                We provide reliable diesel generators for commercial,
                industrial, and backup power needs, backed by
                installation, maintenance, repair, and technical
                support.
              </p>

              <div className="generator-brands">
                {brands.slice(0, 6).map((brand) => (
                  <span key={brand.id || brand.slug || brand.name}>
                    {brand.name}
                  </span>
                ))}
              </div>

              <Link to="/generators" className="primary-button">
                Explore Our Range
                <span aria-hidden="true"> →</span>
              </Link>
            </div>

            <div className="generators-corner-label">
              <span>POWER GENERATION</span>
              <span>NB / 02</span>
            </div>
          </div>
        </section>

        {/* =========================================================
            CHAPTER 03 — GENERATOR RANGE
            ========================================================= */}
        <section
          className="generator-range-chapter"
          id="generator-range"
        >
          <div className="range-chapter-top">
            <div className="chapter-index">
              <span>03</span>
              <i />
              <span>GENERATOR RANGE</span>
            </div>

            <p>
              Capacity matched to the scale and demands of your
              operation.
            </p>
          </div>

          <div className="range-heading">
            <p className="section-eyebrow">POWER SCALE</p>

            <h2>
              Power for
              <br />
              <span>Every Requirement.</span>
            </h2>
          </div>

          <div className="capacity-track">
            <div className="capacity-track-line" />

            <div className="capacity-points">
              <div className="capacity-point">
                <span className="capacity-dot" />
                <strong>10</strong>
                <small>KVA</small>
              </div>

              <div className="capacity-point">
                <span className="capacity-dot" />
                <strong>50</strong>
                <small>KVA</small>
              </div>

              <div className="capacity-point">
                <span className="capacity-dot" />
                <strong>100</strong>
                <small>KVA</small>
              </div>

              <div className="capacity-point">
                <span className="capacity-dot" />
                <strong>250</strong>
                <small>KVA</small>
              </div>

              <div className="capacity-point">
                <span className="capacity-dot" />
                <strong>500+</strong>
                <small>KVA</small>
              </div>
            </div>
          </div>

          <div className="range-lower">
            <div className="range-description">
              <p>
                From compact backup systems to high-capacity
                industrial power, we provide generator solutions
                for a wide range of commercial and industrial
                requirements.
              </p>

              <Link to="/generators" className="text-link">
                View Generator Range
                <span aria-hidden="true"> ↗</span>
              </Link>
            </div>

            <div className="generator-range-image">
              <img
                src={generatorRangeImage}
                alt="Open-frame 500 kVA diesel generator"
              />

              <div className="image-caption">
                <span>HIGH CAPACITY POWER</span>
                <span>500+ KVA</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CHAPTER 04 — ELECTRICAL POWER SYSTEMS
            ========================================================= */}
        <section className="panel-chapter" id="panels">
          <div className="panel-chapter-number">04</div>

          <div className="panel-visual">
            <div className="panel-visual-image">
              <img
                src={panelHeroImage}
                alt="Industrial electrical switchgear and power distribution panels"
              />
            </div>

            <div className="panel-visual-tag">
              ELECTRICAL SYSTEMS
            </div>
          </div>

          <div className="panel-hero-content">
            <div className="chapter-index">
              <span>04</span>
              <i />
              <span>ELECTRICAL POWER SYSTEMS</span>
            </div>

            <p className="section-eyebrow">
              CONTROL & DISTRIBUTION
            </p>

            <h2>
              Power Control
              <br />
              <span>Beyond the Generator.</span>
            </h2>

            <p>
              Engineered electrical panels for power distribution,
              switching, protection, and control across commercial
              and industrial facilities.
            </p>

            <Link to="/contact" className="primary-button dark-button">
              Discuss Your Panel Requirements
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </section>

        {/* =========================================================
            CHAPTER 05 — CONTACT
            ========================================================= */}
        <section className="contact-section" id="contact">
          <div className="contact-container">
            <div>
              <div className="chapter-index">
                <span>05</span>
                <i />
                <span>LET'S TALK POWER</span>
              </div>

              <p className="section-eyebrow">
                READY WHEN YOU ARE
              </p>

              <h2>
                Need a Generator
                <br />
                <span>Solution?</span>
              </h2>

              <p>
                Tell us what power solution you are looking for
                and our team can help you determine the right
                direction.
              </p>
            </div>

            <Link to="/contact" className="contact-button">
              Contact NB Engineering
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
          ========================================================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Products</h3>

            <Link to="/generators">Diesel Generators</Link>
            <Link to="/generators">Generator Range</Link>
            <Link to="/services/generator-rental">
              Generator Rental
            </Link>
            <Link to="/spare-parts">Spare Parts</Link>
            <Link to="/services/ats-panels">ATS Panels</Link>
            <Link to="/services/canopy-work">
              Canopy Solutions
            </Link>
          </div>

          <div className="footer-column">
            <h3>Services</h3>

            <Link to="/services/generator-sales">
              Generator Sales
            </Link>
            <Link to="/services/generator-purchase">
              Generator Purchase
            </Link>
            <Link to="/services/generator-repair">
              Generator Repair
            </Link>
            <Link to="/services/generator-maintenance">
              Maintenance
            </Link>
            <Link to="/services/ats-panels">
              Electrical Systems
            </Link>
            <Link to="/contact">Technical Support</Link>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>

            <Link to="/generators">Generator Solutions</Link>
            <Link to="/generators">Power Requirements</Link>
            <Link to="/brands">Generator Brands</Link>
            <Link to="/services">Service Support</Link>
            <Link to="/contact">FAQs</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-column">
            <h3>Company</h3>

            <Link to="/contact">About Us</Link>
            <Link to="/services">Our Services</Link>
            <Link to="/brands">Our Brands</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/contact">Request a Quote</Link>
            <Link to="/spare-parts">Spare Parts</Link>
          </div>

          <div className="footer-column">
            <h3>Popular topics</h3>

            <Link to="/generators">Diesel Generators</Link>
            <Link to="/generators">500 KVA Generators</Link>
            <Link to="/services/generator-rental">
              Generator Rental
            </Link>
            <Link to="/services/generator-maintenance">
              Maintenance
            </Link>
            <Link to="/services/ats-panels">ATS Panels</Link>
            <Link to="/services">Industrial Power</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-brand">
            <strong>NB ENGINEERING & SERVICES</strong>
            <span>Reliable Power. Lasting Solutions.</span>
          </div>

          <p>
            © {new Date().getFullYear()} NB Engineering & Services.
            All rights reserved.
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
        /* =========================================================
           BASE / PAGE STRUCTURE
           ========================================================= */

        .site {
          position: relative;
          overflow-x: clip;
          background: #ffffff;
          color: #11110f;
        }

        .page-scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          z-index: 10000;
          pointer-events: none;
          background: rgba(17, 17, 15, 0.08);
        }

        .page-scroll-progress-bar {
          width: 100%;
          height: 100%;
          background: #f5c400;
          transform: scaleX(0);
          transform-origin: left center;
          will-change: transform;
        }

        .chapter-index {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
          color: #777770;
          font-size: 11px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .chapter-index span:first-child {
          color: #11110f;
          font-variant-numeric: tabular-nums;
        }

        .chapter-index i {
          width: 34px;
          height: 1px;
          display: block;
          background: #f5c400;
        }

        .text-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #11110f;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          border-bottom: 1px solid #11110f;
          padding-bottom: 6px;
          transition:
            color 180ms ease,
            border-color 180ms ease,
            gap 180ms ease;
        }

        .text-link:hover {
          color: #c5a000;
          border-color: #c5a000;
          gap: 12px;
        }

        /* =========================================================
           CHAPTER 01 — SERVICES
           ========================================================= */

        .services-section {
          position: relative;
          padding: 150px 0 170px;
          overflow: hidden;
          background: #ffffff;
        }

        .section-container {
          position: relative;
          z-index: 2;
        }

        .chapter-watermark {
          position: absolute;
          top: 105px;
          right: -20px;
          z-index: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          pointer-events: none;
          user-select: none;
        }

        .chapter-watermark span {
          color: rgba(17, 17, 15, 0.035);
          font-size: clamp(180px, 25vw, 390px);
          line-height: 0.7;
          font-weight: 800;
          letter-spacing: -0.08em;
        }

        .chapter-watermark small {
          margin-top: 20px;
          margin-right: 42px;
          color: rgba(17, 17, 15, 0.1);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3em;
        }

        .chapter-intro {
          position: relative;
          z-index: 2;
        }

        .services-section .section-heading {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
          gap: 90px;
          align-items: end;
          margin-bottom: 78px;
        }

        .services-section .section-heading h2 {
          margin: 0;
          color: #11110f;
          font-size: clamp(48px, 6vw, 86px);
          line-height: 0.94;
          letter-spacing: -0.055em;
          font-weight: 700;
        }

        .services-section .section-heading h2 span {
          color: #d0aa00;
        }

        .services-section .section-eyebrow {
          margin: 0 0 18px;
        }

        .services-section .section-description {
          max-width: 500px;
          margin: 0;
          color: #64645f;
          font-size: 15px;
          line-height: 1.8;
        }

        .services-grid {
          position: relative;
          z-index: 2;
        }

        .chapter-transition {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          display: flex;
          justify-content: center;
        }

        .chapter-transition span {
          width: min(1240px, calc(100% - 80px));
          height: 1px;
          background: #deded8;
        }

        /* =========================================================
           CHAPTER 02 — GENERATOR SOLUTIONS
           ========================================================= */

        .generators-section {
          position: relative;
          padding: 80px 0 120px;
          background: #ffffff;
        }

        .generators-chapter-label {
          width: min(1240px, calc(100% - 80px));
          margin: 0 auto 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #777770;
          font-size: 10px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .generators-chapter-label span:first-child {
          color: #11110f;
        }

        .generators-frame {
          position: relative;
          width: min(1460px, calc(100% - 80px));
          min-height: min(720px, 78vh);
          margin: 0 auto;
          overflow: hidden;
          background: #171815;
          isolation: isolate;
        }

        .generators-hero-image {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .generators-hero-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center center;
          transform-origin: center center;
          will-change: transform;
        }

        .generators-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              90deg,
              rgba(8, 9, 8, 0.92) 0%,
              rgba(8, 9, 8, 0.72) 33%,
              rgba(8, 9, 8, 0.25) 68%,
              rgba(8, 9, 8, 0.05) 100%
            );
        }

        .generators-hero-content {
          position: relative;
          z-index: 3;
          width: min(1240px, calc(100% - 120px));
          min-height: min(720px, 78vh);
          margin: 0 auto;
          padding: 100px 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .generators-hero-content .section-eyebrow {
          margin: 0 0 20px;
          color: #f5c400;
        }

        .generators-hero-content h2 {
          max-width: 900px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(48px, 6.5vw, 92px);
          line-height: 0.94;
          letter-spacing: -0.055em;
          font-weight: 700;
        }

        .generators-hero-content h2 span {
          color: #f5c400;
        }

        .generators-hero-content > p:not(.section-eyebrow) {
          max-width: 600px;
          margin: 28px 0 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 16px;
          line-height: 1.75;
        }

        .generator-brands {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 22px;
          margin-top: 28px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .generator-brands span {
          position: relative;
        }

        .generator-brands span:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -13px;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #f5c400;
          transform: translateY(-50%);
        }

        .primary-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 34px;
          padding: 14px 21px;
          color: #11110f;
          background: #f5c400;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          text-decoration: none;
          transition:
            background 180ms ease,
            transform 180ms ease,
            gap 180ms ease;
        }

        .primary-button:hover {
          background: #ffd51f;
          transform: translateY(-2px);
          gap: 14px;
        }

        .generators-chapter-marker {
          position: absolute;
          top: 42px;
          left: 42px;
          z-index: 4;
          width: 74px;
          height: 3px;
          background: #f5c400;
          transform-origin: left center;
        }

        .generators-corner-label {
          position: absolute;
          right: 34px;
          bottom: 28px;
          z-index: 4;
          display: flex;
          gap: 20px;
          color: rgba(255, 255, 255, 0.52);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        /* =========================================================
           CHAPTER 03 — GENERATOR RANGE
           ========================================================= */

        .generator-range-chapter {
          position: relative;
          padding: 155px 0 150px;
          background: #f4f4f0;
          overflow: hidden;
        }

        .range-chapter-top {
          width: min(1240px, calc(100% - 80px));
          margin: 0 auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 50px;
        }

        .range-chapter-top .chapter-index {
          margin-bottom: 0;
        }

        .range-chapter-top > p {
          max-width: 330px;
          margin: 0;
          color: #777770;
          font-size: 13px;
          line-height: 1.6;
          text-align: right;
        }

        .range-heading {
          width: min(1240px, calc(100% - 80px));
          margin: 85px auto 0;
        }

        .range-heading .section-eyebrow {
          margin: 0 0 18px;
        }

        .range-heading h2 {
          margin: 0;
          color: #11110f;
          font-size: clamp(52px, 7vw, 100px);
          line-height: 0.9;
          letter-spacing: -0.065em;
          font-weight: 700;
        }

        .range-heading h2 span {
          color: #c4a000;
        }

        .capacity-track {
          position: relative;
          width: min(1240px, calc(100% - 80px));
          margin: 100px auto 0;
        }

        .capacity-track-line {
          position: absolute;
          top: 14px;
          left: 0;
          right: 0;
          height: 2px;
          background: #11110f;
          transform-origin: left center;
        }

        .capacity-points {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
        }

        .capacity-point {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .capacity-point:not(:first-child) {
          align-items: center;
        }

        .capacity-point:last-child {
          align-items: flex-end;
        }

        .capacity-dot {
          width: 9px;
          height: 9px;
          margin-bottom: 20px;
          border-radius: 50%;
          background: #f5c400;
          border: 3px solid #f4f4f0;
          box-sizing: content-box;
          box-shadow: 0 0 0 1px #11110f;
        }

        .capacity-point strong {
          color: #11110f;
          font-size: clamp(22px, 3vw, 36px);
          line-height: 1;
          letter-spacing: -0.04em;
          font-weight: 700;
        }

        .capacity-point small {
          margin-top: 7px;
          color: #777770;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .range-lower {
          width: min(1240px, calc(100% - 80px));
          margin: 100px auto 0;
          display: grid;
          grid-template-columns: minmax(240px, 0.7fr) minmax(0, 1.3fr);
          gap: 70px;
          align-items: center;
        }

        .range-description p {
          max-width: 400px;
          margin: 0;
          color: #5e5e59;
          font-size: 15px;
          line-height: 1.8;
        }

        .range-description .text-link {
          margin-top: 30px;
        }

        .generator-range-image {
          position: relative;
          height: 430px;
          overflow: hidden;
          background: #deded8;
        }

        .generator-range-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
          transform-origin: center;
          will-change: transform;
        }

        .image-caption {
          position: absolute;
          left: 22px;
          right: 22px;
          bottom: 18px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
        }

        /* =========================================================
           CHAPTER 04 — PANELS
           ========================================================= */

        .panel-chapter {
          position: relative;
          min-height: 760px;
          padding: 150px max(40px, calc((100% - 1240px) / 2)) 150px;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
          gap: 100px;
          align-items: center;
          background: #ffffff;
          overflow: hidden;
        }

        .panel-chapter-number {
          position: absolute;
          top: 85px;
          right: 7%;
          color: rgba(17, 17, 15, 0.045);
          font-size: 260px;
          line-height: 0.7;
          font-weight: 800;
          letter-spacing: -0.08em;
          pointer-events: none;
          user-select: none;
        }

        .panel-visual {
          position: relative;
          z-index: 2;
        }

        .panel-visual-image {
          position: relative;
          height: 560px;
          overflow: hidden;
          background: #e7e7e2;
        }

        .panel-visual-image::after {
          content: "";
          position: absolute;
          inset: 0;
          border: 1px solid rgba(17, 17, 15, 0.12);
          pointer-events: none;
        }

        .panel-visual-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
        }

        .panel-visual-tag {
          position: absolute;
          right: -1px;
          bottom: 30px;
          padding: 13px 18px;
          color: #11110f;
          background: #f5c400;
          font-size: 9px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .panel-hero-content {
          position: relative;
          z-index: 3;
          max-width: 590px;
        }

        .panel-hero-content .chapter-index {
          margin-bottom: 55px;
        }

        .panel-hero-content .section-eyebrow {
          margin: 0 0 18px;
          color: #777770;
        }

        .panel-hero-content h2 {
          margin: 0;
          color: #11110f;
          font-size: clamp(48px, 5.5vw, 78px);
          line-height: 0.94;
          letter-spacing: -0.055em;
          font-weight: 700;
        }

        .panel-hero-content h2 span {
          color: #c4a000;
        }

        .panel-hero-content > p:not(.section-eyebrow) {
          max-width: 500px;
          margin: 30px 0 0;
          color: #64645f;
          font-size: 15px;
          line-height: 1.8;
        }

        .dark-button {
          color: #ffffff;
          background: #11110f;
        }

        .dark-button:hover {
          color: #11110f;
          background: #f5c400;
        }

        /* =========================================================
           CHAPTER 05 — CONTACT
           ========================================================= */

        .contact-section {
          position: relative;
          padding: 155px 0 170px;
          background: #f4f4f0;
          overflow: hidden;
        }

        .contact-section::before {
          content: "05";
          position: absolute;
          right: -20px;
          bottom: -45px;
          color: rgba(17, 17, 15, 0.035);
          font-size: clamp(220px, 32vw, 500px);
          line-height: 0.7;
          font-weight: 800;
          letter-spacing: -0.08em;
          pointer-events: none;
        }

        .contact-container {
          position: relative;
          z-index: 2;
          width: min(1240px, calc(100% - 80px));
          margin: 0 auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 80px;
        }

        .contact-container .chapter-index {
          margin-bottom: 35px;
        }

        .contact-container .section-eyebrow {
          margin: 0 0 18px;
          color: #777770;
        }

        .contact-container h2 {
          margin: 0;
          color: #11110f;
          font-size: clamp(52px, 7vw, 100px);
          line-height: 0.9;
          letter-spacing: -0.065em;
          font-weight: 700;
        }

        .contact-container h2 span {
          color: #c4a000;
        }

        .contact-container p:not(.section-eyebrow) {
          max-width: 520px;
          margin: 30px 0 0;
          color: #64645f;
          font-size: 15px;
          line-height: 1.8;
        }

        .contact-button {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          min-width: 220px;
          justify-content: center;
          padding: 18px 24px;
          color: #ffffff;
          background: #11110f;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          text-decoration: none;
          transition:
            background 180ms ease,
            color 180ms ease,
            transform 180ms ease,
            gap 180ms ease;
        }

        .contact-button:hover {
          color: #11110f;
          background: #f5c400;
          transform: translateY(-3px);
          gap: 18px;
        }

        /* =========================================================
           FOOTER
           ========================================================= */

        .footer {
          background: #11110f;
          color: #f4f4f1;
          padding: 92px 0 0;
        }

        .footer-container {
          width: min(calc(100% - 140px), 1660px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          column-gap: 58px;
          align-items: start;
        }

        .footer-column {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-column h3 {
          margin: 0 0 34px;
          color: #ffffff;
          font-size: 20px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .footer-column a {
          display: block;
          width: 100%;
          margin: 0 0 25px;
          color: rgba(255, 255, 255, 0.88);
          font-size: 15px;
          line-height: 1.45;
          font-weight: 500;
          text-decoration: none;
          transition:
            color 180ms ease,
            transform 180ms ease;
        }

        .footer-column a:hover {
          color: #f5c400;
          transform: translateX(2px);
        }

        .footer-bottom {
          width: min(calc(100% - 140px), 1660px);
          margin: 58px auto 0;
          padding: 28px 0 34px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .footer-bottom-brand {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .footer-bottom-brand strong {
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .footer-bottom-brand span {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        }

        .footer-bottom p {
          margin: 0;
          color: rgba(255, 255, 255, 0.48);
          font-size: 12px;
          line-height: 1.5;
          text-align: right;
        }

        /* =========================================================
           RESPONSIVE
           ========================================================= */

        @media (max-width: 1100px) {
          .services-section .section-heading {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .range-lower {
            grid-template-columns: 1fr;
          }

          .panel-chapter {
            grid-template-columns: 1fr;
            gap: 65px;
            padding-top: 120px;
            padding-bottom: 120px;
          }

          .panel-visual-image {
            height: 500px;
          }

          .panel-hero-content {
            max-width: 760px;
          }

          .contact-container {
            align-items: flex-start;
            flex-direction: column;
          }

          .footer-container {
            width: min(calc(100% - 64px), 900px);
            grid-template-columns: repeat(3, minmax(0, 1fr));
            column-gap: 45px;
            row-gap: 55px;
          }

          .footer-bottom {
            width: min(calc(100% - 64px), 900px);
          }
        }

        @media (max-width: 900px) {
          .services-section {
            padding: 110px 0 125px;
          }

          .chapter-watermark {
            top: 80px;
          }

          .chapter-watermark span {
            font-size: 190px;
          }

          .generators-section {
            padding: 60px 0 90px;
          }

          .generators-frame {
            width: calc(100% - 48px);
            min-height: 650px;
          }

          .generators-hero-content {
            width: calc(100% - 72px);
            min-height: 650px;
          }

          .range-chapter-top,
          .range-heading,
          .capacity-track,
          .range-lower {
            width: calc(100% - 48px);
          }

          .generator-range-chapter {
            padding: 110px 0 110px;
          }

          .range-heading {
            margin-top: 65px;
          }

          .capacity-track {
            margin-top: 80px;
          }

          .panel-chapter {
            padding-left: 24px;
            padding-right: 24px;
          }

          .contact-section {
            padding: 115px 0 130px;
          }

          .contact-container {
            width: calc(100% - 48px);
          }
        }

        @media (max-width: 700px) {
          .page-scroll-progress {
            height: 2px;
          }

          .chapter-index {
            gap: 10px;
            font-size: 9px;
            letter-spacing: 0.13em;
          }

          .chapter-index i {
            width: 25px;
          }

          .services-section {
            padding: 90px 0 105px;
          }

          .chapter-watermark {
            top: 55px;
            right: -10px;
          }

          .chapter-watermark span {
            font-size: 145px;
          }

          .chapter-watermark small {
            margin-right: 20px;
            font-size: 8px;
          }

          .services-section .section-heading h2 {
            font-size: clamp(43px, 13vw, 62px);
          }

          .services-section .section-description {
            font-size: 14px;
          }

          .chapter-transition span {
            width: calc(100% - 40px);
          }

          .generators-section {
            padding: 42px 0 70px;
          }

          .generators-chapter-label {
            width: calc(100% - 40px);
            font-size: 8px;
          }

          .generators-frame {
            width: calc(100% - 28px);
            min-height: 610px;
          }

          .generators-hero-content {
            width: calc(100% - 48px);
            min-height: 610px;
            padding: 70px 0;
          }

          .generators-hero-overlay {
            background:
              linear-gradient(
                90deg,
                rgba(8, 9, 8, 0.94) 0%,
                rgba(8, 9, 8, 0.72) 58%,
                rgba(8, 9, 8, 0.3) 100%
              );
          }

          .generators-hero-content h2 {
            font-size: clamp(42px, 12vw, 60px);
          }

          .generators-hero-content > p:not(.section-eyebrow) {
            font-size: 14px;
          }

          .generator-brands {
            gap: 8px 18px;
            font-size: 9px;
          }

          .generators-chapter-marker {
            top: 25px;
            left: 25px;
            width: 55px;
          }

          .generators-corner-label {
            right: 20px;
            bottom: 18px;
            font-size: 7px;
          }

          .generator-range-chapter {
            padding: 90px 0;
          }

          .range-chapter-top {
            width: calc(100% - 36px);
            flex-direction: column;
            align-items: flex-start;
            gap: 22px;
          }

          .range-chapter-top > p {
            text-align: left;
            font-size: 12px;
          }

          .range-heading {
            width: calc(100% - 36px);
            margin-top: 52px;
          }

          .range-heading h2 {
            font-size: clamp(44px, 13vw, 62px);
          }

          .capacity-track {
            width: calc(100% - 36px);
            margin-top: 65px;
            overflow: hidden;
          }

          .capacity-track-line {
            top: 11px;
          }

          .capacity-points {
            min-width: 570px;
            grid-template-columns: repeat(5, 1fr);
          }

          .capacity-point strong {
            font-size: 22px;
          }

          .capacity-point small {
            font-size: 8px;
          }

          .range-lower {
            width: calc(100% - 36px);
            margin-top: 70px;
            gap: 45px;
          }

          .range-description p {
            font-size: 14px;
          }

          .generator-range-image {
            height: 330px;
          }

          .panel-chapter {
            min-height: auto;
            padding: 90px 18px;
            gap: 50px;
          }

          .panel-chapter-number {
            top: 50px;
            right: -10px;
            font-size: 170px;
          }

          .panel-visual-image {
            height: 380px;
          }

          .panel-visual-tag {
            bottom: 20px;
            font-size: 8px;
          }

          .panel-hero-content .chapter-index {
            margin-bottom: 38px;
          }

          .panel-hero-content h2 {
            font-size: clamp(43px, 12vw, 60px);
          }

          .panel-hero-content > p:not(.section-eyebrow) {
            font-size: 14px;
          }

          .contact-section {
            padding: 90px 0 105px;
          }

          .contact-section::before {
            font-size: 220px;
            right: -20px;
            bottom: -15px;
          }

          .contact-container {
            width: calc(100% - 36px);
            gap: 45px;
          }

          .contact-container h2 {
            font-size: clamp(45px, 13vw, 62px);
          }

          .contact-container p:not(.section-eyebrow) {
            font-size: 14px;
          }

          .contact-button {
            width: 100%;
          }

          .footer {
            padding-top: 65px;
          }

          .footer-container {
            width: calc(100% - 40px);
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 30px;
            row-gap: 45px;
          }

          .footer-column h3 {
            margin-bottom: 22px;
            font-size: 18px;
          }

          .footer-column a {
            margin-bottom: 17px;
            font-size: 14px;
          }

          .footer-bottom {
            width: calc(100% - 40px);
            margin-top: 50px;
            padding: 24px 0 28px;
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }

          .footer-bottom p {
            text-align: left;
          }
        }

        @media (max-width: 460px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            column-gap: 20px;
          }

          .footer-column h3 {
            font-size: 16px;
          }

          .footer-column a {
            font-size: 13px;
          }

          .generator-range-image {
            height: 280px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .page-scroll-progress {
            display: none;
          }

          .hero-image-frame img,
          .generators-hero-image img,
          .generator-range-image img {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;