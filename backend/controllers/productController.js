import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import productModel from "../models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Comprehensive sample catalog for Furniture and Hardware (Welcome Enterprise)
const sampleProducts = [
    // 🪵 Welcome Enterprise Hardware & Plywood Rate Chart Items
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
        material: "Decorative High-Pressure Laminate",
        finish: "Synchronized Woodgrain Matt",
        dimension: "8 ft x 4 ft (32 Sq.Ft)",
        qualityAssurance: "Scratch & Stain Resistant (Grade A)",
        leadTime: "Ready Stock • Fast Dispatch",
        brand: "Welcome Enterprise",
        stock: 600,
        sku: "WE-SUN-WOD-01",
        bestseller: true,
        date: Date.now()
    },

    // 🛋️ Welcome Enterprise Furniture (100% On-Demand Build • 30+ Years Experience)
    {
        _id: "furn_bed_001",
        name: "Modern Grey Hydraulic Storage Bed with Tufted Headboard",
        description: "Maximize your bedroom space with this modern hydraulic storage bed. It features a plush, channel-tufted grey headboard with integrated ambient backlighting, paired with a sleek dual-tone grey and white frame. The heavy-duty, easy-lift hydraulic mechanism reveals multiple spacious divided compartments beneath the mattress, perfect for organizing heavy bedding, suitcases, and seasonal clothing. 100% on-demand handcrafted with 30+ Years of Experience.",
        price: 44999,
        image: [
            "/uploads/hydraulic-bed-tufted-headboard-closed.jpg",
            "/uploads/hydraulic-bed-tufted-headboard-open.jpg"
        ],
        department: "furniture",
        category: "Beds",
        subcategory: "Hydraulic Storage Beds",
        material: "Marine Grade BWP Plywood & Velvet Upholstery",
        finish: "Dual-Tone High-Gloss Grey / Off-White & Velvet Tufting",
        dimension: "6 ft x 6.5 ft (King Size / Customizable)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        guarantee: "30+ Years of Experience: Trust Our Quality & Service",
        leadTime: "Min. 10 to 15 Days Artisanal Handcrafting",
        brand: "Welcome Enterprise",
        stock: 1,
        sku: "WF-BED-001",
        bestseller: true,
        date: Date.now()
    },
    {
        _id: "furn_01",
        name: "Royal Chesterfield 3-Seater Velvet Sofa",
        description: "Bespoke handcrafted chesterfield sofa built to order in 10 to 14 days. Hand-tufted buttons, kiln-dried seasoned solid hardwood framing, high-resilience 40-density foam, and stain-resistant velvet. We have 30+ years of experience, so you can trust our quality and service. Use it and then believe us.",
        price: 34999,
        image: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Sofas",
        subcategory: "Fabric Sofas",
        material: "Kiln-Dried Hardwood & 40D Foam",
        finish: "Royal Navy Matte Velvet",
        dimension: "84\" W x 36\" D x 34\" H (Customizable)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        leadTime: "10-14 Days On-Demand Handcrafting",
        brand: "Welcome Bespoke",
        stock: 10,
        sku: "WF-SOF-001",
        bestseller: true,
        date: Date.now()
    },
    {
        _id: "furn_02",
        name: "Scandinavian Teak Hydraulic Queen Bed",
        description: "Custom built to order. Crafted from seasoned Burma teakwood with high-capacity hydraulic lift storage. Have a design from Pinterest or Instagram? Share the reference photo and we will build it to fit your bedroom. Minimum 12 to 16 days handcrafting time. Backed by 30+ Years of Experience.",
        price: 42999,
        image: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Beds",
        subcategory: "Queen Size Beds",
        material: "Burma Teak Wood & Heavy Duty Hydraulics",
        finish: "Natural Matte Teak Lacquer",
        dimension: "64\" W x 82\" L x 42\" H (Customizable)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        leadTime: "12-16 Days On-Demand Handcrafting",
        brand: "Welcome Bespoke",
        stock: 8,
        sku: "WF-BED-002",
        bestseller: true,
        date: Date.now()
    },
    {
        _id: "furn_03",
        name: "Handcrafted Solid Oak 6-Seater Dining Suite",
        description: "Artisanal on-demand dining table with 6 contour upholstered chairs. Custom timber stains and tabletop dimensions made specifically for your dining space. Minimum 10 to 15 days build time. Backed by 30+ Years of Experience.",
        price: 48500,
        image: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Dining Sets",
        subcategory: "6-Seater Dining",
        material: "Solid European Oak",
        finish: "Warm Walnut Satin Finish",
        dimension: "72\" L x 36\" W x 30\" H",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        leadTime: "10-15 Days On-Demand Handcrafting",
        brand: "Welcome Bespoke",
        stock: 6,
        sku: "WF-DIN-003",
        bestseller: true,
        date: Date.now()
    },
    {
        _id: "furn_04",
        name: "Custom Modular 4-Door Wardrobe with Dressing Mirror",
        description: "Built-to-order wardrobe designed around your wall dimensions. Constructed with 100% Marine BWP Plywood carcass and premium Sunmica exterior. Built on demand in 14 to 20 days. Backed by 30+ Years of Experience.",
        price: 52000,
        image: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Wardrobes",
        subcategory: "Modular Wardrobes",
        material: "Marine BWP Plywood & Designer Sunmica",
        finish: "Smoked Oak & Champagne Gold Accents",
        dimension: "96\" W x 24\" D x 84\" H (Custom Dimensions)",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        leadTime: "14-20 Days On-Demand Handcrafting",
        brand: "Welcome Bespoke",
        stock: 5,
        sku: "WF-WAR-004",
        bestseller: true,
        date: Date.now()
    },
    {
        _id: "furn_05",
        name: "Ergonomic Teak Workstation & Study Desk",
        description: "Bespoke executive study desk with cable organizer, drawer dividers, and durable scratch-proof matte laminate top. Built on order in 10 days. Backed by 30+ Years of Experience.",
        price: 18999,
        image: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"],
        department: "furniture",
        category: "Study tables",
        subcategory: "Workstation Tables",
        material: "Seasoned Rosewood & Steel Framework",
        finish: "Natural Teak & Matte Black",
        dimension: "48\" W x 24\" D x 30\" H",
        qualityAssurance: "30+ Years Experience • Trust Our Quality & Service",
        guarantee: "30+ Years Experience • Trust Our Quality & Service",
        leadTime: "10 Days On-Demand Handcrafting",
        brand: "Welcome Bespoke",
        stock: 12,
        sku: "WF-STU-005",
        bestseller: false,
        date: Date.now()
    }
];

