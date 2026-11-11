import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Upload, Plus, Layers, ShieldCheck, Sparkles, X } from 'lucide-react'

const Add = ({ token }) => {
  // Images
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  // Core Fields
  const [department, setDepartment] = useState('furniture')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('10')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [bestseller, setBestseller] = useState(false)

  // Hardware-Specific Pricing & Dimensions
  const [pricingUnit, setPricingUnit] = useState('piece') // 'sqft' | 'sheet' | 'piece'
  const [ratePerSqFt, setRatePerSqFt] = useState('')
  const [thickness, setThickness] = useState('')
  const [sheetSize, setSheetSize] = useState('8 ft x 4 ft (32 Sq.Ft)')
  const [leadTime, setLeadTime] = useState('Min. 10 to 14 Days On-Demand Handcrafting')
  const [guarantee, setGuarantee] = useState('30+ Years of Experience: Trust Our Quality & Service')

  // Dynamic Hardware & Furniture Attributes
  const [material, setMaterial] = useState('')
  const [finish, setFinish] = useState('')
  const [dimension, setDimension] = useState('')
  const [qualityAssurance, setQualityAssurance] = useState('')
  const [brand, setBrand] = useState('')

  // Categories list loaded from backend
  const [categoriesList, setCategoriesList] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [subcategoriesList, setSubcategoriesList] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch dynamic categories when department changes
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      try {
        const targetUrl = backendUrl || 'http://localhost:4000'
        const response = await axios.get(`${targetUrl}/api/category/list?department=${department}`)
        if (response.data.success && response.data.categories) {
          setCategoriesList(response.data.categories)
          if (response.data.categories.length > 0) {
            const firstCat = response.data.categories[0]
            setCategory(firstCat.name)
            setSubcategoriesList(firstCat.subcategories || [])
            setSubcategory(firstCat.subcategories?.[0] || '')
          } else {
            setCategory('')
            setSubcategoriesList([])
            setSubcategory('')
          }
        }
      } catch (error) {
        console.error('Failed to load categories:', error)
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()

    // Auto-update defaults based on department
    if (department === 'hardware') {
      setBrand('Welcome Enterprise')
      setPricingUnit('sqft')
      setLeadTime('Ready Stock • Fast Dispatch')
      setGuarantee('Quality Tested • 30 Years Trust')
    } else {
      setBrand('Welcome Enterprise')
      setPricingUnit('piece')
      setLeadTime('Min. 10 to 14 Days On-Demand Handcrafting')
      setGuarantee('30+ Years of Experience: Trust Our Quality & Service')
    }
  }, [department])

  // When category changes, update available subcategories
  const handleCategoryChange = (e) => {
    const selectedCatName = e.target.value
    setCategory(selectedCatName)
    const foundCat = categoriesList.find((c) => c.name === selectedCatName)
    if (foundCat && foundCat.subcategories?.length > 0) {
      setSubcategoriesList(foundCat.subcategories)
      setSubcategory(foundCat.subcategories[0])
    } else {
      setSubcategoriesList([])
      setSubcategory('')
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!category) {
      toast.error('Please select or create a category first')
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('department', department)
      formData.append('category', category)
      formData.append('subcategory', subcategory)
      formData.append('stock', stock)
      formData.append('sku', sku || `${department === 'hardware' ? 'WH' : 'WF'}-${Date.now().toString().slice(-6)}`)
      formData.append('bestseller', bestseller)

      // Pricing & Specs
      formData.append('pricingUnit', pricingUnit)
      formData.append('ratePerSqFt', ratePerSqFt || 0)
      formData.append('thickness', thickness)
      formData.append('sheetSize', sheetSize)
      formData.append('leadTime', leadTime)
      formData.append('guarantee', guarantee)

      // Hardware & Furniture Attributes
      formData.append('material', material)
      formData.append('finish', finish)
      formData.append('dimension', dimension)
      formData.append('qualityAssurance', qualityAssurance)
      formData.append('brand', brand)

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const targetUrl = backendUrl || 'http://localhost:4000'
      const response = await axios.post(targetUrl + '/api/product/add', formData, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success(response.data.message || 'Product Added Successfully!')
        setName('')
        setDescription('')
        setPrice('')
        setRatePerSqFt('')
        setThickness('')
        setStock('10')
        setSku('')
        setMaterial('')
        setFinish('')
        setDimension('')
        setQualityAssurance('')
        setBestseller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl space-y-8 pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <Plus className="w-6 h-6 text-rose-500" />
          Add New Product
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Add furniture or architectural hardware items with dynamic categories and custom specifications.
        </p>
      </div>

      {/* 1. Department Selection (Pill switcher) */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
          Step 1: Choose Product Department
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setDepartment('furniture')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3.5 ${
              department === 'furniture'
                ? 'border-blue-600 bg-blue-50/60 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <span className="text-2xl p-2 bg-blue-100 rounded-lg">🛋️</span>
            <div>
              <p className="font-bold text-gray-900 text-sm">Furniture</p>
              <p className="text-xs text-gray-500 mt-0.5">100% On-Demand • Min. 10 Days • 30+ Years Experience</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setDepartment('hardware')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3.5 ${
              department === 'hardware'
                ? 'border-emerald-600 bg-emerald-50/60 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <span className="text-2xl p-2 bg-emerald-100 rounded-lg">🪵</span>
            <div>
              <p className="font-bold text-gray-900 text-sm">Hardware</p>
              <p className="text-xs text-gray-500 mt-0.5">Ready to Dispatch • Plywood, Sunmica & Hardware Fittings</p>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Image Upload Card */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Step 2: Upload Images <span className="text-gray-400 font-normal">(Up to 4 angles)</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
          {[
            { img: image1, set: setImage1, id: 'image1' },
            { img: image2, set: setImage2, id: 'image2' },
            { img: image3, set: setImage3, id: 'image3' },
            { img: image4, set: setImage4, id: 'image4' }
          ].map((slot, index) => (
            <div key={slot.id} className="relative group">
              <label
                htmlFor={slot.id}
                className={`flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden ${
                  slot.img
                    ? 'border-gray-300 bg-stone-50'
                    : 'border-gray-300 hover:border-rose-400 hover:bg-rose-50/20 bg-gray-50'
                }`}
              >
                {slot.img ? (
                  <img
                    className="w-full h-full object-cover"
                    src={URL.createObjectURL(slot.img)}
                    alt={`Preview ${index + 1}`}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-rose-500 mb-1.5 transition-colors" />
                    <span className="text-xs font-semibold text-gray-600">Upload {index + 1}</span>
                    <span className="text-[10px] text-gray-400">PNG, JPG</span>
                  </div>
                )}
                <input
                  onChange={(e) => slot.set(e.target.files[0])}
                  type="file"
                  id={slot.id}
                  accept="image/*"
                  hidden
                />
              </label>

              {slot.img && (
                <button
                  type="button"
                  onClick={() => slot.set(false)}
                  className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-black text-white rounded-full text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. General Information */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Step 3: Core Product Information
        </label>

        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1">
            Product Title <span className="text-rose-500">*</span>
          </p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
            type="text"
            placeholder={
              department === 'hardware'
                ? 'e.g. Matte Black Solid Brass Concealed Profile Handle'
                : 'e.g. Royal Velvet 3-Seater Luxury Sofa'
            }
            required
          />
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1">
            Description <span className="text-rose-500">*</span>
          </p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={4}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
            placeholder="Detailed specifications, craftsmanship details, application areas, and packaging details..."
            required
          />
        </div>

        {/* Dynamic Category & Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-gray-700">
                Dynamic Category <span className="text-rose-500">*</span>
              </p>
              <Link
                to="/categories"
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Add New
              </Link>
            </div>

            {loadingCategories ? (
              <div className="text-xs text-gray-400 py-2">Loading categories...</div>
            ) : (
              <select
                onChange={handleCategoryChange}
                value={category}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black bg-white"
                required
              >
                {categoriesList.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">Subcategory (Optional)</p>
            {subcategoriesList.length > 0 ? (
              <select
                onChange={(e) => setSubcategory(e.target.value)}
                value={subcategory}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black bg-white"
              >
                {subcategoriesList.map((sub, i) => (
                  <option key={i} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="e.g. Standard, Luxury"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              />
            )}
          </div>
        </div>

        {/* Department-Specific Pricing & Dimension Helpers */}
        {department === 'hardware' ? (
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                🪵 Hardware Pricing & Sheet Configuration
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">
                Standard 8x4 ft Sheet = 32 Sq.Ft
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">Pricing Unit</label>
                <select
                  value={pricingUnit}
                  onChange={(e) => setPricingUnit(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-emerald-300 rounded-lg bg-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="sqft">Sq.Ft (Rate per Sq.Ft - Plywood)</option>
                  <option value="sheet">Per Sheet (Sunmica / Full Board)</option>
                  <option value="piece">Per Piece / Pair (Hardware & Fittings)</option>
                </select>
              </div>

              {pricingUnit === 'sqft' ? (
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 mb-1">
                    Rate per Sq.Ft (₹) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={ratePerSqFt}
                    onChange={(e) => {
                      const val = e.target.value
                      setRatePerSqFt(val)
                      if (val) {
                        const sheetCalc = Math.round(Number(val) * 32)
                        setPrice(sheetCalc.toString())
                      }
                    }}
                    placeholder="e.g. 78.05"
                    className="w-full px-3 py-2 text-xs border border-emerald-300 rounded-lg bg-white font-bold text-emerald-800 focus:outline-none focus:border-emerald-500"
                  />
                  {ratePerSqFt && (
                    <p className="text-[10px] text-emerald-700 mt-1 font-semibold">
                      Auto-filled 8x4 Sheet Price: ₹{Math.round(Number(ratePerSqFt) * 32)}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 mb-1">
                    Sheet Size / Format
                  </label>
                  <input
                    type="text"
                    value={sheetSize}
                    onChange={(e) => setSheetSize(e.target.value)}
                    placeholder="e.g. 8 ft x 4 ft (Standard Sheet)"
                    className="w-full px-3 py-2 text-xs border border-emerald-300 rounded-lg bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">Thickness</label>
                <input
                  type="text"
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  placeholder="e.g. 18 MM / 12 MM / 0.8 MM"
                  className="w-full px-3 py-2 text-xs border border-emerald-300 rounded-lg bg-white"
                />
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {['18 MM', '12 MM', '25 MM', '09 MM', '06 MM', '0.8 MM', '1.0 MM'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setThickness(t)}
                      className="text-[9px] bg-white border border-emerald-200 px-1.5 py-0.5 rounded text-emerald-800 hover:bg-emerald-100"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              🛋️ Furniture Configuration (100% On-Demand)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-amber-900 mb-1">Lead Time</label>
                <input
                  type="text"
                  value={leadTime}
                  onChange={(e) => setLeadTime(e.target.value)}
                  placeholder="e.g. Min. 10 to 14 Days On-Demand Handcrafting"
                  className="w-full px-3 py-2 text-xs border border-amber-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-amber-900 mb-1">Quality Assurance & Trust</label>
                <input
                  type="text"
                  value={guarantee}
                  onChange={(e) => setGuarantee(e.target.value)}
                  placeholder="e.g. 30+ Years of Experience: Trust Our Quality & Service"
                  className="w-full px-3 py-2 text-xs border border-amber-300 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Pricing, Stock & SKU */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">
              Price (₹) <span className="text-rose-500">*</span>
            </p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              type="number"
              placeholder="e.g. 1299"
              min={0}
              required
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">Inventory Stock</p>
            <input
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              type="number"
              placeholder="e.g. 50"
              min={0}
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">SKU / Code</p>
            <input
              onChange={(e) => setSku(e.target.value)}
              value={sku}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              type="text"
              placeholder={department === 'hardware' ? 'e.g. WH-HDL-01' : 'e.g. WF-SOF-01'}
            />
          </div>
        </div>
      </div>

      {/* 4. Hardware / Furniture Configurable Attributes */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Step 4: {department === 'hardware' ? 'Hardware Technical Specs' : 'Furniture Craftsmanship Specs'}
            </label>
            <p className="text-xs text-gray-500 mt-0.5">
              These attributes display prominently on the product page and power smart filtering.
            </p>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              department === 'hardware'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {department === 'hardware' ? 'Hardware Spec Mode' : 'Furniture Spec Mode'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Material */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">
              Material <span className="text-rose-500">*</span>
            </p>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder={
                department === 'hardware'
                  ? 'e.g. Solid Virgin Brass (CuZn39Pb3) / Stainless Steel 304'
                  : 'e.g. Solid Teak Wood / BWP Marine Plywood'
              }
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              required
            />
          </div>

          {/* Finish */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">
              Finish / Color <span className="text-rose-500">*</span>
            </p>
            <input
              type="text"
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
              placeholder={
                department === 'hardware'
                  ? 'e.g. Electroplated Matte Black / Satin Gold / Rose Gold'
                  : 'e.g. Natural Teak Matte Polish / Smoked Walnut'
              }
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              required
            />
          </div>

          {/* Dimension */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">
              Dimensions / Size <span className="text-rose-500">*</span>
            </p>
            <input
              type="text"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              placeholder={
                department === 'hardware'
                  ? 'e.g. 160mm Hole-to-Hole (200mm Total) / 35mm Cup'
                  : 'e.g. 84"W x 35"D x 32"H (Seat Height: 18")'
              }
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              required
            />
          </div>

          {/* Quality Assurance */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">
              Quality Assurance / Testing <span className="text-rose-500">*</span>
            </p>
            <input
              type="text"
              value={qualityAssurance}
              onChange={(e) => setQualityAssurance(e.target.value)}
              placeholder={
                department === 'hardware'
                  ? 'e.g. Salt Spray Tested 480 Hours / 100,000 Cycles Certified'
                  : 'e.g. 30+ Years of Experience: Quality Assurance & Craftsmanship'
              }
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              required
            />
          </div>

          {/* Brand */}
          <div className="sm:col-span-2">
            <p className="text-xs font-semibold text-gray-700 mb-1">
              Manufacturer / Brand Grade <span className="text-rose-500">*</span>
            </p>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder={
                department === 'hardware'
                  ? 'e.g. Hafele Grade / Blum Standard / Welcome Hardware'
                  : 'e.g. Welcome Furniture Artisan Studio'
              }
              className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              required
            />
          </div>
        </div>
      </div>

      {/* 5. Badges & Submission */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-rose-500 focus:ring-rose-400"
          />
          <div>
            <span className="text-sm font-semibold text-gray-800">Feature in Bestsellers</span>
            <p className="text-xs text-gray-400">Display in the homepage Bestsellers and trending carousel</p>
          </div>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isSubmitting ? 'Publishing Product...' : 'Publish Product'}</span>
        </button>
      </div>
    </form>
  )
}

export default Add
