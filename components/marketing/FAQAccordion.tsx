'use client'

import { useState } from 'react'
import faqs from '@/content/faq.json'
import { Section } from './Section'

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 className="max-w-sm text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--tagall-ink)] sm:text-5xl">
            Questions before you start.
          </h2>
        </div>
        <div className="border-t border-[var(--tagall-hairline)] lg:col-span-7 lg:col-start-6">
          {faqs.map((faq, index) => {
            const open = openIndex === index

            return (
              <div key={faq.question} className="border-b border-[var(--tagall-hairline)]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-semibold text-[var(--tagall-ink)] outline-none transition-colors hover:text-[var(--tagall-accent)] focus-visible:text-[var(--tagall-accent)]"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                >
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="text-xl font-normal text-[var(--tagall-muted)]">
                    {open ? '-' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-panel-${index}`}
                  className={`${open ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'} transition-all duration-300`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-[var(--tagall-muted)]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
