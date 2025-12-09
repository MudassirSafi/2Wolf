// ✅ src/pages/Checkout.jsx - Updated with Location Integration
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { cartApi } from '../api/cartApi';
import { motion } from 'framer-motion';
import { FaCreditCard, FaShippingFast, FaLock, FaMapMarkerAlt } from 'react-icons/fa';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  // Load user location from localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      const location = JSON.parse(savedLocation);
      setUserLocation(location);
      
      // Pre-fill shipping info with saved location
      setShippingInfo(prev => ({
        ...prev,
        country: location.countryName || '',
        city: location.city || '',
        state: location.area || '' // Use area as state/province
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'country'];
    for (let field of required) {
      if (!shippingInfo[field]?.trim()) {
        setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Phone validation (basic)
    if (shippingInfo.phone.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please sign in to continue');
        setTimeout(() => {
          navigate('/signin', { state: { from: '/checkout' } });
        }, 2000);
        return;
      }

      // Prepare items for backend
      const items = cart.map(item => ({
        productId: item._id || item.id,
        name: item.name || item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.images?.[0] || 'https://via.placeholder.com/150'
      }));

      console.log('📦 Creating order with items:', items);
      console.log('📍 Shipping info:', shippingInfo);

      // Create checkout session with shipping info
      const response = await cartApi.createCheckoutSession(items, token, shippingInfo);
      
      console.log('✅ Checkout session created:', response);

      // Redirect to Stripe
      if (response.url) {
        console.log('🔗 Redirecting to Stripe...');
        window.location.href = response.url;
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (err) {
      console.error('❌ Checkout error:', err);
      setError(err.message || 'Failed to process payment. Please try again.');
      setLoading(false);
    }
  };

  const handleChangeLocation = () => {
    navigate('/', { state: { openLocationModal: true } });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Please sign in to checkout</h2>
          <button
            onClick={() => navigate('/signin', { state: { from: '/checkout' } })}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-xl hover:from-yellow-400 hover:to-amber-500 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-xl hover:from-yellow-400 hover:to-amber-500 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Secure Checkout</h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
          >
            <span>⚠️</span>
            <span>{error}</span>
          </motion.div>
        )}

        {/* Location Display Banner */}
        {userLocation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-600">Delivering to:</p>
                  <p className="font-bold text-gray-800">
                    {userLocation.countryName} - {userLocation.city}
                    {userLocation.area && ` - ${userLocation.area}`}
                  </p>
                </div>
              </div>
              <button
                onClick={handleChangeLocation}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition"
              >
                Change
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FaShippingFast className="text-[#B8860B] text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                      placeholder="+971 50 123 4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:outline-none bg-gray-50"
                      placeholder="United Arab Emirates"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                      placeholder="Building name, Street name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:outline-none bg-gray-50"
                      placeholder="Dubai"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area/District (Optional)
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:outline-none bg-gray-50"
                      placeholder="Downtown"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP/Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
                      placeholder="00000"
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">💡 Tip:</span> Make sure your delivery address matches your selected location for accurate delivery estimates.
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaLock className="text-[#B8860B] text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <FaCreditCard className="text-blue-600 text-3xl" />
                    <div>
                      <p className="font-semibold text-gray-800">Secure Card Payment</p>
                      <p className="text-sm text-gray-600">Pay securely with your credit or debit card via Stripe</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaLock className="text-green-600" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 
                           hover:from-blue-600 hover:to-blue-700 text-white font-bold 
                           rounded-xl shadow-lg transition transform hover:scale-[1.02]
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaCreditCard />
                    <span>Pay AED {getCartTotal().toFixed(2)} with Card</span>
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                You will be redirected to Stripe's secure payment page
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id || item.id} className="flex gap-3">
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.name || item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name || item.title}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-[#B8860B]">
                        AED {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>AED {getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (5%)</span>
                  <span>AED {(getCartTotal() * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>AED {(getCartTotal() * 1.05).toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Info */}
              {userLocation && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <FaShippingFast className="text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800">Estimated Delivery</p>
                      <p>3-5 business days to {userLocation.city}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}