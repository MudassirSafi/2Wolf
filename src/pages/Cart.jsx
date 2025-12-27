// src/pages/Cart.jsx - Amazon-Style Advanced Cart
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaHeart, FaShare, FaTruck, FaCheckCircle } from 'react-icons/fa';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Fetch recently viewed products from localStorage
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentlyViewed(viewed.slice(0, 6));

    // Fetch related/deal products
    fetchRelatedProducts();
  }, [cart]);

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?limit=6&featured=true');
      const data = await response.json();
      setRelatedProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch related products');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please sign in to checkout');
      navigate('/signin', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  // Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Empty Cart Animation */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-6"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaShoppingCart className="text-8xl text-gray-300" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
                >
                  0
                </motion.div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-800 mb-3"
            >
              Your Cart is empty
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 mb-6"
            >
              Shop today's deals
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-x-4"
            >
              <Link
                to="/"
                className="inline-block px-8 py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium rounded-lg transition"
              >
                Continue Shopping
              </Link>
              {!user && (
                <Link
                  to="/signin"
                  className="inline-block px-8 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition"
                >
                  Sign in to your account
                </Link>
              )}
            </motion.div>
          </div>

          {/* Recently Viewed Products */}
          {recentlyViewed.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your recently viewed items</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {recentlyViewed.map((product, idx) => (
                  <Link
                    key={idx}
                    to={`/product/${product._id}`}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition group"
                  >
                    <img
                      src={product.images?.[0] || 'https://via.placeholder.com/200'}
                      alt={product.name}
                      className="w-full h-40 object-contain mb-3 group-hover:scale-105 transition"
                    />
                    <p className="text-sm text-gray-800 line-clamp-2 mb-2">{product.name}</p>
                    <p className="text-lg font-bold text-gray-900">AED {formatPrice(product.price)}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Cart with Items
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Cart Section */}
          <div className="lg:col-span-9">
            {/* Cart Header */}
            <div className="bg-white mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-sm text-gray-600">Price</span>
                <span className="text-sm text-gray-600">Actions</span>
              </div>
            </div>

            {/* Cart Items */}
            <AnimatePresence>
              {cart.map((item) => {
                const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
                const discount = item.discount || 0;
                const finalPrice = discount > 0 ? price * (1 - discount / 100) : price;

                return (
                  <motion.div
                    key={item._id || item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white border-b border-gray-200 py-6"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.images?.[0] || 'https://via.placeholder.com/200'}
                          alt={item.name}
                          className="w-full md:w-48 h-48 object-contain cursor-pointer hover:scale-105 transition"
                          onClick={() => navigate(`/product/${item._id}`)}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          {/* Left Side - Details */}
                          <div className="flex-1">
                            <Link 
                              to={`/product/${item._id}`}
                              className="text-base md:text-lg font-medium text-gray-900 hover:text-[#C7511F] transition line-clamp-2 mb-2"
                            >
                              {item.name}
                            </Link>

                            {/* In Stock */}
                            <div className="flex items-center gap-2 text-sm text-green-700 font-medium mb-2">
                              <FaCheckCircle />
                              <span>In Stock</span>
                            </div>

                            {/* Free Delivery */}
                            <div className="flex items-center gap-2 text-sm text-teal-700 mb-3">
                              <FaTruck />
                              <span className="font-medium">FREE delivery</span>
                              <span className="text-gray-700">Wed, 24 Dec</span>
                              <Link to="/shipping" className="text-teal-700 hover:text-teal-800 hover:underline">
                                available at checkout
                              </Link>
                            </div>

                            {/* Variants */}
                            {item.color && (
                              <p className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">Colour:</span> {item.color}
                              </p>
                            )}
                            {item.size && (
                              <p className="text-sm text-gray-600 mb-3">
                                <span className="font-medium">Size:</span> {item.size}
                              </p>
                            )}

                            {/* Quantity Controls */}
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                              <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                                <button
                                  onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                  <FaMinus size={10} />
                                </button>
                                <span className="px-4 py-2 font-medium text-gray-900 min-w-[40px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                  className="px-3 py-2 hover:bg-gray-100 transition"
                                >
                                  <FaPlus size={10} />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item._id || item.id)}
                                className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline font-medium"
                              >
                                Delete
                              </button>

                              <button className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline font-medium flex items-center gap-1">
                                <FaHeart size={12} />
                                Save for Later
                              </button>

                              <button className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline font-medium flex items-center gap-1">
                                <FaShare size={12} />
                                Share
                              </button>
                            </div>
                          </div>

                          {/* Right Side - Price */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                              AED {formatPrice(finalPrice)}
                            </div>
                            {discount > 0 && (
                              <div className="flex flex-col items-end">
                                <span className="text-sm text-gray-500 line-through">
                                  AED {formatPrice(price)}
                                </span>
                                <span className="text-xs text-red-600 font-medium">
                                  Save AED {formatPrice(price - finalPrice)} ({discount}%)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Subtotal at Bottom */}
            <div className="bg-white py-6 border-b border-gray-200">
              <div className="text-right">
                <span className="text-lg text-gray-700">
                  Subtotal ({getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}):
                </span>
                <span className="text-lg font-bold text-gray-900 ml-2">
                  AED {formatPrice(getCartTotal())}
                </span>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Customers who bought items in your cart also bought</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {relatedProducts.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition group"
                    >
                      <img
                        src={product.images?.[0] || 'https://via.placeholder.com/200'}
                        alt={product.name}
                        className="w-full h-40 object-contain mb-3 group-hover:scale-105 transition"
                      />
                      <p className="text-sm text-gray-800 line-clamp-2 mb-2">{product.name}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[#FFA41C] text-xs">★</span>
                        ))}
                        <span className="text-xs text-gray-600 ml-1">(124)</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">AED {formatPrice(product.price)}</p>
                      {product.discount > 0 && (
                        <span className="text-xs text-red-600">Save {product.discount}%</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg p-5 sticky top-4">
              {/* Free Shipping Banner */}
              <div className="bg-[#F0F2F2] border border-[#D5D9D9] rounded-lg p-4 mb-5">
                <div className="flex items-start gap-3">
                  <FaTruck className="text-teal-700 text-xl flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-900 font-medium mb-1">
                      Your order qualifies for FREE Shipping
                    </p>
                    <p className="text-xs text-gray-700">
                      Choose this option at checkout.{' '}
                      <Link to="/checkout" className="text-[#007185] hover:text-[#C7511F] hover:underline">
                        See details
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-lg text-gray-700">
                    Subtotal ({getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}):
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  AED {formatPrice(getCartTotal())}
                </div>
              </div>

              {/* Proceed to Buy Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium rounded-lg shadow-sm transition mb-3"
              >
                Proceed to Buy
              </button>

              {/* Extra Benefits */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <FaCheckCircle className="text-green-600" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <FaTruck className="text-teal-700" />
                  <span>Fast & reliable delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}