# Serenest Academy — YouTube Channel Kit

Everything needed to open the channel and post the first videos.
Artwork is in `youtube/art/` (re-make with `node tools/youtube/render.mjs`).
Videos are in `static/app/videos/`.

---

## 1. Create the channel (15 minutes, done by you)

1. Sign in at **youtube.com** with the Google account that should own Serenest.
2. Profile picture (top right) → **Settings** → **Add or manage your channel(s)** → **Create a channel**.
   This makes a *Brand Account*, so you can later add team members without sharing your password.
3. Name: **Serenest Academy**. Handle: **@SerenestAcademy** (fallbacks: `@Serenest.Academy`, `@SerenestEdu`, `@SerenestAcademyIndia`).
4. **Verify the channel** with your phone at youtube.com/verify. This unlocks custom thumbnails and videos longer than 15 minutes.
5. In **YouTube Studio → Customisation**:
   - Profile picture → `art/profile-800x800.png`
   - Banner → `art/banner-2560x1440.png` (the text sits in YouTube's safe area, so it shows on TV, desktop and phone)
   - Video watermark → `art/watermark-150x150.png`, display *entire video*
   - Description, links and contact email → section 2 below
6. **Settings → Upload defaults**: Category *Education* · Language *English* · Licence *Standard YouTube* · Comments *Allow all, hold potentially inappropriate for review*. Paste the disclaimer from section 2 into the default description.
7. **Settings → Channel → Advanced**: Audience **No, not made for kids**. Country **India**.
8. **Health features (worth applying for):** YouTube offers health-source labels for licensed healthcare professionals in some countries. Check YouTube Help for *"YouTube health features eligibility"* and apply with your MD registration if India is listed.

---

## 2. Channel text

**Description** (paste into *About*):

> Serenest Academy is a psychiatrist-led learning channel for psychology students, counsellors, therapists and doctors in India.
>
> Every week:
> • Drug Briefs: a psychiatric medicine in under a minute. Start dose, target, maximum, Indian brands, CDSCO status and cost.
> • Skills for Counsellors: MSE, basic CBT, suicide risk assessment, addiction counselling, telecounselling and ethics.
> • SerenestCase Conference: a free monthly case discussion, last Saturday, 6 PM IST.
>
> Led by Dr. Chirag Ambaliya, MD (Psychiatry). Part of Serenest Pvt Ltd.
> Courses and the free study app: https://serenest.academy
>
> Educational content for students and qualified clinicians. Not medical advice, and not a substitute for a prescription, current product labelling, formal degrees or professional licensing.

**Links:** serenest.academy · serenest.academy/app · WhatsApp +91 77776 36369 · serenest.fit
**Contact email:** hello@serenest.academy
**Keywords:** psychiatry India, psychopharmacology, counselling skills, clinical psychology, RCI, mental status examination, CBT for beginners, suicide risk assessment, NEET PG psychiatry, Serenest Academy

---

## 3. Playlists (create these before the first upload)

| Playlist | What goes in |
|---|---|
| **Drug Briefs — Psychiatric Medicines in India** | The 44-second molecule videos |
| **Skills for Counsellors** | MSE, CBT, suicide risk, addiction, telecounselling |
| **SerenestCase Conference** | Monthly case discussions (recorded or live) |
| **Start Here** | Channel trailer + one video from each playlist |

---

## 4. First six uploads — ready to paste

Same for all five:
- **Thumbnail:** `art/thumb-<drug>.jpg`
- **Playlist:** Drug Briefs
- **Audience:** Not made for kids
- **Pinned comment:** *Which molecule should we brief next? Comment below. Free study app with all doses: https://serenest.academy/app*

Description template (replace the parts in **bold**):

```
**ONE-LINE HOOK**

A 44-second clinical brief on **DRUG** for clinicians in India: mechanism, where it fits, titration from start to maximum dose, CDSCO status, Indian brands, monthly cost and an Indian Psychiatric Society–aligned clinical pearl.

Chapters
0:00 Mechanism & where it fits
0:10 Titration: start → target → maximum
0:28 In India: CDSCO, brands, cost & pearl

Free study app with all drug briefs: https://serenest.academy/app
Courses & free monthly case conference: https://serenest.academy

Educational reference for qualified clinicians. Doses are a study aid, not a prescription or a substitute for current product labelling. Confirm the current label before prescribing.

#psychiatry #psychopharmacology #**DRUGTAG** #SerenestAcademy
```

| Video file | Title (≤ 70 chars) | One-line hook | Tags |
|---|---|---|---|
| `lithium.mp4` | Lithium in 44 Seconds: Levels, Toxicity & Summer Safety | Lithium remains the gold standard for bipolar maintenance. Here is how to dose it safely. | lithium, lithium toxicity, bipolar disorder, mood stabiliser, serum lithium level, psychiatry india |
| `escitalopram.mp4` | Escitalopram Dosing in 44 Seconds: Start, Target, Max (India) | The first-line SSRI in Indian OPDs, dosed the right way. | escitalopram, SSRI, depression treatment, anxiety medicine, QTc, nexito |
| `olanzapine.mp4` | Olanzapine in 44 Seconds: Doses & the Metabolic Watch-Out | High efficacy, high metabolic risk. What to monitor in South Asian patients. | olanzapine, antipsychotic, schizophrenia, metabolic syndrome, weight gain, psychiatry |
| `buprenorphine.mp4` | Buprenorphine Induction in 44 Seconds: Avoid Precipitated Withdrawal | COWS first, then the dose. Opioid agonist treatment in India. | buprenorphine, opioid use disorder, OST, COWS, addiction psychiatry, NDPS |
| `aripiprazole.mp4` | Aripiprazole in 44 Seconds: Doses, Akathisia & the 2-Week Rule | Low weight gain and prolactin, but akathisia is the catch. Dose it right. | aripiprazole, antipsychotic, akathisia, bipolar mania, schizophrenia, arip mt |
| `brexpiprazole.mp4` | Brexpiprazole in 44 Seconds: When Aripiprazole Causes Akathisia | An SDAM option when aripiprazole helped but akathisia did not. | brexpiprazole, aripiprazole, akathisia, antipsychotic, MDD adjunct, psychiatry |

**Release order:** Lithium → Escitalopram → Olanzapine → Aripiprazole → Buprenorphine → Brexpiprazole.
Aripiprazole goes right before Brexpiprazole, since the Brexpiprazole brief is pitched at aripiprazole akathisia. Brexpiprazole goes last because its India data still needs checking (see the checklist).

---

## 5. First month plan (3 uploads a week)

| Week | Monday · Drug Brief | Wednesday · Skill | Saturday |
|---|---|---|---|
| 1 | Lithium | Channel trailer (60 s: who we are, what's coming) | Escitalopram brief |
| 2 | Olanzapine | MSE in 5 minutes: what to observe | Buprenorphine brief |
| 3 | Brexpiprazole *(after fact-check)* | Suicide risk: asking the question safely | Case Conference teaser |
| 4 | Next molecule (sertraline / clozapine) | CBT: catching automatic thoughts | **Live:** SerenestCase Conference, last Saturday, 6 PM IST |

**Shorts:** YouTube Shorts must be vertical. The current briefs are 16:9, so they post as normal videos. Vertical cuts of each brief (9:16, ≤ 60 s) would give 5 Shorts at once and are the fastest way to grow a new channel.

---

## 6. Before you upload: checklist

- [ ] **Fact-check the drug data** before it goes public. YouTube's medical misinformation policy applies, and errors in a dosing video are hard to take back. Open questions:
  - Brexpiprazole: is "CDSCO Approved (May 2026)" correct? Are Brexipil, Brexova and Rexipra-B real brands? (*Rexipra* also appears under escitalopram.)
  - Lithium: "the only psychotropic proven to reduce suicide risk" overstates it, since clozapine has trial evidence too.
  - Escitalopram: steps 3 and 4 are both 20 mg/d.
  - Aripiprazole: doses follow the product label; confirm the brands (Arip MT, Arpizol) and the ₹150–400/month cost against current Indian prices.
  - After fixing `drugs.js`, re-make the videos: `node tools/drug-videos/render.mjs --data <path to drugs.js>`.
- [ ] Channel verified (needed for custom thumbnails).
- [ ] Playlists created.
- [ ] Watermark, banner and profile picture uploaded.
- [ ] Add the YouTube link to the serenest.academy footer and the app.
