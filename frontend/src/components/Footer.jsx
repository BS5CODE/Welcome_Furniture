import React, { useState } from 'react'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import { Link } from 'react-router-dom'
import { Instagram, X } from 'lucide-react'

const Footer = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)

  // Toggle privacy policy modal
  const handlePrivacyPolicyClick = (e) => {
    e.preventDefault()
    setShowPrivacyPolicy(true)
  }

  const closePrivacyPolicy = () => {
    setShowPrivacyPolicy(false)
  }

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-h-[90vh] overflow-y-auto w-full max-w-3xl rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-medium">Privacy Policy</h2>
              <button 
                onClick={closePrivacyPolicy}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="privacy-content">
              <PrivacyPolicy />
            </div>
          </div>
        </div>
      )}

      <div className='container mx-auto px-4 sm:px-6 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 sm:gap-10 md:gap-14 mb-10 text-sm'>
        <div>
            {/* Official Company Emblem & Brand Title */}
            <Link to="/" className="inline-flex items-center gap-3 group mb-4">
              <img
                src="/assets/welcome_logo.jpg"
                alt="Welcome Enterprise Furniture & Hardware"
                className="h-12 sm:h-14 w-auto object-contain rounded-lg shadow-sm group-hover:scale-102 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors leading-tight">
                  Welcome Enterprise
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-stone-500">
                  Build • Furnish • Live Better
                </span>
              </div>
            </Link>
            <p className='w-full md:w-4/5 text-gray-600 mt-2 text-xs sm:text-sm leading-relaxed'>
              Specializing in bespoke made-to-order furniture handcrafted on demand (minimum 10-day build) backed by 30+ Years of Experience. We have 30+ years of experience, so you can trust our quality and the service — use it and then believe us. We recreate any custom piece seen on Pinterest, Instagram, or in real homes, and supply ready-to-dispatch certified Marine BWP Plywood and designer Sunmica sheets.
            </p>
            <div className="flex mt-5 gap-3">
              <a href="https://instagram.com/welcome_._furniture" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white border border-stone-200 text-gray-600 hover:text-rose-500 hover:border-rose-300 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
        </div>

        <div>
            <p className='text-xs sm:text-sm font-bold tracking-wider uppercase text-stone-900 mb-3 sm:mb-5'>CATALOGS & PAGES</p>
            <ul className='flex flex-col gap-2 sm:gap-2.5 text-gray-600 text-xs sm:text-sm'>
                <li className="hover:text-rose-600 transition-colors">
                  <Link to="/collection?department=furniture">🛋️ Furniture</Link>
                </li>
                <li className="hover:text-rose-600 transition-colors">
                  <Link to="/collection?department=hardware">🪵 Hardware</Link>
                </li>
                <li className="hover:text-rose-600 transition-colors">
                  <Link to="/collection">All Catalogs</Link>
                </li>
                <li className="hover:text-rose-600 transition-colors">
                  <Link to="/about">About Us & Guarantee</Link>
                </li>
                <li className="hover:text-rose-600 transition-colors">
                  <Link to="/contact">Custom Commission & Contact</Link>
                </li>
                <li className="hover:text-rose-600 transition-colors">
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
            </ul>
        </div>

        <div>
            <p className='text-xs sm:text-sm font-bold tracking-wider uppercase text-stone-900 mb-3 sm:mb-5'>EXPERIENCE CENTER</p>
            <ul className='flex flex-col gap-2 text-gray-600 text-xs sm:text-sm'>
                <li className="font-medium text-stone-900">Shop No 2, Vallabh Nagar Complex</li>
                <li>Tarsali, Vadodara 390010, Gujarat</li>
                <li className="mt-2 font-medium text-stone-900">
                  <a href="tel:+918128374219" className="hover:text-rose-600 font-bold">Primary: +91 81283 74219 (WhatsApp & Call)</a>
                </li>
                <li>
                  <a href="tel:+919173086962" className="hover:text-rose-600">+91 91730 86962</a>
                </li>
                <li className="hover:text-rose-600 transition-colors font-medium break-all">
                  <a href="mailto:welcomefurniture.co@gmail.com">welcomefurniture.co@gmail.com</a>
                </li>
                <li className="mt-2 text-xs text-stone-500">Mon - Sat: 9:30 AM - 8:30 PM</li>
                <li className="text-xs text-stone-500">Sun: 10:00 AM - 6:00 PM</li>
            </ul>
        </div>
      </div>

      <div className="container mx-auto px-4">
          <hr className="border-gray-200" />
          <p className='py-5 text-xs text-center text-gray-500'>
            Copyright &copy; {new Date().getFullYear()} Welcome Furniture & Architectural Hardware. All Rights Reserved.
          </p>
      </div>
    </footer>
  )
}

export default Footer
