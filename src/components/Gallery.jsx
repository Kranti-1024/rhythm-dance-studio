import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import './Gallery.css'

// Using the generated local images plus Unsplash for variety
const galleryItems = [
  {
    id: 1,
    src: '/images/gallery_group.jpg',
    alt: 'Group dance practice session at Rhythm Vibes',
    caption: 'Group Practice',
    size: 'wide',
  },
  {
    id: 2,
    src: '/images/gallery_solo.jpg',
    alt: 'Solo contemporary dance performance',
    caption: 'Solo Performance',
    size: 'tall',
  },
  {
    id: 3,
    src: '/images/bollywood.jpg',
    alt: 'Bollywood dance class in full swing',
    caption: 'Bollywood Class',
    size: 'normal',
  },
  {
    id: 4,
    src: '/images/hiphop.jpg',
    alt: 'Hip-Hop freestyle session',
    caption: 'Hip-Hop Freestyle',
    size: 'normal',
  },
  {
    id: 5,
    src: '/images/contemporary.jpg',
    alt: 'Contemporary dance expression',
    caption: 'Contemporary Flow',
    size: 'tall',
  },
  {
    id: 6,
    src: '/images/kids.jpg',
    alt: 'Kids dance class having fun',
    caption: 'Kids Class Fun',
    size: 'wide',
  },
  {
    id: 7,
    src: '/images/wedding.jpg',
    alt: 'Wedding choreography rehearsal',
    caption: 'Wedding Choreography',
    size: 'normal',
  },
  {
    id: 8,
    src: '/images/fitness.jpg',
    alt: 'Dance fitness class energetic workout',
    caption: 'Dance Fitness',
    size: 'normal',
  },
  {
    id: 9,
    src: '/images/about.jpg',
    alt: 'Studio full-group class',
    caption: 'Studio Session',
    size: 'wide',
  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (item) => setLightbox(item)
  const closeLightbox = () => setLightbox(null)

  const navigate = (dir) => {
    const idx = galleryItems.findIndex(i => i.id === lightbox.id)
    const next = (idx + dir + galleryItems.length) % galleryItems.length
    setLightbox(galleryItems[next])
  }

  return (
    <section id="gallery" className="gallery section" aria-label="Photo gallery">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">Our Moments</span>
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-subtitle">
            A glimpse into our vibrant studio life — rehearsals, performances, and celebrations.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="gallery__grid" role="list" aria-label="Gallery images">
          {galleryItems.map((item, i) => (
            <button
              key={item.id}
              className={`gallery__item gallery__item--${item.size} fade-up fade-up-delay-${(i % 4) + 1}`}
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
                  <ZoomIn size={24} />
                  <span>{item.caption}</span>
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
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => navigate(-1)}
              aria-label="Previous image"
            >‹</button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="lightbox__img"
            />
            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={() => navigate(1)}
              aria-label="Next image"
            >›</button>
            <p className="lightbox__caption">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </section>
  )
}
