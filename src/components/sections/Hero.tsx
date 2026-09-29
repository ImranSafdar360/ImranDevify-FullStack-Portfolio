export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__meta hero__meta--name text-meta">PORTFOLIO / 2026</div>
        <div className="hero__meta hero__meta--location text-meta">
          Lahore, PK <span aria-hidden="true">→</span> Remote
        </div>

        <h1 id="hero-title" className="hero__title text-mega">
          <span>SaaS / Product</span>
          <span>Engineer.</span>
        </h1>

        <p className="hero__statement text-body-large">
          Product-minded engineer building production web and mobile software.
        </p>

        <p className="hero__availability text-meta">Available for remote product roles</p>
        <a className="hero__work-link text-meta" href="#work">
          View selected work <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
