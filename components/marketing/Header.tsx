'use client'

import Link from 'next/link'
import { List, X } from '@phosphor-icons/react'
import { useState } from 'react'
import siteContent from '@/content/site.json'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-black/5 bg-[rgba(247,248,247,0.76)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-[var(--mirra-ink)]"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full border border-black/10 bg-white shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--mirra-ink)]" />
          </span>
          {siteContent.brand}
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {siteContent.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--mirra-muted)] transition hover:text-[var(--mirra-ink)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteContent.primaryCta.href}
            className="inline-flex rounded-full bg-[var(--mirra-ink)] px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-300 hover:-translate-y-0.5"
          >
            {siteContent.primaryCta.label}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[var(--mirra-ink)] shadow-sm lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
      </nav>

      <div
        className={`lg:hidden ${open ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'} border-t border-black/5 bg-[rgba(247,248,247,0.92)] transition-all duration-300`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {siteContent.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-3 text-sm font-medium text-[var(--mirra-muted)] transition hover:bg-white hover:text-[var(--mirra-ink)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={siteContent.primaryCta.href}
              className="mt-2 inline-flex w-fit rounded-full bg-[var(--mirra-ink)] px-5 py-3 text-sm font-medium text-white"
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
