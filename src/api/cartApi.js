// ✅ src/api/cartApi.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create Stripe checkout session

export const cartApi = {
  
  createCheckoutSession: async (cartItems, token, shippingInfo) => {
    try {
      console.log('=== CART API DEBUG START ===');
      console.log('🔑 Token:', token ? token.substring(0, 30) + '...' : 'NONE');
      console.log('📦 Items:', cartItems);
      console.log('📍 Shipping:', shippingInfo);
      
      const response = await fetch(`${API_BASE_URL}/api/orders/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          items: cartItems,
          shippingInfo: shippingInfo 
        })
      });
      
      console.log('📡 Response status:', response.status);
      
      const responseText = await response.text();
      console.log('📥 Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Failed to parse response:', parseError);
        throw new Error(`Server returned invalid JSON. Status: ${response.status}`);
      }
      
      if (!response.ok) {
        console.log('❌ Error response:', data);
        throw new Error(data.message || `HTTP ${response.status}`);
      }
      
      console.log('✅ Success response:', data);
      console.log('=== CART API DEBUG END ===\n');
      
      return data;
    } catch (error) {
      console.error('=== CART API ERROR ===');
      console.error('Error:', error);
      console.log('=== CART API DEBUG END ===\n');
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