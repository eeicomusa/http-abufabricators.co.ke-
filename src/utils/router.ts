import { SectionId } from '../data/industrialData';

export type PageRoute =
  | '/'
  | '/services'
  | '/machinery'
  | '/projects'
  | '/about'
  | '/guides'
  | '/contact';

export interface PageMeta {
  route: PageRoute;
  label: string;
  title: string;
  kicker: string;
  subtitle: string;
}

export const PAGE_DEFINITIONS: Record<PageRoute, PageMeta> = {
  '/': {
    route: '/',
    label: 'Home',
    title: 'Precision Steel Fabrication. Built to Last.',
    kicker: 'ABU Fabricators and Services K. Limited',
    subtitle: 'Structural steel work, custom metal fabrication, and industrial services across Kenya.'
  },
  '/services': {
    route: '/services',
    label: 'Services',
    title: 'Our Core Services',
    kicker: 'Fabrication · Welding · Frameworks · Support',
    subtitle:
      'Structural steel fabrication, custom metalwork, industrial welding, steel frameworks, and end-to-end installation support from our Fedha Road, Embakasi workshop.'
  },
  '/machinery': {
    route: '/machinery',
    label: 'Machinery',
    title: 'Machinery & Equipment',
    kicker: 'Crushing · Screening · Conveyors · Mining · Spares',
    subtitle:
      'Heavy-duty crushers, multi-deck vibrating screens, industrial conveyors, ball mills, and locally stocked wear parts.'
  },
  '/projects': {
    route: '/projects',
    label: 'Projects',
    title: 'Industrial Projects & Sectors',
    kicker: 'Proven Work Across Kenya & East Africa',
    subtitle:
      'Completed structural steel frameworks, crushing circuits, bulk conveyors, and industrial fabrication deployments.'
  },
  '/about': {
    route: '/about',
    label: 'About Us',
    title: 'About ABU Fabricators',
    kicker: 'Fedha Road, Embakasi, Nairobi',
    subtitle:
      'Kenyan steel fabrication specialists committed to precision metalwork, structural integrity, workplace safety, and on-time project delivery.'
  },
  '/guides': {
    route: '/guides',
    label: 'Guides',
    title: 'Engineering Guides',
    kicker: 'Technical Resources & Insights',
    subtitle:
      'Practical engineering comparisons, fabrication quality standards, and maintenance planning guides for Kenyan industry.'
  },
  '/contact': {
    route: '/contact',
    label: 'Contact Us',
    title: 'Let’s Build Something Strong Together',
    kicker: 'Get in Touch · Free Consultation & Quotation',
    subtitle:
      'Visit our workshop on Fedha Road, Embakasi, opposite Nairobi Gospel Church, or call / WhatsApp 0724 151771 for an immediate quote.'
  }
};

export const PAGE_SECTIONS: Record<Exclude<PageRoute, '/contact'>, SectionId[]> = {
  '/': [
    'hero',
    'trust-bar',
    'one-partner',
    'steelwork-gallery',
    'quality-compliance',
    'testimonials',
    'engineering-process',
    'equipment-finder',
    'county-dispatch',
    'faq'
  ],
  '/services': [
    'fabrication',
    'steelwork-gallery',
    'quality-compliance',
    'custom-machine',
    'maintenance',
    'maintenance-packages',
    'county-dispatch',
    'faq'
  ],
  '/machinery': ['machinery', 'crushing-flow', 'mining-solutions', 'conveyors', 'spare-parts'],
  '/projects': ['projects', 'steelwork-gallery', 'testimonials', 'industries'],
  '/about': ['about', 'workshop', 'quality-compliance', 'county-dispatch', 'kenya-strategy'],
  '/guides': ['seo-guides']
};

export function getRouteForSection(
  sectionId: string,
  customTargetPage?: PageRoute
): { route: PageRoute; hash?: string } {
  if (sectionId === 'contact') return { route: '/contact' };
  if (sectionId === 'hero') return { route: '/' };
  if (customTargetPage) return { route: customTargetPage, hash: sectionId };

  for (const [route, sections] of Object.entries(PAGE_SECTIONS) as [
    Exclude<PageRoute, '/contact'>,
    SectionId[]
  ][]) {
    if (sections.includes(sectionId as SectionId)) {
      return { route, hash: sectionId };
    }
  }
  return { route: '/' };
}

export function normalizePathToRoute(pathname: string, hash = ''): PageRoute {
  const cleanHash = hash.replace(/^#\/?/, '').toLowerCase();
  const cleanPath = pathname.replace(/\/+$/, '').toLowerCase() || '/';

  const candidate =
    cleanHash && ['services', 'machinery', 'projects', 'about', 'guides', 'contact'].includes(cleanHash)
      ? (`/${cleanHash}` as PageRoute)
      : cleanPath;

  if (candidate in PAGE_DEFINITIONS) {
    return candidate as PageRoute;
  }
  if (candidate === '/about-us') return '/about';
  if (candidate === '/contact-us') return '/contact';
  if (candidate === '/seo-guides') return '/guides';
  return '/';
}
