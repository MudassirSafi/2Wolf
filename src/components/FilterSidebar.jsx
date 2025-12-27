// src/components/FilterSidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaStar, FaTimes, FaFilter } from "react-icons/fa";

export default function FilterSidebar({ 
  filters, 
  onFilterChange, 
  categoryType = "general"
}) {
  const sectionRefs = useRef({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    prime: false,
    delivery: false,
    shipping: false,
    gender: true,
    reviews: true,
    brands: true,
    deals: false,
    price: true,
    category: true,
    subcategory: true,
    availability: true,
    color: false,
    material: false,
    capacity: false,
    powerSource: false,
    connectivity: false,
    features: false,
    movement: false,
    bandMaterial: false,
    screenSize: false,
    energyRating: false
  });

  // Close mobile filter on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Complete category structure with ALL categories
  const categoryFilters = {
    electronics: {
      subcategories: [
        "Mobile Phones",
        "Smartphone Accessories",
        "Laptops",
        "Desktops",
        "Tablets",
        "Computer Accessories",
        "Monitors",
        "Printers & Scanners",
        "Cameras & Photography",
        "Video Cameras",
        "Headphones & Earbuds",
        "Speakers",
        "Smart Home Devices",
        "Wearable Technology",
        "Storage Devices",
        "Networking Devices",
        "Power Banks",
        "Gaming Consoles",
        "Gaming Accessories"
      ],
      screenSizes: ['Up to 32"', '32" to 42"', '43" to 49"', '50" to 55"', '56" to 65"', '65" and above'],
      connectivity: ["Bluetooth", "Wi-Fi", "USB", "HDMI", "NFC", "Wireless", "Ethernet"],
      features: ["Smart TV", "4K Ultra HD", "HDR", "Voice Control", "Touch Screen", "Water Resistant", "Noise Cancelling"],
      brands: ["2Wolf", "Samsung", "Apple", "Sony", "LG", "Dell", "HP", "Lenovo", "ASUS", "Canon", "Nikon", "JBL", "Bose"]
    },
    fashion: {
      subcategories: {
        "Men": ["Clothing", "Shoes", "Watches", "Jewelry", "Bags & Wallets", "Sunglasses", "Grooming"],
        "Women": ["Clothing", "Shoes", "Watches", "Jewelry", "Handbags", "Sunglasses", "Beauty Accessories"],
        "Kids": ["Boys Clothing", "Girls Clothing", "Kids Shoes", "School Bags", "Accessories"]
      },
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      shoeSizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      brands: ["2Wolf", "Nike", "Adidas", "Puma", "Levi's", "H&M", "Zara", "Tommy Hilfiger", "Calvin Klein"]
    },
    "home-kitchen": {
      subcategories: [
        "Furniture",
        "Home Decor",
        "Kitchen Appliances",
        "Cookware",
        "Dinnerware",
        "Storage & Organization",
        "Bedding",
        "Bath",
        "Cleaning Supplies",
        "Lighting",
        "Curtains & Blinds",
        "Home Improvement Tools"
      ],
      materials: ["Stainless Steel", "Glass", "Plastic", "Ceramic", "Aluminum", "Cast Iron", "Wood", "Silicone"],
      capacities: ["Up to 1L", "1L to 2L", "2L to 3L", "3L to 5L", "5L to 10L", "10L and above"],
      features: ["Dishwasher Safe", "Non-Stick", "Induction Compatible", "Microwave Safe", "Oven Safe", "BPA Free"],
      brands: ["2Wolf", "Philips", "NINJA", "KitchenAid", "Tefal", "Pyrex", "Prestige"]
    },
    "beauty-personal-care": {
      subcategories: [
        "Skincare",
        "Hair Care",
        "Makeup",
        "Fragrances",
        "Personal Hygiene",
        "Grooming Tools",
        "Beauty Accessories",
        "Wellness Products"
      ],
      powerSource: ["Corded", "Cordless", "Rechargeable Battery", "USB Charging", "Dual Voltage"],
      features: ["Ceramic Coating", "Ionic Technology", "Multiple Heat Settings", "Auto Shut-off", "Wet & Dry Use"],
      brands: ["2Wolf", "Philips", "Braun", "Remington", "Panasonic", "Dyson", "L'Oréal", "Maybelline"]
    },
    "health-household": {
      subcategories: [
        "Vitamins & Supplements",
        "Medical Supplies",
        "First Aid",
        "Health Monitors",
        "Household Cleaning",
        "Laundry Supplies",
        "Air Fresheners",
        "Pest Control"
      ],
      brands: ["2Wolf", "Johnson & Johnson", "Dettol", "Tide", "Ariel", "Persil"]
    },
    "baby-products": {
      subcategories: [
        "Diapers",
        "Baby Food",
        "Feeding Products",
        "Baby Clothing",
        "Strollers",
        "Car Seats",
        "Baby Toys",
        "Baby Care Products"
      ],
      ageRange: ["0-6 months", "6-12 months", "1-2 years", "2-3 years", "3+ years"],
      brands: ["2Wolf", "Pampers", "Huggies", "Johnson's Baby", "Chicco", "Graco"]
    },
    "toys-games": {
      subcategories: [
        "Action Figures",
        "Dolls & Accessories",
        "Board Games",
        "Puzzles",
        "Educational Toys",
        "Outdoor Toys",
        "Remote Control Toys",
        "Video Games"
      ],
      ageRange: ["0-2 years", "3-5 years", "6-8 years", "9-11 years", "12+ years"],
      brands: ["2Wolf", "LEGO", "Mattel", "Hasbro", "Fisher-Price", "Barbie", "Hot Wheels"]
    },
    "books-stationery": {
      subcategories: [
        "Fiction Books",
        "Non-Fiction Books",
        "Academic Books",
        "Children's Books",
        "Notebooks",
        "Office Supplies",
        "Art Supplies",
        "Calendars"
      ],
      brands: ["2Wolf", "Penguin", "Oxford", "Faber-Castell", "Staedtler"]
    },
    "video-games": {
      subcategories: [
        "Console Games",
        "PC Games",
        "Gaming Accessories",
        "Digital Games",
        "VR Games & Accessories"
      ],
      platforms: ["PlayStation", "Xbox", "Nintendo Switch", "PC", "VR"],
      brands: ["2Wolf", "Sony", "Microsoft", "Nintendo", "Razer", "Logitech"]
    },
    "music-movies": {
      subcategories: [
        "CDs & Vinyl",
        "DVDs & Blu-ray",
        "Digital Music",
        "Musical Instruments",
        "Karaoke Systems"
      ],
      brands: ["2Wolf", "Sony", "Yamaha", "Fender", "Roland"]
    },
    automotive: {
      subcategories: [
        "Car Accessories",
        "Car Electronics",
        "Motorbike Accessories",
        "Tools & Equipment",
        "Oils & Fluids",
        "Tires & Wheels"
      ],
      brands: ["2Wolf", "Bosch", "Shell", "Castrol", "Michelin"]
    },
    "sports-outdoors": {
      subcategories: [
        "Fitness Equipment",
        "Gym Accessories",
        "Outdoor Recreation",
        "Camping & Hiking",
        "Cycling",
        "Sports Apparel",
        "Team Sports",
        "Water Sports"
      ],
      brands: ["2Wolf", "Nike", "Adidas", "Under Armour", "Reebok", "Puma"]
    },
    "pet-supplies": {
      subcategories: [
        "Dog Supplies",
        "Cat Supplies",
        "Bird Supplies",
        "Fish & Aquatic",
        "Pet Food",
        "Pet Toys",
        "Pet Grooming"
      ],
      brands: ["2Wolf", "Pedigree", "Whiskas", "Royal Canin", "Purina"]
    },
    "tools-industrial": {
      subcategories: [
        "Power Tools",
        "Hand Tools",
        "Safety Equipment",
        "Industrial Supplies",
        "Measuring Tools",
        "Electrical Tools"
      ],
      brands: ["2Wolf", "Bosch", "DeWalt", "Makita", "Stanley", "Black+Decker"]
    },
    "office-products": {
      subcategories: [
        "Office Furniture",
        "Printers & Ink",
        "Paper Products",
        "Writing Instruments",
        "Filing & Storage"
      ],
      brands: ["2Wolf", "HP", "Canon", "Epson", "Brother", "Staples"]
    },
    "garden-outdoor": {
      subcategories: [
        "Gardening Tools",
        "Plants & Seeds",
        "Outdoor Furniture",
        "Lawn Care",
        "Patio Decor"
      ],
      brands: ["2Wolf", "Bosch", "Black+Decker", "Gardena"]
    },
    "software-digital": {
      subcategories: [
        "Computer Software",
        "Antivirus & Security",
        "Design Software",
        "Educational Software",
        "E-books",
        "Subscriptions"
      ],
      brands: ["Microsoft", "Adobe", "Norton", "McAfee", "Kaspersky"]
    },
    "luggage-travel": {
      subcategories: [
        "Suitcases",
        "Travel Bags",
        "Backpacks",
        "Travel Accessories",
        "Passport Holders"
      ],
      brands: ["2Wolf", "Samsonite", "American Tourister", "Delsey"]
    },
    "gift-cards": {
      subcategories: [
        "Gift Cards",
        "Personalized Gifts",
        "Customized Prints",
        "Photo Products"
      ]
    },
    "grocery-food": {
      subcategories: [
        "Snacks",
        "Beverages",
        "Packaged Food",
        "Organic Food",
        "Gourmet Items",
        "Household Staples"
      ],
      brands: ["2Wolf", "Nestlé", "Coca-Cola", "Pepsi", "Lays"]
    },
    general: {
      brands: ["2Wolf", "Samsung", "Apple", "Philips", "Sony", "LG"]
    }
  };

  const genders = ["Men", "Women", "Boys", "Girls", "Babies", "Unisex"];

  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#00FF00" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Purple", hex: "#800080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Brown", hex: "#8B4513" },
    { name: "Gray", hex: "#808080" },
    { name: "Navy", hex: "#000080" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Silver", hex: "#C0C0C0" }
  ];

  const priceRanges = [
    { label: "Up to 200 AED", min: 0, max: 200 },
    { label: "200 to 250 AED", min: 200, max: 250 },
    { label: "250 to 350 AED", min: 250, max: 350 },
    { label: "350 to 400 AED", min: 350, max: 400 },
    { label: "400 AED & above", min: 400, max: 999999 }
  ];

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < count ? "text-orange-400" : "text-gray-300"} size={12} />
    ));
  };

  const handleFilterClick = (e, filterType, filterValue) => {
    e.preventDefault();
    e.stopPropagation();
    
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    onFilterChange(filterType, filterValue);
    
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  const FilterSection = ({ title, sectionKey, children, badge }) => (
    <div 
      ref={el => sectionRefs.current[sectionKey] = el}
      className="border-b border-gray-200 py-4"
    >
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left hover:text-orange-600 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">{title}</span>
          {badge && <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded font-semibold">{badge}</span>}
        </div>
        {expandedSections[sectionKey] ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>
      {expandedSections[sectionKey] && <div className="mt-3">{children}</div>}
    </div>
  );

  const activeFiltersCount = () => {
    let count = 0;
    if (filters.subcategories?.length) count += filters.subcategories.length;
    if (filters.brands?.length) count += filters.brands.length;
    if (filters.colors?.length) count += filters.colors.length;
    if (filters.genders?.length) count += filters.genders.length;
    if (filters.rating) count += 1;
    if (filters.minPrice || filters.maxPrice) count += 1;
    return count;
  };

  // Render subcategories based on category type
  const renderSubcategories = () => {
    const catData = categoryFilters[categoryType];
    if (!catData?.subcategories) return null;

    // Handle fashion's nested structure
    if (categoryType === "fashion" && typeof catData.subcategories === 'object') {
      return (
        <FilterSection title="Category" sectionKey="subcategory" badge={filters.subcategories?.length || null}>
          <div className="space-y-3">
            {Object.entries(catData.subcategories).map(([gender, items]) => (
              <div key={gender}>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">{gender}</h4>
                <div className="space-y-2 ml-2">
                  {items.map(subcat => (
                    <label key={subcat} className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
                      <input
                        type="checkbox"
                        checked={filters.subcategories?.includes(subcat)}
                        onChange={(e) => {
                          e.stopPropagation();
                          const scrollPos = window.pageYOffset;
                          onFilterChange('subcategory', subcat);
                          requestAnimationFrame(() => window.scrollTo(0, scrollPos));
                        }}
                        className="w-4 h-4 accent-orange-500"
                      />
                      <span>{subcat}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FilterSection>
      );
    }

    // Handle regular array of subcategories
    return (
      <FilterSection title="Category" sectionKey="subcategory" badge={filters.subcategories?.length || null}>
        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {catData.subcategories.map(subcat => (
            <label key={subcat} className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
              <input
                type="checkbox"
                checked={filters.subcategories?.includes(subcat)}
                onChange={(e) => {
                  e.stopPropagation();
                  const scrollPos = window.pageYOffset;
                  onFilterChange('subcategory', subcat);
                  requestAnimationFrame(() => window.scrollTo(0, scrollPos));
                }}
                className="w-4 h-4 accent-orange-500"
              />
              <span>{subcat}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    );
  };

  const FilterContent = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-base">Filters</h3>
        {activeFiltersCount() > 0 && (
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-semibold">
            {activeFiltersCount()} Active
          </span>
        )}
      </div>

      {/* 2Wolf Prime */}
      <FilterSection title="2Wolf Prime" sectionKey="prime">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
            <input type="checkbox" className="w-4 h-4 accent-orange-500" />
            <span>Ships from UAE</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
            <input type="checkbox" className="w-4 h-4 accent-orange-500" />
            <span>International Shipping</span>
          </label>
        </div>
      </FilterSection>

      {/* Delivery Day */}
      <FilterSection title="Delivery Day" sectionKey="delivery">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
            <input type="checkbox" className="w-4 h-4 accent-orange-500" />
            <span>Get It Today</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
            <input type="checkbox" className="w-4 h-4 accent-orange-500" />
            <span>Get It by Tomorrow</span>
          </label>
        </div>
      </FilterSection>

      {/* Subcategories */}
      {renderSubcategories()}

      {/* Gender (Fashion, Beauty, Toys, Baby Products) */}
      {["fashion", "beauty-personal-care", "toys-games", "baby-products"].includes(categoryType) && (
        <FilterSection title="Gender/Age" sectionKey="gender" badge={filters.genders?.length || null}>
          <div className="space-y-2">
            {genders.map(gender => (
              <label key={gender} className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
                <input
                  type="checkbox"
                  checked={filters.genders?.includes(gender)}
                  onChange={(e) => {
                    e.stopPropagation();
                    const scrollPos = window.pageYOffset;
                    onFilterChange('gender', gender);
                    requestAnimationFrame(() => window.scrollTo(0, scrollPos));
                  }}
                  className="w-4 h-4 accent-orange-500"
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Customer Reviews */}
      <FilterSection title="Customer Reviews" sectionKey="reviews">
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={(e) => handleFilterClick(e, 'rating', rating)}
              className={`flex items-center gap-2 text-sm hover:text-orange-600 w-full text-left transition-colors ${
                filters.rating === rating ? "text-orange-600 font-semibold" : ""
              }`}
            >
              <div className="flex">{renderStars(rating)}</div>
              <span>& Up</span>
              {filters.rating === rating && (
                <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">✓</span>
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands" sectionKey="brands" badge={filters.brands?.length || null}>
        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {(categoryFilters[categoryType]?.brands || categoryFilters.general.brands).map(brand => (
            <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand)}
                onChange={(e) => {
                  e.stopPropagation();
                  const scrollPos = window.pageYOffset;
                  onFilterChange('brand', brand);
                  requestAnimationFrame(() => window.scrollTo(0, scrollPos));
                }}
                className="w-4 h-4 accent-orange-500"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price" sectionKey="price">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>AED {filters.minPrice || 0}</span>
              <span>AED {filters.maxPrice || 10000}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="50"
              value={filters.maxPrice || 10000}
              onChange={(e) => onFilterChange('priceRange', { min: 0, max: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
          <div className="space-y-2">
            {priceRanges.map((range, idx) => (
              <button
                key={idx}
                onClick={(e) => handleFilterClick(e, 'priceRange', range)}
                className={`block text-sm hover:text-orange-600 text-left w-full transition-colors ${
                  filters.minPrice === range.min && filters.maxPrice === range.max ? "text-orange-600 font-semibold" : ""
                }`}
              >
                {range.label}
                {filters.minPrice === range.min && filters.maxPrice === range.max && (
                  <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color" sectionKey="color" badge={filters.colors?.length || null}>
        <div className="grid grid-cols-5 gap-2">
          {colors.map(color => (
            <button
              key={color.name}
              onClick={(e) => handleFilterClick(e, 'color', color.name)}
              className={`w-10 h-10 rounded-full border-2 hover:scale-110 transition-transform ${
                filters.colors?.includes(color.name) ? "border-orange-500 ring-2 ring-orange-300" : "border-gray-300"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </FilterSection>

      {/* Additional category-specific filters */}
      {categoryFilters[categoryType]?.materials && (
        <FilterSection title="Material" sectionKey="material">
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {categoryFilters[categoryType].materials.map(material => (
              <label key={material} className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
                <input type="checkbox" className="w-4 h-4 accent-orange-500" />
                <span>{material}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Availability */}
      <FilterSection title="Availability" sectionKey="availability">
        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-600">
          <input
            type="checkbox"
            checked={!filters.inStock}
            onChange={(e) => {
              e.stopPropagation();
              const scrollPos = window.pageYOffset;
              onFilterChange('availability', !filters.inStock);
              requestAnimationFrame(() => window.scrollTo(0, scrollPos));
            }}
            className="w-4 h-4 accent-orange-500"
          />
          <span>Include Out of Stock</span>
        </label>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <FaFilter size={20} />
        {activeFiltersCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {activeFiltersCount()}
          </span>
        )}
      </button>

      {/* Mobile Filter Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <h3 className="font-bold text-lg">Filters</h3>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white border rounded-lg max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
        <FilterContent />
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff6b35;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff5722;
        }
      `}</style>
    </>
  );
}