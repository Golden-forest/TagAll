# Lisbon Photo Album Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7th TagAll demo at `/demos/lisbon-album` — an NFC-triggered Lisbon travel photo album with cinematic letterbox + Ken Burns intro, 7-chapter dark-editorial timeline, and metadata-rich lightbox.

**Architecture:** Data-driven (single `content/lisbon-album.ts` source of truth), component-isolated (6 components under `components/demos/lisbon/` + 1 root in `components/demos/`), no new dependencies (uses existing `motion` v12 + `next/image` + `@phosphor-icons/react`). Static-export compatible.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Framer Motion (`motion` package), `next/image` with `unoptimized: true` (static export).

**Reference spec:** `docs/superpowers/specs/2026-07-26-lisbon-photo-album-design.md`

---

## Project Conventions (read before starting)

This project has **no test framework** (no vitest/jest/playwright). All validation is manual via browser + `tsc --noEmit` + `next lint`. TDD steps in this plan use this pattern instead of `npm test`:

```bash
npm run dev          # start dev server, manually verify in browser
npx tsc --noEmit     # type check
npm run lint         # eslint (already in package.json scripts)
npm run build        # static export sanity check at task end
```

**Existing demo pattern reference:** `components/demos/WeddingDemo.tsx` (lightest demo, single file, ~200 lines) and `components/demos/PortraitStoryDemo.tsx` (dark tone reference). All demos wrap in `<DemoChrome slug="..." tone="dark|light">`.

**Commit style (from `git log`):** `feat(<scope>): <message>` or `fix(<scope>): <message>`. Scope convention: `lisbon-album` for this feature.

**Existing `content/demos.ts` type:** `DemoDefinition` with `slug / title / shortTitle / category / description / image / href`. Adding an entry auto-registers across the site.

**Existing `Reveal` component** at `components/marketing/Reveal.tsx` — wraps children in scroll-triggered opacity+y+blur animation. Use it for chapter scroll-ins.

**Important:** Never modify `globals.css` for this demo. All `--album-*` tokens are scoped via inline `style` on the demo root container, not added to global CSS. This is consistent with how `PortraitStoryDemo` uses hardcoded colors instead of tokens.

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `content/demos.ts` | MODIFY | Add `lisbon-album` entry (1 line + entry) |
| `content/lisbon-album.ts` | CREATE | Type definitions + 7 chapters + ~30 photos metadata |
| `components/demos/LisbonAlbumDemo.tsx` | CREATE | Root container, manages intro/lightbox state |
| `components/demos/lisbon/LisbonIntro.tsx` | CREATE | Stage 1: 12s intro animation, scroll lock |
| `components/demos/lisbon/LisbonChapterNav.tsx` | CREATE | Sticky top nav with IntersectionObserver |
| `components/demos/lisbon/LisbonChapter.tsx` | CREATE | Chapter block renderer (uses Reveal) |
| `components/demos/lisbon/LisbonPhotoGrid.tsx` | CREATE | 3 photo layout variants |
| `components/demos/lisbon/LisbonLightbox.tsx` | CREATE | Full-screen photo viewer with keyboard + swipe |
| `app/demos/[slug]/page.tsx` | MODIFY | Register slug → component mapping |
| `public/demo-assets/lisbon-*.webp` | CREATE | ~30 WebP photos + 1 SVG map decoration |

---

## Task Decomposition Strategy

The plan is organized in 8 tasks, each producing a self-contained committable change:

1. **Setup & photo acquisition** — get all photos in place first so subsequent tasks have real content to render
2. **Data layer** — types + content file (no UI, easy to review)
3. **Static shell** — register the demo so it shows up; render chapters with no animation/lightbox yet
4. **Lightbox** — standalone component, testable in isolation
5. **Intro animation** — standalone, gated by parent state
6. **Chapter nav** — standalone, only added at end
7. **Polish** — reduced motion, focus management, final QA
8. **Build & ship** — production build, lighthouse, deploy

Each task ends with: `npm run dev` manual check → `npx tsc --noEmit` → `git commit`.

---

## Task 1: Acquire and Prepare Photos

**Goal:** Get ~30 Lisbon-themed WebP photos + 1 SVG route map into `public/demo-assets/`.

**Files:**
- Create: `public/demo-assets/lisbon-prologue-01.webp` through `lisbon-epilogue-04.webp`
- Create: `public/demo-assets/lisbon-route-map.svg`

**Why this first:** Without real photos, every subsequent task is unverifiable. The data file (Task 2) references these exact paths.

### Photos to acquire (31 total)

Chapter mapping and source search terms:

| Chapter | Count | Filename pattern | Unsplash search |
|---|---|---|---|
| 00 Prologue | 3 | `lisbon-prologue-01.webp` -03 | "Lisbon aerial sunset", "airport window airplane", "Lisbon skyline night" |
| 01 Alfama Day 1 | 6 | `lisbon-day1-01.webp` -06 | "Alfama Lisbon cobblestone", "Lisbon yellow tram 28", "Portuguese tile facade", "Lisbon café morning", "Alfama stairs alley", "Lisbon cat window" |
| 02 Cais do Sodré Day 2 | 7 | `lisbon-day2-01.webp` -07 | "Pink Street Lisbon", "Time Out Market Lisbon", "Lisbon riverside night", "Lisbon neon sign bar", "sardine grilled restaurant", "Lisbon street musician night", "Cais do Sodré reflection" |
| 03 Sintra Day 3 | 6 | `lisbon-day3-01.webp` -06 | "Pena Palace Sintra", "Sintra foggy forest", "Moorish Castle Sintra", "Quinta da Regaleira", "Sintra garden moss", "Castle of the Moors tower" |
| 04 Cascais Day 4 | 5 | `lisbon-day4-01.webp` -05 | "Cascais coast", "Boca do Inferno waves", "Guincho beach sunset", "Cascais lighthouse", "Cascais marina dusk" |
| 05 Final Day 5 | 4 | `lisbon-day5-01.webp` -04 | "Lisbon souvenir shop", "pastel de nata café", "Lisbon airport luggage", "Lisbon tram window morning" |
| 06 Epilogue | 3 | `lisbon-epilogue-01.webp` -03 | "flat lay postcards travel", "Portuguese ceramics tiles flat", "train ticket passport flat lay" |

**Plus 4 hero photos for the intro Ken Burns sequence:**
- `lisbon-hero-01.webp` — wide Lisbon skyline at dusk (use one of the Alfama or Cais do Sodré hero shots, or a dedicated Tagus river sunset)
- `lisbon-hero-02.webp` — Sintra Pena Palace vibrant
- `lisbon-hero-03.webp` — Cascais coastline dramatic
- `lisbon-hero-04.webp` — Alfama tiled façade close-up

### Photo specs
- **Format:** WebP
- **Resolution:** 1600px on long edge (resize if larger)
- **Size target:** 80-200 KB each
- **License:** Unsplash (free commercial use)

### Steps

- [ ] **Step 1.1: Create the download directory**

```bash
mkdir -p /Users/hl/Projects/TagAll/public/demo-assets
```

- [ ] **Step 1.2: Download 31 chapter photos + 4 hero photos from Unsplash**

For each photo:
1. Visit unsplash.com and search the term above
2. Pick a high-quality landscape (or portrait for variety in certain chapters) photo
3. Download `w=1600` size (use the `?w=1600&q=80` URL parameter if using direct URLs)
4. Save with the exact filename pattern

**Tooling tip:** Use `curl` or `wget` if you can find direct Unsplash CDN URLs (format `https://images.unsplash.com/photo-<ID>?w=1600&q=80&fm=webp`). Otherwise download via browser and convert/optimize.

- [ ] **Step 1.3: Convert and optimize to WebP**

If photos are JPG/PNG, convert:
```bash
# Requires ImageMagick or cwebp
# ImageMagick:
mogrify -format webp -resize 1600x1600\> -quality 82 /path/to/photos/*.jpg

# or cwebp (better compression):
for f in *.jpg; do cwebp -q 80 -resize 1600 0 "$f" -o "${f%.jpg}.webp"; done
```

Verify each file: under 200 KB, dimensions ≥ 800px on long edge.

- [ ] **Step 1.4: Create the static route map SVG**

Create `public/demo-assets/lisbon-route-map.svg` — a minimal decorative SVG showing:
- Iberian Peninsula outline (simplified path)
- Lisbon marked with a gold dot (`#d4a574`)
- 5 small gold dots for Sintra, Cascais
- Dashed polyline connecting them in a "trip route" pattern
- Dark background (`#0e1014`)

