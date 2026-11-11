import React from 'react'
import { motion } from 'framer-motion'
import { Clock, ShieldCheck, Camera, Zap } from 'lucide-react'

const OurPolicy = () => {
  const policies = [
    {
      icon: <Clock className="h-8 w-8 text-amber-500" />,
      badge: "Built On Order",
      title: "Min. 10-Day Handcrafting",
      description: "No pre-made mass factory stock. Every piece of furniture is custom-built from scratch to fit your room's measurements."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-emerald-600" />,
      badge: "Quality & Service",
      title: "30+ Years of Experience",
      description: "We have 30+ years of experience, so you can trust our quality and the service. Use it and then believe us."
    },
    {
      icon: <Camera className="h-8 w-8 text-rose-500" />,
      badge: "Custom Vision",
      title: "Recreate Any Social Photo",
      description: "Saw a design on Pinterest, Instagram, or a friend's house? Send us the picture; we custom-build it identically."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      badge: "In-Stock Ready",
      title: "Ready-Dispatch Plywood",
      description: "Marine BWP Grade plywood & luxury Sunmica laminates in 8x4 ft sheets available for same-day site dispatch."
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 bg-stone-100/70 border-y border-stone-200">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase font-bold tracking-widest text-rose-500 mb-2 block">
            Our Business Promise
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif text-gray-900 tracking-tight">
            Quality Guaranteed. Never Rushed.
          </h2>
          <div className="h-0.5 w-16 bg-rose-500 mt-4 mx-auto"></div>
          <p className="text-gray-600 text-sm max-w-xl mx-auto mt-4 font-light">
            We don't sell cheap ready-made furniture that breaks in a year. We handcraft bespoke pieces on demand, backed by real guarantees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map((policy, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-start p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.08 * index }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between w-full mb-4">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">{policy.icon}</div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                  {policy.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">{policy.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{policy.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPolicy
