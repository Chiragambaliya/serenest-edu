import { useState } from 'react'
import { useAcademy } from '../context'
import { VERIFY_ROLES, fieldForRole } from '../data/verification'

export function VerifyView() {
  const { tab, showToast } = useAcademy()
  const active = tab === 'verify'
  const [roleValue, setRoleValue] = useState(VERIFY_ROLES[0].value)
  const [regNo, setRegNo] = useState('')
  const [receipt, setReceipt] = useState(null)
  const field = fieldForRole(roleValue)

  function submit(event) {
    event.preventDefault()
    const trimmed = regNo.trim()
    if (!trimmed) return
    setReceipt({
      role: roleValue,
      council: field.council,
      regNo: trimmed,
    })
    setRegNo('')
    showToast(`Saved ${trimmed} on this device only. It is not sent to a register.`)
  }

  return (
    <section id="view-verify" className="ac-view ac-view--verify" role="tabpanel" aria-labelledby="dock-verify" hidden={!active}>
      <div className="bento bento--ivory ac-verify-card">
        <div className="ac-verify-card__head">
          <div>
            <span className="ac-kicker ac-kicker--ink">Profile Verification &amp; 90-Day Pass</span>
            <h2 className="ac-editorial">Council &amp; ID Verification</h2>
          </div>
          <span className="ac-status-pill">{receipt ? 'Saved on this device' : 'Not submitted'}</span>
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
              Unlocks the <strong>90-Day Founding Pass (₹0)</strong> once a council confirms the number. This preview
              keeps it on your device only.
            </p>
            <button type="submit" className="ac-btn ac-btn--dark">
              Save number →
            </button>
          </div>
        </form>
      </div>

      {receipt ? (
        <article className="bento bento--glass ac-request">
          <div className="ac-request__head">
            <div>
              <div className="ac-post__author">Your number</div>
              <div className="ac-post__badge">{receipt.role}</div>
              <div className="ac-request__reg">
                {receipt.council} · <strong>{receipt.regNo}</strong>
              </div>
            </div>
            <span className="ac-request__status ac-request__status--pending">saved</span>
          </div>
          <p className="ac-request__done">Nothing was uploaded, and no one else can open this from the site.</p>
        </article>
      ) : null}

      <aside className="ac-verify-aside">
        <span className="ac-kicker ac-kicker--mint">Public registers</span>
        <p className="ac-muted">Open the council site and check a number there. This page does not send what you typed.</p>
        <div className="ac-admin__links">
          <a href="https://www.nmc.org.in/information-desk/indian-medical-register/" target="_blank" rel="noreferrer">
            Check NMC Register ↗
          </a>
          <a href="https://rehabcouncil.nic.in/" target="_blank" rel="noreferrer">
            Check RCI Register ↗
          </a>
        </div>
      </aside>
    </section>
  )
}
