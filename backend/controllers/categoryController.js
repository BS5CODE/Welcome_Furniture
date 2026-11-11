import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";

// Built-in default categories for Furniture and Hardware
const defaultCategories = [
    // Furniture
    { _id: "cat_furn_1", name: "Sofas", department: "furniture", subcategories: ["Sectional", "Recliner", "L-Shape", "Fabric", "Leather"], status: true },
    { _id: "cat_furn_2", name: "Beds", department: "furniture", subcategories: ["King Size", "Queen Size", "Hydraulic Storage", "Single Bed"], status: true },
    { _id: "cat_furn_3", name: "Dining Sets", department: "furniture", subcategories: ["4-Seater", "6-Seater", "8-Seater", "Marble Top", "Wooden"], status: true },
    { _id: "cat_furn_4", name: "Wardrobes", department: "furniture", subcategories: ["Sliding Door", "Hinged Door", "Walk-in", "Mirror Front"], status: true },
    { _id: "cat_furn_5", name: "Study tables", department: "furniture", subcategories: ["Office Desk", "Writing Table", "Ergonomic Desk"], status: true },
    { _id: "cat_furn_6", name: "Kitchen & dinning", department: "furniture", subcategories: ["Cabinets", "Bar Stools", "Sideboards"], status: true },
    { _id: "cat_furn_7", name: "Home decor", department: "furniture", subcategories: ["Coffee Tables", "Wall Shelves", "Consoles"], status: true },
    { _id: "cat_furn_8", name: "Mattresses", department: "furniture", subcategories: ["Memory Foam", "Orthopedic", "Pocket Spring"], status: true },

    // Hardware
    { _id: "cat_hard_1", name: "Door Handles & Knobs", department: "hardware", subcategories: ["Profile Handles", "Mortise Handles", "Cabinet Knobs", "Pull Handles"], status: true },
    { _id: "cat_hard_2", name: "Concealed Hinges & Channels", department: "hardware", subcategories: ["Soft-Close Hinges", "Hydraulic Hinges", "Telescopic Drawer Slides", "Under-mount Channels"], status: true },
    { _id: "cat_hard_3", name: "Locks & Security", department: "hardware", subcategories: ["Smart Digital Locks", "Mortise Locks", "Padlocks", "Cylinder Locks"], status: true },
    { _id: "cat_hard_4", name: "Wardrobe Fittings & Sliders", department: "hardware", subcategories: ["Sliding Roller Systems", "Wardrobe Lifts", "Trouser Racks", "Tie & Belt Holders"], status: true },
    { _id: "cat_hard_5", name: "Kitchen Baskets & Organizers", department: "hardware", subcategories: ["Tandem Boxes", "Corner Carousel", "Pantry Units", "Plate Baskets"], status: true },
    { _id: "cat_hard_6", name: "Architectural Hardware", department: "hardware", subcategories: ["Glass Fittings", "Door Closers", "Tower Bolts", "Floor Springs"], status: true },
    { _id: "cat_hard_7", name: "Screws & Fasteners", department: "hardware", subcategories: ["Wood Screws", "Drywall Screws", "Rawl Plugs", "Hex Bolts"], status: true }
];

let inMemoryCategories = [...defaultCategories];

// Add a new Category (Admin)
const addCategory = async (req, res) => {
    try {
        const { name, department, subcategories, image } = req.body;

        if (!name || !department) {
            return res.json({ success: false, message: "Category name and department are required" });
        }

        const parsedSubcategories = Array.isArray(subcategories) 
            ? subcategories 
            : (subcategories ? subcategories.split(',').map(s => s.trim()) : []);

        const categoryData = {
            name: name.trim(),
            department: department.toLowerCase(),
            subcategories: parsedSubcategories,
            image: image || "",
            status: true,
            date: Date.now()
        };

        if (mongoose.connection.readyState === 1) {
            const existing = await categoryModel.findOne({ name: categoryData.name });
            if (existing) {
                return res.json({ success: false, message: "Category already exists" });
            }
            const newCategory = new categoryModel(categoryData);
            await newCategory.save();
        }

        categoryData._id = "cat_" + Date.now();
        inMemoryCategories.push(categoryData);

        res.json({ success: true, message: "Category Added Successfully", category: categoryData });
    } catch (error) {
        console.error("Error adding category:", error);
        res.json({ success: false, message: error.message });
    }
};

// List Categories (Public / Admin)
const listCategories = async (req, res) => {
    try {
        const { department } = req.query;

        if (mongoose.connection.readyState === 1) {
            const query = department ? { department: department.toLowerCase() } : {};
            const categories = await categoryModel.find(query);
            if (categories.length > 0) {
                return res.json({ success: true, categories });
            }
        }

        let filtered = inMemoryCategories;
        if (department) {
            filtered = inMemoryCategories.filter(c => c.department.toLowerCase() === department.toLowerCase());
        }

        res.json({ success: true, categories: filtered });
    } catch (error) {
        console.error("Error listing categories:", error);
        res.json({ success: false, message: error.message });
    }
};

// Remove a Category (Admin)
const removeCategory = async (req, res) => {
    try {
        const { id, name } = req.body;

        if (mongoose.connection.readyState === 1) {
            if (id) await categoryModel.findByIdAndDelete(id);
            else if (name) await categoryModel.findOneAndDelete({ name });
        }

        inMemoryCategories = inMemoryCategories.filter(c => c._id !== id && c.name !== name);

        res.json({ success: true, message: "Category Removed Successfully" });
    } catch (error) {
        console.error("Error removing category:", error);
        res.json({ success: false, message: error.message });
    }
};

// Update an existing Category (Admin)
const updateCategory = async (req, res) => {
    try {
        const { id, name, department, subcategories, status } = req.body;

        const updateData = {};
        if (name) updateData.name = name.trim();
        if (department) updateData.department = department.toLowerCase();
        if (subcategories) {
            updateData.subcategories = Array.isArray(subcategories)
                ? subcategories
                : subcategories.split(',').map(s => s.trim());
        }
        if (typeof status === 'boolean') updateData.status = status;

        if (mongoose.connection.readyState === 1) {
            await categoryModel.findByIdAndUpdate(id, updateData);
        }

        const index = inMemoryCategories.findIndex(c => c._id === id);
        if (index !== -1) {
            inMemoryCategories[index] = { ...inMemoryCategories[index], ...updateData };
        }

        res.json({ success: true, message: "Category Updated Successfully" });
    } catch (error) {
        console.error("Error updating category:", error);
        res.json({ success: false, message: error.message });
    }
};

export { addCategory, listCategories, removeCategory, updateCategory };
