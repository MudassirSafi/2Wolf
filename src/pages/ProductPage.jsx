// ✅ src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sampleProducts from "../data/sampleProducts";
import { FaChevronLeft, FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = sampleProducts.find((p) => String(p.id) === String(id));
  const [active, setActive] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!product) navigate("/");
    const cart = JSON.parse(localStorage.getItem("muhi_cart") || "[]");
    setCartCount(cart.length);
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("muhi_cart") || "[]");
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("muhi_cart", JSON.stringify(cart));
    setCartCount(cart.length);
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.title} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2c0050] via-[#0a0a0a] to-[#240040] text-white font-sans">
      <div className="container mx-auto py-16 px-4 md:px-8">
        {/* Back Button */}
<div className="pt-8"> 
  <button
    onClick={() => navigate(-1)}
    className="mb-10 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition shadow-sm backdrop-blur-sm"
  >
    <FaChevronLeft className="text-yellow-300" /> Back
  </button>
</div>


        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={product.images[active]}
                alt={`${product.title} image ${active + 1}`}
                className="w-full h-[450px] object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-5 justify-center md:justify-start flex-wrap">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`w-24 h-16 rounded-xl overflow-hidden border transition-transform ${
                    idx === active
                      ? "border-yellow-400 ring-2 ring-yellow-300 scale-105"
                      : "border-white/20 hover:border-yellow-200"
                  }`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
              {product.title}
            </h1>

            <p className="text-white/80 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <div className="text-3xl font-bold text-yellow-200">${product.price}</div>
              {product.discount > 0 && (
                <div className="bg-yellow-300 text-black px-3 py-1 rounded-lg font-semibold text-sm">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Buttons */}
         <div className="flex gap-4 mt-8">
         <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={handleAddToCart}
           className="bg-purple-600/80 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition text-sm sm:text-base inline-flex items-center gap-2"
          >
          <FaCartPlus /> Add to Cart
         </motion.button>


              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Buy now flow not implemented")}
                className="bg-transparent px-7 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Details List */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-lg font-semibold text-yellow-200 mb-2">
                Product Details
              </h4>
              <ul className="list-disc ml-5 text-white/70 space-y-1">
                <li>Premium handcrafted materials</li>
                <li>1-Year warranty on every piece</li>
                <li>Free worldwide shipping over $100</li>
                <li>Luxury packaging included</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
