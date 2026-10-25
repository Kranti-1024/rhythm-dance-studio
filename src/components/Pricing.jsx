import { useState } from 'react'
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react'
import './Pricing.css'

const plans = [
  {
    id: 'starter',
    name: 'Starter Drop-In',
    tagline: 'Best for first-timers & weekend dancers',
    monthlyPrice: 599,
    quarterlyPrice: 599,
    billingType: 'per class',
    popular: false,
    badge: null,
    features: [
      'Access to any 1 regular group class',
      'Valid for 14 days from purchase',
      'Locker & changing room access',
      'Free hydration station & mat usage',
      'Instant WhatsApp slot confirmation',
    ],
    cta: 'Book Single Class',
  },
  {
    id: 'unlimited',
    name: 'Monthly Unlimited',
    tagline: 'Best for rapid progress & fitness routines',
    monthlyPrice: 3499,
    quarterlyPrice: 2999, // discounted per month
    billingType: 'per month',
    popular: true,
    badge: 'Most Popular',
    features: [
      'Unlimited classes across all 6 styles',
      'Daily morning & evening slots',
      'Weekend open studio practice access',
      'Annual stage showcase qualification',
      '20% off masterclasses & guest workshops',
      'Pause membership for up to 7 days',
    ],
    cta: 'Get Unlimited Pass',
  },
  {
    id: 'flexi',
    name: '10-Class Flexi-Pack',
    tagline: 'Best for busy working professionals',
    monthlyPrice: 4499,
    quarterlyPrice: 4499,
    billingType: '10 sessions',
    popular: false,
    badge: 'Flexible',
    features: [
      '10 credits valid for 90 days',
      'Mix and match any dance styles',
      'Book slots anytime via WhatsApp',
      'Shareable with 1 family member',
      'No monthly commitment or renewal lock',
    ],
    cta: 'Grab Flexi-Pack',
  },
  {
    id: 'kids',
    name: 'Kids Academy Batch',
    tagline: 'Fun, coordination & confidence for ages 4–12',
    monthlyPrice: 2799,
    quarterlyPrice: 2499,
    billingType: 'per month',
    popular: false,
    badge: 'Kids Special',
    features: [
      '8 weekend batch sessions per month',
      'Age-appropriate choreography & music',
      'Confidence & stage presence drills',
      'Term-end showcase & certificate',
      'Parent viewing lounge & recaps',
    ],
    cta: 'Enroll Child',
  },
]

export default function Pricing({ onSelectPlan }) {
  const [isQuarterly, setIsQuarterly] = useState(false)

  return (
    <section id="pricing" className="pricing section" aria-label="Membership and Class Pricing">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">
            <Sparkles size={13} /> Transparent Pricing
          </span>
          <h2 className="section-title">Membership & Class Passes</h2>
          <p className="section-subtitle">
            No surprise registration fees. Simple, flexible plans designed for every routine — from occasional drop-ins to dedicated everyday dancers.
          </p>

          {/* Billing Switcher */}
          <div className="pricing__toggle-wrap">
            <span className={`pricing__toggle-label ${!isQuarterly ? 'active' : ''}`}>Monthly</span>
            <button
              type="button"
              className={`pricing__switch ${isQuarterly ? 'pricing__switch--on' : ''}`}
              onClick={() => setIsQuarterly(!isQuarterly)}
              aria-label="Toggle between monthly and quarterly billing"
            >
              <span className="pricing__switch-handle" />
            </button>
            <span className={`pricing__toggle-label ${isQuarterly ? 'active' : ''}`}>
              Quarterly <span className="pricing__save-pill">Save 15%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing__grid">
          {plans.map((plan, i) => {
            const price = isQuarterly ? plan.quarterlyPrice : plan.monthlyPrice
            return (
              <div
                key={plan.id}
                className={`pricing-card glass-card fade-up fade-up-delay-${i + 1} ${
                  plan.popular ? 'pricing-card--popular' : ''
                }`}
              >
                {plan.popular && (
                  <div className="pricing-card__popular-badge">
                    <Zap size={13} /> {plan.badge}
                  </div>
                )}
                {!plan.popular && plan.badge && (
                  <div className="pricing-card__sub-badge">{plan.badge}</div>
                )}

                <div className="pricing-card__header">
                  <h3 className="pricing-card__name">{plan.name}</h3>
                  <p className="pricing-card__tagline">{plan.tagline}</p>
                </div>

                <div className="pricing-card__price-box">
                  <span className="pricing-card__currency">₹</span>
                  <span className="pricing-card__amount">{price.toLocaleString('en-IN')}</span>
                  <span className="pricing-card__unit">/ {plan.billingType}</span>
                </div>

                {isQuarterly && plan.monthlyPrice !== plan.quarterlyPrice && (
                  <span className="pricing-card__billed-note">Billed quarterly (₹{(price * 3).toLocaleString('en-IN')})</span>
                )}

                <ul className="pricing-card__features" aria-label={`Features of ${plan.name}`}>
                  {plan.features.map((feat) => (
                    <li key={feat} className="pricing-card__feature">
                      <span className="pricing-card__check">
                        <Check size={14} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} pricing-card__btn`}
                  onClick={() => onSelectPlan && onSelectPlan(plan.name)}
                  aria-label={`Enroll in ${plan.name}`}
                >
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>

        {/* Wedding / Custom Banner */}
        <div className="pricing__custom-banner glass-card fade-up">
          <div className="pricing__custom-content">
            <span className="tag tag-pink">💍 Wedding Special</span>
            <h3 className="pricing__custom-title">Planning a Wedding or Sangeet Performance?</h3>
            <p className="pricing__custom-desc">
              We create personalized first dances, groom/bride entries, and unforgettable family Sangeet medleys. Includes custom song mixing and private rehearsals.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => onSelectPlan && onSelectPlan('Wedding Choreography')}
          >
            Custom Wedding Quote
          </button>
        </div>

        {/* Trust Guarantees */}
        <div className="pricing__guarantees fade-up">
          <div className="pricing__guarantee">
            <ShieldCheck size={18} className="guarantee-icon" />
            <span>Zero hidden admission or registration charges</span>
          </div>
          <div className="pricing__guarantee">
            <ShieldCheck size={18} className="guarantee-icon" />
            <span>100% Free Trial Class before you commit</span>
          </div>
          <div className="pricing__guarantee">
            <ShieldCheck size={18} className="guarantee-icon" />
            <span>Easy membership pause for travel or exams</span>
          </div>
        </div>
      </div>
    </section>
  )
}
