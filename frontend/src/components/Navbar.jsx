import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-7h5v7" />
    </svg>
  );
}

function ServicesIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 6.3a4.1 4.1 0 0 0-5.5 5.5L3.5 17.5a2.1 2.1 0 1 0 3 3l5.7-5.7a4.1 4.1 0 0 0 5.5-5.5l-2.8 2.8-2.5-2.5 2.3-3.3Z" />
    </svg>
  );
}

function GeneratorIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 5.5 13h5L10 22l8.5-12h-5L13 2Z" />
    </svg>
  );
}

function BrandsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L12 3Z" />
      <path d="M7 18.5h10" />
      <path d="M9 21h6" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

const navItems = [
  {
    label: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    label: "Services",
    path: "/services",
    icon: ServicesIcon,
  },
  {
    label: "Generators",
    path: "/generators",
    icon: GeneratorIcon,
  },
  {
    label: "Brands",
    path: "/brands",
    icon: BrandsIcon,
  },
  {
    label: "Contact",
    path: "/contact",
    icon: ContactIcon,
  },
];

function Navbar() {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolledHidden, setIsScrolledHidden] =
    React.useState(false);
  const [isTopZoneActive, setIsTopZoneActive] =
    React.useState(false);

  /*
   * ---------------------------------------------------------
   * SCROLL BEHAVIOR
   *
   * At top:
   *   navbar visible
   *
   * Scroll down:
   *   navbar fades away
   *
   * Scroll up:
   *   navbar comes back
   * ---------------------------------------------------------
   */

  React.useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      /*
       * Always visible at the very top.
       */
      if (currentScrollY <= 20) {
        setIsScrolledHidden(false);
        lastScrollY = currentScrollY;
        return;
      }

      /*
       * Small movement is ignored so the navbar does not
       * flicker while scrolling.
       */
      const difference = currentScrollY - lastScrollY;

      if (Math.abs(difference) < 3) {
        return;
      }

      /*
       * Scrolling DOWN.
       */
      if (difference > 0) {
        setIsScrolledHidden(true);
      }

      /*
       * Scrolling UP.
       */
      if (difference < 0) {
        setIsScrolledHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Close mobile menu whenever the route changes.
   */
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  /*
   * ---------------------------------------------------------
   * TOP REVEAL ZONE
   *
   * When the navbar has disappeared, moving the cursor into
   * the top area makes it visible again.
   * ---------------------------------------------------------
   */

  const handleTopZoneEnter = () => {
    setIsTopZoneActive(true);
    setIsScrolledHidden(false);
  };

  const handleTopZoneLeave = () => {
    setIsTopZoneActive(false);
  };

  /*
   * ---------------------------------------------------------
   * NAVBAR HOVER
   *
   * Keep it visible while the cursor is actually over it.
   * ---------------------------------------------------------
   */

  const handleNavbarEnter = () => {
    setIsTopZoneActive(true);
    setIsScrolledHidden(false);
  };

  const handleNavbarLeave = () => {
    setIsTopZoneActive(false);
  };

  /*
   * Active route.
   */
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const navbarClassName = [
    "navbar",
    isScrolledHidden && !isTopZoneActive
      ? "navbar-hidden"
      : "",
    isTopZoneActive
      ? "navbar-top-active"
      : "",
    isMenuOpen
      ? "navbar-menu-open"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* =====================================================
          INVISIBLE TOP REVEAL AREA

          IMPORTANT:
          This stays BEHIND the actual navbar.

          It allows the navbar to become visible again when
          the user moves the cursor to the top of the page.
      ===================================================== */}

      <div
        className="navbar-hover-zone"
        onMouseEnter={handleTopZoneEnter}
        onMouseLeave={handleTopZoneLeave}
        aria-hidden="true"
      />

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={navbarClassName}
        onMouseEnter={handleNavbarEnter}
        onMouseLeave={handleNavbarLeave}
      >
        <div className="navbar-shell">

          {/* =================================================
              NAVBAR INNER
          ================================================= */}

          <div className="navbar-inner">

            {/* BRAND */}

            <Link
              to="/"
              className="brand"
              aria-label="NB Engineering and Services home"
              title="NB Engineering & Services"
            >
              <span className="brand-mark">
                <img
                  src="/logo.jpeg"
                  alt="NB Engineering & Services"
                />
              </span>

              <span className="brand-copy">
                <strong>NB ENGINEERING</strong>
                <small>&amp; SERVICES</small>
              </span>
            </Link>

            <div className="nav-divider" />

            {/* MAIN NAVIGATION */}

            <nav
              className="nav-links"
              aria-label="Main navigation"
            >
              {navItems.map(
                ({ label, path, icon: Icon }) => {
                  const active = isActive(path);

                  return (
                    <Link
                      key={path}
                      to={path}
                      className={`nav-link ${
                        active ? "active" : ""
                      }`}
                      aria-current={
                        active ? "page" : undefined
                      }
                      title={label}
                    >
                      <span className="nav-icon">
                        <Icon />
                      </span>

                      <span className="nav-label">
                        {label}
                      </span>

                      <span className="nav-active-line" />
                    </Link>
                  );
                }
              )}
            </nav>

            <div className="nav-spacer" />

            {/* GET IN TOUCH */}

            <Link
              to="/contact"
              className="nav-button"
              title="Get In Touch"
            >
              <span className="nav-button-icon">
                <ArrowIcon />
              </span>

              <span className="nav-button-text">
                Get In Touch
              </span>
            </Link>

            {/* MOBILE MENU */}

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() =>
                setIsMenuOpen((open) => !open)
              }
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
            >
              <span className="menu-icon">
                {isMenuOpen ? (
                  <CloseIcon />
                ) : (
                  <MenuIcon />
                )}
              </span>
            </button>
          </div>

          {/* =================================================
              MOBILE PANEL
          ================================================= */}

          <div
            className={`mobile-nav-panel ${
              isMenuOpen ? "open" : ""
            }`}
          >
            <nav
              className="mobile-nav-links"
              aria-label="Mobile navigation"
            >
              {navItems.map(
                ({ label, path, icon: Icon }) => {
                  const active = isActive(path);

                  return (
                    <Link
                      key={path}
                      to={path}
                      className={`mobile-nav-link ${
                        active ? "active" : ""
                      }`}
                      aria-current={
                        active ? "page" : undefined
                      }
                    >
                      <span className="mobile-nav-icon">
                        <Icon />
                      </span>

                      <span>{label}</span>

                      <span className="mobile-nav-arrow">
                        <ArrowIcon />
                      </span>
                    </Link>
                  );
                }
              )}

              <Link
                to="/contact"
                className="mobile-contact-button"
              >
                <span>Get In Touch</span>
                <ArrowIcon />
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;