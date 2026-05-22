import { Link } from 'react-router-dom'
import { ContactCta } from '../components/ContactCta'
import { usePageTitle } from '../hooks/usePageTitle'
import { pillars } from '../data/programs'

export function HomePage() {
  usePageTitle(null)

  return (
    <>
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">Serenest Education Pvt Ltd</p>
            <h1 className="hero__title">
              Learning grounded in <em>clinical rigour</em>
            </h1>
            <p className="hero__lede">
              We design professional education, mental health literacy, and training programmes—so clinicians,
              organisations, and communities can grow with evidence-backed content, not hype.
            </p>
            <div className="hero__actions">
              <Link to="/programmes" className="btn btn--primary">
                View programmes
              </Link>
              <Link to="/contact" className="btn btn--ghost">
                Partner with us
              </Link>
            </div>
            <ul className="hero__tags" aria-label="Focus areas">
              <li>CME &amp; professional development</li>
              <li>Workplace &amp; schools</li>
              <li>Public mental health literacy</li>
            </ul>
          </div>
          <div className="hero__panel" aria-hidden="true">
            <div className="stat-card">
              <span className="stat-card__value">Evidence-led</span>
              <span className="stat-card__label">
                Curricula aligned with national telemedicine norms &amp; clinical documentation standards where
                relevant.
              </span>
            </div>
            <div className="stat-card stat-card--accent">
              <span className="stat-card__value">One ecosystem</span>
              <span className="stat-card__label">
                Education arm of the same team behind Serenest&apos;s clinical platform—separate site, shared
                standards.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container narrow">
          <p className="eyebrow eyebrow--center">Why we exist</p>
          <h2 className="section-title section-title--center">Mental health skills should scale beyond the clinic</h2>
          <p className="prose prose--center">
            Serenest Education builds courses, workshops, and learning resources for professionals and the public.
            Our goal is practical competence—clear language, responsible framing, and teaching that respects both
            science and the Indian regulatory context.
          </p>
          <p className="home-teaser">
            <Link to="/about">Read about us →</Link>
          </p>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we do</p>
            <h2 className="section-title">Three ways we help you learn</h2>
          </div>
          <div className="cards-3">
            {pillars.map((p) => (
              <article key={p.title} className="card card--link">
                <div className="card__icon" aria-hidden>
                  {p.icon}
                </div>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__body">{p.body}</p>
                <Link to={p.href} className="card__more">
                  Learn more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container narrow">
          <blockquote className="quote">
            <p>
              “Education is how we scale empathy and competence—so fewer people fall through the gaps between
              awareness and actual care.”
            </p>
            <footer>— Serenest Education</footer>
          </blockquote>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
