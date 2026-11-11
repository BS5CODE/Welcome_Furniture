import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { FolderPlus, Trash2, Plus, Layers, Filter, CheckCircle2 } from 'lucide-react'

const Categories = ({ token }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [departmentFilter, setDepartmentFilter] = useState('all')

  // Form state
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('furniture')
  const [subcategories, setSubcategories] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true)
    try {
      const response = await axios.get(backendUrl + '/api/category/list')
      if (response.data.success) {
        setCategories(response.data.categories)
      } else {
        toast.error(response.data.message || 'Failed to fetch categories')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Error loading categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Handle category addition
  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Please enter a category name')
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        name: name.trim(),
        department,
        subcategories: subcategories
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      }

      const response = await axios.post(backendUrl + '/api/category/add', payload, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success(`Category "${name}" added successfully!`)
        setName('')
        setSubcategories('')
        await fetchCategories()
      } else {
        toast.error(response.data.message || 'Failed to add category')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Error adding category')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle category deletion
  const handleDeleteCategory = async (id, catName) => {
    if (!window.confirm(`Are you sure you want to delete category "${catName}"?`)) {
      return
    }

    try {
      const response = await axios.post(
        backendUrl + '/api/category/remove',
        { id, name: catName },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(`Category "${catName}" removed`)
        await fetchCategories()
      } else {
        toast.error(response.data.message || 'Failed to delete category')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Error removing category')
    }
  }

  // Filtered list
  const filteredCategories = (categories || []).filter((cat) => {
    if (!cat) return false
    if (departmentFilter === 'all') return true
    return cat.department?.toLowerCase() === departmentFilter.toLowerCase()
  })

  const furnitureCount = (categories || []).filter((c) => c && c.department === 'furniture').length
  const hardwareCount = (categories || []).filter((c) => c && c.department === 'hardware').length

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
            Dynamic Category Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Create, edit, and organize product categories for Furniture and Architectural Hardware without code changes.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs">
            🛋️ {furnitureCount} Furniture Categories
          </span>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs">
            🔩 {hardwareCount} Hardware Categories
          </span>
        </div>
      </div>

      {/* Main Grid: Form on Left/Top, List on Right/Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Create Category Card */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm sticky top-24">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <FolderPlus className="w-5 h-5 text-gray-700" />
            <h2 className="font-semibold text-gray-900 text-base">Add New Category</h2>
          </div>

          <form onSubmit={handleAddCategory} className="space-y-4">
            {/* Department Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Department
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDepartment('furniture')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                    department === 'furniture'
                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  🛋️ Furniture
                </button>
                <button
                  type="button"
                  onClick={() => setDepartment('hardware')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                    department === 'hardware'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  🔩 Hardware
                </button>
              </div>
            </div>

            {/* Category Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Category Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={department === 'hardware' ? 'e.g. Mortise Handles' : 'e.g. Recliner Sofas'}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                required
              />
            </div>

            {/* Subcategories */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Subcategories <span className="text-gray-400 font-normal">(Comma-separated)</span>
              </label>
              <textarea
                value={subcategories}
                onChange={(e) => setSubcategories(e.target.value)}
                placeholder="e.g. Profile Handles, Flush Pulls, Rose Handles"
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Enter subcategories separated by commas for finer filtering.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-800 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'Creating...' : 'Create Category'}</span>
            </button>
          </form>
        </div>

        {/* Existing Categories List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white p-3 rounded-xl border border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <span>Filter:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'furniture', label: '🛋️ Furniture' },
                  { id: 'hardware', label: '🪵 Hardware' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setDepartmentFilter(tab.id)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      departmentFilter === tab.id
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-gray-500 font-medium mr-2">
              Showing {filteredCategories.length} categories
            </span>
          </div>

          {/* Categories Grid */}
          {loading ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 text-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-black border-t-transparent mx-auto mb-3"></div>
              Loading categories...
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 text-sm">
              No categories found for this department. Create one using the form.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredCategories.map((cat) => (
                <div
                  key={cat._id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            cat.department === 'hardware'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {cat.department === 'hardware' ? 'Hardware' : 'Furniture'}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mt-1.5">{cat.name}</h3>
                    </div>

                    <button
                      onClick={() => handleDeleteCategory(cat._id, cat.name)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-80 group-hover:opacity-100"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
                      {cat.subcategories.map((sub, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-md font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories
