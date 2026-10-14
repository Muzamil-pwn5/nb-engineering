import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SEO from "../components/SEO.jsx";
import { articles, articleSlugRedirects, getArticle } from "../data/articles.js";
import { routeSeo } from "../seoRoutes.js";
import "./Articles.css";

function ArticleCard({ article, number }) {
  return (
    <article className="guide-card">
      <span className="guide-card-number">{String(number).padStart(2, "0")}</span>
      <span className="guide-kicker">{article.category}</span>
      <h2><Link to={`/guides/${article.slug}`}>{article.title}</Link></h2>
      <p>{article.description}</p>
      <Link className="guide-read-link" to={`/guides/${article.slug}`}>Read the guide <span aria-hidden="true">↗</span></Link>
    </article>
  );
}

export function ArticlesIndex() {
  return (
    <div className="site-page guide-page">
      <SEO title="Generator Guides & Practical Advice | NB Engineering" description="Practical, plain-English guides to choosing, installing, maintaining and troubleshooting generators and power systems." />
      <Navbar />
      <main>
        <header className="guide-hero">
          <div className="site-shell guide-hero-inner">
            <Link className="guide-back" to="/">NB Engineering & Services</Link>
            <p className="eyebrow">FIELD NOTES / POWER SYSTEMS</p>
            <h1>Useful answers<br /><em>before you decide.</em></h1>
            <p className="guide-hero-copy">Straightforward guides for choosing a generator, planning a site, keeping equipment maintained and asking better questions. Written to help with the real decision—not just repeat a product description.</p>
          </div>
        </header>
        <section className="guide-list section">
          <div className="site-shell">
            <div className="guide-list-heading"><div><span className="eyebrow">THE GUIDE LIBRARY</span><h2>Start with what<br />you need to solve.</h2></div><p>Generator selection depends on the loads, duty and installation. These guides explain what to check and where a qualified site review is important.</p></div>
            <div className="guide-grid">{articles.map((article, index) => <ArticleCard key={article.slug} article={article} number={index + 1} />)}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const redirectedSlug = articleSlugRedirects[slug];
  if (redirectedSlug) return <Navigate to={`/guides/${redirectedSlug}`} replace />;
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="site-page guide-page">
        <SEO title="Guide not found | NB Engineering" description="This guide could not be found. Browse practical generator and power-system guides." />
        <Navbar />
        <main className="guide-not-found site-shell"><span className="eyebrow">404 / GUIDE NOT FOUND</span><h1>That guide isn’t here.</h1><p>Try the guide library for practical information about generators and power systems.</p><Link className="button button-ink" to="/guides">Browse all guides <span>↗</span></Link></main>
        <Footer />
      </div>
    );
  }

  const articleText = [article.title, article.intro, article.takeaway, ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs])].join(" ");
  const readingMinutes = Math.max(1, Math.ceil(articleText.split(/\s+/).length / 220));
  const pageSeo = routeSeo[`/guides/${slug}`];

  return (
    <div className="site-page guide-page">
      <SEO title={pageSeo.title} description={pageSeo.description} />
      <Navbar />
      <main>
        <header className="guide-article-hero">
          <div className="site-shell guide-article-hero-inner">
            <nav className="guide-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/guides">Guides</Link><span aria-hidden="true">/</span><span>{article.category}</span></nav>
            <p className="eyebrow">{article.category.toUpperCase()} / NB ENGINEERING FIELD NOTES</p>
            <h1>{article.title}</h1>
            <p className="guide-article-intro">{article.intro}</p>
            <span className="guide-reading-note">About {readingMinutes} min read <span aria-hidden="true">·</span> NB Engineering field notes</span>
          </div>
        </header>
        <article className="guide-article-body site-shell">
          <div className="guide-article-main">
            {article.sections.map((section, index) => (
              <section className="guide-article-section" key={section.heading}>
                <span className="guide-section-number">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <aside className="guide-takeaway"><span className="eyebrow">THE SHORT VERSION</span><p>{article.takeaway}</p></aside>
            <div className="guide-article-actions">
              {article.related && <Link className="button button-ink" to={article.related.href}>{article.related.label} <span>↗</span></Link>}
              <Link className="button button-outline" to="/contact">Ask us about your requirement <span>↗</span></Link>
            </div>
          </div>
          <aside className="guide-article-aside"><span className="eyebrow">KEEP EXPLORING</span><h2>More practical guides.</h2><ul>{articles.filter((item) => item.slug !== article.slug).slice(0, 5).map((item) => <li key={item.slug}><Link to={`/guides/${item.slug}`}>{item.title}<span aria-hidden="true">↗</span></Link></li>)}</ul><Link className="guide-aside-all" to="/guides">All guides <span aria-hidden="true">→</span></Link></aside>
        </article>
      </main>
      <Footer />
    </div>
  );
}
