import { Award, Heart, Users } from 'lucide-react'
import './About.css'

const highlights = [
  { icon: <Users size={20} />, label: '500+ Students' },
  { icon: <Award size={20} />, label: '8+ Years' },
  { icon: <Heart size={20} />, label: 'All Skill Levels' },
]

export default function About() {
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
                alt="Students practicing dance in the Rhythm Vibes studio"
                className="about__img"
                loading="lazy"
              />
              {/* Floating card */}
              <div className="about__float-card" aria-hidden="true">
                <span className="about__float-icon">🎵</span>
                <div>
                  <strong>Demo Studio</strong>
                  <p>All details are fictional</p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="about__deco about__deco--1" aria-hidden="true" />
              <div className="about__deco about__deco--2" aria-hidden="true" />
            </div>
          </div>

          {/* Text column */}
          <div className="about__text-col">
            <div className="about__header fade-up">
              <span className="section-label">Our Story</span>
              <h2 className="about__title">
                Where Passion Meets
                <span className="gradient-text"> Performance</span>
              </h2>
              <div className="divider" />
            </div>

            <p className="about__body fade-up fade-up-delay-1">
              Founded on the belief that dance is for everyone, <strong>Rhythm Vibes Dance Studio</strong> has been
              a vibrant creative space where students of all ages discover their love for movement. Whether you're
              stepping onto the dance floor for the very first time or refining your craft as an experienced performer,
              our doors are open for you.
            </p>

            <p className="about__body fade-up fade-up-delay-2">
              Our team of passionate instructors brings expertise across multiple styles — from the high-energy beats
              of Bollywood and Hip-Hop to the elegant flow of Contemporary dance. We believe in a supportive, inclusive
              environment where confidence grows alongside skill.
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

            <div className="fade-up fade-up-delay-4">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => scrollToSection('#classes')}
                aria-label="View our dance classes"
              >
                View Our Classes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
