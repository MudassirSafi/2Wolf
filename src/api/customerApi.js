// ==========================================
// 📁 FILE 3: src/api/customerApi.js (UPDATED)
// ==========================================
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const customerApi = {
  // Get all customers
  getAllCustomers: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/customers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch customers: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // Get single customer by ID
  getCustomerById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch customer: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (id, customerData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(customerData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update customer: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  // Search customers
  searchCustomers: async (searchTerm) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/customers/search?q=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to search customers: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching customers:', error);
      throw error;
    }
  }
};