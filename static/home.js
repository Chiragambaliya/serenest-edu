/* Serenest Academy home page: live counts, course rails, continue-learning, sample question, videos, countdown.
   Reads the same data files as the app (/app/*.js) and the app's saved progress (same origin). */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const FULL = window.SA_FULL || {};
  const SUBJECTS = window.SA_SUBJECTS || [];
  const COURSES = window.SA_COURSES || [];
  const DRUGS = window.SA_DRUGS || [];
  const isMbbs = (id) => SUBJECTS.some((s) => s.id === id);

  /* ---------- counts ---------- */
  const fullIds = Object.keys(FULL);
  const mhFull = fullIds.filter((id) => !isMbbs(id));
  const lessons = fullIds.reduce((n, id) => n + FULL[id].lessons.length, 0);
  const questions = fullIds.reduce((n, id) => n + FULL[id].lessons.reduce((m, l) => m + l.quiz.length, 0), 0);
  const ready = SUBJECTS.filter((s) => FULL[s.id]).length;
  const set = (sel, v) => document.querySelectorAll(sel).forEach((el) => (el.textContent = v));
  set('[data-stat="courses"]', mhFull.length + ready);
  set('[data-stat="lessons"]', lessons);
  set('[data-stat="questions"]', questions);
  set('[data-stat="subjects"]', `${ready}/${SUBJECTS.length}`);
  set('[data-count="mh"]', `${mhFull.length} full courses for counsellors & clinicians`);
  set('[data-count="mbbs"]', `${SUBJECTS.length} subjects · ${ready} ready now`);
  set('[data-count="lessons"]', `${lessons} video lessons · ${questions} questions`);
  const today = new Date();
  set('[data-today]', today.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }));

  /* ---------- mental health rail ---------- */
  const rail = $('[data-mh-cards]');
  if (rail) {
    const tone = ['olive', 'teal', 'night', 'apricot'];
    rail.innerHTML = COURSES.filter((c) => FULL[c.id] && !isMbbs(c.id)).map((c, i) => {
      const f = FULL[c.id];
      return `<a class="h-card h-card--${tone[i % tone.length]}" href="/app/#course/${c.id}">
        <span class="h-card-meta">${f.lessons.length} lessons · ${f.lessons.reduce((m, l) => m + l.mins, 0)} min</span>
        <span class="h-card-title">${esc(c.title)}</span>
        <span class="h-card-desc">${esc(c.desc)}</span>
        <span class="h-card-go">Start →</span></a>`;
    }).join('');
  }

  /* ---------- MBBS grid ---------- */
  const grid = $('[data-mbbs-grid]');
  if (grid) {
    grid.innerHTML = SUBJECTS.map((s, i) => FULL[s.id]
      ? `<a class="h-subj on" href="/app/#course/${s.id}"><span>${String(i + 1).padStart(2, '0')}</span><b>${esc(s.name)}</b><small>${FULL[s.id].lessons.length} lessons</small></a>`
      : `<span class="h-subj"><span>${String(i + 1).padStart(2, '0')}</span><b>${esc(s.name)}</b><small>Coming soon</small></span>`).join('');
  }

  /* ---------- continue learning (reads the app's saved progress) ---------- */
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('serenest-academy-app-v1')) || {}; } catch { saved = {}; }
  const done = saved.done || {};
  const log = saved.log || {};
  const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  let streak = 0;
  { let d = new Date(); if (!log[dayKey(d)]) d.setDate(d.getDate() - 1); while (log[dayKey(d)]) { streak++; d.setDate(d.getDate() - 1); } }
  const titleOf = (id) => (COURSES.find((c) => c.id === id) || {}).title || (SUBJECTS.find((s) => s.id === id) || {}).name || id;
  const open = Object.keys(done).filter((id) => FULL[id] && done[id].length && done[id].length < FULL[id].lessons.length);
  const cont = $('[data-continue]');
  if (cont && (open.length || streak)) {
    const id = open[0];
    const next = id ? FULL[id].lessons.findIndex((_, i) => !done[id].includes(i)) : -1;
    const pct = id ? Math.round((done[id].length / FULL[id].lessons.length) * 100) : 0;
    cont.hidden = false;
    cont.innerHTML = `
      <div class="h-cont-ring" style="--p:${pct}"><b>${pct}%</b></div>
      <div class="h-cont-copy">
        <span class="h-kicker">Welcome back${saved.name ? ', ' + esc(saved.name) : ''}${streak ? ` · ${streak}-day streak ✦` : ''}</span>
        ${id ? `<b>${esc(titleOf(id))}</b><span>Next: lesson ${next + 1} · ${esc(FULL[id].lessons[next].title)}</span>` : '<b>Keep your streak going today</b><span>One lesson is enough.</span>'}
      </div>
      <a class="btn h-btn-dark" href="${id ? `/app/#lesson/${id}/${next}` : '/app/#learn'}">Continue →</a>`;
  }

  /* ---------- try a question ---------- */
  const pool = [];
  fullIds.forEach((id) => FULL[id].lessons.forEach((l, li) => l.quiz.forEach((q) => pool.push({ id, li, q, lesson: l.title }))));
  const quiz = $('[data-quiz]');
  function ask() {
    if (!quiz || !pool.length) return;
    const it = pool[Math.floor(Math.random() * pool.length)];
    quiz.innerHTML = `
      <span class="h-kicker">Try a question · ${esc(titleOf(it.id))}</span>
      <p class="h-q">${esc(it.q.q)}</p>
      <div class="h-opts">${it.q.o.map((o, i) => `<button type="button" class="h-opt" data-i="${i}">${esc(o)}</button>`).join('')}</div>
      <p class="h-why" hidden></p>
      <div class="h-quiz-foot"><button type="button" class="h-link-btn" data-next>Another question ↻</button><a class="h-link" href="/app/#lesson/${it.id}/${it.li}">Learn it: ${esc(it.lesson)} →</a></div>`;
    quiz.querySelectorAll('.h-opt').forEach((b) => b.addEventListener('click', () => {
      const pick = Number(b.dataset.i);
      quiz.querySelectorAll('.h-opt').forEach((x, i) => { x.disabled = true; if (i === it.q.a) x.classList.add('right'); });
      if (pick !== it.q.a) b.classList.add('wrong');
      const why = $('.h-why', quiz); why.hidden = false;
      why.textContent = (pick === it.q.a ? 'Correct. ' : 'Not quite. ') + it.q.why;
    }));
    $('[data-next]', quiz).addEventListener('click', ask);
  }
  ask();

  /* ---------- drug brief videos ---------- */
  const tabs = $('[data-video-tabs]');
  const video = $('[data-video]');
  if (tabs && video && DRUGS.length) {
    const show = (slug) => {
      video.src = `/app/videos/${slug}.mp4#t=6`;
      tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.slug === slug)));
    };
    tabs.innerHTML = DRUGS.map((d) => `<button type="button" role="tab" data-slug="${d.slug}">${esc(d.shortName)}</button>`).join('');
    tabs.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => show(b.dataset.slug)));
    show((DRUGS.find((d) => d.slug === 'lithium') || DRUGS[0]).slug);
  }

  /* ---------- conference countdown (last Saturday, 6 PM IST = 12:30 UTC) ---------- */
  function nextConference(now = new Date()) {
    for (let k = 0; k < 3; k++) {
      const last = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + k + 1, 0));
      const back = (last.getUTCDay() + 1) % 7;
      const when = new Date(Date.UTC(last.getUTCFullYear(), last.getUTCMonth(), last.getUTCDate() - back, 12, 30));
      if (when > now) return when;
    }
  }
  const conf = nextConference();
  const fmt = conf.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', day: 'numeric', month: 'long' });
  set('[data-conf-short]', `Free · ${conf.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short' })} · 6 PM IST`);
  const cd = $('[data-countdown]');
  function tick() {
    if (!cd) return;
    const ms = Math.max(0, conf - new Date());
    const d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5), m = Math.floor((ms % 36e5) / 6e4);
    cd.innerHTML = `<div><b>${d}</b><span>days</span></div><div><b>${h}</b><span>hours</span></div><div><b>${m}</b><span>min</span></div><p>${esc(fmt)} · 6:00 PM IST</p>`;
  }
  tick(); setInterval(tick, 30000);
})();
