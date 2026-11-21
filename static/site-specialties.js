/* Courses page can show another specialty in the same course list.
   Psychiatry keeps the page that was already written. */
(() => {
  const specs = window.SA_SPECIALTIES || [];
  const mount = document.querySelector('.courses-list-container');
  const pills = document.getElementById('courseSpecPills');
  const lede = document.getElementById('coursesLede');
  if (!specs.length || !mount || !pills) return;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const originalList = mount.innerHTML;
  const originalLede = lede ? lede.textContent : '';
  const KEY = 'serenest-site-specialty';

  function fromHash() {
    const [, id] = location.hash.replace('#', '').split('/');
    return specs.some((s) => s.id === id) ? id : null;
  }

  let current = fromHash() || 'psychiatry';
  if (!specs.some((s) => s.id === current)) current = 'psychiatry';

  const spec = () => specs.find((s) => s.id === current) || specs[0];

  function courseItem(course, index) {
    if (course.flagship) {
      return `
        <div class="course-item flagship-item" data-course-id="${esc(course.id)}">
          <div class="course-num">Clinical posting</div>
          <div class="course-main-content">
            <span class="flagship-badge">${esc(course.mode || 'Ward teaching')}</span>
            <h3 class="course-title">${esc(course.title)}</h3>
            <p class="course-desc">${esc(course.desc)}</p>
            <div class="syllabus-drawer" id="drawer-${esc(course.id)}">
              <div class="syllabus-divider"></div>
              <h4 class="mono syllabus-header">Lessons</h4>
              <ul class="syllabus-modules">${course.lessons.map((lesson) => `<li>${esc(lesson)}</li>`).join('')}</ul>
            </div>
          </div>
          <div class="course-meta-data">${course.weeks} week${course.weeks > 1 ? 's' : ''}${course.mode ? `<br>${esc(course.mode)}` : ''}</div>
          <div class="course-pricing-action">
            <span class="course-access mono">For doctors</span>
            <div class="course-action-btns">
              <button type="button" class="btn btn-compact btn-toggle-syllabus">View Curriculum</button>
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
          <span class="course-access mono">Clinical module</span>
          <div class="course-action-btns">
            <button type="button" class="btn btn-compact btn-ghost btn-register-course" data-course="${esc(course.title)}">Apply Now</button>
          </div>
        </div>
      </div>`;
  }

  function paint() {
    pills.innerHTML = specs.map((s) => (
      `<button type="button" class="filter-chip${s.id === current ? ' active' : ''}" role="tab" data-site-spec="${s.id}" aria-selected="${s.id === current}">${esc(s.short)}</button>`
    )).join('');

    if (current === 'psychiatry') {
      mount.innerHTML = originalList;
      if (lede) lede.textContent = originalLede;
      return;
    }

    const s = spec();
    if (lede) lede.textContent = `${s.name} for MBBS students, interns, and junior residents. ${s.blurb || ''}`;
    const flagship = s.courses.find((c) => c.flagship);
    const rest = s.courses.filter((c) => c !== flagship);
    let n = 0;
    mount.innerHTML = `
      ${flagship ? courseItem(flagship, 0) : ''}
      ${rest.length ? '<div class="courses-section-label"><span class="mono">Clinical modules</span></div>' : ''}
      ${rest.map((c) => courseItem(c, ++n)).join('')}
      <div class="courses-section-label"><span class="mono">Molecule cards · ${s.drugs.map((d) => esc(d.shortName)).join(' · ')}</span></div>
      <aside class="important-note" aria-label="Important note">
        <span class="mono important-note-label">Important Note</span>
        <p>Serenest Academy programs are designed for education, skill development, and clinical exposure. They do not replace formal university degrees, professional licensing, or statutory registration requirements. Molecule cards are a study aid, not a prescription. <a href="app/?specialty=${encodeURIComponent(s.id)}#drugs">Open them in the Academy app</a>.</p>
      </aside>`;
  }

  function select(id, { hash = false } = {}) {
    if (!specs.some((s) => s.id === id)) return;
    current = id;
    try { sessionStorage.setItem(KEY, id); } catch { /* private mode */ }
    paint();
    if (hash && location.hash.startsWith('#courses')) {
      const url = id === 'psychiatry' ? '#courses' : `#courses/${id}`;
      if (location.hash !== url) history.replaceState({ tab: 'courses', specialty: id }, '', url);
    }
  }

  pills.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-site-spec]');
    if (!chip) return;
    select(chip.dataset.siteSpec, { hash: true });
  });

  window.addEventListener('hashchange', () => {
    const id = fromHash() || (location.hash.replace('#', '').split('/')[0] === 'courses' ? 'psychiatry' : null);
    if (id && id !== current) select(id);
  });

  paint();
})();
