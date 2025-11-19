// src/components/SearchOverlay.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        const prods = data.products || [];
        setProducts(prods);
        setFiltered(prods);
      })
      .catch(err => console.error("Search fetch error:", err));
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter(p =>
          p.name?.toLowerCase().includes(query.toLowerCase())
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
      className="fixed inset-0 bg-black/95 z-[9999] flex flex-col p-6"
    >
      <button onClick={onClose} className="absolute top-6 right-8 text-4xl text-white hover:text-[#EAB308]">
        <FaTimes />
      </button>

      <div className="max-w-4xl mx-auto w-full mt-20">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-6 py-4 text-xl bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#EAB308]"
          autoFocus
        />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map(p => (
            <motion.div
              key={p._id}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleProductClick(p._id)}
              className="bg-white/10 rounded-xl overflow-hidden cursor-pointer shadow-lg"
            >
              <img
                src={p.images?.[0] || "https://via.placeholder.com/300"}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-white truncate">{p.name}</h3>
                <p className="text-[#EAB308] font-bold mt-2">${p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-xl mt-20">
            No products found for "{query}"
          </p>
        )}
      </div>
    </motion.div>
  );
}