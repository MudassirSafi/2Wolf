// components/admin/product-sections/BasicInformation.jsx
import React from 'react';
import { FaInfoCircle, FaTag, FaBoxes, FaPercent } from 'react-icons/fa';

const BasicInformation = ({ formData, setFormData, categoryData, generatedSKU }) => {
  const calculateDiscountedPrice = () => {
    if (formData.price && formData.discount) {
      const price = parseFloat(formData.price);
      const discount = parseFloat(formData.discount);
      const discounted = price - (price * discount / 100);
      return discounted.toFixed(2);
    }
    return formData.price;
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6D28D9] to-[#A855F7] rounded-lg flex items-center justify-center">
            <FaInfoCircle className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#E5E5E5]">Basic Information</h3>
            <p className="text-xs text-[#9CA3AF]">Essential product details for your listing</p>
          </div>
        </div>
      </div>
      
      {/* Product Name */}
      <div className="space-y-2">
        <label className="block text-[#E5E5E5] mb-2 font-medium flex items-center gap-2">
          Product Name <span className="text-red-500">*</span>
          <span className="text-xs text-[#666] font-normal">(Be descriptive and keyword-rich)</span>
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Wireless Bluetooth Headphones with Active Noise Cancelling"
          className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 focus:outline-none transition"
        />
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">
            {formData.name.length}/200 characters
          </span>
          {formData.name.length < 20 && (
            <span className="text-amber-500">⚠️ Longer names perform better in search</span>
          )}
        </div>
      </div>

      {/* Subcategory */}
      {formData.category && categoryData && (
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] mb-2 font-medium">Subcategory</label>
          <select
            value={formData.subCategory}
            onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 focus:outline-none cursor-pointer transition"
          >
            <option value="">Select Subcategory</option>
            {categoryData.subcategories?.map((sub, idx) => (
              <option key={idx} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      )}

      {/* Brand */}
      <div className="space-y-2">
        <label className="block text-[#E5E5E5] mb-2 font-medium flex items-center gap-2">
          <FaTag className="text-[#6D28D9]" />
          Brand
        </label>
        {formData.category && categoryData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select
              value={formData.brand === 'custom' ? 'custom' : formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value === 'custom' ? '' : e.target.value })}
              className="px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 cursor-pointer transition"
            >
              <option value="">Select Brand</option>
              {categoryData.brands?.map((brand, idx) => (
                <option key={idx} value={brand}>{brand}</option>
              ))}
              <option value="custom">➕ Other Brand (Type Custom)</option>
            </select>
            {(!formData.brand || formData.brand === '' || !categoryData.brands?.includes(formData.brand)) && (
              <input
                type="text"
                value={formData.brand === 'custom' ? '' : formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Enter brand name"
                className="px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 transition"
              />
            )}
          </div>
        ) : (
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            placeholder="e.g., 2Wolf, Samsung, Nike"
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 transition"
          />
        )}
      </div>

      {/* Department */}
      <div className="space-y-2">
        <label className="block text-[#E5E5E5] mb-2 font-medium">Department</label>
        <select
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 cursor-pointer transition"
        >
          <option value="Unisex">Unisex</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      {/* Pricing Section */}
      <div className="bg-[#0A0A0A] rounded-lg p-5 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-4 flex items-center gap-2">
          <FaTag className="text-[#6D28D9]" />
          Pricing Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Price */}
          <div className="space-y-2">
            <label className="block text-[#E5E5E5] text-sm font-medium">
              Current Price (AED) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]">AED</span>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="w-full pl-14 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 transition"
              />
            </div>
          </div>

          {/* Original Price */}
          <div className="space-y-2">
            <label className="block text-[#E5E5E5] text-sm font-medium">
              Original Price (AED)
              <span className="text-xs text-[#666] ml-1 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]">AED</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="0.00"
                className="w-full pl-14 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 transition"
              />
            </div>
            <p className="text-xs text-[#666]">Shows strikethrough price</p>
          </div>

          {/* Discount */}
          <div className="space-y-2">
            <label className="block text-[#E5E5E5] text-sm font-medium flex items-center gap-2">
              <FaPercent className="text-[#6D28D9]" size={12} />
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              placeholder="0"
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 transition"
            />
          </div>
        </div>

        {/* Price Preview */}
        {formData.price && (
          <div className="mt-4 p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
            <p className="text-xs text-[#9CA3AF] mb-2">Customer will see:</p>
            <div className="flex items-center gap-3">
              {formData.discount > 0 && (
                <span className="text-sm text-red-500 font-semibold">-{formData.discount}%</span>
              )}
              <span className="text-2xl font-bold text-[#E5E5E5]">
                AED {calculateDiscountedPrice()}
              </span>
              {formData.originalPrice && formData.originalPrice > formData.price && (
                <span className="text-sm text-[#666] line-through">
                  AED {parseFloat(formData.originalPrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stock & Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stock */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] mb-2 font-medium flex items-center gap-2">
            <FaBoxes className="text-[#6D28D9]" />
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            placeholder="0"
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 transition"
          />
          {formData.stock && parseInt(formData.stock) < 10 && (
            <p className="text-xs text-amber-500 flex items-center gap-1">
              ⚠️ Low stock - consider restocking soon
            </p>
          )}
        </div>

        {/* Model Number */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] mb-2 font-medium">
            Model Number
            <span className="text-xs text-[#666] ml-1 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={formData.modelNumber}
            onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
            placeholder="e.g., ABC-123-XYZ"
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 transition"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-[#E5E5E5] mb-2 font-medium">
          Product Description
          <span className="text-xs text-[#666] ml-1 font-normal">(Detailed description for customers)</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter a detailed, engaging product description. Include key features, benefits, and what makes this product special..."
          rows="5"
          className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 focus:outline-none resize-none transition"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#666]">{formData.description.length} characters</span>
          {formData.description.length < 100 && (
            <span className="text-xs text-amber-500">⚠️ Add more details for better conversion</span>
          )}
        </div>
      </div>

      {/* SKU Display */}
      {generatedSKU && (
        <div className="bg-gradient-to-br from-[#6D28D9]/10 to-[#A855F7]/10 rounded-lg p-4 border border-[#6D28D9]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#9CA3AF] mb-1">Auto-Generated SKU</p>
              <p className="text-[#6D28D9] font-mono text-lg font-semibold">{generatedSKU}</p>
            </div>
            <div className="text-xs text-[#666] text-right">
              <p>This unique identifier</p>
              <p>tracks your product</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInformation;