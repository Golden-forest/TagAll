import Image from 'next/image'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function LiveDemo() {
  return (
    <Section id="live-demo" className="pt-4">
      <section className="overflow-hidden rounded-[var(--tagall-radius)] border border-[var(--tagall-hairline)] bg-[var(--tagall-surface-soft)] p-5 md:p-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:px-4">
            <h2 className="max-w-lg text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--tagall-ink)] sm:text-5xl">
              From physical gift to living page.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[var(--tagall-muted)]">
              A card, package, or admission letter opens the digital experience instantly. QR keeps every page accessible.
            </p>
          </div>
          <Reveal className="lg:col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--tagall-radius)] bg-[var(--tagall-surface-strong)]">
              <Image
                src="/mirra/live-demo-open.webp"
                alt="A phone opening a TagAll digital experience from an NFC card"
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </Section>
  )
}
