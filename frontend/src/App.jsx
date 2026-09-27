import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Generators from "./pages/generators.jsx";
import GeneratorDetail from "./pages/GeneratorDetail.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import Contact from "./pages/contact.jsx";
import Brand from "./pages/Brand.jsx";

import SEO from "./components/SEO.jsx";
import BusinessSchema from "./components/BusinessSchema.jsx";

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
        "Explore generator brands and power generation equipment available through NB Engineering & Services for commercial, industrial, and residential applications.",
    },

    "/spare-parts": {
      title:
        "Generator Spare Parts | NB Engineering & Services | Pakistan",
      description:
        "Generator spare parts and related power generation components from NB Engineering & Services.",
    },
  };

  let seo = seoData[location.pathname];

  if (!seo && location.pathname.startsWith("/generators/")) {
    seo = {
      title:
        "Generator Details | NB Engineering & Services | Pakistan",
      description:
        "View generator specifications, features, applications, and inquiry information from NB Engineering & Services.",
    };
  }

  if (!seo && location.pathname.startsWith("/services/")) {
    seo = {
      title:
        "Generator Service | NB Engineering & Services | Pakistan",
      description:
        "Explore generator service solutions from NB Engineering & Services, including technical support, installation, repair, maintenance, and related power services.",
    };
  }

  if (!seo) {
    seo = {
      title:
        "NB Engineering & Services | Generator Solutions in Pakistan",
      description:
        "NB Engineering & Services provides generators, power generation solutions, installation, maintenance, and after-sales support in Pakistan.",
    };
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
          element={<div>Spare Parts Page</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;