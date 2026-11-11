import React from 'react'
import { motion } from 'framer-motion'

const NewsletterBox = ({ inView }) => {
  return (
    <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_70%)]"></div>
      <motion.div
        className="container mx-auto max-w-4xl text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-light mb-6">
          JOIN OUR <span className="font-semibold">COMMUNITY</span>
        </h2>
        <p className="mb-8 text-gray-300 max-w-xl mx-auto">
          Stay updated with our latest collections, exclusive offers, and interior design tips.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 rounded-full"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 py-3">SUBSCRIBE</button>
          </motion.div>
        </div>
        <p className="mt-8 text-gray-400 text-sm">© 2025 Welcome Furniture. All rights reserved.</p>
      </motion.div>
    </section>
  )
}

export default NewsletterBox
