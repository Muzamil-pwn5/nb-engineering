import { Link } from "react-router-dom";

function ServiceCard({
  title,
  description,
  image,
  slug,
}) {
  return (
    <article className="service-card">
      <Link
        to={`/services/${slug}`}
        className="service-card-link"
        aria-label={`View ${title}`}
      >
        <div className="service-image">
          <img
            src={image}
            alt={title}
          />
        </div>

        <div className="service-content">
          <h3>{title}</h3>

          <p>{description}</p>
        </div>
      </Link>
    </article>
  );
}

export default ServiceCard;