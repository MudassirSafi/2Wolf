import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ShippingSettings = () => {
  const [shippingZones, setShippingZones] = useState([
    { 
      id: 1, 
      name: 'UAE - Dubai', 
      country: 'United Arab Emirates',
      city: 'Dubai',
      rate: 15.00,
      estimatedDays: '2-3'
    },
    { 
      id: 2, 
      name: 'UAE - Abu Dhabi', 
      country: 'United Arab Emirates',
      city: 'Abu Dhabi',
      rate: 15.00,
      estimatedDays: '2-3'
    },
    { 
      id: 3, 
      name: 'Saudi Arabia - Riyadh', 
      country: 'Saudi Arabia',
      city: 'Riyadh',
      rate: 25.00,
      estimatedDays: '3-5'
    },
    { 
      id: 4, 
      name: 'Qatar - Doha', 
      country: 'Qatar',
      city: 'Doha',
      rate: 20.00,
      estimatedDays: '3-4'
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    rate: '',
    estimatedDays: ''
  });

  const gccCountries = [
    { name: 'United Arab Emirates', cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'] },
    { name: 'Saudi Arabia', cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Tabuk'] },
    { name: 'Qatar', cities: ['Doha', 'Al Wakrah', 'Al Rayyan', 'Umm Salal', 'Al Khor'] },
    { name: 'Oman', cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Barka'] },
    { name: 'Bahrain', cities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town'] },
    { name: 'Kuwait', cities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Farwaniya', 'Ahmadi'] }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' && { city: '' })
    }));
  };

  const handleAddZone = (e) => {
    e.preventDefault();
    
    const newZone = {
      id: shippingZones.length + 1,
      name: `${formData.country} - ${formData.city}`,
      country: formData.country,
      city: formData.city,
      rate: parseFloat(formData.rate),
      estimatedDays: formData.estimatedDays
    };

    setShippingZones([...shippingZones, newZone]);
    setShowAddModal(false);
    setFormData({ country: '', city: '', rate: '', estimatedDays: '' });
  };

  const handleEditZone = (zone) => {
    setEditingZone(zone);
    setFormData({
      country: zone.country,
      city: zone.city,
      rate: zone.rate.toString(),
      estimatedDays: zone.estimatedDays
    });
    setShowEditModal(true);
  };

  const handleUpdateZone = (e) => {
    e.preventDefault();
    
    const updatedZone = {
      ...editingZone,
      name: `${formData.country} - ${formData.city}`,
      country: formData.country,
      city: formData.city,
      rate: parseFloat(formData.rate),
      estimatedDays: formData.estimatedDays
    };

    setShippingZones(shippingZones.map(zone => 
      zone.id === editingZone.id ? updatedZone : zone
    ));
    setShowEditModal(false);
    setEditingZone(null);
    setFormData({ country: '', city: '', rate: '', estimatedDays: '' });
  };

  const handleDeleteZone = (id) => {
    if (window.confirm('Are you sure you want to delete this shipping zone?')) {
      setShippingZones(shippingZones.filter(zone => zone.id !== id));
    }
  };

  const selectedCountry = gccCountries.find(c => c.name === formData.country);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="text-[#6D28D9] hover:text-[#5B21B6] transition">
            ← Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#E5E5E5]">Shipping Settings</h1>
            <p className="text-[#9CA3AF]">Configure GCC shipping zones and rates</p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#2A2A2A] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E5E5E5]">GCC Shipping Zones</h2>
              <p className="text-sm text-[#9CA3AF] mt-1">Manage shipping zones for Gulf Cooperation Council countries</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2.5 bg-[#6D28D9] text-white rounded-lg font-semibold hover:bg-[#5B21B6] transition shadow-lg shadow-[#6D28D9]/20"
            >
              + Add Zone
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0A0A0A]">
                <tr>
                  <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Zone Name</th>
                  <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Country</th>
                  <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">City</th>
                  <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Shipping Rate</th>
                  <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Delivery Time</th>
                  <th className="text-left py-4 px-6 text-[#E5E5E5] font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((zone, idx) => (
                  <tr 
                    key={zone.id} 
                    className={`border-t border-[#2A2A2A] hover:bg-[#1F1F1F] transition ${idx % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#151515]'}`}
                  >
                    <td className="py-4 px-6 text-[#E5E5E5] font-medium">{zone.name}</td>
                    <td className="py-4 px-6 text-[#9CA3AF]">{zone.country}</td>
                    <td className="py-4 px-6 text-[#9CA3AF]">{zone.city}</td>
                    <td className="py-4 px-6 text-[#E5E5E5] font-semibold">${zone.rate.toFixed(2)}</td>
                    <td className="py-4 px-6 text-[#9CA3AF]">{zone.estimatedDays} days</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleEditZone(zone)}
                          className="text-[#6D28D9] hover:text-[#5B21B6] transition text-lg"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteZone(zone.id)}
                          className="text-red-400 hover:text-red-500 transition text-lg"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl w-full max-w-2xl shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
                <div>
                  <h3 className="text-2xl font-bold text-[#E5E5E5]">Add Shipping Zone</h3>
                  <p className="text-sm text-[#9CA3AF] mt-1">Configure a new GCC shipping zone</p>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-[#9CA3AF] hover:text-white transition"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#E5E5E5] mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 transition"
                  >
                    <option value="">Select a country</option>
                    {gccCountries.map(country => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#E5E5E5] mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.country}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a city</option>
                    {selectedCountry?.cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#E5E5E5] mb-2">
                    Shipping Rate (USD) *
                  </label>
                  <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="25.00"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#E5E5E5] mb-2">
                    Estimated Delivery Time *
                  </label>
                  <input
                    type="text"
                    name="estimatedDays"
                    value={formData.estimatedDays}
                    onChange={handleInputChange}
                    placeholder="e.g., 2-3, 3-5, 5-7"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 transition"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1">Enter estimated delivery days (e.g., "2-3" or "3-5")</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 bg-[#2A2A2A] text-[#E5E5E5] rounded-lg font-semibold hover:bg-[#3A3A3A] transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddZone}
                    className="flex-1 px-6 py-3 bg-[#6D28D9] text-white rounded-lg font-semibold hover:bg-[#5B21B6] transition shadow-lg shadow-[#6D28D9]/20"
                  >
                    Add Zone
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl w-full max-w-2xl shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
                <div>
                  <h3 className="text-2xl font-bold text-[#E5E5E5]">Edit Shipping Zone</h3>
                  <p className="text-sm text-[#9CA3AF] mt-1">Update shipping zone details</p>
                </div>
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingZone(null);
                    setFormData({ country: '', city: '', rate: '', estimatedDays: '' });
                  }}
                  className="text-[#9CA3AF] hover:text-white transition"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#E5E5E5] mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 transition"
                  >
                    <option value="">Select a country</option>
                    {gccCountries.map(country => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#E5E5E5] mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.country}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a city</option>
                    {selectedCountry?.cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#E5E5E5] mb-2">
                    Shipping Rate (USD) *
                  </label>
                  <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="25.00"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#E5E5E5] mb-2">
                    Estimated Delivery Time *
                  </label>
                  <input
                    type="text"
                    name="estimatedDays"
                    value={formData.estimatedDays}
                    onChange={handleInputChange}
                    placeholder="e.g., 2-3, 3-5, 5-7"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 transition"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1">Enter estimated delivery days (e.g., "2-3" or "3-5")</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingZone(null);
                      setFormData({ country: '', city: '', rate: '', estimatedDays: '' });
                    }}
                    className="flex-1 px-6 py-3 bg-[#2A2A2A] text-[#E5E5E5] rounded-lg font-semibold hover:bg-[#3A3A3A] transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateZone}
                    className="flex-1 px-6 py-3 bg-[#6D28D9] text-white rounded-lg font-semibold hover:bg-[#5B21B6] transition shadow-lg shadow-[#6D28D9]/20"
                  >
                    Update Zone
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingSettings;