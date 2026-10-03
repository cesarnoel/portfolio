// =============================================================
//  Portfolio content — Cesar Noel Quiñon (CNSQ Dev)
//  Single source of truth for every section. All copy is sourced
//  from the live portfolio at https://cnsqwordpressengr.netlify.app
//  and the graphic-design gallery at
//  https://cnsqdesigns.netlify.app
// =============================================================

export const profile = {
  name: 'Cesar Noel Quiñon',
  brand: 'CNSQ Dev',
  initials: 'CN',
  role: 'Senior WordPress Engineer',
  greeting: "Hello, I'm Cesar Noel",
  available: "Have a WordPress project or need ongoing maintenance? Let's talk.",
  location: 'Davao City, Philippines',
  email: 'cnsqdesigns@gmail.com',
  replyNote: 'Responds to all inquiries as soon as possible',
  tagline:
    'Senior WordPress Engineer based in Davao City, Philippines. I build custom WordPress sites and WooCommerce stores, then keep them fast, secure, and running — so you can focus on the business instead of the website.',
  portrait: '/media/cesar-noel-quinon.jpg',
  portraitAlt: 'Portrait of Cesar Noel Quiñon',
  logo: '/media/cnsq-logo.png',
  logoMark: '/media/cnsq-logo-mark.png',
  sinceBadge: '15+ years experience',
  bio: [
    "Hi! I'm Cesar Noel Quiñon, a WordPress developer with more than 18 years of experience specializing in custom themes, WooCommerce stores, and ongoing maintenance for businesses in the Philippines.",
    'I build websites from the ground up. Custom themes, responsive layouts, and WooCommerce setups that work properly. When existing sites need fixing, I handle security hardening, speed optimization, and update management so owners can run their business instead.',
    'My 18-plus years in graphic design shape how I approach every build. Layout, typography, and image handling are part of the work, not an afterthought. That background covers web design, print, logos, and e-book covers.',
    "If you need a site built from scratch, fixes and upgrades on an existing one, or someone to handle ongoing maintenance and design work, get in touch and we can talk through what you need.",
  ],
  values: [
    'Custom WordPress websites, including theme development and responsive design',
    'Regular updates, troubleshooting and performance monitoring',
    'Security hardening and website speed optimization',
    'Content publishing assistance and client training',
  ],
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/engrcesarnoel/', icon: 'linkedin' },
    {
      label: 'Graphic Design Works',
      href: 'https://cnsqdesigns.netlify.app',
      icon: 'external',
    },
    { label: 'Email', href: 'mailto:cnsqdesigns@gmail.com', icon: 'mail' },
  ],
};

// Words cycled through by the hero typewriter
export const heroRoles = [
  'custom WordPress sites',
  'WooCommerce stores',
  'site maintenance',
  'ongoing support',
  'graphic design',
  'Webflow & Canva',
];

// Rendered in the hero's editor panel
export const codeSnippet = [
  'export const stack = {',
  "  cms: 'WordPress & WooCommerce',",
  "  language: 'PHP & MySQL',",
  "  style: 'HTML5 & CSS3',",
  "  design: 'Canva & Webflow',",
  '};',
];

export const stats = [
  { value: 18, suffix: '+', label: 'Years of WordPress development experience' },
  { value: 18, suffix: '+', label: 'Years of graphic design experience' },
  { value: 7, suffix: '', label: 'Featured development projects' },
  { value: 8, suffix: '', label: 'Graphic design pieces in the gallery' },
];

export const skillGroups = [
  {
    title: 'Core: WordPress builds and upkeep',
    icon: 'layers',
    skills: [
      { name: 'WordPress', level: 98 },
      { name: 'Theme customization', level: 95 },
      { name: 'PHP & MySQL', level: 92 },
      { name: 'WooCommerce', level: 88 },
    ],
  },
  {
    title: 'Core: Front-end and platforms',
    icon: 'code',
    skills: [
      { name: 'HTML5', level: 96 },
      { name: 'CSS3 & responsive design', level: 95 },
      { name: 'JavaScript', level: 85 },
      { name: 'Webflow', level: 80 },
    ],
  },
  {
    title: 'Core: Design and media',
    icon: 'sparkles',
    skills: [
      { name: 'Graphic design', level: 94 },
      { name: 'Canva', level: 92 },
      { name: 'Web design', level: 90 },
      { name: 'E-book & print design', level: 88 },
    ],
  },
];

export const projectsIntro = {
  eyebrow: 'Portfolio',
  title: 'Recent Development Projects',
  lead: "I keep WordPress sites running. Custom themes when a build needs to be done properly. Maintenance when updates, security, and speed are eating your week. Design work when the visual side matters. One person covering the full picture.",
};

// Verbatim service bullets from the live portfolio.
const buildAndMaintain = [
  'Responsive company site presented with a custom theme setup',
  'Scheduled updates plus troubleshooting when issues come up',
  'Publishing support and one-on-one walkthroughs for staff',
];

const maintainAndOptimize = [
  'Ongoing updates and fixes backed by uptime monitoring.',
  'Content publishing help and training when staff changes.',
  'Hardening and caching work aimed at stable load times.',
];

const demoBullets = [
  'Marketing-style layout showing page structure and calls to action.',
  'Security basics and image compression applied as a working example.',
];

const wordpressTags = ['WordPress', 'PHP / MySQL', 'CSS', 'Graphic Design'];

export const projects = [
  {
    id: 'aib-private-investigations',
    title: 'AIB Private Investigations',
    kind: 'Client website',
    image: '/media/projects/screenshot-1.jpg',
    tagline: 'Custom WordPress website for a private investigations firm, with ongoing maintenance and client training.',
    highlights: buildAndMaintain,
    tags: wordpressTags,
    links: { live: 'http://aib-inc.com' },
    cta: 'View Project',
  },
  {
    id: 'easy-math-skills',
    title: 'Easy Math Skills',
    kind: 'Client website',
    image: '/media/projects/screenshot-2.jpg',
    tagline: 'Custom WordPress website for a math tutoring service, with ongoing maintenance and client training.',
    highlights: [
      'Creating and customizing website using WordPress, including themes and responsive design',
      'Regular updates, troubleshooting, and performance monitoring',
      'Assisting with content publishing and training clients',
    ],
    tags: wordpressTags,
    links: { live: 'https://www.easymathskills.com/' },
    cta: 'View Project',
  },
  {
    id: 'twin-ports-dermatology',
    title: 'Twin Ports Dermatology',
    kind: 'Client website',
    image: '/media/projects/screenshot-3.jpg',
    tagline: 'WordPress maintenance for a dermatology practice: security hardening and speed work.',
    highlights: maintainAndOptimize,
    tags: wordpressTags,
    links: { live: 'https://www.twinportsderm.com/' },
    cta: 'View Project',
  },
  {
    id: 'zen-medical',
    title: 'Zen Medical',
    kind: 'Client website',
    image: '/media/projects/screenshot-5.jpg',
    tagline: 'WordPress maintenance for a medical clinic site: security hardening and speed work.',
    highlights: maintainAndOptimize,
    tags: wordpressTags,
    links: { live: 'https://www.zenamedical.com/' },
    cta: 'View Project',
  },
  {
    id: 'cool-spa',
    title: 'Cool Spa',
    kind: 'Client website',
    image: '/media/projects/screenshot-6.jpg',
    tagline: 'WordPress maintenance for a spa and wellness business: security hardening and speed work.',
    highlights: maintainAndOptimize,
    tags: wordpressTags,
    links: { live: 'https://www.coolspa.com/' },
    cta: 'View Project',
  },
  {
    id: 'demo-mobile-app',
    title: 'Demo Mobile App',
    kind: 'Demo build',
    image: '/media/projects/screenshot-9.jpg',
    tagline: 'Demo application website designed and built with Webflow and Canva imagery.',
    highlights: demoBullets,
    tags: ['Webflow', 'Canva (Images)', 'Demo'],
    links: { live: 'https://sample-application-website.webflow.io/' },
    cta: 'View Demo',
  },
  {
    id: 'demo-ecommerce',
    title: 'Demo E-Commerce Site',
    kind: 'Demo build',
    image: '/media/projects/screenshot-10.jpg',
    tagline: 'Demo online store built with WordPress, WooCommerce and Canva imagery.',
    highlights: demoBullets,
    tags: ['WordPress', 'WooCommerce', 'Canva (Images)', 'Demo'],
    links: { live: 'https://dev-wooconmmerce-kadence.pantheonsite.io/' },
    cta: 'View Demo',
  },
];

// Graphic Design Works — content from the companion gallery
// (https://cnsqdesigns.netlify.app). Only genuine client/design
// pieces are shown below: stock Canva template fills (hero banner, portfolio
// sample photos, abstract backgrounds, the fox illustration, section header
// art and the contact photo) are intentionally excluded.
export const designWorks = {
  eyebrow: 'Graphic Design Works',
  title: 'Web design, print design and e-book design',
  lead: "I'm a Graphic Designer based in Davao City, Philippines. I have over 18 years of experience in the various fields of graphic design.",
  intro:
    'I am passionate about all aspects of graphic design and consider myself well-rounded in all fields, particularly web design, print design, and e-book design.',
  services: [
    {
      title: 'Web design',
      icon: 'code',
      description:
        'Design of personal and professional web pages for clients in the various industries.',
    },
    {
      title: 'Graphic design',
      icon: 'sparkles',
      description: 'Graphic design for a client in various digital marketing industry.',
    },
    {
      title: 'E-book design',
      icon: 'layers',
      description: 'Creating E-book and E-book covers for Clients.',
    },
  ],
  galleryUrl: 'https://cnsqdesigns.netlify.app',
  images: [
    {
      src: '/media/designs/web-design-coffee-site.jpg',
      alt: 'Coffee shop website design with latte art, menu and delivery panels by Cesar Noel Quiñon',
    },
    {
      src: '/media/designs/web-design-coffee-cafe.jpg',
      alt: 'Coffee Café website design with menu and locations panels by Cesar Noel Quiñon',
    },
    {
      src: '/media/designs/print-design-cupcake-logo.png',
      alt: "Jeanie's Cupcakes logo design with pink cupcake illustration by Cesar Noel Quiñon",
    },
    {
      src: '/media/designs/print-design-cupcake-banner.png',
      alt: "Jeanie's Cupcakes banner artwork with pink cupcake and ribbon by Cesar Noel Quiñon",
    },
    {
      src: '/media/designs/logo-arc-professionals.jpg',
      alt: 'ARC Professionals logo — Applied Research and Collaboration by Cesar Noel Quiñon',
    },
    {
      src: '/media/designs/illustration-fox.jpg',
      alt: 'Colorful graffiti-style fox illustration by Cesar Noel Quiñon',
    },
    {
      src: '/media/designs/ebook-getting-started-electronics.jpg',
      alt: 'Getting Started With Electronics e-book cover design by Cesar Noel Quiñon',
    },
    {
      src: '/media/designs/ebook-get-any-guy-you-want.jpg',
      alt: 'Get Any Guy You Want e-book cover design by Cesar Noel Quiñon',
    },
  ],
};

export const experience = [
  {
    role: 'Senior WordPress Engineer',
    company: 'Independent — client & agency projects',
    period: '2011 — Present',
    location: 'Davao City, Philippines',
    summary:
      'Custom WordPress websites, theme development and robust maintenance solutions for businesses.',
    bullets: [
      'Creating and customizing websites using WordPress, including themes and responsive design',
      'Regular updates, troubleshooting and performance monitoring',
      'Implementing security measures and optimizing website speed',
      'Assisting with content publishing and training clients',
    ],
    stack: ['WordPress', 'PHP / MySQL', 'WooCommerce', 'CSS'],
  },
  {
    role: 'Graphic Designer',
    company: 'Independent — digital & print',
    period: '2008 — Present',
    location: 'Davao City, Philippines',
    summary: 'Well-rounded design work across web design, print design and e-book design.',
    bullets: [
      'Design of personal and professional web pages for clients in the various industries',
      'Graphic design for a client in various digital marketing industry',
      'Creating E-book and E-book covers for Clients',
    ],
    stack: ['Canva', 'Web design', 'Print design', 'E-book design'],
  },
];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'designs', label: 'Graphic Design Works' },
  { id: 'contact', label: 'Contact' },
];
