// components/admin/product-sections/specifications/WatchSpecifications.jsx
import React from 'react';

const WatchSpecifications = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#9CA3AF]">Watch-specific specifications</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Movement */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Movement Type</label>
          <select
            value={formData.movement}
            onChange={(e) => setFormData({ ...formData, movement: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Movement</option>
            <option value="Quartz">Quartz</option>
            <option value="Automatic">Automatic</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Solar">Solar</option>
            <option value="Kinetic">Kinetic</option>
          </select>
        </div>

        {/* Case Style */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Case Style</label>
          <select
            value={formData.caseStyle}
            onChange={(e) => setFormData({ ...formData, caseStyle: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Style</option>
            <option value="Round">Round</option>
            <option value="Square">Square</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Oval">Oval</option>
            <option value="Tonneau">Tonneau</option>
          </select>
        </div>

        {/* Band Material */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Band Material</label>
          <select
            value={formData.bandMaterial}
            onChange={(e) => setFormData({ ...formData, bandMaterial: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Material</option>
            <option value="Stainless Steel">Stainless Steel</option>
            <option value="Leather">Leather</option>
            <option value="Silicone">Silicone</option>
            <option value="Rubber">Rubber</option>
            <option value="Titanium">Titanium</option>
            <option value="Gold">Gold</option>
            <option value="Nylon">Nylon</option>
            <option value="Ceramic">Ceramic</option>
          </select>
        </div>

        {/* Water Resistance */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Water Resistance</label>
          <select
            value={formData.waterResistance}
            onChange={(e) => setFormData({ ...formData, waterResistance: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Rating</option>
            <option value="30 Meters">30 Meters (3 ATM)</option>
            <option value="50 Meters">50 Meters (5 ATM)</option>
            <option value="100 Meters">100 Meters (10 ATM)</option>
            <option value="200 Meters">200 Meters (20 ATM)</option>
            <option value="300 Meters">300 Meters (30 ATM)</option>
            <option value="Not Water Resistant">Not Water Resistant</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        {/* Color */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Dial Color</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="e.g., Black, Silver, Blue"
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
          />
        </div>

        {/* Dimensions */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Case Diameter</label>
          <input
            type="text"
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            placeholder="e.g., 40mm, 42mm"
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
            placeholder="e.g., 95g, 150g"
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
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="5 Years">5 Years</option>
            <option value="Lifetime">Lifetime</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default WatchSpecifications;