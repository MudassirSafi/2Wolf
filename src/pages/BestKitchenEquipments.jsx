import React from 'react';
import { useNavigate } from 'react-router-dom';

const BestKitchenEquipments = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Cookware',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
      description: 'Premium pots, pans, and cooking vessels',
      itemCount: 45
    },
    {
      id: 2,
      name: 'Cutlery & Knives',
      image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500',
      description: 'Professional-grade knives and cutting tools',
      itemCount: 38
    },
    {
      id: 3,
      name: 'Small Appliances',
      image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500',
      description: 'Blenders, mixers, and food processors',
      itemCount: 52
    },
    {
      id: 4,
      name: 'Bakeware',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500',
      description: 'Baking sheets, molds, and accessories',
      itemCount: 41
    },
    {
      id: 5,
      name: 'Storage Solutions',
      image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=500',
      description: 'Containers, jars, and organization tools',
      itemCount: 36
    },
    {
      id: 6,
      name: 'Kitchen Tools',
      image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=500',
      description: 'Utensils, gadgets, and prep tools',
      itemCount: 67
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Best Kitchen Equipments</h1>
          <p className="text-xl opacity-90">Premium quality tools for professional and home chefs</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.itemCount} items</span>
                  <span className="text-orange-500 font-semibold group-hover:text-orange-600">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the best brands and materials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing guaranteed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Warranty Included</h3>
              <p className="text-gray-600">All products come with warranty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestKitchenEquipments;