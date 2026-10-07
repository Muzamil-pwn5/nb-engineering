import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Terms() {
  return (
    <div className="site-page legal-page">
      <Navbar />
      <main id="terms-and-conditions">
        <section className="section legal-hero" aria-labelledby="terms-title">
          <div className="site-shell legal-shell">
            <span className="eyebrow">Legal / Terms</span>
            <h1 id="terms-title" className="display">Terms &amp;<br /><em>conditions.</em></h1>
            <p className="lead">The terms that apply when you use the NB Engineering &amp; Services website.</p>
            <p className="legal-updated">Last updated: 7 October 2026</p>
          </div>
        </section>
        <section className="section legal-content" aria-labelledby="terms-content-title">
          <div className="site-shell legal-shell">
            <h2 id="terms-content-title" className="sr-only">Terms and Conditions details</h2>
            <article className="legal-article">
              <h2>1. Website use</h2>
              <p>You may use this website for lawful purposes, to learn about our generator and power-system services, and to contact NB Engineering about a genuine business or service requirement.</p>

              <h2>2. Information on the site</h2>
              <p>Product descriptions, capacities, availability, images, prices, lead times, and service details are provided for general information and may change without notice. A website inquiry is not a purchase order, quotation acceptance, or contract for supply.</p>

              <h2>3. Inquiries and communications</h2>
              <p>You are responsible for providing accurate contact and requirement details. We may contact you using the information you submit in order to clarify an inquiry, prepare a quotation, or provide related support.</p>

              <h2>4. Intellectual property</h2>
              <p>Unless stated otherwise, the website design, text, branding, graphics, and original content belong to NB Engineering &amp; Services or are used with permission. Do not reproduce, modify, or commercially reuse website content without written permission.</p>

              <h2>5. External links</h2>
              <p>Links to external websites and communication services are provided for convenience. We do not control those websites and do not guarantee their availability, accuracy, security, or policies.</p>

              <h2>6. Availability and liability</h2>
              <p>We aim to keep the website accurate and available, but we do not guarantee that it will always be uninterrupted, error-free, or complete. To the extent permitted by law, NB Engineering &amp; Services is not liable for losses caused by reliance on general website information or temporary website unavailability.</p>

              <h2>7. Privacy</h2>
              <p>Information submitted through the website is handled as described in our <Link to="/privacy-policy">Privacy Policy</Link>.</p>

              <h2>8. Governing law</h2>
              <p>These website terms are intended to be governed by the applicable laws of Pakistan. Any commercial supply, installation, or service engagement may be governed by its own written quotation or contract.</p>

              <h2>9. Contact</h2>
              <p>Questions about these terms can be sent to <a href="mailto:nbengineerings@gmail.com">nbengineerings@gmail.com</a> or <a href="tel:+923205636673">+92 320 563 6673</a>.</p>

              <p className="legal-note">These website terms are general information and are not a substitute for legal advice.</p>
              <Link className="button button-primary" to="/contact">Ask a question <span aria-hidden="true">↗</span></Link>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
