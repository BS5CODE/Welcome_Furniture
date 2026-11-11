import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, CheckCircle2, Phone, MessageSquare, FileText, ArrowRight, Layers, Sparkles } from 'lucide-react'

const plywoodGrades = [
  {
    id: '18mm_semi_ultra',
    name: '18 MM SEMI ULTRA',
    brand: 'OKUMA DIP Ultra (FND)',
    series: 'The Okuma Dip Collection (Premium Grade)',
    ratePerSqFt: 78.05,
    popular: true,
    desc: 'BWP Marine Grade - Ideal for Kitchens, Wardrobes & Heavy-duty cabinets'
  },
  {
    id: '12mm_semi_ultra',
    name: '12 MM SEMI ULTRA',
    brand: 'OKUMA DIP Ultra (FND)',
    series: 'The Okuma Dip Collection (Premium Grade)',
    ratePerSqFt: 58.81,
    popular: true,
    desc: 'Heavy-Duty Marine Core for Panels, Partitions & Shelving'
  },
  {
    id: '25mm_board',
    name: '25 MM BOARD (Blockboard)',
    brand: 'OKUMA DIP Blockboard (FND)',
    series: 'The Okuma Dip Collection (Premium Grade)',
    ratePerSqFt: 96.33,
    popular: false,
    desc: 'Premium Solid Blockboard for Long Spans, Table Tops & Heavy Shutters'
  },
  {
    id: '09mm_semi_alt',
    name: '09 MM SEMI ALT',
    brand: 'OKUMA DIP (FND)',
    series: 'The Okuma Dip Collection (Premium Grade)',
    ratePerSqFt: 48.04,
    popular: false,
    desc: 'Back Panels, Drawer Bottoms & False Ceilings'
  },
  {
    id: '06mm_semi_alt',
    name: '06 MM SEMI ALT',
    brand: 'OKUMA DIP (FND)',
    series: 'The Okuma Dip Collection (Premium Grade)',
    ratePerSqFt: 35.86,
    popular: false,
    desc: 'Flexible & Lining Marine Grade Plywood'
  },
  {
    id: '18mm_rubin_club',
    name: '18 MM Standard Finish',
    brand: 'Rubin Club',
    series: 'Commercial & Standard Series',
    ratePerSqFt: 67.59,
    popular: false,
    desc: 'Commercial Standard MR Grade for Residential Furniture'
  },
  {
    id: '18mm_pli_power',
    name: '18 MM Commercial Core',
    brand: 'PLI Power',
    series: 'Commercial & Standard Series',
    ratePerSqFt: 59.36,
    popular: false,
    desc: 'Value Commercial Grade for General Carpentry'
  },
  {
    id: '12mm_rubin_club',
    name: '12 MM Standard Finish',
    brand: 'Rubin Club',
    series: 'Commercial & Standard Series',
    ratePerSqFt: 49.28,
    popular: false,
    desc: 'Standard commercial interior core'
  },
  {
    id: '12mm_pli_power',
    name: '12 MM Commercial Core',
    brand: 'PLI Power',
    series: 'Commercial & Standard Series',
    ratePerSqFt: 42.94,
    popular: false,
    desc: 'Value commercial interior sheet'
  }
]

