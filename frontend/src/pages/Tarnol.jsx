import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SEO from "../components/SEO.jsx";
import { Link } from "react-router-dom";

export default function Tarnol() {
  return (
    <>
      <SEO
        title="Generator Services in Tarnol, Islamabad | NB Engineering"
        description="NB Engineering provides generator sales, rental, installation, repair, maintenance and spare-parts support from Tarnol, Islamabad."
      />
      <Navbar />
      <main className="site-page">
        <section className="page-hero">
          <div className="site-shell page-hero-content">
            <span className="eyebrow">TARNOL / ISLAMABAD</span>
            <h1 className="display">Generator services<br /><em>from Tarnol.</em></h1>
            <p className="lead">
              NB Engineering &amp; Services supports generator and power-system
              requirements from Tarnol, Islamabad, including supply, rental,
              installation planning, repair, maintenance and spare parts.
            </p>
            <div className="button-row">
              <Link className="button button-primary" to="/contact">Contact the team <span>↗</span></Link>
              <Link className="button button-outline" to="/services">Explore services <span>↗</span></Link>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="site-shell">
            <div className="section-heading">
              <div>
                <span className="eyebrow">LOCAL POWER SUPPORT</span>
                <h2>Start with the site,<br /><span>load and duty.</span></h2>
              </div>
              <p className="lead">For a useful first discussion, share the location, application, estimated capacity, loads and required timing.</p>
            </div>
            <div className="card-grid card-grid-3">
              <article className="service-card-modern"><h3>Generator supply</h3><p>Discuss generator options for commercial, industrial and standby applications, with capacity and configuration matched to the actual load.</p><Link className="card-link" to="/services/generator-sales">Generator sales and supply <span>↗</span></Link></article>
              <article className="service-card-modern"><h3>Service and repair</h3><p>Share the generator model, symptoms, alarm information and service history so a repair or maintenance requirement can be assessed properly.</p><Link className="card-link" to="/services/generator-repair">Generator repair support <span>↗</span></Link></article>
              <article className="service-card-modern"><h3>Temporary power</h3><p>Plan rental requirements around the load, operating period, placement, delivery access and electrical connection arrangement.</p><Link className="card-link" to="/services/generator-rental">Generator rental solutions <span>↗</span></Link></article>
            </div>
          </div>
        </section>
        <section className="dark-section section">
          <div className="site-shell">
            <span className="eyebrow">NB ENGINEERING &amp; SERVICES</span>
            <h2 className="display">Based in Tarnol,<br /><em>supporting Pakistan.</em></h2>
            <p className="lead">Tarnol, Islamabad, Pakistan. Monday–Saturday, 09:00–18:00.</p>
            <Link className="button button-primary" to="/contact">Discuss your requirement <span>↗</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
