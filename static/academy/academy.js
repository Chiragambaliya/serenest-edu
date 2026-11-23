(function () {
  var header = document.querySelector('.ax-header');
  var burger = document.querySelector('.ax-burger');
  var nav = document.getElementById('ax-nav');
  if (burger && header) {
    function setMenu(open) {
      header.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('ax-lock', open);
    }
    burger.addEventListener('click', function () {
      var open = !header.classList.contains('is-open');
      setMenu(open);
      if (open) {
        var first = nav && nav.querySelector('a');
        if (first) first.focus();
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        setMenu(false);
        burger.focus();
      }
    });
    if (nav) {
      nav.addEventListener('click', function (event) {
        if (event.target.closest('a')) setMenu(false);
      });
    }
    document.addEventListener('click', function (event) {
      if (!header.classList.contains('is-open') || header.contains(event.target)) return;
      setMenu(false);
    });
  }

  var stages = document.querySelectorAll('[data-stage-btn]');
  var panels = document.querySelectorAll('[data-stage-panel]');
  stages.forEach(function (button) {
    button.addEventListener('click', function () {
      var id = button.getAttribute('data-stage-btn');
      stages.forEach(function (item) {
        item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-stage-panel') !== id;
      });
      var row = button.parentElement;
      if (row && row.scrollWidth > row.clientWidth) {
        row.scrollTo({ left: button.offsetLeft - 8, behavior: 'smooth' });
      }
    });
  });

  var filters = document.querySelectorAll('[data-filter]');
  var models = document.querySelectorAll('[data-model]');
  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      var name = button.getAttribute('data-filter');
      filters.forEach(function (item) {
        item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
      });
      models.forEach(function (card) {
        card.hidden = name !== 'all' && card.getAttribute('data-model') !== name;
      });
    });
  });

  var dock = document.createElement('nav');
  dock.className = 'ax-dock';
  dock.setAttribute('aria-label', 'Academy');
  var here = location.pathname.replace(/\/$/, '');
  [
    ['/academy/undergraduate/', 'Study', '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5" stroke="currentColor" stroke-width="1.7"/></svg>'],
    ['/academy/postgraduate/', 'Specialty', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8M9 3v6l-4 10h14L15 9V3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>'],
    ['/academy/doctors/', 'Doctors', '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="9" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="16" cy="9" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 19c.6-2.4 2.2-3.6 4-3.6s3.4 1.2 4 3.6M12 19c.6-2.4 2.2-3.6 4-3.6s3.4 1.2 4 3.6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>'],
    ['/academy/3d-lab/', 'Lab', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.6 6.2L20 10l-6.4 1.8L12 18l-1.6-6.2L4 10l6.4-1.8L12 2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>']
  ].forEach(function (item) {
    var link = document.createElement('a');
    link.href = item[0];
    link.innerHTML = item[2] + '<span>' + item[1] + '</span>';
    if (here === item[0].replace(/\/$/, '')) link.setAttribute('aria-current', 'page');
    dock.appendChild(link);
  });
  document.body.appendChild(dock);

  function focusDetail() {
    var id = location.hash.replace('#', '');
    var panel = id ? document.getElementById(id) : null;
    if (!panel || !panel.classList.contains('ax-detail')) return;
    var title = panel.querySelector('h3');
    if (!title) return;
    title.setAttribute('tabindex', '-1');
    title.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', focusDetail);
})();
