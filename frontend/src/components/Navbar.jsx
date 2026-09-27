import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

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

  const [isMenuOpen, setIsMenuOpen] =
    React.useState(false);

  const navbarRef = React.useRef(null);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  /*
   * ---------------------------------------------------------
   * SCROLL-LINKED NAVBAR COLLAPSE
   *
   * 0px scroll:
   *   Fully expanded.
   *
   * 70px+ scroll:
   *   Fully collapsed.
   *
   * Between 0px and 70px:
   *   Smoothly interpolates with the actual scroll position.
   *
   * requestAnimationFrame keeps this lightweight and avoids
   * React re-rendering on every scroll event.
   * ---------------------------------------------------------
   */

  React.useEffect(() => {
    let animationFrame = null;

    const updateNavbar = () => {
      animationFrame = null;

      const navbar = navbarRef.current;

      if (!navbar) {
        return;
      }

      const scrollY = Math.max(
        0,
        window.scrollY || window.pageYOffset || 0
      );

      /*
       * The first 70px of scrolling control the collapse.
       */
      const collapseDistance = 70;

      const progress = Math.min(
        scrollY / collapseDistance,
        1
      );

      /*
       * Smoothstep easing.
       *
       * This gives the navbar a softer beginning and ending
       * instead of a linear mechanical movement.
       */
      const easedProgress =
        progress * progress * (3 - 2 * progress);

      navbar.style.setProperty(
        "--navbar-collapse-progress",
        easedProgress.toFixed(4)
      );
    };

    const handleScroll = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame =
        window.requestAnimationFrame(updateNavbar);
    };

    updateNavbar();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      if (animationFrame !== null) {
        window.cancelAnimationFrame(
          animationFrame
        );
      }
    };
  }, []);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  React.useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={navbarRef}
      className="navbar"
      style={{
        "--navbar-collapse-progress": 0,
      }}
    >
      <div className="navbar-inner">

        {/* =================================================
            BRAND
        ================================================= */}

        <Link
          to="/"
          className="navbar-brand"
          aria-label="NB Engineering and Services home"
        >
          <span className="navbar-logo">
            <img
              src="/logo.jpeg"
              alt="NB Engineering & Services"
            />
          </span>

          <span className="navbar-brand-text">
            <strong>NB ENGINEERING</strong>
            <small>&amp; SERVICES</small>
          </span>
        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav
          className="navbar-links"
          aria-label="Main navigation"
        >
          {navItems.map(
            ({ label, path, icon: Icon }) => {
              const active = isActive(path);

              return (
                <Link
                  key={path}
                  to={path}
                  className={`navbar-link ${
                    active ? "active" : ""
                  }`}
                  aria-current={
                    active ? "page" : undefined
                  }
                >
                  <span className="navbar-link-icon">
                    <Icon />
                  </span>

                  <span>{label}</span>
                </Link>
              );
            }
          )}
        </nav>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="navbar-actions">

          <button
            type="button"
            className="navbar-search"
            aria-label="Search"
            title="Search"
          >
            <SearchIcon />
          </button>

          <button
            type="button"
            className="navbar-menu-button"
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
            <span>
              {isMenuOpen ? (
                <CloseIcon />
              ) : (
                <MenuIcon />
              )}
            </span>
          </button>

        </div>
      </div>


      {/* ===================================================
          MOBILE NAVIGATION
      =================================================== */}

      <div
        className={`mobile-navbar ${
          isMenuOpen ? "open" : ""
        }`}
      >
        <nav
          className="mobile-navbar-links"
          aria-label="Mobile navigation"
        >
          {navItems.map(
            ({ label, path, icon: Icon }) => {
              const active = isActive(path);

              return (
                <Link
                  key={path}
                  to={path}
                  className={`mobile-navbar-link ${
                    active ? "active" : ""
                  }`}
                  aria-current={
                    active ? "page" : undefined
                  }
                >
                  <span className="mobile-navbar-icon">
                    <Icon />
                  </span>

                  <span>{label}</span>
                </Link>
              );
            }
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;