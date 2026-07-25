'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react/dist/ssr'
import type { AlbumPhoto } from '@/content/lisbon-album'

type Props = {
  photos: AlbumPhoto[]
  index: number | null  // null = closed
  onClose: () => void
  onChange: (index: number) => void
  chapterLabel?: string
}

// SSR-safe client-only flag without setState-in-effect.
// Returns false during SSR and the first client render, then true after hydration.
const emptySubscribe = () => () => {}
function getHydratedSnapshot() {
  return true
}
function getServerSnapshot() {
  return false
}

export function LisbonLightbox({ photos, index, onClose, onChange, chapterLabel }: Props) {
  const reduce = useReducedMotion()
  const mountedState = useSyncExternalStore(emptySubscribe, getHydratedSnapshot, getServerSnapshot)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Lock body scroll while open
  useEffect(() => {
    if (index === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [index])

  // Move focus to close button on open
  useEffect(() => {
    if (index !== null) {
      // Small delay so the button exists in DOM
      const id = window.setTimeout(() => closeBtnRef.current?.focus(), 60)
      return () => window.clearTimeout(id)
    }
  }, [index])

  // Keyboard navigation
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && index > 0) onChange(index - 1)
      else if (e.key === 'ArrowRight' && index < photos.length - 1) onChange(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, photos.length, onClose, onChange])

  // Touch swipe
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || index === null) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 50 && index > 0) onChange(index - 1)
      else if (dx < -50 && index < photos.length - 1) onChange(index + 1)
    } else {
      // Vertical swipe — swipe down to close
      if (dy > 80) onClose()
    }
    touchStart.current = null
  }

  if (!mountedState) return null

  const photo = index !== null ? photos[index] : null
  const isOpen = photo !== null

  return createPortal(
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={(e) => {
            // Close on backdrop click (not on photo itself)
            if (e.target === e.currentTarget) onClose()
          }}
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption || 'Photo viewer'}
        >
          {/* Close button (top-right) */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white/80 backdrop-blur-md transition hover:bg-white/14 hover:text-white"
            aria-label="Close photo viewer"
          >
            <X size={18} weight="bold" />
          </button>

          {/* Counter (top-left) */}
          <p className="absolute left-5 top-5 z-10 font-sans text-xs uppercase tracking-[0.18em] text-white/50">
            {String(index! + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </p>

          {/* Previous button */}
          {index! > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange(index! - 1)
              }}
              className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/6 text-white/70 backdrop-blur-md transition hover:bg-white/12 hover:text-white"
              aria-label="Previous photo"
            >
              <ArrowLeft size={20} weight="bold" />
            </button>
          )}

          {/* Next button */}
          {index! < photos.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange(index! + 1)
              }}
              className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/6 text-white/70 backdrop-blur-md transition hover:bg-white/12 hover:text-white"
              aria-label="Next photo"
            >
              <ArrowRight size={20} weight="bold" />
            </button>
          )}

          {/* Photo */}
          <motion.div
            key={photo.src}
            className="relative h-[72vh] max-h-[80vh] w-auto max-w-[90vw]"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </motion.div>

          {/* Metadata footer */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent px-5 pb-6 pt-12 sm:px-8 sm:pb-10">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-[60ch]">
                {chapterLabel && (
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#d4a574]">
                    {chapterLabel}
                  </p>
                )}
                {photo.caption && (
                  <p className="mt-2 font-[Georgia,serif] text-lg italic text-white">
                    {photo.caption}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[11px] uppercase tracking-[0.15em] text-white/55">
                  {photo.time && <span>{photo.time}</span>}
                  {photo.location && <span>{photo.location}</span>}
                </div>
              </div>
              <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/35">
                ESC to close · ← → to navigate
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
