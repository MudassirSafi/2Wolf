import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredStatic, setHoveredStatic] = useState(false);

  // Sample product images for slider
  const sliderProducts = [
    { id: 1, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop", name: "Luxury Watch", title: "Timeless Elegance" },
    { id: 2, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop", name: "Premium Headphones", title: "Sound Perfection" },
    { id: 3, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=400&fit=crop", name: "Designer Sunglasses", title: "Style Icon" },
    { id: 4, img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=400&fit=crop", name: "Classic Wallet", title: "Premium Leather" },
    { id: 5, img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=400&fit=crop", name: "Elegant Bracelet", title: "Luxury Jewelry" }
  ];

  // Featured products cards
  const featuredProducts = [
    { id: 101, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", name: "Gold Watch", price: "$299" },
    { id: 102, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", name: "Aviator Sunglasses", price: "$149" },
    { id: 103, img: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=400", name: "Leather Bag", price: "$199" },
    { id: 104, img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400", name: "Silver Bracelet", price: "$89" }
  ];

  // Auto slide effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const CartIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  );

  return (
    <section className="relative pt-0 pb-6 overflow-hidden font-poppins text-[#0A0A0A] bg-[#FAF8F5]">
      {/* ✨ Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA]"></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4">
        
        {/* TOP SECTION - 3 Rectangle Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
          {/* 🔸 IMAGE 1: Auto-Sliding Products with Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative h-64 md:h-80 bg-white/70 backdrop-blur-xl border border-gray-300/30 rounded-2xl shadow-lg overflow-hidden md:col-span-2"
            onMouseEnter={() => setHoveredSlide(currentSlide)}
            onMouseLeave={() => setHoveredSlide(null)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <img
                  src={sliderProducts[currentSlide].img}
                  alt={sliderProducts[currentSlide].name}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient overlay for title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Title always visible */}
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                    {sliderProducts[currentSlide].title}
                  </h3>
                  <p className="text-white/90 text-sm mt-1">
                    {sliderProducts[currentSlide].name}
                  </p>
                </div>

                {/* Overlay on hover */}
                {hoveredSlide === currentSlide && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  >
                    <a
                      href={`/product/${sliderProducts[currentSlide].id}`}
                      className="bg-[#D4AF37] text-[#0A0A0A] font-bold px-6 py-3 rounded-full hover:bg-[#EAB308] transition flex items-center gap-2"
                    >
                      <CartIcon /> Shop Now
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Slide indicators */}
            <div className="absolute bottom-3 right-6 flex gap-2 z-10">
              {sliderProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === currentSlide ? "bg-[#D4AF37] w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* 🔸 IMAGE 2: Static Image with Shop Button */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-64 md:h-80 bg-white/70 backdrop-blur-xl border border-gray-300/30 rounded-2xl shadow-lg overflow-hidden group"
            onMouseEnter={() => setHoveredStatic(true)}
            onMouseLeave={() => setHoveredStatic(false)}
          >
            <img
              src="https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=500&h=400&fit=crop"
              alt="Featured Product"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {hoveredStatic && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <a
                  href="/product/999"
                  className="bg-[#D4AF37] text-[#0A0A0A] font-bold px-6 py-3 rounded-full hover:bg-[#EAB308] transition flex items-center gap-2"
                >
                  <CartIcon /> Shop Now
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* 🔸 MIDDLE SECTION: All Products Banner */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-48 md:h-56 rounded-2xl shadow-lg overflow-hidden group mb-6"
        >
          <a
            href="/shop"
            className="block w-full h-full bg-gradient-to-br from-[#6E2A6E] to-[#5A215A]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                All Products
              </h3>
            </div>
            <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/20 transition-colors duration-300" />
          </a>
        </motion.div>

        {/* 🔸 BOTTOM SECTION: Featured Products Cards */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + 0.1 * idx }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative bg-white/80 backdrop-blur-lg border border-gray-300/30 rounded-xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <a href={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-bold text-[#0A0A0A] text-sm sm:text-base group-hover:text-[#6E2A6E] transition">
                    {product.name}
                  </h4>
                  <p className="text-[#D4AF37] font-bold text-base sm:text-lg mt-1">{product.price}</p>
                </div>
                
                {/* Hover overlay */}
                {hoveredCard === product.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#6E2A6E]/90 flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                      <CartIcon /> View Details
                    </span>
                  </motion.div>
                )}
              </a>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}