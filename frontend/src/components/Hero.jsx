import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, ShieldCheck, Clock, Camera, Layers } from 'lucide-react'

const Hero = () => {
  const whatsAppNumber = "918128374219"
  const whatsAppMsg = encodeURIComponent(
    "Hello Welcome Enterprise! I want to inquire about: 1) Custom furniture build from photo, or 2) Hardware items and rates. Please assist!"
  )
  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${whatsAppMsg}`

  return (
    <section className="relative min-h-[65vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl my-2 sm:my-3 shadow-xl bg-stone-900">
      {/* Background with Ambient Animation & Reliable Image Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=85"
          alt="Welcome Enterprise Furniture and Hardware"
          className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.05] scale-105 animate-pulse duration-1000"
          style={{ animationDuration: '8s' }}
        />
        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-6 py-8 sm:py-16 md:py-24 text-center flex flex-col items-center justify-center max-w-4xl">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-stone-100 text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-6 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
          <span className="font-semibold tracking-wide">
            WELCOME ENTERPRISE • 30 YEARS OF TRUST
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-3 sm:mb-5 font-serif"
        >
          Bespoke Living.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-amber-100">
            Precision Materials.
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xs sm:text-base md:text-lg text-stone-200 max-w-2xl font-light mb-6 sm:mb-9 leading-relaxed drop-shadow-sm"
        >
          Handcrafted on-demand furniture backed by <strong className="text-white font-medium">30+ Years of Experience</strong> — you can trust our quality and service. Use it and then believe us. Alongside ready-stock <strong className="text-white font-medium">Okuma Dip Marine Plywood</strong> and <strong className="text-white font-medium">Designer Sunmica Laminates</strong>.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto"
        >
          {/* Furniture CTA */}
          <Link
            to="/collection?department=furniture"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-stone-900 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-xl hover:scale-102"
          >
            <span>🛋️ Furniture</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Hardware CTA */}
          <Link
            to="/collection?department=hardware"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-xl hover:scale-102"
          >
            <Layers className="w-4 h-4" />
            <span>🪵 Hardware</span>
          </Link>

          {/* Social Media Commission */}
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-stone-900/80 hover:bg-stone-900 text-stone-200 border border-stone-700/80 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-lg hover:text-white"
          >
            <Camera className="w-4 h-4 text-rose-400" />
            <span>📸 Custom Photo Recreation</span>
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-5 mt-6 sm:mt-12 pt-5 sm:pt-7 border-t border-white/15 w-full text-[11px] sm:text-xs text-stone-300 font-medium"
        >
          <div className="flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl border border-white/10">
            <Clock className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
            <span>Min. 10 Days On-Demand Handcrafting</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>30+ Years of Experience: Trust Our Quality & Service</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl border border-white/10">
            <Layers className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
            <span>Ready Stock Plywood & Designer Sunmica</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
