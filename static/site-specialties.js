/* Website specialty desks. Uses the same data as the Academy app. */
(() => {
  const specs = window.SA_SPECIALTIES || [];
  if (!specs.length) return;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const KEY = 'serenest-site-specialty';

  function fromHash() {
    const [, id] = location.hash.replace('#', '').split('/');
    return specs.some((s) => s.id === id) ? id : null;
  }

  let current = fromHash() || sessionStorage.getItem(KEY) || 'psychiatry';
  if (!specs.some((s) => s.id === current)) current = specs[0].id;

  const spec = () => specs.find((s) => s.id === current) || specs[0];
  const appHref = (hash) => `app/?specialty=${encodeURIComponent(current)}${hash}`;

  function pills(root) {
    if (!root) return;
    root.innerHTML = specs.map((s) => (
      `<button type="button" class="spec-pill" role="tab" data-site-spec="${s.id}" aria-selected="${s.id === current}">${esc(s.short)}</button>`
    )).join('');
  }

  function preview() {
    const s = spec();
    const flagship = s.courses.find((c) => c.flagship) || s.courses[0];
    const root = document.getElementById('homeSpecPreview');
    if (!root) return;
    root.innerHTML = `
      <div class="spec-preview-copy">
        <span class="mono">${esc(s.name)}</span>
        <h3>${esc(flagship ? flagship.title : s.name)}</h3>
        <p>${esc(s.blurb || '')}</p>
        <p class="spec-preview-meta">${s.courses.length} courses · ${s.drugs.length} molecule cards</p>
      </div>
      <div class="spec-preview-actions">
        <a class="btn" href="${appHref('#learn')}">Open this desk</a>
        <button type="button" class="btn btn-ghost" data-see-courses>See courses</button>
        <p class="spec-preview-drugs">${s.drugs.map((d) => esc(d.shortName)).join(' · ')}</p>
      </div>`;
  }

  function courseItem(course, index) {
    const live = /live|cohort/i.test(course.mode || '') || course.id === 'foundations';
    if (course.flagship) {
      return `
        <div class="course-item flagship-item" data-course-id="${esc(course.id)}">
          <div class="course-num">${live ? 'Flagship Program' : 'Lead course'}</div>
          <div class="course-main-content">
            <span class="flagship-badge">${esc(course.mode || (live ? 'Cohort · Live Supervision' : 'Short course'))}</span>
            <h3 class="course-title">${esc(course.title)}</h3>
            <p class="course-desc">${esc(course.desc)}</p>
            <div class="syllabus-drawer" id="drawer-${esc(course.id)}">
              <div class="syllabus-divider"></div>
              <h4 class="mono syllabus-header">Lessons</h4>
              <ul class="syllabus-modules">${course.lessons.map((lesson) => `<li>${esc(lesson)}</li>`).join('')}</ul>
              <div class="syllabus-meta-row">
                <span><strong>Duration:</strong> ${course.weeks} week${course.weeks > 1 ? 's' : ''}</span>
                ${course.mode ? `<span><strong>Mode:</strong> ${esc(course.mode)}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="course-meta-data">${course.weeks} week${course.weeks > 1 ? 's' : ''}${course.mode ? `<br>${esc(course.mode)}` : ''}</div>
          <div class="course-pricing-action">
            <span class="course-access mono">${live ? 'Open enrollment' : 'Short course'}</span>
            <div class="course-action-btns">
              <button type="button" class="btn btn-compact btn-toggle-syllabus">View lessons</button>
              <button type="button" class="btn btn-compact btn-ghost btn-register-course" data-course="${esc(course.title)}">Apply Now</button>
            </div>
          </div>
        </div>`;
    }
    return `
      <div class="course-item course-item--short" data-course-id="${esc(course.id)}">
        <div class="course-num">${String(index).padStart(2, '0')}</div>
        <div class="course-main-content">
          <h3 class="course-title">${esc(course.title)}</h3>
          <p class="course-desc">${esc(course.desc)}</p>
        </div>
        <div class="course-meta-data">${course.weeks} week${course.weeks > 1 ? 's' : ''}</div>
        <div class="course-pricing-action">
          <span class="course-access mono">Short course</span>
          <div class="course-action-btns">
            <button type="button" class="btn btn-compact btn-ghost btn-register-course" data-course="${esc(course.title)}">Apply Now</button>
          </div>
        </div>
      </div>`;
  }

  function courses() {
    const s = spec();
    const mount = document.querySelector('.courses-list-container');
    const lede = document.getElementById('coursesLede');
    if (lede) lede.textContent = `${s.name}. ${s.blurb || ''}`;
    if (!mount) return;
    const flagship = s.courses.find((c) => c.flagship);
    const rest = s.courses.filter((c) => c !== flagship);
    let n = 0;
    mount.innerHTML = `
      ${flagship ? courseItem(flagship, 0) : ''}
      ${rest.length ? '<div class="courses-section-label"><span class="mono">Short Courses</span></div>' : ''}
      ${rest.map((c) => courseItem(c, ++n)).join('')}
      <aside class="spec-molecules">
        <span class="mono">Molecule cards · ${esc(s.name)}</span>
        <p>${s.drugs.map((d) => esc(d.shortName)).join(' · ')}</p>
        <a href="${appHref('#drugs')}">Open the titration dial →</a>
      </aside>
      <aside class="important-note" aria-label="Important note">
        <span class="mono important-note-label">Important Note</span>
        <p>Serenest Academy programs are designed for education, skill development, and clinical exposure. They do not replace formal university degrees, professional licensing, or statutory registration requirements. Molecule cards are a study aid, not a prescription.</p>
      </aside>`;
  }

  function facts() {
    const set = (name, value) => document.querySelectorAll(`[data-fact="${name}"]`).forEach((el) => { el.textContent = value; });
    set('specialties', specs.length);
    set('courses', specs.reduce((n, s) => n + s.courses.length, 0));
    set('drugs', specs.reduce((n, s) => n + s.drugs.length, 0));
    set('videos', specs.reduce((n, s) => n + s.drugs.filter((d) => d.video).length, 0));
  }

  function select(id, { hash = false } = {}) {
    if (!specs.some((s) => s.id === id)) return;
    current = id;
    try { sessionStorage.setItem(KEY, id); } catch { /* private mode */ }
    pills(document.getElementById('homeSpecPills'));
    pills(document.getElementById('courseSpecPills'));
    preview();
    courses();
    facts();
    if (hash && location.hash.startsWith('#courses')) {
      const url = `#courses/${id}`;
      if (location.hash !== url) history.replaceState({ tab: 'courses', specialty: id }, '', url);
    }
  }

  document.addEventListener('click', (e) => {
    const pill = e.target.closest('[data-site-spec]');
    if (pill) {
      select(pill.dataset.siteSpec, { hash: true });
      return;
    }
    if (e.target.closest('[data-see-courses]')) {
      document.querySelector('.nav-tab-btn[data-tab="courses"]')?.click();
      const url = `#courses/${current}`;
      if (location.hash !== url) history.replaceState({ tab: 'courses', specialty: current }, '', url);
    }
  });

  window.addEventListener('hashchange', () => {
    const id = fromHash();
    if (id && id !== current) select(id);
  });

  select(current, { hash: location.hash.startsWith('#courses') });
})();
