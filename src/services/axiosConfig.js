import axios from "axios";

// ✅ Create Axios instance with base URL from .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if you’re using cookies/JWT across origin
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional: token attach karna har request pe
api.interceptors.request.use((config) => {
  const userData = localStorage.getItem("muhi_user");
  if (userData) {
    const token = JSON.parse(userData).token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
