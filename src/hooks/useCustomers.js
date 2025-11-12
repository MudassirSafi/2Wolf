// ==========================================
// 📁 FILE: src/hooks/useCustomers.js
// This hook manages customer data and will be ready for backend integration
// ==========================================
import { useState, useEffect } from 'react';

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with mock data
  useEffect(() => {
    // TODO: Replace with actual API call
    setCustomers([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1-555-0101', orders: 15, spent: 2499.85, joined: '2024-03-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-555-0102', orders: 8, spent: 1299.92, joined: '2024-06-20' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1-555-0103', orders: 3, spent: 449.97, joined: '2025-01-10' },
      { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1-555-0104', orders: 22, spent: 4899.78, joined: '2023-11-05' }
    ]);
  }, []);

  // TODO: Replace with actual API call
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // const response = await fetch('/api/customers');
      // const data = await response.json();
      // setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { customers, loading, error, refetch: fetchCustomers };
};

