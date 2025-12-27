// components/admin/product-sections/CategoryManager.jsx
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const CategoryManager = ({
  formData,
  setFormData,
  defaultCategories,
  customCategories,
  setCustomCategories,
  availableFields
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    subCategories: [''],
    brands: [''],
    fields: []
  });

  const handleAddCustomCategory = () => {
    if (!newCategory.name.trim()) {
      alert('Please enter a category name');
      return;
    }
    
    const newCat = {
      name: newCategory.name,
      subcategories: newCategory.subCategories.filter(s => s.trim() !== ''),
      brands: newCategory.brands.filter(b => b.trim() !== ''),
      fields: newCategory.fields || []
    };

    const updated = [...customCategories, newCat];
    setCustomCategories(updated);
    localStorage.setItem('customCategories', JSON.stringify(updated));

    setNewCategory({ name: '', subCategories: [''], brands: [''], fields: [] });
    setShowAddCategory(false);
    alert('Category added successfully!');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[#E5E5E5] font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowAddCategory(!showAddCategory)}
              className="text-xs text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1"
            >
              <FaPlus size={10} /> Add Category
            </button>
          </div>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: '' })}
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none cursor-pointer"
          >
            <option value="">Select Category</option>
            {Object.keys(defaultCategories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            {customCategories.map((cat, idx) => (
              <option key={`custom-${idx}`} value={cat.name}>{cat.name} (Custom)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Custom Category Panel */}
      {showAddCategory && (
        <div className="bg-[#0A0A0A] border-2 border-[#6D28D9] rounded-lg p-6 space-y-4">
          <h3 className="text-[#E5E5E5] font-semibold text-lg flex items-center gap-2">
            <FaPlus className="text-[#6D28D9]" /> Add New Category
          </h3>

          <input
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Category Name"
            className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
          />

          <div className="space-y-2">
            <label className="text-sm text-[#9CA3AF] font-medium">Subcategories</label>
            {newCategory.subCategories.map((sub, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={sub}
                  onChange={(e) => {
                    const updated = [...newCategory.subCategories];
                    updated[idx] = e.target.value;
                    setNewCategory({ ...newCategory, subCategories: updated });
                  }}
                  placeholder={`Subcategory ${idx + 1}`}
                  className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
                />
                {newCategory.subCategories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = newCategory.subCategories.filter((_, i) => i !== idx);
                      setNewCategory({ ...newCategory, subCategories: updated });
                    }}
                    className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setNewCategory({ 
                ...newCategory, 
                subCategories: [...newCategory.subCategories, ''] 
              })}
              className="text-sm text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1"
            >
              <FaPlus size={10} /> Add Subcategory
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#9CA3AF] font-medium">Product Fields</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableFields.map(field => (
                <label key={field.value} className="flex items-center gap-2 text-sm text-[#E5E5E5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newCategory.fields?.includes(field.value)}
                    onChange={(e) => {
                      const fields = newCategory.fields || [];
                      if (e.target.checked) {
                        setNewCategory({ ...newCategory, fields: [...fields, field.value] });
                      } else {
                        setNewCategory({ ...newCategory, fields: fields.filter(f => f !== field.value) });
                      }
                    }}
                    className="w-4 h-4 accent-[#6D28D9]"
                  />
                  {field.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleAddCustomCategory}
              className="flex-1 px-4 py-3 bg-[#6D28D9] text-white rounded-lg hover:bg-[#5B21B6] font-semibold flex items-center justify-center gap-2"
            >
              <FaCheck /> Save Category
            </button>
            <button
              type="button"
              onClick={() => setShowAddCategory(false)}
              className="px-4 py-3 bg-[#2A2A2A] text-[#E5E5E5] rounded-lg hover:bg-[#3A3A3A] font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;