import { Link } from "react-router-dom";
import "../ui/site.css";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594814075420&mibextid=ZbWKwL",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4.5c-.52-.07-1.68-.17-3.2-.17-3.17 0-5.34 1.93-5.34 5.48V13H5v3.91h3.46V24h4.25v-7.09h3.52l.56-3.91h-4.08V10.2c0-1.13.31-2.2 1.29-2.2Z" /></svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@shahmanmubarak",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 3c.26 2.1 1.45 3.35 3.6 3.48v3.13a8.2 8.2 0 0 1-3.57-1.02v6.62A5.73 5.73 0 1 1 10.5 9.5v3.2a2.55 2.55 0 1 0 2.72 2.51V3h2.18Z" /></svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923335405708",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.25a9.72 9.72 0 0 0-8.36 14.68L2.2 21.8l5.02-1.4A9.74 9.74 0 1 0 12 2.25Zm0 17.68a7.93 7.93 0 0 1-4.05-1.1l-.29-.18-2.98.83.84-2.9-.19-.3a7.93 7.93 0 1 1 6.67 3.65Zm4.35-5.96c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.18-1.39-1.32-1.63-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.01.4 1.36.51.57.18 1.09.15 1.5.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" /></svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer-modern">
      <div className="site-shell footer-grid">
        <div className="footer-intro">
          <div className="footer-brand">NB ENGINEERING<span> & SERVICES</span></div>
          <p className="footer-brand-copy">Reliable power systems, generator supply, service support and technical solutions for operations that cannot stop.</p>
          <Link className="button button-primary" to="/contact">Start a power conversation <span>↗</span></Link>
          <div className="footer-direct">
            <a href="tel:+923205636673" aria-label="Call NB Engineering">Call NB <span>+92 320 563 6673</span></a>
            <a href="mailto:nbengineerings@gmail.com?subject=NB%20Engineering%20power%20inquiry" aria-label="Email NB Engineering">Email NB <span>nbengineerings@gmail.com</span></a>
          </div>
          <div className="footer-socials" aria-label="Social media links">
            {socialLinks.map((social) => (
              <a key={social.label} className="footer-social" href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Open NB Engineering on ${social.label}`} title={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div><h3>Solutions</h3><Link to="/generators">Generators</Link><Link to="/services">Services</Link><Link to="/services/ats-panels">ATS / AMF automation</Link><Link to="/brands">Brands</Link></div>
        <div><h3>Support</h3><Link to="/services/generator-maintenance">Maintenance</Link><Link to="/services/generator-repair">Repair</Link><Link to="/spare-parts">Spare parts</Link><Link to="/contact">Request a quote</Link></div>
        <div><h3>Find us</h3><Link to="/contact">Contact us</Link><a href="tel:+923205636673">+92 320 563 6673</a><a href="mailto:nbengineerings@gmail.com?subject=NB%20Engineering%20power%20inquiry">nbengineerings@gmail.com</a><span className="footer-location">Tarnol, Islamabad<br />Pakistan</span></div>
      </div>
      <div className="site-shell footer-bottom"><span>© {new Date().getFullYear()} NB Engineering & Services</span><span>Power systems for the real world.</span></div>
    </footer>
  );
}
