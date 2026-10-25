import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Classes from './components/Classes'
import WhyChooseUs from './components/WhyChooseUs'
import Instructors from './components/Instructors'
import Schedule from './components/Schedule'
import Pricing from './components/Pricing'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingBar from './components/FloatingBar'
import BookingModal from './components/BookingModal'
import './App.css'

function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingInitialClass, setBookingInitialClass] = useState('')
  const [bookingInitialPlan, setBookingInitialPlan] = useState('')
  const [bookingInitialDay, setBookingInitialDay] = useState('')

  const handleOpenBooking = (className = '', planName = '', day = '') => {
    setBookingInitialClass(className)
    setBookingInitialPlan(planName)
    setBookingInitialDay(day)
    setBookingModalOpen(true)
  }

  const handleCloseBooking = () => {
    setBookingModalOpen(false)
  }

  useEffect(() => {
    // Intersection Observer for fade-up animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    const observeAll = () => {
      document.querySelectorAll('.fade-up:not(.visible)').forEach((el) => observer.observe(el))
    }

    observeAll()

    // Auto-observe any dynamically mounted elements
    const mutationObserver = new MutationObserver(() => {
      observeAll()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <div className="app">
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main>
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <About onOpenBooking={() => handleOpenBooking()} />
        <Classes onOpenBooking={(style) => handleOpenBooking(style)} />
        <WhyChooseUs />
        <Instructors onSelectInstructor={(style) => handleOpenBooking(style)} />
        <Schedule onSelectSlot={(style, day) => handleOpenBooking(style, '', day)} />
        <Pricing onSelectPlan={(plan) => handleOpenBooking('', plan)} />
        <Gallery />
        <Testimonials />
        <FAQ onOpenBooking={() => handleOpenBooking()} />
        <Contact onOpenBooking={() => handleOpenBooking()} />
      </main>

      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Mobile Floating Action Bar */}
      <FloatingBar
        onOpenBooking={() => handleOpenBooking()}
        isModalOpen={bookingModalOpen}
      />

      {/* Global Interactive Booking Wizard Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        initialClass={bookingInitialClass}
        initialPlan={bookingInitialPlan}
        initialDay={bookingInitialDay}
      />
    </div>
  )
}

export default App
