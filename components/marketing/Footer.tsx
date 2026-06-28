import siteContent from '@/content/site.json'

export function Footer() {
  return (
    <footer id="footer" className="border-t border-black/10 bg-white/60">
      <section id="pricing" className="border-b border-black/10 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-[var(--mirra-ink)]">
              Custom gift programs are scoped before production.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--mirra-muted)]">
              Explore demos first, then send a brief for a private gift, cultural product, or admission-letter program.
            </p>
          </div>
          <a
            className="inline-flex w-fit whitespace-nowrap rounded-full bg-[var(--mirra-ink)] px-5 py-3 text-sm font-medium text-white"
            href={siteContent.primaryCta.href}
          >
            {siteContent.primaryCta.label}
          </a>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-lg font-semibold text-[var(--mirra-ink)]">{siteContent.brand}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--mirra-muted)]">
            Premium virtual gift cards and NFC-enabled digital experiences for private clients, cultural brands, and universities.
          </p>
          <a className="mt-5 inline-flex text-sm font-medium text-[var(--mirra-ink)]" href={`mailto:${siteContent.contact.email}`}>
            {siteContent.contact.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            {siteContent.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-[var(--mirra-muted)] transition hover:text-[var(--mirra-ink)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {siteContent.footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[var(--mirra-muted)] transition hover:text-[var(--mirra-ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
