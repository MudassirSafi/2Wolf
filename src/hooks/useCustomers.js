// ==========================================
// 📁 FILE 1: src/hooks/useCustomers.js (FIXED & COMPLETE)
// ==========================================
import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
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

      const data = await response.json();
      
      // Transform data if needed
      const formattedCustomers = Array.isArray(data) ? data : (data.customers || []);
      
      setCustomers(formattedCustomers);
    } catch (err) {
      console.error('❌ Error fetching customers:', err);
      setError(err.message);
      // Set empty array on error
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { 
    customers, 
    loading, 
    error, 
    refetch: fetchCustomers 
  };
};