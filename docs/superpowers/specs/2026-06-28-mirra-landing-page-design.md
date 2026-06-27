# Mirra Landing Page Design

## Overview

Mirra is a premium AI Personalized Digital Experience Platform for overseas customers. The homepage should feel like a world-class SaaS and DTC brand site, closer to Apple, Linear, Framer, Raycast, Stripe, and Vercel than to a Shopify template.

The page sells personalized digital experiences that open through NFC or QR. It should not feel like a website for buying NFC tags. NFC is the physical entry point. The product is the AI-generated, editable, personal digital world behind that tap or scan.

## Confirmed Decisions

- Working brand name: **Mirra**.
- Brand direction: **Hybrid Startup Brand**. The homepage combines AI platform credibility with emotional and commercial use cases.
- Primary conversion goal: **Start a custom project**.
- Secondary conversion goal: **Explore live demos**.
- Pricing strategy: homepage may include a Pricing nav item, but it should not show detailed prices or dominate the page.
- Audience strategy: broad platform positioning. The page should cover personal, creator, professional, and small-brand use cases without making the hero about only weddings, albums, business cards, or memorials.
- Homepage architecture: **Platform Hero, Demo Close Behind**. The hero creates trust first, then the Live Demo proves the NFC + QR experience immediately.

## Positioning

Primary positioning line:

> Mirra is an AI platform for personalized digital experiences that open with a tap or scan.

Hero slogan candidate:

> Every tap opens a personal world.

Hero supporting copy candidate:

> AI creates custom pages for memories, people, products, and moments. Delivered through NFC and QR.

The page should repeatedly reinforce three ideas:

1. Mirra is an AI platform, not a card vendor.
2. The output is deeply personal and custom, not a generic template.
3. The digital experience has a physical, giftable, shareable entry point through NFC and QR.

## Page Structure

### 1. Header

The header should be quiet and single-line on desktop.

Navigation:

- Products
- Demos
- How it works
- Gallery
- FAQ
- Pricing

Actions:

- Secondary text link: Log in, optional for future product accounts.
- Primary CTA: Start a Project.

Mobile should collapse to a compact menu. The header height should stay below 80px on desktop.

### 2. Hero

Purpose: establish the platform promise and premium brand trust.

Layout:

- Left side: slogan, short supporting copy, two CTAs.
- Right side: high-quality visual of a premium NFC card and phone preview.
- Below hero, separate from the hero block: understated social proof or trust logos only when real customers, partners, or credible demo brands are available. If not available, omit the logo wall for the first launch.

CTA copy:

- Primary: Start a Project
- Secondary: Explore Demos

Hero visual:

- A realistic NFC card plus phone, using real or generated product photography.
- The card and phone should support subtle 3D hover, with 2-4 degrees of rotation and small layer offsets.
- The image should not be a div-based fake product screenshot.

Hero constraints:

- Slogan max 2 lines on desktop.
- Supporting copy max 20 words.
- CTAs visible within initial viewport.
- Use `min-h-[100dvh]`, not `h-screen`.

### 3. Live Demo

Purpose: prove the concept immediately after the hero.

The section simulates:

1. A phone approaching an NFC card.
2. A soft signal or proximity moment.
3. A personalized webpage opening on the phone.
4. A QR fallback appearing as a secondary entry point.

Interaction:

- Scroll-triggered sequence with GSAP ScrollTrigger.
- Reduced motion fallback shows the final state as a static sequence.
- The animation should communicate the state transition from physical tap to digital page. It should not become a flashy animation showcase.

### 4. Product Showcase

Purpose: show the breadth of experiences Mirra can generate.

Products:

- NFC Digital Album
- Digital Business Card
- Wedding Invitation
- Pet Memorial
- Product Showcase
- Portfolio
- Resume
- QR Landing Page
- Custom Web Experience

Layout:

- Use an asymmetric product grid or horizontal-scroll product rail.
- Avoid a generic equal 3-column feature grid.
- Each product should have an image or realistic generated preview.
- Product cards link to future detail pages or anchor demos.

### 5. How It Works

Purpose: explain the process without lowering the premium feeling.

Steps:

1. Choose
2. Customize
3. Generate
4. Receive

Layout:

- Quiet horizontal timeline on desktop.
- Vertical timeline on mobile.
- Use concise text. Each step should be readable in one glance.

