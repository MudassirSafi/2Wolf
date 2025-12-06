import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuperMarket = () => {
  const navigate = useNavigate();

  const departments = [
    {
      id: 1,
      name: 'Fresh Produce',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500',
      description: 'Fresh fruits, vegetables, and herbs',
      items: ['Fruits', 'Vegetables', 'Herbs', 'Salads']
    },
    {
      id: 2,
      name: 'Dairy & Eggs',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500',
      description: 'Milk, cheese, yogurt, and more',
      items: ['Milk', 'Cheese', 'Yogurt', 'Butter']
    },
    {
      id: 3,
      name: 'Meat & Seafood',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500',
      description: 'Fresh and frozen proteins',
      items: ['Beef', 'Chicken', 'Fish', 'Lamb']
    },
    {
      id: 4,
      name: 'Bakery',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
      description: 'Fresh bread, pastries, and cakes',
      items: ['Bread', 'Pastries', 'Cakes', 'Cookies']
    },
    {
      id: 5,
      name: 'Pantry Staples',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
      description: 'Rice, pasta, oils, and spices',
      items: ['Rice', 'Pasta', 'Oils', 'Spices']
    },
    {
      id: 6,
      name: 'Beverages',
      image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bddc19f?w=500',
      description: 'Drinks, juices, and refreshments',
      items: ['Soft Drinks', 'Juices', 'Water', 'Tea']
    },
    {
      id: 7,
      name: 'Snacks',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500',
      description: 'Chips, nuts, and munchies',
      items: ['Chips', 'Nuts', 'Crackers', 'Popcorn']
    },
    {
      id: 8,
      name: 'Frozen Foods',
      image: 'https://images.unsplash.com/photo-1571020786154-15c0129d0d09?w=500',
      description: 'Frozen meals and ingredients',
      items: ['Ice Cream', 'Frozen Meals', 'Vegetables', 'Desserts']
    }
  ];

  const featuredDeals = [
    {
      id: 1,
      title: 'Weekly Specials',
      discount: '30% OFF',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500'
    },
    {
      id: 2,
      title: 'Fresh Produce',
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500'
    },
    {
      id: 3,
      title: 'Dairy Products',
      discount: '15% OFF',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SuperMarket</h1>
          <p className="text-xl opacity-90">Everything you need for your kitchen and home</p>
        </div>
      </div>

      {/* Featured Deals */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDeals.map((deal) => (
            <div
              key={deal.id}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <span className="text-yellow-400 font-bold text-2xl mb-2">{deal.discount}</span>
                <h3 className="text-white text-xl font-bold">{deal.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Departments Grid */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => navigate(`/category/${dept.name.toLowerCase().replace(/\s+/g, '-')}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{dept.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                <div className="flex flex-wrap gap-1">
                  {dept.items.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white py-12 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Same day delivery available</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Fresh Quality</h3>
              <p className="text-sm text-gray-600">Always fresh products</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">Lowest price guarantee</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">Hassle-free returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperMarket;