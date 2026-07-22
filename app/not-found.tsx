import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--tagall-bg)] px-6 text-center">
      <div className="max-w-md">
        <p className="mb-3 font-mono text-xs text-[var(--tagall-muted)]">
          Page not found
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-[var(--tagall-ink)]">
          This experience is not available.
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--tagall-muted)]">
          Return to TagAll or check the link you were given.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[var(--tagall-ink)] px-5 py-3 text-sm font-medium text-white"
        >
          Back to TagAll
        </Link>
      </div>
    </main>
  )
}
