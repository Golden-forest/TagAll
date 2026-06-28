import { existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

const requiredFiles = [
  'content/site.json',
  'content/products.json',
  'content/how-it-works.json',
  'content/why.json',
  'content/gallery.json',
  'content/testimonials.json',
  'content/faq.json',
]

const missingFiles = requiredFiles.filter((file) => !existsSync(join(root, file)))

if (missingFiles.length > 0) {
  console.error(`Missing content files: ${missingFiles.join(', ')}`)
  process.exit(1)
}

const assetFiles = [
  'public/mirra/hero-nfc-phone.webp',
  'public/mirra/live-demo-open.webp',
  'public/mirra/product-digital-album.webp',
  'public/mirra/product-business-card.webp',
  'public/mirra/product-wedding.webp',
  'public/mirra/product-pet-memorial.webp',
  'public/mirra/product-showcase.webp',
  'public/mirra/product-portfolio.webp',
  'public/mirra/product-resume.webp',
  'public/mirra/product-qr-landing.webp',
  'public/mirra/product-custom.webp',
  'public/mirra/gallery-memory.webp',
  'public/mirra/gallery-wedding.webp',
  'public/mirra/gallery-pet.webp',
  'public/mirra/gallery-creator.webp',
  'public/mirra/gallery-product.webp',
  'public/mirra/gallery-event.webp',
  'public/mirra/og-image.webp',
]

const missingAssets = assetFiles.filter((file) => !existsSync(join(root, file)))

if (missingAssets.length > 0) {
  console.error(`Missing Mirra assets: ${missingAssets.join(', ')}`)
  process.exit(1)
}

console.log('Mirra content files and assets are present.')
