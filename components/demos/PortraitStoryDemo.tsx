import Image from 'next/image'
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  EnvelopeSimple,
} from '@phosphor-icons/react/dist/ssr'
import { DemoChrome } from './DemoChrome'

const chapters = [
  {
    title: 'Witness',
    text: 'Mara begins without a shot list. She spends time listening, mapping the gestures and silences that reveal how a person occupies their world.',
  },
  {
    title: 'Archive',
    text: 'Contact sheets, voice notes, and found material sit beside the final photographs. The record stays honest about what happened beyond the frame.',
  },
  {
    title: 'Return',
    text: 'Every story goes back to the people who made it possible. Prints become family objects, exhibition walls, and small archives built to last.',
  },
]

const exhibitions = [
  ['After the Thaw', 'Northline Photo Assembly, 2026'],
  ['The Shape of Work', 'Kestrel Rooms, 2025'],
  ['Things We Carry Home', 'Rook Archive, 2024'],
]

export function PortraitStoryDemo() {
  return (
    <DemoChrome slug="portrait-story" tone="dark">
      <main className="bg-[#121416] text-[#f2f4f5]">
        <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pb-12 pt-24 sm:px-8 md:grid-cols-12 md:gap-8 md:pb-16">
          <div className="relative z-10 md:col-span-5 md:pr-6 lg:col-span-4">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#aeb5bb]">
              Documentary photographer
            </p>
            <h1 className="font-serif text-[clamp(3.75rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.055em]">
              Mara
              <br />
              Voss
            </h1>
            <p className="mt-8 max-w-sm text-base leading-7 text-[#b9bec3]">
              Intimate records of work, memory, and the people who hold communities together.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#eef1f2] px-5 py-3 text-sm font-semibold text-[#121416] transition hover:-translate-y-0.5 active:translate-y-0"
              >
                View the work
                <ArrowDownRight size={17} weight="bold" aria-hidden="true" />
              </a>
              <a
                href="mailto:studio@maravoss.photo"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/24 px-5 py-3 text-sm font-semibold text-[#f2f4f5] transition hover:border-white/50 hover:bg-white/6 active:translate-y-px"
              >
                Commission a story
                <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative min-h-[52vh] overflow-hidden rounded-2xl md:col-span-7 md:min-h-[72vh] lg:col-span-8">
            <Image
              src="/demo-assets/mara-hero.webp"
              alt="Mara Voss, documentary photographer, holding a medium-format camera in her studio"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 66vw"
              className="object-cover object-[45%_center] grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121416]/45 via-transparent to-transparent" />
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <Camera size={30} weight="light" aria-hidden="true" />
              <p className="mt-6 max-w-[18rem] text-sm leading-6 text-[#989fa5]">
                Mara works across long-form editorial, cultural archives, and artist commissions.
              </p>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <p className="font-serif text-3xl leading-tight tracking-[-0.025em] text-[#e4e7e9] sm:text-4xl md:text-5xl">
                “A portrait should leave enough room for someone to remain unknowable.”
              </p>
              <div className="mt-10 grid gap-6 text-base leading-7 text-[#aeb5bb] sm:grid-cols-2">
                <p>
                  Her photographs are built through repeat visits and close collaboration. Each assignment begins with conversation, then moves toward a visual language that belongs to the subject.
                </p>
                <p>
                  The result is not a neat conclusion. It is a layered record of a person, their work, and the details that would otherwise disappear.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/12">
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
            <h2 className="max-w-xl font-serif text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl md:text-6xl">
              Three movements in every story.
            </h2>

            <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-y-24">
              <article className="md:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/demo-assets/studio-support.webp"
                    alt="An active artist studio arranged for collaborative work"
                    fill
                    sizes="(max-width: 767px) 100vw, 58vw"
                    className="object-cover grayscale"
                  />
                </div>
              </article>
              <article className="self-end md:col-span-4 md:col-start-9 md:pb-6">
                <p className="font-serif text-4xl tracking-[-0.035em]">{chapters[0].title}</p>
                <p className="mt-5 text-base leading-7 text-[#aeb5bb]">{chapters[0].text}</p>
              </article>

              <article className="md:col-span-4 md:col-start-2">
                <p className="font-serif text-4xl tracking-[-0.035em]">{chapters[1].title}</p>
                <p className="mt-5 text-base leading-7 text-[#aeb5bb]">{chapters[1].text}</p>
              </article>
              <article className="md:col-span-5 md:col-start-7 md:-mt-16">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/demo-assets/mara-hero.webp"
                    alt="Mara Voss working among contact sheets in her photography studio"
                    fill
                    sizes="(max-width: 767px) 100vw, 42vw"
                    className="object-cover object-[20%_center] grayscale"
                  />
                </div>
              </article>

              <article className="border-l border-white/18 pl-6 md:col-span-5 md:col-start-6 md:mt-4 md:pl-10">
                <p className="font-serif text-4xl tracking-[-0.035em]">{chapters[2].title}</p>
                <p className="mt-5 max-w-md text-base leading-7 text-[#aeb5bb]">{chapters[2].text}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="selected-work" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-20 sm:px-8 md:py-32">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="font-serif text-5xl leading-none tracking-[-0.045em] sm:text-6xl">
                Selected work
              </h2>
              <p className="mt-6 max-w-sm text-base leading-7 text-[#9da4aa]">
                Recent photographs move between labor, inheritance, and the private rituals that shape a public life.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              {exhibitions.map(([title, venue]) => (
                <article key={title} className="grid grid-cols-[1fr_auto] gap-6 border-b border-white/14 py-7 first:pt-0">
                  <h3 className="text-xl font-medium tracking-[-0.02em]">{title}</h3>
                  <p className="max-w-[11rem] text-right text-sm leading-6 text-[#959ca2]">{venue}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-white/14 pt-10 md:flex-row md:items-end">
            <div>
              <p className="font-serif text-3xl tracking-[-0.03em]">A new story starts with time.</p>
              <p className="mt-3 text-sm text-[#989fa5]">Editorial commissions, exhibitions, and archive collaborations.</p>
            </div>
            <a
              href="mailto:studio@maravoss.photo"
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#f2f4f5] underline decoration-white/35 underline-offset-8 transition hover:decoration-white"
            >
              Commission a story
              <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </DemoChrome>
  )
}
