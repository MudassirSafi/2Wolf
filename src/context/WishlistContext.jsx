// ==========================================
// 📁 FILE 2: src/context/WishlistContext.jsx - FIXED
// ==========================================
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FIXED: Changed from VITE_API_URL to VITE_API_BASE_URL
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("⚠️ No token - user not logged in");
        setLoading(false);
        return;
      }

      console.log("🔍 Fetching wishlist from:", `${API_URL}/api/wishlist`);
      
      const response = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = response.data.items || [];
      setWishlist(items);
      console.log("✅ Wishlist fetched:", items.length, "items");
    } catch (error) {
      console.error("❌ Error fetching wishlist:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please sign in to add items to wishlist");
      }

      console.log("➕ Adding product to wishlist:", productId);

      const response = await axios.post(
        `${API_URL}/api/wishlist/add`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const items = response.data.items || [];
      setWishlist(items);
      console.log("✅ Added to wishlist successfully");
      
      return { success: true, message: "Added to wishlist" };
    } catch (error) {
      console.error("❌ Error adding to wishlist:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to add to wishlist",
      };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please sign in");
      }

      console.log("➖ Removing product from wishlist:", productId);

      const response = await axios.delete(`${API_URL}/api/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = response.data.items || [];
      setWishlist(items);
      console.log("✅ Removed from wishlist successfully");
      
      return { success: true, message: "Removed from wishlist" };
    } catch (error) {
      console.error("❌ Error removing from wishlist:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to remove from wishlist",
      };
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId || item.product?._id === productId);
  };

  const value = {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
