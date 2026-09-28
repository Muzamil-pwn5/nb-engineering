import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";
import { getServices } from "../api/services";

import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

/*
|--------------------------------------------------------------------------
| IMAGE SOURCES
|--------------------------------------------------------------------------
| These use direct Wikimedia upload URLs instead of Special:FilePath
| redirects or unreliable third-party image hosts.
|--------------------------------------------------------------------------
*/

const HERO_IMAGE = {
  sources: [
    "https://upload.wikimedia.org/wikipedia/commons/b/bb/Dieselgenerator.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/f/f6/Caterpillar_%28Olympian%29_Generator_Set.jpg",
  ],
  alt: "Large uncanopied industrial diesel generator system",
};

const SERVICE_IMAGES = {
  "generator-sales": {
    sources: [
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/KOEL_Green_-_Diesel_Generator_Set_-_Kolkata_2018-01-17_7592.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Generator_sets_-_KOEL.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/45/KOEL_iGreen.jpg",
    ],
    alt: "KOEL diesel generator set",
  },

  "generator-purchase": {
    sources: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Caterpillar_%28Olympian%29_Generator_Set.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cat_Gen-Set.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Dieselgenerator.jpg",
    ],
    alt: "Caterpillar diesel generator set",
  },

  "generator-rental": {
    sources: [
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Mobile_electric_generator.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Dieselgenerator.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cat_Gen-Set.jpg",
    ],
    alt: "Mobile diesel generator",
  },

  "generator-repair": {
    sources: [
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Generator_Repair_Work.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Shop-Based_Generator_Technician.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/12/Nigerian_way_of_repairing_generator.jpg",
    ],
    alt: "Technician repairing a diesel generator",
  },

  "generator-maintenance": {
    sources: [
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Generator_repairmen.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Shop-Based_Generator_Technician.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Generator_Repair_Work.jpg",
    ],
    alt: "Generator maintenance technicians",
  },

  "ats-panels": {
    sources: [
      "https://image.made-in-china.com/2f0j00QeaUbJMRgBqP/400A-ATS-Panel-with-Dual-Changeover-Switch-Automatic-Manual-for-Generator-System.webp",
    ],
    alt: "Automatic transfer switch panel",
  },

  "spare-parts": {
    sources: [
      "https://www.gensetpower.com/photo/ps94358648-weifang_ricardo_r6105_k4100_engine_spare_parts_genset_diesel_generator_60hp_filters_gasket.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Dieselgenerator.jpg",
    ],
    alt: "Diesel generator spare parts",
  },

  "canopy-work": {
    sources: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Caterpillar_%28Olympian%29_Generator_Set.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cat_Gen-Set.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Dieselgenerator.jpg",
    ],
    alt: "Generator with acoustic enclosure",
  },
};

const FALLBACK_SERVICES = [
  {
    id: "fallback-1",
    name: "Generator Sales",
    slug: "generator-sales",
    description:
      "Diesel generator solutions for commercial, industrial and backup power requirements.",
  },
  {
    id: "fallback-2",
    name: "Generator Purchase",
    slug: "generator-purchase",
    description:
      "Power generation equipment selected around your required capacity and application.",
  },
  {
    id: "fallback-3",
    name: "Generator Rental",
    slug: "generator-rental",
    description:
      "Reliable temporary power for projects, events, emergencies and changing site requirements.",
  },
  {
    id: "fallback-4",
    name: "Generator Repair",
    slug: "generator-repair",
    description:
      "Technical troubleshooting and repair support for diesel generator systems.",
  },
  {
    id: "fallback-5",
    name: "Generator Maintenance",
    slug: "generator-maintenance",
    description:
      "Planned servicing and preventive maintenance to keep generator systems dependable.",
  },
  {
    id: "fallback-6",
    name: "ATS Panels",
    slug: "ats-panels",
    description:
      "Automatic transfer switching and control solutions for dependable backup power.",
  },
  {
    id: "fallback-7",
    name: "Spare Parts",
    slug: "spare-parts",
    description:
      "Generator components and replacement parts for maintenance and repair requirements.",
  },
  {
    id: "fallback-8",
    name: "Canopy Work",
    slug: "canopy-work",
    description:
      "Practical generator enclosure and canopy solutions for different installation environments.",
  },
];

