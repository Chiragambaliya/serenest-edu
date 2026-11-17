import { Link } from 'react-router-dom'
import { useAcademy } from '../context'

const SECTION_TITLES = {
  learn: 'Study',
  drugs: 'Drug guides',
  network: 'Network',
  verify: 'Verify',
}

export function AcademyHeader() {
  const { isDoctor, setRole, tab } = useAcademy()

  return (
    <header className="ac-header">
      <h1 className="ac-header__section">{SECTION_TITLES[tab]}</h1>
      <div className="ac-brand">
        <div className="ac-mark" aria-hidden="true">
          S
        </div>
        <div>
          <div className="ac-brand__row">
            <span className="ac-brand__name">Serenest Academy</span>
            <span className="ac-pass-chip">90-Day Free Founding Pass</span>
          </div>
          <p className="ac-brand__meta">
            serenest.academy · India’s Mental Health Workforce
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
          onClick={() => setRole('doctor')}
        >
          Verified Doctor (NMC/SMC)
        </button>
        <button
          type="button"
          className={!isDoctor ? 'ac-pill ac-pill--on' : 'ac-pill ac-pill--off'}
          aria-pressed={!isDoctor}
          onClick={() => setRole('learner')}
        >
          RCI / PG / Student
        </button>
      </div>
    </header>
  )
}
