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
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
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
