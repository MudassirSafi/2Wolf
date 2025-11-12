// ==========================================
// 📁 FILE: src/pages/admin/GeneralSettings.jsx
// ==========================================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { useSettings } from '../../hooks/useSettings';

const GeneralSettings = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Settings saved successfully!');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/settings" className="text-[#6D28D9] hover:text-[#5B21B6]">← Back</Link>
          <div>
            <h1 className="text-3xl font-bold text-[#E5E5E5]">General Settings</h1>
            <p className="text-[#9CA3AF]">Configure your store's basic information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Store Details */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#E5E5E5] mb-6">Store Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#E5E5E5] mb-2">Store Name</label>
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#E5E5E5] mb-2">Store Address</label>
                <input
                  type="text"
                  value={formData.storeAddress}
                  onChange={(e) => setFormData({...formData, storeAddress: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#E5E5E5] mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#E5E5E5] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Locale & Currency */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#E5E5E5] mb-6">Locale & Currency</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[#E5E5E5] mb-2">Default Language</label>
                <select
                  value={formData.defaultLanguage}
                  onChange={(e) => setFormData({...formData, defaultLanguage: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-[#E5E5E5] mb-2">Default Currency</label>
                <select
                  value={formData.defaultCurrency}
                  onChange={(e) => setFormData({...formData, defaultCurrency: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
              <div>
                <label className="block text-[#E5E5E5] mb-2">Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
                >
                  <option>America/New_York</option>
                  <option>America/Los_Angeles</option>
                  <option>Europe/London</option>
                </select>
              </div>
            </div>
          </div>

          {/* System Preferences */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">
            <h2 className="text-2xl font-bold text-[#E5E5E5] mb-6">System Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#E5E5E5] font-medium">Enable Maintenance Mode</h3>
                  <p className="text-[#9CA3AF] text-sm">Temporarily disable storefront access</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, maintenanceMode: !formData.maintenanceMode})}
                  className={`w-14 h-8 rounded-full transition ${formData.maintenanceMode ? 'bg-[#6D28D9]' : 'bg-[#2A2A2A]'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${formData.maintenanceMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#E5E5E5] font-medium">Allow Guest Checkout</h3>
                  <p className="text-[#9CA3AF] text-sm">Let customers checkout without creating an account</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, guestCheckout: !formData.guestCheckout})}
                  className={`w-14 h-8 rounded-full transition ${formData.guestCheckout ? 'bg-[#6D28D9]' : 'bg-[#2A2A2A]'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${formData.guestCheckout ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-8 py-3 bg-[#6D28D9] text-white rounded-lg font-semibold hover:bg-[#5B21B6] transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setFormData(settings)}
              className="px-8 py-3 bg-transparent border border-[#2A2A2A] text-[#E5E5E5] rounded-lg font-semibold hover:bg-[#2A2A2A] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default GeneralSettings;

