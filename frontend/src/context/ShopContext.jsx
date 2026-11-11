import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const fallbackFurnitureProducts = [
    // 🛋️ Furniture Products (100% On-Demand Custom Build: Min 10 Days • 30+ Years Experience)
    {
        _id: "furn_01",
        name: "Royal Velvet 3-Seater Bespoke Luxury Sofa",
        description: "Handcrafted on demand. Made with solid seasoned teakwood frame, 40-density high-resilience foam, and stain-resistant velvet. Custom dimensions and fabric shades available. Minimum 10 to 14 days handcrafting period. Backed by 30+ Years of Experience — trust our quality and service. Use it and then believe us.",
        price: 34999,
        image: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"],
        category: "Sofas",
        department: "furniture",
        material: "Solid Teakwood & 40-Density Foam",
        finish: "Royal Emerald Velvet (Customizable)",
        dimension: "84\" W x 36\" D x 34\" H (Customizable)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        brand: "Welcome Bespoke",
        bestseller: true,
        date: 1716634345448
    },
    {
        _id: "furn_02",
        name: "Scandinavian Teak Hydraulic Queen Bed",
        description: "Custom built to order. Crafted from seasoned Burma teakwood with high-capacity hydraulic lift storage. Have a design from Pinterest or Instagram? Share the reference photo and we will build it to fit your bedroom. Minimum 12 to 16 days handcrafting time. Backed by 30+ Years of Experience — use it and believe us.",
        price: 42999,
        image: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"],
        category: "Beds",
        department: "furniture",
        material: "Burma Teak Wood & Heavy Duty Hydraulics",
        finish: "Natural Matte Teak Lacquer",
        dimension: "64\" W x 82\" L x 42\" H (Customizable)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        brand: "Welcome Bespoke",
        bestseller: true,
        date: 1716634345449
    },
    {
        _id: "furn_03",
        name: "Handcrafted Solid Oak 6-Seater Dining Suite",
        description: "Artisanal on-demand dining table with 6 contour upholstered chairs. Custom timber stains and tabletop dimensions made specifically for your dining space. Minimum 10 to 15 days build time. Backed by 30+ Years of Experience.",
        price: 48500,
        image: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"],
        category: "Dining Sets",
        department: "furniture",
        material: "Solid European Oak",
        finish: "Warm Walnut Satin Finish",
        dimension: "72\" L x 36\" W x 30\" H",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        brand: "Welcome Bespoke",
        bestseller: true,
        date: 1716634345450
    },
    {
        _id: "furn_04",
        name: "Custom Modular 4-Door Wardrobe with Dressing Mirror",
        description: "Built-to-order wardrobe designed around your wall dimensions. Constructed with 100% Marine BWP Plywood carcass and premium Sunmica exterior. Built on demand in 14 to 20 days. Backed by 30+ years of woodworking experience.",
        price: 52000,
        image: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"],
        category: "Wardrobes",
        department: "furniture",
        material: "Marine BWP Plywood & Designer Sunmica",
        finish: "Smoked Oak & Champagne Gold Accents",
        dimension: "96\" W x 24\" D x 84\" H (Custom Dimensions)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        brand: "Welcome Bespoke",
        bestseller: true,
        date: 1716634345451
    },
    {
        _id: "furn_05",
        name: "Ergonomic Teak Workstation & Study Desk",
        description: "Bespoke executive study desk with cable organizer, drawer dividers, and durable scratch-proof matte laminate top. Built on order in 10 days. Backed by 30+ Years of Experience.",
        price: 18999,
        image: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"],
        category: "Study tables",
        department: "furniture",
        material: "Seasoned Rosewood & Steel Framework",
        finish: "Natural Teak & Matte Black",
        dimension: "48\" W x 24\" D x 30\" H",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        brand: "Welcome Bespoke",
        bestseller: false,
        date: 1716634345452
    },

    // 🪵 Hardware Products (Welcome Enterprise Plywood Rate Chart & Designer Sunmica)
    {
        _id: "ply_01",
        name: "18 MM SEMI ULTRA (OKUMA DIP Ultra FND)",
        description: "Premium Grade 18mm Plywood from The Okuma Dip Collection. Calibrated, high load-bearing core with exceptional surface smoothness for luxury furniture and kitchen carcases. Ready stock for immediate dispatch.",
        price: 2498,
        pricingUnit: "sqft",
        ratePerSqFt: 78.05,
        sheetSize: "8 ft x 4 ft (32 Sq.Ft)",
        thickness: "18 MM",
        image: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", "/assets/plywood_rate_chart.jpg"],
        department: "hardware",
        category: "Plywood",
        subcategory: "The Okuma Dip Collection (Premium Grade)",
        material: "Okuma Dip Ultra Hardwood Core",
        finish: "Semi Ultra Smooth Face",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Okuma Dip Ultra Certified • 30 Years Trust",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "OKUMA DIP Ultra (FND)",
        stock: 500,
        sku: "WE-OKU-18MM",
        bestseller: true,
        date: Date.now()
    },
    {
        _id: "ply_02",
        name: "12 MM SEMI ULTRA (OKUMA DIP Ultra FND)",
        description: "12mm Premium Grade Plywood from The Okuma Dip Collection. Ideal for heavy-duty cabinet partitions, shelving, and paneling. Calibrated uniform thickness.",
        price: 1882,
        pricingUnit: "sqft",
        ratePerSqFt: 58.81,
        sheetSize: "8 ft x 4 ft (32 Sq.Ft)",
        thickness: "12 MM",
        image: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80", "/assets/plywood_rate_chart.jpg"],
        department: "hardware",
        category: "Plywood",
        subcategory: "The Okuma Dip Collection (Premium Grade)",
        material: "Okuma Dip Ultra Hardwood Core",
        finish: "Semi Ultra Smooth Face",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Okuma Dip Ultra Certified",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "OKUMA DIP Ultra (FND)",
        stock: 450,
        sku: "WE-OKU-12MM",
        bestseller: true,
        date: Date.now()
    },
    {
        _id: "ply_03",
        name: "25 MM BOARD (OKUMA DIP Blockboard FND)",
        description: "25mm Heavy Duty Blockboard from The Okuma Dip Collection. Solid seasoned timber battens core engineered to resist warping across large spans. Ideal for wardrobe sliding doors and long table tops.",
        price: 3083,
        pricingUnit: "sqft",
        ratePerSqFt: 96.33,
        sheetSize: "8 ft x 4 ft (32 Sq.Ft)",
        thickness: "25 MM",
        image: ["https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80", "/assets/plywood_rate_chart.jpg"],
        department: "hardware",
        category: "Plywood",
        subcategory: "25 MM Blockboard",
        material: "Okuma Dip Solid Batten Blockboard",
        finish: "Calibrated Sanded Face",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Zero-Warping Guarantee • 30 Years Trust",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "OKUMA DIP Blockboard (FND)",
        stock: 200,
        sku: "WE-OKU-25MM",
        bestseller: false,
        date: Date.now()
    },
    {
        _id: "ply_04",
        name: "09 MM SEMI ALT (OKUMA DIP FND)",
        description: "09mm Semi Alt Okuma Dip collection plywood. Premium grade multi-layer sheet with high tensile strength for back panels and drawer bottoms.",
        price: 1537,
        pricingUnit: "sqft",
        ratePerSqFt: 48.04,
        sheetSize: "8 ft x 4 ft (32 Sq.Ft)",
        thickness: "09 MM",
        image: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", "/assets/plywood_rate_chart.jpg"],
        department: "hardware",
        category: "Plywood",
        subcategory: "The Okuma Dip Collection (Premium Grade)",
        material: "Okuma Dip Hardwood Core",
        finish: "Semi Alt Smooth Face",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Okuma Dip Grade Certified",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "OKUMA DIP (FND)",
        stock: 350,
        sku: "WE-OKU-09MM",
        bestseller: false,
        date: Date.now()
    },
    {
        _id: "ply_05",
        name: "06 MM SEMI ALT (OKUMA DIP FND)",
        description: "06mm Semi Alt Okuma Dip collection plywood. Lightweight yet durable paneling sheet for curved surfaces and interior lining.",
        price: 1148,
        pricingUnit: "sqft",
        ratePerSqFt: 35.86,
        sheetSize: "8 ft x 4 ft (32 Sq.Ft)",
        thickness: "06 MM",
        image: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80", "/assets/plywood_rate_chart.jpg"],
        department: "hardware",
        category: "Plywood",
        subcategory: "The Okuma Dip Collection (Premium Grade)",
        material: "Okuma Dip Hardwood Core",
        finish: "Semi Alt Smooth Face",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Okuma Dip Grade Certified",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "OKUMA DIP (FND)",
        stock: 400,
        sku: "WE-OKU-06MM",
        bestseller: false,
        date: Date.now()
    },
    {
        _id: "ply_06",
        name: "18 MM Standard Finish (Rubin Club)",
        description: "Commercial & Standard Series 18mm Plywood from Rubin Club. High durability and smooth finish at competitive pricing for complete residential woodwork.",
        price: 2163,
        pricingUnit: "sqft",
        ratePerSqFt: 67.59,
        sheetSize: "8 ft x 4 ft (32 Sq.Ft)",
        thickness: "18 MM",
        image: ["https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80", "/assets/plywood_rate_chart.jpg"],
        department: "hardware",
        category: "Plywood",
        subcategory: "Commercial & Standard Series",
        material: "Seasoned Hardwood Core",
        finish: "Standard Smooth Finish",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Rubin Club Tested Quality",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "Rubin Club",
        stock: 300,
        sku: "WE-RUB-18MM",
        bestseller: true,
        date: Date.now()
    },
    {
        _id: "ply_07",
        name: "18 MM Commercial Core (PLI Power)",
        description: "Heavy-duty commercial core 18mm plywood from PLI Power. High-density bonded for structural carpentry, framing, and base furniture work.",
        price: 1899,
        pricingUnit: "sqft",
        ratePerSqFt: 59.36,
        sheetSize: "8 ft x 4 ft (32 Sq.Ft)",
        thickness: "18 MM",
        image: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", "/assets/plywood_rate_chart.jpg"],
        department: "hardware",
        category: "Plywood",
        subcategory: "Commercial & Standard Series",
        material: "Commercial Hardwood Core",
        finish: "Standard Sanded Face",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "PLI Power Certified",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "PLI Power",
        stock: 350,
        sku: "WE-PLI-18MM",
        bestseller: false,
        date: Date.now()
    },
    {
        _id: "ply_08",
        name: "12 MM Standard Finish (Rubin Club)",
        description: "12mm Standard Finish Plywood from Rubin Club. Balanced and moisture-resistant for vertical shutters, paneling, and interior carcass framing.",
        price: 1577,
        pricingUnit: "sqft",
        ratePerSqFt: 49.28,
        sheetSize: "8 ft x 4 ft (32 Sq.Ft)",
        thickness: "12 MM",
        image: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80", "/assets/plywood_rate_chart.jpg"],
        department: "hardware",
        category: "Plywood",
        subcategory: "Commercial & Standard Series",
        material: "Seasoned Hardwood Core",
        finish: "Standard Smooth Finish",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Rubin Club Tested Quality",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "Rubin Club",
        stock: 280,
        sku: "WE-RUB-12MM",
        bestseller: false,
        date: Date.now()
    },
    {
        _id: "ply_09",
        name: "12 MM Commercial Core (PLI Power)",
        description: "12mm Commercial Core Plywood from PLI Power. High-value interior woodwork sheet with verified screw-holding capacity.",
        price: 1374,
        pricingUnit: "sqft",
        ratePerSqFt: 42.94,
        sheetSize: "8 ft x 4 ft (32 Sq.Ft)",
        thickness: "12 MM",
        image: ["https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80", "/assets/plywood_rate_chart.jpg"],
        department: "hardware",
        category: "Plywood",
        subcategory: "Commercial & Standard Series",
        material: "Commercial Hardwood Core",
        finish: "Standard Sanded Face",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "PLI Power Certified",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "PLI Power",
        stock: 320,
        sku: "WE-PLI-12MM",
        bestseller: false,
        date: Date.now()
    },
    {
        _id: "sun_01",
        name: "Premium White Liner Sunmica Sheet (8x4 ft)",
        description: "High-grade 0.8mm / 1.0mm white liner sunmica sheet. Clean, anti-fungal, moisture-resistant backing sheet for wardrobe interiors and kitchen cabinet linings. Ready stock for immediate site dispatch.",
        price: 650,
        pricingUnit: "sheet",
        sheetSize: "8 ft x 4 ft (Standard Sheet)",
        thickness: "0.8 MM / 1.0 MM",
        image: ["/assets/sunmica_white_liner.jpg", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"],
        department: "hardware",
        category: "Sunmica & Laminates",
        subcategory: "White Liner Sunmica",
        material: "High-Pressure Kraft Paper & Phenolic Resin",
        finish: "Smooth Silk Matte White",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Moisture & Termite Resistant • Ready Stock",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "Welcome Enterprise",
        stock: 800,
        sku: "WE-SUN-WHT-01",
        bestseller: true,
        date: Date.now()
    },
    {
        _id: "sun_02",
        name: "Textured Woodgrain Designer Sunmica (8x4 ft)",
        description: "Luxury decorative Sunmica sheet featuring synchronized natural woodgrain texture. Durable surface resistant to hot water, steam, and everyday stains. In stock for immediate dispatch.",
        price: 850,
        pricingUnit: "sheet",
        sheetSize: "8 ft x 4 ft (Standard Sheet)",
        thickness: "0.8 MM / 1.0 MM",
        image: ["/assets/sunmica_woodgrain.png", "/assets/sunmica_white_liner.jpg"],
        department: "hardware",
        category: "Sunmica & Laminates",
        subcategory: "Textured Woodgrain",
        material: "High-Pressure Melamine Coated Laminate",
        finish: "Natural Textured Woodgrain",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Scratch & Stain Resistant • Ready Stock",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "Welcome Enterprise",
        stock: 650,
        sku: "WE-SUN-TXT-01",
        bestseller: true,
        date: Date.now()
    }
];

const ShopContextProvider = (props) => {
    const currency = '₹';
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId) => {
        try {
            let cartData = structuredClone(cartItems);
            
            // Check if the item already exists in the cart
            if (cartData[itemId]) {
                cartData[itemId] += 1;
            } else {
                cartData[itemId] = 1;
            }
            
            // Update the cart state immediately
            setCartItems(cartData);
            
            // If the user is authenticated, send the data to the backend
            if (token) {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId },
                    { headers: { token } }
                );
                toast.success('Product added to cart!');
            } else {
                toast.success('Product added to cart!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            // Revert the cart state if the backend request fails
            setCartItems(cartItems);
            toast.error(error.response?.data?.message || 'Failed to add product to cart.');
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                totalCount += cartItems[itemId];
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, quantity) => {
        try {
            if (quantity < 0) {
                toast.error('Quantity cannot be negative');
                return;
            }

            let cartData = structuredClone(cartItems);
            cartData[itemId] = quantity;
            setCartItems(cartData);

            if (token) {
                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, quantity },
                    { headers: { token } }
                );
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Revert the cart state if the backend request fails
            setCartItems(cartItems);
            toast.error(error.response?.data?.message || 'Failed to update quantity.');
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success && response.data.products && response.data.products.length > 0) {
                setProducts(response.data.products.reverse());
            } else {
                setProducts(fallbackFurnitureProducts);
            }
        } catch (error) {
            console.warn('Backend currently offline, loading catalog products:', error.message);
            setProducts(fallbackFurnitureProducts);
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                { headers: { token } }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch cart data.');
        }
    }

    const clearCart = async () => {
        try {
            setCartItems({});
            if (token) {
                await axios.post(
                    backendUrl + '/api/cart/clear',
                    {},
                    { headers: { token } }
                );
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            toast.error(error.response?.data?.message || 'Failed to clear cart.');
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            getUserCart(storedToken);
        } else if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        products,
        currency,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        clearCart,
        navigate,
        backendUrl,
        setToken,
        token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;