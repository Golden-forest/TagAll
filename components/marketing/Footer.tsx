import siteContent from '@/content/site.json'

export function Footer() {
  return (
    <footer id="footer" className="border-t border-[var(--tagall-hairline)] bg-[var(--tagall-surface)]">
      <section id="pricing" className="border-b border-[var(--tagall-hairline)] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--tagall-ink)] sm:text-6xl">
              Make the next tap worth keeping.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--tagall-muted)]">
              We shape the page, physical tag, and tap flow around your person, event, or product.
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <a
              className="inline-flex w-fit whitespace-nowrap rounded-full bg-[var(--tagall-accent)] px-6 py-3.5 text-sm font-medium text-[var(--tagall-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--tagall-accent-hover)] active:translate-y-0"
              href={siteContent.primaryCta.href}
            >
              {siteContent.primaryCta.label}
            </a>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xl font-semibold tracking-[-0.045em] text-[var(--tagall-ink)]">{siteContent.brand}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--tagall-muted)]">
            Designed NFC and QR experiences for people, pets, careers, events, and products.
          </p>
          <a
            className="mt-6 inline-flex border-b border-[var(--tagall-hairline)] pb-1 text-sm font-medium text-[var(--tagall-ink)] transition-colors hover:border-[var(--tagall-accent)] hover:text-[var(--tagall-accent)]"
            href={`mailto:${siteContent.contact.email}`}
          >
            {siteContent.contact.email}
          </a>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          {siteContent.footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[var(--tagall-muted)] transition-colors hover:text-[var(--tagall-accent)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
