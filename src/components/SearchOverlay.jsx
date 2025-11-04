import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearch } from "react-icons/fa";

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // ✅ Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter products when user types
  useEffect(() => {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  }, [query, products]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-start text-white z-[2000] p-6 overflow-y-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-[#EAB308] text-3xl transition"
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold mb-6 mt-10">Search Products</h2>

        {/* Search Input */}
        <div className="relative w-full max-w-xl mb-10">
          <FaSearch className="absolute left-4 top-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full bg-[#1A1A1A] py-3 pl-10 pr-4 rounded-lg text-lg text-white focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
            autoFocus
          />
        </div>

        {/* Results */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl"
        >
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <motion.div
                key={p._id}
                className="bg-white/10 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold truncate">{p.name}</h3>
                  <p className="text-[#EAB308] font-bold mt-1">${p.price}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 mt-20 text-lg">
              No products found for “{query || "your search"}”
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
