# Drug Brief videos

Short (≈44 s, 1920×1080, 30 fps) explainer videos in the look of the Serenest
Academy app (`static/app/`): cream paper, olive glass, teal and apricot,
Fraunces headings and gold sparkles. One video per molecule in `static/app/data.js`.

Each video: drug name + mechanism → "Where it fits" → titration dial stepping
Start → Max with the clinical note for each step → India panel (CDSCO, brands,
cost) → IPS pearl → Serenest Academy end card with the educational disclaimer.

## Make / remake the videos

```bash
# all molecules → static/app/videos/<slug>.mp4
node tools/drug-videos/render.mjs --data static/app/data.js

# one molecule
node tools/drug-videos/render.mjs --data static/app/data.js --only lithium

# quick PNG stills instead of video (to check layout after editing text)
node tools/drug-videos/render.mjs --data static/app/data.js --only lithium --stills --out /tmp/stills
```

Needs Playwright's Chromium and `ffmpeg`. All text comes from `static/app/data.js`
(the React app's `drugs.js` also works), so add a drug there (same fields as the others) and re-run — no template edits.
Look and timing live in `brief.html`.
