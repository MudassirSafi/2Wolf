// ==========================================
// 📁 FILE 1: src/context/AuthContext.jsx - FIXED
// ==========================================
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const name = localStorage.getItem("userName");
        const email = localStorage.getItem("userEmail");
        const userId = localStorage.getItem("userId");

        if (token) {
          console.log("✅ User loaded from localStorage:", { name, email, role });
          setUser({ 
            token, 
            role, 
            name: name || "User", 
            email: email || "", 
            id: userId || "" 
          });
          window.dispatchEvent(new Event('userLoggedIn'));
        } else {
          console.log("⚠️ No token found in localStorage");
        }
      } catch (error) {
        console.error("❌ Error loading user from storage:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // ✅ FIXED: Login function now accepts userData
  const login = (token, role, userData = {}) => {
    console.log("🔐 Login called with:", { token: token?.substring(0, 20) + "...", role, userData });
    
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    
    // ✅ Store user details
    if (userData.name) localStorage.setItem("userName", userData.name);
    if (userData.email) localStorage.setItem("userEmail", userData.email);
    if (userData.id || userData._id) localStorage.setItem("userId", userData.id || userData._id);

    setUser({ 
      token, 
      role, 
      name: userData.name || "User",
      email: userData.email || "",
      id: userData.id || userData._id || ""
    });

    console.log("✅ User logged in successfully:", { name: userData.name, role });
    window.dispatchEvent(new Event('userLoggedIn'));
  };

  const logout = () => {
    console.log("🚪 Logging out user...");
    localStorage.clear();
    setUser(null);
    console.log("✅ User logged out successfully");
    window.dispatchEvent(new Event('userLoggedOut'));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}