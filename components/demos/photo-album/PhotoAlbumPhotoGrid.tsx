'use client'

import Image from 'next/image'
import { useLang } from './LangContext'
import { t } from '@/content/types'
import type { AlbumPhoto, PhotoGridVariant } from '@/content/types'

type Props = {
  photos: AlbumPhoto[]
  variant: PhotoGridVariant
  onPhotoClick?: (index: number, triggerEl: HTMLElement) => void
}

// Bilingual UI strings.
const uiText = {
  // Template strings with `{caption}` / `{location}` placeholders.
  openWith: { zh: '在查看器中打开：{caption}', en: 'Open {caption} in viewer' },
  openWithLocation: {
    zh: '在查看器中打开：{caption}，{location}',
    en: 'Open {caption}, {location} in viewer',
  },
  openFallback: { zh: '在查看器中打开照片', en: 'Open photo in viewer' },
} as const

function format(template: string, vars: { caption?: string; location?: string }): string {
  return template
    .replace('{caption}', vars.caption ?? '')
    .replace('{location}', vars.location ?? '')
}

export function PhotoAlbumPhotoGrid({ photos, variant, onPhotoClick }: Props) {
  if (variant === 'feature') {
    // Single hero + smaller supporting photos.
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

  // dense — irregular 3-column grid.
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
            // Make the first photo span 2 rows on desktop for visual interest.
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
  onClick?: (index: number, triggerEl: HTMLElement) => void
}

function PhotoCard({ photo, index, aspect, className = '', eager, onClick }: PhotoCardProps) {
  const { lang } = useLang()
  const caption = t(photo.caption, lang)
  const location = t(photo.location, lang)
  const alt = t(photo.alt, lang)

  const ariaLabel = caption
    ? location
      ? format(t(uiText.openWithLocation, lang), { caption, location })
      : format(t(uiText.openWith, lang), { caption })
    : t(uiText.openFallback, lang)

  return (
    <button
      type="button"
      onClick={(e) => onClick?.(index, e.currentTarget)}
      className={`group relative overflow-hidden rounded-2xl bg-[#1f2329] text-left transition hover:-translate-y-0.5 ${
        aspect.includes('auto') ? 'h-full min-h-[280px]' : aspect
      } ${className}`}
      aria-label={ariaLabel}
    >
      <Image
        src={photo.src}
        alt={alt}
        fill
        sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-[1.03]"
        {...(eager ? { priority: true, loading: 'eager' as const } : {})}
      />
      {caption && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0e1014]/85 via-[#0e1014]/30 to-transparent p-4 pt-12 opacity-0 transition duration-300 group-hover:opacity-100">
          <p className="font-[Georgia,serif] text-sm italic text-[#f0f2f5]">{caption}</p>
          {location && (
            <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[#d4a574]">
              {location}
            </p>
          )}
        </div>
      )}
    </button>
  )
}
