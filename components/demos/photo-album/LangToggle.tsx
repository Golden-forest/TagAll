'use client'

import { useLang } from './LangContext'
import type { Lang } from '@/content/types'

/**
 * Pill-style language toggle (中文 / EN).
 *
 * Fixed to the top-right, on the same row as the chapter nav but pushed to
 * the right edge. Uses the same translucent dark surface + backdrop blur as
 * the rest of the album chrome.
 */
export function LangToggle() {
  const { lang, setLang } = useLang()

  const options: { value: Lang; label: string }[] = [
    { value: 'zh', label: '中文' },
    { value: 'en', label: 'EN' },
  ]

  return (
    <div
      className="fixed right-5 top-16 z-30 flex items-center gap-0.5 rounded-full border border-white/8 bg-[#0e1014]/85 p-1 backdrop-blur-md sm:right-8"
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => {
        const isActive = opt.value === lang
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={isActive}
            className={`inline-flex h-6 items-center justify-center rounded-full px-2.5 font-sans text-[11px] font-medium tracking-[0.04em] transition sm:px-3 ${
              isActive
                ? 'bg-[#d4a574]/14 text-[#d4a574]'
                : 'text-white/55 hover:bg-white/6 hover:text-white/85'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
