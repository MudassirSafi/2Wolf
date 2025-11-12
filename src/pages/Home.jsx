// ✅ src/pages/Home.jsx
import React, { useState } from "react";
import HomeHero from "../components/HomeHero";
import ProductCard from "../components/ProductCard";
import sampleProducts from "../data/sampleProducts";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  const total = sampleProducts.length;
  const visible = 3;
  const [startIdx, setStartIdx] = useState(0);

  const prev = () => setStartIdx((s) => (s - visible + total) % total);
  const next = () => setStartIdx((s) => (s + visible) % total);

  const getVisibleProducts = () => {
    const out = [];
    for (let i = 0; i < visible; i++) {
      out.push(sampleProducts[(startIdx + i) % total]);
    }
    return out;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F8F5F0] to-[#F3EFEA] text-[#0A0A0A] font-sans pt-5">
    <HomeHero /> 

      <section className="container mx-auto py-16 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#B8860B] tracking-wide">
            New Products
          </h2>
          <p className="text-sm text-gray-600">
            Latest arrivals — curated for you
          </p>
        </div>

        <div className="relative">
          {/* ✅ Carousel viewport */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              initial={false}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              {getVisibleProducts().map((p) => (
                <div key={p.id} className="w-full sm:w-[32%]">
                  <ProductCard product={p} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* PREV BUTTON — SHARP */}
<button
  onClick={prev}
  className="absolute left-4 top-1/2 -translate-y-1/2 
             bg-white/95 backdrop-blur-sm 
             p-4 rounded-full shadow-2xl border-2 border-gray-200 
             hover:bg-white hover:shadow-amber-400/50 
             hover:scale-110 hover:border-amber-500 
             transition-all duration-300 z-10"
>
  <FaChevronLeft className="text-gray-800 text-xl" />
</button>

{/* NEXT BUTTON — SHARP */}
<button
  onClick={next}
  className="absolute right-4 top-1/2 -translate-y-1/2 
             bg-white/95 backdrop-blur-sm 
             p-4 rounded-full shadow-2xl border-2 border-gray-200 
             hover:bg-white hover:shadow-amber-400/50 
             hover:scale-110 hover:border-amber-500 
             transition-all duration-300 z-10"
>
  <FaChevronRight className="text-gray-800 text-xl" />
</button>
        </div>

        {/* ✅ Elegant pager dots */}
        <div className="flex items-center gap-3 justify-center mt-10">
          {sampleProducts.map((_, idx) => {
            const active =
              idx >= startIdx && idx < startIdx + visible
                ? true
                : startIdx + visible > total &&
                  (idx < (startIdx + visible) % total || idx >= startIdx);
            return (
              <button
                key={idx}
                onClick={() => setStartIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-[#FFD700] to-[#B8860B] shadow-[0_0_8px_#FFD700]"
                    : "bg-gray-400/50 hover:bg-gray-500/70"
                }`}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
