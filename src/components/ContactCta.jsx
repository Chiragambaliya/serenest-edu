export function ContactCta({ title = 'Plan a programme or ask a question', lede }) {
  return (
    <section className="section section--cta">
      <div className="container cta-box">
        <div className="cta-box__copy">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">{title}</h2>
          <p className="cta-box__lede">
            {lede ??
              "Tell us whether you're a healthcare institution, HR or school leadership, or an individual professional. We'll respond with next steps and sample outlines where helpful."}
          </p>
        </div>
        <div className="cta-box__actions">
          <a href="mailto:education@serenest.fit?subject=Serenest%20Education%20enquiry" className="btn btn--primary btn--lg">
            education@serenest.fit
          </a>
          <p className="cta-box__note">Serenest Education Pvt Ltd · India</p>
        </div>
      </div>
    </section>
  )
}
