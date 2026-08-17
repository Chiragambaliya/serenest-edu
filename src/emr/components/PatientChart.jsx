import { useState } from 'react'
import {
  useEmr,
  fullName,
  ageOf,
  bmiOf,
  formatDate,
  initialsOf,
  addEncounter,
  deleteEncounter,
  addPrescription,
  deletePrescription,
  deletePatient,
} from '../store.js'
import { Modal, Field, TagInput, EmptyState } from './ui.jsx'
import { PatientForm } from './Patients.jsx'

const ENCOUNTER_TYPES = [
  'Consultation',
  'Follow-up',
  'Teleconsultation',
  'Emergency',
  'Procedure',
]

const BLANK_VITALS = {
  bpSys: '',
  bpDia: '',
  hr: '',
  temp: '',
  spo2: '',
  rr: '',
  weight: '',
  height: '',
}

// ------------------------------------------------------------- encounter

function EncounterForm({ patientId, onClose }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: 'Consultation',
    vitals: { ...BLANK_VITALS },
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    diagnoses: [],
    followUp: '',
  })
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))
  const setInput = (k) => (e) => set(k)(e.target.value)
  const setVital = (k) => (e) =>
    setForm((f) => ({ ...f, vitals: { ...f.vitals, [k]: e.target.value } }))

  const submit = (e) => {
    e.preventDefault()
    addEncounter({ patientId, ...form })
    onClose()
  }

  const vitalFields = [
    ['bpSys', 'BP sys (mmHg)'],
    ['bpDia', 'BP dia (mmHg)'],
    ['hr', 'Pulse (bpm)'],
    ['rr', 'Resp (/min)'],
    ['temp', 'Temp (°C)'],
    ['spo2', 'SpO₂ (%)'],
    ['weight', 'Weight (kg)'],
    ['height', 'Height (cm)'],
  ]

  return (
    <Modal title="New encounter" onClose={onClose} wide>
      <form onSubmit={submit}>
        <div className="form-grid" style={{ marginBottom: 16 }}>
          <Field label="Date">
            <input
              type="date"
              value={form.date}
              onChange={setInput('date')}
              required
            />
          </Field>
          <Field label="Type">
            <select value={form.type} onChange={setInput('type')}>
              {ENCOUNTER_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <p className="section-label">Vitals</p>
        <div className="vitals-grid" style={{ marginBottom: 18 }}>
          {vitalFields.map(([k, label]) => (
            <Field key={k} label={label}>
              <input value={form.vitals[k]} onChange={setVital(k)} />
            </Field>
          ))}
        </div>

        <p className="section-label">SOAP note</p>
        <div className="form-grid">
          <Field label="Subjective" span2>
            <textarea
              value={form.subjective}
              onChange={setInput('subjective')}
              placeholder="History, complaints, patient's account…"
            />
          </Field>
          <Field label="Objective" span2>
            <textarea
              value={form.objective}
              onChange={setInput('objective')}
              placeholder="Examination findings, investigations…"
            />
          </Field>
          <Field label="Assessment" span2>
            <textarea
              value={form.assessment}
              onChange={setInput('assessment')}
              placeholder="Clinical impression…"
            />
          </Field>
          <Field label="Plan" span2>
            <textarea
              value={form.plan}
              onChange={setInput('plan')}
              placeholder="Management, investigations ordered, counselling…"
            />
          </Field>
          <Field label="Diagnoses" span2>
            <TagInput
              value={form.diagnoses}
              onChange={set('diagnoses')}
              placeholder="Type a diagnosis and press Enter"
              tone="teal"
            />
          </Field>
          <Field label="Follow-up date">
            <input
              type="date"
              value={form.followUp}
              onChange={setInput('followUp')}
            />
          </Field>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save encounter
          </button>
        </div>
      </form>
    </Modal>
  )
}

// ------------------------------------------------------------------- rx

const BLANK_MED = {
  drug: '',
  strength: '',
  frequency: '',
  duration: '',
  instructions: '',
}

