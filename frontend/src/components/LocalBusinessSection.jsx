import { Link } from "react-router-dom";
import { LOCAL_BUSINESS } from "../data/localBusiness.js";
import "./LocalBusinessSection.css";

export default function LocalBusinessSection({ compact = false }) {
  return (
    <section className={`local-business-section section${compact ? " local-business-section-compact" : ""}`}>
      <div className="site-shell">
        <div className="local-business-heading">
          <div>
            <span className="eyebrow">Find NB / Tarnol, Islamabad</span>
            <h2>Real support.<br /><span>Right where you need it.</span></h2>
          </div>
          <p className="lead">Visit the NB Engineering & Services base, check the public Google profile, or call directly to discuss your generator requirement.</p>
        </div>

        <div className="local-business-grid">
          <div className="local-business-card">
            <div className="local-business-card-top">
              <span className="local-business-pin" aria-hidden="true">NB</span>
              <div>
                <p className="local-business-kicker">Google Business profile</p>
                <h3>{LOCAL_BUSINESS.name}</h3>
                <p className="local-business-category">{LOCAL_BUSINESS.category}</p>
              </div>
            </div>

            <div className="local-business-rating" aria-label={`${LOCAL_BUSINESS.rating} stars from ${LOCAL_BUSINESS.reviewCount}`}>
              <strong>{LOCAL_BUSINESS.rating}</strong>
              <span className="local-business-stars" aria-hidden="true">★★★★★</span>
              <span>{LOCAL_BUSINESS.reviewCount}</span>
            </div>

            <p className="local-business-address">{LOCAL_BUSINESS.address}</p>
            <p className="local-business-hours">{LOCAL_BUSINESS.hours}</p>

            <div className="local-business-actions">
              <a className="button button-primary" href={LOCAL_BUSINESS.googleUrl} target="_blank" rel="noopener noreferrer">Open Google profile <span>↗</span></a>
              <a className="button button-outline-dark" href={`tel:${LOCAL_BUSINESS.phone.replaceAll(" ", "")}`}>Call NB <span>↗</span></a>
            </div>
            <Link className="local-business-text-link" to="/contact">Send a requirement <span>↗</span></Link>
          </div>

          <div className="local-business-map-wrap">
            <iframe
              className="local-business-map"
              title="NB Engineering & Services location in Tarnol, Islamabad"
              src={LOCAL_BUSINESS.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="local-business-map-caption">
              <span>Malik Market / Main G.T. Road / Tarnol</span>
              <a href={LOCAL_BUSINESS.googleUrl} target="_blank" rel="noopener noreferrer">Get directions <span>↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
