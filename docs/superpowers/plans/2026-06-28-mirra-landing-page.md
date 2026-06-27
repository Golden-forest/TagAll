# Mirra Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Mirra premium AI Personalized Digital Experience homepage as a Next.js marketing page while preserving existing `/#/s/:slug` NFC student links.

**Architecture:** Migrate the public app shell from Vite to Next.js App Router. Render the Mirra homepage at `/`, keep existing Memory2307 components under `src/`, and add a client hash-route gate so existing NFC tags still open the student experience when the URL hash starts with `#/s/`. Marketing copy and product data live in content files so AI workflows can edit content without touching layout components.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS v4, GSAP ScrollTrigger, Lenis, Motion, Phosphor icons, static JSON content, generated WebP imagery.

---

## Scope Check

This plan implements one independently testable product: a public marketing homepage with preserved legacy NFC hash routes. It does not implement checkout, accounts, a CMS, payment, a backend AI generator, or full product detail pages.

## File Structure

Create:

- `app/layout.tsx` - Next root layout, metadata, pre-paint legacy hash script.
- `app/page.tsx` - Home route that renders the legacy gate and marketing page.
- `app/globals.css` - Tailwind import, Mirra design tokens, marketing styles, and legacy animation classes currently in `src/index.css`.
- `app/not-found.tsx` - Simple branded 404 for non-hash routes.
- `next.config.ts` - Next image and build configuration.
- `postcss.config.mjs` - Tailwind v4 PostCSS setup for Next.
- `components/legacy/LegacyHashGate.tsx` - Client gate for `#/s/:slug`.
- `components/legacy/LegacyStudentExperience.tsx` - Client wrapper around existing `src/App`.
- `components/marketing/LandingPage.tsx` - Section composition only.
- `components/marketing/Header.tsx` - Responsive navigation and CTAs.
- `components/marketing/Hero.tsx` - Hero copy and visual composition.
- `components/marketing/LiveDemo.tsx` - Tap-to-open demo stage.
- `components/marketing/ProductShowcase.tsx` - Product breadth section.
- `components/marketing/HowItWorksTimeline.tsx` - Four-step process timeline.
- `components/marketing/WhyMirra.tsx` - Bento advantage grid.
- `components/marketing/GalleryMasonry.tsx` - Case gallery grid.
- `components/marketing/Testimonials.tsx` - Scroll-snap testimonial row.
- `components/marketing/FAQAccordion.tsx` - Accessible FAQ disclosure.
- `components/marketing/Footer.tsx` - Brand footer and final CTA.
- `components/marketing/MagneticButton.tsx` - Client-only pointer feedback button.
- `components/marketing/Reveal.tsx` - Reusable reduced-motion-safe reveal wrapper.
- `components/marketing/SmoothScroll.tsx` - Lenis setup for marketing page.
- `components/marketing/Section.tsx` - Consistent section shell.
- `content/site.json` - Site metadata, nav, CTA hrefs, SEO, footer.
- `content/products.json` - Product showcase content.
- `content/how-it-works.json` - Timeline content.
- `content/why.json` - Advantage content.
- `content/gallery.json` - Gallery content.
- `content/testimonials.json` - Testimonial content.
- `content/faq.json` - FAQ content.
- `scripts/validate-mirra-content.mjs` - Content integrity check.
- `public/mirra/*` - Generated final WebP assets.

Modify:

- `package.json` - Switch scripts to Next and add dependencies.
- `tsconfig.json` - Next-compatible TypeScript config with JSON support.
- `eslint.config.js` - Remove Vite React Refresh config and ignore `.next`.
- `public/robots.txt` - Allow indexing of public homepage.
- `public/_headers` - Add Next asset cache rules.

Keep:

- `src/App.tsx`
- `src/pages/StudentPage.tsx`
- `src/components/ErrorPage.tsx`
- `src/components/LoadingScreen.tsx`
- `src/data/*`
- `public/photos/*`

Delete after Next build passes:

- `index.html`
- `vite.config.ts`
- `src/main.tsx`

---

### Task 1: Migrate The App Shell To Next.js

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `eslint.config.js`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Delete: `vite.config.ts`
- Delete: `index.html`
- Delete: `src/main.tsx`

- [ ] **Step 1: Capture the current baseline**

Run:

```bash
npm run build
```

Expected: the existing Vite build completes or reports only pre-existing issues. If it fails, copy the first TypeScript or bundler error into the task notes before changing files.

- [ ] **Step 2: Install Next and marketing dependencies**

Run:

```bash
npm install next@latest @tailwindcss/postcss motion @phosphor-icons/react
npm uninstall vite @vitejs/plugin-react @tailwindcss/vite
```

Expected: `package.json` and `package-lock.json` update successfully.

- [ ] **Step 3: Replace `package.json` scripts**

Set the `scripts` object to:

```json
{
  "dev": "next dev",
  "build": "next build",
  "lint": "eslint .",
  "start": "next start",
  "validate:content": "node scripts/validate-mirra-content.mjs"
}
```

Keep existing runtime dependencies that support the legacy experience: `gsap`, `lenis`, `react`, `react-dom`, and `react-router-dom`.

- [ ] **Step 4: Replace `tsconfig.json` with Next-compatible config**

Use:

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["DOM", "DOM.Iterable", "ES2023"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Update ESLint config for Next**

Replace `eslint.config.js` with:

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['.next', 'out', 'dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
])
```

- [ ] **Step 6: Add Next and Tailwind config files**

Create `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
```

Create `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 7: Remove Vite-only entry files**

Run:

```bash
rm index.html vite.config.ts src/main.tsx
```

Expected: `src/App.tsx` and all student experience files remain in place.

- [ ] **Step 8: Run lint and build to expose missing Next files**

Run:

```bash
npm run lint
npm run build
```

Expected: lint may pass, and build fails because `app/layout.tsx` and `app/page.tsx` do not exist yet. The expected build failure should mention missing App Router files or missing page files.

- [ ] **Step 9: Commit migration scaffold**

Run:

```bash
git add package.json package-lock.json tsconfig.json eslint.config.js next.config.ts postcss.config.mjs
git add -u index.html vite.config.ts src/main.tsx
git commit -m "chore: migrate app shell to next"
```

---

### Task 2: Add Mirra Content And Content Validation

**Files:**
- Create: `content/site.json`
- Create: `content/products.json`
- Create: `content/how-it-works.json`
- Create: `content/why.json`
- Create: `content/gallery.json`
- Create: `content/testimonials.json`
- Create: `content/faq.json`
- Create: `scripts/validate-mirra-content.mjs`

- [ ] **Step 1: Write the failing content validator**

Create `scripts/validate-mirra-content.mjs`:

```js
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

const requiredFiles = [
  'content/site.json',
  'content/products.json',
  'content/how-it-works.json',
  'content/why.json',
  'content/gallery.json',
  'content/testimonials.json',
  'content/faq.json',
]

const missingFiles = requiredFiles.filter((file) => !existsSync(join(root, file)))

if (missingFiles.length > 0) {
  console.error(`Missing content files: ${missingFiles.join(', ')}`)
  process.exit(1)
}

const assetFiles = [
  'public/mirra/hero-nfc-phone.webp',
  'public/mirra/live-demo-open.webp',
  'public/mirra/product-digital-album.webp',
  'public/mirra/product-business-card.webp',
  'public/mirra/product-wedding.webp',
  'public/mirra/product-pet-memorial.webp',
  'public/mirra/product-showcase.webp',
  'public/mirra/product-portfolio.webp',
  'public/mirra/product-resume.webp',
  'public/mirra/product-qr-landing.webp',
  'public/mirra/product-custom.webp',
  'public/mirra/gallery-memory.webp',
  'public/mirra/gallery-wedding.webp',
  'public/mirra/gallery-pet.webp',
  'public/mirra/gallery-creator.webp',
  'public/mirra/gallery-product.webp',
  'public/mirra/gallery-event.webp',
  'public/mirra/og-image.webp',
]

const missingAssets = assetFiles.filter((file) => !existsSync(join(root, file)))

if (missingAssets.length > 0) {
  console.error(`Missing Mirra assets: ${missingAssets.join(', ')}`)
  process.exit(1)
}

console.log('Mirra content files and assets are present.')
```

- [ ] **Step 2: Run validator to verify it fails**

Run:

```bash
npm run validate:content
```

Expected: FAIL with `Missing content files`.

- [ ] **Step 3: Add site content**

Create `content/site.json`:

```json
{
  "brand": "Mirra",
  "tagline": "Every tap opens a personal world.",
  "description": "AI creates custom pages for memories, people, products, and moments. Delivered through NFC and QR.",
  "primaryCta": {
    "label": "Start a Project",
    "href": "mailto:hello@mirra.studio?subject=Start%20a%20Mirra%20project"
  },
  "secondaryCta": {
    "label": "Explore Demos",
    "href": "#live-demo"
  },
  "nav": [
    { "label": "Products", "href": "#products" },
    { "label": "Demos", "href": "#live-demo" },
    { "label": "How it works", "href": "#how-it-works" },
    { "label": "Gallery", "href": "#gallery" },
    { "label": "FAQ", "href": "#faq" },
    { "label": "Pricing", "href": "#pricing" }
  ],
  "seo": {
    "title": "Mirra | AI Personalized Digital Experiences",
    "description": "Create AI-personalized digital albums, business cards, wedding invitations, portfolios, product showcases, and custom pages that open with NFC or QR.",
    "ogImage": "/mirra/og-image.webp"
  },
  "contact": {
    "email": "hello@mirra.studio"
  },
  "footerLinks": [
    { "label": "Products", "href": "#products" },
    { "label": "Demos", "href": "#live-demo" },
    { "label": "How it works", "href": "#how-it-works" },
    { "label": "Gallery", "href": "#gallery" },
    { "label": "Privacy", "href": "#footer" },
    { "label": "Terms", "href": "#footer" }
  ]
}
```

- [ ] **Step 4: Add product content**

Create `content/products.json`:

```json
[
  {
    "slug": "digital-album",
    "title": "NFC Digital Album",
    "description": "A private album that opens from a card, gift, or QR scan.",
    "image": "/mirra/product-digital-album.webp"
  },
  {
    "slug": "business-card",
    "title": "Digital Business Card",
    "description": "A polished professional profile with contacts, links, and work.",
    "image": "/mirra/product-business-card.webp"
  },
  {
    "slug": "wedding-invitation",
    "title": "Wedding Invitation",
    "description": "A living invitation with story, schedule, gallery, and RSVP links.",
    "image": "/mirra/product-wedding.webp"
  },
  {
    "slug": "pet-memorial",
    "title": "Pet Memorial",
    "description": "A gentle place for photos, stories, dates, and shared memories.",
    "image": "/mirra/product-pet-memorial.webp"
  },
  {
    "slug": "product-showcase",
    "title": "Product Showcase",
    "description": "A compact product page for launches, packaging, events, and retail.",
    "image": "/mirra/product-showcase.webp"
  },
  {
    "slug": "portfolio",
    "title": "Portfolio",
    "description": "A refined personal site for creators, founders, designers, and artists.",
    "image": "/mirra/product-portfolio.webp"
  },
  {
    "slug": "resume",
    "title": "Resume",
    "description": "A premium career page that travels through QR, NFC, and link sharing.",
    "image": "/mirra/product-resume.webp"
  },
  {
    "slug": "qr-landing-page",
    "title": "QR Landing Page",
    "description": "A focused campaign page for events, menus, packaging, and promos.",
    "image": "/mirra/product-qr-landing.webp"
  },
  {
    "slug": "custom-web-experience",
    "title": "Custom Web Experience",
    "description": "A bespoke page built around a person, product, place, or moment.",
    "image": "/mirra/product-custom.webp"
  }
]
```

