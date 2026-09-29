const stages = [
  {
    index: "01",
    time: "2023",
    title: "Learning / Building Foundation",
    context: "Foundation / Self-directed",
    summary:
      "Self-directed learning, project building and the transition from tutorials into real implementation.",
    evidence: ["Learning through building", "Frontend foundations", "Real implementation"],
    modifier: "foundation",
  },
  {
    index: "02",
    time: "Early professional experience",
    title: "Beyonds Logic",
    context: "Frontend / React",
    evidence: ["First client delivery", "Existing codebases", "UI / bug fixes / features"],
    projects: ["E-Axon", "React Panelist", "Sit Down Members"],
    modifier: "beyonds",
  },
  {
    index: "03",
    time: "Dec 2024 → Apr 2026",
    title: "Codart Technologies",
    context: "Frontend → Product Engineering",
    evidence: [
      "Web SaaS",
      "Real-time product work",
      "React Native",
      "Production product development",
    ],
    projects: ["Your Business Date", "Blarecast"],
    modifier: "codart",
  },
  {
    index: "04",
    time: "2026 → Now",
    title: "Independent SaaS Product Engineering",
    context: "Current client work / Production SaaS",
    evidence: [
      "Ongoing feature work",
      "Payments / subscriptions",
      "Production debugging",
      "Integrations",
      "Existing systems",
    ],
    modifier: "current",
  },
];

export function ExperienceProgression() {
  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="container">
        <header className="experience__intro">
          <p className="experience__eyebrow text-meta">Experience / Progression</p>
          <h2 id="experience-title" className="experience__title">
            <span>From Learning</span>
            <span>To Production.</span>
          </h2>
          <p className="experience__statement text-body-large">
            A progression from frontend foundations to product and production engineering.
          </p>
        </header>

        <div className="experience__timeline">
          <ol>
            {stages.map(({ index, time, title, context, summary, evidence, projects, modifier }) => (
              <li className={`experience__milestone experience__milestone--${modifier}`} key={index}>
                <div className="experience__milestone-body">
                  <div className="experience__milestone-meta text-meta">
                    <span>{index}</span>
                    <span>{time}</span>
                  </div>

                  <h3>{title}</h3>
                  <p className="experience__milestone-context text-meta">{context}</p>

                  {summary ? <p className="experience__milestone-summary">{summary}</p> : null}

                  <ul className="experience__evidence">
                    {evidence.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {projects ? (
                    <div className="experience__projects">
                      <p className="text-meta">Project references</p>
                      <ul>
                        {projects.map((project) => (
                          <li key={project}>{project}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <span className="experience__marker" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
