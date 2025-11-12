// ==========================================
// 📁 FILE: src/pages/admin/Orders.jsx
// ==========================================
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useOrders } from '../../hooks/useOrders';

const Orders = () => {
  const { orders } = useOrders();
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#E5E5E5]">Orders</h1>
            <p className="text-[#9CA3AF]">Manage customer orders</p>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0A0A0A]">
              <tr>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Order ID</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Customer</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Email</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Date</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Items</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Total</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => (
                <tr key={order.id} className={`border-t border-[#2A2A2A] ${idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'} hover:bg-[#2A2A2A] transition`}>
                  <td className="py-4 px-6 text-[#E5E5E5] font-semibold">{order.id}</td>
                  <td className="py-4 px-6 text-[#E5E5E5]">{order.customer}</td>
                  <td className="py-4 px-6 text-[#9CA3AF]">{order.email}</td>
                  <td className="py-4 px-6 text-[#9CA3AF]">{order.date}</td>
                  <td className="py-4 px-6 text-[#E5E5E5]">{order.items}</td>
                  <td className="py-4 px-6 text-[#E5E5E5] font-semibold">${order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-[#6D28D9] hover:text-[#5B21B6] transition">👁️ View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
