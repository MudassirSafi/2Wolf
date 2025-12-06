// ==========================================
// 📁 FILE 2: src/pages/StoreLocation.jsx
// Dedicated Store Location Page
// ==========================================
import React from 'react';
import StoreLocationMap from '../components/StoreLocationMap';
import { FaStore, FaMapMarkedAlt, FaInfoCircle } from 'react-icons/fa';

const StoreLocation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaStore className="text-5xl text-[#B8860B]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Visit Our Store
          </h1>
          <p className="text-gray-600 text-lg">
            Come see us in person! We'd love to help you find what you need.
          </p>
        </div>

        {/* Main Location Component */}
        <div className="mb-8">
          <StoreLocationMap showFullMap={true} />
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parking Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FaMapMarkedAlt className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Parking & Access</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p>Free parking available</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p>Wheelchair accessible entrance</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p>Located near public transportation</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <p>Easy to find with GPS navigation</p>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <FaInfoCircle className="text-yellow-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">What to Expect</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-[#B8860B] font-bold">•</span>
                <p>Friendly and knowledgeable staff</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#B8860B] font-bold">•</span>
                <p>Browse our full product catalog</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#B8860B] font-bold">•</span>
                <p>Try before you buy</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#B8860B] font-bold">•</span>
                <p>Order pickup available</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Get There */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">How to Get There</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* By Car */}
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🚗</div>
              <h4 className="font-semibold text-gray-800 mb-2">By Car</h4>
              <p className="text-sm text-gray-600">
                Free parking available. Take Exit 12 from Highway 95.
              </p>
            </div>

            {/* By Train */}
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🚇</div>
              <h4 className="font-semibold text-gray-800 mb-2">By Train</h4>
              <p className="text-sm text-gray-600">
                5-minute walk from Central Station. Exit on Main Street side.
              </p>
            </div>

            {/* By Bus */}
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🚌</div>
              <h4 className="font-semibold text-gray-800 mb-2">By Bus</h4>
              <p className="text-sm text-gray-600">
                Bus routes 12, 45, and 78 stop right outside our store.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-gradient-to-r from-[#B8860B] to-yellow-600 rounded-xl p-6 mt-6 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Need Help Finding Us?</h3>
          <p className="mb-4">Our team is here to help you!</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+1-555-2WOLF"
              className="px-6 py-3 bg-white text-[#B8860B] font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              📞 Call Us
            </a>
            <a
              href="mailto:store@2wolf.com"
              className="px-6 py-3 bg-white text-[#B8860B] font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocation;