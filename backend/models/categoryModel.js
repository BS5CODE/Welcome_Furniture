import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    department: { 
        type: String, 
        required: true, 
        enum: ['furniture', 'hardware'],
        default: 'furniture'
    },
    subcategories: [{ type: String }],
    image: { type: String, default: "" },
    status: { type: Boolean, default: true },
    date: { type: Number, default: Date.now }
});

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;
