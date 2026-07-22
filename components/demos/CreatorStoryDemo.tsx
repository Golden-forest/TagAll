import Image from 'next/image'
import {
  ArrowRight,
  Cube,
  LampPendant,
  Leaf,
  SealCheck,
} from '@phosphor-icons/react/dist/ssr'
import { DemoChrome } from './DemoChrome'

export function CreatorStoryDemo() {
  return (
    <DemoChrome slug="creator-product-story" tone="dark">
      <main className="overflow-hidden bg-[#11100f] text-[#f5f1e9]">
        <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 gap-10 px-5 pb-12 pt-24 sm:px-8 md:grid-cols-[0.78fr_1.22fr] md:items-center md:gap-14 md:pb-16 md:pt-20 lg:gap-20">
          <div className="max-w-xl md:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff5a1f]">
              Atelier Noma
            </p>
            <h1 className="mt-6 max-w-[9ch] text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Light shaped by movement.
            </h1>
            <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-[#b9b3aa] sm:text-lg">
              Wave 01 is a hand-finished pendant drawn from the motion of folded metal.
            </p>
            <a
              href="#inquiry"
              className="mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#ff5a1f] px-6 py-3.5 text-sm font-semibold text-[#17110e] transition hover:-translate-y-0.5 hover:bg-[#ff7340] active:translate-y-px"
            >
              Request details
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </a>
          </div>

          <div className="relative min-h-[58vh] md:min-h-[74vh]">
            <div className="absolute inset-0 overflow-hidden rounded-[1.75rem]">
              <Image
                src="/demo-assets/creator-hero.webp"
                alt="A lighting designer shaping Wave 01 by hand in her workshop"
                fill
                priority
                loading="eager"
                sizes="(max-width: 767px) 100vw, 61vw"
                className="object-cover object-[52%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100f]/55 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.75rem] border border-white/12 bg-[#11100f]/72 p-5 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-auto sm:w-72 sm:p-6">
              <p className="text-sm font-semibold text-[#ff5a1f]">Wave 01</p>
              <p className="mt-2 text-sm leading-relaxed text-[#cbc5bc]">
                Brushed aluminium, formed and finished in the studio.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 px-5 sm:px-8 md:grid-cols-[0.9fr_1.1fr]">
            <div className="py-12 md:pr-16 md:py-20">
              <LampPendant size={30} weight="duotone" className="text-[#ff5a1f]" aria-hidden="true" />
              <h2 className="mt-10 max-w-[11ch] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
                A lamp with a visible origin.
              </h2>
            </div>
            <div className="border-t border-white/10 py-12 md:border-l md:border-t-0 md:py-20 md:pl-16">
              <p className="max-w-[54ch] text-xl leading-relaxed text-[#c3bdb4] sm:text-2xl">
                Every surface records the pressure that formed it. The finish stays honest, so the object changes gently with the light around it.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
          <h2 className="max-w-[9ch] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
            Material is the first decision.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_0.8fr] md:grid-rows-2">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] md:row-span-2">
              <Image
                src="/mirra/product-showcase.webp"
                alt="Close view of the Wave 01 lamp surface"
                fill
                sizes="(max-width: 767px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <article className="rounded-[1.75rem] bg-[#ff5a1f] p-7 text-[#17110e] sm:p-9">
              <Leaf size={27} weight="duotone" aria-hidden="true" />
              <h3 className="mt-12 text-2xl font-semibold tracking-[-0.035em]">Reduced material palette</h3>
              <p className="mt-3 leading-relaxed text-[#382017]">
                One metal, one cable, and separable fittings make future repair straightforward.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-white/12 p-7 sm:p-9">
              <SealCheck size={27} weight="duotone" className="text-[#ff5a1f]" aria-hidden="true" />
              <h3 className="mt-12 text-2xl font-semibold tracking-[-0.035em]">Made to be known</h3>
              <p className="mt-3 leading-relaxed text-[#aaa49b]">
                Each piece includes its material source, maker, finish, and care record.
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
          <h2 className="max-w-[10ch] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
            From flat sheet to quiet light.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-white/12 pt-10 sm:grid-cols-2">
            <article>
              <p className="text-lg font-semibold text-[#ff5a1f]">Cut</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">The profile begins flat</h3>
              <p className="mt-3 max-w-md leading-relaxed text-[#aaa49b]">
                A compact sheet layout keeps offcuts useful for smaller studio objects.
              </p>
            </article>
            <article>
              <p className="text-lg font-semibold text-[#ff5a1f]">Fold</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">Pressure builds the curve</h3>
              <p className="mt-3 max-w-md leading-relaxed text-[#aaa49b]">
                Successive folds create the shade without hiding its construction.
              </p>
            </article>
            <article>
              <p className="text-lg font-semibold text-[#ff5a1f]">Finish</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">Hands soften every edge</h3>
              <p className="mt-3 max-w-md leading-relaxed text-[#aaa49b]">
                Brushing follows the form and catches light differently across each plane.
              </p>
            </article>
            <article>
              <p className="text-lg font-semibold text-[#ff5a1f]">Assemble</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">Fittings stay accessible</h3>
              <p className="mt-3 max-w-md leading-relaxed text-[#aaa49b]">
                The shade opens for rewiring, cleaning, and replacement parts.
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-5 py-20 sm:px-8 md:grid-cols-[0.75fr_1.25fr] md:py-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] md:mt-28">
            <Image
              src="/demo-assets/creator-hero.webp"
              alt="The Atelier Noma maker shaping the Wave 01 lamp"
              fill
              sizes="(max-width: 767px) 100vw, 38vw"
              className="object-cover object-[18%_center]"
            />
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
            <Image
              src="/mirra/gallery-product.webp"
              alt="Wave 01 pendant installed above a table"
              fill
              sizes="(max-width: 767px) 100vw, 62vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
          <div className="grid grid-cols-1 gap-10 rounded-[1.75rem] border border-white/12 p-7 sm:p-10 md:grid-cols-[0.82fr_1.18fr] md:items-center md:p-14">
            <div className="flex aspect-square max-w-sm items-center justify-center rounded-[1.75rem] bg-[#1d1b19]">
              <Cube size={84} weight="duotone" className="text-[#ff5a1f]" aria-hidden="true" />
            </div>
            <div>
              <h2 className="max-w-[10ch] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
                Trace the object, not a claim.
              </h2>
              <p className="mt-6 max-w-[50ch] leading-relaxed text-[#aaa49b]">
                The TagAll record travels with Wave 01 and keeps its origin, care guidance, and repair history in one place.
              </p>
            </div>
          </div>
        </section>

        <section id="inquiry" className="px-5 pb-20 pt-8 sm:px-8 md:pb-28">
          <div className="mx-auto flex max-w-[1180px] flex-col items-start rounded-[1.75rem] bg-[#ff5a1f] px-7 py-12 text-[#17110e] sm:px-12 sm:py-16 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <h2 className="max-w-[11ch] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
                Bring Wave 01 into your space.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-[#4d2a1b]">
                Ask about finish options, lead time, and installation support.
              </p>
            </div>
            <a
              href="mailto:studio@example.com?subject=Wave%2001%20inquiry"
              className="mt-8 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#17110e] px-6 py-3.5 text-sm font-semibold text-[#f5f1e9] transition hover:-translate-y-0.5 hover:bg-[#2b211c] active:translate-y-px md:mt-0"
            >
              Send inquiry
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </DemoChrome>
  )
}
