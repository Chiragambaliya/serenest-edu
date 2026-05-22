export function PageHero({ eyebrow, title, lede, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__glow" aria-hidden="true" />
      <div className="container page-hero__inner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="page-hero__title">{title}</h1>
        {lede ? <p className="page-hero__lede">{lede}</p> : null}
        {children}
      </div>
    </section>
  )
}
