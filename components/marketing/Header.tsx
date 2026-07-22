'use client'

import Link from 'next/link'
import { useState } from 'react'
import siteContent from '@/content/site.json'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--tagall-hairline)] bg-[color-mix(in_srgb,var(--tagall-bg)_84%,transparent)] backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[-0.045em] text-[var(--tagall-ink)]"
          onClick={() => setOpen(false)}
        >
          {siteContent.brand}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {siteContent.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-[var(--tagall-muted)] transition-colors duration-300 hover:text-[var(--tagall-accent)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteContent.primaryCta.href}
            className="inline-flex whitespace-nowrap rounded-full bg-[var(--tagall-accent)] px-5 py-2.5 text-sm font-medium text-[var(--tagall-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--tagall-accent-hover)] active:translate-y-0"
          >
            {siteContent.primaryCta.label}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--tagall-hairline)] bg-[var(--tagall-surface-strong)] px-4 text-sm font-medium text-[var(--tagall-ink)] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      <div
        aria-hidden={!open}
        className={`lg:hidden ${open ? 'visible grid grid-rows-[1fr]' : 'invisible grid grid-rows-[0fr]'} border-t border-[var(--tagall-hairline)] bg-[var(--tagall-bg)] transition-all duration-300`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {siteContent.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-[var(--tagall-radius)] px-3 py-3 text-sm font-medium text-[var(--tagall-muted)] transition hover:bg-[var(--tagall-surface-strong)] hover:text-[var(--tagall-ink)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={siteContent.primaryCta.href}
              className="mt-2 inline-flex w-fit rounded-full bg-[var(--tagall-accent)] px-5 py-3 text-sm font-medium text-[var(--tagall-on-accent)]"
              onClick={() => setOpen(false)}
            >
              {siteContent.primaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
