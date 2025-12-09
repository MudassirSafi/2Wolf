// src/pages/AllCategories.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function AllCategories() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedFilters, setSelectedFilters] = useState({
    category: selectedCategory || "",
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
    brands: [],
    inStock: true
  });

  // Expandable sections
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    reviews: true,
    brands: true,
    price: true,
    deals: false,
    seller: false,
    availability: true
  });

  const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

  // Categories with subcategories
  const categories = {
    "Kitchen": [
      "All Kitchen",
      "Food Preparation",
      "Bakeware",
      "Coffee, Tea & Espresso",
      "Containers & Storage",
      "Cookware",
      "Heating & Cooling",
      "Kitchen Linen",
      "Large Household Appliances",
      "Small Appliances",
      "Tableware",
      "Tools & Gadgets",
      "Water Coolers, Filters & Cartridges"
    ],
    "Electronics": [
      "All Electronics",
      "Computers & Laptops",
      "Mobile Phones",
      "Cameras",
      "Audio & Headphones",
      "TVs & Home Theater",
      "Gaming",
      "Wearable Technology"
    ],
    "Fashion": [
      "All Fashion",
      "Men's Clothing",
      "Women's Clothing",
      "Men's Shoes",
      "Women's Shoes",
      "Watches",
      "Jewelry",
      "Bags & Luggage"
    ],
    "Home & Garden": [
      "All Home & Garden",
      "Furniture",
      "Bedding",
      "Bath",
      "Home Decor",
      "Garden & Outdoor",
      "Tools & Home Improvement"
    ],
    "Sports & Outdoors": [
      "All Sports",
      "Exercise & Fitness",
      "Outdoor Recreation",
      "Sports Equipment",
      "Athletic Clothing"
    ],
    "Toys & Games": [
      "All Toys",
      "Learning Toys",
      "Building Blocks",
      "Dolls & Accessories",
      "Outdoor Play",
      "Board Games"
    ],
    "Beauty & Personal Care": [
      "All Beauty",
      "Skincare",
      "Makeup",
      "Hair Care",
      "Fragrances",
      "Personal Care"
    ],
    "Automotive": [
      "All Automotive",
      "Car Accessories",
      "Tools & Equipment",
      "Oils & Fluids",
      "Replacement Parts"
    ]
  };

  const brands = [
    "BLACK+DECKER",
    "Philips",
    "NINJA",
    "Nespresso",
    "De'Longhi",
    "Nutricook",
    "Braun",
    "Samsung",
    "LG",
    "Sony",
    "Apple",
    "Dell"
  ];

  const priceRanges = [
    { label: "Up to 300 AED", min: 0, max: 300 },
    { label: "300 to 400 AED", min: 300, max: 400 },
    { label: "400 to 700 AED", min: 400, max: 700 },
    { label: "700 AED & above", min: 700, max: 100000 }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedFilters(prev => ({ ...prev, category: selectedCategory }));
    }
  }, [selectedCategory]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedFilters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      
      if (data.success && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (selectedFilters.category) {
      filtered = filtered.filter(p => 
        p.category?.toLowerCase().includes(selectedFilters.category.toLowerCase())
      );
    }

    // Price filter
    const minPriceAED = selectedFilters.minPrice / 3.67;
    const maxPriceAED = selectedFilters.maxPrice / 3.67;
    filtered = filtered.filter(p => 
      p.price >= minPriceAED && p.price <= maxPriceAED
    );

    // Rating filter
    if (selectedFilters.rating > 0) {
      filtered = filtered.filter(p => (p.rating || 0) >= selectedFilters.rating);
    }

    // Brand filter
    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter(p => 
        selectedFilters.brands.includes(p.brand)
      );
    }

    // Stock filter
    if (selectedFilters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    setFilteredProducts(filtered);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedFilters(prev => ({ ...prev, category }));
  };

  const handlePriceRangeChange = (min, max) => {
    setSelectedFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const handleRatingFilter = (rating) => {
    setSelectedFilters(prev => ({ ...prev, rating }));
  };

  const handleBrandToggle = (brand) => {
    setSelectedFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: "",
      minPrice: 0,
      maxPrice: 10000,
      rating: 0,
      brands: [],
      inStock: true
    });
  };

  const convertToAED = (usdPrice) => {
    return (usdPrice * 3.67).toFixed(2);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-orange-400" : "text-gray-300"}
        size={14}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR - FILTERS */}
          <div className="lg:col-span-3 space-y-4">
            <div className="sticky top-4 bg-white border rounded-lg p-4 max-h-[calc(100vh-100px)] overflow-y-auto">
              
              {/* Clear Filters */}
              {(selectedFilters.category || selectedFilters.brands.length > 0 || selectedFilters.rating > 0) && (
                <button
                  onClick={clearAllFilters}
                  className="w-full mb-4 text-blue-600 hover:text-orange-600 text-sm font-medium border border-blue-600 rounded px-4 py-2"
                >
                  Clear All Filters
                </button>
              )}

              {/* Fulfilled by Amazon */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm">Fulfilled by Amazon</span>
                </label>
              </div>

              {/* Category */}
              <div className="border-b pb-4 mb-4">
                <button
                  onClick={() => toggleSection("category")}
                  className="flex items-center justify-between w-full font-bold text-lg mb-3"
                >
                  <span>Category</span>
                  {expandedSections.category ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedSections.category && (
                  <div className="space-y-2">
                    {Object.entries(categories).map(([mainCat, subCats]) => (
                      <div key={mainCat}>
                        <button
                          onClick={() => handleCategoryChange(mainCat.toLowerCase())}
                          className={`text-sm hover:text-blue-600 font-semibold ${
                            selectedFilters.category === mainCat.toLowerCase() ? "text-orange-600" : ""
                          }`}
                        >
                          {mainCat}
                        </button>
                        <div className="ml-4 mt-1 space-y-1">
                          {subCats.map(subCat => (
                            <button
                              key={subCat}
                              onClick={() => handleCategoryChange(subCat.toLowerCase())}
                              className={`block text-xs hover:text-blue-600 ${
                                selectedFilters.category === subCat.toLowerCase() ? "text-orange-600 font-semibold" : "text-gray-600"
                              }`}
                            >
                              {subCat}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer Reviews */}
              <div className="border-b pb-4 mb-4">
                <button
                  onClick={() => toggleSection("reviews")}
                  className="flex items-center justify-between w-full font-bold text-lg mb-3"
                >
                  <span>Customer Reviews</span>
                  {expandedSections.reviews ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedSections.reviews && (
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleRatingFilter(rating)}
                        className={`flex items-center gap-2 hover:text-blue-600 ${
                          selectedFilters.rating === rating ? "text-orange-600" : ""
                        }`}
                      >
                        <div className="flex">{renderStars(rating)}</div>
                        <span className="text-sm">& Up</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands */}
              <div className="border-b pb-4 mb-4">
                <button
                  onClick={() => toggleSection("brands")}
                  className="flex items-center justify-between w-full font-bold text-lg mb-3"
                >
                  <span>Brands</span>
                  {expandedSections.brands ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedSections.brands && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        <input
                          type="checkbox"
                          checked={selectedFilters.brands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="border-b pb-4 mb-4">
                <button
                  onClick={() => toggleSection("price")}
                  className="flex items-center justify-between w-full font-bold text-lg mb-3"
                >
                  <span>Price</span>
                  {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedSections.price && (
                  <div className="space-y-2">
                    <button
                      onClick={() => handlePriceRangeChange(0, 100000)}
                      className="block text-sm hover:text-blue-600"
                    >
                      All Prices
                    </button>
                    {priceRanges.map((range, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePriceRangeChange(range.min, range.max)}
                        className={`block text-sm hover:text-blue-600 ${
                          selectedFilters.minPrice === range.min && selectedFilters.maxPrice === range.max
                            ? "text-orange-600 font-semibold"
                            : ""
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="pb-4">
                <button
                  onClick={() => toggleSection("availability")}
                  className="flex items-center justify-between w-full font-bold text-lg mb-3"
                >
                  <span>Availability</span>
                  {expandedSections.availability ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedSections.availability && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.inStock}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Include Out of Stock</span>
                  </label>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT SIDE - PRODUCTS */}
          <div className="lg:col-span-9">
            {/* Results Header */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-bold">{filteredProducts.length}</span> results
                {selectedFilters.category && (
                  <span> for "<span className="font-semibold">{selectedFilters.category}</span>"</span>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Check each product page for other buying options.
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No products found</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-blue-600 hover:text-orange-600"
                >
                  Clear filters and try again
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                  >
                    <div className="grid grid-cols-12 gap-4">
                      {/* Product Image */}
                      <div className="col-span-12 sm:col-span-3">
                        <div
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="aspect-square rounded overflow-hidden"
                        >
                          <img
                            src={product.images?.[0] || "https://via.placeholder.com/300"}
                            alt={product.name}
                            className="w-full h-full object-contain hover:scale-105 transition-transform"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="col-span-12 sm:col-span-9">
                        <h3
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="text-lg font-normal text-blue-600 hover:text-orange-600 line-clamp-2 mb-2 cursor-pointer"
                        >
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">{renderStars(product.rating || 4)}</div>
                          <span className="text-sm text-blue-600 hover:text-orange-600 cursor-pointer">
                            ({product.reviewCount || 125})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                          <span className="text-2xl font-normal text-red-700">
                            AED {convertToAED(product.price)}
                          </span>
                          {product.discount > 0 && (
                            <span className="ml-2 text-sm text-gray-600 line-through">
                              AED {convertToAED(product.price * (1 + product.discount / 100))}
                            </span>
                          )}
                        </div>

                        {/* Stock Status */}
                        {product.stock > 0 ? (
                          <p className="text-sm text-green-600 font-semibold mb-2">In Stock</p>
                        ) : (
                          <p className="text-sm text-red-600 font-semibold mb-2">Out of Stock</p>
                        )}

                        {/* Description */}
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {product.description}
                        </p>

                        {/* See Options Button */}
                        <button
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="text-sm text-blue-600 hover:text-orange-600 font-medium"
                        >
                          See Options →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}