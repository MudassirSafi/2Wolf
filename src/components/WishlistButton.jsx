// src/components/WishlistButton.jsx
import React from 'react';
import { useWishlist } from '../context/WishlistContext';

const WishlistButton = ({ product, className = '' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleWishlist(product);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-all ${
        inWishlist 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-white hover:bg-gray-100'
      } ${className}`}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg 
        className={`w-5 h-5 ${inWishlist ? 'text-white' : 'text-gray-700'}`}
        fill={inWishlist ? 'currentColor' : 'none'}
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
};

export default WishlistButton;