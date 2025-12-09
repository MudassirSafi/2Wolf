// src/components/HomeHero.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeHero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

  // Main slider categories with images
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
    },
    {
      category: "books",
      title: "Books & Media",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200",
      subtitle: "Explore now"
    },
    {
      category: "toys",
      title: "Toys & Games",
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1200",
      subtitle: "Fun for everyone"
    },
    {
      category: "beauty",
      title: "Beauty & Personal Care",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200",
      subtitle: "Look your best"
    },
    {
      category: "kitchen",
      title: "Kitchen & Dining",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200",
      subtitle: "Cook like a pro"
    },
    {
      category: "automotive",
      title: "Automotive",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
      subtitle: "For your vehicle"
    },
    {
      category: "pet-supplies",
      title: "Pet Supplies",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200",
      subtitle: "Happy pets"
    }
  ];

  // Category boxes data
  const categoryBoxes = [
    {
      title: "Up to 70% off | Men's Fashion",
      items: [
        { name: "Polos", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300", category: "fashion" },
        { name: "Watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300", category: "watches" },
        { name: "Sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300", category: "sunglasses" },
        { name: "Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300", category: "shoes" }
      ]
    },
    {
      title: "Stay fit in style",
      items: [
        { name: "Men's shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", category: "mens-shoes" },
        { name: "Women's shoes", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300", category: "womens-shoes" },
        { name: "Men's clothes", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300", category: "mens-clothes" },
        { name: "Women's clothes", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300", category: "womens-clothes" }
      ]
    },
    {
      title: "Up to 40% off | Appliances",
      items: [
        { name: "Air fryers", image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=300", category: "air-fryers" },
        { name: "Air purifiers", image: "https://images.unsplash.com/photo-1617333146840-3ef047070531?w=300", category: "air-purifiers" },
        { name: "Cookers", image: "https://images.unsplash.com/photo-1585515320310-d9a8b0b7f598?w=300", category: "cookers" },
        { name: "Blenders", image: "https://images.unsplash.com/photo-1585515320310-d9a8b0b7f598?w=300", category: "blenders" }
      ]
    },
    {
      title: "Toys for all ages",
      items: [
        { name: "Learning toys", image: "https://images.unsplash.com/photo-1558877385-7e7d45c058b5?w=300", category: "learning-toys" },
        { name: "Building blocks", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300", category: "building-blocks" },
        { name: "Dolls", image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300", category: "dolls" },
        { name: "Outdoor play", image: "https://images.unsplash.com/photo-1558877385-e44eb3f46a87?w=300", category: "outdoor-play" }
      ]
    },
    {
      title: "Tools & equipment",
      items: [
        { name: "Power tools", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300", category: "power-tools" },
        { name: "Pressure washer", image: "https://images.unsplash.com/photo-1617433820319-c6e3c70e3f69?w=300", category: "pressure-washer" },
        { name: "Tool box", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300", category: "tool-box" },
        { name: "Tester", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300", category: "tester" }
      ]
    },
    {
      title: "Shop by platform",
      items: [
        { name: "Xbox One", image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300", category: "xbox" },
        { name: "PlayStation 4", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300", category: "playstation" },
        { name: "Nintendo Switch", image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=300", category: "nintendo" },
        { name: "Gaming accessories", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300", category: "gaming-accessories" }
      ]
    },
    {
      title: "Shop AmazonBasics",
      items: [
        { name: "Home collection", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300", category: "home-collection" },
        { name: "Towels", image: "https://images.unsplash.com/photo-1585238341710-4c1ce17ab53b?w=300", category: "towels" },
        { name: "Travel gears", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=300", category: "travel-gears" },
        { name: "Cables", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300", category: "cables" }
      ]
    },
    {
      title: "Your basic linens",
      items: [
        { name: "Bed sheets", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300", category: "bed-sheets" },
        { name: "Mattress toppers", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300", category: "mattress-toppers" },
        { name: "Comforters", image: "https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=300", category: "comforters" },
        { name: "Printed sheets", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300", category: "printed-sheets" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideClick = (category) => {
    navigate(`/categories?category=${category}`);
  };

  const handleCategoryItemClick = (category) => {
    navigate(`/categories?category=${category}`);
  };

  const convertToAED = (usdPrice) => {
    return (usdPrice * 3.67).toFixed(2);
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Slider */}
      <div className="relative h-[400px] bg-gray-900 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 cursor-pointer"
            onClick={() => handleSlideClick(heroSlides[currentSlide].category)}
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-12 left-12">
              <h2 className="text-5xl font-bold text-white mb-2">
                {heroSlides[currentSlide].title}
              </h2>
              <p className="text-2xl text-white/90">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? "bg-white w-8" : "bg-white/50 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category Boxes */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryBoxes.map((box, boxIdx) => (
            <div key={boxIdx} className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-4">{box.title}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {box.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    onClick={() => handleCategoryItemClick(item.category)}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-square overflow-hidden rounded mb-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-sm text-center group-hover:text-blue-600">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleCategoryItemClick(box.items[0].category)}
                className="text-blue-600 hover:text-orange-600 text-sm font-medium"
              >
                Explore all →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}