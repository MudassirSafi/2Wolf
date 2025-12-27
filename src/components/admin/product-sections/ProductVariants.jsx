// components/admin/product-sections/ProductVariants.jsx
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ProductVariants = ({ formData, setFormData }) => {
  const [showVariants, setShowVariants] = useState(false);

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: '', value: '', priceAdjustment: 0, stock: 0 }]
    });
  };

  const removeVariant = (index) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index)
    });
  };

  const updateVariant = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#E5E5E5]">Product Variants</h3>
          <p className="text-xs text-[#9CA3AF] mt-1">Size, color, or other variations with different pricing</p>
        </div>
        <button
          type="button"
          onClick={() => setShowVariants(!showVariants)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg hover:bg-[#1A1A1A] transition text-sm text-[#E5E5E5]"
        >
          {showVariants ? <FaChevronUp /> : <FaChevronDown />}
          {showVariants ? 'Hide' : 'Show'} Variants
        </button>
      </div>

      {showVariants && (
        <div className="space-y-4">
          {formData.variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A]">
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-1">Variant Name</label>
                <input
                  type="text"
                  value={variant.name}
                  onChange={(e) => updateVariant(index, 'name', e.target.value)}
                  placeholder="e.g., Size, Color"
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-1">Value</label>
                <input
                  type="text"
                  value={variant.value}
                  onChange={(e) => updateVariant(index, 'value', e.target.value)}
                  placeholder="e.g., Large, Red"
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-1">Price Adjustment (AED)</label>
                <input
                  type="number"
                  step="0.01"
                  value={variant.priceAdjustment}
                  onChange={(e) => updateVariant(index, 'priceAdjustment', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] text-sm"
                />
                <p className="text-xs text-[#666] mt-1">Use + or - values</p>
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs text-[#9CA3AF] mb-1">Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={variant.stock}
                    onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="self-end px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addVariant}
            className="w-full py-3 bg-[#0A0A0A] border-2 border-dashed border-[#2A2A2A] rounded-lg text-[#6D28D9] hover:border-[#6D28D9] hover:bg-[#1A1A1A] transition flex items-center justify-center gap-2"
          >
            <FaPlus size={12} /> Add Variant
          </button>

          {formData.variants.length > 0 && (
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-4">
              <h4 className="text-sm font-semibold text-[#E5E5E5] mb-3">Variant Preview</h4>
              <div className="space-y-2">
                {formData.variants.map((variant, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-[#E5E5E5]">
                      {variant.name}: <span className="font-semibold">{variant.value}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      {variant.priceAdjustment !== 0 && (
                        <span className={`font-semibold ${parseFloat(variant.priceAdjustment) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {parseFloat(variant.priceAdjustment) > 0 ? '+' : ''}{variant.priceAdjustment} AED
                        </span>
                      )}
                      <span className="text-[#9CA3AF]">Stock: {variant.stock}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductVariants;