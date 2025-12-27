// components/admin/product-sections/specifications/BeautySpecifications.jsx
// AMAZON-LEVEL BEAUTY & PERSONAL CARE SPECIFICATIONS
import React, { useState } from 'react';

const BeautySpecifications = ({ formData, setFormData }) => {
  const [selectedProperties, setSelectedProperties] = useState([]);

  const toggleProperty = (property) => {
    if (selectedProperties.includes(property)) {
      setSelectedProperties(selectedProperties.filter(p => p !== property));
    } else {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#E5E5E5]">Beauty & Personal Care Specifications</h3>
          <p className="text-xs text-[#9CA3AF] mt-1">Complete product details for skincare, makeup, hair care & more</p>
        </div>
        <span className="text-xs text-[#9CA3AF] bg-[#0A0A0A] px-3 py-1 rounded-full border border-[#2A2A2A]">
          Amazon-Level System
        </span>
      </div>
      
      {/* Product Category Selection */}
      <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
        <label className="block text-[#E5E5E5] text-sm font-medium mb-3">Product Category</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['Skincare', 'Makeup', 'Hair Care', 'Body Care', 'Fragrances', 'Tools & Accessories', 'Men\'s Grooming', 'Nail Care'].map(cat => (
            <button
              key={cat}
              type="button"
              className="px-3 py-2 text-xs bg-[#1A1A1A] border border-[#2A2A2A] rounded hover:border-[#6D28D9] hover:bg-[#6D28D9]/10 transition text-[#E5E5E5]"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Product Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Size/Volume */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">
            Size/Volume <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              placeholder="e.g., 50"
              className="flex-1 px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
            />
            <select className="px-3 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer">
              <option>ml</option>
              <option>g</option>
              <option>oz</option>
              <option>pieces</option>
            </select>
          </div>
        </div>

        {/* Color/Shade */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Color/Shade Name</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="e.g., Natural Beige, #01 Ivory, Rose Gold"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>

        {/* Skin Type */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Suitable for Skin Type</label>
          <select
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Skin Type</option>
            <option value="All Skin Types">All Skin Types</option>
            <option value="Dry Skin">Dry Skin</option>
            <option value="Oily Skin">Oily Skin</option>
            <option value="Combination Skin">Combination Skin</option>
            <option value="Sensitive Skin">Sensitive Skin</option>
            <option value="Normal Skin">Normal Skin</option>
            <option value="Acne-Prone Skin">Acne-Prone Skin</option>
            <option value="Mature Skin">Mature Skin (Anti-Aging)</option>
          </select>
        </div>

        {/* Gender/Target Audience */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Target Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select</option>
            <option value="Unisex">Unisex</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Teens">Teens</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Net Weight */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Net Weight</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 50g, 100g, 3.5oz"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>

        {/* Package Dimensions */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Package Dimensions</label>
          <input
            type="text"
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            placeholder="e.g., 5 x 5 x 15 cm"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>
      </div>

      {/* Product Benefits - Amazon Style */}
      <div className="border-t border-[#2A2A2A] pt-6">
        <h4 className="text-base font-semibold text-[#E5E5E5] mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#6D28D9] rounded"></span>
          Product Benefits & Concerns
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: 'Anti-Aging', icon: '⏰', desc: 'Reduces wrinkles' },
            { label: 'Hydrating', icon: '💧', desc: 'Deep moisture' },
            { label: 'Brightening', icon: '✨', desc: 'Even skin tone' },
            { label: 'Acne Control', icon: '🎯', desc: 'Clear skin' },
            { label: 'Oil Control', icon: '🛡️', desc: 'Matte finish' },
            { label: 'Sun Protection', icon: '☀️', desc: 'SPF included' },
            { label: 'Pore Minimizing', icon: '🔬', desc: 'Refined pores' },
            { label: 'Soothing', icon: '🌿', desc: 'Calms irritation' },
            { label: 'Firming', icon: '💪', desc: 'Skin elasticity' },
            { label: 'Dark Circle', icon: '👁️', desc: 'Reduces darkness' },
            { label: 'Long-Lasting', icon: '⏱️', desc: '12+ hours' },
            { label: 'Waterproof', icon: '💦', desc: 'Water resistant' }
          ].map((benefit) => (
            <label 
              key={benefit.label} 
              className="flex items-start gap-2 text-sm cursor-pointer bg-[#0A0A0A] p-3 rounded-lg hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#6D28D9] transition group"
            >
              <input 
                type="checkbox" 
                className="w-4 h-4 accent-[#6D28D9] rounded mt-0.5" 
                onChange={() => toggleProperty(benefit.label)}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base group-hover:scale-110 transition-transform">{benefit.icon}</span>
                  <span className="text-xs font-medium group-hover:text-[#6D28D9] transition">{benefit.label}</span>
                </div>
                <p className="text-xs text-[#666] mt-0.5">{benefit.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Product Properties - Free From Claims */}
      <div className="border-t border-[#2A2A2A] pt-6">
        <h4 className="text-base font-semibold text-[#E5E5E5] mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#6D28D9] rounded"></span>
          Product Properties & Certifications
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Paraben-Free', icon: '🚫', color: 'green' },
            { label: 'Sulfate-Free', icon: '✨', color: 'blue' },
            { label: 'Cruelty-Free', icon: '🐰', color: 'pink' },
            { label: 'Vegan', icon: '🌱', color: 'green' },
            { label: 'Organic', icon: '🍃', color: 'green' },
            { label: 'Hypoallergenic', icon: '💚', color: 'teal' },
            { label: 'Dermatologist Tested', icon: '👨‍⚕️', color: 'blue' },
            { label: 'Natural Ingredients', icon: '🌿', color: 'green' },
            { label: 'Non-Comedogenic', icon: '✓', color: 'purple' },
            { label: 'Oil-Free', icon: '💧', color: 'cyan' },
            { label: 'Fragrance-Free', icon: '🌸', color: 'pink' },
            { label: 'Alcohol-Free', icon: '🚫', color: 'red' },
            { label: 'GMO-Free', icon: '🌾', color: 'amber' },
            { label: 'Gluten-Free', icon: '🌾', color: 'yellow' },
            { label: 'FDA Approved', icon: '✅', color: 'green' }
          ].map((property) => (
            <label 
              key={property.label} 
              className={`flex items-center gap-2 text-xs cursor-pointer bg-[#0A0A0A] p-2.5 rounded-lg hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-${property.color}-500 transition group`}
            >
              <input type="checkbox" className="w-4 h-4 accent-[#6D28D9] rounded" />
              <span className="text-base group-hover:scale-110 transition-transform">{property.icon}</span>
              <span className="group-hover:text-[#6D28D9] transition font-medium">{property.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Key Ingredients Section */}
      <div className="bg-[#0A0A0A] rounded-lg p-5 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-4 flex items-center gap-2">
          <span className="text-lg">🧪</span>
          Key Ingredients & Active Formula
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2 uppercase tracking-wide font-medium">
              Main Active Ingredients (Amazon displays these prominently)
            </label>
            <textarea
              placeholder="e.g., Hyaluronic Acid, Vitamin C, Retinol, Niacinamide, Salicylic Acid, Peptides"
              rows="2"
              className="w-full px-3 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-sm text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition resize-none"
            />
            <p className="text-xs text-[#666] mt-1">Separate multiple ingredients with commas</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">SPF Rating (if applicable)</label>
              <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer">
                <option value="">No SPF</option>
                <option value="SPF 15">SPF 15</option>
                <option value="SPF 30">SPF 30</option>
                <option value="SPF 50">SPF 50</option>
                <option value="SPF 50+">SPF 50+</option>
                <option value="SPF 100">SPF 100</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">pH Level</label>
              <input
                type="text"
                placeholder="e.g., 5.5, 7.0"
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition"
              />
            </div>

            <div>
              <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">Concentration %</label>
              <input
                type="text"
                placeholder="e.g., 10%, 2%"
                className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">Full Ingredient List (INCI Names)</label>
            <textarea
              placeholder="Complete ingredient list in INCI format (International Nomenclature Cosmetic Ingredient)"
              rows="3"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-xs text-[#E5E5E5] focus:border-[#6D28D9] transition resize-none"
            />
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-[#0A0A0A] rounded-lg p-5 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-4 flex items-center gap-2">
          <span className="text-lg">📋</span>
          Usage & Application Instructions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">Recommended Usage Frequency</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer">
              <option value="">Select Frequency</option>
              <option value="Once Daily">Once Daily</option>
              <option value="Twice Daily">Twice Daily (Morning & Night)</option>
              <option value="Morning Only">Morning Only</option>
              <option value="Night Only">Night Only (PM Routine)</option>
              <option value="As Needed">As Needed</option>
              <option value="2-3 Times/Week">2-3 Times per Week</option>
              <option value="Weekly">Weekly Treatment</option>
            </select>
          </div>
          
          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">Application Area</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer">
              <option value="">Select</option>
              <option value="Face">Face</option>
              <option value="Eyes">Eyes/Eye Area</option>
              <option value="Lips">Lips</option>
              <option value="Body">Body</option>
              <option value="Hair">Hair/Scalp</option>
              <option value="Nails">Nails</option>
              <option value="Full Body">Full Body</option>
            </select>
          </div>

          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">Best Used With</label>
            <input
              type="text"
              placeholder="e.g., Moisturizer, Serum, Sunscreen"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5]"
            />
          </div>

          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">Patch Test Required</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer">
              <option value="No">No</option>
              <option value="Yes">Yes - Recommended</option>
              <option value="Required">Required for Sensitive Skin</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">How to Use (Step-by-Step)</label>
          <textarea
            placeholder="Step 1: Cleanse face&#10;Step 2: Apply toner&#10;Step 3: Apply 2-3 drops to face and neck&#10;Step 4: Follow with moisturizer"
            rows="4"
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] resize-none"
          />
        </div>
      </div>

      {/* Product Specifications & Storage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
          <label className="block text-[#E5E5E5] text-sm font-medium mb-3 flex items-center gap-2">
            <span>⏳</span> Shelf Life & Expiry
          </label>
          <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer mb-3">
            <option value="">Select Shelf Life</option>
            <option value="6 Months">6 Months from Opening</option>
            <option value="12 Months">12 Months (1 Year)</option>
            <option value="18 Months">18 Months</option>
            <option value="24 Months">24 Months (2 Years)</option>
            <option value="36 Months">36 Months (3 Years)</option>
            <option value="6M PAO">6M PAO (Period After Opening)</option>
            <option value="12M PAO">12M PAO</option>
          </select>
          
          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2">Manufacturing Date</label>
            <input
              type="month"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5]"
            />
          </div>
        </div>

        <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
          <label className="block text-[#E5E5E5] text-sm font-medium mb-3 flex items-center gap-2">
            <span>🌡️</span> Storage Instructions
          </label>
          <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer mb-3">
            <option value="">Select Storage Type</option>
            <option value="Room Temperature">Room Temperature (20-25°C)</option>
            <option value="Cool, Dry Place">Cool, Dry Place</option>
            <option value="Refrigerate">Refrigerate After Opening</option>
            <option value="Avoid Direct Sunlight">Avoid Direct Sunlight</option>
            <option value="Keep Away from Heat">Keep Away from Heat Sources</option>
            <option value="Store Upright">Store Upright</option>
          </select>

          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2">Special Storage Notes</label>
            <textarea
              placeholder="e.g., Keep cap tightly closed, Store below 30°C"
              rows="2"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-xs text-[#E5E5E5] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Results & Expectations */}
      <div className="bg-[#0A0A0A] rounded-lg p-5 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-4 flex items-center gap-2">
          <span className="text-lg">📊</span>
          Expected Results & Timeframe
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">Visible Results Within</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer">
              <option value="">Select Timeframe</option>
              <option value="Immediate">Immediate (Instant Results)</option>
              <option value="24 Hours">24 Hours</option>
              <option value="1 Week">1 Week</option>
              <option value="2 Weeks">2 Weeks</option>
              <option value="4 Weeks">4 Weeks (1 Month)</option>
              <option value="8 Weeks">8 Weeks (2 Months)</option>
              <option value="12 Weeks">12 Weeks (3 Months)</option>
            </select>
          </div>

          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">Finish Type (for Makeup)</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer">
              <option value="">Select Finish</option>
              <option value="Matte">Matte</option>
              <option value="Dewy">Dewy/Glowing</option>
              <option value="Natural">Natural</option>
              <option value="Satin">Satin</option>
              <option value="Radiant">Radiant</option>
              <option value="Shimmer">Shimmer</option>
              <option value="Metallic">Metallic</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-[#9CA3AF] text-xs mb-2 font-medium">Expected Benefits Description</label>
          <textarea
            placeholder="e.g., Reduces fine lines by 30% in 4 weeks, Improves skin elasticity, Provides 24-hour hydration"
            rows="2"
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] resize-none"
          />
        </div>
      </div>

      {/* Warnings & Precautions */}
      <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/20">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-3 flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          Warnings & Precautions (Important for Amazon Compliance)
        </h4>
        <div className="space-y-3">
          <textarea
            placeholder="e.g., For external use only. Avoid contact with eyes. Discontinue use if irritation occurs. Keep out of reach of children."
            rows="3"
            className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] resize-none"
          />
          
          <div className="grid grid-cols-2 gap-3">
            {['Pregnancy Warning', 'Allergy Warning', 'Sun Sensitivity', 'Not for Children Under 3'].map(warning => (
              <label key={warning} className="flex items-center gap-2 text-xs text-[#E5E5E5] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-red-500 rounded" />
                <span>{warning}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-gradient-to-br from-[#6D28D9]/10 to-[#A855F7]/10 rounded-lg p-4 border border-[#6D28D9]/30">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-xs text-[#E5E5E5] font-semibold mb-1">Amazon-Level Pro Tips:</p>
            <ul className="text-xs text-[#9CA3AF] leading-relaxed space-y-1">
              <li>• Always include ingredient lists - customers search for specific ingredients like "hyaluronic acid serum"</li>
              <li>• Highlight "free-from" claims prominently - these are major selling points</li>
              <li>• Add SPF rating for any sun protection products - required by law in many regions</li>
              <li>• Specify skin type compatibility - helps customers filter products</li>
              <li>• Include visible results timeframe - sets realistic expectations</li>
              <li>• Add warnings/precautions - required for Amazon compliance and customer safety</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautySpecifications;