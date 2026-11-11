import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { Edit3, Trash2, Search, Filter, X, Check, Package, Sparkles } from 'lucide-react'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null)
  const [productNameToDelete, setProductNameToDelete] = useState('')

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [categoriesList, setCategoriesList] = useState([])

  // Fetch the list of products
  const fetchList = async () => {
    setLoading(true)
    try {
      const targetUrl = backendUrl || 'http://localhost:4000'
      const response = await axios.get(targetUrl + '/api/product/list')
      if (response.data.success) {
        const prods = Array.isArray(response.data.products) ? response.data.products : []
        setList(prods.slice().reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Error loading products')
    } finally {
      setLoading(false)
    }
  }

  // Fetch categories when opening edit modal
  const fetchCategoriesForEdit = async (dept) => {
    try {
      const response = await axios.get(`${backendUrl}/api/category/list?department=${dept}`)
      if (response.data.success) {
        setCategoriesList(response.data.categories || [])
      }
    } catch (e) {
      console.error('Failed to load categories for edit:', e)
    }
  }

  // Handle product deletion
  const removeProduct = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id: productIdToDelete },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message || 'Product removed successfully')
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsDeleteModalOpen(false)
      setProductIdToDelete(null)
    }
  }

  const handleDeleteClick = (item) => {
    setProductIdToDelete(item._id)
    setProductNameToDelete(item.name)
    setIsDeleteModalOpen(true)
  }

  // Open Edit Modal
  const handleEditClick = (item) => {
    setEditingProduct({
      id: item._id,
      name: item.name || '',
      description: item.description || '',
      price: item.price || '',
      ratePerSqFt: item.ratePerSqFt || '',
      pricingUnit: item.pricingUnit || '',
      thickness: item.thickness || '',
      sheetSize: item.sheetSize || '',
      guarantee: item.guarantee || '',
      leadTime: item.leadTime || '',
      stock: item.stock !== undefined ? item.stock : 10,
      sku: item.sku || '',
      department: item.department || 'furniture',
      category: item.category || '',
      material: item.material || '',
      finish: item.finish || '',
      dimension: item.dimension || '',
      qualityAssurance: item.qualityAssurance || '',
      brand: item.brand || '',
      bestseller: Boolean(item.bestseller)
    })
    fetchCategoriesForEdit(item.department || 'furniture')
    setIsEditModalOpen(true)
  }

  // Handle Edit Save
  const handleSaveEdit = async (e) => {
    e.preventDefault()
    setIsSavingEdit(true)
    try {
      const response = await axios.post(
        backendUrl + '/api/product/update',
        editingProduct,
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success('Product updated successfully!')
        setIsEditModalOpen(false)
        await fetchList()
      } else {
        toast.error(response.data.message || 'Update failed')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Error updating product')
    } finally {
      setIsSavingEdit(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  // Filtered products list
  const filteredProducts = (list || []).filter((item) => {
    if (!item) return false
    // Department filter
    if (departmentFilter !== 'all') {
      if (item.department?.toLowerCase() !== departmentFilter.toLowerCase()) return false
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchName = item.name?.toLowerCase().includes(q)
      const matchCat = item.category?.toLowerCase().includes(q)
      const matchBrand = item.brand?.toLowerCase().includes(q)
      const matchMaterial = item.material?.toLowerCase().includes(q)
      const matchFinish = item.finish?.toLowerCase().includes(q)
      const matchSku = item.sku?.toLowerCase().includes(q)
      return Boolean(matchName || matchCat || matchBrand || matchMaterial || matchFinish || matchSku)
    }
    return true
  })

  const furnitureCount = (list || []).filter((p) => p && p.department === 'furniture').length
  const hardwareCount = (list || []).filter((p) => p && p.department === 'hardware').length

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
            Product Catalog & Inventory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage your furniture & hardware products, inventory stock levels, and technical attributes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full">
            🛋️ {furnitureCount} Furniture Items
          </span>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full">
            🪵 {hardwareCount} Hardware Items
          </span>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-gray-200 shadow-sm">
        {/* Department Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg overflow-x-auto max-w-full">
          {[
            { id: 'all', label: `All (${list.length})` },
            { id: 'furniture', label: `🛋️ Furniture (${furnitureCount})` },
            { id: 'hardware', label: `🪵 Hardware (${hardwareCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDepartmentFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                departmentFilter === tab.id
                  ? 'bg-white text-gray-900 shadow-sm font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, SKU, brand, finish, or material..."
            className="w-full pl-9 pr-8 py-2 text-xs md:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-16 text-center text-gray-500 text-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-black border-t-transparent mx-auto mb-3"></div>
          Loading product inventory...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-16 text-center text-gray-500 text-sm">
          No products match your current search and department filter.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-3">Dept</th>
                  <th className="py-3 px-3">Category / Brand</th>
                  <th className="py-3 px-3">Key Specs (Material & Finish)</th>
                  <th className="py-3 px-3">Stock</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Item Image + Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={Array.isArray(item.image) ? (item.image[0] || 'https://via.placeholder.com/80') : (item.image || 'https://via.placeholder.com/80')}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate max-w-[220px]">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-400 font-mono">
                              {item.sku || 'NO-SKU'}
                            </span>
                            {item.bestseller && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                                <Sparkles className="w-2.5 h-2.5 text-amber-600" /> Best
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Department Badge */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          item.department === 'hardware'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {item.department === 'hardware' ? 'Hardware' : 'Furniture'}
                      </span>
                    </td>

                    {/* Category & Brand */}
                    <td className="py-3.5 px-3">
                      <p className="font-medium text-gray-800">{item.category}</p>
                      <p className="text-[11px] text-gray-400">{item.brand || 'Welcome'}</p>
                    </td>

                    {/* Specifications */}
                    <td className="py-3.5 px-3 max-w-[200px]">
                      <p className="truncate text-gray-700 font-medium">
                        {item.material || 'Standard Material'}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {item.finish ? `Finish: ${item.finish}` : ''}
                        {item.dimension ? ` • ${item.dimension}` : ''}
                      </p>
                    </td>

                    {/* Stock */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${
                          (item.stock || 0) > 0
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {(item.stock || 0) > 0 ? `${item.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-gray-900">
                        {currency}
                        {item.price?.toLocaleString()}
                      </span>
                      {Number(item.ratePerSqFt) > 0 && (
                        <span className="block text-[10px] text-emerald-700 font-bold">
                          ₹{item.ratePerSqFt} / sq.ft
                        </span>
                      )}
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Delete Product?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to delete <span className="font-semibold text-gray-800">"{productNameToDelete}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold transition"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition"
                onClick={removeProduct}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-2.5 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-auto max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-rose-500" />
                <h2 className="font-bold text-gray-900 text-sm sm:text-base">Edit Product</h2>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
              {/* Title & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Department & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
                  <select
                    value={editingProduct.department}
                    onChange={(e) => {
                      const newDept = e.target.value
                      setEditingProduct({ ...editingProduct, department: newDept })
                      fetchCategoriesForEdit(newDept)
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="furniture">🛋️ Furniture</option>
                    <option value="hardware">🔩 Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    {categoriesList.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hardware-Specific Pricing Helper in Edit Modal */}
              {editingProduct.department === 'hardware' && (
                <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-900 mb-1">
                      Rate per Sq.Ft (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingProduct.ratePerSqFt}
                      onChange={(e) => {
                        const val = e.target.value
                        const updated = { ...editingProduct, ratePerSqFt: val }
                        if (val) {
                          updated.price = Math.round(Number(val) * 32)
                        }
                        setEditingProduct(updated)
                      }}
                      placeholder="e.g. 78.05"
                      className="w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-emerald-900 mb-1">
                      Thickness
                    </label>
                    <input
                      type="text"
                      value={editingProduct.thickness}
                      onChange={(e) => setEditingProduct({ ...editingProduct, thickness: e.target.value })}
                      placeholder="e.g. 18 MM / 12 MM / 0.8 MM"
                      className="w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min={0}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min={0}
                  />
                </div>
              </div>

              {/* Material & Finish */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Material</label>
                  <input
                    type="text"
                    value={editingProduct.material}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Finish</label>
                  <input
                    type="text"
                    value={editingProduct.finish}
                    onChange={(e) => setEditingProduct({ ...editingProduct, finish: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Dimension & Brand */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Dimensions / Size</label>
                  <input
                    type="text"
                    value={editingProduct.dimension}
                    onChange={(e) => setEditingProduct({ ...editingProduct, dimension: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Quality Assurance */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Quality Assurance & Service (30+ Years Trust)</label>
                <input
                  type="text"
                  value={editingProduct.qualityAssurance}
                  onChange={(e) => setEditingProduct({ ...editingProduct, qualityAssurance: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Bestseller checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editBestseller"
                  checked={editingProduct.bestseller}
                  onChange={(e) => setEditingProduct({ ...editingProduct, bestseller: e.target.checked })}
                  className="w-4 h-4 text-rose-500 rounded"
                />
                <label htmlFor="editBestseller" className="text-xs font-semibold text-gray-700 cursor-pointer">
                  Feature as Bestseller
                </label>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex justify-end gap-2.5 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-semibold transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSavingEdit ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default List
