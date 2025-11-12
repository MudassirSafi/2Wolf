// ==========================================
// 📁 FILE: src/pages/admin/UsersSettings.jsx
// ==========================================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const UsersSettings = () => {
  const [users] = useState([
    { id: 1, name: 'Admin User', email: 'admin@2wolf.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'John Manager', email: 'john@2wolf.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Sarah Support', email: 'sarah@2wolf.com', role: 'Support', status: 'Inactive' }
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/settings" className="text-[#6D28D9] hover:text-[#5B21B6]">← Back</Link>
          <div>
            <h1 className="text-3xl font-bold text-[#E5E5E5]">Users & Roles</h1>
            <p className="text-[#9CA3AF]">Manage admin users and permissions</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#2A2A2A] flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#E5E5E5]">Admin Users</h2>
            <button className="px-4 py-2 bg-[#6D28D9] text-white rounded-lg font-semibold hover:bg-[#5B21B6] transition">
              + Add User
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-[#0A0A0A]">
              <tr>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Name</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Email</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Role</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Status</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className={`border-t border-[#2A2A2A] ${idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'}`}>
                  <td className="py-4 px-6 text-[#E5E5E5] font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-[#9CA3AF]">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#6D28D9]/20 text-[#6D28D9]">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-[#6D28D9] hover:text-[#5B21B6]">✏️</button>
                      <button className="text-red-400 hover:text-red-500">🗑️</button>
                    </div>
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

export default UsersSettings;

