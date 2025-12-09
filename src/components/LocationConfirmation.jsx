// ✅ src/components/LocationConfirmation.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function LocationConfirmation({ isOpen, onClose, location }) {
  const navigate = useNavigate();

  if (!isOpen || !location) return null;

  const handleContinue = () => {
    onClose();
    // Navigate to home page
    navigate('/');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Confirmation Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        >
          {/* Success Icon Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-3"
            >
              <FaCheckCircle className="text-green-500 text-4xl" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">Location Set!</h2>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Shopping For */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                You're now shopping for delivery to:
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-600 text-xl mt-1 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-gray-800 text-lg">
                    {location.countryName}
                  </p>
                  <p className="text-gray-700 font-medium">
                    {location.city}
                    {location.area && ` - ${location.area}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Information Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                We will use your selected location to show all products available for{' '}
                <span className="font-semibold text-gray-900">{location.countryName}</span>.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Accurate delivery estimates</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Regional pricing and availability</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Local payment options</span>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-[#FF9900] to-[#FF8000] hover:from-[#FF8000] hover:to-[#FF7000] text-white font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Continue Shopping
            </button>

            {/* Change Location Link */}
            <div className="text-center">
              <button
                onClick={onClose}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition"
              >
                Change location
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}