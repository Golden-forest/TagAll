'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from './Section'

gsap.registerPlugin(ScrollTrigger)

export function LiveDemo() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-demo-card]',
        { x: -84, rotate: -7, opacity: 0.88 },
        {
          x: 0,
          rotate: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 72%',
            end: 'top 24%',
            scrub: 0.8,
          },
        }
      )

      gsap.fromTo(
        '[data-demo-state]',
        { opacity: 0, y: 18, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 44%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, root)

    return () => context.revert()
  }, [])

  return (
    <Section id="live-demo" className="pt-6">
      <section
        ref={rootRef}
        className="overflow-hidden rounded-[28px] border border-black/10 bg-white/70 p-5 shadow-[var(--mirra-shadow)] backdrop-blur md:p-10"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--mirra-faint)]">
              Live demo
            </p>
            <h2 className="mt-4 max-w-lg text-4xl font-semibold leading-tight text-[var(--mirra-ink)] sm:text-5xl">
              From physical gift to living page.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[var(--mirra-muted)]">
              A card, package, or admission letter opens the digital experience instantly. QR keeps every page accessible.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[var(--mirra-surface-soft)]">
            <Image
              src="/mirra/live-demo-open.webp"
              alt="A phone opening a Mirra digital gift experience from an NFC card"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div
              data-demo-card
              className="absolute left-6 top-1/2 h-28 w-20 -translate-y-1/2 rounded-2xl border border-white/60 bg-white/70 shadow-2xl backdrop-blur sm:left-8"
            />
            <div
              data-demo-state
              className="absolute bottom-6 right-6 rounded-2xl border border-white/50 bg-white/78 px-4 py-3 text-sm font-medium text-[var(--mirra-ink)] shadow-xl backdrop-blur sm:bottom-8 sm:right-8"
            >
              Tap opened. QR ready.
            </div>
          </div>
        </div>
      </section>
    </Section>
  )
}
