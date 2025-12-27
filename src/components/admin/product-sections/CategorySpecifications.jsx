// components/admin/product-sections/CategorySpecifications.jsx
import React from 'react';
import WatchSpecifications from './specifications/WatchSpecifications';
import ElectronicsSpecifications from './specifications/ElectronicsSpecifications';
import ClothingSpecifications from './specifications/ClothingSpecifications';
import ApplianceSpecifications from './specifications/ApplianceSpecifications';
import BeautySpecifications from './specifications/BeautySpecifications';
import PerfumeSpecifications from './specifications/PerfumeSpecifications';
import SportsSpecifications from './specifications/SportsSpecifications';
import GeneralSpecifications from './specifications/GeneralSpecifications';
import { FaCog, FaChevronRight } from 'react-icons/fa';

const CategorySpecifications = ({ formData, setFormData, categoryData }) => {
  const categoryName = formData.category.toLowerCase();

  // Smart category detection
  const getCategoryComponent = () => {
    // Watch category
    if (categoryName.includes('watch')) {
      return {
        component: <WatchSpecifications formData={formData} setFormData={setFormData} />,
        icon: '⌚',
        name: 'Watch',
        description: 'Movement, band material, water resistance & more'
      };
    }
    
    // Electronics category
    if (categoryName.includes('electronic') || 
        categoryName.includes('computer') || 
        categoryName.includes('phone') ||
        categoryName.includes('tablet') ||
        categoryName.includes('camera') ||
        categoryName.includes('audio')) {
      return {
        component: <ElectronicsSpecifications formData={formData} setFormData={setFormData} />,
        icon: '💻',
        name: 'Electronics',
        description: 'Processor, RAM, storage, screen size & technical specs'
      };
    }
    
    // Fashion/Clothing category
    if (categoryName.includes('fashion') || 
        categoryName.includes('clothing') || 
        categoryName.includes('shoe') ||
        categoryName.includes('apparel') ||
        categoryName.includes('wear')) {
      return {
        component: <ClothingSpecifications formData={formData} setFormData={setFormData} />,
        icon: '👕',
        name: 'Fashion & Clothing',
        description: 'Size, fit, material, pattern & style details'
      };
    }
    
    // Home & Kitchen Appliances
    if (categoryName.includes('kitchen') || 
        categoryName.includes('home') || 
        categoryName.includes('appliance')) {
      return {
        component: <ApplianceSpecifications formData={formData} setFormData={setFormData} />,
        icon: '🏠',
        name: 'Home & Kitchen Appliances',
        description: 'Capacity, wattage, voltage & appliance features'
      };
    }

    // Beauty & Personal Care
    if (categoryName.includes('beauty') || 
        categoryName.includes('personal care') || 
        categoryName.includes('cosmetic') ||
        categoryName.includes('skincare') ||
        categoryName.includes('makeup') ||
        categoryName.includes('hair')) {
      return {
        component: <BeautySpecifications formData={formData} setFormData={setFormData} />,
        icon: '💄',
        name: 'Beauty & Personal Care',
        description: 'Ingredients, skin type, benefits & usage details'
      };
    }

    // Perfumes & Fragrances
    if (categoryName.includes('perfume') || 
        categoryName.includes('fragrance') || 
        categoryName.includes('cologne') ||
        categoryName.includes('attar') ||
        categoryName.includes('bakhoor')) {
      return {
        component: <PerfumeSpecifications formData={formData} setFormData={setFormData} />,
        icon: '🌸',
        name: 'Perfumes & Fragrances',
        description: 'Notes, longevity, sillage & scent profiles'
      };
    }

    // Sports & Outdoors
    if (categoryName.includes('sport') || 
        categoryName.includes('outdoor') || 
        categoryName.includes('fitness') ||
        categoryName.includes('gym') ||
        categoryName.includes('exercise')) {
      return {
        component: <SportsSpecifications formData={formData} setFormData={setFormData} />,
        icon: '⚽',
        name: 'Sports & Outdoors',
        description: 'Activity type, performance features & specifications'
      };
    }
    
    // Default to general specifications
    return {
      component: <GeneralSpecifications formData={formData} setFormData={setFormData} categoryData={categoryData} />,
      icon: '📦',
      name: 'General',
      description: 'Standard product specifications'
    };
  };

  const categorySpec = getCategoryComponent();

  return (
    <div className="space-y-6">
      {/* Category Header Card */}
      <div className="bg-gradient-to-br from-[#6D28D9]/10 to-[#A855F7]/10 rounded-xl p-5 border border-[#6D28D9]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6D28D9] to-[#A855F7] rounded-lg flex items-center justify-center text-2xl">
              {categorySpec.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#E5E5E5]">{categorySpec.name} Specifications</h3>
                <FaChevronRight className="text-[#6D28D9]" size={14} />
              </div>
              <p className="text-sm text-[#9CA3AF] mt-1">{categorySpec.description}</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs text-[#9CA3AF] mb-1">Category Detected</p>
            <p className="text-sm font-semibold text-[#6D28D9]">{formData.category}</p>
          </div>
        </div>
      </div>

      {/* Help Banner */}
      <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <span className="text-blue-400">ℹ️</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-[#E5E5E5] font-medium mb-1">
              Fill in relevant specifications for better product discovery
            </p>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              These fields are automatically customized based on your selected category. 
              Complete specifications help customers find your product and make informed decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Render Category-Specific Component */}
      <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
        {categorySpec.component}
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500">✓</span>
            <h4 className="text-sm font-semibold text-[#E5E5E5]">Complete All Fields</h4>
          </div>
          <p className="text-xs text-[#9CA3AF]">
            Products with complete specifications get 40% more views on average
          </p>
        </div>

        <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-500">🎯</span>
            <h4 className="text-sm font-semibold text-[#E5E5E5]">Be Accurate</h4>
          </div>
          <p className="text-xs text-[#9CA3AF]">
            Accurate specs reduce returns and improve customer satisfaction ratings
          </p>
        </div>

        <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-500">🔍</span>
            <h4 className="text-sm font-semibold text-[#E5E5E5]">SEO Friendly</h4>
          </div>
          <p className="text-xs text-[#9CA3AF]">
            These specs help your product appear in relevant search results
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySpecifications;