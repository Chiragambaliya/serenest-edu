import { useEffect, useState } from 'react'
import {
  profile,
  about,
  skills,
  consultation,
  academics,
  blog,
  cv,
  socials,
} from './data.js'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#consultation', label: 'Consultation' },
  { href: '#academics', label: 'Academics' },
  { href: '#blog', label: 'Blog' },
  { href: '#cv', label: 'CV' },
  { href: '#contact', label: 'Contact' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand">
          <span className="nav__mark">{profile.initials}</span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="nav__cta" href={`mailto:${profile.email}`}>
            Get in touch
          </a>
        </nav>

        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <p className="hero__eyebrow">{profile.role}</p>
        <h1 className="hero__title">
          Hi, I'm <span className="grad">{profile.name}</span>.
        </h1>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#consultation">
            Work with me
          </a>
          <a className="btn btn--ghost" href="#blog">
            Read the blog
          </a>
        </div>
      </div>
      <div className="hero__glow" aria-hidden="true" />
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section__title">{about.heading}</h2>
        <div className="about__grid">
          <div className="about__prose">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul className="chips">
              {skills.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <ul className="about__facts">
            {about.facts.map((f) => (
              <li key={f.label}>
                <span className="about__label">{f.label}</span>
                <span className="about__value">{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Consultation() {
  return (
    <section id="consultation" className="section section--alt">
      <div className="container">
        <h2 className="section__title">{consultation.heading}</h2>
        <p className="section__intro">{consultation.intro}</p>
        <div className="cards">
          {consultation.services.map((s) => (
            <article key={s.title} className="card">
              <h3 className="card__title">{s.title}</h3>
              <p className="card__desc">{s.description}</p>
              <span className="card__price">{s.price}</span>
            </article>
          ))}
        </div>
        <div className="section__cta">
          <a className="btn btn--primary btn--lg" href={`mailto:${profile.email}`}>
            {consultation.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}

function Academics() {
  return (
    <section id="academics" className="section">
      <div className="container">
        <h2 className="section__title">{academics.heading}</h2>
        <p className="section__intro">{academics.intro}</p>
        <ul className="pubs">
          {academics.publications.map((p) => (
            <li key={p.title} className="pub">
              <span className="pub__year">{p.year}</span>
              <div className="pub__body">
                <a className="pub__title" href={p.link}>
                  {p.title}
                </a>
                <span className="pub__venue">{p.venue}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Blog() {
  return (
    <section id="blog" className="section section--alt">
      <div className="container">
        <h2 className="section__title">{blog.heading}</h2>
        <p className="section__intro">{blog.intro}</p>
        <div className="cards">
          {blog.posts.map((post) => (
            <article key={post.title} className="card card--post">
              <span className="card__date">{post.date}</span>
              <h3 className="card__title">
                <a href={post.link}>{post.title}</a>
              </h3>
              <p className="card__desc">{post.excerpt}</p>
              <a className="card__link" href={post.link}>
                Read more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CV() {
  return (
    <section id="cv" className="section">
      <div className="container">
        <h2 className="section__title">{cv.heading}</h2>
        <p className="section__intro">{cv.intro}</p>
        <div className="cv__grid">
          <div>
            <h3 className="cv__subhead">Experience</h3>
            <ul className="timeline">
              {cv.experience.map((e) => (
                <li key={e.role + e.org} className="timeline__item">
                  <div className="timeline__head">
                    <span className="timeline__role">{e.role}</span>
                    <span className="timeline__period">{e.period}</span>
                  </div>
                  <span className="timeline__org">{e.org}</span>
                  <p className="timeline__detail">{e.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="cv__subhead">Education</h3>
            <ul className="timeline">
              {cv.education.map((e) => (
                <li key={e.degree + e.org} className="timeline__item">
                  <div className="timeline__head">
                    <span className="timeline__role">{e.degree}</span>
                    <span className="timeline__period">{e.period}</span>
                  </div>
                  <span className="timeline__org">{e.org}</span>
                  <p className="timeline__detail">{e.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {profile.cvUrl && profile.cvUrl !== '#' && (
          <div className="section__cta">
            <a className="btn btn--primary btn--lg" href={profile.cvUrl} download>
              Download full CV
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section section--alt">
      <div className="container contact">
        <h2 className="section__title">Let's connect</h2>
        <p className="contact__lead">
          For consultation, collaboration, a talk, or just to say hello — reach
          out or find me online.
        </p>
        <a className="btn btn--primary btn--lg" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <ul className="socials">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                <span className="socials__label">{s.label}</span>
                <span className="socials__handle">{s.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div className="footer__socials">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Consultation />
        <Academics />
        <Blog />
        <CV />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
