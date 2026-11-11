import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    pricingUnit: { type: String, default: "piece" }, // 'piece', 'sqft', 'sheet'
    ratePerSqFt: { type: Number, default: 0 },       // for plywood (e.g. ₹78.05 / sq ft)
    image: { type: Array, required: true },
    department: { 
        type: String, 
        required: true, 
        enum: ['furniture', 'hardware'],
        default: 'furniture' 
    },
    category: { type: String, required: true },
    subcategory: { type: String, default: "" },
    bestseller: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    sku: { type: String, default: "" },
    
    // Core attributes for Hardware & Furniture
    material: { type: String, default: "" },
    finish: { type: String, default: "" },
    dimension: { type: String, default: "" },
    thickness: { type: String, default: "" },
    sheetSize: { type: String, default: "8x4 ft" },
    qualityAssurance: { type: String, default: "" },
    guarantee: { type: String, default: "" },
    leadTime: { type: String, default: "" },
    brand: { type: String, default: "" },

    // Dynamic flexible attributes map for future admin additions
    attributes: {
        type: Map,
        of: String,
        default: {}
    },

    date: { type: Number, required: true }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
