// Contact details and links used by the nav and footer.
// Static until the Settings collection exists (tasks/todo.md T9); values come from the profile brief.
export const SITE = {
  name: 'Imran Safdar',
  shortName: 'Imran',
  timeZone: 'Asia/Karachi',
  location: 'Lahore, PKT',
  emails: {
    hiring: 'imransafdar360@gmail.com',
    projects: 'imranguru360@gmail.com',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/imran-safdar/',
    github: 'https://github.com/ImranSafdar360',
    resume: '/resume.pdf',
  },
  nav: [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
} as const
