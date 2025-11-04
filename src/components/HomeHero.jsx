import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTag, FaGem, FaClock, FaChevronRight } from "react-icons/fa";

export default function HomeHero() {
  return (
    <section className="relative flex h-[100vh] overflow-hidden text-gray-900 font-poppins bg-gray-200/70 backdrop-blur-xl">
      {/* ✨ Glassy Light Grey Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200/80 via-gray-100/60 to-gray-300/80 backdrop-blur-2xl"></div>

      {/* ✅ Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 hidden lg:flex flex-col justify-center w-64 bg-white/40 backdrop-blur-2xl border-r border-gray-300/40 p-8 space-y-6 rounded-r-2xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-[#B8860B] mb-4">Categories</h2>
        <ul className="space-y-3 text-gray-800">
          <li className="flex items-center gap-2 hover:text-[#DAA520] transition cursor-pointer">
            <FaClock /> Watches
          </li>
          <li className="flex items-center gap-2 hover:text-[#DAA520] transition cursor-pointer">
            <FaGem /> Accessories
          </li>
          <li className="flex items-center gap-2 hover:text-[#DAA520] transition cursor-pointer">
            <FaTag /> Offers
          </li>
          <li className="flex items-center gap-2 hover:text-[#DAA520] transition cursor-pointer">
            <FaChevronRight /> New Arrivals
          </li>
        </ul>

        <Link
          to="/shop"
          className="mt-8 inline-block bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-semibold py-3 px-6 rounded-full shadow-md hover:from-[#FFD700] hover:to-[#FFF8DC] transition"
        >
          Explore All
        </Link>
      </motion.aside>

      {/* ✅ Main Content (no animated products now) */}
      <div className="relative flex-1 flex flex-col items-center justify-center z-10 text-center px-6 sm:px-12">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#FFF8DC] drop-shadow-md">
          Premium Luxury Collection
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl mt-4 max-w-2xl">
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
            className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black font-semibold px-8 py-3 rounded-full shadow-md hover:from-[#FFE87C] hover:to-[#FFD700] transition"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
