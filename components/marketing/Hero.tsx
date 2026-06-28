import siteContent from '@/content/site.json'
import { HeroDeviceHover } from './HeroDeviceHover'
import { MagneticButton } from './MagneticButton'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-6 pt-20 sm:px-8">
      <div className="mx-auto grid min-h-[calc(100dvh-8rem)] max-w-7xl items-start gap-10 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-10">
        <div className="max-w-2xl">
          <p className="hero-intro mb-6 inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-[var(--mirra-muted)] shadow-sm backdrop-blur">
            Premium private gifts and cultural NFC experiences
          </p>
          <h1
            className="hero-intro text-5xl font-semibold leading-[0.98] text-[var(--mirra-ink)] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '90ms' }}
          >
            {siteContent.tagline}
          </h1>
          <p
            className="hero-intro mt-6 max-w-xl text-lg leading-8 text-[var(--mirra-muted)]"
            style={{ animationDelay: '180ms' }}
          >
            {siteContent.description}
          </p>
          <div className="hero-intro mt-8 flex flex-wrap gap-3" style={{ animationDelay: '270ms' }}>
            <MagneticButton href={siteContent.primaryCta.href} variant="primary">
              {siteContent.primaryCta.label}
            </MagneticButton>
            <MagneticButton href={siteContent.secondaryCta.href} variant="secondary">
              {siteContent.secondaryCta.label}
            </MagneticButton>
          </div>
          <div
            className="hero-intro mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm text-[var(--mirra-muted)]"
            style={{ animationDelay: '360ms' }}
          >
            <div className="rounded-2xl border border-black/10 bg-white/60 p-4 backdrop-blur">
              <p className="font-mono text-lg text-[var(--mirra-ink)]">01</p>
              <p className="mt-2">Private gift pages</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/60 p-4 backdrop-blur">
              <p className="font-mono text-lg text-[var(--mirra-ink)]">02</p>
              <p className="mt-2">University packs</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/60 p-4 backdrop-blur">
              <p className="font-mono text-lg text-[var(--mirra-ink)]">03</p>
              <p className="mt-2">NFC + QR entry</p>
            </div>
          </div>
        </div>
        <HeroDeviceHover />
      </div>
    </section>
  )
}
