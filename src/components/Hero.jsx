import { useRef } from 'react'
import { ChevronDown, Sparkles, Star, ArrowRight } from 'lucide-react'
import './Hero.css'

export default function Hero({ onOpenBooking }) {
  const headlineRef = useRef(null)

  const scrollToSection = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero" aria-label="Hero section">
      {/* Background image layer */}
      <div className="hero__bg" aria-hidden="true">
        <img src="/images/hero.jpg" alt="" className="hero__bg-img" loading="eager" />
        <div className="hero__bg-overlay" />
        <div className="hero__bg-gradient" />
      </div>

      {/* Content */}
      <div className="container hero__content">
        <div className="hero__badge fade-up">
          <Sparkles size={14} />
          <span>Premiere Dance Academy & Community</span>
        </div>

        <h1 className="hero__headline fade-up fade-up-delay-1" ref={headlineRef}>
          Feel the <span className="gradient-text">Rhythm.</span>
          <br />
          Live the <span className="gradient-text">Dance.</span>
        </h1>

        <p className="hero__subtitle fade-up fade-up-delay-2">
          Discover your passion, build confidence, and express yourself through world-class dance.
          <br className="hero__br" />
          From Bollywood beats to contemporary flow — beginners warmly welcomed into every batch.
        </p>

        {/* Social Proof Pill */}
        <div className="hero__social-proof fade-up fade-up-delay-2">
          <div className="hero__stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <span>Rated 4.9/5 by 500+ Dancers • 100% Free First Trial Class</span>
        </div>

        <div className="hero__actions fade-up fade-up-delay-3">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => onOpenBooking && onOpenBooking()}
            aria-label="Book your free dance trial class"
          >
            <Sparkles size={18} />
            <span>Book Free Trial Pass</span>
          </button>
          <button
            type="button"
            className="btn btn-outline btn-lg"
            onClick={() => scrollToSection('#classes')}
            aria-label="Explore our dance classes"
          >
            <span>Explore Classes</span>
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Stats row */}
        <div className="hero__stats fade-up fade-up-delay-4" aria-label="Studio highlights">
          {[
            { value: '6+', label: 'Dance Disciplines' },
            { value: '500+', label: 'Active Students' },
            { value: '8+', label: 'Years of Excellence' },
            { value: '50+', label: 'Stage Showcases' },
          ].map(({ value, label }) => (
            <div key={label} className="hero__stat">
              <span className="hero__stat-value gradient-text">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className="hero__scroll"
        onClick={() => scrollToSection('#about')}
        aria-label="Scroll to About section"
      >
        <ChevronDown size={22} />
      </button>
    </section>
  )
}
