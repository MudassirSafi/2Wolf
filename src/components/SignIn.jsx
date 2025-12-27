// ✅ src/components/SignIn.jsx - Mobile First, No Apple
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const API = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/users/signin`, { 
        email: email.trim().toLowerCase(), 
        password 
      });
      
      const { token, role } = res.data;
      login(token, role);
      
      if (onClose) onClose();
      
      if (role === 'admin') {
        nav('/dashboard');
      } else {
        nav('/');
      }
    } catch (error) {
      setErr(error?.response?.data?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = `${API}/api/auth/google`;
  };

  const handleForgotPassword = () => {
    if (onClose) onClose();
    nav('/forgot-password');
  };

  return (
    <>
      {/* BLUR BACKGROUND */}
      <div 
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL - Mobile First Responsive */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[95%] sm:max-w-md bg-white/95 backdrop-blur-xl 
                     border border-white/40 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl 
                     shadow-2xl text-gray-900 relative pointer-events-auto my-4 mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 
                       text-3xl font-light z-10 w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 
                         text-center bg-gradient-to-r from-orange-500 to-orange-600 
                         bg-clip-text text-transparent pr-8">
            Welcome Back
          </h3>

          {err && (
            <div className="bg-red-100 text-red-700 px-3 py-2 sm:px-4 sm:py-3 
                            rounded-lg text-center mb-3 sm:mb-4 text-xs sm:text-sm">
              {err}
            </div>
          )}

          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            required
            disabled={loading}
            className="w-full mb-3 sm:mb-4 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 
                       bg-white/70 border border-gray-300 rounded-lg sm:rounded-xl 
                       placeholder-gray-500 text-sm sm:text-base
                       focus:outline-none focus:ring-2 sm:focus:ring-4 
                       focus:ring-orange-400/50 focus:bg-white transition 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Password Input with Show/Hide */}
          <div className="relative mb-2 sm:mb-3">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={loading}
              className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 pr-10 sm:pr-12
                         bg-white/70 border border-gray-300 rounded-lg sm:rounded-xl 
                         placeholder-gray-500 text-sm sm:text-base
                         focus:outline-none focus:ring-2 sm:focus:ring-4 
                         focus:ring-orange-400/50 focus:bg-white transition 
                         disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 
                         text-gray-500 hover:text-gray-700 p-1"
            >
              {showPassword ? <FaEyeSlash size={16} className="sm:w-[18px] sm:h-[18px]" /> : 
                             <FaEye size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mb-4 sm:mb-6 md:mb-8">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 
                         font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 sm:py-3 md:py-4 bg-gradient-to-r 
                       from-orange-500 to-orange-600 hover:from-orange-400 
                       hover:to-orange-500 text-white font-bold rounded-lg sm:rounded-xl 
                       shadow-lg hover:shadow-orange-500/50 transition-all
                       transform hover:scale-[1.02] active:scale-95 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       text-sm sm:text-base"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4 sm:my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 sm:px-4 text-xs sm:text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google OAuth Button */}
          <button 
            type="button" 
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 
                       py-2.5 sm:py-3 md:py-4 bg-white border border-gray-300 
                       rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       text-sm sm:text-base font-medium text-gray-700"
          >
            <FcGoogle className="w-5 h-5 sm:w-6 sm:h-6" />
            Continue with Google
          </button>

          <p className="text-center text-gray-700 text-xs sm:text-sm mt-4 sm:mt-6">
            New here?{" "}
            <Link 
              to="/signup" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (onClose) onClose(); 
                nav('/signup'); 
              }} 
              className="text-orange-600 font-bold hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}