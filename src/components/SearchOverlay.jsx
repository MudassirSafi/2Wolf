// ==========================================
// 📁 FILE 3: src/components/SearchOverlay.jsx (UPDATED)
// ==========================================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearch } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const prods = data.products || [];
        setProducts(prods);
        setFiltered(prods);
        setLoading(false);
      })
      .catch(err => {
        console.error("Search fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (query.trim() === "") {
      setFiltered(products);
    } else {
      const searchLower = query.toLowerCase();
      setFiltered(
        products.filter(p =>
          p.name?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.category?.toLowerCase().includes(searchLower)
        )
      );
    }
  }, [query, products]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[9999] flex flex-col"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-6xl mx-auto p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Search Products</h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-[#EAB308] transition text-3xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products by name, category, or description..."
            className="w-full px-16 py-4 text-lg bg-white/10 border-2 border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#EAB308] transition"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Results Count */}
        {!loading && (
          <p className="text-gray-400 mb-4">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'} found
            {query && ` for "${query}"`}
          </p>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#EAB308]"></div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence>
                {filtered.map((p, index) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => handleProductClick(p._id)}
                    className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-white/10"
                  >
                    {/* Product Image */}
                    <div className="relative h-40 sm:h-48 bg-white/5">
                      <img
                        src={p.images?.[0] || "https://via.placeholder.com/300"}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300/6E2A6E/FFFFFF?text=No+Image";
                        }}
                      />
                      {p.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{p.discount}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-2 mb-2">
                        {p.name}
                      </h3>
                      {p.category && (
                        <p className="text-xs text-gray-400 mb-2">{p.category}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="text-[#EAB308] font-bold text-base sm:text-lg">
                          ${p.price.toFixed(2)}
                        </p>
                        {p.stock > 0 ? (
                          <span className="text-xs text-green-400">In Stock</span>
                        ) : (
                          <span className="text-xs text-red-400">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filtered.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-white text-2xl font-semibold mb-2">
                  No products found
                </p>
                <p className="text-gray-400 text-lg">
                  Try searching with different keywords
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #EAB308;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D19B07;
        }
      `}</style>
    </motion.div>
  );
}