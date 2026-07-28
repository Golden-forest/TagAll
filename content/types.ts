/**
 * Generic bilingual types for the PhotoAlbum component family.
 *
 * These types are designed to be backward-compatible with the original
 * Lisbon album data (which uses plain `string` fields) while also
 * supporting fully-localized `Localized` objects for new albums (e.g. the
 * Yunnan album). The helper `t()` resolves either shape into a string for
 * the currently-active language.
 */

export type Lang = 'zh' | 'en'

/** A pair of strings, one per supported language. */
export type Localized = {
  zh: string
  en: string
}

/**
 * Resolve a field value to a string for the given language.
 *
 * - `undefined` → `''`
 * - plain `string` (e.g. legacy Lisbon data) → returned as-is
 * - `Localized` object → returns the matching language string
 */
export function t(field: string | Localized | undefined, lang: Lang): string {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang]
}

export type AlbumPhoto = {
  src: string
  alt: string | Localized
  caption?: string | Localized
  time?: string
  location?: string | Localized
  tags?: string[]
}

export type PhotoGridVariant = 'dense' | 'spacious' | 'feature'

export type Chapter = {
  id: number
  label: string | Localized
  date: string
  title: string | Localized
  body: string | Localized
  photos: AlbumPhoto[]
  gridVariant: PhotoGridVariant
  /** Optional decorative map / illustration rendered below the grid. */
  routeMapSrc?: string
  routeMapAlt?: string
  routeMapCaption?: string | Localized
}

export type PhotoAlbumData = {
  tagline: string | Localized
  /** Large headline shown during the intro animation. */
  heroTitle: string | Localized
  /** Subtitle shown under the hero title (post-intro). */
  heroSubtitle?: string | Localized
  heroPhotos: AlbumPhoto[]
  closingQuote: string | Localized
  authorName: string
  /** E.g. "Lisbon · 08.2026" */
  authorLocation?: string | Localized
  chapters: Chapter[]

  // Optional color overrides (defaults match the Lisbon warm palette).
  accentColor?: string // default '#d4a574'
  backgroundColor?: string // default '#0e1014'
  surfaceColor?: string // default '#1f2329'
  textPrimary?: string // default '#f0f2f5'
  textSecondary?: string // default '#a8aab0'
  textMuted?: string // default '#8a8d94'
}
