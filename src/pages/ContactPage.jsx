import { PageHero } from '../components/PageHero'
import { usePageTitle } from '../hooks/usePageTitle'

export function ContactPage() {
  usePageTitle('Contact')

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Plan a programme or ask a question"
        lede="Tell us whether you are a healthcare institution, HR or school leadership, or an individual professional."
      />
      <section className="section">
        <div className="container narrow contact-page">
          <div className="contact-block">
            <h2 className="section-title">Email</h2>
            <p className="prose">
              <a href="mailto:education@serenest.fit?subject=Serenest%20Education%20enquiry" className="btn btn--primary btn--lg">
                education@serenest.fit
              </a>
            </p>
            <p className="prose">We typically respond within a few business days with next steps and sample outlines where helpful.</p>
          </div>
          <div className="contact-block">
            <h2 className="section-title">What to include</h2>
            <ul className="bullet-list">
              <li>Your role and organisation (if applicable)</li>
              <li>Audience size and type (clinicians, employees, students, public)</li>
              <li>Preferred timing and format (live, hybrid, recorded)</li>
              <li>Topics or programmes you are interested in</li>
            </ul>
          </div>
          <div className="contact-block contact-block--legal">
            <h2 className="section-title">Privacy</h2>
            <p className="prose prose--small">
              Information you send by email is used only to respond to your enquiry and coordinate programmes.
              We do not sell contact details. For clinical data practices, see Serenest&apos;s main platform policies.
            </p>
            <p className="footer__legal">Serenest Education Pvt Ltd · India</p>
          </div>
        </div>
      </section>
    </>
  )
}
