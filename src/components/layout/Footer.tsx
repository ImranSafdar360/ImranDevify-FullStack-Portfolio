const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/imran-safdar" },
  { label: "GitHub", href: "https://github.com/imran-safdar" },
  { label: "X", href: "https://x.com/imransafdar" },
];

export function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <h2>Imran Safdar</h2>
            <p className="text-meta">SaaS / Product engineer</p>
          </div>

          <nav className="site-footer__social" aria-label="Social links">
            <p className="site-footer__label text-meta">Elsewhere</p>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__place">
            <div>
              <p className="site-footer__label text-meta">Location</p>
              <p className="site-footer__value">Lahore, Pakistan</p>
            </div>
            <div>
              <p className="site-footer__label text-meta">Status</p>
              <p className="site-footer__value">Working remotely</p>
            </div>
          </div>
        </div>

        <p className="site-footer__masthead" aria-label="Imran Safdar">
          <span>Imran</span> <span>Safdar</span>
        </p>

        <div className="site-footer__bottom">
          <p className="text-meta">© 2026</p>
          <p className="site-footer__dev text-meta">Portfolio V3 / System</p>
          <a className="text-meta" href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
