/* Serenest Academy — MBBS & NEET-PG track: all 19 subjects, Anatomy to Radiology.
   SA_SUBJECTS lists every subject in exam order; subjects with content have a course id in SA_FULL.
   High-yield revision for MBBS students and NEET-PG / INI-CET aspirants. Check standard textbooks for detail. */
window.SA_SUBJECTS = [
  { id: 'mbbs-anatomy', name: 'Anatomy', year: '1st year' },
  { id: 'mbbs-physiology', name: 'Physiology', year: '1st year' },
  { id: 'mbbs-biochemistry', name: 'Biochemistry', year: '1st year' },
  { id: 'mbbs-pathology', name: 'Pathology', year: '2nd year' },
  { id: 'mbbs-pharmacology', name: 'Pharmacology', year: '2nd year' },
  { id: 'mbbs-microbiology', name: 'Microbiology', year: '2nd year' },
  { id: 'mbbs-forensic', name: 'Forensic Medicine', year: '2nd year' },
  { id: 'mbbs-psm', name: 'Community Medicine', year: '3rd year' },
  { id: 'mbbs-ent', name: 'ENT', year: '3rd year' },
  { id: 'mbbs-ophthalmology', name: 'Ophthalmology', year: '3rd year' },
  { id: 'mbbs-medicine', name: 'Medicine', year: 'Final year' },
  { id: 'mbbs-surgery', name: 'Surgery', year: 'Final year' },
  { id: 'mbbs-obg', name: 'Obstetrics & Gynaecology', year: 'Final year' },
  { id: 'mbbs-paediatrics', name: 'Paediatrics', year: 'Final year' },
  { id: 'mbbs-orthopaedics', name: 'Orthopaedics', year: 'Final year' },
  { id: 'mbbs-dermatology', name: 'Dermatology', year: 'Final year' },
  { id: 'neet-pg', name: 'Psychiatry', year: 'Final year' },
  { id: 'mbbs-anaesthesia', name: 'Anaesthesia', year: 'Final year' },
  { id: 'mbbs-radiology', name: 'Radiology', year: 'Final year' },
];

