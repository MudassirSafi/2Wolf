import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Provide Context to all children
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔹 Load user from localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // 'admin' or 'user'
    if (token) setUser({ token, role });
  }, []);

  // 🔹 Login function (store token + role)
  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
  };

  // 🔹 Logout function (clear everything)
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
