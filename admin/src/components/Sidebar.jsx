import React from 'react'
import { NavLink } from 'react-router-dom'
import { PlusCircle, Package, FolderKanban, ShoppingBag } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    {
      to: '/add',
      label: 'Add Product',
      shortLabel: 'Add',
      icon: <PlusCircle className="w-5 h-5 flex-shrink-0" />
    },
    {
      to: '/list',
      label: 'All Products',
      shortLabel: 'Products',
      icon: <Package className="w-5 h-5 flex-shrink-0" />
    },
    {
      to: '/categories',
      label: 'Categories',
      shortLabel: 'Categories',
      icon: <FolderKanban className="w-5 h-5 flex-shrink-0" />,
      badge: 'Dynamic'
    },
    {
      to: '/orders',
      label: 'Customer Orders',
      shortLabel: 'Orders',
      icon: <ShoppingBag className="w-5 h-5 flex-shrink-0" />
    }
  ]

  return (
    <>
      {/* 🖥️ Desktop Left Sidebar (Visible on md and above) */}
      <aside className='hidden md:flex flex-col w-64 min-h-[calc(100vh-65px)] bg-white border-r border-gray-200 py-6 flex-shrink-0'>
        <div className='px-5 mb-4'>
          <p className='text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2'>
            Management
          </p>
        </div>

        <nav className='flex flex-col gap-1.5 px-3'>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <span className="text-current">{item.icon}</span>
              <span className='flex-1 text-left'>{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-5 pt-6 border-t border-gray-100 text-xs text-gray-400">
          <p className="font-semibold text-gray-500">Welcome Furniture & Hardware</p>
          <p>Admin Control v2.0</p>
        </div>
      </aside>

      {/* 📱 Mobile Fixed Bottom Navigation Bar (Visible on screens < md) */}
      <nav className='md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-1 px-2 flex items-center justify-around shadow-lg safe-bottom'>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all duration-200 min-w-[64px] ${
                isActive
                  ? 'text-rose-600 font-bold bg-rose-50/80'
                  : 'text-gray-500 hover:text-gray-800'
              }`
            }
          >
            <span className="text-current mb-0.5">{item.icon}</span>
            <span className="text-[10px] tracking-tight">{item.shortLabel}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Sidebar
