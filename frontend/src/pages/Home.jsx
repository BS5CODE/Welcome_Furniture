import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Hero from '../components/Hero'
import DepartmentShowcase from '../components/DepartmentShowcase'
import CustomDesignBox from '../components/CustomDesignBox'
import PlywoodCalculator from '../components/PlywoodCalculator'
import RoomHotspot from '../components/RoomHotspot'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  // Scroll animations
  const { ref: collectionsRef, inView: collectionsInView } = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const { ref: sellersRef, inView: sellersInView } = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const { ref: policyRef, inView: policyInView } = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  const { ref: newsletterRef, inView: newsletterInView } = useInView({
    triggerOnce: true,
    threshold: 0.05
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col space-y-4">
      {/* 1. Cinematic Ambient Video Hero */}
      <Hero isScrolled={isScrolled} />

      {/* 2. Department Showcase (Furniture vs Hardware) */}
      <DepartmentShowcase />

      {/* 3. Official Plywood & Sunmica Live Calculator */}
      <PlywoodCalculator />

      {/* 4. "Saw on Pinterest/Instagram? We Build It!" Custom Commission Feature */}
      <CustomDesignBox />

      {/* 5. Interactive Room & Architectural Materials Hotspot Experience */}
      <RoomHotspot />

      {/* 5. Latest Collections with Department Filter Tabs */}
      <div ref={collectionsRef}>
        <LatestCollection inView={collectionsInView} />
      </div>

      {/* 6. Customer Favorites */}
      <div ref={sellersRef}>
        <BestSeller inView={sellersInView} />
      </div>

      {/* 7. Business Promise: 10-Day Min. Build, 30+ Years Experience, Ready Plywood */}
      <div ref={policyRef}>
        <OurPolicy inView={policyInView} />
      </div>

      {/* 8. Trade & VIP Club Newsletter */}
      <div ref={newsletterRef}>
        <NewsletterBox inView={newsletterInView} />
      </div>
    </div>
  )
}

export default Home
