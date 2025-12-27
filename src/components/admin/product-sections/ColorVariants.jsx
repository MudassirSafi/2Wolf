// components/admin/product-sections/ColorVariants.jsx
import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ColorVariants = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#E5E5E5]">Color Variants</h3>
        <p className="text-xs text-[#9CA3AF]">Add different colors with their images</p>
      </div>
      
      <div className="space-y-4">
        {formData.colors.map((color, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-[#0A0A0A] rounded-lg border border-[#2A2A2A]">
            <input
              type="text"
              value={color.name}
              onChange={(e) => {
                const newColors = [...formData.colors];
                newColors[index].name = e.target.value;
                setFormData({ ...formData, colors: newColors });
              }}
              placeholder="Color Name (e.g., Black)"
              className="px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
            <input
              type="url"
              value={color.image}
              onChange={(e) => {
                const newColors = [...formData.colors];
                newColors[index].image = e.target.value;
                setFormData({ ...formData, colors: newColors });
              }}
              placeholder="Image URL"
              className="px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
            <div className="flex gap-2">
              {color.image && (
                <img 
                  src={color.image} 
                  alt={color.name} 
                  className="w-10 h-10 object-cover rounded border border-[#2A2A2A]" 
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <button
                type="button"
                onClick={() => {
                  const newColors = formData.colors.filter((_, i) => i !== index);
                  setFormData({ ...formData, colors: newColors });
                }}
                className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-2"
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => setFormData({ 
            ...formData, 
            colors: [...formData.colors, { name: '', image: '' }] 
          })}
          className="w-full py-3 bg-[#0A0A0A] border-2 border-dashed border-[#2A2A2A] rounded-lg text-[#6D28D9] hover:border-[#6D28D9] hover:bg-[#1A1A1A] transition flex items-center justify-center gap-2"
        >
          <FaPlus size={12} /> Add Color Variant
        </button>
      </div>
    </div>
  );
};

export default ColorVariants;