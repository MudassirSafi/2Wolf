// ==========================================
// 📁 FILE 3: src/pages/admin/AdminOrderDetail.jsx (View Single Order Detail)
// ==========================================
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaMapMarkerAlt, FaBox, FaCreditCard, FaShippingFast, FaClock } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }

      const data = await response.json();
      console.log('✅ Order detail:', data);
      setOrder(data.order);
    } catch (err) {
      console.error('❌ Error fetching order:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const data = await response.json();
      setOrder(data.order);
      alert('Order status updated successfully!');
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500/20 text-green-400 border-green-500';
      case 'Shipped':
        return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'Processing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'Pending':
        return 'bg-orange-500/20 text-orange-400 border-orange-500';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#6D28D9] mx-auto mb-4"></div>
            <p className="text-[#E5E5E5] text-lg">Loading order details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !order) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#E5E5E5] mb-4">Order Not Found</h2>
          <p className="text-[#9CA3AF] mb-6">{error || 'This order does not exist'}</p>
          <button
            onClick={() => navigate('/admin/orders')}
            className="px-6 py-3 bg-[#6D28D9] hover:bg-[#7C3AED] text-white font-semibold rounded-lg transition"
          >
            Back to Orders
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-2 sm:p-0 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/orders')}
              className="p-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#E5E5E5] rounded-lg transition"
            >
              <FaArrowLeft />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#E5E5E5]">Order Details</h1>
              <p className="text-sm text-[#9CA3AF] font-mono">ID: {order._id}</p>
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-lg border-2 font-semibold ${getStatusColor(order.status)}`}>
            {order.status}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 sm:p-6">
              <h2 className="text-lg font-bold text-[#E5E5E5] mb-4 flex items-center gap-2">
                <FaUser className="text-[#6D28D9]" />
                Customer Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaUser className="text-[#9CA3AF] mt-1" />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Name</p>
                    <p className="text-[#E5E5E5] font-medium">{order.user?.name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-[#9CA3AF] mt-1" />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Email</p>
                    <p className="text-[#E5E5E5]">{order.user?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#9CA3AF] mt-1" />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Delivery Address</p>
                    <p className="text-[#E5E5E5]">{order.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 sm:p-6">
              <h2 className="text-lg font-bold text-[#E5E5E5] mb-4 flex items-center gap-2">
                <FaBox className="text-[#6D28D9]" />
                Order Items ({order.products.length})
              </h2>
              <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                {order.products.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-[#2A2A2A] rounded-lg p-3 sm:p-4">
                    <img
                      src={item.productId?.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.productId?.name || 'Product'}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#E5E5E5] font-semibold text-sm sm:text-base truncate">
                        {item.productId?.name || 'Product'}
                      </p>
                      <p className="text-[#9CA3AF] text-xs sm:text-sm">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#6D28D9] font-bold text-base sm:text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 sm:p-6 sticky top-6">
              <h2 className="text-lg font-bold text-[#E5E5E5] mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">Subtotal</span>
                  <span className="text-[#E5E5E5] font-semibold">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF]">Shipping</span>
                  <span className="text-green-400 font-semibold">Free</span>
                </div>
                <div className="border-t border-[#2A2A2A] pt-3 flex justify-between">
                  <span className="text-[#E5E5E5] font-bold">Total</span>
                  <span className="text-[#6D28D9] font-bold text-xl">${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Status */}
              <div className="mb-6 p-3 bg-[#2A2A2A] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#9CA3AF] text-sm flex items-center gap-2">
                    <FaCreditCard />
                    Payment Status
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="text-[#E5E5E5] text-sm">{order.paymentMethod || 'Stripe'}</p>
                {order.paidAt && (
                  <p className="text-[#6B7280] text-xs mt-1">
                    Paid on {formatDate(order.paidAt)}
                  </p>
                )}
              </div>

              {/* Order Timeline */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-[#E5E5E5] mb-3 flex items-center gap-2">
                  <FaClock className="text-[#6D28D9]" />
                  Order Timeline
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${order.status === 'Pending' || order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-[#3A3A3A]'}`}></div>
                    <span className="text-[#9CA3AF]">Order Placed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-[#3A3A3A]'}`}></div>
                    <span className="text-[#9CA3AF]">Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-[#3A3A3A]'}`}></div>
                    <span className="text-[#9CA3AF]">Shipped</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-[#3A3A3A]'}`}></div>
                    <span className="text-[#9CA3AF]">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Order Date */}
              <div className="text-xs text-[#6B7280] mb-4">
                <p>Order Date: {formatDate(order.createdAt)}</p>
                {order.updatedAt !== order.createdAt && (
                  <p>Last Updated: {formatDate(order.updatedAt)}</p>
                )}
              </div>

              {/* Update Status */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Update Order Status
                </label>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(e.target.value)}
                  disabled={updating}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] text-[#E5E5E5] rounded-lg focus:border-[#6D28D9] focus:outline-none cursor-pointer disabled:opacity-50"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1A1A1A;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6D28D9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7C3AED;
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminOrderDetail;