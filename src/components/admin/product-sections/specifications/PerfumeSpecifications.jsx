// components/admin/product-sections/specifications/PerfumeSpecifications.jsx
import React, { useState } from 'react';

const PerfumeSpecifications = ({ formData, setFormData }) => {
  const [topNotes, setTopNotes] = useState('');
  const [middleNotes, setMiddleNotes] = useState('');
  const [baseNotes, setBaseNotes] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#E5E5E5]">Perfume & Fragrance Specifications</h3>
        <span className="text-xs text-[#9CA3AF] bg-[#0A0A0A] px-3 py-1 rounded-full">Advanced Mode</span>
      </div>
      
      {/* Main Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Volume/Size */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">
            Volume <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Volume</option>
            <option value="5ml">5ml (Travel/Sample Size)</option>
            <option value="10ml">10ml (Rollette)</option>
            <option value="15ml">15ml</option>
            <option value="30ml">30ml (1 fl oz)</option>
            <option value="50ml">50ml (1.7 fl oz)</option>
            <option value="75ml">75ml (2.5 fl oz)</option>
            <option value="100ml">100ml (3.4 fl oz)</option>
            <option value="125ml">125ml (4.2 fl oz)</option>
            <option value="150ml">150ml (5 fl oz)</option>
            <option value="200ml">200ml (6.8 fl oz)</option>
          </select>
        </div>

        {/* Fragrance Type */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">
            Fragrance Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Type</option>
            <option value="Parfum">Parfum/Extrait (15-40%)</option>
            <option value="Eau de Parfum">Eau de Parfum (EDP) (10-20%)</option>
            <option value="Eau de Toilette">Eau de Toilette (EDT) (5-15%)</option>
            <option value="Eau de Cologne">Eau de Cologne (EDC) (2-5%)</option>
            <option value="Attar">Attar/Oil-Based (Pure)</option>
            <option value="Body Mist">Body Mist (1-3%)</option>
            <option value="Bakhoor">Bakhoor/Incense</option>
            <option value="Essential Oil">Essential Oil (100%)</option>
          </select>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Scent Family */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Scent Family</label>
          <select
            value={formData.pattern}
            onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Scent Family</option>
            <option value="Floral">Floral (Rose, Jasmine, Lily)</option>
            <option value="Oriental">Oriental/Amber (Spicy, Warm)</option>
            <option value="Woody">Woody (Sandalwood, Cedar)</option>
            <option value="Fresh">Fresh/Citrus (Lemon, Bergamot)</option>
            <option value="Fruity">Fruity (Apple, Peach, Berry)</option>
            <option value="Spicy">Spicy (Cinnamon, Pepper)</option>
            <option value="Aquatic">Aquatic/Marine (Ocean, Sea)</option>
            <option value="Aromatic">Aromatic (Herbs, Lavender)</option>
            <option value="Gourmand">Gourmand (Sweet, Vanilla)</option>
            <option value="Leather">Leather (Tobacco, Suede)</option>
            <option value="Chypre">Chypre (Mossy, Earthy)</option>
            <option value="Oud">Oud/Agarwood</option>
          </select>
        </div>

        {/* Concentration */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Concentration</label>
          <select
            value={formData.powerWattage}
            onChange={(e) => setFormData({ ...formData, powerWattage: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          >
            <option value="">Select Concentration</option>
            <option value="15-40%">15-40% (Parfum/Extrait)</option>
            <option value="10-20%">10-20% (Eau de Parfum)</option>
            <option value="5-15%">5-15% (Eau de Toilette)</option>
            <option value="2-5%">2-5% (Eau de Cologne)</option>
            <option value="Pure Oil">Pure Oil (Attar - 100%)</option>
          </select>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Weight</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="e.g., 150g, 200g, 5.3oz"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>

        {/* Dimensions */}
        <div className="space-y-2">
          <label className="block text-[#E5E5E5] text-sm font-medium">Bottle Dimensions</label>
          <input
            type="text"
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            placeholder="e.g., 5 x 5 x 12 cm"
            className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition"
          />
        </div>
      </div>

      {/* Fragrance Notes - Premium Feature */}
      <div className="border-t border-[#2A2A2A] pt-6">
        <h4 className="text-base font-semibold text-[#E5E5E5] mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#6D28D9] rounded"></span>
          Fragrance Pyramid (Notes)
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              Top Notes (First Impression)
            </label>
            <textarea
              value={topNotes}
              onChange={(e) => setTopNotes(e.target.value)}
              placeholder="e.g., Bergamot, Lemon, Green Apple, Grapefruit"
              rows="3"
              className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition resize-none"
            />
            <p className="text-xs text-[#666]">Lasts 15-30 minutes</p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              Heart/Middle Notes (Core)
            </label>
            <textarea
              value={middleNotes}
              onChange={(e) => setMiddleNotes(e.target.value)}
              placeholder="e.g., Rose, Jasmine, Lavender, Cinnamon"
              rows="3"
              className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition resize-none"
            />
            <p className="text-xs text-[#666]">Lasts 2-4 hours</p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
              Base Notes (Foundation)
            </label>
            <textarea
              value={baseNotes}
              onChange={(e) => setBaseNotes(e.target.value)}
              placeholder="e.g., Sandalwood, Vanilla, Musk, Amber"
              rows="3"
              className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition resize-none"
            />
            <p className="text-xs text-[#666]">Lasts 4+ hours</p>
          </div>
        </div>
      </div>

      {/* Performance Characteristics */}
      <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-4">Performance Characteristics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Longevity (Duration)</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] transition">
              <option value="">Select Longevity</option>
              <option value="2-4 hours">2-4 hours (Light)</option>
              <option value="4-6 hours">4-6 hours (Moderate)</option>
              <option value="6-8 hours">6-8 hours (Good)</option>
              <option value="8-12 hours">8-12 hours (Very Good)</option>
              <option value="12+ hours">12+ hours (Excellent)</option>
              <option value="24+ hours">24+ hours (Exceptional)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Sillage (Projection/Trail)</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] transition">
              <option value="">Select Sillage</option>
              <option value="Intimate">Intimate (Skin scent only)</option>
              <option value="Moderate">Moderate (Arm's length)</option>
              <option value="Strong">Strong (Fills a room)</option>
              <option value="Very Strong">Very Strong (Beast mode)</option>
              <option value="Nuclear">Nuclear (Extreme projection)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Best Season</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] transition">
              <option value="">Select Season</option>
              <option value="Spring">Spring (Fresh & Light)</option>
              <option value="Summer">Summer (Citrus & Aquatic)</option>
              <option value="Fall">Fall/Autumn (Warm & Spicy)</option>
              <option value="Winter">Winter (Rich & Heavy)</option>
              <option value="All Seasons">All Seasons (Versatile)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Best Time/Occasion</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] transition">
              <option value="">Select Occasion</option>
              <option value="Daily">Daily Wear (Office Safe)</option>
              <option value="Office">Professional/Office</option>
              <option value="Evening">Evening/Night Out</option>
              <option value="Date Night">Date Night/Romantic</option>
              <option value="Special Events">Special Events/Formal</option>
              <option value="Casual">Casual/Weekend</option>
              <option value="Sport">Sport/Gym</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Age Group</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer focus:border-[#6D28D9] transition">
              <option value="">Select Age Group</option>
              <option value="Teens (13-19)">Teens (13-19)</option>
              <option value="Young Adults (20-29)">Young Adults (20-29)</option>
              <option value="Adults (30-45)">Adults (30-45)</option>
              <option value="Mature (45+)">Mature (45+)</option>
              <option value="All Ages">All Ages</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[#9CA3AF] text-xs font-medium uppercase tracking-wide">Vibe/Mood</label>
            <input
              type="text"
              placeholder="e.g., Sophisticated, Fresh, Seductive, Confident"
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition"
            />
          </div>
        </div>
      </div>

      {/* Similar Fragrances */}
      <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-3">Similar To / Inspired By</h4>
        <input
          type="text"
          placeholder="e.g., Dior Sauvage, Bleu de Chanel, Aventus Creed"
          className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] focus:border-[#6D28D9] transition"
        />
        <p className="text-xs text-[#666] mt-2">Help customers find fragrances based on what they already love</p>
      </div>

      {/* Bottle Design */}
      <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#2A2A2A]">
        <h4 className="text-sm font-semibold text-[#E5E5E5] mb-3">Bottle & Packaging</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2">Bottle Material</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer">
              <option value="">Select</option>
              <option value="Glass">Glass (Premium)</option>
              <option value="Crystal">Crystal</option>
              <option value="Plastic">Plastic</option>
            </select>
          </div>

          <div>
            <label className="block text-[#9CA3AF] text-xs mb-2">Spray Type</label>
            <select className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-sm text-[#E5E5E5] cursor-pointer">
              <option value="">Select</option>
              <option value="Atomizer">Atomizer (Spray)</option>
              <option value="Roller">Roller Ball</option>
              <option value="Splash">Splash</option>
              <option value="Pump">Pump</option>
            </select>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="bg-gradient-to-br from-[#6D28D9]/10 to-[#A855F7]/10 rounded-lg p-4 border border-[#6D28D9]/30">
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          💡 <span className="font-semibold">Pro Tip:</span> Perfumes sell better when you describe the notes, longevity, and occasions. 
          Include similar fragrances to help customers find what they're looking for. Always mention the concentration (EDP, EDT) as it affects price expectations.
        </p>
      </div>
    </div>
  );
};

export default PerfumeSpecifications;