import { useEffect, useState } from 'react'
import { useAcademy } from '../context'
import { DIAL_ARC, DIAL_CYCLE, DRUGS } from '../data/drugs'

export function DrugsView() {
  const { tab, showToast } = useAcademy()
  const active = tab === 'drugs'
  const [slug, setSlug] = useState('brexpiprazole')
  const [stepIndex, setStepIndex] = useState(1)
  const [cardOpen, setCardOpen] = useState(false)

  const drug = DRUGS.find((item) => item.slug === slug) ?? DRUGS[0]
  const step = drug.steps[stepIndex]
  const ratio = (stepIndex + 1) / drug.steps.length
  const dash = Math.round(DIAL_ARC * ratio)

  useEffect(() => {
    if (!active) return undefined
    function onKey(event) {
      if (event.key === 'Escape') setCardOpen(false)
      if (cardOpen) return
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select')) return
      if (event.key === 'ArrowRight') setStepIndex((index) => Math.min(drug.steps.length - 1, index + 1))
      if (event.key === 'ArrowLeft') setStepIndex((index) => Math.max(0, index - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, cardOpen, drug.steps.length])

  useEffect(() => {
    if (!cardOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [cardOpen])

  function selectDrug(next) {
    setSlug(next)
    setStepIndex(1)
    setCardOpen(false)
  }

  function printCard() {
    document.body.classList.add('academy-print-card')
    window.print()
    window.addEventListener(
      'afterprint',
      () => {
        document.body.classList.remove('academy-print-card')
      },
      { once: true },
    )
  }

  return (
    <section id="view-drugs" className="ac-view ac-view--drugs" role="tabpanel" aria-labelledby="dock-drugs" hidden={!active}>
      <div className="ac-filters" role="tablist" aria-label="Molecules">
        {DRUGS.map((item) => {
          const on = item.slug === slug
          return (
            <button
              key={item.slug}
              type="button"
              className={on ? 'ac-pill ac-pill--on' : 'ac-pill ac-pill--off'}
              aria-pressed={on}
              onClick={() => selectDrug(item.slug)}
            >
              {item.shortName}
            </button>
          )
        })}
      </div>

      <article className="bento bento--glass ac-drug-head">
        <div className="ac-badges">
          <span className="ac-badge ac-badge--mint">✓ Independent · No Sponsor</span>
          <span className="ac-badge ac-badge--amber">0.5 CME Points [Pending Accreditation]</span>
        </div>
        <h2 className="ac-editorial ac-drug-title">{drug.name}</h2>
        <p className="ac-muted">{drug.mechanism}</p>
        <p className="ac-fit">{drug.clinicalFit}</p>
      </article>

      <div className="ac-drug-grid">
        <article className="bento bento--glass ac-dial">
          <div className="ac-dial__head">
            <span className="ac-kicker ac-kicker--mint">Titration Stepper</span>
            <span className="ac-mono ac-muted">
              Step {stepIndex + 1} of {drug.steps.length}
            </span>
          </div>
          <div className="ac-dial__stage">
            <svg className="ac-dial__svg" viewBox="0 0 240 240" aria-hidden="true">
              <defs>
                <linearGradient id="academyDialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5EEAD4" />
                  <stop offset="60%" stopColor="#FAF6F0" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              <circle cx="120" cy="120" r="94" fill="none" stroke="rgba(20,23,26,0.12)" strokeWidth="13" strokeLinecap="round" strokeDasharray={`${DIAL_ARC} ${DIAL_CYCLE}`} />
              <circle
                cx="120"
                cy="120"
                r="94"
                fill="none"
                stroke="url(#academyDialGrad)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${DIAL_CYCLE}`}
                className="ac-dial__arc"
              />
            </svg>
            <span className="ac-dial__tick ac-dial__tick--start">{drug.steps[0].dose}</span>
            <span className="ac-dial__tick ac-dial__tick--target">{drug.steps[1].dose}</span>
            <span className="ac-dial__tick ac-dial__tick--max">{drug.steps[drug.steps.length - 1].dose}</span>
            <div className="ac-dial__core">
              <span className="ac-dial__stage-label">{step.stage}</span>
              <div className="ac-dial__dose">{step.dose}</div>
              <span className="ac-dial__ind">{step.ind}</span>
            </div>
          </div>
          <p className="ac-dial__note">{step.note}</p>
          <div className="ac-stepper">
            <button type="button" aria-label="Previous titration step" disabled={stepIndex === 0} onClick={() => setStepIndex((index) => index - 1)}>
              −
            </button>
            <button
              type="button"
              aria-label="Next titration step"
              disabled={stepIndex === drug.steps.length - 1}
              onClick={() => setStepIndex((index) => index + 1)}
            >
              +
            </button>
          </div>
        </article>

        <article className="bento bento--sand ac-india">
          <div className="ac-india__head">
            <span className="ac-kicker ac-kicker--ink">In India · CDSCO &amp; Market Data</span>
            <span className="ac-india__tag">IPS Aligned</span>
          </div>
          <div className="ac-india__row">
            <span>CDSCO Approval Status</span>
            <strong>{drug.cdsco}</strong>
          </div>
          <div className="ac-india__row">
            <span>Indian Commercial Brands</span>
            <strong>{drug.brands}</strong>
          </div>
          <div className="ac-india__row">
            <span>Monthly Cost (MRP / Jan Aushadhi)</span>
            <strong className="ac-mono">{drug.cost}</strong>
          </div>
          <div className="ac-india__pearl">
            <span>Indian Psychiatric Society (IPS) Pearl</span>
            <p>{drug.ipsPearl}</p>
          </div>
          <button type="button" className="ac-btn ac-btn--ink" onClick={() => setCardOpen(true)}>
            View One-Page OPD Clinic Card →
          </button>
        </article>
      </div>

      <p className="ac-disclaimer">
        Educational reference for qualified clinicians. Doses here are a study aid, not a prescription or a substitute for
        current product labelling.
      </p>

      {cardOpen ? (
        <div className="ac-modal" role="presentation" onClick={() => setCardOpen(false)}>
          <div
            className="bento bento--ivory ac-print-root ac-modal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="clinic-card-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="ac-modal__head">
              <div>
                <span className="ac-kicker ac-kicker--ink">Serenest Academy · One-Page OPD Clinic Card</span>
                <h3 id="clinic-card-title" className="ac-editorial">
                  {drug.name}
                </h3>
                <p className="ac-muted ac-muted--ink">{drug.mechanism}</p>
              </div>
              <button type="button" className="ac-toast__close ac-no-print" onClick={() => setCardOpen(false)} aria-label="Close clinic card">
                ✕
              </button>
            </div>
            <div className="ac-clinic-steps">
              {drug.steps.map((item) => (
                <div key={item.stage} className="ac-clinic-steps__row">
                  <div>
                    <strong>{item.stage}</strong>
                    <span>{item.ind}</span>
                  </div>
                  <span className="ac-mono">{item.dose}</span>
                </div>
              ))}
            </div>
            <div className="bento bento--sand ac-clinic-meta">
              <div>
                <strong>CDSCO Status:</strong> {drug.cdsco}
              </div>
              <div>
                <strong>Indian Brands:</strong> {drug.brands}
              </div>
              <div>
                <strong>Monthly Cost:</strong> <span className="ac-mono">{drug.cost}</span>
              </div>
            </div>
            <p className="ac-clinic-pearl">{drug.ipsPearl}</p>
            <p className="ac-disclaimer ac-disclaimer--ink">
              Educational reference. Confirm the current label before prescribing.
            </p>
            <div className="ac-modal__foot">
              <span className="ac-mono ac-muted ac-muted--ink">Independent · No Sponsor Edits</span>
              <button
                type="button"
                className="ac-btn ac-btn--dark ac-no-print"
                onClick={() => {
                  printCard()
                  showToast('Print dialog opened for the one-page OPD card.')
                }}
              >
                Print / Save OPD Card
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
