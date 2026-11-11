import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId]
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleQuantityUpdate = async (itemId, value) => {
    if (value === '' || value === '0') return;
    await updateQuantity(itemId, Number(value));
    toast.success('Cart updated successfully!');
  };

  const handleItemDelete = async (itemId) => {
    await updateQuantity(itemId, 0);
    toast.success('Item removed from cart!');
  };

  const handleCheckout = () => {
    if (cartData.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    navigate('/place-order');
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div key={index} className='py-3.5 sm:py-4 border-t border-b text-gray-700 grid grid-cols-[1fr_auto_auto] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-2.5 sm:gap-4'>
              <div className='flex items-center sm:items-start gap-3 sm:gap-5 min-w-0'>
                <img className='w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0 border border-gray-200' src={Array.isArray(productData.image) ? productData.image[0] : (productData.image || '')} alt="" />
                <div className='min-w-0'>
                  <p className='text-xs sm:text-base font-medium text-gray-900 truncate'>{productData.name}</p>
                  <div className='flex items-center gap-3 mt-1'>
                    <p className='text-xs sm:text-sm font-bold text-gray-800'>{currency}{productData.price}</p>
                    {productData.department && (
                      <span className='text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded'>
                        {productData.department}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <input 
                onChange={(e) => handleQuantityUpdate(item._id, e.target.value)}
                className='border border-gray-300 rounded-lg w-12 sm:w-16 px-1.5 py-1 text-center text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-black' 
                type="number" 
                min={1} 
                defaultValue={item.quantity} 
              />
              <button
                onClick={() => handleItemDelete(item._id)}
                className='p-1.5 text-gray-400 hover:text-red-500 transition-colors'
                title="Remove item"
              >
                <img 
                  className='w-4 sm:w-5' 
                  src={assets.bin_icon} 
                  alt="Remove" 
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button 
              onClick={handleCheckout}
              disabled={cartData.length === 0}
              className={`bg-black text-white text-sm my-8 px-8 py-3 ${cartData.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;