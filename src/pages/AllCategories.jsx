// src/pages/AllCategories.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaStar, FaFilter, FaTimes } from "react-icons/fa";
import FilterSidebar from "../components/FilterSidebar";

export default function AllCategories() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    category: selectedCategory || "",
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
    brands: [],
    genders: [],
    sizes: [],
    colors: [],
    inStock: true
  });

  const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

  // Detect category type for dynamic filters
  const getCategoryType = () => {
    const cat = filters.category.toLowerCase();
    if (cat.includes('shoe') || cat.includes('footwear')) return 'shoes';
    if (cat.includes('watch')) return 'watches';
    if (cat.includes('fashion') || cat.includes('clothing')) return 'fashion';
    if (cat.includes('electronic') || cat.includes('laptop') || cat.includes('phone')) return 'electronics';
    if (cat.includes('kitchen') || cat.includes('appliance')) return 'kitchen';
    return 'general';
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilters(prev => ({ ...prev, category: selectedCategory }));
    }
  }, [selectedCategory]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

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
    if (filters.category) {
      filtered = filtered.filter(p => 
        p.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Price filter (convert AED to USD for comparison)
    const minPriceUSD = filters.minPrice / 3.67;
    const maxPriceUSD = filters.maxPrice / 3.67;
    filtered = filtered.filter(p => 
      p.price >= minPriceUSD && p.price <= maxPriceUSD
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(p => (p.rating || 0) >= filters.rating);
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => 
        filters.brands.includes(p.brand)
      );
    }

    // Gender filter
    if (filters.genders.length > 0) {
      filtered = filtered.filter(p => 
        filters.genders.some(g => p.gender?.toLowerCase() === g.toLowerCase())
      );
    }

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => 
        filters.colors.some(c => p.color?.toLowerCase().includes(c.toLowerCase()))
      );
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      switch(type) {
        case 'rating':
          return { ...prev, rating: prev.rating === value ? 0 : value };
        
        case 'brand':
          return {
            ...prev,
            brands: prev.brands.includes(value)
              ? prev.brands.filter(b => b !== value)
              : [...prev.brands, value]
          };
        
        case 'gender':
          return {
            ...prev,
            genders: prev.genders.includes(value)
              ? prev.genders.filter(g => g !== value)
              : [...prev.genders, value]
          };
        
        case 'color':
          return {
            ...prev,
            colors: prev.colors.includes(value)
              ? prev.colors.filter(c => c !== value)
              : [...prev.colors, value]
          };
        
        case 'size':
          return {
            ...prev,
            sizes: prev.sizes.includes(value)
              ? prev.sizes.filter(s => s !== value)
              : [...prev.sizes, value]
          };
        
        case 'priceRange':
          return { ...prev, minPrice: value.min, maxPrice: value.max };
        
        case 'availability':
          return { ...prev, inStock: value };
        
        default:
          return prev;
      }
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: "",
      minPrice: 0,
      maxPrice: 10000,
      rating: 0,
      brands: [],
      genders: [],
      sizes: [],
      colors: [],
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
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-200 transition"
          >
            <FaFilter />
            <span className="font-semibold">Filters</span>
            {(filters.brands.length > 0 || filters.rating > 0 || filters.genders.length > 0) && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {filters.brands.length + (filters.rating > 0 ? 1 : 0) + filters.genders.length}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR - DESKTOP */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-4">
              <FilterSidebar 
                filters={filters}
                onFilterChange={handleFilterChange}
                categoryType={getCategoryType()}
              />
            </div>
          </div>

          {/* MOBILE FILTER SIDEBAR */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowMobileFilters(false)}
              />
              
              {/* Sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                <FilterSidebar 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  categoryType={getCategoryType()}
                />
                <div className="sticky bottom-0 bg-white border-t p-4">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT SIDE - PRODUCTS */}
          <div className="lg:col-span-9">
            {/* Results Header */}
            <div className="mb-4 pb-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">
                  <span className="font-bold">{filteredProducts.length}</span> results
                  {filters.category && (
                    <span> for "<span className="font-semibold">{filters.category}</span>"</span>
                  )}
                </p>
                
                {/* Clear Filters Button */}
                {(filters.brands.length > 0 || filters.rating > 0 || filters.genders.length > 0) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-orange-600 font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Active Filters Pills */}
              {(filters.brands.length > 0 || filters.genders.length > 0 || filters.rating > 0) && (
                <div className="flex flex-wrap gap-2">
                  {filters.brands.map(brand => (
                    <span key={brand} className="inline-flex items-center gap-1 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-xs">
                      {brand}
                      <button
                        onClick={() => handleFilterChange('brand', brand)}
                        className="hover:text-red-600"
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                  {filters.genders.map(gender => (
                    <span key={gender} className="inline-flex items-center gap-1 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-xs">
                      {gender}
                      <button
                        onClick={() => handleFilterChange('gender', gender)}
                        className="hover:text-red-600"
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                  {filters.rating > 0 && (
                    <span className="inline-flex items-center gap-1 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-xs">
                      {filters.rating}★ & Up
                      <button
                        onClick={() => handleFilterChange('rating', 0)}
                        className="hover:text-red-600"
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid - 4 per row */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-600 mb-2">No products found</p>
                <p className="text-gray-500 mb-4">Try adjusting your filters</p>
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-orange-600"
                >
                  Clear filters and try again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer group"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-50 overflow-hidden relative">
                      <img
                        src={product.images?.[0] || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </div>
                      )}
                      {product.bestSeller && (
                        <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Best Seller
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-3">
                      <h3 className="text-sm font-normal text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">{renderStars(product.rating || 4)}</div>
                        <span className="text-xs text-gray-600">({product.reviewCount || 125})</span>
                      </div>

                      {/* Price */}
                      <div className="mb-2">
                        <span className="text-lg font-normal text-red-700">
                          AED {convertToAED(product.price)}
                        </span>
                        {product.discount > 0 && (
                          <span className="ml-2 text-xs text-gray-500 line-through">
                            AED {convertToAED(product.price * (1 + product.discount / 100))}
                          </span>
                        )}
                      </div>

                      {/* Stock Status */}
                      {product.stock > 0 ? (
                        <p className="text-xs text-green-600">In Stock</p>
                      ) : (
                        <p className="text-xs text-red-600">Out of Stock</p>
                      )}

                      {/* Quick View on Hover (Desktop) */}
                      <div className="hidden group-hover:block mt-2">
                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm py-1 rounded transition">
                          Add to Cart
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