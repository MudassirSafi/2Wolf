// ==========================================
// 📁 FILE 2: src/pages/admin/Customers.jsx (COMPLETE)
// ==========================================
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useCustomers } from '../../hooks/useCustomers';

const Customers = () => {
  const { customers, loading, error, refetch } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Search filter
  const filteredCustomers = customers.filter(c => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (c.name?.toLowerCase() || '').includes(searchLower) ||
      (c.email?.toLowerCase() || '').includes(searchLower) ||
      (c.phone?.toLowerCase() || '').includes(searchLower)
    );
  });

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#E5E5E5]">Customers</h1>
            <p className="text-[#9CA3AF]">Manage your customer database</p>
          </div>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-[#6D28D9] text-white rounded-lg font-semibold hover:bg-[#5B21B6] transition"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
            🔍
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6D28D9]"></div>
            <p className="mt-4 text-[#9CA3AF]">Loading customers...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
            <p className="text-red-400">❌ Error: {error}</p>
            <button
              onClick={refetch}
              className="mt-3 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCustomers.length === 0 && (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-12 text-center">
            <p className="text-2xl mb-2">👥</p>
            <p className="text-[#9CA3AF]">
              {searchTerm ? 'No customers found matching your search' : 'No customers yet'}
            </p>
          </div>
        )}

        {/* Customers Table */}
        {!loading && !error && filteredCustomers.length > 0 && (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0A0A0A]">
                  <tr>
                    <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Customer</th>
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
                    <tr 
                      key={customer.id || customer._id || idx} 
                      className={`border-t border-[#2A2A2A] ${idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'} hover:bg-[#2A2A2A] transition`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#6D28D9] flex items-center justify-center text-white font-bold">
                            {(customer.name || 'U')[0].toUpperCase()}
                          </div>
                          <span className="text-[#E5E5E5] font-medium">{customer.name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#9CA3AF]">{customer.email || 'N/A'}</td>
                      <td className="py-4 px-6 text-[#9CA3AF]">{customer.phone || 'N/A'}</td>
                      <td className="py-4 px-6 text-[#E5E5E5]">
                        {customer.orders || customer.totalOrders || 0}
                      </td>
                      <td className="py-4 px-6 text-[#E5E5E5] font-semibold">
                        ${(customer.spent || customer.totalSpent || 0).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-[#9CA3AF]">
                        {formatDate(customer.joined || customer.createdAt)}
                      </td>
                      <td className="py-4 px-6">
                        <button 
                          onClick={() => handleViewCustomer(customer)}
                          className="text-[#6D28D9] hover:text-[#5B21B6] transition font-medium"
                        >
                          👁️ View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Results Count */}
            <div className="px-6 py-4 border-t border-[#2A2A2A] text-sm text-[#9CA3AF]">
              Showing {filteredCustomers.length} of {customers.length} customers
            </div>
          </div>
        )}

        {/* Customer Detail Modal */}
        {showDetailModal && selectedCustomer && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl w-full max-w-2xl shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
                <h3 className="text-2xl font-bold text-[#E5E5E5]">Customer Details</h3>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-[#9CA3AF] hover:text-white transition text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#6D28D9] flex items-center justify-center text-white font-bold text-2xl">
                    {(selectedCustomer.name || 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#E5E5E5]">{selectedCustomer.name || 'Unknown'}</h4>
                    <p className="text-[#9CA3AF]">{selectedCustomer.email || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0A0A0A] p-4 rounded-lg">
                    <p className="text-[#9CA3AF] text-sm mb-1">Phone</p>
                    <p className="text-[#E5E5E5] font-medium">{selectedCustomer.phone || 'N/A'}</p>
                  </div>
                  <div className="bg-[#0A0A0A] p-4 rounded-lg">
                    <p className="text-[#9CA3AF] text-sm mb-1">Total Orders</p>
                    <p className="text-[#E5E5E5] font-medium">{selectedCustomer.orders || selectedCustomer.totalOrders || 0}</p>
                  </div>
                  <div className="bg-[#0A0A0A] p-4 rounded-lg">
                    <p className="text-[#9CA3AF] text-sm mb-1">Total Spent</p>
                    <p className="text-[#E5E5E5] font-medium">${(selectedCustomer.spent || selectedCustomer.totalSpent || 0).toFixed(2)}</p>
                  </div>
                  <div className="bg-[#0A0A0A] p-4 rounded-lg">
                    <p className="text-[#9CA3AF] text-sm mb-1">Member Since</p>
                    <p className="text-[#E5E5E5] font-medium">{formatDate(selectedCustomer.joined || selectedCustomer.createdAt)}</p>
                  </div>
                </div>

                {selectedCustomer.address && (
                  <div className="bg-[#0A0A0A] p-4 rounded-lg">
                    <p className="text-[#9CA3AF] text-sm mb-1">Address</p>
                    <p className="text-[#E5E5E5]">{selectedCustomer.address}</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-[#2A2A2A] flex gap-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-6 py-3 bg-[#2A2A2A] text-[#E5E5E5] rounded-lg font-semibold hover:bg-[#3A3A3A] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Customers;
