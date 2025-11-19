// ✅ src/pages/Home.jsx
import React, { useState, useMemo, useEffect } from "react";
import HomeHero from "../components/HomeHero";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSortAmountDown, FaSearch } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // ✅ Move fetchProducts outside useEffect so it can be reused
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔍 Fetching products from:", `${API_URL}/api/products`);
      
      const response = await fetch(`${API_URL}/api/products`);
      console.log("📡 Response status:", response.status);
      
      const data = await response.json();
      console.log("📦 Data received:", data);
      
      if (data.success && data.products) {
        console.log("✅ Products count:", data.products.length);
        setProducts(data.products);
      } else {
        console.log("⚠️ No products in response");
        setError("No products available");
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setError("Failed to load products. Please make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchTerm, sortOrder, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
    return cats;
  }, [products]);

  // Responsive visible count
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [visibleCount, setVisibleCount] = React.useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalProducts = filteredAndSortedProducts.length;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalProducts - visibleCount;

  const prev = () => {
    if (canGoPrev) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const next = () => {
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const visibleProducts = filteredAndSortedProducts.slice(currentIndex, currentIndex + visibleCount);

  const toggleSort = () => {
    if (sortOrder === "none") setSortOrder("low-high");
    else if (sortOrder === "low-high") setSortOrder("high-low");
    else setSortOrder("none");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#B8860B] mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <p className="text-red-600 text-lg mb-2">⚠️ {error}</p>
            <p className="text-sm text-gray-600">
              Make sure your backend server is running on port 5000
            </p>
          </div>
          <button
            onClick={fetchProducts}
            className="px-6 py-3 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition"
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

      <section className="container mx-auto py-8 md:py-16 px-4 md:px-6">
        {/* Header with Search, Category, Sort */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#B8860B] tracking-wide mb-1">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                {totalProducts} {totalProducts === 1 ? 'product' : 'products'} available
              </p>
            </div>

            <button
              onClick={toggleSort}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FaSortAmountDown className="text-[#B8860B]" />
              <span className="text-sm font-medium">
                {sortOrder === "none" && "Sort by Price"}
                {sortOrder === "low-high" && "Price: Low to High"}
                {sortOrder === "high-low" && "Price: High to Low"}
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#B8860B] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Display */}
        {totalProducts === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No products found</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Carousel Container */}
            <div className="relative">
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
                  >
                    {visibleProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons - Desktop & Tablet */}
              {totalProducts > visibleCount && (
                <>
                  <button
                    onClick={prev}
                    disabled={!canGoPrev}
                    className={`hidden sm:flex absolute left-0 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 
                      bg-white/95 backdrop-blur-sm p-2 md:p-3 lg:p-4 rounded-full 
                      shadow-lg border-2 border-gray-200 
                      transition-all duration-300 z-10
                      ${canGoPrev 
                        ? 'hover:bg-white hover:shadow-amber-400/50 hover:scale-110 hover:border-amber-500 cursor-pointer' 
                        : 'opacity-50 cursor-not-allowed'
                      }`}
                  >
                    <FaChevronLeft className="text-gray-800 text-base md:text-lg lg:text-xl" />
                  </button>

                  <button
                    onClick={next}
                    disabled={!canGoNext}
                    className={`hidden sm:flex absolute right-0 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 
                      bg-white/95 backdrop-blur-sm p-2 md:p-3 lg:p-4 rounded-full 
                      shadow-lg border-2 border-gray-200 
                      transition-all duration-300 z-10
                      ${canGoNext 
                        ? 'hover:bg-white hover:shadow-amber-400/50 hover:scale-110 hover:border-amber-500 cursor-pointer' 
                        : 'opacity-50 cursor-not-allowed'
                      }`}
                  >
                    <FaChevronRight className="text-gray-800 text-base md:text-lg lg:text-xl" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile Navigation Buttons */}
            {totalProducts > visibleCount && (
              <div className="flex sm:hidden justify-center gap-4 mt-6">
                <button
                  onClick={prev}
                  disabled={!canGoPrev}
                  className={`bg-white/95 backdrop-blur-sm p-3 rounded-full 
                    shadow-lg border-2 border-gray-200 transition-all duration-300
                    ${canGoPrev 
                      ? 'hover:bg-white hover:shadow-amber-400/50 active:scale-95 hover:border-amber-500' 
                      : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                  <FaChevronLeft className="text-gray-800 text-lg" />
                </button>
                <button
                  onClick={next}
                  disabled={!canGoNext}
                  className={`bg-white/95 backdrop-blur-sm p-3 rounded-full 
                    shadow-lg border-2 border-gray-200 transition-all duration-300
                    ${canGoNext 
                      ? 'hover:bg-white hover:shadow-amber-400/50 active:scale-95 hover:border-amber-500' 
                      : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                  <FaChevronRight className="text-gray-800 text-lg" />
                </button>
              </div>
            )}

            {/* Pagination Dots */}
            {totalProducts > visibleCount && (
              <div className="flex items-center gap-2 justify-center mt-6 md:mt-10">
                {Array.from({ length: totalProducts - visibleCount + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentIndex
                        ? "w-8 h-2.5 bg-gradient-to-r from-[#FFD700] to-[#B8860B] shadow-[0_0_8px_#FFD700]"
                        : "w-2.5 h-2.5 bg-gray-400/50 hover:bg-gray-500/70"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            <p className="text-center text-sm text-gray-500 mt-4">
              Showing {currentIndex + 1}-{Math.min(currentIndex + visibleCount, totalProducts)} of {totalProducts} products
            </p>
          </>
        )}
      </section>
    </main>
  );
}