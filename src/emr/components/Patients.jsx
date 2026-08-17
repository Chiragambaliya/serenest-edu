import { useState } from 'react'
import {
  useEmr,
  addPatient,
  updatePatient,
  fullName,
  ageOf,
  formatDate,
  initialsOf,
} from '../store.js'
import { Modal, Field, TagInput, EmptyState, SearchIcon } from './ui.jsx'

const BLANK = {
  firstName: '',
  lastName: '',
  dob: '',
  sex: '',
  phone: '',
  email: '',
  bloodGroup: '',
  allergies: [],
  conditions: [],
  address: '',
  notes: '',
}

export function PatientForm({ patient, onClose, onSaved }) {
  const [form, setForm] = useState(patient ? { ...BLANK, ...patient } : BLANK)
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))
  const setInput = (k) => (e) => set(k)(e.target.value)

  const submit = (e) => {
    e.preventDefault()
    if (!form.firstName.trim()) return
    if (patient) {
      updatePatient(patient.id, form)
      onSaved?.(patient.id)
    } else {
      const created = addPatient(form)
      onSaved?.(created.id)
    }
    onClose()
  }

  return (
    <Modal
      title={patient ? 'Edit patient' : 'Register patient'}
      onClose={onClose}
    >
      <form onSubmit={submit}>
        <div className="form-grid">
          <Field label="First name *">
            <input
              value={form.firstName}
              onChange={setInput('firstName')}
              required
              autoFocus
            />
          </Field>
          <Field label="Last name">
            <input value={form.lastName} onChange={setInput('lastName')} />
          </Field>
          <Field label="Date of birth">
            <input type="date" value={form.dob} onChange={setInput('dob')} />
          </Field>
          <Field label="Sex">
            <select value={form.sex} onChange={setInput('sex')}>
              <option value="">—</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Phone">
            <input value={form.phone} onChange={setInput('phone')} />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={setInput('email')}
            />
          </Field>
          <Field label="Blood group">
            <select value={form.bloodGroup} onChange={setInput('bloodGroup')}>
              <option value="">—</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="Address">
            <input value={form.address} onChange={setInput('address')} />
          </Field>
          <Field label="Allergies" span2>
            <TagInput
              value={form.allergies}
              onChange={set('allergies')}
              placeholder="Type an allergy and press Enter"
              tone="red"
            />
          </Field>
          <Field label="Chronic conditions" span2>
            <TagInput
              value={form.conditions}
              onChange={set('conditions')}
              placeholder="Type a condition and press Enter"
              tone="blue"
            />
          </Field>
          <Field label="Notes" span2>
            <textarea value={form.notes} onChange={setInput('notes')} />
          </Field>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {patient ? 'Save changes' : 'Register patient'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default function Patients({ onOpenPatient }) {
  const { patients } = useEmr()
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)

  const q = query.trim().toLowerCase()
  const filtered = q
    ? patients.filter((p) =>
        [fullName(p), p.phone, p.email, ...(p.conditions || [])]
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
    : patients

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-sub">
            {patients.length} registered · click a row to open the chart
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Register patient
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <SearchIcon />
          <input
            placeholder="Search by name, phone, email, or condition…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <EmptyState
            icon="🩺"
            title={q ? 'No matching patients' : 'No patients yet'}
          >
            <p>
              {q
                ? 'Try a different search term.'
                : 'Register your first patient to start charting.'}
            </p>
          </EmptyState>
        ) : (
          <table className="patient-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th className="hide-sm">Age / Sex</th>
                <th className="hide-sm">Phone</th>
                <th>Allergies</th>
                <th className="hide-sm">Last updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const age = ageOf(p.dob)
                return (
                  <tr key={p.id} onClick={() => onOpenPatient(p.id)}>
                    <td>
                      <div className="pt-cell">
                        <span className="avatar">{initialsOf(p) || '?'}</span>
                        <div>
                          <div className="pt-cell-name">{fullName(p)}</div>
                          <div className="pt-cell-sub">{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hide-sm">
                      {age != null ? `${age} y` : '—'}
                      {p.sex ? ` · ${p.sex}` : ''}
                    </td>
                    <td className="hide-sm">{p.phone || '—'}</td>
                    <td>
                      {(p.allergies || []).length === 0 ? (
                        <span className="tag tag-plain">NKDA</span>
                      ) : (
                        p.allergies.map((a) => (
                          <span key={a} className="tag tag-red">
                            {a}
                          </span>
                        ))
                      )}
                    </td>
                    <td className="hide-sm">{formatDate(p.updatedAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <PatientForm
          onClose={() => setShowForm(false)}
          onSaved={(id) => onOpenPatient(id)}
        />
      )}
    </>
  )
}
