// components/admin/product-sections/ProductPreview.jsx
import React from 'react';
import { FaCheckCircle, FaCheck, FaEdit } from 'react-icons/fa';

const ProductPreview = ({ product, setProduct, saveProduct }) => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
      <div className="flex items-center gap-2 mb-6">
        <FaCheckCircle className="text-green-400 text-2xl" />
        <h2 className="text-2xl font-bold text-[#E5E5E5]">Product Ready to Save</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {product.images?.length > 0 && (
          <div>
            <label className="block text-[#E5E5E5] font-semibold mb-3">Images</label>
            <div className="grid grid-cols-2 gap-3">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Product ${idx + 1}`}
                  className="w-full h-40 object-cover rounded-lg border-2 border-[#2A2A2A]"
                />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-1">Product Name</label>
            <p className="text-[#E5E5E5] text-lg font-semibold">{product.name}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[#9CA3AF] text-sm mb-1">Price</label>
              <p className="text-[#E5E5E5] font-semibold">AED {product.price}</p>
            </div>
            <div>
              <label className="block text-[#9CA3AF] text-sm mb-1">Stock</label>
              <p className="text-[#E5E5E5] font-semibold">{product.stock}</p>
            </div>
            <div>
              <label className="block text-[#9CA3AF] text-sm mb-1">Discount</label>
              <p className="text-[#E5E5E5] font-semibold">{product.discount}%</p>
            </div>
          </div>
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-1">Category</label>
            <p className="text-[#E5E5E5] font-semibold">
              {product.category} {product.subCategory && `> ${product.subCategory}`}
            </p>
          </div>
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-1">Brand</label>
            <p className="text-[#E5E5E5] font-semibold">{product.brand}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[#E5E5E5] font-semibold mb-2">Description</label>
        <textarea
          value={product.description}
          onChange={(e) => setProduct({...product, description: e.target.value})}
          rows="6"
          className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:outline-none focus:border-[#6D28D9]"
        />
      </div>

      {/* Display specifications */}
      {Object.keys(product).filter(key => 
        !['name', 'price', 'stock', 'category', 'subCategory', 'brand', 'images', 'description', 'discount', 'featured', 'bestSeller', 'variants', '_id', 'sku', 'createdAt', 'updatedAt'].includes(key) && 
        product[key]
      ).length > 0 && (
        <div className="mb-6">
          <label className="block text-[#E5E5E5] font-semibold mb-3">Specifications</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-[#0A0A0A] p-4 rounded-lg">
            {Object.keys(product).filter(key => 
              !['name', 'price', 'stock', 'category', 'subCategory', 'brand', 'images', 'description', 'discount', 'featured', 'bestSeller', 'variants', '_id', 'sku', 'createdAt', 'updatedAt'].includes(key) && 
              product[key]
            ).map(key => (
              <div key={key}>
                <label className="block text-[#9CA3AF] text-xs mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                <p className="text-[#E5E5E5] text-sm">{product[key]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display variants */}
      {product.variants?.length > 0 && (
        <div className="mb-6">
          <label className="block text-[#E5E5E5] font-semibold mb-3">Variants ({product.variants.length})</label>
          <div className="space-y-2">
            {product.variants.map((variant, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#0A0A0A] p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-[#E5E5E5] font-medium">{variant.name}: {variant.value}</span>
                  <span className="text-[#9CA3AF] text-sm">Stock: {variant.stock}</span>
                </div>
                {variant.priceAdjustment !== 0 && (
                  <span className={`text-sm font-semibold ${variant.priceAdjustment > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {variant.priceAdjustment > 0 ? '+' : ''}{variant.priceAdjustment} AED
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(product.featured || product.bestSeller) && (
        <div className="mb-6 flex gap-3">
          {product.featured && (
            <span className="px-4 py-2 bg-[#6D28D9]/20 text-[#A855F7] rounded-lg text-sm font-semibold">
              ⭐ Featured Product
            </span>
          )}
          {product.bestSeller && (
            <span className="px-4 py-2 bg-[#10B981]/20 text-[#10B981] rounded-lg text-sm font-semibold">
              🏆 Best Seller
            </span>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={saveProduct}
          className="flex-1 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold rounded-lg hover:opacity-90 transition text-lg flex items-center justify-center gap-2"
        >
          <FaCheck className="text-xl" /> Save Product to Store
        </button>
        <button
          onClick={() => setProduct(null)}
          className="px-6 py-4 bg-[#2A2A2A] text-[#E5E5E5] rounded-lg hover:bg-[#3A3A3A] transition font-semibold"
        >
          <FaEdit />
        </button>
      </div>
    </div>
  );
};

export default ProductPreview;