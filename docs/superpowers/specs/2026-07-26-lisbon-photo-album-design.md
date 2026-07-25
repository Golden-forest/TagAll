# Lisbon Photo Album Demo — Design Spec

**Date:** 2026-07-26
**Author:** Brainstorm session (user + Claude)
**Status:** Approved → Pending implementation plan
**Type:** New demo case study

---

## 1. Overview

A new TagAll demo case: a **NFC-triggered travel photo album** for the Lisbon 5-day travel scenario. The page tells a narrative of a 5-day trip through Lisbon using an editorial cinematic visual style with a forced full-screen intro animation, then unlocks for free-scroll chapter navigation.

**Tagline:** *Five days by the Atlantic.*

This is the 7th demo in the TagAll showcase and the first to combine:
- Cinematic full-screen intro animation (locked scroll)
- Deep photo-forward storytelling with chapter metadata
- Editorial dark visual style (new aesthetic for the demo collection)

**Route:** `/demos/lisbon-album`
**Estimated build time:** 2-3 days

---

## 2. Goals and Non-Goals

### Goals
- Showcase that an NFC tag can drive a deeply narrative photo experience, not just a single-page identity card
- Fill the "geographic / event narrative" gap in the current 6 demos (existing: pet tag, business card, portrait, resume, wedding, creator story)
- Demonstrate the "intro animation → free scroll" hybrid pattern
- Set a visual quality bar with the Editorial Cinematic style

### Non-Goals
- Real interactive maps (Mapbox/Leaflet) — use a static map screenshot as decoration only
- Background music or auto-playing video — animation is built from still photos via Framer Motion
- User-generated content / form input — this is a static showcase demo with fixed fictional content
- Multi-trip support — one trip (Lisbon) only; future demos can replicate the pattern
- Backend / persistence — purely static export

---

## 3. User Flow

```
User taps NFC tag
  ↓
/demos/lisbon-album loads
  ↓
[Stage 1] Auto-play 12s intro animation (scroll locked)
   ├─ 0-1.5s   Cinematic letterbox bars retract
   ├─ 1.5-10s  Ken Burns crossfade cycle (4 hero photos, 2s each)
   ├─ 10-12s   Title fades in + "Start browsing" button appears
   └─ User can click "Skip" any time to bypass
  ↓
[Stage 2] Scroll unlocks → 7-chapter timeline (free scroll, ~5-7 viewport heights total)
   ├─ Sticky top nav with chapter anchors
   ├─ Each chapter: number + date + headline + body text + 4-8 photos
   └─ Photo metadata strip below each grid
  ↓
[Stage 3] Click any photo → full-screen Lightbox
   ├─ Photo metadata (chapter, time, location, optional caption)
   ├─ Keyboard ← / → to navigate, ESC to close
   └─ Mobile: swipe left/right to navigate, swipe down to close
  ↓
[Stage 4] DemoChrome footer → "Next demo" CTA (auto-cycles to next demo)
```

---

## 4. Visual Design

### 4.1 Style: Editorial Cinematic

A dark, magazine-style aesthetic inspired by Magnum Photos, Kinfolk, and Cereal Magazine. The dark backdrop makes the Lisbon photos' colors (blue tiles, orange rooftops, river sunsets) jump forward.

### 4.2 Color Tokens

All colors are scoped to this demo. They do not affect the TagAll main site or other demos.

| Token | Value | Use |
|---|---|---|
| `--album-bg` | `#0e1014` | Page background |
| `--album-surface` | `#1f2329` | Card backgrounds, dividers |
| `--album-ink` | `#f0f2f5` | Primary text |
| `--album-muted` | `#a8aab0` | Body text |
| `--album-faint` | `#6b6d73` | Meta info, captions |
| `--album-accent` | `#d4a574` | Chapter numbers, dates, key highlights (warm gold) |
| `--album-overlay` | `rgba(14,16,20,0.65)` | Photo overlays for legibility |

**Dark mode / light mode:** This demo is always dark. It does not respond to `prefers-color-scheme`. The Editorial Cinematic look requires the dark backdrop.

### 4.3 Typography

- **Display / titles:** `Georgia, 'Times New Roman', serif` (system serif, no web font load)
  - H1: `clamp(3rem, 7vw, 5.5rem)`, `font-weight: 400`, `letter-spacing: -0.04em`, `line-height: 0.95`
  - Chapter numbers: `clamp(3rem, 5vw, 4rem)`, `font-weight: 300`, `color: var(--album-accent)`
  - Chapter titles: `clamp(1.5rem, 2.4vw, 2rem)`, `font-weight: 400`, `letter-spacing: -0.03em`
