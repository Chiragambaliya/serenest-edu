/* Serenest Academy — MBBS & NEET-PG track, 2nd-year subjects. Same format as mbbs-content.js. */
Object.assign(window.SA_FULL = window.SA_FULL || {}, {

  /* ================================================================== */
  'mbbs-pathology': {
    level: 'MBBS & NEET-PG · 4 lessons · MCQs',
    audience: 'MBBS students and NEET-PG / INI-CET aspirants.',
    outcomes: ['Classify cell injury, necrosis and inflammation', 'Match translocations and tumour markers to cancers', 'Work up anaemias and bleeding disorders', 'Recognise classic systemic pathology findings'],
    lessons: [
      {
        title: 'Cell injury & inflammation', mins: 15,
        intro: 'General pathology is the grammar of the subject. Necrosis types and inflammatory mediators come up every year.',
        sections: [
          { h: 'Necrosis', ul: [
            'Coagulative: architecture preserved; typical of infarcts (heart, kidney), except brain.',
            'Liquefactive: brain infarcts and abscesses.',
            'Caseous: cheese-like, typical of tuberculosis.',
            'Fat necrosis: acute pancreatitis (saponification) and breast trauma.',
            'Fibrinoid: vasculitis and malignant hypertension.',
          ] },
          { h: 'Apoptosis', ul: ['Programmed cell death driven by caspases, with no inflammation.', 'BCL-2 is anti-apoptotic; p53 promotes apoptosis after DNA damage.', 'Councilman bodies in viral hepatitis are apoptotic hepatocytes.'] },
          { h: 'Inflammation', ul: [
            'Acute: neutrophils; chronic: macrophages, lymphocytes, plasma cells.',
            'Granuloma: epithelioid macrophages, often with Langhans giant cells (TB, sarcoidosis, leprosy).',
            'Mediators: histamine (first, vasodilation), bradykinin (pain), PGE2 (fever, pain), LTB4 and C5a (neutrophil chemotaxis), IL-1 and TNF (fever, acute-phase response).',
          ] },
        ],
        points: ['Brain infarct = liquefactive, not coagulative.', 'Apoptosis: caspases, no inflammation.', 'LTB4 and C5a are chemotactic.'],
        quiz: [
          { q: 'Necrosis typical of a brain infarct:', o: ['Coagulative', 'Liquefactive', 'Caseous', 'Fibrinoid'], a: 1, why: 'The brain undergoes liquefactive necrosis.' },
          { q: 'Which is a chemotactic agent for neutrophils?', o: ['Histamine', 'Bradykinin', 'Leukotriene B4', 'Prostacyclin'], a: 2, why: 'LTB4 and C5a are key neutrophil chemoattractants.' },
          { q: 'Apoptosis is characterised by:', o: ['Marked inflammation', 'Caspase activation without inflammation', 'Cell swelling', 'Always pathological'], a: 1, why: 'Apoptosis is a controlled, non-inflammatory process.' },
        ],
      },
      {
        title: 'Neoplasia', mins: 15,
        intro: 'Translocations, tumour markers and psammoma bodies are pure recall marks.',
        sections: [
          { h: 'Genes', ul: ['Tumour suppressors: RB (retinoblastoma, Knudson two-hit hypothesis), TP53 (Li–Fraumeni syndrome).', 'Oncogenes: RAS, MYC, HER2/neu (breast cancer, target of trastuzumab).'] },
          { h: 'Translocations', ul: [
            't(9;22) BCR–ABL: chronic myeloid leukaemia (Philadelphia chromosome); imatinib.',
            't(8;14) MYC: Burkitt lymphoma ("starry sky").',
            't(14;18) BCL2: follicular lymphoma.',
            't(15;17) PML–RARA: acute promyelocytic leukaemia; treated with ATRA, risk of DIC.',
            't(11;14) cyclin D1: mantle cell lymphoma.',
          ] },
          { h: 'Markers and clues', ul: [
            'AFP: hepatocellular carcinoma, yolk sac tumour. β-hCG: choriocarcinoma. CA-125: ovarian. CEA: colorectal. PSA: prostate. CA 19-9: pancreas.',
            'Psammoma bodies: papillary thyroid carcinoma, serous ovarian tumours, meningioma, mesothelioma.',
            'Reed–Sternberg cells (CD15, CD30): Hodgkin lymphoma.',
          ] },
        ],
        points: ['t(9;22) CML; t(8;14) Burkitt; t(15;17) APL.', 'AFP → HCC; CA-125 → ovary.', 'Psammoma: papillary thyroid, serous ovary, meningioma.'],
        quiz: [
          { q: 't(15;17) is characteristic of:', o: ['CML', 'Acute promyelocytic leukaemia', 'Burkitt lymphoma', 'Follicular lymphoma'], a: 1, why: 'PML–RARA fusion in APL, treated with all-trans retinoic acid.' },
          { q: 'Psammoma bodies are seen in:', o: ['Follicular thyroid carcinoma', 'Papillary thyroid carcinoma', 'Medullary thyroid carcinoma', 'Anaplastic carcinoma'], a: 1, why: 'Papillary carcinoma classically shows psammoma bodies.' },
          { q: 'Raised AFP is most associated with:', o: ['Prostate cancer', 'Hepatocellular carcinoma', 'Colorectal cancer', 'Breast cancer'], a: 1, why: 'AFP is a marker of HCC and yolk sac tumours.' },
        ],
      },
      {
        title: 'Haematology', mins: 16,
        intro: 'Interpret iron studies and coagulation tests and most haematology questions answer themselves.',
        sections: [
          { h: 'Microcytic anaemia', ul: [
            'Iron deficiency: low ferritin, high TIBC; commonest anaemia in India.',
            'Anaemia of chronic disease: high or normal ferritin, low TIBC.',
            'β-thalassaemia trait: normal ferritin, HbA2 above 3.5%; Mentzer index (MCV ÷ RBC count) below 13 favours thalassaemia.',
            'Sideroblastic anaemia: ring sideroblasts on Prussian blue stain.',
          ] },
          { h: 'Haemolytic anaemia', ul: ['Hereditary spherocytosis: raised MCHC, increased osmotic fragility, spectrin/ankyrin defects; splenectomy helps.', 'Sickle cell: HbS, target cells and sickled cells; vaso-occlusive crises.'] },
          { h: 'Bleeding disorders', ul: [
            'Haemophilia A (factor VIII) and B (IX): X-linked; prolonged aPTT, normal PT and platelets.',
            'Von Willebrand disease: prolonged bleeding time, aPTT may be prolonged; commonest inherited bleeding disorder.',
            'DIC: prolonged PT and aPTT, low platelets and fibrinogen, high D-dimer.',
            'Warfarin is monitored with PT/INR; unfractionated heparin with aPTT.',
          ] },
        ],
        points: ['Low ferritin = iron deficiency.', 'HbA2 > 3.5% = β-thal trait.', 'Haemophilia: ↑aPTT, normal PT.'],
        quiz: [
          { q: 'Microcytic anaemia with normal ferritin and HbA2 of 5% suggests:', o: ['Iron deficiency', 'β-thalassaemia trait', 'Anaemia of chronic disease', 'Sideroblastic anaemia'], a: 1, why: 'Raised HbA2 is diagnostic of β-thalassaemia trait.' },
          { q: 'A boy with haemarthrosis has prolonged aPTT, normal PT and normal platelets. Likely diagnosis:', o: ['ITP', 'Haemophilia', 'Vitamin K deficiency', 'DIC'], a: 1, why: 'Intrinsic pathway factor deficiency (VIII or IX).' },
          { q: 'Increased osmotic fragility is typical of:', o: ['Thalassaemia', 'Hereditary spherocytosis', 'Iron deficiency', 'Sickle cell trait'], a: 1, why: 'Spherocytes have less surface area and lyse easily.' },
        ],
      },
      {
        title: 'Systemic pathology', mins: 15,
        intro: 'Kidney, liver and heart pathology carry many classic eponyms and electron microscopy findings.',
        sections: [
          { h: 'Kidney', ul: [
            'Minimal change disease: commonest nephrotic syndrome in children; podocyte foot-process effacement on EM; responds to steroids.',
            'Membranous nephropathy: commonest primary nephrotic syndrome in many adult series; anti-PLA2R antibodies; "spike and dome".',
            'Post-streptococcal GN: nephritic, subepithelial humps, low C3.',
            'IgA nephropathy: haematuria within days of an upper respiratory infection; commonest GN worldwide.',
            'Rapidly progressive GN: crescents.',
          ] },
          { h: 'Liver and GI', ul: ['Mallory–Denk bodies: alcoholic hepatitis.', 'Barrett oesophagus: intestinal metaplasia (goblet cells), risk of adenocarcinoma.', 'Coeliac disease: villous atrophy, anti-tTG antibodies.'] },
          { h: 'Heart', ul: ['Aschoff bodies and Anitschkow cells: rheumatic heart disease, still important in India.', 'MI timeline: coagulative necrosis with neutrophils in 1–3 days, macrophages by 3–7 days (risk of rupture), granulation tissue after.'] },
        ],
        points: ['Children nephrotic → minimal change.', 'Haematuria days after URTI → IgA nephropathy.', 'Aschoff bodies → rheumatic fever.'],
        quiz: [
          { q: 'Nephrotic syndrome in a 4-year-old, with foot-process effacement on EM:', o: ['Membranous nephropathy', 'Minimal change disease', 'FSGS', 'Post-streptococcal GN'], a: 1, why: 'Classic minimal change disease.' },
          { q: 'Mallory–Denk bodies are seen in:', o: ['Viral hepatitis', 'Alcoholic hepatitis', 'Haemochromatosis', 'Wilson disease only'], a: 1, why: 'Damaged intermediate filaments in alcoholic liver disease.' },
          { q: 'Aschoff bodies are pathognomonic of:', o: ['Infective endocarditis', 'Rheumatic carditis', 'Myocardial infarction', 'Viral myocarditis'], a: 1, why: 'They are the hallmark of rheumatic carditis.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  'mbbs-pharmacology': {
    level: 'MBBS & NEET-PG · 4 lessons · MCQs',
    audience: 'MBBS students and NEET-PG / INI-CET aspirants.',
    outcomes: ['Apply pharmacokinetic principles and drug interactions', 'Manage autonomic poisoning', 'Recall antimicrobial mechanisms and toxicities', 'Match adverse effects and antidotes'],
    lessons: [
      {
        title: 'General pharmacology', mins: 14,
        intro: 'Kinetics, enzyme induction and therapeutic drug monitoring explain most drug interactions.',
        sections: [
          { h: 'Kinetics', ul: [
            'Intravenous bioavailability is 100%; oral drugs may lose a lot to first-pass metabolism (e.g. nitroglycerin, propranolol).',
            'Steady state is reached after about 4–5 half-lives.',
            'Zero-order kinetics (a fixed amount eliminated per hour): phenytoin (at higher doses), ethanol, high-dose aspirin.',
          ] },
          { h: 'Enzyme induction and inhibition', ul: [
            'Inducers: rifampicin, phenytoin, carbamazepine, phenobarbital, griseofulvin, chronic alcohol. They reduce levels of other drugs (e.g. oral contraceptive failure).',
            'Inhibitors: ketoconazole, erythromycin and clarithromycin, cimetidine, valproate, ritonavir, grapefruit juice. They raise levels of other drugs.',
          ] },
          { h: 'Therapeutic drug monitoring', p: 'Needed for drugs with a narrow therapeutic index and variable kinetics: lithium, digoxin, phenytoin, aminoglycosides, vancomycin, ciclosporin and tacrolimus.' },
        ],
        points: ['Steady state ≈ 4–5 half-lives.', 'Rifampicin induces; ketoconazole inhibits.', 'Narrow therapeutic index drugs need TDM.'],
        quiz: [
          { q: 'Which drug follows zero-order kinetics at therapeutic doses?', o: ['Penicillin', 'Phenytoin', 'Paracetamol', 'Metformin'], a: 1, why: 'Phenytoin metabolism saturates at therapeutic levels.' },
          { q: 'A woman on an oral contraceptive starts TB treatment and becomes pregnant. The drug responsible:', o: ['Isoniazid', 'Rifampicin', 'Ethambutol', 'Pyrazinamide'], a: 1, why: 'Rifampicin induces hepatic enzymes and lowers hormone levels.' },
          { q: 'Approximately how many half-lives to reach steady state?', o: ['1', '2', '4–5', '10'], a: 2, why: 'About 94–97% of steady state is reached after 4–5 half-lives.' },
        ],
      },
      {
        title: 'Autonomic pharmacology & poisoning', mins: 14,
        intro: 'Cholinergic and anticholinergic toxidromes are common in Indian emergency rooms.',
        sections: [
          { h: 'Organophosphate poisoning', ul: [
            'Irreversible acetylcholinesterase inhibition → muscarinic signs (salivation, lacrimation, urination, diarrhoea, bronchorrhoea, bradycardia, miosis) plus nicotinic signs (fasciculations, weakness).',
            'Treatment: atropine titrated to dry chest secretions; pralidoxime early, before "ageing" of the enzyme; airway support.',
            'Intermediate syndrome: proximal and respiratory weakness 1–4 days later.',
          ] },
          { h: 'Anticholinergic toxicity', ul: ['"Hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter": fever, dry skin, flushing, dilated pupils, delirium, urinary retention, tachycardia.', 'Seen with atropine, dhatura, antihistamines and tricyclics.'] },
          { h: 'Key autonomic drugs', ul: [
            'Adrenaline for anaphylaxis: 0.5 mg intramuscularly (0.5 mL of 1 mg/mL) in adults, repeated after 5 minutes if needed.',
            'Non-selective β-blockers can cause bronchospasm in asthma.',
            'Neostigmine and pyridostigmine are used in myasthenia gravis.',
          ] },
        ],
        points: ['OP poisoning: atropine + early pralidoxime.', 'Anticholinergic: hot, dry, red, dilated pupils, delirium.', 'Anaphylaxis: adrenaline 0.5 mg IM.'],
        quiz: [
          { q: 'The endpoint of atropine therapy in organophosphate poisoning is:', o: ['Pupil dilatation', 'Drying of bronchial secretions', 'Heart rate of 60', 'Return of fasciculations'], a: 1, why: 'Atropinisation is titrated to a dry chest and adequate heart rate and BP.' },
          { q: 'Hot dry skin, dilated pupils and delirium after eating seeds suggests:', o: ['Organophosphate', 'Dhatura (anticholinergic) poisoning', 'Opioid', 'Cyanide'], a: 1, why: 'Dhatura contains anticholinergic alkaloids.' },
          { q: 'Adult intramuscular dose of adrenaline in anaphylaxis:', o: ['0.05 mg', '0.5 mg', '5 mg', '1 mg IV bolus'], a: 1, why: '0.5 mg IM of 1 mg/mL (1:1000) solution.' },
        ],
      },
      {
        title: 'Antimicrobials & anti-TB drugs', mins: 15,
        intro: 'Mechanism plus signature toxicity is how examiners ask about antibiotics.',
        sections: [
          { h: 'Mechanisms', ul: [
            'Cell wall: β-lactams (bind penicillin-binding proteins), vancomycin (binds D-Ala-D-Ala).',
            '30S ribosome: aminoglycosides (nephrotoxicity, ototoxicity), tetracyclines (tooth staining; avoid in pregnancy and under 8 years).',
            '50S ribosome: macrolides, chloramphenicol (grey baby syndrome, aplastic anaemia), linezolid.',
            'DNA gyrase: fluoroquinolones (tendinopathy, QT prolongation).',
          ] },
          { h: 'Anti-TB drugs', ul: [
            'Isoniazid: peripheral neuropathy (prevent with pyridoxine), hepatitis.',
            'Rifampicin: orange-red secretions, hepatitis, enzyme induction.',
            'Pyrazinamide: hepatotoxicity, hyperuricaemia.',
            'Ethambutol: optic neuritis with red–green colour vision loss.',
            'Streptomycin: ototoxicity and nephrotoxicity.',
          ] },
        ],
        points: ['Vancomycin binds D-Ala-D-Ala.', 'Chloramphenicol → grey baby syndrome.', 'Ethambutol → optic neuritis; INH → neuropathy.'],
        quiz: [
          { q: 'Red–green colour blindness during TB treatment is caused by:', o: ['Isoniazid', 'Rifampicin', 'Ethambutol', 'Pyrazinamide'], a: 2, why: 'Ethambutol causes dose-related optic neuritis.' },
          { q: 'Grey baby syndrome is caused by:', o: ['Tetracycline', 'Chloramphenicol', 'Gentamicin', 'Ciprofloxacin'], a: 1, why: 'Neonates cannot glucuronidate chloramphenicol adequately.' },
          { q: 'Vancomycin acts by:', o: ['Binding the 30S ribosome', 'Binding D-Ala-D-Ala and blocking cell wall synthesis', 'Inhibiting DNA gyrase', 'Inhibiting folate synthesis'], a: 1, why: 'It prevents peptidoglycan cross-linking.' },
        ],
      },
      {
        title: 'Adverse effects, pregnancy & antidotes', mins: 14,
        intro: 'High-yield drug toxicities and their antidotes in one place.',
        sections: [
          { h: 'Classic adverse effects', ul: [
            'ACE inhibitors: dry cough (bradykinin), angioedema, hyperkalaemia; avoid in pregnancy and bilateral renal artery stenosis.',
            'Amiodarone: pulmonary fibrosis, hypo- or hyperthyroidism, corneal deposits, photosensitivity.',
            'Digoxin toxicity: nausea, yellow-green vision, arrhythmias; worsened by hypokalaemia.',
            'Metformin: lactic acidosis (rare), vitamin B12 deficiency.',
          ] },
          { h: 'Teratogens', ul: ['Thalidomide: phocomelia. Warfarin: fetal warfarin syndrome (nasal hypoplasia). Valproate: neural tube defects. Isotretinoin: severe malformations. ACE inhibitors: fetal renal damage.'] },
          { h: 'Antidotes', ul: [
            'Paracetamol → N-acetylcysteine. Opioids → naloxone. Benzodiazepines → flumazenil (with caution).',
            'Heparin → protamine sulfate. Warfarin → vitamin K (with prothrombin complex concentrate or FFP for bleeding).',
            'Methanol → fomepizole (or ethanol). Iron → desferrioxamine. Cyanide → hydroxocobalamin. Organophosphate → atropine plus pralidoxime.',
          ] },
        ],
        points: ['ACE inhibitor cough = bradykinin.', 'Paracetamol → NAC; heparin → protamine.', 'Valproate → neural tube defects.'],
        quiz: [
          { q: 'Antidote for paracetamol overdose:', o: ['Naloxone', 'N-acetylcysteine', 'Flumazenil', 'Protamine'], a: 1, why: 'NAC replenishes glutathione.' },
          { q: 'Dry cough with an ACE inhibitor is due to accumulation of:', o: ['Angiotensin II', 'Bradykinin', 'Renin', 'Aldosterone'], a: 1, why: 'ACE also breaks down bradykinin.' },
          { q: 'Heparin overdose is reversed with:', o: ['Vitamin K', 'Protamine sulfate', 'Desferrioxamine', 'Fomepizole'], a: 1, why: 'Protamine binds and neutralises heparin.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  'mbbs-microbiology': {
    level: 'MBBS & NEET-PG · 4 lessons · MCQs',
    audience: 'MBBS students and NEET-PG / INI-CET aspirants.',
    outcomes: ['Identify bacteria from stains, culture media and toxins', 'Interpret TB, syphilis and hepatitis B tests', 'Recall key viral and parasitic infections in India', 'Recognise important fungal infections'],
    lessons: [
      {
        title: 'Bacteriology essentials', mins: 15,
        intro: 'Stains, culture media and toxins are the fingerprints of bacteria in exam questions.',
        sections: [
          { h: 'Gram-positive organisms', ul: [
            'Staphylococcus aureus: coagulase positive; toxic shock syndrome (TSST-1), food poisoning (preformed toxin).',
            'Streptococcus pyogenes: bacitracin sensitive; rheumatic fever and post-streptococcal glomerulonephritis.',
            'Streptococcus pneumoniae: optochin sensitive, bile soluble.',
            'Corynebacterium diphtheriae: pseudomembrane, metachromatic granules (Albert stain), Elek test for toxin.',
            'Clostridium tetani: drumstick (tennis-racket) spores. C. perfringens: gas gangrene, Nagler reaction. C. botulinum: descending flaccid paralysis.',
          ] },
          { h: 'Culture media', ul: [
            'Löwenstein–Jensen: Mycobacterium tuberculosis.',
            'Thayer–Martin: Neisseria gonorrhoeae.',
            'TCBS: Vibrio cholerae.',
            'Loeffler serum slope: diphtheria.',
            'MacConkey: lactose fermenters form pink colonies.',
          ] },
          { h: 'Endotoxin', p: 'Lipopolysaccharide (lipid A) in the outer membrane of Gram-negative bacteria causes fever and septic shock.' },
        ],
        points: ['Optochin sensitive → pneumococcus.', 'TCBS → Vibrio; LJ → TB.', 'Endotoxin = lipid A of Gram-negatives.'],
        quiz: [
          { q: 'TCBS medium is used to culture:', o: ['Salmonella', 'Vibrio cholerae', 'Shigella', 'E. coli'], a: 1, why: 'Thiosulfate–citrate–bile salts–sucrose agar is selective for Vibrio.' },
          { q: 'Metachromatic granules seen with Albert stain suggest:', o: ['Corynebacterium diphtheriae', 'Clostridium tetani', 'Listeria', 'Bacillus anthracis'], a: 0, why: 'Volutin granules are typical of C. diphtheriae.' },
          { q: 'Optochin sensitivity identifies:', o: ['Streptococcus pyogenes', 'Streptococcus pneumoniae', 'Enterococcus', 'Staphylococcus aureus'], a: 1, why: 'Pneumococcus is optochin sensitive and bile soluble.' },
        ],
      },
      {
        title: 'TB, leprosy, spirochaetes & rickettsiae', mins: 15,
        intro: 'These organisms are especially important in India and in NEET-PG.',
        sections: [
          { h: 'Mycobacteria', ul: [
            'M. tuberculosis is acid-fast (Ziehl–Neelsen stain).',
            'CBNAAT (Xpert MTB/RIF) detects TB and rifampicin resistance (rpoB mutations) within hours.',
            'M. leprae cannot be grown in artificial media; it grows in mouse footpads and armadillos. The lepromin test is prognostic, not diagnostic.',
          ] },
          { h: 'Spirochaetes', ul: [
            'Treponema pallidum: VDRL and RPR are non-specific screening tests that fall with treatment; TPHA and FTA-ABS are specific and stay positive.',
            'Dark-ground microscopy shows motile treponemes in primary chancre fluid.',
            'Leptospira: Weil disease with jaundice, renal failure and bleeding, often after floods.',
          ] },
          { h: 'Scrub typhus', ul: ['Orientia tsutsugamushi, transmitted by mite larvae (chiggers).', 'Painless eschar is a key sign; treat with doxycycline.', 'Weil–Felix test: OX-K positive (an older, less specific test).'] },
        ],
        points: ['CBNAAT detects rifampicin resistance.', 'VDRL screens; TPHA confirms.', 'Eschar + fever → scrub typhus → doxycycline.'],
        quiz: [
          { q: 'Which test detects rifampicin resistance in TB within hours?', o: ['Ziehl–Neelsen stain', 'CBNAAT (Xpert MTB/RIF)', 'Mantoux test', 'LJ culture'], a: 1, why: 'It detects rpoB mutations.' },
          { q: 'A specific (treponemal) test for syphilis is:', o: ['VDRL', 'RPR', 'TPHA', 'Weil–Felix'], a: 2, why: 'TPHA and FTA-ABS are treponemal tests.' },
          { q: 'Fever with a painless black eschar in a farmer suggests:', o: ['Anthrax only', 'Scrub typhus', 'Dengue', 'Malaria'], a: 1, why: 'Eschar is a hallmark of scrub typhus.' },
        ],
      },
      {
        title: 'Virology', mins: 15,
        intro: 'Hepatitis B serology and Indian epidemic viruses are must-knows.',
        sections: [
          { h: 'Hepatitis', ul: [
            'HBsAg: current infection. Anti-HBs: immunity (vaccination gives anti-HBs only).',
            'IgM anti-HBc: acute infection, and the only marker in the "window period".',
            'HBeAg: high infectivity.',
            'Hepatitis A and E spread faeco-orally; hepatitis E carries high mortality in pregnancy.',
          ] },
          { h: 'Other important viruses', ul: [
            'HIV: binds CD4 with CCR5 or CXCR4 co-receptors; reverse transcriptase makes DNA from RNA.',
            'Dengue: Aedes aegypti; NS1 antigen positive early; watch for warning signs (abdominal pain, bleeding, falling platelets with rising haematocrit).',
            'Rabies: Negri bodies; post-exposure prophylaxis with wound washing, vaccine and immunoglobulin for category III bites.',
            'Measles: Koplik spots; Warthin–Finkeldey giant cells.',
          ] },
        ],
        points: ['Window period: IgM anti-HBc only.', 'Vaccinated person: anti-HBs only.', 'Hepatitis E: dangerous in pregnancy.'],
        quiz: [
          { q: 'A vaccinated health worker would show:', o: ['HBsAg positive', 'Anti-HBs positive only', 'IgM anti-HBc positive', 'HBeAg positive'], a: 1, why: 'The vaccine contains HBsAg, producing anti-HBs only.' },
          { q: 'The only marker positive in the window period of hepatitis B:', o: ['HBsAg', 'Anti-HBs', 'IgM anti-HBc', 'HBeAg'], a: 2, why: 'IgM anti-HBc bridges the gap between HBsAg loss and anti-HBs appearance.' },
          { q: 'Negri bodies are seen in:', o: ['Measles', 'Rabies', 'Herpes', 'Polio'], a: 1, why: 'Intracytoplasmic inclusions in neurons in rabies.' },
        ],
      },
      {
        title: 'Parasitology & mycology', mins: 15,
        intro: 'Malaria, amoebiasis, neurocysticercosis and mucormycosis are core Indian topics.',
        sections: [
          { h: 'Parasites', ul: [
            'Plasmodium falciparum: severe and cerebral malaria; banana-shaped gametocytes.',
            'P. vivax and P. ovale: hypnozoites in the liver cause relapse; primaquine gives radical cure (check G6PD first).',
            'Entamoeba histolytica: flask-shaped colonic ulcers; liver abscess with "anchovy sauce" pus.',
            'Giardia: falling-leaf motility, malabsorption.',
            'Hookworm: iron deficiency anaemia. Ascaris: commonest intestinal helminth, Loeffler syndrome.',
            'Taenia solium: neurocysticercosis, a leading cause of seizures in India.',
          ] },
          { h: 'Fungi', ul: [
            'Candida: germ tube test positive (C. albicans).',
            'Cryptococcus neoformans: capsule seen on India ink; meningitis in people with HIV.',
            'Aspergillus: septate hyphae with acute-angle branching.',
            'Mucor and Rhizopus: broad, aseptate hyphae with right-angle branching; rhino-orbital-cerebral disease in uncontrolled diabetes, as seen during the COVID-19 period in India.',
          ] },
        ],
        points: ['Vivax/ovale hypnozoites → primaquine (check G6PD).', 'India ink → Cryptococcus.', 'Broad aseptate hyphae → mucormycosis.'],
        quiz: [
          { q: 'Primaquine is given in vivax malaria to:', o: ['Kill blood schizonts', 'Eliminate liver hypnozoites', 'Treat cerebral malaria', 'Prevent dengue'], a: 1, why: 'It provides radical cure by destroying hypnozoites.' },
          { q: 'India ink preparation of CSF showing capsulated yeasts suggests:', o: ['Candida', 'Cryptococcus neoformans', 'Aspergillus', 'Histoplasma'], a: 1, why: 'The capsule appears as a clear halo.' },
          { q: 'Broad, aseptate, right-angle branching hyphae in a diabetic with facial swelling:', o: ['Aspergillus', 'Mucormycosis', 'Candida', 'Dermatophyte'], a: 1, why: 'Classic Mucorales morphology.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  'mbbs-forensic': {
    level: 'MBBS & NEET-PG · 4 lessons · MCQs',
    audience: 'MBBS students and NEET-PG / INI-CET aspirants.',
    outcomes: ['Estimate time since death from post-mortem changes', 'Classify injuries and firearm wounds', 'Recognise asphyxial deaths and common Indian poisons', 'Know medico-legal procedures under the new criminal laws'],
    lessons: [
      {
        title: 'Thanatology: changes after death', mins: 14,
        intro: 'Post-mortem changes help estimate the time since death. Timings vary with climate; Indian summers speed everything up.',
        sections: [
          { h: 'Early changes', ul: [
            'Algor mortis: cooling of the body.',
            'Livor mortis (hypostasis): appears within about 30 minutes to 2 hours, becomes fixed after roughly 6–8 hours.',
            'Rigor mortis: begins first in the myocardium and small muscles (eyelids, face), is complete in about 12 hours and passes off over the next 12 hours or so in temperate climates (faster in heat).',
            'Cherry-red hypostasis: carbon monoxide poisoning (also bright red in cyanide and cold).',
          ] },
          { h: 'Late changes', ul: ['Putrefaction: the first external sign is greenish discolouration over the right iliac fossa (caecum).', 'Adipocere: saponification of fat in moist conditions.', 'Mummification: drying in hot, dry conditions.'] },
        ],
        points: ['Hypostasis fixes at ~6–8 hours.', 'Rigor: complete ~12 h, gone after ~24 h (faster in heat).', 'First sign of putrefaction: green right iliac fossa.'],
        quiz: [
          { q: 'The first external sign of putrefaction is:', o: ['Marbling', 'Greenish discolouration of the right iliac fossa', 'Bloating of the face', 'Skin slippage'], a: 1, why: 'It starts over the caecum, rich in bacteria.' },
          { q: 'Cherry-red post-mortem lividity suggests poisoning with:', o: ['Organophosphate', 'Carbon monoxide', 'Arsenic', 'Opium'], a: 1, why: 'Carboxyhaemoglobin is cherry-red.' },
          { q: 'Rigor mortis first appears in the:', o: ['Lower limbs', 'Myocardium and small muscles such as the eyelids', 'Trunk', 'Fingers and toes'], a: 1, why: 'It starts in involuntary and small voluntary muscles.' },
        ],
      },
      {
        title: 'Injuries & firearm wounds', mins: 15,
        intro: 'Wound type tells you the weapon. Courts depend on accurate description.',
        sections: [
          { h: 'Mechanical injuries', ul: [
            'Abrasion: superficial; shows the pattern of the object.',
            'Contusion (bruise): bleeding under intact skin; colour changes with age.',
            'Laceration: blunt force tears with irregular margins and tissue bridging.',
            'Incised wound: sharp-edged weapon; clean margins, length greater than depth, no tissue bridging.',
            'Stab wound: depth greater than length.',
          ] },
          { h: 'Firearm wounds', ul: ['Entry wound: abrasion collar; burning, blackening and tattooing at close range.', 'Contact wounds may show a muzzle imprint.', 'Exit wounds are usually larger and irregular, without an abrasion collar.'] },
          { h: 'Grievous hurt', p: 'Defined in the Bharatiya Nyaya Sanhita, Section 116 (earlier IPC Section 320): includes emasculation, permanent loss of sight or hearing, loss or impairment of a limb or joint, permanent disfigurement of the head or face, fracture or dislocation of a bone or tooth, and hurt that endangers life or causes severe pain or inability for 15 days (20 days under the old IPC).' },
        ],
        points: ['Laceration: tissue bridging; incised: none.', 'Entry wound: abrasion collar.', 'Grievous hurt: BNS s.116, 15-day criterion.'],
        quiz: [
          { q: 'Tissue bridging in a wound indicates:', o: ['Incised wound', 'Laceration', 'Stab wound', 'Chop wound by sharp weapon'], a: 1, why: 'Blunt force tears leave strands of tissue across the wound.' },
          { q: 'An abrasion collar is a feature of:', o: ['Firearm exit wound', 'Firearm entry wound', 'Incised wound', 'Burn'], a: 1, why: 'The bullet abrades the skin edge as it enters.' },
          { q: 'Under the BNS, grievous hurt is defined in section:', o: ['22', '116', '103', '64'], a: 1, why: 'BNS Section 116 replaced IPC Section 320.' },
        ],
      },
      {
        title: 'Asphyxia & toxicology', mins: 15,
        intro: 'Ligature marks and poison signatures are favourite vignette questions.',
        sections: [
          { h: 'Asphyxial deaths', ul: [
            'Hanging: oblique ligature mark, above the thyroid cartilage, often incomplete (non-continuous), with a knot area.',
            'Ligature strangulation: horizontal mark, at or below the thyroid, usually complete around the neck.',
            'Throttling (manual strangulation): fingernail marks; hyoid fracture is more common.',
            'Drowning: froth at the mouth and nose; diatom test supports ante-mortem drowning.',
          ] },
          { h: 'Common poisons in India', ul: [
            'Organophosphates: pinpoint pupils, kerosene-like smell, profuse secretions.',
            'Aluminium phosphide (celphos): releases phosphine, causes refractory shock; no specific antidote.',
            'Cyanide: bitter almond smell.',
            'Arsenic: Mees lines on nails, raindrop pigmentation; preserves the body.',
            'Dhatura: dilated pupils, delirium (anticholinergic).',
            'Snake bite: polyvalent anti-snake venom in India covers the "big four" (cobra, common krait, Russell viper, saw-scaled viper).',
          ] },
        ],
        points: ['Hanging: oblique, above thyroid, incomplete mark.', 'Hyoid fracture: more with throttling.', 'Polyvalent ASV: big four snakes.'],
        quiz: [
          { q: 'An oblique, non-continuous ligature mark above the thyroid cartilage suggests:', o: ['Ligature strangulation', 'Hanging', 'Throttling', 'Smothering'], a: 1, why: 'Classic features of hanging.' },
          { q: 'Mees lines on the nails suggest chronic poisoning with:', o: ['Lead', 'Arsenic', 'Mercury', 'Copper'], a: 1, why: 'Transverse white bands are typical of arsenic.' },
          { q: 'Polyvalent anti-snake venom in India covers:', o: ['All snakes', 'The big four: cobra, common krait, Russell viper, saw-scaled viper', 'Only cobra', 'Sea snakes'], a: 1, why: 'Indian polyvalent ASV is raised against the big four.' },
        ],
      },
      {
        title: 'Medico-legal procedures', mins: 13,
        intro: 'From 1 July 2024 the BNSS replaced the CrPC. Section numbers changed, but the principles carry over.',
        sections: [
          { h: 'Inquest', ul: [
            'Police inquest: BNSS Section 194 (earlier CrPC 174), the most common type in India.',
            'Magistrate inquest: BNSS Section 196 (earlier CrPC 176), for custodial deaths and deaths of women within 7 years of marriage in suspicious circumstances.',
          ] },
          { h: 'Dying declaration', ul: ['A statement by a person about the cause or circumstances of their death.', 'Preferably recorded by a magistrate; anyone can record it if needed.', 'The doctor certifies that the person is conscious and fit to give the statement.'] },
          { h: 'Sexual offences examination', ul: [
            'Requires the survivor\'s informed consent (or guardian\'s, for a child).',
            'The "two-finger test" is unscientific and has been held by the Supreme Court to violate dignity and privacy; it must not be done.',
            'Examination by a registered medical practitioner; a female doctor where possible; record findings, collect evidence, and provide treatment and emergency contraception.',
          ] },
        ],
        points: ['Police inquest: BNSS 194 (CrPC 174).', 'Doctor certifies fitness for a dying declaration.', 'The two-finger test is banned.'],
        quiz: [
          { q: 'The most common type of inquest in India is:', o: ['Magistrate inquest', 'Police inquest', 'Coroner inquest', 'Medical examiner system'], a: 1, why: 'Police inquest under BNSS 194 (earlier CrPC 174).' },
          { q: 'The doctor\'s role in a dying declaration is mainly to:', o: ['Record the full statement', 'Certify that the person is fit to give the statement', 'Decide guilt', 'Refuse if police are present'], a: 1, why: 'The doctor certifies the declarant\'s mental fitness.' },
          { q: 'The two-finger test in sexual assault examination:', o: ['Is mandatory', 'Must not be performed', 'Is done only with police consent', 'Is required for children'], a: 1, why: 'The Supreme Court has held it violates dignity and has no scientific basis.' },
        ],
      },
    ],
  },
});
