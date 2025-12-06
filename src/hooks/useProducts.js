// ==========================================
// 📁 FILE 1: src/hooks/useProducts.js (FIXED)
// ==========================================
import { useState, useEffect } from 'react'; // ✅ FIXED: Added imports

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      console.log('✅ Products fetched:', data);
      
      setProducts(data.products || []);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      setProducts([...products, data.product]);
      return data.product;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      setProducts(products.map(p => 
        p._id === id ? data.product : p
      ));
      
      return data.product;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { 
    products, 
    loading, 
    error, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    refetch: fetchProducts 
  };
};