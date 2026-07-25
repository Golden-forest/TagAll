'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { DemoChrome } from './DemoChrome'
import { LisbonChapter } from './lisbon/LisbonChapter'
import { LisbonLightbox } from './lisbon/LisbonLightbox'
import { LisbonChapterNav } from './lisbon/LisbonChapterNav'
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

      <LisbonChapterNav chapters={lisbonAlbum.chapters} visible={introCompleted} />
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
