// ==========================================
// 📁 FILE 2: src/hooks/useOrders.js (FIXED)
// ==========================================
import { useState, useEffect } from 'react'; // ✅ FIXED: Added imports

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      console.log('✅ Orders fetched:', data);
      
      setOrders(data.orders || []);
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const data = await response.json();
      
      setOrders(orders.map(o => 
        o._id === id ? { ...o, status } : o
      ));

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { 
    orders, 
    loading, 
    error, 
    updateOrderStatus, 
    refetch: fetchOrders 
  };
};