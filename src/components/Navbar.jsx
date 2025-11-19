// ✅ src/components/Navbar.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import Logo from "../assets/2WolfLogo.png";
import { FaHeart, FaShoppingCart, FaUser, FaClock, FaGem, FaTag } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const { getCartCount } = useContext(CartContext); // ⭐ NEW (Real cart count)

  const navigate = useNavigate();

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  // ⭐ REPLACED: cartCount comes from CartContext
  const [cartCount, setCartCount] = useState(getCartCount());

  const [searchValue, setSearchValue] = useState("");

  const accountRef = useRef(null);
  const categoriesRef = useRef(null);

  const PLUM = "#6E2A6E";
  const HIGHLIGHT = "#6D28D9";

  // ⭐ Wishlist stays localStorage — unchanged
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

  // ⭐ NEW: Real Cart Count Listener
  useEffect(() => {
    const updateCount = () => setCartCount(getCartCount());
    updateCount();

    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, [getCartCount]);

  // ⭐ Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target))
        setIsAccountOpen(false);
      if (categoriesRef.current && !categoriesRef.current.contains(e.target))
        setIsCategoriesOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    localStorage.clear();
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <nav className=" top-0 left-0 w-full z-50 shadow-md text-white">

      {/* 🖤 FIRST SECTION */}
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

            {/* ⭐ CART (Real Count) */}
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
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute right-0 mt-2 w-40 bg-[#121212] border border-white/10 rounded-lg shadow-lg overflow-hidden z-[9999]"
                      >
                        {user.role === "admin" ? (
                          <Link to="/dashboard" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10">
                            Dashboard
                          </Link>
                        ) : (
                          <Link to="/my-account" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10">
                            My Account
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-[#EAB308] hover:bg-[#EAB308]/10"
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
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="w-full max-w-lg py-2 pl-4 pr-4 rounded-full text-sm sm:text-base text-white bg-[#1a1a1a] border border-[#2a2a2a] focus:outline-none focus:ring-1 focus:ring-[#EAB308] placeholder-gray-400 transition-all duration-300"
          />
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

          {/* ⭐ CART (Real Count) */}
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
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-2 w-44 bg-[#121212] border border-white/10 rounded-lg shadow-lg overflow-hidden z-[9999]"
                    >
                      {user.role === "admin" ? (
                        <Link to="/dashboard" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10">
                          Dashboard
                        </Link>
                      ) : (
                        <Link to="/my-account" onClick={() => setIsAccountOpen(false)} className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10">
                          My Account
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-[#EAB308] hover:bg-[#EAB308]/10"
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

        {/* MOBILE SEARCH */}
        <div className="block md:hidden w-full">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full py-2 pl-4 pr-4 rounded-full text-sm text-white bg-[#1a1a1a] border border-[#2a2a2a] focus:outline-none focus:ring-1 focus:ring-[#EAB308] placeholder-gray-400 transition-all duration-300"
          />
        </div>
      </div>

      {/* SECOND SECTION (PLUM) */}
      <div
        className="w-full px-4 sm:px-6 md:px-10 py-2 flex items-center justify-between"
        style={{ background: PLUM }}
      >
        {/* CATEGORY DROPDOWN */}
        <div className="relative" ref={categoriesRef}>
          <button 
            onClick={() => setIsCategoriesOpen((v) => !v)}
            className="text-white font-semibold hover:opacity-90 flex items-center gap-1"
          >
            Categories ▼
          </button>
          
          <AnimatePresence>
            {isCategoriesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-300/30 rounded-xl shadow-2xl overflow-hidden z-[9999]"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">Browse Categories</h3>
                  <ul className="space-y-3 text-[#0A0A0A]/90">
                    <li className="flex items-center gap-3 hover:text-[#6E2A6E] transition cursor-pointer font-medium">
                      <FaClock className="text-[#6E2A6E]" /> Watches
                    </li>
                    <li className="flex items-center gap-3 hover:text-[#6E2A6E] transition cursor-pointer font-medium">
                      <FaGem className="text-[#6E2A6E]" /> Accessories
                    </li>
                    <li className="flex items-center gap-3 hover:text-[#6E2A6E] transition cursor-pointer font-medium">
                      <FaTag className="text-[#6E2A6E]" /> Offers
                    </li>
                    <li className="flex items-center gap-3 hover:text-[#6E2A6E] transition cursor-pointer font-medium">
                      <svg className="w-5 h-5 text-[#6E2A6E]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                      New Arrivals
                    </li>
                  </ul>
                  <Link
                    to="/shop"
                    onClick={() => setIsCategoriesOpen(false)}
                    className="block text-center bg-[#6E2A6E] text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-[#5A215A] transition mt-6"
                  >
                    Explore All
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to="/shop" className="text-white font-semibold hover:opacity-90">
          Shop
        </Link>
        <Link to="/track-order" className="text-white font-semibold hover:opacity-90">
          Track Order
        </Link>
      </div>
    </nav>
  );
}
