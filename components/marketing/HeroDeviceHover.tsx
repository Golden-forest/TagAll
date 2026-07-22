import Image from 'next/image'

export function HeroDeviceHover() {
  return (
    <figure className="hero-media">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--tagall-radius)] bg-[var(--tagall-surface-soft)] shadow-[var(--tagall-shadow)] lg:aspect-[1.08/1]">
        <Image
          src="/mirra/hero-nfc-phone.webp"
          alt="NFC card beside a phone displaying a personal TagAll page"
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-4 grid gap-1 text-sm sm:grid-cols-[1fr_auto] sm:gap-6">
        <span className="font-medium text-[var(--tagall-ink)]">One physical tag. One living page.</span>
        <span className="text-[var(--tagall-muted)]">NFC and QR ready</span>
      </figcaption>
    </figure>
  )
}
