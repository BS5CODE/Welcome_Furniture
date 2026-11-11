import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Sparkles, ArrowRight, Clock, ShieldCheck, Zap } from 'lucide-react'

const hotspotsData = [
  {
    id: 1,
    x: 28, // % from left
    y: 35, // % from top
    title: 'Solid Oak Bespoke Dining Suite',
    department: 'furniture',
    badge: '🔨 Made-to-Order (Min. 10 Days)',
    guarantee: '30+ Years Experience • Trust Our Quality & Service',
    category: 'Dining Sets',
    price: 48500,
    priceNote: 'Handcrafted custom estimate',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
    link: '/collection?department=furniture'
  },
  {
    id: 2,
    x: 72,
    y: 52,
    title: '18mm Semi Ultra Marine Plywood (Okuma Dip)',
    department: 'hardware',
    badge: '⚡ Ready Stock Dispatch',
    guarantee: 'IS:710 Marine Grade BWP',
    category: 'Plywood',
    price: 2498,
    priceNote: '₹78.05/sq ft • 8x4 sheet',
    image: '/assets/plywood_rate_chart.jpg',
    link: '/collection?department=hardware'
  },
  {
    id: 3,
    x: 85,
    y: 28,
    title: 'Designer Sunmica / Laminate Sheet',
    department: 'hardware',
    badge: '⚡ Ready Stock Dispatch',
    guarantee: 'Authentic 100% Quality Assurance',
    category: 'Sunmica & Laminates',
    price: 850,
    priceNote: 'per 8x4 ft sheet',
    image: '/assets/sunmica_white_liner.jpg',
    link: '/collection?department=hardware'
  }
]

const RoomHotspot = () => {
  const [activeHotspot, setActiveHotspot] = useState(null) // Closed by default to prevent any viewport overlap

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 container mx-auto">
      <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 lg:p-14 text-white overflow-hidden shadow-2xl relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Space & Materials Experience
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight">
              See How Furniture & Materials Combine
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-xl font-light">
              Tap the hotspots below to see our handcrafted furniture alongside the high-grade Marine Plywood and designer Sunmica sheets used in real interior spaces.
            </p>
          </div>

          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-300 hover:text-white transition-colors"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Main Interactive Stage */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl bg-stone-950 border border-stone-800">
          {/* Room Image */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
            alt="Interior with handcrafted furniture, marine plywood carcass, and designer sunmica finish"
            className="w-full h-full object-cover filter brightness-95"
          />

          {/* Dark Overlay for Depth */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Hotspot Pins */}
          {hotspotsData.map((spot) => {
            const isActive = activeHotspot?.id === spot.id

            return (
              <div
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <button
                  onClick={() => setActiveHotspot(isActive ? null : spot)}
                  className="relative group p-2 cursor-pointer focus:outline-none"
                  aria-label={`View ${spot.title}`}
                >
                  {/* Outer Pulsing Ring */}
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />

                  {/* Pin Dot */}
                  <span
                    className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-300 shadow-xl ${
                      isActive
                        ? 'bg-rose-500 border-white scale-125 ring-4 ring-rose-500/40'
                        : 'bg-stone-900/90 border-white/80 hover:scale-110 text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  </span>
                </button>
              </div>
            )
          })}

          {/* Active Hotspot Floating Card / Drawer */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-2 left-2 right-2 sm:left-auto sm:right-6 sm:bottom-6 sm:w-84 bg-stone-900/95 backdrop-blur-md border border-stone-700/80 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl z-40 text-stone-100"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      activeHotspot.department === 'hardware'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {activeHotspot.badge}
                  </span>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-stone-400 hover:text-white p-1 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-3 items-center">
                  <img
                    src={activeHotspot.image}
                    alt={activeHotspot.title}
                    className="w-16 h-16 object-cover rounded-xl border border-stone-700 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-white truncate">{activeHotspot.title}</h4>
                    <p className="text-[11px] text-stone-400">{activeHotspot.guarantee}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-sm font-bold text-amber-300">₹{activeHotspot.price.toLocaleString()}</span>
                      <span className="text-[10px] text-stone-400">({activeHotspot.priceNote})</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-800 flex gap-2">
                  <Link
                    to={activeHotspot.link}
                    className="flex-1 bg-white hover:bg-stone-200 text-stone-900 text-center font-bold text-xs py-2 rounded-xl transition"
                  >
                    View in Catalog
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default RoomHotspot
