import { Gift, Package, PencilSimple, Sparkle } from '@phosphor-icons/react/dist/ssr'
import howItWorks from '@/content/how-it-works.json'
import { Reveal } from './Reveal'
import { Section } from './Section'

const icons = [Gift, PencilSimple, Sparkle, Package]

export function HowItWorksTimeline() {
  return (
    <Section id="how-it-works">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold leading-tight text-[var(--mirra-ink)] sm:text-5xl">
          A calm path from brief to tap-ready.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          The same process works for one private gift or a full university admission campaign.
        </p>
      </Reveal>

      <ol className="mt-14 grid gap-4 md:grid-cols-4">
        {howItWorks.map((step, index) => {
          const Icon = icons[index]

          return (
            <Reveal key={step.title} delay={index * 0.06}>
              <li className="relative h-full rounded-[20px] border border-black/10 bg-white/72 p-6 shadow-sm backdrop-blur">
                <span className="mb-10 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--mirra-surface-soft)] text-[var(--mirra-ink)]">
                  <Icon size={22} weight="duotone" />
                </span>
                <h3 className="text-lg font-semibold text-[var(--mirra-ink)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--mirra-muted)]">{step.description}</p>
              </li>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
