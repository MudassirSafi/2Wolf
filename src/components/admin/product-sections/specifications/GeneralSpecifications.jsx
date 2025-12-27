// components/admin/product-sections/specifications/GeneralSpecifications.jsx
import React from 'react';

const GeneralSpecifications = ({ formData, setFormData, categoryData }) => {
  const shouldShowField = (fieldName) => categoryData?.fields?.includes(fieldName);

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#9CA3AF]">General product specifications</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Size */}
        {shouldShowField('size') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Size</label>
            <input
              type="text"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              placeholder="e.g., S, M, L, XL"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Color */}
        {shouldShowField('color') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Color</label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              placeholder="e.g., Black, White"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Material */}
        {shouldShowField('material') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Material</label>
            <input
              type="text"
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              placeholder="e.g., Cotton, Leather"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Gender */}
        {shouldShowField('gender') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
            >
              <option value="">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
        )}

        {/* Processor */}
        {shouldShowField('processor') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Processor</label>
            <input
              type="text"
              value={formData.processor}
              onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
              placeholder="e.g., Intel Core i5"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* RAM */}
        {shouldShowField('ram') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">RAM</label>
            <input
              type="text"
              value={formData.ram}
              onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
              placeholder="e.g., 8GB, 16GB"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Storage */}
        {shouldShowField('storage') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Storage</label>
            <input
              type="text"
              value={formData.storage}
              onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
              placeholder="e.g., 256GB SSD"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Screen Size */}
        {shouldShowField('screenSize') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Screen Size</label>
            <input
              type="text"
              value={formData.screenSize}
              onChange={(e) => setFormData({ ...formData, screenSize: e.target.value })}
              placeholder="e.g., 15.6 inch"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Movement */}
        {shouldShowField('movement') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Movement</label>
            <select
              value={formData.movement}
              onChange={(e) => setFormData({ ...formData, movement: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
            >
              <option value="">Select</option>
              <option value="Quartz">Quartz</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        )}

        {/* Band Material */}
        {shouldShowField('bandMaterial') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Band Material</label>
            <input
              type="text"
              value={formData.bandMaterial}
              onChange={(e) => setFormData({ ...formData, bandMaterial: e.target.value })}
              placeholder="e.g., Leather, Steel"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Case Style */}
        {shouldShowField('caseStyle') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Case Style</label>
            <input
              type="text"
              value={formData.caseStyle}
              onChange={(e) => setFormData({ ...formData, caseStyle: e.target.value })}
              placeholder="e.g., Round, Square"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Water Resistance */}
        {shouldShowField('waterResistance') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Water Resistance</label>
            <input
              type="text"
              value={formData.waterResistance}
              onChange={(e) => setFormData({ ...formData, waterResistance: e.target.value })}
              placeholder="e.g., 50m, 100m"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Capacity */}
        {shouldShowField('capacity') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Capacity</label>
            <input
              type="text"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              placeholder="e.g., 1.5L, 5L"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Power Wattage */}
        {shouldShowField('powerWattage') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Power (Wattage)</label>
            <input
              type="text"
              value={formData.powerWattage}
              onChange={(e) => setFormData({ ...formData, powerWattage: e.target.value })}
              placeholder="e.g., 1000W"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Voltage */}
        {shouldShowField('voltage') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Voltage</label>
            <input
              type="text"
              value={formData.voltage}
              onChange={(e) => setFormData({ ...formData, voltage: e.target.value })}
              placeholder="e.g., 220V"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Weight */}
        {shouldShowField('weight') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Weight</label>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="e.g., 500g, 2kg"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Dimensions */}
        {shouldShowField('dimensions') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Dimensions</label>
            <input
              type="text"
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              placeholder="e.g., 30x20x15 cm"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Warranty */}
        {shouldShowField('warranty') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Warranty</label>
            <input
              type="text"
              value={formData.warranty}
              onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
              placeholder="e.g., 1 Year"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}

        {/* Fit */}
        {shouldShowField('fit') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Fit</label>
            <select
              value={formData.fit}
              onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer"
            >
              <option value="">Select</option>
              <option value="Slim Fit">Slim Fit</option>
              <option value="Regular Fit">Regular Fit</option>
              <option value="Loose Fit">Loose Fit</option>
            </select>
          </div>
        )}

        {/* Pattern */}
        {shouldShowField('pattern') && (
          <div>
            <label className="block text-[#E5E5E5] text-sm mb-2">Pattern</label>
            <input
              type="text"
              value={formData.pattern}
              onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
              placeholder="e.g., Solid, Striped"
              className="w-full px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
            />
          </div>
        )}
      </div>

      {/* Show message if no fields are configured */}
      {!categoryData?.fields || categoryData.fields.length === 0 && (
        <div className="text-center py-8 text-[#9CA3AF]">
          <p>No specific fields configured for this category.</p>
          <p className="text-sm mt-2">You can add custom fields using the Category Manager above.</p>
        </div>
      )}
    </div>
  );
};

export default GeneralSpecifications;