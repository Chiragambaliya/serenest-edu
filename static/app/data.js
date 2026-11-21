/* Serenest Academy app data. Drugs copied from src/academy/data/drugs.js (Academy app branch). */
window.SA_DRUGS = [
  {
    video: true,
    slug: 'aripiprazole',
    shortName: 'Aripiprazole',
    name: 'Aripiprazole',
    mechanism:
      'Partial agonist at D2 and 5-HT1A, antagonist at 5-HT2A. Very long half-life (about 75 hours).',
    clinicalFit:
      'Where it fits: Schizophrenia, bipolar mania and MDD augmentation when weight, sugar or prolactin matter. Low metabolic and prolactin burden.',
    cdsco: 'CDSCO Approved',
    brands: 'Arip MT, Arpizol and generics (2, 5, 10, 15, 20, 30 mg)',
    cost: '₹150 – ₹400 / month (at 10–15 mg/day)',
    ipsPearl:
      'IPS Clinical Pearl: Ask about restlessness at every visit in the first weeks (akathisia), and warn families about new gambling, shopping or other urges.',
    steps: [
      { stage: 'Start', dose: '5–10 mg/d', ind: 'Week 1 Initiation', note: 'Label start is 10–15 mg once daily; many start at 5 mg to limit akathisia. Use 2–5 mg as an MDD add-on.' },
      { stage: 'Target', dose: '10–15 mg', ind: 'Schizophrenia Target', note: 'Usual effective range. Steady state takes about 2 weeks, so wait 2 weeks before raising the dose.' },
      { stage: 'Mania', dose: '15–30 mg', ind: 'Acute Bipolar Mania', note: 'Start at 15 mg/day in acute mania, alone or with lithium or valproate.' },
      { stage: 'Max Dose', dose: '30 mg/d', ind: 'Approved Daily Max', note: 'Max 30 mg/day (15 mg/day as MDD add-on). Halve the dose with fluoxetine or paroxetine (CYP2D6).' },
    ],
  },
  {
    video: true,
    slug: 'brexpiprazole',
    shortName: 'Brexpiprazole',
    name: 'Brexpiprazole',
    mechanism:
      'Serotonin-Dopamine Activity Modulator (SDAM): partial agonist at D2 and 5-HT1A receptors, potent antagonist at 5-HT2A.',
    clinicalFit:
      'Where it fits: Consider when aripiprazole helped clinically but caused limiting akathisia or activation, or as an adjunct in MDD after inadequate SSRI trials.',
    cdsco: 'CDSCO Approved (May 2026)',
    brands: 'Brexipil, Brexova, Rexipra-B (0.5, 1, 2, 3, 4 mg tablets)',
    cost: '₹850 – ₹1,450 / month (at 2 mg/day)',
    ipsPearl:
      'IPS Clinical Pearl: Start at 0.5–1 mg once daily and titrate weekly to 2 mg to minimize dose-dependent akathisia; monitor weight and fasting lipids at 3 months.',
    steps: [
      { stage: 'Start', dose: '0.5–1 mg', ind: 'Week 1 Initiation', note: 'Start 0.5 mg (MDD adjunct) or 1 mg (Schizophrenia) once daily with or without food.' },
      { stage: 'Target', dose: '2 mg/d', ind: 'MDD / AzD Target', note: 'Standard outpatient target dose (2 mg/day) for adjunctive MDD and Alzheimer’s agitation.' },
      { stage: 'Schiz Target', dose: '2–4 mg/d', ind: 'Adult Schizophrenia', note: 'Optimal therapeutic window for adult schizophrenia; lower akathisia than aripiprazole.' },
      { stage: 'Max Dose', dose: '4 mg/d', ind: 'Maximum Limit', note: 'Max 4 mg/day in schizophrenia (3 mg/day in MDD). Halve max dose in hepatic/renal impairment.' },
    ],
  },
  {
    video: true,
    slug: 'escitalopram',
    shortName: 'Escitalopram',
    name: 'Escitalopram',
    mechanism:
      'Pure S-enantiomer of citalopram; highly selective serotonin reuptake inhibitor (SSRI) with minimal CYP450 inhibition.',
    clinicalFit:
      'Where it fits: First-line Indian outpatient antidepressant for Major Depressive Disorder, GAD, Panic Disorder, and OCD due to clean tolerability and low cost.',
    cdsco: 'CDSCO Approved · NLEM Listed',
    brands: 'Nexito, Stalopam, Feliz-S, Rexipra (5, 10, 20 mg)',
    cost: '₹120 – ₹340 / month (Jan Aushadhi ~₹45/mo)',
    ipsPearl:
      'IPS Clinical Pearl: Check serum sodium in elderly patients during the first 4 weeks (SIADH risk) and avoid exceeding 10 mg/day in >65 years due to QTc prolongation.',
    steps: [
      { stage: 'Start', dose: '5 mg/d', ind: 'Panic / Elderly Start', note: 'Start 5 mg/day for 5–7 days in panic disorder or elderly patients to prevent initial jitteriness.' },
      { stage: 'Standard', dose: '10 mg/d', ind: 'MDD / GAD Target', note: 'Most effective and best-tolerated maintenance dose for depression and generalized anxiety.' },
      { stage: 'High Dose', dose: '20 mg/d', ind: 'OCD / Partial Response', note: 'Maximum approved adult dose; obtain baseline ECG if cardiac risk factors exist.' },
      { stage: 'Max Limit', dose: '20 mg/d', ind: 'QTc Safety Ceiling', note: 'Do not exceed 20 mg/day (10 mg/day in >65 yrs or CYP2C19 poor metabolizers).' },
    ],
  },
  {
    video: true,
    slug: 'lithium',
    shortName: 'Lithium',
    name: 'Lithium Carbonate',
    mechanism:
      'Monovalent cation modulating inositol monophosphatase, GSK-3β inhibition, BDNF neuroprotection, and serotonergic tone.',
    clinicalFit:
      'Where it fits: Gold-standard mood stabiliser for Bipolar I maintenance and the only psychotropic proven to reduce suicide risk.',
    cdsco: 'CDSCO Approved · NLEM Listed',
    brands: 'Licab, Lithosun, Intalith CR (300 mg IR; 400/450 mg SR)',
    cost: '₹110 – ₹260 / month',
    ipsPearl:
      'IPS Clinical Pearl: Counsel Indian families strongly on hydration during peak summer months and warn against OTC NSAIDs (diclofenac/ibuprofen), which precipitate toxicity.',
    steps: [
      { stage: 'Start', dose: '300 mg BD', ind: 'Initiation (600 mg/d)', note: 'Start 300 mg twice daily after baseline RFT, TSH, ECG, serum calcium, and pregnancy test.' },
      { stage: 'Maintenance', dose: '0.6–0.8', ind: 'mEq/L Trough Target', note: 'Target 12-hour trough serum level 0.6–0.8 mEq/L (typically 600–900 mg/day) for prophylaxis.' },
      { stage: 'Acute Mania', dose: '0.8–1.2', ind: 'mEq/L Acute Target', note: 'Higher therapeutic window (0.8–1.2 mEq/L) during acute manic episodes; monitor tremor.' },
      { stage: 'Toxicity Alert', dose: '>1.5', ind: 'mEq/L Toxic Threshold', note: 'Coarse tremor, ataxia, dysarthria, and confusion require immediate serum level and hydration.' },
    ],
  },
  {
    video: true,
    slug: 'olanzapine',
    shortName: 'Olanzapine',
    name: 'Olanzapine',
    mechanism: 'Thienobenzodiazepine second-generation antipsychotic with potent 5-HT2A, D2, H1, and M1–M5 antagonism.',
    clinicalFit:
      'Where it fits: High-efficacy antipsychotic for acute schizophrenia, first-episode psychosis, acute mania, and IM rapid tranquilisation.',
    cdsco: 'CDSCO Approved · NLEM Listed',
    brands: 'Oleanz, Olanex, Oliza, Tolaz (2.5, 5, 7.5, 10, 15, 20 mg)',
    cost: '₹180 – ₹450 / month (Jan Aushadhi ~₹60/mo)',
    ipsPearl:
      'IPS Clinical Pearl: High metabolic liability in South Asian patients—record baseline waist circumference, FBS, and lipids, and consider early metformin co-prescription.',
    steps: [
      { stage: 'Start', dose: '5 mg HS', ind: 'First-Episode / Elderly', note: 'Start 5 mg at bedtime in drug-naive first-episode psychosis or elderly patients.' },
      { stage: 'Target', dose: '10–15 mg', ind: 'Schizophrenia Target', note: 'Standard outpatient maintenance dose; minimal EPS compared to risperidone or haloperidol.' },
      { stage: 'Acute Mania', dose: '15–20 mg', ind: 'Acute Bipolar Mania', note: 'Rapid antimanic efficacy; monitor sedation and orthostatic hypotension.' },
      { stage: 'Max Dose', dose: '20 mg/d', ind: 'Approved Daily Max', note: 'Maximum approved oral dose 20 mg/day (never combine IM olanzapine with IM benzodiazepines).' },
    ],
  },
  {
    video: true,
    slug: 'buprenorphine',
    shortName: 'Buprenorphine',
    name: 'Buprenorphine',
    mechanism:
      'High-affinity partial agonist at μ-opioid receptors (ceiling effect on respiratory depression) and κ-opioid antagonist.',
    clinicalFit:
      'Where it fits: First-line Opioid Agonist Treatment (OAT) in India for heroin, pharmaceutical opioid (tramadol/tapentadol), and raw opium dependence.',
    cdsco: 'CDSCO Approved · NDPS Psychotropic Schedule',
    brands: 'Addnok, Addnok-N, Sernor, Bupregesic (0.4, 2, 8 mg SL)',
    cost: 'Free at Govt OST centres; ₹900 – ₹2,200/mo private',
    ipsPearl:
      'IPS Clinical Pearl: Ensure COWS ≥ 11–12 before the first sublingual dose to avoid precipitated withdrawal, and follow NDPS record-keeping & OST licensing norms.',
    steps: [
      { stage: 'Induction', dose: '2–4 mg SL', ind: 'Day 1 (COWS ≥ 11)', note: 'Administer sublingually only after moderate opioid withdrawal (COWS ≥ 11–12) is confirmed.' },
      { stage: 'Day 1 Max', dose: '8 mg SL', ind: 'Day 1 Stabilization', note: 'Reassess after 2 hours; total Day 1 dose typically 4–8 mg sublingual.' },
      { stage: 'Maintenance', dose: '8–16 mg', ind: 'OAT Target Dose', note: 'Optimal daily maintenance dose blocking cravings and illicit opioid euphoria.' },
      { stage: 'Max Limit', dose: '24 mg/d', ind: 'Receptor Saturation', note: 'Ceiling effect reached at 24 mg/day; prefer Buprenorphine/Naloxone (4:1) for take-home stability.' },
    ],
  },
]


