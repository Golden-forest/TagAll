'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LegacyStudentExperience = dynamic(
  () => import('./LegacyStudentExperience').then((mod) => mod.LegacyStudentExperience),
  {
    ssr: false,
    loading: () => (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#f5f0eb] text-[#0c0816]">
        <p className="text-sm text-[#6b7280]">Loading memory</p>
      </main>
    ),
  }
)

function isLegacyHash() {
  return window.location.hash.startsWith('#/s/')
}

export function LegacyHashGate({ children }: { children: React.ReactNode }) {
  const [legacy, setLegacy] = useState(false)

  useEffect(() => {
    const syncRoute = () => {
      const nextLegacy = isLegacyHash()
      document.documentElement.dataset.mirraRoute = nextLegacy ? 'legacy' : 'marketing'
      setLegacy(nextLegacy)
    }

    syncRoute()
    window.addEventListener('hashchange', syncRoute)

    return () => {
      window.removeEventListener('hashchange', syncRoute)
    }
  }, [])

  return (
    <>
      {legacy ? <LegacyStudentExperience /> : null}
      <div data-marketing-root aria-hidden={legacy || undefined}>
        {children}
      </div>
    </>
  )
}