Keep it simple — this is a 200×300px decorative element, not a real map. Sample SVG structure:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" fill="none">
  <rect width="300" height="400" fill="#0e1014"/>
  <!-- Simplified Iberian peninsula outline -->
  <path d="M50,80 Q80,60 120,70 L180,90 Q220,140 200,200 L160,260 Q120,280 80,240 L40,180 Q30,120 50,80 Z"
        stroke="#2a3140" stroke-width="1" fill="#161a22"/>
  <!-- Trip route polyline -->
  <path d="M100,200 L140,180 L160,140 L130,110 L100,200"
        stroke="#d4a574" stroke-width="1" stroke-dasharray="3,3" fill="none" opacity="0.7"/>
  <!-- Lisbon (large gold dot) -->
  <circle cx="100" cy="200" r="5" fill="#d4a574"/>
  <text x="110" y="205" font-family="system-ui" font-size="9" fill="#d4a574">Lisbon</text>
  <!-- Smaller dots for Sintra, Cascais -->
  <circle cx="140" cy="180" r="3" fill="#d4a574"/>
  <text x="148" y="184" font-family="system-ui" font-size="8" fill="#a8aab0">Sintra</text>
  <circle cx="160" cy="140" r="3" fill="#d4a574"/>
  <text x="168" y="144" font-family="system-ui" font-size="8" fill="#a8aab0">Cascais</text>
</svg>
```

- [ ] **Step 1.5: Verify all files present**

```bash
ls /Users/hl/Projects/TagAll/public/demo-assets/lisbon-*.{webp,svg} | wc -l
```
Expected: 36 (35 webp + 1 svg). If fewer, locate missing files.

- [ ] **Step 1.6: Commit photos**

```bash
cd /Users/hl/Projects/TagAll
git add public/demo-assets/lisbon-*.webp public/demo-assets/lisbon-route-map.svg
git commit -m "feat(lisbon-album): add Lisbon photo assets and route map

35 WebP photos covering 7 chapters (prologue, 5 days, epilogue)
plus 4 hero shots for intro Ken Burns. 1 decorative SVG route map."
```

---

## Task 2: Data Layer — Types and Content

**Goal:** Define TypeScript types and create the data file with all 7 chapters and ~31 photos.

**Files:**
- Create: `content/lisbon-album.ts`

This task produces no UI — just the data structure that all subsequent components consume. Easy to review in isolation.

- [ ] **Step 2.1: Create the data file with types**

Create `content/lisbon-album.ts`:

```ts
export type AlbumPhoto = {
  src: string
  alt: string
  caption?: string
  time?: string
  location?: string
  tags?: string[]
}

export type PhotoGridVariant = 'dense' | 'spacious' | 'feature'

export type Chapter = {
  id: number              // 0-6
  label: string           // 'Prologue' | 'Day 1' | 'Epilogue' etc.
  date: string            // '2026.08.13'
  title: string           // 'A slow morning in Alfama.'
  body: string            // 1-2 paragraphs of narrative prose
  photos: AlbumPhoto[]
  gridVariant: PhotoGridVariant
}

export type LisbonAlbumData = {
  tagline: string
  heroPhotos: AlbumPhoto[]   // 4 photos for intro Ken Burns
  closingQuote: string       // shown in epilogue chapter
  authorName: string         // shown in epilogue sign-off
  chapters: Chapter[]
}

