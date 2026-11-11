import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react'

const ProductItem = ({ id, image, name, price, department, category, finish, material, bestseller, ratePerSqFt, pricingUnit }) => {
  const { currency } = useContext(ShopContext)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const isHardware = department === 'hardware'

  return (
    <Link
      onClick={() => window.scrollTo(0, 0)}
      className="group block text-gray-800 cursor-pointer outline-none"
      to={`/product/${id}`}
    >
      {/* Image Container with Fixed Aspect Ratio & Rounded Corners */}
      <div className="w-full aspect-[4/3] sm:aspect-square overflow-hidden relative rounded-2xl bg-stone-100 border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
        {/* Loading Skeleton */}
        {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

        <img
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          src={Array.isArray(image) ? image[0] : (image || '')}
          alt={name}
          loading="lazy"
          onLoad={handleImageLoad}
          decoding="async"
        />

        {/* Status Badge Top Left */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span
            className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm backdrop-blur-md ${
              isHardware
                ? 'bg-emerald-600/95 text-white'
                : 'bg-stone-900/90 text-white'
            }`}
          >
            {isHardware ? '⚡ Ready Stock' : '🔨 Made-To-Order'}
          </span>
        </div>

        {/* Bestseller Badge Top Right */}
        {bestseller && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full shadow-sm">
              <Sparkles className="w-2.5 h-2.5" /> Best
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info Block */}
      <div className="pt-3 space-y-1">
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <span className="font-semibold uppercase tracking-wider text-stone-500">
            {category || (isHardware ? 'Plywood / Sunmica' : 'Furniture')}
          </span>
          <span className="text-[10px] font-bold text-amber-600">
            {isHardware ? 'Instant Dispatch' : 'Min. 10 Days'}
          </span>
        </div>

        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
          {name}
        </h3>

        {/* Guarantee or Finish Tag */}
        <p className="text-[11px] text-gray-500 truncate font-light">
          {isHardware 
            ? (finish || material || '8x4 ft Standard Sheet')
            : '🛡️ 30+ Years Experience • Trusted Quality'}
        </p>

        {/* Price Block */}
        <div className="flex items-baseline gap-1.5 pt-0.5">
          <p className="text-sm sm:text-base font-bold text-gray-900">
            {currency}
            {Number(price).toLocaleString()}
          </p>
          <span className="text-[10px] text-gray-500 font-medium">
            {ratePerSqFt ? `(₹${ratePerSqFt}/sq ft)` : (isHardware ? (pricingUnit === 'piece' ? '/ pc' : '/ sheet') : '(Bespoke estimate)')}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
