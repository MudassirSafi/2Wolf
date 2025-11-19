// ✅ src/pages/OrderSuccess.jsx
import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome, FaBoxOpen } from 'react-icons/fa';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 text-lg mb-2">
          Thank you for your purchase!
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-8">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
        )}

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-2">
            📧 A confirmation email has been sent to your email address.
          </p>
          <p className="text-gray-700">
            📦 You can track your order from your account page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 
                       hover:from-yellow-400 hover:to-amber-500 text-black font-semibold 
                       rounded-xl transition transform hover:scale-105"
          >
            <FaHome />
            Continue Shopping
          </Link>

          <Link
            to="/my-account"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 
                       hover:border-[#B8860B] text-gray-700 font-semibold 
                       rounded-xl transition transform hover:scale-105"
          >
            <FaBoxOpen />
            View Orders
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@2wolf.com" className="text-[#B8860B] hover:underline">
              support@2wolf.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}