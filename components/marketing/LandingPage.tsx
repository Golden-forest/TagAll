import { FAQAccordion } from './FAQAccordion'
import { Footer } from './Footer'
import { GalleryMasonry } from './GalleryMasonry'
import { Header } from './Header'
import { Hero } from './Hero'
import { HowItWorksTimeline } from './HowItWorksTimeline'
import { LiveDemo } from './LiveDemo'
import { ProductShowcase } from './ProductShowcase'
import { SmoothScroll } from './SmoothScroll'
import { Testimonials } from './Testimonials'
import { WhyMirra } from './WhyMirra'

export function LandingPage() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <LiveDemo />
        <ProductShowcase />
        <HowItWorksTimeline />
        <WhyMirra />
        <GalleryMasonry />
        <Testimonials />
        <FAQAccordion />
      </main>
      <Footer />
    </>
  )
}
