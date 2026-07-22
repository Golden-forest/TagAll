'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

const projects = [
  {
    title: 'Care Plan Workspace',
    context: 'Clinical coordination',
    outcome: 'Turned fragmented care tasks into one shared workflow for clinicians and support teams.',
    image: '/demo-assets/maya-hero.webp',
    position: '70% center',
    color: '#1649d8',
  },
  {
    title: 'Research Library',
    context: 'Product operations',
    outcome: 'Connected customer evidence to active product decisions through one searchable research system.',
    image: '/demo-assets/ux-wall.webp',
    position: 'center',
    color: '#6f46d9',
  },
  {
    title: 'Access Foundations',
    context: 'Design systems',
    outcome: 'Set accessible component and content standards used across product, support, and growth surfaces.',
    image: '/demo-assets/maya-hero.webp',
    position: '10% center',
    color: '#0f766e',
  },
]

export function ResumePortfolioCarousel() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const project = projects[index]

  const move = (direction: number) => {
    setIndex((current) => (current + direction + projects.length) % projects.length)
  }

  return (
    <section className="bg-[#e8edf2]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
              Selected product work.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-[#5d6978]">Three case studies, each solving a different kind of complexity.</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => move(-1)} className="rounded-xl border border-[#b8c0cc] bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-[#1649d8] hover:text-[#1649d8] active:scale-[0.98]">Previous</button>
            <button type="button" onClick={() => move(1)} className="rounded-xl bg-[#121820] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1649d8] active:scale-[0.98]">Next</button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-[#d3d9e1] bg-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={project.title}
              initial={reduce ? false : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -28 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-[1.2fr_0.8fr]"
              aria-live="polite"
            >
              <div className="relative aspect-[16/10] min-h-[22rem] overflow-hidden md:aspect-auto md:min-h-[35rem]">
                <Image src={project.image} alt={`${project.title} case study visual`} fill sizes="(max-width: 767px) 100vw, 62vw" className="object-cover" style={{ objectPosition: project.position }} />
              </div>
              <div className="flex min-h-80 flex-col justify-between p-7 sm:p-10">
                <div>
                  <p className="text-sm font-semibold" style={{ color: project.color }}>{project.context}</p>
                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{project.title}</h3>
                  <p className="mt-5 max-w-md text-base leading-7 text-[#5a6675]">{project.outcome}</p>
                </div>
                <div className="mt-12">
                  <p className="text-sm tabular-nums text-[#697584]">0{index + 1} / 0{projects.length}</p>
                  <a href={`mailto:maya@linwood.design?subject=${encodeURIComponent(`Case study: ${project.title}`)}`} className="mt-5 inline-flex border-b border-[#1649d8]/40 pb-1 text-sm font-semibold text-[#1649d8]">Request case study</a>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
