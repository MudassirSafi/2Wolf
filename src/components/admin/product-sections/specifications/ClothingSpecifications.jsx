// components/admin/product-sections/specifications/ClothingSpecifications.jsx
import React from 'react';

const ClothingSpecifications = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#9CA3AF]">Clothing & Fashion specifications</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Size */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Size</label>
          <select
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Size</option>
            <option value="XS">XS (Extra Small)</option>
            <option value="S">S (Small)</option>
            <option value="M">M (Medium)</option>
            <option value="L">L (Large)</option>
            <option value="XL">XL (Extra Large)</option>
            <option value="XXL">XXL (2X Large)</option>
            <option value="XXXL">XXXL (3X Large)</option>
            <option value="Free Size">Free Size</option>
          </select>
        </div>

        {/* Fit Type */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Fit Type</label>
          <select
            value={formData.fit}
            onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Fit</option>
            <option value="Slim Fit">Slim Fit</option>
            <option value="Regular Fit">Regular Fit</option>
            <option value="Relaxed Fit">Relaxed Fit</option>
            <option value="Loose Fit">Loose Fit</option>
            <option value="Oversized">Oversized</option>
            <option value="Tailored Fit">Tailored Fit</option>
            <option value="Athletic Fit">Athletic Fit</option>
          </select>
        </div>

        {/* Material */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Material</label>
          <select
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Material</option>
            <option value="Cotton">Cotton</option>
            <option value="Polyester">Polyester</option>
            <option value="Silk">Silk</option>
            <option value="Wool">Wool</option>
            <option value="Leather">Leather</option>
            <option value="Denim">Denim</option>
            <option value="Linen">Linen</option>
            <option value="Nylon">Nylon</option>
            <option value="Velvet">Velvet</option>
            <option value="Cotton Blend">Cotton Blend</option>
            <option value="Synthetic">Synthetic</option>
          </select>
        </div>

        {/* Pattern */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Pattern</label>
          <select
            value={formData.pattern}
            onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Pattern</option>
            <option value="Solid">Solid</option>
            <option value="Striped">Striped</option>
            <option value="Checkered">Checkered</option>
            <option value="Printed">Printed</option>
            <option value="Floral">Floral</option>
            <option value="Geometric">Geometric</option>
            <option value="Polka Dots">Polka Dots</option>
            <option value="Abstract">Abstract</option>
            <option value="Embroidered">Embroidered</option>
          </select>
        </div>

        {/* Color */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Color</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="e.g., Black, Navy Blue, Red"
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
          />
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
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Closure Type (for shoes, jackets, etc.) */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Closure Type</label>
          <select
            value={formData.closureType}
            onChange={(e) => setFormData({ ...formData, closureType: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Closure</option>
            <option value="Zipper">Zipper</option>
            <option value="Button">Button</option>
            <option value="Lace-up">Lace-up</option>
            <option value="Velcro">Velcro</option>
            <option value="Slip-on">Slip-on</option>
            <option value="Buckle">Buckle</option>
            <option value="Hook & Loop">Hook & Loop</option>
            <option value="Pull-on">Pull-on</option>
          </select>
        </div>

        {/* Heel Type (for shoes) */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Heel Type (Shoes)</label>
          <select
            value={formData.heelType}
            onChange={(e) => setFormData({ ...formData, heelType: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
          >
            <option value="">Select Heel Type</option>
            <option value="Flat">Flat</option>
            <option value="Low Heel">Low Heel (1-2 inches)</option>
            <option value="Mid Heel">Mid Heel (2-3 inches)</option>
            <option value="High Heel">High Heel (3-4 inches)</option>
            <option value="Stiletto">Stiletto</option>
            <option value="Wedge">Wedge</option>
            <option value="Platform">Platform</option>
            <option value="Block Heel">Block Heel</option>
            <option value="Kitten Heel">Kitten Heel</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-[#E5E5E5] text-sm mb-2">Weight</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 200g, 500g"
            className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
          />
        </div>
      </div>
    </div>
  );
};

export default ClothingSpecifications;