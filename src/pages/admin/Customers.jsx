// ==========================================
// 📁 FILE: src/pages/admin/Customers.jsx
// ==========================================
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useCustomers } from '../../hooks/useCustomers';

const Customers = () => {
  const { customers } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#E5E5E5]">Customers</h1>
            <p className="text-[#9CA3AF]">Manage your customer database</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
        />

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0A0A0A]">
              <tr>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Name</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Email</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Phone</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Orders</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Total Spent</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Joined</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, idx) => (
                <tr key={customer.id} className={`border-t border-[#2A2A2A] ${idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'} hover:bg-[#2A2A2A] transition`}>
                  <td className="py-4 px-6 text-[#E5E5E5] font-medium">{customer.name}</td>
                  <td className="py-4 px-6 text-[#9CA3AF]">{customer.email}</td>
                  <td className="py-4 px-6 text-[#9CA3AF]">{customer.phone}</td>
                  <td className="py-4 px-6 text-[#E5E5E5]">{customer.orders}</td>
                  <td className="py-4 px-6 text-[#E5E5E5] font-semibold">${customer.spent.toFixed(2)}</td>
                  <td className="py-4 px-6 text-[#9CA3AF]">{customer.joined}</td>
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

export default Customers;

