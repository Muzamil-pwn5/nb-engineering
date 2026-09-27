function Hero() {
  return (
    <section className="hero" id="home">
      {/* Full-width industrial generator photograph */}
      <div className="hero-image-wrapper">
        <div className="hero-image-frame">
          <img
            src="https://s7d2.scene7.com/is/image/Caterpillar/CM20190415-34be1-04810"
            alt="Caterpillar diesel generators in an industrial power room"
          />
        </div>
      </div>

      {/* Hero content */}
      <div className="hero-container">
        <div className="hero-content">

          <p className="hero-company">
            NB ENGINEERING &amp; SERVICES
          </p>

          <div className="hero-line"></div>

          <p className="hero-eyebrow">
            POWER GENERATION &amp; ELECTRICAL SOLUTIONS
          </p>

          <h1>
            POWER THAT KEEPS
            <br />
            <span>BUSINESS MOVING.</span>
          </h1>

          <p className="hero-description">
            Reliable generators, electrical systems and technical
            support engineered for commercial and industrial needs.
          </p>

        </div>
      </div>
    </section>
  );
}

export default Hero;