import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, delay = 0, className = "", direction = "up" }) {
  const reduce = useReducedMotion();
  const offset = reduce ? 0 : direction === "left" ? -24 : direction === "right" ? 24 : 28;
  return <motion.div className={className} initial={{ opacity: 0, x: offset, y: direction === "up" ? offset : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function BlurIn({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, filter: reduce ? "blur(0px)" : "blur(12px)", y: reduce ? 0 : 18 }} whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay, ease: "easeOut" }}>{children}</motion.div>;
}

export function Stagger({ children, className = "" }) {
  return <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>{children}</motion.div>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const staggerItem = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export function SpotlightCard({ children, className = "" }) {
  return <motion.article className={`spotlight-card ${className}`} whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: "easeOut" }}>{children}</motion.article>;
}

export function Marquee({ items, className = "" }) {
  return <div className={`marquee ${className}`}><div className="marquee-track">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<i>·</i></span>)}</div></div>;
}
