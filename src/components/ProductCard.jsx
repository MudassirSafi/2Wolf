// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product, className = "" }) {
  const { id, title, price, images = [], discount, description } = product;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`card-glass p-4 rounded-xl shadow-sm relative overflow-hidden ${className}`}
    >
      {/* Discount badge (smaller radius) */}
      {discount > 0 && (
        <div className="absolute left-3 top-3 z-30">
          <div className="w-14 h-14 rounded-full bg-yellow-400/95 text-black font-bold flex items-center justify-center text-[12px] shadow-lg border border-white/20">
            <span className="text-center">-{discount}%</span>
          </div>
        </div>
      )}

      {/* Image clickable to product page */}
      <Link to={`/product/${id}`}>
        <div className="relative rounded-lg overflow-hidden cursor-pointer">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-52 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Title / Price / Description below */}
      <div className="mt-4">
        <Link to={`/product/${id}`} className="no-underline">
          <h4 className="font-semibold text-lg text-white/95 hover:text-yellow-300 transition">
            {title}
          </h4>
        </Link>

        <div className="flex items-center mt-1">
          <span className="text-[18px] font-bold text-primary">${price}</span>
          {discount > 0 && (
            <span className="ml-2 text-sm line-through text-white/60">
              ${((parseFloat(price) * (100 + discount)) / 100).toFixed(2)}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
