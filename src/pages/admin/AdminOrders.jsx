// ==========================================
// 📁 FILE 2: src/pages/admin/AdminOrders.jsx (View All Orders)
// ==========================================
import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { useOrders } from '../../hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaDownload } from 'react-icons/fa';

const AdminOrders = () => {
  const { orders, updateOrderStatus, loading } = useOrders();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== 'All') {
      filtered = filtered.filter(order => order.paymentStatus === paymentFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'highest') {
        return b.total - a.total;
      } else if (sortBy === 'lowest') {
        return a.total - b.total;
      }
      return 0;
    });

    return filtered;
  }, [orders, searchTerm, statusFilter, paymentFilter, sortBy]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      alert('Failed to update order status: ' + error.message);
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Order ID', 'Customer', 'Email', 'Date', 'Total', 'Payment Status', 'Order Status'],
      ...filteredOrders.map(order => [
        order._id,
        order.user?.name || 'N/A',
        order.user?.email || 'N/A',
        formatDate(order.createdAt),
        order.total.toFixed(2),
        order.paymentStatus,
        order.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#E5E5E5] mb-2">All Orders</h1>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              Manage and track all customer orders ({filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'})
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#6D28D9] hover:bg-[#7C3AED] text-white font-semibold rounded-lg transition self-start sm:self-auto"
          >
            <FaDownload />
            <span className="text-sm">Export CSV</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-[#6D28D9]" />
            <h2 className="text-lg font-bold text-[#E5E5E5]">Filters</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Search</label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Order ID, Customer..."
                  className="w-full pl-10 pr-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] text-[#E5E5E5] rounded-lg focus:border-[#6D28D9] focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Order Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] text-[#E5E5E5] rounded-lg focus:border-[#6D28D9] focus:outline-none text-sm cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Payment Filter */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Payment Status</label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] text-[#E5E5E5] rounded-lg focus:border-[#6D28D9] focus:outline-none text-sm cursor-pointer"
              >
                <option value="All">All Payments</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] text-[#E5E5E5] rounded-lg focus:border-[#6D28D9] focus:outline-none text-sm cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table/Cards */}
        {filteredOrders.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-[#E5E5E5] mb-2">No orders found</h3>
            <p className="text-[#9CA3AF]">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2A2A2A] bg-[#2A2A2A]">
                    <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm">Order ID</th>
                    <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm">Customer</th>
                    <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm">Date</th>
                    <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm">Items</th>
                    <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm">Total</th>
                    <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm">Payment</th>
                    <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm">Status</th>
                    <th className="text-left py-4 px-4 text-[#E5E5E5] font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b border-[#2A2A2A] hover:bg-[#2A2A2A] transition">
                      <td className="py-4 px-4 text-[#9CA3AF] font-mono text-xs">
                        {order._id.substring(0, 10)}...
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-[#E5E5E5] font-medium text-sm">{order.user?.name || 'N/A'}</p>
                          <p className="text-[#6B7280] text-xs">{order.user?.email || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#9CA3AF] text-sm">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="py-4 px-4 text-[#E5E5E5] text-sm">
                        {order.products.length} items
                      </td>
                      <td className="py-4 px-4 text-[#E5E5E5] font-semibold text-sm">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                          order.paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs font-semibold bg-[#2A2A2A] border cursor-pointer hover:border-[#6D28D9] transition ${getStatusColor(order.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => navigate(`/admin/orders/${order._id}`)}
                          className="text-[#6D28D9] hover:text-[#7C3AED] text-sm font-semibold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
              {filteredOrders.map((order) => (
                <div key={order._id} className="bg-[#2A2A2A] rounded-lg p-4 border border-[#3A3A3A]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[#9CA3AF] text-xs mb-1">Order ID</p>
                      <p className="text-[#E5E5E5] font-mono text-xs">{order._id.substring(0, 12)}...</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#9CA3AF] text-xs mb-1">Total</p>
                      <p className="text-[#E5E5E5] font-bold text-lg">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-[#E5E5E5] font-medium text-sm">{order.user?.name || 'N/A'}</p>
                    <p className="text-[#6B7280] text-xs">{order.user?.email || 'N/A'}</p>
                    <p className="text-[#9CA3AF] text-xs mt-1">{formatDate(order.createdAt)}</p>
                    <p className="text-[#9CA3AF] text-xs">{order.products.length} items</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                      order.paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {order.paymentStatus}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                      className="flex-1 py-2 bg-[#6D28D9] hover:bg-[#7C3AED] text-white text-sm font-semibold rounded-lg transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
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

export default AdminOrders;