Object.assign(window.SA_FULL = window.SA_FULL || {}, {

  /* ================================================================== */
  'mbbs-anatomy': {
    level: 'MBBS & NEET-PG · 4 lessons · MCQs',
    audience: 'MBBS students and NEET-PG / INI-CET aspirants.',
    outcomes: ['Localise classic nerve injuries from clinical signs', 'Recall key relations of the limbs, head and neck', 'Revise the inguinal canal, heart and high-yield embryology', 'Practise exam-style anatomy MCQs'],
    lessons: [
      {
        title: 'Upper limb: plexus & nerve injuries', mins: 15,
        intro: 'Upper limb questions are mostly "which nerve?" from a fracture site or a hand posture. Learn the patterns.',
        sections: [
          { h: 'Brachial plexus', ul: [
            'Roots C5–T1 → trunks → divisions → cords → branches.',
            'Erb palsy (upper trunk, C5–C6): arm adducted and medially rotated, forearm pronated, "waiter\'s tip". Classic after shoulder dystocia or a fall on the shoulder.',
            'Klumpke palsy (lower trunk, C8–T1): claw hand with intrinsic muscle paralysis; Horner syndrome if T1 is involved.',
            'Long thoracic nerve (C5–C7) injury: serratus anterior paralysis → winging of the scapula.',
          ] },
          { h: 'Nerve injury by fracture site', ul: [
            'Surgical neck of humerus → axillary nerve: deltoid weakness, loss of sensation over the "regimental badge" area.',
            'Shaft of humerus (radial groove) → radial nerve: wrist drop.',
            'Supracondylar fracture of humerus → median nerve (and brachial artery).',
            'Medial epicondyle → ulnar nerve: claw hand, mainly ring and little fingers.',
          ] },
          { h: 'Hand signs', ul: ['Median nerve: "ape thumb" (thenar wasting), hand of benediction on trying to make a fist; carpal tunnel syndrome.', 'Ulnar nerve: claw hand, positive Froment sign (adductor pollicis weakness).', 'Radial nerve: wrist drop, sensory loss over the first dorsal web space.'] },
        ],
        points: ['Erb = C5–C6 waiter\'s tip; Klumpke = C8–T1 claw hand.', 'Shaft humerus → radial → wrist drop.', 'Winged scapula → long thoracic nerve.'],
        quiz: [
          { q: 'A fracture of the shaft of the humerus most commonly injures the:', o: ['Axillary nerve', 'Radial nerve', 'Ulnar nerve', 'Median nerve'], a: 1, why: 'The radial nerve runs in the spiral (radial) groove; injury causes wrist drop.' },
          { q: '"Waiter\'s tip" deformity after a difficult delivery indicates injury to:', o: ['C5–C6 roots (upper trunk)', 'C8–T1 roots', 'Long thoracic nerve', 'Median nerve'], a: 0, why: 'Erb palsy affects the upper trunk (C5–C6).' },
          { q: 'Winging of the scapula is due to paralysis of:', o: ['Trapezius only', 'Serratus anterior (long thoracic nerve)', 'Deltoid', 'Rhomboids only'], a: 1, why: 'The long thoracic nerve supplies serratus anterior.' },
        ],
      },
      {
        title: 'Lower limb', mins: 14,
        intro: 'Lower limb anatomy is tested through gait, foot posture, the femoral triangle and knee injuries.',
        sections: [
          { h: 'Nerves and gait', ul: [
            'Common peroneal (fibular) nerve winds around the neck of the fibula: injury → foot drop, high-stepping gait, sensory loss on the dorsum of the foot.',
            'Superior gluteal nerve: gluteus medius and minimus → positive Trendelenburg sign (pelvis drops on the opposite side when standing on the affected leg).',
            'Tibial nerve: loss of plantar flexion and sensation on the sole.',
            'Femoral nerve: quadriceps weakness, loss of knee jerk.',
          ] },
          { h: 'Femoral triangle and hernia', ul: [
            'Contents from lateral to medial: femoral Nerve, Artery, Vein, Empty space, Lymphatics (NAVEL).',
            'Femoral canal is the most medial compartment of the femoral sheath; femoral hernia lies below and lateral to the pubic tubercle, more common in women.',
          ] },
          { h: 'Knee', ul: ['Anterior cruciate ligament prevents anterior displacement of the tibia (anterior drawer and Lachman tests).', '"Unhappy triad": ACL, medial collateral ligament and medial meniscus.', 'Medial meniscus is attached to the MCL, so it is injured more often than the lateral.'] },
        ],
        points: ['Neck of fibula → common peroneal → foot drop.', 'Trendelenburg sign → superior gluteal nerve.', 'Femoral triangle lateral to medial: NAVEL.'],
        quiz: [
          { q: 'A fracture of the neck of the fibula with foot drop indicates injury to the:', o: ['Tibial nerve', 'Common peroneal nerve', 'Femoral nerve', 'Obturator nerve'], a: 1, why: 'The common peroneal nerve winds around the fibular neck.' },
          { q: 'Positive Trendelenburg sign results from injury to the:', o: ['Inferior gluteal nerve', 'Superior gluteal nerve', 'Sciatic nerve', 'Femoral nerve'], a: 1, why: 'Gluteus medius and minimus stabilise the pelvis; they are supplied by the superior gluteal nerve.' },
          { q: 'The most medial structure in the femoral triangle is the:', o: ['Femoral nerve', 'Femoral artery', 'Femoral vein', 'Femoral canal with lymphatics'], a: 3, why: 'Lateral to medial: Nerve, Artery, Vein, Empty space, Lymphatics.' },
        ],
      },
      {
        title: 'Head, neck & cranial nerves', mins: 16,
        intro: 'Cranial nerve palsies, the larynx and the cavernous sinus are reliable exam favourites.',
        sections: [
          { h: 'Cranial nerve palsies', ul: [
            'Oculomotor (III): eye "down and out", ptosis, dilated pupil (compressive lesions such as a posterior communicating artery aneurysm affect the pupil early).',
            'Trochlear (IV): superior oblique weakness, difficulty looking down and in (going downstairs); head tilt to the opposite side.',
            'Abducent (VI): lateral rectus weakness, convergent squint; longest intracranial course.',
            'Facial (VII): upper motor neuron lesion spares the forehead; lower motor neuron lesion (Bell palsy) affects the whole half of the face.',
          ] },
          { h: 'Larynx', ul: [
            'All intrinsic muscles of the larynx are supplied by the recurrent laryngeal nerve except cricothyroid (external branch of the superior laryngeal nerve).',
            'Posterior cricoarytenoid is the only abductor of the vocal cords.',
            'Left recurrent laryngeal nerve hooks around the arch of the aorta; the right hooks around the right subclavian artery.',
          ] },
          { h: 'Cavernous sinus', ul: ['Lateral wall: III, IV, V1, V2.', 'Within the sinus: internal carotid artery and the abducent nerve (VI), so VI is affected first in cavernous sinus thrombosis.', 'Infections from the "danger area" of the face can spread here via facial and ophthalmic veins.'] },
        ],
        points: ['III palsy: down and out + ptosis + dilated pupil.', 'Only abductor of the cords: posterior cricoarytenoid.', 'VI lies inside the cavernous sinus.'],
        quiz: [
          { q: 'The only abductor of the vocal cords is:', o: ['Lateral cricoarytenoid', 'Posterior cricoarytenoid', 'Cricothyroid', 'Thyroarytenoid'], a: 1, why: 'Posterior cricoarytenoid opens the glottis.' },
          { q: 'Which intrinsic laryngeal muscle is NOT supplied by the recurrent laryngeal nerve?', o: ['Posterior cricoarytenoid', 'Cricothyroid', 'Vocalis', 'Transverse arytenoid'], a: 1, why: 'Cricothyroid is supplied by the external laryngeal nerve.' },
          { q: 'Forehead sparing in facial weakness suggests a lesion of the:', o: ['Lower motor neuron', 'Upper motor neuron', 'Chorda tympani', 'Geniculate ganglion only'], a: 1, why: 'The upper face has bilateral cortical supply, so UMN lesions spare the forehead.' },
        ],
      },
      {
        title: 'Thorax, abdomen & embryology', mins: 15,
        intro: 'Inguinal hernias, the heart\'s blood supply and pharyngeal arches appear in almost every paper.',
        sections: [
          { h: 'Inguinal canal and hernia', ul: [
            'Indirect inguinal hernia enters the deep ring, lateral to the inferior epigastric vessels; common in young males.',
            'Direct inguinal hernia passes through Hesselbach triangle, medial to the inferior epigastric vessels.',
            'Hesselbach triangle: inferior epigastric vessels (lateral), rectus abdominis (medial), inguinal ligament (inferior).',
          ] },
          { h: 'Thorax', ul: ['Phrenic nerve: C3, C4, C5 ("keeps the diaphragm alive"); referred pain to the shoulder tip.', 'The SA node is supplied by the right coronary artery in about 60% of people.', 'Left anterior descending artery is the most commonly occluded coronary artery.'] },
          { h: 'Embryology', ul: [
            'Pharyngeal arches: 1st – mandibular nerve (V3), muscles of mastication; 2nd – facial nerve (VII), muscles of facial expression; 3rd – glossopharyngeal (IX), stylopharyngeus; 4th and 6th – vagus (X), laryngeal and pharyngeal muscles.',
            'Ductus arteriosus → ligamentum arteriosum; umbilical vein → ligamentum teres; ductus venosus → ligamentum venosum.',
            'Meckel diverticulum ("rule of 2s"): about 2% of people, about 2 feet from the ileocaecal valve, about 2 inches long, may contain 2 types of ectopic tissue (gastric, pancreatic).',
          ] },
        ],
        points: ['Indirect hernia: lateral to inferior epigastric vessels.', 'C3–C5 phrenic nerve.', '2nd arch → facial nerve → muscles of facial expression.'],
        quiz: [
          { q: 'An indirect inguinal hernia lies:', o: ['Medial to the inferior epigastric vessels', 'Lateral to the inferior epigastric vessels', 'Below the pubic tubercle', 'Within Hesselbach triangle'], a: 1, why: 'It enters the deep ring, lateral to the inferior epigastric vessels.' },
          { q: 'Muscles of facial expression develop from the:', o: ['1st pharyngeal arch', '2nd pharyngeal arch', '3rd pharyngeal arch', '4th pharyngeal arch'], a: 1, why: 'The 2nd arch is supplied by the facial nerve.' },
          { q: 'The ductus arteriosus becomes the:', o: ['Ligamentum teres', 'Ligamentum venosum', 'Ligamentum arteriosum', 'Medial umbilical ligament'], a: 2, why: 'After birth it closes to form the ligamentum arteriosum.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  'mbbs-physiology': {
    level: 'MBBS & NEET-PG · 4 lessons · MCQs',
    audience: 'MBBS students and NEET-PG / INI-CET aspirants.',
    outcomes: ['Explain membrane potentials and nerve conduction', 'Apply cardiovascular and respiratory physiology to clinical questions', 'Recall renal handling and key hormones', 'Practise exam-style physiology MCQs'],
    lessons: [
      {
        title: 'Nerve & muscle', mins: 14,
        intro: 'Membrane physiology underlies everything from local anaesthesia to cardiac arrhythmias.',
        sections: [
          { h: 'Membrane potentials', ul: [
            'Resting membrane potential of a nerve is about −70 mV, mainly due to K+ leak channels.',
            'Na+/K+ ATPase pumps 3 Na+ out and 2 K+ in, using one ATP.',
            'Depolarisation: Na+ influx through voltage-gated channels. Repolarisation: K+ efflux.',
            'Absolute refractory period: no stimulus can produce another action potential (Na+ channels inactivated).',
          ] },
          { h: 'Nerve fibres', ul: [
            'Myelinated fibres conduct by saltatory conduction between nodes of Ranvier; faster than unmyelinated.',
            'Aα fibres (large, myelinated) are fastest; C fibres (unmyelinated, slow pain) are slowest.',
            'Local anaesthetics block voltage-gated Na+ channels; small fibres are blocked first, so pain and temperature go before touch and motor function.',
          ] },
          { h: 'Muscle', ul: ['Excitation–contraction coupling: Ca2+ binds troponin C in skeletal muscle, moving tropomyosin off myosin-binding sites.', 'Smooth muscle uses calmodulin and myosin light-chain kinase.', 'Neuromuscular junction: acetylcholine on nicotinic receptors; myasthenia gravis targets these receptors.'] },
        ],
        points: ['RMP ≈ −70 mV, set mainly by K+.', 'Na+/K+ ATPase: 3 Na+ out, 2 K+ in.', 'C fibres slowest; local anaesthetics block small fibres first.'],
        quiz: [
          { q: 'The Na+/K+ ATPase moves:', o: ['3 Na+ in, 2 K+ out', '3 Na+ out, 2 K+ in', '2 Na+ out, 3 K+ in', '1 Na+ out, 1 K+ in'], a: 1, why: 'Three sodium ions out, two potassium ions in, per ATP.' },
          { q: 'The slowest conducting nerve fibres are:', o: ['Aα', 'Aβ', 'B', 'C'], a: 3, why: 'C fibres are small and unmyelinated.' },
          { q: 'In skeletal muscle, calcium binds to:', o: ['Calmodulin', 'Troponin C', 'Myosin light chain', 'Tropomyosin'], a: 1, why: 'Troponin C is the calcium sensor in skeletal muscle.' },
        ],
      },
      {
        title: 'Cardiovascular physiology', mins: 15,
        intro: 'Cardiac cycle events, pressures and reflexes are tested through ECG, JVP and heart-sound questions.',
        sections: [
          { h: 'Key relationships', ul: [
            'Cardiac output = heart rate × stroke volume (about 5 L/min at rest).',
            'Mean arterial pressure ≈ diastolic pressure + one third of pulse pressure.',
            'Frank–Starling law: greater end-diastolic stretch → stronger contraction, within limits.',
            'Coronary blood flow to the left ventricle occurs mainly in diastole.',
          ] },
          { h: 'Heart sounds and JVP', ul: [
            'S1: closure of mitral and tricuspid valves. S2: closure of aortic and pulmonary valves.',
            'JVP "a" wave: atrial contraction (absent in atrial fibrillation; cannon a waves in complete heart block).',
            '"c" wave: tricuspid bulging into the atrium; "v" wave: atrial filling (large in tricuspid regurgitation).',
          ] },
          { h: 'Reflexes', ul: ['Baroreceptors: carotid sinus (glossopharyngeal nerve) and aortic arch (vagus).', 'A rise in BP increases baroreceptor firing → reflex bradycardia and vasodilation.', 'Bainbridge reflex: increased venous return → tachycardia.'] },
        ],
        points: ['CO = HR × SV; MAP ≈ DBP + ⅓ PP.', 'No "a" wave in AF; cannon a waves in complete heart block.', 'LV perfusion mainly in diastole.'],
        quiz: [
          { q: 'The "a" wave of the JVP is absent in:', o: ['Complete heart block', 'Atrial fibrillation', 'Tricuspid stenosis', 'Pulmonary hypertension'], a: 1, why: 'There is no coordinated atrial contraction in AF.' },
          { q: 'BP 120/80 mmHg. Mean arterial pressure is about:', o: ['100 mmHg', '93 mmHg', '80 mmHg', '110 mmHg'], a: 1, why: '80 + (40 ÷ 3) ≈ 93 mmHg.' },
          { q: 'The carotid sinus baroreceptor afferents travel in the:', o: ['Vagus nerve', 'Glossopharyngeal nerve', 'Hypoglossal nerve', 'Phrenic nerve'], a: 1, why: 'Carotid sinus → IX; aortic arch → X.' },
        ],
      },
      {
        title: 'Respiratory physiology', mins: 14,
        intro: 'Lung volumes, surfactant and oxygen transport are the respiratory high-yield trio.',
        sections: [
          { h: 'Lung volumes', ul: [
            'Tidal volume about 500 mL.',
            'Vital capacity = inspiratory reserve + tidal volume + expiratory reserve.',
            'Functional residual capacity = expiratory reserve + residual volume.',
            'Residual volume (and so FRC and total lung capacity) cannot be measured by simple spirometry.',
          ] },
          { h: 'Surfactant', ul: ['Produced by type II pneumocytes; reduces surface tension and prevents alveolar collapse.', 'Main component: dipalmitoylphosphatidylcholine (lecithin).', 'Deficiency in preterm babies causes respiratory distress syndrome; antenatal steroids help lung maturity.'] },
          { h: 'Oxygen and control', ul: [
            'Right shift of the O2 dissociation curve (O2 released more easily): raised CO2, H+ (low pH), temperature and 2,3-BPG (Bohr effect).',
            'Fetal haemoglobin has a left-shifted curve (higher affinity).',
            'Central chemoreceptors respond to CO2 via H+ in CSF; peripheral chemoreceptors (carotid bodies) respond mainly to low PaO2.',
          ] },
        ],
        points: ['RV cannot be measured by spirometry.', 'Surfactant from type II pneumocytes.', 'Right shift: ↑CO2, ↑H+, ↑temperature, ↑2,3-BPG.'],
        quiz: [
          { q: 'Which cannot be measured by simple spirometry?', o: ['Tidal volume', 'Vital capacity', 'Residual volume', 'Inspiratory reserve volume'], a: 2, why: 'Residual volume needs helium dilution or body plethysmography.' },
          { q: 'Surfactant is secreted by:', o: ['Type I pneumocytes', 'Type II pneumocytes', 'Alveolar macrophages', 'Clara cells only'], a: 1, why: 'Type II pneumocytes produce surfactant.' },
          { q: 'Which shifts the oxygen dissociation curve to the LEFT?', o: ['Fever', 'Acidosis', 'Fetal haemoglobin', 'Raised 2,3-BPG'], a: 2, why: 'HbF has higher O2 affinity, shifting the curve left.' },
        ],
      },
      {
        title: 'Renal & endocrine physiology', mins: 15,
        intro: 'Clearance, tubular handling and hormone actions link physiology to medicine and pharmacology.',
        sections: [
          { h: 'Kidney', ul: [
            'Normal GFR about 125 mL/min (180 L/day).',
            'Inulin clearance is the gold standard for GFR; creatinine clearance is used clinically. PAH clearance estimates renal plasma flow.',
            'Most filtered Na+ (about 65%) is reabsorbed in the proximal convoluted tubule; glucose is normally fully reabsorbed there.',
            'ADH inserts aquaporin-2 channels in the collecting duct; aldosterone increases Na+ reabsorption and K+ secretion in principal cells.',
          ] },
          { h: 'Hormones', ul: [
            'Insulin increases glucose uptake into muscle and fat via GLUT4.',
            'Most circulating thyroid hormone is T4; it is converted to the more active T3 in tissues.',
            'Cortisol follows a diurnal rhythm, highest in the early morning.',
            'Growth hormone acts largely through IGF-1 made in the liver.',
          ] },
        ],
        points: ['Inulin = GFR; PAH = renal plasma flow.', 'PCT reabsorbs ~65% of Na+ and all glucose.', 'ADH → aquaporin-2; insulin → GLUT4.'],
        quiz: [
          { q: 'The gold standard substance for measuring GFR is:', o: ['Creatinine', 'Inulin', 'PAH', 'Urea'], a: 1, why: 'Inulin is freely filtered and neither reabsorbed nor secreted.' },
          { q: 'ADH increases water reabsorption by acting on:', o: ['Proximal tubule via aquaporin-1', 'Collecting duct via aquaporin-2', 'Loop of Henle via NKCC2', 'Glomerulus'], a: 1, why: 'ADH inserts aquaporin-2 in collecting duct cells.' },
          { q: 'Insulin-dependent glucose transport in muscle uses:', o: ['GLUT1', 'GLUT2', 'GLUT3', 'GLUT4'], a: 3, why: 'GLUT4 is insulin-responsive in muscle and adipose tissue.' },
        ],
      },
    ],
  },

  /* ================================================================== */
  'mbbs-biochemistry': {
    level: 'MBBS & NEET-PG · 4 lessons · MCQs',
    audience: 'MBBS students and NEET-PG / INI-CET aspirants.',
    outcomes: ['Recall rate-limiting enzymes and enzyme kinetics', 'Link vitamin deficiencies to their clinical signs', 'Identify inborn errors of metabolism from vignettes', 'Revise molecular biology techniques'],
    lessons: [
      {
        title: 'Enzymes & metabolism', mins: 15,
        intro: 'Rate-limiting enzymes and inhibition types are among the most predictable biochemistry questions.',
        sections: [
          { h: 'Enzyme kinetics', ul: [
            'Km is the substrate concentration at half Vmax; a low Km means high affinity.',
            'Competitive inhibition: Km increases, Vmax unchanged (overcome by more substrate).',
            'Non-competitive inhibition: Vmax decreases, Km unchanged.',
          ] },
          { h: 'Rate-limiting enzymes', ul: [
            'Glycolysis: phosphofructokinase-1.',
            'Gluconeogenesis: fructose-1,6-bisphosphatase.',
            'Glycogen synthesis: glycogen synthase; glycogen breakdown: glycogen phosphorylase.',
            'TCA cycle: isocitrate dehydrogenase. Cholesterol synthesis: HMG-CoA reductase (target of statins).',
            'HMP shunt: glucose-6-phosphate dehydrogenase (makes NADPH).',
          ] },
          { h: 'G6PD deficiency', p: 'X-linked deficiency of the HMP shunt enzyme reduces NADPH, so red cells cannot protect themselves from oxidative stress. Haemolysis follows triggers such as primaquine, dapsone, sulfonamides, infections and fava beans; Heinz bodies and bite cells are seen.' },
        ],
        points: ['Competitive: ↑Km, same Vmax. Non-competitive: ↓Vmax, same Km.', 'Glycolysis PFK-1; cholesterol HMG-CoA reductase.', 'G6PD deficiency: oxidant drugs → haemolysis.'],
        quiz: [
          { q: 'In competitive inhibition:', o: ['Km increases, Vmax unchanged', 'Km unchanged, Vmax decreases', 'Both decrease', 'Both increase'], a: 0, why: 'More substrate can overcome a competitive inhibitor.' },
          { q: 'The rate-limiting enzyme of glycolysis is:', o: ['Hexokinase', 'Phosphofructokinase-1', 'Pyruvate kinase', 'Enolase'], a: 1, why: 'PFK-1 is the key regulatory step.' },
          { q: 'A man develops haemolysis after taking primaquine. The likely deficient enzyme:', o: ['Pyruvate kinase', 'Glucose-6-phosphate dehydrogenase', 'Hexokinase', 'Glucokinase'], a: 1, why: 'Primaquine is a classic oxidant trigger in G6PD deficiency.' },
        ],
      },
      {
        title: 'Vitamins', mins: 14,
        intro: 'Vitamin questions pair a cofactor role with a deficiency picture. Learn them as pairs.',
        sections: [
          { h: 'Water-soluble', ul: [
            'Thiamine (B1): cofactor (TPP) for pyruvate dehydrogenase, α-ketoglutarate dehydrogenase and transketolase. Deficiency: beriberi, Wernicke–Korsakoff.',
            'Niacin (B3): deficiency causes pellagra – dermatitis, diarrhoea, dementia (and death); seen in Hartnup disease and carcinoid syndrome.',
            'B12: cofactor for methylmalonyl-CoA mutase and methionine synthase; deficiency causes megaloblastic anaemia with neurological signs (subacute combined degeneration).',
            'Folate deficiency causes megaloblastic anaemia without neurological signs.',
            'Vitamin C: needed to hydroxylate proline and lysine in collagen; deficiency causes scurvy (bleeding gums, perifollicular haemorrhages).',
          ] },
          { h: 'Fat-soluble', ul: [
            'Vitamin A: night blindness, Bitot spots, xerophthalmia.',
            'Vitamin D: activated by 1α-hydroxylase in the kidney; deficiency causes rickets and osteomalacia.',
            'Vitamin K: γ-carboxylation of factors II, VII, IX, X and proteins C and S; newborns get prophylaxis.',
          ] },
        ],
        points: ['B1 → pyruvate DH; Wernicke.', 'B12 deficiency has neurological signs; folate does not.', 'Vitamin K → II, VII, IX, X, proteins C and S.'],
        quiz: [
          { q: 'Dermatitis, diarrhoea and dementia suggest deficiency of:', o: ['Thiamine', 'Niacin', 'Riboflavin', 'Pyridoxine'], a: 1, why: 'The 3 Ds of pellagra.' },
          { q: 'Megaloblastic anaemia WITH neurological signs suggests deficiency of:', o: ['Folate', 'Vitamin B12', 'Iron', 'Vitamin C'], a: 1, why: 'B12 deficiency causes subacute combined degeneration; folate deficiency does not.' },
          { q: 'Vitamin C is required for hydroxylation of:', o: ['Glutamate and aspartate', 'Proline and lysine', 'Tyrosine', 'Glycine'], a: 1, why: 'Prolyl and lysyl hydroxylases need vitamin C for collagen.' },
        ],
      },
      {
        title: 'Inborn errors of metabolism', mins: 15,
        intro: 'Vignettes give a smell, a urine colour or an eye finding. Match it to the enzyme.',
        sections: [
          { h: 'Amino acid disorders', ul: [
            'Phenylketonuria: phenylalanine hydroxylase deficiency; musty odour, fair skin, intellectual disability if untreated.',
            'Alkaptonuria: homogentisate oxidase deficiency; urine darkens on standing, ochronosis, arthritis.',
            'Maple syrup urine disease: branched-chain α-ketoacid dehydrogenase (leucine, isoleucine, valine); sweet-smelling urine.',
            'Galactosaemia: galactose-1-phosphate uridyltransferase deficiency; jaundice, cataract, E. coli sepsis in infants.',
          ] },
          { h: 'Glycogen and lysosomal storage', ul: [
            'Von Gierke (type I): glucose-6-phosphatase; severe fasting hypoglycaemia, lactic acidosis, hepatomegaly.',
            'Pompe (type II): acid maltase; cardiomegaly. McArdle (type V): muscle phosphorylase; exercise cramps, myoglobinuria.',
            'Gaucher: glucocerebrosidase; commonest lysosomal storage disease, hepatosplenomegaly, "crumpled tissue paper" cells.',
            'Tay–Sachs: hexosaminidase A; cherry-red spot without hepatosplenomegaly. Niemann–Pick: sphingomyelinase; cherry-red spot with hepatosplenomegaly.',
            'Hurler: α-L-iduronidase, corneal clouding. Hunter: iduronate sulfatase, X-linked, no corneal clouding.',
          ] },
        ],
        points: ['Dark urine on standing → alkaptonuria.', 'Cherry-red spot: Tay–Sachs (no HSM) vs Niemann–Pick (HSM).', 'Hunter: X-linked, no corneal clouding.'],
        quiz: [
          { q: 'Urine that turns black on standing suggests deficiency of:', o: ['Phenylalanine hydroxylase', 'Homogentisate oxidase', 'Tyrosinase', 'Fumarylacetoacetase'], a: 1, why: 'Alkaptonuria: homogentisic acid oxidises to a dark pigment.' },
          { q: 'Cherry-red spot with hepatosplenomegaly suggests:', o: ['Tay–Sachs disease', 'Niemann–Pick disease', 'Gaucher disease', 'Fabry disease'], a: 1, why: 'Tay–Sachs has a cherry-red spot but no organomegaly.' },
          { q: 'Which mucopolysaccharidosis is X-linked recessive?', o: ['Hurler', 'Hunter', 'Sanfilippo', 'Morquio'], a: 1, why: 'Hunter syndrome is X-linked; the others are autosomal recessive.' },
        ],
      },
      {
        title: 'Molecular biology & techniques', mins: 13,
        intro: 'Replication enzymes, the genetic code and blotting techniques are quick marks if memorised precisely.',
        sections: [
          { h: 'DNA and RNA', ul: [
            'Replication: helicase unwinds, primase makes RNA primers, DNA polymerase III synthesises (prokaryotes), DNA polymerase I removes primers, ligase seals nicks.',
            'In eukaryotes, RNA polymerase II makes mRNA.',
            'Start codon AUG (methionine); stop codons UAA, UAG, UGA.',
            'Sickle cell disease: point (missense) mutation, glutamate replaced by valine at position 6 of the β-globin chain.',
          ] },
          { h: 'Techniques', ul: [
            'Southern blot: DNA. Northern blot: RNA. Western blot: protein. (SNoW DRoP)',
            'PCR amplifies DNA using primers and a heat-stable polymerase (Taq).',
            'ELISA detects antigens or antibodies; used widely for screening.',
          ] },
        ],
        points: ['SNoW DRoP: Southern DNA, Northern RNA, Western protein.', 'RNA polymerase II → mRNA.', 'Sickle cell: Glu → Val at β6.'],
        quiz: [
          { q: 'Western blot detects:', o: ['DNA', 'RNA', 'Protein', 'Lipid'], a: 2, why: 'Southern = DNA, Northern = RNA, Western = protein.' },
          { q: 'In eukaryotes, mRNA is synthesised by:', o: ['RNA polymerase I', 'RNA polymerase II', 'RNA polymerase III', 'DNA polymerase'], a: 1, why: 'RNA polymerase II transcribes mRNA.' },
          { q: 'The mutation in sickle cell disease replaces glutamate with:', o: ['Lysine', 'Valine', 'Glycine', 'Alanine'], a: 1, why: 'Glu → Val at position 6 of β-globin.' },
        ],
      },
    ],
  },
});
