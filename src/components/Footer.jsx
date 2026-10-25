import { Zap, Camera, Users, Video, Share2 } from 'lucide-react'
import './Footer.css'

const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Classes',  href: '#classes' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Contact',  href: '#contact' },
]

const classes = [
  'Bollywood Dance',
  'Hip-Hop',
  'Contemporary',
  'Kids Dance',
  'Wedding Choreography',
  'Dance Fitness',
]

const socials = [
  { icon: <Camera size={18} />, label: 'Instagram', href: '#' },
  { icon: <Users size={18} />,  label: 'Facebook',  href: '#' },
  { icon: <Video size={18} />,  label: 'YouTube',   href: '#' },
  { icon: <Share2 size={18} />, label: 'Twitter',   href: '#' },
]

export default function Footer() {
  const scrollToSection = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer" role="contentinfo">
      {/* Top wave */}
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L48 8C96 16 192 32 288 37.3C384 43 480 37 576 32C672 27 768 21 864 24C960 27 1056 37 1152 42.7C1248 48 1344 48 1392 48L1440 48V60H0V0Z" fill="#0a0a0a"/>
        </svg>
      </div>

      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-icon"><Zap size={18} /></span>
                <span className="footer__logo-text">
                  <span className="footer__logo-main">Rhythm Vibes</span>
                  <span className="footer__logo-sub">Dance Studio</span>
                </span>
              </div>
              <p className="footer__tagline">
                Feel the Rhythm. Live the Dance.
              </p>
              <p className="footer__desc">
                A premium dance academy welcoming beginners and performers of all levels.
                This is a demo website — all details are fictional.
              </p>
              {/* Social icons */}
              <div className="footer__socials" aria-label="Social media links">
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

            {/* Nav links */}
            <div className="footer__col">
              <h3 className="footer__col-title">Quick Links</h3>
              <ul className="footer__links" aria-label="Navigation links">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="footer__link"
                      onClick={(e) => { e.preventDefault(); scrollToSection(href) }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Classes */}
            <div className="footer__col">
              <h3 className="footer__col-title">Our Classes</h3>
              <ul className="footer__links" aria-label="Dance classes">
                {classes.map((cls) => (
                  <li key={cls}>
                    <a
                      href="#classes"
                      className="footer__link"
                      onClick={(e) => { e.preventDefault(); scrollToSection('#classes') }}
                    >
                      {cls}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h3 className="footer__col-title">Contact</h3>
              <ul className="footer__contact-list" aria-label="Contact information">
                <li>
                  <span className="footer__contact-label">📞 Phone</span>
                  <span className="footer__contact-val">+91 98765 XXXXX</span>
                </li>
                <li>
                  <span className="footer__contact-label">✉️ Email</span>
                  <span className="footer__contact-val">hello@rhythmvibes.demo</span>
                </li>
                <li>
                  <span className="footer__contact-label">📍 Address</span>
                  <span className="footer__contact-val">123 Demo Street,<br />Your City, State</span>
                </li>
                <li>
                  <span className="footer__contact-label">🕐 Hours</span>
                  <span className="footer__contact-val">Mon–Sat: 7 AM – 9 PM<br />Sunday: Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} Rhythm Vibes Dance Studio.{' '}
            <span className="footer__demo-note">
              Demo website — fictional business, for portfolio purposes only.
            </span>
          </p>
          <p className="footer__credit">
            Designed &amp; built as a freelance web dev portfolio demo.
          </p>
        </div>
      </div>
    </footer>
  )
}
