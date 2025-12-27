// src/components/HomeHero.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeHero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

  // Hero slides
  const heroSlides = [
    {
      category: "electronics",
      title: "Electronics Essentials",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200",
      subtitle: "Up to 50% off"
    },
    {
      category: "fashion",
      title: "Fashion & Apparel",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200",
      subtitle: "New arrivals"
    },
    {
      category: "home-appliances",
      title: "Home Appliances",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200",
      subtitle: "Best deals"
    },
    {
      category: "sports",
      title: "Sports & Outdoors",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200",
      subtitle: "Stay active"
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        
        if (data.success && data.products) {
          setProducts(data.products);
          // Filter products with discount (assuming products have a discount field)
          const deals = data.products.filter(p => p.discount && p.discount > 0);
          setDealProducts(deals.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  const handleDealsClick = () => {
    navigate('/shop?deals=true');
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section - Side by Side Layout */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 overflow-hidden">
        <div className="flex h-full">
          {/* Main Slider - 60% on Mobile, 70% on Desktop */}
          <div className="w-[60%] sm:w-[65%] md:w-[70%] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => handleSlideClick(heroSlides[currentSlide].category)}
              >
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-6 md:bottom-12 left-3 sm:left-6 md:left-12 right-3 sm:right-6 md:right-auto">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2 md:mb-3 drop-shadow-2xl line-clamp-2"
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-white/95 drop-shadow-lg mb-2 sm:mb-3 md:mb-4"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all shadow-lg text-xs sm:text-sm md:text-base"
                  >
                    Shop Now
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 z-10">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    idx === currentSlide ? "bg-white w-6 sm:w-8 md:w-10" : "bg-white/50 w-1.5 sm:w-2"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Deals Section - 40% on Mobile, 30% on Desktop - Always Visible */}
          <div 
            className="w-[40%] sm:w-[35%] md:w-[30%] bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 relative overflow-hidden cursor-pointer group"
            onClick={handleDealsClick}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-5 right-5 md:top-10 md:right-10 w-20 h-20 md:w-40 md:h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10 w-24 h-24 md:w-60 md:h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="text-center"
              >
                {/* Mega Percentage Badge */}
                <div className="relative mb-2 sm:mb-3 md:mb-6">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-white text-orange-600 rounded-full w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform mx-auto"
                  >
                    <div className="text-center">
                      <div className="text-2xl sm:text-4xl md:text-6xl font-black leading-none">70</div>
                      <div className="text-sm sm:text-2xl md:text-4xl font-bold leading-none">% OFF</div>
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 text-orange-600 rounded-full w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center font-black text-[8px] sm:text-[10px] md:text-sm shadow-lg"
                  >
                    UP TO
                  </motion.div>
                </div>

                <h3 className="text-sm sm:text-xl md:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 drop-shadow-lg">
                  MEGA DEALS
                </h3>
                <p className="text-xs sm:text-sm md:text-xl mb-2 sm:mb-3 md:mb-6 font-medium opacity-95">
                  Limited Time!
                </p>

                {/* Deal Products Preview - Hide on Small Mobile, Show on Tablet+ */}
                {dealProducts.length > 0 && (
                  <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 mb-3 md:mb-6">
                    {dealProducts.slice(0, 3).map((product, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * idx }}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-1 md:p-2"
                      >
                        <img
                          src={product.images?.[0] || 'https://via.placeholder.com/100'}
                          alt={product.name}
                          className="w-full h-10 sm:h-12 md:h-16 object-cover rounded"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 px-3 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-full font-bold text-[10px] sm:text-sm md:text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  <span className="hidden sm:inline">Shop Deals Now →</span>
                  <span className="sm:hidden">Shop Now →</span>
                </motion.button>

                {/* Floating Elements - Smaller on Mobile */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-2 sm:top-4 md:top-8 left-2 sm:left-4 md:left-8 text-2xl sm:text-4xl md:text-6xl opacity-20"
                >
                  🎁
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-2 sm:bottom-4 md:bottom-8 right-2 sm:right-4 md:right-8 text-2xl sm:text-4xl md:text-6xl opacity-20"
                >
                  ⚡
                </motion.div>
              </motion.div>
            </div>

            {/* Pulsing Border Effect */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border md:border-2 lg:border-4 border-yellow-300 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}