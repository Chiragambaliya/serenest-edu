(function () {
    var header = document.querySelector('.cs-header');
    var burger = document.querySelector('.cs-burger');
    var menu = document.getElementById('cs-menu');
    var links = menu ? menu.querySelectorAll('[data-cs]') : [];
    if (!header || !menu) return;

    function closeMenu() {
        header.classList.remove('is-open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
        header.classList.add('is-open');
        if (burger) burger.setAttribute('aria-expanded', 'true');
        var first = menu.querySelector('a');
        if (first) first.focus();
    }

    function setActive(id) {
        links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('data-cs') === id);
        });
    }

    if (burger) {
        burger.addEventListener('click', function () {
            if (header.classList.contains('is-open')) closeMenu();
            else openMenu();
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && header.classList.contains('is-open')) {
            closeMenu();
            if (burger) burger.focus();
        }
    });

    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            var id = link.getAttribute('data-cs');
            var target = document.getElementById(id);
            event.preventDefault();
            closeMenu();
            if (id === 'about' && window.serenestOpen) window.serenestOpen('about', { smooth: false });
            else if (document.body.getAttribute('data-page') !== 'home' && window.serenestOpen) {
                window.serenestOpen('home', { smooth: false });
            }
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, '', id === 'home' ? window.location.pathname : '#' + id);
            }
            setActive(id);
        });
    });

    if ('IntersectionObserver' in window) {
        var sections = ['home', 'vision', 'first-launch', 'features'].map(function (id) {
            return document.getElementById(id);
        }).filter(Boolean);
        var watcher = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
        sections.forEach(function (section) { watcher.observe(section); });
    }

    setActive('home');
})();
