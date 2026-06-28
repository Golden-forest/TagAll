'use client'

import type { ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

export function MagneticButton({
  href,
  children,
  variant,
}: {
  href: string
  children: ReactNode
  variant: 'primary' | 'secondary'
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })
  const rotateX = useTransform(springY, [-18, 18], [3, -3])
  const rotateY = useTransform(springX, [-18, 18], [-3, 3])

  const classes =
    variant === 'primary'
      ? 'bg-[var(--mirra-ink)] text-white shadow-lg shadow-black/10'
      : 'border border-black/10 bg-white/70 text-[var(--mirra-ink)] shadow-sm backdrop-blur'

  return (
    <motion.a
      href={href}
      className={`inline-flex whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition active:scale-[0.98] ${classes}`}
      style={reduce ? undefined : { x: springX, y: springY, rotateX, rotateY }}
      onMouseMove={(event) => {
        if (reduce) return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18)
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.a>
  )
}
