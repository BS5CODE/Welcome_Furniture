import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '.env') })
dotenv.config()

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import inquiryRouter from './routes/inquiryRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// Static uploads serving for product images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/category',categoryRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/inquiry',inquiryRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, '0.0.0.0', () => console.log('Server started on PORT : ' + port))