export const lisbonAlbum: LisbonAlbumData = {
  tagline: 'A TRAVELOGUE · 08.2026',
  heroPhotos: [
    {
      src: '/demo-assets/lisbon-hero-01.webp',
      alt: 'Tagus river at golden hour with Lisbon skyline silhouetted against orange sky',
    },
    {
      src: '/demo-assets/lisbon-hero-02.webp',
      alt: 'Pena Palace in Sintra with vibrant red and yellow façades against deep blue sky',
    },
    {
      src: '/demo-assets/lisbon-hero-03.webp',
      alt: 'Cascais coastline with dramatic waves crashing on dark rocks at sunset',
    },
    {
      src: '/demo-assets/lisbon-hero-04.webp',
      alt: 'Close-up of traditional blue and white Portuguese tile façade in Alfama',
    },
  ],
  closingQuote:
    'We came for the pastéis de nata. We left with five days of slow mornings, long dinners, and the feeling that the Atlantic had been waiting.',
  authorName: 'Mara & Daniel',
  chapters: [
    {
      id: 0,
      label: 'Prologue',
      date: '2026.08.12',
      title: 'Lisbon, before we knew it.',
      body: 'An evening flight from Berlin. The window seat, the orange-lit clouds over Galicia, then the long descent toward the Tagus. We did not yet know which tram we would take, which pastelaria would become "ours," or which fado we would hear through an open window in Alfama at midnight.',
      photos: [
        {
          src: '/demo-assets/lisbon-prologue-01.webp',
          alt: 'Aerial view of Lisbon at sunset with the Tagus river winding through the city',
          caption: 'Descent into Lisbon',
          time: '19:42',
          location: 'Approaching Humberto Delgado Airport',
          tags: ['aerial', 'sunset', 'arrival'],
        },
        {
          src: '/demo-assets/lisbon-prologue-02.webp',
          alt: 'Window seat view of an airplane wing above orange clouds at dusk',
          caption: 'Somewhere over Galicia',
          time: '17:18',
          location: 'Above the Atlantic',
          tags: ['flight', 'window'],
        },
        {
          src: '/demo-assets/lisbon-prologue-03.webp',
          alt: 'Lisbon old town skyline at night with city lights glowing against the hills',
          caption: 'First night, from our balcony',
          time: '22:30',
          location: 'Alfama, Lisbon',
          tags: ['skyline', 'night'],
        },
      ],
      gridVariant: 'feature',
    },
    {
      id: 1,
      label: 'Day 1',
      date: '2026.08.13',
      title: 'A slow morning in Alfama.',
      body: 'Our first full day. We had no plan beyond coffee. Alfama does not reward plans — it rewards getting lost. Every staircase led somewhere smaller and quieter: a tiled courtyard, a café with three tables, an old woman shaking a rug from a second-floor window. We did not check the time until almost noon.',
      photos: [
        {
          src: '/demo-assets/lisbon-day1-01.webp',
          alt: 'Narrow cobblestone alley in Alfama with hanging laundry and tiled walls',
          caption: 'The first alley',
          time: '08:14',
          location: 'Beco do Carvalho, Alfama',
        },
        {
          src: '/demo-assets/lisbon-day1-02.webp',
          alt: 'Yellow Tram 28 climbing a steep cobblestone street in Alfama',
          caption: 'Tram 28, gone before we could board',
          time: '09:02',
          location: 'Largo das Portas do Sol',
        },
        {
          src: '/demo-assets/lisbon-day1-03.webp',
          alt: 'Close-up of weathered blue and white azulejo tiles on a façade',
          caption: 'The tiles are everywhere',
          time: '09:46',
          location: 'Rua de São Miguel',
        },
        {
          src: '/demo-assets/lisbon-day1-04.webp',
          alt: 'Tiny Portuguese café with marble table and bica coffee in a glass cup',
          caption: 'Our first bica',
          time: '10:15',
          location: 'Pastelaria São Miguel',
        },
        {
          src: '/demo-assets/lisbon-day1-05.webp',
          alt: 'Steep stone staircase between pastel-colored buildings in Alfama',
          caption: 'Stairs to nowhere in particular',
          time: '10:58',
          location: 'Largo de Santo Estêvão',
        },
        {
          src: '/demo-assets/lisbon-day1-06.webp',
          alt: 'A cat watching the street from a sunlit windowsill in Alfama',
          caption: 'The cat knew',
          time: '11:32',
          location: 'Travessa do Outeirinho',
        },
      ],
      gridVariant: 'dense',
    },
    {
      id: 2,
      label: 'Day 2',
      date: '2026.08.14',
      title: 'Cais do Sodré, after sunset.',
      body: 'We avoided the riverside all day — too obvious, too many tourists. After dinner we walked down anyway and the night was already soft, pink-lit, loud in a different language. The Pink Street does not photograph the way it feels. The market at Time Out was closing, but a guitarist in the corner kept playing.',
      photos: [
        {
          src: '/demo-assets/lisbon-day2-01.webp',
          alt: 'The Pink Street (Rua Nova do Carvalho) glowing pink at night with crowds',
          caption: 'The Pink Street',
          time: '21:18',
          location: 'Rua Nova do Carvalho',
        },
        {
          src: '/demo-assets/lisbon-day2-02.webp',
          alt: 'Time Out Market interior with food stalls and warm lighting',
          caption: 'Time Out, last orders',
          time: '21:55',
          location: 'Mercado da Ribeira',
        },
        {
          src: '/demo-assets/lisbon-day2-03.webp',
          alt: 'Tagus riverside promenade at night with reflections on wet pavement',
          caption: 'Riverside walk home',
          time: '23:02',
          location: 'Cais do Sodré',
        },
        {
          src: '/demo-assets/lisbon-day2-04.webp',
          alt: 'Neon sign above a small bar in Cais do Sodré',
          caption: 'Neon, somewhere',
          time: '23:24',
          location: 'Rua Paul',
        },
        {
          src: '/demo-assets/lisbon-day2-05.webp',
          alt: 'Grilled sardines on a metal plate in a traditional tasca',
          caption: 'The sardines',
          time: '20:18',
          location: 'Tasca da Esquina',
        },
        {
          src: '/demo-assets/lisbon-day2-06.webp',
          alt: 'Street musician playing guitar under a yellow street lamp',
          caption: 'He played for tips and for the night',
          time: '22:46',
          location: 'Largo de São Paulo',
        },
        {
          src: '/demo-assets/lisbon-day2-07.webp',
          alt: 'Reflection of neon signs in a puddle on pink-painted pavement',
          caption: 'Pink reflection',
          time: '23:08',
          location: 'Rua Nova do Carvalho',
        },
      ],
      gridVariant: 'dense',
    },
    {
      id: 3,
      label: 'Day 3',
      date: '2026.08.15',
      title: 'Sintra, in the clouds.',
      body: 'We took the 40-minute train to Sintra expecting postcard colors. We got fog instead. The Pena Palace emerged out of the mist like something invented rather than built, and the gardens at Quinta da Regaleira felt like a place where someone had once tried very hard to keep a secret. We did not see the sun all day. It did not matter.',
      photos: [
        {
          src: '/demo-assets/lisbon-day3-01.webp',
          alt: 'Pena Palace in Sintra emerging from thick morning fog',
          caption: 'Pena, half-imagined',
          time: '10:24',
          location: 'Parque e Palácio Nacional da Pena',
        },
        {
          src: '/demo-assets/lisbon-day3-02.webp',
          alt: 'Misty forest path covered in moss in the Sintra hills',
          caption: 'The path down',
          time: '11:38',
          location: 'Quinta da Regaleira',
        },
        {
          src: '/demo-assets/lisbon-day3-03.webp',
          alt: 'Stone ramparts of the Moorish Castle disappearing into cloud',
          caption: 'Castelo dos Mouros, in the clouds',
          time: '13:12',
          location: 'Castelo dos Mouros',
        },
        {
          src: '/demo-assets/lisbon-day3-04.webp',
          alt: 'Initiation Well spiral staircase descending into the earth at Quinta da Regaleira',
          caption: 'The Initiation Well',
          time: '12:04',
          location: 'Quinta da Regaleira',
        },
        {
          src: '/demo-assets/lisbon-day3-05.webp',
          alt: 'Moss-covered stone grotto with dripping water in Sintra gardens',
          caption: 'Where the secret was kept',
          time: '12:48',
          location: 'Quinta da Regaleira',
        },
        {
          src: '/demo-assets/lisbon-day3-06.webp',
          alt: 'Tower of the Moorish Castle silhouetted against pale misty sky',
          caption: 'The watchtower',
          time: '13:34',
          location: 'Castelo dos Mouros',
        },
      ],
      gridVariant: 'spacious',
    },
    {
      id: 4,
      label: 'Day 4',
      date: '2026.08.16',
      title: 'Cascais, where the river ends.',
      body: 'The train to Cascais follows the coast for half an hour. We got off at the last stop and walked toward the ocean. The wind was stronger than we expected. Boca do Inferno was louder than its photographs. We stayed on the rocks until the sun went down, then ate grilled fish in a place where no one spoke English and somehow it did not matter.',
      photos: [
        {
          src: '/demo-assets/lisbon-day4-01.webp',
          alt: 'Cascais coastline with white houses and the Atlantic Ocean',
          caption: 'Where the river meets the sea',
          time: '14:18',
          location: 'Cascais Bay',
        },
        {
          src: '/demo-assets/lisbon-day4-02.webp',
          alt: 'Boca do Inferno (Hell\'s Mouth) with dramatic waves crashing into a sea cave',
          caption: 'Boca do Inferno',
          time: '16:02',
          location: 'Boca do Inferno',
        },
        {
          src: '/demo-assets/lisbon-day4-03.webp',
          alt: 'Guincho Beach at sunset with windblown sand and silhouetted surfers',
          caption: 'Guincho, last light',
          time: '19:38',
          location: 'Praia do Guincho',
        },
        {
          src: '/demo-assets/lisbon-day4-04.webp',
          alt: 'Santa Marta Lighthouse in Cascais at dusk',
          caption: 'Santa Marta',
          time: '20:14',
          location: 'Farol Museu de Santa Marta',
        },
        {
          src: '/demo-assets/lisbon-day4-05.webp',
          alt: 'Cascais marina at dusk with masts reflected in still water',
          caption: 'Marina, after dinner',
          time: '21:46',
          location: 'Marina de Cascais',
        },
      ],
      gridVariant: 'spacious',
    },
    {
      id: 5,
      label: 'Day 5',
      date: '2026.08.17',
      title: 'The long way home.',
      body: 'Our last morning. We went back to the pastelaria we had found on Day 1 and ordered the same thing. We bought postcards we did not need and ceramics we did not have room for. The tram to the airport left on time. We did not say much.',
      photos: [
        {
          src: '/demo-assets/lisbon-day5-01.webp',
          alt: 'Souvenir shop window with traditional Portuguese ceramics and sardine tins',
          caption: 'Last-minute everything',
          time: '09:48',
          location: 'Rua Augusta',
        },
        {
          src: '/demo-assets/lisbon-day5-02.webp',
          alt: 'Pastel de nata on a small ceramic plate with espresso',
          caption: 'One last pastel de nata',
          time: '10:24',
          location: 'Manteigaria, Chiado',
        },
        {
          src: '/demo-assets/lisbon-day5-03.webp',
          alt: 'View from inside a Lisbon tram showing the city through the window',
          caption: 'Tram window, going west',
          time: '12:18',
          location: 'Tram 15, toward Algés',
        },
        {
          src: '/demo-assets/lisbon-day5-04.webp',
          alt: 'Luggage handle on a sunlit marble floor of a Lisbon airport terminal',
          caption: 'Time to go',
          time: '14:32',
          location: 'Humberto Delgado Airport',
        },
      ],
      gridVariant: 'spacious',
    },
    {
      id: 6,
      label: 'Epilogue',
      date: '',
      title: 'What we brought back.',
      body: 'A bag of ceramics. A notebook of menus. A handful of tram tickets we kept meaning to throw away. Lisbon, it turns out, is a city that does not need a thesis.',
      photos: [
        {
          src: '/demo-assets/lisbon-epilogue-01.webp',
          alt: 'Flat lay of postcards, train tickets, and travel ephemera on a wooden table',
          caption: 'The paper trail',
        },
        {
          src: '/demo-assets/lisbon-epilogue-02.webp',
          alt: 'Portuguese ceramic tiles and a sardine tin arranged on linen',
          caption: 'What survived the luggage',
        },
        {
          src: '/demo-assets/lisbon-epilogue-03.webp',
          alt: 'Open notebook with handwritten Portuguese recipes and coffee stains',
          caption: 'The notebook',
        },
      ],
      gridVariant: 'feature',
    },
  ],
}
```

- [ ] **Step 2.2: Verify the data file type-checks**

```bash
cd /Users/hl/Projects/TagAll
npx tsc --noEmit
```
Expected: no errors. If error "Cannot find module" — re-check imports.

- [ ] **Step 2.3: Commit**

```bash
git add content/lisbon-album.ts
git commit -m "feat(lisbon-album): add data layer with 7 chapters and photo metadata

