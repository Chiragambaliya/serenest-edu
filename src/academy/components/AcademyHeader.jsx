import { Link } from 'react-router-dom'
import { useAcademy } from '../context'

export function AcademyHeader() {
  const { isDoctor, setRole } = useAcademy()

  return (
    <header className="ac-header">
      <div className="ac-brand">
        <div className="ac-mark" aria-hidden="true">
          S
        </div>
        <div>
          <div className="ac-brand__row">
            <span className="ac-brand__name">Serenest Academy</span>
          </div>
          <p className="ac-brand__meta">
            <Link to="/" className="ac-back">
              Education site
            </Link>
          </p>
        </div>
      </div>

      <div className="ac-role" role="group" aria-label="Role toggle">
        <button
          type="button"
          className={isDoctor ? 'ac-pill ac-pill--on' : 'ac-pill ac-pill--off'}
          aria-pressed={isDoctor}
          aria-label="Verified Doctor (NMC/SMC)"
          onClick={() => setRole('doctor')}
        >
          Doctor
        </button>
        <button
          type="button"
          className={!isDoctor ? 'ac-pill ac-pill--on' : 'ac-pill ac-pill--off'}
          aria-pressed={!isDoctor}
          aria-label="RCI, PG, or student"
          onClick={() => setRole('learner')}
        >
          RCI / PG
        </button>
      </div>
    </header>
  )
}
