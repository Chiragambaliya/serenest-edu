/* ==========================================================================
   Serenest Education - Core Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Serenest Education scripts initialized.");

    const WHATSAPP_NUMBER = '917777636369';

    function openWhatsApp(message) {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    }

    function lastSaturdayOfMonth(year, month) {
        const date = new Date(year, month + 1, 0);
        const daysBack = (date.getDay() + 1) % 7;
        date.setDate(date.getDate() - daysBack);
        date.setHours(18, 0, 0, 0);
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
        return target;
    }

    const nextCaseEl = document.getElementById('nextCaseConferenceDate');
    if (nextCaseEl) {
        const nextDate = getNextCaseConferenceDate();
        nextCaseEl.textContent = `Next session · ${nextDate.toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })} · 6:00 PM IST`;
    }

    document.getElementById('heroWhatsAppBtn')?.addEventListener('click', () => {
        openWhatsApp([
            'Hi Serenest Education,',
            '',
            'I would like to join your free clinical training programmes.',
            '',
            'Please share upcoming cohort dates and the Case Conference Zoom link.',
        ].join('\n'));
    });

    document.getElementById('whatsappFab')?.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp('Hi Serenest Education, I have a question about your clinical training programmes.');
    });

    // ==========================================================================
    // 1. SPA View Port Switching
    // ==========================================================================
    const tabs = document.querySelectorAll('.nav-tab-btn');
    const viewports = document.querySelectorAll('.viewport-tab');

    function switchViewport(targetTabId) {
        tabs.forEach(t => {
            const isActive = t.getAttribute('data-tab') === targetTabId;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        viewports.forEach(viewport => {
            const isActive = viewport.id === `viewport-${targetTabId}`;
            viewport.classList.toggle('active', isActive);
            viewport.hidden = !isActive;
            viewport.inert = !isActive;
            if (isActive) {
                document.body.setAttribute('data-page', viewport.getAttribute('data-page') || targetTabId);
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('brandLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        switchViewport('home');
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            switchViewport(target);
        });
    });

    // Anchor Trigger Links (e.g. "Access Student Resources" hero button switching to Library)
    document.querySelectorAll('.nav-switch-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const target = trigger.getAttribute('data-target');
            switchViewport(target);
        });
    });

    // Footer triggers
    document.querySelectorAll('.active-tab-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const target = trigger.getAttribute('data-target');
            switchViewport(target);
        });
    });

    // ==========================================================================
    // 2. Expandable Course Syllabus Accordion drawers
    // ==========================================================================
    const courseItems = document.querySelectorAll('.course-item');

    courseItems.forEach(item => {
        const toggleBtn = item.querySelector('.btn-toggle-syllabus');
        const courseId = item.getAttribute('data-course-id');
        const drawer = item.querySelector(`#drawer-${courseId}`);

        if (toggleBtn && drawer) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Avoid triggering any row event
                
                const isOpen = drawer.classList.contains('open');
                
                // Toggle state
                if (isOpen) {
                    drawer.classList.remove('open');
                    toggleBtn.textContent = "View Syllabus";
                } else {
                    drawer.classList.add('open');
                    toggleBtn.textContent = "Close Syllabus";
                }
            });
        }
    });

    // ==========================================================================
    // 3. Modal Dialog Controls (Backdrop overlay trigger actions)
    // ==========================================================================
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalCards = document.querySelectorAll('.modal-card');

    function openModal(modalId) {
        modalBackdrop.classList.add('open');
        modalCards.forEach(card => card.classList.remove('active'));
        
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.classList.add('active');
        }
    }

    function closeModal() {
        modalBackdrop.classList.remove('open');
        modalCards.forEach(card => card.classList.remove('active'));
    }

    // Connect close buttons inside modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close on backdrop overlay click (except clicking card content)
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
            closeModal();
        }
    });

    // Ensure initial viewport state is consistent
    viewports.forEach(viewport => {
        const isActive = viewport.classList.contains('active');
        viewport.hidden = !isActive;
        viewport.inert = !isActive;
    });

    // RCI Entrance quiz triggers
    document.getElementById('btnLaunchRCIWizard').addEventListener('click', () => {
        resetRCIWizard();
        openModal('rciNavigatorModal');
    });

    // MSE Practice simulator triggers
    document.getElementById('btnLaunchMSESimulator').addEventListener('click', () => {
        resetMSESimulator();
        openModal('mseSimulatorModal');
    });

    // Internship table triggers
    document.getElementById('btnOpenInternships').addEventListener('click', () => {
        renderInternships();
        openModal('internshipsModal');
    });

    // Caseload calculator triggers
    document.getElementById('btnOpenCaseloadCalculator').addEventListener('click', () => {
        openModal('caseloadCalculatorModal');
        calculateCaseload();
    });

    // Collaboration forms triggers
    document.getElementById('btnTalkToUs').addEventListener('click', () => {
        openModal('institutionalModal');
    });
    document.getElementById('footBtnInstitutions').addEventListener('click', () => {
        openModal('institutionalModal');
    });
    document.getElementById('footBtnFaculty').addEventListener('click', () => {
        openModal('institutionalModal');
    });

    // ==========================================================================
    // 4. RCI Licensing Pathway Navigator Quiz Wizard
    // ==========================================================================
    let rciResponses = { undergrad: '', clinicalGoal: '' };
    const wizardSteps = document.querySelectorAll('.wizard-step');

    function resetRCIWizard() {
        rciResponses = { undergrad: '', clinicalGoal: '' };
        wizardSteps.forEach(s => s.classList.remove('active'));
        document.querySelector('.wizard-step[data-step="1"]').classList.add('active');
    }

    // Capture Step Option Selects
    document.querySelectorAll('.wizard-step[data-step="1"] .wizard-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            rciResponses.undergrad = btn.getAttribute('data-val');
            
            // Advance to Step 2
            wizardSteps.forEach(s => s.classList.remove('active'));
            document.querySelector('.wizard-step[data-step="2"]').classList.add('active');
        });
    });

    document.querySelectorAll('.wizard-step[data-step="2"] .wizard-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            rciResponses.clinicalGoal = btn.getAttribute('data-val');
            
            // Advance to Step 3 and calculate Output
            wizardSteps.forEach(s => s.classList.remove('active'));
            document.querySelector('.wizard-step[data-step="3"]').classList.add('active');
            
            evaluateRCIRoadmap();
        });
    });

    document.getElementById('btnRestartWizard').addEventListener('click', resetRCIWizard);
    document.getElementById('btnCloseWizard').addEventListener('click', closeModal);

    function evaluateRCIRoadmap() {
        const roadmapBox = document.getElementById('rciRoadmapOutput');
        let title = "Your Custom RCI Pathway";
        let description = "";
        let steps = [];

        const u = rciResponses.undergrad;
        const c = rciResponses.clinicalGoal;

        if (c === 'counselor') {
            title = "Counseling Psychologist Route (Non-RCI)";
            description = "To practice counseling therapy, school mental wellness, and general wellness support in India, you do NOT legally require RCI registration. RCI licenses specifically cover clinical pathology and assessments.";
            steps = [
                "Complete your current degree (B.A. / M.A. Psychology).",
                "Ensure you hold at least a Master's degree (M.A. or M.Sc.) in Counseling or Psychology.",
                "Seek clinical supervision hours with senior counselors.",
                "Register solo practice or join mental wellness agencies."
            ];
        } else if (u === 'mphil' && c === 'rci-licensed') {
            title = "Direct RCI Clinical Registration";
            description = "Excellent. You already hold an M.Phil in Clinical Psychology. You are eligible for direct registration.";
            steps = [
                "Submit your credentials (accredited college M.Phil transcript) to the Rehabilitation Council of India (RCI).",
                "Receive your CRR registration number to legally sign clinical diagnosis reports and conduct independent psychotherapy in India."
            ];
        } else if (c === 'rci-licensed') {
            title = "RCI Registered Clinical Psychologist Pathway";
            description = "To independent diagnose clinical disorders and practice clinically in India, you must secure an RCI CRR license number. RCI regulations dictate specialized post-graduate clinical coursework.";
            if (u === 'undergrad') {
                steps = [
                    "Complete your Bachelor's degree (B.A. / B.Sc.) with excellent grades.",
                    "Pursue a Master's degree (M.A. / M.Sc.) specifically in Clinical Psychology.",
                    "Prepare for and clear RCI-entrance exams at NIMHANS, IHBAS, CIP, or other RCI-accredited colleges.",
                    "Complete either a 2-year M.Phil in Clinical Psychology or the new 4-year Psy.D program.",
                    "Apply to RCI for your CRR licensed psychologist registration."
                ];
            } else {
                steps = [
                    "With your current Master's degree, sit for RCI M.Phil Clinical Psychology entrance exams (IHBAS, NIMHANS, CIP, etc.).",
                    "Complete a 2-year RCI-accredited M.Phil in Clinical Psychology program.",
                    "Submit your transcript to RCI to receive your licensed CRR therapist number."
                ];
            }
        } else if (c === 'associate') {
            title = "RCI Associate Clinical Psychologist Pathway";
            description = "If you want RCI registration but cannot invest in a full 2-year M.Phil, you can pursue RCI's Associate Clinical Psychologist license title.";
            if (u === 'undergrad') {
                steps = [
                    "Complete your current undergraduate studies.",
                    "Pursue a Master's degree (M.A. / M.Sc.) in Clinical Psychology.",
                    "Apply for RCI's 1-year Professional Diploma in Clinical Psychology (PDCP) at an accredited institute.",
                    "Complete the diploma and register with RCI as an Associate Clinical Psychologist."
                ];
            } else {
                steps = [
                    "Since you hold a Master's, apply directly for a 1-year RCI-accredited Professional Diploma in Clinical Psychology (PDCP).",
                    "Complete the 1-year training and apply to RCI for your Associate Psychologist CRR license."
                ];
            }
        }

        // Render HTML output
        roadmapBox.innerHTML = `
            <h5>${title}</h5>
            <p>${description}</p>
            <ol>
                ${steps.map(s => `<li>${s}</li>`).join('')}
            </ol>
        `;
    }

    // ==========================================================================
    // 5. Interactive Mental Status Examination (MSE) Simulator
    // ==========================================================================
    const msePracticeForm = document.getElementById('msePracticeForm');
    const mseExpertFeedback = document.getElementById('mseExpertFeedback');
    const userObservationsCopyText = document.getElementById('userObservationsCopyText');

    function resetMSESimulator() {
        msePracticeForm.reset();
        mseExpertFeedback.classList.remove('active');
        msePracticeForm.querySelectorAll('.form-checkbox-group').forEach((group) => {
            group.classList.remove('marker-correct', 'marker-missed', 'marker-incorrect');
        });
        const scoreEl = document.getElementById('mseScoreSummary');
        if (scoreEl) scoreEl.textContent = '';
    }

    msePracticeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userText = document.getElementById('mseObservationsReport').value.trim();
        userObservationsCopyText.textContent = userText || 'No clinical report text entered.';

        const correctMarkers = new Set([
            'psychomotor-agitation',
            'pressured-speech',
            'hypervigilance',
        ]);
        const selected = [...msePracticeForm.querySelectorAll('input[name="marker"]:checked')].map(
            (el) => el.value
        );

        msePracticeForm.querySelectorAll('.form-checkbox-group').forEach((group) => {
            group.classList.remove('marker-correct', 'marker-missed', 'marker-incorrect');
            const input = group.querySelector('input[name="marker"]');
            if (!input) return;
            const val = input.value;
            const checked = input.checked;
            if (correctMarkers.has(val) && checked) {
                group.classList.add('marker-correct');
            } else if (correctMarkers.has(val) && !checked) {
                group.classList.add('marker-missed');
            } else if (!correctMarkers.has(val) && checked) {
                group.classList.add('marker-incorrect');
            }
        });

        const scoreEl = document.getElementById('mseScoreSummary');
        const hits = selected.filter((v) => correctMarkers.has(v)).length;
        const falsePos = selected.filter((v) => !correctMarkers.has(v)).length;
        const missed = [...correctMarkers].filter((v) => !selected.includes(v)).length;
        if (scoreEl) {
            scoreEl.textContent = `${hits}/3 markers identified · ${falsePos} incorrect · ${missed} missed`;
        }

        mseExpertFeedback.classList.add('active');
        mseExpertFeedback.scrollIntoView({ behavior: 'smooth' });
    });

    // ==========================================================================
    // 6. Verified Clinical Internship Directory & Search filters
    // ==========================================================================
    const internshipsData = [
        { name: 'NIMHANS, Outpatient Observer Division', city: 'Bangalore, Karnataka', focus: 'Adult psychiatry, neuropsychological assessment', standard: 'RCI & Government Hospital', duration: '1 Month / 10 seats' },
        { name: 'IHBAS, Clinical Observership Board', city: 'Delhi (NCR)', focus: 'Outpatient intake, severe mental illnesses', standard: 'RCI & State Hospital', duration: '3 Months / 15 seats' },
        { name: 'Central Institute of Psychiatry (CIP)', city: 'Ranchi, Jharkhand', focus: 'Inpatient rounds, forensic psychiatry exposure', standard: 'RCI Government Hospital', duration: '2 Months / 12 seats' },
        { name: 'Rudra Neuropsychiatry & De-addiction Hospital', city: 'Deesa, Gujarat', focus: 'Addiction recovery, somatic mapping, patient rounds', standard: 'Private Clinic / Hospital', duration: '2 Months / 5 seats' },
        { name: 'Mpower Mind Temple Outpatient Clinic', city: 'Mumbai, Maharashtra', focus: 'Child & adolescent counseling, psychoeducation', standard: 'Private Clinic Network', duration: '1 Month / 8 seats' },
        { name: 'National Institute for Empowerment (NIEPMD)', city: 'Chennai, Tamil Nadu', focus: 'Developmental diagnostics, cognitive testing', standard: 'Government NGO Hub', duration: '3 Months / 20 seats' },
        { name: 'Cadabams Rehabilitation Center', city: 'Bangalore, Karnataka', focus: 'Chronic rehabilitation, family counseling', standard: 'Private Rehab Center', duration: '6 Months / 12 seats' },
        { name: 'Aarohan Outpatient Counseling NGOs', city: 'Pune, Maharashtra', focus: 'Crisis lines, community mental wellness', standard: 'Supervised NGO Board', duration: '3 Months / 25 seats' },
        { name: 'Lokopriyo Gopinath Bordoloi Regional Institute', city: 'Guwahati, Assam', focus: 'Community psychiatry, regional language cases', standard: 'State Medical College', duration: '2 Months / 8 seats' },
        { name: 'King Edward Memorial (KEM) Psychiatry Unit', city: 'Mumbai, Maharashtra', focus: 'Emergency psychiatry, ward observation', standard: 'Government Teaching Hospital', duration: '1 Month / 6 seats' },
        { name: 'NIMHANS Centre for Wellbeing', city: 'Bangalore, Karnataka', focus: 'Digital mental health, brief interventions', standard: 'RCI Accredited', duration: '1 Month / 10 seats' },
        { name: 'Schizophrenia Research Foundation (SCARF)', city: 'Chennai, Tamil Nadu', focus: 'Psychosocial rehabilitation, family therapy', standard: 'NGO / Research Centre', duration: '3 Months / 15 seats' },
        { name: 'Institute of Human Behaviour & Allied Sciences', city: 'Delhi (NCR)', focus: 'Severe mental disorders, legal psychiatry', standard: 'State Hospital', duration: '2 Months / 10 seats' },
        { name: 'Ahmedabad Mental Health Hospital', city: 'Ahmedabad, Gujarat', focus: 'Inpatient observation, MHCA documentation', standard: 'Government Hospital', duration: '2 Months / 8 seats' },
        { name: 'Manipal College of Health Professions', city: 'Manipal, Karnataka', focus: 'Academic clinic, structured supervision', standard: 'University Hospital', duration: '3 Months / 12 seats' },
        { name: 'Vandrevala Foundation Crisis Centre', city: 'Mumbai, Maharashtra', focus: 'Crisis counseling, helpline shadowing', standard: 'NGO Supervised', duration: '1 Month / 20 seats' },
        { name: 'NIMHANS Digital Academy Observership', city: 'Bangalore, Karnataka', focus: 'Telepsychiatry observation, digital intake', standard: 'RCI Accredited', duration: '1 Month / 15 seats' },
        { name: 'Hyderabad Institute of Mental Health', city: 'Hyderabad, Telangana', focus: 'Outpatient CBT, anxiety disorders clinic', standard: 'Private Institute', duration: '2 Months / 6 seats' },
        { name: 'Kolkata Pavlov Hospital Outpatient', city: 'Kolkata, West Bengal', focus: 'Mood disorders, Bengali-language cases', standard: 'State Hospital', duration: '2 Months / 10 seats' },
        { name: 'Jaipur Mansarovar Mental Health Centre', city: 'Jaipur, Rajasthan', focus: 'Rural outreach, community camps', standard: 'State Programme', duration: '1 Month / 12 seats' },
    ];

    const internshipTableBody = document.getElementById('internshipTableBody');
    const internshipSearch = document.getElementById('internshipSearch');

    function renderInternships(filterText = "") {
        internshipTableBody.innerHTML = '';
        
        const filtered = internshipsData.filter(item => {
            const term = filterText.toLowerCase();
            return item.name.toLowerCase().includes(term) || 
                   item.city.toLowerCase().includes(term) || 
                   item.focus.toLowerCase().includes(term);
        });

        if (filtered.length === 0) {
            internshipTableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: var(--ink-light); padding: 40px 0;">
                        No clinical training centers matching your filter. Try "Mumbai" or "NIMHANS".
                    </td>
                </tr>
            `;
            return;
        }

        filtered.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td>${item.city}</td>
                <td>${item.focus}</td>
                <td><span class="mono" style="font-size:10px; color:var(--sage-dark)">${item.standard}</span></td>
                <td>${item.duration}</td>
            `;
            internshipTableBody.appendChild(tr);
        });
    }

    internshipSearch.addEventListener('input', (e) => {
        renderInternships(e.target.value);
    });

    // ==========================================================================
    // 7. Practice Fee & Caseload Calculator Math
    // ==========================================================================
    const calcTargetIncome = document.getElementById('calcTargetIncome');
    const calcSessionFee = document.getElementById('calcSessionFee');
    const calcSupervisionCost = document.getElementById('calcSupervisionCost');
    const calcRentCost = document.getElementById('calcRentCost');

    const labelTargetIncome = document.getElementById('labelTargetIncome');
    const labelSessionFee = document.getElementById('labelSessionFee');
    const labelSupervisionCost = document.getElementById('labelSupervisionCost');
    const labelRentCost = document.getElementById('labelRentCost');

    const outputWeeklyClients = document.getElementById('outputWeeklyClients');
    const outputGrossRevenue = document.getElementById('outputGrossRevenue');

    function calculateCaseload() {
        const income = parseFloat(calcTargetIncome.value);
        const fee = parseFloat(calcSessionFee.value);
        const supervision = parseFloat(calcSupervisionCost.value);
        const rent = parseFloat(calcRentCost.value);

        // Update Slider Labels
        labelTargetIncome.textContent = income.toLocaleString('en-IN');
        labelSessionFee.textContent = fee.toLocaleString('en-IN');
        labelSupervisionCost.textContent = supervision.toLocaleString('en-IN');
        labelRentCost.textContent = rent.toLocaleString('en-IN');

        // Math: Net profit target = Gross - Overhead
        // Monthly Net profit targeted = TargetIncome
        // Gross Required = targetIncome + supervision + rent
        const grossRequired = income + supervision + rent;

        // Sessions per month required = Gross Required / Session Fee
        const totalSessionsRequired = Math.ceil(grossRequired / fee);

        // Weekly Caseload required = totalSessionsRequired / 4 weeks
        const weeklyClients = Math.ceil(totalSessionsRequired / 4);

        // Render Outputs
        outputWeeklyClients.textContent = `${weeklyClients} Clients / week`;
        outputGrossRevenue.textContent = grossRequired.toLocaleString('en-IN');
    }

    // Connect slider listeners
    calcTargetIncome.addEventListener('input', calculateCaseload);
    calcSessionFee.addEventListener('input', calculateCaseload);
    calcSupervisionCost.addEventListener('input', calculateCaseload);
    calcRentCost.addEventListener('input', calculateCaseload);

    const tierPresets = {
        1: { income: 120000, fee: 2500, supervision: 12000, rent: 25000 },
        2: { income: 75000, fee: 1500, supervision: 8000, rent: 12000 },
        3: { income: 45000, fee: 800, supervision: 5000, rent: 6000 },
    };

    document.querySelectorAll('.calc-tier-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const tier = btn.getAttribute('data-tier');
            const preset = tierPresets[tier];
            if (!preset) return;
            calcTargetIncome.value = preset.income;
            calcSessionFee.value = preset.fee;
            calcSupervisionCost.value = preset.supervision;
            calcRentCost.value = preset.rent;
            document.querySelectorAll('.calc-tier-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            calculateCaseload();
        });
    });

    // ==========================================================================
    // 8. General Document Viewer (Consent sheets & suicide checklists)
    // ==========================================================================
    const btnCopyDocument = document.getElementById('btnCopyDocument');
    const btnPrintDocument = document.getElementById('btnPrintDocument');
    const docViewerTitle = document.getElementById('docViewerTitle');
    const docViewerCategory = document.getElementById('docViewerCategory');
    const docViewerBody = document.getElementById('docViewerBody');

    const documentAssets = {
        consent: {
            category: "Clinical Form Template",
            title: "Outpatient & Telehealth Clinical Informed Consent Agreement",
            body: `INFORMED CONSENT FOR PSYCHOTHERAPY & COUNSELING SERVICES
Under Mental Healthcare Act 2017 & MCI Telemedicine Guidelines 2020

1. PURPOSE AND NATURE OF SERVICES
Clinical therapy is a collaborative process designed to help you understand your emotional distress, somatic manifestations, and relationship dynamics. We practice evidence-based interventions (CBT, ACT, Family Systems). 

2. TELEHEALTH SERVICES (ONLINE THERAPY)
If therapy is conducted online, services are rendered under the MCI Telemedicine Guidelines 2020. You must ensure you are in a quiet, private cabin during sessions. You must provide a secondary emergency contact number.

3. CONFIDENTIALITY & LEGAL COMPLIANCE
Under the Mental Healthcare Act (MHCA) 2017, all communications are strictly confidential, EXCEPT under the following legal conditions:
- If you indicate active intent to harm yourself or others.
- If there is an ongoing threat of abuse to children or vulnerable dependents.
- If summoned by a Court of Law in legal proceedings.

4. CANCELLATIONS & SESSION RATES
Sessions run for 50 minutes. Cancellations must be made at least 24 hours in advance, or the session will be invoiced at the standard rate.

CLIENT ACKNOWLEDGEMENT
By signing below, you acknowledge understanding these terms, financial boundaries, and crisis safety conditions.

Client Signature: _______________________ Date: _________________`
        },
        suicideRisk: {
            category: 'Crisis Safety Checklist',
            title: 'Suicide Risk Assessment & Outpatient Safety Plan Checklist',
            body: `CLINICAL CRISIS SAFETY SHEET & SUICIDE RISK ROADMAP
Aligned with the Safety Protections of MHCA 2017

I. PRIMARY CRISIS RISK ASSESSMENT
Check for risk indicators:
[ ] Active suicidal ideation with details of plans/means.
[ ] Severe feeling of hopelessness or deep somatic distress (Mann ghabrana).
[ ] History of impulsive behaviors or prior suicide attempts.
[ ] Lack of immediate support systems (family or local emergency contacts).

II. INTERACTION STEP 1: SAFETY PLANNING AGREEMENT
If risk is outpatient-manageable (low to moderate), construct a safety plan directly with the client:
1. List 3 primary personal warning signs (e.g. rapid breathing, isolation, pacing).
2. List 3 personalized coping mechanisms (e.g. deep box breathing, drinking water, somatic grounding).
3. Identify 2 support numbers (e.g. trusted parents/friends in India).
4. Identify 2 official mental health crisis lines (e.g. Tele-MANAS helpline: 14416 / Vandrevala Foundation).

III. LEGAL CLINIC PROTECTION DOCUMENTATION
Under Section 21 of the Mental Healthcare Act 2017, individuals who attempt suicide are presumed to be under extreme stress and shall not be prosecuted under the Indian Penal Code. Your role is strictly clinical support:
- Secure and store a signed crisis safety plan.
- Inform their designated representative (usually parents or family).
- Document your risk assessment with precise dates and clinical steps.`,
        },
        dsm5: {
            category: 'Exam Prep Reference',
            title: 'DSM-5-TR Diagnostic Criteria Quick Reference (M.Phil / RCI)',
            body: `DSM-5-TR DIAGNOSTIC THRESHOLDS — CLINICAL QUICK REFERENCE

MAJOR DEPRESSIVE EPISODE (MDE)
≥5 symptoms for ≥2 weeks; must include (1) depressed mood OR (2) anhedonia:
- Sleep disturbance, fatigue, guilt, concentration difficulty, psychomotor changes, suicidal ideation.

GENERALIZED ANXIETY DISORDER (GAD)
Excessive anxiety/worry ≥6 months, difficult to control, plus ≥3:
- Restlessness, fatigue, concentration problems, irritability, muscle tension, sleep disturbance.

PANIC DISORDER
Recurrent unexpected panic attacks + ≥1 month of persistent concern or maladaptive avoidance.

PTSD (simplified)
Exposure to trauma + intrusion symptoms + avoidance + negative cognitions/mood + arousal/reactivity (duration >1 month, functional impairment).

ADHD — COMBINED PRESENTATION
≥6 inattention AND ≥6 hyperactivity-impulsivity symptoms (≥5 if age 17+), present before age 12, in ≥2 settings.

SCHIZOPHRENIA (brief)
≥2 for ≥1 month (or less if treated): delusions, hallucinations, disorganized speech, grossly disorganized behavior, negative symptoms. One must be delusions, hallucinations, or disorganized speech.

NOTE FOR INDIAN CLINICAL PRACTICE
Always document idioms of distress (somatic complaints, family-system stressors) alongside DSM criteria. RCI exams expect ICD-11 alignment awareness alongside DSM-5-TR frameworks.`,
        },
        mphilPrep: {
            category: 'Entrance Exam Prep',
            title: 'M.Phil Clinical Psychology — Sample Solved MCQ (NIMHANS-style)',
            body: `M.PHIL ENTRANCE PREP CHEST — SAMPLE SOLVED ITEMS

Q1. A 24-year-old reports "mann ghabrana" with chest tightness, no organic findings. Best first formulation step?
A) Immediate antipsychotic referral
B) Rule out panic disorder; assess somatic idioms of distress ✓
C) Diagnose schizophrenia
D) Family systems therapy only
Rationale: Somatic idioms are common in Indian outpatient settings; structured anxiety assessment precedes psychotic differentials.

Q2. Under MHCA 2017, advance directive for mental health treatment can be:
A) Registered with the Mental Health Review Board ✓
B) Filed only with police
C) Not recognized in India
D) Valid only for 30 days
Rationale: Section 5 allows registered advance directives with specified conditions.

Q3. RCI Associate Clinical Psychologist pathway typically requires:
A) B.A. Psychology only
B) PDCP (Professional Diploma in Clinical Psychology) from RCI-accredited institute ✓
C) MBBS degree
D) Social work diploma only

Q4. Telemedicine Guidelines 2020 require for first consultation:
A) Verbal consent only, no documentation
B) Patient identity verification and informed consent documentation ✓
C) Physical examination mandatory
D) Prescription of Schedule X drugs freely

Q5. In joint-family systems, enmeshment is best described as:
A) Healthy interdependence always
B) Blurred boundaries where individual autonomy is subsumed by family demands ✓
C) Identical to Western individuation norms
D) Not relevant to Indian therapy

Use with DSM-5 cheat sheet and intake templates for full exam preparation.`,
        },
    };

    function openDocumentViewer(assetId) {
        const doc = documentAssets[assetId];
        if (!doc) return;

        docViewerCategory.textContent = doc.category;
        docViewerTitle.textContent = doc.title;
        docViewerBody.textContent = doc.body;

        openModal('documentViewerModal');
    }

    // Connect trigger buttons
    document.getElementById('btnOpenConsentTemplate').addEventListener('click', () => {
        openDocumentViewer('consent');
    });
    document.getElementById('btnOpenSuicideGuide').addEventListener('click', () => {
        openDocumentViewer('suicideRisk');
    });
    document.getElementById('btnOpenDsm5Sheet').addEventListener('click', () => {
        openDocumentViewer('dsm5');
    });
    document.getElementById('btnOpenMphilPrep').addEventListener('click', () => {
        openDocumentViewer('mphilPrep');
    });

    // Copy to clipboard logic
    btnCopyDocument.addEventListener('click', () => {
        const text = docViewerBody.textContent;
        navigator.clipboard.writeText(text).then(() => {
            btnCopyDocument.textContent = "Copied ✓";
            setTimeout(() => {
                btnCopyDocument.textContent = "Copy Content";
            }, 2000);
        }).catch(err => {
            console.error("Clipboard copy failed.", err);
        });
    });

    // Native browser print sheet trigger
    btnPrintDocument.addEventListener('click', () => {
        window.print();
    });

    // ==========================================================================
    // 9. Resource Library Search & Category Filters
    // ==========================================================================
    const librarySearchInput = document.getElementById('librarySearchInput');
    const filterChips = document.querySelectorAll('.filter-chip');
    const librarySubnavBtns = document.querySelectorAll('.library-subnav-btn');
    const libraryItems = document.querySelectorAll('.library-item-card');

    let currentFilterCategory = 'all';
    let currentSearchText = '';

    function filterLibraryItems() {
        libraryItems.forEach((item) => {
            const category = item.getAttribute('data-category');
            const title = item.querySelector('.item-title').textContent.toLowerCase();
            const desc = item.querySelector('.item-desc').textContent.toLowerCase();

            const matchCategory = currentFilterCategory === 'all' || category === currentFilterCategory;
            const matchSearch = title.includes(currentSearchText) || desc.includes(currentSearchText);

            item.style.display = matchCategory && matchSearch ? 'flex' : 'none';
        });
    }

    function setLibraryFilter(category) {
        currentFilterCategory = category;
        filterChips.forEach((c) => {
            c.classList.toggle('active', c.getAttribute('data-filter') === category);
        });
        librarySubnavBtns.forEach((b) => {
            b.classList.toggle('active', b.getAttribute('data-library-section') === category);
        });
        filterLibraryItems();
    }

    // Category chips listeners
    filterChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            setLibraryFilter(chip.getAttribute('data-filter'));
        });
    });

    librarySubnavBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            setLibraryFilter(btn.getAttribute('data-library-section'));
        });
    });

    // Search input listener
    librarySearchInput.addEventListener('input', (e) => {
        currentSearchText = e.target.value.toLowerCase();
        filterLibraryItems();
    });

    // ==========================================================================
    // 10. Somatic Guided Breathing Grounding Bubble (Sanctuary)
    // ==========================================================================
    const sanctuaryBubble = document.getElementById('sanctuaryBubble');
    const sanctuaryHalo = document.getElementById('sanctuaryHalo');
    const sanctuaryBreatheText = document.getElementById('sanctuaryBreatheText');
    const btnSanctuaryBreatheToggle = document.getElementById('btnSanctuaryBreatheToggle');

    let sanctuaryBreatheInterval = null;
    let isSanctuaryBreatheActive = false;
    let sanctuaryStep = 0;

    // Pacing rules: Inhale (4s) -> Hold (4s) -> Exhale (4s) -> Hold (4s)
    const sanctuaryBreatheSteps = [
        { text: "Inhale", duration: 4, haloScale: 1.35, bubbleScale: 1.35 },
        { text: "Hold", duration: 4, haloScale: 1.35, bubbleScale: 1.35 },
        { text: "Exhale", duration: 4, haloScale: 0.95, bubbleScale: 0.95 },
        { text: "Hold", duration: 4, haloScale: 0.95, bubbleScale: 0.95 }
    ];

    function runSanctuaryBreatheCycle() {
        if (!isSanctuaryBreatheActive) return;

        const currentStep = sanctuaryBreatheSteps[sanctuaryStep];
        
        // Update labels
        sanctuaryBreatheText.textContent = currentStep.text;
        
        // Apply scales variables
        document.documentElement.style.setProperty('--halo-scale', currentStep.haloScale);
        document.documentElement.style.setProperty('--bubble-scale', currentStep.bubbleScale);

        // Transition duration adjustment
        sanctuaryBubble.style.transition = `transform ${currentStep.duration}s cubic-bezier(0.4, 0, 0.2, 1)`;
        sanctuaryHalo.style.transition = `transform ${currentStep.duration}s cubic-bezier(0.4, 0, 0.2, 1)`;

        sanctuaryBreatheInterval = setTimeout(() => {
            sanctuaryStep = (sanctuaryStep + 1) % sanctuaryBreatheSteps.length;
            runSanctuaryBreatheCycle();
        }, currentStep.duration * 1000);
    }

    function toggleSanctuaryBreathe() {
        if (isSanctuaryBreatheActive) {
            // Stop Pacing
            clearTimeout(sanctuaryBreatheInterval);
            isSanctuaryBreatheActive = false;
            sanctuaryStep = 0;

            // Reset Bubble
            document.documentElement.style.setProperty('--halo-scale', 1.0);
            document.documentElement.style.setProperty('--bubble-scale', 1.0);
            sanctuaryBubble.style.transition = `transform 1.5s ease`;
            sanctuaryHalo.style.transition = `transform 1.5s ease`;
            sanctuaryBreatheText.textContent = "Start";
            btnSanctuaryBreatheToggle.textContent = "Start Grounding";
            btnSanctuaryBreatheToggle.classList.remove('btn-primary');
            btnSanctuaryBreatheToggle.classList.add('btn-secondary');
        } else {
            // Start Pacing
            isSanctuaryBreatheActive = true;
            sanctuaryStep = 0;
            btnSanctuaryBreatheToggle.textContent = "Stop Grounding";
            btnSanctuaryBreatheToggle.classList.remove('btn-secondary');
            btnSanctuaryBreatheToggle.classList.add('btn-primary');
            runSanctuaryBreatheCycle();
        }
    }

    btnSanctuaryBreatheToggle.addEventListener('click', toggleSanctuaryBreathe);

    // ==========================================================================
    // 11. Emotional Vent Text Dissolving & Particle Physics
    // ==========================================================================
    const ventTextArea = document.getElementById('ventTextArea');
    const btnReleaseVent = document.getElementById('btnReleaseVent');
    const ventParticles = document.getElementById('ventParticles');

    function createDissolutionParticles() {
        const count = 60;
        const rect = ventTextArea.getBoundingClientRect();
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            
            // Random distribution within the text area bounds
            const px = Math.random() * rect.width;
            const py = Math.random() * rect.height;
            
            particle.style.left = `${px}px`;
            particle.style.top = `${py}px`;
            
            // Random direction offsets (blowing upwards and right)
            const dx = (Math.random() * 250 - 50) + 'px';
            const dy = (Math.random() * -300 - 50) + 'px';
            
            particle.style.setProperty('--x', dx);
            particle.style.setProperty('--y', dy);

            // Add delay
            particle.style.animationDelay = (Math.random() * 0.4) + 's';
            
            ventParticles.appendChild(particle);

            // Remove node after animation completes
            setTimeout(() => {
                particle.remove();
            }, 2500);
        }
    }

    btnReleaseVent.addEventListener('click', () => {
        const ventText = ventTextArea.value.trim();
        if (!ventText) return;

        // 1. Trigger text fadeout CSS transitions
        ventTextArea.classList.add('dissolving');

        // 2. Play particle wind simulation
        createDissolutionParticles();

        // 3. Clear text after complete fadeout
        setTimeout(() => {
            ventTextArea.value = '';
            ventTextArea.classList.remove('dissolving');
        }, 1800);
    });

    // ==========================================================================
    // 12. Monthly Case Conference seat registrations Form Submit
    // ==========================================================================
    const caseSignupForm = document.getElementById('caseSignupForm');
    const caseNameInput = document.getElementById('caseName');
    const caseEmailInput = document.getElementById('caseEmail');
    const btnCaseSubmit = document.getElementById('btnCaseSubmit');
    const signupSuccessNote = document.getElementById('signupSuccessNote');

    caseSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = caseNameInput.value.trim();
        const email = caseEmailInput.value.trim();
        if (!name || !email) return;

        const message = [
            'Hi Serenest Education,',
            '',
            'I would like to reserve a seat for the Monthly Case Conference (free).',
            '',
            `Name: ${name}`,
            `Email: ${email}`,
        ].join('\n');

        openWhatsApp(message);

        btnCaseSubmit.textContent = 'WhatsApp opened ✓';
        btnCaseSubmit.classList.add('done');
        caseNameInput.disabled = true;
        caseEmailInput.disabled = true;

        signupSuccessNote.textContent = 'Tap Send in WhatsApp to confirm your seat. We will reply with the Zoom link.';
        signupSuccessNote.style.display = 'block';

        let list = JSON.parse(localStorage.getItem('serenest_registered_emails')) || [];
        list.push({ name, email, registeredAt: new Date().toISOString() });
        localStorage.setItem('serenest_registered_emails', JSON.stringify(list));
    });

    // Institutional Inquiry submission handlers
    const contactFormSubmit = document.getElementById('contactFormSubmit');
    const contactSuccessNote = document.getElementById('contactSuccessNote');

    contactFormSubmit.addEventListener('submit', (e) => {
        e.preventDefault();

        const org = document.getElementById('institutionName')?.value.trim();
        const email = document.getElementById('institutionEmail')?.value.trim();
        const details = document.getElementById('institutionDetails')?.value.trim();
        if (!org || !email || !details) return;

        const message = [
            'Hi Serenest Education,',
            '',
            'Institutional / collaboration inquiry:',
            '',
            `Organization: ${org}`,
            `Email: ${email}`,
            '',
            'Details:',
            details,
        ].join('\n');

        openWhatsApp(message);

        contactFormSubmit.style.display = 'none';
        contactSuccessNote.style.display = 'block';
    });

    // ==========================================================================
    // 13. Free course registration (no payment)
    // ==========================================================================
    const courseRegisterForm = document.getElementById('courseRegisterForm');
    const courseRegisterTitle = document.getElementById('courseRegisterTitle');
    const courseRegisterSuccess = document.getElementById('courseRegisterSuccess');
    const btnCourseRegisterSubmit = document.getElementById('btnCourseRegisterSubmit');
    let activeCourseName = '';

    document.querySelectorAll('.btn-register-course').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCourseName = btn.getAttribute('data-course') || 'Serenest Education programme';
            courseRegisterTitle.textContent = activeCourseName;
            courseRegisterForm.style.display = '';
            courseRegisterSuccess.style.display = 'none';
            courseRegisterForm.reset();
            btnCourseRegisterSubmit.textContent = 'Send registration on WhatsApp';
            btnCourseRegisterSubmit.disabled = false;
            openModal('courseRegisterModal');
        });
    });

    courseRegisterForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('courseRegisterName')?.value.trim();
        const email = document.getElementById('courseRegisterEmail')?.value.trim();
        const note = document.getElementById('courseRegisterNote')?.value.trim();
        if (!name || !email) return;

        const message = [
            'Hi Serenest Education,',
            '',
            'I would like to register interest (free, no payment):',
            '',
            `Course: ${activeCourseName}`,
            `Name: ${name}`,
            `Email: ${email}`,
            note ? `Background: ${note}` : null,
        ].filter(Boolean).join('\n');

        openWhatsApp(message);

        const registrations = JSON.parse(localStorage.getItem('serenest_course_registrations')) || [];
        registrations.push({
            course: activeCourseName,
            name,
            email,
            note: note || '',
            registeredAt: new Date().toISOString()
        });
        localStorage.setItem('serenest_course_registrations', JSON.stringify(registrations));

        courseRegisterForm.style.display = 'none';
        courseRegisterSuccess.style.display = 'block';
    });
});
