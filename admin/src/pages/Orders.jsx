import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }


  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
      if (response.data.success) {
        toast.success("Status Updated Successfully")
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Customer Orders
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Track customer order fulfillment, dispatch status, and payment verification.
        </p>
      </div>

      <div>
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
            No customer orders recorded yet.
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 my-3 text-xs sm:text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr] lg:grid-cols-[auto_2fr_1fr_1fr_1fr] gap-4 items-start"
              key={index}
            >
              <img className="w-12 h-12 object-contain bg-gray-50 p-2 rounded-lg border border-gray-100 flex-shrink-0" src={assets.parcel_icon} alt="Parcel" />
              <div>
                <div className="space-y-0.5">
                  {(order.items || []).map((item, itemIdx) => (
                    <p className="font-semibold text-gray-900" key={itemIdx}>
                      {item.name} <span className="text-gray-500 font-normal">x {item.quantity}</span>
                      {item.size && <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded ml-1.5">{item.size}</span>}
                    </p>
                  ))}
                </div>
                <p className="mt-3 font-bold text-gray-900">
                  {(order.address?.firstName || 'Customer') + ' ' + (order.address?.lastName || '')}
                </p>
                <div className="text-gray-500 text-xs mt-0.5">
                  <p>{order.address?.street || 'No street provided'}</p>
                  <p>{order.address?.city || ''}, {order.address?.state || ''}, {order.address?.country || ''} {order.address?.zipcode ? `- ${order.address.zipcode}` : ''}</p>
                  <p className="font-mono text-gray-700 mt-1">{order.address?.phone || 'No phone'}</p>
                </div>
              </div>

              <div className="text-xs space-y-1 bg-gray-50/70 p-3 rounded-lg border border-gray-100">
                <p><span className="text-gray-400">Total Items:</span> <span className="font-semibold text-gray-800">{order.items.length}</span></p>
                <p><span className="text-gray-400">Method:</span> <span className="font-semibold text-gray-800">{order.paymentMethod}</span></p>
                <p>
                  <span className="text-gray-400">Payment:</span>{' '}
                  <span className={`font-bold ${order.payment ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {order.payment ? '✓ Done' : '⏳ Pending'}
                  </span>
                </p>
                <p><span className="text-gray-400">Date:</span> <span className="text-gray-600">{new Date(order.date).toLocaleDateString()}</span></p>
              </div>

              <div className="text-left lg:text-center">
                <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Total Amount</p>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  {currency}{order.amount?.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Order Status
                </label>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="w-full p-2 text-xs font-semibold border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                >
                  <option value="Order Placed">📦 Order Placed</option>
                  <option value="Packing">🛠️ Packing</option>
                  <option value="Shipped">🚚 Shipped</option>
                  <option value="Out for delivery">🛵 Out for delivery</option>
                  <option value="Delivered">✅ Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders