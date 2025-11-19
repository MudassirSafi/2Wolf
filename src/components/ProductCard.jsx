// ✅ src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product, className = "" }) {
  const { _id, name, images = [], discount = 0, price } = product;

  // ✅ Safely handle price conversion
  const productPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
  const discountedPrice = discount > 0 
    ? (productPrice * (1 - discount / 100)).toFixed(2) 
    : productPrice.toFixed(2);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className={`relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute left-3 top-3 z-20">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-yellow-400/95 text-black font-bold flex items-center justify-center text-xs md:text-sm shadow-lg border-2 border-white/40">
            -{discount}%
          </div>
        </div>
      )}

      {/* Product Image */}
      <Link to={`/product/${_id}`}>
        <div className="relative overflow-hidden aspect-square">
          <img
            src={images[0] || 'https://via.placeholder.com/400'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${_id}`}>
          <h3 className="font-semibold text-sm md:text-base text-gray-800 hover:text-[#B8860B] transition-colors line-clamp-2 mb-2">
            {name}
          </h3>
        </Link>
        
        {productPrice > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-[#B8860B]">
              ${discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${productPrice.toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}