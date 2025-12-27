// components/admin/product-sections/specifications/ApplianceSpecifications.jsx
import React from 'react';

const ApplianceSpecifications = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#E5E5E5]">Home & Kitchen Appliance Specifications</h3>
        <span className="text-xs text-[#9CA3AF] bg-[#0A0A0A] px-3 py-1 rounded-full">Advanced Mode</span>
      </div>
      
      {/* Main Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Capacity */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">
            Capacity <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="e.g., 1.5L, 5L, 20L"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
          <p className="text-xs text-[#666]">For blenders, microwaves, fridges, etc.</p>
        </div>

        {/* Power/Wattage */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">
            Power (Wattage) <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.powerWattage}
            onChange={(e) => setFormData({ ...formData, powerWattage: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Wattage</option>
            <option value="300W">300W</option>
            <option value="500W">500W</option>
            <option value="750W">750W</option>
            <option value="1000W">1000W (1kW)</option>
            <option value="1200W">1200W (1.2kW)</option>
            <option value="1500W">1500W (1.5kW)</option>
            <option value="1800W">1800W (1.8kW)</option>
            <option value="2000W">2000W (2kW)</option>
            <option value="2200W">2200W (2.2kW)</option>
            <option value="2500W">2500W (2.5kW)</option>
          </select>
        </div>

        {/* Voltage */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Voltage</label>
          <select
            value={formData.voltage}
            onChange={(e) => setFormData({ ...formData, voltage: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Voltage</option>
            <option value="110V">110V (US)</option>
            <option value="220V">220V (UAE/EU)</option>
            <option value="240V">240V (UK)</option>
            <option value="110-240V">110-240V (Universal/Dual)</option>
          </select>
        </div>

        {/* Material */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Material</label>
          <select
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Material</option>
            <option value="Stainless Steel">Stainless Steel</option>
            <option value="Plastic (BPA-Free)">Plastic (BPA-Free)</option>
            <option value="Glass">Glass (Tempered)</option>
            <option value="Ceramic">Ceramic</option>
            <option value="Aluminum">Aluminum</option>
            <option value="Cast Iron">Cast Iron</option>
            <option value="Non-stick Coating">Non-stick Coating</option>
            <option value="Silicone">Silicone (Food Grade)</option>
          </select>
        </div>

        {/* Color */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Color</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="e.g., Black, White, Silver, Red"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Weight</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 2kg, 5.5kg, 800g"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>

        {/* Dimensions */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Dimensions (L x W x H)</label>
          <input
            type="text"
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            placeholder="e.g., 30 x 25 x 40 cm"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>

        {/* Warranty */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Warranty Period</label>
          <select
            value={formData.warranty}
            onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Warranty</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="5 Years">5 Years</option>
            <option value="Lifetime">Lifetime Warranty</option>
          </select>
        </div>
      </div>

      {/* Advanced Technical Details */}
      <div className="border-t border-[#2A2A2A] pt-6">
        <h4 className="text-base font-semibold text-[#E5E5E5] mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#6D28D9] rounded"></span>
          Advanced Technical Details
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Cord Length</label>
            <input
              type="text"
              placeholder="e.g., 1.5m, 2m, 3ft"
              className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Temperature Range</label>
            <input
              type="text"
              placeholder="e.g., 50°C - 230°C, 100°F - 450°F"
              className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Noise Level</label>
            <input
              type="text"
              placeholder="e.g., 65dB, Low Noise (<50dB)"
              className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Energy Efficiency</label>
            <select className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] transition">
              <option value="">Select Rating</option>
              <option value="A+++">A+++ (Most Efficient)</option>
              <option value="A++">A++</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>
      </div>

      {/* Safety & Certifications */}
      <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-3">Safety & Certifications</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['CE Certified', 'RoHS Compliant', 'UL Listed', 'ETL Approved', 'FDA Approved', 'ISO 9001', 'Energy Star', 'Auto Shut-off'].map((cert) => (
            <label key={cert} className="flex items-center gap-2 text-sm text-[#E5E5E5] cursor-pointer hover:text-[#6D28D9] transition">
              <input type="checkbox" className="w-4 h-4 accent-[#6D28D9] rounded" />
              <span>{cert}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="bg-gradient-to-br from-[#6D28D9]/10 to-[#A855F7]/10 rounded-lg p-4 border border-[#6D28D9]/30">
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          💡 <span className="font-semibold">Pro Tip:</span> For kitchen appliances, always include capacity, power rating, and material composition. 
          These are the most important specifications customers look for when making purchase decisions.
        </p>
      </div>
    </div>
  );
};

export default ApplianceSpecifications;