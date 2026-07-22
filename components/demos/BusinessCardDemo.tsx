import Image from 'next/image'
import {
  ArrowUpRight,
  CalendarBlank,
  DownloadSimple,
} from '@phosphor-icons/react/dist/ssr'
import { DemoChrome } from './DemoChrome'

const vCard = 'data:text/vcard;charset=utf-8,BEGIN%3AVCARD%0AVERSION%3A3.0%0AFN%3AAlex%20Chen%0ATITLE%3ACreative%20Director%0AEMAIL%3Aalex%40northstar.studio%0ATEL%3A%2B14155550186%0AURL%3Ahttps%3A%2F%2Fnorthstar.studio%0AEND%3AVCARD'

const links = [
  { label: 'Email', value: 'alex@northstar.studio', href: 'mailto:alex@northstar.studio' },
  { label: 'Phone', value: '+1 415 555 0186', href: 'tel:+14155550186' },
  { label: 'Website', value: 'northstar.studio', href: 'https://example.com' },
]

export function BusinessCardDemo() {
  return (
    <DemoChrome slug="digital-business-card">
      <main className="bg-[#eef1ff] text-[#101218]">
        <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] gap-10 px-5 pb-12 pt-24 sm:px-8 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-5">
            <p className="text-sm font-semibold text-[#2559d6]">Creative Director</p>
            <h1 className="mt-5 text-6xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">Alex Chen</h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#5b6472]">Brand systems, digital launches, and spaces that make new ideas feel inevitable.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={vCard} download="Alex-Chen.vcf" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#101218] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 active:translate-y-px"><DownloadSimple size={17} weight="bold" aria-hidden="true" />Save contact</a>
              <a href="mailto:alex@northstar.studio" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-black/16 bg-white px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-px">Start a conversation<ArrowUpRight size={17} weight="bold" aria-hidden="true" /></a>
            </div>
          </div>
          <div className="relative min-h-[58vh] overflow-hidden rounded-[1.6rem] border border-black/10 bg-white md:col-span-6 md:col-start-7 md:min-h-[74vh]">
            <Image src="/demo-assets/alex-hero.webp" alt="Alex Chen, creative director, in his design studio" fill priority sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-[58%_center]" />
            <div className="absolute bottom-5 left-5 rounded-[1.1rem] bg-[#2559d6] px-4 py-3 text-white shadow-[0_18px_50px_rgba(21,46,112,0.24)]">
              <p className="text-xs font-medium text-white/70">Currently</p>
              <p className="mt-1 text-sm font-semibold">Independent creative direction</p>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white/55">
          <div className="mx-auto grid max-w-[1400px] sm:grid-cols-3">
            {links.map(({ label, value, href }) => (
              <a key={label} href={href} className="group flex min-h-32 flex-col justify-between border-b border-black/10 px-5 py-7 transition hover:bg-[#dfe5ff] sm:border-b-0 sm:border-r sm:px-8 last:sm:border-r-0">
                <span className="text-xs font-medium text-[#7a8390]">{label}</span>
                <span className="mt-6 text-base font-semibold transition group-hover:text-[#2559d6]">{value}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 sm:px-8 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <h2 className="text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">Selected work, from position to launch.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {[
              ['Northstar Health', 'A new position and identity for a care platform entering its next market.'],
              ['Museo Annual', 'Editorial direction across exhibition, campaign, and printed program.'],
              ['Orbit Objects', 'Launch story, moving image, and retail language for a first collection.'],
              ['Common Ground', 'A flexible brand system built with the internal team, not handed over to it.'],
            ].map(([title, body], index) => (
              <article key={title} className={`${index === 0 ? 'bg-[#2559d6] text-white' : 'border border-black/10 bg-white'} rounded-[1.4rem] p-6`}>
                <p className={`text-xs font-medium ${index === 0 ? 'text-white/65' : 'text-[#7a8390]'}`}>Selected engagement</p>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className={`mt-8 text-sm leading-6 ${index === 0 ? 'text-white/78' : 'text-[#626c79]'}`}>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8 md:pb-32">
          <div className="rounded-[1.6rem] bg-[#101218] px-7 py-12 text-white sm:px-12 sm:py-14 md:flex md:items-end md:justify-between md:gap-12">
            <div><p className="text-sm font-medium text-[#8faeff]">Available for selected collaborations</p><h2 className="mt-5 max-w-[12ch] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">Make the next introduction count.</h2></div>
            <a href="mailto:alex@northstar.studio?subject=Meeting%20request" className="mt-8 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#101218] transition hover:-translate-y-0.5 md:mt-0"><CalendarBlank size={17} weight="bold" aria-hidden="true" />Request a meeting</a>
          </div>
        </section>
      </main>
    </DemoChrome>
  )
}
