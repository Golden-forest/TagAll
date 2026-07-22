import Image from 'next/image'
import {
  ArrowDown,
  Briefcase,
  CheckCircle,
  EnvelopeSimple,
} from '@phosphor-icons/react/dist/ssr'
import { DemoChrome } from './DemoChrome'
import { ResumePortfolioCarousel } from './ResumePortfolioCarousel'

const experience = [
  {
    period: '2023 - Present',
    role: 'Lead Product Designer',
    company: 'Northstar Health',
    summary: 'Leading patient and clinician workflows across a multi-product care platform, from service mapping through shipped interaction systems.',
  },
  {
    period: '2020 - 2023',
    role: 'Senior Product Designer',
    company: 'Common Thread',
    summary: 'Designed research, planning, and reporting tools for distributed operations teams while helping establish the company design system.',
  },
  {
    period: '2017 - 2020',
    role: 'Product Designer',
    company: 'Relay Studio',
    summary: 'Worked with early product teams on information architecture, prototyping, user research, and accessible interface delivery.',
  },
]

const skills = [
  'Product strategy',
  'Interaction design',
  'Design systems',
  'Qualitative research',
  'Service mapping',
  'Accessible design',
]

const cvDownload =
  'data:text/plain;charset=utf-8,Maya%20Linwood%0AProduct%20Designer%0A%0AExperience%0ALead%20Product%20Designer%2C%20Northstar%20Health%2C%202023-Present%0ASenior%20Product%20Designer%2C%20Common%20Thread%2C%202020-2023%0AProduct%20Designer%2C%20Relay%20Studio%2C%202017-2020%0A%0ASkills%0AProduct%20strategy%2C%20interaction%20design%2C%20design%20systems%2C%20qualitative%20research%2C%20service%20mapping%2C%20accessible%20design'

export function ResumeDemo() {
  return (
    <DemoChrome slug="interactive-resume">
      <main className="bg-[#f4f6f8] text-[#121820]">
        <section className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pb-12 pt-24 sm:px-8 md:grid-cols-12 md:gap-10 md:pb-16">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="mb-5 text-sm font-semibold text-[#1649d8]">Product Designer</p>
            <h1 className="text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Maya Linwood
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#4d5968]">
              I design complex services that feel clear to the people who rely on them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={cvDownload}
                download="Maya-Linwood-CV.txt"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#1649d8] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#123eb8] active:translate-y-0"
              >
                Download CV
                <ArrowDown size={17} weight="bold" aria-hidden="true" />
              </a>
              <a
                href="mailto:maya@linwood.design"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-[#b8c0cc] bg-white px-5 py-3 text-sm font-semibold text-[#18202b] transition hover:-translate-y-0.5 hover:border-[#7c8796] active:translate-y-0"
              >
                Contact Maya
                <EnvelopeSimple size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative min-h-[52vh] overflow-hidden rounded-2xl border border-[#d9dee5] bg-white md:col-span-6 md:min-h-[70vh] lg:col-span-6 lg:col-start-7">
            <Image
              src="/demo-assets/maya-hero.webp"
              alt="Maya Linwood, product designer, reviewing interface sketches in her studio"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-[68%_center]"
            />
          </div>
        </section>

        <section className="border-y border-[#d9dee5] bg-[#edf1f5]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-20">
            <div className="md:col-span-3">
              <Briefcase size={28} weight="regular" className="text-[#1649d8]" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">Recruiter summary</h2>
            </div>
            <div className="grid gap-8 md:col-span-8 md:col-start-5 sm:grid-cols-2">
              <p className="text-lg leading-8 text-[#3f4b5a]">
                Maya moves between product strategy and detailed interaction design, with a focus on healthcare and operational tools.
              </p>
              <div className="space-y-4 text-sm leading-6 text-[#4d5968]">
                <p className="flex gap-3">
                  <CheckCircle size={19} weight="fill" className="mt-0.5 shrink-0 text-[#1649d8]" aria-hidden="true" />
                  Leads discovery through delivery with product and engineering partners.
                </p>
                <p className="flex gap-3">
                  <CheckCircle size={19} weight="fill" className="mt-0.5 shrink-0 text-[#1649d8]" aria-hidden="true" />
                  Builds accessible systems for complex, high-stakes workflows.
                </p>
                <p className="flex gap-3">
                  <CheckCircle size={19} weight="fill" className="mt-0.5 shrink-0 text-[#1649d8]" aria-hidden="true" />
                  Makes research traceable to concrete product decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="text-4xl font-semibold tracking-[-0.045em]">Experience</h2>
              <p className="mt-5 max-w-xs text-sm leading-6 text-[#657181]">
                Nine years designing products where clarity, trust, and operational reality matter.
              </p>
            </div>
            <div className="border-l border-[#ccd3dc] pl-8 md:col-span-8 md:col-start-5 md:pl-10">
              {experience.map((item) => (
                <article key={item.company} className="relative grid gap-4 border-b border-[#ccd3dc] py-8 first:pt-0 sm:grid-cols-[9rem_1fr]">
                  <span className="absolute -left-[2.48rem] top-9 h-3 w-3 rounded-full border-[3px] border-[#f4f6f8] bg-[#1649d8] first:top-1" aria-hidden="true" />
                  <p className="text-sm font-medium text-[#5f6875]">{item.period}</p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">{item.role}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#1649d8]">{item.company}</p>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-[#566272]">{item.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ResumePortfolioCarousel />

        <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="text-4xl font-semibold tracking-[-0.045em]">Working strengths</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#5d6978]">
                A practical toolkit for turning ambiguous services into understandable product decisions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:col-span-6 md:col-start-7">
              {skills.map((skill) => (
                <p key={skill} className="rounded-xl border border-[#d3d9e1] bg-white px-4 py-4 text-sm font-semibold text-[#283240]">
                  {skill}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-24 rounded-2xl border border-[#d3d9e1] bg-white px-6 py-10 sm:px-10 md:flex md:items-end md:justify-between md:gap-10 md:px-12 md:py-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#121820] sm:text-4xl">Need the full picture?</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#5d6978]">
                Get the complete CV, or ask Maya about a product challenge your team is working through.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 md:mt-0 md:justify-end">
              <a
                href={cvDownload}
                download="Maya-Linwood-CV.txt"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#1649d8] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#123eb8] active:translate-y-0"
              >
                Download CV
                <ArrowDown size={17} weight="bold" aria-hidden="true" />
              </a>
              <a
                href="mailto:maya@linwood.design"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-[#b8c0cc] bg-white px-5 py-3 text-sm font-semibold text-[#18202b] transition hover:-translate-y-0.5 hover:border-[#7c8796] active:translate-y-0"
              >
                Contact Maya
                <EnvelopeSimple size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </DemoChrome>
  )
}
