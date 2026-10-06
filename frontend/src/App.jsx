import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import Home from "./pages/Home.jsx";
import Generators from "./pages/generators.jsx";
import GeneratorDetail from "./pages/GeneratorDetail.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import Contact from "./pages/Contact.jsx";
import Brand from "./pages/Brand.jsx";
import SpareParts from "./pages/SpareParts.jsx";

import SEO from "./components/SEO.jsx";
import BusinessSchema from "./components/BusinessSchema.jsx";
import GsapAnimations from "./ui/GsapAnimations.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function SiteMotion() {
  const [loading, setLoading] = useState(true);
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

  return <><motion.div className="site-scroll-progress" style={{ scaleX: progress }} /><AnimatePresence>{loading && <motion.div className="site-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}><motion.img src="/logo-mark.png" alt="NB Engineering" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .45 }} /><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .55, ease: "easeInOut" }} /></motion.div>}</AnimatePresence></>;
}

function RouteSEO() {
  const location = useLocation();

  const seoData = {
    "/": {
      title:
        "NB Engineering & Services | Generator Solutions in Pakistan",
      description:
        "NB Engineering & Services provides generators, power generation solutions, installation, maintenance, and after-sales support for commercial, industrial, and residential requirements in Pakistan.",
    },

    "/generators": {
      title:
        "Generators | NB Engineering & Services | Pakistan",
      description:
        "Explore generator solutions from NB Engineering & Services, including diesel generators and power generation equipment for commercial, industrial, and residential requirements.",
    },

    "/services": {
      title:
        "Generator Services | NB Engineering & Services | Pakistan",
      description:
        "Explore generator sales, installation, repair, maintenance, rental, ATS panels, canopy work, and other power generation services from NB Engineering & Services.",
    },

    "/contact": {
      title:
        "Contact NB Engineering & Services | Pakistan",
      description:
        "Contact NB Engineering & Services for generator sales, power generation solutions, installation, maintenance, repair, rental, and technical support in Pakistan.",
    },

    "/brands": {
      title:
        "Generator Brands | NB Engineering & Services | Pakistan",
      description:
        "Explore generator brands and power generation equipment available through NB Engineering & Services.",
    },

        "/spare-parts": {
          title:
            "Generator Spare Parts | NB Engineering & Services | Pakistan",
      description:
        "Generator spare parts and related power generation components from NB Engineering & Services.",
    },
  };

  let seo = seoData[location.pathname];

  if (
    !seo &&
    location.pathname.startsWith("/generators/")
  ) {
    seo = {
      title:
        "Generator Details | NB Engineering & Services | Pakistan",
      description:
        "View generator specifications, features, applications, and inquiry information.",
    };
  }

  if (
    !seo &&
    location.pathname.startsWith("/services/")
  ) {
    seo = {
      title:
        "Generator Service | NB Engineering & Services | Pakistan",
      description:
        "Explore generator service solutions from NB Engineering & Services.",
    };
  }

  if (!seo) {
    seo = seoData["/"];
  }

  return (
    <SEO
      title={seo.title}
      description={seo.description}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <BusinessSchema />
      <RouteSEO />
      <ScrollToTop />
      <SiteMotion />
      <GsapAnimations />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/generators"
          element={<Generators />}
        />

        <Route
          path="/generators/:slug"
          element={<GeneratorDetail />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/services/:slug"
          element={<ServiceDetail />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/brands"
          element={<Brand />}
        />

        <Route
          path="/spare-parts"
          element={<SpareParts />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
