import Link from 'next/link'
import { demos } from '@/content/demos'

type DemoChromeProps = {
  slug: string
  tone?: 'light' | 'dark'
  children: React.ReactNode
}

export function DemoChrome({ slug, tone = 'light', children }: DemoChromeProps) {
  const index = demos.findIndex((demo) => demo.slug === slug)
  const next = demos[(index + 1) % demos.length]
  const dark = tone === 'dark'
  const text = dark ? 'text-white' : 'text-[#111318]'
  const muted = dark ? 'text-white/62' : 'text-[#626b78]'
  const hoverText = dark ? 'hover:text-white' : 'hover:text-[#111318]'
  const border = dark ? 'border-white/14' : 'border-black/10'
  const surface = dark ? 'bg-black/20' : 'bg-white/72'
  const footerSurface = dark ? 'bg-[#111318]' : 'bg-[#f4f5f7]'

  return (
    <div className={text}>
      <header className={`absolute inset-x-0 top-0 z-40 border-b ${border} ${surface} backdrop-blur-xl`}>
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="text-sm font-semibold tracking-[-0.02em]">
            TagAll
          </Link>
          <Link
            href="/#products"
            className={`inline-flex text-sm font-medium ${muted} ${hoverText} transition`}
          >
            All demos
          </Link>
        </nav>
      </header>

      {children}

      <footer className={`border-t ${border} ${footerSurface}`}>
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className={`text-xs font-medium ${muted}`}>Next live demo</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{next.title}</p>
          </div>
          <Link
            href={next.href}
            className={`inline-flex w-fit whitespace-nowrap rounded-full border ${border} px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5`}
          >
            Open demo
          </Link>
        </div>
      </footer>
    </div>
  )
}
