import React from 'react';
import { FaTruck, FaFire, FaTags, FaChartLine } from 'react-icons/fa';

const MarketingTags = ({ formData, setFormData }) => {
  const handleToggle = (field) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#E5E5E5] border-b border-[#2A2A2A] pb-2">
          Marketing & Promotional Tags
        </h3>
        <span className="text-xs text-[#9CA3AF]">Boost visibility & conversions</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Free Delivery */}
        <div
          onClick={() => handleToggle('freeDelivery')}
          className={`p-4 rounded-lg border-2 cursor-pointer transition ${
            formData.freeDelivery
              ? 'border-green-500 bg-green-500/10'
              : 'border-[#2A2A2A] bg-[#0A0A0A] hover:border-green-500/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              formData.freeDelivery ? 'bg-green-500' : 'bg-[#1A1A1A]'
            }`}>
              <FaTruck className={formData.freeDelivery ? 'text-white' : 'text-green-500'} size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-[#E5E5E5] font-semibold">Free Delivery</h4>
              <p className="text-xs text-[#9CA3AF]">Show free shipping badge</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              formData.freeDelivery ? 'bg-green-500 border-green-500' : 'border-[#2A2A2A]'
            }`}>
              {formData.freeDelivery && <span className="text-white text-xs">✓</span>}
            </div>
          </div>
          {formData.freeDelivery && (
            <div className="mt-2 px-3 py-1 bg-green-500/20 rounded text-green-400 text-xs font-medium inline-block">
              🚚 FREE Delivery
            </div>
          )}
        </div>

        {/* Selling Out Fast */}
        <div
          onClick={() => handleToggle('sellingFast')}
          className={`p-4 rounded-lg border-2 cursor-pointer transition ${
            formData.sellingFast
              ? 'border-orange-500 bg-orange-500/10'
              : 'border-[#2A2A2A] bg-[#0A0A0A] hover:border-orange-500/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              formData.sellingFast ? 'bg-orange-500' : 'bg-[#1A1A1A]'
            }`}>
              <FaFire className={formData.sellingFast ? 'text-white' : 'text-orange-500'} size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-[#E5E5E5] font-semibold">Selling Out Fast</h4>
              <p className="text-xs text-[#9CA3AF]">Create urgency with badge</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              formData.sellingFast ? 'bg-orange-500 border-orange-500' : 'border-[#2A2A2A]'
            }`}>
              {formData.sellingFast && <span className="text-white text-xs">✓</span>}
            </div>
          </div>
          {formData.sellingFast && (
            <div className="mt-2 px-3 py-1 bg-orange-500/20 rounded text-orange-400 text-xs font-medium inline-block animate-pulse">
              🔥 Selling Out Fast!
            </div>
          )}
        </div>

        {/* Lowest Price in Year */}
        <div
          onClick={() => handleToggle('lowestPrice')}
          className={`p-4 rounded-lg border-2 cursor-pointer transition ${
            formData.lowestPrice
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-[#2A2A2A] bg-[#0A0A0A] hover:border-blue-500/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              formData.lowestPrice ? 'bg-blue-500' : 'bg-[#1A1A1A]'
            }`}>
              <FaTags className={formData.lowestPrice ? 'text-white' : 'text-blue-500'} size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-[#E5E5E5] font-semibold">Lowest Price in Year</h4>
              <p className="text-xs text-[#9CA3AF]">Highlight best price deal</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              formData.lowestPrice ? 'bg-blue-500 border-blue-500' : 'border-[#2A2A2A]'
            }`}>
              {formData.lowestPrice && <span className="text-white text-xs">✓</span>}
            </div>
          </div>
          {formData.lowestPrice && (
            <div className="mt-2 px-3 py-1 bg-blue-500/20 rounded text-blue-400 text-xs font-medium inline-block">
              💰 Lowest Price in a Year
            </div>
          )}
        </div>

        {/* Recently Sold */}
        <div className="p-4 rounded-lg border-2 border-[#2A2A2A] bg-[#0A0A0A]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
              <FaChartLine className="text-purple-500" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-[#E5E5E5] font-semibold">Recently Sold</h4>
              <p className="text-xs text-[#9CA3AF]">Show social proof</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showRecentlySold || false}
                onChange={(e) => setFormData({ ...formData, showRecentlySold: e.target.checked })}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-sm text-[#E5E5E5]">Enable "Recently Sold" badge</span>
            </label>
            {formData.showRecentlySold && (
              <div className="mt-3">
                <label className="block text-[#E5E5E5] text-sm mb-2">Number of Items Sold</label>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={formData.recentlySoldCount || 55}
                  onChange={(e) => setFormData({ ...formData, recentlySoldCount: parseInt(e.target.value) || 55 })}
                  placeholder="55"
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
                />
                <div className="mt-2 px-3 py-1 bg-purple-500/20 rounded text-purple-400 text-xs font-medium inline-block">
                  📈 {formData.recentlySoldCount || 55}+ sold recently
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {(formData.freeDelivery || formData.sellingFast || formData.lowestPrice || formData.showRecentlySold) && (
        <div className="bg-[#0A0A0A] border-2 border-[#6D28D9] rounded-lg p-4">
          <h4 className="text-[#E5E5E5] font-semibold mb-3 flex items-center gap-2">
            👁️ Preview on Product Card
          </h4>
          <div className="bg-[#1A1A1A] rounded-lg p-4 space-y-2">
            {formData.freeDelivery && (
              <div className="px-3 py-1 bg-green-500/20 rounded text-green-400 text-xs font-medium inline-block mr-2">
                🚚 FREE Delivery
              </div>
            )}
            {formData.sellingFast && (
              <div className="px-3 py-1 bg-orange-500/20 rounded text-orange-400 text-xs font-medium inline-block mr-2 animate-pulse">
                🔥 Selling Out Fast!
              </div>
            )}
            {formData.lowestPrice && (
              <div className="px-3 py-1 bg-blue-500/20 rounded text-blue-400 text-xs font-medium inline-block mr-2">
                💰 Lowest Price in a Year
              </div>
            )}
            {formData.showRecentlySold && (
              <div className="px-3 py-1 bg-purple-500/20 rounded text-purple-400 text-xs font-medium inline-block">
                📈 {formData.recentlySoldCount || 55}+ sold recently
              </div>
            )}
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-400 text-sm">
          💡 <strong>Tip:</strong> These badges will appear on product cards to increase conversion rates. 
          They create urgency and build trust with customers.
        </p>
      </div>
    </div>
  );
};

export default MarketingTags;