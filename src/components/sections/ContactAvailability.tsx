const contactChannels = [
  {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    primary: true,
  },
  {
    label: "LinkedIn",
    value: "View profile",
    href: "https://www.linkedin.com/in/imran-safdar",
    external: true,
  },
  {
    label: "GitHub",
    value: "View code",
    href: "https://github.com/imran-safdar",
    external: true,
  },
  {
    label: "Resume",
    value: "View / Pending",
    href: "#resume",
  },
];

const audiences = [
  {
    label: "Remote product roles",
    description: "Foreign / international product teams",
  },
  {
    label: "Selected SaaS work",
    description: "Founders / product teams",
  },
];

export function ContactAvailability() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container contact__layout">
        <header className="contact__intro">
          <p className="contact__eyebrow text-meta">Contact / Availability</p>
          <h2 id="contact-title" className="contact__title">
            <span>Let&apos;s Build</span>
            <span>Something Useful.</span>
          </h2>
          <p className="contact__statement text-body-large">
            Open to strong remote product-engineering opportunities and selected SaaS product
            work.
          </p>
          <p className="contact__status text-meta">
            Available for remote opportunities / Selected product work
          </p>
        </header>

        <div className="contact__audiences" aria-label="Ways to work together">
          {audiences.map(({ label, description }) => (
            <div key={label}>
              <p className="contact__audience-label text-meta">{label}</p>
              <p>{description}</p>
            </div>
          ))}
        </div>

        <nav className="contact__channels" aria-labelledby="contact-channels-title">
          <h3 id="contact-channels-title" className="text-meta">
            Contact routes
          </h3>
          <ul>
            {contactChannels.map(({ label, value, href, external, primary }) => (
              <li id={label === "Resume" ? "resume" : undefined} key={label}>
                <p className="text-meta">{label}</p>
                <a
                  className={primary ? "contact__channel-link contact__channel-link--primary" : "contact__channel-link"}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                >
                  {value} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* TODO: replace the temporary wireframe email when the final address is supplied. */}
        <a className="contact__primary-action" href="mailto:hello@example.com">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
