import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { ContactCta } from '../components/ContactCta'
import { usePageTitle } from '../hooks/usePageTitle'

export function AboutPage() {
  usePageTitle('About')

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Education that respects science and context"
        lede="Serenest Education Pvt Ltd is the learning arm of the Serenest ecosystem—focused on programmes, not clinical services on this site."
      />
      <section className="section">
        <div className="container narrow">
          <h2 className="section-title">Why we exist</h2>
          <p className="prose">
            Mental health skills should scale beyond the clinic. We build courses, workshops, and learning
            resources for professionals and the public. Our goal is practical competence—clear language,
            responsible framing, and teaching that respects both evidence and the Indian regulatory context.
          </p>
          <p className="prose">
            We are separate from Serenest&apos;s clinical platform, but we share the same standards for
            documentation, boundaries, and responsible communication about mental health.
          </p>
        </div>
      </section>
      <section className="section section--warm">
        <div className="container">
          <h2 className="section-title">How we work</h2>
          <ul className="bullet-list">
            <li>Co-design programmes with your institution or leadership team</li>
            <li>Deliver live, hybrid, or recorded formats depending on cohort needs</li>
            <li>Provide outlines and learning objectives before you commit</li>
            <li>Stay within education and awareness—we do not offer diagnosis or treatment on this site</li>
          </ul>
          <p className="home-teaser">
            <Link to="/what-we-do">Explore what we do →</Link>
          </p>
        </div>
      </section>
      <ContactCta lede="Ask about our mission, partnerships, or how we tailor content for Indian audiences." />
    </>
  )
}