- [ ] **Step 5: Add process and advantage content**

Create `content/how-it-works.json`:

```json
[
  {
    "title": "Choose",
    "description": "Pick a use case or start from a blank brief."
  },
  {
    "title": "Customize",
    "description": "Add photos, text, links, style, and personal details."
  },
  {
    "title": "Generate",
    "description": "Mirra builds the experience with AI and human-quality polish."
  },
  {
    "title": "Receive",
    "description": "Get a live page, QR link, and optional NFC card shipped worldwide."
  }
]
```

Create `content/why.json`:

```json
[
  {
    "title": "AI-generated experiences",
    "description": "Turn a short brief into a polished page structure, copy direction, and visual system."
  },
  {
    "title": "Fully custom design",
    "description": "Each experience can adapt to the person, brand, event, product, or memory."
  },
  {
    "title": "Lifetime editable",
    "description": "Update photos, links, text, and details after the page has launched."
  },
  {
    "title": "Global shipping",
    "description": "Pair the digital page with physical NFC cards that can travel anywhere."
  },
  {
    "title": "No app required",
    "description": "Visitors open the experience directly in the browser."
  },
  {
    "title": "NFC + QR dual entry",
    "description": "Tap when NFC is available, scan when QR is easier."
  }
]
```

- [ ] **Step 6: Add gallery, testimonial, and FAQ content**

Create `content/gallery.json`:

```json
[
  {
    "title": "Family Memory Album",
    "category": "Memories",
    "image": "/mirra/gallery-memory.webp",
    "description": "A private story page for photos, audio notes, and shared milestones."
  },
  {
    "title": "Coastal Wedding Invite",
    "category": "Weddings",
    "image": "/mirra/gallery-wedding.webp",
    "description": "A cinematic invitation with schedule, gallery, and travel details."
  },
  {
    "title": "Pet Memorial Page",
    "category": "Pets",
    "image": "/mirra/gallery-pet.webp",
    "description": "A gentle digital keepsake that opens from a small NFC card."
  },
  {
    "title": "Creator Portfolio",
    "category": "Creators",
    "image": "/mirra/gallery-creator.webp",
    "description": "A fast personal site for work, press links, and contact."
  },
  {
    "title": "Studio Product Card",
    "category": "Products",
    "image": "/mirra/gallery-product.webp",
    "description": "A product story opened from packaging, retail displays, or events."
  },
  {
    "title": "Launch Event Pass",
    "category": "Events",
    "image": "/mirra/gallery-event.webp",
    "description": "A QR and NFC landing page for schedules, maps, and updates."
  }
]
```

Create `content/testimonials.json`:

```json
[
  {
    "quote": "Mirra made our wedding page feel personal without making us manage a website.",
    "name": "Amelia Hart",
    "role": "Bride",
    "location": "London, UK"
  },
  {
    "quote": "The NFC card made my portfolio feel physical. People remembered it after the event.",
    "name": "Noah Sato",
    "role": "Product Designer",
    "location": "Toronto, Canada"
  },
  {
    "quote": "We used it on product packaging and customers understood the story in seconds.",
    "name": "Maya Olsson",
    "role": "Founder",
    "location": "Stockholm, Sweden"
  }
]
```

Create `content/faq.json`:

```json
[
  {
    "question": "Do customers need an app?",
    "answer": "No. Mirra experiences open in the browser through NFC, QR, or a normal link."
  },
  {
    "question": "Can I update the page after launch?",
    "answer": "Yes. Mirra experiences are designed to stay editable after launch."
  },
  {
    "question": "Does it work with both NFC and QR?",
    "answer": "Yes. Every experience can support tap-to-open NFC and scan-to-open QR entry."
  },
  {
    "question": "Can you ship globally?",
    "answer": "Yes. Digital pages can launch anywhere, and NFC cards can be shipped internationally."
  },
  {
    "question": "Can I request a fully custom design?",
    "answer": "Yes. Mirra supports template-guided experiences and bespoke pages for special projects."
  },
  {
    "question": "Can this be used for businesses or products?",
    "answer": "Yes. Product showcases, business cards, portfolios, event pages, and QR campaigns are core use cases."
  },
  {
    "question": "What happens if the NFC card is lost?",
    "answer": "The page remains online and can still be opened by QR or direct link."
  },
  {
    "question": "How long does a custom project take?",
    "answer": "Simple experiences can be prepared quickly after assets are received. Bespoke projects are scoped before production."
  }
]
```

- [ ] **Step 7: Run validator and capture expected asset failure**

Run:

```bash
npm run validate:content
```

Expected: FAIL with `Missing Mirra assets`.

- [ ] **Step 8: Commit content model**

Run:

```bash
git add content scripts/validate-mirra-content.mjs package.json package-lock.json
git commit -m "feat: add Mirra content model"
```

---

### Task 3: Generate And Add Final Visual Assets

**Files:**
- Create: `public/mirra/hero-nfc-phone.webp`
- Create: `public/mirra/live-demo-open.webp`
- Create: `public/mirra/product-digital-album.webp`
- Create: `public/mirra/product-business-card.webp`
- Create: `public/mirra/product-wedding.webp`
- Create: `public/mirra/product-pet-memorial.webp`
- Create: `public/mirra/product-showcase.webp`
- Create: `public/mirra/product-portfolio.webp`
- Create: `public/mirra/product-resume.webp`
- Create: `public/mirra/product-qr-landing.webp`
- Create: `public/mirra/product-custom.webp`
- Create: `public/mirra/gallery-memory.webp`
- Create: `public/mirra/gallery-wedding.webp`
- Create: `public/mirra/gallery-pet.webp`
- Create: `public/mirra/gallery-creator.webp`
- Create: `public/mirra/gallery-product.webp`
- Create: `public/mirra/gallery-event.webp`
- Create: `public/mirra/og-image.webp`

- [ ] **Step 1: Create asset directory**

Run:

```bash
mkdir -p public/mirra
```

