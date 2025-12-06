// ==========================================
// 📁 FILE 3: src/pages/TrackOrder.jsx (UPDATED)
// Now uses the StoreLocationMap component
// ==========================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaBox, 
  FaShippingFast, 
  FaCheckCircle, 
  FaClock,
  FaTruck,
  FaHome
} from 'react-icons/fa';
import StoreLocationMap from '../components/StoreLocationMap';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TrackOrder = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const trackOrder = async (e) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      setError('Please enter an Order ID');
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });

      if (!response.ok) {
        throw new Error('Order not found. Please check your Order ID.');
      }

      const data = await response.json();
      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Processing': return 25;
      case 'Shipped': return 50;
      case 'Out for Delivery': return 75;
      case 'Delivered': return 100;
      default: return 0;
    }
  };

  const getStatusIcon = (status, currentStatus) => {
    const isActive = getStatusProgress(currentStatus) >= getStatusProgress(status);
    const iconClass = `text-2xl ${isActive ? 'text-green-500' : 'text-gray-500'}`;

    switch (status) {
      case 'Pending':
        return <FaClock className={iconClass} />;
      case 'Processing':
        return <FaBox className={iconClass} />;
      case 'Shipped':
        return <FaTruck className={iconClass} />;
      case 'Delivered':
        return <FaCheckCircle className={iconClass} />;
      default:
        return <FaBox className={iconClass} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Enter your order ID to track your shipment
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-6 border-b pb-4">
            <button
              className="flex-1 py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-[#B8860B] to-yellow-600 text-white"
            >
              Track by Order ID
            </button>
            <button
              onClick={() => {
                const token = localStorage.getItem('token');
                if (token) {
                  navigate('/my-orders');
                } else {
                  navigate('/signin', { state: { from: '/my-orders' } });
                }
              }}
              className="flex-1 py-3 px-4 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              View My Orders
            </button>
          </div>

          <form onSubmit={trackOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order ID
              </label>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B8860B] focus:outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Find your Order ID in your confirmation email
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#B8860B] to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-[#B8860B] transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                  Tracking...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaSearch /> Track Order
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Order Tracking Result */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Order Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Status</h2>
                  <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">Placed: {formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-2xl font-bold text-[#B8860B]">${order.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
                    <div key={status} className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        getStatusProgress(order.status) >= getStatusProgress(status)
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}>
                        {getStatusIcon(status, order.status)}
                      </div>
                      <p className={`text-xs mt-2 font-semibold text-center ${
                        getStatusProgress(order.status) >= getStatusProgress(status)
                          ? 'text-green-600'
                          : 'text-gray-500'
                      }`}>
                        {status}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${getStatusProgress(order.status)}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Status Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <FaShippingFast className="text-blue-600 text-3xl" />
                  <div>
                    <p className="font-semibold text-gray-800">Status: {order.status}</p>
                    <p className="text-sm text-gray-600">
                      {order.status === 'Delivered' && 'Your order has been delivered!'}
                      {order.status === 'Shipped' && 'Your order is on the way!'}
                      {order.status === 'Processing' && 'Preparing your order for shipment.'}
                      {order.status === 'Pending' && 'Order received and pending.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaHome className="text-gray-600 text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Delivery Address</p>
                    <p className="text-sm text-gray-600">{order.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBox className="text-[#B8860B]" />
                Order Items ({order.products.length})
              </h3>
              <div className="space-y-4">
                {order.products.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                    <img
                      src={item.productId?.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.productId?.name || 'Product'}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.productId?.name || 'Product'}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <p className="font-bold text-[#B8860B] text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Location - Using Component */}
            <StoreLocationMap showFullMap={true} />

            {/* Estimated Delivery */}
            {order.status !== 'Delivered' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-700">
                  <strong>Estimated Delivery:</strong> 
                  {order.status === 'Shipped' && ' 2-3 business days'}
                  {order.status === 'Processing' && ' 3-5 business days'}
                  {order.status === 'Pending' && ' 5-7 business days'}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Help Section - Always visible */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="text-[#B8860B] text-2xl">📧</div>
              <div>
                <p className="font-semibold text-gray-800">Email Support</p>
                <p className="text-sm text-gray-600">support@2wolf.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="text-[#B8860B] text-2xl">📞</div>
              <div>
                <p className="font-semibold text-gray-800">Call Us</p>
                <p className="text-sm text-gray-600">+1-555-2WOLF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;