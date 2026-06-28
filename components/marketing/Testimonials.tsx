import testimonials from '@/content/testimonials.json'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Testimonials() {
  return (
    <Section>
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold leading-tight text-[var(--mirra-ink)] sm:text-5xl">
          Designed to be shown, saved, and remembered.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          Notes from people using tap-open experiences in gifts, education, and commerce.
        </p>
      </Reveal>

      <div className="mirra-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto pb-4">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.06}>
            <figure className="min-w-[300px] snap-start rounded-[20px] border border-black/10 bg-white p-6 shadow-sm sm:min-w-[380px]">
              <blockquote className="text-lg leading-8 text-[var(--mirra-ink)]">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold text-[var(--mirra-ink)]">{testimonial.name}</p>
                <p className="mt-1 text-sm text-[var(--mirra-muted)]">
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
