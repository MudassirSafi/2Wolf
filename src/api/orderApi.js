// ==========================================
// 📁 FILE: src/api/orderApi.js
// API functions for orders - Ready for backend integration
// ==========================================

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const orderApi = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get single order by ID
  getOrderById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      if (!response.ok) throw new Error('Failed to fetch order');
      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update order status');
      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get orders by customer
  getOrdersByCustomer: async (customerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/customer/${customerId}`);
      if (!response.ok) throw new Error('Failed to fetch customer orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      throw error;
    }
  }
};
