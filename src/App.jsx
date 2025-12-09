// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Navbar from "./components/Navbar";
import StoreLocationMap from "./components/StoreLocationMap";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import WishlistProvider from "./context/WishlistContext";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import TrackOrder from "./pages/TrackOrder";
import StoreLocation from './pages/StoreLocation';
import Footer from "./components/Footer";
import MyAccount from "./components/MyAccount";
import AuthProvider from "./context/AuthContext";
import AuthCallback from "./pages/AuthCallback";
import CartProvider from "./context/CartContext";
import LocationModal from "./components/LocationModal";

import ShopByBrand from './pages/ShopByBrand';
import BestKitchenEquipments from './pages/BestKitchenEquipments';
import SuperMarket from './pages/SuperMarket';
import CategoryPage from './pages/CategoryPage';
import AllCategories from './pages/AllCategories'; // ✅ ADD THIS

import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
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
        <WishlistProvider>
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
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/store-location" element={<StoreLocation />} />
                <Route path="/auth/callback" element={<AuthCallback />} />

                {/* Category Routes */}
                <Route path="/categories" element={<AllCategories />} /> {/* ✅ ADD THIS */}
                <Route path="/shop-by-brand" element={<ShopByBrand />} />
                <Route path="/best-kitchen-equipments" element={<BestKitchenEquipments />} />
                <Route path="/supermarket" element={<SuperMarket />} />
                <Route path="/category/cooking-line" element={<CategoryPage category="cooking-line" />} />
                <Route path="/category/refrigeration-line" element={<CategoryPage category="refrigeration-line" />} />
                <Route path="/category/bakery-line" element={<CategoryPage category="bakery-line" />} />
                <Route path="/category/coffee-bar-line" element={<CategoryPage category="coffee-bar-line" />} />
                <Route path="/category/food-processing" element={<CategoryPage category="food-processing" />} />
                <Route path="/category/dry-store" element={<CategoryPage category="dry-store" />} />

                {/* Admin Routes */}
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/dashboard/products" element={<Products />} />
                <Route path="/dashboard/orders" element={<Orders />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
                <Route path="/dashboard/customers" element={<Customers />} />
                <Route path="/dashboard/settings" element={<Settings />} />
                <Route path="/dashboard/settings/general" element={<GeneralSettings />} />
                <Route path="/dashboard/settings/payments" element={<PaymentSettings />} />
                <Route path="/dashboard/settings/shipping" element={<ShippingSettings />} />
                <Route path="/dashboard/settings/users" element={<UsersSettings />} />
              </Routes>
            </Layout>
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

// Layout component with small spacing after navbar
function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/admin");
  const isAuthRoute = ["/signin", "/signup", "/forgot-password"].includes(location.pathname);

  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-4">{/* ✅ Added pt-4 for small spacing */}
        {children}
      </main>
      <Footer />
    </>
  );
}