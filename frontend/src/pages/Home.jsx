import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  /*
   * =========================================================
   * ORIGINAL WEBSITE CONTENT / FALLBACK DATA
   * =========================================================
   *
   * This keeps the website complete even if the backend
   * temporarily cannot be reached.
   */

  const fallbackServices = [
    {
      id: "fallback-1",
      number: "01",
      name: "Generator Sales & Purchase",
      slug: "generator-sales",
      description:
        "Generator solutions for commercial, industrial and backup power requirements.",
      image_url:
        "https://images.unsplash.com/photo-1705051278299-7e64ba21437a?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    },
    {
      id: "fallback-2",
      number: "02",
      name: "Generator Rental",
      slug: "generator-rental",
      description:
        "Power generation equipment for temporary projects, events and emergency requirements.",
      image_url:
        "https://st.mascus.com/image/product/large/7ce40bd2/fg-wilson-p2250-1-2250-kva-gen%2C9bc94e35.jpg",
    },
    {
      id: "fallback-3",
      number: "03",
      name: "Repair & Maintenance",
      slug: "generator-maintenance",
      description:
        "Professional generator inspection, servicing, troubleshooting and maintenance.",
      image_url:
        "https://images.unsplash.com/photo-1653878729171-efea1af9e7a8?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    },
    {
      id: "fallback-4",
      number: "04",
      name: "ATS Panels",
      slug: "ats-panels",
      description:
        "Automatic transfer switching and generator control solutions for reliable power backup.",
      image_url:
        "https://images.unsplash.com/photo-1759692071712-adc78a8516c8?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    },
    {
      id: "fallback-5",
      number: "05",
      name: "Spare Parts",
      slug: "spare-parts",
      description:
        "Generator components and spare parts for maintenance and repair requirements.",
      image_url:
        "https://images.unsplash.com/photo-1653878729171-efea1af9e7a8?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    },
    {
      id: "fallback-6",
      number: "06",
      name: "Canopy Work",
      slug: "canopy-work",
      description:
        "Generator enclosure and canopy solutions designed for practical installation environments.",
      image_url:
        "https://images.unsplash.com/photo-1705051278299-7e64ba21437a?auto=format&fit=crop&fm=jpg&q=80&w=1200",
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

  const fallbackGenerators = [
    {
      id: "fallback-generator-1",
      name: "FG Wilson P110-3",
      slug: "fg-wilson-p110-3",
      image_url:
        "https://st.mascus.com/image/product/large/7ce40bd2/fg-wilson-p2250-1-2250-kva-gen%2C9bc94e35.jpg",
    },
  ];

  /*
   * =========================================================
   * STATE
   * =========================================================
   */

  const [services, setServices] = useState(fallbackServices);
  const [brands, setBrands] = useState(fallbackBrands);
  const [generators, setGenerators] = useState(fallbackGenerators);

  const [apiStatus, setApiStatus] = useState("loading");

  /*
   * =========================================================
   * LOAD BACKEND DATA
   * =========================================================
   *
   * Backend data replaces fallback data when available.
   *
   * The website NEVER disappears if an API request fails.
   */

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

      /*
       * SERVICES
       */

      if (
        servicesResult.status === "fulfilled" &&
        Array.isArray(servicesResult.value) &&
        servicesResult.value.length > 0
      ) {
        setServices(servicesResult.value);
      } else {
        console.error(
          "Services API failed:",
          servicesResult.reason
        );
      }

      /*
       * BRANDS
       */

      if (
        brandsResult.status === "fulfilled" &&
        Array.isArray(brandsResult.value) &&
        brandsResult.value.length > 0
      ) {
        setBrands(brandsResult.value);
      } else {
        console.error(
          "Brands API failed:",
          brandsResult.reason
        );
      }

      /*
       * GENERATORS
       */

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

  /*
   * =========================================================
   * SERVICE IMAGE FALLBACKS
   * =========================================================
   */

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

  /*
   * =========================================================
   * GSAP
   * =========================================================
   */

  useLayoutEffect(() => {
    const root = pageRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      /*
       * =======================================================
       * SERVICES
       * =======================================================
       */

      gsap.to(".services-section", {
        backgroundColor: "#111111",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 65%",
          end: "top 25%",
          scrub: 1.2,
        },
      });

      gsap.to(".services-section h2", {
        color: "#ffffff",
        x: 20,
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 65%",
          end: "top 25%",
          scrub: 1.2,
        },
      });

      gsap.to(".service-card", {
        y: -15,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          end: "bottom 25%",
          scrub: 1.2,
        },
      });

      /*
       * =======================================================
       * GENERATORS
       * =======================================================
       */

      gsap.to(".generator-image img", {
        scale: 1.06,
        x: 15,
        scrollTrigger: {
          trigger: ".generators-section",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.2,
        },
      });

      /*
       * =======================================================
       * BRANDS
       * =======================================================
       */

      gsap.to(".brand-box", {
        y: -15,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".brands-grid",
          start: "top 80%",
          end: "bottom 25%",
          scrub: 1.2,
        },
      });

      /*
       * =======================================================
       * CONTACT
       * =======================================================
       */

      gsap.to(".contact-section h2", {
        scale: 1.03,
        x: 15,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          end: "bottom 25%",
          scrub: 1.2,
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

  /*
   * =========================================================
   * MAIN PAGE
   * =========================================================
   */

  return (
    <div className="site" ref={pageRef}>
      <Navbar />

      <main>
        <Hero />

        {/* =====================================================
            SERVICES
        ====================================================== */}

        <section
          className="services-section"
          id="services"
        >
          <div className="section-container">
            <div className="section-heading">
              <div>
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
                From generator supply to maintenance and power
                control systems, we provide solutions for a wide
                range of power requirements.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => {
                const image =
                  service.image_url ||
                  serviceImages[service.slug] ||
                  serviceImages["generator-sales"];

                return (
                  <ServiceCard
                    key={service.id || service.slug || index}
                    number={String(index + 1).padStart(2, "0")}
                    title={service.name}
                    description={service.description}
                    image={image}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            GENERATORS
        ====================================================== */}

        <section
          className="generators-section"
          id="generators"
        >
          <div className="generators-container">
            <div className="generator-image">
              <img
                src={
                  generators[0]?.image_url ||
                  "https://st.mascus.com/image/product/large/7ce40bd2/fg-wilson-p2250-1-2250-kva-gen%2C9bc94e35.jpg"
                }
                alt={
                  generators[0]?.name ||
                  "FG Wilson industrial generator"
                }
              />
            </div>

            <div className="generator-content">
              <p className="section-eyebrow">
                GENERATOR SOLUTIONS
              </p>

              <h2>
                Power That Keeps
                <br />
                <span>Your Business Running</span>
              </h2>

              <p>
                We work with leading generator brands and provide
                solutions for different power requirements.
              </p>

              <div className="brand-list">
                {brands.map((brand) => (
                  <div
                    key={brand.id || brand.slug}
                  >
                    {brand.name}
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="primary-button"
              >
                Discuss Your Requirement
              </a>
            </div>
          </div>
        </section>

        {/* =====================================================
            BRANDS
        ====================================================== */}

        <section
          className="brands-section"
          id="brands"
        >
          <div className="section-container">
            <p className="section-eyebrow centered">
              BRANDS WE WORK WITH
            </p>

            <h2 className="brands-title">
              Trusted Generator Brands
            </h2>

            <div className="brands-grid">
              {brands.map((brand) => (
                <div
                  className="brand-box"
                  key={brand.id || brand.slug}
                >
                  {brand.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT
        ====================================================== */}

        <section
          className="contact-section"
          id="contact"
        >
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
                Tell us what power solution you are looking for
                and our team can help you determine the right
                direction.
              </p>
            </div>

            <a
              href="#contact"
              className="contact-button"
            >
              Contact NB Engineering
            </a>
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
              NB ENGINEERING & SERVICES
            </strong>

            <span>
              Reliable Power. Lasting Solutions.
            </span>
          </div>

          <p>
            © {new Date().getFullYear()} NB Engineering & Services.
            All rights reserved.
          </p>
        </div>
      </footer>

      {/* =======================================================
          DEVELOPMENT API STATUS
      ======================================================== */}

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
    </div>
  );
}

export default Home;