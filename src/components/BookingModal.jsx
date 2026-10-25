import { useState, useEffect } from 'react'
import { X, Calendar, Clock, CheckCircle2, Sparkles, ArrowRight, ArrowLeft, MessageCircle, User, Phone, Mail, Award } from 'lucide-react'
import './BookingModal.css'

const danceStyles = [
  { id: 'bollywood', name: 'Bollywood Dance', level: 'All Levels', duration: '60 min', popular: true, emoji: '💃' },
  { id: 'hiphop', name: 'Hip-Hop & Urban', level: 'Beginner to Advanced', duration: '75 min', popular: true, emoji: '🎤' },
  { id: 'contemporary', name: 'Contemporary Flow', level: 'All Levels', duration: '60 min', popular: false, emoji: '🌊' },
  { id: 'kids', name: 'Kids Dance Academy', level: 'Ages 4–12', duration: '60 min', popular: false, emoji: '⭐' },
  { id: 'wedding', name: 'Wedding Choreography', level: 'Couples & Groups', duration: 'Custom', popular: false, emoji: '💍' },
  { id: 'fitness', name: 'Dance Fitness (Zumba / Cardio)', level: 'All Fitness Levels', duration: '50 min', popular: true, emoji: '🔥' },
]

const timeSlots = [
  '07:00 AM – 08:00 AM (Morning Pulse)',
  '10:00 AM – 11:30 AM (Morning Batch)',
  '04:00 PM – 05:30 PM (Evening Batch 1)',
  '05:30 PM – 07:00 PM (Prime Evening)',
  '07:00 PM – 08:30 PM (After-Work Groove)',
]

