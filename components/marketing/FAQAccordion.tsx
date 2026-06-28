'use client'

import { useState } from 'react'
import faqs from '@/content/faq.json'
import { Section } from './Section'

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleIndex = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-semibold leading-tight text-[var(--mirra-ink)] sm:text-5xl">
          Questions before you start.
        </h2>
        <div className="mt-10 divide-y divide-black/10 rounded-[20px] border border-black/10 bg-white">
          {faqs.map((faq, index) => {
            const open = openIndex === index

            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-base font-semibold text-[var(--mirra-ink)] outline-none transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--mirra-accent)]"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => toggleIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      toggleIndex(index)
                    }
                  }}
                >
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="text-xl text-[var(--mirra-muted)]">
                    {open ? '-' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-panel-${index}`}
                  className={`${open ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'} transition-all duration-300`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-7 text-[var(--mirra-muted)]">{faq.answer}</p>
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
