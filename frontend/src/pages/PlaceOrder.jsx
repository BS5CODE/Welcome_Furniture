import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const [isProcessing, setIsProcessing] = useState(false);
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    // Check if cart is empty
    useEffect(() => {
        const hasItems = Object.values(cartItems).some(quantity => quantity > 0);
        if (!hasItems) {
            toast.error('Your cart is empty!');
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const triggerOrderNotifications = (orderResult, orderData) => {
        const primaryWhatsApp = '918128374219';
        let waUrl = orderResult?.whatsAppUrl;

        if (!waUrl) {
            const customerName = `${orderData.address?.firstName || ''} ${orderData.address?.lastName || ''}`.trim();
            const phone = orderData.address?.phone || '';
            const email = orderData.address?.email || '';
            const total = orderData.amount || 0;
            const itemsList = orderData.items?.map((it, idx) => `\n${idx + 1}. ${it.name} (x${it.quantity}) - ₹${Number(it.price).toLocaleString()}`).join('') || '';

            const text = 
`🔔 *NEW ORDER RECEIVED - WELCOME ENTERPRISE*
━━━━━━━━━━━━━━━━━━━━━━━━━
📦 *Order ID:* ${orderResult?.orderId ? String(orderResult.orderId).slice(-8).toUpperCase() : 'NEW'}
👤 *Customer:* ${customerName}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}
💰 *Total Amount:* ₹${Number(total).toLocaleString()}

🛒 *ITEMS:*${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━━━
_Triggered on WhatsApp first + Email sent to welcomefurniture.co@gmail.com_`;

            waUrl = `https://wa.me/${primaryWhatsApp}?text=${encodeURIComponent(text)}`;
        }

        // Trigger WhatsApp immediately
        try {
            window.open(waUrl, '_blank');
        } catch (e) {
            console.error('Failed to open WhatsApp window:', e);
        }
    };

    const initPay = (order, orderData) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    setIsProcessing(true);
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
                    if (data.success) {
                        toast.success('Order placed! WhatsApp alert triggered & email sent to welcomefurniture.co@gmail.com');
                        triggerOrderNotifications(data, orderData || { address: formData, amount: getCartAmount() });
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(data.message || 'Payment verification failed');
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    toast.error(error.response?.data?.message || 'Payment verification failed');
                } finally {
                    setIsProcessing(false);
                }
            },
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipcode: formData.zipcode,
                    country: formData.country
                }
            },
            theme: {
                color: '#000000'
            },
            modal: {
                ondismiss: function() {
                    toast.info('Payment cancelled');
                }
            }
        }

        try {
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                toast.error(response.error.description || 'Payment failed');
            });
            rzp.open();
        } catch (error) {
            console.error('Razorpay initialization error:', error);
            toast.error('Failed to initialize payment');
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        if (isProcessing) {
            toast.info('Please wait while we process your payment...');
            return;
        }

        try {
            // Check if cart is empty before submitting
            const hasItems = Object.values(cartItems).some(quantity => quantity > 0);
            if (!hasItems) {
                toast.error('Your cart is empty!');
                navigate('/cart');
                return;
            }

            let orderItems = []
            for (const itemId in cartItems) {
                if (cartItems[itemId] > 0) {
                    const itemInfo = structuredClone(products.find(product => product._id === itemId))
                    if (itemInfo) {
                        itemInfo.quantity = cartItems[itemId]
                        orderItems.push(itemInfo)
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount()
            }

            switch (method) {
                case 'cod':
                    setIsProcessing(true);
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    if (response.data.success) {
                        toast.success('Order placed! WhatsApp alert triggered & email sent to welcomefurniture.co@gmail.com');
                        triggerOrderNotifications(response.data, orderData);
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'razorpay':
                    setIsProcessing(true);
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order, orderData)
                    } else {
                        toast.error(responseRazorpay.data.message || 'Failed to initialize payment');
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.error('Order submission error:', error);
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-8'>
                <div className='mt-8 w-full max-w-md sm:min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button 
                            type='submit' 
                            disabled={isProcessing}
                            className={`bg-black text-white px-16 py-3 text-sm ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isProcessing ? 'PROCESSING...' : 'PLACE ORDER'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder