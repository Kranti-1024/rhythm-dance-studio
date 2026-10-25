import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle, Clock, Navigation, Sparkles } from 'lucide-react'
import './Contact.css'

const classOptions = [
  'Select a class',
  'Bollywood Dance (All Levels)',
  'Hip-Hop & Street Styles',
  'Contemporary Flow',
  'Kids Dance Academy',
  'Wedding & Sangeet Choreography',
  'Dance Fitness (Zumba / Cardio)',
  'Private 1-on-1 Coaching',
  'Not sure yet / General Enquiry',
]

const contactInfo = [
  {
    icon: <Phone size={20} />,
    label: 'Call Direct',
    value: '+91 98765 43210',
    link: 'tel:+919876543210',
    note: 'Tap to call • Mon–Sat 8 AM – 8 PM',
    color: 'crimson',
  },
  {
    icon: <MessageCircle size={20} />,
    label: 'WhatsApp Desk',
    value: '+91 98765 43210',
    link: `https://wa.me/919876543210?text=${encodeURIComponent('Hi Rhythm Vibes Studio! I would like to enquire about dance classes.')}`,
    note: 'Instant chat & batch booking',
    color: 'rose',
  },
  {
    icon: <Mail size={20} />,
    label: 'Official Email',
    value: 'hello@rhythmvibes.dance',
    link: 'mailto:hello@rhythmvibes.dance?subject=Dance%20Class%20Enquiry',
    note: 'Responds within 24 hours',
    color: 'crimson',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Studio Address',
    value: '123 Rhythm Boulevard, Creative Arts District',
    link: 'https://maps.google.com/?q=Rhythm+Vibes+Dance+Studio',
    note: '5 mins from Central Metro Station',
    color: 'rose',
  },
]

export default function Contact({ onOpenBooking }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', classType: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your full name.'
    if (!form.phone.trim()) {
      errs.phone = 'Please enter your phone/WhatsApp number.'
    } else if (!/^\+?[\d\s\-()]{8,15}$/.test(form.phone.trim())) {
      errs.phone = 'Please enter a valid phone number.'
    }
    if (!form.classType || form.classType === 'Select a class') {
      errs.classType = 'Please choose a dance style.'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setForm({ name: '', phone: '', email: '', classType: '', message: '' })
    setErrors({})
  }

  const whatsappMsg = encodeURIComponent(
    `Hi Rhythm Vibes! My name is ${form.name || '[My Name]'}. I'm interested in ${form.classType || 'dance classes'}. My phone: ${form.phone}. Message: ${form.message || 'Please send me batch details.'}`
  )
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMsg}`

  return (
    <section id="contact" className="contact section" aria-label="Contact and studio location">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">
            <Sparkles size={13} /> Reach Out & Visit Us
          </span>
          <h2 className="section-title">Start Your Dance Journey</h2>
          <p className="section-subtitle">
            Have questions about batches, pricing, or your first class? Drop a message or walk in for a studio tour!
          </p>
        </div>

        <div className="contact__grid">
          {/* Form Column */}
          <div className="contact__form-col fade-up">
            <div className="contact__form-card glass-card">
              <h3 className="contact__form-title">Send a Direct Enquiry</h3>

              {submitted ? (
                <div className="contact__success-state">
                  <div className="contact__success-icon">
                    <CheckCircle2 size={44} />
                  </div>
                  <h4>Thank You, {form.name}!</h4>
                  <p>
                    We’ve received your enquiry for <strong>{form.classType}</strong>. Our studio coordinator will call or WhatsApp you at <strong>{form.phone}</strong> shortly.
                  </p>
                  <div className="contact__success-actions">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-lg"
                    >
                      <MessageCircle size={18} /> Chat Right Now on WhatsApp
                    </a>
                    <button type="button" className="btn btn-outline" onClick={handleReset}>
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Enquiry form">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Full Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      aria-required="true"
                    />
                    {errors.name && (
                      <span className="form-error" role="alert">
                        <AlertCircle size={13} />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="contact-phone" className="form-label">
                        Phone / WhatsApp <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        aria-required="true"
                      />
                      {errors.phone && (
                        <span className="form-error" role="alert">
                          <AlertCircle size={13} />
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="rahul@example.com"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-class" className="form-label">
                      Preferred Dance Style <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-class"
                      name="classType"
                      className={`form-input form-select ${errors.classType ? 'form-input--error' : ''}`}
                      value={form.classType}
                      onChange={handleChange}
                      aria-required="true"
                    >
                      {classOptions.map((opt) => (
                        <option key={opt} value={opt} disabled={opt === 'Select a class'}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.classType && (
                      <span className="form-error" role="alert">
                        <AlertCircle size={13} />
                        {errors.classType}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Your Message or Questions (Optional)
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      className="form-input form-textarea"
                      placeholder="Tell us about your background, preferred slot, or questions..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact__form-actions">
                    <button type="submit" className="btn btn-primary btn-lg contact__submit">
                      <Send size={18} /> Submit Enquiry
                    </button>
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        'Hi Rhythm Vibes! I would like to enquire about dance classes.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-lg"
                      aria-label="Direct message on WhatsApp"
                    >
                      <MessageCircle size={18} /> Instant WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Info & Map Column */}
          <div className="contact__info-col">
            {/* Clickable Contact Cards */}
            {contactInfo.map(({ icon, label, value, link, note, color }, i) => (
              <a
                key={label}
                href={link}
                target={link.startsWith('http') ? '_blank' : undefined}
                rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`contact__info-card glass-card fade-up fade-up-delay-${i + 1}`}
                aria-label={`${label}: ${value}`}
              >
                <div className={`contact__info-icon contact__info-icon--${color}`}>{icon}</div>
                <div className="contact__info-body">
                  <span className="contact__info-label">{label}</span>
                  <span className="contact__info-value">{value}</span>
                  <span className="contact__info-note">{note}</span>
                </div>
              </a>
            ))}

            {/* Interactive Studio Location Card */}
            <div className="contact__location-card glass-card fade-up fade-up-delay-4">
              <div className="contact__location-header">
                <span className="contact__location-title">
                  <MapPin size={18} /> Rhythm Vibes Studio Hub
                </span>
                <span className="tag tag-pink">Open 6 Days</span>
              </div>

              <p className="contact__location-desc">
                State-of-the-art air-conditioned dance studios equipped with sprung wooden floors, full-wall mirrors, soundproof acoustic treatment, and professional ambient lighting.
              </p>

              <div className="contact__location-hours">
                <div className="hours-row">
                  <Clock size={14} />
                  <span>
                    <strong>Mon – Sat:</strong> 07:00 AM – 09:00 PM
                  </span>
                </div>
                <div className="hours-row">
                  <Clock size={14} />
                  <span>
                    <strong>Sunday:</strong> 09:00 AM – 02:00 PM (Workshops only)
                  </span>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Rhythm+Vibes+Dance+Studio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline contact__map-btn"
              >
                <Navigation size={16} /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
