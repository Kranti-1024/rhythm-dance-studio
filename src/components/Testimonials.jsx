import { Star, Quote, CheckCircle2 } from 'lucide-react'
import './Testimonials.css'

const reviews = [
  {
    id: 1,
    name: 'Neha & Vikram Mathur',
    role: 'Wedding Sangeet Couple',
    rating: 5,
    tag: 'Wedding Choreography',
    quote:
      'We had two left feet and were terrified of dancing in front of 400 guests. Aryan crafted a routine tailored to our comfort level. By day 4 we felt like stage pros. It was the absolute highlight of our wedding!',
    initials: 'NV',
  },
  {
    id: 2,
    name: 'Sneha Kapoor',
    role: 'Tech Lead & Dance Fitness Member',
    rating: 5,
    tag: 'Dance Fitness & Bollywood',
    quote:
      'After 9 hours staring at code, walking into the studio feels like stepping into pure joy. I lost 6 kgs in 3 months without ever feeling like I was working out. The instructors radiate infectious positivity.',
    initials: 'SK',
  },
  {
    id: 3,
    name: 'Rajesh & Kavita Iyer',
    role: 'Parents of Aarav (Age 8)',
    rating: 5,
    tag: 'Kids Academy',
    quote:
      'Aarav was painfully shy and struggled with stage fright. Priya and the kids team worked patiently with him. Seeing him perform with a giant smile at the annual showcase brought tears to our eyes.',
    initials: 'RI',
  },
  {
    id: 4,
    name: 'Devika Menon',
    role: 'College Student & Performer',
    rating: 5,
    tag: 'Contemporary & Hip-Hop',
    quote:
      'The technique you learn here rivals top professional dance institutes. Maya and Rohan drill musicality, clean lines, and freestyle confidence. It is a genuine community where everyone lifts you up.',
    initials: 'DM',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="testimonials section" aria-label="Student and Parent Testimonials">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">
            <Star size={13} fill="#fda4af" /> Real Experiences
          </span>
          <h2 className="section-title">Loved by Dancers & Families</h2>
          <p className="section-subtitle">
            From first-time beginners to wedding couples and kids — hear what our dance family has to say.
          </p>

          {/* Social Proof Header Stats */}
          <div className="testimonials__rating-summary">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span className="rating-score">4.9 / 5.0</span>
            <span className="rating-divider">•</span>
            <span className="rating-count">Based on 240+ Verified Reviews</span>
          </div>
        </div>

        <div className="testimonials__grid">
          {reviews.map(({ id, name, role, rating, tag, quote, initials }, i) => (
            <article
              key={id}
              className={`testimonial-card glass-card fade-up fade-up-delay-${i + 1}`}
              aria-label={`Testimonial from ${name}`}
            >
              <div className="testimonial-card__header">
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{initials}</div>
                  <div>
                    <h3 className="testimonial-card__name">{name}</h3>
                    <span className="testimonial-card__role">{role}</span>
                  </div>
                </div>
                <Quote size={24} className="testimonial-card__quote-icon" />
              </div>

              <div className="testimonial-card__rating">
                {Array.from({ length: rating }).map((_, r) => (
                  <Star key={r} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
                <span className="tag tag-spec tag-verified">
                  <CheckCircle2 size={11} /> Verified Student
                </span>
              </div>

              <p className="testimonial-card__quote">"{quote}"</p>

              <div className="testimonial-card__footer">
                <span className="testimonial-card__tag">{tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
