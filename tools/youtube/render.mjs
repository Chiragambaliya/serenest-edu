#!/usr/bin/env node
// Render YouTube channel art + drug-brief thumbnails into youtube/art/.
//   node tools/youtube/render.mjs
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const here = dirname(fileURLToPath(import.meta.url))
const { chromium } = createRequire(import.meta.url)('playwright')
const out = resolve(here, '../../youtube/art')
mkdirSync(out, { recursive: true })
const page0 = pathToFileURL(resolve(here, 'art.html')).href

const jobs = [
  { kind: 'banner', w: 2560, h: 1440, file: 'banner-2560x1440.png' },
  { kind: 'avatar', w: 800, h: 800, file: 'profile-800x800.png' },
  { kind: 'watermark', w: 150, h: 150, file: 'watermark-150x150.png', transparent: true },
  ...['brexpiprazole', 'escitalopram', 'lithium', 'olanzapine', 'buprenorphine'].map((slug) => ({
    kind: 'thumb', slug, w: 1280, h: 720, file: `thumb-${slug}.jpg`,
  })),
]

const browser = await chromium.launch()
for (const j of jobs) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h } })
  await page.goto(`${page0}?kind=${j.kind}${j.slug ? `&slug=${j.slug}` : ''}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const isJpg = j.file.endsWith('.jpg')
  await page.screenshot({ path: `${out}/${j.file}`, type: isJpg ? 'jpeg' : 'png', quality: isJpg ? 92 : undefined, omitBackground: !!j.transparent })
  console.log(j.file)
  await page.close()
}
await browser.close()
