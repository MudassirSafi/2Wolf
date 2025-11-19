// ✅ src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const API = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await axios.post(`${API}/api/users/forgot-password`, {
        email: email.trim().toLowerCase()
      });
      
      setMessage('Password reset link sent to your email!');
      setTimeout(() => nav('/signin'), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/40 
                   p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your email to receive a password reset link
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
            className="w-full mb-6 px-4 sm:px-5 py-3 sm:py-4 
                       bg-white/70 border border-gray-300 rounded-xl 
                       placeholder-gray-500 text-sm sm:text-base
                       focus:outline-none focus:ring-4 focus:ring-yellow-400/50 
                       focus:bg-white transition disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-amber-600 
                       hover:from-yellow-400 hover:to-amber-500 text-black font-bold 
                       rounded-xl shadow-lg hover:shadow-yellow-500/50 transition 
                       transform hover:scale-[1.02] disabled:opacity-50 
                       disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm">
          Remember your password?{' '}
          <Link to="/signin" className="text-yellow-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}