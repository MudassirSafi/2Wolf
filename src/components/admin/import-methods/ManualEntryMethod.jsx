// components/admin/import-methods/ManualEntryMethod.jsx
import React from 'react';
import { FaCog, FaMagic, FaSpinner, FaPlus, FaTrash, FaCheck, FaImages } from 'react-icons/fa';
import BasicInformation from '../product-sections/BasicInformation';
import ProductImages from '../product-sections/ProductImages';
import ProductFeatures from '../product-sections/ProductFeatures';
import ProductDetailsTable from '../product-sections/ProductDetailsTable';
import CategorySpecifications from '../product-sections/CategorySpecifications';
import ColorVariants from '../product-sections/ColorVariants';
import MarketingTags from '../MarketingTags';
import ProductVariants from '../product-sections/ProductVariants';
import CategoryManager from '../product-sections/CategoryManager';

const ManualEntryMethod = ({
  formData,
  setFormData,
  loading,
  showAdvanced,
  setShowAdvanced,
  imageInputs,
  setImageInputs,
  previewImages,
  setPreviewImages,
  generatedSKU,
  categories,
  customCategories,
  setCustomCategories,
  defaultCategories,
  availableFields,
  handleManualSubmit
}) => {
  const getCurrentCategoryData = () => {
    return defaultCategories[formData.category] || customCategories.find(c => c.name === formData.category);
  };

  const categoryData = getCurrentCategoryData();

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A] space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#E5E5E5]">Complete Product Details</h2>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] rounded-lg hover:bg-[#3A3A3A] transition text-sm"
        >
          <FaCog /> {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </button>
      </div>

      {/* Category Manager */}
      <CategoryManager
        formData={formData}
        setFormData={setFormData}
        defaultCategories={defaultCategories}
        customCategories={customCategories}
        setCustomCategories={setCustomCategories}
        availableFields={availableFields}
      />

      {/* Basic Information */}
      <BasicInformation
        formData={formData}
        setFormData={setFormData}
        categoryData={categoryData}
        generatedSKU={generatedSKU}
      />

      {/* Product Images */}
      <ProductImages
        imageInputs={imageInputs}
        setImageInputs={setImageInputs}
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
      />

      {/* Product Features (About This Item) */}
      <ProductFeatures
        formData={formData}
        setFormData={setFormData}
      />

      {/* Product Details Table */}
      <ProductDetailsTable
        formData={formData}
        setFormData={setFormData}
      />

      {/* Category-Specific Specifications */}
      {showAdvanced && formData.category && categoryData && (
        <CategorySpecifications
          formData={formData}
          setFormData={setFormData}
          categoryData={categoryData}
        />
      )}

      {/* Color Variants */}
      {showAdvanced && (
        <ColorVariants
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Marketing Tags */}
      {showAdvanced && (
        <MarketingTags formData={formData} setFormData={setFormData} />
      )}

      {/* Product Variants */}
      {showAdvanced && (
        <ProductVariants
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Featured & Best Seller */}
      <div className="flex gap-6 pt-4 border-t border-[#2A2A2A]">
        <label className="flex items-center gap-2 text-[#E5E5E5] cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-5 h-5 accent-[#6D28D9]"
          />
          <span className="font-medium">Featured Product</span>
        </label>
        <label className="flex items-center gap-2 text-[#E5E5E5] cursor-pointer">
          <input
            type="checkbox"
            checked={formData.bestSeller}
            onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
            className="w-5 h-5 accent-[#6D28D9]"
          />
          <span className="font-medium">Best Seller</span>
        </label>
      </div>

      <button
        onClick={handleManualSubmit}
        disabled={loading}
        className="w-full mt-6 py-4 bg-gradient-to-r from-[#6D28D9] to-[#A855F7] text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaMagic />}
        {loading ? 'Processing...' : 'Create Product'}
      </button>
    </div>
  );
};

export default ManualEntryMethod;