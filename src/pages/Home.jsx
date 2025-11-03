// src/pages/Home.jsx
import React, { useState } from "react";
import HomeHero from "../components/HomeHero";
import ProductCard from "../components/ProductCard";
import sampleProducts from "../data/sampleProducts";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  // track carousel offset in terms of index of first visible card
  const total = sampleProducts.length;
  const visible = 3;
  const [startIdx, setStartIdx] = useState(0);

  const prev = () => setStartIdx((s) => (s - visible + total) % total);
  const next = () => setStartIdx((s) => (s + visible) % total);

  // build ordered slice preserving wrapping
  const getVisibleProducts = () => {
    const out = [];
    for (let i = 0; i < visible; i++) {
      out.push(sampleProducts[(startIdx + i) % total]);
    }
    return out;
  };

  return (
    <main className="bg-gradient-to-b from-purple-900 via-black to-purple-800 min-h-screen pt-20">
  <HomeHero />

      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="h2-style text-2xl text-white font-bold">New Products</h2>
          <p className="text-sm text-white/70">Latest arrivals — curated for you</p>
        </div>

        <div className="relative">
          {/* Carousel viewport */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              initial={false}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              {/* Show the visible cards (3) */}
              {getVisibleProducts().map((p) => (
                <div key={p.id} className="w-full sm:w-[32%]">
                  <ProductCard product={p} />
                </div>
              ))}

              {/* Hidden (off-screen) cards left & right preview */}
            </motion.div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-105"
            aria-label="Previous products"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-105"
            aria-label="Next products"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* small pager showing all 5 with active */}
        <div className="flex items-center gap-2 justify-center mt-6">
          {sampleProducts.map((_, idx) => {
            const active = idx >= startIdx && idx < startIdx + visible
              ? true
              : // handle wrap
                (startIdx + visible > total &&
                  (idx < (startIdx + visible) % total || idx >= startIdx));
            return (
              <button
                key={idx}
                onClick={() => setStartIdx(idx)}
                className={`w-3 h-3 rounded-full ${active ? "bg-yellow-300" : "bg-white/30"}`}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
