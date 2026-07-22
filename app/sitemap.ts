import type { MetadataRoute } from 'next'
import { demos } from '@/content/demos'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/demos`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clock`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const demoPages: MetadataRoute.Sitemap = demos.map((demo) => ({
    url: `${baseUrl}/demos/${demo.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...demoPages]
}
