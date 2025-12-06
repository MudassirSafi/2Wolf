// ==========================================
// 📁 FILE 2: src/api/productApi.js - FIXED
// ==========================================
const API_BASE_URL2 = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const productApi = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL2}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL2}/api/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create new product (Admin)
  createProduct: async (productData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL2}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (!response.ok) throw new Error('Failed to create product');
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product (Admin)
  updateProduct: async (id, productData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL2}/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product (Admin)
  deleteProduct: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL2}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};