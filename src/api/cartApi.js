// ✅ src/api/cartApi.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const cartApi = {
  // Create Stripe checkout session
  createCheckoutSession: async (cartItems, token) => {
    try {
      console.log('🔑 Token being sent:', token ? token.substring(0, 30) + '...' : 'NONE');
      console.log('📦 Items:', cartItems);
      console.log('🌐 URL:', `${API_BASE_URL}/api/orders/create-checkout-session`);
      
      const response = await fetch(`${API_BASE_URL}/api/orders/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: cartItems })
      });
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const error = await response.json();
        console.log('❌ Error response:', error);
        throw new Error(error.message || 'Failed to create checkout session');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  // Create order with COD
  createOrder: async (orderData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create order');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get user's orders
  getUserOrders: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }
};