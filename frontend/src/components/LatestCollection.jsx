import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem'

const LatestCollection = ({ inView }) => {
  const { products } = useContext(ShopContext)
  const [activeTab, setActiveTab] = useState('all')

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true
    return p.department === activeTab
  }).slice(0, 8)

  return (
    <section className="py-10 sm:py-16 md:py-24 px-2 sm:px-6 bg-gradient-to-b from-white to-stone-50/60">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase font-bold tracking-widest text-rose-500 mb-2">
            Curated Releases
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-serif text-gray-900 tracking-tight">
            Latest Collections
          </h2>
          <div className="h-0.5 w-16 bg-rose-500 mt-3 sm:mt-4 mb-3 sm:mb-4" />
          <p className="text-gray-600 max-w-2xl text-xs sm:text-base font-light px-2">
            Discover bespoke on-demand furniture backed by 30+ Years of Experience and quality you can trust, alongside ready-stock Marine Plywood and Sunmica laminates.
          </p>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 bg-stone-100 p-1 sm:p-1.5 rounded-full mt-6 sm:mt-8 border border-stone-200">
            {[
              { id: 'all', label: 'All Releases' },
              { id: 'furniture', label: '🛋️ Furniture' },
              { id: 'hardware', label: '🪵 Hardware' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-1.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              department={item.department}
              category={item.category}
              finish={item.finish}
              material={item.material}
              bestseller={item.bestseller}
              ratePerSqFt={item.ratePerSqFt}
              pricingUnit={item.pricingUnit}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to={activeTab === 'all' ? '/collection' : `/collection?department=${activeTab}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-900 hover:text-rose-600 transition-colors uppercase tracking-wider group"
          >
            <span>Explore Complete {activeTab === 'all' ? 'Catalogue' : activeTab}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestCollection
