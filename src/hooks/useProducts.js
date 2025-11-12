// ==========================================
// 📁 FILE: src/hooks/useProducts.js
// This hook manages product data and will be ready for backend integration
// ==========================================
import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with mock data
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchProducts();
    setProducts([
      { id: 1, name: 'Premium Leather Jacket', sku: 'PLJ-001', price: 299.99, stock: 45, status: 'In Stock', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop', category: 'Clothing' },
      { id: 2, name: 'Wireless Headphones', sku: 'WH-202', price: 149.99, stock: 8, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop', category: 'Electronics' },
      { id: 3, name: 'Smart Watch Pro', sku: 'SWP-303', price: 399.99, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop', category: 'Electronics' },
      { id: 4, name: 'Running Shoes', sku: 'RS-404', price: 89.99, stock: 120, status: 'In Stock', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop', category: 'Footwear' }
    ]);
  }, []);

  // TODO: Replace with actual API call
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // const response = await fetch('/api/products');
      // const data = await response.json();
      // setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new product
  const addProduct = async (product) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(product)
      // });
      // const newProduct = await response.json();
      
      const newProduct = { ...product, id: Date.now() };
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update product
  const updateProduct = async (id, updatedProduct) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/products/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedProduct)
      // });
      // const data = await response.json();
      
      setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/products/${id}`, { method: 'DELETE' });
      
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { products, loading, error, addProduct, updateProduct, deleteProduct, refetch: fetchProducts };
};