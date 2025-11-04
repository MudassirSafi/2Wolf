import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTag, FaGem, FaClock, FaChevronRight, FaChevronDown } from "react-icons/fa";

export default function HomeHero() {
  return (
    <section className="relative flex h-[100vh] overflow-hidden font-poppins text-[#0A0A0A] bg-[#FAF8F5]">
      {/* ✨ Subtle Background Gradient (Off-White to Light Ivory) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA]"></div>

      {/* ✅ Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 hidden lg:flex flex-col justify-center w-64 bg-white/60 backdrop-blur-xl border-r border-gray-300/30 p-8 space-y-6 rounded-r-2xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-[#0A0A0A] mb-4">Categories</h2>
        <ul className="space-y-3 text-[#0A0A0A]/90">
          <li className="flex items-center gap-2 hover:text-[#6E2A6E] transition cursor-pointer">
            <FaClock /> Watches
          </li>
          <li className="flex items-center gap-2 hover:text-[#6E2A6E] transition cursor-pointer">
            <FaGem /> Accessories
          </li>
          <li className="flex items-center gap-2 hover:text-[#6E2A6E] transition cursor-pointer">
            <FaTag /> Offers
          </li>
          <li className="flex items-center gap-2 hover:text-[#6E2A6E] transition cursor-pointer">
            <FaChevronRight /> New Arrivals
          </li>
        </ul>

        <Link
          to="/shop"
          className="mt-8 inline-block bg-[#6E2A6E] text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-[#5A215A] transition"
        >
          Explore All
        </Link>
      </motion.aside>

      {/* ✅ Main Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center z-10 text-center px-6 sm:px-12">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#0A0A0A] via-[#6E2A6E] to-[#D4AF37] drop-shadow-md">
          Premium Luxury Collection
        </h1>

        <p className="text-[#0A0A0A]/80 text-lg sm:text-xl mt-4 max-w-2xl">
          Handcrafted elegance, curated for the connoisseur in you.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Link
            to="/shop"
            className="bg-[#6E2A6E] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#5A215A] transition"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>

      {/* ✅ Subtle Scrolling Cue (Champagne Gold Arrow) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#D4AF37] animate-bounce"
      >
        <FaChevronDown size={24} />
      </motion.div>
    </section>
  );
}
