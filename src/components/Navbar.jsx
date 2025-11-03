// ✅ src/components/Navbar.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    localStorage.clear();
    navigate("/");
  };

  const cartCount = 3; // demo

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
            <Link to="/" className="text-white hover:text-[#EAB308]">
              Home
            </Link>
            <Link to="/shop" className="text-white hover:text-[#EAB308]">
              Shop
            </Link>
            <Link to="/about" className="text-white hover:text-[#EAB308]">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-[#EAB308]">
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Search */}
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
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="#EAB308"
                  strokeWidth="1.6"
                />
              </svg>
            </button>

            {/* Account / Dashboard */}
            {!user ? (
              <Link
                to="/signin"
                className="p-2 rounded-md hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-[#EAB308]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                    stroke="#EAB308"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="#EAB308"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            ) : (
              <>
                {user.role === "admin" ? (
                  <Link
                    to="/dashboard"
                    className="p-2 rounded-md hover:scale-110 transition-transform"
                  >
                    <svg
                      className="w-6 h-6 text-[#EAB308]"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M3 13h8V3H3v10zM13 21h8V11h-8v10z"
                        stroke="#EAB308"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    to="/my-account"
                    className="p-2 rounded-md hover:scale-110 transition-transform"
                  >
                    <svg
                      className="w-6 h-6 text-[#EAB308]"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                        stroke="#EAB308"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        stroke="#EAB308"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md hover:scale-110 transition-transform"
                >
                  <svg
                    className="w-6 h-6 text-[#EAB308]"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16 17l5-5-5-5"
                      stroke="#EAB308"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M21 12H9"
                      stroke="#EAB308"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7"
                      stroke="#EAB308"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Cart */}
            <div className="relative">
              <Link
                to="/cart"
                className="p-2 rounded-md hover:scale-110 transition-transform"
              >
                <svg
                  className="w-6 h-6 text-[#EAB308]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 6h15l-1.5 9H8L6 6z"
                    stroke="#EAB308"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="20" r="1" fill="#EAB308" />
                  <circle cx="18" cy="20" r="1" fill="#EAB308" />
                </svg>
              </Link>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[12px] font-bold px-1.5 py-0.5 rounded-full bg-[#6D28D9] text-white">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Mobile Menu */}
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

        {/* Mobile Drawer */}
        <div
          className={`md:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/5 transition-max-height duration-300 overflow-hidden ${
            isMobileOpen ? "max-h-60" : "max-h-0"
          }`}
        >
          <div className="px-4 pb-4 pt-3 flex flex-col space-y-3">
            <Link to="/" className="text-white hover:text-[#EAB308]">
              Home
            </Link>
            <Link to="/shop" className="text-white hover:text-[#EAB308]">
              Shop
            </Link>
            <Link to="/about" className="text-white hover:text-[#EAB308]">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-[#EAB308]">
              Contact
            </Link>

            <div className="flex flex-col space-y-2 pt-2">
              {!user ? (
                <>
                  <Link to="/signin" className="text-[#EAB308]">
                    Sign In
                  </Link>
                  <Link to="/signup" className="text-[#EAB308]">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {user.role === "admin" ? (
                    <Link to="/dashboard" className="text-[#EAB308]">
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/my-account" className="text-[#EAB308]">
                      My Account
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-[#EAB308] text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <input
                  autoFocus
                  placeholder="Search products, categories, keywords..."
                  className="w-full p-4 rounded-md border outline-none"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="px-4 py-2 rounded-md bg-[#EAB308] text-black font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
