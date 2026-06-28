import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import products from '@/content/products.json'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function ProductShowcase() {
  return (
    <Section id="products">
      <Reveal className="max-w-2xl">
        <h2 className="text-4xl font-semibold leading-tight text-[var(--mirra-ink)] sm:text-5xl">
          Built for gifts, culture, and campus moments.
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--mirra-muted)]">
          Start with a use case, then shape the page, physical card, and tap flow around the recipient.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <Reveal key={product.slug} delay={Math.min(index * 0.04, 0.2)}>
            <a
              href={`#${product.slug}`}
              className={`group block overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-[var(--mirra-shadow)] ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              } ${index === 1 ? 'lg:col-span-2' : ''}`}
            >
              <div className={`relative ${index === 0 ? 'aspect-[1.35/1]' : 'aspect-[4/5]'}`}>
                <Image
                  src={product.image}
                  alt={`${product.title} preview`}
                  fill
                  sizes={index === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-[var(--mirra-ink)]">{product.title}</h3>
                  <ArrowRight
                    size={18}
                    className="mt-1 shrink-0 text-[var(--mirra-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--mirra-accent)]"
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--mirra-muted)]">{product.description}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
