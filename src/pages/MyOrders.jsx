// ==========================================
// 📁 FILE 5: src/pages/MyOrders.jsx
// Customer's order history page with real data
// ==========================================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBox, FaShippingFast, FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/signin', { state: { from: '/my-orders' } });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      console.log('✅ My orders:', data);
      setOrders(data.orders || []);
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'Shipped':
        return <FaShippingFast className="text-blue-500" />;
      case 'Processing':
        return <FaClock className="text-yellow-500" />;
      case 'Cancelled':
        return <FaTimes className="text-red-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Pending':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#B8860B] mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-[#B8860B] to-yellow-600 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-[#B8860B] transition"
            >
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-[#B8860B] to-yellow-600 px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-white/80 text-sm">Order ID</p>
                      <p className="text-white font-bold">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Order Date</p>
                      <p className="text-white font-semibold">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Total Amount</p>
                      <p className="text-white font-bold text-xl">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6">
                  {/* Status */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="font-semibold">{order.status}</span>
                    </div>
                    <div className={`px-4 py-2 rounded-lg border-2 ${
                      order.paymentStatus === 'Paid' 
                        ? 'bg-green-100 text-green-800 border-green-300' 
                        : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                    }`}>
                      <span className="font-semibold">{order.paymentStatus}</span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <FaBox className="text-[#B8860B]" />
                      Items ({order.products.length})
                    </h3>
                    {order.products.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                        <img
                          src={item.productId?.images?.[0] || 'https://via.placeholder.com/80'}
                          alt={item.productId?.name || 'Product'}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 mb-1">
                            {item.productId?.name || 'Product'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#B8860B] text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FaShippingFast className="text-blue-600" />
                      Delivery Address
                    </h3>
                    <p className="text-gray-700">{order.address}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
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
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>Order Placed</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="flex-1 py-2 border-2 border-[#B8860B] text-[#B8860B] font-semibold rounded-lg hover:bg-[#B8860B] hover:text-white transition"
                    >
                      View Details
                    </button>
                    {order.status === 'Delivered' && (
                      <button
                        onClick={() => navigate(`/`)}
                        className="flex-1 py-2 bg-gradient-to-r from-[#B8860B] to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-[#B8860B] transition"
                      >
                        Buy Again
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#B8860B] hover:text-[#B8860B] transition"
          >
            ← Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
}