// 📁 PART 1: src/pages/TrackOrder.jsx (ENHANCED with J&T API)
// User-facing order tracking with J&T Express integration
// ==========================================
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TrackOrder = () => {
  const navigate = useNavigate();
  const { trackingNumber: urlTrackingNumber } = useParams();
  
  const [searchType, setSearchType] = useState('order'); // 'order' or 'tracking'
  const [orderId, setOrderId] = useState('');
  const [trackingNumber, setTrackingNumber] = useState(urlTrackingNumber || '');
  const [order, setOrder] = useState(null);
  const [jntTracking, setJntTracking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If URL has tracking number, auto-track on load
  useEffect(() => {
    if (urlTrackingNumber) {
      setSearchType('tracking');
      trackByTrackingNumber(urlTrackingNumber);
    }
  }, [urlTrackingNumber]);

  const trackByOrderId = async (e) => {
    e?.preventDefault();
    if (!orderId.trim()) {
      setError('Please enter an Order ID');
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);
    setJntTracking(null);

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

      // If order has J&T tracking number, get live tracking
      if (data.order.shipping?.trackingNumber) {
        await fetchJNTTracking(data.order.shipping.trackingNumber);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const trackByTrackingNumber = async (trackNum) => {
    const numToTrack = trackNum || trackingNumber;
    if (!numToTrack.trim()) {
      setError('Please enter a Tracking Number');
      return;
    }

    setLoading(true);
    setError(null);
    setJntTracking(null);

    try {
      await fetchJNTTracking(numToTrack);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchJNTTracking = async (trackNum) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/shipping/track/${trackNum}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        setJntTracking(data.tracking);
        setError(null);
      } else {
        throw new Error('Tracking information not available yet. Please try again in a few hours.');
      }
    } catch (err) {
      console.error('J&T Tracking error:', err);
      // Don't throw error, just log it - order might be too new
      setError('Live tracking not available yet. Check back soon!');
    }
  };

  const getStatusProgress = (status) => {
    const statusMap = {
      'Pending': 0,
      'Processing': 25,
      'Confirmed': 25,
      'Shipped': 50,
      'Out for Delivery': 75,
      'Delivered': 100
    };
    return statusMap[status] || 0;
  };

  const getStatusIcon = (status, currentStatus) => {
    const isActive = getStatusProgress(currentStatus) >= getStatusProgress(status);
    const iconClass = `text-2xl ${isActive ? 'text-green-500' : 'text-gray-400'}`;
    
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
    if (!dateString) return 'N/A';
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
            Real-time tracking powered by J&T Express
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {/* Toggle between Order ID and Tracking Number */}
          <div className="flex gap-4 mb-6 border-b pb-4">
            <button
              onClick={() => setSearchType('order')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                searchType === 'order'
                  ? 'bg-gradient-to-r from-[#B8860B] to-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Track by Order ID
            </button>
            <button
              onClick={() => setSearchType('tracking')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                searchType === 'tracking'
                  ? 'bg-gradient-to-r from-[#B8860B] to-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Track by Tracking #
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

          {/* Search Input */}
          <form onSubmit={searchType === 'order' ? trackByOrderId : (e) => { e.preventDefault(); trackByTrackingNumber(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {searchType === 'order' ? 'Order ID' : 'J&T Tracking Number'}
              </label>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchType === 'order' ? (
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter your order ID (e.g., 675a1234...)"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B8860B] focus:outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter J&T tracking number (e.g., JT1234567890)"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B8860B] focus:outline-none"
                  />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {searchType === 'order' 
                  ? 'Find your Order ID in your confirmation email'
                  : 'Find your tracking number in order confirmation or My Orders'}
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
                  <FaSearch /> Track Package
                </span>
              )}
            </button>
          </form>
        </div>

        {/* J&T Live Tracking Result */}
        {jntTracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Live Status Card */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-6 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaTruck className="text-purple-600 text-2xl" />
                    <h2 className="text-2xl font-bold text-gray-800">Live Tracking</h2>
                  </div>
                  <p className="text-sm text-gray-600">J&T Express: {jntTracking.billCode}</p>
                  {jntTracking.lastUpdate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Last updated: {formatDate(jntTracking.lastUpdate)}
                    </p>
                  )}
                </div>
                <span className={`px-4 py-2 rounded-full font-bold ${
                  jntTracking.status === 'Delivered' ? 'bg-green-500 text-white' :
                  jntTracking.status === 'Shipped' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {jntTracking.status}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                <FaMapMarkerAlt className="text-purple-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-600">Current Location</p>
                  <p className="font-semibold text-gray-800">{jntTracking.currentLocation || 'In Transit'}</p>
                </div>
              </div>
            </div>

            {/* Tracking History Timeline */}
            {jntTracking.history && jntTracking.history.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaShippingFast className="text-[#B8860B]" />
                  Shipment Journey
                </h3>
                <div className="space-y-4">
                  {jntTracking.history.map((event, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      {idx !== jntTracking.history.length - 1 && (
                        <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      <div className="flex-shrink-0">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          idx === 0 ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {idx === 0 && <div className="w-3 h-3 bg-white rounded-full"></div>}
                        </div>
                      </div>
                      <div className="flex-1 pb-6">
                        <p className="font-semibold text-gray-800">{event.status}</p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(event.time)}
                        </p>
                        {event.scanType && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-2 inline-block">
                            {event.scanType}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Order Details (if searched by Order ID) */}
        {order && !jntTracking && (
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
                  {order.shipping?.trackingNumber && (
                    <p className="text-sm font-semibold text-purple-600 mt-2">
                      Tracking: {order.shipping.trackingNumber}
                    </p>
                  )}
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

              {/* Get Live Tracking Button */}
              {order.shipping?.trackingNumber && (
                <button
                  onClick={() => {
                    setSearchType('tracking');
                    setTrackingNumber(order.shipping.trackingNumber);
                    trackByTrackingNumber(order.shipping.trackingNumber);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition flex items-center justify-center gap-2"
                >
                  <FaTruck />
                  Get Live J&T Tracking
                </button>
              )}

              {/* Delivery Address */}
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <FaHome className="text-gray-600 text-xl mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Delivery Address</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress?.fullName}<br />
                      {order.shippingAddress?.address}<br />
                      {order.shippingAddress?.city}, {order.shippingAddress?.country}
                    </p>
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
                      <p className="font-semibold text-gray-800">{item.productId?.name || item.name || 'Product'}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <p className="font-bold text-[#B8860B] text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Need Help with Your Order?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-[#B8860B] text-2xl" />
              <div>
                <p className="font-semibold text-gray-800">Email Support</p>
                <p className="text-sm text-gray-600">support@2wolf.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <FaPhone className="text-[#B8860B] text-2xl" />
              <div>
                <p className="font-semibold text-gray-800">Call Us</p>
                <p className="text-sm text-gray-600">+971 50 123 4567</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <FaTruck className="text-[#B8860B] text-2xl" />
              <div>
                <p className="font-semibold text-gray-800">J&T Express</p>
                <p className="text-sm text-gray-600">Powered by J&T</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;