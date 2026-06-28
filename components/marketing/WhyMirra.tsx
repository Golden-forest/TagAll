import {
  AppWindow,
  Globe,
  GraduationCap,
  QrCode,
  SealCheck,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr'
import whyMirra from '@/content/why.json'
import { Reveal } from './Reveal'
import { Section } from './Section'

const icons = [SealCheck, Sparkle, AppWindow, GraduationCap, Globe, QrCode]

export function WhyMirra() {
  return (
    <Section>
      <Reveal className="max-w-2xl">
        <h2 className="text-4xl font-semibold leading-tight text-[var(--mirra-ink)] sm:text-5xl">
          The digital layer makes the gift last.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          Mirra pairs designed web experiences with tactile cards, packages, and chip-enabled print.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
        {whyMirra.map((item, index) => {
          const Icon = icons[index]
          const featured = index === 0 || index === 3

          return (
            <Reveal
              key={item.title}
              delay={Math.min(index * 0.05, 0.2)}
              className={featured ? 'md:col-span-3' : 'md:col-span-2'}
            >
              <article className="relative h-full overflow-hidden rounded-[20px] border border-black/10 bg-white/75 p-6 shadow-sm backdrop-blur">
                <div
                  className={`mb-8 flex h-28 items-center justify-center rounded-2xl ${
                    featured
                      ? 'bg-[radial-gradient(circle_at_50%_20%,rgba(71,108,255,0.18),transparent_38%),linear-gradient(135deg,rgba(238,241,244,0.9),rgba(255,255,255,0.7))]'
                      : 'bg-[linear-gradient(135deg,rgba(238,241,244,0.92),rgba(255,255,255,0.72))]'
                  }`}
                >
                  <Icon size={featured ? 44 : 34} weight="duotone" className="text-[var(--mirra-ink)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--mirra-ink)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--mirra-muted)]">{item.description}</p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
