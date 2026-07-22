import { existsSync, readFileSync } from 'node:fs'
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

const errors = []

function readJson(file) {
  try {
    return JSON.parse(readFileSync(join(root, file), 'utf8'))
  } catch (error) {
    errors.push(`Invalid JSON in ${file}: ${error.message}`)
    return undefined
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function assertObject(value, path) {
  if (!isPlainObject(value)) {
    errors.push(`${path} must be an object`)
    return false
  }

  return true
}

function assertString(value, path) {
  if (typeof value !== 'string' || value.trim() === '') {
    errors.push(`${path} must be a non-empty string`)
    return false
  }

  return true
}

function assertArray(value, path, expectedLength) {
  if (!Array.isArray(value)) {
    errors.push(`${path} must be an array`)
    return false
  }

  if (expectedLength !== undefined && value.length !== expectedLength) {
    errors.push(`${path} must contain ${expectedLength} items`)
    return false
  }

  return true
}

function assertHref(value, path, { allowMailto = false } = {}) {
  if (!assertString(value, path)) {
    return
  }

  if (
    value.startsWith('#') ||
    value.startsWith('/') ||
    (allowMailto && value.startsWith('mailto:'))
  ) {
    return
  }

  const expected = allowMailto
    ? 'an anchor, internal path, or mailto link'
    : 'an anchor or internal path'
  errors.push(`${path} must be ${expected}`)
}

function assertStringFields(value, path, fields) {
  if (!assertObject(value, path)) {
    return
  }

  for (const field of fields) {
    assertString(value[field], `${path}.${field}`)
  }
}

function assertLabelHrefItems(value, path, { allowMailto = false } = {}) {
  if (!Array.isArray(value)) {
    return
  }

  value.forEach((item, index) => {
    const itemPath = `${path}[${index}]`

    if (!assertObject(item, itemPath)) {
      return
    }

    assertString(item.label, `${itemPath}.label`)
    assertHref(item.href, `${itemPath}.href`, { allowMailto })
  })
}

function collectImageAsset(value, path, assetFiles) {
  if (!assertString(value, path)) {
    return
  }

  if (!value.startsWith('/mirra/') || !value.endsWith('.webp')) {
    errors.push(`${path} must be a /mirra/*.webp path`)
    return
  }

  assetFiles.add(`public${value}`)
}

function validateFixedArray(value, path, expectedLength, fields) {
  if (value === undefined) {
    return
  }

  if (!assertArray(value, path, expectedLength)) {
    return
  }

  value.forEach((item, index) => {
    assertStringFields(item, `${path}[${index}]`, fields)
  })
}

const site = readJson('content/site.json')
const products = readJson('content/products.json')
const howItWorks = readJson('content/how-it-works.json')
const why = readJson('content/why.json')
const gallery = readJson('content/gallery.json')
const testimonials = readJson('content/testimonials.json')
const faq = readJson('content/faq.json')

const assetFiles = new Set([
  'public/mirra/hero-nfc-phone.webp',
  'public/mirra/live-demo-open.webp',
])

if (site !== undefined && assertObject(site, 'content/site.json')) {
  assertString(site.brand, 'content/site.json.brand')
  assertString(site.tagline, 'content/site.json.tagline')
  assertString(site.description, 'content/site.json.description')

  if (assertObject(site.primaryCta, 'content/site.json.primaryCta')) {
    assertString(site.primaryCta.label, 'content/site.json.primaryCta.label')
    assertHref(site.primaryCta.href, 'content/site.json.primaryCta.href', {
      allowMailto: true,
    })
  }

  if (assertObject(site.secondaryCta, 'content/site.json.secondaryCta')) {
    assertString(site.secondaryCta.label, 'content/site.json.secondaryCta.label')
    assertHref(site.secondaryCta.href, 'content/site.json.secondaryCta.href', {
      allowMailto: true,
    })
  }

  if (assertArray(site.nav, 'content/site.json.nav')) {
    assertLabelHrefItems(site.nav, 'content/site.json.nav')
  }

  if (assertObject(site.seo, 'content/site.json.seo')) {
    assertString(site.seo.title, 'content/site.json.seo.title')
    assertString(site.seo.description, 'content/site.json.seo.description')
    collectImageAsset(site.seo.ogImage, 'content/site.json.seo.ogImage', assetFiles)
  }

  if (assertObject(site.contact, 'content/site.json.contact')) {
    assertString(site.contact.email, 'content/site.json.contact.email')
  }

  if (assertArray(site.footerLinks, 'content/site.json.footerLinks')) {
    assertLabelHrefItems(site.footerLinks, 'content/site.json.footerLinks')
  }
}

if (products !== undefined && assertArray(products, 'content/products.json', 9)) {
  const slugs = new Set()

  products.forEach((product, index) => {
    const path = `content/products.json[${index}]`

    if (!assertObject(product, path)) {
      return
    }

    assertString(product.slug, `${path}.slug`)
    assertString(product.title, `${path}.title`)
    assertString(product.description, `${path}.description`)
    collectImageAsset(product.image, `${path}.image`, assetFiles)

    if (typeof product.slug === 'string' && product.slug.trim() !== '') {
      if (slugs.has(product.slug)) {
        errors.push(`${path}.slug duplicates "${product.slug}"`)
      }

      slugs.add(product.slug)
    }
  })
}

validateFixedArray(howItWorks, 'content/how-it-works.json', 4, [
  'title',
  'description',
])
validateFixedArray(why, 'content/why.json', 6, ['title', 'description'])

if (gallery !== undefined && assertArray(gallery, 'content/gallery.json', 6)) {
  gallery.forEach((item, index) => {
    const path = `content/gallery.json[${index}]`

    if (!assertObject(item, path)) {
      return
    }

    assertString(item.title, `${path}.title`)
    assertString(item.category, `${path}.category`)
    collectImageAsset(item.image, `${path}.image`, assetFiles)
    assertString(item.description, `${path}.description`)
  })
}

validateFixedArray(testimonials, 'content/testimonials.json', 3, [
  'quote',
  'name',
  'role',
  'location',
])
validateFixedArray(faq, 'content/faq.json', 8, ['question', 'answer'])

if (errors.length > 0) {
  console.error(`Invalid TagAll content:\n${errors.map((error) => `- ${error}`).join('\n')}`)
  process.exit(1)
}

const missingAssets = [...assetFiles].filter((file) => !existsSync(join(root, file)))

if (missingAssets.length > 0) {
  console.error(`Missing TagAll assets: ${missingAssets.join(', ')}`)
  process.exit(1)
}

console.log('TagAll content files and assets are present.')
