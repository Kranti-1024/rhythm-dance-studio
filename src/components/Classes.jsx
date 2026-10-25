import { useState } from 'react'
import { ArrowRight, Sparkles, Clock, Flame } from 'lucide-react'
import './Classes.css'

const categories = ['All', 'High Energy', 'Flow & Expression', 'Kids & Family', 'Fitness']

const classes = [
  {
    id: 'bollywood',
    title: 'Bollywood Dance',
    tag: 'All Levels',
    tagVariant: '',
    category: 'High Energy',
    intensity: 'High Energy 🔥🔥',
    duration: '60 min',
    image: '/images/bollywood.jpg',
    description:
      'Immerse in festive rhythms, high-energy hooks, and expressive performance techniques. Perfect for building stage presence, stamina, and pure joy.',
    emoji: '💃',
  },
  {
    id: 'hiphop',
    title: 'Hip-Hop & Street Styles',
    tag: 'Beginner–Advanced',
    tagVariant: 'tag-pink',
    category: 'High Energy',
    intensity: 'Intense 🔥🔥🔥',
    duration: '75 min',
    image: '/images/hiphop.jpg',
    description:
      'Master popping, locking, breaking basics, and urban choreography. Develop your personal style, swag, and musicality with our national battle finalists.',
    emoji: '🎤',
  },
  {
    id: 'contemporary',
    title: 'Contemporary Flow',
    tag: 'All Levels',
    tagVariant: '',
    category: 'Flow & Expression',
    intensity: 'Moderate 🔥',
    duration: '60 min',
    image: '/images/contemporary.jpg',
    description:
      'Explore fluid floorwork, balance, and lyrical storytelling. Build core stability, flexibility, and expressive emotional depth through contemporary technique.',
    emoji: '🌊',
  },
  {
    id: 'kids',
    title: 'Kids Dance Academy',
    tag: 'Ages 4–12',
    tagVariant: 'tag-pink',
    category: 'Kids & Family',
    intensity: 'Fun & Playful ⭐',
    duration: '60 min',
    image: '/images/kids.jpg',
    description:
      "Nurture your child's rhythm, coordination, and social confidence through age-appropriate routines, creative movement games, and end-of-term stage showcases.",
    emoji: '⭐',
  },
  {
    id: 'wedding',
    title: 'Wedding & Sangeet Choreography',
    tag: 'Couples & Groups',
    tagVariant: '',
    category: 'Kids & Family',
    intensity: 'Customized 💍',
    duration: 'Custom',
    image: '/images/wedding.jpg',
    description:
      'Make your big celebration unforgettable with personalized bride/groom first dances, sangeet medleys, and family performances. Complete with music editing.',
    emoji: '💍',
  },
  {
    id: 'fitness',
    title: 'Dance Fitness (Zumba / Cardio)',
    tag: 'All Fitness Levels',
    tagVariant: 'tag-pink',
    category: 'Fitness',
    intensity: 'Calorie Burner 🔥🔥🔥',
    duration: '50 min',
    image: '/images/fitness.jpg',
    description:
      'Torch calories, boost endorphins, and tone your body while moving to pulse-pounding global beats. No prior dance background needed — just show up and sweat!',
    emoji: '🔥',
  },
]

export default function Classes({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredClasses =
    activeCategory === 'All'
      ? classes
      : classes.filter((c) => c.category === activeCategory)

  const scrollToSchedule = () => {
    const el = document.querySelector('#schedule')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="classes" className="classes section" aria-label="Dance classes">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">
            <Sparkles size={13} /> Disciplines & Batches
          </span>
          <h2 className="section-title">Our Dance Classes</h2>
          <p className="section-subtitle">
            From high-octane Bollywood and street cyphers to fluid contemporary movement — find your rhythm and begin with a free trial.
          </p>

          {/* Filter Pills */}
          <div className="classes__filter-bar">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={`classes__filter-btn ${activeCategory === cat ? 'classes__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="classes__grid">
          {filteredClasses.map(({ id, title, tag, tagVariant, intensity, duration, image, description, emoji }, i) => (
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
                <span className="class-card__emoji" aria-hidden="true">
                  {emoji}
                </span>
                <span className="class-card__duration-badge">
                  <Clock size={12} /> {duration}
                </span>
              </div>

              {/* Body */}
              <div className="class-card__body">
                <div className="class-card__tags">
                  <span className={`tag ${tagVariant}`}>{tag}</span>
                  <span className="class-card__intensity">{intensity}</span>
                </div>

                <h3 className="class-card__title">{title}</h3>
                <p className="class-card__desc">{description}</p>

                <div className="class-card__actions">
                  <button
                    type="button"
                    className="btn btn-primary class-card__btn"
                    onClick={() => onOpenBooking && onOpenBooking(title)}
                    aria-label={`Book free trial for ${title}`}
                  >
                    <Sparkles size={14} /> Book Free Trial
                  </button>
                  <button
                    type="button"
                    className="class-card__schedule-link"
                    onClick={scrollToSchedule}
                  >
                    View Timings <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
