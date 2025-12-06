// src/context/WishlistContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data);
        setWishlistCount(data.length);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToWishlist = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add items to wishlist');
        return false;
      }

      const response = await fetch(`http://localhost:5000/api/wishlist/${product._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setWishlistItems(data.wishlist);
        setWishlistCount(data.wishlist.length);
        return true;
      } else {
        alert(data.message);
        return false;
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist');
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`http://localhost:5000/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data.wishlist);
        setWishlistCount(data.wishlist.length);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  const toggleWishlist = async (product) => {
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product);
    }
  };

  const clearWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/wishlist', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setWishlistItems([]);
        setWishlistCount(0);
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
        fetchWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;