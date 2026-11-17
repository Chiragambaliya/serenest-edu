import { useState } from 'react'
import { useAcademy } from '../context'
import { INITIAL_REQUESTS, VERIFY_ROLES, fieldForRole } from '../data/verification'

export function VerifyView() {
  const { tab, showToast } = useAcademy()
  const active = tab === 'verify'
  const [roleValue, setRoleValue] = useState(VERIFY_ROLES[0].value)
  const [regNo, setRegNo] = useState('')
  const [status, setStatus] = useState('Status: Verified')
  const [requests, setRequests] = useState(INITIAL_REQUESTS)
  const field = fieldForRole(roleValue)
  const pending = requests.filter((item) => item.status === 'pending').length

  function submit(event) {
    event.preventDefault()
    const trimmed = regNo.trim()
    if (!trimmed) return
    setRequests((current) => [
      {
        id: `v-${Date.now()}`,
        name: 'New Applicant (Self-Submitted)',
        role: roleValue,
        council: field.council,
        regNo: trimmed,
        submitted: 'Just now',
        status: 'pending',
      },
      ...current,
    ])
    setRegNo('')
    setStatus('Status: Queued for Review')
    showToast(`Submitted ${trimmed} for verification. Added to Admin Console below.`)
  }

  function decide(id, decision) {
    const target = requests.find((item) => item.id === id)
    if (!target) return
    setRequests((current) => current.map((item) => (item.id === id ? { ...item, status: decision } : item)))
    showToast(
      decision === 'verified'
        ? `Approved ${target.name} (${target.regNo}). No ID file was stored in this demo.`
        : `Rejected ${target.name} (${target.regNo}). No ID file was stored in this demo.`,
    )
  }

  return (
    <section id="view-verify" className="ac-view" role="tabpanel" aria-labelledby="dock-verify" hidden={!active}>
      <div className="bento bento--ivory ac-verify-card">
        <div className="ac-verify-card__head">
          <div>
            <span className="ac-kicker ac-kicker--ink">Profile Verification &amp; 90-Day Pass</span>
            <h2 className="ac-editorial">Council &amp; ID Verification</h2>
          </div>
          <span className="ac-status-pill">{status}</span>
        </div>
        <form onSubmit={submit}>
          <div className="ac-form-grid">
            <label>
              <span>Professional Role</span>
              <select value={roleValue} onChange={(event) => setRoleValue(event.target.value)}>
                {VERIFY_ROLES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{field.field}</span>
              <input
                value={regNo}
                onChange={(event) => setRegNo(event.target.value)}
                required
                placeholder={field.placeholder}
                autoComplete="off"
              />
            </label>
          </div>
          <div className="ac-verify-card__foot">
            <p>
              Unlocks <strong>90-Day Founding Pass (₹0)</strong> + verified council badge. This demo keeps the number in
              memory only — no document is uploaded.
            </p>
            <button type="submit" className="ac-btn ac-btn--dark">
              Submit for Verification →
            </button>
          </div>
        </form>
      </div>

      <div className="ac-admin">
        <div className="ac-section-head">
          <div>
            <h3 className="ac-editorial">Admin Verification Console</h3>
            <p className="ac-muted">Verify council numbers on official registers before approving</p>
          </div>
          <div className="ac-admin__links">
            <a href="https://www.nmc.org.in/information-desk/indian-medical-register/" target="_blank" rel="noreferrer">
              NMC Register ↗
            </a>
            <a href="https://rehabcouncil.nic.in/" target="_blank" rel="noreferrer">
              RCI Register ↗
            </a>
          </div>
        </div>

        <div className="bento bento--sand ac-purge">
          <p>
            <strong>DPDP demo:</strong> this console never receives an ID file. Approve and Reject only change the
            in-memory queue.
          </p>
          <span>
            {pending} Pending
          </span>
        </div>

        <div className="ac-queue">
          {requests.map((item) => (
            <article key={item.id} className="bento bento--glass ac-request">
              <div className="ac-request__head">
                <div>
                  <div className="ac-post__author">{item.name}</div>
                  <div className="ac-post__badge">{item.role}</div>
                  <div className="ac-request__reg">
                    {item.council} · <strong>{item.regNo}</strong>
                    <span> · {item.submitted}</span>
                  </div>
                </div>
                <span className={`ac-request__status ac-request__status--${item.status}`}>{item.status}</span>
              </div>
              {item.status === 'pending' ? (
                <div className="ac-request__actions">
                  <button type="button" className="ac-btn ac-btn--ghost" onClick={() => decide(item.id, 'rejected')}>
                    Reject
                  </button>
                  <button type="button" className="ac-pill ac-pill--on" onClick={() => decide(item.id, 'verified')}>
                    Approve
                  </button>
                </div>
              ) : (
                <p className="ac-request__done">Decision recorded in this session. Nothing was written to storage.</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
