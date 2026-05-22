import { PageHero } from '../components/PageHero'
import { ContactCta } from '../components/ContactCta'
import { usePageTitle } from '../hooks/usePageTitle'

const faqs = [
  {
    q: 'Is Serenest Education the same as the Serenest clinical app?',
    a: 'No. This site is for education and training programmes only. Clinical services are offered separately through Serenest’s clinical platform.',
  },
  {
    q: 'Do you provide therapy or diagnosis through these programmes?',
    a: 'No. Our sessions are educational. They do not replace assessment or treatment by qualified professionals.',
  },
  {
    q: 'How do we book a programme for our institution?',
    a: 'Email education@serenest.fit with your organisation type, audience, preferred dates, and goals. We will reply with next steps and sample outlines.',
  },
  {
    q: 'Can programmes be delivered online?',
    a: 'Yes. Many offerings are hybrid or fully virtual. We will confirm format, duration, and technical needs when scoping your cohort.',
  },
  {
    q: 'Do you issue CME certificates?',
    a: 'Certificate availability depends on the specific programme and accrediting partners. Ask when you enquire—we will confirm for your cohort.',
  },
]

export function FaqPage() {
  usePageTitle('FAQ')

  return (
    <>
      <PageHero eyebrow="FAQ" title="Common questions" lede="Quick answers about how we work, what we offer, and how to get started." />
      <section className="section">
        <div className="container narrow">
          <dl className="faq-list">
            {faqs.map((item) => (
              <div key={item.q} className="faq-item">
                <dt className="faq-item__q">{item.q}</dt>
                <dd className="faq-item__a">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <ContactCta />
    </>
  )
}
