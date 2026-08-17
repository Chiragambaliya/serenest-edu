import { useEffect, useState } from 'react'

export function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal" style={wide ? { maxWidth: 860 } : undefined}>
        <div className="modal-head">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export function Field({ label, span2, children }) {
  return (
    <div className={`field${span2 ? ' span-2' : ''}`}>
      <label>{label}</label>
      {children}
    </div>
  )
}

/**
 * Free-text input that manages a list of tags (allergies, conditions,
 * diagnoses). Enter or comma commits the current text as a tag.
 */
export function TagInput({ value, onChange, placeholder, tone = 'plain' }) {
  const [draft, setDraft] = useState('')

  const commit = () => {
    const t = draft.trim().replace(/,+$/, '')
    if (t && !value.includes(t)) onChange([...value, t])
    setDraft('')
  }

  return (
    <div>
      {value.length > 0 && (
        <div style={{ marginBottom: 6 }}>
          {value.map((t) => (
            <span key={t} className={`tag tag-${tone}`}>
              {t}{' '}
              <button
                type="button"
                onClick={() => onChange(value.filter((x) => x !== t))}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  fontWeight: 700,
                  padding: '0 0 0 2px',
                }}
                aria-label={`Remove ${t}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            commit()
          }
        }}
        onBlur={commit}
      />
    </div>
  )
}

export function EmptyState({ icon, title, children }) {
  return (
    <div className="empty">
      <div className="empty-icon" aria-hidden>
        {icon}
      </div>
      <h4 className="empty-title">{title}</h4>
      {children}
    </div>
  )
}

export function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}
