'use client'

import Image from 'next/image'
import { Reveal } from '@/components/marketing/Reveal'
import { PhotoAlbumPhotoGrid } from './PhotoAlbumPhotoGrid'
import { useLang } from './LangContext'
import { t } from '@/content/types'
import type { Chapter } from '@/content/types'

type Props = {
  chapter: Chapter
  onPhotoClick: (photoIndex: number, triggerEl: HTMLElement) => void
}

// Bilingual UI strings for this component.
const uiText = {
  photographs: { zh: '张照片', en: 'photographs' },
} as const

export function PhotoAlbumChapter({ chapter, onPhotoClick }: Props) {
  const { lang } = useLang()
  const paddedNumber = String(chapter.id).padStart(2, '0')

  const label = t(chapter.label, lang)
  const title = t(chapter.title, lang)
  const body = t(chapter.body, lang)
  const routeMapCaption = t(chapter.routeMapCaption, lang)

  const firstLocationRaw = chapter.photos[0]?.location
  const firstLocation =
    typeof firstLocationRaw === 'string'
      ? firstLocationRaw.split(',').pop()?.trim()
      : firstLocationRaw
        ? t(firstLocationRaw, lang).split(',').pop()?.trim()
        : undefined

  return (
    <section
      id={`chapter-${chapter.id}`}
      className="border-t border-[#1f2329] scroll-mt-24"
      aria-labelledby={`chapter-${chapter.id}-title`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-12 md:gap-12 md:py-36">
        <Reveal className="md:col-span-3">
          <p className="font-[Georgia,serif] text-[clamp(3rem,5vw,4rem)] font-light leading-none tracking-[-0.04em] text-[#d4a574]">
            {paddedNumber}
          </p>
          <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.18em] text-[#8a8d94]">
            {label}
            {chapter.date && <span className="ml-2 text-[#8a8d94]">· {chapter.date}</span>}
          </p>
        </Reveal>

        <div className="md:col-span-9">
          <Reveal>
            <h2
              id={`chapter-${chapter.id}-title`}
              className="font-[Georgia,serif] text-[clamp(1.75rem,2.6vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.03em] text-[#f0f2f5]"
            >
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[44ch] font-sans text-base leading-[1.7] text-[#a8aab0]">
              {body}
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-10">
            <PhotoAlbumPhotoGrid
              photos={chapter.photos}
              variant={chapter.gridVariant}
              onPhotoClick={(i, el) => onPhotoClick(i, el)}
            />
            {chapter.photos.length > 0 && (
              <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.18em] text-[#8a8d94]">
                {chapter.photos.length} {t(uiText.photographs, lang)}
                {firstLocation && <span className="ml-2">· {firstLocation}</span>}
              </p>
            )}
          </Reveal>
          {chapter.routeMapSrc && (
            <Reveal delay={0.24} className="mt-10">
              <figure className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#161a22]">
                <Image
                  src={chapter.routeMapSrc}
                  alt={chapter.routeMapAlt ?? ''}
                  width={300}
                  height={400}
                  className="h-auto w-full max-w-[300px]"
                  aria-hidden="true"
                />
                {routeMapCaption && (
                  <figcaption className="absolute bottom-3 left-4 right-4 font-sans text-[10px] uppercase tracking-[0.16em] text-white/55">
                    {routeMapCaption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
