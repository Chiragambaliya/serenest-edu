import { PageHero } from '../components/PageHero'
import { ProgramGrid } from '../components/ProgramGrid'
import { ContactCta } from '../components/ContactCta'
import { usePageTitle } from '../hooks/usePageTitle'

export function ProgrammesPage() {
  usePageTitle('Programmes')

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Upcoming & recurring offerings"
        lede="Details and dates are coordinated directly with institutions and cohorts. Reach out to tailor a programme for your team."
      />
      <section className="section">
        <div className="container">
          <ProgramGrid />
        </div>
      </section>
      <ContactCta />
    </>
  )
}
