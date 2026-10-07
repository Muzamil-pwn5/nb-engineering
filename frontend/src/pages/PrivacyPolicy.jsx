import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function PrivacyPolicy() {
  return (
    <div className="site-page legal-page">
      <Navbar />
      <main id="privacy-policy">
        <section className="section legal-hero" aria-labelledby="privacy-title">
          <div className="site-shell legal-shell">
            <span className="eyebrow">Legal / Privacy</span>
            <h1 id="privacy-title" className="display">Privacy<br /><em>policy.</em></h1>
            <p className="lead">How NB Engineering &amp; Services handles information shared through this website.</p>
            <p className="legal-updated">Last updated: 7 October 2026</p>
          </div>
        </section>
        <section className="section legal-content" aria-labelledby="privacy-content-title">
          <div className="site-shell legal-shell">
            <h2 id="privacy-content-title" className="sr-only">Privacy policy details</h2>
            <article className="legal-article">
              <h2>1. Who we are</h2>
              <p>NB Engineering &amp; Services is a generator and power-systems business based in Tarnol, Islamabad, Pakistan. In this policy, “NB Engineering”, “we”, “us” and “our” refer to NB Engineering &amp; Services.</p>

              <h2>2. Information you choose to share</h2>
              <p>When you submit an inquiry, we may receive your name, phone number, email address, selected service, message, and any other details you include. We use this information to respond to your request, prepare relevant guidance, and provide follow-up service.</p>

              <h2>3. How we use information</h2>
              <p>We use inquiry information only for customer communication, quotations, service coordination, support, and reasonable record-keeping related to your request. We do not sell inquiry information or use it for unrelated advertising.</p>

              <h2>4. Cookies and local storage</h2>
              <p>This website does not currently enable analytics or advertising cookies. It uses essential browser storage only to remember whether you have dismissed the cookie notice. You can clear that storage through your browser settings at any time.</p>

              <h2>5. Third-party services and links</h2>
              <p>The site may link to phone, email, WhatsApp, social-media, hosting, or other third-party services. Those services operate under their own privacy policies. We are not responsible for the privacy practices or content of external websites.</p>

              <h2>6. Retention and security</h2>
              <p>We keep inquiry information only for as long as reasonably needed to respond, provide services, maintain business records, or meet legal obligations. No internet transmission can be guaranteed to be completely secure, but we take reasonable steps to limit access to submitted information.</p>

              <h2>7. Your choices</h2>
              <p>You may ask what personal information we hold about an inquiry, request a correction, or ask us to delete information where we are not required to retain it. Contact us at <a href="mailto:nbengineerings@gmail.com">nbengineerings@gmail.com</a> or call <a href="tel:+923205636673">+92 320 563 6673</a>.</p>

              <h2>8. Changes to this policy</h2>
              <p>We may update this policy when our website or practices change. The updated date at the top of this page indicates when the latest version was published.</p>

              <p className="legal-note">This page describes the current website practices and is not a substitute for legal advice tailored to your business.</p>
              <Link className="button button-primary" to="/contact">Contact NB Engineering <span aria-hidden="true">↗</span></Link>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
