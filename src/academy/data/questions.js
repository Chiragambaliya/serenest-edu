export const QUESTIONS = [
  {
    topic: 'Psychopharmacology · MCQ 1 of 5',
    stem: 'Which antipsychotic requires mandatory regular Absolute Neutrophil Count (ANC) monitoring due to the risk of severe neutropenia / agranulocytosis?',
    options: ['Haloperidol', 'Clozapine', 'Aripiprazole', 'Quetiapine'],
    correct: 1,
    rationale:
      'Clozapine carries a ~0.8–1% risk of severe neutropenia/agranulocytosis, peaking in the first 18 weeks. Weekly ANC monitoring is required for months 0–6, biweekly for months 6–12, and monthly thereafter.',
  },
  {
    topic: 'Mood Stabilisers · MCQ 2 of 5',
    stem: 'A 31-year-old male on Lithium Carbonate 900 mg/day develops acute gastroenteritis and dehydration during peak summer in Gujarat, presenting with coarse tremor, ataxia, and slurred speech. Which co-prescribed drug class most commonly precipitates lithium toxicity?',
    options: [
      'Proton pump inhibitors (Pantoprazole)',
      'NSAIDs (Ibuprofen / Diclofenac)',
      'H1 antihistamines (Cetirizine)',
      'Benzodiazepines (Lorazepam)',
    ],
    correct: 1,
    rationale:
      'NSAIDs (except aspirin), thiazide diuretics, and ACE inhibitors reduce renal lithium clearance, rapidly elevating 12-hour trough serum lithium levels into the toxic range (>1.5 mEq/L).',
  },
  {
    topic: 'Antidepressants & CYP450 · MCQ 3 of 5',
    stem: 'According to FDA/CDSCO safety guidance and CYP2C19 pharmacogenomics, what is the maximum recommended daily dose of Escitalopram in elderly patients (>65 years) or known CYP2C19 poor metabolizers due to dose-dependent QTc prolongation?',
    options: ['5 mg/day', '10 mg/day', '20 mg/day', '30 mg/day'],
    correct: 1,
    rationale:
      'Escitalopram causes dose-dependent QTc interval prolongation above 20 mg/day in healthy adults and above 10 mg/day in elderly patients (>65 years), hepatic impairment, or CYP2C19 poor metabolizers.',
  },
  {
    topic: 'Novel Antipsychotics · MCQ 4 of 5',
    stem: 'How does Brexpiprazole pharmacodynamically differ from Aripiprazole, explaining its lower clinical incidence of akathisia and initial activation?',
    options: [
      'It is a pure D2 full antagonist with strong M1 anticholinergic activity',
      'It has lower intrinsic activity at D2 receptors and stronger 5-HT1A / 5-HT2A potency',
      'It acts exclusively as a selective norepinephrine reuptake inhibitor',
      'It irreversibly inhibits monoamine oxidase-A',
    ],
    correct: 1,
    rationale:
      'Brexpiprazole exhibits lower intrinsic activity (less partial agonism) at D2 receptors than aripiprazole alongside potent 5-HT1A partial agonism and 5-HT2A antagonism, lowering akathisia and activation rates.',
  },
  {
    topic: 'Addiction Medicine · MCQ 5 of 5',
    stem: 'When initiating sublingual Buprenorphine in a patient with heroin dependence, what minimum Clinical Opiate Withdrawal Scale (COWS) score should be documented to prevent precipitated withdrawal?',
    options: [
      'COWS 0–2 (Asymptomatic)',
      'COWS 5–6 (Mild withdrawal)',
      'COWS ≥ 11–12 (Moderate withdrawal)',
      'COWS > 36 only',
    ],
    correct: 2,
    rationale:
      'Because buprenorphine has high μ-opioid receptor affinity but lower intrinsic efficacy than full agonists (heroin/morphine), administering it before moderate withdrawal (COWS ≥ 11–12) displaces full agonists and triggers severe precipitated withdrawal.',
  },
]

export function accuracyPercent(score, attempted) {
  return Math.round(((17 + score) / (25 + attempted)) * 100)
}
