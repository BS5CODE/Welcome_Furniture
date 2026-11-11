import mongoose from 'mongoose';
import 'dotenv/config';
import categoryModel from '../models/categoryModel.js';
import productModel from '../models/productModel.js';

const initialCategories = [
    // 🛋️ Furniture Department (100% On-Demand / Bespoke Build)
    { 
        name: "Sofas", 
        department: "furniture", 
        subcategories: ["Fabric Sofas", "Leatherette Sofas", "L-Shape Sectionals", "Recliners", "Chesterfield"] 
    },
    { 
        name: "Beds", 
        department: "furniture", 
        subcategories: ["King Size Beds", "Queen Size Beds", "Hydraulic Storage Beds", "Cushioned Headboards"] 
    },
    { 
        name: "Dining Sets", 
        department: "furniture", 
        subcategories: ["4-Seater Dining", "6-Seater Dining", "Solid Teak Dining", "Marble Top Dining"] 
    },
    { 
        name: "Wardrobes", 
        department: "furniture", 
        subcategories: ["Modular Wardrobes", "Sliding Door Wardrobes", "Walk-in Closets", "4-Door Wardrobes"] 
    },
    { 
        name: "Study tables", 
        department: "furniture", 
        subcategories: ["Solid Wood Desks", "Workstation Tables", "Executive Desks"] 
    },
    { 
        name: "Kitchen & dinning", 
        department: "furniture", 
        subcategories: ["Crockery Units", "Island Counters", "Bar Cabinets"] 
    },
    { 
        name: "Home decor", 
        department: "furniture", 
        subcategories: ["Custom Coffee Tables", "Console Tables", "Accent Chairs", "Shoe Cabinets"] 
    },

    // 🔩 Hardware Department (Currently Active: Plywood & Sunmica + Future Categories Ready)
    { 
        name: "Plywood", 
        department: "hardware", 
        subcategories: [
            "The Okuma Dip Collection (Premium Grade)", 
            "Commercial & Standard Series", 
            "25 MM Blockboard", 
            "18 MM Semi Ultra", 
            "12 MM Semi Ultra", 
            "09 MM Semi Alt", 
            "06 MM Semi Alt"
        ] 
    },
    { 
        name: "Sunmica & Laminates", 
        department: "hardware", 
        subcategories: [
            "White Liner Sunmica", 
            "Textured Woodgrain", 
            "High Gloss Series", 
            "Anti-Fingerprint Matte", 
            "0.8mm / 1.0mm Sheets"
        ] 
    },
    { 
        name: "Hinges & Door Movements", 
        department: "hardware", 
        subcategories: [
            "Concealed / European Hinges", 
            "Soft-Close Hinges", 
            "Butt Hinges", 
            "Pivot Hinges", 
            "Gas Springs & Lift-Ups"
        ] 
    },
    { 
        name: "Drawer Runners & Channels", 
        department: "hardware", 
        subcategories: [
            "Telescopic Ball-Bearing Slides", 
            "Undermount Slides", 
            "Push-to-Open Channels", 
            "Soft-Close Runners"
        ] 
    },
    { 
        name: "Handles, Pulls & Knobs", 
        department: "hardware", 
        subcategories: [
            "Cabinet Pulls / T-Bars", 
            "Profile / Gola Handles", 
            "Recessed / Flush Pulls", 
            "Decorative Knobs"
        ] 
    },
    { 
        name: "Wardrobe & Cabinet Organisers", 
        department: "hardware", 
        subcategories: [
            "Sliding Door Fittings", 
            "Wardrobe Lift-Outs / Pull-Down Rods", 
            "Corner Carousels & Magic Corners"
        ] 
    },
    { 
        name: "Assembly Fasteners & Connectors", 
        department: "hardware", 
        subcategories: [
            "Cam and Dowel Fixings (Minifix)", 
            "Confirmat Screws", 
            "Corner Braces & Cleats"
        ] 
    }
];

