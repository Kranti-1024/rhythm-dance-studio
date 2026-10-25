import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import './FAQ.css'

const faqs = [
  {
    q: 'I have zero dance experience and feel awkward. Can I still join?',
    a: 'Absolutely! Over 70% of our new joiners walk in with zero prior dance background. Our beginner foundation batches break down basic rhythm, counts, and footwork step-by-step in a warm, judgment-free environment.',
  },
  {
    q: 'What should I wear and bring to my first class?',
    a: 'Wear comfortable stretchable clothing (t-shirt, joggers, sweatpants, or gym wear) and a pair of clean-soled sneakers. Bring your water bottle and a sweat towel. We provide secure lockers, changing rooms, and hydration stations.',
  },
  {
    q: 'How does the Free Trial Class pass work?',
    a: 'Simply click "Book Free Trial" anywhere on the site, choose your dance style, select a date and time slot, and your digital entry pass will be generated instantly. Arrive 10 minutes early so our team can show you around!',
  },
  {
    q: 'What happens if I miss a scheduled session?',
    a: 'Unlimited members can easily attend makeup sessions in any other batch during the same billing month. If you hold a 10-Class Flexi-Pack, credits never expire during your 90-day validity window.',
  },
  {
    q: 'Can I freeze or pause my membership for exams or travel?',
    a: 'Yes! Monthly Unlimited pass holders can request a pause of up to 7 consecutive days once per billing cycle. Simply ping our WhatsApp coordination desk 48 hours prior.',
  },
  {
    q: 'Do you offer private 1-on-1 coaching or wedding choreography?',
    a: 'Yes, we provide private 1-on-1 masterclasses for auditions, solo performances, and intensive technique correction. We also offer specialized Sangeet and wedding first-dance packages with custom music editing.',
  },
]

export default function FAQ({ onOpenBooking }) {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    'Hi Rhythm Vibes team! I have a question about class schedules and enrollment.'
  )}`

  return (
    <section id="faq" className="faq section" aria-label="Frequently Asked Questions">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">
            <HelpCircle size={13} /> Common Queries
          </span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Got questions before stepping into the studio? Here are answers to what first-timers ask us most.
          </p>
        </div>

        <div className="faq__list fade-up">
          {faqs.map(({ q, a }, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`faq__item glass-card ${isOpen ? 'faq__item--open' : ''}`}
              >
                <button
                  type="button"
                  className="faq__question"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="faq__question-text">{q}</span>
                  <span className="faq__icon">
                    <ChevronDown size={20} />
                  </span>
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  className="faq__answer-wrap"
                  style={{ maxHeight: isOpen ? '220px' : '0px' }}
                >
                  <p className="faq__answer">{a}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Support Help Banner */}
        <div className="faq__cta-box glass-card fade-up">
          <div>
            <h3 className="faq__cta-title">Still have questions?</h3>
            <p className="faq__cta-desc">Our team is happy to help you choose the right style and batch timing.</p>
          </div>
          <div className="faq__cta-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={17} /> WhatsApp Helpdesk
            </a>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenBooking && onOpenBooking()}
            >
              Book Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
