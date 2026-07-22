import howItWorks from '@/content/how-it-works.json'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function HowItWorksTimeline() {
  return (
    <Section id="how-it-works">
      <Reveal className="max-w-3xl">
        <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--tagall-ink)] sm:text-6xl">
          A calm path from brief to tap-ready.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--tagall-muted)] sm:text-lg">
          The same process works for one private gift or a full university admission campaign.
        </p>
      </Reveal>

      <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((step, index) => (
          <li key={step.title} className="h-full">
            <Reveal delay={index * 0.06} className="h-full border-t border-[var(--tagall-hairline)] pt-5">
              <p className="text-sm font-medium tabular-nums text-[var(--tagall-accent)]">0{index + 1}</p>
              <h3 className="mt-10 text-xl font-semibold tracking-[-0.035em] text-[var(--tagall-ink)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--tagall-muted)]">{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
