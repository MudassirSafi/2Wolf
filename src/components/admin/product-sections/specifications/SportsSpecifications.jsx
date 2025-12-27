// components/admin/product-sections/specifications/SportsSpecifications.jsx
import React from 'react';

const SportsSpecifications = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#E5E5E5]">Sports & Outdoors Specifications</h3>
        <span className="text-xs text-[#9CA3AF] bg-[#0A0A0A] px-3 py-1 rounded-full">Advanced Mode</span>
      </div>
      
      {/* Main Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Size */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">
            Size <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Size</option>
            <option value="XS">XS (Extra Small)</option>
            <option value="S">S (Small)</option>
            <option value="M">M (Medium)</option>
            <option value="L">L (Large)</option>
            <option value="XL">XL (Extra Large)</option>
            <option value="XXL">XXL (2X Large)</option>
            <option value="XXXL">XXXL (3X Large)</option>
            <option value="One Size">One Size</option>
            <option value="Adjustable">Adjustable</option>
            <option value="Custom">Custom Fit</option>
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
            <option value="Polyester">Polyester (Breathable)</option>
            <option value="Nylon">Nylon (Durable)</option>
            <option value="Spandex/Lycra">Spandex/Lycra (Stretchy)</option>
            <option value="Cotton Blend">Cotton Blend</option>
            <option value="Mesh">Mesh (Ventilated)</option>
            <option value="Rubber">Rubber</option>
            <option value="EVA Foam">EVA Foam</option>
            <option value="Synthetic Leather">Synthetic Leather</option>
            <option value="Steel">Steel/Metal</option>
            <option value="Aluminum">Aluminum (Lightweight)</option>
            <option value="Carbon Fiber">Carbon Fiber (Premium)</option>
            <option value="Silicone">Silicone</option>
          </select>
        </div>

        {/* Color */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Color</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="e.g., Black, Red, Navy Blue, Neon Green"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Target Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Kids">Kids (Unisex)</option>
          </select>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Weight</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 500g, 2kg, 5kg, 1.2lbs"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>

        {/* Dimensions */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Dimensions</label>
          <input
            type="text"
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            placeholder="e.g., 50 x 30 x 20 cm"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>

        {/* Capacity (for bags, bottles) */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Capacity</label>
          <input
            type="text"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="e.g., 20L, 500ml, 1L"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
          <p className="text-xs text-[#666]">For backpacks, water bottles, etc.</p>
        </div>

        {/* Warranty */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Warranty</label>
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

      {/* Sport-Specific Features */}
      <div className="border-t border-[#2A2A2A] pt-6">
        <h4 className="text-base font-semibold text-[#E5E5E5] mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#6D28D9] rounded"></span>
          Performance Features
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: 'Waterproof', icon: '💧' },
            { label: 'Breathable', icon: '🌬️' },
            { label: 'Quick-Dry', icon: '⚡' },
            { label: 'Anti-Slip', icon: '👟' },
            { label: 'Lightweight', icon: '🪶' },
            { label: 'UV Protection', icon: '☀️' },
            { label: 'Adjustable', icon: '🔧' },
            { label: 'Foldable', icon: '📦' },
            { label: 'Reflective', icon: '🔦' },
            { label: 'Sweat-Wicking', icon: '💪' },
            { label: 'Odor-Resistant', icon: '✨' },
            { label: 'Impact-Resistant', icon: '🛡️' }
          ].map((feature) => (
            <label 
              key={feature.label} 
              className="flex items-center gap-2 text-sm text-[#E5E5E5] cursor-pointer bg-[#0A0A0A] p-3 rounded-lg hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#6D28D9] transition group"
            >
              <input type="checkbox" className="w-4 h-4 accent-[#6D28D9] rounded" />
              <span className="text-base group-hover:scale-110 transition-transform">{feature.icon}</span>
              <span className="text-xs group-hover:text-[#6D28D9] transition">{feature.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Activity & Usage Details */}
      <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-4">Activity & Usage Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Primary Activity Type</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] transition">
              <option value="">Select Activity</option>
              <option value="Running">Running/Jogging</option>
              <option value="Gym">Gym/Fitness Training</option>
              <option value="Yoga">Yoga/Pilates</option>
              <option value="Cycling">Cycling</option>
              <option value="Swimming">Swimming</option>
              <option value="Hiking">Hiking/Trekking</option>
              <option value="Basketball">Basketball</option>
              <option value="Football">Football/Soccer</option>
              <option value="Tennis">Tennis/Badminton</option>
              <option value="Golf">Golf</option>
              <option value="Camping">Camping/Outdoor</option>
              <option value="Multi-Sport">Multi-Sport</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Skill Level</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] transition">
              <option value="">Select Level</option>
              <option value="Beginner">Beginner (Entry Level)</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Professional">Professional/Competitive</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Max Load/Weight Capacity</label>
            <input
              type="text"
              placeholder="e.g., 100kg, 200lbs, 150kg max"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Recommended Age Range</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] transition">
              <option value="">Select Age Range</option>
              <option value="Kids (5-12)">Kids (5-12 years)</option>
              <option value="Teens (13-17)">Teens (13-17 years)</option>
              <option value="Adults (18+)">Adults (18+ years)</option>
              <option value="All Ages">All Ages</option>
            </select>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-4">Technical Specifications (if applicable)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs">Resistance Levels</label>
            <input
              type="text"
              placeholder="e.g., 8 levels, 16 levels, Magnetic"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5]"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs">Battery Life (for electronics)</label>
            <input
              type="text"
              placeholder="e.g., 10 hours, 30 days, USB rechargeable"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs">Temperature Range</label>
            <input
              type="text"
              placeholder="e.g., -10°C to 40°C"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs">Weather Resistance</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer">
              <option value="">Select</option>
              <option value="All-Weather">All-Weather</option>
              <option value="Indoor Only">Indoor Only</option>
              <option value="Water-Resistant">Water-Resistant</option>
              <option value="Weatherproof">Weatherproof</option>
            </select>
          </div>
        </div>
      </div>

      {/* Certifications & Standards */}
      <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-3">Safety Certifications & Standards</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['CE Certified', 'ISO 9001', 'ASTM Approved', 'EN Standards', 'FDA Approved', 'BPA-Free', 'Lead-Free', 'Eco-Friendly'].map((cert) => (
            <label key={cert} className="flex items-center gap-2 text-xs text-[#E5E5E5] cursor-pointer hover:text-[#6D28D9] transition">
              <input type="checkbox" className="w-4 h-4 accent-[#6D28D9] rounded" />
              <span>{cert}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Usage Tips */}
      <div className="bg-gradient-to-br from-[#6D28D9]/10 to-[#A855F7]/10 rounded-lg p-4 border border-[#6D28D9]/30">
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          💡 <span className="font-semibold">Pro Tip:</span> Sports products perform better when you highlight performance features (waterproof, breathable, quick-dry) 
          and specify the activity type. Include skill level recommendations to help customers find the right product for their needs.
        </p>
      </div>
    </div>
  );
};

export default SportsSpecifications;