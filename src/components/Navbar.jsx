// ✅ src/components/Navbar.jsx - Amazon-Inspired Design
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import Logo from "../assets/2WolfLogo.png";
import { 
  FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, 
  FaMapMarkerAlt, FaChevronDown, FaBoxOpen, FaTag, FaMobileAlt,
  FaLaptop, FaHeartbeat, FaTshirt, FaSpa, FaGamepad, FaShoppingBasket
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import SearchOverlay from "./SearchOverlay";
import LocationModal from "./LocationModal";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const { getCartCount } = useContext(CartContext);
  
  const navigate = useNavigate();

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(getCartCount());

  const accountRef = useRef(null);
  const categoriesRef = useRef(null);

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
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    localStorage.clear();
    navigate("/");
  };

  const categories = [
    { name: "Amazon Devices", icon: FaLaptop, path: "/category/devices" },
    { name: "Fashion", icon: FaTshirt, path: "/category/fashion" },
    { name: "Mobile Phones", icon: FaMobileAlt, path: "/category/mobile" },
    { name: "Electronics", icon: FaLaptop, path: "/category/electronics" },
    { name: "Health & Personal Care", icon: FaHeartbeat, path: "/category/health" },
    { name: "Beauty", icon: FaSpa, path: "/category/beauty" },
    { name: "Video Games", icon: FaGamepad, path: "/category/games" },
    { name: "Grocery & Food", icon: FaShoppingBasket, path: "/category/grocery" }
  ];

  return (
    <>
      <nav className="sticky top-0 left-0 w-full z-50 shadow-lg">
        {/* ===== TOP BAR - Dark Background ===== */}
        <div className="w-full px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between gap-4 bg-[#131921]">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 hover:opacity-90 transition">
            <img src={Logo} alt="2Wolf" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-white hidden sm:block font-[Poppins]">
              2Wolf
            </span>
          </Link>

          {/* Location Button */}
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

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-3xl">
            <div className="flex w-full rounded-lg overflow-hidden shadow-md">
              <select className="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium border-r border-gray-300 focus:outline-none cursor-pointer">
                <option>All</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Kitchen</option>
                <option>Beauty</option>
              </select>
              <input
                type="text"
                placeholder="Search 2Wolf"
                onClick={() => setIsSearchOpen(true)}
                className="flex-1 px-4 py-2 text-sm focus:outline-none"
              />
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="px-6 bg-gradient-to-r from-[#FF9900] to-[#FF8000] hover:from-[#FF8000] hover:to-[#FF7000] transition"
              >
                <FaSearch className="text-white text-lg" />
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <div className="hidden lg:flex items-center gap-1 px-2 py-1 hover:bg-white/10 rounded cursor-pointer transition">
            <span className="text-white text-sm font-bold">EN</span>
            <FaChevronDown className="text-white text-xs" />
          </div>

          {/* Account & Lists */}
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
                        className="block w-full bg-gradient-to-r from-[#FF9900] to-[#FF8000] hover:from-[#FF8000] hover:to-[#FF7000] text-white text-center font-semibold py-2 rounded-lg transition"
                      >
                        Sign In
                      </Link>
                      <p className="text-xs text-gray-600 mt-2">
                        New customer?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
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
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          Dashboard
                        </Link>
                      )}
                      <Link
                        to="/my-account"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
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

          {/* Returns & Orders */}
          <Link
            to="/orders"
            className="hidden lg:flex flex-col items-start px-2 py-1 hover:bg-white/10 rounded transition"
          >
            <span className="text-xs text-gray-300">Returns</span>
            <span className="text-sm font-bold text-white">& Orders</span>
          </Link>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded transition"
          >
            <div className="relative">
              <FaShoppingCart className="text-white text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF9900] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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

        {/* ===== BOTTOM BAR - Navy Blue ===== */}
        <div className="w-full px-4 sm:px-6 md:px-10 py-2 flex items-center gap-6 bg-[#232F3E] overflow-x-auto">
          {/* All Categories Dropdown */}
          <div className="relative" ref={categoriesRef}>
            <button
              onClick={() => setIsCategoriesOpen(v => !v)}
              className="flex items-center gap-2 px-3 py-1.5 text-white font-semibold hover:bg-white/10 rounded transition whitespace-nowrap"
            >
              <FaBars /> All
            </button>

            <AnimatePresence>
              {isCategoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-2xl z-[9999] max-h-96 overflow-y-auto"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      onClick={() => setIsCategoriesOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <cat.icon className="text-[#FF9900] text-lg" />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Links */}
          <Link to="/deals" className="text-white text-sm font-semibold hover:text-[#FF9900] transition whitespace-nowrap">
            Today's Deals
          </Link>
          <Link to="/bestsellers" className="text-white text-sm font-semibold hover:text-[#FF9900] transition whitespace-nowrap">
            Best Sellers
          </Link>
          <Link to="/new-releases" className="text-white text-sm font-semibold hover:text-[#FF9900] transition whitespace-nowrap">
            New Releases
          </Link>
          <Link to="/prime" className="text-white text-sm font-semibold hover:text-[#FF9900] transition whitespace-nowrap">
            Prime
          </Link>
          <Link to="/mobile-phones" className="text-white text-sm font-semibold hover:text-[#FF9900] transition whitespace-nowrap">
            Mobile Phones
          </Link>
          <Link to="/electronics" className="text-white text-sm font-semibold hover:text-[#FF9900] transition whitespace-nowrap">
            Electronics
          </Link>
          <Link to="/fashion" className="text-white text-sm font-semibold hover:text-[#FF9900] transition whitespace-nowrap">
            Fashion
          </Link>

          {/* Mobile Location */}
          <button
            onClick={() => setIsLocationOpen(true)}
            className="lg:hidden text-white text-sm font-semibold hover:text-[#FF9900] transition whitespace-nowrap flex items-center gap-2"
          >
            <FaMapMarkerAlt /> Location
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden w-full px-4 py-2 bg-[#131921]">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 bg-white rounded-lg text-left"
          >
            <FaSearch className="text-gray-400" />
            <span className="text-gray-500 text-sm">Search 2Wolf</span>
          </button>
        </div>
      </nav>

      {/* ===== MODALS ===== */}
      <LocationModal 
        isOpen={isLocationOpen} 
        onClose={() => setIsLocationOpen(false)}
        user={user}
      />

      <AnimatePresence>
        {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>

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
              <div className="bg-[#232F3E] p-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaUser className="text-white text-2xl" />
                  <span className="text-white font-bold">
                    Hello, {user ? user.name?.split(' ')[0] : "Sign in"}
                  </span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="text-white text-2xl">
                  <FaTimes />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#FF9900] transition"
                  >
                    <cat.icon className="text-xl" />
                    <span className="font-medium">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}