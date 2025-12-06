import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = () => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const sortProducts = (products) => {
    let sorted = [...products];
    
    switch(sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      sorted = sorted.filter(p => p.price >= min && (max ? p.price <= max : true));
    }

    return sorted;
  };

  const filteredProducts = sortProducts(products);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <button onClick={() => navigate('/')} className="hover:text-orange-500">Home</button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{getCategoryTitle()}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{getCategoryTitle()}</h1>
          <p className="text-gray-600 mt-2">{products.length} products found</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              
              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-99999">$200+</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSortBy('default');
                  setPriceRange('all');
                }}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img
                        src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-orange-500">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.stock > 0 && (
                          <span className="text-sm text-gray-500">
                            {product.stock} in stock
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
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
};

export default CategoryPage;