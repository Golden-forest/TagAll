# Memory2307 Dopamine Background Color Update

**Date:** 2026-06-03
**Status:** Approved
**Scope:** Replace section background fill colors and corresponding text colors. No structural, component, or animation changes.

## Current Palette

| Token | Value | Used In |
|-------|-------|---------|
| `paper` | `#f4efe7` | Light sections (Messages 1/2, Grid) |
| `paper-soft` | `#ebe2d6` | Message 1 |
| `ink` | `#15120f` | Dark sections (Hero, Closing) |
| `olive` | `#2f382f` | Statement section |
| `clay` | `#a95f4a` | Message 3 |
| `muted` | `#75675d` | Label text |
| `stone` | `#d8ccbc` | Image placeholders |

## New Palette

### Base Colors

| Token | Value | Usage |
|-------|-------|-------|
| `void` | `#06060e` | Dark section backgrounds (replaces `ink`) |
| `cream` | `#faf7f2` | Light section backgrounds (replaces `paper`) |
| `cream-soft` | `#f0ebe3` | Alternate light (replaces `paper-soft`) |

### Accent Colors (Section Backgrounds)

| Token | Value | Replaces | Used In |
|-------|-------|----------|---------|
| `violet` | `#8b5cf6` | `olive` | Statement section |
| `rose` | `#ec4899` | `clay` | Message 3 |
| `cyan` | `#06b6d4` | — | CTA / accent strip (new) |
| `mint` | `#86efac` | — | Grid section tint (new) |

### Supporting

| Token | Value | Replaces | Usage |
|-------|-------|----------|-------|
| `muted` | `#6b7280` | `#75675d` | Label / secondary text (neutral gray, works on both light and dark) |
| `stone` | `#d8ccbc` | unchanged | Image placeholders (unchanged) |

## Section Color Mapping

| Section | Current | New |
|---------|---------|-----|
| Hero | `bg-ink` | `bg-void` |
| Message 1 | `bg-paper-soft` | `bg-cream-soft` |
| Statement | `bg-olive` | `bg-violet` |
| Message 2 | `bg-paper` | `bg-cream` |
| Image Grid | `bg-paper` | `bg-cream` |
| Message 3 | `bg-clay` | `bg-rose` |
| Closing | `bg-ink` | `bg-void` |

## Text Color Adjustments

On dark backgrounds (`void`, `violet`, `rose`): keep existing `text-paper` pattern (or alias to white).

On light backgrounds (`cream`, `cream-soft`): keep existing `text-ink` pattern (dark text).

The existing opacity-based text hierarchy (`text-paper/68`, `text-ink/42`, etc.) continues to work as-is since the contrast ratios are maintained.

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Replace `@theme` color token values |
| `src/components/ErrorPage.tsx` | Fix broken `bg-milk` → `bg-cream`, `text-brown` → `text-ink`, `bg-gold` → `bg-gold` (keep if valid, or `bg-cyan`) |

## Files NOT Modified

- `src/pages/StudentPage.tsx` — Uses `@theme` tokens via Tailwind, so class names stay the same (`bg-ink` → need to update to `bg-void`, etc.)
- `src/data/config.ts` — No changes
- Animation system — No changes

## Note on StudentPage.tsx

Since we're renaming tokens (`ink` → `void`, `paper` → `cream`, etc.), StudentPage.tsx class references need updating:
- `bg-ink` → `bg-void` (2 occurrences: Hero, Closing)
- `bg-paper` → `bg-cream` (Message 2, Grid)
- `bg-paper-soft` → `bg-cream-soft` (Message 1)
- `bg-olive` → `bg-violet` (Statement)
- `bg-clay` → `bg-rose` (Message 3)
- `text-ink` → `text-void` (on dark sections) — or keep as alias if we define `ink` as alias of `void`

**Simpler approach:** Keep old token names but just change their VALUES. Then zero TSX class changes needed:
- `ink` value: `#15120f` → `#06060e`
- `paper` value: `#f4efe7` → `#faf7f2`
- `paper-soft` value: `#ebe2d6` → `#f0ebe3`
- `olive` value: `#2f382f` → `#8b5cf6`
- `clay` value: `#a95f4a` → `#ec4899`
- Add new tokens: `cyan` `#06b6d4`, `mint` `#86efac`

This is the recommended approach — change values in `@theme` only, no class name changes in components.

## Implementation

1. Edit `src/index.css` — update `@theme` token values, add `cyan` and `mint`
2. Edit `src/components/ErrorPage.tsx` — fix broken token references
3. Visual QA
