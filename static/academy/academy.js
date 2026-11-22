(function () {
  var header = document.querySelector('.ax-header');
  var burger = document.querySelector('.ax-burger');
  var nav = document.getElementById('ax-nav');
  if (burger && header) {
    burger.addEventListener('click', function () {
      var open = !header.classList.contains('is-open');
      header.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var first = nav && nav.querySelector('a');
        if (first) first.focus();
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        header.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
      if (nav) {
        nav.addEventListener('click', function (event) {
          if (event.target.closest('a')) {
            header.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
          }
        });
      }
      document.addEventListener('click', function (event) {
        if (!header.classList.contains('is-open') || header.contains(event.target)) return;
        header.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
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
