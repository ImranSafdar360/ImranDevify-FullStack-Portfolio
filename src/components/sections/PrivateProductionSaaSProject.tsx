const engineeringWork = [
  "Feature development",
  "Production debugging",
  "Payments / subscriptions",
  "Frontend / backend coordination",
  "Deployment issues",
];

const workingEnvironment = [
  "Existing system",
  "Production code",
  "Branches / pull requests",
  "Ongoing iteration",
];

const contributionSurfaces = [
  { label: "Feature development", modifier: "feature" },
  { label: "Payments / subscriptions", modifier: "payments" },
  { label: "Integrations", modifier: "integrations" },
  { label: "Frontend ↔ backend", modifier: "coordination" },
  { label: "Debugging", modifier: "debugging" },
  { label: "Deployment", modifier: "deployment" },
];

function RepresentativeEngineeringVisual() {
  return (
    <figure
      className="private-saas-visual"
      aria-labelledby="private-saas-visual-label"
    >
      <figcaption
        className="private-saas-visual__caption"
      >
        <span id="private-saas-visual-label" className="private-saas-visual__label text-meta">
          Production engineering surfaces
        </span>
        <span className="private-saas-visual__clarification text-meta">
          High-level representation — not client architecture
        </span>
      </figcaption>

      <div className="private-saas-map" aria-hidden="true">
        <div className="private-saas-system">
          <span className="private-saas-system__context text-meta">
            Client system / Anonymized
          </span>
          <span className="private-saas-system__label text-meta">
            Existing production SaaS
          </span>
        </div>

        {contributionSurfaces.map(({ label, modifier }) => (
          <div
            className={`private-saas-module private-saas-module--${modifier}`}
            key={label}
          >
            <span className="private-saas-module__label text-meta">{label}</span>
          </div>
        ))}

        {contributionSurfaces.map(({ modifier }) => (
          <span
            className={`private-saas-connector private-saas-connector--${modifier}`}
            key={`connector-${modifier}`}
          />
        ))}
      </div>
    </figure>
  );
}

function InformationRows({ items }: { items: string[] }) {
  return (
    <ul className="private-saas-info__rows">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function PrivateProductionSaaSProject() {
  return (
    <section
      id="private-production-saas"
      className="private-saas-project"
      aria-labelledby="private-saas-title"
    >
      <div className="container private-saas-project__layout">
        <header className="private-saas-project__header">
          <p className="private-saas-project__index text-meta">03</p>
          <p className="private-saas-project__meta text-meta">
            Current client work · 2026—present
          </p>

          <h2 id="private-saas-title" className="private-saas-project__title">
            <span>Private</span>
            <span>Production</span>
            <span>SaaS.</span>
          </h2>

          <div className="private-saas-project__context">
            <p className="text-meta">Production product engineering</p>
            <p className="text-meta">Client work / Details anonymized</p>
          </div>
        </header>

        <RepresentativeEngineeringVisual />

        <div className="private-saas-info">
          <div className="private-saas-info__context">
            <p className="private-saas-label text-meta">Work context</p>
            <p className="private-saas-info__summary text-body-large">
              Ongoing engineering inside an existing production SaaS with
              interconnected features and real production constraints.
            </p>
          </div>

          <div className="private-saas-info__work">
            <p className="private-saas-label text-meta">Engineering work</p>
            <InformationRows items={engineeringWork} />
          </div>

          <div className="private-saas-info__environment">
            <p className="private-saas-label text-meta">Working in</p>
            <InformationRows items={workingEnvironment} />
          </div>

          {/* TODO: connect a publishable engineering overview when client constraints allow. */}
          <span className="private-saas-project__link text-meta">
            Engineering overview / Private
          </span>
        </div>
      </div>
    </section>
  );
}
