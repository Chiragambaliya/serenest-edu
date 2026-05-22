import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { ProgramGrid } from '../components/ProgramGrid'
import { ContactCta } from '../components/ContactCta'
import { usePageTitle } from '../hooks/usePageTitle'

export function ForOrganisationsPage() {
  usePageTitle('For organisations')

  return (
    <>
      <PageHero
        eyebrow="For organisations"
        title="Workplace and campus mental health literacy"
        lede="Talks, orientation, and series for HR, school leadership, and student communities—education and awareness, not remote diagnosis."
      />
      <section className="section">
        <div className="container narrow">
          <p className="prose">
            We help corporates, schools, and colleges build shared language around distress, support, and
            escalation paths. Sessions are practical for managers and individual contributors, with clear
            boundaries about what education can and cannot do.
          </p>
          <p className="home-teaser">
            <Link to="/programmes">See all programmes →</Link>
          </p>
        </div>
      </section>
      <section className="section section--warm">
        <div className="container">
          <h2 className="section-title">Programmes for organisations</h2>
          <ProgramGrid filter="organisations" />
        </div>
      </section>
      <ContactCta lede="Share your organisation type, audience, and goals—we will propose session formats and themes." />
    </>
  )
}