function RxForm({ patientId, onClose }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [items, setItems] = useState([{ ...BLANK_MED }])
  const [advice, setAdvice] = useState('')

  const setItem = (i, k) => (e) =>
    setItems((arr) =>
      arr.map((m, idx) => (idx === i ? { ...m, [k]: e.target.value } : m)),
    )

  const submit = (e) => {
    e.preventDefault()
    const meds = items.filter((m) => m.drug.trim())
    if (meds.length === 0) return
    addPrescription({ patientId, date, items: meds, advice })
    onClose()
  }

  return (
    <Modal title="New prescription" onClose={onClose} wide>
      <form onSubmit={submit}>
        <div className="form-grid" style={{ marginBottom: 16 }}>
          <Field label="Date">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Field>
        </div>

        <p className="section-label">Medications</p>
        {items.map((m, i) => (
          <div className="rx-line" key={i}>
            <Field label="Drug">
              <input
                value={m.drug}
                onChange={setItem(i, 'drug')}
                placeholder="e.g. Sertraline"
              />
            </Field>
            <Field label="Strength">
              <input
                value={m.strength}
                onChange={setItem(i, 'strength')}
                placeholder="50 mg"
              />
            </Field>
            <Field label="Frequency">
              <input
                value={m.frequency}
                onChange={setItem(i, 'frequency')}
                placeholder="Once daily"
              />
            </Field>
            <Field label="Duration">
              <input
                value={m.duration}
                onChange={setItem(i, 'duration')}
                placeholder="30 days"
              />
            </Field>
            <Field label="Instructions">
              <input
                value={m.instructions}
                onChange={setItem(i, 'instructions')}
                placeholder="After food"
              />
            </Field>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() =>
                setItems((arr) =>
                  arr.length > 1 ? arr.filter((_, idx) => idx !== i) : arr,
                )
              }
              aria-label="Remove medication"
              disabled={items.length === 1}
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setItems((arr) => [...arr, { ...BLANK_MED }])}
        >
          + Add medication
        </button>

        <div className="form-grid" style={{ marginTop: 16 }}>
          <Field label="Advice" span2>
            <textarea
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              placeholder="Lifestyle advice, warnings, review instructions…"
            />
          </Field>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save prescription
          </button>
        </div>
      </form>
    </Modal>
  )
}

// ------------------------------------------------------------- print view

function RxPrint({ rx, patient }) {
  const age = ageOf(patient.dob)
  return (
    <div className="rx-print">
      <div className="rx-print-head">
        <div>
          <p className="rx-print-doc">Dr. Chirag Ambaliya</p>
          <p className="rx-print-sub">Serenest EMR · Consultation practice</p>
        </div>
        <div className="rx-print-meta">
          {rx.id}
          <br />
          {formatDate(rx.date)}
        </div>
      </div>
      <div className="rx-print-patient">
        <span>
          <b>Patient:</b> {fullName(patient)}
        </span>
        {age != null && (
          <span>
            <b>Age/Sex:</b> {age} y{patient.sex ? ` / ${patient.sex}` : ''}
          </span>
        )}
        {(patient.allergies || []).length > 0 && (
          <span>
            <b>Allergies:</b> {patient.allergies.join(', ')}
          </span>
        )}
      </div>
      <p className="rx-print-symbol">℞</p>
      <table>
        <thead>
          <tr>
            <th style={{ width: 24 }}>#</th>
            <th>Medication</th>
            <th>Strength</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {rx.items.map((m, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{m.drug}</td>
              <td>{m.strength}</td>
              <td>{m.frequency}</td>
              <td>{m.duration}</td>
              <td>{m.instructions}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rx.advice && (
        <p className="rx-print-advice">
          <b>Advice:</b> {rx.advice}
        </p>
      )}
      <div className="rx-print-sign">
        <div>Signature</div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------- chart

export default function PatientChart({ patientId, initialTab, onBack }) {
  const { patients, encounters, prescriptions } = useEmr()
  const [tab, setTab] = useState(initialTab || 'overview')
  const [showEdit, setShowEdit] = useState(false)
  const [showEncounter, setShowEncounter] = useState(false)
  const [showRx, setShowRx] = useState(false)
  const [printRx, setPrintRx] = useState(null)

  const patient = patients.find((p) => p.id === patientId)
  if (!patient) {
    return (
      <EmptyState icon="🔍" title="Patient not found">
        <p>This record may have been deleted.</p>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Back to patients
        </button>
      </EmptyState>
    )
  }

  const age = ageOf(patient.dob)
  const myEncounters = encounters
    .filter((e) => e.patientId === patientId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  const myRx = prescriptions
    .filter((rx) => rx.patientId === patientId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  const latestVitals = myEncounters.find((e) =>
    Object.values(e.vitals || {}).some(Boolean),
  )?.vitals

  const doPrint = (rx) => {
    setPrintRx(rx)
    // Let React paint the print layer before opening the dialog.
    setTimeout(() => {
      window.print()
      setPrintRx(null)
    }, 60)
  }

  const removePatient = () => {
    if (
      window.confirm(
        `Delete ${fullName(patient)} and all their encounters and prescriptions? This cannot be undone.`,
      )
    ) {
      deletePatient(patientId)
      onBack()
    }
  }

  const vitalChips = (v) => {
    if (!v) return null
    const chips = [
      v.bpSys && v.bpDia && ['BP', `${v.bpSys}/${v.bpDia}`, 'mmHg'],
      v.hr && ['HR', v.hr, 'bpm'],
      v.rr && ['RR', v.rr, '/min'],
      v.temp && ['T', v.temp, '°C'],
      v.spo2 && ['SpO₂', v.spo2, '%'],
      v.weight && ['Wt', v.weight, 'kg'],
      v.height && ['Ht', v.height, 'cm'],
      bmiOf(v.weight, v.height) && ['BMI', bmiOf(v.weight, v.height), ''],
    ].filter(Boolean)
    if (chips.length === 0) return null
    return (
      <div className="vitals-strip">
        {chips.map(([label, val, unit]) => (
          <span className="vital-chip" key={label}>
            <span>{label} </span>
            <b>{val}</b>
            <span> {unit}</span>
          </span>
        ))}
      </div>
    )
  }

  return (
    <>
      <button
        className="btn btn-ghost btn-sm"
        onClick={onBack}
        style={{ marginBottom: 14 }}
      >
        ← Patients
      </button>

      <div className="chart-banner">
        <span className="avatar">{initialsOf(patient) || '?'}</span>
        <div>
          <div className="chart-id">{patient.id}</div>
          <h1 className="chart-name">{fullName(patient)}</h1>
          <div className="chart-facts">
            {age != null && (
              <span>
                <b>{age} y</b>
                {patient.sex ? ` · ${patient.sex}` : ''}
              </span>
            )}
            {patient.bloodGroup && (
              <span>
                Blood <b>{patient.bloodGroup}</b>
              </span>
            )}
            {patient.phone && <span>{patient.phone}</span>}
            {patient.email && <span>{patient.email}</span>}
          </div>
          <div style={{ marginTop: 8 }}>
            {(patient.allergies || []).length === 0 ? (
              <span className="tag tag-plain">No known drug allergies</span>
            ) : (
              patient.allergies.map((a) => (
                <span key={a} className="tag tag-red">
                  ⚠ {a}
                </span>
              ))
            )}
            {(patient.conditions || []).map((c) => (
              <span key={c} className="tag tag-blue">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="chart-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowEncounter(true)}
          >
            + Encounter
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowRx(true)}
          >
            + Prescription
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowEdit(true)}
          >
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={removePatient}>
            Delete
          </button>
        </div>
      </div>

      <div className="chart-tabs">
        {[
          ['overview', 'Overview'],
          ['encounters', `Encounters (${myEncounters.length})`],
          ['prescriptions', `Prescriptions (${myRx.length})`],
        ].map(([key, label]) => (
          <button
            key={key}
            className={tab === key ? 'active' : ''}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="chart-body">
        <div className="chart-sheet">
          {tab === 'overview' && (
            <>
              <p className="section-label">Latest vitals</p>
              {latestVitals ? (
                vitalChips(latestVitals)
              ) : (
                <p style={{ color: 'var(--ink-faint)', fontSize: 14 }}>
                  No vitals recorded yet.
                </p>
              )}

              <p className="section-label" style={{ marginTop: 24 }}>
                Details
              </p>
              <div className="soap" style={{ gridTemplateColumns: '110px 1fr' }}>
                <dt>DOB</dt>
                <dd>
                  {patient.dob ? formatDate(patient.dob) : '—'}
                  {age != null ? ` (${age} y)` : ''}
                </dd>
                <dt>Address</dt>
                <dd>{patient.address || '—'}</dd>
                <dt>Registered</dt>
                <dd>{formatDate(patient.createdAt)}</dd>
                <dt>Notes</dt>
                <dd>{patient.notes || '—'}</dd>
              </div>
            </>
          )}

          {tab === 'encounters' &&
            (myEncounters.length === 0 ? (
              <EmptyState icon="📋" title="No encounters recorded">
                <p>Record the first visit for this patient.</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowEncounter(true)}
                >
                  + New encounter
                </button>
              </EmptyState>
            ) : (
              myEncounters.map((e) => (
                <div className="enc-item" key={e.id}>
                  <div className="enc-head">
                    <span className="enc-date">{formatDate(e.date)}</span>
                    <span className="tag tag-teal">{e.type}</span>
                    {(e.diagnoses || []).map((d) => (
                      <span key={d} className="tag tag-plain">
                        {d}
                      </span>
                    ))}
                    <span style={{ marginLeft: 'auto' }}>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (window.confirm('Delete this encounter?'))
                            deleteEncounter(e.id)
                        }}
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                  {vitalChips(e.vitals)}
                  <dl className="soap">
                    {e.subjective && (
                      <>
                        <dt>S</dt>
                        <dd>{e.subjective}</dd>
                      </>
                    )}
                    {e.objective && (
                      <>
                        <dt>O</dt>
                        <dd>{e.objective}</dd>
                      </>
                    )}
                    {e.assessment && (
                      <>
                        <dt>A</dt>
                        <dd>{e.assessment}</dd>
                      </>
                    )}
                    {e.plan && (
                      <>
                        <dt>P</dt>
                        <dd>{e.plan}</dd>
                      </>
                    )}
                  </dl>
                  {e.followUp && (
                    <p
                      style={{
                        margin: '10px 0 0',
                        fontSize: 13,
                        color: 'var(--amber)',
                        fontWeight: 600,
                      }}
                    >
                      ↻ Follow-up: {formatDate(e.followUp)}
                    </p>
                  )}
                </div>
              ))
            ))}

          {tab === 'prescriptions' &&
            (myRx.length === 0 ? (
              <EmptyState icon="℞" title="No prescriptions issued">
                <p>Write the first prescription for this patient.</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowRx(true)}
                >
                  + New prescription
                </button>
              </EmptyState>
            ) : (
              myRx.map((rx) => (
                <div className="rx-item" key={rx.id}>
                  <div className="enc-head">
                    <span className="enc-date">{formatDate(rx.date)}</span>
                    <span className="tag tag-amber">
                      {rx.items.length} medication
                      {rx.items.length > 1 ? 's' : ''}
                    </span>
                    <span
                      style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}
                    >
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => doPrint(rx)}
                      >
                        Print
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (window.confirm('Delete this prescription?'))
                            deletePrescription(rx.id)
                        }}
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                  {rx.items.map((m, i) => (
                    <div className="rx-med" key={i}>
                      <span className="rx-med-name">
                        {i + 1}. {m.drug} {m.strength}
                      </span>
                      <span className="rx-med-detail">
                        {[m.frequency, m.duration, m.instructions]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </div>
                  ))}
                  {rx.advice && (
                    <p
                      style={{
                        margin: '10px 0 0',
                        fontSize: 13.5,
                        color: 'var(--ink-soft)',
                      }}
                    >
                      <b>Advice:</b> {rx.advice}
                    </p>
                  )}
                </div>
              ))
            ))}
        </div>
      </div>

      {showEdit && (
        <PatientForm patient={patient} onClose={() => setShowEdit(false)} />
      )}
      {showEncounter && (
        <EncounterForm
          patientId={patientId}
          onClose={() => setShowEncounter(false)}
        />
      )}
      {showRx && (
        <RxForm patientId={patientId} onClose={() => setShowRx(false)} />
      )}
      {printRx && <RxPrint rx={printRx} patient={patient} />}
    </>
  )
}
