# Dr. Chirag Ambaliya — Personal Website

A personal brand hub built with **React + Vite**. It brings together
consultation, academics, blog, CV, and social links in a single, fast,
responsive one-page site.

## Sections

- **Hero / About** — introduction, focus areas, and skills
- **Consultation** — services offered, with a "book a consultation" CTA
- **Academics** — publications and research
- **Blog** — writing and essays
- **CV** — experience & education timeline, plus a downloadable CV
- **Contact** — email and all social media links

## Editing content

All copy lives in one place: [`src/data.js`](src/data.js). Update the text,
links, publications, blog posts, and CV entries there — no component changes
needed. To enable the **Download CV** button, drop a `cv.pdf` into `public/`
and set `profile.cvUrl` to `/cv.pdf` in `src/data.js`.

## EMR

The repo also ships **Serenest EMR** — a lightweight, browser-only
electronic medical records app served as a second page at `/emr.html`
(`/emr` on Netlify). Source lives in [`src/emr/`](src/emr/).

- **Dashboard** — practice stats, recent encounters, upcoming follow-ups
- **Patients** — register, search, and edit patients (demographics,
  allergies, chronic conditions)
- **Patient chart** — folder-tab chart with overview, encounter history
  (SOAP notes + vitals with auto-BMI), and prescriptions
- **Prescriptions** — multi-drug scripts with a clean printable layout
- **Data** — JSON backup export/import, sample data, full erase

All records persist in the browser's localStorage only; nothing is sent to
a server. Export backups regularly from the **Data** tab.

## Develop

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy

The repo includes `netlify.toml` (build `npm run build`, publish `dist/`,
with SPA redirects). Any static host that serves the `dist/` folder works —
Netlify, Vercel, GitHub Pages, Render, etc.
