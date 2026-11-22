/* Serenest Academy — full self-paced course content (lessons, quizzes).
   Keyed by course id in data.js. Each lesson:
   { title, mins, drug?: '<drug slug>', also?: '<drug slug>', intro, sections: [{ h, p?, ul? }], points: [], quiz: [{ q, o: [], a, why }] }
   Educational content for students and clinicians. Not medical advice; confirm current labels and guidelines. */
window.SA_FULL = {

  /* ================================================================== */
  psychopharm: {
    level: 'Self-paced · 5 lessons · notes + quizzes',
    audience: 'Psychologists, counsellors and therapists who work alongside psychiatrists.',
    outcomes: [
      'Explain what each major medicine class is for, in plain language a client understands',
      'Recognise common and dangerous side effects early',
      'Support adherence without giving dosing advice',
      'Know exactly when a client must go back to the psychiatrist, or to emergency',
    ],
    lessons: [
      {
        title: 'How psychiatric medicines work', mins: 12,
        intro: 'You will not prescribe, but your clients will ask you about their medicines every week. This lesson gives you the basic language and the timelines that matter most in counselling.',
        sections: [
          { h: 'Receptors, not "chemical imbalance"', p: 'Most psychiatric medicines act on receptors and transporters for serotonin, dopamine, noradrenaline, GABA or glutamate. "Chemical imbalance" is an oversimplification; it is more accurate to say the medicine changes how certain brain circuits signal, and those changes take time.' },
          { h: 'Timelines clients need to hear', ul: [
            'Antidepressants: side effects can start in days, benefit usually begins at 2–4 weeks, full effect often takes 6–8 weeks.',
            'Antipsychotics: agitation and sleep improve early; hallucinations and delusions often take weeks.',
            'Benzodiazepines act within an hour, which is exactly why dependence develops.',
            'Most medicines need to continue for months after the person feels better, to prevent relapse.',
          ] },
          { h: 'Your role as a counsellor', ul: [
            'Normalise the early-side-effect, late-benefit gap, so clients do not stop in week one.',
            'Never advise starting, stopping or changing a dose. Say: "Please discuss that with your psychiatrist; shall we note it down for your next visit?"',
            'Pass on new side effects, missed doses and suicidal thoughts to the treating doctor (with consent, or without it when there is risk).',
          ] },
        ],
        points: ['Benefit is slower than side effects, especially for antidepressants.', 'You support adherence; you never change doses.', 'Relapse prevention means continuing after recovery.'],
        quiz: [
          { q: 'A client started escitalopram 5 days ago, feels nauseous and "no better". What is the most helpful response?', o: ['Suggest they stop, since it is not working', 'Explain that nausea often settles and benefit usually starts after 2–4 weeks, and encourage them to tell their psychiatrist', 'Suggest doubling the dose', 'Recommend switching to a herbal remedy'], a: 1, why: 'Early side effects with delayed benefit is the expected pattern. Support, inform, and route dose questions to the prescriber.' },
          { q: 'Which medicine class acts within an hour and carries a real risk of dependence?', o: ['SSRIs', 'Benzodiazepines', 'Lithium', 'Antipsychotics'], a: 1, why: 'Benzodiazepines act quickly on GABA-A receptors; tolerance and dependence develop with regular use.' },
          { q: 'A client feels well after 3 months on an antidepressant and wants to stop. You should:', o: ['Agree; they have recovered', 'Advise tapering by half yourself', 'Explain that stopping is usually planned with the psychiatrist to prevent relapse and withdrawal, and help them raise it', 'Tell them to stop on a weekend'], a: 2, why: 'Stopping is a prescriber decision, usually after months of remission and with a taper.' },
        ],
      },
      {
        title: 'Antidepressants: SSRIs and beyond', mins: 15, drug: 'escitalopram',
        intro: 'SSRIs such as escitalopram, sertraline and fluoxetine are the most common psychiatric prescriptions in Indian OPDs. Open the escitalopram brief below, then learn what to look out for.',
        sections: [
          { h: 'Common, usually temporary', ul: ['Nausea, loose stools, headache', 'Sleep change: insomnia or drowsiness', 'Early jitteriness or restlessness, especially in panic disorder'] },
          { h: 'Common and often hidden', p: 'Sexual side effects (low desire, delayed orgasm) are common and rarely volunteered, particularly in Indian settings. Asking gently and matter-of-factly prevents silent non-adherence.' },
          { h: 'Must be passed on to the psychiatrist', ul: [
            'New or worsening suicidal thoughts, especially in people under 25 in the first weeks.',
            'Signs of a switch into mania or hypomania: little need for sleep, racing thoughts, overspending. This may reveal bipolar disorder.',
            'Discontinuation symptoms after missed doses: dizziness, "electric shock" sensations, irritability.',
            'Confusion, very low sodium symptoms or falls in elderly clients.',
          ] },
        ],
        points: ['Ask about sexual side effects; clients rarely raise them.', 'Early suicidal thoughts and manic switch are urgent to report.', 'Missed doses can cause discontinuation symptoms, not "addiction".'],
        quiz: [
          { q: 'A 20-year-old on a new SSRI reports, in week 2, more frequent thoughts of dying. What is the priority?', o: ['Reassure; this is normal', 'Assess risk now and contact the prescriber the same day', 'Wait for the next monthly review', 'Suggest they skip a few doses'], a: 1, why: 'Young people can have increased suicidal thinking early in antidepressant treatment. Assess, safety-plan and escalate the same day.' },
          { q: 'A client on sertraline sleeps 3 hours a night, feels "on top of the world" and has spent ₹2 lakh in a week. This suggests:', o: ['The antidepressant is working well', 'A possible switch into mania or hypomania that needs urgent psychiatric review', 'Normal recovery', 'Insomnia only'], a: 1, why: 'Antidepressant-associated mania may reveal bipolar disorder and needs prompt review.' },
          { q: '"Brain zaps" and dizziness after missing two days of an SSRI are best described as:', o: ['Addiction', 'Discontinuation symptoms', 'A new illness', 'Allergy'], a: 1, why: 'Discontinuation symptoms are common with short half-life antidepressants and are not addiction.' },
        ],
      },
      {
        title: 'Antipsychotics: benefits and side effects', mins: 15, drug: 'olanzapine', also: 'aripiprazole',
        intro: 'Antipsychotics treat psychosis and mania and are increasingly used as add-ons in depression. The olanzapine and aripiprazole briefs are linked below for comparison.',
        sections: [
          { h: 'Two big families of side effects', ul: [
            'Movement (extrapyramidal): stiffness, tremor, acute dystonia (sudden muscle spasm), and akathisia, an inner restlessness that can feel unbearable and increase risk.',
            'Metabolic: weight gain, raised sugar and lipids. Strongest with olanzapine and clozapine; South Asian clients are at higher risk.',
            'Others: sedation, raised prolactin (missed periods, breast changes, sexual dysfunction), especially with risperidone.',
          ] },
          { h: 'Emergencies you must recognise', ul: [
            'Neuroleptic malignant syndrome (NMS): fever, severe rigidity, confusion and sweating, often soon after starting or raising a dose. Emergency.',
            'Clozapine: any fever or sore throat needs a blood count (risk of agranulocytosis); also watch for severe constipation.',
          ] },
          { h: 'What helps adherence', p: 'Ask what the client dislikes about the medicine. Weight gain and sedation are the commonest reasons people stop. Naming them and taking them to the psychiatrist often leads to a switch rather than a dropout. Long-acting injections are an option the psychiatrist can discuss.' },
        ],
        points: ['Akathisia looks like anxiety but is a side effect, and can raise risk.', 'Fever + rigidity + confusion = possible NMS, an emergency.', 'Weight gain is the top reason clients quietly stop.'],
        quiz: [
          { q: 'A client on aripiprazole cannot sit still, paces, and says "my legs won\'t let me rest". This is most likely:', o: ['Anxiety disorder', 'Akathisia', 'Mania', 'Malingering'], a: 1, why: 'Akathisia is a common side effect of aripiprazole and other antipsychotics. Report it; it is distressing and linked to risk.' },
          { q: 'Which combination should make you call emergency services?', o: ['Mild weight gain and hunger', 'High fever, muscle rigidity and confusion after a dose increase', 'Dry mouth', 'Daytime sleepiness'], a: 1, why: 'This picture suggests neuroleptic malignant syndrome, a medical emergency.' },
          { q: 'A client on clozapine reports sore throat and fever. The right action is:', o: ['Gargle and rest', 'Urgent contact with the psychiatrist for a blood count', 'Stop clozapine yourself', 'Wait a week'], a: 1, why: 'Fever or sore throat on clozapine needs an urgent white cell count to rule out agranulocytosis.' },
        ],
      },
      {
        title: 'Mood stabilisers: lithium and valproate', mins: 14, drug: 'lithium',
        intro: 'Mood stabilisers prevent relapses in bipolar disorder. Lithium is very effective but has a narrow safety margin, so counsellors who know the warning signs genuinely save lives.',
        sections: [
          { h: 'Lithium toxicity: know the signs', ul: [
            'Early: worsening tremor, nausea, vomiting, diarrhoea.',
            'Later: unsteadiness, slurred speech, confusion, drowsiness. This is an emergency.',
            'Triggers: dehydration (Indian summers, fever, diarrhoea), common painkillers such as diclofenac and ibuprofen, some blood-pressure medicines, and suddenly reduced salt or water.',
          ] },
          { h: 'Valproate and pregnancy', p: 'Valproate (sodium valproate, divalproex) can cause serious birth defects and developmental problems. It should generally be avoided in girls and women who could become pregnant. If a client on valproate is planning pregnancy or may be pregnant, she should see her psychiatrist promptly. She should not stop it suddenly on her own.' },
          { h: 'Practical counselling points', ul: ['Blood levels and kidney/thyroid tests are part of lithium treatment, not a sign something is wrong.', 'Drink enough water, especially in heat, and ask before taking any painkiller.', 'Never double up a missed dose without advice.'] },
        ],
        points: ['Vomiting/diarrhoea + coarse tremor + confusion on lithium = urgent.', 'NSAID painkillers and dehydration push lithium levels up.', 'Valproate: pregnancy planning needs the psychiatrist, early.'],
        quiz: [
          { q: 'A client on lithium has had diarrhoea for two days in May and is now unsteady and slurring words. You should:', o: ['Suggest ORS and wait', 'Treat this as possible lithium toxicity and get urgent medical care today', 'Suggest an extra dose to "stabilise" mood', 'Book a routine follow-up'], a: 1, why: 'Dehydration raises lithium levels; ataxia and dysarthria are signs of toxicity, a medical emergency.' },
          { q: 'Which over-the-counter medicine commonly raises lithium levels?', o: ['Paracetamol', 'Ibuprofen or diclofenac', 'Antacids', 'Vitamin D'], a: 1, why: 'NSAIDs reduce lithium excretion. Paracetamol is generally the safer painkiller, but clients should still ask their doctor.' },
          { q: 'A 24-year-old on valproate tells you she is planning to marry and have a child soon. The best step is:', o: ['Tell her to stop valproate now', 'Encourage an early appointment with her psychiatrist to plan treatment before pregnancy', 'Nothing; it is not your role', 'Suggest folic acid alone is enough'], a: 1, why: 'Valproate carries high risk in pregnancy; treatment should be reviewed before conception. Sudden stopping can trigger relapse.' },
        ],
      },
      {
        title: 'Addiction medicines & when to refer', mins: 14, drug: 'buprenorphine',
        intro: 'Medicines for substance use work best alongside counselling. This lesson closes with the referral red flags every counsellor should know by heart.',
        sections: [
          { h: 'Medicines you will meet', ul: [
            'Buprenorphine and methadone (opioid agonist treatment): reduce cravings and overdose risk. This is treatment, not "replacing one drug with another".',
            'Naltrexone: reduces craving in alcohol use; blocks opioids.',
            'Disulfiram: causes a severe reaction with alcohol. It must only be taken with the person\'s full knowledge and consent. Families sometimes ask to mix it into food secretly; this is unsafe and unethical.',
            'Acamprosate: helps maintain abstinence from alcohol.',
          ] },
          { h: 'Refer to emergency now', ul: [
            'Active suicidal intent or plan.',
            'Signs of lithium toxicity, NMS, or serotonin toxicity (agitation, sweating, fever, twitching after combining serotonergic medicines).',
            'Alcohol withdrawal with confusion, seizures or hallucinations (delirium tremens).',
            'A new severe rash on lamotrigine or carbamazepine.',
            'Overdose of any medicine.',
          ] },
          { h: 'Refer back to the psychiatrist soon', ul: ['New or worsening symptoms despite good adherence', 'Side effects causing the client to skip doses', 'Pregnancy or breastfeeding plans', 'Starting any new medicine from another doctor'] },
        ],
        points: ['Opioid agonist treatment saves lives; avoid stigmatising it.', 'Never support secret disulfiram.', 'Learn the emergency red flags by heart.'],
        quiz: [
          { q: 'A family asks you how to mix disulfiram into their son\'s food without telling him. You should:', o: ['Explain the dose', 'Explain that this is unsafe and unethical, and help the family engage him in treatment with consent', 'Refer them to a pharmacy', 'Agree if he drinks heavily'], a: 1, why: 'Disulfiram–alcohol reactions can be dangerous. It requires informed consent.' },
          { q: 'A client on buprenorphine is described by a relative as "still an addict on drugs". The most accurate response is:', o: ['Agree', 'Explain that buprenorphine is an evidence-based treatment that reduces cravings and overdose risk', 'Advise stopping it to be "really clean"', 'Say nothing'], a: 1, why: 'Opioid agonist treatment is effective treatment and lowers mortality.' },
          { q: 'Which situation needs emergency referral rather than a routine appointment?', o: ['Mild dry mouth', 'Confusion, tremor and hallucinations two days after stopping heavy drinking', 'Wanting to discuss a lower dose', 'Mild weight gain'], a: 1, why: 'This suggests delirium tremens, a medical emergency.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  mse: {
    level: 'Self-paced · 5 lessons · practice + quizzes',
    audience: 'Psychology students, interns, counsellors and medical students.',
    outcomes: [
      'Observe and describe each MSE domain in standard, objective language',
      'Tell apart similar findings: mood vs affect, delusion vs overvalued idea, hallucination vs illusion',
      'Do brief bedside cognitive checks',
      'Write a clear, concise MSE note',
    ],
    lessons: [
      {
        title: 'Appearance, behaviour & rapport', mins: 12,
        intro: 'The MSE starts the moment you see the person. It is a snapshot of what you observe now, not the history.',
        sections: [
          { h: 'Appearance', ul: ['Apparent age, build, grooming and hygiene, clothing (appropriate to weather and setting)', 'Signs of self-neglect or self-harm (scars, bandages)', 'Write what you see: "unkempt hair, soiled clothes", not "looks depressed"'] },
          { h: 'Behaviour and psychomotor activity', ul: ['Eye contact, rapport, cooperation', 'Psychomotor retardation (slowed movements, long pauses) or agitation (pacing, wringing hands)', 'Abnormal movements: tremor, tics, dyskinesia, catatonic features such as posturing or mutism'] },
          { h: 'Rapport', p: 'Note how easily rapport was established and whether it changed over the interview. Guardedness can reflect paranoia, fear, or simply an uncomfortable setting (for example a crowded OPD); describe it, then interpret with care.' },
        ],
        points: ['Describe, do not interpret.', 'Psychomotor change is a key sign in depression and mania.', 'Note rapport and how it changed.'],
        quiz: [
          { q: 'Which is the best MSE description?', o: ['Looks depressed', 'Unkempt, wearing a thick sweater on a hot day, poor eye contact', 'Seems lazy', 'Probably schizophrenic'], a: 1, why: 'MSE language is descriptive and objective.' },
          { q: 'Long pauses before answering and slowed movements are called:', o: ['Psychomotor agitation', 'Psychomotor retardation', 'Flight of ideas', 'Catalepsy'], a: 1, why: 'Psychomotor retardation is typical of severe depression.' },
          { q: 'The MSE describes:', o: ['The whole life history', 'Observations during the current interview', 'Family history', 'Diagnosis'], a: 1, why: 'The MSE is a cross-sectional snapshot.' },
        ],
      },
      {
        title: 'Speech, mood & affect', mins: 13,
        intro: 'Speech is the window to thought. Mood and affect are often confused; this lesson separates them clearly.',
        sections: [
          { h: 'Speech', ul: ['Rate (slow, rapid, pressured), volume, tone, amount (poverty of speech)', 'Pressured speech: rapid and hard to interrupt, typical of mania', 'Note the language used and whether an interpreter was needed'] },
          { h: 'Mood vs affect', ul: ['Mood: the person\'s own sustained emotional state. Record it in their words: "I feel empty".', 'Affect: what you observe moment to moment. Describe range (restricted, blunted, flat), reactivity, and congruence with mood and content.', 'Incongruent affect: laughing while describing a death, for example.'] },
          { h: 'Always ask about suicide', p: 'Low mood should always be followed by questions about hopelessness and suicidal thoughts. Record the answers in the thought content section and act on them (see the Suicide Risk course).' },
        ],
        points: ['Mood = subjective, in their words. Affect = what you observe.', 'Pressured speech suggests mania.', 'Low mood → always ask about suicide.'],
        quiz: [
          { q: 'The client says "I feel completely hopeless". This describes:', o: ['Affect', 'Mood', 'Insight', 'Judgement'], a: 1, why: 'Mood is the subjective, reported emotional state.' },
          { q: 'A client smiles and laughs while describing her mother\'s recent death. Her affect is best described as:', o: ['Euthymic', 'Incongruent', 'Reactive', 'Anxious'], a: 1, why: 'Affect that does not match the content is incongruent.' },
          { q: 'Rapid speech that is hard to interrupt is called:', o: ['Poverty of speech', 'Pressured speech', 'Echolalia', 'Mutism'], a: 1, why: 'Pressured speech is typical of mania.' },
        ],
      },
      {
        title: 'Thought: form and content', mins: 16,
        intro: 'Form is how thoughts are linked; content is what the person is thinking about. Both are central in psychosis and mood disorders.',
        sections: [
          { h: 'Form (the flow of thought)', ul: [
            'Circumstantial: long detour, but reaches the point.',
            'Tangential: drifts away and never reaches the point.',
            'Flight of ideas: rapid jumps between loosely linked ideas, often with puns or rhymes (mania).',
            'Loosening of associations / derailment: little logical connection between ideas (psychosis).',
            'Thought block: sudden stop in the train of thought.',
          ] },
          { h: 'Content', ul: [
            'Delusion: a fixed, false belief, held despite evidence, out of keeping with the person\'s cultural and religious background.',
            'Overvalued idea: an intense, preoccupying belief that is not as fixed or bizarre as a delusion.',
            'Obsession: an intrusive, unwanted thought that the person recognises as their own and tries to resist.',
            'Preoccupations, phobias, and suicidal or homicidal thoughts.',
          ] },
          { h: 'Cultural context matters', p: 'Beliefs in black magic, spirits or karma are common in India. They are delusional only when they are idiosyncratic, held with unusual fixity, and not shared by the person\'s family or community. Ask the family how they see the belief.' },
        ],
        points: ['Circumstantial reaches the point; tangential does not.', 'A delusion must be out of keeping with culture.', 'Obsessions are recognised as one\'s own thoughts.'],
        quiz: [
          { q: 'The client gives a very long, detailed answer but eventually answers the question. This is:', o: ['Tangential', 'Circumstantial', 'Thought block', 'Loosening of associations'], a: 1, why: 'Circumstantial thinking takes a detour but reaches the goal.' },
          { q: 'A man is certain his neighbours have put a device in his tooth to read his thoughts, despite all evidence and his family\'s disagreement. This is:', o: ['An overvalued idea', 'A delusion', 'An obsession', 'A cultural belief'], a: 1, why: 'Fixed, false, not shared by his culture or family: a delusion.' },
          { q: 'A woman has repeated unwanted thoughts that her hands are contaminated, knows they are excessive, and tries to resist. These are:', o: ['Delusions', 'Obsessions', 'Hallucinations', 'Flight of ideas'], a: 1, why: 'Obsessions are intrusive, ego-dystonic and recognised as the person\'s own.' },
        ],
      },
      {
        title: 'Perception & cognition', mins: 14,
        intro: 'Perceptual abnormalities and cognitive testing complete the core of the MSE.',
        sections: [
          { h: 'Perception', ul: [
            'Hallucination: a perception without a stimulus (hearing a voice when no one is there).',
            'Illusion: a misinterpretation of a real stimulus (a rope seen as a snake in dim light).',
            'Note modality (auditory, visual, tactile, olfactory). Visual hallucinations should prompt thinking about delirium, substances or organic causes.',
            'Ask about voices commenting, discussing the person in the third person, or giving commands, and whether the person acts on commands.',
          ] },
          { h: 'Bedside cognition', ul: [
            'Consciousness: alert, drowsy, fluctuating. Fluctuation suggests delirium.',
            'Orientation: time, place, person.',
            'Attention: serial 7s from 100, or months of the year backwards.',
            'Memory: register three words, recall after 5 minutes; ask about recent events.',
            'Formal tools such as MMSE or MoCA (with education-appropriate norms) when cognitive impairment is suspected.',
          ] },
        ],
        points: ['Hallucination = no stimulus; illusion = real stimulus misread.', 'Visual hallucinations + fluctuating attention → think delirium.', 'Ask whether command hallucinations are acted on.'],
        quiz: [
          { q: 'At dusk, a patient sees a hanging coat and believes it is a man. This is:', o: ['A hallucination', 'An illusion', 'A delusion', 'Depersonalisation'], a: 1, why: 'A real stimulus is misinterpreted: an illusion.' },
          { q: 'An elderly inpatient is disoriented at night, sees insects on the wall, and is clear in the morning. Think first of:', o: ['Schizophrenia', 'Delirium', 'OCD', 'Malingering'], a: 1, why: 'Fluctuating consciousness and visual hallucinations suggest delirium, a medical emergency.' },
          { q: 'Which is a test of attention?', o: ['Naming the Prime Minister', 'Serial 7s from 100', 'Three-word recall after 5 minutes', 'Proverb interpretation'], a: 1, why: 'Serial 7s and months backwards test attention and concentration.' },
        ],
      },
      {
        title: 'Insight, judgement & writing the MSE', mins: 14,
        intro: 'Finish with insight and judgement, then put it all together in a clear note. Practise on the MSE simulator in the Library.',
        sections: [
          { h: 'Insight', p: 'Insight is the person\'s awareness that they are unwell, that symptoms are part of an illness, and that treatment may help. It is a spectrum, so describe it: "Accepts that he has been unwell, attributes voices to black magic, willing to take medicines" is far more useful than "partial insight".' },
          { h: 'Judgement', p: 'Judgement is the ability to make sound decisions about real situations. It is best assessed from recent real-life decisions (spending, driving, self-care) rather than hypothetical questions alone.' },
          { h: 'A short sample note', ul: [
            'A&B: 34-year-old woman, unkempt, poor eye contact, psychomotor retardation. Rapport established with difficulty.',
            'Speech: slow, low volume, reduced amount.',
            'Mood: "empty, no point". Affect: restricted, congruent.',
            'Thought: no formal thought disorder. Content: hopelessness, guilt; passive death wishes, no plan or intent.',
            'Perception: no hallucinations. Cognition: oriented, attention mildly impaired.',
            'Insight: accepts she is depressed, open to treatment. Judgement: fair.',
          ] },
        ],
        points: ['Describe insight in words; avoid one-word grades.', 'Judge judgement from real decisions.', 'Keep notes short, objective and in a fixed order.'],
        quiz: [
          { q: 'Which statement best records insight?', o: ['Insight poor', 'Believes his voices are caused by a neighbour\'s curse, but agrees to take medicine to sleep better', 'Insight 2/5', 'No insight because psychotic'], a: 1, why: 'Descriptive insight statements are more useful clinically.' },
          { q: 'Judgement is best assessed by:', o: ['Only asking "what would you do if you found a stamped letter?"', 'Looking at recent real-life decisions', 'Serial 7s', 'Asking about mood'], a: 1, why: 'Real behaviour gives better evidence than hypothetical tests alone.' },
          { q: 'What is the correct order of a standard MSE?', o: ['Insight, mood, appearance, cognition', 'Appearance & behaviour, speech, mood & affect, thought, perception, cognition, insight & judgement', 'Diagnosis first, then findings', 'Any order'], a: 1, why: 'A fixed order prevents missed domains and makes notes readable.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  'suicide-risk': {
    level: 'Self-paced · 5 lessons · scripts + quizzes',
    audience: 'Counsellors, psychologists, nurses, teachers and anyone in a helping role.',
    outcomes: [
      'Ask directly and safely about suicidal thoughts',
      'Identify warning signs, risk factors and protective factors',
      'Build a written safety plan with the client',
      'Refer, document and act within Indian law (MHCA 2017) and helplines',
    ],
    lessons: [
      {
        title: 'Myths, facts & the Indian picture', mins: 12,
        intro: 'Suicide is a leading cause of death among young people in India. NCRB recorded more than 1.7 lakh suicide deaths in 2022, and the real number is likely higher. Clear facts are the first protective tool.',
        sections: [
          { h: 'Myths that cost lives', ul: [
            'Myth: asking about suicide puts the idea in someone\'s head. Fact: asking directly does not increase risk and often brings relief.',
            'Myth: people who talk about it will not do it. Fact: many people who die by suicide told someone beforehand.',
            'Myth: suicide happens without warning. Fact: most people show warning signs.',
            'Myth: once suicidal, always suicidal. Fact: suicidal crises are often time-limited, and treatment works.',
          ] },
          { h: 'Indian context', ul: ['Family conflict, marital problems, illness, debt, exam stress and alcohol are frequently reported factors.', 'Pesticide poisoning is a major method in rural India, so means safety matters.', 'Stigma and fear of police involvement stop families from seeking help.'] },
        ],
        points: ['Ask directly; it does not plant the idea.', 'Most people give warning signs.', 'Suicidal crises pass, and treatment helps.'],
        quiz: [
          { q: 'Asking a client directly "Are you thinking about killing yourself?"', o: ['Increases their risk', 'Does not increase risk and helps you assess safety', 'Is illegal in India', 'Should only be done by psychiatrists'], a: 1, why: 'Direct questions are safe and essential for assessment.' },
          { q: 'Which method is particularly important for means-safety counselling in rural India?', o: ['Firearms', 'Pesticides', 'Car exhaust', 'Drowning'], a: 1, why: 'Pesticide ingestion is a leading method in rural India; safe storage saves lives.' },
          { q: 'Which statement is true?', o: ['People who talk about suicide never act on it', 'Suicidal crises are often time-limited and treatable', 'Suicide always happens without warning', 'Once suicidal, always suicidal'], a: 1, why: 'Getting someone through the crisis and into care is protective.' },
        ],
      },
      {
        title: 'Warning signs, risk & protective factors', mins: 14,
        intro: 'Risk factors tell you who is at higher risk over time; warning signs tell you someone may be at risk now.',
        sections: [
          { h: 'Warning signs (act now)', ul: ['Talking or writing about wanting to die, or being a burden', 'Searching for means: pesticide, tablets, rope', 'Saying goodbye, giving away belongings, sudden calm after deep distress', 'Increased alcohol or drug use; withdrawal from people', 'Extreme hopelessness or unbearable emotional pain'] },
          { h: 'Risk factors', ul: ['Previous suicide attempt (the strongest single predictor)', 'Depression, bipolar disorder, psychosis, substance use', 'Recent loss, humiliation, debt, exam failure, relationship break-up', 'Chronic pain or illness; access to lethal means', 'Family history of suicide; isolation'] },
          { h: 'Protective factors', ul: ['Reasons for living: children, faith, future plans', 'Supportive family and friends', 'Engagement with treatment', 'Problem-solving skills and restricted access to means'] },
        ],
        points: ['A previous attempt is the strongest predictor.', 'Sudden calm after distress can be a warning sign.', 'Always ask about protective factors and build on them.'],
        quiz: [
          { q: 'Which is the strongest single predictor of future suicide?', o: ['Low income', 'A previous suicide attempt', 'Being a student', 'Living alone'], a: 1, why: 'A history of suicide attempt is the strongest known predictor.' },
          { q: 'A deeply depressed client suddenly seems calm and is giving away his things. This is:', o: ['A sign of recovery', 'A warning sign that needs urgent assessment', 'Normal behaviour', 'Mania'], a: 1, why: 'Sudden calm with giving away possessions can signal a decision to die.' },
          { q: 'Which is a protective factor?', o: ['Recent job loss', 'Strong reasons for living, such as children', 'Alcohol use', 'Access to pesticides'], a: 1, why: 'Reasons for living and connectedness protect.' },
        ],
      },
      {
        title: 'Asking the question safely', mins: 14,
        intro: 'This lesson gives you words you can actually say, step by step, from passive thoughts to plans and preparation.',
        sections: [
          { h: 'A step-by-step script', ul: [
            '"Sometimes when people feel this low, they feel life is not worth living. Has that happened to you?"',
            '"Have you wished you were dead, or could go to sleep and not wake up?"',
            '"Have you had thoughts of killing yourself?"',
            '"Have you thought about how you might do it?"',
            '"Do you have any intention of acting on these thoughts?"',
            '"Have you started to prepare, or done anything towards ending your life?"',
          ] },
          { h: 'How to ask', ul: ['Use clear words: "kill yourself", not "do something silly".', 'Stay calm and non-judgemental; avoid lectures and promises of secrecy.', 'Ask in the client\'s language; translate the meaning, not just the words.', 'Thank them for telling you.'] },
          { h: 'Making sense of the answers', p: 'Passive death wishes with no plan or intent, good supports and engagement suggest lower immediate risk and need a safety plan and follow-up. A plan, intent, preparation, or recent attempt means high risk: do not leave the person alone and arrange urgent psychiatric or emergency care.' },
        ],
        points: ['Move from passive wishes to plan, intent and preparation.', 'Use direct, plain language.', 'Plan + intent or preparation = urgent action, do not leave alone.'],
        quiz: [
          { q: 'Which question is clearest?', o: ['"You\'re not thinking of doing anything silly, are you?"', '"Have you had thoughts of killing yourself?"', '"Things will get better, right?"', '"Why would you want to do that?"'], a: 1, why: 'Direct, neutral language gets honest answers.' },
          { q: 'A client says she has bought pesticide and plans to drink it tonight. The right action is:', o: ['Book her for next week', 'Do not leave her alone; arrange urgent emergency or psychiatric care and involve family', 'Ask her to promise she will be safe', 'Give her a helpline number and end the session'], a: 1, why: 'Plan, intent and means = high immediate risk.' },
          { q: 'A client asks you to keep their suicidal thoughts secret from everyone. You should:', o: ['Promise complete secrecy', 'Explain that you will keep things private except when there is risk to life', 'Refuse to see them', 'Tell their employer'], a: 1, why: 'Confidentiality has limits when life is at risk; be honest about them early.' },
        ],
      },
      {
        title: 'Building a safety plan', mins: 15,
        intro: 'A safety plan is a short, written, personal plan the client creates with you, for use when suicidal feelings rise. It is not a "no-suicide contract".',
        sections: [
          { h: 'The six steps (Stanley–Brown model)', ul: [
            '1. My warning signs: thoughts, feelings and situations that come before a crisis.',
            '2. Things I can do on my own to cope: walk, music, prayer, cold water on the face.',
            '3. People and places that distract me.',
            '4. People I can ask for help, with phone numbers.',
            '5. Professionals and helplines: therapist, psychiatrist, Tele-MANAS 14416, emergency 112.',
            '6. Making the environment safer: who will store pesticides, tablets or other means.',
          ] },
          { h: 'Means safety', p: 'Reducing access to lethal means saves lives because crises are often brief. Agree who will lock up pesticides, keep only small amounts of medicines at home, and remove ropes or other means. Involve a trusted family member, with the client\'s agreement.' },
          { h: 'Make it usable', ul: ['Use the client\'s own words and language.', 'Keep it where they will see it: phone photo, wallet card.', 'Review it at every session.'] },
        ],
        points: ['Safety plans are collaborative and written.', 'Means safety is one of the most effective steps.', 'No-suicide contracts are not recommended.'],
        quiz: [
          { q: 'Which is NOT part of a Stanley–Brown safety plan?', o: ['Warning signs', 'Coping strategies', 'A signed no-suicide contract', 'Making the environment safer'], a: 2, why: 'No-suicide contracts are not evidence-based; safety plans are.' },
          { q: 'Why does restricting access to pesticides help?', o: ['It cures depression', 'Suicidal crises are often brief, and removing lethal means buys time', 'It is required by law', 'It does not help'], a: 1, why: 'Means restriction is one of the best-supported prevention strategies.' },
          { q: 'Which Indian national mental health helpline belongs in the plan?', o: ['100 only', 'Tele-MANAS 14416', '108 only', '1098 only'], a: 1, why: 'Tele-MANAS (14416 or 1-800-891-4416) is the national tele mental health helpline. Use 112 for emergencies.' },
        ],
      },
      {
        title: 'Referral, documentation & the law', mins: 13,
        intro: 'Knowing the law reduces fear for clients, families and you. Good documentation protects everyone.',
        sections: [
          { h: 'The law in India', ul: [
            'Mental Healthcare Act 2017, Section 115: a person who attempts suicide is presumed to have severe stress unless proved otherwise, and should not be tried and punished. The government has a duty to provide care and rehabilitation.',
            'The Bharatiya Nyaya Sanhita (2023), which replaced the IPC, does not carry over Section 309, the old offence of attempted suicide.',
            'Tell families clearly: seeking help after an attempt is safe and is treatment, not a crime. Medico-legal procedures in hospital still apply.',
          ] },
          { h: 'Referral pathways', ul: ['High risk: emergency department or psychiatrist the same day; do not leave alone.', 'Moderate risk: psychiatrist within days, safety plan, frequent check-ins.', 'Lower risk: safety plan, treatment of the underlying problem, follow-up date fixed.'] },
          { h: 'Document', ul: ['What you asked and what the client said, in their words', 'Risk and protective factors, your risk formulation, and the plan', 'Who you informed and when (family, psychiatrist), and the follow-up date'] },
        ],
        points: ['MHCA s.115 presumes severe stress; care, not punishment.', 'Match urgency of referral to level of risk.', 'Write down what was asked, said, decided and who was told.'],
        quiz: [
          { q: 'Under MHCA 2017 Section 115, a person who attempts suicide is:', o: ['Always prosecuted', 'Presumed to have severe stress and should not be tried and punished', 'Sent to jail for one year', 'Not entitled to care'], a: 1, why: 'Section 115 presumes severe stress and directs the government to provide care.' },
          { q: 'Which belongs in your risk documentation?', o: ['Only "risk low"', 'Questions asked, client\'s answers, risk and protective factors, the plan and who was informed', 'Nothing, to protect privacy', 'Your personal opinion of the client'], a: 1, why: 'Detailed, specific documentation supports good care and protects everyone.' },
          { q: 'A client has thoughts but no plan or intent, good support, and is engaged. A suitable plan is:', o: ['Nothing needed', 'Safety plan, treatment of the underlying problem, and a fixed follow-up', 'Immediate admission against their will', 'Ask them to call only if things get worse'], a: 1, why: 'Lower immediate risk still needs a plan and follow-up.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  'neet-pg': {
    level: 'Self-paced · 5 high-yield lessons · MCQs',
    audience: 'MBBS students, interns and doctors preparing for NEET-PG / INI-CET.',
    outcomes: [
      'Revise the most-tested psychiatry facts in under two hours',
      'Recall criteria, time frames and drug facts accurately',
      'Spot emergency presentations in clinical vignettes',
      'Practise with exam-style MCQs and explanations',
    ],
    lessons: [
      {
        title: 'Schizophrenia & psychosis', mins: 15,
        intro: 'High-yield facts on psychosis, as they appear in exam vignettes.',
        sections: [
          { h: 'Must-know facts', ul: [
            'Schneider\'s first-rank symptoms: audible thoughts, voices arguing or discussing, voices commenting on actions, thought insertion, withdrawal and broadcasting, made feelings/impulses/actions, somatic passivity, delusional perception.',
            'Duration: DSM-5 needs 6 months of disturbance (including 1 month of active symptoms); ICD-11 needs at least 1 month.',
            'Brief psychotic disorder (DSM-5): 1 day to under 1 month. Schizophreniform: 1 to under 6 months.',
            'Negative symptoms (5 As): alogia, avolition, anhedonia, asociality, affective flattening.',
            'Good prognosis: acute onset, late onset, clear precipitant, mood symptoms, good premorbid function, female sex.',
          ] },
          { h: 'Treatment', ul: [
            'Treatment-resistant schizophrenia: failure of two adequate antipsychotic trials → clozapine.',
            'Clozapine: agranulocytosis (blood count monitoring), myocarditis, seizures, sialorrhoea, constipation, metabolic syndrome. It also reduces suicide risk in schizophrenia.',
            'Tardive dyskinesia: late, often irreversible involuntary movements after long-term antipsychotic use.',
          ] },
        ],
        points: ['DSM-5 schizophrenia: 6 months; ICD-11: 1 month.', 'Clozapine after two failed antipsychotics.', 'Delusional perception is a first-rank symptom.'],
        quiz: [
          { q: 'Minimum total duration of disturbance for schizophrenia under DSM-5 is:', o: ['1 month', '3 months', '6 months', '1 year'], a: 2, why: 'DSM-5 requires 6 months, including at least 1 month of active-phase symptoms.' },
          { q: 'A patient has not responded to adequate trials of risperidone and olanzapine. Next drug of choice:', o: ['Haloperidol', 'Clozapine', 'Aripiprazole', 'Lithium'], a: 1, why: 'Clozapine is the drug of choice for treatment-resistant schizophrenia.' },
          { q: 'Which is a Schneiderian first-rank symptom?', o: ['Visual hallucinations', 'Thought broadcasting', 'Flight of ideas', 'Depersonalisation'], a: 1, why: 'Thought broadcasting is a first-rank symptom.' },
        ],
      },
      {
        title: 'Mood disorders', mins: 15,
        intro: 'Depression, bipolar disorder and lithium: the most frequently tested topics in exam psychiatry.',
        sections: [
          { h: 'Criteria and time frames (DSM-5)', ul: [
            'Major depressive episode: 5 or more symptoms for at least 2 weeks, including low mood or loss of interest.',
            'Manic episode: at least 1 week (or any duration if hospitalised). Hypomania: at least 4 days, without marked impairment or psychosis.',
            'Bipolar I needs one manic episode. Bipolar II: hypomania plus major depression.',
            'Dysthymia (persistent depressive disorder): 2 years in adults (1 year in children).',
            'Cyclothymia: 2 years of subthreshold mood swings.',
          ] },
          { h: 'Lithium facts', ul: [
            'Therapeutic level: about 0.6–1.0 mEq/L for maintenance (up to 1.2 in acute mania); toxicity usually above 1.5.',
            'Side effects: tremor, polyuria (nephrogenic diabetes insipidus), hypothyroidism, weight gain, leucocytosis.',
            'Pregnancy: Ebstein anomaly (risk is lower than once thought, but remains the classic exam answer).',
            'Toxicity raised by dehydration, NSAIDs, thiazides and ACE inhibitors. Severe toxicity: haemodialysis.',
          ] },
        ],
        points: ['Depression 2 weeks; mania 1 week; hypomania 4 days.', 'Lithium: Ebstein anomaly, hypothyroidism, nephrogenic DI.', 'Thiazides and NSAIDs raise lithium.'],
        quiz: [
          { q: 'Minimum duration for a hypomanic episode (DSM-5):', o: ['1 day', '4 days', '1 week', '2 weeks'], a: 1, why: 'Hypomania needs at least 4 consecutive days.' },
          { q: 'Lithium during pregnancy is classically associated with:', o: ['Neural tube defects', 'Ebstein anomaly', 'Cleft palate', 'Phocomelia'], a: 1, why: 'Ebstein anomaly is the classic association. Valproate is linked to neural tube defects.' },
          { q: 'Which drug increases serum lithium levels?', o: ['Theophylline', 'Hydrochlorothiazide', 'Acetazolamide', 'Caffeine'], a: 1, why: 'Thiazides reduce lithium clearance. Theophylline and caffeine lower levels.' },
        ],
      },
      {
        title: 'Anxiety, OCD & trauma', mins: 13,
        intro: 'Key distinctions and first-line treatments in anxiety-spectrum disorders.',
        sections: [
          { h: 'High-yield facts', ul: [
            'Panic disorder: recurrent unexpected panic attacks plus 1 month of worry or behaviour change. First line: SSRI and CBT.',
            'GAD: excessive worry for at least 6 months (DSM-5).',
            'OCD: obsessions are ego-dystonic. First line: SSRIs (often higher doses) and exposure and response prevention (ERP). Clomipramine is the TCA option.',
            'PTSD: symptoms for more than 1 month after trauma. Acute stress disorder: 3 days to 1 month.',
            'Adjustment disorder: within 3 months of a stressor.',
          ] },
          { h: 'Benzodiazepines', ul: ['Short-term use only; risk of dependence and withdrawal seizures.', 'Overdose antidote: flumazenil (use with caution; it can trigger seizures in dependent patients).', 'Lorazepam and oxazepam are preferred in liver disease (no active metabolites).'] },
        ],
        points: ['PTSD > 1 month; acute stress disorder < 1 month.', 'OCD: SSRI + ERP; clomipramine is the TCA option.', 'Lorazepam/oxazepam in liver disease.'],
        quiz: [
          { q: 'Psychotherapy of choice for OCD:', o: ['Psychoanalysis', 'Exposure and response prevention', 'Interpersonal therapy', 'Supportive therapy'], a: 1, why: 'ERP is the core psychological treatment for OCD.' },
          { q: 'Symptoms after trauma lasting 2 weeks are best diagnosed as:', o: ['PTSD', 'Acute stress disorder', 'GAD', 'Adjustment disorder'], a: 1, why: 'Acute stress disorder lasts 3 days to 1 month; PTSD needs more than 1 month.' },
          { q: 'Benzodiazepine preferred for alcohol withdrawal in a patient with liver cirrhosis:', o: ['Diazepam', 'Chlordiazepoxide', 'Lorazepam', 'Clonazepam'], a: 2, why: 'Lorazepam has no active metabolites and is safer in liver disease.' },
        ],
      },
      {
        title: 'Substance use disorders', mins: 15,
        intro: 'Alcohol and opioids dominate exam questions, especially withdrawal timelines and emergencies.',
        sections: [
          { h: 'Alcohol', ul: [
            'Withdrawal timeline: tremor 6–24 h; withdrawal seizures 12–48 h; delirium tremens typically 48–72 h.',
            'Wernicke encephalopathy: confusion, ataxia, ophthalmoplegia (the triad is often incomplete). Give thiamine before glucose.',
            'Korsakoff syndrome: anterograde amnesia with confabulation.',
            'Withdrawal treatment: benzodiazepines (chlordiazepoxide or diazepam; lorazepam in liver disease).',
            'Relapse prevention: naltrexone, acamprosate, disulfiram (with consent). Screening: CAGE, AUDIT.',
          ] },
          { h: 'Opioids and others', ul: [
            'Opioid overdose: pinpoint pupils, respiratory depression, coma. Antidote: naloxone.',
            'Opioid withdrawal: dilated pupils, yawning, lacrimation, rhinorrhoea, piloerection, diarrhoea. Uncomfortable but rarely life-threatening.',
            'Opioid agonist treatment: buprenorphine or methadone. Naltrexone blocks opioids.',
            'Cannabis can precipitate psychosis; cocaine causes formication ("cocaine bugs").',
          ] },
        ],
        points: ['DTs at 48–72 h; thiamine before glucose.', 'Naloxone reverses opioid overdose.', 'Opioid withdrawal: dilated pupils, yawning, piloerection.'],
        quiz: [
          { q: 'A chronic drinker becomes confused, ataxic and has nystagmus. First step:', o: ['IV dextrose', 'IV thiamine', 'Haloperidol', 'Naloxone'], a: 1, why: 'Suspect Wernicke encephalopathy; give thiamine (before glucose).' },
          { q: 'Delirium tremens typically begins:', o: ['Within 6 hours', '48–72 hours after the last drink', 'After 2 weeks', 'Only after seizures'], a: 1, why: 'DTs usually start 48–72 hours after cessation.' },
          { q: 'Which is a sign of opioid withdrawal, not intoxication?', o: ['Pinpoint pupils', 'Respiratory depression', 'Dilated pupils and piloerection', 'Drowsiness'], a: 2, why: 'Withdrawal causes mydriasis, piloerection, lacrimation and yawning.' },
        ],
      },
      {
        title: 'Psychopharmacology & emergencies', mins: 15,
        intro: 'The adverse-effect and emergency questions examiners love.',
        sections: [
          { h: 'NMS vs serotonin syndrome', ul: [
            'NMS: antipsychotic; develops over days; lead-pipe rigidity, hyperthermia, autonomic instability, high CK. Treat: stop the drug, supportive care, dantrolene or bromocriptine.',
            'Serotonin syndrome: serotonergic drugs; develops within hours; clonus, hyperreflexia, agitation, diarrhoea. Treat: stop the drugs, supportive care, cyproheptadine.',
          ] },
          { h: 'Other high-yield adverse effects', ul: [
            'TCA overdose: anticholinergic signs, seizures, arrhythmias with a widened QRS. Treat with sodium bicarbonate.',
            'Acute dystonia: within days; treat with an anticholinergic (e.g. promethazine or benztropine).',
            'Akathisia: treat with propranolol or a dose reduction.',
            'Valproate: neural tube defects, hepatotoxicity, pancreatitis. Carbamazepine: SJS/TEN (HLA-B*1502 in Asians), hyponatraemia, agranulocytosis.',
            'Hyperprolactinaemia: risperidone, typical antipsychotics.',
          ] },
          { h: 'ECT', ul: ['Indications: severe depression with suicidality or psychotic features, catatonia, treatment resistance, depression in pregnancy.', 'No absolute contraindications; raised intracranial pressure is the most important relative one.', 'Common side effect: transient memory impairment.'] },
        ],
        points: ['NMS: days, rigidity, high CK. Serotonin syndrome: hours, clonus.', 'TCA overdose: wide QRS → sodium bicarbonate.', 'Carbamazepine + HLA-B*1502 → SJS risk.'],
        quiz: [
          { q: 'Hours after adding tramadol to sertraline, a patient has agitation, hyperthermia, clonus and hyperreflexia. Diagnosis:', o: ['NMS', 'Serotonin syndrome', 'Malignant hyperthermia', 'Anticholinergic toxicity'], a: 1, why: 'Rapid onset with clonus and hyperreflexia after serotonergic drugs = serotonin syndrome.' },
          { q: 'Widened QRS after an overdose of amitriptyline is treated with:', o: ['Flumazenil', 'Sodium bicarbonate', 'Naloxone', 'Physostigmine'], a: 1, why: 'Sodium bicarbonate treats TCA cardiotoxicity.' },
          { q: 'Absolute contraindication to ECT:', o: ['Pregnancy', 'Raised intracranial pressure', 'There is no absolute contraindication', 'Old age'], a: 2, why: 'ECT has no absolute contraindications; raised ICP is the key relative one.' },
        ],
      },
    ],
  },
};
