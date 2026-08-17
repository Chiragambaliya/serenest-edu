// ---------------------------------------------------------------------------
// Serenest EMR — data layer
//
// A single JSON document persisted to localStorage, exposed to React through
// useSyncExternalStore. All records are plain objects; every mutation goes
// through update() so persistence and re-renders stay in sync.
// ---------------------------------------------------------------------------

import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'serenest-emr-v1'

const EMPTY = {
  patients: [],
  encounters: [],
  prescriptions: [],
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw)
    return {
      patients: Array.isArray(parsed.patients) ? parsed.patients : [],
      encounters: Array.isArray(parsed.encounters) ? parsed.encounters : [],
      prescriptions: Array.isArray(parsed.prescriptions)
        ? parsed.prescriptions
        : [],
    }
  } catch {
    return EMPTY
  }
}

let state = load()
const listeners = new Set()

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function emit() {
  for (const fn of listeners) fn()
}

function update(mutator) {
  state = mutator(state)
  persist()
  emit()
}

export function useEmr() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    () => state,
  )
}

export function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 8)}`
}

const nowIso = () => new Date().toISOString()

// ----------------------------------------------------------------- patients

export function addPatient(data) {
  const patient = {
    id: uid('pt'),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    ...data,
  }
  update((s) => ({ ...s, patients: [patient, ...s.patients] }))
  return patient
}

export function updatePatient(id, data) {
  update((s) => ({
    ...s,
    patients: s.patients.map((p) =>
      p.id === id ? { ...p, ...data, updatedAt: nowIso() } : p,
    ),
  }))
}

export function deletePatient(id) {
  update((s) => ({
    ...s,
    patients: s.patients.filter((p) => p.id !== id),
    encounters: s.encounters.filter((e) => e.patientId !== id),
    prescriptions: s.prescriptions.filter((rx) => rx.patientId !== id),
  }))
}

// --------------------------------------------------------------- encounters

export function addEncounter(data) {
  const encounter = { id: uid('en'), createdAt: nowIso(), ...data }
  update((s) => ({ ...s, encounters: [encounter, ...s.encounters] }))
  return encounter
}

export function updateEncounter(id, data) {
  update((s) => ({
    ...s,
    encounters: s.encounters.map((e) => (e.id === id ? { ...e, ...data } : e)),
  }))
}

export function deleteEncounter(id) {
  update((s) => ({
    ...s,
    encounters: s.encounters.filter((e) => e.id !== id),
  }))
}

// ------------------------------------------------------------ prescriptions

export function addPrescription(data) {
  const rx = { id: uid('rx'), createdAt: nowIso(), ...data }
  update((s) => ({ ...s, prescriptions: [rx, ...s.prescriptions] }))
  return rx
}

export function deletePrescription(id) {
  update((s) => ({
    ...s,
    prescriptions: s.prescriptions.filter((rx) => rx.id !== id),
  }))
}

// ------------------------------------------------------------- data admin

export function exportData() {
  const blob = new Blob(
    [JSON.stringify({ exportedAt: nowIso(), ...state }, null, 2)],
    { type: 'application/json' },
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `serenest-emr-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importData(json) {
  const parsed = JSON.parse(json)
  if (
    !Array.isArray(parsed.patients) ||
    !Array.isArray(parsed.encounters) ||
    !Array.isArray(parsed.prescriptions)
  ) {
    throw new Error('Not a valid Serenest EMR backup file.')
  }
  update(() => ({
    patients: parsed.patients,
    encounters: parsed.encounters,
    prescriptions: parsed.prescriptions,
  }))
}

export function clearAllData() {
  update(() => EMPTY)
}

// -------------------------------------------------------------- utilities

export function fullName(p) {
  return [p.firstName, p.lastName].filter(Boolean).join(' ')
}

export function ageOf(dob) {
  if (!dob) return null
  const birth = new Date(dob)
  if (Number.isNaN(birth.getTime())) return null
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1
  return age
}

export function bmiOf(weightKg, heightCm) {
  const w = parseFloat(weightKg)
  const h = parseFloat(heightCm)
  if (!w || !h) return null
  const m = h / 100
  return (w / (m * m)).toFixed(1)
}

export function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function initialsOf(p) {
  return [p.firstName?.[0], p.lastName?.[0]]
    .filter(Boolean)
    .join('')
    .toUpperCase()
}

// -------------------------------------------------------------- demo data

