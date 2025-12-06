// ==========================================
// 📁 FILE 1: src/api/orderApi.js - FIXED
// ==========================================
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const orderApi = {
  // Get all orders (Admin only)
  getAllOrders: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get single order by ID
  getOrderById: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch order');
      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Get user's orders
  getMyOrders: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch my orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching my orders:', error);
      throw error;
    }
  },

  // Create order after successful payment
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
      if (!response.ok) throw new Error('Failed to create order');
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Update order status (Admin)
  updateOrderStatus: async (id, status, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update order status');
      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};
