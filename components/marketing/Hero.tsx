import siteContent from '@/content/site.json'
import { HeroDeviceHover } from './HeroDeviceHover'

export function Hero() {
  return (
    <section className="px-5 pb-16 pt-24 sm:px-8 sm:pb-24">
      <div className="mx-auto grid min-h-[calc(100dvh-6rem)] max-w-7xl items-center gap-12 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
        <div className="max-w-2xl lg:col-span-5">
          <h1
            className="hero-intro max-w-[9ch] text-[clamp(3.6rem,7.2vw,6.35rem)] font-semibold leading-[0.91] tracking-[-0.07em] text-[var(--tagall-ink)]"
          >
            {siteContent.tagline}
          </h1>
          <p
            className="hero-intro mt-7 max-w-[31rem] text-lg leading-8 text-[var(--tagall-muted)]"
            style={{ animationDelay: '100ms' }}
          >
            {siteContent.description}
          </p>
          <div className="hero-intro mt-9 flex flex-wrap items-center gap-5" style={{ animationDelay: '180ms' }}>
            <a href={siteContent.primaryCta.href} className="inline-flex whitespace-nowrap rounded-full bg-[var(--tagall-accent)] px-6 py-3.5 text-sm font-medium text-[var(--tagall-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--tagall-accent-hover)] active:translate-y-0">
              {siteContent.primaryCta.label}
            </a>
            <a href={siteContent.secondaryCta.href} className="inline-flex whitespace-nowrap border-b border-[var(--tagall-hairline)] py-2 text-sm font-medium text-[var(--tagall-ink)] transition-colors hover:border-[var(--tagall-accent)] hover:text-[var(--tagall-accent)]">
              {siteContent.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-5"><HeroDeviceHover /></div>
      </div>
    </section>
  )
}
