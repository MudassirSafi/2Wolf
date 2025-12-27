// src/pages/ProductDetail.jsx - MOBILE FIRST COMPLETE VERSION
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { 
  FaStar, FaHeart, FaShare, FaTruck, FaShieldAlt, FaUndo, 
  FaCheck, FaTimes, FaChevronDown, FaChevronUp, FaFire,
  FaBox, FaClock, FaAward, FaMapMarkerAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    details: false,
    features: true,
    specs: false
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.product);
        if (data.product.colors?.length > 0) {
          setSelectedColor(data.product.colors[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
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
        className={i < Math.floor(rating) ? "text-orange-400" : "text-gray-300"}
        size={14}
      />
    ));
  };

  // Collect all specifications
  const getAllSpecifications = () => {
    if (!product) return [];
    
    const specs = [];
    
    // Basic Info
    if (product.brand) specs.push({ label: "Brand", value: product.brand });
    if (product.modelNumber) specs.push({ label: "Model Number", value: product.modelNumber });
    if (product.sku) specs.push({ label: "SKU", value: product.sku });
    if (product.department) specs.push({ label: "Department", value: product.department });
    
    // Physical Properties
    if (product.material) specs.push({ label: "Material", value: product.material });
    if (product.color) specs.push({ label: "Color", value: product.color });
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
    if (product.powerWattage) specs.push({ label: "Power", value: product.powerWattage });
    if (product.voltage) specs.push({ label: "Voltage", value: product.voltage });
    
    // Add custom product details
    if (product.productDetails && product.productDetails.length > 0) {
      specs.push(...product.productDetails);
    }
    
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
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
      <div className="bg-white border-b px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-gray-600 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigate('/')} className="hover:text-orange-600">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-orange-600">Shop</button>
          <span>/</span>
          <span className="text-gray-900 truncate">{product.category}</span>
        </div>
      </div>

      {/* Mobile: Image Gallery */}
      <div className="bg-white p-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.bestSeller && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
              <FaAward size={10} /> Best Seller
            </span>
          )}
          {product.sellingFast && (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1"
            >
              <FaFire size={10} /> Selling Fast!
            </motion.span>
          )}
          {product.lowestPrice && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              Lowest Price
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Main Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
          <img
            src={product.images[selectedImage] || 'https://via.placeholder.com/600'}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border-2 ${
                selectedImage === idx ? 'border-orange-500' : 'border-transparent'
              }`}
            >
              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: Product Info */}
      <div className="bg-white mt-2 p-4">
        {/* Brand */}
        <button
          onClick={() => navigate(`/shop?brand=${product.brand}`)}
          className="text-sm text-orange-600 hover:underline mb-2 block"
        >
          Visit the {product.brand} Store
        </button>

        {/* Title */}
        <h1 className="text-lg font-bold text-gray-900 mb-3">{product.name}</h1>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
            <span className="text-sm font-semibold text-gray-700 ml-1">
              {product.rating}
            </span>
          </div>
          <button className="text-xs text-blue-600 hover:underline">
            {product.reviewCount} ratings
          </button>
        </div>

        {/* Recently Sold */}
        {product.showRecentlySold && product.recentlySoldCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
            <FaClock className="text-orange-500" size={12} />
            <span>{product.recentlySoldCount}+ bought in past month</span>
          </div>
        )}

        {/* Price Section */}
        <div className="border-t border-b py-3 my-3">
          {product.discount > 0 ? (
            <>
              <div className="flex items-baseline gap-2 mb-1">
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
          
          {product.freeDelivery && (
            <div className="flex items-center gap-2 mt-2 text-sm text-blue-600 font-semibold">
              <FaTruck size={16} /> FREE delivery
            </div>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.stock > 0 ? (
            <p className="text-green-600 font-semibold text-sm flex items-center gap-2">
              <FaCheck size={14} /> In Stock
            </p>
          ) : (
            <p className="text-red-600 font-semibold text-sm flex items-center gap-2">
              <FaTimes size={14} /> Out of Stock
            </p>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <p className="text-xs text-red-600 mt-1">Only {product.stock} left - order soon!</p>
          )}
        </div>

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Color: <span className="font-normal">{selectedColor?.name}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden ${
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
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              {product.variants[0].name}: <span className="font-normal">{selectedVariant?.value || 'Select'}</span>
            </p>
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

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity:</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-base"
          >
            {[...Array(Math.min(10, product.stock))].map((_, i) => (
              <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Add to Cart
          </button>

          <button
            onClick={() => {
              handleAddToCart();
              navigate('/cart');
            }}
            disabled={product.stock === 0}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Buy Now
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToWishlist}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-sm"
            >
              <FaHeart className="text-red-500" /> Wishlist
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-sm">
              <FaShare /> Share
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-green-500" size={16} />
            <span>Secure transaction</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTruck className="text-blue-500" size={16} />
            <span>Ships from 2Wolf</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUndo className="text-orange-500" size={16} />
            <span>30-day return policy</span>
          </div>
        </div>
      </div>

      {/* About This Item */}
      {product.features && product.features.length > 0 && (
        <div className="bg-white mt-2 p-4">
          <button
            onClick={() => toggleSection('features')}
            className="w-full flex items-center justify-between mb-3"
          >
            <h2 className="text-lg font-bold text-gray-900">About this item</h2>
            {expandedSections.features ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {expandedSections.features && (
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-700">
                  <FaCheck className="text-green-500 mt-1 shrink-0" size={14} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Product Description */}
      {product.description && (
        <div className="bg-white mt-2 p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Product Description</h2>
          <p className={`text-sm text-gray-700 leading-relaxed ${showFullDescription ? '' : 'line-clamp-4'}`}>
            {product.description}
          </p>
          {product.description.length > 200 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm text-blue-600 hover:underline mt-2 font-semibold"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}

      {/* Technical Details */}
      {allSpecs.length > 0 && (
        <div className="bg-white mt-2 p-4">
          <button
            onClick={() => toggleSection('details')}
            className="w-full flex items-center justify-between mb-3"
          >
            <h2 className="text-lg font-bold text-gray-900">Technical Details</h2>
            {expandedSections.details ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {expandedSections.details && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {allSpecs.map((spec, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-3 text-xs font-semibold text-gray-700 w-2/5">
                        {spec.label}
                      </td>
                      <td className="py-3 px-3 text-xs text-gray-900">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Product Information</h3>
        <div className="space-y-3 text-sm">
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

      {/* Desktop View */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Images */}
          <div className="col-span-5">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.bestSeller && (
                  <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    <FaAward /> Best Seller
                  </span>
                )}
                {product.sellingFast && (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1"
                  >
                    <FaFire /> Selling Fast!
                  </motion.span>
                )}
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-orange-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle: Info */}
          <div className="col-span-4">
            <div className="bg-white rounded-lg p-6">
              <button
                onClick={() => navigate(`/shop?brand=${product.brand}`)}
                className="text-sm text-orange-600 hover:underline mb-2 block"
              >
                Visit the {product.brand} Store
              </button>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm font-semibold text-gray-700 ml-2">
                    {product.rating}
                  </span>
                </div>
                <button className="text-sm text-blue-600 hover:underline">
                  {product.reviewCount} ratings
                </button>
              </div>

              {product.showRecentlySold && product.recentlySoldCount > 0 && (
                <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                  <FaClock className="text-orange-500" />
                  {product.recentlySoldCount}+ bought in past month
                </p>
              )}

              <div className="border-t border-b py-4 mb-4">
                {product.discount > 0 ? (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-red-600 font-semibold">-{product.discount}%</span>
                      <span className="text-3xl font-bold text-red-600">AED {calculateFinalPrice()}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      List Price: <span className="line-through">AED {product.price.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">AED {product.price.toFixed(2)}</span>
                )}
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">About this item</h3>
                  <ul className="space-y-2">
                    {product.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-gray-700">
                        <FaCheck className="text-green-500 mt-1 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {allSpecs.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
                  <table className="w-full">
                    <tbody>
                      {allSpecs.slice(0, 8).map((spec, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2 text-sm font-semibold text-gray-700 w-1/3">{spec.label}</td>
                          <td className="py-2 text-sm text-gray-900">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right: Buy Box */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sticky top-4">
              <div className="text-2xl font-bold text-gray-900 mb-4">
                AED {calculateFinalPrice()}
              </div>

              {product.freeDelivery && (
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                  <FaTruck /> FREE delivery
                </div>
              )}

              <div className="mb-4">
                {product.stock > 0 ? (
                  <p className="text-green-600 font-semibold flex items-center gap-2">
                    <FaCheck /> In Stock
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold flex items-center gap-2">
                    <FaTimes /> Out of Stock
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 mb-3"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                disabled={product.stock === 0}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition disabled:opacity-50"
              >
                Buy Now
              </button>

              <div className="mt-6 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-green-500" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTruck className="text-blue-500" />
                  <span>Ships from 2Wolf</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUndo className="text-orange-500" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}