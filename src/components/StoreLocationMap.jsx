// ==========================================
// 📁 FILE 1: src/components/StoreLocationMap.jsx
// Reusable Store Location Component with Map
// ==========================================
import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaDirections } from 'react-icons/fa';

const StoreLocationMap = ({ showFullMap = true }) => {
  // Store Location - Update with your actual store details
  const STORE_INFO = {
    name: "2Wolf Store",
    address: "123 Commerce Street, New York, NY 10001, USA",
    lat: 40.7589,  // Replace with your actual latitude
    lng: -73.9851, // Replace with your actual longitude
    phone: "+1-555-2WOLF",
    email: "store@2wolf.com",
    hours: {
      weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
      saturday: "Saturday: 10:00 AM - 4:00 PM",
      sunday: "Sunday: Closed"
    }
  };

  // Generate OpenStreetMap embed URL
  const getMapEmbedUrl = () => {
    const zoom = 15;
    const bbox = `${STORE_INFO.lng - 0.01},${STORE_INFO.lat - 0.01},${STORE_INFO.lng + 0.01},${STORE_INFO.lat + 0.01}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${STORE_INFO.lat},${STORE_INFO.lng}`;
  };

  // Generate Google Maps URL for directions
  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${STORE_INFO.lat},${STORE_INFO.lng}`;
  };

  // Generate Apple Maps URL
  const getAppleMapsUrl = () => {
    return `http://maps.apple.com/?q=${STORE_INFO.lat},${STORE_INFO.lng}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B8860B] to-yellow-600 p-6">
        <div className="flex items-center gap-3 text-white">
          <FaMapMarkerAlt className="text-3xl" />
          <div>
            <h2 className="text-2xl font-bold">{STORE_INFO.name}</h2>
            <p className="text-white/90 text-sm">Visit us or get directions</p>
          </div>
        </div>
      </div>

      {/* Store Information */}
      <div className="p-6 space-y-4 border-b border-gray-200">
        {/* Address */}
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-[#B8860B] text-xl mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-800 mb-1">Address</p>
            <p className="text-gray-600">{STORE_INFO.address}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <FaPhone className="text-[#B8860B] text-xl mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-800 mb-1">Phone</p>
            <a 
              href={`tel:${STORE_INFO.phone}`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {STORE_INFO.phone}
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3">
          <FaClock className="text-[#B8860B] text-xl mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-800 mb-2">Store Hours</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{STORE_INFO.hours.weekdays}</p>
              <p>{STORE_INFO.hours.saturday}</p>
              <p className="text-red-600 font-medium">{STORE_INFO.hours.sunday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Display */}
      {showFullMap && (
        <div className="relative">
          {/* OpenStreetMap Embed (FREE - No API Key) */}
          <div className="relative w-full h-96 bg-gray-200">
            <iframe
              title="Store Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={getMapEmbedUrl()}
              className="w-full h-full"
            />
            
            {/* Map Overlay with Attribution */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">
                📍 {STORE_INFO.address}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={getGoogleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition"
                >
                  <FaDirections /> Google Maps
                </a>
                <a
                  href={getAppleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-lg transition"
                >
                  <FaDirections /> Apple Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="p-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={getGoogleMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          <FaDirections /> Get Directions
        </a>
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#B8860B] to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-[#B8860B] transition"
        >
          <FaPhone /> Call Store
        </a>
      </div>
    </div>
  );
};

export default StoreLocationMap;