/* Serenest Education — Admin dashboard */

(function () {
    // Change this PIN before going live (default: last 6 digits of WhatsApp)
    const ADMIN_PIN = '777636';

    const STORAGE_LEDGER = 'serenest_admin_ledger';
    const STORAGE_SETTINGS = 'serenest_admin_settings';
    const SESSION_KEY = 'serenest_admin_session';

    const COURSES = [
        'Foundations of Clinical Practice',
        'Intergenerational Trauma & Indian Family Systems',
        'Multilingual Therapy & Somatic Idioms of Distress',
        'Queer-Affirmative & Neurodivergent Practice',
        'Private Practice Setup & MHCA 2017 Compliance',
    ];

    const DEFAULT_SETTINGS = {
        whatsappNumber: '917777636369',
        zoomCaseConference: '',
        zoomFoundations: '',
        zoomDefault: '',
        nextCaseConferenceNote: '',
    };

    const DEFAULT_TEMPLATES = {
        courseConfirm: `Hi {{name}},

You're confirmed for *{{course}}* at Serenest Education (free).

First session: {{date}}
Zoom: {{zoom}}

Please join 5 minutes early. Reply here if you have questions.

— Serenest Education Team`,
        caseConfirm: `Hi {{name}},

Your seat for the *Serenest Case Conference* is confirmed (free).

Date: {{date}} · 6:00 PM IST
Zoom: {{zoom}}

See you there.

— Serenest Education Team`,
        waitlist: `Hi {{name}},

Thank you for registering for *{{course}}*. The current cohort is full — we've added you to the waitlist and will message you when a seat opens.

— Serenest Education Team`,
    };

    let ledger = [];
    let settings = { ...DEFAULT_SETTINGS, templates: { ...DEFAULT_TEMPLATES } };
    let activePanel = 'dashboard';

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function uid() {
        return `reg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    }

    function loadData() {
        try {
            ledger = JSON.parse(localStorage.getItem(STORAGE_LEDGER)) || [];
        } catch {
            ledger = [];
        }
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_SETTINGS)) || {};
            settings = {
                ...DEFAULT_SETTINGS,
                templates: { ...DEFAULT_TEMPLATES },
                ...saved,
                templates: { ...DEFAULT_TEMPLATES, ...(saved.templates || {}) },
            };
        } catch {
            settings = { ...DEFAULT_SETTINGS, templates: { ...DEFAULT_TEMPLATES } };
        }
    }

    function saveLedger() {
        localStorage.setItem(STORAGE_LEDGER, JSON.stringify(ledger));
    }

    function saveSettings() {
        localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
    }

    function toast(msg) {
        const el = $('#adminToast');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('visible');
        setTimeout(() => el.classList.remove('visible'), 2800);
    }

    function formatDate(iso) {
        if (!iso) return '—';
        return new Date(iso).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    function lastSaturdayOfMonth(year, month) {
        const date = new Date(year, month + 1, 0);
        const daysBack = (date.getDay() + 1) % 7;
        date.setDate(date.getDate() - daysBack);
        return date;
    }

    function getNextCaseConferenceDate() {
        const now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();
        let target = lastSaturdayOfMonth(year, month);
        if (target <= now) {
            month += 1;
            if (month > 11) {
                month = 0;
                year += 1;
            }
            target = lastSaturdayOfMonth(year, month);
        }
        return target.toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    function getZoomForEntry(entry) {
        if (entry.type === 'conference') {
            return settings.zoomCaseConference || settings.zoomDefault || '[Add Zoom link in Sessions]';
        }
        if (entry.course === COURSES[0]) {
            return settings.zoomFoundations || settings.zoomDefault || '[Add Zoom link in Sessions]';
        }
        return settings.zoomDefault || '[Add Zoom link in Sessions]';
    }

    function fillTemplate(templateKey, entry) {
        const tpl = settings.templates[templateKey] || DEFAULT_TEMPLATES[templateKey];
        const date = entry.type === 'conference'
            ? (settings.nextCaseConferenceNote || getNextCaseConferenceDate())
            : getNextCaseConferenceDate();
        return tpl
            .replace(/\{\{name\}\}/g, entry.name || '')
            .replace(/\{\{course\}\}/g, entry.course || 'Case Conference')
            .replace(/\{\{email\}\}/g, entry.email || '')
            .replace(/\{\{date\}\}/g, date)
            .replace(/\{\{zoom\}\}/g, getZoomForEntry(entry));
    }

    async function copyText(text) {
        try {
            await navigator.clipboard.writeText(text);
            toast('Copied to clipboard');
        } catch {
            toast('Could not copy — select text manually');
        }
    }

    function stats() {
        const course = ledger.filter((e) => e.type === 'course');
        const conference = ledger.filter((e) => e.type === 'conference');
        const pending = ledger.filter((e) => e.status === 'pending');
        const confirmed = ledger.filter((e) => e.status === 'confirmed');
        return { total: ledger.length, course: course.length, conference: conference.length, pending: pending.length, confirmed: confirmed.length };
    }

    function renderStats() {
        const s = stats();
        $('#statTotal').textContent = s.total;
        $('#statPending').textContent = s.pending;
        $('#statConfirmed').textContent = s.confirmed;
        $('#statConference').textContent = s.conference;
        $('#statCourses').textContent = s.course;
    }

    function filteredLedger() {
        const typeFilter = $('#filterType')?.value || 'all';
        const statusFilter = $('#filterStatus')?.value || 'all';
        const courseFilter = $('#filterCourse')?.value || 'all';
        const search = ($('#searchLedger')?.value || '').trim().toLowerCase();

        return ledger
            .filter((e) => typeFilter === 'all' || e.type === typeFilter)
            .filter((e) => statusFilter === 'all' || e.status === statusFilter)
            .filter((e) => courseFilter === 'all' || e.course === courseFilter)
            .filter((e) => {
                if (!search) return true;
                return [e.name, e.email, e.course, e.note, e.phone]
                    .filter(Boolean)
                    .some((v) => String(v).toLowerCase().includes(search));
            })
            .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
    }

    function renderTable() {
        const tbody = $('#ledgerTableBody');
        const empty = $('#ledgerEmpty');
        if (!tbody) return;

        const rows = filteredLedger();
        tbody.innerHTML = '';

        if (rows.length === 0) {
            empty?.classList.add('visible');
            return;
        }
        empty?.classList.remove('visible');

        rows.forEach((entry) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="admin-table-name">${escapeHtml(entry.name)}</div>
                    <div class="admin-table-email">${escapeHtml(entry.email)}</div>
                    ${entry.phone ? `<div class="admin-table-email">${escapeHtml(entry.phone)}</div>` : ''}
                </td>
                <td>${entry.type === 'conference' ? 'Case Conference' : escapeHtml(entry.course || '—')}</td>
                <td><span class="status-badge status-badge--${entry.status}">${entry.status}</span></td>
                <td>${formatDate(entry.registeredAt)}</td>
                <td>
                    <div class="admin-row-actions">
                        ${entry.status === 'pending' ? `<button type="button" class="admin-action-btn admin-action-btn--primary" data-action="confirm" data-id="${entry.id}">Confirm</button>` : ''}
                        <button type="button" class="admin-action-btn" data-action="copy-reply" data-id="${entry.id}">Copy reply</button>
                        ${entry.phone ? `<button type="button" class="admin-action-btn" data-action="whatsapp" data-id="${entry.id}">WhatsApp</button>` : ''}
                        <button type="button" class="admin-action-btn admin-action-btn--danger" data-action="delete" data-id="${entry.id}">Delete</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll('[data-action]').forEach((btn) => {
            btn.addEventListener('click', () => handleRowAction(btn.dataset.action, btn.dataset.id));
        });
    }

    function escapeHtml(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function handleRowAction(action, id) {
        const entry = ledger.find((e) => e.id === id);
        if (!entry) return;

        if (action === 'confirm') {
            entry.status = 'confirmed';
            entry.confirmedAt = new Date().toISOString();
            saveLedger();
            renderAll();
            copyText(fillTemplate(entry.type === 'conference' ? 'caseConfirm' : 'courseConfirm', entry));
            toast(`${entry.name} marked confirmed`);
        }

        if (action === 'copy-reply') {
            const key = entry.status === 'pending' && entry.type === 'course' ? 'courseConfirm' : entry.type === 'conference' ? 'caseConfirm' : 'courseConfirm';
            copyText(fillTemplate(key, entry));
        }

        if (action === 'whatsapp') {
            const phone = entry.phone.replace(/\D/g, '');
            const num = phone.startsWith('91') ? phone : `91${phone}`;
            window.open(`https://wa.me/${num}?text=${encodeURIComponent(fillTemplate('courseConfirm', entry))}`, '_blank', 'noopener');
        }

        if (action === 'delete') {
            if (!confirm(`Remove ${entry.name} from the ledger?`)) return;
            ledger = ledger.filter((e) => e.id !== id);
            saveLedger();
            renderAll();
            toast('Entry removed');
        }
    }

    function addEntry(data) {
        ledger.push({
            id: uid(),
            type: data.type,
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            course: data.course || '',
            note: data.note || '',
            status: 'pending',
            registeredAt: new Date().toISOString(),
            confirmedAt: null,
            source: data.source || 'manual',
        });
        saveLedger();
        renderAll();
        toast(`${data.name} added to ledger`);
    }

    function renderRecent() {
        const el = $('#recentList');
        if (!el) return;
        const recent = [...ledger].sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)).slice(0, 5);
        if (recent.length === 0) {
            el.innerHTML = '<p class="admin-empty">No registrations yet. Add students when WhatsApp messages arrive.</p>';
            return;
        }
        el.innerHTML = recent.map((e) => `
            <div class="template-block">
                <div class="template-block-head">
                    <span class="template-block-title">${escapeHtml(e.name)} · ${e.type === 'conference' ? 'Case Conference' : escapeHtml(e.course || 'Course')}</span>
                    <span class="status-badge status-badge--${e.status}">${e.status}</span>
                </div>
                <div class="template-preview">${escapeHtml(e.email)}${e.note ? `\n${escapeHtml(e.note)}` : ''}</div>
                <span class="template-vars">${formatDate(e.registeredAt)}</span>
            </div>
        `).join('');
    }

    function renderTemplates() {
        ['courseConfirm', 'caseConfirm', 'waitlist'].forEach((key) => {
            const ta = $(`#template_${key}`);
            if (ta) ta.value = settings.templates[key] || DEFAULT_TEMPLATES[key];
        });
    }

    function renderSessionsForm() {
        $('#settingZoomCase').value = settings.zoomCaseConference || '';
        $('#settingZoomFoundations').value = settings.zoomFoundations || '';
        $('#settingZoomDefault').value = settings.zoomDefault || '';
        $('#settingNextCaseDate').value = settings.nextCaseConferenceNote || '';
        $('#nextCaseDisplay').textContent = getNextCaseConferenceDate();
    }

    function renderAll() {
        renderStats();
        renderTable();
        renderRecent();
        renderSessionsForm();
        renderTemplates();
        populateCourseSelects();
    }

    function populateCourseSelects() {
        $$('.course-select').forEach((sel) => {
            const current = sel.value;
            sel.innerHTML = '<option value="">Select course</option>' +
                COURSES.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
            if (current) sel.value = current;
        });
        const filterCourse = $('#filterCourse');
        if (filterCourse) {
            filterCourse.innerHTML = '<option value="all">All courses</option>' +
                COURSES.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
        }
    }

    function switchPanel(panelId) {
        activePanel = panelId;
        $$('.admin-panel').forEach((p) => p.classList.toggle('active', p.id === `panel-${panelId}`));
        $$('.admin-nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.panel === panelId));
    }

    function exportCsv() {
        const headers = ['type', 'name', 'email', 'phone', 'course', 'note', 'status', 'registeredAt', 'confirmedAt'];
        const lines = [headers.join(',')];
        ledger.forEach((e) => {
            lines.push(headers.map((h) => `"${String(e[h] || '').replace(/"/g, '""')}"`).join(','));
        });
        const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `serenest-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        toast('CSV exported');
    }

    function showLogin() {
        $('#adminLogin').style.display = 'flex';
        $('#adminShell').classList.remove('active');
    }

    function showDashboard() {
        $('#adminLogin').style.display = 'none';
        $('#adminShell').classList.add('active');
        loadData();
        renderAll();
    }

    function bindEvents() {
        $('#adminLoginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const pin = $('#adminPin').value.trim();
            const err = $('#adminLoginError');
            if (pin === ADMIN_PIN) {
                sessionStorage.setItem(SESSION_KEY, '1');
                err.classList.remove('visible');
                showDashboard();
            } else {
                err.classList.add('visible');
            }
        });

        $('#btnLogout')?.addEventListener('click', () => {
            sessionStorage.removeItem(SESSION_KEY);
            showLogin();
        });

        $$('.admin-nav-btn').forEach((btn) => {
            btn.addEventListener('click', () => switchPanel(btn.dataset.panel));
        });

        $('#filterType')?.addEventListener('change', renderTable);
        $('#filterStatus')?.addEventListener('change', renderTable);
        $('#filterCourse')?.addEventListener('change', renderTable);
        $('#searchLedger')?.addEventListener('input', renderTable);

        $('#quickAddForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = $('#quickType').value;
            addEntry({
                type,
                name: $('#quickName').value.trim(),
                email: $('#quickEmail').value.trim(),
                phone: $('#quickPhone').value.trim(),
                course: type === 'course' ? $('#quickCourse').value : '',
                note: $('#quickNote').value.trim(),
                source: 'manual',
            });
            e.target.reset();
            $('#quickCourseWrap').style.display = type === 'course' ? '' : 'none';
        });

        $('#quickType')?.addEventListener('change', (e) => {
            $('#quickCourseWrap').style.display = e.target.value === 'course' ? '' : 'none';
        });

        $('#sessionsForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            settings.zoomCaseConference = $('#settingZoomCase').value.trim();
            settings.zoomFoundations = $('#settingZoomFoundations').value.trim();
            settings.zoomDefault = $('#settingZoomDefault').value.trim();
            settings.nextCaseConferenceNote = $('#settingNextCaseDate').value.trim();
            saveSettings();
            toast('Session settings saved');
        });

        $('#templatesForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            settings.templates.courseConfirm = $('#template_courseConfirm').value;
            settings.templates.caseConfirm = $('#template_caseConfirm').value;
            settings.templates.waitlist = $('#template_waitlist').value;
            saveSettings();
            toast('Templates saved');
        });

        $('#btnExportCsv')?.addEventListener('click', exportCsv);
    }

    document.addEventListener('DOMContentLoaded', () => {
        bindEvents();
        if (sessionStorage.getItem(SESSION_KEY) === '1') {
            showDashboard();
        } else {
            showLogin();
        }
    });
})();
