import { Award, Heart, Users, Sparkles } from 'lucide-react'
import './About.css'

const highlights = [
  { icon: <Users size={19} />, label: '500+ Dancers Trained' },
  { icon: <Award size={19} />, label: '8+ Years of Excellence' },
  { icon: <Heart size={19} />, label: 'All Skill Levels Welcome' },
]

export default function About({ onOpenBooking }) {
  const scrollToSection = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" className="about section" aria-label="About Rhythm Vibes Dance Studio">
      <div className="container">
        <div className="about__grid">
          {/* Image column */}
          <div className="about__image-col fade-up">
            <div className="about__image-wrap">
              <img
                src="/images/about.jpg"
                alt="Students practicing choreography inside Rhythm Vibes studio"
                className="about__img"
                loading="lazy"
              />
              {/* Floating credential badge */}
              <div className="about__float-card" aria-label="Studio achievement">
                <span className="about__float-icon">🏆</span>
                <div>
                  <strong>Premier Dance Academy</strong>
                  <p>Certified choreographers & mentors</p>
                </div>
              </div>
              {/* Decorative glows */}
              <div className="about__deco about__deco--1" aria-hidden="true" />
              <div className="about__deco about__deco--2" aria-hidden="true" />
            </div>
          </div>

          {/* Text column */}
          <div className="about__text-col">
            <div className="about__header fade-up">
              <span className="section-label">
                <Sparkles size={13} /> Our Journey & Philosophy
              </span>
              <h2 className="about__title">
                Where Passion Meets
                <span className="gradient-text"> Performance</span>
              </h2>
              <div className="divider" />
            </div>

            <p className="about__body fade-up fade-up-delay-1">
              Founded on the belief that dance is for everyone, <strong>Rhythm Vibes Dance Studio</strong> is a vibrant, supportive creative space where students of all ages discover the confidence and pure joy of movement. Whether you are stepping onto a dance floor for the very first time or perfecting complex stage choreography, you will find a home here.
            </p>

            <p className="about__body fade-up fade-up-delay-2">
              Our team of award-winning choreographers brings rich stage experience across commercial Bollywood, urban street styles, lyrical contemporary, and dance fitness. We emphasize musicality, healthy body mechanics, and a culture where every small milestone is celebrated.
            </p>

            {/* Highlights */}
            <div className="about__highlights fade-up fade-up-delay-3">
              {highlights.map(({ icon, label }) => (
                <div key={label} className="about__highlight">
                  <span className="about__highlight-icon">{icon}</span>
                  <span className="about__highlight-label">{label}</span>
                </div>
              ))}
            </div>

            <div className="about__actions fade-up fade-up-delay-4">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => onOpenBooking && onOpenBooking()}
                aria-label="Book a free dance trial"
              >
                <Sparkles size={16} /> Book Free Trial Pass
              </button>
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={() => scrollToSection('#classes')}
                aria-label="View our dance classes"
              >
                Explore Classes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