- [ ] **Step 2: Generate hero and live demo assets**

Use image generation with these prompts and save the final files as WebP:

Hero prompt for `public/mirra/hero-nfc-phone.webp`:

```text
Premium minimal product photography for a startup landing page. A matte silver NFC card floating beside a modern black smartphone showing a refined personalized digital album interface. Cold luxury palette, off-white and mist gray background, soft natural shadow, subtle glass reflections, Apple-level restraint, no visible brand logos, no readable tiny UI text, realistic hand-scale proportions, 4:3 composition, high-end SaaS DTC feel.
```

Live demo prompt for `public/mirra/live-demo-open.webp`:

```text
Minimal close-up product scene showing a phone just touching a matte NFC card, with a soft browser page opening on the phone. Cold off-white surface, silver-gray NFC card, premium shadows, restrained blue accent, no fake dashboard, no readable small text, realistic photography, calm startup landing page aesthetic, 16:10 composition.
```

- [ ] **Step 3: Generate product assets**

Use one generated image per file:

```text
Create a premium minimal product image for Mirra, an AI personalized digital experience platform. Subject: NFC digital album. Show a tasteful phone screen with a personal photo album and a small NFC card nearby. Cold off-white studio lighting, silver gray, restrained blue accent, realistic product photography, no readable small text.
```

Save as `public/mirra/product-digital-album.webp`.

```text
Create a premium minimal product image for Mirra. Subject: digital business card. Show a black NFC card and phone contact page in a refined studio scene. Cold luxury palette, modern professional feel, no readable small text, realistic product photography.
```

Save as `public/mirra/product-business-card.webp`.

```text
Create a premium minimal product image for Mirra. Subject: wedding invitation digital experience. Show an elegant phone invitation interface beside a pale NFC card, soft floral detail, cold white and silver palette, refined not rustic, no readable small text.
```

Save as `public/mirra/product-wedding.webp`.

```text
Create a premium minimal product image for Mirra. Subject: pet memorial digital experience. Show a gentle phone memorial page with a pet photo area and a small NFC keepsake card. Calm off-white studio scene, soft shadow, not sentimental or cartoonish, no readable small text.
```

Save as `public/mirra/product-pet-memorial.webp`.

```text
Create a premium minimal product image for Mirra. Subject: product showcase opened from packaging. Show a product box, QR mark area, NFC card, and phone product page in cold luxury lighting, no readable small text, realistic.
```

Save as `public/mirra/product-showcase.webp`.

```text
Create a premium minimal product image for Mirra. Subject: creator portfolio. Show a phone portfolio page beside a slim NFC card on a silver-gray desk, high-end creative professional feel, no readable small text.
```

Save as `public/mirra/product-portfolio.webp`.

```text
Create a premium minimal product image for Mirra. Subject: digital resume. Show a refined mobile resume page and NFC card in a clean professional studio scene, charcoal and silver palette, no readable small text.
```

Save as `public/mirra/product-resume.webp`.

```text
Create a premium minimal product image for Mirra. Subject: QR landing page. Show a phone landing page opened from a printed QR card, modern event or retail feel, cold off-white palette, no readable small text.
```

Save as `public/mirra/product-qr-landing.webp`.

```text
Create a premium minimal product image for Mirra. Subject: fully custom web experience. Show layered phone screens, NFC card, and small personal objects in a refined studio scene, cold luxury palette, no readable small text.
```

Save as `public/mirra/product-custom.webp`.

- [ ] **Step 4: Generate gallery and OG assets**

Use these prompts and save the final files as WebP:

```text
Create a premium minimal Mirra gallery image. Subject: family memory album opened on a phone beside a matte NFC keepsake card. Cold off-white and silver studio scene, soft shadows, emotional but restrained, no readable small text.
```

Save as `public/mirra/gallery-memory.webp`.

```text
Create a premium minimal Mirra gallery image. Subject: coastal wedding digital invitation on a phone with a pale NFC card. Clean cold white palette, silver accents, subtle floral detail, polished SaaS DTC style, no readable small text.
```

Save as `public/mirra/gallery-wedding.webp`.

```text
Create a premium minimal Mirra gallery image. Subject: pet memorial digital page on a phone beside a small NFC card. Gentle off-white scene, soft silver shadows, tasteful and quiet, no readable small text.
```

Save as `public/mirra/gallery-pet.webp`.

```text
Create a premium minimal Mirra gallery image. Subject: creator portfolio opened on a phone with an NFC business card. Modern studio desk, charcoal and silver palette, restrained blue accent, no readable small text.
```

Save as `public/mirra/gallery-creator.webp`.

```text
Create a premium minimal Mirra gallery image. Subject: product story page opened from packaging by NFC or QR. Show refined packaging, phone, and matte card in cold luxury lighting, no readable small text.
```

Save as `public/mirra/gallery-product.webp`.

```text
Create a premium minimal Mirra gallery image. Subject: launch event pass with QR and NFC entry. Show phone event page, printed pass, and small NFC card in a clean silver-gray scene, no readable small text.
```

Save as `public/mirra/gallery-event.webp`.

```text
Create a 1200x630 Open Graph image for Mirra. Premium minimal product photography of a matte NFC card and modern phone opening a personalized digital experience. Cold off-white background, silver-gray surfaces, restrained blue accent, no logos, no readable text.
```

Save as `public/mirra/og-image.webp`.

- [ ] **Step 5: Run asset validation**

Run:

```bash
npm run validate:content
```

Expected: PASS with `Mirra content files and assets are present.`

- [ ] **Step 6: Commit assets**

Run:

```bash
git add public/mirra
git commit -m "feat: add Mirra visual assets"
```

---

### Task 4: Add Next Layout, Metadata, And Legacy Hash Preservation

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/not-found.tsx`
- Create: `app/globals.css`
- Create: `components/legacy/LegacyHashGate.tsx`
- Create: `components/legacy/LegacyStudentExperience.tsx`
- Modify: `public/robots.txt`
- Modify: `public/_headers`

- [ ] **Step 1: Create global CSS**

Create `app/globals.css` by moving the current `src/index.css` legacy animation classes into this file and adding Mirra tokens at the top:

```css
@import "tailwindcss";

