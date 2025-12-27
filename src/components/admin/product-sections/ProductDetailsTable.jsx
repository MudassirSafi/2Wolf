import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ProductDetailsTable = ({ formData, setFormData }) => {
  return (
    <div>
      <label className="block text-[#E5E5E5] mb-2 font-medium">
        Product Details <span className="text-sm text-[#9CA3AF]">(Table format)</span>
      </label>
      <div className="space-y-3">
        {formData.productDetails.map((detail, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={detail.label}
              onChange={(e) => {
                const newDetails = [...formData.productDetails];
                newDetails[index].label = e.target.value;
                setFormData({ ...formData, productDetails: newDetails });
              }}
              placeholder="Label (e.g., Dimensions)"
              className="px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={detail.value}
                onChange={(e) => {
                  const newDetails = [...formData.productDetails];
                  newDetails[index].value = e.target.value;
                  setFormData({ ...formData, productDetails: newDetails });
                }}
                placeholder="Value (e.g., 13.5 x 11.5 cm)"
                className="flex-1 px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
              />
              {formData.productDetails.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const newDetails = formData.productDetails.filter((_, i) => i !== index);
                    setFormData({ ...formData, productDetails: newDetails });
                  }}
                  className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({ 
            ...formData, 
            productDetails: [...formData.productDetails, { label: '', value: '' }] 
          })}
          className="text-sm text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1"
        >
          <FaPlus size={10} /> Add Detail
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsTable;