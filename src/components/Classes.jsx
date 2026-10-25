import { ArrowRight } from 'lucide-react'
import './Classes.css'

const classes = [
  {
    id: 'bollywood',
    title: 'Bollywood Dance',
    tag: 'All Levels',
    tagVariant: '',
    image: '/images/bollywood.jpg',
    description:
      'Dive into the vibrant world of Indian cinema with high-energy choreography, expressive gestures, and colourful costumes. Perfect for festive occasions and pure joy.',
    emoji: '💃',
  },
  {
    id: 'hiphop',
    title: 'Hip-Hop',
    tag: 'Beginner–Advanced',
    tagVariant: 'tag-pink',
    image: '/images/hiphop.jpg',
    description:
      'From popping and locking to freestyle flows, develop your street style and rhythm in a high-energy environment that celebrates individuality and expression.',
    emoji: '🎤',
  },
  {
    id: 'contemporary',
    title: 'Contemporary',
    tag: 'All Levels',
    tagVariant: '',
    image: '/images/contemporary.jpg',
    description:
      'Explore fluid movement, floor work, and emotional storytelling through contemporary technique. Build core strength, flexibility, and artistic depth.',
    emoji: '🌊',
  },
  {
    id: 'kids',
    title: 'Kids Dance',
    tag: 'Ages 4–12',
    tagVariant: 'tag-pink',
    image: '/images/kids.jpg',
    description:
      "Fun, age-appropriate classes that nurture your child's creativity, coordination, and confidence through movement, music, and playful routines.",
    emoji: '⭐',
  },
  {
    id: 'wedding',
    title: 'Wedding Choreography',
    tag: 'Couples & Groups',
    tagVariant: '',
    image: '/images/wedding.jpg',
    description:
      'Make your big day unforgettable with personalised wedding choreography. We craft stunning first-dance routines and Sangeet performances for couples and families.',
    emoji: '💍',
  },
  {
    id: 'fitness',
    title: 'Dance Fitness',
    tag: 'All Fitness Levels',
    tagVariant: 'tag-pink',
    image: '/images/fitness.jpg',
    description:
      'Burn calories, boost your mood, and get fit — all while dancing to upbeat music. The most fun workout you\'ll ever have, no prior dance experience needed.',
    emoji: '🔥',
  },
]

export default function Classes() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="classes" className="classes section" aria-label="Dance classes">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Our Dance Classes</h2>
          <p className="section-subtitle">
            From Bollywood beats to contemporary movement — find your style and start your journey today.
          </p>
        </div>

        <div className="classes__grid">
          {classes.map(({ id, title, tag, tagVariant, image, description, emoji }, i) => (
            <article
              key={id}
              className={`class-card fade-up fade-up-delay-${(i % 3) + 1}`}
              aria-label={`${title} dance class`}
            >
              {/* Image */}
              <div className="class-card__image-wrap">
                <img
                  src={image}
                  alt={`${title} dance class at Rhythm Vibes`}
                  className="class-card__image"
                  loading="lazy"
                />
                <div className="class-card__image-overlay" />
                <span className="class-card__emoji" aria-hidden="true">{emoji}</span>
              </div>

              {/* Body */}
              <div className="class-card__body">
                <span className={`tag ${tagVariant}`}>{tag}</span>
                <h3 className="class-card__title">{title}</h3>
                <p className="class-card__desc">{description}</p>
                <button
                  className="btn btn-primary class-card__btn"
                  onClick={scrollToContact}
                  aria-label={`Enquire about ${title} classes`}
                >
                  Enquire Now <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
