import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const sections = [
  ["terms-use", "Website use"],
  ["terms-content", "Site information"],
  ["terms-inquiries", "Inquiries"],
  ["terms-property", "Intellectual property"],
  ["terms-liability", "Availability and liability"],
  ["terms-law", "Governing law"],
];

export default function Terms() {
  return (
    <div className="site-page legal-page">
      <Navbar />
      <main id="terms-and-conditions">
        <section className="legal-masthead" aria-labelledby="terms-title">
          <div className="site-shell legal-shell">
            <div>
              <span className="eyebrow">Legal document / 02</span>
              <h1 id="terms-title">Terms &amp; Conditions</h1>
              <p>The terms that apply when you use the NB Engineering &amp; Services website.</p>
            </div>
            <dl className="legal-meta">
              <div><dt>Effective date</dt><dd>7 October 2026</dd></div>
              <div><dt>Applies to</dt><dd>nbengineering.com</dd></div>
              <div><dt>Jurisdiction</dt><dd>Pakistan</dd></div>
            </dl>
          </div>
        </section>
        <section className="legal-document section" aria-labelledby="terms-document-title">
          <div className="site-shell legal-layout">
            <aside className="legal-sidebar" aria-label="Terms and Conditions sections">
              <span>Contents</span>
              <nav>{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
              <div className="legal-sidebar-contact"><span>Have a question about these terms?</span><Link to="/contact">Contact us</Link></div>
            </aside>
            <article className="legal-article" aria-labelledby="terms-document-title">
              <header className="legal-intro">
                <p className="legal-kicker">NB Engineering &amp; Services</p>
                <h2 id="terms-document-title">Website terms</h2>
                <p>These terms govern access to and use of this website. By continuing to use the website, you agree to use it lawfully and in accordance with these terms.</p>
              </header>

              <section id="terms-use" className="legal-section"><h2>1. Website use</h2><p>You may use this website to learn about our generator and power-system services and to contact NB Engineering about a genuine business or service requirement. You must not use the website for unlawful, abusive, deceptive, or disruptive activity.</p></section>
              <section id="terms-content" className="legal-section"><h2>2. Information on the site</h2><p>Product descriptions, capacities, availability, images, prices, lead times, and service details are provided for general information and may change without notice. Website content does not constitute a purchase order, quotation acceptance, or supply contract.</p></section>
              <section id="terms-inquiries" className="legal-section"><h2>3. Inquiries and communications</h2><p>You are responsible for providing accurate contact and requirement details. We may contact you using the information submitted to clarify an inquiry, prepare a quotation, or provide related support. Any commercial engagement is subject to its own written quotation or contract.</p></section>
              <section id="terms-property" className="legal-section"><h2>4. Intellectual property</h2><p>Unless stated otherwise, the website design, text, branding, graphics, and original content belong to NB Engineering &amp; Services or are used with permission. Reproduction, modification, or commercial reuse requires written permission.</p></section>
              <section id="terms-links" className="legal-section"><h2>5. External links</h2><p>Links to external websites and communication services are provided for convenience. We do not control those websites and do not guarantee their availability, accuracy, security, or policies.</p></section>
              <section id="terms-liability" className="legal-section"><h2>6. Availability and liability</h2><p>We aim to keep the website accurate and available, but do not guarantee that it will always be uninterrupted, error-free, or complete. To the extent permitted by law, NB Engineering &amp; Services is not liable for losses caused by reliance on general website information or temporary website unavailability.</p></section>
              <section id="terms-privacy" className="legal-section"><h2>7. Privacy</h2><p>Information submitted through the website is handled as described in our <Link to="/privacy-policy">Privacy Policy</Link>.</p></section>
              <section id="terms-law" className="legal-section"><h2>8. Governing law</h2><p>These website terms are intended to be governed by the applicable laws of Pakistan. Any commercial supply, installation, or service engagement may be governed by its own written quotation or contract.</p></section>
              <section id="terms-contact" className="legal-section"><h2>9. Contact</h2><p>Questions about these terms can be sent to <a href="mailto:nbengineerings@gmail.com">nbengineerings@gmail.com</a> or <a href="tel:+923205636673">+92 320 563 6673</a>.</p></section>

              <div className="legal-contact-card"><div><span className="legal-kicker">Need clarification?</span><h2>Contact the business</h2></div><Link className="button button-primary" to="/contact">Ask a question <span aria-hidden="true">↗</span></Link></div>
              <p className="legal-disclaimer">These website terms are general information and are not a substitute for legal advice.</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
