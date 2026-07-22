# TagAll

TagAll turns an NFC tag, physical card, or QR code into a designed digital experience. The repository contains the public TagAll homepage, seven live demos, and the original personalized 2307 graduation memory experience.

## Live cases

- Graduation memory: `/#/s/:slug`
- Smart pet tag: `/demos/smart-pet-tag`
- Digital business card: `/demos/digital-business-card`
- Portrait story: `/demos/portrait-story`
- Interactive resume: `/demos/interactive-resume`
- Wedding invitation: `/demos/wedding-invitation`
- Creator product story: `/demos/creator-product-story`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run validate:content
npm run lint
npm run build
```

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Motion, GSAP, and Lenis
- Static content and optimized WebP assets

The demo routes are statically generated. The original student experience remains available through the legacy hash route so existing NFC tags continue to work.
