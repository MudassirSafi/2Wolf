// src/components/SignUp.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  const API = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr(null)
    if (password !== confirmPassword) {
      setErr('Passwords do not match')
      return
    }

    try {
      const res = await axios.post(`${API}/api/users/signup`, { name, email, password })
      // you can auto-login here by using the returned token:
      // localStorage.setItem('token', res.data.token)
      nav('/signin')
    } catch (error) {
      console.error("SignUp error:", error)
      setErr(error?.response?.data?.message || error.message || 'Sign up failed')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl shadow-2xl text-white font-poppins"
      >
        <h3 className="text-3xl font-semibold mb-6 text-center text-yellow-400">Create Account</h3>
        {err && <div className="text-red-400 text-center mb-3">{err}</div>}

        <label className="block mb-4">
          <span className="text-sm text-gray-300">Full Name</span>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            type="text"
            className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-300">Email</span>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            type="email"
            className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-300">Password</span>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm text-gray-300">Confirm Password</span>
          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition"
        >
          Sign Up
        </button>

        <div className="flex justify-center space-x-6 mt-6">
          <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
            <FcGoogle className="w-6 h-6" />
          </button>
          <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
            <FaApple className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="text-center text-sm mt-6 text-gray-300">
          Already have an account?{" "}
          <Link to="/signin" className="text-yellow-400 hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  )
}
