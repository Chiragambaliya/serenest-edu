/* Serenest Academy app — vanilla JS, no build step. */
(() => {
  'use strict';

  const WHATSAPP = '917777636369';
  const COURSES = window.SA_COURSES || [];
  const DRUGS = window.SA_DRUGS || [];
  const SPECIALTIES = window.SA_SPECIALTIES?.length
    ? window.SA_SPECIALTIES
    : [{ id: 'psychiatry', name: 'Psychiatry', short: 'Psych', blurb: '', pearlLabel: 'IPS pearl', courses: COURSES, drugs: DRUGS }];
  const MIN_PER_LESSON = 15;
  const DIAL_ARC = 443, DIAL_CYCLE = 591;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id) => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;

  /* ---------- storage (per-viewer convenience; app works without it) ---------- */
  const KEY = 'serenest-academy-app-v1';
  const state = Object.assign({ name: '', role: '', goal: 4, done: {}, log: {}, theme: null, drug: null, specialty: 'psychiatry' }, load());
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ } }
  const requestedSpecialty = new URLSearchParams(location.search).get('specialty');
  if (requestedSpecialty && SPECIALTIES.some((s) => s.id === requestedSpecialty)) {
    state.specialty = requestedSpecialty;
    save();
  }

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
  const specById = (id) => SPECIALTIES.find((s) => s.id === id) || SPECIALTIES[0];
  const currentSpec = () => specById(state.specialty);
  const specCourses = (spec = currentSpec()) => spec.courses || [];
  const specDrugs = (spec = currentSpec()) => spec.drugs || [];
  function findCourse(id) {
    for (const specialty of SPECIALTIES) {
      const course = (specialty.courses || []).find((c) => c.id === id);
      if (course) return { course, specialty };
    }
    return null;
  }
  function paintSpecs() {
    const spec = currentSpec();
    $$('[data-specs]').forEach((el) => {
      el.innerHTML = SPECIALTIES.map((s) => `<button type="button" class="pill" role="tab" data-spec="${s.id}" aria-selected="${s.id === spec.id}">${esc(s.short)}</button>`).join('');
    });
    $$('[data-spec-name]').forEach((el) => { el.textContent = spec.name; });
    $$('[data-spec-blurb]').forEach((el) => { el.textContent = spec.blurb || ''; });
  }
  function flagshipCourse() {
    const courses = specCourses();
    return courses.find((c) => c.flagship) || courses[0] || null;
  }

  const doneFor = (id) => state.done[id] || [];
  const pct = (c) => Math.round((doneFor(c.id).length / c.lessons.length) * 100);
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
    const [view, arg] = (location.hash.slice(1) || 'today').split('/');
    const known = ['today', 'learn', 'drugs', 'progress', 'profile', 'course'];
    const v = known.includes(view) ? view : 'today';
    if (v === 'course' && arg) {
      const found = findCourse(arg);
      if (found && found.specialty.id !== state.specialty) {
        state.specialty = found.specialty.id;
        save();
      }
    }
    const tab = v === 'course' ? 'learn' : v;
    paintSpecs();
    $$('[data-view]').forEach((s) => (s.hidden = s.dataset.view !== v));
    $$('.nav-item').forEach((a) => (a.dataset.tab === tab ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
    const render = { today: renderToday, learn: renderLearn, course: () => renderCourse(arg), drugs: () => renderDrugs(arg), progress: renderProgress, profile: renderProfile }[v];
    render();
    const title = v === 'course' ? (findCourse(arg)?.course.title) : TABS.find((t) => t.id === v)?.label;
    document.title = `${title || 'Today'} · ${currentSpec().name} · Serenest Academy`;
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

    const courses = specCourses();
    const c = courses.find((x) => doneFor(x.id).length && pct(x) < 100) || courses.find((x) => pct(x) < 100) || courses[0];
    if (!c) {
      $('[data-continue]').innerHTML = `<span class="label">${esc(currentSpec().name)}</span><h3>No courses on this desk yet</h3>`;
      return;
    }
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
  function renderLearn() {
    $('[data-courses]').innerHTML = specCourses().map((c) => `
      <a class="card course ${c.flagship ? 'card-apricot' : 'glass'}" href="#course/${c.id}" style="text-decoration:none">
        <div class="meta"><span>${c.flagship ? 'Clinical posting · ' : 'Clinical module · '}${c.weeks} week${c.weeks > 1 ? 's' : ''}${c.mode ? ' · ' + esc(c.mode) : ''}</span><span class="ring" style="--p:${pct(c)}" aria-label="${pct(c)}% complete"></span></div>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.desc)}</p>
      </a>`).join('');
  }

  function renderCourse(id) {
    const c = findCourse(id)?.course;
    const root = $('[data-course-detail]');
    if (!c) { root.innerHTML = '<p>Course not found.</p>'; return; }
    const done = doneFor(c.id);
    root.innerHTML = `
      <div class="detail-head">
        <span class="label">${c.flagship ? 'Clinical posting' : 'Clinical module'} · ${c.weeks} week${c.weeks > 1 ? 's' : ''}</span>
        <h1 class="display">${esc(c.title)}</h1>
        <p style="color:var(--ink-soft)">${esc(c.desc)}</p>
        <div class="row" style="display:flex;justify-content:space-between;font-weight:700;font-size:14px"><span>${done.length} of ${c.lessons.length} lessons</span><span>${pct(c)}%</span></div>
        <div class="bar"><i style="width:${pct(c)}%"></i></div>
      </div>
      <div class="lessons">${c.lessons.map((l, i) => `
        <button class="lesson glass" data-lesson="${i}" aria-pressed="${done.includes(i)}">
          <span class="tick">${icon('check')}</span><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="lt">${esc(l)}</span>
        </button>`).join('')}</div>
      <div class="detail-actions">
        <button class="btn btn-ink" data-apply>Apply on WhatsApp ${icon('arrow')}</button>
        <a class="btn btn-ghost" href="#learn">All programs</a>
      </div>`;
    $$('[data-lesson]', root).forEach((b) => b.addEventListener('click', () => {
      const i = Number(b.dataset.lesson);
      const was = b.getAttribute('aria-pressed') === 'true';
      toggleLesson(c.id, i);
      renderCourse(id);
      if (!was) toast(todayCount() >= state.goal ? 'Daily goal reached ✦' : `Lesson done · ${todayCount()} of ${state.goal} today`);
    }));
    $('[data-apply]', root).addEventListener('click', () => whatsapp(`Hi Serenest Academy, I would like to apply for "${c.title}". Please share the next cohort dates.`));
  }

  /* ---------- DRUGS ---------- */
  let step = 0;
  function renderDrugs(slug) {
    const drugs = specDrugs();
    const drug = drugs.find((d) => d.slug === slug) || drugs.find((d) => d.slug === state.drug) || drugs[0];
    if (!drug) {
      $('[data-drug-pills]').innerHTML = '';
      $('[data-drug]').innerHTML = '<p>No molecule cards on this desk yet.</p>';
      return;
    }
    if (state.drug !== drug.slug) { state.drug = drug.slug; step = 0; save(); }
    step = Math.min(step, drug.steps.length - 1);
    $('[data-drug-pills]').innerHTML = drugs.map((d) => `<a class="pill" role="tab" href="#drugs/${d.slug}" aria-selected="${d.slug === drug.slug}" style="text-decoration:none">${esc(d.shortName)}</a>`).join('');
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
            <defs><linearGradient id="dg" gradientUnits="userSpaceOnUse" x1="53.53" y1="186.47" x2="120" y2="26"><stop offset="0" stop-color="#58bfc7"/><stop offset=".6" stop-color="#f4f0e3"/><stop offset="1" stop-color="#eaa152"/></linearGradient></defs>
            <path d="M53.53 186.47A94 94 0 1 1 186.47 186.47" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="13" stroke-linecap="round"/>
            <path d="M53.53 186.47A94 94 0 1 1 186.47 186.47" fill="none" stroke="url(#dg)" stroke-width="13" stroke-linecap="round" pathLength="${DIAL_ARC}" stroke-dasharray="${dash} ${DIAL_CYCLE}" style="transition:stroke-dasharray .4s"/>
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
        <div class="irow"><span>${esc(currentSpec().pearlLabel || 'Clinical pearl')}</span><strong>${esc((drug.pearl || drug.ipsPearl || '').replace(/^IPS Clinical Pearl:\s*/, ''))}</strong></div>
      </article>
      ${drug.video ? `<article class="card glass video-card">
        <span class="label">${icon('play')} 44-second drug brief</span>
        <video controls preload="metadata" playsinline src="videos/${drug.slug}.mp4#t=6"></video>
      </article>` : ''}`;
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
    const courses = specCourses();
    const finished = courses.filter((c) => pct(c) === 100).length;
    const specLessons = courses.reduce((a, c) => a + doneFor(c.id).length, 0);
    $('[data-stats]').innerHTML = [[streak(), 'Day streak'], [specLessons, 'Lessons'], [finished, 'Completed']]
      .map(([v, l]) => `<div class="card glass stat"><b>${v}</b><span>${l}</span></div>`).join('');
    $('[data-course-progress]').innerHTML = `<span class="label">${esc(currentSpec().name)}</span>` + courses.map((c) => `
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
    const courses = specCourses();
    $('[data-p-lessons]').textContent = courses.reduce((a, c) => a + doneFor(c.id).length, 0);
    $('[data-p-courses]').textContent = courses.filter((c) => doneFor(c.id).length).length;
    $('[data-goal-value]').textContent = state.goal;
    const flagship = flagshipCourse();
    $('[data-cohort-title]').textContent = flagship ? flagship.title : 'the next cohort';
    $('[data-cohort-meta]').textContent = flagship
      ? `${flagship.weeks} week${flagship.weeks > 1 ? 's' : ''}${flagship.mode ? ' · ' + flagship.mode : ''}`
      : '';
    applyTheme();
  }

  /* ---------- events ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button, a');
    if (!t) return;
    if (t.matches('.day')) { picked = Number(t.dataset.off); renderToday(); }
    else if (t.matches('[data-spec]')) {
      const id = t.dataset.spec;
      if (!SPECIALTIES.some((s) => s.id === id) || id === state.specialty) return;
      state.specialty = id;
      state.drug = null;
      step = 0;
      save();
      const view = (location.hash.slice(1) || 'today').split('/')[0];
      if (view === 'course') location.hash = '#learn';
      else if (view === 'drugs' && location.hash !== '#drugs') location.hash = '#drugs';
      else route();
    }
    else if (t.matches('[data-reserve]')) whatsapp(`Hi Serenest Academy, please reserve my free seat for the SerenestCase Conference on ${fmtConf({ day: 'numeric', month: 'long' })}.`);
    else if (t.matches('[data-cohort]')) {
      const flagship = flagshipCourse();
      const title = flagship ? flagship.title : 'a cohort';
      whatsapp(`Hi Serenest Academy, I would like to join "${title}" (${currentSpec().name}). Please share the next cohort dates.`);
    }
    else if (t.matches('[data-theme-toggle]')) { state.theme = document.documentElement.dataset.theme === 'night' ? 'light' : 'night'; save(); applyTheme(); }
    else if (t.matches('[data-theme-set]')) { state.theme = t.dataset.themeSet; save(); applyTheme(); }
    else if (t.matches('[data-goal-minus], [data-goal-plus]')) { state.goal = Math.min(10, Math.max(1, state.goal + (t.matches('[data-goal-plus]') ? 1 : -1))); save(); renderProfile(); }
    else if (t.matches('[data-share]')) share();
  });
  $('[data-name]').addEventListener('input', (e) => { state.name = e.target.value; save(); $('[data-initials]').textContent = initials(state.name); });
  $('[data-role]').addEventListener('input', (e) => { state.role = e.target.value; save(); });

  async function share() {
    const url = new URL('./', location.href).href;
    const text = `I'm studying ${currentSpec().name} on Serenest Academy — ${specCourses().reduce((a, c) => a + doneFor(c.id).length, 0)} lessons so far.`;
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
