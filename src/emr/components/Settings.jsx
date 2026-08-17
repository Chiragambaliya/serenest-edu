import { useRef } from 'react'
import {
  useEmr,
  exportData,
  importData,
  clearAllData,
  loadSampleData,
} from '../store.js'

export default function Settings() {
  const { patients, encounters, prescriptions } = useEmr()
  const fileRef = useRef(null)

  const onImportFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const text = await file.text()
      if (
        window.confirm(
          'Importing replaces all current EMR data with the backup file. Continue?',
        )
      ) {
        importData(text)
        window.alert('Backup imported successfully.')
      }
    } catch (err) {
      window.alert(`Import failed: ${err.message}`)
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Data &amp; settings</h1>
          <p className="page-sub">
            {patients.length} patients · {encounters.length} encounters ·{' '}
            {prescriptions.length} prescriptions stored locally
          </p>
        </div>
      </div>

      <div className="card card-pad">
        <div className="settings-row">
          <div>
            <h4>Export backup</h4>
            <p>
              Download the full EMR database as a JSON file. Keep regular
              backups — data lives only in this browser.
            </p>
          </div>
          <button className="btn btn-primary" onClick={exportData}>
            Download backup
          </button>
        </div>

        <div className="settings-row">
          <div>
            <h4>Import backup</h4>
            <p>
              Restore from a previously exported JSON file. This replaces all
              data currently in the app.
            </p>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => fileRef.current?.click()}
          >
            Choose file…
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            style={{ display: 'none' }}
            onChange={onImportFile}
          />
        </div>

        <div className="settings-row">
          <div>
            <h4>Load sample data</h4>
            <p>
              Add three demo patients with encounters and prescriptions to
              explore the app.
            </p>
          </div>
          <button className="btn btn-ghost" onClick={() => loadSampleData()}>
            Load samples
          </button>
        </div>

        <div className="settings-row">
          <div>
            <h4>Erase everything</h4>
            <p>Permanently delete all patients, encounters, and prescriptions.</p>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (
                window.confirm(
                  'Erase ALL EMR data from this browser? This cannot be undone.',
                )
              )
                clearAllData()
            }}
          >
            Erase all data
          </button>
        </div>
      </div>

      <p className="disclaimer">
        Serenest EMR stores records in this browser's local storage only —
        nothing is sent to any server. It is a personal record-keeping tool,
        not a certified medical device, and does not replace statutory
        documentation requirements. Export backups regularly and handle
        patient data in line with applicable privacy law.
      </p>
    </>
  )
}
