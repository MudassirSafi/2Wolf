// src/pages/ProductDetail.jsx - FULLY FIXED VERSION
import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import ProductReviews from "../components/ProductReviews";
import { 
  FaStar, FaHeart, FaShare, FaTruck, FaShieldAlt, FaUndo, 
  FaCheck, FaTimes, FaChevronDown, FaChevronUp, FaFire,
  FaBox, FaClock, FaAward, FaMapMarkerAlt, FaPlay
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const reviewsRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    features: true,
    specs: true
  });

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`);
      const data = await response.json();
      
      console.log('📦 Raw API Response:', data);
      console.log('📦 Product data:', data.product);
      
      if (data.success && data.product) {
        // ✅ CRITICAL: Ensure arrays are actually arrays
        const cleanedProduct = {
          ...data.product,
          features: Array.isArray(data.product.features) ? data.product.features : [],
          productDetails: Array.isArray(data.product.productDetails) ? data.product.productDetails : [],
          videos: Array.isArray(data.product.videos) ? data.product.videos : [],
          colors: Array.isArray(data.product.colors) ? data.product.colors : [],
          variants: Array.isArray(data.product.variants) ? data.product.variants : [],
        };
        
        console.log('✅ Cleaned Product Features:', cleanedProduct.features);
        console.log('✅ Cleaned Product Details:', cleanedProduct.productDetails);
        console.log('✅ Features count:', cleanedProduct.features.length);
        console.log('✅ ProductDetails count:', cleanedProduct.productDetails.length);
        
        setProduct(cleanedProduct);
        
        if (cleanedProduct.colors?.length > 0) {
          setSelectedColor(cleanedProduct.colors[0]);
        }
      }
    } catch (error) {
      console.error("❌ Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      ...product,
      quantity,
      selectedColor: selectedColor?.name,
      selectedVariant: selectedVariant?.name
    });
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.find(item => item._id === product._id)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      localStorage.setItem('wishlistCount', wishlist.length.toString());
      window.dispatchEvent(new Event('storage'));
    }
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const calculateFinalPrice = () => {
    let price = product.price;
    if (product.discount > 0) {
      price = price - (price * product.discount / 100);
    }
    if (selectedVariant?.priceAdjustment) {
      price += selectedVariant.priceAdjustment;
    }
    return price.toFixed(2);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
        size={12}
      />
    ));
  };

  // ✅ FIXED: Properly collect ALL specifications including productDetails
  const getAllSpecifications = () => {
    if (!product) {
      console.log('❌ getAllSpecifications: No product');
      return [];
    }
    
    console.log('🔍 getAllSpecifications called');
    console.log('  - product.productDetails type:', typeof product.productDetails);
    console.log('  - product.productDetails isArray:', Array.isArray(product.productDetails));
    console.log('  - product.productDetails:', product.productDetails);
    
    const specs = [];
    
    // Basic Info
    if (product.brand) specs.push({ label: "Brand", value: product.brand });
    if (product.modelNumber) specs.push({ label: "Model Number", value: product.modelNumber });
    if (product.sku) specs.push({ label: "SKU", value: product.sku });
    if (product.department) specs.push({ label: "Department", value: product.department });
    
    // Physical Properties
    if (product.material) specs.push({ label: "Material", value: product.material });
    if (product.color) specs.push({ label: "Colour", value: product.color });
    if (product.size) specs.push({ label: "Size", value: product.size });
    if (product.weight) specs.push({ label: "Weight", value: product.weight });
    if (product.dimensions) specs.push({ label: "Dimensions", value: product.dimensions });
    if (product.warranty) specs.push({ label: "Warranty", value: product.warranty });
    if (product.gender) specs.push({ label: "Gender", value: product.gender });
    
    // Electronics Specific
    if (product.processor) specs.push({ label: "Processor", value: product.processor });
    if (product.ram) specs.push({ label: "RAM", value: product.ram });
    if (product.storage) specs.push({ label: "Storage", value: product.storage });
    if (product.screenSize) specs.push({ label: "Screen Size", value: product.screenSize });
    if (product.powerWattage) specs.push({ label: "Wattage", value: product.powerWattage });
    if (product.voltage) specs.push({ label: "Voltage", value: product.voltage });
    
    // Watch Specific
    if (product.movement) specs.push({ label: "Movement", value: product.movement });
    if (product.bandMaterial) specs.push({ label: "Band Material", value: product.bandMaterial });
    if (product.caseStyle) specs.push({ label: "Case Style", value: product.caseStyle });
    if (product.waterResistance) specs.push({ label: "Water Resistance", value: product.waterResistance });
    
    // Clothing Specific
    if (product.fit) specs.push({ label: "Fit", value: product.fit });
    if (product.pattern) specs.push({ label: "Pattern", value: product.pattern });
    if (product.heelType) specs.push({ label: "Heel Type", value: product.heelType });
    if (product.closureType) specs.push({ label: "Closure Type", value: product.closureType });
    
    // Kitchen/Appliance Specific
    if (product.capacity) specs.push({ label: "Capacity", value: product.capacity });
    
    console.log('  - Basic specs count:', specs.length);
    
    // ✅ CRITICAL FIX: Add productDetails array items
    if (product.productDetails && Array.isArray(product.productDetails)) {
      console.log('  - Processing productDetails array, length:', product.productDetails.length);
      product.productDetails.forEach((detail, idx) => {
        console.log(`    - Detail ${idx}:`, detail);
        if (detail && typeof detail === 'object' && detail.label && detail.value) {
          specs.push({ label: detail.label, value: detail.value });
          console.log(`      ✅ Added: ${detail.label} = ${detail.value}`);
        } else {
          console.log(`      ❌ Skipped invalid detail:`, detail);
        }
      });
    } else {
      console.log('  ❌ productDetails is not an array or doesn\'t exist');
    }
    
    console.log('  - Final specs count:', specs.length);
    console.log('  - Final specs:', specs);
    
    return specs;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const allSpecs = getAllSpecifications();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile: Breadcrumb */}
      <div className="bg-white border-b px-4 py-2 lg:hidden">
        <div className="flex items-center gap-1.5 text-xs text-gray-600 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigate('/')} className="hover:text-orange-600">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-orange-600">Shop</button>
          <span>/</span>
          <span className="text-gray-900 truncate">{product.category}</span>
        </div>
      </div>

      {/* Mobile: Image & Video Gallery */}
      <div className="bg-white p-3 lg:hidden">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {product.bestSeller && (
            <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
              <FaAward size={8} /> Best Seller
            </span>
          )}
          {product.sellingFast && (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
            >
              <FaFire size={8} /> Selling Fast!
            </motion.span>
          )}
          {product.lowestPrice && (
            <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
              Lowest Price
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Main Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
          <img
            src={product.images?.[selectedImage] || 'https://via.placeholder.com/600'}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Image Thumbnails */}
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {product.images?.map((img, idx) => (
            <button
              key={`img-${idx}`}
              onClick={() => setSelectedImage(idx)}
              className={`flex-shrink-0 w-14 h-14 bg-gray-100 rounded-md overflow-hidden border-2 ${
                selectedImage === idx ? 'border-orange-500' : 'border-transparent'
              }`}
            >
              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>

        {/* Video Thumbnails */}
        {product.videos && product.videos.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-semibold text-gray-700 mb-1.5">Product Videos</p>
            <div className="flex gap-1.5 overflow-x-auto pb-2">
              {product.videos.map((video, idx) => (
                <button
                  key={`video-${idx}`}
                  onClick={() => setPlayingVideo(idx)}
                  className="flex-shrink-0 w-20 h-14 bg-gray-900 rounded-md overflow-hidden relative"
                >
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt={video.title || `Video ${idx + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaPlay className="text-white" size={16} />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <FaPlay className="text-white" size={14} />
                  </div>
                  {video.duration && (
                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-[9px] px-1 rounded">
                      {video.duration}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {playingVideo !== null && product.videos?.[playingVideo] && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl">
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute -top-10 right-0 text-white text-xl font-bold"
              >
                ✕
              </button>
              <video
                controls
                autoPlay
                className="w-full rounded-lg"
                src={product.videos[playingVideo].url}
              >
                Your browser does not support video playback.
              </video>
              {product.videos[playingVideo].title && (
                <p className="text-white text-sm mt-2">{product.videos[playingVideo].title}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Product Info */}
      <div className="bg-white mt-2 p-3 lg:hidden">
        {/* Brand */}
        {product.brand && (
          <button
            onClick={() => navigate(`/shop?brand=${product.brand}`)}
            className="text-xs text-orange-600 hover:underline mb-1.5 block"
          >
            Visit the {product.brand} Store
          </button>
        )}

        {/* Title */}
        <h1 className="text-base font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>

        {/* Rating & Reviews */}
        <button 
          onClick={scrollToReviews}
          className="flex items-center gap-2 mb-2 hover:opacity-70 transition-opacity"
        >
          <div className="flex items-center gap-1">
            {renderStars(product.rating || 0)}
            <span className="text-xs font-semibold text-gray-700 ml-1">
              {product.rating || 0}
            </span>
          </div>
          <span className="text-xs text-blue-600 hover:underline">
            {product.reviewCount || 0} ratings
          </span>
        </button>

        {/* Recently Sold */}
        {product.showRecentlySold && product.recentlySoldCount > 0 && (
          <div className="flex items-center gap-1 text-[10px] text-gray-600 mb-2">
            <FaClock className="text-orange-500" size={10} />
            <span>{product.recentlySoldCount}+ bought in past month</span>
          </div>
        )}

        {/* Price Section with Animated Badges */}
        <div className="border-t border-b py-2.5 my-2">
          {product.discount > 0 ? (
            <>
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-xs text-red-600 font-semibold">-{product.discount}%</span>
                <span className="text-xl font-bold text-red-600">AED {calculateFinalPrice()}</span>
              </div>
              <div className="text-xs text-gray-600">
                List Price: <span className="line-through">AED {product.price.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">AED {product.price.toFixed(2)}</span>
          )}
          
          {/* ✅ NEW: Animated Sliding Badges */}
          {(() => {
            const badges = [];
            
            if (product.bestSeller) {
              badges.push({ text: '#1 Best Seller', color: '#D97706', icon: 'award' });
            }
            if (product.stock > 0 && product.stock < 10) {
              badges.push({ text: `Only ${product.stock} left in stock`, color: '#DC2626', icon: 'box' });
            }
            if (product.showRecentlySold && product.recentlySoldCount > 0) {
              badges.push({ text: `${product.recentlySoldCount}+ sold recently`, color: '#F59E0B', icon: 'clock' });
            }
            if (product.sellingFast) {
              badges.push({ text: 'Selling Fast!', color: '#EF4444', icon: 'fire' });
            }
            if (product.freeDelivery) {
              badges.push({ text: 'FREE Delivery', color: '#059669', icon: 'truck' });
            }
            if (product.lowestPrice) {
              badges.push({ text: 'Lowest Price', color: '#059669', icon: 'trending' });
            }
            
            const getIcon = (iconName) => {
              switch(iconName) {
                case 'award': return <FaAward size={11} />;
                case 'box': return <FaBox size={11} />;
                case 'clock': return <FaClock size={11} />;
                case 'fire': return <FaFire size={11} />;
                case 'truck': return <FaTruck size={11} />;
                case 'trending': return <FaAward size={11} />;
                default: return <FaCheck size={11} />;
              }
            };
            
            return badges.length > 0 ? (
              <div className="relative h-6 overflow-hidden bg-gradient-to-r from-amber-50 to-transparent rounded-md px-2 mt-2">
                <motion.div
                  className="flex flex-col"
                  animate={{ 
                    y: badges.length > 1 ? [0, -(badges.length * 24)] : 0 
                  }}
                  transition={{
                    duration: badges.length * 3,
                    repeat: badges.length > 1 ? Infinity : 0,
                    ease: "linear",
                    repeatDelay: 0.5
                  }}
                >
                  {(badges.length > 1 ? [...badges, ...badges] : badges).map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 h-6 whitespace-nowrap"
                    >
                      <span style={{ color: badge.color }}>
                        {getIcon(badge.icon)}
                      </span>
                      <span 
                        className="text-xs font-semibold"
                        style={{ color: badge.color }}
                      >
                        {badge.text}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            ) : null;
          })()}
        </div>

        {/* ✅ FIXED: Prominent Stock Status with Animation */}
        <div className="mb-2.5">
          {product.stock > 0 ? (
            <div>
              <p className="text-green-600 font-semibold text-xs flex items-center gap-1.5">
                <FaCheck size={11} /> In Stock
              </p>
              {product.stock < 10 && (
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xs text-red-600 mt-1 font-semibold bg-red-50 px-2 py-1 rounded-md inline-block"
                >
                  Only {product.stock} left in stock - order soon!
                </motion.p>
              )}
            </div>
          ) : (
            <p className="text-red-600 font-semibold text-xs flex items-center gap-1.5">
              <FaTimes size={11} /> Out of Stock
            </p>
          )}
        </div>

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-1.5">
              Color: <span className="font-normal">{selectedColor?.name}</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-md border-2 overflow-hidden ${
                    selectedColor?.name === color.name ? 'border-orange-500 ring-2 ring-orange-300' : 'border-gray-300'
                  }`}
                >
                  {color.image ? (
                    <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ backgroundColor: color.name.toLowerCase() }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-1.5">
              {product.variants[0].name}: <span className="font-normal">{selectedVariant?.value || 'Select'}</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-2.5 py-1.5 rounded-md border-2 text-xs font-medium ${
                    selectedVariant?.value === variant.value
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {variant.value}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Quantity:</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 text-sm"
          >
            {[...Array(Math.min(10, product.stock || 10))].map((_, i) => (
              <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mb-3">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Add to Cart
          </button>

          <button
            onClick={() => {
              handleAddToCart();
              navigate('/cart');
            }}
            disabled={product.stock === 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Buy Now
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToWishlist}
              className="flex items-center justify-center gap-1.5 px-3 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-xs"
            >
              <FaHeart className="text-red-500" size={12} /> Wishlist
            </button>
            <button className="flex items-center justify-center gap-1.5 px-3 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-xs">
              <FaShare size={12} /> Share
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t pt-3 space-y-1.5 text-xs text-gray-700">
          <div className="flex items-center gap-1.5">
            <FaShieldAlt className="text-green-500" size={12} />
            <span>Secure transaction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaTruck className="text-blue-500" size={12} />
            <span>Ships from 2Wolf</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaUndo className="text-orange-500" size={12} />
            <span>30-day return policy</span>
          </div>
        </div>
      </div>

      {/* ✅ FIXED: About This Item - Always show, even if empty */}
      <div className="bg-white mt-2 p-3 lg:hidden">
        <button
          onClick={() => toggleSection('features')}
          className="w-full flex items-center justify-between mb-2"
        >
          <h2 className="text-sm font-bold text-gray-900">About this item</h2>
          {expandedSections.features ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>

        {expandedSections.features && (
          <div>
            {product.features && product.features.length > 0 ? (
              <ul className="space-y-1.5">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-1.5 text-xs text-gray-700 leading-relaxed">
                    <FaCheck className="text-green-500 mt-0.5 shrink-0" size={10} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500 italic">No features listed for this product.</p>
            )}
          </div>
        )}
      </div>

      {/* ✅ FIXED: Product Description - Always show */}
      <div className="bg-white mt-2 p-3 lg:hidden">
        <h2 className="text-sm font-bold text-gray-900 mb-2">Product Description</h2>
        {product.description ? (
          <>
            <p className={`text-xs text-gray-700 leading-relaxed whitespace-pre-line ${showFullDescription ? '' : 'line-clamp-4'}`}>
              {product.description}
            </p>
            {product.description.length > 200 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-xs text-blue-600 hover:underline mt-1.5 font-semibold"
              >
                {showFullDescription ? 'Show less' : 'Read more'}
              </button>
            )}
          </>
        ) : (
          <p className="text-xs text-gray-500 italic">No description available.</p>
        )}
      </div>

      {/* ✅ FIXED: Technical Details - Always show */}
      <div className="bg-white mt-2 p-3 lg:hidden">
        <button
          onClick={() => toggleSection('details')}
          className="w-full flex items-center justify-between mb-2"
        >
          <h2 className="text-sm font-bold text-gray-900">Technical Details</h2>
          {expandedSections.details ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>

        {expandedSections.details && (
          <div>
            {allSpecs.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {allSpecs.map((spec, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-2.5 text-[10px] font-semibold text-gray-700 w-2/5">
                          {spec.label}
                        </td>
                        <td className="py-2 px-2.5 text-[10px] text-gray-900">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">No technical specifications available.</p>
            )}
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="bg-white mt-2 p-3 lg:hidden">
        <h3 className="text-sm font-bold text-gray-900 mb-2">Product Information</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-semibold text-gray-900">{product.category}</span>
          </div>
          {product.subCategory && (
            <div className="flex justify-between">
              <span className="text-gray-600">Subcategory:</span>
              <span className="font-semibold text-gray-900">{product.subCategory}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Availability:</span>
            <span className="font-semibold text-gray-900">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          {product.createdAt && (
            <div className="flex justify-between">
              <span className="text-gray-600">Date First Available:</span>
              <span className="font-semibold text-gray-900">
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div ref={reviewsRef} className="bg-white mt-2 p-4 lg:hidden">
        <ProductReviews productId={id} />
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Images */}
          <div className="col-span-5">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.bestSeller && (
                  <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    <FaAward size={10} /> Best Seller
                  </span>
                )}
                {product.sellingFast && (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1"
                  >
                    <FaFire size={10} /> Selling Fast!
                  </motion.span>
                )}
              </div>
              
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images?.[selectedImage] || 'https://via.placeholder.com/600'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="grid grid-cols-6 gap-2 mb-3">
                {product.images?.map((img, idx) => (
                  <button
                    key={`img-${idx}`}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-orange-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {product.videos && product.videos.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Product Videos</p>
                  <div className="grid grid-cols-4 gap-2">
                    {product.videos.map((video, idx) => (
                      <button
                        key={`video-${idx}`}
                        onClick={() => setPlayingVideo(idx)}
                        className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative hover:opacity-80 transition-opacity"
                      >
                        {video.thumbnail ? (
                          <img src={video.thumbnail} alt={video.title || `Video ${idx + 1}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaPlay className="text-white" size={20} />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <FaPlay className="text-white" size={16} />
                        </div>
                        {video.duration && (
                          <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-[10px] px-1 rounded">
                            {video.duration}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Middle: Info */}
          <div className="col-span-4">
            <div className="bg-white rounded-lg p-6">
              {product.brand && (
                <button
                  onClick={() => navigate(`/shop?brand=${product.brand}`)}
                  className="text-sm text-orange-600 hover:underline mb-2 block"
                >
                  Visit the {product.brand} Store
                </button>
              )}
              <h1 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
              
              <button 
                onClick={scrollToReviews}
                className="flex items-center gap-3 mb-4 hover:opacity-70 transition-opacity"
              >
                <div className="flex items-center gap-1">
                  {renderStars(product.rating || 0)}
                  <span className="text-sm font-semibold text-gray-700 ml-2">
                    {product.rating || 0}
                  </span>
                </div>
                <span className="text-sm text-blue-600 hover:underline">
                  {product.reviewCount || 0} ratings
                </span>
              </button>

              {product.showRecentlySold && product.recentlySoldCount > 0 && (
                <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                  <FaClock className="text-orange-500" size={12} />
                  {product.recentlySoldCount}+ bought in past month
                </p>
              )}

              <div className="border-t border-b py-4 mb-4">
                {product.discount > 0 ? (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-red-600 font-semibold">-{product.discount}%</span>
                      <span className="text-2xl font-bold text-red-600">AED {calculateFinalPrice()}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      List Price: <span className="line-through">AED {product.price.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">AED {product.price.toFixed(2)}</span>
                )}
                
                {/* ✅ Desktop: Animated Sliding Badges */}
                {(() => {
                  const badges = [];
                  
                  if (product.bestSeller) {
                    badges.push({ text: '#1 Best Seller', color: '#D97706', icon: 'award' });
                  }
                  if (product.stock > 0 && product.stock < 10) {
                    badges.push({ text: `Only ${product.stock} left in stock`, color: '#DC2626', icon: 'box' });
                  }
                  if (product.showRecentlySold && product.recentlySoldCount > 0) {
                    badges.push({ text: `${product.recentlySoldCount}+ sold recently`, color: '#F59E0B', icon: 'clock' });
                  }
                  if (product.sellingFast) {
                    badges.push({ text: 'Selling Fast!', color: '#EF4444', icon: 'fire' });
                  }
                  if (product.freeDelivery) {
                    badges.push({ text: 'FREE Delivery', color: '#059669', icon: 'truck' });
                  }
                  if (product.lowestPrice) {
                    badges.push({ text: 'Lowest Price', color: '#059669', icon: 'trending' });
                  }
                  
                  const getIcon = (iconName) => {
                    switch(iconName) {
                      case 'award': return <FaAward size={12} />;
                      case 'box': return <FaBox size={12} />;
                      case 'clock': return <FaClock size={12} />;
                      case 'fire': return <FaFire size={12} />;
                      case 'truck': return <FaTruck size={12} />;
                      case 'trending': return <FaAward size={12} />;
                      default: return <FaCheck size={12} />;
                    }
                  };
                  
                  return badges.length > 0 ? (
                    <div className="relative h-7 overflow-hidden bg-gradient-to-r from-amber-50 to-transparent rounded-md px-3 mt-3">
                      <motion.div
                        className="flex flex-col"
                        animate={{ 
                          y: badges.length > 1 ? [0, -(badges.length * 28)] : 0 
                        }}
                        transition={{
                          duration: badges.length * 3,
                          repeat: badges.length > 1 ? Infinity : 0,
                          ease: "linear",
                          repeatDelay: 0.5
                        }}
                      >
                        {(badges.length > 1 ? [...badges, ...badges] : badges).map((badge, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 h-7 whitespace-nowrap"
                          >
                            <span style={{ color: badge.color }}>
                              {getIcon(badge.icon)}
                            </span>
                            <span 
                              className="text-sm font-semibold"
                              style={{ color: badge.color }}
                            >
                              {badge.text}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Desktop: About This Item */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">About this item</h3>
                {product.features && product.features.length > 0 ? (
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                        <FaCheck className="text-green-500 mt-1 shrink-0" size={11} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">No features available</p>
                )}
              </div>

              {/* Desktop: Product Description */}
              {product.description && (
                <div className="mb-4 border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Product Description</h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Desktop: Specifications */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Technical Details</h3>
                {allSpecs.length > 0 ? (
                  <table className="w-full text-sm">
                    <tbody>
                      {allSpecs.map((spec, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2 font-semibold text-gray-700 w-1/3">{spec.label}</td>
                          <td className="py-2 text-gray-900">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-sm text-gray-500 italic">No specifications available</p>
                )}
              </div>
            </div>

            {/* Desktop Reviews */}
            <div ref={reviewsRef} className="bg-white rounded-lg p-6 mt-6">
              <ProductReviews productId={id} />
            </div>
          </div>

          {/* Right: Buy Box */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sticky top-4">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                AED {calculateFinalPrice()}
              </div>
              
              {product.discount > 0 && (
                <div className="text-sm text-gray-500 line-through mb-4">
                  List: AED {product.price.toFixed(2)}
                </div>
              )}

              {/* ✅ Desktop Buy Box: Animated Sliding Badges */}
              {(() => {
                const badges = [];
                
                if (product.bestSeller) {
                  badges.push({ text: '#1 Best Seller', color: '#D97706', icon: 'award' });
                }
                if (product.stock > 0 && product.stock < 10) {
                  badges.push({ text: `Only ${product.stock} left in stock`, color: '#DC2626', icon: 'box' });
                }
                if (product.showRecentlySold && product.recentlySoldCount > 0) {
                  badges.push({ text: `${product.recentlySoldCount}+ bought in past month`, color: '#F59E0B', icon: 'clock' });
                }
                if (product.sellingFast) {
                  badges.push({ text: 'Selling Fast!', color: '#EF4444', icon: 'fire' });
                }
                if (product.freeDelivery) {
                  badges.push({ text: 'FREE Delivery', color: '#059669', icon: 'truck' });
                }
                if (product.lowestPrice) {
                  badges.push({ text: 'Lowest Price', color: '#059669', icon: 'trending' });
                }
                
                const getIcon = (iconName) => {
                  switch(iconName) {
                    case 'award': return <FaAward size={13} />;
                    case 'box': return <FaBox size={13} />;
                    case 'clock': return <FaClock size={13} />;
                    case 'fire': return <FaFire size={13} />;
                    case 'truck': return <FaTruck size={13} />;
                    case 'trending': return <FaAward size={13} />;
                    default: return <FaCheck size={13} />;
                  }
                };
                
                return badges.length > 0 ? (
                  <div className="relative h-8 overflow-hidden bg-gradient-to-r from-amber-50 to-transparent rounded-lg px-3 mb-4">
                    <motion.div
                      className="flex flex-col"
                      animate={{ 
                        y: badges.length > 1 ? [0, -(badges.length * 32)] : 0 
                      }}
                      transition={{
                        duration: badges.length * 3.5,
                        repeat: badges.length > 1 ? Infinity : 0,
                        ease: "linear",
                        repeatDelay: 0.5
                      }}
                    >
                      {(badges.length > 1 ? [...badges, ...badges] : badges).map((badge, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 h-8 whitespace-nowrap"
                        >
                          <span style={{ color: badge.color }}>
                            {getIcon(badge.icon)}
                          </span>
                          <span 
                            className="text-sm font-semibold"
                            style={{ color: badge.color }}
                          >
                            {badge.text}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                ) : null;
              })()}

              <div className="mb-4">
                {product.stock > 0 ? (
                  <div>
                    <p className="text-green-600 font-semibold text-sm flex items-center gap-2">
                      <FaCheck size={12} /> In Stock
                    </p>
                  </div>
                ) : (
                  <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
                    <FaTimes size={12} /> Out of Stock
                  </p>
                )}
              </div>

              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Color: {selectedColor?.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 overflow-hidden ${
                          selectedColor?.name === color.name ? 'border-orange-500 ring-2 ring-orange-300' : 'border-gray-300'
                        }`}
                      >
                        {color.image ? (
                          <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full" style={{ backgroundColor: color.name.toLowerCase() }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.variants && product.variants.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {product.variants[0].name}: {selectedVariant?.value || 'Select'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-2 rounded-lg border-2 text-sm font-medium ${
                          selectedVariant?.value === variant.value
                            ? 'border-orange-500 bg-orange-50 text-orange-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {variant.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  {[...Array(Math.min(10, product.stock || 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 text-sm rounded-lg transition disabled:opacity-50 mb-3"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                disabled={product.stock === 0}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 text-sm rounded-lg transition disabled:opacity-50 mb-4"
              >
                Buy Now
              </button>

              <div className="mt-6 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-green-500" size={14} />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTruck className="text-blue-500" size={14} />
                  <span>Ships from 2Wolf</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUndo className="text-orange-500" size={14} />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
}