- **Body / UI:** `var(--font-geist-sans)` (Geist, inherited from main site)
  - Meta labels: `font-size: 11px`, `letter-spacing: 0.18em`, `text-transform: uppercase`, `color: var(--album-faint)`
  - Body copy: `font-size: 16px`, `line-height: 1.7`, `color: var(--album-muted)`, `max-width: 36ch`

**Rationale for system serif:** No web font download = faster LCP on the hero animation. Georgia is universally available and pairs well with editorial photography. (If we later want a custom serif, we can swap to a variable web font using the same Nunito technique used by `StandByClock.tsx`.)

### 4.4 Layout

- Max width: `max-w-[1400px]` (consistent with other demos like WeddingDemo / PortraitStoryDemo)
- Horizontal padding: `px-5 sm:px-8`
- Section vertical rhythm: `py-20 sm:py-28 md:py-36`
- Chapter layout: 12-column grid, chapter number block at `md:col-span-3`, content at `md:col-span-9`
- Photo grids: irregular — `grid-cols-[2fr_1fr_1fr]` or `grid-cols-3` depending on chapter, with mixed row-spans for visual variety

### 4.5 Motion

All motion respects `prefers-reduced-motion: reduce` — degraded to static hero photo + immediate scroll unlock, no Ken Burns, no lightbox transition animations.

- **Intro animation:** ~12s, scroll locked during play
- **Ken Burns photos:** `scale 1.0 → 1.12` over 6s with `cubic-bezier(0.25, 0.1, 0.25, 1)`, plus subtle `translate` drift
- **Photo crossfade:** `opacity 0 → 1` over 800ms `ease-in-out`
- **Letterbox reveal:** black bars `translateY(±100%)` over 900ms `cubic-bezier(0.7, 0, 0.3, 1)`
- **Chapter scroll-in:** existing `Reveal` component pattern (opacity + y + blur), `whileInView`
- **Lightbox enter/exit:** `opacity` + `scale 0.96 → 1`, 200ms, `AnimatePresence` from `motion/react`

---

## 5. Content Structure

### 5.1 The 7 Chapters

| # | Title | Date | Photos | Theme |
|---|---|---|---|---|
| 00 | *Lisbon, before we knew it.* | 2026.08.12 (Prologue) | 2-3 | Arrival — airport, ticket, first evening skyline with map overlay |
| 01 | *A slow morning in Alfama.* | 2026.08.13 (Day 1) | 5-6 | Old town — cobblestone alleys, yellow tram, tiled façades, morning café |
| 02 | *Cais do Sodré, after sunset.* | 2026.08.14 (Day 2) | 6-8 | Riverside night market — neon, Pink Street, Time Out Market seafood |
| 03 | *Sintra, in the clouds.* | 2026.08.15 (Day 3) | 5-7 | Day trip — Pena Palace, Moorish Castle, foggy gardens |
| 04 | *Cascais, where the river ends.* | 2026.08.16 (Day 4) | 4-6 | Coast — Boca do Inferno, lighthouse, beach at dusk |
| 05 | *The long way home.* | 2026.08.17 (Day 5) | 4-5 | Final Lisbon morning — souvenir shops, last pastel de nata, luggage |
| 06 | *What we brought back.* | (Epilogue) | 3-4 | Flat-lay of objects (postcards, tickets, ceramics) + closing quote + sign-off |

**Total photo count:** ~30-40

### 5.2 Photo Metadata Schema

Each photo carries metadata shown in the lightbox:

```ts
type AlbumPhoto = {
  src: string             // e.g. '/demo-assets/lisbon-day1-01.webp'
  alt: string             // Accessibility description
  caption?: string        // Optional short prose, e.g. "Café in Alfama"
  chapter: number         // 0-6
  time?: string           // e.g. '08:47'
  location?: string       // e.g. 'Rua de São Miguel, Alfama'
  tags?: string[]         // e.g. ['café', 'morning', 'tile']
}
```

### 5.3 Map Decoration

The Prologue chapter (00) includes a **static map screenshot** as a background or side decoration. It shows the Iberian Peninsula with Lisbon highlighted + the 5-day route as a dashed polyline. This is a pre-rendered SVG or PNG, **not** an interactive map.

---

## 6. Technical Architecture

### 6.1 File Structure

