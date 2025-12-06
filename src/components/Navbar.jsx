// ==========================================
// 📁 FILE 1: src/components/Navbar.jsx (UPDATED)
// ==========================================
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import Logo from "../assets/2WolfLogo.png";
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const { getCartCount } = useContext(CartContext);
  
  const navigate = useNavigate();

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(getCartCount());

  const accountRef = useRef(null);

  const PLUM = "#6E2A6E";
  const HIGHLIGHT = "#6D28D9";

  // Wishlist
  const readWishlist = () => {
    try {
      setWishlistCount(parseInt(localStorage.getItem("wishlistCount") || "0", 10));
    } catch {
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    readWishlist();
    const onStorage = (e) => {
      if (e.key === "wishlistCount") readWishlist();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Cart Count
  useEffect(() => {
    const updateCount = () => setCartCount(getCartCount());
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, [getCartCount]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target))
        setIsAccountOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav className="top-0 left-0 w-full z-50 shadow-md text-white">
        {/* FIRST SECTION - Black Background */}
        <div
          className="w-full px-4 sm:px-6 md:px-10 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          style={{
            background: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)"
          }}
        >
          {/* LOGO + MOBILE ICONS */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 hover:opacity-90 transition"
            >
              <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#EAB308] select-none font-[Poppins] drop-shadow-[0_1px_1px_rgba(234,179,8,0.4)]">
                2Wolf
              </span>
              <img src={Logo} alt="2Wolf Logo" className="w-12 h-12 object-contain" />
            </Link>

            {/* MOBILE ICONS */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-[#EAB308] text-lg hover:scale-105 transition-transform"
              >
                <FaSearch />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => navigate("/wishlist")}
                className="relative hover:scale-105 transition-transform"
              >
                <FaHeart className="text-[#EAB308] text-lg" />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 rounded-full px-[5px] text-[10px] font-bold"
                    style={{ background: HIGHLIGHT, color: "#fff" }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="relative hover:scale-105 transition-transform"
              >
                <FaShoppingCart className="text-[#EAB308] text-lg" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 rounded-full px-[5px] text-[10px] font-bold"
                    style={{ background: HIGHLIGHT, color: "#fff" }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User */}
              <div className="relative" ref={accountRef}>
                {!user ? (
                  <Link to="/signin" className="text-[#EAB308] text-lg hover:scale-105 transition-transform">
                    <FaUser />
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setIsAccountOpen((v) => !v)}
                      className="text-[#EAB308] text-lg hover:scale-105 transition-transform"
                    >
                      <FaUser />
                    </button>

                    <AnimatePresence>
                      {isAccountOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute right-0 top-full mt-2 w-40 bg-[#121212] border border-white/10 rounded-lg shadow-xl z-[9999]"
                        >
                          {user.role === "admin" ? (
                            <Link to="/admin/dashboard" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10 rounded-t-lg">
                              Dashboard
                            </Link>
                          ) : (
                            <Link to="/my-account" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10 rounded-t-lg">
                              My Account
                            </Link>
                          )}

                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-[#EAB308] hover:bg-[#EAB308]/10 rounded-b-lg"
                          >
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full max-w-lg py-2 pl-4 pr-4 rounded-full text-sm sm:text-base text-white bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#EAB308] transition-all duration-300 text-left flex items-center gap-2"
            >
              <FaSearch className="text-gray-400" />
              <span className="text-gray-400">Search for products...</span>
            </button>
          </div>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-4">
            {/* Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              className="relative hover:scale-105 transition-transform"
            >
              <FaHeart className="text-[#EAB308] text-xl" />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 rounded-full px-[5px] text-[11px] font-bold"
                  style={{ background: HIGHLIGHT, color: "#fff" }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative hover:scale-105 transition-transform"
            >
              <FaShoppingCart className="text-[#EAB308] text-xl" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 rounded-full px-[5px] text-[11px] font-bold"
                  style={{ background: HIGHLIGHT, color: "#fff" }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account */}
            <div className="relative" ref={accountRef}>
              {!user ? (
                <Link to="/signin" className="text-[#EAB308] text-xl hover:scale-105 transition-transform">
                  <FaUser />
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setIsAccountOpen((v) => !v)}
                    className="text-[#EAB308] text-xl hover:scale-105 transition-transform"
                  >
                    <FaUser />
                  </button>

                  <AnimatePresence>
                    {isAccountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-0 top-full mt-2 w-40 bg-[#121212] border border-white/10 rounded-lg shadow-xl z-[9999]"
                      >
                        {user.role === "admin" ? (
                          <Link to="/admin/dashboard" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10 rounded-t-lg">
                            Dashboard
                          </Link>
                        ) : (
                          <Link to="/my-account" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10 rounded-t-lg">
                            My Account
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-[#EAB308] hover:bg-[#EAB308]/10 rounded-b-lg"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SECOND SECTION - Plum Background */}
        <div
          className="w-full px-4 sm:px-6 md:px-10 py-2 flex items-center justify-between"
          style={{ background: PLUM }}
        >
          {/* MOBILE - Hamburger Menu */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white text-xl md:hidden hover:opacity-90"
          >
            <FaBars />
          </button>

          {/* DESKTOP - Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white font-semibold hover:opacity-90">
              Home
            </Link>
            <Link to="/best-kitchen-equipments" className="text-white font-semibold hover:opacity-90">
              Kitchen Equipments
            </Link>
            <Link to="/shop-by-brand" className="text-white font-semibold hover:opacity-90">
              Shop by Brand
            </Link>
            <Link to="/products" className="text-white font-semibold hover:opacity-90">
              Shop
            </Link>
            <Link to="/supermarket" className="text-white font-semibold hover:opacity-90">
              Super Market
            </Link>
          </div>

          {/* TRACK ORDER - Always visible */}
          <Link to="/track-order" className="text-white font-semibold hover:opacity-90">
            Track Order
          </Link>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 h-full w-80 bg-[#0A0A0A] z-[101] overflow-y-auto md:hidden shadow-2xl"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-2xl font-bold text-[#EAB308]">Menu</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-white text-2xl hover:text-[#EAB308]"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Menu Section */}
              <div className="p-6 border-b border-white/10">
                <h3 className="text-sm font-bold text-[#EAB308] mb-4 uppercase tracking-wider">Menu</h3>
                <div className="space-y-3">
                  <Link
                    to="/"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Home
                  </Link>
                  <Link
                    to="/best-kitchen-equipments"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Kitchen Equipments
                  </Link>
                  <Link
                    to="/shop-by-brand"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Shop by Brand
                  </Link>
                  <Link
                    to="/products"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Shop
                  </Link>
                  <Link
                    to="/supermarket"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Super Market
                  </Link>
                </div>
              </div>

              {/* Categories Section */}
              <div className="p-6">
                <h3 className="text-sm font-bold text-[#EAB308] mb-4 uppercase tracking-wider">Categories</h3>
                <div className="space-y-3">
                  <Link
                    to="/category/cooking-line"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Cooking Line
                  </Link>
                  <Link
                    to="/category/refrigeration-line"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Refrigeration Line
                  </Link>
                  <Link
                    to="/category/bakery-line"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Bakery Line
                  </Link>
                  <Link
                    to="/category/coffee-bar-line"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Coffee and Bar Line
                  </Link>
                  <Link
                    to="/category/food-processing"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Food Processing
                  </Link>
                  <Link
                    to="/category/dry-store"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-white hover:text-[#EAB308] transition py-2"
                  >
                    Dry Store
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}