const SERVICE_META = {
  "generator-sales": {
    category: "POWER GENERATION",
    title: "Generator Sales",
    intro:
      "Generator solutions selected around the power requirements of commercial, industrial and backup applications.",
    points: ["Commercial power", "Industrial applications", "Standby systems"],
  },

  "generator-purchase": {
    category: "POWER GENERATION",
    title: "Generator Purchase",
    intro:
      "Equipment selection based on capacity, application, operating environment and the practical requirements of the project.",
    points: ["Capacity matching", "Application review", "Equipment selection"],
  },

  "generator-rental": {
    category: "TEMPORARY POWER",
    title: "Generator Rental",
    intro:
      "Temporary power support for construction, events, emergency requirements and changing site conditions.",
    points: ["Project power", "Emergency backup", "Flexible deployment"],
  },

  "generator-repair": {
    category: "TECHNICAL SUPPORT",
    title: "Generator Repair",
    intro:
      "Inspection, troubleshooting and repair support focused on restoring generator operation and addressing the underlying fault.",
    points: ["Fault diagnosis", "Component repair", "Operational recovery"],
  },

  "generator-maintenance": {
    category: "TECHNICAL SUPPORT",
    title: "Generator Maintenance",
    intro:
      "Preventive and corrective maintenance designed to keep generator systems dependable and ready for operation.",
    points: ["Preventive service", "System inspection", "Corrective work"],
  },

  "ats-panels": {
    category: "ELECTRICAL SYSTEMS",
    title: "ATS Panels",
    intro:
      "Automatic transfer switching and control solutions that connect standby generation with essential electrical loads.",
    points: ["Automatic transfer", "Control systems", "Backup switching"],
  },

  "spare-parts": {
    category: "GENERATOR SUPPORT",
    title: "Spare Parts",
    intro:
      "Generator components and replacement parts supporting routine maintenance, repair and equipment service requirements.",
    points: ["Replacement parts", "Service support", "Maintenance stock"],
  },

  "canopy-work": {
    category: "GENERATOR INSTALLATION",
    title: "Canopy Work",
    intro:
      "Generator enclosure solutions designed around protection, ventilation, access and the installation environment.",
    points: ["Acoustic enclosure", "Weather protection", "Service access"],
  },
};

function ImageWithFallback({ image, className = "", loading = "lazy" }) {
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [image?.sources?.join("|")]);

  if (!image?.sources?.length) {
    return null;
  }

  return (
    <img
      className={className}
      src={image.sources[sourceIndex]}
      alt={image.alt}
      loading={loading}
      onError={() => {
        setSourceIndex((current) =>
          current < image.sources.length - 1 ? current + 1 : current
        );
      }}
    />
  );
}