```
content/
  demos.ts                              # Add 'lisbon-album' entry
  lisbon-album.ts                       # NEW: chapter + photo metadata (data-driven)

components/demos/
  LisbonAlbumDemo.tsx                   # NEW: main demo, wraps DemoChrome, ~600 lines
  lisbon/
    LisbonIntro.tsx                     # NEW: Stage 1 intro animation, ~200 lines
    LisbonChapter.tsx                   # NEW: chapter block renderer, ~120 lines
    LisbonPhotoGrid.tsx                 # NEW: photo grid variants, ~80 lines
    LisbonLightbox.tsx                  # NEW: full-screen lightbox, ~150 lines
    LisbonChapterNav.tsx                # NEW: sticky top nav, ~80 lines

app/
  demos/[slug]/page.tsx                 # Register 'lisbon-album' → LisbonAlbumDemo

public/
  demo-assets/
    lisbon-prologue-01.webp             # ~20-30 photos total
    lisbon-day1-01.webp
    ...
    lisbon-epilogue-04.webp
    lisbon-route-map.svg                # Static decorative map
```

**Why split into 6 subcomponents under `components/demos/lisbon/`:**
- The existing single-file demos (WeddingDemo ~200 lines, PortraitStoryDemo ~190 lines) are simpler cases. This demo has 3 distinct interactive systems (intro animation, lightbox, chapter nav) plus main composition — keeping them in separate files matches the design-isolation principle and makes each unit independently testable.
- Matches the brainstorming skill's "smaller well-bounded units" guidance.

### 6.2 Component Responsibilities

**`LisbonAlbumDemo.tsx`** — Root container
- Wraps everything in `<DemoChrome slug="lisbon-album" tone="dark">`
- Manages global state: `introCompleted` (boolean), `activeChapter` (number)
- Renders `<LisbonIntro>` until intro completes, then swaps to main content
- Provides context for lightbox state via React state or context API

**`LisbonIntro.tsx`** — Stage 1
- Client component (`'use client'`)
- Manages 12-second animation timeline using `motion` variants + `useAnimate` / `setTimeout`
- Locks body scroll during play (`document.body.style.overflow = 'hidden'`)
- Provides "Skip intro" button (top right)
- Fires `onComplete` callback to unlock scroll and reveal main content
- Respects `useReducedMotion()` — instantly completes if reduced motion

**`LisbonChapter.tsx`** — Chapter block renderer
- Pure component, takes `chapter: Chapter` prop
- Renders chapter number, date, title, body, and a `<LisbonPhotoGrid>`
- Uses existing `<Reveal>` component for scroll-in animation

**`LisbonPhotoGrid.tsx`** — Photo grid
- Pure component, takes `photos: AlbumPhoto[]` and `variant: 'dense' | 'spacious' | 'feature'`
- `dense`: 3-column grid, mixed row-spans, ~5-8 photos packed tight. Used for Day 1 / Day 2.
- `spacious`: 2-column larger photos, more whitespace. Used for Sintra / Cascais (fewer, more impactful shots).
- `feature`: Single large hero photo + 2-3 smaller supporting photos. Used for Prologue and Epilogue.
- Each photo has `onClick` that opens lightbox

**`LisbonLightbox.tsx`** — Stage 3
- Client component, portal-rendered to `document.body`
- Uses `AnimatePresence` for enter/exit
- Listens for `keydown` (← → ESC)
- Touch handlers for swipe (mobile)
- Displays photo + metadata + counter (`3 / 5`)

**`LisbonChapterNav.tsx`** — Sticky top nav
- Client component
- Shows chapter list (00 — 06) as small dots or numbers
- Clicking scrolls to chapter anchor
- Active chapter highlighted based on scroll position (IntersectionObserver)

### 6.3 Data-Driven Content

All chapter text and photo metadata live in `content/lisbon-album.ts`, not hardcoded in components. This:
- Matches the existing `content/*.json` / `content/*.ts` pattern
- Lets us swap content for a different trip later without touching components
- Makes the schema explicit and reviewable

### 6.4 Dependencies

**No new dependencies.** Everything uses:
- `next/image` — already in use
- `motion` (v12.42.0) — already installed
- `@phosphor-icons/react` — already installed (for nav arrows, close icon)
- Native `IntersectionObserver`, `useReducedMotion` — no library needed

### 6.5 Static Export Compatibility

The page must work with `output: 'export'` (Next.js static export). Requirements:
- All routes pre-renderable at build time — the existing `generateStaticParams` in `app/demos/[slug]/page.tsx` will pick up the new slug automatically once added to `content/demos.ts`
- No server actions, no dynamic data fetching
- The intro animation, lightbox, and chapter nav are all client-side state — fully compatible

### 6.6 Image Optimization

- Photos are `.webp`, optimized before commit (target 70-200 KB each, like existing `demo-assets/*.webp`)
- Source: Unsplash (free commercial use, no attribution required under their license)
- `next/image` with `fill` + `sizes` attribute, consistent with WeddingDemo pattern
- Hero photos: `priority` + `loading="eager"`; below-fold: default lazy load

