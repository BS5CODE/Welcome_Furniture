import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, ShieldCheck, Zap, Layers } from 'lucide-react'

const DepartmentShowcase = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 container mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase font-bold tracking-widest text-rose-500">
          Two Focused Offerings
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-2 font-serif">
          Bespoke Living & Architectural Materials
        </h2>
        <div className="h-0.5 w-16 bg-rose-500 mx-auto mt-4" />
        <p className="text-gray-600 text-sm sm:text-base mt-4 font-light">
          Handcrafted on-demand furniture built to last decades, alongside ready-stock architectural plywood and designer Sunmica laminates.
        </p>
      </div>

      {/* 2-Column Split Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
        {/* Furniture Card */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="group relative overflow-hidden rounded-2xl sm:rounded-3xl min-h-[420px] sm:min-h-[480px] md:min-h-[540px] shadow-xl flex flex-col justify-end p-5 sm:p-8 md:p-10 border border-gray-100"
        >
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
            alt="Furniture Collection"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />

          {/* Content */}
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-amber-500 text-stone-950 px-3 py-1 rounded-full">
                <Clock className="w-3 h-3" /> Min. 10 Days On-Demand Build
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-emerald-500/90 text-white px-3 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3" /> 30+ Years Experience • Trust Our Service
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif">
              Furniture
            </h3>

            <p className="text-stone-300 text-xs sm:text-sm max-w-md font-light leading-relaxed">
              No ready-made compromises. We build sofas, hydraulic beds, solid oak dining sets, and wardrobes from scratch to your room's measurements. Have an Instagram or Pinterest photo? We handcraft it!
            </p>

            {/* Popular tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['Bespoke Sofas', 'Hydraulic Teak Beds', 'Solid Oak Dining', 'Custom Wardrobes', 'Instagram Recreation'].map(
                (tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-lg border border-white/10"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="pt-2">
              <Link
                to="/collection?department=furniture"
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all group-hover:gap-3 shadow-lg"
              >
                <span>Browse Furniture Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Hardware Card */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="group relative overflow-hidden rounded-2xl sm:rounded-3xl min-h-[420px] sm:min-h-[480px] md:min-h-[540px] shadow-xl flex flex-col justify-end p-5 sm:p-8 md:p-10 border border-gray-100"
        >
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
            alt="Plywood and Sunmica Laminates"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />

          {/* Content */}
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-emerald-500 text-white px-3 py-1 rounded-full">
                <Zap className="w-3 h-3" /> ⚡ Ready To Dispatch Stock
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-blue-500/90 text-white px-3 py-1 rounded-full">
                <Layers className="w-3 h-3" /> 8x4 ft Standard Sheets
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif">
              Hardware
            </h3>

            <p className="text-stone-300 text-xs sm:text-sm max-w-md font-light leading-relaxed">
              Certified Marine BWP Grade (IS:710) boiling waterproof plywood, calibrated hardwood boards, luxury Sunmica laminates, and architectural hardware fittings in stock for fast dispatch.
            </p>

            {/* Popular tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Marine BWP Plywood',
                'Calibrated 16mm/18mm',
                'Commercial MR Plywood',
                'High-Gloss Sunmica',
                'Anti-Fingerprint Matte',
                'Fluted Panels'
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-lg border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/collection?department=hardware"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all group-hover:gap-3 shadow-lg"
              >
                <span>View Hardware Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DepartmentShowcase
