import Image from 'next/image'
import { MapPin, Phone } from '@phosphor-icons/react/dist/ssr'
import { DemoChrome } from './DemoChrome'

const facts = [
  ['Breed', 'Golden retriever'],
  ['Age', 'Five years'],
  ['Favorite thing', 'Tennis balls'],
  ['Home', 'North Beach'],
]

const rhythm = [
  ['Morning', 'Slow breakfast, then a sunny walk before the streets get busy.'],
  ['Afternoon', 'Park time. Luna will trade almost anything for a tennis ball.'],
  ['Evening', 'Dinner at six, followed by a nap wherever the family is gathered.'],
]

export function PetTagDemo() {
  return (
    <DemoChrome slug="smart-pet-tag">
      <main className="overflow-hidden bg-[#fff5f8] text-[#371529]">
        <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] gap-10 px-5 pb-14 pt-24 sm:px-8 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-5 lg:col-span-4">
            <p className="text-sm font-semibold text-[#d82f74]">Meet your new best friend</p>
            <h1 className="mt-5 text-[clamp(4.8rem,10vw,8.7rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
              Luna
            </h1>
            <p className="mt-8 max-w-md text-lg leading-8 text-[#765165]">
              Friendly, curious, and always ready for the next sunny walk. If she is alone, her family is looking for her.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+14155550142" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#e9387c] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#cf286b] active:translate-y-0">
                <Phone size={17} weight="fill" aria-hidden="true" />
                Call her family
              </a>
              <a href="#found" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#d82f74]/25 bg-white px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[#d82f74] active:translate-y-0">
                <MapPin size={17} weight="bold" aria-hidden="true" />
                I found Luna
              </a>
            </div>
          </div>

          <div className="relative min-h-[58vh] md:col-span-7 md:min-h-[76vh] lg:col-span-7 lg:col-start-6">
            <div className="absolute inset-x-5 bottom-0 top-8 rounded-[2.1rem] bg-[#ffb6cf] sm:inset-x-10 md:inset-x-0 md:left-10" />
            <div className="absolute inset-x-0 bottom-8 top-0 overflow-hidden rounded-[2.1rem] sm:right-14 md:bottom-12 md:right-10">
              <Image src="/demo-assets/luna-hero.webp" alt="Luna, a happy golden retriever, running through a colorful garden" fill priority sizes="(max-width: 767px) 100vw, 58vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 rounded-[1.5rem] bg-[#ffe355] px-5 py-4 shadow-[0_20px_60px_rgba(113,32,68,0.18)]">
              <p className="text-sm font-semibold">Home is one call away</p>
              <p className="mt-1 text-xs text-[#765165]">Profile updated today</p>
            </div>
          </div>
        </section>

        <section className="bg-[#ffb6cf]">
          <div className="mx-auto grid max-w-[1400px] sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label} className="border-b border-[#371529]/10 px-5 py-8 sm:px-8 lg:border-b-0 lg:border-r last:lg:border-r-0">
                <p className="text-xs font-medium text-[#8d3f62]">{label}</p>
                <p className="mt-3 text-base font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 md:py-28">
          <h2 className="max-w-[10ch] text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">
            A little guide to Luna&apos;s day.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-12">
            {rhythm.map(([title, body], index) => (
              <article key={title} className={`${index === 1 ? 'bg-[#ffe355] md:col-span-5' : index === 0 ? 'bg-[#ff7ba9] text-[#371529] md:col-span-4' : 'bg-[#b99cff] md:col-span-3'} flex min-h-72 flex-col justify-between rounded-[1.8rem] p-7`}>
                <p className="text-sm font-semibold">{title}</p>
                <p className="max-w-[28ch] text-xl font-semibold leading-snug tracking-[-0.025em]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-5 px-5 pb-20 sm:px-8 md:grid-cols-12 md:pb-28">
          <div className="relative min-h-[28rem] overflow-hidden rounded-[1.8rem] md:col-span-5">
            <Image src="/mirra/product-pet-memorial.webp" alt="Luna's contact and care profile displayed on a phone" fill sizes="(max-width: 767px) 100vw, 42vw" className="object-cover" />
          </div>
          <article className="rounded-[1.8rem] bg-[#371529] p-7 text-white sm:p-10 md:col-span-7">
            <p className="text-sm font-semibold text-[#ff9fc1]">Care notes</p>
            <h2 className="mt-8 max-w-[11ch] text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl">
              The details that help her feel safe.
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div><p className="text-xs text-white/55">Medical</p><p className="mt-3 leading-7 text-white/78">No known allergies. Microchipped. No daily medication.</p></div>
              <div><p className="text-xs text-white/55">Approach</p><p className="mt-3 leading-7 text-white/78">Crouch sideways and speak softly. Luna responds to her name and “home”.</p></div>
            </div>
          </article>
        </section>

        <section id="found" className="scroll-mt-20 px-5 pb-24 sm:px-8 md:pb-32">
          <div className="mx-auto grid max-w-[1200px] gap-10 rounded-[1.8rem] bg-[#e9387c] p-7 text-white sm:p-10 md:grid-cols-[0.78fr_1.22fr] md:items-end md:p-14">
            <h2 className="max-w-[8ch] text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">Found Luna?</h2>
            <div>
              <p className="max-w-xl text-lg leading-8 text-white/80">Keep her somewhere quiet, offer water, and contact her family. You never need to share your own address.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="tel:+14155550142" className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#371529]">Call now</a>
                <a href="sms:+14155550142?body=I%20found%20Luna" className="rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold">Send a message</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DemoChrome>
  )
}
