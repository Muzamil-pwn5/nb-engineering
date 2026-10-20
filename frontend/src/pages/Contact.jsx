import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import LocalBusinessSection from "../components/LocalBusinessSection.jsx";
import { BlurIn, Reveal } from "../ui/MotionPrimitives.jsx";
import "../ui/site.css";

export default function Contact() {
  return (
    <div className="site-page">
      <Navbar />
      <main>
        <section className="dark-section section contact-intro">
          <div className="site-shell detail-layout">
            <div>
              <Reveal>
                <span className="eyebrow">05 / Let’s talk power</span>
              </Reveal>
              <BlurIn>
                <h1 className="display">
                  What do you
                  <br />
                  <em>need to power?</em>
                </h1>
              </BlurIn>
              <Reveal delay={0.15}>
                <p className="lead">
                  Call or email NB Engineering directly for generator supply,
                  service support, rental power and technical guidance.
                </p>
              </Reveal>
              <div className="contact-direct">
                <a href="tel:+923205636673">
                  <small>Call directly</small>
                  <strong>+92 320 563 6673</strong>
                  <span>Open phone app ↗</span>
                </a>
                <a href="mailto:nbengineerings@gmail.com?subject=NB%20Engineering%20power%20requirement">
                  <small>Email the team</small>
                  <strong>nbengineerings@gmail.com</strong>
                  <span>Open email app ↗</span>
                </a>
              </div>
              <p className="contact-location">
                Tarnol, Islamabad, Pakistan
                <br />
                Monday–Saturday / 09:00–18:00
              </p>
            </div>
            <Reveal direction="right">
              <div className="contact-card contact-direct-card">
                <span className="eyebrow">Direct contact only</span>
                <h2>Speak with the team.</h2>
                <p>
                  We do not collect contact details through this website. Use
                  the phone or email links to start a conversation directly.
                </p>
                <div className="button-row">
                  <a className="button button-primary" href="tel:+923205636673">
                    Call NB Engineering <span>↗</span>
                  </a>
                  <a
                    className="button button-outline"
                    href="mailto:nbengineerings@gmail.com?subject=NB%20Engineering%20power%20requirement"
                  >
                    Send email <span>↗</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <LocalBusinessSection compact />
        <section className="section">
          <div className="site-shell">
            <Reveal>
              <div className="section-heading">
                <div>
                  <span className="eyebrow">A direct line</span>
                  <h2>
                    Good power starts
                    <br />
                    <span>with a clear conversation.</span>
                  </h2>
                </div>
                <p className="lead">
                  When you call or email, include the approximate capacity,
                  application, location and whether you need a new, used,
                  rental, repair or maintenance solution.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
