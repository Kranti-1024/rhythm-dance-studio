import { MessageCircle, Sparkles } from 'lucide-react'
import './FloatingBar.css'

export default function FloatingBar({ onOpenBooking, isModalOpen }) {
  if (isModalOpen) return null

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hi Rhythm Vibes! I'd like to ask about dance classes and trial sessions."
  )}`

  return (
    <aside className="mobile-floating-bar" aria-label="Quick contact and booking bar">
      <div className="mobile-floating-bar__inner">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-btn--whatsapp"
          aria-label="Chat with studio on WhatsApp"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          className="floating-btn floating-btn--trial"
          onClick={() => onOpenBooking()}
          aria-label="Book a free dance trial class"
        >
          <Sparkles size={17} />
          <span>Book Free Trial</span>
        </button>
      </div>
    </aside>
  )
}
