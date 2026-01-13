// src/pages/Home.jsx
import React, { useState, useMemo, useEffect } from "react";
import HomeHero from "../components/HomeHero";
import CategoryCards from "../components/CategoryCards";
import WishlistButton from "../components/WishlistButton";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visitedProducts, setVisitedProducts] = useState([]);
  const [dealsIndex, setDealsIndex] = useState(0);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      
      if (data.success && data.products) {
        setProducts(data.products);
        const visited = JSON.parse(localStorage.getItem('visitedProducts') || '[]');
        setVisitedProducts(visited);
      } else {
        setError("No products available");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get recommended products (show 16 for desktop, 8 for mobile)
  const recommendedProducts = useMemo(() => {
    if (visitedProducts.length === 0) {
      return products.slice(0, 16);
    }
    const visitedCategories = visitedProducts
      .map(id => products.find(p => p._id === id)?.category)
      .filter(Boolean);
    const recommended = products.filter(p => 
      visitedCategories.includes(p.category) && !visitedProducts.includes(p._id)
    );
    return recommended.slice(0, 16);
  }, [products, visitedProducts]);

  // Get deals products
  const dealsProducts = useMemo(() => {
    return products.filter(p => p.discount && p.discount > 0);
  }, [products]);

  // Responsive visible count
  const getDealsVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2;
      if (window.innerWidth < 768) return 3;
      if (window.innerWidth < 1024) return 4;
      if (window.innerWidth < 1280) return 6;
      return 8; // Desktop: 8 cards
    }
    return 8;
  };

  const [dealsVisibleCount, setDealsVisibleCount] = useState(getDealsVisibleCount());

  useEffect(() => {
    const handleResize = () => setDealsVisibleCount(getDealsVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canGoPrevDeals = dealsIndex > 0;
  const canGoNextDeals = dealsIndex < dealsProducts.length - dealsVisibleCount;

  const prevDeals = () => {
    if (canGoPrevDeals) setDealsIndex(prev => Math.max(0, prev - 1));
  };

  const nextDeals = () => {
    if (canGoNextDeals) setDealsIndex(prev => Math.min(dealsProducts.length - dealsVisibleCount, prev + 1));
  };

  const visibleDealsProducts = dealsProducts.slice(dealsIndex, dealsIndex + dealsVisibleCount);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
            <p className="text-yellow-800 text-lg mb-2">⚠️ {error}</p>
          </div>
          <button
            onClick={fetchProducts}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] text-[#0A0A0A] font-sans">
      <HomeHero />
      <CategoryCards />

      {/* Recommended Section - 8 per row on desktop */}
      {recommendedProducts.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Recommended For You</h2>
                <button
                  onClick={() => window.location.href = '/shop'}
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  View All →
                </button>
              </div>

              {/* 8 cards on desktop, 3-4 on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {recommendedProducts.slice(0, 16).map((product, idx) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => window.location.href = `/product/${product._id}`}
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.images?.[0] || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Wishlist Button */}
                      <div className="absolute top-2 right-2 z-10">
                        <WishlistButton product={product} size="small" />
                      </div>
                      {/* Discount Badge */}
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-base font-bold text-orange-600">
                          AED {product.discount > 0 
                            ? (product.price * (1 - product.discount / 100)).toFixed(2)
                            : product.price.toFixed(2)
                          }
                        </span>
                      </div>
                      {product.discount > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 line-through">
                            AED {product.price.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Hot Deals Section - 8 per row */}
      {dealsProducts.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg">
                    🔥 HOT DEALS
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Up to 70% Off</h2>
                </div>
                <button
                  onClick={() => window.location.href = '/shop?deals=true'}
                  className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2"
                >
                  View All Deals 
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="relative">
                {canGoPrevDeals && (
                  <button
                    onClick={prevDeals}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all hover:scale-110"
                  >
                    <FaChevronLeft className="text-orange-600 text-xl" />
                  </button>
                )}
                {canGoNextDeals && (
                  <button
                    onClick={nextDeals}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-all hover:scale-110"
                  >
                    <FaChevronRight className="text-orange-600 text-xl" />
                  </button>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  <AnimatePresence mode="wait">
                    {visibleDealsProducts.map((product, idx) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                        onClick={() => window.location.href = `/product/${product._id}`}
                      >
                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                          <img
                            src={product.images?.[0] || 'https://via.placeholder.com/300'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 z-10">
                            <WishlistButton product={product} size="small" />
                          </div>
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                            -{product.discount}%
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base font-bold text-orange-600">
                              AED {(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 line-through">
                              AED {product.price.toFixed(2)}
                            </span>
                            <span className="text-xs text-green-600 font-semibold">
                              Save {product.discount}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: Math.ceil(dealsProducts.length / dealsVisibleCount) }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setDealsIndex(idx * dealsVisibleCount)}
                      className={`h-2 rounded-full transition-all ${
                        Math.floor(dealsIndex / dealsVisibleCount) === idx 
                          ? "bg-orange-500 w-8" 
                          : "bg-gray-300 w-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}