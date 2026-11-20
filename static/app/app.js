/* Serenest Academy app — vanilla JS, no build step. */
(() => {
  'use strict';

  const WHATSAPP = '917777636369';
  const FULL = window.SA_FULL || {};
  const SUBJECTS = window.SA_SUBJECTS || [];
  const subjectOf = (id) => SUBJECTS.find((x) => x.id === id);
  const mbbsCourses = SUBJECTS.filter((x) => FULL[x.id] && !(window.SA_COURSES || []).some((c) => c.id === x.id))
    .map((x) => ({ id: x.id, title: x.name, weeks: 1, desc: `High-yield ${x.name} for MBBS and NEET-PG, with MCQs.` }));
  const COURSES = [...(window.SA_COURSES || []), ...mbbsCourses]
    .map((c) => ({ ...c, track: subjectOf(c.id) ? 'mbbs' : 'mh' }))
    .map((c) => (FULL[c.id] ? { ...c, full: FULL[c.id], lessons: FULL[c.id].lessons.map((l) => l.title) } : c))
    .sort((a, b) => (b.flagship ? 2 : b.full ? 1 : 0) - (a.flagship ? 2 : a.full ? 1 : 0));
  const DRUGS = window.SA_DRUGS || [];
  const MIN_PER_LESSON = 15;
  const DIAL_ARC = 443, DIAL_CYCLE = 591;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id) => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;

  /* ---------- storage (per-viewer convenience; app works without it) ---------- */
  const KEY = 'serenest-academy-app-v1';
  const state = Object.assign({ name: '', role: '', goal: 4, done: {}, log: {}, theme: null, drug: null }, load());
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ } }

  /* ---------- dates ---------- */
  const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Case conference: last Saturday of each month, 6:00 PM IST (12:30 UTC)
  function nextConference(now = new Date()) {
    for (let k = 0; k < 3; k++) {
      const y = now.getUTCFullYear(), m = now.getUTCMonth() + k;
      const last = new Date(Date.UTC(y, m + 1, 0));
      const back = (last.getUTCDay() + 1) % 7;
      const when = new Date(Date.UTC(last.getUTCFullYear(), last.getUTCMonth(), last.getUTCDate() - back, 12, 30));
      if (when > now) return when;
    }
  }
  const conf = nextConference();
  const confLocalKey = dayKey(conf);
  const fmtConf = (opts) => conf.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', ...opts });

  /* ---------- progress helpers ---------- */
  const doneFor = (id) => state.done[id] || [];
  const pct = (c) => Math.round((doneFor(c.id).length / c.lessons.length) * 100);
  const totalLessons = () => Object.values(state.done).reduce((a, l) => a + l.length, 0);
  const todayCount = () => state.log[dayKey(new Date())] || 0;
  function streak() {
    let n = 0, d = new Date();
    if (!state.log[dayKey(d)]) d = addDays(d, -1);
    while (state.log[dayKey(d)]) { n++; d = addDays(d, -1); }
    return n;
  }
  function toggleLesson(courseId, i) {
    const list = doneFor(courseId).slice();
    const k = dayKey(new Date());
    const at = list.indexOf(i);
    if (at === -1) { list.push(i); state.log[k] = (state.log[k] || 0) + 1; }
    else { list.splice(at, 1); state.log[k] = Math.max(0, (state.log[k] || 0) - 1); }
    state.done[courseId] = list;
    save();
  }

  /* ---------- toast & whatsapp ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('[data-toast]');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }
  const whatsapp = (text) => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');

  /* ---------- theme ---------- */
  function applyTheme() {
    const night = state.theme ? state.theme === 'night' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = night ? 'night' : 'light';
    $$('[data-theme-set]').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.themeSet === 'night') === night)));
  }

  /* ---------- navigation ---------- */
  const TABS = [
    { id: 'today', label: 'Today', icon: 'sun' },
    { id: 'learn', label: 'Learn', icon: 'book' },
    { id: 'drugs', label: 'Drugs', icon: 'pill' },
    { id: 'progress', label: 'Progress', icon: 'glass' },
    { id: 'profile', label: 'Profile', icon: 'spark' },
  ];
  $$('[data-nav]').forEach((nav) => {
    nav.innerHTML = TABS.map((t) => `<a class="nav-item" href="#${t.id}" data-tab="${t.id}">${icon(t.icon)}<span>${t.label}</span></a>`).join('');
  });

  function route() {
    const [view, arg, arg2] = (location.hash.slice(1) || 'today').split('/');
    const known = ['today', 'learn', 'drugs', 'progress', 'profile', 'course', 'lesson'];
    const v = known.includes(view) ? view : 'today';
    const tab = v === 'course' || v === 'lesson' ? 'learn' : v;
    $$('[data-view]').forEach((s) => (s.hidden = s.dataset.view !== v));
    $$('.nav-item').forEach((a) => (a.dataset.tab === tab ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
    const render = { today: renderToday, learn: () => renderLearn(arg), course: () => renderCourse(arg), lesson: () => renderLesson(arg, Number(arg2) || 0), drugs: () => renderDrugs(arg), progress: renderProgress, profile: renderProfile }[v];
    render();
    const title = v === 'course' || v === 'lesson' ? (COURSES.find((c) => c.id === arg) || {}).title : TABS.find((t) => t.id === v)?.label;
    document.title = `${title || 'Today'} · Serenest Academy`;
    window.scrollTo(0, 0);
  }

  /* ---------- TODAY ---------- */
  let picked = 0; // offset from today in the date strip
  function renderToday() {
    const now = new Date();
    const day = addDays(now, picked);
    $('[data-dow]').textContent = DOW[day.getDay()];
    $('[data-dnum]').textContent = day.getDate();

    $('[data-strip]').innerHTML = [-2, -1, 0, 1, 2].map((o) => {
      const d = addDays(now, o);
      const isConf = dayKey(d) === confLocalKey;
      return `<button class="day" role="tab" data-off="${o}" aria-selected="${o === picked}" ${isConf ? 'data-conf' : ''} aria-label="${DOW[d.getDay()]} ${d.getDate()}${isConf ? ', case conference' : ''}">${d.getDate()}<small>${o === 0 ? 'TODAY' : DOW[d.getDay()].toUpperCase()}</small></button>`;
    }).join('');

    // study-day arc: 7:00 → 21:00
    const start = 7 * 60, end = 21 * 60;
    const mins = now.getHours() * 60 + now.getMinutes();
    let f, note;
    if (picked < 0) { f = 1; note = `${state.log[dayKey(day)] || 0} lessons completed`; }
    else if (picked > 0) { f = 0; note = dayKey(day) === confLocalKey ? 'Case conference at 6:00 PM' : `Goal: ${state.goal} lessons`; }
    else {
      f = Math.min(1, Math.max(0, (mins - start) / (end - start)));
      const left = end - mins;
      note = mins < start ? `Study day starts in ${hm(start - mins)}` : left > 0 ? `Wind-down in ${hm(left)}` : 'Rest well — see you tomorrow';
    }
    const path = $('[data-arc-path]');
    const p = path.getPointAtLength(path.getTotalLength() * f);
    const dot = $('[data-arc-dot]');
    dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y);
    $('[data-arc-note]').textContent = note;

    const done = todayCount();
    $('[data-goal-done]').textContent = done;
    $('[data-goal-total]').textContent = state.goal;
    $('[data-goal-min]').textContent = done * MIN_PER_LESSON;
    $('[data-goal-minmax]').textContent = state.goal * MIN_PER_LESSON;
    $('[data-segments]').innerHTML = Array.from({ length: state.goal }, (_, i) => `<i class="${i < done ? 'on' : ''}"></i>`).join('');

    $('[data-conf-long]').textContent = `${fmtConf({ weekday: 'short', day: 'numeric', month: 'short' })} · 6:00 PM IST · Free`;

    const c = COURSES.find((x) => doneFor(x.id).length && pct(x) < 100) || COURSES.find((x) => pct(x) < 100) || COURSES[0];
    const next = c.lessons.findIndex((_, i) => !doneFor(c.id).includes(i));
    $('[data-continue]').innerHTML = `
      <span class="label">${doneFor(c.id).length ? 'Continue' : 'Start here'}</span>
      <h3>${esc(c.title)}</h3>
      <div class="row"><span>${next === -1 ? 'All lessons complete' : `Lesson ${next + 1} · ${esc(c.lessons[next])}`}</span><b>${pct(c)}%</b></div>
      <div class="bar"><i style="width:${pct(c)}%"></i></div>
      <div><a class="btn btn-ink" href="#course/${c.id}">Open course ${icon('arrow')}</a></div>`;
  }
  const hm = (m) => (m >= 60 ? `${Math.floor(m / 60)}hr ${m % 60}min` : `${m}min`);

  // decorative stars + thread lines under the Today cards
  $('.stars').innerHTML = [[12, 50, 14], [26, 80, 9], [44, 30, 18], [63, 70, 11], [78, 40, 16], [90, 88, 8]]
    .map(([x, y, s]) => `<span style="left:${x}%;height:${y}px"></span><svg style="left:calc(${x}% - ${s / 2}px);top:${y}px;width:${s}px;height:${s}px"><use href="#i-spark"/></svg>`).join('');

  /* ---------- LEARN ---------- */
  function renderLearn(track) {
    const mbbs = track === 'mbbs';
    $('[data-courses]').classList.toggle('subjects', mbbs);
    $('[data-track-tabs]').innerHTML = `
      <a class="seg" href="#learn" aria-current="${!mbbs}">Mental health</a>
      <a class="seg" href="#learn/mbbs" aria-current="${mbbs}">MBBS &amp; NEET-PG</a>`;
    $('[data-learn-title]').textContent = mbbs ? 'Anatomy to Radiology' : 'Learn';
    if (mbbs) {
      const ready = SUBJECTS.filter((x) => FULL[x.id]).length;
      $('[data-courses]').innerHTML = `<p class="track-note">${SUBJECTS.length} subjects in NEET-PG order · ${ready} ready, more every week</p>` + SUBJECTS.map((x, i) => {
        const c = COURSES.find((k) => k.id === x.id);
        const on = !!(c && c.full);
        return on ? `
        <a class="card subject glass" href="#course/${x.id}" style="text-decoration:none">
          <div class="meta"><span>${String(i + 1).padStart(2, '0')} · ${esc(x.year)}</span><span class="ring" style="--p:${pct(c)}" aria-label="${pct(c)}% complete"></span></div>
          <h3>${esc(x.name)}</h3><p>${c.lessons.length} lessons · MCQs</p>
        </a>` : `
        <div class="card subject soon" aria-disabled="true">
          <div class="meta"><span>${String(i + 1).padStart(2, '0')} · ${esc(x.year)}</span></div>
          <h3>${esc(x.name)}</h3><p>Coming soon</p>
        </div>`;
      }).join('');
      return;
    }
    $('[data-courses]').innerHTML = COURSES.filter((c) => c.track === 'mh').map((c) => `
      <a class="card course ${c.flagship ? 'card-apricot' : 'glass'}" href="#course/${c.id}" style="text-decoration:none">
        <div class="meta"><span>${c.flagship ? 'Flagship · ' : c.full ? '<b class="new-tag">✦ Full course</b> ' : ''}${c.full ? c.lessons.length + ' lessons · notes & quizzes' : `${c.weeks} week${c.weeks > 1 ? 's' : ''}${c.mode ? ' · ' + esc(c.mode) : ''}`}</span><span class="ring" style="--p:${pct(c)}" aria-label="${pct(c)}% complete"></span></div>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.desc)}</p>
      </a>`).join('') + `
      <a class="card course card-teal mbbs-promo" href="#learn/mbbs" style="text-decoration:none">
        <div class="meta"><span>New track</span></div>
        <h3>MBBS &amp; NEET-PG: Anatomy to Radiology</h3>
        <p>All 19 subjects, high-yield lessons and MCQs.</p>
      </a>`;
  }

  function renderCourse(id) {
    const c = COURSES.find((x) => x.id === id);
    const root = $('[data-course-detail]');
    if (!c) { root.innerHTML = '<p>Course not found.</p>'; return; }
    const done = doneFor(c.id);
    const f = c.full;
    const next = c.lessons.findIndex((_, i) => !done.includes(i));
    $('[data-course-back]').setAttribute('href', c.track === 'mbbs' ? '#learn/mbbs' : '#learn');
    $('[data-course-back] span').textContent = c.track === 'mbbs' ? 'All subjects' : 'All programs';
    root.innerHTML = `
      <div class="detail-head">
        <span class="label">${c.flagship ? 'Flagship cohort' : f ? esc(f.level) : 'Short course'}${f ? '' : ` · ${c.weeks} week${c.weeks > 1 ? 's' : ''}`}</span>
        <h1 class="display">${esc(c.title)}</h1>
        <p style="color:var(--ink-soft)">${esc(c.desc)}</p>
        <div class="row" style="display:flex;justify-content:space-between;font-weight:700;font-size:14px"><span>${done.length} of ${c.lessons.length} lessons</span><span>${pct(c)}%</span></div>
        <div class="bar"><i style="width:${pct(c)}%"></i></div>
      </div>
      ${f ? `<div class="outcomes card card-olive">
        <span class="label">You will be able to</span>
        <ul>${f.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
        <p class="for">For: ${esc(f.audience)}</p>
      </div>` : ''}
      <div class="lessons">${c.lessons.map((l, i) => f ? `
        <a class="lesson glass" href="#lesson/${c.id}/${i}" aria-pressed="${done.includes(i)}" style="text-decoration:none">
          <span class="tick">${icon('check')}</span><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="lt">${esc(l)}</span>
          <span class="lm">${f.lessons[i].mins} min</span>
        </a>` : `
        <button class="lesson glass" data-lesson="${i}" aria-pressed="${done.includes(i)}">
          <span class="tick">${icon('check')}</span><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="lt">${esc(l)}</span>
        </button>`).join('')}</div>
      <div class="detail-actions">
        ${f ? `<a class="btn btn-ink" href="#lesson/${c.id}/${next === -1 ? 0 : next}">${next === -1 ? 'Review lessons' : done.length ? 'Continue: lesson ' + (next + 1) : 'Start course'} ${icon('arrow')}</a>
               <button class="btn btn-ghost" data-apply>Certificate on WhatsApp</button>`
            : `<button class="btn btn-ink" data-apply>Apply on WhatsApp ${icon('arrow')}</button>`}
        <a class="btn btn-ghost" href="${c.track === 'mbbs' ? '#learn/mbbs' : '#learn'}">${c.track === 'mbbs' ? 'All subjects' : 'All programs'}</a>
      </div>`;
    $$('[data-lesson]', root).forEach((b) => b.addEventListener('click', () => {
      const i = Number(b.dataset.lesson);
      const was = b.getAttribute('aria-pressed') === 'true';
      toggleLesson(c.id, i);
      renderCourse(id);
      if (!was) toast(todayCount() >= state.goal ? 'Daily goal reached ✦' : `Lesson done · ${todayCount()} of ${state.goal} today`);
    }));
    $('[data-apply]', root).addEventListener('click', () => whatsapp(f
      ? `Hi Serenest Academy, I am doing the self-paced course "${c.title}". Please tell me about the certificate.`
      : `Hi Serenest Academy, I would like to apply for "${c.title}". Please share the next cohort dates.`));
  }

  /* ---------- LESSON (full courses) ---------- */
  function renderLesson(id, i) {
    const c = COURSES.find((x) => x.id === id);
    const root = $('[data-lesson-detail]');
    if (!c || !c.full || !c.full.lessons[i]) { root.innerHTML = '<p>Lesson not found.</p>'; return; }
    const L = c.full.lessons[i];
    const n = c.full.lessons.length;
    const done = doneFor(c.id).includes(i);
    $('[data-lesson-back]').setAttribute('href', `#course/${c.id}`);
    $('[data-lesson-back] span').textContent = c.title;
        root.innerHTML = `
      <header class="detail-head">
        <span class="label">Lesson ${i + 1} of ${n} · ${L.mins} min${done ? ' · ✓ Completed' : ''}</span>
        <h1 class="display">${esc(L.title)}</h1>
        <div class="bar"><i style="width:${Math.round(((i + (done ? 1 : 0)) / n) * 100)}%"></i></div>
      </header>

      <article class="lesson-body">
        <p class="intro">${esc(L.intro)}</p>
        ${L.sections.map((x) => `<section><h2>${esc(x.h)}</h2>${x.p ? `<p>${esc(x.p)}</p>` : ''}${x.ul ? `<ul>${x.ul.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>` : ''}</section>`).join('')}
      </article>
      ${[L.drug, L.also].filter(Boolean).map((slug) => DRUGS.find((d) => d.slug === slug)).filter(Boolean).map((d) => `
      <a class="card card-olive drug-link" href="#drugs/${d.slug}"><span class="label">Drug brief</span><b>${esc(d.name)}</b><span>Doses from start to maximum, Indian brands, cost and the clinical pearl →</span></a>`).join('')}
      <aside class="card card-teal keypoints"><span class="label">Key points</span><ul>${L.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></aside>
      <form class="card glass quiz" data-quiz>
        <span class="label">Check yourself · ${L.quiz.length} questions</span>
        ${L.quiz.map((q, qi) => `<fieldset data-q="${qi}"><legend>${qi + 1}. ${esc(q.q)}</legend>
          ${q.o.map((o, oi) => `<label class="opt"><input type="radio" name="q${qi}" value="${oi}"><span>${esc(o)}</span></label>`).join('')}
          <p class="why" hidden></p></fieldset>`).join('')}
        <div class="quiz-foot"><button class="btn btn-ink" type="submit">Check answers</button><span class="score" data-score aria-live="polite"></span></div>
      </form>
      <nav class="lesson-nav">
        ${i > 0 ? `<a class="btn btn-ghost" href="#lesson/${c.id}/${i - 1}">${icon('back')} Previous</a>` : '<span></span>'}
        ${i < n - 1 ? `<a class="btn btn-ink" href="#lesson/${c.id}/${i + 1}">Next lesson ${icon('arrow')}</a>` : `<a class="btn btn-ink" href="#course/${c.id}">Finish course ${icon('arrow')}</a>`}
      </nav>
      <p class="fine">Educational content for students and clinicians. Not medical advice; confirm current product labelling and guidelines.</p>`;

    $('[data-quiz]', root).addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      let right = 0, answered = 0;
      L.quiz.forEach((q, qi) => {
        const fs = $(`[data-q="${qi}"]`, form);
        const opts = $$('.opt', fs);
        opts.forEach((lab) => { lab.classList.toggle('right', false); lab.classList.toggle('wrong', false); });
        const picked = $(`input[name="q${qi}"]:checked`, fs);
        if (!picked) return;
        answered++;
        const v = Number(picked.value);
        if (v === q.a) right++;
        opts[q.a].classList.add('right');
        if (v !== q.a) picked.closest('.opt').classList.add('wrong');
        const why = $('.why', fs);
        why.hidden = false;
        why.textContent = (v === q.a ? 'Correct. ' : 'Not quite. ') + q.why;
      });
      const out = $('[data-score]', form);
      if (answered < L.quiz.length) { out.textContent = `Answer all ${L.quiz.length} questions first.`; return; }
      const pass = right >= Math.ceil((L.quiz.length * 2) / 3);
      out.textContent = `${right} of ${L.quiz.length} correct${pass ? ' · lesson complete ✦' : ' · read the explanations and try again'}`;
      if (pass && !doneFor(c.id).includes(i)) {
        toggleLesson(c.id, i);
        toast(todayCount() >= state.goal ? 'Daily goal reached ✦' : `Lesson done · ${todayCount()} of ${state.goal} today`);
      }
    });
  }

  /* ---------- DRUGS ---------- */
  let step = 1;
  function renderDrugs(slug) {
    const drug = DRUGS.find((d) => d.slug === (slug || state.drug)) || DRUGS[0];
    if (!drug) return;
    if (state.drug !== drug.slug) { state.drug = drug.slug; save(); }
    step = Math.min(step, drug.steps.length - 1);
    $('[data-drug-pills]').innerHTML = DRUGS.map((d) => `<a class="pill" role="tab" href="#drugs/${d.slug}" aria-selected="${d.slug === drug.slug}" style="text-decoration:none">${esc(d.shortName)}</a>`).join('');
    const s = drug.steps[step];
    const dash = Math.round(DIAL_ARC * ((step + 1) / drug.steps.length));
    $('[data-drug]').innerHTML = `
      <article class="card glass drug-head">
        <span class="label">Independent · No sponsor</span>
        <h2>${esc(drug.name)}</h2>
        <p>${esc(drug.mechanism)}</p>
        <p class="fit">${esc(drug.clinicalFit)}</p>
      </article>
      <article class="card glass dial-card">
        <span class="label">Titration · step ${step + 1} of ${drug.steps.length}</span>
        <div class="dial">
          <svg viewBox="0 0 240 240" aria-hidden="true">
            <defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#58bfc7"/><stop offset=".6" stop-color="#f4f0e3"/><stop offset="1" stop-color="#eaa152"/></linearGradient></defs>
            <circle cx="120" cy="120" r="94" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="13" stroke-linecap="round" stroke-dasharray="${DIAL_ARC} ${DIAL_CYCLE}"/>
            <circle cx="120" cy="120" r="94" fill="none" stroke="url(#dg)" stroke-width="13" stroke-linecap="round" stroke-dasharray="${dash} ${DIAL_CYCLE}" style="transition:stroke-dasharray .4s"/>
          </svg>
          <div class="dial-core"><span class="stage">${esc(s.stage)}</span><span class="dose">${esc(s.dose)}</span><span class="ind">${esc(s.ind)}</span></div>
        </div>
        <p class="dial-note">${esc(s.note)}</p>
        <div class="dial-step"><button data-step="-1" aria-label="Previous step" ${step === 0 ? 'disabled' : ''}>−</button><button data-step="1" aria-label="Next step" ${step === drug.steps.length - 1 ? 'disabled' : ''}>+</button></div>
      </article>
      <article class="card card-teal india">
        <span class="tab-label">In India</span>
        <div class="irow"><span>CDSCO status</span><strong>${esc(drug.cdsco)}</strong></div>
        <div class="irow"><span>Indian brands</span><strong>${esc(drug.brands)}</strong></div>
        <div class="irow"><span>Monthly cost</span><strong>${esc(drug.cost)}</strong></div>
        <div class="irow"><span>IPS pearl</span><strong>${esc(drug.ipsPearl.replace(/^IPS Clinical Pearl:\s*/, ''))}</strong></div>
      </article>`;
    $$('[data-step]').forEach((b) => b.addEventListener('click', () => { step += Number(b.dataset.step); renderDrugs(drug.slug); }));
  }

  /* ---------- PROGRESS ---------- */
  function renderProgress() {
    const now = new Date();
    $('[data-bars]').innerHTML = [-6, -5, -4, -3, -2, -1, 0].map((o) => {
      const d = addDays(now, o);
      const n = state.log[dayKey(d)] || 0;
      const h = Math.min(100, (n / state.goal) * 100);
      return `<div class="wbar ${o === 0 ? 'today' : ''}" title="${n} lessons"><span class="track"><span class="fill" style="height:${h}%"></span></span>${DOW[d.getDay()].slice(0, 2).toUpperCase()}</div>`;
    }).join('');
    const finished = COURSES.filter((c) => pct(c) === 100).length;
    $('[data-stats]').innerHTML = [[streak(), 'Day streak'], [totalLessons(), 'Lessons'], [finished, 'Completed']]
      .map(([v, l]) => `<div class="card glass stat"><b>${v}</b><span>${l}</span></div>`).join('');
    $('[data-course-progress]').innerHTML = `<span class="label">Programs</span>` + COURSES.map((c) => `
      <a class="cp-row" href="#course/${c.id}"><div class="row"><span>${esc(c.title)}</span><span>${pct(c)}%</span></div><div class="bar"><i style="width:${pct(c)}%"></i></div></a>`).join('');
  }

  /* ---------- PROFILE ---------- */
  function initials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return parts.length ? (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase() : 'SA';
  }
  function renderProfile() {
    const h = new Date().getHours();
    $('[data-greet]').textContent = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    const n = $('[data-name]'), r = $('[data-role]');
    if (document.activeElement !== n) n.value = state.name;
    if (document.activeElement !== r) r.value = state.role;
    $('[data-initials]').textContent = initials(state.name);
    $('[data-p-lessons]').textContent = totalLessons();
    $('[data-p-courses]').textContent = COURSES.filter((c) => doneFor(c.id).length).length;
    $('[data-goal-value]').textContent = state.goal;
    applyTheme();
  }

  /* ---------- events ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button, a');
    if (!t) return;
    if (t.matches('.day')) { picked = Number(t.dataset.off); renderToday(); }
    else if (t.matches('[data-reserve]')) whatsapp(`Hi Serenest Academy, please reserve my free seat for the SerenestCase Conference on ${fmtConf({ day: 'numeric', month: 'long' })}.`);
    else if (t.matches('[data-cohort]')) whatsapp('Hi Serenest Academy, I would like to join the Foundations of Mental Health Counselling flagship cohort.');
    else if (t.matches('[data-theme-toggle]')) { state.theme = document.documentElement.dataset.theme === 'night' ? 'light' : 'night'; save(); applyTheme(); }
    else if (t.matches('[data-theme-set]')) { state.theme = t.dataset.themeSet; save(); applyTheme(); }
    else if (t.matches('[data-goal-minus], [data-goal-plus]')) { state.goal = Math.min(10, Math.max(1, state.goal + (t.matches('[data-goal-plus]') ? 1 : -1))); save(); renderProfile(); }
    else if (t.matches('[data-share]')) share();
  });
  $('[data-name]').addEventListener('input', (e) => { state.name = e.target.value; save(); $('[data-initials]').textContent = initials(state.name); });
  $('[data-role]').addEventListener('input', (e) => { state.role = e.target.value; save(); });

  async function share() {
    const url = new URL('./', location.href).href;
    const text = `I'm learning clinical mental health skills on Serenest Academy — ${totalLessons()} lessons so far.`;
    try {
      if (navigator.share) await navigator.share({ title: 'Serenest Academy', text, url });
      else { await navigator.clipboard.writeText(`${text} ${url}`); toast('Link copied'); }
    } catch { /* share cancelled */ }
  }

  $$('[data-conf-short]').forEach((el) => (el.textContent = `${fmtConf({ weekday: 'long', day: 'numeric', month: 'long' })} · 6 PM IST`));
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);
  window.addEventListener('hashchange', route);
  // keep the day arc moving
  setInterval(() => { if (!$('[data-view="today"]').hidden) renderToday(); }, 60_000);

  applyTheme();
  route();

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
