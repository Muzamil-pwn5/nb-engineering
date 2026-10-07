import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import apiRequest from "../api/client.js";
import { Reveal, SpotlightCard, Stagger, staggerItem } from "../ui/MotionPrimitives.jsx";
import { ATS_TRANSFER_IMAGE, GENERATOR_IMAGE, PARTS_STOCK_IMAGE } from "../ui/media.js";
import "./JourneySection.css";

const fallbackSectors = [
  { name: "Banks / Financial", description: "Power infrastructure for banking and financial operations." },
  { name: "Embassies / Diplomatic", description: "Dependable power support for diplomatic facilities." },
  { name: "Hotels / Hospitality", description: "Power systems supporting hospitality and guest operations." },
  { name: "Healthcare", description: "Generator and electrical support for healthcare environments." },
  { name: "Corporate / Commercial", description: "Power solutions for commercial and business facilities." },
  { name: "Government / Public Sector", description: "Infrastructure support across public-sector facilities." },
];
const journeySteps = [
  { no: "01", title: "Understand the load", text: "We start with the operation, not a catalogue. Capacity, duty cycle, site and risk shape the brief.", href: "/contact" },
  { no: "02", title: "Build the solution", text: "Generation, ATS/AMF automation and electrical support come together as one working system.", href: "/generators" },
  { no: "03", title: "Commission with care", text: "Installation, changeover and operational checks turn equipment into dependable infrastructure.", href: "/services" },
  { no: "04", title: "Stay ready", text: "Maintenance, parts and responsive technical support keep the system useful after handover.", href: "/services/generator-maintenance" },
];

export default function JourneySection() {
  const [sectors, setSectors] = useState(fallbackSectors);
  const [stats, setStats] = useState(null);
  useEffect(() => { apiRequest("/experience").then((data) => { if (data?.sectors?.length) setSectors(data.sectors); if (data?.stats) setStats(data.stats); }).catch(() => {}); }, []);
  return <section className="journey-section" id="experience"><div className="site-shell"><div className="journey-intro"><Reveal><div><span className="eyebrow">03 / NB’s journey</span><h2>Power across<br /><em>real operations.</em></h2></div></Reveal><Reveal delay={.12}><div><p className="journey-kicker">Experience is not a number on a wall. It is the ability to understand what must keep working when the main supply does not.</p>{stats?.organizations ? <div className="journey-live-stat"><strong>{stats.organizations}+</strong><span>organizations represented in our live field data</span></div> : <div className="journey-live-stat"><strong>01 → 04</strong><span>from first brief to long-term support</span></div>}</div></Reveal></div><div className="journey-image-row"><Reveal direction="left"><Link className="journey-feature-image tile-link" to="/generators"><img src={GENERATOR_IMAGE} alt="Industrial generator system" /><span>01 / Generation</span></Link></Reveal><Reveal><Link className="journey-feature-copy tile-link" to="/services"><span className="eyebrow">The footprint</span><h3>Every environment changes the story.</h3><p>Our original experience module mapped the sectors where reliable power matters most. That thinking stays at the heart of NB: understand the environment, then engineer the right response.</p><div className="pill-list">{sectors.map((sector) => <span className="pill" key={sector.name}>{sector.name}</span>)}</div></Link></Reveal></div><Stagger className="journey-steps">{journeySteps.map((step) => <motion.div key={step.no} variants={staggerItem}><SpotlightCard className="journey-step"><span>{step.no}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><Link className="card-link" to={step.href}>Explore this step <span>↗</span></Link></SpotlightCard></motion.div>)}</Stagger><div className="journey-bottom-grid"><Reveal><Link className="journey-panel-image tile-link" to="/services/ats-panels"><img src={ATS_TRANSFER_IMAGE} alt="ATS and AMF changeover panel" /><span>02 / Automation</span></Link></Reveal><Reveal delay={.12}><Link className="journey-panel-image tile-link" to="/spare-parts"><img src={PARTS_STOCK_IMAGE} alt="Generator parts and service stock" /><span>03 / Support</span></Link></Reveal></div></div></section>;
}
