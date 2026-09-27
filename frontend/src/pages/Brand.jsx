import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./Brand.css";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1705051278299-7e64ba21437a?auto=format&fit=crop&fm=jpg&q=85&w=2400";

const brands = [
  {
    name: "Cummins",
    country: "United States",
    image:
      "https://ade-power.com/assets/img/generators/cummins/275kva-300kva-330kva-350kva-cummins-silent-diesel-generator-cummins-c275d5-c275d5b-c300d5-c300d5b-c330d5-c330d5b-c350d5b.jpg",
    description:
      "Cummins is a globally recognized power-generation brand offering generator systems for commercial, industrial, standby, and critical-power applications.",
  },
  {
    name: "FG Wilson",
    country: "United Kingdom",
    image:
      "https://trucksnl.b-cdn.net/tms/9/2/92b15d8fbfd5975f2edccf0cdb109654.jpg?format=jpg&height=832&quality=70&width=1110",
    description:
      "FG Wilson provides diesel generator sets for standby, prime, and industrial power applications across a wide range of capacities.",
  },
  {
    name: "Perkins",
    country: "United Kingdom",
    image:
      "https://image.made-in-china.com/2f0j00jQJeUZtBEybG/Electrical-Generators-Perkin-150-kVA-Weatherproof-Diesel-Generator-1106A-70tag2-120kw-Power-Station.webp",
    description:
      "Perkins is a long-established engine brand whose engines are widely used in generator sets and industrial power-generation equipment.",
  },
  {
    name: "Caterpillar",
    country: "United States",
    image:
      "https://st.mascus.com/image/product/large/51432a8b/cat-de850e0-c18-850-kva-genera%2Cf7337d45.jpg",
    description:
      "Caterpillar provides heavy-duty generator sets designed for standby, prime, and continuous power requirements.",
  },
];

function Brand() {
  return (
    <div className="brand-page">
      <Navbar />

      <main className="brand-main">
        <section className="brand-hero">
          <div
            className="brand-photo-grid"
            style={{
              gridTemplateColumns: "1fr",
            }}
          >
            <div
              className="brand-photo"
              style={{
                backgroundImage: `url("${HERO_IMAGE}")`,
              }}
            >
              <div className="brand-photo-overlay" />

              <div className="brand-photo-label">
                <span>POWER GENERATION</span>
                <strong>NB ENGINEERING</strong>
              </div>
            </div>
          </div>

          <div className="brand-hero-overlay" />

          <div className="brand-hero-content">
            <span className="brand-eyebrow">
              TOP GENERATOR BRANDS
            </span>

            <h1>
              Power from the
              <br />
              world's leading brands.
            </h1>

            <p>
              Explore the established generator brands we work with for
              commercial, industrial, residential, and critical-power
              requirements.
            </p>

            <a href="#brands" className="brand-hero-button">
              Explore Brands
              <span>↓</span>
            </a>
          </div>

          <div className="brand-hero-footer">
            <span>NB ENGINEERING &amp; SERVICES</span>
            <span>POWER GENERATION SOLUTIONS</span>
          </div>
        </section>

        <section id="brands" className="brand-showcase">
          <div className="brand-section-heading">
            <span>OUR BRANDS</span>

            <h2>
              Trusted names in
              <br />
              power generation.
            </h2>

            <p>
              We work with recognized generator and engine brands to help
              customers select dependable equipment for their application.
            </p>
          </div>

          <div className="brand-grid">
            {brands.map((brand, index) => (
              <article className="brand-card" key={brand.name}>
                <div
                  className="brand-card-image"
                  style={{
                    backgroundImage: `url("${brand.image}")`,
                  }}
                >
                  <div className="brand-card-image-overlay" />

                  <span className="brand-card-number">
                    0{index + 1}
                  </span>

                  <span className="brand-card-name">
                    {brand.name}
                  </span>
                </div>

                <div className="brand-card-content">
                  <span className="brand-card-country">
                    {brand.country}
                  </span>

                  <h3>{brand.name}</h3>

                  <p>{brand.description}</p>

                  <Link
                    to="/generators"
                    className="brand-card-link"
                  >
                    View Generators
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="brand-bottom">
          <div className="brand-bottom-inner">
            <span>NB ENGINEERING &amp; SERVICES</span>

            <h2>
              The right power solution
              <br />
              starts with the right equipment.
            </h2>

            <p>
              From generator selection and installation to maintenance and
              after-sales support, our team helps you build a dependable
              power solution around your requirements.
            </p>

            <Link to="/contact" className="brand-contact-button">
              Talk to Our Team
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Brand;