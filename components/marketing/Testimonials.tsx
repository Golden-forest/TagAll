import testimonials from '@/content/testimonials.json'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Testimonials() {
  return (
    <Section>
      <Reveal className="max-w-3xl">
        <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--tagall-ink)] sm:text-6xl">
          Designed to be saved and remembered.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        {testimonials.map((testimonial, index) => (
          <Reveal
            key={testimonial.name}
            delay={index * 0.06}
            className={index === 0 ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}
          >
            <figure className={`flex h-full flex-col justify-between rounded-[var(--tagall-radius)] border border-[var(--tagall-hairline)] bg-[var(--tagall-surface-strong)] p-7 ${index === 0 ? 'min-h-80 sm:p-10' : 'min-h-52'}`}>
              <blockquote className={`${index === 0 ? 'text-2xl leading-10 sm:text-3xl sm:leading-[1.35]' : 'text-lg leading-8'} tracking-[-0.025em] text-[var(--tagall-ink)]`}>
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-[var(--tagall-hairline)] pt-5">
                <p className="font-semibold text-[var(--tagall-ink)]">{testimonial.name}</p>
                <p className="mt-1 text-sm text-[var(--tagall-muted)]">
                  {testimonial.role}, {testimonial.location}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
