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
