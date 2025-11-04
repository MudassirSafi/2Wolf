import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SearchOverlay from "./SearchOverlay"; // ✅ Import here

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef(null);

  // ✅ Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-20 z-[1000] transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-lg shadow-[0_6px_24px_rgba(0,0,0,0.6)] border-b border-white/5"
            : "bg-[#0A0A0A]/70 backdrop-blur-md"
        }`}
        style={{ paddingLeft: "40px", paddingRight: "40px" }}
      >
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg,#EAB308, rgba(234,179,8,0.8))",
                boxShadow: "0 6px 20px rgba(234,179,8,0.12)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12c0 5 4 9 9 9s9-4 9-9"
                  stroke="#0A0A0A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3v9l3 3"
                  stroke="#0A0A0A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#EAB308] select-none">
              2Wolf
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-[#EAB308]">Home</Link>
            <Link to="/shop" className="text-white hover:text-[#EAB308]">Shop</Link>
            <Link to="/about" className="text-white hover:text-[#EAB308]">About</Link>
            <Link to="/contact" className="text-white hover:text-[#EAB308]">Contact</Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-md hover:scale-110 transition"
            >
              <svg
                className="w-6 h-6 text-[#EAB308]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="#EAB308"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="11" cy="11" r="6" stroke="#EAB308" strokeWidth="1.6" />
              </svg>
            </button>

            {/* Account Dropdown */}
            <div className="relative" ref={accountRef}>
              {!user ? (
                <Link
                  to="/signin"
                  className="p-2 rounded-md hover:scale-110 transition-transform"
                >
                  <i className="fa-solid fa-user text-[#EAB308] text-xl"></i>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="p-2 rounded-md hover:scale-110 transition-transform"
                  >
                    <i className="fa-solid fa-user text-[#EAB308] text-xl"></i>
                  </button>

                  {isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-lg overflow-hidden z-[9999] animate-fadeIn">
                      {user.role === "admin" ? (
                        <Link
                          to="/dashboard"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10"
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          to="/my-account"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-sm text-white hover:bg-[#EAB308]/10"
                        >
                          My Account
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsAccountOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-[#EAB308] hover:bg-[#EAB308]/10"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Hamburger (Mobile Only) */}
            <button
              className="md:hidden p-2 ml-2"
              onClick={() => setIsMobileOpen((v) => !v)}
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`block absolute h-[2px] w-6 bg-white transform transition-all ${
                    isMobileOpen ? "rotate-45 top-2.5" : "top-1"
                  }`}
                ></span>
                <span
                  className={`block absolute h-[2px] w-6 bg-white transform transition-all ${
                    isMobileOpen ? "opacity-0" : "top-3"
                  }`}
                ></span>
                <span
                  className={`block absolute h-[2px] w-6 bg-white transform transition-all ${
                    isMobileOpen ? "-rotate-45 top-2.5" : "top-5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* ✅ Mobile Drawer */}
        {isMobileOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/10 z-[999]">
            <div className="flex flex-col items-center py-6 space-y-5">
              <Link to="/" onClick={() => setIsMobileOpen(false)} className="text-white hover:text-[#EAB308]">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileOpen(false)} className="text-white hover:text-[#EAB308]">Shop</Link>
              <Link to="/about" onClick={() => setIsMobileOpen(false)} className="text-white hover:text-[#EAB308]">About</Link>
              <Link to="/contact" onClick={() => setIsMobileOpen(false)} className="text-white hover:text-[#EAB308]">Contact</Link>
              {!user ? (
                <Link to="/signin" onClick={() => setIsMobileOpen(false)} className="text-white hover:text-[#EAB308]">Sign In</Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileOpen(false);
                  }}
                  className="text-[#EAB308] hover:text-white"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ✅ Search Overlay separate component */}
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
