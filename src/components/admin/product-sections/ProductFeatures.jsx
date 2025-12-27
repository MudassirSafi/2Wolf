import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ProductFeatures = ({ formData, setFormData }) => {
  return (
    <div>
      <label className="block text-[#E5E5E5] mb-2 font-medium">
        About This Item (Features) <span className="text-sm text-[#9CA3AF]">(Bullet points)</span>
      </label>
      <div className="space-y-3">
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => {
                const newFeatures = [...formData.features];
                newFeatures[index] = e.target.value;
                setFormData({ ...formData, features: newFeatures });
              }}
              placeholder={`Feature ${index + 1}`}
              className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
            {formData.features.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const newFeatures = formData.features.filter((_, i) => i !== index);
                  setFormData({ ...formData, features: newFeatures });
                }}
                className="px-3 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({ ...formData, features: [...formData.features, ''] })}
          className="text-sm text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1"
        >
          <FaPlus size={10} /> Add Feature
        </button>
      </div>
    </div>
  );
};

export default ProductFeatures;