let inMemoryProducts = [...sampleProducts];

// Helper to mirror uploaded files to public directories for ultra-fast local rendering
const mirrorToPublic = (srcPath, filename) => {
    try {
        const frontendPublic = path.join(__dirname, "../../../frontend/public/uploads");
        const adminPublic = path.join(__dirname, "../../../admin/public/uploads");
        if (!fs.existsSync(frontendPublic)) fs.mkdirSync(frontendPublic, { recursive: true });
        if (!fs.existsSync(adminPublic)) fs.mkdirSync(adminPublic, { recursive: true });
        fs.copyFileSync(srcPath, path.join(frontendPublic, filename));
        fs.copyFileSync(srcPath, path.join(adminPublic, filename));
    } catch (e) {
        // non-blocking
    }
};

const resolveImageUrls = async (req, filesList) => {
    if (!filesList || filesList.length === 0) return [];
    
    const host = req.get('host') || 'localhost:4000';
    const protocol = req.protocol || 'http';
    const baseUrl = process.env.BACKEND_URL || `${protocol}://${host}`;
    
    const isCloudinaryConfigured = Boolean(
        process.env.CLOUDINARY_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_SECRET_KEY
    );

    const urls = [];
    for (const item of filesList) {
        let uploadedUrl = null;
        if (isCloudinaryConfigured) {
            try {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                if (result && result.secure_url) {
                    uploadedUrl = result.secure_url;
                }
            } catch (err) {
                console.warn(`Cloudinary upload failed for ${item.originalname}:`, err.message);
            }
        }

        // If Cloudinary wasn't configured or failed, use the permanent local uploads URL
        if (!uploadedUrl) {
            const filename = item.filename || path.basename(item.path);
            mirrorToPublic(item.path, filename);
            uploadedUrl = `${baseUrl}/uploads/${filename}`;
        }

        urls.push(uploadedUrl);
    }

    return urls;
};

