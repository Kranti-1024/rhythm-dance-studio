import { CheckCircle2, Star, Users, Heart, Trophy, Dumbbell, Sparkles } from 'lucide-react'
import './WhyChooseUs.css'

const features = [
  {
    icon: <CheckCircle2 size={26} />,
    title: 'Beginner-Friendly Space',
    desc: 'Zero dance experience needed. Our certified mentors meet you where you are and teach at your pace in a supportive, judgment-free zone.',
    color: 'crimson',
  },
  {
    icon: <Star size={26} />,
    title: '6+ Distinct Dance Styles',
    desc: 'From commercial Bollywood and street battles to fluid contemporary and fitness routines — learn multiple disciplines under one roof.',
    color: 'rose',
  },
  {
    icon: <Heart size={26} />,
    title: 'Warm & Inclusive Community',
    desc: 'Dance with professionals, working parents, students, and beginners who cheer each other on in every cypher and showcase.',
    color: 'crimson',
  },
  {
    icon: <Dumbbell size={26} />,
    title: 'Holistic Fitness & Stamina',
    desc: 'Build cardiovascular endurance, posture, core stability, and stage confidence without boring repetitive treadmill workouts.',
    color: 'rose',
  },
  {
    icon: <Trophy size={26} />,
    title: 'Stage & Performance Training',
    desc: 'Gain real performance experience through our seasonal stage showcases, video choreography projects, and dance battles.',
    color: 'crimson',
  },
  {
    icon: <Users size={26} />,
    title: 'Award-Winning Instructors',
    desc: 'Trained by industry professionals, reality show choreographers, and national battle finalists with proven pedagogical methods.',
    color: 'rose',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why" className="why section" aria-label="Why choose Rhythm Vibes">
      {/* Background radial glow */}
      <div className="why__bg" aria-hidden="true" />

      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">
            <Sparkles size={13} /> The Rhythm Advantage
          </span>
          <h2 className="section-title">Why Choose Rhythm Vibes?</h2>
          <p className="section-subtitle">
            We go beyond rote steps and 8-counts — we foster artists, confident performers, and lifelong lovers of movement.
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
