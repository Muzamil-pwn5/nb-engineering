import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import ExperienceSection from "../components/ExperienceSection";

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

  const serviceImages = {
    "generator-sales":
      "/images/home/services/generator-sales.jpeg",

    "generator-purchase":
      "/images/home/services/generator-purchase.jpeg",

    "generator-rental":
      "https://st.mascus.com/image/product/large/7ce40bd2/fg-wilson-p2250-1-2250-kva-gen%2C9bc94e35.jpg",

    "generator-repair":
      "/images/home/services/generator-repair.jpeg",

    "generator-maintenance":
      "/images/home/services/generator-maintenance.jpeg",

    "ats-panels":
      "https://images.unsplash.com/photo-1759692071712-adc78a8516c8?auto=format&fit=crop&fm=jpg&q=80&w=1200",

    "spare-parts":
      "/images/home/services/spare-parts.jpg",

    "canopy-work":
      "/images/home/services/canopy-work.jpeg",
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

      setApiStatus(
        allSucceeded
          ? "connected"
          : "fallback"
      );
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
       * GENERATOR RANGE — CHAPTER 03
       */

      const range03Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".range03-section",
          start: "top 72%",
          once: true,
        },
      });

      range03Timeline
        .from(".range03-top", {
          y: 20,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
        })
        .from(
          ".range03-intro-meta > *",
          {
            y: 16,
            opacity: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .from(
          ".range03-intro-main h2",
          {
            y: 42,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .from(
          ".range03-intro-main p",
          {
            y: 22,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.48"
        )
        .to(
          ".range03-track-line",
          {
            scale: 1,
            duration: 1.05,
            ease: "power3.inOut",
          },
          "-=0.05"
        )
        .from(
          ".range03-marker",
          {
            scale: 0,
            opacity: 0,
            duration: 0.42,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          "-=0.58"
        )
        .from(
          ".range03-value",
          {
            y: 14,
            opacity: 0,
            duration: 0.38,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.48"
        )
        .from(
          ".range03-point em",
          {
            y: 8,
            opacity: 0,
            duration: 0.3,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.36"
        )
        .from(
          ".range03-foot",
          {
            y: 16,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.2"
        );

      gsap.utils.toArray(".range03-point").forEach((point) => {
        const marker = point.querySelector(".range03-marker");

        const onEnter = () => {
          gsap.to(point, {
            y: -7,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });

          gsap.to(marker, {
            scale: 1.12,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(point, {
            y: 0,
            duration: 0.35,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(marker, {
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
            overwrite: true,
          });
        };

        point.addEventListener("mouseenter", onEnter);
        point.addEventListener("mouseleave", onLeave);

        ctx.add(() => {
          point.removeEventListener("mouseenter", onEnter);
          point.removeEventListener("mouseleave", onLeave);
        });
      });

      /*
       * ELECTRICAL POWER SYSTEMS
       */

      gsap.from(".panel-visual-image", {
        x: -70,
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
          start: "top 68%",
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
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 72%",
          once: true,
        },
      });

      /*
       * FOOTER
       */

      gsap.from(".footer-column", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 85%",
          once: true,
        },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [services, brands, generators]);

  return (
    <div
      className="site"
      ref={pageRef}
    >
      <div
        className="page-scroll-progress"
        aria-hidden="true"
      >
        <span className="page-scroll-progress-bar"></span>
      </div>

      <Navbar />

      <main>
        <Hero />

        {/* =====================================================
            SERVICES — CHAPTER 01
        ====================================================== */}

        <section
          className="services-section"
          id="services"
        >
          <div
            className="chapter-watermark services-chapter-number"
            aria-hidden="true"
          >
            <span>01</span>
            <small>WHAT WE DO</small>
          </div>

          <div className="section-container">
            <div className="section-heading">
              <div>
                <div className="chapter-index">
                  <span>01</span>
                  <i></i>
                  <em>SERVICES</em>
                </div>

                <p className="section-eyebrow">
                  WHAT WE DO
                </p>

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
              {services
                .slice(0, 8)
                .map((service, index) => {
                  const image =
                    service.image_url ||
                    serviceImages[
                      service.slug
                    ] ||
                    serviceImages[
                      "generator-sales"
                    ];

                  return (
                    <ServiceCard
                      key={
                        service.id ||
                        service.slug ||
                        index
                      }
                      title={service.name}
                      description={
                        service.description
                      }
                      image={image}
                      slug={service.slug}
                    />
                  );
                })}
            </div>

            <div className="chapter-transition">
              <span></span>
            </div>
          </div>
        </section>

        {/* =====================================================
            GENERATOR SOLUTIONS — CHAPTER 02
        ====================================================== */}

        <section
          className="generators-section"
          id="generators"
        >
          <div className="generators-chapter-label">
            <span>02</span>
            <i></i>
            <em>GENERATOR SOLUTIONS</em>
          </div>

          <div className="generators-frame">
            <div className="generators-chapter-marker"></div>

            <div className="generators-hero-image">
              <img
                src={
                  generators[0]?.image_url ||
                  fallbackGeneratorImage
                }
                alt={
                  generators[0]?.name ||
                  "Diesel generator"
                }
              />
            </div>

            <div className="generators-hero-overlay"></div>

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
                We provide diesel generator
                solutions across a broad range of
                applications, with systems
                generally covering approximately
                20–200 KVA and multiple leading
                generator brands.
              </p>

              <div className="generator-capabilities">
                <div className="generator-capability">
                  <strong>20–200 KVA</strong>

                  <span>
                    Power range
                  </span>
                </div>

                <div className="generator-capability">
                  <strong>Diesel</strong>

                  <span>
                    Generator systems
                  </span>
                </div>

                <div className="generator-capability">
                  <strong>
                    Multiple Brands
                  </strong>

                  <span>
                    Equipment options
                  </span>
                </div>

                <div className="generator-capability">
                  <strong>
                    Commercial
                  </strong>

                  <span>
                    Industrial &amp; backup
                  </span>
                </div>
              </div>

              <div className="generator-brands">
                {brands
                  .slice(0, 6)
                  .map((brand) => (
                    <span
                      key={
                        brand.id ||
                        brand.slug
                      }
                    >
                      {brand.name}
                    </span>
                  ))}
              </div>

              <Link
                to="/generators"
                className="primary-button"
              >
                Explore Generator Solutions
                <span aria-hidden="true">
                  {" "}
                  →
                </span>
              </Link>
            </div>

            <div className="generators-corner-label">
              NB / POWER SYSTEMS
            </div>
          </div>
        </section>

        {/* =====================================================
            GENERATOR RANGE — CHAPTER 03
        ====================================================== */}

        <section
          className="generator-range-chapter range03-section"
          id="generator-range"
        >
          <div className="range03-top">
            <div className="chapter-index">
              <span>03</span>
              <i></i>
              <em>GENERATOR RANGE</em>
            </div>

            <p>SPECIFIED AROUND THE LOAD.</p>
          </div>

          <div className="range03-intro">
            <div className="range03-intro-meta">
              <span className="section-eyebrow">CAPACITY</span>
              <strong>20 KVA — 1000+ KVA</strong>
            </div>

            <div className="range03-intro-main">
              <h2>
                From standby
                <br />
                <span>to industrial.</span>
              </h2>

              <p>
                A working range that moves from compact standby power
                through commercial requirements and into larger
                industrial applications.
              </p>
            </div>
          </div>

          <div className="range03-track">
            <div className="range03-track-labels">
              <span>SMALLER LOADS</span>
              <span>LARGER LOADS</span>
            </div>

            <div className="range03-track-line"></div>

            <div className="range03-points">
              <div className="range03-point range03-point-1">
                <span className="range03-marker"></span>
                <div className="range03-value">
                  <strong>20</strong>
                  <small>KVA</small>
                </div>
                <em>STANDBY</em>
              </div>

              <div className="range03-point range03-point-2">
                <span className="range03-marker"></span>
                <div className="range03-value">
                  <strong>100</strong>
                  <small>KVA</small>
                </div>
                <em>COMMERCIAL</em>
              </div>

              <div className="range03-point range03-point-3">
                <span className="range03-marker"></span>
                <div className="range03-value">
                  <strong>250</strong>
                  <small>KVA</small>
                </div>
                <em>MID-SCALE</em>
              </div>

              <div className="range03-point range03-point-4">
                <span className="range03-marker"></span>
                <div className="range03-value">
                  <strong>500</strong>
                  <small>KVA</small>
                </div>
                <em>INDUSTRIAL</em>
              </div>

              <div className="range03-point range03-point-5">
                <span className="range03-marker"></span>
                <div className="range03-value">
                  <strong>1000+</strong>
                  <small>KVA</small>
                </div>
                <em>LARGE-SCALE</em>
              </div>
            </div>
          </div>

          <div className="range03-foot">
            <span>CAPACITY RANGE</span>
            <p>
              Generator systems across standby, commercial and industrial duty —
              with the range extending beyond 1000 KVA for larger power requirements.
            </p>
          </div>
        </section>

        {/* =====================================================
            ELECTRICAL POWER SYSTEMS — CHAPTER 04
        ====================================================== */}

        <section
          className="panel-chapter"
          id="electrical-systems"
        >
          <div
            className="panel-chapter-number"
            aria-hidden="true"
          >
            04
          </div>

          <div className="panel-visual">
            <div className="panel-visual-image">
              <img
                src={panelHeroImage}
                alt="Electrical switchgear and control panel"
              />

              <span className="panel-visual-tag">
                ELECTRICAL SYSTEMS / 04
              </span>
            </div>
          </div>

          <div className="panel-hero-content">
            <div className="chapter-index">
              <span>04</span>
              <i></i>
              <em>ELECTRICAL POWER SYSTEMS</em>
            </div>

            <p className="section-eyebrow">
              CONTROL &amp; DISTRIBUTION
            </p>

            <h2>
              Power is more
              <br />
              than the
              <br />
              <span>generator.</span>
            </h2>

            <p>
              We support the electrical systems
              around your generator — from
              automatic transfer switching and
              control to practical site-level
              distribution requirements.
            </p>

            <div className="panel-points">
              <div>
                <span>01</span>
                <strong>ATS / AMF</strong>
              </div>

              <div>
                <span>02</span>
                <strong>
                  Electrical Distribution
                </strong>
              </div>

              <div>
                <span>03</span>
                <strong>
                  Control Systems
                </strong>
              </div>
            </div>

            <Link
              to="/services"
              className="text-link"
            >
              Explore Electrical Services
              <span aria-hidden="true">
                {" "}
                →
              </span>
            </Link>
          </div>
        </section>

        {/* =====================================================
            EXPERIENCE — CHAPTER 05
        ====================================================== */}

        <ExperienceSection />

        {/* =====================================================
            CONTACT — CHAPTER 04
        ====================================================== */}

        <section
          className="contact-section"
          id="contact"
        >
          <div
            className="contact-watermark"
            aria-hidden="true"
          >
            04
          </div>

          <div className="contact-container">
            <div>
              <div className="chapter-index">
                <span>04</span>
                <i></i>
                <em>LET'S TALK POWER</em>
              </div>

              <p className="section-eyebrow">
                READY WHEN YOU ARE
              </p>

              <h2>
                Need a Power
                <br />
                <span>Solution?</span>
              </h2>

              <p>
                Tell us what you need to power,
                and we will help define the right
                generator, electrical system,
                and support for your site.
              </p>
            </div>

            <Link
              to="/contact"
              className="contact-button"
            >
              Talk to Our Power Team
              <span aria-hidden="true">
                {" "}
                →
              </span>
            </Link>
          </div>
        </section>
      </main>

      {/* =======================================================
          FOOTER
      ======================================================== */}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <strong>
              NB ENGINEERING &amp; SERVICES
            </strong>

            <span>
              Reliable Power. Lasting Solutions.
            </span>
          </div>

          <div className="footer-column">
            <h3>Services</h3>

            <Link to="/services">
              Generator Sales
            </Link>

            <Link to="/services">
              Generator Purchase
            </Link>

            <Link to="/services">
              Generator Rental
            </Link>

            <Link to="/services">
              Generator Repair
            </Link>
          </div>

          <div className="footer-column">
            <h3>Solutions</h3>

            <Link to="/generators">
              Generator Range
            </Link>

            <Link to="/services">
              Electrical Systems
            </Link>

            <Link to="/services">
              ATS Panels
            </Link>

            <Link to="/services">
              Maintenance
            </Link>
          </div>

          <div className="footer-column">
            <h3>Company</h3>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/brands">
              Brands
            </Link>

            <Link to="/services">
              Spare Parts
            </Link>

            <Link to="/services">
              Canopy Work
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} NB Engineering &amp; Services. All rights reserved.
          </p>

          <div className="footer-meta">
            <Link to="/privacy">
              Privacy
            </Link>

            <span aria-hidden="true">·</span>

            <Link to="/terms">
              Terms
            </Link>

            <span aria-hidden="true">·</span>

            <span>
              Site by <strong>Muzamil</strong>
            </span>
          </div>
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
          Backend connection issue — showing
          website data
        </div>
      )}

      <style>{`
        /* =========================================================
           PAGE PROGRESS
           ========================================================= */

        .page-scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          z-index: 9999;
          pointer-events: none;
          background: transparent;
        }

        .page-scroll-progress-bar {
          display: block;
          width: 100%;
          height: 100%;
          background: #f5c400;
          transform: scaleX(0);
          transform-origin: left center;
        }

        /* =========================================================
           CHAPTER SYSTEM
           ========================================================= */

        .chapter-index {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 30px;
          color: #111;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .chapter-index span {
          color: #111;
          font-variant-numeric: tabular-nums;
        }

        .chapter-index i {
          display: block;
          width: 36px;
          height: 1px;
          background: #f5c400;
        }

        .chapter-index em {
          color: #777;
          font-style: normal;
        }

        .section-eyebrow {
          margin: 0 0 20px;
          color: #777;
          font-size: 10px;
          line-height: 1.4;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .chapter-watermark {
          position: absolute;
          top: 105px;
          right: 4vw;
          z-index: 0;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .chapter-watermark span {
          color: rgba(17, 17, 17, 0.045);
          font-size: 250px;
          line-height: 0.75;
          font-weight: 800;
          letter-spacing: -0.08em;
        }

        .chapter-watermark small {
          margin-top: 20px;
          margin-right: 15px;
          color: rgba(17, 17, 17, 0.28);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        /* =========================================================
           SERVICES
           ========================================================= */

        .services-section {
          position: relative;
          overflow: hidden;
          padding: 150px 0 170px;
          background: #ffffff;
        }

        .services-section .section-container {
          position: relative;
          z-index: 2;
          width: min(calc(100% - 140px), 1660px);
          margin: 0 auto;
        }

        .services-section .section-heading {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 470px);
          align-items: end;
          gap: 80px;
          margin-bottom: 95px;
        }

        .services-section .section-heading h2 {
          margin: 0;
          color: #101010;
          font-size: clamp(58px, 6.4vw, 104px);
          line-height: 0.9;
          font-weight: 700;
          letter-spacing: -0.065em;
        }

        .services-section .section-heading h2 span {
          color: #111;
        }

        .services-section .section-description {
          max-width: 450px;
          margin: 0 0 6px auto;
          color: #686868;
          font-size: 15px;
          line-height: 1.75;
        }

        .services-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .chapter-transition {
          display: flex;
          justify-content: center;
          margin-top: 130px;
        }

        .chapter-transition span {
          display: block;
          width: min(100% - 120px, 1400px);
          height: 1px;
          background: #e7e7e7;
        }

        /* =========================================================
           GENERATOR SOLUTIONS
           ========================================================= */

        .generators-section {
          position: relative;
          overflow: hidden;
          padding: 90px 0 120px;
          background: #f5f5f2;
        }

        .generators-chapter-label {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 13px;
          width: min(calc(100% - 140px), 1660px);
          margin: 0 auto 28px;
          color: #777;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .generators-chapter-label span {
          color: #111;
        }

        .generators-chapter-label i {
          width: 36px;
          height: 1px;
          background: #f5c400;
        }

        .generators-chapter-label em {
          font-style: normal;
        }

        .generators-frame {
          position: relative;
          width: min(calc(100% - 140px), 1660px);
          min-height: 760px;
          margin: 0 auto;
          overflow: hidden;
          background: #101010;
        }

        .generators-hero-image,
        .generators-hero-overlay,
        .generators-hero-content {
          position: absolute;
          inset: 0;
        }

        .generators-hero-image {
          z-index: 0;
        }

        .generators-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.01);
        }

        .generators-hero-overlay {
          z-index: 1;
          background:
            linear-gradient(
              90deg,
              rgba(8, 9, 8, 0.94) 0%,
              rgba(8, 9, 8, 0.78) 34%,
              rgba(8, 9, 8, 0.44) 68%,
              rgba(8, 9, 8, 0.18) 100%
            );
        }

        .generators-hero-content {
          z-index: 3;
          width: min(100% - 150px, 820px);
          min-height: 760px;
          margin: 0 auto 0 0;
          padding: 125px 0 105px 90px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .generators-hero-content .section-eyebrow {
          color: rgba(255, 255, 255, 0.6);
        }

        .generators-hero-content h2 {
          max-width: 820px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(58px, 6.6vw, 108px);
          line-height: 0.88;
          font-weight: 700;
          letter-spacing: -0.07em;
        }

        .generators-hero-content h2 span {
          color: #f5c400;
        }

        .generators-hero-content > p:not(.section-eyebrow) {
          max-width: 560px;
          margin: 32px 0 0;
          color: rgba(255, 255, 255, 0.74);
          font-size: 15px;
          line-height: 1.75;
        }

        .generator-capabilities {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          max-width: 650px;
          margin-top: 50px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .generator-capability {
          min-height: 100px;
          padding: 22px 20px 22px 0;
          border-right: 1px solid rgba(255, 255, 255, 0.14);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 7px;
        }

        .generator-capability:last-child {
          border-right: 0;
        }

        .generator-capability strong {
          color: #ffffff;
          font-size: 15px;
          line-height: 1.1;
          font-weight: 700;
        }

        .generator-capability span {
          color: rgba(255, 255, 255, 0.5);
          font-size: 9px;
          line-height: 1.4;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .generator-brands {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 25px;
          margin-top: 32px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }

        .primary-button,
        .contact-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          min-height: 50px;
          margin-top: 38px;
          padding: 0 23px;
          border: 1px solid #f5c400;
          background: #f5c400;
          color: #111;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            color 180ms ease,
            transform 180ms ease;
        }

        .primary-button:hover,
        .contact-button:hover {
          border-color: #ffffff;
          background: #ffffff;
          color: #111;
          transform: translateY(-2px);
        }

        .generators-chapter-marker {
          position: absolute;
          top: 45px;
          left: 45px;
          z-index: 4;
          width: 75px;
          height: 2px;
          background: #f5c400;
          transform-origin: left center;
        }

        .generators-corner-label {
          position: absolute;
          right: 35px;
          bottom: 30px;
          z-index: 4;
          color: rgba(255, 255, 255, 0.46);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        /* =========================================================
           GENERATOR RANGE
           ========================================================= */

        .generator-range-chapter {
          position: relative;
          overflow: hidden;
          padding: 150px 0 160px;
          background: #f0f0ed;
        }

        .range-chapter-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: min(calc(100% - 140px), 1660px);
          margin: 0 auto;
        }

        .range-chapter-top > p {
          margin: 0;
          color: #777;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .range-heading {
          width: min(calc(100% - 140px), 1660px);
          margin: 85px auto 0;
        }

        .range-heading h2 {
          margin: 0;
          color: #111;
          font-size: clamp(62px, 7vw, 116px);
          line-height: 0.86;
          font-weight: 700;
          letter-spacing: -0.075em;
        }

        .range-heading h2 span {
          color: #9a9a96;
        }

        .capacity-track {
          position: relative;
          width: min(calc(100% - 140px), 1660px);
          margin: 100px auto 0;
        }

        .capacity-track-line {
          display: none !important;
        }

        .capacity-points {
          position: relative;
        }

        .capacity-points::before {
          content: "";
          position: absolute;
          top: 12px;
          left: 0;
          right: 0;
          height: 1px;
          background: #c7c7c3;
          z-index: 0;
        }

        .capacity-point {
          position: relative;
          z-index: 1;
        }

        .capacity-point > span {
          position: relative;
          z-index: 2;
          background: #f0f0ed;
        }

        .capacity-points {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }

        .capacity-point {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }

        .capacity-point span {
          width: 25px;
          height: 25px;
          border: 1px solid #111;
          border-radius: 50%;
          background: #f0f0ed;
        }

        .capacity-point strong {
          color: #111;
          font-size: 27px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .capacity-point small {
          color: #888;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .range-lower {
          display: grid;
          grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
          gap: 90px;
          align-items: end;
          width: min(calc(100% - 140px), 1660px);
          margin: 105px auto 0;
        }

        .range-description p {
          max-width: 490px;
          margin: 0;
          color: #626262;
          font-size: 15px;
          line-height: 1.8;
        }

        .text-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 28px;
          color: #111;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            color 180ms ease,
            transform 180ms ease;
        }

        .text-link:hover {
          color: #b58a12;
          transform: translateX(3px);
        }

        .generator-range-image {
          position: relative;
          height: 440px;
          overflow: hidden;
          background: #ddd;
        }

        .generator-range-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* =========================================================
           ELECTRICAL POWER SYSTEMS
           ========================================================= */

        .panel-chapter {
          position: relative;
          min-height: 900px;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
          gap: 100px;
          align-items: center;
          padding: 150px 7vw;
          background: #ffffff;
        }

        .panel-chapter-number {
          position: absolute;
          top: 65px;
          right: 2vw;
          color: rgba(17, 17, 17, 0.035);
          font-size: 270px;
          line-height: 0.8;
          font-weight: 800;
          letter-spacing: -0.08em;
          pointer-events: none;
        }

        .panel-visual {
          position: relative;
          z-index: 2;
        }

        .panel-visual-image {
          position: relative;
          height: 620px;
          overflow: hidden;
          background: #e9e9e6;
        }

        .panel-visual-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              135deg,
              rgba(0, 0, 0, 0.04),
              rgba(0, 0, 0, 0)
            );
          pointer-events: none;
        }

        .panel-visual-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .panel-visual-tag {
          position: absolute;
          right: 22px;
          bottom: 22px;
          z-index: 2;
          color: rgba(255, 255, 255, 0.78);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .panel-hero-content {
          position: relative;
          z-index: 2;
          max-width: 650px;
        }

        .panel-hero-content .chapter-index {
          margin-bottom: 45px;
        }

        .panel-hero-content h2 {
          margin: 0;
          color: #111;
          font-size: clamp(58px, 6.2vw, 104px);
          line-height: 0.87;
          font-weight: 700;
          letter-spacing: -0.07em;
        }

        .panel-hero-content h2 span {
          color: #b78b17;
        }

        .panel-hero-content > p:not(.section-eyebrow) {
          max-width: 520px;
          margin: 35px 0 0;
          color: #666;
          font-size: 15px;
          line-height: 1.8;
        }

        .panel-points {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 45px;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
        }

        .panel-points > div {
          min-height: 90px;
          padding: 18px 18px 18px 0;
          border-right: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 9px;
        }

        .panel-points > div:last-child {
          border-right: 0;
        }

        .panel-points span {
          color: #aaa;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .panel-points strong {
          color: #111;
          font-size: 11px;
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* =========================================================
           CONTACT
           ========================================================= */

        .contact-section {
          position: relative;
          overflow: hidden;
          padding: 145px 0 160px;
          background: #101010;
        }

        .contact-section::before {
          content: "04";
          position: absolute;
          right: 3vw;
          bottom: -55px;
          color: rgba(255, 255, 255, 0.035);
          font-size: 330px;
          line-height: 0.8;
          font-weight: 800;
          letter-spacing: -0.08em;
          pointer-events: none;
        }

        .contact-container {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 80px;
          width: min(calc(100% - 140px), 1660px);
          margin: 0 auto;
        }

        .contact-container .chapter-index {
          color: #fff;
        }

        .contact-container .chapter-index span {
          color: #fff;
        }

        .contact-container .chapter-index em {
          color: rgba(255, 255, 255, 0.48);
        }

        .contact-container .section-eyebrow {
          color: rgba(255, 255, 255, 0.45);
        }

        .contact-container h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(58px, 6.5vw, 108px);
          line-height: 0.87;
          font-weight: 700;
          letter-spacing: -0.07em;
        }

        .contact-container h2 span {
          color: #f5c400;
        }

        .contact-container p:not(.section-eyebrow) {
          max-width: 560px;
          margin: 32px 0 0;
          color: rgba(255, 255, 255, 0.62);
          font-size: 15px;
          line-height: 1.8;
        }

        .contact-button {
          flex-shrink: 0;
          margin-top: 0;
        }

        /* =========================================================
           FOOTER
           ========================================================= */

        .footer {
          padding: 105px 0 0;
          background: #0a0a0a;
          color: #fff;
        }

        .footer-container {
          display: grid;
          grid-template-columns:
            minmax(280px, 1.6fr)
            repeat(3, minmax(160px, 0.7fr));
          gap: 80px;
          width: min(calc(100% - 140px), 1660px);
          margin: 0 auto;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 320px;
        }

        .footer-brand strong {
          color: #fff;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .footer-brand span {
          color: rgba(255, 255, 255, 0.48);
          font-size: 13px;
          line-height: 1.7;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-column h3 {
          margin: 0 0 28px;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .footer-column a {
          margin-bottom: 16px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 14px;
          line-height: 1.5;
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
          margin: 75px auto 0;
          padding: 25px 0 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .footer-copyright {
          margin: 0;
          color: rgba(255, 255, 255, 0.42);
          font-size: 12px;
          line-height: 1.5;
        }

        .footer-meta {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 9px;
          color: rgba(255, 255, 255, 0.48);
          font-size: 12px;
          line-height: 1.5;
        }

        .footer-meta a {
          color: rgba(255, 255, 255, 0.62);
          text-decoration: none;
          transition: color 180ms ease;
        }

        .footer-meta a:hover {
          color: #f5c400;
        }

        .footer-meta strong {
          color: rgba(255, 255, 255, 0.78);
          font-weight: 600;
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
            display: none !important;
          }

          .capacity-points {
            position: relative;
          }

          .capacity-points::before {
            content: "";
            position: absolute;
            top: 12px;
            left: 0;
            right: 0;
            height: 1px;
            background: #c7c7c3;
            z-index: 0;
          }

          .capacity-point {
            position: relative;
            z-index: 1;
          }

          .capacity-point > span {
            position: relative;
            z-index: 2;
            background: #f0f0ed;
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

        /* =========================================================
           CHAPTER 03 — GENERATOR RANGE
           ========================================================= */

        .range03-section {
          position: relative;
          overflow: hidden;
          min-height: 720px;
          padding: 78px 0 72px;
          background: #f0f0ed;
          box-sizing: border-box;
        }

        .range03-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: min(calc(100% - 140px), 1660px);
          margin: 0 auto;
        }

        .range03-top > p {
          margin: 0;
          color: #777;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .range03-intro {
          display: grid;
          grid-template-columns: 150px minmax(0, 1fr);
          gap: 52px;
          width: min(calc(100% - 140px), 1660px);
          margin: 72px auto 0;
        }

        .range03-intro-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: 7px;
        }

        .range03-intro-meta .section-eyebrow {
          margin: 0 0 12px;
        }

        .range03-intro-meta strong {
          color: #888;
          font-size: 9px;
          line-height: 1.4;
          font-weight: 800;
          letter-spacing: 0.13em;
        }

        .range03-intro-main {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(300px, 0.7fr);
          gap: 76px;
          align-items: end;
        }

        .range03-intro-main h2 {
          margin: 0;
          color: #111;
          font-size: clamp(58px, 6vw, 94px);
          line-height: 0.86;
          font-weight: 700;
          letter-spacing: -0.075em;
        }

        .range03-intro-main h2 span {
          color: #9a9a96;
        }

        .range03-intro-main p {
          max-width: 480px;
          margin: 0 0 4px;
          color: #626262;
          font-size: 14px;
          line-height: 1.8;
        }

        .range03-track {
          position: relative;
          width: min(calc(100% - 140px), 1660px);
          height: 185px;
          margin: 76px auto 0;
        }

        .range03-track-labels {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          color: #999;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.17em;
        }

        .range03-track-line {
          position: absolute;
          top: 62px;
          left: 15px;
          right: 15px;
          width: auto;
          height: 1px;
          background: #bfc0bc;
          transform: scaleX(0);
          transform-origin: left center;
          z-index: 0;
        }

        .range03-points {
          position: absolute;
          inset: 0;
        }

        .range03-point {
          position: absolute;
          top: 47px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 160px;
          margin: 0;
          padding: 0;
          transform: translateX(-50%);
          cursor: default;
        }

        .range03-point-1 {
          left: 0;
          transform: none;
        }

        .range03-point-2 {
          left: 25%;
        }

        .range03-point-3 {
          left: 50%;
        }

        .range03-point-4 {
          left: 75%;
        }

        .range03-point-5 {
          left: 100%;
          align-items: flex-end;
          text-align: right;
          transform: translateX(-100%);
        }

        .range03-marker {
          width: 31px;
          height: 31px;
          margin-bottom: 13px;
          flex: 0 0 31px;
          border: 1.5px solid #111827;
          border-radius: 50%;
          background: #f0f0ed;
          box-sizing: border-box;
          transform-origin: center;
          position: relative;
          z-index: 2;
        }

        .range03-point-5 .range03-marker {
          border-color: #b58a12;
          background: #b58a12;
        }

        .range03-value {
          display: flex;
          align-items: baseline;
          gap: 5px;
          white-space: nowrap;
        }

        .range03-value strong {
          color: #111;
          font-size: 30px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.05em;
        }

        .range03-point-5 .range03-value strong {
          color: #b58a12;
        }

        .range03-value small {
          color: #888;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.13em;
        }

        .range03-point em {
          margin-top: 9px;
          color: #888;
          font-size: 8px;
          font-style: normal;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .range03-foot {
          display: grid;
          grid-template-columns: 150px minmax(0, 1fr);
          gap: 52px;
          width: min(calc(100% - 140px), 1660px);
          margin: 4px auto 0;
          padding-top: 22px;
          border-top: 1px solid rgba(17, 17, 17, 0.08);
        }

        .range03-foot > span {
          color: #999;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .range03-foot p {
          max-width: 620px;
          margin: 0;
          color: #777;
          font-size: 12px;
          line-height: 1.7;
        }

        @media (max-width: 1100px) {
          .range03-intro-main {
            gap: 45px;
          }

          .range03-intro-main h2 {
            font-size: clamp(54px, 6vw, 78px);
          }

          .range03-point {
            width: 135px;
          }

          .range03-value strong {
            font-size: 26px;
          }
        }

        @media (max-width: 900px) {
          .range03-section {
            min-height: auto;
            padding: 70px 0 72px;
          }

          .range03-top,
          .range03-intro,
          .range03-track,
          .range03-foot {
            width: calc(100% - 48px);
          }

          .range03-intro {
            grid-template-columns: 120px minmax(0, 1fr);
            gap: 30px;
            margin-top: 58px;
          }

          .range03-intro-main {
            grid-template-columns: 1fr;
            gap: 26px;
          }

          .range03-intro-main h2 {
            font-size: clamp(52px, 8vw, 76px);
          }

          .range03-track {
            margin-top: 65px;
          }
        }

        @media (max-width: 700px) {
          .range03-section {
            padding: 64px 0 68px;
          }

          .range03-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }

          .range03-top > p {
            font-size: 8px;
          }

          .range03-intro {
            display: block;
            margin-top: 52px;
          }

          .range03-intro-meta {
            margin-bottom: 28px;
          }

          .range03-intro-main {
            display: block;
          }

          .range03-intro-main h2 {
            font-size: clamp(46px, 13vw, 66px);
          }

          .range03-intro-main p {
            max-width: 520px;
            margin-top: 28px;
            font-size: 13px;
          }

          .range03-track {
            height: 510px;
            margin-top: 60px;
          }

          .range03-track-labels {
            display: none;
          }

          .range03-track-line {
            top: 15px;
            left: 15px;
            right: auto;
            width: 1px;
            height: 352px;
            transform: scaleY(0);
            transform-origin: top center;
          }

          .range03-points {
            position: relative;
            height: 445px;
          }

          .range03-point,
          .range03-point-1,
          .range03-point-2,
          .range03-point-3,
          .range03-point-4,
          .range03-point-5 {
            left: 0;
            right: auto;
            top: auto;
            width: 100%;
            height: 70px;
            padding-left: 48px;
            align-items: flex-start;
            text-align: left;
            transform: none;
          }

          .range03-point-1 {
            top: 0;
          }

          .range03-point-2 {
            top: 88px;
          }

          .range03-point-3 {
            top: 176px;
          }

          .range03-point-4 {
            top: 264px;
          }

          .range03-point-5 {
            top: 352px;
          }

          .range03-marker {
            position: absolute;
            top: 0;
            left: 0;
          }

          .range03-foot {
            display: block;
            margin-top: 8px;
            padding-top: 18px;
          }

          .range03-foot p {
            margin-top: 12px;
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
