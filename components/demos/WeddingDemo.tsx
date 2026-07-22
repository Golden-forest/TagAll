import Image from 'next/image'
import {
  ArrowRight,
  CalendarBlank,
  Clock,
  MapPin,
  NavigationArrow,
} from '@phosphor-icons/react/dist/ssr'
import { DemoChrome } from './DemoChrome'

const calendarUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Emma%20%26%20Liam%20Wedding&dates=20260912T143000Z%2F20260912T220000Z&location=Lido%20House%2C%20Newport%20Beach&details=Vows%2C%20dinner%2C%20and%20dancing%20with%20Emma%20and%20Liam.'

const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=Lido+House+Newport+Beach'

export function WeddingDemo() {
  return (
    <DemoChrome slug="wedding-invitation">
      <main className="overflow-hidden bg-[#f7f3e8] text-[#10245f]">
        <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 gap-10 px-5 pb-12 pt-24 sm:px-8 md:grid-cols-[0.82fr_1.18fr] md:items-center md:gap-14 md:pb-16 md:pt-20 lg:gap-20">
          <div className="max-w-xl md:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1748d1]">
              Emma &amp; Liam
            </p>
            <h1 className="mt-6 max-w-[10ch] text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              A day by the sea.
            </h1>
            <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-[#40517e] sm:text-lg">
              Join us for vows, dinner, and dancing at the Lido House.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:rsvp@example.com?subject=Emma%20and%20Liam%20RSVP"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#1748d1] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#123aa9] active:translate-y-px"
              >
                RSVP
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </a>
              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#1748d1]/30 bg-[#f7f3e8] px-6 py-3.5 text-sm font-semibold text-[#10245f] transition hover:-translate-y-0.5 hover:border-[#1748d1] active:translate-y-px"
              >
                <CalendarBlank size={17} weight="bold" aria-hidden="true" />
                Add to calendar
              </a>
            </div>
          </div>

          <div className="relative min-h-[56vh] md:min-h-[72vh]">
            <div className="absolute inset-x-8 bottom-0 top-12 rounded-[2rem] bg-[#1748d1] sm:inset-x-12 md:inset-x-0 md:left-12" />
            <div className="absolute inset-x-0 bottom-8 top-0 overflow-hidden rounded-[2rem] sm:right-20 md:bottom-14 md:right-12">
              <Image
                src="/demo-assets/wedding-hero.webp"
                alt="Emma and Liam running hand in hand beside the Mediterranean sea"
                fill
                priority
                loading="eager"
                sizes="(max-width: 767px) 100vw, 58vw"
                className="object-cover object-[48%_center]"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-48 rounded-[2rem] bg-[#f7f3e8] p-5 shadow-[0_20px_60px_rgba(28,52,123,0.16)] sm:w-56 sm:p-6">
              <p className="text-3xl font-semibold tracking-[-0.04em]">12.09.26</p>
              <p className="mt-2 text-sm leading-relaxed text-[#52618a]">
                Saturday at half past three
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#1748d1]/15">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 px-5 sm:px-8 md:grid-cols-3">
            <div className="py-8 md:pr-8">
              <CalendarBlank size={23} weight="duotone" aria-hidden="true" />
              <p className="mt-5 text-sm font-semibold">Saturday, 12 September 2026</p>
            </div>
            <div className="border-t border-[#1748d1]/15 py-8 md:border-l md:border-t-0 md:px-8">
              <Clock size={23} weight="duotone" aria-hidden="true" />
              <p className="mt-5 text-sm font-semibold">Ceremony begins at 3:30 PM</p>
            </div>
            <div className="border-t border-[#1748d1]/15 py-8 md:border-l md:border-t-0 md:pl-8">
              <MapPin size={23} weight="duotone" aria-hidden="true" />
              <p className="mt-5 text-sm font-semibold">Lido House, Newport Beach</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
          <h2 className="max-w-[10ch] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
            The day, simply planned.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-[1.25fr_0.75fr] md:grid-rows-2">
            <article className="rounded-[2rem] bg-[#1748d1] p-7 text-white sm:p-10 md:row-span-2 md:flex md:min-h-[420px] md:flex-col md:justify-between">
              <p className="text-sm font-medium text-white/72">3:30 PM</p>
              <div className="mt-16 md:mt-0">
                <h3 className="text-4xl font-semibold tracking-[-0.04em]">Vows in the courtyard</h3>
                <p className="mt-4 max-w-md leading-relaxed text-white/76">
                  Arrive from 3:00 PM for a welcome drink before the ceremony.
                </p>
              </div>
            </article>
            <article className="rounded-[2rem] border border-[#1748d1]/20 p-7 sm:p-8">
              <p className="text-sm font-medium text-[#52618a]">5:30 PM</p>
              <h3 className="mt-10 text-2xl font-semibold tracking-[-0.035em]">Dinner on the terrace</h3>
            </article>
            <article className="rounded-[2rem] border border-[#1748d1]/20 p-7 sm:p-8">
              <p className="text-sm font-medium text-[#52618a]">8:00 PM</p>
              <h3 className="mt-10 text-2xl font-semibold tracking-[-0.035em]">Dancing after sunset</h3>
            </article>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:py-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="/mirra/product-wedding.webp"
              alt="The light-filled courtyard at Lido House"
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-lg md:py-10">
            <h2 className="text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
              Meet us at Lido House.
            </h2>
            <p className="mt-6 max-w-[42ch] leading-relaxed text-[#52618a]">
              The ceremony and reception are in one place. Valet parking is available at the main entrance.
            </p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#1748d1]/30 px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[#1748d1] active:translate-y-px"
            >
              <NavigationArrow size={17} weight="bold" aria-hidden="true" />
              Open map
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
          <h2 className="max-w-[12ch] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
            A glimpse of what awaits.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-[0.8fr_1.2fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:row-span-2 sm:aspect-auto">
              <Image
                src="/mirra/gallery-event.webp"
                alt="An outdoor table set for the wedding dinner"
                fill
                sizes="(max-width: 639px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
              <Image
                src="/demo-assets/wedding-hero.webp"
                alt="Emma and Liam laughing together during their seaside celebration"
                fill
                sizes="(max-width: 639px) 100vw, 58vw"
                className="object-cover object-[center_45%]"
              />
            </div>
            <div className="rounded-[2rem] bg-[#dfe6ff] p-8 sm:p-10">
              <p className="max-w-[28ch] text-2xl font-semibold leading-snug tracking-[-0.03em]">
                Dress for a coastal evening. Cobalt, soft neutrals, and joyful color are welcome.
              </p>
            </div>
          </div>
        </section>

        <section id="rsvp" className="px-5 pb-20 pt-8 sm:px-8 md:pb-28">
          <div className="mx-auto flex max-w-[1180px] flex-col items-start rounded-[2rem] bg-[#1748d1] px-7 py-12 text-white sm:px-12 sm:py-16 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <h2 className="max-w-[12ch] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
                Save us a dance.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-white/76">
                Please reply by 1 August so we can save your place at the table.
              </p>
            </div>
            <a
              href="mailto:rsvp@example.com?subject=Emma%20and%20Liam%20RSVP"
              className="mt-8 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#f7f3e8] px-6 py-3.5 text-sm font-semibold text-[#10245f] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-px md:mt-0"
            >
              Send RSVP
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </DemoChrome>
  )
}
