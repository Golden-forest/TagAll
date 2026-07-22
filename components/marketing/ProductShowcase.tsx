import Image from 'next/image'
import Link from 'next/link'
import { demos } from '@/content/demos'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function ProductShowcase() {
  const layout = [
    'lg:col-span-7',
    'lg:col-span-5',
    'lg:col-span-4',
    'lg:col-span-8',
    'lg:col-span-6',
    'lg:col-span-6',
  ]

  return (
    <Section id="products">
      <Reveal className="max-w-3xl">
        <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--tagall-ink)] sm:text-6xl">
          A real page behind every tap.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--tagall-muted)] sm:text-lg">
          Six live cases show how one simple tag can serve very different people and moments.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {demos.map((product, index) => (
          <Reveal key={product.title} delay={Math.min(index * 0.04, 0.2)} className={`h-full ${layout[index]}`}>
            <Link
              href={product.href}
              className={`group grid h-full overflow-hidden rounded-[var(--tagall-radius)] border border-[var(--tagall-hairline)] bg-[var(--tagall-surface-strong)] transition duration-500 hover:-translate-y-1 hover:shadow-[var(--tagall-shadow)] ${index === 3 ? 'sm:grid-cols-[1.2fr_0.8fr]' : ''}`}
            >
              <div className={`relative overflow-hidden ${index === 3 ? 'aspect-[4/3] sm:aspect-auto' : index < 2 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                <Image
                  src={product.image}
                  alt={`${product.title} preview`}
                  fill
                  sizes={index === 0 ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 45vw, 100vw'}
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />
              </div>
              <div className="flex flex-col justify-between p-6">
                <div>
                  <p className="text-xs font-medium text-[var(--tagall-faint)]">{product.category}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-[var(--tagall-ink)]">{product.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--tagall-muted)]">{product.description}</p>
                <span className="mt-5 w-fit border-b border-[var(--tagall-hairline)] pb-1 text-sm font-medium text-[var(--tagall-ink)] transition-colors group-hover:border-[var(--tagall-accent)] group-hover:text-[var(--tagall-accent)]">
                  View demo
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
