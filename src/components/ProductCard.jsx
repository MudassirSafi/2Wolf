// ✅ src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product, className = "" }) {
  const { id, title, images = [], discount } = product;

  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      className={`relative overflow-hidden rounded-xl ${className}`}
    >
      {/* ✅ Discount badge (smaller, cleaner) */}
      {discount > 0 && (
        <div className="absolute left-2 top-2 z-20">
          <div className="w-10 h-10 rounded-full bg-yellow-400/95 text-black font-bold flex items-center justify-center text-[10px] shadow-md border border-white/20">
            -{discount}%
          </div>
        </div>
      )}

      {/* ✅ Clickable Image */}
      <Link to={`/product/${id}`}>
        <img
          src={images[0]}
          alt={title}
          className="w-full h-60 object-cover rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105"
        />
      </Link>
    </motion.article>
  );
}
