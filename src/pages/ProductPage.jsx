// src/pages/ProductPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaChevronLeft, FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();

        // ✅ YEH SABSE BADI FIX HAI
        if (data.product) {
          setProduct(data.product);
        } else {
          // Agar product nahi mila ya error aaya
          setError(data.message || "Product not found");
          setProduct(null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please sign in to add items to cart");
      navigate("/signin");
      return;
    }
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading product...</div>
      </div>
    );
  }

  // Error ya product nahi mila
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">{error || "The product you're looking for doesn't exist."}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#6E2A6E] text-white px-8 py-3 rounded-full hover:bg-[#5A215A] transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Success - Product mil gaya
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0A0A0A] font-sans">
      <div className="container mx-auto py-16 px-4 md:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-10 inline-flex items-center gap-2 bg-[#6E2A6E] text-white px-4 py-2 rounded-lg hover:bg-[#5A215A] transition shadow-md"
        >
          <FaChevronLeft /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <img
                src={product.images?.[active] || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="flex gap-3 mt-5 justify-center md:justify-start flex-wrap">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    idx === active
                      ? "border-[#6E2A6E] ring-4 ring-[#D4AF37]/30 scale-105"
                      : "border-gray-300 hover:border-[#6E2A6E]"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h1 className="text-4xl font-extrabold text-[#0A0A0A]">{product.name}</h1>
            <p className="text-gray-700 text-lg leading-relaxed">{product.description || "No description available."}</p>

            <div className="flex items-center gap-4">
              <div className="text-[32px] font-bold text-[#D4AF37]">
                ${Number(product.price).toFixed(2)}
              </div>
              {product.discount > 0 && (
                <div className="bg-red-600 text-white px-4 py-1 rounded-lg font-bold text-lg">
                  -{product.discount}%
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-[#6E2A6E] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#5A215A] transition flex items-center gap-2"
              >
                <FaCartPlus /> Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="border-2 border-[#6E2A6E] text-[#6E2A6E] px-7 py-3 rounded-xl hover:bg-[#6E2A6E] hover:text-white transition font-semibold"
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}