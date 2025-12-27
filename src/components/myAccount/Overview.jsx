// src/components/myAccount/Overview.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaShoppingBag, FaCheckCircle, FaClock, FaHeart, 
  FaBox, FaEye, FaShippingFast 
} from 'react-icons/fa';

export default function Overview({ orders, wishlistCount, setActiveTab }) {
  const navigate = useNavigate();

  const calculateStats = () => {
    const total = orders.length;
    const delivered = orders.filter(o => o.status === 'Delivered').length;
    const pending = orders.filter(o => ['Pending', 'Processing'].includes(o.status)).length;
    const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    return { total, delivered, pending, totalSpent };
  };

  const stats = calculateStats();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <FaCheckCircle className="text-green-500" />;
      case 'Shipped': return <FaShippingFast className="text-blue-500" />;
      case 'Processing': return <FaClock className="text-orange-500" />;
      default: return <FaBox className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Account Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-4 sm:p-6 border border-orange-200"
        >
          <FaShoppingBag className="text-2xl sm:text-3xl text-orange-600 mb-2 sm:mb-3" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Orders</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 sm:p-6 border border-green-200"
        >
          <FaCheckCircle className="text-2xl sm:text-3xl text-green-600 mb-2 sm:mb-3" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Delivered</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.delivered}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 sm:p-6 border border-blue-200"
        >
          <FaClock className="text-2xl sm:text-3xl text-blue-600 mb-2 sm:mb-3" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 sm:p-6 border border-purple-200"
        >
          <FaHeart className="text-2xl sm:text-3xl text-purple-600 mb-2 sm:mb-3" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Wishlist</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{wishlistCount}</p>
        </motion.div>
      </div>

      {/* Total Spent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 mb-8 text-white"
      >
        <p className="text-sm text-white/80 mb-2">Total Spent</p>
        <p className="text-3xl sm:text-4xl font-bold">AED {stats.totalSpent.toFixed(2)}</p>
        <p className="text-sm text-white/60 mt-2">Since you joined</p>
      </motion.div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Recent Orders</h3>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-1"
          >
            View All <FaEye />
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FaShoppingBag className="text-5xl text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No orders yet</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 3).map((order, idx) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <div className={`p-3 rounded-lg ${getStatusColor(order.status).split(' ')[0]}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">#{order._id.slice(-8)}</p>
                    <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:block sm:text-right">
                  <div>
                    <p className="font-bold text-gray-900">AED {order.total.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}