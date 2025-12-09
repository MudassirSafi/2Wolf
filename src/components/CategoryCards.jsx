import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        
        if (data.success && data.products) {
          const products = data.products;
          
          // Group products by category and subCategory
          const categoryMap = {
            "Men's Fashion": {
              title: "Up to 70% off men's fashion",
              subCategories: ["Polos", "Watches", "Sunglasses", "Shoes"],
              products: {}
            },
            "Fitness": {
              title: "Stay fit in style",
              subCategories: ["Men's Shoes", "Women's Shoes", "Men's Clothes", "Women's Clothes"],
              products: {}
            },
            "Appliances": {
              title: "Up to 40% off | Appliances",
              subCategories: ["Air Fryers", "Air Purifiers", "Cookers", "Blenders & Juicers"],
              products: {}
            },
            "Toys": {
              title: "Toys for all ages",
              subCategories: ["Learning Toys", "Building Blocks", "Dolls & Accessories", "Outdoor Play"],
              products: {}
            }
          };

          // Fill category products
          products.forEach(product => {
            if (categoryMap[product.category]) {
              const subCat = product.subCategory;
              if (!categoryMap[product.category].products[subCat]) {
                categoryMap[product.category].products[subCat] = product;
              }
            }
          });

          // Convert to array
          const categoryData = Object.keys(categoryMap).map(key => ({
            category: key,
            title: categoryMap[key].title,
            items: categoryMap[key].subCategories.map(subCat => ({
              name: subCat,
              product: categoryMap[key].products[subCat] || null
            }))
          }));

          setCategories(categoryData);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  const handleCategoryClick = (category, subCategory = null) => {
    if (subCategory) {
      window.location.href = `/shop?category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(subCategory)}`;
    } else {
      window.location.href = `/shop?category=${encodeURIComponent(category)}`;
    }
  };

  const handleExploreAll = (category) => {
    window.location.href = `/shop?category=${encodeURIComponent(category)}`;
  };

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#B8860B]"></div>
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
              {/* Card Header */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-4 line-clamp-2">
                  {cat.title}
                </h3>

                {/* Product Grid - 2x2 */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {cat.items.slice(0, 4).map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      onClick={() => handleCategoryClick(cat.category, item.name)}
                      className="cursor-pointer group"
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                        {item.product ? (
                          <img
                            src={item.product.images?.[0] || 'https://via.placeholder.com/200'}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-700 group-hover:text-[#B8860B] transition-colors">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Explore All Link */}
                <button
                  onClick={() => handleExploreAll(cat.category)}
                  className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline font-medium flex items-center gap-1 transition-colors"
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
            className="bg-[#B8860B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9A7209] transition-colors shadow-md hover:shadow-lg"
          >
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
}