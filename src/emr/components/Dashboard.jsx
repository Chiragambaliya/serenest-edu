import {
  useEmr,
  fullName,
  formatDate,
  loadSampleData,
} from '../store.js'
import { EmptyState } from './ui.jsx'

export default function Dashboard({ onOpenPatient, onNewPatient }) {
  const { patients, encounters, prescriptions } = useEmr()

  const byId = Object.fromEntries(patients.map((p) => [p.id, p]))
  const recent = [...encounters]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8)

  const today = new Date().toISOString().slice(0, 10)
  const upcoming = encounters
    .filter((e) => e.followUp && e.followUp >= today)
    .sort((a, b) => a.followUp.localeCompare(b.followUp))
    .slice(0, 8)

  const thisMonth = new Date().toISOString().slice(0, 7)
  const encountersThisMonth = encounters.filter((e) =>
    (e.date || '').startsWith(thisMonth),
  ).length

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Practice overview</h1>
          <p className="page-sub">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <button className="btn btn-primary" onClick={onNewPatient}>
          + Register patient
        </button>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="stat-num">{patients.length}</div>
          <div className="stat-label">Registered patients</div>
        </div>
        <div className="stat">
          <div className="stat-num">{encountersThisMonth}</div>
          <div className="stat-label">Encounters this month</div>
        </div>
        <div className="stat">
          <div className="stat-num">{prescriptions.length}</div>
          <div className="stat-label">Prescriptions issued</div>
        </div>
        <div className="stat">
          <div className="stat-num">{upcoming.length}</div>
          <div className="stat-label">Follow-ups scheduled</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="card card-pad">
          <p className="section-label">Recent encounters</p>
          {recent.length === 0 ? (
            <EmptyState icon="🗂" title="No encounters yet">
              <p>
                Register a patient and record your first encounter — or load
                sample data from Settings to explore.
              </p>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => loadSampleData()}
              >
                Load sample data
              </button>
            </EmptyState>
          ) : (
            recent.map((e) => {
              const p = byId[e.patientId]
              if (!p) return null
              return (
                <div
                  key={e.id}
                  className="activity-item"
                  onClick={() => onOpenPatient(p.id, 'encounters')}
                >
                  <div className="activity-date">{formatDate(e.date)}</div>
                  <div>
                    <div className="activity-name">{fullName(p)}</div>
                    <div className="activity-meta">
                      {e.type}
                      {e.diagnoses?.length
                        ? ` · ${e.diagnoses.join(', ')}`
                        : ''}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="card card-pad">
          <p className="section-label">Upcoming follow-ups</p>
          {upcoming.length === 0 ? (
            <EmptyState icon="📅" title="Nothing scheduled">
              <p>Follow-up dates recorded on encounters will appear here.</p>
            </EmptyState>
          ) : (
            upcoming.map((e) => {
              const p = byId[e.patientId]
              if (!p) return null
              return (
                <div
                  key={e.id}
                  className="activity-item"
                  onClick={() => onOpenPatient(p.id, 'encounters')}
                >
                  <div className="activity-date">{formatDate(e.followUp)}</div>
                  <div>
                    <div className="activity-name">{fullName(p)}</div>
                    <div className="activity-meta">after {e.type}</div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}
