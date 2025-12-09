// ✅ src/pages/Home.jsx
import React, { useState, useMemo, useEffect } from "react";
import HomeHero from "../components/HomeHero";
import CategoryCards from "../components/CategoryCards";
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

  // ✅ Fetch products
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
      {/* Hero Section */}
      <HomeHero />

      {/* Amazon-Style Category Cards */}
      <CategoryCards />

    </main>
  );
}