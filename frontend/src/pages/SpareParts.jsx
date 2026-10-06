import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./SpareParts.css";

const parts = [
  {
    number: "01",
    title: "Filters & service kits",
    text: "Oil, fuel and air filtration components for scheduled servicing and cleaner engine operation.",
  },
  {
    number: "02",
    title: "Belts, hoses & cooling",
    text: "Practical replacement components for cooling systems, drive assemblies and everyday wear points.",
  },
  {
    number: "03",
    title: "Electrical components",
    text: "Batteries, sensors, relays and control components for reliable starts and stable operation.",
  },
  {
    number: "04",
    title: "Engine & generator parts",
    text: "Support for engine-side and alternator-side replacement requirements across common generator brands.",
  },
];

function SpareParts() {
  return (
    <div className="parts-page">
      <Navbar />
      <main>
        <section className="parts-hero">
          <div className="parts-hero-grid" aria-hidden="true" />
          <div className="parts-shell parts-hero-content">
            <span className="parts-kicker">GENERATOR SUPPORT / 04</span>
            <h1>Keep every<br /><span>system ready.</span></h1>
            <p>
              Source the replacement parts and service essentials that help your
              generator stay dependable between scheduled maintenance visits.
            </p>
            <div className="parts-actions">
              <Link to="/contact" className="parts-button parts-button-primary">Request a part <span>↗</span></Link>
              <Link to="/services/generator-maintenance" className="parts-button parts-button-ghost">Explore maintenance</Link>
            </div>
          </div>
          <div className="parts-hero-meta parts-shell"><span>ISLAMABAD / PAKISTAN</span><span>PARTS · SUPPORT · SERVICE</span></div>
        </section>

        <section className="parts-intro parts-shell">
          <div className="parts-index"><span>01</span><i /><em>WHAT WE SUPPLY</em></div>
          <div className="parts-intro-grid">
            <h2>Parts that match<br /><span>the work.</span></h2>
            <p>Tell us the generator make, model, capacity and required component. Our team will help identify the practical replacement for your system.</p>
          </div>
        </section>

        <section className="parts-catalog parts-shell">
          <div className="parts-catalog-head"><span className="parts-kicker">CATEGORIES</span><span>Built around uptime</span></div>
          <div className="parts-grid">
            {parts.map((part) => (
              <article className="parts-card" key={part.number}>
                <span className="parts-card-number">{part.number}</span>
                <div><h3>{part.title}</h3><p>{part.text}</p></div>
                <Link to="/contact" aria-label={`Request ${part.title}`}>Request a quote <span>↗</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="parts-cta parts-shell">
          <div><span className="parts-kicker">NEED HELP IDENTIFYING A PART?</span><h2>Send us the details.<br /><span>We’ll take it from there.</span></h2></div>
          <Link to="/contact" className="parts-button parts-button-primary">Talk to the power team <span>↗</span></Link>
        </section>
      </main>
    </div>
  );
}

export default SpareParts;
