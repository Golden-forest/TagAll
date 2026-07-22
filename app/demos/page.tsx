import Image from 'next/image'
import Link from 'next/link'
import { demos } from '@/content/demos'

export const metadata = {
  title: 'Live Demos | TagAll',
  description: 'Explore personalized NFC and QR experiences for people, pets, careers, events, and products.',
}

export default function DemosPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--tagall-bg)] text-[var(--tagall-ink)]">
      <header className="border-b border-[var(--tagall-hairline)]">
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="text-lg font-semibold tracking-[-0.045em]">TagAll</Link>
          <Link href="/" className="text-sm text-[var(--tagall-muted)] transition-colors hover:text-[var(--tagall-accent)]">
            Back home
          </Link>
        </nav>
      </header>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24">
        <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">
          Six live experiences. Each built for a different story.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--tagall-muted)]">
          Explore the information, actions, and visual language behind every TagAll page.
        </p>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {demos.map((demo, index) => (
            <Link
              key={demo.slug}
              href={demo.href}
              className={`group overflow-hidden rounded-[var(--tagall-radius)] border border-[var(--tagall-hairline)] bg-[var(--tagall-surface-strong)] transition duration-500 hover:-translate-y-1 hover:shadow-[var(--tagall-shadow)] ${index < 2 ? 'lg:col-span-6' : 'lg:col-span-4'}`}
            >
              <div className={`relative overflow-hidden ${index < 2 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                <Image
                  src={demo.image}
                  alt={`${demo.title} preview`}
                  fill
                  sizes={index < 2 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-[var(--tagall-faint)]">{demo.category}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{demo.title}</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--tagall-muted)]">{demo.description}</p>
                <span className="mt-5 inline-flex border-b border-[var(--tagall-hairline)] pb-1 text-sm font-medium transition-colors group-hover:border-[var(--tagall-accent)] group-hover:text-[var(--tagall-accent)]">
                  View demo
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
