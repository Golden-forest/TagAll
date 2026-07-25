'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { lisbonAlbum } from '@/content/lisbon-album'

type Phase = 'letterbox' | 'kenburns' | 'title' | 'done'

type Props = {
  onComplete: () => void
}

const TOTAL_DURATION_MS = 12000
const LETTERBOX_MS = 1500
const KENBURNS_END_MS = 10000
const PHOTO_INTERVAL_MS = 2125 // (KENBURNS_END_MS - LETTERBOX_MS) / 4 photos

export function LisbonIntro({ onComplete }: Props) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduce ? 'done' : 'letterbox')
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isSkipping, setIsSkipping] = useState(false)

  // Reduced motion: skip everything
  useEffect(() => {
    if (reduce) {
      const t = window.setTimeout(onComplete, 50)
      return () => window.clearTimeout(t)
    }
  }, [reduce, onComplete])

  // Phase timeline
  useEffect(() => {
    if (reduce) return

    const timers: number[] = []

    timers.push(window.setTimeout(() => setPhase('kenburns'), LETTERBOX_MS))
    timers.push(window.setTimeout(() => setPhase('title'), KENBURNS_END_MS))
    timers.push(window.setTimeout(() => onComplete(), TOTAL_DURATION_MS))

    // Photo rotation during kenburns phase
    for (let i = 1; i < 4; i++) {
      timers.push(
        window.setTimeout(() => setPhotoIndex(i), LETTERBOX_MS + i * PHOTO_INTERVAL_MS),
      )
    }

    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [reduce, onComplete])

  // Lock body scroll during intro
  useEffect(() => {
    if (phase === 'done') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  const handleSkip = () => {
    if (isSkipping) return
    setIsSkipping(true)
    onComplete()
  }

  if (phase === 'done') return null

  const photos = lisbonAlbum.heroPhotos

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Ken Burns photos layer */}
      <div className="absolute inset-0">
        {photos.map((photo, i) => {
          const isActive = i === photoIndex
          return (
            <motion.div
              key={photo.src}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive && phase === 'kenburns' ? 1.12 : isActive ? 1 : 1.12,
                x: isActive ? '-1.5%' : '0%',
                y: isActive ? '-1%' : '0%',
              }}
              transition={{
                opacity: { duration: 0.8, ease: 'easeInOut' },
                scale: { duration: 6, ease: [0.25, 0.1, 0.25, 1] },
                x: { duration: 6, ease: [0.25, 0.1, 0.25, 1] },
                y: { duration: 6, ease: [0.25, 0.1, 0.25, 1] },
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          )
        })}
        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
      </div>

      {/* Cinematic letterbox bars */}
      {phase === 'letterbox' && (
        <>
          <motion.div
            className="absolute inset-x-0 top-0 z-20 bg-black"
            initial={{ height: '40vh' }}
            animate={{ height: 0 }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 z-20 bg-black"
            initial={{ height: '40vh' }}
            animate={{ height: 0 }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          />
        </>
      )}

      {/* Tagline (visible during kenburns phase) */}
      <AnimatePresence>
        {phase === 'kenburns' && (
          <motion.p
            key="tagline"
            className="absolute left-5 top-5 z-20 font-sans text-[10px] uppercase tracking-[0.25em] text-white/55 sm:left-8 sm:top-8 sm:text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {lisbonAlbum.tagline}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Title + start button (visible during title phase) */}
      <AnimatePresence>
        {phase === 'title' && (
          <motion.div
            key="title"
            className="absolute inset-x-0 bottom-0 z-30 px-5 pb-16 sm:px-12 sm:pb-28 md:px-20"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="max-w-[14ch] font-[Georgia,serif] text-[clamp(2.75rem,8vw,6rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
              Five days by the Atlantic.
            </h1>
            <div className="mt-10 flex items-center gap-6">
              <button
                type="button"
                onClick={handleSkip}
                className="group inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3.5 font-sans text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/16"
              >
                <span>Start browsing</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  ↓
                </motion.span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip intro button (top right) */}
      {phase !== 'title' && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute right-5 top-5 z-30 rounded-full bg-white/8 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md transition hover:bg-white/14 hover:text-white/90 sm:right-8 sm:top-8"
        >
          Skip intro
        </button>
      )}

      {/* Timeline progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/8">
        <motion.div
          className="h-full bg-[#d4a574]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: TOTAL_DURATION_MS / 1000, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
