// ==========================================
// 📁 FILE: src/hooks/useOrders.js
// This hook manages order data and will be ready for backend integration
// ==========================================
import { useState, useEffect } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with mock data
  useEffect(() => {
    // TODO: Replace with actual API call
    setOrders([
      { id: 'ORD-1001', customer: 'John Doe', email: 'john@example.com', total: 449.98, status: 'Processing', date: '2025-11-08', items: 2 },
      { id: 'ORD-1002', customer: 'Jane Smith', email: 'jane@example.com', total: 299.99, status: 'Shipped', date: '2025-11-07', items: 1 },
      { id: 'ORD-1003', customer: 'Mike Johnson', email: 'mike@example.com', total: 89.99, status: 'Delivered', date: '2025-11-05', items: 1 },
      { id: 'ORD-1004', customer: 'Sarah Wilson', email: 'sarah@example.com', total: 749.97, status: 'Pending', date: '2025-11-09', items: 3 }
    ]);
  }, []);

  // TODO: Replace with actual API call
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // const response = await fetch('/api/orders');
      // const data = await response.json();
      // setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (id, status) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/orders/${id}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status })
      // });
      
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { orders, loading, error, updateOrderStatus, refetch: fetchOrders };
};


