// ✅ src/components/SearchDropdown.jsx - Amazon-Style Search Results
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaClock, FaTimes } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SearchDropdown({ searchQuery, onClose, isOpen }) {
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches] = useState([
    'Nike shoes for men',
    'Shoes for women',
    'Shoe cleaner',
    'Running shoes',
    'Leather shoes',
    'Sports shoes',
    'Casual shoes',
    'Formal shoes'
  ]);
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Fetch products and generate suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      fetch(`${API_BASE_URL}/api/products`)
        .then(res => res.json())
        .then(data => {
          const prods = data.products || [];
          setProducts(prods);
          
          // Generate suggestions based on search query
          const searchLower = searchQuery.toLowerCase();
          const matchedProducts = prods.filter(p =>
            p.name?.toLowerCase().includes(searchLower) ||
            p.category?.toLowerCase().includes(searchLower)
          );

          // Create unique suggestions
          const suggestionSet = new Set();
          matchedProducts.forEach(p => {
            // Add product name
            if (p.name?.toLowerCase().includes(searchLower)) {
              suggestionSet.add(p.name);
            }
            // Add category variations
            if (p.category) {
              suggestionSet.add(`${searchQuery} in ${p.category}`);
              suggestionSet.add(`${p.category} ${searchQuery}`);
            }
            // Add brand variations
            if (p.brand) {
              suggestionSet.add(`${p.brand} ${searchQuery}`);
            }
          });

          setSuggestions(Array.from(suggestionSet).slice(0, 10));
        })
        .catch(err => console.error('Search error:', err));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Save search to recent searches
  const saveSearch = (query) => {
    const searches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
    setRecentSearches(searches);
    localStorage.setItem('recentSearches', JSON.stringify(searches));
  };

  // Handle search suggestion click
  const handleSuggestionClick = (query) => {
    saveSearch(query);
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    onClose();
  };

  // Remove recent search
  const removeRecentSearch = (query, e) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== query);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-[150]"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div 
        ref={dropdownRef}
        className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl z-[200] max-h-[70vh] overflow-y-auto"
        style={{ width: '100%' }}
      >
        {searchQuery.trim().length === 0 ? (
          // Show recent and popular searches
          <div className="p-4">
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  Recent Searches
                </h3>
                <div className="space-y-1">
                  {recentSearches.map((search, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded cursor-pointer group"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      <div className="flex items-center gap-3">
                        <FaClock className="text-gray-400 text-sm" />
                        <span className="text-gray-700">{search}</span>
                      </div>
                      <button
                        onClick={(e) => removeRecentSearch(search, e)}
                        className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</h3>
              <div className="space-y-1">
                {popularSearches.map((search, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    <FaSearch className="text-gray-400 text-sm" />
                    <span className="text-gray-700">{search}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Show search suggestions
          <div className="p-4">
            {suggestions.length > 0 ? (
              <div className="space-y-1">
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <FaSearch className="text-gray-400 text-sm" />
                    <span className="text-gray-700">
                      {/* Highlight matching text */}
                      {suggestion.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => (
                        <span
                          key={i}
                          className={
                            part.toLowerCase() === searchQuery.toLowerCase()
                              ? 'font-semibold'
                              : ''
                          }
                        >
                          {part}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No suggestions found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}