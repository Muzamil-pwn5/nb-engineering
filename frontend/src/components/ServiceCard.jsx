function ServiceCard({ number, title, description, image }) {
  return (
    <article className="service-card">
      <div className="service-image">
        <img src={image} alt={title} />
        <span className="service-number">{number}</span>
      </div>

      <div className="service-content">
        <h3>{title}</h3>
        <p>{description}</p>

        <a href="#contact" className="service-link">
          Learn More →
        </a>
      </div>
    </article>
  );
}

export default ServiceCard;