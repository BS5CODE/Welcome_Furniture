import userModel from "../models/userModel.js"
import mongoose from "mongoose"

// add products to user cart
const addToCart = async (req,res) => {
    try {
        const { userId, itemId } = req.body
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, message: "Added To Cart" });
        }
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {};

        // Check if the item already exists in the cart
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.error('Error adding to cart:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req,res) => {
    try {
        const { userId, itemId, quantity } = req.body

        if (quantity < 0) {
            return res.status(400).json({ success: false, message: "Quantity cannot be negative" })
        }

        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {};

        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.error('Error updating cart:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// get user cart data
const getUserCart = async (req,res) => {
    try {
        const { userId } = req.body
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, cartData: {} });
        }
        const userData = await userModel.findById(userId)
        const cartData = userData.cartData || {};

        res.json({ success: true, cartData })

    } catch (error) {
        console.error('Error fetching cart:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// clear user cart
const clearCart = async (req,res) => {
    try {
        const { userId } = req.body
        
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Cart Cleared" })

    } catch (error) {
        console.error('Error clearing cart:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart, clearCart }