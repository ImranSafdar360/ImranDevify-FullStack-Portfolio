// Site structure (not content). Contact details, links and availability live in Settings (src/schemas/settings.ts).
export const SITE = {
  name: 'Imran Safdar',
  shortName: 'Imran',
  nav: [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
} as const