export default function BookingModal({ isOpen, onClose, initialClass = '', initialDay = '', initialPlan = '' }) {
  const [step, setStep] = useState(1)
  const [selectedStyle, setSelectedStyle] = useState(initialClass || 'bollywood')
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0])
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  })
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: 'Beginner',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [bookingId, setBookingId] = useState('')

  // Sync initial class when prop changes
  useEffect(() => {
    if (initialClass) {
      const match = danceStyles.find(
        (s) => s.name.toLowerCase().includes(initialClass.toLowerCase()) || s.id === initialClass.toLowerCase()
      )
      if (match) setSelectedStyle(match.id)
    }
  }, [initialClass])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setStep(1)
      setErrors({})
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const activeStyleObj = danceStyles.find((s) => s.id === selectedStyle) || danceStyles[0]

  const validateStep3 = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Please enter your full name.'
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your WhatsApp/Phone number.'
    } else if (!/^\+?[\d\s\-()]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number.'
    }
    return errs
  }

  const handleNext = () => {
    if (step === 3) {
      const errs = validateStep3()
      if (Object.keys(errs).length > 0) {
        setErrors(errs)
        return
      }
      // Generate booking ID
      const randomCode = 'RV-' + Math.floor(1000 + Math.random() * 9000)
      setBookingId(randomCode)
      setStep(4)
    } else {
      setStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Rhythm Vibes! I booked a Free Trial Pass [ID: ${bookingId}].\n` +
      `• Style: ${activeStyleObj.name}\n` +
      `• Date: ${selectedDate}\n` +
      `• Slot: ${selectedSlot}\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `Looking forward to confirming my spot!`
  )

  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`

  return (
    <div className="booking-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="booking-modal__header">
          <div className="booking-modal__header-info">
            <span className="booking-modal__badge">
              <Sparkles size={13} /> {initialPlan ? `${initialPlan} Enrollment` : 'Free Trial Pass'}
            </span>
            <h2 id="modal-title" className="booking-modal__title">
              {step === 4 ? 'You’re Booked!' : 'Book Your Free Dance Class'}
            </h2>
          </div>
          <button className="booking-modal__close" onClick={onClose} aria-label="Close booking modal">
            <X size={20} />
          </button>
        </div>

        {/* Stepper Indicator */}
        {step < 4 && (
          <div className="booking-modal__steps" aria-label="Booking steps">
            {[
              { num: 1, label: 'Dance Style' },
              { num: 2, label: 'Date & Slot' },
              { num: 3, label: 'Your Details' },
            ].map(({ num, label }) => (
              <div
                key={num}
                className={`booking-modal__step ${step === num ? 'active' : ''} ${step > num ? 'done' : ''}`}
              >
                <div className="booking-modal__step-circle">{step > num ? '✓' : num}</div>
                <span className="booking-modal__step-label">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Select Style */}
        {step === 1 && (
          <div className="booking-modal__body">
            <p className="booking-modal__prompt">Choose your preferred dance style to experience in the studio:</p>
            <div className="booking-modal__styles-grid">
              {danceStyles.map((style) => (
                <button
                  type="button"
                  key={style.id}
                  className={`style-card ${selectedStyle === style.id ? 'style-card--selected' : ''}`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="style-card__top">
                    <span className="style-card__emoji">{style.emoji}</span>
                    {style.popular && <span className="style-card__popular">Popular</span>}
                  </div>
                  <h3 className="style-card__title">{style.name}</h3>
                  <div className="style-card__meta">
                    <span>{style.level}</span> • <span>{style.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Slot */}
        {step === 2 && (
          <div className="booking-modal__body">
            <p className="booking-modal__prompt">
              Selected Style: <strong>{activeStyleObj.name}</strong> ({activeStyleObj.level})
            </p>

            <div className="form-group">
              <label className="form-label" htmlFor="booking-date">
                <Calendar size={16} /> Choose Date
              </label>
              <input
                id="booking-date"
                type="date"
                className="form-input booking-date-input"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Clock size={16} /> Available Batch Times
              </label>
              <div className="slots-grid">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={`slot-pill ${selectedSlot === slot ? 'slot-pill--selected' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Your Info */}
        {step === 3 && (
          <div className="booking-modal__body">
            <div className="booking-summary-banner">
              <div>
                <strong>{activeStyleObj.name}</strong>
                <span>{selectedDate} • {selectedSlot.split(' ')[0]} {selectedSlot.split(' ')[1]}</span>
              </div>
              <span className="booking-trial-free">100% Free Trial</span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="bm-name">
                <User size={15} /> Full Name <span className="req">*</span>
              </label>
              <input
                id="bm-name"
                type="text"
                className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                placeholder="e.g. Ananya Patel"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: '' })
                }}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="bm-phone">
                  <Phone size={15} /> WhatsApp / Phone <span className="req">*</span>
                </label>
                <input
                  id="bm-phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value })
                    if (errors.phone) setErrors({ ...errors, phone: '' })
                  }}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bm-email">
                  <Mail size={15} /> Email Address (Optional)
                </label>
                <input
                  id="bm-email"
                  type="email"
                  className="form-input"
                  placeholder="ananya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Award size={15} /> Prior Dance Experience
              </label>
              <div className="experience-options">
                {['First-Timer / Beginner', 'Some Dancing Experience', 'Intermediate / Advanced'].map((exp) => (
                  <button
                    type="button"
                    key={exp}
                    className={`exp-pill ${formData.experience === exp ? 'exp-pill--selected' : ''}`}
                    onClick={() => setFormData({ ...formData, experience: exp })}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation Ticket */}
        {step === 4 && (
          <div className="booking-modal__body booking-modal__confirmation">
            <div className="conf-icon-wrap">
              <CheckCircle2 size={46} className="conf-icon" />
            </div>

            <h3 className="conf-title">Your Free Trial Pass is Confirmed!</h3>
            <p className="conf-subtitle">
              We've reserved your spot in the studio. Show this pass on your phone when you arrive.
            </p>

            {/* Digital Pass Ticket */}
            <div className="digital-ticket">
              <div className="digital-ticket__header">
                <span className="digital-ticket__logo">⚡ Rhythm Vibes Dance Studio</span>
                <span className="digital-ticket__code">{bookingId}</span>
              </div>
              <div className="digital-ticket__body">
                <div className="ticket-item">
                  <span className="ticket-label">Dancer</span>
                  <span className="ticket-val">{formData.name}</span>
                </div>
                <div className="ticket-item">
                  <span className="ticket-label">Dance Style</span>
                  <span className="ticket-val">{activeStyleObj.name}</span>
                </div>
                <div className="ticket-item">
                  <span className="ticket-label">Date & Time</span>
                  <span className="ticket-val">{selectedDate} • {selectedSlot.split(' ')[0]} {selectedSlot.split(' ')[1]}</span>
                </div>
                <div className="ticket-item">
                  <span className="ticket-label">Studio Venue</span>
                  <span className="ticket-val">123 Rhythm Blvd, Studio 2</span>
                </div>
              </div>
              <div className="digital-ticket__footer">
                <span>Pass Valid for 1 Session</span> • <span>Dress code: Comfortable clothes & clean sneakers</span>
              </div>
            </div>

            <div className="conf-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg conf-btn"
              >
                <MessageCircle size={18} /> Confirm via WhatsApp
              </a>
              <button
                type="button"
                className="btn btn-outline btn-lg conf-btn"
                onClick={onClose}
              >
                Done / Back to Website
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {step < 4 && (
          <div className="booking-modal__footer">
            {step > 1 ? (
              <button type="button" className="btn btn-outline" onClick={handlePrev}>
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
            )}

            <button type="button" className="btn btn-primary" onClick={handleNext}>
              {step === 3 ? 'Generate My Pass' : 'Continue'} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
