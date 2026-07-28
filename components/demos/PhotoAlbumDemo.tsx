'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { DemoChrome } from './DemoChrome'
import { LangProvider, useLang } from './photo-album/LangContext'
import { LangToggle } from './photo-album/LangToggle'
import { PhotoAlbumChapter } from './photo-album/PhotoAlbumChapter'
import { PhotoAlbumChapterNav } from './photo-album/PhotoAlbumChapterNav'
import { PhotoAlbumIntro } from './photo-album/PhotoAlbumIntro'
import { PhotoAlbumLightbox } from './photo-album/PhotoAlbumLightbox'
import { t } from '@/content/types'
import type { Chapter, PhotoAlbumData } from '@/content/types'

type FlatPhoto = {
  src: string
  alt: string | { zh: string; en: string }
  caption?: string | { zh: string; en: string }
  time?: string
  location?: string | { zh: string; en: string }
  tags?: string[]
  chapterId: number
  chapterLabel: string | { zh: string; en: string }
}

type Props = {
  data: PhotoAlbumData
  /** Demo slug used to look up the chrome metadata (next-demo link etc.). */
  slug: string
}

export function PhotoAlbumDemo({ data, slug }: Props) {
  return (
    <DemoChrome slug={slug} tone="dark">
      <LangProvider>
        <PhotoAlbumDemoInner data={data} />
      </LangProvider>
    </DemoChrome>
  )
}

function PhotoAlbumDemoInner({ data }: { data: PhotoAlbumData }) {
  const { lang } = useLang()
  const [introCompleted, setIntroCompleted] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null)

  const flatPhotos: FlatPhoto[] = useMemo(() => {
    return data.chapters.flatMap((c: Chapter) =>
      c.photos.map((p) => ({ ...p, chapterId: c.id, chapterLabel: c.label })),
    )
  }, [data])

  const findFlatIndex = (chapterId: number, photoIndex: number) => {
    let running = 0
    for (const c of data.chapters) {
      if (c.id === chapterId) return running + photoIndex
      running += c.photos.length
    }
    return null
  }

  const tagline = t(data.tagline, lang)
  const heroTitle = t(data.heroTitle, lang)
  const heroSubtitle = t(data.heroSubtitle, lang)
  const closingQuote = t(data.closingQuote, lang)
  const authorLocation = t(data.authorLocation, lang)

  return (
    <>
      <LangToggle />

      {/* Intro overlay (until complete) */}
      {!introCompleted && (
        <PhotoAlbumIntro data={data} onComplete={() => setIntroCompleted(true)} />
      )}

      <main
        className="bg-[#0e1014] text-[#f0f2f5]"
        lang={lang === 'zh' ? 'zh-CN' : 'en'}
        aria-hidden={!introCompleted}
      >
        {/* Hero (becomes visible after intro; gives the scroll target something to land on) */}
        <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={data.heroPhotos[0].src}
              alt={t(data.heroPhotos[0].alt, lang)}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-[#0e1014]/30 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-24">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#d4a574]">
              {tagline}
            </p>
            <h1 className="mt-4 max-w-[12ch] font-[Georgia,serif] text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className="mt-6 max-w-[42ch] font-sans text-base leading-[1.7] text-[#c8cace]">
                {heroSubtitle}
              </p>
            )}
          </div>
        </section>

        {/* Chapters */}
        {data.chapters.map((chapter) => (
          <PhotoAlbumChapter
            key={chapter.id}
            chapter={chapter}
            onPhotoClick={(photoIdx, triggerEl) => {
              const flatIdx = findFlatIndex(chapter.id, photoIdx)
              if (flatIdx !== null) {
                setTriggerElement(triggerEl)
                setLightboxIndex(flatIdx)
              }
            }}
          />
        ))}

        {/* Closing quote */}
        <section className="mx-auto max-w-[1400px] px-5 py-32 sm:px-8 sm:py-48">
          <p className="mx-auto max-w-[28ch] text-center font-[Georgia,serif] text-[clamp(1.5rem,2.6vw,2.2rem)] font-normal italic leading-[1.3] tracking-[-0.02em] text-[#d4a574]">
            &ldquo;{closingQuote}&rdquo;
          </p>
          <p className="mt-10 text-center font-sans text-[11px] uppercase tracking-[0.2em] text-[#8a8d94]">
            {data.authorName}
            {authorLocation && <span> · {authorLocation}</span>}
          </p>
        </section>
      </main>

      <PhotoAlbumChapterNav chapters={data.chapters} visible={introCompleted} />
      <PhotoAlbumLightbox
        photos={flatPhotos}
        index={lightboxIndex}
        onClose={() => {
          setLightboxIndex(null)
          // Restore focus after lightbox unmounts.
          window.setTimeout(() => triggerElement?.focus(), 60)
        }}
        onChange={setLightboxIndex}
        chapterLabel={
          lightboxIndex !== null ? flatPhotos[lightboxIndex]?.chapterLabel : undefined
        }
      />
    </>
  )
}
