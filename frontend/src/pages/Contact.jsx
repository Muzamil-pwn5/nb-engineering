import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./Contact.css";

const OFFICE_ADDRESS =
  "NB Engineering & Services, Malik Market, Main GT Rd, Tarnol, Islamabad, 44000, Pakistan";

const MAP_URL =
  "https://www.google.com/maps/dir//NB+Engineering+%26+Services,+Malik+market,+main+GT+Rd,+Tarnol,+Islamabad,+44000,+Pakistan/@33.6468497,72.9155687,18.31z/data=!4m8!4m7!1m0!1m5!1m1!1s0x38df970fb7218763:0xd46fb2048324944!2m2!1d72.9160736!2d33.6465619?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D";

const CONTACT_EMAIL = "nbengineeringservices@gmail.com";

const TEAM = [
  {
    role: "Chief Executive Officer",
    name: "Zeeshan Ali Wajid",
    phone: "+92 320 563 6673",
    phoneHref: "tel:+923205636673",
    initials: "ZA",
  },
  {
    role: "Vice President",
    name: "Asif Ali",
    phone: "+92 305 540 7970",
    phoneHref: "tel:+923055407970",
    initials: "AA",
  },
  {
    role: "Manager",
    name: "Shahman Mubarak",
    phone: "+92 322 586 4498",
    phoneHref: "tel:+923225864498",
    initials: "SM",
  },
];

const SERVICE_OPTIONS = [
  "Generator Sales",
  "Generator Purchase",
  "Generator Rental",
  "Generator Repair",
  "Generator Maintenance",
  "ATS Panels",
  "Spare Parts",
  "Canopy Work",
  "General Inquiry",
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const mailtoUrl = useMemo(() => {
    const subject = `Website Inquiry - ${form.service || "General Inquiry"}`;

    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [form]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      return;
    }

    setSubmitted(true);
    window.location.href = mailtoUrl;
  }

  return (
    <div className="contact-page">
      <Navbar />

      <main>
        <section className="contact-hero">
          <div className="contact-hero-overlay" />

          <div className="contact-hero-content">
            <span className="contact-eyebrow">NB ENGINEERING & SERVICES</span>

            <h1>
              Let&apos;s power your
              <span> next project.</span>
            </h1>

            <p>
              Talk to our team about generator sales, rental, repair,
              maintenance, ATS panels, spare parts, and power solutions.
            </p>

            <div className="contact-hero-actions">
              <a href="#contact-form" className="contact-primary-button">
                Send an Inquiry
              </a>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="contact-secondary-button"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="contact-hero-bottom">
            <span>Islamabad, Pakistan</span>
            <span className="hero-divider" />
            <span>Power Solutions & Generator Services</span>
          </div>
        </section>

        <section className="contact-intro section-shell">
          <div className="section-kicker">CONTACT US</div>

          <div className="intro-grid">
            <div>
              <h2>
                Speak directly with
                <span> our team.</span>
              </h2>
            </div>

            <div className="intro-copy">
              <p>
                Whether you need a generator, urgent technical support,
                scheduled maintenance, rental equipment, or spare parts,
                send us the requirements and our team can guide you toward the
                appropriate solution.
              </p>

              <a href={`mailto:${CONTACT_EMAIL}`} className="text-link">
                {CONTACT_EMAIL}
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="contact-info-section">
          <div className="section-shell">
            <div className="info-grid">
              <article className="info-card info-card-large">
                <div className="info-icon">⌖</div>

                <div>
                  <span className="info-label">OUR OFFICE</span>

                  <h3>Visit NB Engineering & Services</h3>

                  <p>{OFFICE_ADDRESS}</p>

                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="info-link"
                  >
                    Open in Google Maps <span>↗</span>
                  </a>
                </div>
              </article>

              <article className="info-card">
                <div className="info-icon">✉</div>

                <div>
                  <span className="info-label">EMAIL</span>

                  <h3>Send us your requirements</h3>

                  <p>
                    For quotations, service requests, technical questions, and
                    general business inquiries.
                  </p>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="info-link"
                  >
                    {CONTACT_EMAIL} <span>↗</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="team-section section-shell">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker">MANAGEMENT</div>

              <h2>
                Connect with
                <span> our leadership.</span>
              </h2>
            </div>

            <p>
              For direct business coordination, you can contact the relevant
              member of our management team.
            </p>
          </div>

          <div className="team-grid">
            {TEAM.map((member) => (
              <article className="team-card" key={member.name}>
                <div className="team-avatar">{member.initials}</div>

                <div className="team-details">
                  <span className="team-role">{member.role}</span>
                  <h3>{member.name}</h3>

                  <a href={member.phoneHref} className="team-phone">
                    {member.phone}
                  </a>
                </div>

                <a
                  href={member.phoneHref}
                  className="team-call"
                  aria-label={`Call ${member.name}`}
                >
                  ↗
                </a>
              </article>
            ))}
          </div>

          <div className="technical-team">
            <div>
              <span className="section-kicker">FIELD SUPPORT</span>
              <h3>Technical & Service Team</h3>
            </div>

            <p>
              Our technical and service team supports generator inspection,
              repair, maintenance, installation-related work, and on-site
              service requirements.
            </p>

            <a href="#contact-form" className="text-link">
              Request technical support <span>↗</span>
            </a>
          </div>
        </section>

        <section className="inquiry-section section-shell" id="contact-form">
          <div className="inquiry-grid">
            <div className="inquiry-copy">
              <div className="section-kicker">SEND AN INQUIRY</div>

              <h2>
                Tell us what
                <span> you need.</span>
              </h2>

              <p>
                Give us the basic requirements. For generator inquiries,
                include the approximate capacity, application, and whether you
                need a new, used, rental, repair, or maintenance solution.
              </p>

              <div className="quick-contact-list">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <span>EMAIL</span>
                  {CONTACT_EMAIL}
                </a>

                <a href="tel:+923205636673">
                  <span>CEO</span>
                  +92 320 563 6673
                </a>

                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>LOCATION</span>
                  Tarnol, Islamabad
                </a>
              </div>
            </div>

            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  <span>Your Name *</span>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </label>

                <label>
                  <span>Phone *</span>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 ..."
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>Email</span>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  <span>Service</span>

                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                  >
                    {SERVICE_OPTIONS.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                <span>Message *</span>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your generator or service requirement..."
                  rows="7"
                  required
                />
              </label>

              <div className="form-footer">
                <div>
                  <small>
                    Your email application will open with the inquiry prepared
                    for our team.
                  </small>

                  {submitted && (
                    <strong className="form-success">
                      Inquiry prepared successfully.
                    </strong>
                  )}
                </div>

                <button type="submit" className="submit-button">
                  Prepare Inquiry <span>↗</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="map-section">
          <div className="map-card">
            <div className="map-content">
              <span className="section-kicker">FIND US</span>

              <h2>
                Visit us in
                <span> Tarnol, Islamabad.</span>
              </h2>

              <p>{OFFICE_ADDRESS}</p>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="contact-primary-button"
              >
                Open Google Maps
              </a>
            </div>

            <div className="map-visual">
              <div className="map-grid" />

              <div className="map-pin">
                <span>NB</span>
              </div>

              <div className="map-label">
                <strong>NB Engineering & Services</strong>
                <small>Malik Market · Main GT Road</small>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-cta section-shell">
          <div>
            <span className="section-kicker">NEED A GENERATOR?</span>

            <h2>
              Explore our
              <span> generator solutions.</span>
            </h2>
          </div>

          <Link to="/generators" className="contact-primary-button">
            Browse Generators <span>↗</span>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Contact;
