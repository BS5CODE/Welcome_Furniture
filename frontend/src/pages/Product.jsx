import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  MessageCircle, 
  Sparkles, 
  Camera, 
  Layers,
  Ruler,
  CheckCircle2
} from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [activeTab, setActiveTab] = useState("specifications");

  const fetchProductData = () => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setActiveImage(Array.isArray(found.image) ? found.image[0] : (found.image || ''));
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0);
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-stone-900 border-t-transparent mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading product details...</p>
      </div>
    );
  }

  const isHardware = productData.department === "hardware";
  const whatsAppNumber = "918128374219";
  const whatsAppMessage = encodeURIComponent(
    isHardware
      ? `Hello Welcome Enterprise! I am interested in purchasing: "${productData.name}" (Rate: ₹${productData.ratePerSqFt ? `${productData.ratePerSqFt}/sq ft, ₹${productData.price}/sheet` : `₹${productData.price}`}). Please confirm stock quantity & dispatch time at Vadodara.`
      : `Hello Welcome Enterprise! I am interested in custom commissioning: "${productData.name}". Could we discuss room dimensions, fabric/timber options, and on-demand build schedule?`
  );
  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`;

  return (
    <div className="w-full pt-4 sm:pt-8 pb-20">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link 
          to={`/collection?department=${productData.department || 'all'}`} 
          className="hover:text-black capitalize font-medium"
        >
          {isHardware ? 'Hardware' : 'Furniture'}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-semibold truncate max-w-xs">{productData.name}</span>
      </nav>

      {/* Main Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left: Image Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {Array.isArray(productData.image) && productData.image.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 flex-shrink-0">
              {productData.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square w-18 sm:w-full rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === img ? 'border-stone-950 shadow-md ring-2 ring-stone-900/10' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt={`${productData.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Hero Image */}
          <div className="flex-1 aspect-square sm:aspect-[4/3] lg:aspect-square bg-stone-50 rounded-3xl overflow-hidden border border-gray-200 shadow-md relative group">
            <img
              src={activeImage}
              alt={productData.name}
              className="w-full h-full object-contain p-4 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Department Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md ${
                  isHardware ? 'bg-emerald-600 text-white' : 'bg-stone-900 text-white'
                }`}
              >
                {isHardware ? '⚡ Ready-To-Dispatch Stock' : '🔨 100% On-Demand Build'}
              </span>
            </div>

            {productData.bestseller && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-400 text-stone-950 px-3 py-1 rounded-full shadow-sm">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="space-y-6">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            <span>{productData.brand || 'Welcome Collection'}</span>
            <span>•</span>
            <span className="text-stone-800">{productData.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-serif leading-tight">
            {productData.name}
          </h1>

          {/* Price & Delivery Mode Notice */}
          <div className="space-y-2 pt-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-3xl sm:text-4xl font-bold text-gray-950 font-sans">
                {currency}{Number(productData.price).toLocaleString()}
              </p>
              {productData.ratePerSqFt && (
                <span className="text-base font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                  ₹{productData.ratePerSqFt} / sq.ft
                </span>
              )}
              <span className="text-xs text-gray-500 font-medium">
                {isHardware ? (productData.sheetSize ? `per ${productData.sheetSize} sheet` : 'per standard 8x4 ft sheet (32 sq ft)') : '(Handcrafted estimated base price)'}
              </span>
            </div>

            {/* Mode Banner */}
            {isHardware ? (
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ready Stock: Available for same-day / next-day site dispatch</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>On-Demand Build: Minimum 10 to 15 days artisanal handcrafting</span>
              </div>
            )}
          </div>

          {/* Guarantee Banner (Highlighted for Furniture) */}
          <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isHardware ? 'IS:710 / IS:303 Quality Tested' : '30+ Years of Experience: Trust Our Quality & Service'}</span>
            </div>
            <p className="text-stone-300 text-xs font-light leading-relaxed">
              {isHardware
                ? 'Termite, borer, and boiling waterproof tested plywood and high-grade scratch resistant Sunmica.'
                : 'We have 30+ years of experience, so you can trust our quality and the service. Use it and then believe us.'}
            </p>
          </div>

          {/* Short Description */}
          <p className="text-gray-600 text-sm leading-relaxed font-light">
            {productData.description}
          </p>

          {/* Social Inspiration / Pinterest Customization Notice for Furniture */}
          {!isHardware && (
            <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-2xl flex items-start gap-3">
              <Camera className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-rose-950 space-y-1">
                <p className="font-bold">Have a custom reference or saw this on Pinterest / Instagram?</p>
                <p className="text-rose-800 font-light">
                  We don't limit you to standard catalog dimensions. Share your room sizes, fabric colors, or an external reference photo, and our master craftsmen will build it.
                </p>
              </div>
            </div>
          )}

          {/* Key Attributes Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
            {productData.material && (
              <div>
                <span className="text-gray-400 font-medium block">Material</span>
                <span className="font-bold text-gray-800">{productData.material}</span>
              </div>
            )}
            {productData.finish && (
              <div>
                <span className="text-gray-400 font-medium block">Finish</span>
                <span className="font-bold text-gray-800">{productData.finish}</span>
              </div>
            )}
            {productData.dimension && (
              <div>
                <span className="text-gray-400 font-medium block">Dimensions</span>
                <span className="font-bold text-gray-800">{productData.dimension}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => addToCart(productData._id)}
              className="flex-1 bg-stone-900 hover:bg-black text-white font-bold py-4 px-8 rounded-full text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2"
            >
              <span>{isHardware ? 'ORDER SHEETS / ADD TO CART' : 'BOOK CUSTOM BUILD'}</span>
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-full text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isHardware ? 'Bulk Site Quote on WhatsApp' : 'Customize on WhatsApp'}</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>30+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{isHardware ? 'Ready to Dispatch' : '10-Day Handcrafted Build'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Custom Sizing Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Guarantee Policy */}
      <div className="mt-20">
        <div className="flex border-b border-gray-200 gap-8">
          <button
            onClick={() => setActiveTab("specifications")}
            className={`pb-3 text-sm font-bold tracking-wide transition-all ${
              activeTab === "specifications"
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            TECHNICAL SPECIFICATIONS
          </button>
          <button
            onClick={() => setActiveTab("craftsmanship")}
            className={`pb-3 text-sm font-bold tracking-wide transition-all ${
              activeTab === "craftsmanship"
                ? "border-b-2 border-black text-black"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            GUARANTEE POLICY & BUILD PROCESS
          </button>
        </div>

        {activeTab === "specifications" && (
          <div className="py-8">
            <div className="max-w-3xl overflow-hidden border border-gray-200 rounded-2xl">
              <table className="w-full text-xs sm:text-sm text-left">
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-gray-50/60">
                    <td className="py-3 px-5 font-semibold text-gray-500 w-1/3">Department</td>
                    <td className="py-3 px-5 font-bold text-gray-900 capitalize">
                      {isHardware ? 'Hardware' : 'Furniture'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-semibold text-gray-500">Fulfillment Mode</td>
                    <td className="py-3 px-5 font-bold text-amber-700">
                      {isHardware ? '⚡ Ready to Dispatch Stock' : '🔨 On-Demand Build (Min. 10 - 15 Days)'}
                    </td>
                  </tr>
                  <tr className="bg-gray-50/60">
                    <td className="py-3 px-5 font-semibold text-gray-500">Category</td>
                    <td className="py-3 px-5 text-gray-900">{productData.category}</td>
                  </tr>
                  {productData.material && (
                    <tr>
                      <td className="py-3 px-5 font-semibold text-gray-500">Core Material Composition</td>
                      <td className="py-3 px-5 font-bold text-gray-900">{productData.material}</td>
                    </tr>
                  )}
                  {productData.finish && (
                    <tr className="bg-gray-50/60">
                      <td className="py-3 px-5 font-semibold text-gray-500">Surface Finish</td>
                      <td className="py-3 px-5 text-gray-900">{productData.finish}</td>
                    </tr>
                  )}
                  {productData.dimension && (
                    <tr>
                      <td className="py-3 px-5 font-semibold text-gray-500">Dimensions / Sizing</td>
                      <td className="py-3 px-5 text-gray-900">{productData.dimension}</td>
                    </tr>
                  )}
                  <tr className="bg-gray-50/60">
                    <td className="py-3 px-5 font-semibold text-gray-500">Guarantee Coverage</td>
                    <td className="py-3 px-5 font-semibold text-emerald-700">
                      {productData.qualityAssurance || (isHardware ? '25-Year Waterproof Guarantee' : '10-Year Full Replacement Guarantee')}
                    </td>
                  </tr>
                  {productData.brand && (
                    <tr>
                      <td className="py-3 px-5 font-semibold text-gray-500">Brand / Make</td>
                      <td className="py-3 px-5 text-gray-900">{productData.brand}</td>
                    </tr>
                  )}
                  {productData.sku && (
                    <tr className="bg-gray-50/60">
                      <td className="py-3 px-5 font-semibold text-gray-500">SKU Reference</td>
                      <td className="py-3 px-5 font-mono text-xs text-gray-500">{productData.sku}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "craftsmanship" && (
          <div className="py-8 max-w-3xl text-sm text-gray-600 space-y-5 font-light leading-relaxed">
            <div className="bg-amber-50/80 border border-amber-200 p-5 rounded-2xl space-y-2">
              <h4 className="font-bold text-amber-950 text-base">30+ Years of Experience: Quality You Can Trust</h4>
              <p className="text-amber-900 text-xs sm:text-sm">
                We have 30+ years of experience, so you can trust our quality and the service. Use it and then believe us. Every single piece at <strong>Welcome Furniture</strong> is handcrafted on order using seasoned hardwoods (Burma Teak, European Oak, Rosewood) and Marine-grade BWP plywood for generational structural durability.
              </p>
            </div>

            <p>
              <strong>The 10-Day Minimum Build Timeline:</strong> High quality cannot be rushed. Seasoned wood must be precisely planed, joined with traditional mortise-and-tenon joints, dried, and coated with multi-layer finishes. When you book a piece with us, it is made specifically for your home.
            </p>

            <p>
              <strong>Custom Pinterest & Instagram Commissions:</strong> If you have a specific dream piece seen in a home, on social media, or in an architectural catalog, simply message our craftsmen. We translate photos into production blueprints tailored to your room layout.
            </p>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-16 pt-12 border-t border-gray-100">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
