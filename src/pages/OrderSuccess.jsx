// ==========================================
// 📁 FILE 4: src/pages/OrderSuccess.jsx (FIXED - No infinite loop)
// ==========================================
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShippingFast, FaBox } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  
  // ✅ FIX: Use ref to prevent infinite loop
  const hasVerified = useRef(false);

  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // ✅ FIX: Only verify once
    if (hasVerified.current) return;
    
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('No session ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 Verifying payment for session:', sessionId);
        hasVerified.current = true; // ✅ Mark as verified

        const response = await fetch(
          `${API_BASE_URL}/api/orders/verify-payment/${sessionId}`
        );

        if (!response.ok) {
          throw new Error('Failed to verify payment');
        }

        const data = await response.json();
        console.log('✅ Payment verified:', data);

        if (data.paymentStatus === 'paid') {
          setOrder(data.order);
          clearCart(); // Clear cart after successful order
        } else {
          setError('Payment not completed');
        }
      } catch (err) {
        console.error('❌ Verification error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]); // ✅ Only depend on sessionId

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#B8860B] mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Verification Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/checkout')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-xl hover:from-yellow-400 hover:to-amber-500 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {/* Success Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block"
            >
              <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {/* Order Details */}
          {order && (
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="font-bold text-gray-800 text-sm">{order._id}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="font-bold text-2xl text-green-600">${order.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Order Status */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaShippingFast className="text-[#B8860B]" />
                  Order Status
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">
                        {order.status}
                      </span>
                      <span className="text-sm text-green-600 font-semibold">
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#B8860B] to-yellow-500 h-2 rounded-full transition-all"
                        style={{ 
                          width: order.status === 'Delivered' ? '100%' : 
                                 order.status === 'Shipped' ? '66%' : 
                                 order.status === 'Processing' ? '33%' : '10%' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaBox className="text-[#B8860B]" />
                  Order Items
                </h3>
                <div className="space-y-3">
                  {order.products.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                      <img
                        src={item.productId?.images?.[0] || 'https://via.placeholder.com/80'}
                        alt={item.productId?.name || 'Product'}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {item.productId?.name || 'Product'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-bold text-[#B8860B]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Delivery Address</h3>
                <p className="text-gray-700">{order.address}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/my-orders')}
                  className="flex-1 py-3 bg-gradient-to-r from-[#B8860B] to-yellow-600 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-[#B8860B] transition"
                >
                  View My Orders
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 py-3 border-2 border-[#B8860B] text-[#B8860B] font-semibold rounded-xl hover:bg-[#B8860B] hover:text-white transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Email Notification */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-gray-600"
        >
          <p>📧 A confirmation email has been sent to your email address.</p>
        </motion.div>
      </div>
    </div>
  );
}