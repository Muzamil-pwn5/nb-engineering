import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import apiRequest from "../api/client";
import "./ExperienceSection.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value || 0));
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function getSectorMetrics(sector) {
  const customers = Array.isArray(sector?.customers)
    ? sector.customers
    : [];

  return {
    organizations: Number(
      sector?.organization_count ||
        customers.length ||
        0
    ),

    sites: customers.reduce(
      (total, customer) =>
        total + Number(customer?.sites || 0),
      0
    ),

    equipment: customers.reduce(
      (total, customer) =>
        total + Number(customer?.equipment || 0),
      0
    ),

    services: customers.reduce(
      (total, customer) =>
        total + Number(customer?.service_records || 0),
      0
    ),
  };
}

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const journeyRef = useRef(null);
  const journeyStageRef = useRef(null);
  const progressRef = useRef(null);
  const panelRef = useRef(null);
  const cursorRef = useRef(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSector, setActiveSector] = useState(0);
  const [selectedSector, setSelectedSector] = useState(null);

  const sectors = useMemo(
    () => data?.sectors || [],
    [data]
  );

  const currentSector =
    sectors[activeSector] || sectors[0] || null;

  const currentMetrics = getSectorMetrics(
    currentSector
  );

  const capabilityList = data?.capabilities || [];

  useEffect(() => {
    let cancelled = false;

    async function loadExperience() {
      try {
        setLoading(true);

        const result = await apiRequest("/experience");

        if (!cancelled) {
          setData(result);
        }
      } catch (error) {
        console.error(
          "Experience data failed to load:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadExperience();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * HERO + GENERAL REVEALS
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!data || !sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const heroWords = gsap.utils.toArray(
        ".experience-hero-word"
      );

      const heroMeta = gsap.utils.toArray(
        ".experience-hero-meta-item"
      );

      const heroRule = document.querySelector(
        ".experience-hero-rule"
      );

      gsap.set(heroWords, {
        yPercent: 110,
        opacity: 0,
      });

      gsap.set(heroMeta, {
        y: 20,
        opacity: 0,
      });

      if (heroRule) {
        gsap.set(heroRule, {
          scaleX: 0,
          transformOrigin: "left center",
        });
      }

      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      if (heroRule) {
        intro.to(
          heroRule,
          {
            scaleX: 1,
            duration: 0.8,
          },
          0
        );
      }

      intro.to(
        heroWords,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
        },
        0.15
      );

      intro.to(
        heroMeta,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
        },
        0.65
      );

      gsap.utils.toArray(
        ".experience-proof"
      ).forEach((element) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
          },
        });
      });

      gsap.utils.toArray(
        ".experience-reference-row"
      ).forEach((element, index) => {
        gsap.from(element, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.025,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
          },
        });
      });

      gsap.utils.toArray(
        ".experience-capability-item"
      ).forEach((element, index) => {
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.65,
          delay: index * 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
          },
        });
      });

      gsap.to(
        ".experience-hero-grid",
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".experience-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.to(
        ".experience-hero-orbit",
        {
          rotate: 30,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".experience-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  /*
   * ---------------------------------------------------------
   * JOURNEY
   *
   * IMPORTANT:
   * There is ONE sector panel only.
   * Scroll position selects which sector's data is displayed.
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (
      !data ||
      !journeyRef.current ||
      !journeyStageRef.current ||
      sectors.length === 0
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile =
        window.innerWidth <= 900;

      if (isMobile) {
        return;
      }

      const trigger = ScrollTrigger.create({
        id: "experienceJourney",
        trigger: journeyRef.current,
        start: "top top",
        end: `+=${Math.max(
          sectors.length * 90,
          650
        )}%`,
        pin: journeyStageRef.current,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const maxIndex =
            sectors.length - 1;

          const nextIndex = Math.min(
            maxIndex,
            Math.floor(
              self.progress * sectors.length
            )
          );

          setActiveSector((current) => {
            if (current === nextIndex) {
              return current;
            }

            return nextIndex;
          });

          if (progressRef.current) {
            gsap.set(
              progressRef.current,
              {
                scaleX:
                  maxIndex > 0
                    ? nextIndex / maxIndex
                    : 1,
              }
            );
          }
        },
      });

      gsap.to(
        ".experience-journey-grid",
        {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.to(
        ".experience-journey-orbit",
        {
          rotate: 70,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      return () => {
        trigger.kill();
      };
    }, journeyRef);

    return () => ctx.revert();
  }, [data, sectors.length]);

  /*
   * ---------------------------------------------------------
   * ACTIVE SECTOR TRANSITION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!panelRef.current || !currentSector) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [activeSector, currentSector]);

  /*
   * ---------------------------------------------------------
   * CURSOR
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor || window.innerWidth <= 900) {
      return;
    }

    const moveCursor = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );
    };
  }, []);

  function scrollToSector(index) {
    if (
      window.innerWidth <= 900 ||
      !journeyRef.current
    ) {
      setActiveSector(index);

      const target =
        document.querySelector(
          `[data-sector-detail="${index}"]`
        );

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    const trigger =
      ScrollTrigger.getById(
        "experienceJourney"
      );

    if (!trigger) {
      return;
    }

    const progress =
      index /
      Math.max(sectors.length - 1, 1);

    const target =
      trigger.start +
      progress *
        (trigger.end - trigger.start);

    gsap.to(window, {
      duration: 0.9,
      scrollTo: {
        y: target,
      },
      ease: "power3.inOut",
    });
  }

  function openSectorDetail(name) {
    setSelectedSector(name);

    requestAnimationFrame(() => {
      const detail =
        document.querySelector(
          ".experience-reference"
        );

      if (detail) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: {
            y: detail,
            offsetY: 70,
          },
          ease: "power3.inOut",
        });
      }
    });
  }

  if (!data && loading) {
    return (
      <section
        ref={sectionRef}
        className="experience-section"
      >
        <div className="experience-loading">
          Loading experience...
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="experience-section"
      id="experience"
    >
      <div
        ref={cursorRef}
        className="experience-cursor"
      />

      {/* =====================================================
          EXPERIENCE HERO
          ===================================================== */}

      <section className="experience-hero">
        <div className="experience-hero-grid" />
        <div className="experience-hero-orbit" />

        <div className="experience-hero-content">
          <div className="experience-hero-rule" />

          <div className="experience-hero-top">
            <span>
              01 / FIELD EXPERIENCE
            </span>

            <span>
              NB ENGINEERING &amp; SERVICES
            </span>
          </div>

          <h2>
            <span className="experience-hero-word">
              Power
            </span>{" "}
            <span className="experience-hero-word">
              across
            </span>{" "}
            <span className="experience-hero-word experience-gold">
              industries.
            </span>
          </h2>

          <div className="experience-hero-bottom">
            <p>
              Infrastructure delivered across
              operational environments where
              reliable power is critical.
            </p>

            <div className="experience-hero-meta">
              <div className="experience-hero-meta-item">
                <strong>
                  {formatNumber(
                    data?.stats?.organizations
                  )}
                </strong>

                <span>
                  Organizations
                </span>
              </div>

              <div className="experience-hero-meta-item">
                <strong>
                  {formatNumber(
                    data?.stats?.sectors
                  )}
                </strong>

                <span>
                  Sectors
                </span>
              </div>

              <div className="experience-hero-meta-item">
                <strong>
                  {formatNumber(
                    data?.stats?.sites
                  )}
                </strong>

                <span>
                  Sites
                </span>
              </div>
            </div>
          </div>

          <div className="experience-scroll-hint">
            <span className="experience-scroll-line" />
            Scroll to explore
          </div>
        </div>
      </section>

      {/* =====================================================
          JOURNEY
          ===================================================== */}

      <section
        ref={journeyRef}
        className="experience-journey"
      >
        <div
          ref={journeyStageRef}
          className="experience-journey-stage"
        >
          <div className="experience-journey-grid" />

          <div className="experience-journey-orbit">
            <span />
            <span />
            <span />
          </div>

          <div className="experience-journey-header">
            <div>
              <p className="experience-label">
                02 / THE JOURNEY
              </p>

              <h2>
                Scroll through
                <br />
                the footprint.
              </h2>
            </div>

            <p>
              Each environment changes the
              story. Keep scrolling.
            </p>
          </div>

          <div className="experience-journey-stage-content">
            <div className="experience-journey-counter">
              <strong>
                {String(
                  activeSector + 1
                ).padStart(2, "0")}
              </strong>

              <span>/</span>

              <span>
                {String(
                  sectors.length
                ).padStart(2, "0")}
              </span>
            </div>

            <div
              ref={panelRef}
              className="experience-sector-panel"
              data-sector-detail={activeSector}
            >
              <p className="experience-label">
                INDUSTRY /{" "}
                {String(
                  activeSector + 1
                ).padStart(2, "0")}
              </p>

              <h3>
                {currentSector?.name}
              </h3>

              <p className="experience-sector-description">
                {currentSector?.description ||
                  "Power infrastructure supporting critical operations."}
              </p>

              <div className="experience-sector-metrics">
                <div>
                  <strong>
                    {formatNumber(
                      currentMetrics.organizations
                    )}
                  </strong>

                  <span>
                    Organizations
                  </span>
                </div>

                <div>
                  <strong>
                    {formatNumber(
                      currentMetrics.sites
                    )}
                  </strong>

                  <span>
                    Sites
                  </span>
                </div>

                <div>
                  <strong>
                    {formatNumber(
                      currentMetrics.equipment
                    )}
                  </strong>

                  <span>
                    Equipment
                  </span>
                </div>

                <div>
                  <strong>
                    {formatNumber(
                      currentMetrics.services
                    )}
                  </strong>

                  <span>
                    Services
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="experience-sector-action"
                onClick={() =>
                  openSectorDetail(
                    currentSector?.name
                  )
                }
              >
                Explore this sector
                <ArrowIcon />
              </button>
            </div>

            <div className="experience-journey-index">
              {sectors.map(
                (sector, index) => (
                  <button
                    key={sector.name}
                    type="button"
                    className={`experience-journey-nav ${
                      index === activeSector
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() =>
                      scrollToSector(index)
                    }
                  >
                    <span>
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <i />

                    <strong>
                      {sector.name}
                    </strong>
                  </button>
                )
              )}
            </div>
          </div>

          <div className="experience-journey-progress">
            <span ref={progressRef} />
          </div>
        </div>
      </section>

      {/* =====================================================
          REFERENCES
          ===================================================== */}

      <section className="experience-reference experience-power-solutions-section">
        <div className="experience-reference-heading">
          <div>
            <p className="experience-label">
              03 / POWER SOLUTIONS
            </p>

            <h2>
              Power that keeps
              <br />
              <span className="experience-gold">
                business moving.
              </span>
            </h2>
          </div>

          <p>
            Reliable power is more than keeping a generator running.
            It is about making sure your business, facility, equipment
            and people can keep operating when the main supply cannot.
          </p>
        </div>

        <div className="experience-power-intro">
          <p>
            From standby generation to complete electrical support,
            we provide practical power solutions built around real
            operating needs â€” with dependable equipment, professional
            installation and ongoing maintenance.
          </p>
        </div>

        <div className="experience-power-solutions">

          <div className="experience-power-solution">
            <span>01</span>

            <div>
              <strong>GENERATION</strong>
              <p>
                Reliable backup and prime power.
              </p>
            </div>
          </div>

          <div className="experience-power-solution">
            <span>02</span>

            <div>
              <strong>ELECTRICAL</strong>
              <p>
                Systems designed for safe, stable operation.
              </p>
            </div>
          </div>

          <div className="experience-power-solution">
            <span>03</span>

            <div>
              <strong>AUTOMATION</strong>
              <p>
                ATS / AMF solutions for seamless changeover.
              </p>
            </div>
          </div>

          <div className="experience-power-solution">
            <span>04</span>

            <div>
              <strong>SUPPORT</strong>
              <p>
                Maintenance that keeps your power ready.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          CAPABILITIES
          ===================================================== */}

      

      {/* =====================================================
          FINAL
          ===================================================== */}

      
    </section>
  );
}


