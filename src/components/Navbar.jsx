// ✅ src/components/Navbar.jsx - Enhanced with Orange Theme
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import Logo from "../assets/2WolfLogo.png";
import { 
  FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, 
  FaMapMarkerAlt, FaChevronDown, FaBoxOpen, FaTag, FaMobileAlt,
  FaLaptop, FaHeartbeat, FaTshirt, FaSpa, FaGamepad, FaShoppingBasket,
  FaUtensils, FaBook, FaFire, FaStar, FaGift, FaBaby, FaCar, FaDog,
  FaTools, FaBriefcase, FaSeedling, FaCouch, FaPalette, FaSuitcase,
  FaMusic, FaTv, FaRunning, FaLaptopCode, FaHome
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LocationModal from "./LocationModal";
import SearchDropdown from "./SearchDropdown";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const { getCartCount } = useContext(CartContext);
  
  const navigate = useNavigate();

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(getCartCount());

  const accountRef = useRef(null);
  const categoriesRef = useRef(null);
  const searchRef = useRef(null);

  // Complete category list with all categories
  const allCategories = [
    { name: "All Categories", icon: FaBoxOpen, path: "/shop", category: "" },
    { name: "Electronics", icon: FaLaptop, path: "/shop?category=Electronics", category: "Electronics" },
    { name: "Fashion", icon: FaTshirt, path: "/shop?category=Fashion", category: "Fashion" },
    { name: "Home & Kitchen", icon: FaCouch, path: "/shop?category=Home & Kitchen", category: "Home & Kitchen" },
    { name: "Beauty & Personal Care", icon: FaSpa, path: "/shop?category=Beauty & Personal Care", category: "Beauty & Personal Care" },
    { name: "Health & Household", icon: FaHeartbeat, path: "/shop?category=Health & Household", category: "Health & Household" },
    { name: "Baby Products", icon: FaBaby, path: "/shop?category=Baby Products", category: "Baby Products" },
    { name: "Toys & Games", icon: FaGamepad, path: "/shop?category=Toys & Games", category: "Toys & Games" },
    { name: "Books & Stationery", icon: FaBook, path: "/shop?category=Books & Stationery", category: "Books & Stationery" },
    { name: "Video Games", icon: FaGamepad, path: "/shop?category=Video Games", category: "Video Games" },
    { name: "Music, Movies & TV", icon: FaMusic, path: "/shop?category=Music, Movies & TV", category: "Music, Movies & TV" },
    { name: "Automotive", icon: FaCar, path: "/shop?category=Automotive", category: "Automotive" },
    { name: "Sports & Outdoors", icon: FaRunning, path: "/shop?category=Sports & Outdoors", category: "Sports & Outdoors" },
    { name: "Pet Supplies", icon: FaDog, path: "/shop?category=Pet Supplies", category: "Pet Supplies" },
    { name: "Tools & Industrial", icon: FaTools, path: "/shop?category=Tools & Industrial", category: "Tools & Industrial" },
    { name: "Office Products", icon: FaBriefcase, path: "/shop?category=Office Products", category: "Office Products" },
    { name: "Garden & Outdoor", icon: FaSeedling, path: "/shop?category=Garden & Outdoor", category: "Garden & Outdoor" },
    { name: "Software & Digital", icon: FaLaptopCode, path: "/shop?category=Software & Digital", category: "Software & Digital" },
    { name: "Luggage & Travel", icon: FaSuitcase, path: "/shop?category=Luggage & Travel", category: "Luggage & Travel" },
    { name: "Gift Cards", icon: FaGift, path: "/shop?category=Gift Cards", category: "Gift Cards" },
    { name: "Grocery & Food", icon: FaShoppingBasket, path: "/shop?category=Grocery & Food", category: "Grocery & Food" }
  ];

  // Load user location
  useEffect(() => {
    const loadLocation = () => {
      const saved = localStorage.getItem('userLocation');
      if (saved) {
        setUserLocation(JSON.parse(saved));
      }
    };
    loadLocation();
    window.addEventListener('locationUpdated', loadLocation);
    return () => window.removeEventListener('locationUpdated', loadLocation);
  }, []);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target))
        setIsAccountOpen(false);
      if (categoriesRef.current && !categoriesRef.current.contains(e.target))
        setIsCategoriesOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setIsSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    localStorage.clear();
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (category) => {
    if (category) {
      navigate(`/shop?category=${encodeURIComponent(category)}`);
    } else {
      navigate('/shop');
    }
    setIsCategoriesOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 left-0 w-full z-50 shadow-lg">
        {/* ===== TOP BAR - Dark Background ===== */}
        <div className="w-full px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between gap-4 bg-[#131921]">
          
          {/* Logo - Full on Mobile */}
          <Link to="/" className="flex items-center gap-2 shrink-0 hover:opacity-90 transition">
            <img src={Logo} alt="2Wolf" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-white font-[Poppins]">
              2Wolf
            </span>
          </Link>

          {/* Location Button - Desktop */}
          <button
            onClick={() => setIsLocationOpen(true)}
            className="hidden lg:flex items-center gap-2 px-3 py-1 hover:bg-white/10 rounded transition"
          >
            <FaMapMarkerAlt className="text-white text-lg" />
            <div className="text-left">
              <p className="text-xs text-gray-300">Deliver to</p>
              <p className="text-sm font-bold text-white flex items-center gap-1">
                {userLocation ? (
                  <>
                    {userLocation.countryName?.split(' ')[0]} {userLocation.city}
                  </>
                ) : (
                  "Select location"
                )}
                <FaChevronDown className="text-xs" />
              </p>
            </div>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-3xl" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="flex w-full rounded-lg overflow-hidden shadow-md relative">
              <select 
                className="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium border-r border-gray-300 focus:outline-none cursor-pointer max-h-10 overflow-y-auto"
                onChange={(e) => {
                  if (e.target.value !== 'All') {
                    navigate(`/shop?category=${encodeURIComponent(e.target.value)}`);
                  } else {
                    navigate('/shop');
                  }
                }}
              >
                <option value="All">All</option>
                {allCategories.slice(1).map(cat => (
                  <option key={cat.name} value={cat.category}>{cat.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search 2Wolf"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="flex-1 px-4 py-2 text-sm focus:outline-none bg-white"
              />
              <button 
                type="submit"
                className="px-6 bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] hover:from-[#FF7A2E] hover:to-[#FF5722] transition"
              >
                <FaSearch className="text-white text-lg" />
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 z-[200]">
                  <SearchDropdown 
                    searchQuery={searchQuery}
                    onClose={() => setIsSearchOpen(false)}
                    isOpen={isSearchOpen}
                  />
                </div>
              )}
            </form>
          </div>

          {/* Account & Lists - Desktop */}
          <div className="hidden lg:block relative" ref={accountRef}>
            <button
              onClick={() => setIsAccountOpen(v => !v)}
              className="flex flex-col items-start px-2 py-1 hover:bg-white/10 rounded transition"
            >
              <span className="text-xs text-gray-300">
                Hello, {user ? user.name?.split(' ')[0] : "sign in"}
              </span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                Account & Lists <FaChevronDown className="text-xs" />
              </span>
            </button>

            <AnimatePresence>
              {isAccountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999]"
                >
                  {!user ? (
                    <div className="p-4">
                      <Link
                        to="/signin"
                        className="block w-full bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] hover:from-[#FF7A2E] hover:to-[#FF5722] text-white text-center font-semibold py-2 rounded-lg transition"
                      >
                        Sign In
                      </Link>
                      <p className="text-xs text-gray-600 mt-2">
                        New customer?{" "}
                        <Link to="/signup" className="text-orange-600 hover:underline">
                          Start here
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {user.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded"
                        >
                          Dashboard
                        </Link>
                      )}
                      <Link
                        to="/my-account"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded"
                      >
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Returns & Orders - Desktop */}
          <Link
            to="/track-order"
            className="hidden lg:flex flex-col items-start px-2 py-1 hover:bg-white/10 rounded transition"
          >
            <span className="text-xs text-gray-300">Returns</span>
            <span className="text-sm font-bold text-white">& Orders</span>
          </Link>

          {/* Wishlist - Desktop */}
          <button
            onClick={() => navigate("/wishlist")}
            className="hidden lg:flex relative items-center gap-2 px-2 py-1 hover:bg-white/10 rounded transition"
          >
            <div className="relative">
              <FaHeart className="text-white text-xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B35] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
          </button>

          {/* Account Icon - Mobile Only */}
          <div className="lg:hidden relative" ref={accountRef}>
            <button
              onClick={() => setIsAccountOpen(v => !v)}
              className="relative flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded transition"
            >
              <FaUser className="text-white text-xl" />
            </button>

            <AnimatePresence>
              {isAccountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999]"
                >
                  {!user ? (
                    <div className="p-4">
                      <Link
                        to="/signin"
                        onClick={() => setIsAccountOpen(false)}
                        className="block w-full bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] hover:from-[#FF7A2E] hover:to-[#FF5722] text-white text-center font-semibold py-2 rounded-lg transition"
                      >
                        Sign In
                      </Link>
                      <p className="text-xs text-gray-600 mt-2 text-center">
                        New customer?{" "}
                        <Link to="/signup" onClick={() => setIsAccountOpen(false)} className="text-orange-600 hover:underline">
                          Start here
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div className="p-2">
                      <div className="px-4 py-2 border-b border-gray-200 mb-2">
                        <p className="text-sm font-semibold text-gray-800">Hello, {user.name?.split(' ')[0] || 'User'}</p>
                      </div>
                      {user.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded"
                        >
                          Dashboard
                        </Link>
                      )}
                      <Link
                        to="/my-account"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded"
                      >
                        Wishlist
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsAccountOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded transition"
          >
            <div className="relative">
              <FaShoppingCart className="text-white text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B35] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden lg:block text-sm font-bold text-white">Cart</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-white text-2xl"
          >
            <FaBars />
          </button>
        </div>

        {/* ===== BOTTOM BAR - Orange ===== */}
        <div className="hidden lg:flex w-full px-4 sm:px-6 md:px-10 py-2.5 items-center gap-4 bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] shadow-md">
          {/* Special Links - First Priority */}
          <Link 
            to="/deals" 
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap flex items-center gap-1.5"
          >
            <FaTag /> Today's Deals
          </Link>
          <Link 
            to="/bestsellers" 
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap flex items-center gap-1.5"
          >
            <FaStar /> Best Sellers
          </Link>
          <Link 
            to="/new-releases" 
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap flex items-center gap-1.5"
          >
            <FaGift /> New Releases
          </Link>

          {/* Category Links */}
          <button
            onClick={() => handleCategoryClick("Electronics")}
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap"
          >
            Electronics
          </button>
          <button
            onClick={() => handleCategoryClick("Fashion")}
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap"
          >
            Fashion
          </button>
          <button
            onClick={() => handleCategoryClick("Home & Kitchen")}
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap"
          >
            Home & Kitchen
          </button>
          <button
            onClick={() => handleCategoryClick("Beauty & Personal Care")}
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap"
          >
            Beauty
          </button>
          <button
            onClick={() => handleCategoryClick("Sports & Outdoors")}
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap"
          >
            Sports
          </button>
          <button
            onClick={() => handleCategoryClick("Toys & Games")}
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap"
          >
            Toys & Games
          </button>
          <button
            onClick={() => handleCategoryClick("Pet Supplies")}
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap"
          >
            Pet Supplies
          </button>
          <button
            onClick={() => handleCategoryClick("Automotive")}
            className="text-white text-sm font-semibold hover:text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded transition whitespace-nowrap"
          >
            Automotive
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden w-full px-4 py-2 bg-[#131921]">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search 2Wolf"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-white focus:outline-none"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500"
            >
              <FaSearch />
            </button>

            {/* Mobile Search Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 z-[200] mt-1">
                <SearchDropdown 
                  searchQuery={searchQuery}
                  onClose={() => setIsSearchOpen(false)}
                  isOpen={isSearchOpen}
                />
              </div>
            )}
          </form>
        </div>

        {/* Mobile Location Bar - Below Search - Minimized */}
        <div className="md:hidden w-full px-3 py-0.5 bg-gradient-to-r from-[#FF8C42] to-[#FF6B35]">
          <button
            onClick={() => setIsLocationOpen(true)}
            className="flex items-center gap-1.5 text-white w-full"
          >
            <FaMapMarkerAlt className="text-xs" />
            <div className="text-left">
              <p className="text-[9px] leading-none mb-0.5">Deliver to</p>
              <p className="text-[11px] font-semibold flex items-center gap-0.5 leading-none">
                {userLocation ? (
                  <>
                    {userLocation.countryName?.split(' ')[0]} {userLocation.city}
                  </>
                ) : (
                  "Select location"
                )}
                <FaChevronDown className="text-[7px]" />
              </p>
            </div>
          </button>
        </div>

        {/* Mobile Categories Bar */}
        <div className="md:hidden w-full px-3 py-2 bg-white border-b border-gray-200 overflow-x-auto">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <Link 
              to="/deals" 
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition flex items-center gap-1"
            >
              <FaTag className="text-xs" /> Deals
            </Link>
            <Link 
              to="/bestsellers" 
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition flex items-center gap-1"
            >
              <FaStar className="text-xs" /> Best Sellers
            </Link>
            <Link 
              to="/new-releases" 
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition flex items-center gap-1"
            >
              <FaGift className="text-xs" /> New Releases
            </Link>
            <button
              onClick={() => handleCategoryClick("Electronics")}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition"
            >
              Electronics
            </button>
            <button
              onClick={() => handleCategoryClick("Fashion")}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition"
            >
              Fashion
            </button>
            <button
              onClick={() => handleCategoryClick("Home & Kitchen")}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition"
            >
              Home & Kitchen
            </button>
            <button
              onClick={() => handleCategoryClick("Beauty & Personal Care")}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition"
            >
              Beauty
            </button>
            <button
              onClick={() => handleCategoryClick("Sports & Outdoors")}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition"
            >
              Sports
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MODALS ===== */}
      <LocationModal 
        isOpen={isLocationOpen} 
        onClose={() => setIsLocationOpen(false)}
        user={user}
      />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] lg:hidden"
            />

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 h-full w-80 bg-white z-[101] overflow-y-auto lg:hidden shadow-2xl"
            >
              <div className="bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] p-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaUser className="text-white text-2xl" />
                  <span className="text-white font-bold">
                    {user ? `Hello, ${user.name?.split(' ')[0] || 'User'}` : "Hello, Sign in"}
                  </span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="text-white text-2xl">
                  <FaTimes />
                </button>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Shop by Category</h3>
                {allCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      handleCategoryClick(cat.category);
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 py-2 px-3 text-gray-700 hover:bg-orange-50 rounded transition"
                  >
                    <cat.icon className="text-xl text-orange-500" />
                    <span className="font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Account Options */}
              {user && (
                <div className="border-t border-gray-200 p-6 space-y-2">
                  <h3 className="font-bold text-lg mb-4 text-gray-800">Your Account</h3>
                  <Link
                    to="/my-account"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block py-2 px-3 text-gray-700 hover:bg-orange-50 rounded"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block py-2 px-3 text-gray-700 hover:bg-orange-50 rounded"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block py-2 px-3 text-gray-700 hover:bg-orange-50 rounded"
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}