:root {
  --mirra-bg: #f7f8f7;
  --mirra-surface: #ffffff;
  --mirra-surface-soft: #eef1f4;
  --mirra-ink: #111318;
  --mirra-muted: #5e6673;
  --mirra-hairline: rgba(17, 19, 24, 0.1);
  --mirra-accent: #476cff;
  --mirra-shadow: 0 24px 80px rgba(17, 19, 24, 0.12);
}

html,
body {
  margin: 0;
  min-height: 100dvh;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: auto;
  background: var(--mirra-bg);
  color: var(--mirra-ink);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html[data-mirra-route='legacy'] [data-marketing-root] {
  display: none;
}

body {
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

::selection {
  background: rgba(71, 108, 255, 0.18);
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button {
  font: inherit;
}

@keyframes loaderDot {
  0%, 80%, 100% { transform: scale(.4); opacity: .3 }
  40% { transform: scale(1); opacity: 1 }
}

@keyframes breathe {
  0%, 100% { opacity: 0.3; transform: scale(0.6) translateY(-8px) translateX(-4px); }
  50% { opacity: 0.7; transform: scale(1.3) translateY(8px) translateX(4px); }
}

.ambient-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: opacity, transform;
  animation: breathe 6s ease-in-out infinite;
}

@keyframes heroIntro {
  from {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    filter: blur(0);
  }
}

.hero-intro {
  opacity: 0;
  animation: heroIntro 980ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.reveal {
  will-change: transform, opacity, filter;
}

.hero-media {
  transform: scale(1.04);
  will-change: transform;
}

.image-reveal img {
  transform-origin: center;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }

  .reveal,
  .hero-intro,
  .hero-media,
  .ambient-glow {
    opacity: 1;
    animation: none;
    transform: none;
    filter: none;
  }
}
```

- [ ] **Step 2: Create metadata layout**

Create `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import siteContent from '@/content/site.json'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  openGraph: {
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [siteContent.seo.ogImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [siteContent.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Script id="mirra-legacy-hash-guard" strategy="beforeInteractive">
          {`if (window.location.hash.indexOf('#/s/') === 0) { document.documentElement.dataset.mirraRoute = 'legacy'; }`}
        </Script>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Create legacy hash gate**

Create `components/legacy/LegacyStudentExperience.tsx`:

```tsx
'use client'

import App from '@/src/App'

export function LegacyStudentExperience() {
  return <App />
}
```

Create `components/legacy/LegacyHashGate.tsx`:

```tsx
'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LegacyStudentExperience = dynamic(
  () => import('./LegacyStudentExperience').then((mod) => mod.LegacyStudentExperience),
  {
    ssr: false,
    loading: () => (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#f5f0eb] text-[#0c0816]">
        <p className="text-sm text-[#6b7280]">Loading memory</p>
      </main>
    ),
  }
)

function isLegacyHash() {
  return window.location.hash.startsWith('#/s/')
}

export function LegacyHashGate({ children }: { children: React.ReactNode }) {
  const [legacy, setLegacy] = useState(false)

  useEffect(() => {
    const syncRoute = () => {
      const nextLegacy = isLegacyHash()
      document.documentElement.dataset.mirraRoute = nextLegacy ? 'legacy' : 'marketing'
      setLegacy(nextLegacy)
    }

    syncRoute()
    window.addEventListener('hashchange', syncRoute)

    return () => {
      window.removeEventListener('hashchange', syncRoute)
    }
  }, [])

  return (
    <>
      {legacy ? <LegacyStudentExperience /> : null}
      <div data-marketing-root aria-hidden={legacy || undefined}>
        {children}
      </div>
    </>
  )
}
```

- [ ] **Step 4: Create root page and 404**

Create `app/page.tsx`:

```tsx
import { LegacyHashGate } from '@/components/legacy/LegacyHashGate'
import { LandingPage } from '@/components/marketing/LandingPage'

export default function Page() {
  return (
    <LegacyHashGate>
      <LandingPage />
    </LegacyHashGate>
  )
}
```

Create `app/not-found.tsx`:

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--mirra-bg)] px-6 text-center">
      <div className="max-w-md">
        <p className="mb-3 font-mono text-xs text-[var(--mirra-muted)]">
          Page not found
        </p>
        <h1 className="text-4xl font-semibold text-[var(--mirra-ink)]">
          This experience is not available.
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          Return to Mirra or check the link you were given.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[var(--mirra-ink)] px-5 py-3 text-sm font-medium text-white"
        >
          Back to Mirra
        </Link>
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Update robots and headers**

Replace `public/robots.txt` with:

```text
User-agent: *
Allow: /
```

Replace `public/_headers` with:

```text
/*
  Cache-Control: public, max-age=0, must-revalidate

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/mirra/*
  Cache-Control: public, max-age=31536000, immutable

/photos/*
  Cache-Control: public, max-age=31536000, immutable
```

- [ ] **Step 6: Run build to verify marketing component gap**

Run:

```bash
npm run build
```

Expected: FAIL because `components/marketing/LandingPage` has not been created.

- [ ] **Step 7: Commit layout and legacy gate**

Run:

```bash
git add app components/legacy public/robots.txt public/_headers
git commit -m "feat: add next layout and legacy hash gate"
```

---

### Task 5: Build Static Marketing Sections

**Files:**
- Create: `components/marketing/LandingPage.tsx`
- Create: `components/marketing/Header.tsx`
- Create: `components/marketing/Hero.tsx`
- Create: `components/marketing/ProductShowcase.tsx`
- Create: `components/marketing/HowItWorksTimeline.tsx`
- Create: `components/marketing/WhyMirra.tsx`
- Create: `components/marketing/GalleryMasonry.tsx`
- Create: `components/marketing/Testimonials.tsx`
- Create: `components/marketing/FAQAccordion.tsx`
- Create: `components/marketing/Footer.tsx`
- Create: `components/marketing/Section.tsx`

- [ ] **Step 1: Create section shell**

Create `components/marketing/Section.tsx`:

```tsx
export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:px-8 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}
```

- [ ] **Step 2: Create landing composition**

Create `components/marketing/LandingPage.tsx`:

```tsx
import { FAQAccordion } from './FAQAccordion'
import { Footer } from './Footer'
import { GalleryMasonry } from './GalleryMasonry'
import { Header } from './Header'
import { Hero } from './Hero'
import { HowItWorksTimeline } from './HowItWorksTimeline'
import { LiveDemo } from './LiveDemo'
import { ProductShowcase } from './ProductShowcase'
import { SmoothScroll } from './SmoothScroll'
import { Testimonials } from './Testimonials'
import { WhyMirra } from './WhyMirra'

export function LandingPage() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <LiveDemo />
        <ProductShowcase />
        <HowItWorksTimeline />
        <WhyMirra />
        <GalleryMasonry />
        <Testimonials />
        <FAQAccordion />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Create static Header and Hero**

Create `components/marketing/Header.tsx`:

```tsx
import Link from 'next/link'
import siteContent from '@/content/site.json'

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-black/5 bg-[rgba(247,248,247,0.78)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-sm font-semibold text-[var(--mirra-ink)]">
          {siteContent.brand}
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {siteContent.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-[var(--mirra-muted)] transition hover:text-[var(--mirra-ink)]">
              {item.label}
            </a>
          ))}
        </div>
        <a
          href={siteContent.primaryCta.href}
          className="inline-flex rounded-full bg-[var(--mirra-ink)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5"
        >
          {siteContent.primaryCta.label}
        </a>
      </nav>
    </header>
  )
}
```

Create `components/marketing/Hero.tsx`:

```tsx
import Image from 'next/image'
import siteContent from '@/content/site.json'
import { MagneticButton } from './MagneticButton'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-24 sm:px-8">
      <div className="mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-[var(--mirra-muted)] shadow-sm backdrop-blur">
            AI personalized digital experiences
          </p>
          <h1 className="text-5xl font-semibold leading-[0.98] text-[var(--mirra-ink)] sm:text-6xl lg:text-7xl">
            {siteContent.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--mirra-muted)]">
            {siteContent.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href={siteContent.primaryCta.href} variant="primary">
              {siteContent.primaryCta.label}
            </MagneticButton>
            <MagneticButton href={siteContent.secondaryCta.href} variant="secondary">
              {siteContent.secondaryCta.label}
            </MagneticButton>
          </div>
        </div>
        <div className="relative min-h-[520px]">
          <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_70%_20%,rgba(71,108,255,0.14),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(238,241,244,0.58))] shadow-[var(--mirra-shadow)]" />
          <Image
            src="/mirra/hero-nfc-phone.webp"
            alt="Premium NFC card beside a phone opening a personalized Mirra experience"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create product, timeline, why, gallery, testimonials, FAQ, and footer sections**

