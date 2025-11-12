// ==========================================
// 📁 FILE: src/pages/admin/AdminDashboard.jsx
// ==========================================
import React from 'react';
import AdminLayout from './AdminLayout';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';
import { useCustomers } from '../../hooks/useCustomers';

const AdminDashboard = () => {
  const { products } = useProducts();
  const { orders } = useOrders();
  const { customers } = useCustomers();

  const stats = [
    { label: 'Total Revenue', value: '$12,450', change: '+12.5%', icon: '💰', color: 'from-green-500 to-emerald-600' },
    { label: 'Total Orders', value: orders.length.toString(), change: '+8.2%', icon: '🛒', color: 'from-blue-500 to-cyan-600' },
    { label: 'Total Products', value: products.length.toString(), change: '+3.1%', icon: '📦', color: 'from-purple-500 to-pink-600' },
    { label: 'Total Customers', value: customers.length.toString(), change: '+15.3%', icon: '👥', color: 'from-orange-500 to-red-600' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#E5E5E5] mb-2">Dashboard Overview</h1>
          <p className="text-[#9CA3AF]">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#6D28D9] transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-[#9CA3AF] text-sm mb-1">{stat.label}</h3>
              <p className="text-[#E5E5E5] text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">
          <h2 className="text-xl font-bold text-[#E5E5E5] mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold">Order ID</th>
                  <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold">Total</th>
                  <th className="text-left py-3 px-4 text-[#E5E5E5] font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-[#2A2A2A] hover:bg-[#2A2A2A] transition">
                    <td className="py-3 px-4 text-[#9CA3AF]">{order.id}</td>
                    <td className="py-3 px-4 text-[#E5E5E5]">{order.customer}</td>
                    <td className="py-3 px-4 text-[#E5E5E5]">${order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
