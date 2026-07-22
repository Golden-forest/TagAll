import whyTagAll from '@/content/why.json'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function WhyTagAll() {
  return (
    <Section>
      <Reveal className="max-w-3xl">
        <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--tagall-ink)] sm:text-6xl">
          The digital layer makes the gift last.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--tagall-muted)] sm:text-lg">
          TagAll pairs designed web experiences with tactile cards, tags, packaging, and QR entry.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {whyTagAll.map((item, index) => (
          <Reveal key={item.title} delay={Math.min(index * 0.05, 0.2)}>
            <article className="h-full border-t border-[var(--tagall-hairline)] pt-6">
              <h3 className="text-xl font-semibold tracking-[-0.035em] text-[var(--tagall-ink)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--tagall-muted)]">{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
