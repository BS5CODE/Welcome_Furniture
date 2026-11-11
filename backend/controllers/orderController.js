import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import Stripe from 'stripe'
import razorpay from 'razorpay'
import { sendOrderEmailNotification, generateOrderWhatsAppUrl } from "../utils/notificationService.js";

// global variables
const currency = 'inr'

// gateway initialize
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
    try {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    } catch (err) {
        console.warn("Stripe init warning:", err.message);
    }
}

let razorpayInstance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    try {
        razorpayInstance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    } catch (err) {
        console.warn("Razorpay init warning:", err.message);
    }
}

// Placing orders using COD Method
const placeOrder = async (req,res) => {
    
    try {
        
        const { userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        // Trigger WhatsApp and Email notifications to primary sources (8128374219 & welcomefurniture.co@gmail.com)
        const whatsAppUrl = generateOrderWhatsAppUrl(newOrder);
        sendOrderEmailNotification(newOrder).catch((err) => {
            console.error('Async order notification email error:', err.message);
        });

        res.json({
            success: true,
            message: "Order Placed",
            orderId: newOrder._id,
            whatsAppUrl
        })


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req,res) => {
    try {
        if (!razorpayInstance) {
            return res.json({ success: false, message: "Razorpay credentials not configured in backend/.env" });
        }
        const { userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error) {
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay = async (req,res) => {
    try {
        if (!razorpayInstance) {
            return res.json({ success: false, message: "Razorpay credentials not configured" });
        }
        const { userId, razorpay_order_id  } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            const updatedOrder = await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true}, { new: true });
            await userModel.findByIdAndUpdate(userId,{cartData:{}})

            // Trigger WhatsApp and Email notifications
            const whatsAppUrl = updatedOrder ? generateOrderWhatsAppUrl(updatedOrder) : null;
            if (updatedOrder) {
                sendOrderEmailNotification(updatedOrder).catch((err) => {
                    console.error('Async order notification email error:', err.message);
                });
            }

            res.json({ 
                success: true, 
                message: "Payment Successful",
                orderId: orderInfo.receipt,
                whatsAppUrl
            })
        } else {
             res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// All Orders data for Admin Panel
const allOrders = async (req,res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, orders: [] });
        }
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:true,orders:[]})
    }
}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        const { userId } = req.body
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, orders: [] });
        }
        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:true,orders:[]})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyRazorpay ,placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus}