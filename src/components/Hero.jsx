import { useEffect, useRef } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'
import './Hero.css'

export default function Hero() {
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

      {/* Animated particles */}
      <div className="hero__particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="hero__particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Content */}
      <div className="container hero__content">
        <div className="hero__badge fade-up">
          <Sparkles size={14} />
          <span>Welcome to Rhythm Vibes</span>
        </div>

        <h1 className="hero__headline fade-up fade-up-delay-1" ref={headlineRef}>
          Feel the <span className="gradient-text">Rhythm.</span>
          <br />
          Live the <span className="gradient-text">Dance.</span>
        </h1>

        <p className="hero__subtitle fade-up fade-up-delay-2">
          Discover your passion, build confidence, and express yourself through dance.
          <br className="hero__br" />
          Classes for all ages and skill levels — beginners warmly welcome.
        </p>

        <div className="hero__actions fade-up fade-up-delay-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => scrollToSection('#classes')}
            aria-label="Explore our dance classes"
          >
            Explore Classes
          </button>
          <button
            className="btn btn-outline btn-lg"
            onClick={() => scrollToSection('#contact')}
            aria-label="Send an enquiry"
          >
            Enquire Now
          </button>
        </div>

        {/* Stats row */}
        <div className="hero__stats fade-up fade-up-delay-4" aria-label="Studio highlights">
          {[
            { value: '6+', label: 'Dance Styles' },
            { value: '500+', label: 'Happy Students' },
            { value: '8+', label: 'Years of Excellence' },
            { value: '50+', label: 'Shows Performed' },
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
        className="hero__scroll"
        onClick={() => scrollToSection('#about')}
        aria-label="Scroll to About section"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  )
}
