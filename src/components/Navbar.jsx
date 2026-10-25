import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
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
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click or Escape key
  useEffect(() => {
    const handlePointerDown = (e) => {
      // If click originated from the hamburger button itself, let the button's onClick handle it
      if (hamburgerRef.current && hamburgerRef.current.contains(e.target)) {
        return
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('pointerdown', handlePointerDown)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
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
            <span className="navbar__cta-text-full">Book Free Trial</span>
            <span className="navbar__cta-text-mobile">Book Trial</span>
          </button>
          <button
            ref={hamburgerRef}
            type="button"
            className="navbar__hamburger"
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen((prev) => !prev)
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Portal Mobile Overlay & Drawer to document.body so containing block is always full viewport */}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {/* Mobile Overlay */}
            <div
              className={`navbar__overlay ${menuOpen ? 'navbar__overlay--open' : ''}`}
              aria-hidden={!menuOpen}
              onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Menu Drawer (Side Panel) */}
            <aside
              id="mobile-menu"
              ref={menuRef}
              className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
              role="dialog"
              aria-label="Mobile navigation menu"
              aria-modal="true"
            >
              <div className="navbar__mobile-header">
                <div className="navbar__mobile-brand">
                  <span className="navbar__logo-icon">
                    <Flame size={18} />
                  </span>
                  <div className="navbar__logo-text">
                    <span className="navbar__logo-main">Rhythm Vibes</span>
                    <span className="navbar__logo-sub">Dance Academy</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="navbar__close-btn"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
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
                    <span>{label}</span>
                    {activeLink === href && <span className="navbar__mobile-pill">Current</span>}
                  </a>
                ))}
              </nav>

              <div className="navbar__mobile-footer">
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
                <div className="navbar__mobile-contact-row">
                  <a href="tel:+919876543210" className="mobile-contact-pill">
                    📞 Call Studio
                  </a>
                  <a
                    href="https://wa.me/919876543210?text=Hi%20Rhythm%20Vibes!%20I%20would%20like%20to%20inquire%20about%20classes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-contact-pill mobile-contact-pill--wa"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}
    </header>
  )
}
