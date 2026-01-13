// ==========================================
// 📁 FILE 1: src/components/WishlistButton.jsx - DEEP FIX WITH DEBUGGING
// ==========================================
import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const WishlistButton = ({ productId, product, className = "" }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ CRITICAL: Extract productId from multiple possible sources
  const actualProductId = productId || product?._id || product?.id;

  useEffect(() => {
    // ✅ DEBUG: Log what we received
    console.log('🔍 WishlistButton received props:', {
      productId,
      productObjectId: product?._id,
      productId2: product?.id,
      actualProductId,
      productName: product?.name
    });

    if (actualProductId) {
      checkWishlistStatus();
    } else {
      console.error('❌ WishlistButton: No valid product ID found!');
    }
  }, [actualProductId]);

  const checkWishlistStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      console.log('🔍 Checking wishlist status for product:', actualProductId);
      
      const response = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const wishlistItems = response.data.items || [];
      const inWishlist = wishlistItems.some(item => {
        const itemId = item._id || item.product?._id;
        return itemId === actualProductId;
      });
      
      setIsInWishlist(inWishlist);
      console.log(`✅ Product ${actualProductId} in wishlist:`, inWishlist);
    } catch (error) {
      console.error('❌ Error checking wishlist:', error);
    }
  };

  const updateWishlistCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const items = response.data.items || [];
      localStorage.setItem('wishlistCount', items.length.toString());
      window.dispatchEvent(new Event('wishlistUpdated'));
      console.log('✅ Wishlist count updated:', items.length);
    } catch (error) {
      console.error('❌ Error updating wishlist count:', error);
    }
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ✅ CRITICAL: Validate productId before making request
    if (!actualProductId) {
      console.error('❌ Cannot add to wishlist: No valid product ID');
      alert('Error: Product ID not found. Please refresh the page.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.log('⚠️ No token found - user not logged in');
      alert('Please login to add items to wishlist');
      return;
    }

    setLoading(true);

    try {
      console.log('\n=== WISHLIST TOGGLE DEBUG ===');
      console.log(`🔄 Toggling wishlist for product: ${actualProductId}`);
      console.log(`Current state: ${isInWishlist ? 'IN WISHLIST' : 'NOT IN WISHLIST'}`);
      
      if (isInWishlist) {
        // Remove from wishlist
        console.log('➖ Removing from wishlist...');
        console.log('🌐 DELETE URL:', `${API_URL}/api/wishlist/remove/${actualProductId}`);
        
        const response = await axios.delete(
          `${API_URL}/api/wishlist/remove/${actualProductId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        console.log('✅ Remove response:', response.data);
        setIsInWishlist(false);
      } else {
        // Add to wishlist
        console.log('➕ Adding to wishlist...');
        console.log('🌐 POST URL:', `${API_URL}/api/wishlist/add`);
        console.log('📦 Request payload:', { productId: actualProductId });
        
        // ✅ CRITICAL: Send productId in the exact format backend expects
        const response = await axios.post(
          `${API_URL}/api/wishlist/add`,
          { productId: actualProductId },
          { 
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            } 
          }
        );
        
        console.log('✅ Add response:', response.data);
        setIsInWishlist(true);
      }

      console.log('=== WISHLIST TOGGLE COMPLETE ===\n');
      await updateWishlistCount();
    } catch (error) {
      console.error('\n=== WISHLIST ERROR ===');
      console.error('❌ Error toggling wishlist:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        requestData: { productId: actualProductId }
      });
      console.log('=== WISHLIST ERROR END ===\n');
      
      // Show more specific error message
      const errorMsg = error.response?.data?.message || 'Failed to update wishlist';
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Don't render if no valid productId
  if (!actualProductId) {
    console.warn('⚠️ WishlistButton: No product ID, not rendering');
    return null;
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className={`p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-orange-500"></div>
      ) : isInWishlist ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-gray-600 text-xl hover:text-red-500 transition-colors" />
      )}
    </button>
  );
};

export default WishlistButton;