import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import CookieConsent from "./components/CookieConsent.jsx";
import SEO from "./components/SEO.jsx";
import BusinessSchema from "./components/BusinessSchema.jsx";
import { routeSeo, serviceSeo } from "./seoRoutes.js";
import { articles } from "./data/articles.js";
import { canonicalUrl, createServiceSchema } from "./structuredData.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Generators = lazy(() => import("./pages/generators.jsx"));
const GeneratorDetail = lazy(() => import("./pages/GeneratorDetail.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Tarnol = lazy(() => import("./pages/Tarnol.jsx"));
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
  const { pathname } = useLocation();
  const [donePath, setDonePath] = useState(null);
  const [progress, setProgress] = useState(0);
  const firstLoad = useRef(true);
  const loading = donePath !== pathname;
  useEffect(() => {
    const duration = firstLoad.current ? 1500 : 700;
    firstLoad.current = false;
    const done = window.setTimeout(() => setDonePath(pathname), duration);
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
  }, [pathname]);

  return (
    <>
      <motion.div className="site-scroll-progress" aria-hidden="true" style={{ scaleX: progress }} />
      <AnimatePresence>
        {loading && (
          <motion.div className="site-loader" role="status" aria-label="Loading NB Engineering website" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
            <div className="site-loader-grid" aria-hidden="true" />
            <div className="site-loader-corner site-loader-corner-left">NB / 00</div>
            <div className="site-loader-corner site-loader-corner-right">POWER SYSTEMS / ISLAMABAD</div>
            <div className="site-loader-core">
              <motion.div className="site-loader-orbit" aria-hidden="true" initial={{ rotate: -18, scale: .92 }} animate={{ rotate: 0, scale: 1 }} transition={{ duration: .9, ease: "easeOut" }}>
                <img src="/logo.jpeg" alt="NB Engineering" />
              </motion.div>
              <div className="site-loader-copy">
                <span>NB ENGINEERING & SERVICES</span>
                <strong>Power systems<br /><em>for the real world.</em></strong>
                <div className="site-loader-progress" aria-hidden="true"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.25, ease: "easeInOut" }} /></div>
                <small>Loading the next move</small>
              </div>
            </div>
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
  const seo = routeSeo[pathname] || routeSeo["/"];
  return <SEO title={seo.title} description={seo.description} />;
}

function RouteStructuredData() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    const schemaId = "nb-engineering-service-schema";
    let schemaScript = document.getElementById(schemaId);
    const metadata = serviceSeo[pathname];
    const canonical = canonicalUrl(pathname);

    if (!metadata?.content) {
      schemaScript?.remove();
    } else {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = schemaId;
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }

      schemaScript.textContent = JSON.stringify(createServiceSchema(pathname, metadata));
    }

    const articleScriptId = "nb-engineering-article-schema";
    let articleScript = document.getElementById(articleScriptId);
    const articleSlug = pathname.startsWith("/guides/")
      ? pathname.slice("/guides/".length)
      : "";
    const article = articles.find((item) => item.slug === articleSlug && item.datePublished);

    if (!article) {
      articleScript?.remove();
      return;
    }

    if (!articleScript) {
      articleScript = document.createElement("script");
      articleScript.id = articleScriptId;
      articleScript.type = "application/ld+json";
      document.head.appendChild(articleScript);
    }

    articleScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: article.title,
      description: article.description,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      author: { "@type": "Organization", name: "NB Engineering & Services", "@id": "https://nbengineerings.com/#business" },
      publisher: { "@id": "https://nbengineerings.com/#business" },
      datePublished: article.datePublished,
      dateModified: article.datePublished,
    });
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    const staticContent = document.getElementById("seo-prerendered-content");
    if (staticContent) window.requestAnimationFrame(() => staticContent.remove());
  }, []);

  return (
    <BrowserRouter>
      <BusinessSchema />
      <RouteSEO />
      <RouteStructuredData />
      <ScrollToTop />
      <SkipLink />
      <SiteMotion />
      <CookieConsent />
      <DeferredGsapAnimations />
      <div id="main-content" tabIndex="-1">
        <Suspense fallback={<div className="route-loading" role="status"><span>NB / LOADING</span><strong>Preparing the next move.</strong></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<ArticlesIndex />} />
            <Route path="/guides/:slug" element={<GuideArticle />} />
            <Route path="/generators" element={<Generators />} />
            <Route path="/generators/:slug" element={<GeneratorDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tarnol" element={<Tarnol />} />
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
