const capabilities = [
  {
    title: "Web product engineering",
    support: ["React", "Next.js", "TypeScript"],
    descriptor: "Responsive interfaces · Frontend architecture · Product workflows",
  },
  {
    title: "Backend & data",
    support: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB", "Supabase"],
    descriptor: "Business logic · API integration · Data-backed product systems",
  },
  {
    title: "Mobile product engineering",
    support: ["React Native", "Expo"],
    descriptor: "Cross-platform product implementation · Mobile integrations",
  },
  {
    title: "SaaS systems",
    support: [
      "Authentication",
      "Authorization / RBAC",
      "Payments",
      "Subscriptions",
      "Real-time functionality",
    ],
  },
  {
    title: "Production engineering",
    support: [
      "Existing systems",
      "Debugging",
      "Third-party integrations",
      "Deployment",
      "Production support",
    ],
  },
];

export function EngineeringCapabilities() {
  return (
    <section
      id="engineering-capabilities"
      className="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="container capabilities__inner">
        <header className="capabilities__intro">
          <p className="capabilities__eyebrow text-meta">Engineering capabilities</p>
          <h2 id="capabilities-title" className="capabilities__title">
            <span>What I</span>
            <span>Build With.</span>
          </h2>
          <p className="capabilities__statement text-body-large">
            Capabilities shaped through real product and production work.
          </p>
        </header>

        <ol className="capabilities__list">
          {capabilities.map(({ title, support, descriptor }, index) => (
            <li className="capabilities__row" key={title}>
              <span className="capabilities__index text-meta">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="capabilities__identity">
                <h3>{title}</h3>
                {descriptor ? <p>{descriptor}</p> : null}
              </div>

              <p className="capabilities__support">
                {support.join(" · ")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
