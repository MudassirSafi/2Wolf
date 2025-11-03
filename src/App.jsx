// ✅ src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MyAccount from "./components/MyAccount";
import AuthProvider from "./context/AuthContext"; // ✅ default import

export default function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-poppins relative">
        {/* ✅ Fixed Navbar always visible */}
        <Navbar />

        {/* 🧊 Blur background for SignIn / SignUp */}
        {["/signin", "/signup"].includes(location.pathname) && (
          <div className="absolute inset-0 backdrop-blur-md bg-black/40 z-40"></div>
        )}

        {/* ✅ Add padding-top to avoid content going under Navbar */}
        <main className="relative z-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}
