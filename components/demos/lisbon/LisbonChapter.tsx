import Image from 'next/image'
import { Reveal } from '@/components/marketing/Reveal'
import { LisbonPhotoGrid } from './LisbonPhotoGrid'
import type { Chapter } from '@/content/lisbon-album'

type Props = {
  chapter: Chapter
  onPhotoClick: (photoIndex: number, triggerEl: HTMLElement) => void
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
          <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.18em] text-[#8a8d94]">
            {chapter.label}
            {chapter.date && <span className="ml-2 text-[#8a8d94]">· {chapter.date}</span>}
          </p>
        </Reveal>

        <div className="md:col-span-9">
          <Reveal>
            <h2
              id={`chapter-${chapter.id}-title`}
              className="font-[Georgia,serif] text-[clamp(1.75rem,2.6vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.03em] text-[#f0f2f5]"
            >
              {chapter.title}
            </h2>
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
              onPhotoClick={(i, el) => onPhotoClick(i, el)}
            />
            {chapter.photos.length > 0 && (
              <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.18em] text-[#8a8d94]">
                {chapter.photos.length} photographs
                {chapter.photos[0]?.location && (
                  <span className="ml-2">· {chapter.photos[0].location.split(',').pop()?.trim()}</span>
                )}
              </p>
            )}
          </Reveal>
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
                <figcaption className="absolute bottom-3 left-4 right-4 font-sans text-[10px] uppercase tracking-[0.16em] text-white/55">
                  Route · Lisbon · Sintra · Cascais
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
