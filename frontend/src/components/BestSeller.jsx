import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';

const BestSeller = ({ inView }) => {
  const { products } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('all');
  const [bestSellers, setBestSellers] = useState([]);

  // Fetch best seller products from context
  useEffect(() => {
    if (products && products.length > 0) {
      // Filter products to get only bestsellers (or fallback to top items if none marked)
      let best = products.filter((item) => item.bestseller);
      if (best.length === 0) {
        best = products.slice(0, 10);
      }
      setBestSellers(best);
    }
  }, [products]);

  const filteredItems = bestSellers
    .filter((item) => (activeTab === 'all' ? true : item.department === activeTab))
    .slice(0, 5);

  return (
    <section className="py-10 sm:py-16 md:py-24 px-2 sm:px-6">
      <div className="container mx-auto">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-rose-500 mb-2 block">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-serif text-gray-900 tracking-tight">
              Best <span className="font-light italic text-stone-600">Sellers</span>
            </h2>
            <div className="h-0.5 w-16 bg-rose-500 mt-3 sm:mt-4 mb-3 sm:mb-4"></div>
            <p className="text-gray-600 max-w-xl text-xs sm:text-base font-light">
              Our most celebrated designs and architectural fittings chosen by interior architects and homeowners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            {/* Department Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1 sm:p-1.5 rounded-full border border-stone-200">
              {[
                { id: 'all', label: 'All' },
                { id: 'furniture', label: '🛋️ Furniture' },
                { id: 'hardware', label: '🪵 Hardware' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-1 px-3.5 rounded-full text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Link
              to="/collection"
              className="hidden md:inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-900 hover:text-rose-600 transition-colors uppercase tracking-wider group"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {products.length === 0 ? (
          // Loading skeleton state
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse space-y-3">
                <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
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
        )}

        <div className="mt-10 text-center md:hidden">
          <Link
            to="/collection"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-900 hover:text-rose-600 transition-colors uppercase tracking-wider"
          >
            <span>Explore Entire Collection</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
