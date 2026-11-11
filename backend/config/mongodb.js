import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.warn("⚠️  MONGODB_URI not set in backend/.env. Server running without live database.");
        return;
    }

    try {
        mongoose.connection.on('connected', () => {
            console.log("✅ MongoDB Connected Successfully");
        });

        let uri = process.env.MONGODB_URI.trim();
        // If the URI doesn't end with a database name or has parameters, handle cleanly
        if (!uri.includes('/e-commerce') && !uri.includes('?')) {
            uri = `${uri.replace(/\/$/, '')}/e-commerce`;
        }

        await mongoose.connect(uri);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
    }
}

export default connectDB;
