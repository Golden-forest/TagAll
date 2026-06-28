import { LegacyHashGate } from '@/components/legacy/LegacyHashGate'
import { LandingPage } from '@/components/marketing/LandingPage'

export default function Page() {
  return (
    <LegacyHashGate>
      <LandingPage />
    </LegacyHashGate>
  )
}
