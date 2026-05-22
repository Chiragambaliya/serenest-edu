import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { ContactCta } from '../components/ContactCta'
import { usePageTitle } from '../hooks/usePageTitle'
import { pillars } from '../data/programs'

export function WhatWeDoPage() {
  usePageTitle('What we do')

  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Three ways we help you learn"
        lede="Professional programmes, organisational literacy, and public resources—each with clear boundaries and evidence-led content."
      />
      <section className="section">
        <div className="container">
          <div className="cards-3">
            {pillars.map((p) => (
              <article key={p.title} className="card">
                <div className="card__icon" aria-hidden>
                  {p.icon}
                </div>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__body">{p.body}</p>
                <Link to={p.href} className="card__more">
                  View details →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  )
}
