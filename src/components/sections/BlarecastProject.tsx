const technologies = ["React Native", "Supabase", "Stripe", "Track Player"];

function ProjectVisualPlaceholder() {
  return (
    <div className="project-visual" aria-hidden="true">
      <p className="project-visual__label text-meta">Product visual / Mobile</p>
      <div className="project-visual__frame project-visual__frame--left" />
      <div className="project-visual__frame project-visual__frame--main">
        <span className="text-meta">Main mobile visual</span>
      </div>
      <div className="project-visual__frame project-visual__frame--right" />
    </div>
  );
}

export function BlarecastProject() {
  return (
    <section id="blarecast" className="featured-project" aria-labelledby="blarecast-title">
      <div className="container">
        <header className="featured-project__header">
          <p className="featured-project__index text-meta">01</p>

          <div className="featured-project__identity">
            <h2 id="blarecast-title">Blarecast</h2>
            <p className="text-meta">Mobile product engineering · 2025</p>
          </div>

          <p className="featured-project__role text-meta">Product engineering / Mobile</p>
        </header>

        <ProjectVisualPlaceholder />

        <div className="featured-project__details">
          <div className="featured-project__focus">
            <p className="featured-project__label text-meta">Engineering focus</p>
            <p className="featured-project__summary text-body-large">
              Mobile product engineering across authentication, payments and audio playback architecture.
            </p>
          </div>

          <div className="featured-project__technology">
            <p className="featured-project__label text-meta">Technology</p>
            <ul>
              {technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>

          {/* TODO: connect the published Blarecast case study when available. */}
          <span className="featured-project__link text-meta">Case study / Pending</span>
        </div>
      </div>
    </section>
  );
}
