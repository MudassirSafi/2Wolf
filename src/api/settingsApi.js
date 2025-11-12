// ==========================================
// 📁 FILE: src/api/settingsApi.js
// API functions for settings - Ready for backend integration
// ==========================================

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const settingsApi = {
  // Get all settings
  getSettings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`);
      if (!response.ok) throw new Error('Failed to fetch settings');
      return await response.json();
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },

  // Update settings
  updateSettings: async (settingsData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settingsData)
      });
      if (!response.ok) throw new Error('Failed to update settings');
      return await response.json();
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
};