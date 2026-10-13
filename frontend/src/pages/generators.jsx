import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { BlurIn, Reveal, SpotlightCard, Stagger, staggerItem } from "../ui/MotionPrimitives.jsx";
import { HERO_IMAGE } from "../ui/media.js";
import { getGenerators } from "../api/generators.js";
import { motion } from "motion/react";
import "../ui/site.css";

const localImages = {
  "fg-wilson-p110-3": "/images/refresh/generator-100kva-commercial.webp",
  "fg-wilson-p180p2-180kva": "/images/refresh/generator-180kva-industrial.webp",
  "cummins-c110d5": "/images/refresh/generator-100kva-commercial.webp",
  "cummins-180kva": "/images/refresh/generator-180kva-industrial.webp",
  "cat-c18-generator": "/images/refresh/generator-500kva-powerhouse.webp",
  "perkins-1104a-generator": "/images/refresh/generator-control-room.webp",
  "iveco-aifo-100kva": "/images/refresh/generator-100kva-commercial.webp",
  "jcb-g200rs-v": "/images/refresh/generator-250kva-project.webp",
};
const fallback = [
  { id: "local-1", name: "FG Wilson P110-3 Diesel Generator", slug: "fg-wilson-p110-3", brand: { name: "FG Wilson" }, kva: 110, kw: 88, fuel_type: "Diesel", is_available: true, description: "110 kVA diesel generator for dependable commercial and standby power." },
  { id: "local-2", name: "Cummins C110D5 Generator", slug: "cummins-c110d5", brand: { name: "Cummins" }, kva: 110, kw: 88, fuel_type: "Diesel", is_available: true, description: "Compact 110 kVA Cummins system for commercial and critical backup applications." },
  { id: "local-3", name: "Caterpillar C18 Generator", slug: "cat-c18-generator", brand: { name: "Caterpillar" }, kva: 500, kw: 400, fuel_type: "Diesel", is_available: true, description: "High-capacity Caterpillar power for demanding industrial operations." },
  { id: "local-4", name: "FG Wilson P180P2 Generator", slug: "fg-wilson-p180p2-180kva", brand: { name: "FG Wilson" }, kva: 180, kw: 144, fuel_type: "Diesel", is_available: true, description: "180 kVA generator for commercial, industrial and prime-power requirements." },
  { id: "local-5", name: "Perkins 1104A Generator", slug: "perkins-1104a-generator", brand: { name: "Perkins" }, kva: 60, kw: 48, fuel_type: "Diesel", is_available: true, description: "Reliable 60 kVA Perkins-powered generator for standby requirements." },
  { id: "local-6", name: "JCB G200RS-V Generator", slug: "jcb-g200rs-v", brand: { name: "JCB" }, kva: 200, kw: 160, fuel_type: "Diesel", is_available: true, description: "200 kVA JCB generator for commercial, construction and temporary power." },
];
const brandOf = (g) => g.brand?.name || ["FG Wilson", "Cummins", "Caterpillar", "Perkins", "Doosan", "JCB"].find((b) => g.name?.toLowerCase().includes(b.toLowerCase())) || "Power system";
const imageFor = (g) => {
  if (localImages[g.slug]) return localImages[g.slug];
  const kva = Number(g.kva || 0);
  if (kva >= 400) return "/images/refresh/generator-500kva-powerhouse.webp";
  if (kva >= 220) return "/images/refresh/generator-250kva-project.webp";
  if (kva >= 150) return "/images/refresh/generator-180kva-industrial.webp";
  if (kva >= 100) return "/images/refresh/generator-100kva-commercial.webp";
  return "/images/refresh/generator-control-room.webp";
};

export default function Generators() {
  const [items, setItems] = useState(fallback);
  const [brand, setBrand] = useState("ALL");
  const [loading, setLoading] = useState(true);
  useEffect(() => { getGenerators().then((data) => { const records = Array.isArray(data) ? data : data?.value; if (records?.length) setItems(records); }).catch(() => {}).finally(() => setLoading(false)); }, []);
  const brands = useMemo(() => ["ALL", ...new Set(items.map(brandOf))], [items]);
  const filtered = items.filter((g) => brand === "ALL" || brandOf(g) === brand);
  return <div className="site-page"><Navbar /><main><section className="page-hero"><div className="page-hero-media"><img fetchPriority="high" decoding="async" src={HERO_IMAGE} alt="Uncanopied three-phase diesel generator" /></div><div className="site-shell page-hero-content"><Reveal><span className="eyebrow">03 / Generator range</span></Reveal><BlurIn><h1 className="display">Find the right<br /><em>power profile.</em></h1></BlurIn><Reveal delay={.15}><p className="lead">Explore real generator systems from 60 kVA through 500 kVA and beyond. Share the load and we’ll help narrow the range.</p></Reveal><Reveal delay={.2}><div className="stats-row"><div className="stat"><strong>60–500+</strong><span>KVA shown</span></div><div className="stat"><strong>6</strong><span>Generator options</span></div></div></Reveal></div></section><section className="section"><div className="site-shell"><div className="section-heading"><Reveal><div><span className="eyebrow">Catalogue / {loading ? "Loading live data" : `${filtered.length} systems`}</span><h2>Equipment that<br /><span>fits the operation.</span></h2></div></Reveal><Reveal delay={.1}><p className="lead">Filter by brand, compare capacities and open a detail page for technical information.</p></Reveal></div><div className="pill-list" style={{ marginBottom: 30 }}>{brands.map((b) => <button key={b} className="pill" onClick={() => setBrand(b)} style={{ background: brand === b ? "var(--nb-pink)" : "transparent", color: brand === b ? "var(--nb-white)" : "var(--nb-pink)", cursor: "pointer" }} aria-pressed={brand === b} aria-label={`Filter generators by ${b}`}>{b}</button>)}</div><Stagger className="card-grid card-grid-4">{filtered.map((g, index) => <motion.div key={g.id || g.slug || index} variants={staggerItem}><SpotlightCard className="service-card-modern"><img src={imageFor(g)} alt={g.name} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = localImages["cat-c18-generator"]; }} style={{ height: 150, objectFit: "cover", margin: "-24px -24px 20px", width: "calc(100% + 48px)" }} /><span className="card-no">{brandOf(g)} / {g.kva || "—"} KVA</span><div><h3>{g.name}</h3><p>{g.description || `${g.fuel_type || "Diesel"} generator system for application-led power requirements.`}</p></div><Link className="card-link" to={`/generators/${g.slug || "diesel-generator"}`}>Technical details <span>↗</span></Link></SpotlightCard></motion.div>)}</Stagger></div></section><section className="dark-section section"><div className="site-shell"><Reveal><span className="eyebrow">Not sure what you need?</span><h2 className="display">Start with the<br /><em>load.</em></h2><p className="lead">Send us the application, estimated load and duty cycle. We’ll help turn the question into a practical shortlist.</p><Link className="button button-primary" to="/contact">Contact the team <span>↗</span></Link></Reveal></div></section></main><Footer /></div>;
}