Create `components/marketing/ProductShowcase.tsx`:

```tsx
import Image from 'next/image'
import products from '@/content/products.json'
import { Section } from './Section'

export function ProductShowcase() {
  return (
    <Section id="products">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-semibold text-[var(--mirra-ink)] sm:text-5xl">
          Built for every personal world.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          Start with a use case, then shape the page around your story, product, or profile.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <article
            key={product.slug}
            className={`group overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-[var(--mirra-shadow)] ${
              index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            }`}
          >
            <div className={`relative ${index === 0 ? 'aspect-[1.35/1]' : 'aspect-[4/5]'}`}>
              <Image
                src={product.image}
                alt={`${product.title} preview`}
                fill
                sizes={index === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[var(--mirra-ink)]">{product.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--mirra-muted)]">{product.description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
```

Create `components/marketing/HowItWorksTimeline.tsx`:

```tsx
import howItWorks from '@/content/how-it-works.json'
import { Section } from './Section'

export function HowItWorksTimeline() {
  return (
    <Section id="how-it-works">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold text-[var(--mirra-ink)] sm:text-5xl">
          From brief to tap-ready.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          A calm process for turning personal context into a finished digital experience.
        </p>
      </div>
      <ol className="mt-14 grid gap-4 md:grid-cols-4">
        {howItWorks.map((step, index) => (
          <li key={step.title} className="relative rounded-[20px] border border-black/10 bg-white/72 p-6 shadow-sm backdrop-blur">
            <span className="mb-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--mirra-surface-soft)] font-mono text-sm text-[var(--mirra-muted)]">
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold text-[var(--mirra-ink)]">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--mirra-muted)]">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
```

Create `components/marketing/WhyMirra.tsx`:

```tsx
import whyMirra from '@/content/why.json'
import { Section } from './Section'

export function WhyMirra() {
  return (
    <Section>
      <div className="max-w-2xl">
        <h2 className="text-4xl font-semibold text-[var(--mirra-ink)] sm:text-5xl">
          More than a link. More than a card.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          Mirra combines AI generation, editable pages, and physical entry points in one system.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
        {whyMirra.map((item, index) => (
          <article
            key={item.title}
            className={`rounded-[20px] border border-black/10 bg-white/75 p-6 shadow-sm backdrop-blur ${
              index === 0 || index === 3 ? 'md:col-span-3' : 'md:col-span-2'
            }`}
          >
            <div className="mb-8 h-24 rounded-2xl bg-[linear-gradient(135deg,rgba(71,108,255,0.12),rgba(238,241,244,0.9))]" />
            <h3 className="text-lg font-semibold text-[var(--mirra-ink)]">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--mirra-muted)]">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
```

Create `components/marketing/GalleryMasonry.tsx`:

