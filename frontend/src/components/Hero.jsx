function Hero() {
  return (
    <section className="hero" id="home">

      {/* Full-width hero image */}
      <div className="hero-image-wrapper">
        <div className="hero-image-frame">
          <img
            src="https://images.unsplash.com/photo-1705051278299-7e64ba21437a?auto=format&fit=crop&fm=jpg&q=85&w=2400"
            alt="Industrial diesel generator"
          />
        </div>

        <div className="hero-image-label">
          <span className="status-dot"></span>
          POWER GENERATION
        </div>
      </div>

      {/* Content remains inside the centered container */}
      <div className="hero-container">

        <div className="hero-content">

          <div className="hero-line"></div>

          <p className="hero-eyebrow">
            POWER GENERATION SOLUTIONS
          </p>

          <h1>
            Reliable Power.
            <br />
            <span>Lasting Solutions.</span>
          </h1>

          <p className="hero-description">
            NB Engineering & Services provides generator sales,
            rental, repair, maintenance, ATS panels, spare parts
            and complete power solutions.
          </p>

          <div className="hero-buttons">
            <a href="#generators" className="primary-button">
              Explore Generators
            </a>

            <a href="#services" className="secondary-button">
              Our Services
            </a>
          </div>

          <div className="hero-brands">
            <span>Specialized in</span>
            <strong>FG WILSON</strong>
            <strong>CUMMINS</strong>
            <strong>CAT</strong>
            <strong>PERKINS</strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;