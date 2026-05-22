import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { ProgramGrid } from '../components/ProgramGrid'
import { ContactCta } from '../components/ContactCta'
import { usePageTitle } from '../hooks/usePageTitle'

export function ForProfessionalsPage() {
  usePageTitle('For clinicians')

  return (
    <>
      <PageHero
        eyebrow="For clinicians"
        title="Professional programmes that fit busy schedules"
        lede="Structured modules on documentation, telehealth literacy, assessment tools, and safe communication—for mental health practitioners."
      />
      <section className="section">
        <div className="container narrow">
          <p className="prose">
            Our clinician-facing work emphasises competence in virtual and hybrid care: consent, boundaries,
            follow-up, and alignment with telemedicine norms where relevant. Formats range from half-day
            intensives to multi-day cohort programmes.
          </p>
          <p className="home-teaser">
            <Link to="/programmes">See all programmes →</Link>
          </p>
        </div>
      </section>
      <section className="section section--warm">
        <div className="container">
          <h2 className="section-title">Programmes for professionals</h2>
          <ProgramGrid filter="professionals" />
        </div>
      </section>
      <ContactCta lede="Tell us your specialty, cohort size, and preferred format—we will suggest a tailored outline." />
    </>
  )
}
