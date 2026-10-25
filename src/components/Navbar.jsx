import { useState, useEffect, useRef } from 'react'
import { Menu, X, Flame, Sparkles } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Classes',  href: '#classes' },
  { label: 'Faculty',  href: '#faculty' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Reviews',  href: '#reviews' },
  { label: 'FAQ',      href: '#faq' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Track active section on scroll
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    setActiveLink(href)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        {/* Logo */}
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#home')
          }}
          aria-label="Rhythm Vibes Dance Studio - Home"
        >
          <span className="navbar__logo-icon">
            <Flame size={20} />
          </span>
          <span className="navbar__logo-text">
            <span className="navbar__logo-main">Rhythm Vibes</span>
            <span className="navbar__logo-sub">Dance Academy</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`navbar__link ${activeLink === href ? 'navbar__link--active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(href)
              }}
              aria-current={activeLink === href ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="navbar__actions">
          <button
            type="button"
            className="btn btn-primary navbar__cta"
            onClick={() => onOpenBooking && onOpenBooking()}
            aria-label="Book a free dance trial pass"
          >
            <Sparkles size={15} />
            <span>Book Free Trial</span>
          </button>
          <button
            type="button"
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`navbar__overlay ${menuOpen ? 'navbar__overlay--open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        role="dialog"
        aria-label="Mobile navigation menu"
        aria-modal="true"
      >
        <div className="navbar__mobile-header">
          <span className="navbar__logo-main">Rhythm Vibes</span>
          <button
            className="navbar__close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="navbar__mobile-links" aria-label="Mobile navigation">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`navbar__mobile-link ${activeLink === href ? 'navbar__mobile-link--active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(href)
              }}
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            className="btn btn-primary btn-lg navbar__mobile-cta"
            onClick={() => {
              setMenuOpen(false)
              if (onOpenBooking) onOpenBooking()
            }}
          >
            <Sparkles size={18} /> Book Free Trial Pass
          </button>
        </nav>
      </div>
    </header>
  )
}
