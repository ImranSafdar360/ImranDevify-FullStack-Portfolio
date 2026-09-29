const workflows = ["Onboarding", "Discovery", "Chat", "Calling", "Subscription"];

const keySystems = [
  "Multi-step onboarding",
  "Real-time chat",
  "Audio / video calling",
  "Subscriptions",
];

const technologies = ["Next.js", "Redux Toolkit", "Socket.io", "Agora", "Stripe"];

function ProductWorkflow() {
  return (
    <div className="ybd-workflow" aria-labelledby="ybd-workflow-label">
      <p id="ybd-workflow-label" className="ybd-project__label text-meta">
        Product workflows
      </p>

      <ol className="ybd-workflow__list">
        {workflows.map((workflow) => (
          <li className="text-meta" key={workflow}>
            <span>{workflow}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function WebProductPlaceholder() {
  return (
    <div className="ybd-visual" aria-hidden="true">
      <p className="ybd-visual__label text-meta">Web product visual</p>
      <div className="ybd-visual__panel ybd-visual__panel--utility" />
      <div className="ybd-visual__panel ybd-visual__panel--primary">
        <span className="text-meta">Primary application</span>
      </div>
      <div className="ybd-visual__panel ybd-visual__panel--secondary">
        <span className="text-meta">Secondary state</span>
      </div>
    </div>
  );
}

function InformationList({ items }: { items: string[] }) {
  return (
    <ul className="ybd-project__list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function YourBusinessDateProject() {
  return (
    <section
      id="your-business-date"
      className="ybd-project"
      aria-labelledby="ybd-title"
    >
      <div className="container ybd-project__layout">
        <header className="ybd-project__header">
          <p className="ybd-project__index text-meta">02</p>

          <h2 id="ybd-title" className="ybd-project__title">
            <span>Your</span>
            <span>Business</span>
            <span>Date</span>
          </h2>

          <div className="ybd-project__context">
            <p className="text-meta">Web SaaS product engineering · 2024</p>
            <p className="text-meta">Frontend engineering / SaaS</p>
          </div>
        </header>

        <div className="ybd-project__focus">
          <p className="ybd-project__label text-meta">Engineering focus</p>
          <p className="ybd-project__summary text-body-large">
            Frontend engineering across onboarding, real-time communication and
            subscription-driven product workflows.
          </p>
        </div>

        <WebProductPlaceholder />
        <ProductWorkflow />

        <div className="ybd-project__systems">
          <p className="ybd-project__label text-meta">Key systems</p>
          <InformationList items={keySystems} />
        </div>

        <div className="ybd-project__technology">
          <p className="ybd-project__label text-meta">Technology</p>
          <InformationList items={technologies} />
        </div>

        <a className="ybd-project__link text-meta" href="#your-business-date">
          View case study <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
