// src/App.jsx
import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyAccount from "./components/MyAccount";
import AuthProvider from "./context/AuthContext";
import AuthCallback from "./pages/AuthCallback";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Settings from "./pages/admin/Settings";
import GeneralSettings from "./pages/admin/GeneralSettings";
import PaymentSettings from "./pages/admin/PaymentSettings";
import ShippingSettings from "./pages/admin/ShippingSettings";
import UsersSettings from "./pages/admin/UsersSettings";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/dashboard');
  
  // Check if current route is an auth route (signin/signup)
  const isAuthRoute = ["/signin", "/signup"].includes(location.pathname);

  // Function to close auth modals
  const handleCloseAuthModal = () => {
    navigate('/');
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-poppins">
        {/* ✅ Navbar - Hide on admin routes and auth pages */}
        {!isAdminRoute && !isAuthRoute && <Navbar />}

        

        {/* ✅ Main Content */}
        <main className={`relative z-10`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn onClose={handleCloseAuthModal} />} />
            <Route path="/signup" element={<SignUp onClose={handleCloseAuthModal} />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/product/:id" element={<ProductPage />} />
            
            {/* OAuth Callback Route */}
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Admin Routes */}
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/settings/general" element={<GeneralSettings />} />
            <Route path="/dashboard/settings/payments" element={<PaymentSettings />} />
            <Route path="/dashboard/settings/shipping" element={<ShippingSettings />} />
            <Route path="/dashboard/settings/users" element={<UsersSettings />} />
          </Routes>
        </main>

        {/* Footer - Hide on admin routes and auth pages */}
        {!isAdminRoute && !isAuthRoute && <Footer />}
      </div>
    </AuthProvider>
  );
}