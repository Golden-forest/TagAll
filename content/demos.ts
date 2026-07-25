export type DemoDefinition = {
  slug: string
  title: string
  shortTitle: string
  category: string
  description: string
  image: string
  href: string
}

export const demos: DemoDefinition[] = [
  {
    slug: 'smart-pet-tag',
    title: 'Smart Pet Tag',
    shortTitle: 'Pet Tag',
    category: 'Safety and care',
    description: 'A tap-ready identity page with owner contact, care notes, and a calm lost-pet mode.',
    image: '/demo-assets/luna-hero.webp',
    href: '/demos/smart-pet-tag',
  },
  {
    slug: 'digital-business-card',
    title: 'Digital Business Card',
    shortTitle: 'Business Card',
    category: 'Professional identity',
    description: 'A concise contact experience built for introductions, meetings, and instant follow-up.',
    image: '/demo-assets/alex-hero.webp',
    href: '/demos/digital-business-card',
  },
  {
    slug: 'portrait-story',
    title: 'Portrait Story',
    shortTitle: 'Portrait',
    category: 'People and stories',
    description: 'An editorial profile for artists, founders, teachers, athletes, and lives worth documenting.',
    image: '/demo-assets/mara-hero.webp',
    href: '/demos/portrait-story',
  },
  {
    slug: 'interactive-resume',
    title: 'Interactive Resume',
    shortTitle: 'Resume',
    category: 'Career profile',
    description: 'A recruiter-first profile with selected work, experience, proof, and a downloadable CV.',
    image: '/demo-assets/maya-hero.webp',
    href: '/demos/interactive-resume',
  },
  {
    slug: 'wedding-invitation',
    title: 'Wedding Invitation',
    shortTitle: 'Wedding',
    category: 'Events and guests',
    description: 'A private guest experience with schedule, venue, RSVP, gallery, and keepsake details.',
    image: '/demo-assets/wedding-hero.webp',
    href: '/demos/wedding-invitation',
  },
  {
    slug: 'creator-product-story',
    title: 'Creator Product Story',
    shortTitle: 'Creator Story',
    category: 'Work and commerce',
    description: 'A tactile portfolio and product provenance page for makers, studios, and cultural brands.',
    image: '/demo-assets/creator-hero.webp',
    href: '/demos/creator-product-story',
  },
  {
    slug: 'lisbon-album',
    title: 'Lisbon Photo Album',
    shortTitle: 'Lisbon Album',
    category: 'Travel and Events',
    description:
      'A 5-day travelogue with cinematic intro animation, chapter timeline, and full-screen photo viewer.',
    image: '/demo-assets/lisbon-day1-01.webp',
    href: '/demos/lisbon-album',
  },
]

export function findDemo(slug: string) {
  return demos.find((demo) => demo.slug === slug)
}