Step descriptions:

- Choose: Pick a use case or start from a blank brief.
- Customize: Add photos, text, links, style, and personal details.
- Generate: Mirra builds the experience with AI and human-quality polish.
- Receive: Get a live page, QR link, and optional NFC card shipped worldwide.

### 6. Why Mirra

Purpose: explain advantages over static templates and generic NFC products.

Points:

- AI-generated experiences
- Fully custom design
- Lifetime editable
- Global shipping
- No app required
- NFC + QR dual entry

Layout:

- Use a bento grid with visual variety.
- At least two cells should include meaningful visuals, such as an edit interface, NFC card, QR preview, or global shipping detail.
- Keep copy concrete and short.

### 7. Gallery

Purpose: make the product feel real, premium, and flexible.

Layout:

- Masonry grid with varied aspect ratios.
- Hover states reveal the use case name and a short description.
- Images should slowly scale on hover.
- Use lazy loading for all non-hero images.

Gallery categories:

- Memories
- Weddings
- Pets
- Creators
- Professionals
- Products
- Events
- Custom

### 8. Testimonials

Purpose: build trust with human evidence.

Layout:

- Carousel or scroll-snap row.
- Quote bodies should stay under 3 lines.
- Use realistic names and contexts.
- Do not invent fake precision like exact customer counts unless real data exists.

### 9. FAQ

Purpose: remove buying friction.

Questions:

- Do customers need an app?
- Can I update the page later?
- Does it work with both NFC and QR?
- Can you ship globally?
- Can I request a fully custom design?
- Can this be used for businesses or products?
- What happens if the NFC card is lost?
- How long does a custom project take?

Use an accessible accordion with keyboard support.

### 10. Footer

Footer content:

- Brand summary
- Product links
- Company links
- Support links
- Social links
- Contact email
- Privacy Policy
- Terms

Footer CTA:

- Start a Project

## Visual System

### Theme

The homepage should be light-first and use one consistent page theme. It should feel like cold luxury: off-white, mist gray, silver, charcoal, and one restrained accent.

Suggested palette:

- Background: `#F7F8F7`
- Elevated surface: `#FFFFFF`
- Secondary surface: `#EEF1F4`
- Text primary: `#111318`
- Text secondary: `#5E6673`
- Hairline: `rgba(17, 19, 24, 0.10)`
- Accent: muted electric blue, for example `#476CFF`

Avoid:

- Pure black and pure white as dominant values.
- Heavy purple AI gradients.
- Beige, brass, and warm craft palettes.
- Multiple competing accent colors.

### Typography

Recommended type direction:

- Use Geist, Satoshi, or another premium modern sans.
- Avoid Inter as the default unless the implementation needs a neutral fallback.
- Use tight but not negative letter spacing.
- Hero text should feel calm and confident, not oversized for spectacle.

### Materiality

Use glass only where it expresses product material:

- Hero visual panels
- Phone preview
- NFC card preview
- Live Demo stage
- Selected bento cells

Glass treatment:

- Soft transparency
- Backdrop blur
- 1px translucent border
- Subtle inner highlight
- Soft tinted shadow

Do not apply glassmorphism to every card.

### Shape System

Use one consistent radius system:

- Buttons: pill
- Main cards and media: 18-20px
- Small cards: 14-16px
- Modals and large panels: 24px

## Motion System

Motion intensity should be restrained and premium.

Libraries:

- Lenis for smooth scrolling.
- GSAP ScrollTrigger for the Live Demo and any scroll-tied sequences.
- Motion or CSS transitions for hover, reveal, and carousel behavior.

Rules:

- Animate transform and opacity only.
- Use scroll-triggered animation only when it communicates hierarchy, storytelling, feedback, or state transition.
- Respect `prefers-reduced-motion`.
- Avoid generic fly-in animations.
- Avoid scroll event listeners and React state for continuous scroll or pointer values.

Key animations:

- Hero card and phone 3D hover.
- Hero content fade and slide on load.
- Live Demo tap-to-open sequence.
- Product cards subtle hover lift and image scale.
- Gallery slow scale on hover.
- Timeline reveal as the user scrolls.
- FAQ accordion height and opacity transition.

## Technical Direction

The current repository is Vite + React + TypeScript + Tailwind. The commercial marketing homepage should be designed as a Next.js app for better SEO, metadata, image optimization, routing, and future content expansion.