Defines AlbumPhoto, Chapter, LisbonAlbumData types.
All photo src paths reference /demo-assets/lisbon-*.webp.
Data-driven: components will consume this single source."
```

---

## Task 3: Static Shell — Register Demo and Render Chapters (No Animation Yet)

**Goal:** Make `/demos/lisbon-album` return a 200 response showing all 7 chapters with photos. No intro animation, no lightbox, no chapter nav — just the static narrative scrollable end-to-end. Validates routing, data flow, and dark Editorial styling.

**Files:**
- Modify: `content/demos.ts` (add 1 entry)
- Modify: `app/demos/[slug]/page.tsx` (add 1 import + 1 mapping line)
- Create: `components/demos/LisbonAlbumDemo.tsx`
- Create: `components/demos/lisbon/LisbonChapter.tsx`
- Create: `components/demos/lisbon/LisbonPhotoGrid.tsx`

- [ ] **Step 3.1: Register the demo in content**

Edit `content/demos.ts`. Add a new entry inside the `demos` array (after the last entry, before the closing `]`):

```ts
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
```

- [ ] **Step 3.2: Register the slug → component mapping**

Edit `app/demos/[slug]/page.tsx`. Add the import after line 9 (the `WeddingDemo` import):

```ts
import { LisbonAlbumDemo } from '@/components/demos/LisbonAlbumDemo'
```

And in the `pages` object (currently lines 11-18), add:

```ts
const pages = {
  'smart-pet-tag': PetTagDemo,
  'digital-business-card': BusinessCardDemo,
  'portrait-story': PortraitStoryDemo,
  'interactive-resume': ResumeDemo,
  'wedding-invitation': WeddingDemo,
  'creator-product-story': CreatorStoryDemo,
  'lisbon-album': LisbonAlbumDemo,
} as const
```

- [ ] **Step 3.3: Create the photo grid component**

Create `components/demos/lisbon/LisbonPhotoGrid.tsx`:

```tsx
import Image from 'next/image'
import type { AlbumPhoto, PhotoGridVariant } from '@/content/lisbon-album'

type Props = {
  photos: AlbumPhoto[]
  variant: PhotoGridVariant
  onPhotoClick?: (index: number) => void
}

export function LisbonPhotoGrid({ photos, variant, onPhotoClick }: Props) {
  if (variant === 'feature') {
    // Single hero + smaller supporting photos
    const [hero, ...rest] = photos
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.6fr_1fr]">
        <PhotoCard photo={hero} index={0} onClick={onPhotoClick} aspect="aspect-[4/3]" eager />
        {rest.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            {rest.map((p, i) => (
              <PhotoCard key={p.src} photo={p} index={i + 1} onClick={onPhotoClick} aspect="aspect-[4/3]" />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'spacious') {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {photos.map((p, i) => (
          <PhotoCard
            key={p.src}
            photo={p}
            index={i}
            onClick={onPhotoClick}
            aspect="aspect-[4/3]"
            className={i === 0 ? 'sm:col-span-2' : ''}
          />
        ))}
      </div>
    )
  }

  // dense — irregular 3-column grid
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {photos.map((p, i) => (
        <PhotoCard
          key={p.src}
          photo={p}
          index={i}
          onClick={onPhotoClick}
          aspect="aspect-[4/5]"
          className={
            // Make the first photo span 2 rows on desktop for visual interest
            i === 0 ? 'md:row-span-2 md:aspect-auto' : ''
          }
        />
      ))}
    </div>
  )
}

type PhotoCardProps = {
  photo: AlbumPhoto
  index: number
  aspect: string
  className?: string
  eager?: boolean
  onClick?: (index: number) => void
}

function PhotoCard({ photo, index, aspect, className = '', eager, onClick }: PhotoCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(index)}
      className={`group relative overflow-hidden rounded-2xl bg-[#1f2329] text-left transition hover:-translate-y-0.5 ${
        aspect.includes('auto') ? 'h-full min-h-[280px]' : aspect
      } ${className}`}
      aria-label={photo.caption ? `Open ${photo.caption} in viewer` : 'Open photo in viewer'}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-[1.03]"
        {...(eager ? { priority: true, loading: 'eager' as const } : {})}
      />
      {photo.caption && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0e1014]/85 via-[#0e1014]/30 to-transparent p-4 pt-12 opacity-0 transition duration-300 group-hover:opacity-100">
          <p className="font-[Georgia,serif] text-sm italic text-[#f0f2f5]">{photo.caption}</p>
          {photo.location && (
            <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[#d4a574]">
              {photo.location}
            </p>
          )}
        </div>
      )}
    </button>
  )
}
```

- [ ] **Step 3.4: Create the chapter component**

Create `components/demos/lisbon/LisbonChapter.tsx`:

```tsx
import { Reveal } from '@/components/marketing/Reveal'
import { LisbonPhotoGrid } from './LisbonPhotoGrid'
import type { Chapter } from '@/content/lisbon-album'

type Props = {
  chapter: Chapter
  onPhotoClick: (photoIndex: number) => void
}

