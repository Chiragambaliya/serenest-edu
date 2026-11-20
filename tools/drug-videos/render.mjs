#!/usr/bin/env node
// Render one short "Drug Brief" video per molecule in the Academy Drugs tab.
//
//   node tools/drug-videos/render.mjs --data src/academy/data/drugs.js --out static/app/videos
//   node tools/drug-videos/render.mjs --only lithium --stills   # quick PNG checks, no video
//
// Needs Playwright (Chromium) and ffmpeg on PATH. The look is copied from the
// Drugs tab (src/academy/academy.css), and all text comes from drugs.js, so
// regenerate after editing that file.

import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

const here = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const args = process.argv.slice(2)
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? fallback : args[i + 1]
}
const flag = (name) => args.includes(`--${name}`)

const dataPath = resolve(opt('data', 'src/academy/data/drugs.js'))
const outDir = resolve(opt('out', 'static/app/videos'))
const fps = Number(opt('fps', 30))
const only = opt('only', null)
const stills = flag('stills')

// Accepts the React app's drugs.js (export const DRUGS) or the web app's static/app/data.js (window.SA_DRUGS).
let DRUGS
const source = readFileSync(dataPath, 'utf8')
if (source.includes('window.SA_DRUGS')) {
  const window = {}
  runInNewContext(source, { window })
  DRUGS = window.SA_DRUGS
} else {
  ({ DRUGS } = await import(pathToFileURL(dataPath).href))
}
const all = DRUGS.map((d) => d.shortName)
const targets = DRUGS.map((drug, index) => ({ drug, index })).filter(({ drug }) => !only || drug.slug === only)
if (!targets.length) throw new Error(`No drug matches --only ${only}`)
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
const template = pathToFileURL(resolve(here, 'brief.html')).href

for (const { drug, index } of targets) {
  await page.goto(template, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const duration = await page.evaluate((brief) => {
    window.BRIEF = brief
    return window.setupBrief()
  }, { drug, all, index })

  if (stills) {
    for (const t of [3, 6, 12, 17, 22, 31, 36.5, duration - 2]) {
      await page.evaluate((x) => window.renderAt(x), t)
      await page.screenshot({ path: `${outDir}/${drug.slug}-${String(t).replace('.', '_')}s.png` })
    }
    console.log(`${drug.slug}: stills written`)
    continue
  }

  const file = `${outDir}/${drug.slug}.mp4`
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', file,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((ok, fail) => ff.on('close', (code) => (code === 0 ? ok() : fail(new Error(`ffmpeg exited ${code}`)))))

  const frames = Math.round(duration * fps)
  for (let f = 0; f < frames; f++) {
    await page.evaluate((x) => window.renderAt(x), f / fps)
    const buf = await page.screenshot({ type: 'jpeg', quality: 94 })
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await done
  console.log(`${drug.slug}: ${file} (${duration.toFixed(1)}s, ${frames} frames)`)
}

await browser.close()
