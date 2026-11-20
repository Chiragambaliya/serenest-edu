/* Serenest Academy app data. Drugs copied from src/academy/data/drugs.js (Academy app branch). */
window.SA_DRUGS = [
  {
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


/* Courses — titles, durations and descriptions match serenest.academy.
   Lesson titles are drawn from each course description; replace with the real syllabus. */
window.SA_COURSES = [
  { id: 'foundations', flagship: true, title: 'Foundations of Mental Health Counselling', weeks: 8, mode: 'Cohort · Live supervision',
    desc: 'Counselling basics, therapeutic communication, active listening, rapport building, basic CBT, suicide risk awareness, ethics, and referral guidance.',
    lessons: ['Counselling basics & therapeutic communication', 'Active listening and rapport building', 'Basic CBT concepts for Indian settings', 'CBT in practice: worksheets & homework', 'Suicide risk awareness', 'Safety planning and ethical boundaries', 'Clinical ethics & documentation', 'Referral guidance & supervised case review'] },
  { id: 'suicide-risk', title: 'Suicide Risk Assessment Basics', weeks: 2,
    desc: 'Warning signs, risk factors, safety planning, referral principles, and crisis communication.',
    lessons: ['Warning signs and risk factors', 'Asking about suicide safely', 'Safety planning', 'Referral principles & crisis communication'] },
  { id: 'mse', title: 'Mental Status Examination Simplified', weeks: 1,
    desc: 'Psychiatric observation: speech, mood, thought, perception, cognition, insight, and judgement.',
    lessons: ['Appearance, behaviour & speech', 'Mood, affect & thought', 'Perception & cognition', 'Insight, judgement & writing the MSE'] },
  { id: 'cbt', title: 'Basic CBT Skills for Beginners', weeks: 2,
    desc: 'Automatic thoughts, cognitive distortions, behavioural activation, and simple CBT tools.',
    lessons: ['The CBT model', 'Automatic thoughts', 'Cognitive distortions', 'Behavioural activation'] },
  { id: 'addiction', title: 'Addiction Counselling & Relapse Prevention', weeks: 3,
    desc: 'Alcohol, nicotine and substance-use counselling, motivational interviewing, craving management, and family support.',
    lessons: ['Understanding alcohol, nicotine & substance use', 'Motivational interviewing', 'Craving management', 'Relapse prevention', 'Working with families'] },
  { id: 'tele', title: 'Telecounselling & Digital Mental Healthcare', weeks: 2,
    desc: 'Online counselling ethics, confidentiality, digital boundaries, documentation, and tele-mental health workflows.',
    lessons: ['Telemedicine guidelines & consent', 'Confidentiality and digital boundaries', 'Documentation online', 'Tele-mental health workflows'] },
  { id: 'family', title: 'Indian Family Dynamics & Emotional Wellbeing', weeks: 2,
    desc: 'Guilt, dependency, family pressure, marriage stress, emotional boundaries, and intergenerational stress.',
    lessons: ['Guilt, duty & dependency', 'Family pressure & marriage stress', 'Emotional boundaries', 'Intergenerational stress'] },
  { id: 'psychopharm', title: 'Psychopharmacology for Psychologists', weeks: 2,
    desc: 'Common psychiatric medicines, side effects, adherence issues, and when to refer to a psychiatrist.',
    lessons: ['Antidepressants', 'Antipsychotics & mood stabilisers', 'Side effects & adherence', 'When to refer to a psychiatrist'] },
  { id: 'practice', title: 'Private Practice Basics for Counsellors', weeks: 2,
    desc: 'Ethical practice setup, documentation, fees, consent, boundaries, patient communication, and referral systems.',
    lessons: ['Setting up an ethical practice', 'Consent, fees & documentation', 'Boundaries & patient communication', 'Building referral systems'] },
];
