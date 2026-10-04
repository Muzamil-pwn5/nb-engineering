function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-image-wrapper">
        <div className="hero-image-frame">
          <img
            src="/images/home/hero.jpeg"
            alt="Industrial generator at NB Engineering & Services"
          />
        </div>
      </div>

      {/* Dark readability gradient */}
      <div className="hero-text-gradient" aria-hidden="true"></div>

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

      <style>{`
        /* =========================================================
           HERO TEXT READABILITY
           ========================================================= */

        .hero-text-gradient {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: min(72%, 980px);
          z-index: 1;
          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(5, 8, 12, 0.84) 0%,
              rgba(5, 8, 12, 0.70) 32%,
              rgba(5, 8, 12, 0.42) 62%,
              rgba(5, 8, 12, 0) 100%
            );
        }

        /* =========================================================
           HERO TYPOGRAPHY
           ========================================================= */

        .hero-company {
          margin: 0 0 22px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 11px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .hero-line {
          width: 46px;
          height: 3px;
          margin-bottom: 19px;
          background: #e6b83a;
        }

        .hero-eyebrow {
          margin: 0 0 22px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 10px;
          line-height: 1.4;
          font-weight: 700;
          letter-spacing: 0.19em;
        }

        .hero-content h1 {
          max-width: 760px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(48px, 5.6vw, 76px);
          line-height: 0.98;
          font-weight: 700;
          letter-spacing: -0.055em;
        }

        /* Rich gold instead of flat yellow */
        .hero-content h1 span {
          background: linear-gradient(
            90deg,
            #f6d66a 0%,
            #e6b83a 42%,
            #d39b20 72%,
            #f0c653 100%
          );

          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .hero-description {
          max-width: 540px;
          margin: 27px 0 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 15px;
          line-height: 1.7;
          font-weight: 400;
        }

        /* =========================================================
           HERO MOBILE
           ========================================================= */

        @media (max-width: 768px) {
          .hero-text-gradient {
            width: 100%;

            background:
              linear-gradient(
                90deg,
                rgba(5, 8, 12, 0.86) 0%,
                rgba(5, 8, 12, 0.70) 52%,
                rgba(5, 8, 12, 0.28) 100%
              );
          }

          .hero-company {
            margin-bottom: 19px;
            font-size: 10px;
            letter-spacing: 0.14em;
          }

          .hero-line {
            width: 38px;
            height: 3px;
            margin-bottom: 17px;
          }

          .hero-eyebrow {
            max-width: 330px;
            margin-bottom: 19px;
            font-size: 9px;
            letter-spacing: 0.15em;
          }

          .hero-content h1 {
            max-width: 600px;
            font-size: clamp(40px, 10vw, 58px);
            line-height: 0.99;
            letter-spacing: -0.045em;
          }

          .hero-description {
            max-width: 430px;
            margin-top: 22px;
            font-size: 14px;
            line-height: 1.65;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: clamp(36px, 10.5vw, 50px);
          }

          .hero-description {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;