const PlywoodCalculator = () => {
  const [selectedGradeId, setSelectedGradeId] = useState('18mm_semi_ultra')
  const [calcMode, setCalcMode] = useState('sheets') // 'sheets' or 'sqft'
  const [sheetCount, setSheetCount] = useState(5)
  const [customSqFt, setCustomSqFt] = useState(160)
  const [includeSunmica, setIncludeSunmica] = useState(false)
  const [sunmicaSheets, setSunmicaSheets] = useState(5)
  const [showChartModal, setShowChartModal] = useState(false)

  const selectedGrade = plywoodGrades.find(g => g.id === selectedGradeId) || plywoodGrades[0]

  // Standard 8x4 sheet = 32 sq.ft
  const totalSqFt = calcMode === 'sheets' ? sheetCount * 32 : Math.max(0, Number(customSqFt) || 0)
  const calculatedSheets = calcMode === 'sheets' ? sheetCount : (totalSqFt / 32).toFixed(1)

  const plywoodTotal = Math.round(totalSqFt * selectedGrade.ratePerSqFt)

  // WhatsApp Quote Link
  const waMsg = encodeURIComponent(
    `Hello Welcome Enterprise (Sanjay Sharma)! I used your Plywood Rate Estimator on your website:\n\n` +
    `• Plywood Grade: ${selectedGrade.name} (${selectedGrade.brand})\n` +
    `• Rate: ₹${selectedGrade.ratePerSqFt}/sq.ft\n` +
    `• Total Sq.Ft: ${totalSqFt} sq.ft (${calculatedSheets} sheets)\n` +
    `• Plywood Cost: ₹${plywoodTotal.toLocaleString()}\n` +
    (includeSunmica ? `• Sunmica Requirement: Yes (${sunmicaSheets} sheets - please share available shades & rates)\n` : '') +
    `• ESTIMATED PLYWOOD TOTAL: ₹${plywoodTotal.toLocaleString()}\n\n` +
    `Please confirm ready stock availability and dispatch time at Vadodara.`
  )
  const waUrl = `https://wa.me/918128374219?text=${waMsg}`

  return (
    <section className="py-8 sm:py-12 md:py-20 px-2 sm:px-6 container mx-auto">
      <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-14 shadow-2xl border border-stone-800 relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Direct Mill Rate Estimator • Ready Stock
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight">
              Plywood & Sunmica Rate Calculator
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-2xl font-light">
              Calculate exact material costs instantly using Welcome Enterprise's official fixed retail rate chart. Transparent rates per sq.ft with 8x4 sheet estimates and instant WhatsApp booking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChartModal(true)}
              className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold border border-stone-700 transition"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>View Official Rate Chart</span>
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column: Grade Selector & Dimensions (8 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Grade */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block mb-3">
                1. Select Plywood Grade & Thickness
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                {plywoodGrades.map((grade) => {
                  const isSelected = selectedGradeId === grade.id
                  const sheetPrice = Math.round(grade.ratePerSqFt * 32)
                  return (
                    <button
                      key={grade.id}
                      onClick={() => setSelectedGradeId(grade.id)}
                      className={`text-left p-3.5 rounded-xl border transition cursor-pointer relative ${
                        isSelected
                          ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500/50'
                          : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800/80'
                      }`}
                    >
                      {grade.popular && (
                        <span className="absolute top-2 right-2 bg-amber-400/20 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                          Popular
                        </span>
                      )}
                      <div className="font-bold text-sm text-stone-100">{grade.name}</div>
                      <div className="text-[11px] text-stone-400 mt-0.5">{grade.brand}</div>
                      <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-stone-800/60">
                        <span className="text-emerald-400 font-extrabold text-sm">
                          ₹{grade.ratePerSqFt.toFixed(2)} <span className="text-[10px] text-stone-400 font-normal">/ sq.ft</span>
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          ≈ ₹{sheetPrice.toLocaleString()} / sheet
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Quantity Mode */}
            <div className="bg-stone-900/60 border border-stone-800 p-4 sm:p-5 rounded-2xl space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block">
                2. Enter Required Quantity
              </label>

              <div className="flex gap-2">
                <button
                  onClick={() => setCalcMode('sheets')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition ${
                    calcMode === 'sheets'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  By Standard 8x4 Sheets (32 sq ft/sheet)
                </button>
                <button
                  onClick={() => setCalcMode('sqft')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition ${
                    calcMode === 'sqft'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  By Total Square Feet (Sq.Ft)
                </button>
              </div>

              {calcMode === 'sheets' ? (
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
                    <span>Number of 8x4 Sheets:</span>
                    <span className="font-bold text-base text-emerald-400">{sheetCount} Sheets ({sheetCount * 32} sq.ft)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={sheetCount}
                    onChange={(e) => setSheetCount(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>1 Sheet</span>
                    <span>10 Sheets</span>
                    <span>25 Sheets</span>
                    <span>50 Sheets</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs text-stone-300 block mb-1.5">Enter Total Square Feet:</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={customSqFt}
                      onChange={(e) => setCustomSqFt(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                      placeholder="e.g. 160"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-stone-400 font-medium">Sq.Ft</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1.5">
                    Equivalent to ≈ {(totalSqFt / 32).toFixed(1)} standard (8x4 ft) sheets
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Sunmica / Laminate Add-on */}
            <div className="bg-stone-900/60 border border-stone-800 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSunmica}
                    onChange={(e) => setIncludeSunmica(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-200">
                    Include Sunmica / Laminate Sheets with Order
                  </span>
                </label>
                <p className="text-[11px] text-stone-400 mt-1 ml-6">
                  Ready stock designer white liner & textured laminates (8x4 ft). Shades & catalogue pricing confirmed on WhatsApp.
                </p>
              </div>

              {includeSunmica && (
                <div className="flex items-center gap-2 self-end sm:self-auto ml-6 sm:ml-0">
                  <span className="text-xs text-stone-400">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={sunmicaSheets}
                    onChange={(e) => setSunmicaSheets(Math.max(1, Number(e.target.value) || 1))}
                    className="w-16 bg-stone-950 border border-stone-700 rounded-lg px-2 py-1.5 text-center text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-xs font-bold text-amber-300">Sheets</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Estimate & Instant WhatsApp Order (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-stone-950 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-7 flex flex-col h-full shadow-2xl relative">
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full self-start mb-4">
                <Sparkles className="w-3 h-3" />
                Live Order Estimate
              </div>

              <h3 className="text-xl font-bold font-serif text-white mb-4">
                Summary of Selected Materials
              </h3>

              <div className="space-y-3.5 text-xs text-stone-300 pb-5 border-b border-stone-800">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-stone-100">{selectedGrade.name}</div>
                    <div className="text-[11px] text-stone-400">{selectedGrade.brand}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">₹{plywoodTotal.toLocaleString()}</div>
                    <div className="text-[10px] text-stone-400">
                      {totalSqFt} sq.ft @ ₹{selectedGrade.ratePerSqFt.toFixed(2)}
                    </div>
                  </div>
                </div>

                {includeSunmica && (
                  <div className="flex justify-between items-start pt-2 border-t border-stone-800/60">
                    <div>
                      <div className="font-bold text-stone-100">Sunmica / Laminates</div>
                      <div className="text-[11px] text-stone-400">{sunmicaSheets} sheets requested</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-stone-300">Catalogue Rates</div>
                      <div className="text-[10px] text-stone-400">Rate based on shade</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="py-5 border-b border-stone-800">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase font-bold text-stone-400">Estimated Plywood Total:</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                      ₹{plywoodTotal.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-stone-400">Fixed rate per official chart</span>
                  </div>
                </div>
              </div>

              {/* Vadodara Trust Points */}
              <div className="py-4 space-y-2 text-[11px] text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span><strong>Ready Stock Vadodara:</strong> Same-day / Next-day dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span><strong>100% Genuine Quality Assurance:</strong> No commercial mix-up</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span><strong>Cutting & Delivery Support:</strong> Available on call</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto pt-4 space-y-2.5">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition duration-200 shadow-xl shadow-emerald-950/40"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book This Estimate via WhatsApp</span>
                </a>

                <div className="flex items-center justify-center gap-2 text-stone-400 text-[11px]">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>WhatsApp / Direct Line: </span>
                  <a href="tel:8128374219" className="text-white font-bold hover:underline">
                    +91 81283 74219
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Rate Sheet Modal */}
      {showChartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-bold text-base sm:text-lg text-white">
                Welcome Enterprise • Official Plywood Rate Chart
              </h3>
              <button
                onClick={() => setShowChartModal(false)}
                className="text-stone-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>
            <div className="overflow-y-auto mt-4 rounded-xl border border-stone-800 flex justify-center bg-white p-2">
              <img
                src="/assets/plywood_rate_chart.jpg"
                alt="Welcome Enterprise Premium Plywood Rate Chart"
                className="max-h-[70vh] object-contain"
              />
            </div>
            <div className="mt-4 pt-3 border-t border-stone-800 flex justify-between items-center text-xs text-stone-400">
              <span>Shop No. 2, Vallabh Nagar Complex, Tarsali, Vadodara</span>
              <a
                href="/assets/plywood_rate_chart.jpg"
                target="_blank"
                rel="noreferrer"
                download="Welcome_Enterprise_Plywood_Rate_Chart.jpg"
                className="text-emerald-400 font-bold hover:underline"
              >
                Download Chart Image
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PlywoodCalculator
