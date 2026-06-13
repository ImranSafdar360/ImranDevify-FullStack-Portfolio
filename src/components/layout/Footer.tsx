import Link from "next/link";

const PAGE_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "AI Workflow", href: "#ai-workflow" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/imran-safdar/" },
  { label: "GitHub", href: "https://github.com/ImranSafdar360/" },
  { label: "X", href: "https://x.com/Imransafdar777/" },
  { label: "Email", href: "mailto:imransafdar360@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="container">
        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          <div className="flex-1">
            <Link
              href="/"
              className="font-sans text-base font-medium tracking-[-0.01em]"
            >
              <span className="text-text">Imran</span>
              <span className="text-text-muted"> Safdar</span>
            </Link>
            <p className="mt-2 font-mono text-mono-xs uppercase text-text-subtle">
              AI-Product Engineer · Lahore, PK
            </p>
          </div>

          <div className="flex-1">
            <h3 className="mb-4 font-mono text-mono-xs uppercase text-text-subtle">
              Pages
            </h3>
            <ul className="flex flex-col gap-3">
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-small text-text-muted transition-colors duration-150 hover:text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="mb-4 font-mono text-mono-xs uppercase text-text-subtle">
              Find me
            </h3>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="font-mono text-mono-xs uppercase text-text-subtle transition-colors duration-150 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center font-mono text-mono-xs uppercase text-text-subtle">
            © 2026 Imran Safdar · Built with Next.js and Claude
          </p>
        </div>
      </div>
    </footer>
  );
}
