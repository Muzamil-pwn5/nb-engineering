import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import "../ui/site.css";
import "./Navbar.css";

const items = [{ label: "Services", path: "/services" }, { label: "Generators", path: "/generators" }, { label: "ATS / AMF", path: "/services/ats-panels" }, { label: "Brands", path: "/brands" }];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // Close the persistent mobile panel after navigation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [location.pathname]);
  return <header className="modern-nav"><div className="modern-nav-inner"><Link to="/" className="modern-logo"><img src="/logo-mark.png" alt="NB Engineering & Services" /><span><strong>NB ENGINEERING</strong><small>& SERVICES</small></span></Link><nav className="modern-nav-links">{items.map((item) => <Link key={item.path} className={location.pathname.startsWith(item.path) ? "active" : ""} to={item.path}>{item.label}</Link>)}</nav><div className="modern-nav-actions"><Link className="nav-quote" to="/contact">Get a quote <span>↗</span></Link><button className="nav-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? "Close" : "Menu"}</button></div></div><AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}>{items.map((item) => <Link key={item.path} to={item.path}>{item.label}</Link>)}<Link className="nav-quote" to="/contact">Get a quote <span>↗</span></Link></motion.nav>}</AnimatePresence></header>;
}
