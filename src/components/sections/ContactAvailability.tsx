type ContactChannel = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  primary?: boolean;
};

const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    value: "To be connected",
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
    value: "Pending",
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
        </header>

        <section className="contact__audiences" aria-labelledby="contact-audiences-title">
          <h3 id="contact-audiences-title" className="sr-only">Ways to work together</h3>
          <ul>
            {audiences.map(({ label, description }) => (
              <li key={label}>
                <p className="contact__audience-label text-meta">{label}</p>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <nav className="contact__channels" aria-labelledby="contact-channels-title">
          <h3 id="contact-channels-title" className="text-meta">
            Contact routes
          </h3>
          <ul>
            {contactChannels.map(({ label, value, href, external, primary }) => (
              <li id={label === "Resume" ? "resume" : undefined} key={label}>
                <p className="text-meta">{label}</p>
                {href ? (
                  <a
                    className={primary ? "contact__channel-link contact__channel-link--primary" : "contact__channel-link"}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                  >
                    {value} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className={primary ? "contact__channel-label contact__channel-label--primary" : "contact__channel-label"}>
                    {value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* TODO: connect the primary contact action when a real email is supplied. */}
        <span className="contact__primary-action">Let&apos;s talk</span>
      </div>
    </section>
  );
}
