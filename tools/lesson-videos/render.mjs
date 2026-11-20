#!/usr/bin/env node
// Render a short video for each course lesson that has no drug-brief video.
//
//   node tools/lesson-videos/render.mjs                      # all lessons → static/app/videos/lessons/<course>-<n>.mp4
//   node tools/lesson-videos/render.mjs --only mse            # one course
//   node tools/lesson-videos/render.mjs --only mse --stills   # PNG checks, no video
//
// Text comes from static/app/courses-content.js; the look matches the Academy app.
// Needs Playwright (Chromium) and ffmpeg on PATH.

import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { runInNewContext } from 'node:vm'

const here = dirname(fileURLToPath(import.meta.url))
const { chromium } = createRequire(import.meta.url)('playwright')
const args = process.argv.slice(2)
const opt = (n, f) => { const i = args.indexOf(`--${n}`); return i === -1 ? f : args[i + 1] }
const only = opt('only', null)
const stills = args.includes('--stills')
const fps = 30
const outDir = resolve(opt('out', resolve(here, '../../static/app/videos/lessons')))
mkdirSync(outDir, { recursive: true })

const window = {}
runInNewContext(readFileSync(resolve(here, '../../static/app/data.js'), 'utf8'), { window })
runInNewContext(readFileSync(resolve(here, '../../static/app/courses-content.js'), 'utf8'), { window })
const titleOf = (id) => (window.SA_COURSES.find((c) => c.id === id) || {}).title || id

const jobs = []
for (const [id, course] of Object.entries(window.SA_FULL)) {
  if (only && id !== only) continue
  course.lessons.forEach((lesson, index) => {
    if (lesson.video) return
    jobs.push({ id, index, payload: { course: titleOf(id), index, total: course.lessons.length, lesson, next: course.lessons[index + 1]?.title || null } })
  })
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
const template = pathToFileURL(resolve(here, 'lesson.html')).href

for (const { id, index, payload } of jobs) {
  await page.goto(template, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const duration = await page.evaluate((p) => { window.LESSON = p; return window.setupLesson() }, payload)
  const name = `${id}-${index + 1}`

  if (stills) {
    for (const t of [3, 12, 24, duration - 9, duration - 2]) {
      await page.evaluate((x) => window.renderAt(x), t)
      await page.screenshot({ path: `${outDir}/${name}-${Math.round(t)}s.png` })
    }
    console.log(`${name}: stills (${duration.toFixed(1)}s)`)
    continue
  }

  const file = `${outDir}/${name}.mp4`
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', file], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((ok, fail) => ff.on('close', (c) => (c === 0 ? ok() : fail(new Error(`ffmpeg exited ${c}`)))))
  const frames = Math.round(duration * fps)
  for (let f = 0; f < frames; f++) {
    await page.evaluate((x) => window.renderAt(x), f / fps)
    const buf = await page.screenshot({ type: 'jpeg', quality: 90 })
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await done
  console.log(`${name}: ${file} (${duration.toFixed(1)}s)`)
}
await browser.close()
