import { FAQAccordion } from './FAQAccordion'
import { Footer } from './Footer'
import { GalleryMasonry } from './GalleryMasonry'
import { Header } from './Header'
import { Hero } from './Hero'
import { HowItWorksTimeline } from './HowItWorksTimeline'
import { LiveDemo } from './LiveDemo'
import { ProductShowcase } from './ProductShowcase'
import { Testimonials } from './Testimonials'
import { WhyTagAll } from './WhyTagAll'

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LiveDemo />
        <ProductShowcase />
        <HowItWorksTimeline />
        <WhyTagAll />
        <GalleryMasonry />
        <Testimonials />
        <FAQAccordion />
      </main>
      <Footer />
    </>
  )
}
