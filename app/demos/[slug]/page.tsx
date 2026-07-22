import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { demos, findDemo } from '@/content/demos'
import { BusinessCardDemo } from '@/components/demos/BusinessCardDemo'
import { CreatorStoryDemo } from '@/components/demos/CreatorStoryDemo'
import { PetTagDemo } from '@/components/demos/PetTagDemo'
import { PortraitStoryDemo } from '@/components/demos/PortraitStoryDemo'
import { ResumeDemo } from '@/components/demos/ResumeDemo'
import { WeddingDemo } from '@/components/demos/WeddingDemo'

const pages = {
  'smart-pet-tag': PetTagDemo,
  'digital-business-card': BusinessCardDemo,
  'portrait-story': PortraitStoryDemo,
  'interactive-resume': ResumeDemo,
  'wedding-invitation': WeddingDemo,
  'creator-product-story': CreatorStoryDemo,
} as const

export function generateStaticParams() {
  return demos.map((demo) => ({ slug: demo.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const demo = findDemo(slug)
  if (!demo) return {}
  return {
    title: `${demo.title} Demo | TagAll`,
    description: demo.description,
    openGraph: { images: [demo.image] },
  }
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const Component = pages[slug as keyof typeof pages]
  if (!Component) notFound()
  return <Component />
}