/* Psychiatry posting. Clinical modules for MBBS students, interns, and junior residents. */
window.SA_COURSES = [
  { id: 'foundations', flagship: true, title: 'Approach to the Psychiatric Patient', weeks: 8, mode: 'Ward teaching',
    desc: 'The posting an intern is examined on: history, mental status, risk, the organic mimics, and a plan a senior can use.',
    lessons: ['The first interview and the collateral history', 'A mental status examination the next shift can use', 'Psychosis, mood, and what must be excluded', 'Risk: suicide, harm, and who stays in', 'Starting a medicine, and what you monitor', 'Capacity, consent, and the Mental Healthcare Act', 'The ward note and the OPD follow-up', 'The handover: what the psychiatrist needs to hear'] },
  { id: 'suicide-risk', title: 'Suicide Risk on the Ward', weeks: 2,
    desc: 'How a doctor asks, grades the risk, sets the observation, and writes the decision to admit or not.',
    lessons: ['How to ask, and what a denial does not rule out', 'Factors that change the plan today', 'Observation level and a safety plan', 'The note: risk, decision, and who was told'] },
  { id: 'mse', title: 'The Mental Status Examination', weeks: 1,
    desc: 'Appearance to insight, examined and written the way a psychiatry senior expects it on a round.',
    lessons: ['Appearance, behaviour, and speech', 'Mood, affect, and thought', 'Perception and cognition', 'Insight, judgement, and the written MSE'] },
  { id: 'cbt', title: 'Approach to Depression', weeks: 2,
    desc: 'Diagnosing a depressive episode, the bipolar and organic traps, and when an antidepressant is the next step.',
    lessons: ['What counts as a depressive episode', 'Grief, hypothyroidism, and bipolar depression', 'When a medicine starts, and which class', 'Review at two weeks: response, and the risk that rises first'] },
  { id: 'addiction', title: 'Approach to Alcohol Withdrawal', weeks: 2,
    desc: 'Who will withdraw, thiamine before glucose, and who is not safe to send home. Not a home detox recipe.',
    lessons: ['Dependence, harmful use, and the last drink', 'Who is at risk of severe withdrawal', 'Thiamine before glucose, and what you watch', 'Who is admitted, and what the family is told'] },
  { id: 'tele', title: 'Telepsychiatry for the Clinician', weeks: 1,
    desc: 'Identity, consent, and what a doctor may prescribe on a first teleconsult under the telemedicine rules.',
    lessons: ['Is this patient eligible for a teleconsult', 'Identity, consent, and the record', 'What a first prescription may contain', 'The follow-up, and when they must be seen'] },
  { id: 'family', title: 'Collateral History and the Family', weeks: 1,
    desc: 'The history the patient cannot give, and how the family changes admission, consent, and discharge.',
    lessons: ['Who you call, and what you ask', 'When the family is the reason for admission', 'Confidentiality when relatives demand the diagnosis', 'Discharge into the same house'] },
  { id: 'psychopharm', title: 'Psychopharmacology for the Intern', weeks: 2,
    desc: 'The medicines you will start or continue: the class, the monitoring, and the side effect that cannot wait.',
    lessons: ['Antidepressants and the first weeks', 'Antipsychotics and metabolic risk', 'Lithium: the level, the kidneys, and toxicity', 'Side effects that are emergencies'] },
  { id: 'practice', title: 'The Psychiatry OPD', weeks: 1,
    desc: 'A clinic list for a junior doctor: the structure, the prescription line, and a referral that is specific.',
    lessons: ['Fifteen minutes: what you must cover', 'What the prescription line has to say', 'The investigation you ordered, and when you see them again', 'Referring on without losing the patient'] },
];
