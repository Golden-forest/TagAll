import Image from 'next/image'
import galleryItems from '@/content/gallery.json'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function GalleryMasonry() {
  return (
    <Section id="gallery">
      <Reveal className="max-w-3xl">
        <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--tagall-ink)] sm:text-6xl">
          Moments that deserve more than a link.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--tagall-muted)] sm:text-lg">
          Private gifts, admissions, cultural products, and invitations share one considered system.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <Reveal key={item.title} delay={Math.min(index * 0.04, 0.18)}>
            <figure className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--tagall-radius)] bg-[var(--tagall-surface-soft)]">
                <Image
                  src={item.image}
                  alt={`${item.title} TagAll case`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  loading="lazy"
                />
              </div>
              <figcaption className="pt-5">
                <p className="text-xs font-medium text-[var(--tagall-faint)]">{item.category}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-[var(--tagall-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--tagall-muted)]">{item.description}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
