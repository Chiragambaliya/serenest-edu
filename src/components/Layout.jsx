import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Logo } from './Logo'

const primaryNav = [
  { to: '/about', label: 'About' },
  { to: '/what-we-do', label: 'What we do' },
  { to: '/programmes', label: 'Programmes' },
  { to: '/for-professionals', label: 'For clinicians' },
  { to: '/for-organisations', label: 'For organisations' },
]

const footerNav = [
  { to: '/about', label: 'About' },
  { to: '/programmes', label: 'Programmes' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

function navClass({ isActive }) {
  return isActive ? 'nav__link nav__link--active' : 'nav__link'
}

function NavItems({ closeMenu }) {
  const onClick = closeMenu ? () => closeMenu() : undefined
  return (
    <>
      {primaryNav.map(({ to, label }) => (
        <NavLink key={to} to={to} onClick={onClick} className={navClass}>
          {label}
        </NavLink>
      ))}
      <NavLink to="/contact" onClick={onClick} className={({ isActive }) => (isActive ? 'nav__cta nav__link--active' : 'nav__cta')}>
        Get in touch
      </NavLink>
    </>
  )
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <Logo size={38} />
            <span className="brand__text">
              <span className="brand__name">Serenest</span>
              <span className="brand__sub">Education</span>
            </span>
          </Link>
          <nav className="nav nav--desktop" aria-label="Primary">
            <NavItems closeMenu={() => setMenuOpen(false)} />
          </nav>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            aria-haspopup="dialog"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="nav-toggle__bars" aria-hidden>
              <span className={menuOpen ? 'nav-toggle__bar nav-toggle__bar--open' : 'nav-toggle__bar'} />
              <span className={menuOpen ? 'nav-toggle__bar nav-toggle__bar--open' : 'nav-toggle__bar'} />
              <span className={menuOpen ? 'nav-toggle__bar nav-toggle__bar--open' : 'nav-toggle__bar'} />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-drawer"
        className={`nav-drawer${menuOpen ? ' nav-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!menuOpen}
      >
        <div className="nav-drawer__head">
          <span className="nav-drawer__title">Menu</span>
          <button type="button" className="nav-drawer__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            ×
          </button>
        </div>
        <nav className="nav nav--mobile" aria-label="Primary mobile">
          <NavItems closeMenu={() => setMenuOpen(false)} />
        </nav>
      </div>
      {menuOpen ? (
        <button type="button" className="nav-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
      ) : null}

      <main id="top">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <Logo size={32} />
            <div>
              <strong>Serenest Education</strong>
              <span className="footer__legal">Serenest Education Pvt Ltd</span>
            </div>
          </div>
          <nav className="footer__nav" aria-label="Footer">
            {footerNav.map(({ to, label }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
          <p className="footer__copy">© {new Date().getFullYear()} Serenest Education Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
