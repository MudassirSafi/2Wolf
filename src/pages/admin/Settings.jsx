// ==========================================
// 📁 FILE: src/pages/admin/Settings.jsx (Main Hub)
// ==========================================
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#E5E5E5]">Settings</h1>
          <p className="text-[#9CA3AF]">Configure your store settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/dashboard/settings/general" className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#6D28D9] transition group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                🏪
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E5E5E5] group-hover:text-[#6D28D9] transition">General Settings</h3>
                <p className="text-[#9CA3AF] mt-2">Store name, address, contact information, locale & currency</p>
              </div>
            </div>
          </Link>

          <Link to="/dashboard/settings/payments" className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#6D28D9] transition group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl">
                💳
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E5E5E5] group-hover:text-[#6D28D9] transition">Payment Settings</h3>
                <p className="text-[#9CA3AF] mt-2">Payment gateways, currencies, and transaction settings</p>
              </div>
            </div>
          </Link>

          <Link to="/dashboard/settings/shipping" className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#6D28D9] transition group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">
                🚚
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E5E5E5] group-hover:text-[#6D28D9] transition">Shipping Settings</h3>
                <p className="text-[#9CA3AF] mt-2">Shipping zones, rates, and delivery options</p>
              </div>
            </div>
          </Link>

          <Link to="/dashboard/settings/users" className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#6D28D9] transition group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#E5E5E5] group-hover:text-[#6D28D9] transition">Users & Roles</h3>
                <p className="text-[#9CA3AF] mt-2">Manage admin users, roles, and permissions</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;