export function loadSampleData() {
  const day = 24 * 60 * 60 * 1000
  const iso = (daysAgo) => new Date(Date.now() - daysAgo * day).toISOString()

  const p1 = {
    id: uid('pt'),
    firstName: 'Meera',
    lastName: 'Krishnan',
    dob: '1988-04-12',
    sex: 'Female',
    phone: '+91 98200 11223',
    email: 'meera.k@example.com',
    bloodGroup: 'B+',
    allergies: ['Penicillin'],
    conditions: ['Generalised anxiety disorder'],
    address: 'Andheri West, Mumbai',
    notes: 'Prefers evening teleconsultations.',
    createdAt: iso(90),
    updatedAt: iso(4),
  }
  const p2 = {
    id: uid('pt'),
    firstName: 'Arjun',
    lastName: 'Patel',
    dob: '1975-11-02',
    sex: 'Male',
    phone: '+91 99870 44556',
    email: 'arjun.patel@example.com',
    bloodGroup: 'O+',
    allergies: [],
    conditions: ['Type 2 diabetes mellitus', 'Hypertension'],
    address: 'Satellite, Ahmedabad',
    notes: '',
    createdAt: iso(200),
    updatedAt: iso(12),
  }
  const p3 = {
    id: uid('pt'),
    firstName: 'Sana',
    lastName: 'Shaikh',
    dob: '2001-07-25',
    sex: 'Female',
    phone: '+91 91670 77889',
    email: '',
    bloodGroup: 'A-',
    allergies: ['Sulfa drugs', 'Dust mites'],
    conditions: [],
    address: 'Koramangala, Bengaluru',
    notes: 'Referred by Dr. Rao for insomnia workup.',
    createdAt: iso(20),
    updatedAt: iso(2),
  }

  const encounters = [
    {
      id: uid('en'),
      patientId: p1.id,
      date: iso(4),
      type: 'Follow-up',
      vitals: { bpSys: '118', bpDia: '76', hr: '72', temp: '36.8', spo2: '99', rr: '14', weight: '61', height: '162' },
      subjective:
        'Reports better sleep since last visit. Anxiety episodes reduced to 1–2/week, mostly work-triggered. No panic attacks.',
      objective:
        'Calm, well-groomed, good eye contact. Speech normal rate and tone. Affect euthymic, reactive.',
      assessment: 'GAD — improving on current regimen.',
      plan: 'Continue sertraline 50 mg OD. CBT exercises daily. Review in 4 weeks.',
      diagnoses: ['Generalised anxiety disorder'],
      followUp: new Date(Date.now() + 24 * day).toISOString().slice(0, 10),
      createdAt: iso(4),
    },
    {
      id: uid('en'),
      patientId: p2.id,
      date: iso(12),
      type: 'Consultation',
      vitals: { bpSys: '142', bpDia: '92', hr: '80', temp: '36.9', spo2: '97', rr: '16', weight: '84', height: '171' },
      subjective:
        'Fatigue and increased thirst over the past month. Missed metformin doses while travelling.',
      objective: 'HbA1c 8.1%. Fundus exam normal. No pedal oedema. Foot exam normal.',
      assessment: 'T2DM — suboptimal control. Stage 1 hypertension.',
      plan: 'Restart metformin 500 mg BD, add telmisartan 40 mg OD. Diet counselling. Repeat HbA1c in 3 months.',
      diagnoses: ['Type 2 diabetes mellitus', 'Essential hypertension'],
      followUp: new Date(Date.now() + 80 * day).toISOString().slice(0, 10),
      createdAt: iso(12),
    },
    {
      id: uid('en'),
      patientId: p3.id,
      date: iso(2),
      type: 'Teleconsultation',
      vitals: { bpSys: '', bpDia: '', hr: '', temp: '', spo2: '', rr: '', weight: '', height: '' },
      subjective:
        'Difficulty initiating sleep for 6 weeks; screen use until late night. Daytime somnolence affecting college.',
      objective: 'Appears tired. Epworth sleepiness scale 12/24.',
      assessment: 'Chronic insomnia — behavioural pattern likely.',
      plan: 'Sleep hygiene protocol, fixed wake time, no screens after 22:00. Sleep diary for 2 weeks. Avoid hypnotics for now.',
      diagnoses: ['Insomnia disorder'],
      followUp: new Date(Date.now() + 12 * day).toISOString().slice(0, 10),
      createdAt: iso(2),
    },
  ]

  const prescriptions = [
    {
      id: uid('rx'),
      patientId: p1.id,
      encounterId: encounters[0].id,
      date: iso(4),
      items: [
        {
          drug: 'Sertraline',
          strength: '50 mg',
          frequency: 'Once daily, morning',
          duration: '30 days',
          instructions: 'Take after breakfast.',
        },
      ],
      advice: 'Continue daily breathing exercises. Avoid caffeine after 4 pm.',
      createdAt: iso(4),
    },
    {
      id: uid('rx'),
      patientId: p2.id,
      encounterId: encounters[1].id,
      date: iso(12),
      items: [
        {
          drug: 'Metformin',
          strength: '500 mg',
          frequency: 'Twice daily',
          duration: '90 days',
          instructions: 'With meals.',
        },
        {
          drug: 'Telmisartan',
          strength: '40 mg',
          frequency: 'Once daily',
          duration: '90 days',
          instructions: 'Same time each morning.',
        },
      ],
      advice: '30 minutes brisk walking daily. Low-salt, low-sugar diet.',
      createdAt: iso(12),
    },
  ]

  update((s) => ({
    patients: [p1, p2, p3, ...s.patients],
    encounters: [...encounters, ...s.encounters],
    prescriptions: [...prescriptions, ...s.prescriptions],
  }))
}