const initialProducts = [
    // =========================================================================
    // 🪵 HARDWARE: WELCOME ENTERPRISE PREMIUM PLYWOOD RATE CHART
    // =========================================================================
    {
        name: "18 MM SEMI ULTRA (OKUMA DIP Ultra FND)",
        description: "Premium Grade 18mm Plywood from The Okuma Dip Collection. Calibrated, high load-bearing core with exceptional surface smoothness for luxury furniture and kitchen carcases. Ready stock for immediate dispatch.",
        price: 2498, // 32 sq ft * ₹78.05 = ~₹2,498 per standard 8x4 sheet
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
        name: "12 MM SEMI ULTRA (OKUMA DIP Ultra FND)",
        description: "12mm Premium Grade Plywood from The Okuma Dip Collection. Ideal for heavy-duty cabinet partitions, shelving, and paneling. Calibrated uniform thickness.",
        price: 1882, // 32 sq ft * ₹58.81 = ~₹1,882
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
        name: "25 MM BOARD (OKUMA DIP Blockboard FND)",
        description: "25mm Heavy Duty Blockboard from The Okuma Dip Collection. Solid seasoned timber battens core engineered to resist warping across large spans. Ideal for wardrobe sliding doors and long table tops.",
        price: 3083, // 32 sq ft * ₹96.33 = ~₹3,083
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
        name: "09 MM SEMI ALT (OKUMA DIP FND)",
        description: "09mm Semi Alt Okuma Dip collection plywood. Premium grade multi-layer sheet with high tensile strength for back panels and drawer bottoms.",
        price: 1537, // 32 sq ft * ₹48.04 = ~₹1,537
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
        name: "06 MM SEMI ALT (OKUMA DIP FND)",
        description: "06mm Semi Alt Okuma Dip collection plywood. Lightweight yet durable paneling sheet for curved surfaces and interior lining.",
        price: 1148, // 32 sq ft * ₹35.86 = ~₹1,148
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
        name: "18 MM Standard Finish (Rubin Club)",
        description: "Commercial & Standard Series 18mm Plywood from Rubin Club. High durability and smooth finish at competitive pricing for complete residential woodwork.",
        price: 2163, // 32 sq ft * ₹67.59 = ~₹2,163
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
        name: "18 MM Commercial Core (PLI Power)",
        description: "Heavy-duty commercial core 18mm plywood from PLI Power. High-density bonded for structural carpentry, framing, and base furniture work.",
        price: 1899, // 32 sq ft * ₹59.36 = ~₹1,899
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
        name: "12 MM Standard Finish (Rubin Club)",
        description: "12mm Standard Finish Plywood from Rubin Club. Balanced and moisture-resistant for vertical shutters, paneling, and interior carcass framing.",
        price: 1577, // 32 sq ft * ₹49.28 = ~₹1,577
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
        name: "12 MM Commercial Core (PLI Power)",
        description: "12mm Commercial Core Plywood from PLI Power. High-value interior woodwork sheet with verified screw-holding capacity.",
        price: 1374, // 32 sq ft * ₹42.94 = ~₹1,374
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

    // =========================================================================
    // 🪵 HARDWARE: SUNMICA & DESIGNER LAMINATES
    // =========================================================================
    {
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
    },

    // =========================================================================
    // 🛋️ FURNITURE: 100% ON-DEMAND / BESPOKE HANDCRAFTED (30+ YEARS EXPERIENCE)
    // =========================================================================
    {
        name: "Royal Velvet 3-Seater Bespoke Luxury Sofa",
        description: "Handcrafted on demand. Made with solid seasoned teakwood frame, 40-density high-resilience foam, and stain-resistant velvet. Custom dimensions and fabric shades available. Minimum 10 to 14 days handcrafting period. We have 30+ years of experience, so you can trust our quality and the service. Use it and then believe us.",
        price: 34999,
        pricingUnit: "piece",
        leadTime: "Min. 10 - 14 Days (Handcrafted On Demand)",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        image: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Sofas",
        subcategory: "Fabric Sofas",
        material: "Solid Teakwood & 40-Density Foam",
        finish: "Royal Emerald Velvet (Custom Fabric Choices)",
        dimension: "84\" W x 36\" D x 34\" H (Customizable)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        brand: "Welcome Bespoke",
        stock: 99,
        sku: "WF-SOF-CUSTOM",
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Scandinavian Teak Hydraulic Queen Bed",
        description: "Custom built to order. Crafted from seasoned Burma teakwood with high-capacity hydraulic lift storage. Have a design from Pinterest or Instagram? Share the reference photo and we will build it to fit your bedroom. Minimum 12 to 16 days handcrafting time. Backed by 30+ Years of Experience.",
        price: 42999,
        pricingUnit: "piece",
        leadTime: "Min. 12 - 16 Days (Handcrafted On Demand)",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        image: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Beds",
        subcategory: "Hydraulic Storage Beds",
        material: "Burma Teak Wood & Heavy Duty Hydraulics",
        finish: "Natural Matte Teak Lacquer",
        dimension: "64\" W x 82\" L x 42\" H (Customizable)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        brand: "Welcome Bespoke",
        stock: 99,
        sku: "WF-BED-CUSTOM",
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Handcrafted Solid Oak 6-Seater Dining Suite",
        description: "Artisanal on-demand dining table with 6 contour upholstered chairs. Custom timber stains and tabletop dimensions made specifically for your dining space. Minimum 10 to 15 days build time. Backed by 30+ Years of Experience.",
        price: 48500,
        pricingUnit: "piece",
        leadTime: "Min. 10 - 15 Days (Handcrafted On Demand)",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        image: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Dining Sets",
        subcategory: "Solid Teak Dining",
        material: "Solid European Oak",
        finish: "Warm Walnut Satin Finish",
        dimension: "72\" L x 36\" W x 30\" H",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        brand: "Welcome Bespoke",
        stock: 99,
        sku: "WF-DIN-CUSTOM",
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Custom Modular 4-Door Wardrobe with Dressing Mirror",
        description: "Built-to-order wardrobe designed around your wall dimensions. Constructed with Okuma Dip Ultra Marine Plywood carcass and premium Sunmica exterior. Built on demand in 14 to 20 days. Backed by 30+ Years of Experience.",
        price: 52000,
        pricingUnit: "piece",
        leadTime: "Min. 14 - 20 Days (Handcrafted On Demand)",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        image: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Wardrobes",
        subcategory: "Modular Wardrobes",
        material: "Okuma Dip Ultra Plywood & Designer Sunmica",
        finish: "Smoked Oak & Champagne Gold Accents",
        dimension: "96\" W x 24\" D x 84\" H (Custom Dimensions)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        brand: "Welcome Bespoke",
        stock: 99,
        sku: "WF-WAR-CUSTOM",
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Ergonomic Teak Workstation & Study Desk",
        description: "Bespoke executive study desk with cable organizer, drawer dividers, and durable scratch-proof matte laminate top. Built on order in 10 days. Backed by 30+ Years of Experience.",
        price: 18999,
        pricingUnit: "piece",
        leadTime: "Min. 10 - 12 Days (Handcrafted On Demand)",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        image: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Study tables",
        subcategory: "Solid Wood Desks",
        material: "Seasoned Rosewood & Steel Framework",
        finish: "Natural Teak & Matte Black",
        dimension: "48\" W x 24\" D x 30\" H",
        qualityAssurance: "5-Year Guarantee on Wood Structure",
        brand: "Welcome Bespoke",
        stock: 99,
        sku: "WF-STU-CUSTOM",
        bestseller: false,
        date: Date.now()
    }
];

const seedDB = async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    let uri = mongoUri.trim();
    if (!uri.includes('/e-commerce') && !uri.includes('?')) {
        uri = `${uri.replace(/\/$/, '')}/e-commerce`;
    }

    console.log(`Connecting to MongoDB at: ${uri}`);
    await mongoose.connect(uri);

    console.log('Seeding updated categories with subcategories...');
    await categoryModel.deleteMany({});
    await categoryModel.insertMany(initialCategories);
    console.log(`✅ Seeded ${initialCategories.length} categories.`);

    console.log('Replacing products with Welcome Enterprise Plywood Rate Chart, Designer Sunmica & Bespoke Furniture...');
    await productModel.deleteMany({});
    await productModel.insertMany(initialProducts);
    console.log(`✅ Seeded ${initialProducts.length} initial products.`);

    console.log('🎉 Database seeding complete!');
    await mongoose.disconnect();
    process.exit(0);
};

seedDB().catch((err) => {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
});
