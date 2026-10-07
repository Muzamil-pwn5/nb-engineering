import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const sections = [
  ["privacy-scope", "Scope and controller"],
  ["privacy-information", "Information collected"],
  ["privacy-use", "Use of information"],
  ["privacy-storage", "Cookies and storage"],
  ["privacy-sharing", "Third-party services"],
  ["privacy-rights", "Your choices"],
];

export default function PrivacyPolicy() {
  return (
    <div className="site-page legal-page">
      <Navbar />
      <main id="privacy-policy">
        <section className="legal-masthead" aria-labelledby="privacy-title">
          <div className="site-shell legal-shell">
            <div>
              <span className="eyebrow">Legal document / 01</span>
              <h1 id="privacy-title">Privacy Policy</h1>
              <p>How NB Engineering &amp; Services collects, uses and protects information submitted through this website.</p>
            </div>
            <dl className="legal-meta">
              <div><dt>Effective date</dt><dd>7 October 2026</dd></div>
              <div><dt>Applies to</dt><dd>nbengineering.com</dd></div>
              <div><dt>Jurisdiction</dt><dd>Pakistan</dd></div>
            </dl>
          </div>
        </section>
        <section className="legal-document section" aria-labelledby="privacy-document-title">
          <div className="site-shell legal-layout">
            <aside className="legal-sidebar" aria-label="Privacy policy sections">
              <span>Contents</span>
              <nav>{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
              <div className="legal-sidebar-contact"><span>Need to ask about your data?</span><a href="mailto:nbengineerings@gmail.com">Email us</a></div>
            </aside>
            <article className="legal-article" aria-labelledby="privacy-document-title">
              <header className="legal-intro">
                <p className="legal-kicker">NB Engineering &amp; Services</p>
                <h2 id="privacy-document-title">Privacy notice</h2>
                <p>This Privacy Policy explains the information handled by NB Engineering &amp; Services when you browse this website or submit an inquiry. It applies to the website and its contact forms.</p>
              </header>

              <section id="privacy-scope" className="legal-section"><h2>1. Scope and controller</h2><p>NB Engineering &amp; Services is a generator and power-systems business based in Tarnol, Islamabad, Pakistan. In this policy, “NB Engineering”, “we”, “us” and “our” mean NB Engineering &amp; Services.</p></section>
              <section id="privacy-information" className="legal-section"><h2>2. Information collected</h2><p>If you submit an inquiry, we may receive your name, phone number, email address, selected service, message, and any other details you choose to provide. Basic technical information may also be processed by the hosting service to deliver the website.</p></section>
              <section id="privacy-use" className="legal-section"><h2>3. Use of information</h2><p>We use inquiry information to respond to your request, prepare relevant guidance or quotations, coordinate services, provide support, and maintain reasonable business records. We do not sell inquiry information or use it for unrelated advertising.</p></section>
              <section id="privacy-storage" className="legal-section"><h2>4. Cookies and browser storage</h2><p>The website does not currently enable analytics or advertising cookies. It uses essential browser storage only to remember whether you have dismissed the privacy notice. You can clear that storage through your browser settings.</p></section>
              <section id="privacy-sharing" className="legal-section"><h2>5. Third-party services and links</h2><p>The website may link to phone, email, WhatsApp, social-media, hosting, or other third-party services. Those services operate under their own privacy policies. We are not responsible for the privacy practices or content of external websites.</p></section>
              <section id="privacy-retention" className="legal-section"><h2>6. Retention and security</h2><p>We retain inquiry information only for as long as reasonably needed to respond, provide services, maintain business records, or meet legal obligations. No internet transmission can be guaranteed to be completely secure, but we take reasonable steps to limit access to submitted information.</p></section>
              <section id="privacy-rights" className="legal-section"><h2>7. Your choices and contact</h2><p>You may ask what personal information we hold about an inquiry, request a correction, or ask us to delete information where we are not required to retain it. Contact <a href="mailto:nbengineerings@gmail.com">nbengineerings@gmail.com</a> or call <a href="tel:+923205636673">+92 320 563 6673</a>.</p></section>
              <section id="privacy-changes" className="legal-section"><h2>8. Changes to this policy</h2><p>We may update this policy when the website or our practices change. The effective date above identifies the current version.</p></section>

              <div className="legal-contact-card"><div><span className="legal-kicker">Questions</span><h2>Contact the business</h2></div><Link className="button button-primary" to="/contact">Contact NB Engineering <span aria-hidden="true">↗</span></Link></div>
              <p className="legal-disclaimer">This policy describes the current website practices and is not a substitute for legal advice tailored to your business.</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
