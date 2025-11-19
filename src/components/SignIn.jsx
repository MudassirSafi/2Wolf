// ✅ src/components/SignIn.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';

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

  const handleApple = () => {
    window.location.href = `${API}/api/auth/apple`;
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

      {/* MODAL - Responsive */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/40 
                     p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl text-gray-900 
                     relative pointer-events-auto my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 text-2xl sm:text-3xl font-light z-10"
          >
            ×
          </button>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Welcome Back
          </h3>

          {err && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-center mb-4 sm:mb-6 text-sm">
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
            className="w-full mb-4 sm:mb-5 px-4 sm:px-5 py-3 sm:py-4 
                       bg-white/70 border border-gray-300 rounded-xl 
                       placeholder-gray-500 text-sm sm:text-base
                       focus:outline-none focus:ring-4 focus:ring-yellow-400/50 
                       focus:bg-white transition disabled:opacity-50"
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
              className="w-full px-4 sm:px-5 py-3 sm:py-4 pr-12
                         bg-white/70 border border-gray-300 rounded-xl 
                         placeholder-gray-500 text-sm sm:text-base
                         focus:outline-none focus:ring-4 focus:ring-yellow-400/50 
                         focus:bg-white transition disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mb-6 sm:mb-8">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-amber-600 
                       hover:from-yellow-400 hover:to-amber-500 text-black font-bold 
                       rounded-xl shadow-lg hover:shadow-yellow-500/50 transition 
                       transform hover:scale-[1.02] disabled:opacity-50 
                       disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* OAuth Buttons */}
          <div className="flex justify-center gap-4 sm:gap-8 my-6 sm:my-8">
            <button 
              type="button" 
              onClick={handleGoogle}
              disabled={loading}
              className="p-3 sm:p-5 bg-black/10 backdrop-blur-md rounded-full 
                         hover:bg-black/20 transition-all hover:scale-110 
                         shadow-lg disabled:opacity-50"
            >
              <FcGoogle className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button 
              type="button" 
              onClick={handleApple}
              disabled={loading}
              className="p-3 sm:p-5 bg-black/10 backdrop-blur-md rounded-full 
                         hover:bg-black/20 transition-all hover:scale-110 
                         shadow-lg disabled:opacity-50"
            >
              <FaApple className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          <p className="text-center text-gray-700 text-sm">
            New here?{" "}
            <Link 
              to="/signup" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (onClose) onClose(); 
                nav('/signup'); 
              }} 
              className="text-yellow-600 font-bold hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}