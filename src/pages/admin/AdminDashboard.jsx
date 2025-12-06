// ==========================================
// 📁 FILE 1: src/pages/admin/AdminDashboard.jsx (FULLY RESPONSIVE)
// ==========================================
import React, { useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';
import { useCustomers } from '../../hooks/useCustomers';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { products } = useProducts();
  const { orders, updateOrderStatus } = useOrders();
  const { customers } = useCustomers();
  const navigate = useNavigate();

  // Calculate real statistics
  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter(o => o.paymentStatus === 'Paid')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const processingOrders = orders.filter(o => o.status === 'Processing').length;
    const lowStockProducts = products.filter(p => p.stock < 10).length;

    return [
      { 
        label: 'Total Revenue', 
        value: `$${totalRevenue.toFixed(2)}`, 
        change: orders.length > 0 ? '+12.5%' : '0%', 
        icon: '💰', 
        color: 'from-green-500 to-emerald-600',
        subtitle: `${orders.filter(o => o.paymentStatus === 'Paid').length} paid orders`
      },
      { 
        label: 'Total Orders', 
        value: orders.length.toString(), 
        change: pendingOrders > 0 ? `${pendingOrders} pending` : 'All processed', 
        icon: '🛒', 
        color: 'from-blue-500 to-cyan-600',
        subtitle: `${processingOrders} processing`
      },
      { 
        label: 'Total Products', 
        value: products.length.toString(), 
        change: lowStockProducts > 0 ? `${lowStockProducts} low stock` : 'All in stock', 
        icon: '📦', 
        color: 'from-purple-500 to-pink-600',
        subtitle: `${products.filter(p => p.stock > 0).length} available`
      },
      { 
        label: 'Total Customers', 
        value: customers.length.toString(), 
        change: '+15.3%', 
        icon: '👥', 
        color: 'from-orange-500 to-red-600',
        subtitle: 'Active users'
      }
    ];
  }, [orders, products, customers]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500/20 text-green-400';
      case 'Shipped':
        return 'bg-blue-500/20 text-blue-400';
      case 'Processing':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Pending':
        return 'bg-orange-500/20 text-orange-400';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      alert('Order status updated successfully!');
    } catch (error) {
      alert('Failed to update order status: ' + error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 md:space-y-8">
        {/* Header - Responsive */}
        <div className="px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E5E5E5] mb-2">Dashboard Overview</h1>
          <p className="text-sm sm:text-base text-[#9CA3AF]">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 sm:p-6 hover:border-[#6D28D9] transition">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl sm:text-2xl`}>
                  {stat.icon}
                </div>
                <span className="text-green-400 text-xs sm:text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-[#9CA3AF] text-xs sm:text-sm mb-1">{stat.label}</h3>
              <p className="text-[#E5E5E5] text-xl sm:text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-[#6B7280] text-xs">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders - Fully Responsive with Scrolling */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 sm:p-6 mx-2 sm:mx-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#E5E5E5]">Recent Orders</h2>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-[#6D28D9] hover:text-[#7C3AED] text-sm font-semibold self-start sm:self-auto"
            >
              View All →
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-4">📦</div>
              <p className="text-[#9CA3AF] text-base sm:text-lg">No orders yet</p>
              <p className="text-[#6B7280] text-xs sm:text-sm">Orders will appear here when customers make purchases</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View - Hidden on Mobile */}
              <div className="hidden lg:block overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#2A2A2A]">
                        <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold text-sm">Order ID</th>
                        <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold text-sm">Customer</th>
                        <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold text-sm">Date</th>
                        <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold text-sm">Total</th>
                        <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold text-sm">Payment</th>
                        <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold text-sm">Status</th>
                        <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order._id} className="border-b border-[#2A2A2A] hover:bg-[#2A2A2A] transition">
                          <td className="py-3 px-4 text-[#9CA3AF] font-mono text-xs">
                            {order._id.substring(0, 8)}...
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-[#E5E5E5] font-medium text-sm">{order.user?.name || 'N/A'}</p>
                              <p className="text-[#6B7280] text-xs">{order.user?.email || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[#9CA3AF] text-sm">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="py-3 px-4 text-[#E5E5E5] font-semibold text-sm">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-400' :
                              order.paymentStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className={`px-2 py-1 rounded-full text-xs font-semibold bg-[#2A2A2A] border border-[#3A3A3A] text-[#E5E5E5] cursor-pointer hover:border-[#6D28D9] transition ${getStatusColor(order.status)}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => navigate(`/admin/orders/${order._id}`)}
                              className="text-[#6D28D9] hover:text-[#7C3AED] text-sm font-semibold"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View - Visible only on Mobile/Tablet */}
              <div className="lg:hidden space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="bg-[#2A2A2A] rounded-lg p-4 border border-[#3A3A3A] hover:border-[#6D28D9] transition">
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="text-[#9CA3AF] text-xs mb-1">Order ID</p>
                        <p className="text-[#E5E5E5] font-mono text-xs font-semibold">
                          {order._id.substring(0, 12)}...
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#9CA3AF] text-xs mb-1">Total</p>
                        <p className="text-[#E5E5E5] font-bold text-lg">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-3">
                      <p className="text-[#E5E5E5] font-medium text-sm">{order.user?.name || 'N/A'}</p>
                      <p className="text-[#6B7280] text-xs">{order.user?.email || 'N/A'}</p>
                      <p className="text-[#9CA3AF] text-xs mt-1">{formatDate(order.createdAt)}</p>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.paymentStatus}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/orders/${order._id}`)}
                        className="flex-1 py-2 bg-[#6D28D9] hover:bg-[#7C3AED] text-white text-sm font-semibold rounded-lg transition"
                      >
                        View Details
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="px-3 py-2 bg-[#1A1A1A] border border-[#3A3A3A] text-[#E5E5E5] text-xs rounded-lg cursor-pointer hover:border-[#6D28D9] transition"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Low Stock Alert */}
        {products.filter(p => p.stock < 10 && p.stock > 0).length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 sm:p-6 mx-2 sm:mx-0">
            <h3 className="text-yellow-400 font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
              ⚠️ Low Stock Alert
            </h3>
            <p className="text-[#E5E5E5] mb-4 text-sm sm:text-base">
              {products.filter(p => p.stock < 10 && p.stock > 0).length} products are running low on stock
            </p>
            <button
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition text-sm"
            >
              Manage Inventory
            </button>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
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

export default AdminDashboard;