/* Serenest Academy — specialty courses (part 2). Same format as courses-content.js.
   Educational content for students and clinicians. Not legal or medical advice; check the current
   text of each Act and current product labelling. */
Object.assign(window.SA_FULL = window.SA_FULL || {}, {

  /* ================================================================== */
  forensic: {
    level: 'Self-paced · 4 lessons · videos + quizzes',
    audience: 'Psychiatry residents, clinical psychologists, counsellors and law students.',
    outcomes: [
      'Apply the key rights and admission sections of the Mental Healthcare Act 2017',
      'Explain the insanity defence and fitness to stand trial under the new criminal laws',
      'Recognise common civil questions: capacity, marriage, POCSO reporting',
      'Write a clear, fair medico-legal report and structure a violence-risk assessment',
    ],
    lessons: [
      {
        title: 'The Mental Healthcare Act 2017: essentials', mins: 16,
        intro: 'The MHCA 2017 is a rights-based law. Every clinician and counsellor in India should know its core ideas, because they shape consent, admission and everyday care.',
        sections: [
          { h: 'Rights and capacity', ul: [
            'Capacity is decision-specific (Section 4): can the person understand the information, appreciate the consequences, and communicate a decision?',
            'Advance directive (Section 5): a person can state in advance how they wish to be treated, or not treated, if they later lose capacity.',
            'Nominated representative (Section 14): a person of the patient\'s choosing who supports decisions.',
            'Rights include access to care, dignity, confidentiality, freedom from cruel or degrading treatment, and legal aid.',
          ] },
          { h: 'Admission', ul: [
            'Independent admission (Sections 85–86): the person has capacity and chooses admission; they can ask to leave.',
            'Supported admission (Section 89): for up to 30 days when a person with severe mental illness lacks capacity and meets risk criteria; Section 90 covers longer periods, with Mental Health Review Board oversight.',
            'Minors (Section 87): admitted with the nominated representative\'s consent, only when community care is not enough, kept separate from adults.',
            'Emergency treatment (Section 94) is allowed for up to 72 hours in specified situations.',
          ] },
          { h: 'Treatments that are restricted', ul: [
            'ECT only with anaesthesia and muscle relaxants; in minors only with guardian consent and Board permission (Section 95).',
            'Physical restraint only when it is the only way to prevent imminent harm, recorded and reviewed (Section 97).',
            'Chaining is prohibited.',
          ] },
        ],
        points: ['Capacity is specific to each decision.', 'Supported admission has time limits and Board oversight.', 'Advance directives and nominated representatives give patients a voice.'],
        quiz: [
          { q: 'Under the MHCA 2017, capacity is:', o: ['A fixed trait decided once at admission', 'Specific to the decision being made', 'Absent in anyone with schizophrenia', 'Decided only by a magistrate'], a: 1, why: 'Section 4 defines capacity in relation to a particular decision.' },
          { q: 'A person states in writing, while well, that they never want a particular medicine. This is:', o: ['A nominated representative', 'An advance directive', 'A supported admission', 'A reception order'], a: 1, why: 'Section 5 allows advance directives about future treatment.' },
          { q: 'Which is prohibited under the MHCA 2017?', o: ['Independent admission', 'Chaining a person with mental illness', 'ECT with anaesthesia', 'Emergency treatment for up to 72 hours'], a: 1, why: 'Chaining is not permitted in any circumstance.' },
        ],
      },
      {
        title: 'Criminal responsibility & fitness to stand trial', mins: 15,
        intro: 'The Bharatiya Nyaya Sanhita (BNS) and Bharatiya Nagarik Suraksha Sanhita (BNSS) replaced the IPC and CrPC from 1 July 2024. The core legal tests for mental illness carried over.',
        sections: [
          { h: 'The insanity defence', ul: [
            'BNS Section 22 (earlier IPC Section 84): nothing is an offence if, at the time of the act, because of unsoundness of mind, the person was incapable of knowing the nature of the act, or that it was wrong or contrary to law.',
            'It is based on the M\'Naghten rules. The question is the person\'s mental state at the time of the act, not now.',
            'Legal insanity is narrower than medical illness: a diagnosis alone does not establish the defence.',
            'Voluntary intoxication is generally not a defence.',
          ] },
          { h: 'Fitness to stand trial', ul: [
            'A separate question: can the accused now understand the charges and proceedings and instruct a lawyer?',
            'The BNSS has a chapter on accused persons of unsound mind or with intellectual disability, replacing CrPC Sections 328–339.',
            'If unfit, proceedings are postponed and treatment is arranged; the case resumes when the person becomes fit.',
          ] },
          { h: 'Your role as an expert', p: 'Assess carefully, document what the person said and did, and give an opinion only within your expertise. The court decides the legal question; the psychiatrist describes mental state and how it relates to the legal test.' },
        ],
        points: ['Insanity: mental state at the time of the act (BNS s.22).', 'Fitness: ability to take part in the trial now.', 'Diagnosis alone ≠ legal insanity.'],
        quiz: [
          { q: 'The insanity defence (BNS Section 22) concerns:', o: ['The accused\'s mental state at the time of the act', 'The accused\'s mental state at trial only', 'Any lifetime psychiatric diagnosis', 'Intelligence quotient'], a: 0, why: 'The test looks at whether, at the time of the act, unsoundness of mind prevented knowing its nature or wrongness.' },
          { q: 'A man with schizophrenia is too disorganised to understand the charges or instruct his lawyer. The question raised is:', o: ['Criminal responsibility', 'Fitness to stand trial', 'Testamentary capacity', 'Diminished responsibility'], a: 1, why: 'Fitness concerns the present ability to participate in proceedings.' },
          { q: 'Which statement is correct?', o: ['Any psychiatric diagnosis makes a person legally insane', 'Legal insanity is a narrower test than having a mental illness', 'Voluntary intoxication is always a full defence', 'The psychiatrist decides guilt'], a: 1, why: 'Many people with mental illness do not meet the legal test; the court decides.' },
        ],
      },
      {
        title: 'Civil questions: capacity, marriage & POCSO', mins: 14,
        intro: 'Most forensic questions in everyday practice are civil, not criminal. These come up repeatedly in Indian clinics.',
        sections: [
          { h: 'Capacity questions', ul: [
            'Testamentary capacity (making a will): understanding what a will is, the extent of property, who might expect to inherit, and no delusion distorting these choices.',
            'Consent to treatment, contracts and financial decisions: always decision-specific.',
            'Assess and record the reasoning, not just the diagnosis.',
          ] },
          { h: 'Marriage and divorce', ul: [
            'Under the Hindu Marriage Act 1955, certain mental disorders can be grounds for annulment (Section 5 conditions) or divorce (Section 13), but only when severe enough as defined in the Act.',
            'Clinicians are often asked for certificates. Describe the illness, its course and treatment response honestly; avoid labels not supported by your assessment.',
          ] },
          { h: 'POCSO Act 2012: mandatory reporting', ul: [
            'Anyone, including counsellors and doctors, who knows or suspects a sexual offence against a child must report it to the police or Special Juvenile Police Unit (Section 19).',
            'Failure to report is itself an offence (Section 21).',
            'Tell the child and family honestly that you must report, and continue to support them.',
          ] },
        ],
        points: ['Capacity is assessed for a specific decision.', 'Certificates: honest, specific, within your assessment.', 'POCSO: reporting a suspected child sexual offence is mandatory.'],
        quiz: [
          { q: 'A 15-year-old discloses sexual abuse by a relative in counselling and asks you to tell no one. You must:', o: ['Keep it confidential as requested', 'Report it under the POCSO Act, explaining this honestly and continuing support', 'Tell only her parents', 'Wait until she turns 18'], a: 1, why: 'Section 19 requires reporting; Section 21 makes failure to report an offence.' },
          { q: 'Testamentary capacity includes understanding:', o: ['Only one\'s own name', 'The nature of a will, the extent of property and who might expect to inherit', 'Complex tax law', 'Nothing if a lawyer is present'], a: 1, why: 'These are the classic elements of testamentary capacity.' },
          { q: 'When writing a certificate for a matrimonial case, you should:', o: ['Write what the family asks for', 'Describe your assessment honestly and specifically', 'Diagnose the spouse you have not met', 'Refuse all such requests'], a: 1, why: 'Reports must reflect your own assessment and stay within your expertise.' },
        ],
      },
      {
        title: 'Medico-legal reports & violence risk', mins: 14,
        intro: 'A good report helps the court and protects the patient. A structured approach to risk avoids both alarmism and complacency.',
        sections: [
          { h: 'Structure of a report', ul: [
            'Who asked for the report and the exact questions.',
            'Sources: interviews (dates and duration), records, informants.',
            'History, mental state examination and investigations.',
            'Opinion: answer each question, with reasons, and state the limits of your opinion.',
            'Declaration that the opinion is your own and impartial.',
          ] },
          { h: 'Violence risk assessment', ul: [
            'Structured professional judgement tools such as the HCR-20 combine historical, clinical and risk-management factors.',
            'Strongest predictors: past violence, substance use, non-adherence, active psychotic symptoms with anger or threat, and lack of support.',
            'Most people with mental illness are not violent, and are more often victims of violence than perpetrators.',
            'Write a risk formulation: in what situations, towards whom, how likely, and what reduces it.',
          ] },
        ],
        points: ['Answer the questions asked, with reasons and limits.', 'Past violence and substance use are key risk factors.', 'Most people with mental illness are not violent.'],
        quiz: [
          { q: 'Which is the strongest predictor of future violence?', o: ['A diagnosis of depression', 'Past violent behaviour', 'Living in a city', 'Being female'], a: 1, why: 'History of violence is the most consistent predictor.' },
          { q: 'A good medico-legal opinion should:', o: ['Avoid giving reasons', 'Answer each question with reasons and state its limits', 'Decide guilt', 'Use only the referring lawyer\'s account'], a: 1, why: 'Transparent reasoning and limits make opinions useful and fair.' },
          { q: 'People with mental illness are:', o: ['Usually violent', 'More often victims of violence than perpetrators', 'Never violent', 'Always dangerous when psychotic'], a: 1, why: 'Stigmatising assumptions are not supported by evidence.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  child: {
    level: 'Self-paced · 4 lessons · videos + quizzes',
    audience: 'Counsellors, psychologists, school counsellors, paediatric and psychiatry trainees.',
    outcomes: [
      'Assess children and adolescents in a developmentally appropriate way',
      'Recognise ADHD, autism and intellectual disability, and the support available in India',
      'Respond to adolescent depression and self-harm',
      'Know your legal duties to children (POCSO, consent)',
    ],
    lessons: [
      {
        title: 'Assessing children & adolescents', mins: 14,
        intro: 'Children are not small adults. Assessment always involves the family and school, and must fit the child\'s developmental stage.',
        sections: [
          { h: 'How to assess', ul: [
            'Use several sources: parents, the child, teachers, school reports.',
            'Play and drawing help younger children talk; adolescents usually need time alone with you.',
            'Explain confidentiality and its limits to both adolescent and parents at the start.',
            'Ask about developmental milestones, school performance, friendships, sleep, screen use and family stress.',
          ] },
          { h: 'HEADSSS for adolescents', ul: [
            'Home, Education/Employment, Activities, Drugs, Sexuality, Suicide/depression, Safety.',
            'Start with easier topics (home, school) and move to sensitive ones once rapport is built.',
          ] },
          { h: 'Red flags', ul: ['Loss of previously acquired skills (regression)', 'Self-harm or suicidal talk', 'Signs of abuse or neglect', 'Marked weight loss or food restriction', 'Psychotic symptoms'] },
        ],
        points: ['Use multiple informants, including school.', 'See adolescents alone for part of the interview.', 'Developmental regression is always a red flag.'],
        quiz: [
          { q: 'The HEADSSS framework is used to:', o: ['Score IQ', 'Structure a psychosocial interview with adolescents', 'Diagnose autism', 'Assess infants'], a: 1, why: 'HEADSSS covers Home, Education, Activities, Drugs, Sexuality, Suicide and Safety.' },
          { q: 'A 3-year-old who used to speak in phrases has stopped talking. This is:', o: ['Normal shyness', 'Developmental regression that needs prompt assessment', 'Laziness', 'Expected at this age'], a: 1, why: 'Loss of acquired skills is a red flag for neurodevelopmental or neurological conditions.' },
          { q: 'With a 15-year-old, good practice is to:', o: ['Only speak with parents', 'Spend part of the interview with the adolescent alone, after explaining confidentiality limits', 'Promise total secrecy', 'Avoid asking about drugs'], a: 1, why: 'Time alone allows disclosure; confidentiality limits must be clear.' },
        ],
      },
      {
        title: 'ADHD', mins: 14,
        intro: 'ADHD is common, often missed in girls, and frequently mislabelled as laziness or bad parenting in Indian schools.',
        sections: [
          { h: 'Diagnosis (DSM-5)', ul: [
            'Inattention and/or hyperactivity-impulsivity: 6 or more symptoms (5 for those aged 17 and over), for at least 6 months.',
            'Several symptoms present before age 12.',
            'Present in two or more settings (for example home and school), with clear impairment.',
            'Rule out hearing or vision problems, learning disorders, anxiety, sleep problems and family stress.',
          ] },
          { h: 'Management', ul: [
            'Psychoeducation for parents and teachers; classroom adjustments (front seating, short tasks, breaks).',
            'Parent training is first-line for preschool children.',
            'Medicines for school-age children with significant impairment: methylphenidate (stimulant) or atomoxetine (non-stimulant), prescribed and monitored by a doctor (appetite, sleep, growth, heart rate and BP).',
          ] },
        ],
        points: ['Symptoms before 12, in 2+ settings, for 6+ months.', 'Parent training first for preschoolers.', 'ADHD is not bad parenting or laziness.'],
        quiz: [
          { q: 'For a DSM-5 diagnosis of ADHD, several symptoms must be present before age:', o: ['5', '7', '12', '18'], a: 2, why: 'DSM-5 requires several symptoms before age 12.' },
          { q: 'First-line treatment for a 4-year-old with ADHD symptoms:', o: ['Methylphenidate', 'Parent training', 'Antipsychotics', 'No intervention'], a: 1, why: 'Behavioural parent training is first-line in preschool children.' },
          { q: 'Symptoms seen only at home and never at school suggest:', o: ['Definite ADHD', 'Considering other explanations, since ADHD needs 2+ settings', 'Autism', 'Intellectual disability'], a: 1, why: 'Impairment across settings is required; look for other causes.' },
        ],
      },
      {
        title: 'Autism & intellectual disability', mins: 15,
        intro: 'Early identification changes outcomes. In India, certification also unlocks support under the Rights of Persons with Disabilities Act 2016.',
        sections: [
          { h: 'Autism spectrum disorder', ul: [
            'Persistent difficulties in social communication, plus restricted, repetitive behaviours or interests (including sensory sensitivities).',
            'Early signs: limited eye contact or response to name, no pointing to share interest, no single words by 16 months, no two-word phrases by 24 months, any loss of language or social skills.',
            'Screening: M-CHAT-R/F at 16–30 months. In India, ISAA is used for disability assessment.',
            'Support: early intervention (speech, behavioural, parent-mediated therapy), school inclusion.',
          ] },
          { h: 'Intellectual disability', ul: [
            'Deficits in intellectual functioning and adaptive functioning, beginning in the developmental period.',
            'Severity is defined by adaptive functioning, with IQ as supporting information (roughly below 70).',
            'Look for treatable causes: hypothyroidism, hearing loss, genetic conditions, nutrition.',
          ] },
          { h: 'Rights and support in India', ul: [
            'The RPwD Act 2016 recognises autism, intellectual disability and specific learning disabilities.',
            'A disability certificate and UDID card help families access benefits, education support and exam accommodations.',
          ] },
        ],
        points: ['No words by 16 months or any skill loss → assess early.', 'ID severity depends on adaptive functioning.', 'RPwD Act 2016 certification unlocks support.'],
        quiz: [
          { q: 'Which is an early warning sign of autism?', o: ['Walking at 12 months', 'No two-word phrases by 24 months', 'Fear of strangers at 9 months', 'Tantrums at age 3'], a: 1, why: 'Delayed or absent phrases by 24 months is a recognised red flag.' },
          { q: 'Intellectual disability severity is mainly determined by:', o: ['IQ alone', 'Adaptive functioning', 'Height', 'School marks only'], a: 1, why: 'DSM-5 grades severity by adaptive functioning.' },
          { q: 'Which law covers autism and intellectual disability for certification and benefits in India?', o: ['MHCA 2017', 'RPwD Act 2016', 'NDPS Act', 'POCSO Act'], a: 1, why: 'The Rights of Persons with Disabilities Act 2016.' },
        ],
      },
      {
        title: 'Adolescent depression & self-harm', mins: 15,
        intro: 'Exam pressure, family conflict, relationships and online life all shape adolescent mental health in India. Depression often shows up as irritability, not sadness.',
        sections: [
          { h: 'Recognising depression', ul: [
            'Irritability, falling marks, withdrawal from friends, sleep change, loss of interest.',
            'Ask directly about self-harm and suicidal thoughts. It is safe and necessary.',
            'Screen for bullying (including online), abuse, substance use and family conflict.',
          ] },
          { h: 'Treatment', ul: [
            'Mild depression: supportive counselling, sleep and activity, school liaison, review.',
            'Moderate to severe: CBT or interpersonal therapy; fluoxetine is the first-line antidepressant when medicine is needed, prescribed by a doctor with close monitoring for suicidal thoughts early on.',
            'Involve parents, while respecting the adolescent\'s privacy where safe.',
          ] },
          { h: 'Self-harm', ul: ['Respond calmly, without anger or shock.', 'Check the injury, assess suicidal intent, and make a safety plan with the adolescent and family.', 'Restrict access to medicines and other means at home.', 'Tele-MANAS 14416 and 112 for emergencies.'] },
        ],
        points: ['Adolescent depression often looks like irritability.', 'Fluoxetine is the first-line antidepressant in adolescents.', 'Meet self-harm with calm, safety planning and means restriction.'],
        quiz: [
          { q: 'Adolescent depression commonly presents as:', o: ['Always obvious sadness', 'Irritability and falling school performance', 'Mania', 'Increased appetite only'], a: 1, why: 'Irritability is a common presentation in young people.' },
          { q: 'When medicine is needed for adolescent depression, the first-line antidepressant is:', o: ['Amitriptyline', 'Fluoxetine', 'Paroxetine', 'Lithium'], a: 1, why: 'Fluoxetine has the best evidence in adolescents.' },
          { q: 'A 14-year-old shows you cuts on her arm. The best first response:', o: ['Tell her off so she stops', 'Stay calm, check the injury, ask about suicidal thoughts, and plan safety together', 'Ignore it to avoid reinforcing it', 'Call her school principal first'], a: 1, why: 'A calm, curious response and risk assessment keeps the young person engaged and safe.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  addiction: {
    level: 'Self-paced · 5 lessons · videos + quizzes',
    audience: 'Counsellors, psychologists, doctors and de-addiction centre staff.',
    outcomes: [
      'Explain addiction as a treatable health condition, without stigma',
      'Screen with AUDIT and deliver a brief intervention using motivational interviewing',
      'Recognise withdrawal states and the medicines used to manage them',
      'Build relapse-prevention plans and support families',
    ],
    lessons: [
      {
        title: 'Understanding addiction', mins: 13,
        intro: 'Addiction is a health condition involving the brain\'s reward and control systems. It is not a moral failure, and it is treatable.',
        sections: [
          { h: 'What happens in the brain', p: 'Alcohol and drugs repeatedly activate the brain\'s reward pathways. Over time, the brain adapts: the person needs more for the same effect (tolerance), feels unwell without it (withdrawal), and cues such as places or people trigger strong craving. Control over use weakens even when the person sincerely wants to stop.' },
          { h: 'Recognising dependence (ICD-11 features)', ul: [
            'Impaired control over use: starting, amount, stopping.',
            'Use becoming a priority over other interests and responsibilities, continuing despite harm.',
            'Physiological features: tolerance, withdrawal, or using to avoid withdrawal.',
          ] },
          { h: 'Language matters', ul: ['Say "person with alcohol use disorder", not "alcoholic" or "addict".', 'Stigma keeps people from seeking help; respectful language keeps them in treatment.'] },
        ],
        points: ['Addiction changes reward and control systems.', 'Tolerance, withdrawal and loss of control are core features.', 'Person-first language reduces stigma.'],
        quiz: [
          { q: 'Needing more alcohol to get the same effect is called:', o: ['Withdrawal', 'Tolerance', 'Craving', 'Relapse'], a: 1, why: 'Tolerance is reduced effect with repeated use.' },
          { q: 'Which phrase is preferred?', o: ['"Addict"', '"Person with substance use disorder"', '"Drunkard"', '"Junkie"'], a: 1, why: 'Person-first language reduces stigma.' },
          { q: 'Which is a core feature of dependence?', o: ['Using only at weddings', 'Impaired control over use', 'Disliking the taste', 'Drinking tea daily'], a: 1, why: 'Impaired control is central to dependence.' },
        ],
      },
      {
        title: 'Screening & motivational interviewing', mins: 15,
        intro: 'A few minutes of skilled conversation can change drinking and drug use. Screening finds people early; motivational interviewing helps them decide.',
        sections: [
          { h: 'Screening', ul: [
            'AUDIT: 10 questions; a score of 8 or more suggests hazardous or harmful drinking, and higher scores suggest possible dependence.',
            'AUDIT-C (first 3 questions) is a quick screen.',
            'Ask about tobacco, cannabis, opioids and prescription sedatives too.',
          ] },
          { h: 'Motivational interviewing (OARS)', ul: [
            'Open questions: "What do you like about drinking? What worries you?"',
            'Affirmations: recognise strengths and efforts.',
            'Reflections: repeat back the meaning, especially "change talk".',
            'Summaries: pull together reasons for change.',
            'Avoid arguing; resistance is a signal to change approach.',
          ] },
          { h: 'Stages of change', p: 'Pre-contemplation, contemplation, preparation, action, maintenance (and relapse). Match the conversation to the stage: raise awareness early, help plan when the person is ready.' },
        ],
        points: ['AUDIT ≥ 8 = hazardous/harmful drinking.', 'OARS: open questions, affirmations, reflections, summaries.', 'Match the intervention to the stage of change.'],
        quiz: [
          { q: 'An AUDIT score of 8 or more suggests:', o: ['No risk', 'Hazardous or harmful drinking', 'Opioid dependence', 'Depression'], a: 1, why: 'AUDIT ≥ 8 is the usual threshold for hazardous or harmful use.' },
          { q: 'A client says "I know I should cut down, but it helps me sleep". The MI response is:', o: ['"You must stop now."', '"Part of you wants to cut down, and part of you worries about sleep."', '"Everyone says that."', '"Then keep drinking."'], a: 1, why: 'A double-sided reflection explores ambivalence without arguing.' },
          { q: 'A person who does not see any problem with their drinking is in:', o: ['Action', 'Pre-contemplation', 'Maintenance', 'Preparation'], a: 1, why: 'Pre-contemplation: not yet considering change.' },
        ],
      },
      {
        title: 'Withdrawal & medicines', mins: 15,
        intro: 'Withdrawal can be uncomfortable or dangerous. Knowing which is which helps you refer at the right time.',
        sections: [
          { h: 'Alcohol', ul: [
            'Withdrawal starts 6–24 hours after the last drink: tremor, sweating, anxiety, insomnia.',
            'Seizures (12–48 h) and delirium tremens (48–72 h) are emergencies.',
            'Treatment: benzodiazepines guided by CIWA-Ar, and thiamine to prevent Wernicke encephalopathy.',
            'After detox: naltrexone, acamprosate, or disulfiram (only with informed consent).',
          ] },
          { h: 'Opioids', ul: [
            'Withdrawal: dilated pupils, yawning, watery eyes, runny nose, gooseflesh, cramps, diarrhoea. Measured with COWS.',
            'Buprenorphine or methadone: long-term opioid agonist treatment reduces overdose and relapse.',
            'Overdose: pinpoint pupils, slow breathing → naloxone and emergency care.',
          ] },
          { h: 'Tobacco', ul: ['Nicotine replacement (gum, patch), varenicline or bupropion, plus counselling, roughly double quit rates.', 'National Tobacco Quitline: 1800-11-2356.'] },
        ],
        points: ['Alcohol withdrawal can kill: seizures and DTs.', 'Thiamine before glucose in heavy drinkers.', 'Opioid agonist treatment saves lives.'],
        quiz: [
          { q: 'Delirium tremens usually begins:', o: ['Within 2 hours', '48–72 hours after the last drink', 'After 3 weeks', 'Only in tobacco users'], a: 1, why: 'DTs typically appear 48–72 hours after stopping.' },
          { q: 'Which scale measures opioid withdrawal?', o: ['CIWA-Ar', 'COWS', 'AUDIT', 'PHQ-9'], a: 1, why: 'The Clinical Opiate Withdrawal Scale.' },
          { q: 'Tobacco quit rates are roughly doubled by:', o: ['Willpower alone', 'Medication (NRT, varenicline, bupropion) plus counselling', 'Switching to bidis', 'E-cigarettes only'], a: 1, why: 'Combined pharmacotherapy and support works best.' },
        ],
      },
      {
        title: 'Relapse prevention & families', mins: 14,
        intro: 'Relapse is common and is part of recovery, not the end of it. Families can be powerful allies when they are supported too.',
        sections: [
          { h: 'Relapse prevention', ul: [
            'Identify high-risk situations: people, places, emotions, paydays, festivals.',
            'HALT: watch for being Hungry, Angry, Lonely, Tired.',
            'Plan coping responses: leave, call someone, delay 15 minutes, urge surfing.',
            'A lapse (one drink) does not need to become a relapse. Review what happened without shame.',
          ] },
          { h: 'Working with families', ul: [
            'Families often swing between anger and rescuing. Both are understandable.',
            'Community Reinforcement and Family Training (CRAFT) teaches families to reward sober behaviour, allow natural consequences, and invite the person into treatment.',
            'Support family members\' own wellbeing; screen for domestic violence.',
          ] },
          { h: 'The law', ul: ['NDPS Act Section 64A: a person dependent on drugs who volunteers for treatment can get immunity from prosecution for consumption or small quantities, if they complete treatment.', 'This makes it safe to encourage voluntary treatment.'] },
        ],
        points: ['A lapse is not a failure; learn from it.', 'HALT and high-risk situations guide planning.', 'NDPS s.64A protects those who volunteer for treatment.'],
        quiz: [
          { q: 'HALT stands for:', o: ['Hungry, Angry, Lonely, Tired', 'Heroin, Alcohol, LSD, Tobacco', 'Help, Assess, Listen, Treat', 'Hope, Action, Love, Trust'], a: 0, why: 'HALT flags common relapse triggers.' },
          { q: 'Under NDPS Act Section 64A, a drug-dependent person who volunteers for treatment:', o: ['Is always prosecuted', 'Can get immunity from prosecution for consumption or small quantities, if treatment is completed', 'Loses all rights', 'Must go to jail first'], a: 1, why: 'Section 64A encourages voluntary treatment.' },
          { q: 'CRAFT helps families to:', o: ['Force the person into treatment', 'Reward sober behaviour and invite the person into treatment', 'Cut off all contact', 'Secretly give medicines'], a: 1, why: 'CRAFT uses positive reinforcement and engagement.' },
        ],
      },
      {
        title: 'Behavioural addictions: gaming & gambling', mins: 12,
        intro: 'Online gaming and betting have grown rapidly in India, especially among young men. Some patterns meet criteria for a disorder.',
        sections: [
          { h: 'Gaming disorder (ICD-11)', ul: [
            'Impaired control over gaming, increasing priority over other activities, and continuation despite harm.',
            'Usually evident over at least 12 months, with significant impairment in personal, family, educational or work life.',
            'High engagement alone is not a disorder; look for loss of control and harm.',
          ] },
          { h: 'Gambling', ul: ['Chasing losses, borrowing or stealing to gamble, lying to family.', 'Screen for debt, depression and suicidal thoughts; financial crisis is a major risk factor.'] },
          { h: 'Help', ul: ['CBT and motivational interviewing; structured screen-time and money plans agreed with the person.', 'Family involvement, blocking apps or payment limits where agreed.', 'Treat co-existing ADHD, depression or anxiety.'] },
        ],
        points: ['Gaming disorder = loss of control + priority + harm, usually over 12 months.', 'Gambling debt raises suicide risk: always ask.', 'Treat co-existing ADHD, depression and anxiety.'],
        quiz: [
          { q: 'Which is required for ICD-11 gaming disorder?', o: ['Playing more than 2 hours a day', 'Impaired control and continued gaming despite significant harm', 'Owning a gaming console', 'Playing online with friends'], a: 1, why: 'The disorder is defined by loss of control and harm, not hours alone.' },
          { q: 'A young man has large betting debts and has stopped eating. You should first:', o: ['Discuss budgeting only', 'Ask about suicidal thoughts and assess risk', 'Recommend a different app', 'Contact the bank'], a: 1, why: 'Financial crisis from gambling is a strong suicide risk factor.' },
          { q: 'Gaming disorder usually needs symptoms over about:', o: ['1 week', '1 month', '12 months', '5 years'], a: 2, why: 'ICD-11 usually requires the pattern over at least 12 months.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  geriatric: {
    level: 'Self-paced · 4 lessons · videos + quizzes',
    audience: 'Counsellors, psychologists, nurses, GPs and caregivers of older adults.',
    outcomes: [
      'Recognise depression, dementia and delirium in older adults and tell them apart',
      'Know safer medicine principles in old age',
      'Support caregivers and recognise elder abuse',
      'Use Indian laws and helplines for older people',
    ],
    lessons: [
      {
        title: 'Depression in older adults', mins: 13,
        intro: 'Depression is not a normal part of ageing. In older Indians it often presents with physical complaints, poor sleep, or memory problems.',
        sections: [
          { h: 'How it presents', ul: [
            'Aches, fatigue, poor appetite and sleep, more than low mood.',
            'Memory complaints that improve with treatment ("depressive pseudodementia").',
            'Loss of role after retirement, widowhood, illness, isolation as children migrate.',
            'Suicide risk is high in older men, especially with illness, loneliness or alcohol.',
          ] },
          { h: 'Treatment', ul: [
            'Counselling, activity, social connection, treatment of pain and hearing or vision problems.',
            'Antidepressants such as sertraline or escitalopram started low and increased slowly; watch for low sodium, falls and bleeding risk.',
            'Use the Geriatric Depression Scale (GDS) for screening.',
          ] },
        ],
        points: ['Depression is not normal ageing.', 'Physical and memory complaints may hide depression.', 'Start low, go slow; watch sodium and falls.'],
        quiz: [
          { q: 'A 72-year-old with new memory complaints, poor sleep and low appetite after his wife\'s death most likely needs assessment for:', o: ['Normal ageing', 'Depression, which can mimic dementia', 'Schizophrenia', 'No action'], a: 1, why: 'Depressive pseudodementia improves with treatment.' },
          { q: 'Which screening tool is designed for older adults?', o: ['AUDIT', 'Geriatric Depression Scale', 'M-CHAT', 'COWS'], a: 1, why: 'The GDS is validated for older adults.' },
          { q: 'A common SSRI risk in older adults is:', o: ['High sodium', 'Low sodium (hyponatraemia) and falls', 'Weight loss only', 'Hair growth'], a: 1, why: 'SSRIs can cause hyponatraemia, especially in the elderly.' },
        ],
      },
      {
        title: 'Dementia', mins: 15,
        intro: 'Dementia is a progressive decline in memory and other thinking skills severe enough to affect daily life. Early diagnosis helps families plan.',
        sections: [
          { h: 'Main types', ul: [
            'Alzheimer\'s disease: gradual memory loss, then language and orientation.',
            'Vascular dementia: step-wise decline, often with stroke risk factors.',
            'Lewy body dementia: fluctuating attention, vivid visual hallucinations, parkinsonism, severe sensitivity to antipsychotics.',
            'Frontotemporal dementia: early personality and behaviour change, often at a younger age.',
          ] },
          { h: 'Assessment and treatment', ul: [
            'Rule out reversible causes: hypothyroidism, B12 deficiency, depression, medicines, hearing loss.',
            'Cognitive screening: MMSE or MoCA, adjusted for education. HMSE is used in Hindi-speaking areas.',
            'Medicines: donepezil, rivastigmine or galantamine (cholinesterase inhibitors); memantine for moderate to severe disease.',
            'Behavioural symptoms: look for pain, infection, constipation and environment first; antipsychotics only when essential, briefly and at low dose.',
          ] },
        ],
        points: ['Always look for reversible causes.', 'Lewy body dementia: visual hallucinations + antipsychotic sensitivity.', 'Behaviour change: check pain, infection, constipation first.'],
        quiz: [
          { q: 'Fluctuating attention, vivid visual hallucinations and parkinsonism suggest:', o: ['Alzheimer\'s disease', 'Lewy body dementia', 'Frontotemporal dementia', 'Normal ageing'], a: 1, why: 'Classic triad of dementia with Lewy bodies.' },
          { q: 'Which is a reversible cause of cognitive impairment?', o: ['Alzheimer\'s disease', 'Vitamin B12 deficiency', 'Frontotemporal dementia', 'Age itself'], a: 1, why: 'B12 deficiency, hypothyroidism and depression are treatable.' },
          { q: 'A man with dementia becomes newly agitated. First step:', o: ['Start haloperidol', 'Look for pain, infection, constipation or environmental triggers', 'Increase donepezil', 'Restrain him'], a: 1, why: 'Behavioural change often has a physical or environmental cause.' },
        ],
      },
      {
        title: 'Delirium', mins: 13,
        intro: 'Delirium is an acute, fluctuating confusion caused by a medical problem. It is common in hospital, often missed, and a medical emergency.',
        sections: [
          { h: 'Recognise it', ul: [
            'Acute onset over hours to days, with fluctuation (often worse at night).',
            'Inattention is the core feature; also disorganised thinking or altered consciousness.',
            'Hypoactive delirium (quiet, sleepy) is easily missed.',
            'Screening: Confusion Assessment Method (CAM) or 4AT.',
          ] },
          { h: 'Causes and care', ul: [
            'Infection, dehydration, medicines (anticholinergics, sedatives, opioids), urinary retention, constipation, low sodium, alcohol withdrawal, stroke.',
            'Treat the cause; reorient (clock, calendar, family), glasses and hearing aids, sleep routine, mobilise.',
            'Avoid benzodiazepines (except in alcohol withdrawal); use antipsychotics only briefly for severe distress or danger.',
          ] },
        ],
        points: ['Acute + fluctuating + inattention = delirium.', 'Hypoactive delirium is often missed.', 'Find and treat the cause; avoid sedatives.'],
        quiz: [
          { q: 'The core feature of delirium is:', o: ['Gradual memory loss over years', 'Inattention with acute, fluctuating onset', 'Depressed mood', 'Delusions only'], a: 1, why: 'CAM requires acute onset/fluctuation and inattention.' },
          { q: 'A quiet, sleepy elderly inpatient who cannot follow a conversation may have:', o: ['Normal tiredness', 'Hypoactive delirium', 'Mania', 'Dementia only'], a: 1, why: 'Hypoactive delirium is common and often missed.' },
          { q: 'Benzodiazepines in delirium should generally be:', o: ['First-line', 'Avoided, except in alcohol withdrawal', 'Given at night routinely', 'Doubled'], a: 1, why: 'They worsen delirium except in alcohol or benzodiazepine withdrawal.' },
        ],
      },
      {
        title: 'Medicines, caregivers & elder rights', mins: 13,
        intro: 'Older adults take many medicines and depend on caregivers who often struggle silently. Indian law gives older people specific protections.',
        sections: [
          { h: 'Safer medicines', ul: [
            'Anticholinergic burden (e.g. amitriptyline, chlorpheniramine, oxybutynin) worsens memory and causes falls and constipation.',
            'Tools such as the Beers criteria list medicines to avoid or use with care.',
            'Review the full medicine list at every visit, including over-the-counter and Ayurvedic products.',
          ] },
          { h: 'Caregivers', ul: ['Caregiver depression and burnout are common, especially in women caring at home.', 'Offer psychoeducation, respite ideas and support groups; ask about their own health.'] },
          { h: 'Elder abuse and the law', ul: [
            'Abuse can be physical, emotional, financial or neglect; watch for unexplained injuries, fear, or sudden changes in finances.',
            'Maintenance and Welfare of Parents and Senior Citizens Act 2007: older people can claim maintenance from children or relatives through tribunals.',
            'Elderline: national helpline 14567.',
          ] },
        ],
        points: ['Reduce anticholinergic burden.', 'Ask caregivers how they are coping.', 'Elderline 14567; MWPSC Act 2007 for maintenance.'],
        quiz: [
          { q: 'Which medicine adds significant anticholinergic burden in the elderly?', o: ['Paracetamol', 'Amitriptyline', 'Sertraline at low dose', 'Vitamin D'], a: 1, why: 'Tricyclics are strongly anticholinergic.' },
          { q: 'The national helpline for older persons in India is:', o: ['1098', '14567', '181', '1800-11-2356'], a: 1, why: 'Elderline 14567.' },
          { q: 'An older woman says her son took her pension and she is afraid of him. This suggests:', o: ['Normal family matters', 'Possible financial and emotional elder abuse needing safety planning', 'Dementia only', 'Paranoia, to be ignored'], a: 1, why: 'Fear and financial exploitation are signs of elder abuse.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  perinatal: {
    level: 'Self-paced · 4 lessons · videos + quizzes',
    audience: 'Counsellors, psychologists, obstetric and psychiatry trainees, nurses and ASHA trainers.',
    outcomes: [
      'Tell apart baby blues, postpartum depression and postpartum psychosis',
      'Screen using the EPDS and act on the self-harm item',
      'Understand the principles of medicines in pregnancy and breastfeeding',
      'Support mothers within Indian family contexts',
    ],
    lessons: [
      {
        title: 'Blues, depression & psychosis', mins: 14,
        intro: 'Up to 1 in 5 women experience mental health problems in pregnancy or the year after birth. Knowing which picture you are seeing decides how urgently to act.',
        sections: [
          { h: 'Three different pictures', ul: [
            'Baby blues: very common (roughly half of new mothers), tearfulness and mood swings in the first days, settles within about 2 weeks. Reassure and support.',
            'Postpartum depression: about 1 in 7 to 1 in 10 mothers; low mood, anxiety, guilt, not enjoying the baby, lasting beyond 2 weeks. Needs treatment.',
            'Postpartum psychosis: about 1–2 per 1,000 births, usually within the first 2 weeks; confusion, rapidly changing mood, delusions or hallucinations. A psychiatric emergency.',
          ] },
          { h: 'Who is at higher risk', ul: ['Previous depression or bipolar disorder (bipolar disorder greatly raises psychosis risk)', 'Lack of support, marital conflict, domestic violence', 'Unplanned pregnancy, pregnancy loss, sick or premature baby', 'Pressure about the baby\'s sex'] },
        ],
        points: ['Blues settle within ~2 weeks; depression does not.', 'Postpartum psychosis is an emergency.', 'History of bipolar disorder is the biggest psychosis risk.'],
        quiz: [
          { q: 'Tearfulness on day 4 after delivery that settles by day 10 is most likely:', o: ['Postpartum psychosis', 'Baby blues', 'Postpartum depression', 'Schizophrenia'], a: 1, why: 'Baby blues are common, early and short-lived.' },
          { q: 'A mother 6 days after delivery is confused, not sleeping, and believes the baby is possessed. This is:', o: ['Baby blues', 'Possible postpartum psychosis, a psychiatric emergency', 'Normal tiredness', 'Postpartum depression only'], a: 1, why: 'Rapid onset with confusion and delusions requires emergency care.' },
          { q: 'The strongest risk factor for postpartum psychosis is:', o: ['First baby', 'History of bipolar disorder', 'Caesarean section', 'Breastfeeding'], a: 1, why: 'Bipolar disorder greatly increases risk.' },
        ],
      },
      {
        title: 'Screening with the EPDS', mins: 12,
        intro: 'The Edinburgh Postnatal Depression Scale (EPDS) is a 10-item questionnaire validated in many Indian languages. It is a screen, not a diagnosis.',
        sections: [
          { h: 'Using the EPDS', ul: [
            'Ask about the past 7 days; it can be used in pregnancy and after birth.',
            'Scores of about 10 or more suggest possible depression; 13 or more suggests probable depression needing assessment (cut-offs vary by setting).',
            'Item 10 asks about thoughts of self-harm: any positive answer needs same-day risk assessment, whatever the total score.',
          ] },
          { h: 'After screening', ul: ['Discuss results kindly; many mothers fear being judged as bad mothers.', 'Offer counselling (e.g. Thinking Healthy Programme, developed for South Asian settings), and refer for medical assessment when moderate or severe.', 'Rescreen later in pregnancy and after birth.'] },
        ],
        points: ['EPDS is a screen, not a diagnosis.', 'Item 10 positive → same-day risk assessment.', 'Thinking Healthy Programme suits South Asian settings.'],
        quiz: [
          { q: 'A mother scores 7 on the EPDS but answers "sometimes" to item 10 (self-harm thoughts). You should:', o: ['Reassure her because the total is low', 'Assess suicide risk the same day', 'Rescreen in 3 months', 'Ignore item 10'], a: 1, why: 'Any positive response to item 10 needs immediate assessment.' },
          { q: 'The EPDS asks about:', o: ['The past 7 days', 'The past year', 'Childhood', 'Only pregnancy'], a: 0, why: 'It covers the previous 7 days.' },
          { q: 'Which psychological programme was designed for perinatal depression in South Asia?', o: ['Thinking Healthy Programme', 'CRAFT', 'HCR-20', 'ERP'], a: 0, why: 'The WHO Thinking Healthy Programme was developed in South Asia.' },
        ],
      },
      {
        title: 'Medicines in pregnancy & breastfeeding', mins: 14,
        intro: 'Untreated maternal illness carries real risks for mother and baby. Medicine decisions weigh both, and belong to the psychiatrist and obstetrician together with the mother.',
        sections: [
          { h: 'Principles', ul: [
            'Plan before pregnancy where possible.',
            'Do not stop medicines suddenly when pregnancy is discovered; relapse risk is high. Seek a prompt review.',
            'Use the lowest effective dose of the best-studied medicine, and avoid unnecessary switches.',
          ] },
          { h: 'Key facts', ul: [
            'Sertraline is often preferred in breastfeeding because little reaches the baby.',
            'Valproate should be avoided in pregnancy because of high risks of birth defects and developmental problems.',
            'Lithium may be continued in some women with careful specialist monitoring of levels, especially around delivery.',
            'Watch breastfed babies for sleepiness or poor feeding with sedating medicines.',
          ] },
          { h: 'Your role as a counsellor', p: 'Listen to fears (many families stop medicines because of advice from relatives), share accurate information, and help the mother bring questions to her doctors. Do not advise stopping or changing medicines yourself.' },
        ],
        points: ['Never stop psychiatric medicines suddenly on finding pregnancy.', 'Valproate: avoid in pregnancy.', 'Sertraline is commonly preferred in breastfeeding.'],
        quiz: [
          { q: 'A woman on an antidepressant discovers she is pregnant. Best advice:', o: ['Stop immediately', 'Do not stop suddenly; see the psychiatrist promptly to review', 'Double the dose', 'Switch to herbal products'], a: 1, why: 'Sudden stopping risks relapse and withdrawal.' },
          { q: 'Which medicine is generally avoided in pregnancy because of high teratogenic risk?', o: ['Sertraline', 'Valproate', 'Paracetamol', 'Folic acid'], a: 1, why: 'Valproate carries high risks of malformations and developmental problems.' },
          { q: 'An antidepressant commonly preferred while breastfeeding:', o: ['Sertraline', 'Lithium', 'Valproate', 'Doxepin'], a: 0, why: 'Sertraline has low transfer into breast milk.' },
        ],
      },
      {
        title: 'Supporting mothers in Indian families', mins: 12,
        intro: 'Family structure can protect or harm. Practical, culturally sensitive support makes the biggest difference.',
        sections: [
          { h: 'Family context', ul: [
            'Traditions such as the 40-day confinement can be supportive, or isolating and controlling.',
            'Pressure about the baby\'s sex, dowry, and conflict with in-laws are common stressors.',
            'Ask privately about domestic violence; pregnancy can be a time when it starts or worsens.',
          ] },
          { h: 'What helps', ul: [
            'Involve husband and family in psychoeducation; share the load of night feeds and chores.',
            'Protect sleep; it is a powerful treatment and a relapse trigger.',
            'Connect with ASHAs, anganwadi workers and community support.',
            'Helplines: Tele-MANAS 14416; Women Helpline 181; 112 for emergencies.',
          ] },
        ],
        points: ['Ask about domestic violence privately.', 'Protecting the mother\'s sleep protects her mental health.', 'Women Helpline 181; Tele-MANAS 14416.'],
        quiz: [
          { q: 'Why is protecting sleep important for new mothers with mental illness?', o: ['It is not important', 'Sleep loss can trigger relapse, especially in bipolar disorder', 'Only for the baby', 'To reduce feeding'], a: 1, why: 'Sleep deprivation is a strong relapse trigger.' },
          { q: 'The national Women Helpline number is:', o: ['181', '1098', '14567', '108'], a: 0, why: 'Women Helpline 181.' },
          { q: 'When should you ask about domestic violence?', o: ['Only if the woman raises it', 'Routinely and privately, without family members present', 'In front of her husband', 'Never'], a: 1, why: 'Private, routine enquiry is safer and more effective.' },
        ],
      },
    ],
  },
});