Recommended implementation path:

1. Create a new Next.js marketing app or migrate the current project into a Next.js structure.
2. Keep the current Memory2307 student experience as a reusable demo case or product template.
3. Build the Mirra homepage as the public `/` route.
4. Preserve the existing NFC experience route during migration if it remains part of the same deployment.

If implementation stays in Vite for the first version, the design can still be built, but SEO and image optimization will require more manual handling.

## Component Plan

Page components:

- `Header`
- `Hero`
- `LiveDemo`
- `ProductShowcase`
- `HowItWorksTimeline`
- `WhyUs`
- `GalleryMasonry`
- `TestimonialsCarousel`
- `FAQAccordion`
- `Footer`

Reusable components:

- `MagneticButton`
- `Reveal`
- `GlassPanel`
- `NfcPhoneDemo`
- `ProductCard`
- `GalleryItem`
- `Section`

Client-only motion islands:

- `HeroDeviceHover`
- `LiveDemoSequence`
- `GalleryParallax`
- `TestimonialsCarousel`

Server-rendered content sections should remain static when possible.

## Content Data Model

All visible content should be extracted into JSON or TypeScript data files so future AI workflows can generate or revise content without editing layout components.

Recommended files:

- `content/site.json`
- `content/products.json`
- `content/gallery.json`
- `content/testimonials.json`
- `content/faq.json`
- `content/how-it-works.json`

Example content shapes:

```json
{
  "brand": "Mirra",
  "tagline": "Every tap opens a personal world.",
  "primaryCta": "Start a Project",
  "secondaryCta": "Explore Demos"
}
```

```json
[
  {
    "slug": "digital-album",
    "title": "NFC Digital Album",
    "description": "A private album that opens from a card, gift, or QR scan.",
    "category": "Memories",
    "image": "/images/products/digital-album.webp"
  }
]
```

## SEO Requirements

The homepage should include:

- Title
- Meta description
- Canonical URL
- Open Graph title, description, and image
- Twitter card metadata
- JSON-LD organization schema
- JSON-LD product or service schema
- Descriptive alt text for all images
- Semantic headings in a single logical hierarchy

Draft meta title:

> Mirra | AI Personalized Digital Experiences

Draft meta description:

> Create AI-personalized digital albums, business cards, wedding invitations, portfolios, product showcases, and custom pages that open with NFC or QR.

## Performance Requirements

Targets:

- Lighthouse 95+ for Performance, Accessibility, Best Practices, and SEO.
- LCP under 2.5s.
- CLS under 0.1.
- INP under 200ms.

Implementation requirements:

- Use optimized images.
- Prioritize the hero image.
- Lazy-load gallery and testimonial assets.
- Avoid heavy client bundles above the fold.
- Keep GSAP isolated to client-only motion components.
- Ensure all animated components clean up effects.

## Accessibility Requirements

- Keyboard-accessible navigation.
- Keyboard-accessible FAQ accordion.
- Focus states for every interactive element.
- Sufficient color contrast in light and dark system contexts.
- Reduced motion fallback.
- No text embedded only inside images.
- CTA labels must be clear without surrounding context.

## Image Strategy

The homepage needs real or generated visuals. Minimalism does not mean text-only.

Required assets:

- Hero NFC card and phone product image.
- Live Demo phone/card sequence visuals.
- Product preview images for each product type.
- Gallery case images.
- Testimonial avatars if testimonials use people.
- Open Graph image.

Preferred approach:

1. Generate premium product photography for hero and product cards.
2. Use current Memory2307 experience screenshots as one authentic demo case if suitable.
3. Use final generated or supplied visuals before launch.

## Verification Plan

Before the homepage is considered complete:

- Run type check.
- Run lint.
- Run production build.
- Test desktop, tablet, and mobile layouts.
- Capture screenshots for desktop and mobile.
- Verify reduced-motion mode.
- Verify keyboard navigation.
- Run Lighthouse.
- Review all visible copy for clarity and premium tone.
- Confirm no generic template patterns dominate the page.

## Out of Scope for First Homepage

- Checkout flow.
- Customer dashboard.
- Account login implementation.
- Admin CMS.
- Live AI generation backend.
- Payment integration.
- Full pricing page.
- Product detail pages beyond simple planned links.

These can be added after the homepage establishes the brand and conversion path.
