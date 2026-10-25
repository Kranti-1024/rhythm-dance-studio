import { useState, useEffect } from 'react'
import { X, ZoomIn, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import './Gallery.css'

const categories = ['All', 'Studio Batches', 'Performances', 'Kids Fun', 'Fitness']

const galleryItems = [
  {
    id: 1,
    src: '/images/gallery_group.jpg',
    alt: 'Group dance practice session at Rhythm Vibes',
    caption: 'Group Choreography Rehearsal',
    category: 'Studio Batches',
    size: 'wide',
  },
  {
    id: 2,
    src: '/images/gallery_solo.jpg',
    alt: 'Solo contemporary dance performance',
    caption: 'Solo Contemporary Showcase',
    category: 'Performances',
    size: 'tall',
  },
  {
    id: 3,
    src: '/images/bollywood.jpg',
    alt: 'Bollywood dance class in full swing',
    caption: 'Bollywood Commercial Batch',
    category: 'Studio Batches',
    size: 'normal',
  },
  {
    id: 4,
    src: '/images/hiphop.jpg',
    alt: 'Hip-Hop freestyle session',
    caption: 'Hip-Hop Battle & Cypher',
    category: 'Performances',
    size: 'normal',
  },
  {
    id: 5,
    src: '/images/contemporary.jpg',
    alt: 'Contemporary dance expression',
    caption: 'Lyrical Flow & Floorwork',
    category: 'Studio Batches',
    size: 'tall',
  },
  {
    id: 6,
    src: '/images/kids.jpg',
    alt: 'Kids dance class having fun',
    caption: 'Kids Academy Saturday Batch',
    category: 'Kids Fun',
    size: 'wide',
  },
  {
    id: 7,
    src: '/images/wedding.jpg',
    alt: 'Wedding choreography rehearsal',
    caption: 'Wedding Sangeet First Dance',
    category: 'Performances',
    size: 'normal',
  },
  {
    id: 8,
    src: '/images/fitness.jpg',
    alt: 'Dance fitness class energetic workout',
    caption: 'High-Energy Dance Cardio',
    category: 'Fitness',
    size: 'normal',
  },
  {
    id: 9,
    src: '/images/about.jpg',
    alt: 'Studio full-group class',
    caption: 'End-of-Term Studio Showcase',
    category: 'Performances',
    size: 'wide',
  },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = (item) => setLightbox(item)
  const closeLightbox = () => setLightbox(null)

  const navigate = (dir) => {
    const list = filteredItems
    const idx = list.findIndex((i) => i.id === lightbox.id)
    const next = (idx + dir + list.length) % list.length
    setLightbox(list[next])
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightbox, filteredItems])

  return (
    <section id="gallery" className="gallery section" aria-label="Photo gallery">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">
            <Sparkles size={13} /> Studio Life & Stages
          </span>
          <h2 className="section-title">Moments in Motion</h2>
          <p className="section-subtitle">
            A glimpse into our vibrant rehearsals, annual stage showcases, student cyphers, and celebratory milestones.
          </p>

          {/* Filter Bar */}
          <div className="gallery__filters">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={`gallery__filter-btn ${activeCategory === cat ? 'gallery__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="gallery__grid" role="list" aria-label="Gallery images">
          {filteredItems.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`gallery__item gallery__item--${item.size}`}
              onClick={() => openLightbox(item)}
              aria-label={`View photo: ${item.caption}`}
              role="listitem"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="gallery__img"
                loading="lazy"
              />
              <div className="gallery__overlay">
                <div className="gallery__overlay-content">
                  <div className="gallery__zoom-badge">
                    <ZoomIn size={18} />
                  </div>
                  <span className="gallery__caption-text">{item.caption}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-label={`Lightbox: ${lightbox.caption}`}
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox__close" onClick={closeLightbox} aria-label="Close lightbox">
              <X size={22} />
            </button>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => navigate(-1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={26} />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="lightbox__img"
            />
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={() => navigate(1)}
              aria-label="Next image"
            >
              <ChevronRight size={26} />
            </button>
            <p className="lightbox__caption">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </section>
  )
}
