// ==========================================
// 📁 FILE: src/pages/admin/Orders.jsx (FULLY RESPONSIVE WITH REAL DATA)
// ==========================================
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useOrders } from '../../hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaSearch, FaFilter } from 'react-icons/fa';

const Orders = () => {
  const { orders, loading } = useOrders();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    const matchesSearch = !searchTerm || 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Shipped':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Processing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Pending':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#6D28D9] mx-auto mb-4"></div>
            <p className="text-[#E5E5E5] text-lg">Loading orders...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-2 sm:p-0">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#E5E5E5]">Orders</h1>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              Manage customer orders ({filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'})
            </p>
          </div>
        </div>

        {/* Filters Section - Responsive */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-[#6D28D9]" />
            <h2 className="text-base sm:text-lg font-bold text-[#E5E5E5]">Filters</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] text-sm" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ID, Name, Email..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#2A2A2A] border border-[#3A3A3A] text-[#E5E5E5] rounded-lg focus:border-[#6D28D9] focus:outline-none text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none cursor-pointer text-sm"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* No Results */}
        {filteredOrders.length === 0 && (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-[#E5E5E5] mb-2">No orders found</h3>
            <p className="text-[#9CA3AF]">Try adjusting your filters or search term</p>
          </div>
        )}

        {/* Orders Content */}
        {filteredOrders.length > 0 && (
          <>
            {/* Desktop Table View - Hidden on Mobile/Tablet */}
            <div className="hidden xl:block bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2A2A2A]">
                    <tr>
                      <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm whitespace-nowrap">Order ID</th>
                      <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm whitespace-nowrap">Customer</th>
                      <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm whitespace-nowrap">Email</th>
                      <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm whitespace-nowrap">Date</th>
                      <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm whitespace-nowrap">Items</th>
                      <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm whitespace-nowrap">Total</th>
                      <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm whitespace-nowrap">Status</th>
                      <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, idx) => (
                      <tr 
                        key={order._id} 
                        className={`border-t border-[#2A2A2A] ${
                          idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'
                        } hover:bg-[#2A2A2A] transition`}
                      >
                        <td className="py-4 px-4 text-[#9CA3AF] font-mono text-xs">
                          {order._id.substring(0, 10)}...
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-[#E5E5E5] font-medium text-sm">{order.user?.name || 'N/A'}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-[#9CA3AF] text-sm">{order.user?.email || 'N/A'}</p>
                        </td>
                        <td className="py-4 px-4 text-[#9CA3AF] text-sm whitespace-nowrap">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-4 px-4 text-[#E5E5E5] text-sm">
                          {order.products.length}
                        </td>
                        <td className="py-4 px-4 text-[#E5E5E5] font-semibold text-sm">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button 
                            onClick={() => navigate(`/admin/orders/${order._id}`)}
                            className="flex items-center gap-2 text-[#6D28D9] hover:text-[#7C3AED] transition text-sm font-semibold"
                          >
                            <FaEye /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tablet Horizontal Scroll View - Visible on Medium Screens */}
            <div className="hidden lg:block xl:hidden bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-[#2A2A2A]">
                    <tr>
                      <th className="text-left py-3 px-3 text-[#E5E5E5] font-semibold text-sm">Order ID</th>
                      <th className="text-left py-3 px-3 text-[#E5E5E5] font-semibold text-sm">Customer</th>
                      <th className="text-left py-3 px-3 text-[#E5E5E5] font-semibold text-sm">Email</th>
                      <th className="text-left py-3 px-3 text-[#E5E5E5] font-semibold text-sm">Date</th>
                      <th className="text-left py-3 px-3 text-[#E5E5E5] font-semibold text-sm">Items</th>
                      <th className="text-left py-3 px-3 text-[#E5E5E5] font-semibold text-sm">Total</th>
                      <th className="text-left py-3 px-3 text-[#E5E5E5] font-semibold text-sm">Status</th>
                      <th className="text-left py-3 px-3 text-[#E5E5E5] font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, idx) => (
                      <tr 
                        key={order._id} 
                        className={`border-t border-[#2A2A2A] ${
                          idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'
                        } hover:bg-[#2A2A2A] transition`}
                      >
                        <td className="py-3 px-3 text-[#9CA3AF] font-mono text-xs">
                          {order._id.substring(0, 8)}...
                        </td>
                        <td className="py-3 px-3 text-[#E5E5E5] text-sm">{order.user?.name || 'N/A'}</td>
                        <td className="py-3 px-3 text-[#9CA3AF] text-sm">{order.user?.email || 'N/A'}</td>
                        <td className="py-3 px-3 text-[#9CA3AF] text-sm">{formatDate(order.createdAt)}</td>
                        <td className="py-3 px-3 text-[#E5E5E5] text-sm">{order.products.length}</td>
                        <td className="py-3 px-3 text-[#E5E5E5] font-semibold text-sm">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button 
                            onClick={() => navigate(`/admin/orders/${order._id}`)}
                            className="flex items-center gap-1 text-[#6D28D9] hover:text-[#7C3AED] text-sm"
                          >
                            <FaEye /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View - Visible on Mobile/Small Tablet */}
            <div className="lg:hidden space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar pr-1">
              {filteredOrders.map((order) => (
                <div 
                  key={order._id} 
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#6D28D9] transition"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-3 pb-3 border-b border-[#2A2A2A]">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#9CA3AF] text-xs mb-1">Order ID</p>
                      <p className="text-[#E5E5E5] font-mono text-xs font-semibold truncate">
                        {order._id}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)} ml-2`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-2 mb-3">
                    <div>
                      <p className="text-[#9CA3AF] text-xs mb-0.5">Customer</p>
                      <p className="text-[#E5E5E5] font-medium text-sm">{order.user?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] text-xs mb-0.5">Email</p>
                      <p className="text-[#E5E5E5] text-sm break-all">{order.user?.email || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-3 py-3 border-t border-b border-[#2A2A2A]">
                    <div>
                      <p className="text-[#9CA3AF] text-xs mb-1">Date</p>
                      <p className="text-[#E5E5E5] text-xs font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] text-xs mb-1">Items</p>
                      <p className="text-[#E5E5E5] text-xs font-medium">{order.products.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#9CA3AF] text-xs mb-1">Total</p>
                      <p className="text-[#6D28D9] text-base font-bold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    className="w-full py-2.5 bg-[#6D28D9] hover:bg-[#7C3AED] text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 text-sm"
                  >
                    <FaEye /> View Details
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1A1A1A;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6D28D9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7C3AED;
        }
      `}</style>
    </AdminLayout>
  );
};

export default Orders;