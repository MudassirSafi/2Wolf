// src/components/SignUp.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

export default function SignUp({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  // Get API URL from environment variable
  const API = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setErr('Passwords do not match');
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setErr('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/users/signup`, { 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        password 
      });
      
      const { token, role } = res.data;
      
      // Store token and role in AuthContext
      login(token, role);
      
      // Close modal
      if (onClose) onClose();
      
      // Redirect to my account (new users are always 'user' role)
      nav('/my-account');
    } catch (error) {
      console.error('Sign up error:', error);
      setErr(error?.response?.data?.message || error.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    // Redirect to Google OAuth
    window.location.href = `${API}/api/auth/google`;
  };

  const handleApple = () => {
    // Redirect to Apple OAuth
    window.location.href = `${API}/api/auth/apple`;
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-2xl text-gray-900 relative"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-light"
          >
            ×
          </button>

          <h3 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Create Account
          </h3>

          {err && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-center mb-6">
              {err}
            </div>
          )}

          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Full Name" 
            required 
            disabled={loading}
            className="w-full mb-5 px-5 py-4 bg-white/70 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:bg-white transition disabled:opacity-50" 
          />

          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
            disabled={loading}
            className="w-full mb-5 px-5 py-4 bg-white/70 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:bg-white transition disabled:opacity-50" 
          />

          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Password (min. 6 characters)" 
            required 
            disabled={loading}
            minLength="6"
            className="w-full mb-5 px-5 py-4 bg-white/70 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:bg-white transition disabled:opacity-50" 
          />

          <input 
            type="password" 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)} 
            placeholder="Confirm Password" 
            required 
            disabled={loading}
            className="w-full mb-8 px-5 py-4 bg-white/70 border border-gray-300 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:bg-white transition disabled:opacity-50" 
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold rounded-xl shadow-lg hover:shadow-yellow-500/50 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="flex justify-center gap-6 my-8">
            <button 
              type="button" 
              onClick={handleGoogle} 
              disabled={loading}
              className="p-4 bg-black/10 backdrop-blur-md rounded-full hover:bg-black/20 transition disabled:opacity-50"
            >
              <FcGoogle className="w-7 h-7" />
            </button>
            <button 
              type="button" 
              onClick={handleApple} 
              disabled={loading}
              className="p-4 bg-black/10 backdrop-blur-md rounded-full hover:bg-black/20 transition disabled:opacity-50"
            >
              <FaApple className="w-7 h-7" />
            </button>
          </div>

          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link 
              to="/signin" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (onClose) onClose(); 
                nav('/signin'); 
              }} 
              className="text-yellow-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}