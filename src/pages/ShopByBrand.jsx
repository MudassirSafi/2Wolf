// ==========================================
// 📁 FILE 2: src/pages/ShopByBrand.jsx
// ==========================================
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ShopByBrand = () => {
  const navigate = useNavigate();

  // Kitchen Equipment Brands
  const brands = [
    {
      id: 1,
      name: 'KitchenAid',
      category: 'Kitchen Equipment',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/KitchenAid_logo.svg/2560px-KitchenAid_logo.svg.png',
      description: 'Premium kitchen appliances and mixers'
    },
    {
      id: 2,
      name: 'Viking',
      category: 'Professional Cooking',
      logo: 'https://www.vikingrange.com/viking-logo.svg',
      description: 'Professional-grade ranges and refrigerators'
    },
    {
      id: 3,
      name: 'Hobart',
      category: 'Commercial Equipment',
      logo: 'https://www.hobartcorp.com/themes/custom/hobart/logo.svg',
      description: 'Commercial dishwashers and food equipment'
    },
    {
      id: 4,
      name: 'Vitamix',
      category: 'Blenders',
      logo: 'https://www.vitamix.com/us/en_us/Static/images/vitamix-logo.svg',
      description: 'High-performance blenders'
    },
    {
      id: 5,
      name: 'Cuisinart',
      category: 'Food Processors',
      logo: 'https://www.cuisinart.com/globalassets/images/logo.svg',
      description: 'Food processors and kitchen tools'
    },
    {
      id: 6,
      name: 'Breville',
      category: 'Coffee & Espresso',
      logo: 'https://www.breville.com/content/dam/breville/us/assets/logos/breville-logo.svg',
      description: 'Espresso machines and coffee makers'
    },
    {
      id: 7,
      name: 'Waring',
      category: 'Commercial Blenders',
      logo: 'https://via.placeholder.com/200x80/6E2A6E/FFFFFF?text=Waring',
      description: 'Heavy-duty commercial blenders'
    },
    {
      id: 8,
      name: 'Rational',
      category: 'Combi Ovens',
      logo: 'https://via.placeholder.com/200x80/EAB308/000000?text=Rational',
      description: 'Professional combi ovens'
    },
    {
      id: 9,
      name: 'True',
      category: 'Refrigeration',
      logo: 'https://via.placeholder.com/200x80/0A0A0A/FFFFFF?text=True',
      description: 'Commercial refrigeration equipment'
    },
    {
      id: 10,
      name: 'Hoshizaki',
      category: 'Ice Machines',
      logo: 'https://via.placeholder.com/200x80/6E2A6E/FFFFFF?text=Hoshizaki',
      description: 'Commercial ice machines'
    },
    {
      id: 11,
      name: 'Middleby Marshall',
      category: 'Pizza Ovens',
      logo: 'https://via.placeholder.com/200x80/EAB308/000000?text=Middleby',
      description: 'Conveyor pizza ovens'
    },
    {
      id: 12,
      name: 'Metro',
      category: 'Storage & Shelving',
      logo: 'https://via.placeholder.com/200x80/0A0A0A/FFFFFF?text=Metro',
      description: 'Commercial shelving and racks'
    }
  ];

  const handleBrandClick = (brandName) => {
    navigate(`/shop?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Shop by Brand
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore premium kitchen equipment from the world's leading brands. Quality you can trust.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleBrandClick(brand.name)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Brand Logo Container */}
              <div className="h-40 flex items-center justify-center bg-gray-50 p-6 group-hover:bg-gray-100 transition">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/200x80/6E2A6E/FFFFFF?text=${encodeURIComponent(brand.name)}`;
                  }}
                />
              </div>

              {/* Brand Info */}
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-[#6E2A6E] transition">
                  {brand.name}
                </h3>
                <p className="text-sm text-[#6E2A6E] font-semibold mb-2">
                  {brand.category}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {brand.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="px-4 pb-4">
                <div className="bg-gradient-to-r from-[#6E2A6E] to-[#EAB308] text-white text-center py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                  View Products →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#6E2A6E] to-[#EAB308] rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find Your Brand?</h2>
          <p className="text-lg mb-6 opacity-90">
            We're constantly adding new brands. Contact us for special requests!
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-white text-[#6E2A6E] font-bold rounded-full hover:bg-gray-100 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopByBrand;