// ✅ src/components/LocationModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { GCC_COUNTRIES, getCitiesByCountry, getAreasByCity } from '../data/locationData';

export default function LocationModal({ isOpen, onClose, user }) {
  const [selectedCountry, setSelectedCountry] = useState('AE'); // Default UAE
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  // Load saved location or set default
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      const location = JSON.parse(savedLocation);
      setSelectedCountry(location.country || 'AE');
      setSelectedCity(location.city || '');
      setSelectedArea(location.area || '');
    }
  }, []);

  // Update cities when country changes
  useEffect(() => {
    const countryCities = getCitiesByCountry(selectedCountry);
    setCities(countryCities);
    setSelectedCity('');
    setSelectedArea('');
    setAreas([]);
  }, [selectedCountry]);

  // Update areas when city changes
  useEffect(() => {
    if (selectedCity) {
      const cityAreas = getAreasByCity(selectedCountry, selectedCity);
      setAreas(cityAreas);
      setSelectedArea('');
    }
  }, [selectedCity, selectedCountry]);

  const handleApply = () => {
    if (!selectedCity) {
      alert('Please select a city');
      return;
    }

    const location = {
      country: selectedCountry,
      countryName: GCC_COUNTRIES.find(c => c.code === selectedCountry)?.name,
      city: selectedCity,
      area: selectedArea
    };

    localStorage.setItem('userLocation', JSON.stringify(location));
    window.dispatchEvent(new Event('locationUpdated'));
    onClose();
  };

  const handleOutsideGCC = () => {
    alert('International shipping coming soon! Currently serving GCC countries only.');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] p-6 flex items-center justify-between rounded-t-2xl z-10">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-white text-2xl" />
              <div>
                <h2 className="text-2xl font-bold text-white">Choose your location</h2>
                <p className="text-white/90 text-sm mt-1">
                  Delivery options and speeds may vary by location
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Sign In Prompt */}
            {!user && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 mb-3">
                  <span className="font-semibold">Sign in</span> to see your saved addresses
                </p>
                <button
                  onClick={() => {
                    window.location.href = '/signin';
                    onClose();
                  }}
                  className="w-full bg-gradient-to-r from-[#FF9900] to-[#FF8000] hover:from-[#FF8000] hover:to-[#FF7000] text-white font-semibold py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500 font-medium">or enter location</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Country Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaGlobe className="inline mr-2 text-blue-600" />
                Select Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-800 font-medium cursor-pointer"
              >
                {GCC_COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select City <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-800 font-medium cursor-pointer"
              >
                <option value="">Choose a city...</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Area Selection (Optional) */}
            {selectedCity && areas.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Area <span className="text-gray-400">(Optional)</span>
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-800 cursor-pointer"
                >
                  <option value="">Choose an area...</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Apply Button */}
            <button
              onClick={handleApply}
              disabled={!selectedCity}
              className={`w-full font-bold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg ${
                selectedCity
                  ? 'bg-gradient-to-r from-[#FF9900] to-[#FF8000] hover:from-[#FF8000] hover:to-[#FF7000] text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Apply Location
            </button>

            {/* Ship Outside GCC */}
            <div className="text-center pt-2">
              <button
                onClick={handleOutsideGCC}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition"
              >
                or ship outside GCC countries
              </button>
            </div>

            {/* Current Selection Display */}
            {selectedCity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border-2 border-green-200 rounded-lg p-4"
              >
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="font-semibold">Selected:</span>{' '}
                  {GCC_COUNTRIES.find(c => c.code === selectedCountry)?.flag}{' '}
                  {GCC_COUNTRIES.find(c => c.code === selectedCountry)?.name} - {selectedCity}
                  {selectedArea && ` - ${selectedArea}`}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}