function Services() {
  const pageRef = useRef(null);
  const [services, setServices] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    let mounted = true;

    async function loadServices() {
      try {
        const result = await getServices();

        if (mounted && Array.isArray(result) && result.length > 0) {
          setServices(result);
        }
      } catch (error) {
        console.error("Services API failed:", error);
      }
    }

    loadServices();

    return () => {
      mounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    const root = pageRef.current;

    if (!root) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const hero = root.querySelector(".services-hero");
      const heroContent = root.querySelector(".services-hero-copy");
      const heroImage = root.querySelector(".services-hero-media img");

      gsap.fromTo(
        heroContent?.children || [],
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.12,
        }
      );

      if (heroImage && hero) {
        gsap.fromTo(
          heroImage,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.35,
            ease: "power3.out",
          }
        );

        gsap.to(heroImage, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }

      gsap.utils.toArray(".services-intro").forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".reveal-up"),
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray(".service-chapter").forEach((chapter) => {
        const copy = chapter.querySelector(".service-chapter-copy");
        const media = chapter.querySelector(".service-chapter-media");
        const image = chapter.querySelector(".service-chapter-media img");
        const number = chapter.querySelector(".service-chapter-ghost");
        const rule = chapter.querySelector(".service-chapter-rule");
        const index = chapter.querySelector(".service-chapter-index");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top 74%",
            once: true,
          },
        });

        timeline
          .fromTo(
            copy,
            { y: 42, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power3.out",
            }
          )
          .fromTo(
            media,
            { y: 50, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.58"
          )
          .fromTo(
            rule,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.45"
          )
          .fromTo(
            index,
            { x: -18, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.35"
          );

        if (image) {
          gsap.to(image, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        if (number) {
          gsap.to(number, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      });

      const process = root.querySelector(".services-process");

      if (process) {
        gsap.fromTo(
          process.querySelectorAll(".process-reveal"),
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: process,
              start: "top 76%",
              once: true,
            },
          }
        );
      }

      const finalSection = root.querySelector(".services-final");

      if (finalSection) {
        gsap.fromTo(
          finalSection.querySelectorAll(".final-reveal"),
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: finalSection,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      const refresh = () => ScrollTrigger.refresh();

      window.addEventListener("load", refresh);
      window.setTimeout(refresh, 350);

      return () => {
        window.removeEventListener("load", refresh);
      };
    }, root);

    return () => ctx.revert();
  }, [services]);

  const orderedServices = FALLBACK_SERVICES.map((fallback) => {
    const apiService = services.find(
      (service) => service.slug === fallback.slug
    );

    return {
      ...fallback,
      ...(apiService || {}),
    };
  });

  return (
    <div className="services-page" ref={pageRef}>
      <Navbar />

      <main>
        <section className="services-hero">
          <div className="services-hero-copy">
            <div className="services-hero-kicker">
              <span>02</span>
              <i />
              <span>SERVICES</span>
            </div>

            <p className="services-hero-company">
              NB ENGINEERING &amp; SERVICES
            </p>

            <h1>
              POWER
              <br />
              <span>IN MOTION.</span>
            </h1>

            <p className="services-hero-description">
              Generator supply, temporary power, technical support and
              electrical systems — structured around the requirements of the
              operation they serve.
            </p>

            <a className="services-hero-link" href="#service-index">
              <span>EXPLORE SERVICES</span>
              <b>↓</b>
            </a>

            <div className="services-hero-specs">
              <span>POWER GENERATION</span>
              <span>TECHNICAL SUPPORT</span>
              <span>ELECTRICAL SYSTEMS</span>
            </div>
          </div>

          <div className="services-hero-media">
            <ImageWithFallback image={HERO_IMAGE} loading="eager" />

            <div className="services-hero-media-tag">
              <span>FIELD / 02</span>
              <span>GENERATOR SYSTEMS</span>
            </div>

            <div className="services-hero-media-line" />
          </div>
        </section>

        <section className="services-intro" id="service-index">
          <div className="services-intro-inner">
            <div className="section-marker reveal-up">
              <span>01</span>
              <span>THE SERVICE INDEX</span>
            </div>

            <div className="services-intro-grid">
              <h2 className="reveal-up">
                Every service has
                <br />
                <span>a job to do.</span>
              </h2>

              <div className="reveal-up">
                <p>
                  Reliable power is rarely one transaction. Equipment,
                  installation conditions, control systems, service intervals
                  and technical support all affect how a power system performs.
                </p>

                <p>
                  That is why each NB Engineering service is treated as a
                  distinct part of the same power lifecycle.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="service-chapters">
          {orderedServices.map((service, index) => {
            const meta =
              SERVICE_META[service.slug] || SERVICE_META["generator-sales"];

            const image =
              SERVICE_IMAGES[service.slug] ||
              SERVICE_IMAGES["generator-sales"];

            const number = String(index + 2).padStart(2, "0");
            const reversed = index % 2 === 1;

            return (
              <article
                className={`service-chapter ${
                  reversed ? "service-chapter-reversed" : ""
                } service-chapter-${number}`}
                id={service.slug}
                key={service.id || service.slug || service.name}
              >
                <div className="service-chapter-inner">
                  <div className="service-chapter-ghost" aria-hidden="true">
                    {number}
                  </div>

                  <div className="service-chapter-copy">
                    <div className="service-chapter-top">
                      <span className="service-chapter-index">{number}</span>
                      <span className="service-chapter-category">
                        {meta.category}
                      </span>
                    </div>

                    <p className="service-chapter-kicker">
                      NB ENGINEERING / {number}
                    </p>

                    <h2>{meta.title}</h2>

                    <div className="service-chapter-rule" />

                    <p className="service-chapter-lead">
                      {service.description || meta.intro}
                    </p>

                    <p className="service-chapter-detail">{meta.intro}</p>

                    <div className="service-chapter-points">
                      {meta.points.map((point) => (
                        <span key={point}>{point}</span>
                      ))}
                    </div>

                    <Link
                      to={`/services/${service.slug}`}
                      className="service-chapter-link"
                    >
                      <span>VIEW SERVICE</span>
                      <b>↗</b>
                    </Link>
                  </div>

                  <div className="service-chapter-media">
                    <ImageWithFallback image={image} />

                    <div className="service-chapter-media-overlay" />

                    <div className="service-chapter-media-caption">
                      <span>{number}</span>
                      <strong>{meta.category}</strong>
                    </div>

                    <div className="service-chapter-media-corner">
                      NB / {number}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="services-process">
          <div className="services-process-inner">
            <div className="section-marker process-reveal">
              <span>10</span>
              <span>HOW WE APPROACH THE WORK</span>
            </div>

            <div className="services-process-heading">
              <h2 className="process-reveal">
                Requirement
                <br />
                <span>before equipment.</span>
              </h2>

              <p className="process-reveal">
                The right solution starts with the application. We look at what
                the system has to do before deciding what equipment or support
                is required.
              </p>
            </div>

            <div className="services-process-grid">
              <div className="process-reveal">
                <span>01</span>
                <strong>Understand</strong>
                <p>
                  Capacity, application, environment and operating
                  requirements.
                </p>
              </div>

              <div className="process-reveal">
                <span>02</span>
                <strong>Build the solution</strong>
                <p>
                  Equipment and supporting systems matched to the actual
                  requirement.
                </p>
              </div>

              <div className="process-reveal">
                <span>03</span>
                <strong>Keep it running</strong>
                <p>
                  Service, repair, maintenance and parts when the system needs
                  support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="services-final">
          <div className="services-final-inner">
            <div className="final-reveal">
              <span className="services-final-kicker">
                LET&apos;S TALK POWER
              </span>

              <h2>
                Have a power
                <br />
                <span>requirement?</span>
              </h2>

              <p>
                Tell us what you need. We&apos;ll help you identify the right
                generator, electrical system or technical service for the job.
              </p>
            </div>

            <Link to="/contact" className="services-final-button final-reveal">
              <span>CONTACT NB ENGINEERING</span>
              <b>→</b>
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Products</h3>
            <Link to="/generators">Diesel Generators</Link>
            <Link to="/generators">Generator Range</Link>
            <Link to="/services/generator-rental">Generator Rental</Link>
            <Link to="/spare-parts">Spare Parts</Link>
            <Link to="/services/ats-panels">ATS Panels</Link>
            <Link to="/services/canopy-work">Canopy Solutions</Link>
          </div>

          <div className="footer-column">
            <h3>Services</h3>
            <Link to="/services/generator-sales">Generator Sales</Link>
            <Link to="/services/generator-purchase">
              Generator Purchase
            </Link>
            <Link to="/services/generator-repair">Generator Repair</Link>
            <Link to="/services/generator-maintenance">Maintenance</Link>
            <Link to="/services/ats-panels">Electrical Systems</Link>
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
            <Link to="/services/generator-rental">Generator Rental</Link>
            <Link to="/services/generator-maintenance">Maintenance</Link>
            <Link to="/services/ats-panels">ATS Panels</Link>
            <Link to="/services">Industrial Power</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-brand">
            <strong>NB ENGINEERING &amp; SERVICES</strong>
            <span>Reliable Power. Lasting Solutions.</span>
          </div>

          <p>
            © {new Date().getFullYear()} NB Engineering &amp; Services. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Services;