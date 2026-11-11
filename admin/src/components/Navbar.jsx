import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut, ShieldCheck } from 'lucide-react'
import logo from '../assets/logo.png'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2.5 sm:py-3 px-3 sm:px-6 md:px-10 justify-between bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30'>
      <div className="flex items-center gap-3">
        <Link to="/list" className="flex items-center gap-2 sm:gap-2.5 group">
          <img
            src={logo}
            alt="Welcome Enterprise"
            className="h-8 sm:h-10 w-auto object-contain rounded shadow-2xs group-hover:scale-102 transition-transform"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-base font-bold tracking-tight text-gray-900 leading-tight">
              Welcome Enterprise
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Admin Control Panel
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </div>

        <button 
          onClick={() => {
            setToken('')
            localStorage.removeItem('token')
          }} 
          className='flex items-center gap-1.5 bg-gray-900 hover:bg-rose-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 shadow-sm'
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar
