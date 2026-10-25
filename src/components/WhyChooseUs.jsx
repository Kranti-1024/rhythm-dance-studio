import { CheckCircle2, Star, Users, Heart, Trophy, Dumbbell } from 'lucide-react'
import './WhyChooseUs.css'

const features = [
  {
    icon: <CheckCircle2 size={28} />,
    title: 'Beginner-Friendly Classes',
    desc: 'No experience needed — our instructors meet you where you are and guide you at your own pace in a judgment-free zone.',
    color: 'purple',
  },
  {
    icon: <Star size={28} />,
    title: 'Multiple Dance Styles',
    desc: 'Explore Bollywood, Hip-Hop, Contemporary, Fitness, and more — all under one roof with expert-led sessions.',
    color: 'pink',
  },
  {
    icon: <Heart size={28} />,
    title: 'Supportive Community',
    desc: 'Join a warm, inclusive community of dancers who encourage each other to grow, improve, and shine together.',
    color: 'purple',
  },
  {
    icon: <Dumbbell size={28} />,
    title: 'Fitness & Confidence',
    desc: 'Build strength, flexibility, and coordination while gaining the confidence to perform in front of any audience.',
    color: 'pink',
  },
  {
    icon: <Trophy size={28} />,
    title: 'Performance Training',
    desc: 'Regular showcases, competitions, and choreography projects give students real stage experience and portfolio-worthy achievements.',
    color: 'purple',
  },
  {
    icon: <Users size={28} />,
    title: 'Expert Instructors',
    desc: 'Learn from qualified dance professionals with years of performance and teaching experience across multiple disciplines.',
    color: 'pink',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why" className="why section" aria-label="Why choose Rhythm Vibes">
      {/* Background graphic */}
      <div className="why__bg" aria-hidden="true" />

      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">Why Us</span>
          <h2 className="section-title">Why Choose Rhythm Vibes?</h2>
          <p className="section-subtitle">
            We go beyond steps and counts — we build dancers, performers, and lifelong lovers of movement.
          </p>
        </div>

        <div className="why__grid">
          {features.map(({ icon, title, desc, color }, i) => (
            <div
              key={title}
              className={`why-card glass-card fade-up fade-up-delay-${(i % 3) + 1}`}
              aria-label={title}
            >
              <div className={`why-card__icon why-card__icon--${color}`}>
                {icon}
              </div>
              <h3 className="why-card__title">{title}</h3>
              <p className="why-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
