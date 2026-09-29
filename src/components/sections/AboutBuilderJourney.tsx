const journeyStages = [
  { name: "Developer", descriptor: "Foundation" },
  { name: "Builder", descriptor: "Current", current: true },
  { name: "Founder", descriptor: "Direction" },
];

const currentFocus = [
  "Production SaaS Engineering",
  "Building / Learning in Public",
  "Product + Distribution Learning",
];

export function AboutBuilderJourney() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container about__layout">
        <header className="about__intro">
          <p className="about__eyebrow text-meta">About / Current chapter</p>
          <h2 id="about-title" className="about__title">
            <span>Code Was</span>
            <span>The Start.</span>
          </h2>
          <p className="about__statement text-body-large">
            Engineering is the foundation. Building products is becoming the bigger journey.
          </p>
        </header>

        <div className="about__narrative">
          <p>
            I started by learning how to build interfaces and ship software. Real product work
            gradually pushed me from frontend implementation toward understanding complete product
            systems.
          </p>
          <p>
            Now I am expanding beyond implementation — learning product thinking, communication,
            distribution and the skills required to become a stronger builder.
          </p>
        </div>

        <div className="about__journey" aria-labelledby="about-journey-title">
          <p id="about-journey-title" className="about__journey-label text-meta">
            Builder journey
          </p>
          <ol>
            {journeyStages.map(({ name, descriptor, current }) => (
              <li className={current ? "about__journey-stage about__journey-stage--current" : "about__journey-stage"} key={name}>
                <span className="about__journey-name">{name}</span>
                <span className="about__journey-state text-meta">{descriptor}</span>
              </li>
            ))}
          </ol>
        </div>

        <figure className="about__portrait" aria-hidden="true">
          <span className="text-meta">Portrait / Future</span>
        </figure>

        <div className="about__currently">
          <p className="text-meta">Currently</p>
          <ul>
            {currentFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
