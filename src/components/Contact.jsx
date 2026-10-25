import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react'
import './Contact.css'

const classOptions = [
  'Select a class',
  'Bollywood Dance',
  'Hip-Hop',
  'Contemporary',
  'Kids Dance',
  'Wedding Choreography',
  'Dance Fitness',
  'Other / Not sure yet',
]

const contactInfo = [
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: '+91 98765 XXXXX',
    note: '(Replace with your number)',
    color: 'purple',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'hello@rhythmvibes.demo',
    note: '(Replace with your email)',
    color: 'pink',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Address',
    value: '123 Demo Street, Your City',
    note: '(Replace with your address)',
    color: 'purple',
  },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', phone: '', classType: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'success' | 'info'

  const validate = () => {
    const errs = {}
    if (!form.name.trim())                          errs.name = 'Please enter your name.'
    if (!form.phone.trim())                         errs.phone = 'Please enter your phone number.'
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone.trim())) errs.phone = 'Please enter a valid phone number.'
    if (!form.classType || form.classType === 'Select a class') errs.classType = 'Please choose a class.'
    if (!form.message.trim())                       errs.message = 'Please enter a message.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    // No backend connected — show informational message
    setStatus('info')
    setForm({ name: '', phone: '', classType: '', message: '' })
    setErrors({})
  }

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in joining ${form.classType && form.classType !== 'Select a class' ? form.classType : 'a dance class'} at Rhythm Vibes Dance Studio. My name is ${form.name || '[Your Name]'}. Please let me know more details. Thank you!`
  )
  // Replace 919876500000 with actual WhatsApp number
  const whatsappUrl = `https://wa.me/919876500000?text=${whatsappMsg}`

  return (
    <section id="contact" className="contact section" aria-label="Contact and enquiry">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Enquire & Join Us</h2>
          <p className="section-subtitle">
            Ready to start your dance journey? Drop us a message and we'll get back to you soon!
          </p>
        </div>

        <div className="contact__grid">
          {/* Form */}
          <div className="contact__form-col fade-up">
            <div className="contact__form-card glass-card">
              <h3 className="contact__form-title">Send an Enquiry</h3>

              {status === 'info' && (
                <div className="contact__alert contact__alert--info" role="alert">
                  <AlertCircle size={18} />
                  <div>
                    <strong>Demo Mode — No backend connected.</strong>
                    <p>In a live site, your message would be sent. Please use WhatsApp or email to reach out directly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate aria-label="Enquiry form">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Full Name <span aria-hidden="true">*</span></label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-required="true"
                    aria-describedby={errors.name ? 'error-name' : undefined}
                  />
                  {errors.name && <span id="error-name" className="form-error" role="alert"><AlertCircle size={13} />{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label">Phone Number <span aria-hidden="true">*</span></label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                    placeholder="+91 98765 XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    aria-required="true"
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                  />
                  {errors.phone && <span id="error-phone" className="form-error" role="alert"><AlertCircle size={13} />{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-class" className="form-label">Preferred Class <span aria-hidden="true">*</span></label>
                  <select
                    id="contact-class"
                    name="classType"
                    className={`form-input form-select ${errors.classType ? 'form-input--error' : ''}`}
                    value={form.classType}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.classType ? 'error-class' : undefined}
                  >
                    {classOptions.map(opt => (
                      <option key={opt} value={opt} disabled={opt === 'Select a class'}>{opt}</option>
                    ))}
                  </select>
                  {errors.classType && <span id="error-class" className="form-error" role="alert"><AlertCircle size={13} />{errors.classType}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message <span aria-hidden="true">*</span></label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                    placeholder="Tell us a bit about yourself or ask a question..."
                    value={form.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.message ? 'error-message' : undefined}
                  />
                  {errors.message && <span id="error-message" className="form-error" role="alert"><AlertCircle size={13} />{errors.message}</span>}
                </div>

                <div className="contact__form-actions">
                  <button type="submit" className="btn btn-primary btn-lg contact__submit">
                    <Send size={18} /> Send Enquiry
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                    aria-label="Send enquiry via WhatsApp"
                  >
                    <MessageCircle size={18} /> WhatsApp Us
                  </a>
                </div>

                <p className="contact__demo-note">
                  📌 <em>Demo site — all contact details are placeholders. No messages are actually sent.</em>
                </p>
              </form>
            </div>
          </div>

          {/* Info sidebar */}
          <div className="contact__info-col">
            {/* Contact cards */}
            {contactInfo.map(({ icon, label, value, note, color }, i) => (
              <div
                key={label}
                className={`contact__info-card glass-card fade-up fade-up-delay-${i + 1}`}
              >
                <div className={`contact__info-icon contact__info-icon--${color}`}>{icon}</div>
                <div className="contact__info-body">
                  <span className="contact__info-label">{label}</span>
                  <span className="contact__info-value">{value}</span>
                  <span className="contact__info-note">{note}</span>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="contact__map fade-up fade-up-delay-4" aria-label="Studio location map placeholder">
              <div className="contact__map-inner">
                <MapPin size={32} />
                <p>Map Placeholder</p>
                <small>Replace with Google Maps embed for the studio location</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
