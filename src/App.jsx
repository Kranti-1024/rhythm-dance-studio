import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Classes from './components/Classes'
import Schedule from './components/Schedule'
import Gallery from './components/Gallery'
import WhyChooseUs from './components/WhyChooseUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    const elements = document.querySelectorAll('.fade-up')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Classes />
        <WhyChooseUs />
        <Schedule />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
