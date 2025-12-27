// components/admin/product-sections/specifications/ElectronicsSpecifications.jsx
import React from 'react';

const ElectronicsSpecifications = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#9CA3AF]">Electronics-specific specifications</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Processor */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Processor</label>
          <input
            type="text"
            value={formData.processor}
            onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
            placeholder="e.g., Intel Core i5, Snapdragon 888"
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
          />
        </div>

        {/* RAM */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">RAM</label>
          <select
            value={formData.ram}
            onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select RAM</option>
            <option value="2GB">2GB</option>
            <option value="4GB">4GB</option>
            <option value="6GB">6GB</option>
            <option value="8GB">8GB</option>
            <option value="12GB">12GB</option>
            <option value="16GB">16GB</option>
            <option value="32GB">32GB</option>
            <option value="64GB">64GB</option>
          </select>
        </div>

        {/* Storage */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Storage</label>
          <select
            value={formData.storage}
            onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Storage</option>
            <option value="64GB">64GB</option>
            <option value="128GB">128GB</option>
            <option value="256GB">256GB</option>
            <option value="512GB">512GB</option>
            <option value="1TB">1TB</option>
            <option value="2TB">2TB</option>
            <option value="256GB SSD">256GB SSD</option>
            <option value="512GB SSD">512GB SSD</option>
            <option value="1TB SSD">1TB SSD</option>
          </select>
        </div>

        {/* Screen Size */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Screen Size</label>
          <input
            type="text"
            value={formData.screenSize}
            onChange={(e) => setFormData({ ...formData, screenSize: e.target.value })}
            placeholder="e.g., 6.5 inch, 15.6 inch"
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Color</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="e.g., Space Gray, Midnight Black"
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Weight</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 500g, 1.8kg"
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
          />
        </div>

        {/* Dimensions */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Dimensions</label>
          <input
            type="text"
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            placeholder="e.g., 35.8 x 24.6 x 1.8 cm"
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
          />
        </div>

        {/* Warranty */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Warranty</label>
          <select
            value={formData.warranty}
            onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Warranty</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ElectronicsSpecifications;