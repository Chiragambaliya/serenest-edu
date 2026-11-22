# Serenest Academy — handoff for Cursor

Branch with this work: **`ccr-9bab77f0-i5vo3o`** (pushed to GitHub).
Live site: **serenest.academy**. It deploys from `main` via Render (`render.yaml`, publishes `./static`).
Nothing in this handoff is live yet: `main` stops at commit `9ef62a2`.

```bash
git fetch origin
git checkout ccr-9bab77f0-i5vo3o
cd static && python3 -m http.server 8080   # site: http://localhost:8080   app: http://localhost:8080/app/
```

No build step. Everything is plain HTML, CSS and JavaScript.

---

## 1. What is on this branch (after `main`)

| Area | What was built |
|---|---|
| **Full courses** | A lesson engine in the app: each lesson has notes, key points and a 3-question quiz with explanations. The lesson counts as complete at 2 of 3 correct. |
| **Mental health track** | 9 full courses: Psychopharmacology for Counsellors, MSE in Practice, Suicide Risk & Safety Planning, Addiction Psychiatry, Forensic Psychiatry & the Law in India, Child & Adolescent, Geriatric, Perinatal, plus NEET-PG Psychiatry. There are also 4 short courses and the flagship cohort. |
| **MBBS & NEET-PG track** | Launch scope is **1st year + Psychiatry only**: Anatomy, Physiology, Biochemistry and Psychiatry. All 19 subjects are listed in `SA_SUBJECTS_ALL`. The 2nd-year content (Pathology, Pharmacology, Microbiology, FMT) is written but switched off. |
| **Home page** | Rebuilt for return visits. It has two track cards, a phone mock-up, "Continue where you left off" (read from the app's saved progress), live counts, course cards and the MBBS grid. It also has how-it-works, a try-a-question card, a drug-briefs card, a live conference countdown, the founder quote and a final call to action. |
| **Design** | Soft glass layer (`static/glass.css`, `static/home.css`): cream paper, olive glass, teal and apricot, Fraunces and Manrope, gold sparkles. |
| **Icon** | **SA monogram** (cream S, teal italic A, gold sparkle, olive-night tile) in `static/icons/`, plus `favicon.ico`. |
| **Videos** | **All videos were deleted** at the owner's request. `static/app/videos/` is git-ignored. The generators in `tools/drug-videos` and `tools/lesson-videos` still work if videos are wanted again. |

## 2. File map

```
static/
  index.html        public site (tabbed SPA; tabs: home, courses, about, library, sanctuary, conference)
  styles.css        original base styles
  glass.css         soft-glass design layer (overrides styles.css)
  home.css/home.js  new home page; home.js reads /app/*.js data + localStorage
  app.js            site tab switching, WhatsApp CTAs, library tools (pre-existing)
  icons/            SA monogram PNGs (favicons, apple-touch, 192/512, maskable)
  app/
    index.html      Academy app shell (PWA)
    app.css         app styles (light + night theme)
    app.js          app logic: routes, Today, Learn (two tracks), course, lesson + quiz, Drugs, Progress, Profile
    data.js         SA_DRUGS (6 molecules), SA_COURSES (course catalogue)
    courses-content.js     SA_FULL lessons: psychopharm, mse, suicide-risk, neet-pg
    courses-content-2.js   SA_FULL lessons: forensic, child, addiction, geriatric, perinatal
    mbbs-content.js        SA_SUBJECTS_ALL / SA_SUBJECTS (live) + Anatomy, Physiology, Biochemistry
    mbbs-content-2.js      Pathology, Pharmacology, Microbiology, FMT (kept, NOT loaded yet)
    sw.js           service worker (bump CACHE name when shell files change)
    manifest.webmanifest
tools/
  drug-videos/      44-second drug-brief video renderer (Playwright + ffmpeg)
  lesson-videos/    ~1-minute lesson video renderer
  youtube/          channel art + thumbnails renderer
youtube/CHANNEL-KIT.md   YouTube channel set-up, titles, descriptions, release plan
```

## 3. Data model

```js
// a course in SA_COURSES (data.js)
{ id, title, weeks, mode?, flagship?, desc, lessons: [] }

// full lesson content, keyed by course id (courses-content*.js, mbbs-content*.js)
window.SA_FULL[id] = {
  level, audience, outcomes: [],
  lessons: [{
    title, mins,
    drug?: 'lithium', also?: 'aripiprazole',   // optional links to drug briefs
    intro, sections: [{ h, p?, ul?: [] }],
    points: [],                                  // key points
    quiz: [{ q, o: [4 options], a: indexOfCorrect, why }],
  }],
}

// MBBS subjects (mbbs-content.js)
window.SA_SUBJECTS_ALL = [{ id, name, year, live? }]   // all 19, NEET-PG order
window.SA_SUBJECTS = SA_SUBJECTS_ALL.filter((s) => s.live)
```

* A subject with content in `SA_FULL` and listed in `SA_SUBJECTS` becomes an MBBS course automatically (`app.js` builds it).
* **To open 2nd year:** add `live: true` to those four subjects, then load `mbbs-content-2.js` in `app/index.html`, `static/index.html` (deferred, before `home.js`) and `app/sw.js` SHELL, and bump the cache name. Also update the copy that says "1st year + Psychiatry" (in `app.js` renderLearn, `index.html`, `home.js`).
* Progress is stored only in the browser: `localStorage['serenest-academy-app-v1']` = `{ name, role, goal, done: { courseId: [lessonIdx] }, log: { 'YYYY-MM-DD': n }, theme, drug }`. The home page reads the same key.

## 4. App routes

`#today` · `#learn` · `#learn/mbbs` · `#course/<id>` · `#lesson/<id>/<index>` · `#drugs/<slug>` · `#progress` · `#profile`

## 5. Conventions

* Vanilla JS, no build, no frameworks. Escape all text with `esc()` before putting it in HTML.
* Phone first: check 390 px and 1440 px wide. No horizontal page scroll.
* Playwright and Chromium are available. The pattern used throughout: load the page, check `pageerror`, check for 404s, check `document.documentElement.scrollWidth <= innerWidth`.
* WhatsApp CTA number: `917777636369`. Case conference: last Saturday of each month, 6 PM IST (12:30 UTC).
* Never commit rendered videos (`static/app/videos/` is ignored).
* Clinical and legal content is for Indian practice. Use the new criminal laws with the old numbers in brackets, e.g. BNS s.22 (earlier IPC 84) and BNSS 194 (earlier CrPC 174). Do not invent statistics, brands or prices.
* Do not change Dr. Ambaliya's founder quote; it is his exact wording.

## 6. Open decisions (owner)

1. **Review the clinical and legal content** in `courses-content*.js` and `mbbs-content*.js` before going live.
2. **Free or paid?** The courses are currently open to everyone, with "Certificate on WhatsApp".
3. **Go live:** merge to `main`, which Render deploys.
4. **Design direction:** keep the cream soft-glass look or move to the owner's dark "calm-glass" house style.
5. Drug data still to verify: Brexpiprazole's "CDSCO Approved (May 2026)" and brands, the Lithium "only psychotropic proven to reduce suicide risk" line, Escitalopram steps 3 and 4 (both 20 mg), and Aripiprazole brands and prices.

## 7. Overlap with `cursor/all-specialties-academy-416d`

Both branches start from `main` at `9ef62a2`, and each has work the other lacks.

| | `ccr-9bab77f0-i5vo3o` (this branch) | `cursor/all-specialties-academy-416d` |
|---|---|---|
| Idea | Full **courses with lessons and quizzes**; MBBS track limited to 1st year + Psychiatry | **Specialty desks** (`specialties.js`): each clinical specialty gets courses and drug cards |
| Psychiatry | Mental health courses for counsellors and clinicians, plus NEET-PG Psychiatry | Rewritten as clinical teaching for doctors |
| Look | Cream soft glass, new home page, SA icon | "Clay dashboard" Today view and clay palette |
| Videos | Removed | Still referenced |

A trial merge of the Cursor branch into this one **conflicts in 6 files**: `static/app/app.js`, `static/app/data.js`, `static/app/index.html`, `static/app/manifest.webmanifest`, `static/app/sw.js` and `static/index.html`. These merge cleanly: `admin.js`, `app.js`, `app/app.css`, `glass.css`, `app/specialties.js`, `site-specialties.js` and the two tool templates.

**Decide the direction with the owner before merging.** Then:

* **Keep this branch's direction and borrow from the specialty desks:** base on `ccr-9bab77f0-i5vo3o`. Take `specialties.js` drug cards as extra entries for the Drugs tab, grouped by specialty. Keep the lesson engine, launch scope, home page and icon. Drop video references.
* **Keep the specialty desks and add the lesson engine:** base on the Cursor branch. Port `courses-content*.js`, `mbbs-content*.js`, `renderLesson`/quiz from `app.js`, the lesson CSS block in `app/app.css`, the track tabs, and `home.css`/`home.js` and `static/icons/`.
* Either way, keep one `SA_COURSES` catalogue, one icon set, one service-worker cache name, and remove video players if videos stay deleted.
