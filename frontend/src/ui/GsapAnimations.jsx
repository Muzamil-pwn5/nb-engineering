import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GsapAnimations() {
  const location = useLocation();

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    let context;
    try {
      context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.fromTo(".modern-nav", { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(".home-hero-media img, .page-hero-media img", { scale: 1.12 }, { scale: 1, duration: 1.5, ease: "power2.out" }, "<")
        .fromTo(".home-hero-content > *, .page-hero-content > *", { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=1");

      gsap.fromTo("main", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", overwrite: true });

      gsap.utils.toArray(".section-heading, .home-solution .detail-layout > *, .home-cta .site-shell, .contact-intro .detail-layout > *, .journey-intro, .journey-feature-copy").forEach((element) => {
        gsap.fromTo(element, { y: 55, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray(".proof-card, .service-card-modern, .category-card, .journey-step, .stats-row .stat, .contact-direct > a").forEach((group) => {
        gsap.fromTo(group, { y: 34, opacity: 0, scale: 0.97 }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray(".home-solution-image img, .category-card img, .journey-feature-image img, .journey-panel-image img, .page-hero-media img").forEach((image) => {
        gsap.to(image, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      document.querySelectorAll(".button, .nav-quote, .card-link").forEach((button) => {
        const xTo = gsap.quickTo(button, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.35, ease: "power3.out" });
        const move = (event) => {
          const bounds = button.getBoundingClientRect();
          xTo((event.clientX - (bounds.left + bounds.width / 2)) * 0.12);
          yTo((event.clientY - (bounds.top + bounds.height / 2)) * 0.12);
        };
        const leave = () => { xTo(0); yTo(0); };
        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", leave);
        context.add(() => {
          button.removeEventListener("pointermove", move);
          button.removeEventListener("pointerleave", leave);
        });
      });
      });
    } catch (error) {
      console.error("NB GSAP animation setup failed", error);
    }

    return () => context?.revert();
  }, [location.pathname]);

  return null;
}