// Add Product (Admin)
const addProduct = async (req, res) => {
    try {
        const { 
            name, 
            description, 
            price, 
            pricingUnit,
            ratePerSqFt,
            thickness,
            sheetSize,
            guarantee,
            leadTime,
            department, 
            category, 
            subcategory, 
            bestseller, 
            stock, 
            sku,
            material, 
            finish, 
            dimension, 
            qualityAssurance, 
            brand,
            attributes 
        } = req.body;

        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await resolveImageUrls(req, images);
        }

        // Fallback only if absolutely no images were provided
        if (imagesUrl.length === 0) {
            if ((department || '').toLowerCase() === 'hardware') {
                imagesUrl = ["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"];
            } else {
                imagesUrl = ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"];
            }
        }

        // Parse custom attributes if provided as JSON string
        let parsedAttributes = {};
        if (attributes) {
            try {
                parsedAttributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;
            } catch (e) {
                parsedAttributes = {};
            }
        }

        const productData = {
            name: name?.trim() || "Untitled Product",
            description: description?.trim() || "",
            price: Number(price) || 0,
            pricingUnit: pricingUnit?.trim() || (department === 'hardware' ? 'sqft' : 'piece'),
            ratePerSqFt: Number(ratePerSqFt) || 0,
            thickness: thickness?.trim() || "",
            sheetSize: sheetSize?.trim() || (department === 'hardware' ? "8 ft x 4 ft (32 Sq.Ft)" : ""),
            guarantee: guarantee?.trim() || (department === 'furniture' ? "30+ Years of Experience: Trust Our Quality & Service" : "Quality Tested Guarantee"),
            leadTime: leadTime?.trim() || (department === 'hardware' ? "Ready Stock • Fast Dispatch" : "Min. 10 Days On-Demand Handcrafting"),
            department: (department || 'furniture').toLowerCase(),
            category: category?.trim() || "General",
            subcategory: subcategory?.trim() || "",
            material: material?.trim() || "",
            finish: finish?.trim() || "",
            dimension: dimension?.trim() || "",
            qualityAssurance: qualityAssurance?.trim() || "",
            brand: brand?.trim() || "",
            stock: Number(stock) || 0,
            sku: sku?.trim() || `SKU-${Date.now()}`,
            bestseller: bestseller === "true" || bestseller === true,
            attributes: parsedAttributes,
            image: imagesUrl,
            date: Date.now()
        };

        if (mongoose.connection.readyState === 1) {
            const product = new productModel(productData);
            await product.save();
            productData._id = product._id;
        } else {
            productData._id = "prod_" + Date.now();
        }

        inMemoryProducts.unshift(productData);

        res.json({ success: true, message: "Product Added Successfully", product: productData });
    } catch (error) {
        console.error("Error adding product:", error);
        res.json({ success: false, message: error.message });
    }
};

// Update Product (Admin)
const updateProduct = async (req, res) => {
    try {
        const { 
            id,
            name, 
            description, 
            price, 
            pricingUnit,
            ratePerSqFt,
            thickness,
            sheetSize,
            guarantee,
            leadTime,
            department, 
            category, 
            subcategory, 
            bestseller, 
            stock, 
            sku,
            material, 
            finish, 
            dimension, 
            qualityAssurance, 
            brand,
            attributes 
        } = req.body;

        if (!id) {
            return res.json({ success: false, message: "Product ID is required for updating" });
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (description !== undefined) updateData.description = description.trim();
        if (price !== undefined) updateData.price = Number(price);
        if (pricingUnit !== undefined) updateData.pricingUnit = pricingUnit.trim();
        if (ratePerSqFt !== undefined) updateData.ratePerSqFt = Number(ratePerSqFt);
        if (thickness !== undefined) updateData.thickness = thickness.trim();
        if (sheetSize !== undefined) updateData.sheetSize = sheetSize.trim();
        if (guarantee !== undefined) updateData.guarantee = guarantee.trim();
        if (leadTime !== undefined) updateData.leadTime = leadTime.trim();
        if (department !== undefined) updateData.department = department.toLowerCase();
        if (category !== undefined) updateData.category = category.trim();
        if (subcategory !== undefined) updateData.subcategory = subcategory.trim();
        if (material !== undefined) updateData.material = material.trim();
        if (finish !== undefined) updateData.finish = finish.trim();
        if (dimension !== undefined) updateData.dimension = dimension.trim();
        if (qualityAssurance !== undefined) updateData.qualityAssurance = qualityAssurance.trim();
        if (brand !== undefined) updateData.brand = brand.trim();
        if (stock !== undefined) updateData.stock = Number(stock);
        if (sku !== undefined) updateData.sku = sku.trim();
        if (bestseller !== undefined) updateData.bestseller = bestseller === "true" || bestseller === true;

        if (attributes) {
            try {
                updateData.attributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;
            } catch (e) {
                // ignore
            }
        }

        // Handle uploaded images if any
        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];
        const images = [image1, image2, image3, image4].filter(Boolean);

        if (images.length > 0) {
            const newImages = await resolveImageUrls(req, images);
            if (newImages.length > 0) {
                updateData.image = newImages;
            }
        }

        if (mongoose.connection.readyState === 1) {
            await productModel.findByIdAndUpdate(id, updateData);
        }

        const index = inMemoryProducts.findIndex(p => p._id.toString() === id.toString());
        if (index !== -1) {
            inMemoryProducts[index] = { ...inMemoryProducts[index], ...updateData };
        }

        res.json({ success: true, message: "Product Updated Successfully", product: updateData });
    } catch (error) {
        console.error("Error updating product:", error);
        res.json({ success: false, message: error.message });
    }
};

// List Products (Public / Frontend / Admin) with filtering
const listProducts = async (req, res) => {
    try {
        const { department, category, bestseller, brand, finish, material } = req.query;

        if (mongoose.connection.readyState === 1) {
            const query = {};
            if (department) query.department = department.toLowerCase();
            if (category) query.category = category;
            if (bestseller !== undefined) query.bestseller = bestseller === 'true';
            if (brand) query.brand = brand;
            if (finish) query.finish = finish;
            if (material) query.material = material;

            const products = await productModel.find(query);
            if (products.length > 0) {
                return res.json({ success: true, products });
            }
        }

        let filtered = inMemoryProducts;
        if (department) {
            filtered = filtered.filter(p => p.department?.toLowerCase() === department.toLowerCase());
        }
        if (category) {
            filtered = filtered.filter(p => p.category?.toLowerCase() === category.toLowerCase());
        }
        if (bestseller !== undefined) {
            const isBest = bestseller === 'true';
            filtered = filtered.filter(p => Boolean(p.bestseller) === isBest);
        }
        if (brand) {
            filtered = filtered.filter(p => p.brand?.toLowerCase() === brand.toLowerCase());
        }
        if (finish) {
            filtered = filtered.filter(p => p.finish?.toLowerCase().includes(finish.toLowerCase()));
        }
        if (material) {
            filtered = filtered.filter(p => p.material?.toLowerCase().includes(material.toLowerCase()));
        }

        res.json({ success: true, products: filtered });
    } catch (error) {
        console.error("Error listing products:", error);
        res.json({ success: true, products: inMemoryProducts });
    }
};

// Remove Product (Admin)
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (mongoose.connection.readyState === 1) {
            await productModel.findByIdAndDelete(id);
        }
        inMemoryProducts = inMemoryProducts.filter(item => item._id.toString() !== id.toString());
        res.json({ success: true, message: "Product Removed Successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.json({ success: false, message: error.message });
    }
};

// Single Product Info (Public / Frontend)
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (mongoose.connection.readyState === 1) {
            const product = await productModel.findById(productId);
            if (product) return res.json({ success: true, product });
        }
        const product = inMemoryProducts.find(item => item._id.toString() === productId.toString());
        res.json({ success: true, product });
    } catch (error) {
        console.error("Error fetching single product:", error);
        res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, updateProduct, removeProduct, singleProduct };
