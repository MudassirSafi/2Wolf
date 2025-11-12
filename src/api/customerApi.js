// ==========================================
// 📁 FILE: src/api/customerApi.js
// API functions for customers - Ready for backend integration
// ==========================================

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const customerApi = {
  // Get all customers
  getAllCustomers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      return await response.json();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // Get single customer by ID
  getCustomerById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`);
      if (!response.ok) throw new Error('Failed to fetch customer');
      return await response.json();
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (id, customerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(customerData)
      });
      if (!response.ok) throw new Error('Failed to update customer');
      return await response.json();
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }
};

