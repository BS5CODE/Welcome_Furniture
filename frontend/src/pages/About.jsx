import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Hammer, Leaf, Users } from 'lucide-react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {


  // Fade in and slide up animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  // Slide in from left animation
  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  }

  // Slide in from right animation
  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="pt-6 sm:pt-12 md:pt-16">
      {/* About Us Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.2 }}
        variants={fadeInUp}
        className='text-2xl text-center' // Removed border-t
      >
        <Title text1={'ABOUT'} text2={'US'} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.2 }}
        className='my-10 flex flex-col md:flex-row gap-16'
      >
        <motion.img
          variants={slideInLeft}
          className='w-full md:max-w-[450px] rounded-lg shadow-lg object-cover hover:shadow-xl transition-shadow duration-300'
          src={assets.about_img}
          alt="Welcome Furniture workshop"
        />
        <motion.div
          variants={slideInRight}
          className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'
        >
          <p>Welcome Furniture & Architectural Hardware is dedicated to bespoke on-demand furniture craftsmanship and high-performance architectural materials. Unlike modern mass-retail stores that push flimsy ready-made furniture, every single piece we create is built from scratch on order with a minimum 10 to 15-day handcrafting period.</p>
          <p>We believe in absolute customer trust: we have 30+ years of experience, so you can trust our quality and the service. Use it and then believe us. If you have a specific dream design seen on Pinterest, Instagram, Facebook, an interior design magazine, or at a friend's house — our master woodworkers will handcraft it to your exact room measurements using seasoned hardwoods.</p>
          <p>In addition to custom furniture commissions, we provide immediate site supply of certified <strong>Marine BWP Grade Plywood (IS:710)</strong>, calibrated hardwood boards, and luxury <strong>Sunmica decorative laminates</strong> in ready-to-dispatch stock.</p>
          <b className='text-gray-800 text-xl'>Our Uncompromising Standard</b>
          <p>We deliver enduring quality, personalized dimension customization, and peace-of-mind guarantees for homeowners, interior architects, and commercial developers.</p>
        </motion.div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.2 }}
        variants={fadeInUp}
        className='text-xl py-4'
      >
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold: 0.2 }}
        className='flex flex-col md:flex-row text-sm mb-20'
      >
        {/* 10-Day Artisanal Build */}
        <motion.div
          variants={fadeInUp}
          custom={0}
          transition={{ delay: 0.1 }}
          className="border px-8 md:px-12 py-8 sm:py-16 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-2 rounded-2xl bg-white"
        >
          <div className="flex items-center gap-3">
            <Hammer className="w-8 h-8 text-amber-600" />
            <b className="text-lg">Min. 10-Day Handcrafting:</b>
          </div>
          <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
            We never sell pre-fabricated factory stock. Each piece is constructed from raw seasoned hardwoods (Teak, Oak, Rosewood) to fit your exact floor plan.
          </p>
        </motion.div>

        {/* 30+ Years of Experience */}
        <motion.div
          variants={fadeInUp}
          custom={1}
          transition={{ delay: 0.3 }}
          className="border px-8 md:px-12 py-8 sm:py-16 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-2 rounded-2xl bg-white"
        >
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <b className="text-lg">30+ Years of Experience:</b>
          </div>
          <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
            We have 30+ years of experience, so you can trust our quality and the service. Use it and then believe us. Every piece is handcrafted by master artisans to ensure lasting durability and supreme finish.
          </p>
        </motion.div>

        {/* Custom Social Media Recreation */}
        <motion.div
          variants={fadeInUp}
          custom={2}
          transition={{ delay: 0.5 }}
          className="border px-8 md:px-12 py-8 sm:py-16 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-2 rounded-2xl bg-white"
        >
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-rose-500" />
            <b className="text-lg">Pinterest & Custom Build:</b>
          </div>
          <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
            Found an inspiring design on Pinterest, Instagram, or a friend's residence? Send us the reference image and we recreate it to perfection.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default About