```tsx
import Image from 'next/image'
import galleryItems from '@/content/gallery.json'
import { Section } from './Section'

const aspectClasses = ['aspect-[4/5]', 'aspect-[5/4]', 'aspect-[3/4]', 'aspect-[1/1]', 'aspect-[4/3]', 'aspect-[3/5]']

export function GalleryMasonry() {
  return (
    <Section id="gallery">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-semibold text-[var(--mirra-ink)] sm:text-5xl">
          A gallery of tap-open worlds.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          Memory, work, products, events, and private pages can share the same platform.
        </p>
      </div>
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {galleryItems.map((item, index) => (
          <figure key={item.title} className="group mb-4 break-inside-avoid overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-sm">
            <div className={`relative ${aspectClasses[index % aspectClasses.length]}`}>
              <Image
                src={item.image}
                alt={`${item.title} Mirra case`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <figcaption className="p-5">
              <p className="text-xs font-medium text-[var(--mirra-muted)]">{item.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--mirra-ink)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--mirra-muted)]">{item.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
```

Create `components/marketing/Testimonials.tsx`:

```tsx
import testimonials from '@/content/testimonials.json'
import { Section } from './Section'

export function Testimonials() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold text-[var(--mirra-ink)] sm:text-5xl">
          Made for moments people remember.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          Short notes from people using digital experiences in real-world contexts.
        </p>
      </div>
      <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="min-w-[300px] snap-start rounded-[20px] border border-black/10 bg-white p-6 shadow-sm sm:min-w-[380px]">
            <blockquote className="text-lg leading-8 text-[var(--mirra-ink)]">
              "{testimonial.quote}"
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-semibold text-[var(--mirra-ink)]">{testimonial.name}</p>
              <p className="mt-1 text-sm text-[var(--mirra-muted)]">
                {testimonial.role}, {testimonial.location}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
```

Create `components/marketing/FAQAccordion.tsx`:

```tsx
'use client'

import { useState } from 'react'
import faqs from '@/content/faq.json'
import { Section } from './Section'

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-semibold text-[var(--mirra-ink)] sm:text-5xl">
          Questions before you start.
        </h2>
        <div className="mt-10 divide-y divide-black/10 rounded-[20px] border border-black/10 bg-white">
          {faqs.map((faq, index) => {
            const open = openIndex === index
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-base font-semibold text-[var(--mirra-ink)] outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--mirra-accent)]"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="text-xl text-[var(--mirra-muted)]">
                    {open ? '-' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-panel-${index}`}
                  className={`${open ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'} transition-all duration-300`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-7 text-[var(--mirra-muted)]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
```

Create `components/marketing/Footer.tsx`:

```tsx
import siteContent from '@/content/site.json'

export function Footer() {
  return (
    <footer id="footer" className="border-t border-black/10 bg-white/60">
      <section id="pricing" className="border-b border-black/10 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--mirra-ink)]">
              Custom projects are scoped before production.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--mirra-muted)]">
              Explore demos first, then send a brief when you are ready to build your own experience.
            </p>
          </div>
          <a
            className="inline-flex w-fit rounded-full bg-[var(--mirra-ink)] px-5 py-3 text-sm font-medium text-white"
            href={siteContent.primaryCta.href}
          >
            {siteContent.primaryCta.label}
          </a>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-lg font-semibold text-[var(--mirra-ink)]">{siteContent.brand}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--mirra-muted)]">
            AI-personalized digital experiences that open through NFC, QR, or a simple link.
          </p>
          <a className="mt-5 inline-flex text-sm font-medium text-[var(--mirra-ink)]" href={`mailto:${siteContent.contact.email}`}>
            {siteContent.contact.email}
          </a>
        </div>
        <nav className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {siteContent.footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-[var(--mirra-muted)] transition hover:text-[var(--mirra-ink)]">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Run build to verify missing motion components**

Run:

```bash
npm run build
```

Expected: FAIL because `MagneticButton`, `SmoothScroll`, and `LiveDemo` have not been created.

- [ ] **Step 6: Commit static sections**

Run:

```bash
git add components/marketing
git commit -m "feat: add Mirra marketing sections"
```

---

### Task 6: Add Motion Islands And Live Demo

**Files:**
- Create: `components/marketing/MagneticButton.tsx`
- Create: `components/marketing/Reveal.tsx`
- Create: `components/marketing/SmoothScroll.tsx`
- Create: `components/marketing/LiveDemo.tsx`
- Modify: marketing sections created in Task 5 to use `Reveal`

- [ ] **Step 1: Create magnetic CTA**

Create `components/marketing/MagneticButton.tsx`:

```tsx
'use client'

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'

export function MagneticButton({
  href,
  children,
  variant,
}: {
  href: string
  children: React.ReactNode
  variant: 'primary' | 'secondary'
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })
  const rotateX = useTransform(springY, [-18, 18], [3, -3])
  const rotateY = useTransform(springX, [-18, 18], [-3, 3])

  const classes =
    variant === 'primary'
      ? 'bg-[var(--mirra-ink)] text-white shadow-lg shadow-black/10'
      : 'border border-black/10 bg-white/70 text-[var(--mirra-ink)] shadow-sm backdrop-blur'

  return (
    <motion.a
      href={href}
      className={`inline-flex rounded-full px-5 py-3 text-sm font-medium transition active:scale-[0.98] ${classes}`}
      style={reduce ? undefined : { x: springX, y: springY, rotateX, rotateY }}
      onMouseMove={(event) => {
        if (reduce) return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18)
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.a>
  )
}
```

- [ ] **Step 2: Create reveal wrapper**

Create `components/marketing/Reveal.tsx`:

```tsx
'use client'

import { motion, useReducedMotion } from 'motion/react'

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Create smooth scroll island**

Create `components/marketing/SmoothScroll.tsx`:

```tsx
'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
```

- [ ] **Step 4: Create Live Demo sequence**

Create `components/marketing/LiveDemo.tsx`:

```tsx
'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from './Section'

gsap.registerPlugin(ScrollTrigger)

export function LiveDemo() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-demo-card]',
        { x: -80, rotate: -8 },
        {
          x: 0,
          rotate: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 0.8,
          },
        }
      )

      gsap.fromTo(
        '[data-demo-screen]',
        { opacity: 0, y: 18, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 42%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, root)

    return () => context.revert()
  }, [])

  return (
    <Section id="live-demo" className="pt-8">
      <section ref={rootRef} className="overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-5 shadow-[var(--mirra-shadow)] backdrop-blur md:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="max-w-lg text-4xl font-semibold text-[var(--mirra-ink)] sm:text-5xl">
              From physical tap to living page.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[var(--mirra-muted)]">
              NFC opens the experience instantly. QR keeps every page accessible on any device.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[var(--mirra-surface-soft)]">
            <Image
              src="/mirra/live-demo-open.webp"
              alt="A phone opening a Mirra digital experience from an NFC card"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div data-demo-card className="absolute left-8 top-1/2 h-28 w-20 -translate-y-1/2 rounded-2xl border border-white/60 bg-white/70 shadow-2xl backdrop-blur" />
            <div data-demo-screen className="absolute bottom-8 right-8 rounded-2xl border border-white/50 bg-white/75 px-4 py-3 text-sm font-medium text-[var(--mirra-ink)] shadow-xl backdrop-blur">
              NFC + QR ready
            </div>
          </div>
        </div>
      </section>
    </Section>
  )
}
```

- [ ] **Step 5: Run build**

Run:

```bash
npm run build
```

Expected: PASS or reveal component import mistakes. Fix import mistakes in the section files until build passes.

- [ ] **Step 6: Commit motion layer**

Run:

```bash
git add components/marketing
git commit -m "feat: add Mirra motion layer"
```

---

### Task 7: SEO, Accessibility, And Copy Polish

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/marketing/Header.tsx`
- Modify: `components/marketing/FAQAccordion.tsx`
- Modify: marketing section components that fail SEO, contrast, or keyboard checks

