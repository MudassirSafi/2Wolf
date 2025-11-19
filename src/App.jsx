// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Footer from "./components/Footer";
import MyAccount from "./components/MyAccount";
import AuthProvider from "./context/AuthContext";
import AuthCallback from "./pages/AuthCallback";
import CartProvider from "./context/CartContext";

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
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-poppins">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
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
          </Layout>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

// This small component fixes the blank screen + shows/hides Navbar & Footer
function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/dashboard");
  const isAuthRoute = ["/signin", "/signup", "/forgot-password"].includes(location.pathname);

  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}