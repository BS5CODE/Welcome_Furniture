import React, { useContext, useMemo, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { useInView } from 'react-intersection-observer'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { Filter, X, Check, RotateCcw } from 'lucide-react'

const Collection = () => {
  const { products, search, showSearch, isLoading, error, backendUrl } = useContext(ShopContext)
  const [searchParams, setSearchParams] = useSearchParams()

  // Department from URL or local state
  const urlDepartment = searchParams.get('department') || 'all'
  const [department, setDepartment] = useState(urlDepartment)

  // Filters state
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedFinishes, setSelectedFinishes] = useState([])
  const [sortType, setSortType] = useState('relevant')
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  // Dynamic categories from backend API
  const [categoriesList, setCategoriesList] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(false)

  // Keep department in sync with URL
  useEffect(() => {
    const deptParam = searchParams.get('department') || 'all'
    setDepartment(deptParam)
    setSelectedCategories([]) // Reset category selection when changing department
  }, [searchParams])

  // Fetch dynamic categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      try {
        const query = department !== 'all' ? `?department=${department}` : ''
        const response = await axios.get(`${backendUrl}/api/category/list${query}`)
        if (response.data.success) {
          setCategoriesList(response.data.categories)
        }
      } catch (err) {
        console.error('Error fetching categories for collection:', err)
      } finally {
        setLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [department, backendUrl])

  // Change department handler
  const handleDepartmentChange = (newDept) => {
    setDepartment(newDept)
    if (newDept === 'all') {
      searchParams.delete('department')
    } else {
      searchParams.set('department', newDept)
    }
    setSearchParams(searchParams)
  }

  // Toggle category
  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  // Toggle finish
  const toggleFinish = (value) => {
    setSelectedFinishes((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedFinishes([])
    setSortType('relevant')
  }

  // Extract unique finishes from products for dynamic finish filters
  const availableFinishes = useMemo(() => {
    const finishes = new Set()
    products.forEach((p) => {
      if (p.finish) {
        p.finish.split(/[\/,•]/).forEach((f) => {
          const trimmed = f.trim()
          if (trimmed.length > 2) finishes.add(trimmed)
        })
      }
    })
    return Array.from(finishes).slice(0, 8)
  }, [products])

  // Filtering products
  const filteredProducts = useMemo(() => {
    let list = products.slice()

    // Department filter
    if (department !== 'all') {
      list = list.filter((item) => item.department?.toLowerCase() === department.toLowerCase())
    }

    // Search query
    if (showSearch && search) {
      const q = search.toLowerCase()
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.brand?.toLowerCase().includes(q)
      )
    }

    // Categories filter
    if (selectedCategories.length > 0) {
      list = list.filter((item) => selectedCategories.includes(item.category))
    }

    // Finish filter
    if (selectedFinishes.length > 0) {
      list = list.filter((item) =>
        selectedFinishes.some((f) => item.finish?.toLowerCase().includes(f.toLowerCase()))
      )
    }

    return list
  }, [products, department, showSearch, search, selectedCategories, selectedFinishes])

  // Sorting products
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts]
    switch (sortType) {
      case 'low-high':
        return sorted.sort((a, b) => a.price - b.price)
      case 'high-low':
        return sorted.sort((a, b) => b.price - a.price)
      default:
        return sorted
    }
  }, [filteredProducts, sortType])

  // Infinite Scroll slice
  const [displayedCount, setDisplayedCount] = useState(12)
  const { ref, inView } = useInView({ threshold: 0.1 })

  useEffect(() => {
    if (inView && displayedCount < sortedProducts.length) {
      setDisplayedCount((prev) => prev + 12)
    }
  }, [inView, sortedProducts.length, displayedCount])

  useEffect(() => {
    setDisplayedCount(12)
  }, [department, selectedCategories, selectedFinishes, sortType])

  const currentBatch = sortedProducts.slice(0, displayedCount)

  return (
    <div className="w-full pt-6 sm:pt-10 pb-20">
      {/* Department Tabs Banner */}
      <div className="mb-4 bg-stone-100 p-1.5 rounded-2xl flex flex-wrap gap-1 max-w-2xl mx-auto shadow-xs border border-stone-200">
        {[
          { id: 'all', label: 'All Catalogs' },
          { id: 'furniture', label: '🛋️ Furniture' },
          { id: 'hardware', label: '🪵 Hardware' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleDepartmentChange(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center whitespace-nowrap ${
              department === tab.id
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Information Alert Bar */}
      <div className="mb-8 max-w-2xl mx-auto text-center">
        {department === 'furniture' && (
          <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 py-2 px-4 rounded-xl font-medium inline-block">
            🔨 <strong>Furniture (On-Demand Build):</strong> Minimum 10 to 15 days handcrafting period. We have 30+ years of experience — trust our quality and service. Use it and then believe us! Have a custom photo from Pinterest/Instagram? We can build it!
          </p>
        )}
        {department === 'hardware' && (
          <p className="text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 py-2 px-4 rounded-xl font-medium inline-block">
            ⚡ <strong>Hardware (Ready Stock):</strong> Plywood, Sunmica, and architectural hardware components in stock for immediate site dispatch.
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden w-full flex items-center justify-between pb-4 border-b">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-semibold"
          >
            <Filter className="w-4 h-4" />
            <span>{showMobileFilter ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          <span className="text-xs text-gray-500 font-medium">
            {sortedProducts.length} items found
          </span>
        </div>

        {/* Left Filter Sidebar */}
        <aside
          className={`w-full lg:w-64 bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-6 flex-shrink-0 ${
            showMobileFilter ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Refine Search
              </span>
            </div>

            {(selectedCategories.length > 0 || selectedFinishes.length > 0) && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-rose-600 hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Dynamic Categories Filter */}
          <div>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
              Categories
            </p>

            {loadingCategories ? (
              <div className="text-xs text-gray-400">Loading categories...</div>
            ) : categoriesList.length === 0 ? (
              <p className="text-xs text-gray-400">No categories found.</p>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs text-gray-600">
                {categoriesList.map((cat) => (
                  <label
                    key={cat._id}
                    className="flex items-center gap-2.5 cursor-pointer hover:text-black select-none"
                  >
                    <input
                      type="checkbox"
                      value={cat.name}
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => toggleCategory(cat.name)}
                      className="w-3.5 h-3.5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                    />
                    <span className="truncate">{cat.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Finish Filter (Especially valuable for Hardware) */}
          {availableFinishes.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                Finish & Coating
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs text-gray-600">
                {availableFinishes.map((finish, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2.5 cursor-pointer hover:text-black select-none"
                  >
                    <input
                      type="checkbox"
                      value={finish}
                      checked={selectedFinishes.includes(finish)}
                      onChange={() => toggleFinish(finish)}
                      className="w-3.5 h-3.5 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                    />
                    <span className="truncate">{finish}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Product Grid */}
        <main className="flex-1 w-full space-y-6">
          {/* Top Bar: Title & Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                {department === 'hardware'
                  ? 'Architectural Hardware Collection'
                  : department === 'furniture'
                  ? 'Designer Furniture Collection'
                  : 'All Collections'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Showing {sortedProducts.length} curated products
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-gray-400 font-medium hidden sm:inline">Sort by:</span>
              <select
                onChange={(e) => setSortType(e.target.value)}
                value={sortType}
                className="text-xs font-semibold bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="relevant">Featured & Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategories.length > 0 || selectedFinishes.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Active:</span>
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 text-xs bg-stone-900 text-white px-2.5 py-1 rounded-full font-medium"
                >
                  {cat}
                  <button onClick={() => toggleCategory(cat)}>
                    <X className="w-3 h-3 hover:text-rose-400" />
                  </button>
                </span>
              ))}
              {selectedFinishes.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 text-xs bg-emerald-700 text-white px-2.5 py-1 rounded-full font-medium"
                >
                  {f}
                  <button onClick={() => toggleFinish(f)}>
                    <X className="w-3 h-3 hover:text-rose-400" />
                  </button>
                </span>
              ))}
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 font-semibold hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center space-y-3">
              <p className="text-base font-semibold text-gray-800">No products found</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No items match your active filters. Try clearing some filters or searching for another keyword.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 text-xs font-bold text-rose-600 underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {currentBatch.map((item) => (
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

          {/* Infinite Scroll Trigger */}
          {displayedCount < sortedProducts.length && (
            <div ref={ref} className="h-20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-900 border-t-transparent" />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Collection
