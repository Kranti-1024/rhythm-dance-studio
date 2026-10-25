import { Flame, ArrowRight, Heart } from 'lucide-react'
import './Footer.css'

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
)

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const SpotifyIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 15c2.5-1 5.5-1 8 0"/>
    <path d="M7 12c3.5-1.5 7.5-1.5 10 0"/>
    <path d="M6 9c4-2 9-2 12 0"/>
  </svg>
)

const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'About Us',   href: '#about' },
  { label: 'Classes',    href: '#classes' },
  { label: 'Faculty',    href: '#faculty' },
  { label: 'Timetable',  href: '#schedule' },
  { label: 'Pricing',    href: '#pricing' },
  { label: 'Reviews',    href: '#reviews' },
  { label: 'FAQ',        href: '#faq' },
  { label: 'Contact',    href: '#contact' },
]

const classes = [
  'Bollywood Dance',
  'Hip-Hop & Street Styles',
  'Contemporary Flow',
  'Kids Dance Academy',
  'Wedding Choreography',
  'Dance Fitness (Zumba)',
]

const socials = [
  { icon: <InstagramIcon size={18} />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <YoutubeIcon size={18} />,   label: 'YouTube',   href: 'https://youtube.com' },
  { icon: <FacebookIcon size={18} />,  label: 'Facebook',  href: 'https://facebook.com' },
  { icon: <SpotifyIcon size={18} />,   label: 'Spotify Playlist', href: 'https://spotify.com' },
]

export default function Footer({ onOpenBooking }) {
  const scrollToSection = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer" role="contentinfo">
      {/* Wave Transition */}
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L48 8C96 16 192 32 288 37.3C384 43 480 37 576 32C672 27 768 21 864 24C960 27 1056 37 1152 42.7C1248 48 1344 48 1392 48L1440 48V60H0V0Z" fill="#0d0d12"/>
        </svg>
      </div>

      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-icon">
                  <Flame size={18} />
                </span>
                <span className="footer__logo-text">
                  <span className="footer__logo-main">Rhythm Vibes</span>
                  <span className="footer__logo-sub">Dance Academy</span>
                </span>
              </div>
              <p className="footer__tagline">Feel the Rhythm. Live the Dance.</p>
              <p className="footer__desc">
                A premier dance academy fostering confidence, artistic movement, and community for dancers of all ages. Experience your first class for free.
              </p>

              {/* Social icons */}
              <div className="footer__socials" aria-label="Social media channels">
                {socials.map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="footer__social"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="footer__col">
              <h3 className="footer__col-title">Explore</h3>
              <ul className="footer__links" aria-label="Explore studio pages">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="footer__link"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(href)
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dance Classes */}
            <div className="footer__col">
              <h3 className="footer__col-title">Our Styles</h3>
              <ul className="footer__links" aria-label="Dance styles taught">
                {classes.map((cls) => (
                  <li key={cls}>
                    <a
                      href="#classes"
                      className="footer__link"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('#classes')
                      }}
                    >
                      {cls}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details & Trial Action */}
            <div className="footer__col">
              <h3 className="footer__col-title">Connect</h3>
              <ul className="footer__contact-list" aria-label="Studio contact info">
                <li>
                  <span className="footer__contact-label">📞 Direct Call</span>
                  <a href="tel:+919876543210" className="footer__contact-link">
                    +91 98765 43210
                  </a>
                </li>
                <li>
                  <span className="footer__contact-label">✉️ Email Support</span>
                  <a href="mailto:hello@rhythmvibes.dance" className="footer__contact-link">
                    hello@rhythmvibes.dance
                  </a>
                </li>
                <li>
                  <span className="footer__contact-label">📍 Studio Hub</span>
                  <a
                    href="https://maps.google.com/?q=Rhythm+Vibes+Dance+Studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__contact-link"
                  >
                    123 Rhythm Blvd, Arts District
                  </a>
                </li>
                <li>
                  <span className="footer__contact-label">🕐 Studio Hours</span>
                  <span className="footer__contact-val">Mon–Sat: 7:00 AM – 9:00 PM</span>
                </li>
              </ul>

              <button
                type="button"
                className="btn btn-primary footer__trial-btn"
                onClick={() => onOpenBooking && onOpenBooking()}
              >
                <span>Book Free Trial</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} Rhythm Vibes Dance Studio. All rights reserved.
          </p>
          <p className="footer__credit">
            Built with <Heart size={13} className="credit-heart" /> for passionate dancers everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
