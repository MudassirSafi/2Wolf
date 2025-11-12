// ==========================================
// 📁 FILE: src/pages/admin/ShippingSettings.jsx
// ==========================================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const ShippingSettings = () => {
  const [shippingZones] = useState([
    { id: 1, name: 'Domestic Shipping', region: 'United States', rate: 9.99 },
    { id: 2, name: 'International Shipping', region: 'Worldwide', rate: 29.99 },
    { id: 3, name: 'Express Shipping', region: 'United States', rate: 19.99 }
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/settings" className="text-[#6D28D9] hover:text-[#5B21B6]">← Back</Link>
          <div>
            <h1 className="text-3xl font-bold text-[#E5E5E5]">Shipping Settings</h1>
            <p className="text-[#9CA3AF]">Configure shipping zones and rates</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#2A2A2A] flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#E5E5E5]">Shipping Zones</h2>
            <button className="px-4 py-2 bg-[#6D28D9] text-white rounded-lg font-semibold hover:bg-[#5B21B6] transition">
              + Add Zone
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-[#0A0A0A]">
              <tr>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Zone Name</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Region</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Base Rate</th>
                <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shippingZones.map((zone, idx) => (
                <tr key={zone.id} className={`border-t border-[#2A2A2A] ${idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'}`}>
                  <td className="py-4 px-6 text-[#E5E5E5] font-medium">{zone.name}</td>
                  <td className="py-4 px-6 text-[#9CA3AF]">{zone.region}</td>
                  <td className="py-4 px-6 text-[#E5E5E5] font-semibold">${zone.rate}</td>
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

export default ShippingSettings;