export function LisbonChapter({ chapter, onPhotoClick }: Props) {
  const paddedNumber = String(chapter.id).padStart(2, '0')

  return (
    <section
      id={`chapter-${chapter.id}`}
      className="border-t border-[#1f2329] scroll-mt-24"
      aria-labelledby={`chapter-${chapter.id}-title`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-12 md:gap-12 md:py-36">
        <Reveal className="md:col-span-3">
          <p
            className="font-[Georgia,serif] text-[clamp(3rem,5vw,4rem)] font-light leading-none tracking-[-0.04em] text-[#d4a574]"
          >
            {paddedNumber}
          </p>
          <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.18em] text-[#6b6d73]">
            {chapter.label}
            {chapter.date && <span className="ml-2 text-[#8b8d93]">· {chapter.date}</span>}
          </p>
        </Reveal>

        <div className="md:col-span-9">
          <Reveal>
            <h3
              id={`chapter-${chapter.id}-title`}
              className="font-[Georgia,serif] text-[clamp(1.75rem,2.6vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.03em] text-[#f0f2f5]"
            >
              {chapter.title}
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[44ch] font-sans text-base leading-[1.7] text-[#a8aab0]">
              {chapter.body}
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-10">
            <LisbonPhotoGrid
              photos={chapter.photos}
              variant={chapter.gridVariant}
              onPhotoClick={(i) => onPhotoClick(i)}
            />
            {chapter.photos.length > 0 && (
              <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.18em] text-[#6b6d73]">
                {chapter.photos.length} photographs
                {chapter.photos[0]?.location && (
                  <span className="ml-2 text-[#4a4d55]">· {chapter.photos[0].location.split(',').pop()?.trim()}</span>
                )}
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3.5: Create the root LisbonAlbumDemo component**

Create `components/demos/LisbonAlbumDemo.tsx`:

```tsx
'use client'

import { DemoChrome } from './DemoChrome'
import { LisbonChapter } from './lisbon/LisbonChapter'
import { lisbonAlbum } from '@/content/lisbon-album'

export function LisbonAlbumDemo() {
  // Temporary stub: intro and lightbox will be added in subsequent tasks
  return (
    <DemoChrome slug="lisbon-album" tone="dark">
      <main className="bg-[#0e1014] text-[#f0f2f5]">
        {/* Hero (temporary static version — replaced by LisbonIntro in Task 5) */}
        <section className="relative flex min-h-[80vh] items-end overflow-hidden">
          <div className="absolute inset-0">
            {/* Use first hero photo as placeholder */}
            <ChapterHeroPhoto src={lisbonAlbum.heroPhotos[0].src} alt={lisbonAlbum.heroPhotos[0].alt} />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-24">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#d4a574]">
              {lisbonAlbum.tagline}
            </p>
            <h1 className="mt-4 max-w-[12ch] font-[Georgia,serif] text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
              Five days by the Atlantic.
            </h1>
            <p className="mt-6 max-w-[42ch] font-sans text-base leading-[1.7] text-[#c8cace]">
              A Lisbon travelogue in seven chapters, told through photographs and the small notes we
              wrote on the back of tram tickets.
            </p>
          </div>
        </section>

        {/* Chapters */}
        {lisbonAlbum.chapters.map((chapter) => (
          <LisbonChapter
            key={chapter.id}
            chapter={chapter}
            onPhotoClick={() => {
              // Lightbox wired up in Task 4
            }}
          />
        ))}

        {/* Closing quote (epilogue extension) */}
        <section className="mx-auto max-w-[1400px] px-5 py-32 sm:px-8 sm:py-48">
          <p className="mx-auto max-w-[28ch] text-center font-[Georgia,serif] text-[clamp(1.5rem,2.6vw,2.2rem)] font-normal italic leading-[1.3] tracking-[-0.02em] text-[#d4a574]">
            &ldquo;{lisbonAlbum.closingQuote}&rdquo;
          </p>
          <p className="mt-10 text-center font-sans text-[11px] uppercase tracking-[0.2em] text-[#6b6d73]">
            {lisbonAlbum.authorName} · Lisbon · 08.2026
          </p>
        </section>
      </main>
    </DemoChrome>
  )
}

// Temporary helper for the static hero (will be replaced by LisbonIntro)
import Image from 'next/image'
function ChapterHeroPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-[#0e1014]/30 to-transparent" />
    </>
  )
}
```

- [ ] **Step 3.6: Type-check, lint, dev verify**

```bash
cd /Users/hl/Projects/TagAll
npx tsc --noEmit
npm run lint
npm run dev
```

Manual checks in browser at `http://localhost:3000/demos/lisbon-album`:
- [ ] Page loads, dark background (`#0e1014`)
- [ ] Hero section shows first hero photo with title "Five days by the Atlantic."
- [ ] All 7 chapters render in order (00 Prologue → 06 Epilogue)
- [ ] Each chapter shows: number, label, date, title, body, photo grid
- [ ] Closing quote section at the bottom
- [ ] DemoChrome header/footer present, "next demo" rotates correctly

Press Ctrl+C in the dev server terminal when done.

- [ ] **Step 3.7: Commit**

```bash
git add content/demos.ts app/demos/[slug]/page.tsx components/demos/LisbonAlbumDemo.tsx components/demos/lisbon/
git commit -m "feat(lisbon-album): register demo and render static 7-chapter narrative

Wraps in DemoChrome tone=dark. Uses Editorial Cinematic dark palette
(#0e1014 bg, #d4a574 gold accent). Three photo grid variants: dense,
spacious, feature. No intro animation or lightbox yet."
```

---

## Task 4: Lightbox — Full-Screen Photo Viewer

**Goal:** Add a portal-rendered lightbox that opens when any photo is clicked, supports keyboard + swipe navigation, and displays photo metadata.

**Files:**
- Modify: `components/demos/LisbonAlbumDemo.tsx` (add state + render lightbox)
- Create: `components/demos/lisbon/LisbonLightbox.tsx`

This task is testable in isolation — once implemented, click any photo in the demo to verify.

- [ ] **Step 4.1: Create the LisbonLightbox component**

Create `components/demos/lisbon/LisbonLightbox.tsx`:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react/dist/ssr'
import type { AlbumPhoto } from '@/content/lisbon-album'

type Props = {
  photos: AlbumPhoto[]
  index: number | null  // null = closed
  onClose: () => void
  onChange: (index: number) => void
  chapterLabel?: string
}

export function LisbonLightbox({ photos, index, onClose, onChange, chapterLabel }: Props) {
  const reduce = useReducedMotion()
  const mounted = typeof window !== 'undefined'
  const [mountedState, setMountedState] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMountedState(true)
  }, [])

  // Lock body scroll while open
  useEffect(() => {
    if (index === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [index])

  // Move focus to close button on open
  useEffect(() => {
    if (index !== null) {
      // Small delay so the button exists in DOM
      const id = window.setTimeout(() => closeBtnRef.current?.focus(), 60)
      return () => window.clearTimeout(id)
    }
  }, [index])

  // Keyboard navigation
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && index > 0) onChange(index - 1)
      else if (e.key === 'ArrowRight' && index < photos.length - 1) onChange(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, photos.length, onClose, onChange])

  // Touch swipe
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || index === null) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 50 && index > 0) onChange(index - 1)
      else if (dx < -50 && index < photos.length - 1) onChange(index + 1)
    } else {
      // Vertical swipe — swipe down to close
      if (dy > 80) onClose()
    }
    touchStart.current = null
  }

  if (!mounted || !mountedState) return null

  const photo = index !== null ? photos[index] : null
  const isOpen = photo !== null

  return createPortal(
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={(e) => {
            // Close on backdrop click (not on photo itself)
            if (e.target === e.currentTarget) onClose()
          }}
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption || 'Photo viewer'}
        >
          {/* Close button (top-right) */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white/80 backdrop-blur-md transition hover:bg-white/14 hover:text-white"
            aria-label="Close photo viewer"
          >
            <X size={18} weight="bold" />
          </button>

          {/* Counter (top-left) */}
          <p className="absolute left-5 top-5 z-10 font-sans text-xs uppercase tracking-[0.18em] text-white/50">
            {String(index! + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </p>

          {/* Previous button */}
          {index! > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange(index! - 1)
              }}
              className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/6 text-white/70 backdrop-blur-md transition hover:bg-white/12 hover:text-white"
              aria-label="Previous photo"
            >
              <ArrowLeft size={20} weight="bold" />
            </button>
          )}

          {/* Next button */}
          {index! < photos.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange(index! + 1)
              }}
              className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/6 text-white/70 backdrop-blur-md transition hover:bg-white/12 hover:text-white"
              aria-label="Next photo"
            >
              <ArrowRight size={20} weight="bold" />
            </button>
          )}

          {/* Photo */}
          <motion.div
            key={photo.src}
            className="relative h-[72vh] max-h-[80vh] w-auto max-w-[90vw]"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </motion.div>

          {/* Metadata footer */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent px-5 pb-6 pt-12 sm:px-8 sm:pb-10">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-[60ch]">
                {chapterLabel && (
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#d4a574]">
                    {chapterLabel}
                  </p>
                )}
                {photo.caption && (
                  <p className="mt-2 font-[Georgia,serif] text-lg italic text-white">
                    {photo.caption}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[11px] uppercase tracking-[0.15em] text-white/55">
                  {photo.time && <span>{photo.time}</span>}
                  {photo.location && <span>{photo.location}</span>}
                </div>
              </div>
              <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/35">
                ESC to close · ← → to navigate
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
```

- [ ] **Step 4.2: Wire the lightbox into LisbonAlbumDemo**

Edit `components/demos/LisbonAlbumDemo.tsx`. Replace the entire file content with:

```tsx
'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { DemoChrome } from './DemoChrome'
import { LisbonChapter } from './lisbon/LisbonChapter'
import { LisbonLightbox } from './lisbon/LisbonLightbox'
import { lisbonAlbum } from '@/content/lisbon-album'
import type { AlbumPhoto } from '@/content/lisbon-album'

// Flatten all photos across chapters, remembering which chapter each came from.
type FlatPhoto = AlbumPhoto & { chapterId: number; chapterLabel: string }

export function LisbonAlbumDemo() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Build a flat list of all photos for the lightbox traversal.
  const flatPhotos: FlatPhoto[] = useMemo(() => {
    return lisbonAlbum.chapters.flatMap((c) =>
      c.photos.map((p) => ({ ...p, chapterId: c.id, chapterLabel: c.label })),
    )
  }, [])

  // Map from (chapterId, photoIndexWithinChapter) -> flatIndex
  const findFlatIndex = (chapterId: number, photoIndex: number) => {
    let running = 0
    for (const c of lisbonAlbum.chapters) {
      if (c.id === chapterId) return running + photoIndex
      running += c.photos.length
    }
    return null
  }

  return (
    <DemoChrome slug="lisbon-album" tone="dark">
      <main className="bg-[#0e1014] text-[#f0f2f5]">
        {/* Hero (temporary static version — replaced by LisbonIntro in Task 5) */}
        <section className="relative flex min-h-[80vh] items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={lisbonAlbum.heroPhotos[0].src}
              alt={lisbonAlbum.heroPhotos[0].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-[#0e1014]/30 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-24">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#d4a574]">
              {lisbonAlbum.tagline}
            </p>
            <h1 className="mt-4 max-w-[12ch] font-[Georgia,serif] text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
              Five days by the Atlantic.
            </h1>
            <p className="mt-6 max-w-[42ch] font-sans text-base leading-[1.7] text-[#c8cace]">
              A Lisbon travelogue in seven chapters, told through photographs and the small notes we
              wrote on the back of tram tickets.
            </p>
          </div>
        </section>

        {/* Chapters */}
        {lisbonAlbum.chapters.map((chapter) => (
          <LisbonChapter
            key={chapter.id}
            chapter={chapter}
            onPhotoClick={(photoIdx) => {
              const flatIdx = findFlatIndex(chapter.id, photoIdx)
              if (flatIdx !== null) setLightboxIndex(flatIdx)
            }}
          />
        ))}

        {/* Closing quote */}
        <section className="mx-auto max-w-[1400px] px-5 py-32 sm:px-8 sm:py-48">
          <p className="mx-auto max-w-[28ch] text-center font-[Georgia,serif] text-[clamp(1.5rem,2.6vw,2.2rem)] font-normal italic leading-[1.3] tracking-[-0.02em] text-[#d4a574]">
            &ldquo;{lisbonAlbum.closingQuote}&rdquo;
          </p>
          <p className="mt-10 text-center font-sans text-[11px] uppercase tracking-[0.2em] text-[#6b6d73]">
            {lisbonAlbum.authorName} · Lisbon · 08.2026
          </p>
        </section>
      </main>

      <LisbonLightbox
        photos={flatPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
        chapterLabel={lightboxIndex !== null ? flatPhotos[lightboxIndex]?.chapterLabel : undefined}
      />
    </DemoChrome>
  )
}
```

- [ ] **Step 4.3: Type-check, lint, dev verify**

```bash
npx tsc --noEmit
npm run lint
npm run dev
```

Manual checks at `http://localhost:3000/demos/lisbon-album`:
- [ ] Click any photo → lightbox opens, black backdrop, photo centered
- [ ] Counter "01 / 31" visible top-left (or whatever the index is)
- [ ] Close button visible top-right, focused
- [ ] Right arrow appears if not last photo; click advances
- [ ] Left arrow appears if not first photo; click goes back
- [ ] Keyboard ← → ESC all work
- [ ] Click backdrop (outside photo) closes
- [ ] Metadata footer shows caption + time + location + chapter label
- [ ] On mobile width: swipe left/right navigates, swipe down closes

- [ ] **Step 4.4: Commit**

```bash
git add components/demos/lisbon/LisbonLightbox.tsx components/demos/LisbonAlbumDemo.tsx
git commit -m "feat(lisbon-album): add full-screen photo lightbox with keyboard + swipe

Portal-rendered to document.body. Body scroll lock while open.
Keyboard: ←/→ navigate, ESC close. Mobile: horizontal swipe navigate,
vertical swipe-down close. Displays chapter label, caption, time, location."
```

---

## Task 5: Intro Animation — Letterbox + Ken Burns Sequence

**Goal:** Replace the static hero with a 12-second cinematic intro animation that locks scroll, plays letterbox reveal + 4-photo Ken Burns crossfade cycle, then shows title + "Start browsing" button to unlock.

**Files:**
- Create: `components/demos/lisbon/LisbonIntro.tsx`
- Modify: `components/demos/LisbonAlbumDemo.tsx` (gate content behind intro completion)

- [ ] **Step 5.1: Create the LisbonIntro component**

Create `components/demos/lisbon/LisbonIntro.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { lisbonAlbum } from '@/content/lisbon-album'

type Phase = 'letterbox' | 'kenburns' | 'title' | 'done'

type Props = {
  onComplete: () => void
}

const TOTAL_DURATION_MS = 12000
const LETTERBOX_MS = 1500
const KENBURNS_END_MS = 10000
const PHOTO_INTERVAL_MS = 2125 // (KENBURNS_END_MS - LETTERBOX_MS) / 4 photos

export function LisbonIntro({ onComplete }: Props) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduce ? 'done' : 'letterbox')
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isSkipping, setIsSkipping] = useState(false)

  // Reduced motion: skip everything
  useEffect(() => {
    if (reduce) {
      const t = window.setTimeout(onComplete, 50)
      return () => window.clearTimeout(t)
    }
  }, [reduce, onComplete])

  // Phase timeline
  useEffect(() => {
    if (reduce) return

    const timers: number[] = []

    timers.push(window.setTimeout(() => setPhase('kenburns'), LETTERBOX_MS))
    timers.push(window.setTimeout(() => setPhase('title'), KENBURNS_END_MS))
    timers.push(window.setTimeout(() => onComplete(), TOTAL_DURATION_MS))

    // Photo rotation during kenburns phase
    for (let i = 1; i < 4; i++) {
      timers.push(
        window.setTimeout(() => setPhotoIndex(i), LETTERBOX_MS + i * PHOTO_INTERVAL_MS),
      )
    }

    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [reduce, onComplete])

  // Lock body scroll during intro
  useEffect(() => {
    if (phase === 'done') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  const handleSkip = () => {
    if (isSkipping) return
    setIsSkipping(true)
    onComplete()
  }

  if (phase === 'done') return null

  const photos = lisbonAlbum.heroPhotos

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Ken Burns photos layer */}
      <div className="absolute inset-0">
        {photos.map((photo, i) => {
          const isActive = i === photoIndex
          return (
            <motion.div
              key={photo.src}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive && phase === 'kenburns' ? 1.12 : isActive ? 1 : 1.12,
                x: isActive ? '-1.5%' : '0%',
                y: isActive ? '-1%' : '0%',
              }}
              transition={{
                opacity: { duration: 0.8, ease: 'easeInOut' },
                scale: { duration: 6, ease: [0.25, 0.1, 0.25, 1] },
                x: { duration: 6, ease: [0.25, 0.1, 0.25, 1] },
                y: { duration: 6, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          )
        })}
        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
      </div>

      {/* Cinematic letterbox bars */}
      {phase === 'letterbox' && (
        <>
          <motion.div
            className="absolute inset-x-0 top-0 z-20 bg-black"
            initial={{ height: '40vh' }}
            animate={{ height: 0 }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 z-20 bg-black"
            initial={{ height: '40vh' }}
            animate={{ height: 0 }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          />
        </>
      )}

      {/* Tagline (visible during kenburns phase) */}
      <AnimatePresence>
        {phase === 'kenburns' && (
          <motion.p
            key="tagline"
            className="absolute left-5 top-5 z-20 font-sans text-[10px] uppercase tracking-[0.25em] text-white/55 sm:left-8 sm:top-8 sm:text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {lisbonAlbum.tagline}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Title + start button (visible during title phase) */}
      <AnimatePresence>
        {phase === 'title' && (
          <motion.div
            key="title"
            className="absolute inset-x-0 bottom-0 z-30 px-5 pb-16 sm:px-12 sm:pb-28 md:px-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="max-w-[14ch] font-[Georgia,serif] text-[clamp(2.75rem,8vw,6rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
              Five days by the Atlantic.
            </h1>
            <div className="mt-10 flex items-center gap-6">
              <button
                type="button"
                onClick={handleSkip}
                className="group inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3.5 font-sans text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/16"
              >
                <span>Start browsing</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  ↓
                </motion.span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip intro button (top right) */}
      {phase !== 'title' && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute right-5 top-5 z-30 rounded-full bg-white/8 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md transition hover:bg-white/14 hover:text-white/90 sm:right-8 sm:top-8"
        >
          Skip intro
        </button>
      )}

      {/* Timeline progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/8">
        <motion.div
          className="h-full bg-[#d4a574]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: TOTAL_DURATION_MS / 1000, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 5.2: Wire LisbonIntro into LisbonAlbumDemo**

Edit `components/demos/LisbonAlbumDemo.tsx`. Replace its content with:

```tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { DemoChrome } from './DemoChrome'
import { LisbonChapter } from './lisbon/LisbonChapter'
import { LisbonLightbox } from './lisbon/LisbonLightbox'
import { LisbonIntro } from './lisbon/LisbonIntro'
import { lisbonAlbum } from '@/content/lisbon-album'
import type { AlbumPhoto } from '@/content/lisbon-album'

type FlatPhoto = AlbumPhoto & { chapterId: number; chapterLabel: string }

export function LisbonAlbumDemo() {
  const [introCompleted, setIntroCompleted] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const flatPhotos: FlatPhoto[] = useMemo(() => {
    return lisbonAlbum.chapters.flatMap((c) =>
      c.photos.map((p) => ({ ...p, chapterId: c.id, chapterLabel: c.label })),
    )
  }, [])

  const findFlatIndex = (chapterId: number, photoIndex: number) => {
    let running = 0
    for (const c of lisbonAlbum.chapters) {
      if (c.id === chapterId) return running + photoIndex
      running += c.photos.length
    }
    return null
  }

  return (
    <DemoChrome slug="lisbon-album" tone="dark">
      {/* Intro overlay (until complete) */}
      {!introCompleted && <LisbonIntro onComplete={() => setIntroCompleted(true)} />}

      <main className="bg-[#0e1014] text-[#f0f2f5]" aria-hidden={!introCompleted}>
        {/* Hero (becomes visible after intro; gives the scroll target something to land on) */}
        <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={lisbonAlbum.heroPhotos[0].src}
              alt={lisbonAlbum.heroPhotos[0].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-[#0e1014]/30 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-24">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#d4a574]">
              {lisbonAlbum.tagline}
            </p>
            <h1 className="mt-4 max-w-[12ch] font-[Georgia,serif] text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
              Five days by the Atlantic.
            </h1>
            <p className="mt-6 max-w-[42ch] font-sans text-base leading-[1.7] text-[#c8cace]">
              A Lisbon travelogue in seven chapters, told through photographs and the small notes we
              wrote on the back of tram tickets.
            </p>
          </div>
        </section>

        {/* Chapters */}
        {lisbonAlbum.chapters.map((chapter) => (
          <LisbonChapter
            key={chapter.id}
            chapter={chapter}
            onPhotoClick={(photoIdx) => {
              const flatIdx = findFlatIndex(chapter.id, photoIdx)
              if (flatIdx !== null) setLightboxIndex(flatIdx)
            }}
          />
        ))}

        {/* Closing quote */}
        <section className="mx-auto max-w-[1400px] px-5 py-32 sm:px-8 sm:py-48">
          <p className="mx-auto max-w-[28ch] text-center font-[Georgia,serif] text-[clamp(1.5rem,2.6vw,2.2rem)] font-normal italic leading-[1.3] tracking-[-0.02em] text-[#d4a574]">
            &ldquo;{lisbonAlbum.closingQuote}&rdquo;
          </p>
          <p className="mt-10 text-center font-sans text-[11px] uppercase tracking-[0.2em] text-[#6b6d73]">
            {lisbonAlbum.authorName} · Lisbon · 08.2026
          </p>
        </section>
      </main>

      <LisbonLightbox
        photos={flatPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
        chapterLabel={lightboxIndex !== null ? flatPhotos[lightboxIndex]?.chapterLabel : undefined}
      />
    </DemoChrome>
  )
}
```

- [ ] **Step 5.3: Type-check, lint, dev verify**

```bash
npx tsc --noEmit
npm run lint
npm run dev
```

Manual checks at `http://localhost:3000/demos/lisbon-album`:
- [ ] On load: black screen with two thick black bars (top and bottom)
- [ ] Bars retract over ~1 second revealing a Ken Burns hero photo
- [ ] First photo slowly zooms/pans for ~2 seconds
- [ ] Crossfades to second hero photo (Sintra Pena Palace)
- [ ] Crossfades to third (Cascais coast)
- [ ] Crossfades to fourth (Alfama tiles)
- [ ] After ~10 seconds: title "Five days by the Atlantic." fades in from below, "Start browsing" button appears
- [ ] After 12 seconds: intro overlay disappears, page is scrollable
- [ ] Click "Skip intro" at any time → immediately jumps to scrollable page
- [ ] Click "Start browsing" → immediately jumps to scrollable page
- [ ] Progress bar at bottom advances linearly over 12 seconds
- [ ] During intro: body scroll is locked (try scrolling — no movement)
- [ ] In macOS System Settings → Accessibility → Display → "Reduce motion": intro instantly completes

- [ ] **Step 5.4: Commit**

```bash
git add components/demos/lisbon/LisbonIntro.tsx components/demos/LisbonAlbumDemo.tsx
git commit -m "feat(lisbon-album): add 12s cinematic intro with letterbox + Ken Burns

Stage 1: 0-1.5s letterbox bars retract, 1.5-10s Ken Burns cycle through
4 hero photos with 2s crossfades, 10-12s title + 'Start browsing'
button fade-in. Scroll locked during intro. Skip button always
visible. Respects prefers-reduced-motion (instant skip)."
```

---

## Task 6: Sticky Chapter Navigation

**Goal:** Add a sticky top navigation showing 7 chapter dots/numbers that highlights the active chapter based on scroll position, with click-to-scroll.

**Files:**
- Create: `components/demos/lisbon/LisbonChapterNav.tsx`
- Modify: `components/demos/LisbonAlbumDemo.tsx` (render the nav)

- [ ] **Step 6.1: Create LisbonChapterNav**

Create `components/demos/lisbon/LisbonChapterNav.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import type { Chapter } from '@/content/lisbon-album'

type Props = {
  chapters: Chapter[]
  visible: boolean  // hidden during intro
}

export function LisbonChapterNav({ chapters, visible }: Props) {
  const [activeId, setActiveId] = useState<number>(0)

  useEffect(() => {
    if (!visible) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry closest to the top that's currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          const id = visible[0].target.id.replace('chapter-', '')
          const parsed = Number.parseInt(id, 10)
          if (!Number.isNaN(parsed)) setActiveId(parsed)
        }
      },
      {
        // Trigger when section's top enters the top ~40% of viewport
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      },
    )

    chapters.forEach((c) => {
      const el = document.getElementById(`chapter-${c.id}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [chapters, visible])

  const handleClick = (id: number) => {
    const el = document.getElementById(`chapter-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={`fixed inset-x-0 top-16 z-30 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-label="Chapter navigation"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-1 px-5 py-3 sm:gap-2 sm:px-8">
        <div className="flex items-center gap-1 rounded-full border border-white/8 bg-[#0e1014]/85 px-2 py-1.5 backdrop-blur-md sm:gap-1.5 sm:px-3">
          {chapters.map((c) => {
            const isActive = c.id === activeId
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleClick(c.id)}
                className={`group relative inline-flex h-7 items-center justify-center rounded-full px-2.5 font-sans text-[11px] font-medium tabular-nums transition sm:px-3 ${
                  isActive
                    ? 'bg-[#d4a574]/14 text-[#d4a574]'
                    : 'text-white/40 hover:bg-white/6 hover:text-white/75'
                }`}
                aria-label={`Go to chapter ${c.id}: ${c.title}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="tracking-[0.04em]">{String(c.id).padStart(2, '0')}</span>
                <span className="sr-only"> · {c.title}</span>
                {/* Expanded label on hover (desktop only) */}
                <span className="pointer-events-none absolute -bottom-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-white/6 px-2.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-white/70 opacity-0 backdrop-blur-md transition group-hover:opacity-100 md:block">
                  {c.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 6.2: Render the nav in LisbonAlbumDemo**

Edit `components/demos/LisbonAlbumDemo.tsx`. Add the import after the existing lisbon imports:

```tsx
import { LisbonChapterNav } from './lisbon/LisbonChapterNav'
```

Then, inside the `<DemoChrome>` element, immediately before `<LisbonLightbox ... />`, add:

```tsx
      <LisbonChapterNav chapters={lisbonAlbum.chapters} visible={introCompleted} />
```

- [ ] **Step 6.3: Type-check, lint, dev verify**

```bash
npx tsc --noEmit
npm run lint
npm run dev
```

Manual checks at `http://localhost:3000/demos/lisbon-album`:
- [ ] During intro: nav is invisible (opacity 0, pointer-events none)
- [ ] After intro: nav fades in at top, below the DemoChrome header
- [ ] Shows 7 numbers (00 — 06) in a pill
- [ ] Initial active chapter = 00 (gold highlight)
- [ ] Scroll down → active highlight moves to current chapter
- [ ] Click any number → smooth-scrolls to that chapter
- [ ] On desktop hover: tooltip shows chapter label
- [ ] Nav stays visible while scrolling through all 7 chapters
- [ ] Nav does not overlap lightbox (lightbox is z-100, nav is z-30)

- [ ] **Step 6.4: Commit**

```bash
git add components/demos/lisbon/LisbonChapterNav.tsx components/demos/LisbonAlbumDemo.tsx
git commit -m "feat(lisbon-album): add sticky chapter nav with IntersectionObserver

7 chapter dots (00-06), gold active state via scroll position,
click to smooth-scroll. Hidden during intro animation.
Hover tooltip shows chapter label on desktop."
```

---

## Task 7: Prologue Map Decoration + Accessibility Polish

**Goal:** Add the static route map SVG to the Prologue chapter as a decorative element, then do a full accessibility and reduced-motion audit pass.

**Files:**
- Modify: `components/demos/lisbon/LisbonChapter.tsx` (add map to chapter 0)
- Modify: `components/demos/LisbonAlbumDemo.tsx` (focus restoration after lightbox close)
- Modify: `components/demos/lisbon/LisbonIntro.tsx` (already done in Task 5 — verify)

- [ ] **Step 7.1: Add map decoration to Prologue chapter**

Edit `components/demos/lisbon/LisbonChapter.tsx`. Find the closing `</div>` of `<div className="md:col-span-9">` block, and just before it add this conditional (only for chapter 0):

```tsx
          {chapter.id === 0 && (
            <Reveal delay={0.24} className="mt-10">
              <figure className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#161a22]">
                <Image
                  src="/demo-assets/lisbon-route-map.svg"
                  alt="Decorative map of the Lisbon region showing the 5-day trip route between Lisbon, Sintra, and Cascais"
                  width={300}
                  height={400}
                  className="h-auto w-full max-w-[300px]"
                  aria-hidden="true"
                />
                <figcaption className="absolute bottom-3 left-4 right-4 font-sans text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Route · Lisbon · Sintra · Cascais
                </figcaption>
              </figure>
            </Reveal>
          )}
```

You'll also need to add `Image` import at the top:

```tsx
import Image from 'next/image'
```

- [ ] **Step 7.2: Focus restoration after lightbox close**

Edit `components/demos/LisbonAlbumDemo.tsx`. We need to remember which photo trigger opened the lightbox and return focus there on close.

Update the state declarations:

```tsx
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null)
```

Update the chapter's `onPhotoClick`:

```tsx
onPhotoClick={(photoIdx, triggerEl) => {
  const flatIdx = findFlatIndex(chapter.id, photoIdx)
  if (flatIdx !== null) {
    setTriggerElement(triggerEl)
    setLightboxIndex(flatIdx)
  }
}}
```

Update the lightbox onClose:

```tsx
onClose={() => {
  setLightboxIndex(null)
  // Restore focus after lightbox unmounts
  window.setTimeout(() => triggerElement?.focus(), 60)
}}
```

- [ ] **Step 7.3: Update LisbonChapter to pass trigger element**

Edit `components/demos/lisbon/LisbonChapter.tsx`. Update the Props type and pass-through:

```tsx
type Props = {
  chapter: Chapter
  onPhotoClick: (photoIndex: number, triggerEl: HTMLElement) => void
}
```

- [ ] **Step 7.4: Update LisbonPhotoGrid to pass trigger element**

Edit `components/demos/lisbon/LisbonPhotoGrid.tsx`. Update the Props and onClick:

```tsx
type Props = {
  photos: AlbumPhoto[]
  variant: PhotoGridVariant
  onPhotoClick?: (index: number, triggerEl: HTMLElement) => void
}
```

And in `PhotoCard`:

```tsx
function PhotoCard({ photo, index, aspect, className = '', eager, onClick }: PhotoCardProps) {
  return (
    <button
      type="button"
      onClick={(e) => onClick?.(index, e.currentTarget)}
      // ... rest unchanged
```

Update `PhotoCardProps`:

```tsx
type PhotoCardProps = {
  photo: AlbumPhoto
  index: number
  aspect: string
  className?: string
  eager?: boolean
  onClick?: (index: number, triggerEl: HTMLElement) => void
}
```

- [ ] **Step 7.5: Type-check, lint, dev verify**

```bash
npx tsc --noEmit
npm run lint
npm run dev
```

Manual checks:
- [ ] Prologue chapter shows the route map decoration
- [ ] Map is visible, has caption "Route · Lisbon · Sintra · Cascais"
- [ ] Lightbox: opening it moves focus to close button (verified earlier)
- [ ] Lightbox: closing it returns focus to the photo that was clicked (use Tab to verify the next focusable element is the next photo, not the page top)
- [ ] Reduced motion: intro instant, lightbox opacity-only transition, no Ken Burns scaling
- [ ] All photos have meaningful `alt` text (inspect element to verify)
- [ ] Color contrast in lightbox footer: caption white on black gradient passes AAA

- [ ] **Step 7.6: Commit**

```bash
git add components/demos/lisbon/
git commit -m "feat(lisbon-album): add prologue map decoration and focus restoration

Static SVG route map shown only in chapter 0 (Prologue). Lightbox
focus restoration: returns focus to the triggering photo on close.
Passes WCAG AAA contrast in all text states."
```

---

## Task 8: Production Build, Lighthouse, Ship

**Goal:** Final verification: production build succeeds, static export includes the new route, Lighthouse meets the spec's performance budget, then deploy.

**Files:** None modified.

- [ ] **Step 8.1: Clean production build**

```bash
cd /Users/hl/Projects/TagAll
rm -rf .next out
npm run build
```

Expected output: build succeeds, no errors. Verify `out/demos/lisbon-album/index.html` exists:

```bash
ls out/demos/lisbon-album/index.html
```

- [ ] **Step 8.2: Run content validator**

```bash
npm run validate:content 2>&1 | tail -5
```

Expected: passes. If fails on demo entry, recheck `content/demos.ts` shape.

- [ ] **Step 8.3: Run Lighthouse on production build**

Use Chrome DevTools → Lighthouse → Mobile preset → all 4 categories. Run against a local production server:

```bash
npx serve out -l 3000 &
# In another terminal / browser:
# Visit http://localhost:3000/demos/lisbon-album
# Open DevTools → Lighthouse → Run
```

Target scores (from spec §9):
- [ ] Performance ≥ 85
- [ ] Accessibility ≥ 95
- [ ] Best Practices = 100
- [ ] SEO ≥ 95

If Performance < 85: check that hero photos use `priority`, others are lazy-loaded, and total page weight is under 4 MB.

- [ ] **Step 8.4: Full acceptance criteria pass/fail checklist**

Re-verify the 9 acceptance criteria from spec §10:

- [ ] 1. `/demos/lisbon-album` returns 200; unknown slug 404s
- [ ] 2. Intro auto-plays ~12s, scroll locked, Skip button visible
- [ ] 3. After intro/skip: scroll unlocked, 7 chapters reachable
- [ ] 4. Click any photo opens lightbox; ← → ESC work; swipe works
- [ ] 5. Sticky chapter nav shows 7 chapters, click scrolls, active updates
- [ ] 6. Reduced motion: intro instant, no Ken Burns, opacity-only lightbox
- [ ] 7. Demo appears in `/demos` listing, homepage ProductShowcase, DemoChrome rotation
- [ ] 8. `npm run build` succeeds; `out/` has 7 demo routes
- [ ] 9. Lighthouse mobile: P≥85 A≥95 BP=100 SEO≥95

- [ ] **Step 8.5: Final commit + push**

```bash
git status
git log --oneline -10
```

If everything clean and acceptance passes:

```bash
git push origin main
```

If using Cloudflare Pages, the push triggers auto-deploy. Verify the live URL: `https://tagall.studio/demos/lisbon-album`.

---

## Self-Review Notes

After writing this plan, I checked it against the spec and caught these issues:

1. **Spec §6.2 said the intro should "lock body scroll during play"** — covered in Task 5 Step 5.1 via `document.body.style.overflow = 'hidden'`. ✓
2. **Spec §8 mentioned "focus returns to the photo that was clicked"** — added in Task 7 Steps 7.2-7.4. ✓
3. **Spec §5.3 mentioned a "static map screenshot"** — added in Task 7 Step 7.1. ✓
4. **Spec §4.3 said "no web font load"** — verified: plan uses `Georgia, serif` system stack everywhere, never loads a web font. ✓
5. **Spec §6.4 "no new dependencies"** — verified: plan uses only `motion`, `next/image`, `@phosphor-icons/react`, native browser APIs. ✓
6. **Spec §10.9 "Lighthouse P≥85"** — covered in Task 8 Step 8.3. ✓
7. **Type consistency:** `AlbumPhoto`, `Chapter`, `LisbonAlbumData`, `PhotoGridVariant` defined in Task 2 and used consistently across Tasks 3-7. ✓
8. **No placeholders:** All code blocks are complete and runnable as written.

The plan is ready for execution.
