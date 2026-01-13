// ✅ src/context/CartContext.jsx - FIXED VERSION
import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Get current user from localStorage
  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('userEmail');
      const userId = localStorage.getItem('userId');
      
      console.log('🔍 CartContext checking user:', { 
        hasToken: !!token, 
        email: userEmail, 
        id: userId 
      });
      
      if (token && (userEmail || userId)) {
        // Use email or ID as unique identifier
        setCurrentUser(userEmail || userId);
        console.log('✅ User set in CartContext:', userEmail || userId);
      } else {
        setCurrentUser(null);
        console.log('⚠️ No user in CartContext');
      }
    };

    checkUser();

    // Listen for login/logout events
    window.addEventListener('userLoggedIn', checkUser);
    window.addEventListener('userLoggedOut', checkUser);
    
    return () => {
      window.removeEventListener('userLoggedIn', checkUser);
      window.removeEventListener('userLoggedOut', checkUser);
    };
  }, []);

  // ✅ Load cart based on current user
  useEffect(() => {
    if (currentUser) {
      const cartKey = `2wolf_cart_${currentUser}`;
      const savedCart = localStorage.getItem(cartKey);
      
      console.log(`📦 Loading cart for user: ${currentUser}`);
      
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
          console.log(`✅ Cart loaded: ${parsedCart.length} items`);
        } catch (error) {
          console.error('❌ Error loading cart:', error);
          setCart([]);
        }
      } else {
        console.log('📭 No saved cart found, starting fresh');
        setCart([]);
      }
    } else {
      // ✅ No user logged in = empty cart
      console.log('👤 No user - clearing cart');
      setCart([]);
    }
  }, [currentUser]);

  // ✅ Save cart to user-specific localStorage
  useEffect(() => {
    if (currentUser) {
      const cartKey = `2wolf_cart_${currentUser}`;
      localStorage.setItem(cartKey, JSON.stringify(cart));
      console.log(`💾 Cart saved for ${currentUser}: ${cart.length} items`);
    }
    // Dispatch event for navbar update
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart, currentUser]);

  const addToCart = (product, quantity = 1) => {
    if (!currentUser) {
      console.log('⚠️ addToCart called without user login');
      alert('Please login to add items to cart');
      return;
    }

    console.log(`➕ Adding to cart:`, { 
      product: product.name, 
      quantity, 
      user: currentUser 
    });

    setCart(prevCart => {
      const productId = product._id || product.id;
      const existingItem = prevCart.find(item => 
        (item._id || item.id) === productId
      );
      
      if (existingItem) {
        console.log(`📈 Increasing quantity for: ${product.name}`);
        return prevCart.map(item => {
          const itemId = item._id || item.id;
          return itemId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      }
      
      console.log(`✨ Adding new item: ${product.name}`);
      return [...prevCart, { 
        ...product, 
        id: productId,
        _id: productId,
        quantity 
      }];
    });
  };

  const removeFromCart = (productId) => {
    console.log(`➖ Removing from cart:`, productId);
    setCart(prevCart => prevCart.filter(item => 
      (item._id || item.id) !== productId
    ));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    console.log(`🔄 Updating quantity:`, { productId, quantity });
    setCart(prevCart =>
      prevCart.map(item => {
        const itemId = item._id || item.id;
        return itemId === productId ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    console.log(`🗑️ Clearing cart for user: ${currentUser}`);
    setCart([]);
    if (currentUser) {
      const cartKey = `2wolf_cart_${currentUser}`;
      localStorage.removeItem(cartKey);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      const discount = item.discount || 0;
      const finalPrice = price * (1 - discount / 100);
      return total + (finalPrice * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}