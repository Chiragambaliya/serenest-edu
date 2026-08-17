import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import Patients, { PatientForm } from './components/Patients.jsx'
import PatientChart from './components/PatientChart.jsx'
import Settings from './components/Settings.jsx'

// Tiny hash router: #/dashboard, #/patients, #/patients/<id>, #/settings.
function parseHash() {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/')
  if (parts[0] === 'patients' && parts[1]) {
    return { view: 'patient', patientId: parts[1] }
  }
  if (parts[0] === 'patients') return { view: 'patients' }
  if (parts[0] === 'settings') return { view: 'settings' }
  return { view: 'dashboard' }
}

export default function App() {
  const [route, setRoute] = useState(parseHash)
  const [chartTab, setChartTab] = useState(null)
  const [showNewPatient, setShowNewPatient] = useState(false)

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = (hash) => {
    window.location.hash = hash
  }

  const openPatient = (id, tab) => {
    setChartTab(tab || null)
    go(`/patients/${id}`)
  }

  return (
    <div className="emr-shell">
      <header className="emr-topbar">
        <button className="emr-brand" onClick={() => go('/dashboard')}>
          <span className="emr-brand-mark">EMR</span>
          <span className="emr-brand-name">Serenest</span>
        </button>
        <nav className="emr-nav">
          {[
            ['dashboard', 'Dashboard'],
            ['patients', 'Patients'],
            ['settings', 'Data'],
          ].map(([key, label]) => (
            <button
              key={key}
              className={
                route.view === key ||
                (key === 'patients' && route.view === 'patient')
                  ? 'active'
                  : ''
              }
              onClick={() => go(`/${key}`)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {route.view === 'dashboard' && (
          <Dashboard
            onOpenPatient={openPatient}
            onNewPatient={() => setShowNewPatient(true)}
          />
        )}
        {route.view === 'patients' && <Patients onOpenPatient={openPatient} />}
        {route.view === 'patient' && (
          <PatientChart
            key={route.patientId}
            patientId={route.patientId}
            initialTab={chartTab}
            onBack={() => go('/patients')}
          />
        )}
        {route.view === 'settings' && <Settings />}
      </main>

      {showNewPatient && (
        <PatientForm
          onClose={() => setShowNewPatient(false)}
          onSaved={(id) => openPatient(id)}
        />
      )}
    </div>
  )
}
