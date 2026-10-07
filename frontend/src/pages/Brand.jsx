import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { BlurIn, Reveal, SpotlightCard, Stagger, staggerItem } from "../ui/MotionPrimitives.jsx";
import { GENERATOR_IMAGE } from "../ui/media.js";
import { motion } from "motion/react";
import "../ui/site.css";

const brands = [
  { name: "Cummins", country: "United States", image: "/images/generators/cummins-c110d5.jpg", text: "A globally recognized power-generation brand for commercial, industrial, standby and critical-power applications." },
  { name: "FG Wilson", country: "United Kingdom", image: "/images/generators/fg-wilson-p180p2-180kva.jpeg", text: "Diesel generator sets for standby, prime and industrial power applications across a wide range of capacities." },
  { name: "Perkins", country: "United Kingdom", image: "/images/generators/perkins-1104a-generator.jpg", text: "A long-established engine brand widely used in generator sets and industrial power-generation equipment." },
  { name: "Caterpillar", country: "United States", image: "/images/generators/cat-c18-generator.jpg", text: "Heavy-duty generator sets designed for standby, prime and continuous power requirements." },
  { name: "Kubota", country: "Japan", image: "/images/generators/doosan-g80xw.jpg", text: "Compact, efficient diesel engine technology suited to dependable power equipment and practical installations." },
  { name: "John Deere", country: "United States", image: "/images/generators/jcb-g150rs-v.jpg", text: "Recognized diesel power technology for demanding applications where durability and serviceability matter." },
];

export default function Brand() {
  return <div className="site-page"><Navbar /><main><section className="page-hero"><div className="page-hero-media"><img src={GENERATOR_IMAGE} alt="100 kVA Caterpillar generator" /></div><div className="site-shell page-hero-content"><Reveal><span className="eyebrow">04 / Trusted equipment</span></Reveal><BlurIn><h1 className="display">Power from the<br /><em>right names.</em></h1></BlurIn><Reveal delay={.15}><p className="lead">We work with established generator and engine brands to help customers choose equipment that matches the site, the duty and the risk of downtime.</p></Reveal><Reveal delay={.2}><Link className="button button-primary" to="/generators">Browse generator systems <span>↗</span></Link></Reveal></div></section><section className="section"><div className="site-shell"><div className="section-heading"><Reveal><div><span className="eyebrow">Our brand network</span><h2>Recognized names.<br /><span>Practical selection.</span></h2></div></Reveal><Reveal delay={.1}><p className="lead">The brand is important. The fit is more important. Our job is to connect both.</p></Reveal></div><Stagger className="card-grid card-grid-4">{brands.map((brand, index) => <motion.div key={brand.name} variants={staggerItem}><SpotlightCard className="service-card-modern"><span className="card-no">0{index + 1} / {brand.country}</span><img src={brand.image} alt={`${brand.name} power equipment`} style={{ height: 170, width: "100%", objectFit: "cover", filter: "saturate(.65)", margin: "25px 0 8px" }} /><div><h3>{brand.name}</h3><p>{brand.text}</p></div><Link className="card-link" to="/generators">View compatible systems <span>↗</span></Link></SpotlightCard></motion.div>)}</Stagger></div></section><section className="dark-section section"><div className="site-shell detail-layout"><Reveal><div><span className="eyebrow">The useful part</span><h2 className="display">A brand list is<br /><em>only the start.</em></h2></div></Reveal><Reveal delay={.12}><div><p className="lead">We help translate brand, model and capacity into a system that is actually right for the application — with service and support after the sale.</p><Link className="button button-primary" to="/contact">Talk equipment with us <span>↗</span></Link></div></Reveal></div></section></main><Footer /></div>;
}
