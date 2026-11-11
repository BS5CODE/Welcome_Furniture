import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import { Search, ShoppingBag, User, Menu, X, ArrowRight, Phone } from 'lucide-react'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    toast.success('Logged out successfully!')
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all shadow-xs">
      {/* Top Announcement Bar - Clean Single Line */}
      <div className="bg-stone-900 text-stone-300 text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 text-center font-medium tracking-wide">
        <span className="text-amber-400 font-bold mr-1">★ 30+ YEARS EXPERIENCE:</span>
        <span className="hidden md:inline">Trust Our Quality & Service (Use It & Believe Us) • </span>
        <span>Hardware Ready Stock • Vadodara</span>
      </div>

      <div className="container mx-auto flex items-center justify-between py-2.5 sm:py-3.5 px-3 sm:px-6 gap-2">
        {/* Brand Logo with Official Company Emplem */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-shrink">
          <img
            src="/assets/welcome_logo.jpg"
            alt="Welcome Enterprise Furniture & Hardware"
            className="h-9 sm:h-11 md:h-12 w-auto object-contain rounded-md shadow-2xs group-hover:scale-102 transition-transform flex-shrink-0"
          />
          <div className="flex flex-col text-left min-w-0">
            <span className="text-base sm:text-lg md:text-xl font-black tracking-tight text-stone-950 font-serif leading-none truncate">
              Welcome<span className="text-amber-600 font-sans">.</span>
            </span>
            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-500 group-hover:text-stone-900 transition-colors truncate">
              Enterprise • Vadodara
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links - Clean, Elegant & Non-Overlapping */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-wider text-stone-700 uppercase">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors hover:text-stone-950 relative py-1 ${
                isActive ? 'text-stone-950 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-950' : ''
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/collection?department=furniture"
            className={({ isActive }) =>
              `transition-colors hover:text-stone-950 relative py-1 ${
                isActive ? 'text-stone-950 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-950' : ''
              }`
            }
          >
            Furniture
          </NavLink>

          <NavLink
            to="/collection?department=hardware"
            className={({ isActive }) =>
              `transition-colors hover:text-stone-950 relative py-1 ${
                isActive ? 'text-stone-950 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-950' : ''
              }`
            }
          >
            Hardware
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `transition-colors hover:text-stone-950 relative py-1 ${
                isActive ? 'text-stone-950 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-950' : ''
              }`
            }
          >
            All Collections
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition-colors hover:text-stone-950 relative py-1 ${
                isActive ? 'text-stone-950 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-950' : ''
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition-colors hover:text-stone-950 relative py-1 ${
                isActive ? 'text-stone-950 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-950' : ''
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Icon Actions */}
        <div className="flex items-center gap-1 sm:gap-2.5 md:gap-4 flex-shrink-0">
          {/* Direct Phone / WhatsApp Quick Pill */}
          <a
            href="tel:8128374219"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full border border-stone-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>8128374219</span>
          </a>

          {/* Search Button */}
          <button
            onClick={() => {
              setShowSearch(true)
              navigate('/collection')
            }}
            className="p-1.5 sm:p-2 text-stone-700 hover:text-black transition-colors rounded-full hover:bg-stone-100"
            title="Search Products"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* User Profile */}
          <div className="group relative">
            <button
              onClick={() => (token ? null : navigate('/login'))}
              className="p-1.5 sm:p-2 text-stone-700 hover:text-black transition-colors block rounded-full hover:bg-stone-100"
              title="Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2 z-50">
                <div className="flex flex-col gap-1 w-40 py-2 px-3 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-xl text-xs font-medium">
                  <p
                    onClick={() => navigate('/orders')}
                    className="cursor-pointer py-1.5 px-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    My Orders
                  </p>
                  <hr className="border-gray-100 my-1" />
                  <p
                    onClick={logout}
                    className="cursor-pointer py-1.5 px-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          <Link
            to="/cart"
            className="relative p-1.5 sm:p-2 text-stone-700 hover:text-black transition-colors flex items-center rounded-full hover:bg-stone-100"
            title="Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white font-bold flex items-center justify-center rounded-full text-[9px] shadow-xs">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setVisible(true)}
            className="p-1.5 sm:p-2 text-stone-700 hover:text-black lg:hidden rounded-lg hover:bg-stone-100"
            title="Open Menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </header>

    {/* 📱 100% Opaque Mobile Navigation Sidebar (Escaped from header stacking context) */}
    <div
      className={`fixed inset-0 z-[9999] bg-black/80 transition-opacity duration-300 lg:hidden ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ zIndex: 9999 }}
      onClick={() => setVisible(false)}
    >
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col z-[10000] transition-transform duration-300 ease-out overflow-y-auto ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#ffffff', opacity: 1, zIndex: 10000 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header with Solid White Background */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/welcome_logo.jpg"
              alt="Welcome Enterprise"
              className="h-10 w-auto object-contain rounded"
            />
            <div>
              <span className="font-serif font-bold text-stone-900 text-sm block leading-tight">Welcome Enterprise</span>
              <p className="text-[9px] text-stone-500 uppercase tracking-widest font-semibold">Furniture & Hardware</p>
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="p-1.5 text-stone-500 hover:text-black rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean, high-contrast Opaque Navigation Links */}
        <div className="flex flex-col gap-1.5 py-5 text-sm font-semibold text-stone-800 bg-white">
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2.5 px-3 rounded-xl transition-colors ${
                isActive ? 'bg-stone-900 text-white font-bold shadow-sm' : 'text-stone-800 hover:bg-stone-100'
              }`
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                isActive ? 'bg-stone-900 text-white font-bold shadow-sm' : 'text-stone-800 hover:bg-stone-100'
              }`
            }
            to="/collection?department=furniture"
          >
            <span>🛋️ Furniture</span>
            <ArrowRight className="w-4 h-4 text-stone-400" />
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                isActive ? 'bg-stone-900 text-white font-bold shadow-sm' : 'text-stone-800 hover:bg-stone-100'
              }`
            }
            to="/collection?department=hardware"
          >
            <span>🪵 Hardware</span>
            <ArrowRight className="w-4 h-4 text-stone-400" />
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2.5 px-3 rounded-xl transition-colors ${
                isActive ? 'bg-stone-900 text-white font-bold shadow-sm' : 'text-stone-800 hover:bg-stone-100'
              }`
            }
            to="/collection"
          >
            All Collections
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2.5 px-3 rounded-xl transition-colors ${
                isActive ? 'bg-stone-900 text-white font-bold shadow-sm' : 'text-stone-800 hover:bg-stone-100'
              }`
            }
            to="/about"
          >
            About Us & Quality Trust
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2.5 px-3 rounded-xl transition-colors ${
                isActive ? 'bg-stone-900 text-white font-bold shadow-sm' : 'text-stone-800 hover:bg-stone-100'
              }`
            }
            to="/contact"
          >
            Contact & Rates
          </NavLink>
        </div>

        {/* Contact details footer in drawer */}
        <div className="mt-auto pt-6 border-t border-stone-200 text-xs text-stone-600 space-y-1 bg-white">
          <p className="font-bold text-stone-900">Experience Center Vadodara:</p>
          <p>Shop No. 2, Vallabh Nagar Complex, Tarsali Road, Vadodara</p>
          <p className="pt-2 font-semibold text-emerald-700">WhatsApp / Call: 8128374219</p>
          <p className="text-stone-500">welcomefurniture.co@gmail.com</p>
        </div>
      </div>
    </div>
  </>
  )
}

export default Navbar
