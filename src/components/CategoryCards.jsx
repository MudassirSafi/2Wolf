// src/components/CategoryCards.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WishlistButton from "./WishlistButton";

export default function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // Complete category structure
  const categoryStructure = {
    "📱 Electronics": {
      subcategories: ["Mobile Phones", "Laptops", "Tablets", "Headphones"]
    },
    "👗 Fashion": {
      subcategories: ["Men's Clothing", "Women's Clothing", "Kids Clothing", "Shoes"]
    },
    "🏠 Home & Kitchen": {
      subcategories: ["Furniture", "Kitchen Appliances", "Home Decor", "Cookware"]
    },
    "🧴 Beauty & Care": {
      subcategories: ["Skincare", "Hair Care", "Makeup", "Fragrances"]
    },
    "⌚ Watches": {
      subcategories: ["Men's Watches", "Women's Watches", "Smart Watches", "Sports Watches"]
    },
    "🏋️ Sports": {
      subcategories: ["Fitness Equipment", "Outdoor Recreation", "Sports Apparel", "Cycling"]
    },
    "🎮 Gaming": {
      subcategories: ["Console Games", "PC Games", "Gaming Accessories", "VR Games"]
    },
    "📚 Books": {
      subcategories: ["Fiction", "Non-Fiction", "Children's Books", "Stationery"]
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  const fetchCategoryProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      
      if (data.success && data.products) {
        const products = data.products;
        
        // Create category data with ACTUAL products
        const categoryData = Object.keys(categoryStructure).slice(0, 8).map(categoryName => {
          const cleanCategoryName = categoryName.replace(/^[^\s]+\s/, ''); // Remove emoji
          
          // Find products that match this category
          const categoryProducts = products.filter(p => 
            p.category?.toLowerCase().includes(cleanCategoryName.toLowerCase())
          );

          // Map to subcategories or just take first 4 products
          const items = categoryStructure[categoryName].subcategories.slice(0, 4).map((subCat, idx) => {
            // Try to find product matching subcategory
            let product = categoryProducts.find(p => 
              p.subCategory?.toLowerCase().includes(subCat.toLowerCase())
            );
            
            // If no match, just take next available product
            if (!product && categoryProducts[idx]) {
              product = categoryProducts[idx];
            }
            
            return {
              name: product?.name || subCat,
              product: product || null
            };
          });

          return {
            category: categoryName,
            title: categoryName,
            items: items,
            productCount: categoryProducts.length
          };
        });

        setCategories(categoryData);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category, subCategory = null) => {
    const cleanCategory = category.replace(/^[^\s]+\s/, '');
    if (subCategory) {
      window.location.href = `/shop?category=${encodeURIComponent(cleanCategory)}&subCategory=${encodeURIComponent(subCategory)}`;
    } else {
      window.location.href = `/shop?category=${encodeURIComponent(cleanCategory)}`;
    }
  };

  const handleExploreAll = (category) => {
    const cleanCategory = category.replace(/^[^\s]+\s/, '');
    window.location.href = `/shop?category=${encodeURIComponent(cleanCategory)}`;
  };

  const handleProductClick = (product) => {
    if (product) {
      window.location.href = `/product/${product._id}`;
    }
  };

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-[#F3EFEA] to-[#FAF8F5]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Orange Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                <h3 className="text-xl font-bold text-white line-clamp-1">
                  {cat.title}
                </h3>
                {cat.productCount > 0 && (
                  <p className="text-orange-100 text-xs mt-1">{cat.productCount} products</p>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Product Grid - 2x2 */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {cat.items.slice(0, 4).map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      onClick={() => item.product ? handleProductClick(item.product) : handleCategoryClick(cat.category, item.name)}
                      className="cursor-pointer group relative"
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 border-2 border-transparent group-hover:border-orange-400 transition-all relative">
                        {item.product ? (
                          <>
                            <img
                              src={item.product.images?.[0] || 'https://via.placeholder.com/200'}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {/* Wishlist Button */}
                            <div className="absolute top-1.5 right-1.5 z-10">
                              <WishlistButton product={item.product} size="small" />
                            </div>
                            {/* Discount Badge */}
                            {item.product.discount > 0 && (
                              <div className="absolute top-1.5 left-1.5 bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold z-10">
                                -{item.product.discount}%
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-700 group-hover:text-orange-600 transition-colors font-medium line-clamp-2">
                        {item.product?.name || item.name}
                      </p>
                      {item.product && (
                        <p className="text-[11px] font-bold text-orange-600 mt-0.5">
                          AED {item.product.discount > 0 
                            ? (item.product.price * (1 - item.product.discount / 100)).toFixed(2)
                            : item.product.price.toFixed(2)
                          }
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Explore All Link */}
                <button
                  onClick={() => handleExploreAll(cat.category)}
                  className="text-sm text-orange-600 hover:text-orange-700 hover:underline font-semibold flex items-center gap-1 transition-colors"
                >
                  Explore all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => window.location.href = '/shop'}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          >
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
}