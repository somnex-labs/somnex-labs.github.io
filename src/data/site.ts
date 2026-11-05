export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about_us', label: 'About' },
  { href: '/vision', label: 'Vision' },
  { href: '/contact', label: 'Contact' },
];

export const footer = [
  { title: 'The Team', links: [{ href: '/our-team', label: 'Our Team' }, { href: '/governance', label: 'Governance' }] },
  { title: 'Resources', links: [{ href: '/documentation', label: 'Documentation' }, { href: '/blog', label: 'Blog' }, { href: '/releases', label: 'Releases' }] },
  { title: 'Careers', links: [{ href: '/join-the-team', label: 'Join the Team' }, { href: '/mission', label: 'Mission' }] },
  { title: 'Legal', links: [{ href: '/privacy-policy', label: 'Privacy Policy' }, { href: '/terms-of-use', label: 'Terms of Use' }] },
];

export const teams = [
  { name: 'Software', color: 'var(--lime)', blurb: 'Building the experiences, interfaces, and intelligent systems that power our products.' },
  { name: 'Hardware', color: 'var(--cyan)', blurb: 'Designing and integrating the sensing, display, and device layers that make immersive workflows possible.' },
  { name: 'Business', color: 'var(--pink)', blurb: 'Connecting product direction with partnerships, operations, and long-term growth.' },
] as const;
