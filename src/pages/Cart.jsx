// ✅ src/pages/Cart.jsx
// Shopping cart page with item management
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert('Please sign in to checkout');
      navigate('/signin', { state: { from: '/cart' } });
      return;
    }
    // Navigate to checkout page
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center p-4">
        <div className="text-center">
          <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 
                       text-black font-semibold rounded-xl hover:from-yellow-400 
                       hover:to-amber-500 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Shopping Cart ({getCartCount()} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
              const discount = item.discount || 0;
              const finalPrice = price * (1 - discount / 100);

              return (
                <motion.div
                  key={item._id || item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.images?.[0] || 'https://via.placeholder.com/150'}
                    alt={item.name || item.title}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.name || item.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-[#B8860B]">
                        ${finalPrice.toFixed(2)}
                      </span>
                      {discount > 0 && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ${price.toFixed(2)}
                          </span>
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                          className="px-3 py-2 hover:bg-gray-100 transition"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-100 transition"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id || item.id)}
                        className="text-red-500 hover:text-red-700 transition flex items-center gap-2"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-xl font-bold text-gray-800">
                      ${(finalPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 
                           hover:from-yellow-400 hover:to-amber-500 text-black font-bold 
                           rounded-xl shadow-lg transition transform hover:scale-[1.02]"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block text-center mt-4 text-[#B8860B] hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}