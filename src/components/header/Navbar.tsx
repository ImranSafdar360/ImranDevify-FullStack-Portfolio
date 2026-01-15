"use client";

import CardNav from "./CardNav";
import Logo from "./Logo";
// import logo from "./logo.svg";

export default function Navbar() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "#" },
        { label: "Careers", ariaLabel: "About Careers", href: "#" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "#" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "#" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Email",
          ariaLabel: "Email us",
          href: "mailto:hello@example.com",
        },
        { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com" },
        {
          label: "LinkedIn",
          ariaLabel: "LinkedIn",
          href: "https://linkedin.com",
        },
      ],
    },
  ];

  return (
    <CardNav
      logo={<Logo />}
      isComponentLogo={true}
      logoAlt="Company Logo"
      items={items}
      baseColor="#262626"
      menuColor="#fff"
      buttonBgColor="#fff"
      buttonTextColor="#000"
      ease="power3.out"
    />
  );
}
