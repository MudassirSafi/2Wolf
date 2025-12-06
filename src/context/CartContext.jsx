import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the CartContext
export const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('2wolf_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        setCart([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('2wolf_cart', JSON.stringify(cart));
    // Dispatch event for cart icon update
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);

  // Add item to cart - supports both _id and id
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const productId = product._id || product.id;
      const existingItem = prevCart.find(item => 
        (item._id || item.id) === productId
      );
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(item => {
          const itemId = item._id || item.id;
          return itemId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item;
        });
      }
      
      // Add new item with normalized structure
      return [...prevCart, { 
        ...product, 
        id: productId,
        _id: productId,
        quantity 
      }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => 
      (item._id || item.id) !== productId
    ));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item => {
        const itemId = item._id || item.id;
        return itemId === productId ? { ...item, quantity } : item;
      })
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      const discount = item.discount || 0;
      const finalPrice = price * (1 - discount / 100);
      return total + (finalPrice * item.quantity);
    }, 0);
  };

  // Get cart item count
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