import Image from 'next/image'
import galleryItems from '@/content/gallery.json'
import { Reveal } from './Reveal'
import { Section } from './Section'

const aspectClasses = ['aspect-[4/5]', 'aspect-[5/4]', 'aspect-[3/4]', 'aspect-[1/1]', 'aspect-[4/3]', 'aspect-[3/5]']

export function GalleryMasonry() {
  return (
    <Section id="gallery">
      <Reveal className="max-w-2xl">
        <h2 className="text-4xl font-semibold leading-tight text-[var(--mirra-ink)] sm:text-5xl">
          Case studies for the moments that deserve ceremony.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          Private gifts, admission packs, cultural products, and event invitations can share one premium system.
        </p>
      </Reveal>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {galleryItems.map((item, index) => (
          <Reveal key={item.title} delay={Math.min(index * 0.04, 0.18)}>
            <figure className="group mb-4 break-inside-avoid overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-sm">
              <div className={`relative ${aspectClasses[index % aspectClasses.length]}`}>
                <Image
                  src={item.image}
                  alt={`${item.title} Mirra case`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <figcaption className="p-5">
                <p className="text-xs font-medium text-[var(--mirra-muted)]">{item.category}</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--mirra-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--mirra-muted)]">{item.description}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
