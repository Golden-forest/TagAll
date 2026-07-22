import type { Metadata, Viewport } from 'next'
import StandByClock from './StandByClock'

export const metadata: Metadata = {
  title: 'StandBy Clock | TagAll',
  description:
    'A minimalist full-screen clock inspired by iOS StandBy. Pure black background, live time, zero distractions.',
  openGraph: {
    title: 'StandBy Clock | TagAll',
    description:
      'A minimalist full-screen clock inspired by iOS StandBy. Pure black background, live time, zero distractions.',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export default function ClockPage() {
  return <StandByClock />
}
