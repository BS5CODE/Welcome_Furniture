import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Sparkles, MessageCircle, ShieldCheck, Ruler, ArrowRight, Instagram } from 'lucide-react'

const CustomDesignBox = () => {
  const whatsAppNumber = "918128374219"
  const whatsAppMsg = encodeURIComponent(
    "Hello Welcome Furniture! I have a design photo from Pinterest / Instagram / a friend's house. I want to build a custom furniture piece to my room measurements. Please guide me with estimates!"
  )
  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${whatsAppMsg}`

  return (
    <section className="py-10 sm:py-16 md:py-24 px-2 sm:px-6 container mx-auto">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white p-5 sm:p-10 lg:p-16 border border-stone-800 shadow-2xl">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Bespoke Commission Service</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-white leading-tight">
              Saw a Design on <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-amber-100">Pinterest or Instagram?</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              Don’t settle for generic pre-made furniture. If you saw a luxury sofa, dining suite, hydraulic bed, or wardrobe on Pinterest, Instagram, a movie set, or a friend’s residence — <strong className="text-white font-medium">we handcraft it to your exact room dimensions</strong>.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">30+ Years of Proven Experience</h4>
                  <p className="text-[11px] text-stone-400">Trust our quality & service. Use it and believe us.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                <Ruler className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Minimum 10-Day Artisanal Build</h4>
                  <p className="text-[11px] text-stone-400">Crafted from scratch with seasoned teak & oak.</p>
                </div>
              </div>
            </div>

            {/* Direct Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-7 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-102"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Reference Photo on WhatsApp</span>
              </a>

              <span className="text-xs text-stone-400 text-center sm:text-left">
                Direct hotline: <a href="tel:+918128374219" className="text-white underline">+91 81283 74219</a>
              </span>
            </div>
          </div>

          {/* Right Column: 3-Step Process Card */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            <h3 className="text-lg font-bold font-serif text-white border-b border-white/10 pb-4">
              How Custom Handcrafting Works
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-sm border border-rose-500/30 flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Save Any Reference Image</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Screenshot a design from Pinterest, Instagram, architectural magazines, or take a picture at a friend's house.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30 flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Share Dimensions & Finish</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Our master craftsman consults with you on wood species (Teak, Oak, Rosewood), Sunmica textures, and fabric swatches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30 flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">10-Day Handcrafted Delivery</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Delivered to your room, fully assembled. We have 30+ years of experience — trust our quality & service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomDesignBox
