// ✅ src/components/HomeHero.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import bgImage from "../assets/luxury-bg.jpg";
import fossil from "../assets/fossil.jpg";
import omega from "../assets/omega.jpg";
import reitling from "../assets/Reitling.jpg";

export default function HomeHero() {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTrigger((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  const images = [
    { src: fossil, alt: "Fossil" },
    { src: omega, alt: "Omega" },
    { src: reitling, alt: "Reitling" },
  ];

  return (
    // ✅ Added pt-20 to compensate for fixed navbar height
    <section className="relative flex flex-col items-center justify-center h-[100vh] overflow-hidden bg-gradient-to-br from-purple-900 via-black to-purple-700 pt-20">
      {/* Background */}
      <img
        src={bgImage}
        alt="Luxury Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-purple-900/30 to-black/70" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 text-center px-4 sm:px-6 mt-32 sm:mt-40 mb-32 sm:mb-24"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-[0_4px_8px_rgba(255,215,0,0.4)] leading-tight">
          Premium Timepieces
        </h1>
        <p className="mt-3 text-base sm:text-lg md:text-xl text-white/90 max-w-md sm:max-w-2xl mx-auto">
          Crafted to perfection — elegance that defines you.
        </p>
      </motion.div>

      {/* ✅ Falling Images (Centered + Visible on all screens) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        {images.map((img, i) => (
          <motion.img
            key={`${img.alt}-${trigger}-${i}`}
            src={img.src}
            alt={img.alt}
            initial={{ opacity: 0, y: -200 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-200, 200, 450, 750],
            }}
            transition={{
              delay: i * 2.5,
              duration: 9,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="w-32 sm:w-44 md:w-56 lg:w-60 rounded-2xl object-cover shadow-2xl border border-white/20 mb-4"
          />
        ))}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute bottom-24 sm:bottom-20 z-30 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 sm:px-10 py-6 sm:py-8 shadow-2xl text-center max-w-[90%] sm:max-w-xl"
      >
        <p className="text-white/90 text-sm sm:text-base md:text-lg font-light leading-relaxed">
          Discover exclusive collections from{" "}
          <span className="text-yellow-300 font-semibold">Fossil</span>,{" "}
          <span className="text-yellow-300 font-semibold">Omega</span>, and{" "}
          <span className="text-yellow-300 font-semibold">Breitling</span>.
        </p>
      </motion.div>

      {/* Shop Now Button */}
      <Link
        to="/shop"
        className="absolute bottom-6 left-1/2 sm:left-8 transform -translate-x-1/2 sm:translate-x-0 z-40 bg-purple-600/80 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:bg-purple-700 transition text-sm sm:text-base"
      >
        Shop Now
      </Link>
    </section>
  );
}