---

## 7. Integration with Main Site

### 7.1 Demo Registration

Add to `content/demos.ts`:

```ts
{
  slug: 'lisbon-album',
  title: 'Lisbon Photo Album',
  shortTitle: 'Lisbon Album',
  category: 'Travel and events',
  description: 'A 5-day travelogue with cinematic intro animation, chapter timeline, and full-screen photo viewer.',
  image: '/demo-assets/lisbon-day1-01.webp',
  href: '/demos/lisbon-album',
}
```

This automatically:
- Adds it to `/demos` listing page
- Shows it on the homepage `ProductShowcase` grid
- Includes it in the `DemoChrome` "next demo" rotation
- Adds it to the auto-generated sitemap via `generateStaticParams`

### 7.2 DemoChrome Tone

Use `<DemoChrome slug="lisbon-album" tone="dark">` to get the dark variant of the chrome (already supported by `DemoChrome.tsx`).

### 7.3 No Main Site Token Changes

This demo defines its own `--album-*` tokens scoped to its root container. It does not modify `globals.css` or affect other demos / pages.

---

## 8. Accessibility

- **`prefers-reduced-motion`:** Intro animation instantly completes (no Ken Burns, no letterbox). Lightbox transitions become simple opacity-only.
- **Keyboard navigation:** Lightbox fully operable via ←, →, ESC, Tab. Skip-intro button is keyboard-reachable.
- **Focus management:** When lightbox opens, focus moves to the close button. When it closes, focus returns to the photo that was clicked.
- **Alt text:** Every photo has descriptive `alt` text in `AlbumPhoto.alt`.
- **Color contrast:** `#f0f2f5` on `#0e1014` = 17.2:1 (AAA). `#a8aab0` on `#0e1014` = 7.4:1 (AAA). `#d4a574` on `#0e1014` = 9.5:1 (AAA). All body text passes WCAG AAA.
- **Scroll lock:** Body scroll lock during intro uses `overflow: hidden` only — does not break the scroll restoration. Users can still use screen readers to read ahead.

---

## 9. Performance Budget

| Metric | Target |
|---|---|
| Initial JS (incl. motion) | < 80 KB gzipped |
| LCP (hero photo) | < 2.5s on 4G |
| Total page weight | < 4 MB (mostly photos; ~30 photos × ~120 KB avg) |
| CLS | 0 (all photos have reserved aspect ratio) |
| INP (lightbox open) | < 100ms |

**Photo strategy:** First hero photo `priority + eager`; all others `loading="lazy"`. Photos below the fold use `sizes` to request appropriately sized images.

---

## 10. Acceptance Criteria

1. **Routing:** Visiting `/demos/lisbon-album` shows the demo; visiting unknown slug still 404s.
2. **Intro:** On first load, the page auto-plays a ~12s intro animation. During play, body scroll is locked. A "Skip intro" button is visible and keyboard-reachable.
3. **Post-intro:** After intro completes (or is skipped), scroll is unlocked. The 7-chapter timeline is reachable.
4. **Lightbox:** Clicking any photo opens a full-screen lightbox with metadata. Keyboard navigation (← → ESC) works. Mobile swipe works.
5. **Chapter nav:** A sticky chapter nav at the top shows the 7 chapters. Clicking a chapter scrolls to it. The active chapter updates based on scroll position.
6. **Reduced motion:** With `prefers-reduced-motion: reduce`, the intro instantly completes (no animation), Ken Burns is disabled, and lightbox transitions are opacity-only.
7. **Integration:** The new demo appears in `/demos` listing, the homepage `ProductShowcase` grid, and the `DemoChrome` "next demo" rotation.
8. **Static export:** `npm run build` succeeds and produces a static export in `out/` with all 7 demo routes (6 existing + this new one).
9. **Lighthouse mobile score:** Performance ≥ 85, Accessibility ≥ 95, Best Practices = 100, SEO ≥ 95.

---

## 11. Open Questions

None at spec time. (Photo selection from Unsplash will happen during implementation.)

---

## 12. Out of Scope (Future Enhancements)

These are intentionally excluded from this spec but noted for potential future iterations:

- **Other trip themes** (Kyoto, Iceland, etc.) — re-use the component structure with different `content/*.ts`
- **Background music / ambient audio** — could be added as an opt-in toggle
- **Real interactive map** (Mapbox GL or MapLibre) — would replace the static map decoration
- **Auto-playing "video mode"** — fully automated scroll-through with synchronized music
- **Photo EXIF data** — auto-extract date / GPS from photos at build time
- **User-generated albums** — backend / CMS-driven content for end users
- **Multi-language** — Portuguese / Chinese versions
