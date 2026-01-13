// ✅ src/components/ProductCard.jsx - COMPLETE WITH ANIMATED BADGES
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Package, Truck, Star, Award, Zap, Clock, Fire } from "lucide-react";

// Badge icon mapper
const getBadgeIcon = (text) => {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('rank') || lowerText.includes('#')) return TrendingUp;
  if (lowerText.includes('delivery') || lowerText.includes('shipping')) return Truck;
  if (lowerText.includes('selling') || lowerText.includes('fast')) return Zap;
  if (lowerText.includes('rated') || lowerText.includes('star')) return Star;
  if (lowerText.includes('choice') || lowerText.includes('best')) return Award;
  if (lowerText.includes('left') || lowerText.includes('stock')) return Package;
  if (lowerText.includes('sold') || lowerText.includes('bought')) return Clock;
  return Package;
};

export default function ProductCard({ product, className = "" }) {
  const { 
    _id, 
    name, 
    images = [], 
    discount = 0, 
    price, 
    stock,
    freeDelivery,
    sellingFast,
    lowestPrice,
    bestSeller,
    showRecentlySold,
    recentlySoldCount,
    badges = [] 
  } = product;

  console.log('🎴 ProductCard data:', {
    name,
    stock,
    freeDelivery,
    sellingFast,
    bestSeller,
    showRecentlySold,
    recentlySoldCount
  });

  // ✅ Safely handle price conversion
  const productPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
  const discountedPrice = discount > 0 
    ? (productPrice * (1 - discount / 100)).toFixed(2) 
    : productPrice.toFixed(2);

  // ✅ Generate dynamic badges from product data
  const dynamicBadges = [];
  
  // Add best seller FIRST (higher priority)
  if (bestSeller) {
    dynamicBadges.push({
      text: '#1 Best Seller',
      color: '#D97706', // amber
      icon: Award
    });
  }
  
  // Add stock urgency
  if (stock !== undefined && stock !== null && stock > 0 && stock < 10) {
    dynamicBadges.push({
      text: `Only ${stock} left in stock`,
      color: '#DC2626', // red
      icon: Package
    });
  }
  
  // Add recently sold
  if (showRecentlySold && recentlySoldCount && recentlySoldCount > 0) {
    dynamicBadges.push({
      text: `${recentlySoldCount}+ sold recently`,
      color: '#F59E0B', // orange
      icon: Clock
    });
  }
  
  // Add selling fast
  if (sellingFast) {
    dynamicBadges.push({
      text: 'Selling Fast!',
      color: '#EF4444', // red
      icon: Fire
    });
  }
  
  // Add free delivery
  if (freeDelivery) {
    dynamicBadges.push({
      text: 'FREE Delivery',
      color: '#059669', // green
      icon: Truck
    });
  }
  
  // Add lowest price
  if (lowestPrice) {
    dynamicBadges.push({
      text: 'Lowest Price',
      color: '#059669', // green
      icon: TrendingUp
    });
  }
  
  // Combine with custom badges (if any exist)
  const allBadges = [...(Array.isArray(badges) ? badges : []), ...dynamicBadges];
  
  console.log('🎯 Generated badges:', allBadges);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className={`relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute left-3 top-3 z-20">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold flex items-center justify-center text-xs md:text-sm shadow-lg border-2 border-white/40">
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
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg md:text-xl font-bold text-[#B8860B]">
              AED {discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                AED {productPrice.toFixed(2)}
              </span>
            )}
          </div>
        )}

        {/* ✅ Animated Sliding Badges - ALWAYS SHOW CONTAINER */}
        {allBadges.length > 0 ? (
          <div className="relative h-7 overflow-hidden bg-gradient-to-r from-amber-50 to-amber-50/20 rounded-lg px-2 border border-amber-100">
            <motion.div
              className="flex flex-col"
              animate={{ 
                y: allBadges.length > 1 ? [0, -(allBadges.length * 28)] : 0 
              }}
              transition={{
                duration: allBadges.length * 3.5,
                repeat: allBadges.length > 1 ? Infinity : 0,
                ease: "linear",
                repeatDelay: 0.5
              }}
            >
              {/* Double the badges array for seamless loop */}
              {(allBadges.length > 1 ? [...allBadges, ...allBadges] : allBadges).map((badge, idx) => {
                const Icon = badge.icon || getBadgeIcon(badge.text);
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 h-7 whitespace-nowrap"
                  >
                    <Icon 
                      className="w-3.5 h-3.5 flex-shrink-0" 
                      style={{ color: badge.color || '#B8860B' }} 
                    />
                    <span 
                      className="text-xs font-semibold"
                      style={{ color: badge.color || '#B8860B' }}
                    >
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        ) : (
          <div className="h-7 flex items-center text-xs text-gray-400 italic">
            No badges available
          </div>
        )}
      </div>
    </motion.article>
  );
}