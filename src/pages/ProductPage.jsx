// src/pages/ProductPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaChevronLeft, FaShoppingCart, FaStar, FaCheck, FaTruck, FaShieldAlt } from "react-icons/fa";
import ProductReviews from '../components/ProductReviews';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();

        if (data.product) {
          setProduct(data.product);
          fetchRelatedProducts(data.product.category);
        } else {
          setError(data.message || "Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const fetchRelatedProducts = async (category) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products?category=${category}&limit=10`);
      const data = await res.json();
      setRelatedProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch related products");
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Please sign in to add items to cart");
      navigate("/signin");
      return;
    }
    addToCart(product, quantity);
    alert(`${quantity} x ${product.name} added to cart!`);
  };

  const convertToAED = (usdPrice) => {
    return (usdPrice * 3.67).toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Product Not Found</h1>
        <button onClick={() => navigate("/")} className="bg-orange-500 text-white px-8 py-3 rounded-lg">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:text-orange-600 flex items-center gap-2">
            <FaChevronLeft size={12} /> Back to results
          </button>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Images - Sticky */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-4">
              {/* Bestseller Badge */}
              {product.bestSeller && (
                <div className="mb-3">
                  <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded">
                    Best Seller
                  </span>
                </div>
              )}

              {/* Main Image */}
              <div className="bg-white border rounded-lg p-8 mb-4">
                <img
                  src={product.images?.[activeImage] || "https://via.placeholder.com/500"}
                  alt={product.name}
                  className="w-full h-[400px] object-contain"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 border-2 rounded ${
                      idx === activeImage ? "border-orange-500" : "border-gray-300"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle: Product Details - Scrollable */}
          <div className="lg:col-span-5">
            <h1 className="text-2xl font-normal text-gray-900 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < 4 ? "text-orange-400" : "text-gray-300"} size={18} />
                ))}
              </div>
              <span className="text-blue-600 text-sm hover:text-orange-600 cursor-pointer">
                4.5 (125 ratings)
              </span>
            </div>

            <div className="border-t border-b py-3 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-3xl font-normal text-red-700">
                  AED {convertToAED(product.price)}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">All prices include VAT.</p>
            </div>

            {/* Product Description */}
            <div className="mb-6">
              <h2 className="font-bold text-lg mb-3">About this item</h2>
              <ul className="space-y-2">
                {product.description?.split('.').filter(d => d.trim()).slice(0, 5).map((desc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <FaCheck className="text-green-600 mt-1 flex-shrink-0" size={14} />
                    <span>{desc.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Details Table */}
            <div className="border rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-3">Product details</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-semibold text-gray-700">Brand</td>
                    <td className="py-2">{product.brand || "2Wolf"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold text-gray-700">Category</td>
                    <td className="py-2">{product.category || "General"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold text-gray-700">Stock</td>
                    <td className="py-2 text-green-600 font-semibold">
                      {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-gray-700">SKU</td>
                    <td className="py-2">{product._id?.slice(-8) || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Buy Box - Sticky */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-4 lg:sticky lg:top-4">
              <div className="mb-4">
                <span className="text-3xl font-normal text-red-700">
                  AED {convertToAED(product.price)}
                </span>
                <p className="text-xs text-gray-600 mt-1">All prices include VAT.</p>
              </div>

              {/* Delivery Info */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-start gap-2">
                  <FaTruck className="text-teal-600 mt-1" />
                  <div>
                    <p className="font-semibold text-teal-600">FREE Delivery</p>
                    <p className="text-xs text-gray-600">Tomorrow, Dec 9</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FaShieldAlt className="text-blue-600 mt-1" />
                  <p className="text-xs">Secure transaction</p>
                </div>
              </div>

              {product.stock > 0 ? (
                <>
                  <p className="text-green-700 font-semibold text-lg mb-3">In Stock</p>
                  
                  {/* Quantity Selector */}
                  <div className="mb-4">
                    <label className="text-sm font-semibold mb-2 block">Quantity:</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 hover:bg-gray-100"
                    >
                      {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-full mb-2 transition"
                  >
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition"
                  >
                    Buy Now
                  </button>
                </>
              ) : (
                <p className="text-red-600 font-semibold">Currently unavailable</p>
              )}

              <div className="mt-4 text-xs text-gray-600 space-y-1">
                <p>Ships from and sold by 2Wolf.ae</p>
                <p className="text-blue-600 cursor-pointer hover:text-orange-600">Secure transaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 border-t pt-8">
          <ProductReviews productId={product._id} />
        </div>

        {/* Related Products */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Related products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.slice(0, 5).map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/200"}
                  alt={item.name}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="text-sm font-normal line-clamp-2 mb-2">{item.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-orange-400" size={12} />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">(45)</span>
                </div>
                <p className="text-lg font-normal text-red-700">
                  AED {convertToAED(item.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to convert USD to AED
function convertToAED(usdPrice) {
  return (usdPrice * 3.67).toFixed(2);
}