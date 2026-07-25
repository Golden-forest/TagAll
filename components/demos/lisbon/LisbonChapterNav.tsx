'use client'

import { useEffect, useState } from 'react'
import type { Chapter } from '@/content/lisbon-album'

type Props = {
  chapters: Chapter[]
  visible: boolean  // hidden during intro
}

export function LisbonChapterNav({ chapters, visible }: Props) {
  const [activeId, setActiveId] = useState<number>(0)

  useEffect(() => {
    if (!visible) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry closest to the top that's currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          const id = visible[0].target.id.replace('chapter-', '')
          const parsed = Number.parseInt(id, 10)
          if (!Number.isNaN(parsed)) setActiveId(parsed)
        }
      },
      {
        // Trigger when section's top enters the top ~40% of viewport
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      },
    )

    chapters.forEach((c) => {
      const el = document.getElementById(`chapter-${c.id}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [chapters, visible])

  const handleClick = (id: number) => {
    const el = document.getElementById(`chapter-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={`fixed inset-x-0 top-16 z-30 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-label="Chapter navigation"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-1 px-5 py-3 sm:gap-2 sm:px-8">
        <div className="flex items-center gap-1 rounded-full border border-white/8 bg-[#0e1014]/85 px-2 py-1.5 backdrop-blur-md sm:gap-1.5 sm:px-3">
          {chapters.map((c) => {
            const isActive = c.id === activeId
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleClick(c.id)}
                className={`group relative inline-flex h-7 items-center justify-center rounded-full px-2.5 font-sans text-[11px] font-medium tabular-nums transition sm:px-3 ${
                  isActive
                    ? 'bg-[#d4a574]/14 text-[#d4a574]'
                    : 'text-white/40 hover:bg-white/6 hover:text-white/75'
                }`}
                aria-label={`Go to chapter ${c.id}: ${c.title}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="tracking-[0.04em]">{String(c.id).padStart(2, '0')}</span>
                <span className="sr-only"> · {c.title}</span>
                {/* Expanded label on hover (desktop only) */}
                <span className="pointer-events-none absolute -bottom-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-white/6 px-2.5 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-white/70 opacity-0 backdrop-blur-md transition group-hover:opacity-100 md:block">
                  {c.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
