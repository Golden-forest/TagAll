'use client'

import { createContext, useContext, useMemo, useSyncExternalStore } from 'react'
import type { Lang } from '@/content/types'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
}

const STORAGE_KEY = 'photo-album-lang'

// ----------------------------------------------------------------------------
// Module-level store backed by localStorage. The store keeps an in-memory
// mirror so the subscribe/notify path works even if localStorage throws
// (private mode, disabled cookies, etc.).
// ----------------------------------------------------------------------------

let currentLang: Lang = 'zh'
const listeners = new Set<() => void>()

function readFromStorage(): Lang | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'zh' || stored === 'en') return stored
  } catch {
    // localStorage may be unavailable — ignore.
  }
  return null
}

function writeToStorage(next: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Persistence failures are non-fatal.
  }
}

function notify() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)

  // Lazily hydrate from localStorage the first time a client subscribes.
  // If localStorage has a value that differs from the in-memory default,
  // update the module state and notify all listeners (including the new one).
  if (listeners.size === 1) {
    const stored = readFromStorage()
    if (stored && stored !== currentLang) {
      currentLang = stored
      // Notify on next microtask so we don't re-enter during subscribe().
      queueMicrotask(notify)
    }
  }

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): Lang {
  return currentLang
}

function getServerSnapshot(): Lang {
  return 'zh'
}

function setLang(next: Lang) {
  if (next === currentLang) return
  currentLang = next
  writeToStorage(next)
  notify()
}

function toggle() {
  setLang(currentLang === 'zh' ? 'en' : 'zh')
}

const LangContext = createContext<LangContextValue | null>(null)

/**
 * Provides the active language to a photo album tree.
 *
 * SSR-safe: server render uses the deterministic default `'zh'`. On the
 * client, `useSyncExternalStore` reconciles with localStorage on first
 * subscription without any setState-in-effect.
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, toggle }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

/** Access the current language and mutators. Must be used inside `<LangProvider>`. */
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) {
    throw new Error('useLang must be used within a LangProvider')
  }
  return ctx
}
