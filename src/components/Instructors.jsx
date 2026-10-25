import { Award, Sparkles, ArrowRight } from 'lucide-react'
import './Instructors.css'

const InstagramIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const instructors = [
  {
    id: 'aryan',
    name: 'Aryan Sharma',
    role: 'Artistic Director & Bollywood Lead',
    exp: '10+ Years Experience',
    styleId: 'bollywood',
    image: '/images/gallery_solo.jpg',
    specialties: ['Bollywood Commercial', 'Urban Fusion', 'Stage Formations'],
    bio: 'Former lead performer for Bollywood award shows with over a decade of teaching. Aryan breaks down intricate steps into infectious grooves that empower complete beginners.',
    handle: '@aryan.rhythm',
  },
  {
    id: 'maya',
    name: 'Maya Rao',
    role: 'Contemporary & Flow Lead',
    exp: '8+ Years Experience',
    styleId: 'contemporary',
    image: '/images/contemporary.jpg',
    specialties: ['Lyrical Flow', 'Floorwork', 'Body Alignment'],
    bio: 'Trained at premier contemporary dance academies, Maya combines emotional expression with somatic technique. Her classes build incredible core strength and poise.',
    handle: '@maya.danceflow',
  },
  {
    id: 'rohan',
    name: "Rohan 'B-Boy Rush' Verma",
    role: 'Hip-Hop & Street Styles Master',
    exp: '9+ Years Experience',
    styleId: 'hiphop',
    image: '/images/hiphop.jpg',
    specialties: ['Popping & Locking', 'Freestyle Cyphers', 'Street Swag'],
    bio: 'National dance battle finalist and youth mentor. Rohan teaches real street fundamentals, musicality, and stage confidence with unmatched high energy.',
    handle: '@bboy_rush',
  },
  {
    id: 'priya',
    name: 'Priya Sen',
    role: 'Fitness & Kids Academy Lead',
    exp: '6+ Years Experience',
    styleId: 'fitness',
    image: '/images/fitness.jpg',
    specialties: ['Cardio Dance', 'Kids Motor Skills', 'Endurance & Core'],
    bio: 'Certified fitness trainer and youth educator. Priya makes high-calorie dance workouts exhilarating and leads our Saturday morning Kids Creative Movement academy.',
    handle: '@priya.movefit',
  },
]

export default function Instructors({ onSelectInstructor }) {
  return (
    <section id="faculty" className="instructors section" aria-label="Our Dance Faculty & Choreographers">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">
            <Sparkles size={13} /> World-Class Mentors
          </span>
          <h2 className="section-title">Meet Your Choreographers</h2>
          <p className="section-subtitle">
            Learn directly from seasoned stage artists, championship finalists, and certified movement mentors who make every session inspiring.
          </p>
        </div>

        <div className="instructors__grid">
          {instructors.map(({ id, name, role, exp, styleId, image, specialties, bio, handle }, i) => (
            <article
              key={id}
              className={`instructor-card glass-card fade-up fade-up-delay-${(i % 4) + 1}`}
              aria-label={`Instructor profile for ${name}`}
            >
              <div className="instructor-card__img-wrap">
                <img src={image} alt={`Choreographer ${name}`} className="instructor-card__img" loading="lazy" />
                <div className="instructor-card__img-overlay" />
                <span className="instructor-card__exp-badge">
                  <Award size={13} /> {exp}
                </span>
              </div>

              <div className="instructor-card__body">
                <div className="instructor-card__header">
                  <div>
                    <h3 className="instructor-card__name">{name}</h3>
                    <span className="instructor-card__role">{role}</span>
                  </div>
                  <a
                    href={`https://instagram.com/${handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instructor-card__social"
                    aria-label={`${name}'s Instagram profile`}
                  >
                    <InstagramIcon size={16} />
                  </a>
                </div>

                <p className="instructor-card__bio">{bio}</p>

                <div className="instructor-card__specialties">
                  {specialties.map((spec) => (
                    <span key={spec} className="tag tag-spec">
                      {spec}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-outline instructor-card__cta"
                  onClick={() => onSelectInstructor && onSelectInstructor(styleId)}
                  aria-label={`Book a trial class in ${role.split('&')[0]} with ${name}`}
                >
                  <span>Book Trial with {name.split(' ')[0]}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