- [ ] **Step 1: Add JSON-LD to layout**

Add this script inside `<body>` in `app/layout.tsx`, before `{children}`:

```tsx
<script
  type="application/ld+json"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteContent.brand,
      url: '/',
      description: siteContent.seo.description,
      email: siteContent.contact.email,
    }),
  }}
/>
```

- [ ] **Step 2: Verify CTA labels and links**

Run:

```bash
rg -n "Start a Project|Explore Demos|mailto:|#live-demo|#pricing" app components content
```

Expected:

- `Start a Project` appears as the only primary conversion label.
- `Explore Demos` appears as the only demo CTA label.
- Primary CTAs use `siteContent.primaryCta.href`.
- Secondary CTAs use `siteContent.secondaryCta.href`.
- `Pricing` links to `#pricing`.

- [ ] **Step 3: Verify `id="pricing"` exists on the footer CTA band**

Confirm `components/marketing/Footer.tsx` includes this section:

```tsx
<section id="pricing" className="border-t border-black/10 py-12">
  <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <h2 className="text-3xl font-semibold text-[var(--mirra-ink)]">
        Custom projects are scoped before production.
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--mirra-muted)]">
        Explore demos first, then send a brief when you are ready to build your own experience.
      </p>
    </div>
    <a className="inline-flex w-fit rounded-full bg-[var(--mirra-ink)] px-5 py-3 text-sm font-medium text-white" href={siteContent.primaryCta.href}>
      {siteContent.primaryCta.label}
    </a>
  </div>
</section>
```

- [ ] **Step 4: Keyboard-test FAQ**

Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`, tab to the FAQ, press Enter and Space on each FAQ trigger.

Expected:

- Focus ring is visible.
- Accordion opens and closes.
- Page does not jump unexpectedly.

- [ ] **Step 5: Run copy audit**

Run:

```bash
rg -n "Elevate|Seamless|Unleash|Next-Gen|Revolutionize|—|–|John Doe|Jane Doe|Acme" app components content
```

Expected: no matches.

- [ ] **Step 6: Commit SEO and accessibility pass**

Run:

```bash
git add app components/marketing content
git commit -m "feat: polish Mirra SEO and accessibility"
```

---

### Task 8: Final Verification

**Files:**
- Modify only files needed to fix verification failures.

- [ ] **Step 1: Run content validation**

Run:

```bash
npm run validate:content
```

Expected: PASS.

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS.

- [ ] **Step 3: Run production build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 4: Verify homepage in browser**

Run:

```bash
npm run dev
```

Open `http://localhost:3000`.

Check:

- Header stays under 80px on desktop.
- Hero CTA is visible without scrolling at 1440x1000.
- Hero visual loads and is not blank.
- Live Demo is directly after the hero.
- Product section includes all nine product types.
- FAQ is keyboard accessible.
- Footer includes contact and legal links.

- [ ] **Step 5: Verify legacy NFC hash route**

Open:

```text
http://localhost:3000/#/s/a8k3p2
```

Expected:

- Marketing homepage is hidden before or immediately after hydration.
- Existing loading screen appears.
- Existing student page route logic runs.
- If `a8k3p2` is not a real slug, the existing Memory2307 error page appears instead of the Mirra homepage.

- [ ] **Step 6: Verify responsive layout**

Check these viewport sizes:

- 390x844
- 768x1024
- 1440x1000

Expected:

- No horizontal overflow.
- Header does not wrap on desktop.
- Product cards and gallery collapse cleanly on mobile.
- CTA text stays on one line.

- [ ] **Step 7: Run Lighthouse**

With the dev server running, run:

```bash
npx lighthouse http://localhost:3000 --output=html --output-path=./docs/mirra-lighthouse.html --chrome-flags="--headless"
```

Expected target:

- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

- [ ] **Step 8: Commit final fixes and verification artifact**

Run:

```bash
git add app components content public scripts package.json package-lock.json tsconfig.json eslint.config.js next.config.ts postcss.config.mjs docs/mirra-lighthouse.html
git commit -m "chore: verify Mirra landing page"
```
