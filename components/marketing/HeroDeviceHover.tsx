'use client'

import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

export function HeroDeviceHover() {
  const reduce = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18 })
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(springY, [-1, 1], [2.4, -2.4])
  const rotateY = useTransform(springX, [-1, 1], [-3.2, 3.2])

  return (
    <motion.div
      className="hero-media relative min-h-[430px] overflow-hidden rounded-[30px] md:min-h-[560px]"
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={(event) => {
        if (reduce) return
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
    >
      <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_72%_18%,rgba(71,108,255,0.14),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(238,241,244,0.58))] shadow-[var(--mirra-shadow)]" />
      <Image
        src="/mirra/hero-nfc-phone.webp"
        alt="Premium NFC gift card beside a phone opening a private digital experience"
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-x-6 bottom-6 rounded-[22px] border border-white/50 bg-white/58 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-10 sm:bottom-10">
        <p className="text-sm font-medium text-[var(--mirra-ink)]">NFC + QR private gift page</p>
        <p className="mt-1 text-xs leading-5 text-[var(--mirra-muted)]">
          Built for keepsakes, cultural products, and university offer packs.
        </p>
      </div>
    </motion.div>
  )
}
