import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import CookieConsent from "./components/CookieConsent.jsx";
import SEO from "./components/SEO.jsx";
import BusinessSchema from "./components/BusinessSchema.jsx";
import { serviceSeo } from "./seoRoutes.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Generators = lazy(() => import("./pages/generators.jsx"));
const GeneratorDetail = lazy(() => import("./pages/GeneratorDetail.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Brand = lazy(() => import("./pages/Brand.jsx"));
const SpareParts = lazy(() => import("./pages/SpareParts.jsx"));
const GuideArticle = lazy(() => import("./pages/Articles.jsx"));
const ArticlesIndex = lazy(() => import("./pages/Articles.jsx").then((module) => ({ default: module.ArticlesIndex })));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));

function DeferredGsapAnimations() {
  const [Animation, setAnimation] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let idleId;
    let timeoutId;

    const load = () => import("./ui/GsapAnimations.jsx").then((module) => {
      if (!cancelled) setAnimation(() => module.default);
    });

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 1800 });
    } else {
      timeoutId = window.setTimeout(load, 900);
    }

    return () => {
      cancelled = true;
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return Animation ? <Animation /> : null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SiteMotion() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const done = window.setTimeout(() => setLoading(false), 650);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearTimeout(done);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <motion.div className="site-scroll-progress" aria-hidden="true" style={{ scaleX: progress }} />
      <AnimatePresence>
        {loading && (
          <motion.div className="site-loader" role="status" aria-label="Loading NB Engineering website" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
            <motion.img src="/logo.jpeg" alt="NB Engineering" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.45 }} />
            <motion.span aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.55, ease: "easeInOut" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SkipLink() {
  return <a className="skip-link" href="#main-content">Skip to main content</a>;
}

function RouteSEO() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const seoData = {
    "/": {
      title: "NB Engineering & Services | Generator Solutions in Pakistan",
      description: "NB Engineering & Services provides generators, power generation solutions, installation, maintenance, and after-sales support for commercial, industrial, and residential requirements in Pakistan.",
    },
    "/generators": {
      title: "Generators | NB Engineering & Services | Pakistan",
      description: "Explore generator solutions from NB Engineering & Services, including diesel generators and power generation equipment for commercial, industrial, and residential requirements.",
    },
    "/contact": {
      title: "Contact NB Engineering & Services | Pakistan",
      description: "Contact NB Engineering & Services for generator sales, power generation solutions, installation, maintenance, repair, rental, and technical support in Pakistan.",
    },
    "/brands": {
      title: "Generator Brands | NB Engineering & Services | Pakistan",
      description: "Explore generator brands and power generation equipment available through NB Engineering & Services.",
    },
    "/guides": {
      title: "Generator Guides & Practical Advice | NB Engineering",
      description: "Practical, plain-English guides to choosing, installing, maintaining and troubleshooting generators and power systems.",
    },
    "/privacy-policy": {
      title: "Privacy Policy | NB Engineering & Services",
      description: "Privacy policy for the NB Engineering & Services website and direct contact.",
    },
    "/terms-and-conditions": {
      title: "Terms & Conditions | NB Engineering & Services",
      description: "Terms and conditions for using the NB Engineering & Services website.",
    },
  };

  let seo = serviceSeo[pathname] || seoData[pathname];
  if (!seo && pathname.startsWith("/generators/")) {
    seo = {
      title: "Generator Details | NB Engineering & Services | Pakistan",
      description: "View generator specifications, features, applications, and contact information.",
    };
  }
  if (!seo && pathname.startsWith("/services/")) {
    seo = {
      title: "Generator Service | NB Engineering & Services | Pakistan",
      description: "Explore generator service solutions from NB Engineering & Services.",
    };
  }
  return <SEO title={(seo || seoData["/"]).title} description={(seo || seoData["/"]).description} />;
}

function App() {
  return (
    <BrowserRouter>
      <BusinessSchema />
      <RouteSEO />
      <ScrollToTop />
      <SkipLink />
      <SiteMotion />
      <CookieConsent />
      <DeferredGsapAnimations />
      <div id="main-content" tabIndex="-1">
        <Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<ArticlesIndex />} />
            <Route path="/guides/:slug" element={<GuideArticle />} />
            <Route path="/generators" element={<Generators />} />
            <Route path="/generators/:slug" element={<GeneratorDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/brands" element={<Brand />} />
            <Route path="/spare-parts" element={<SpareParts />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
