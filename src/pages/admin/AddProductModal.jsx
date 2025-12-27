// src/components/admin/AddProductModal.jsx - COMPLETE & FIXED VERSION
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaImage, FaTrash, FaCheck } from 'react-icons/fa';

const AddProductModal = ({ onClose, onAdd, editProduct = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    subCategory: '',
    brand: '2Wolf',
    images: [''],
    description: '',
    discount: 0,
    featured: false,
    bestSeller: false,
    // Product-specific fields
    size: '',
    color: '',
    material: '',
    gender: '',
    // Electronics specific
    processor: '',
    ram: '',
    storage: '',
    screenSize: '',
    // Watch specific
    movement: '',
    bandMaterial: '',
    caseStyle: '',
    waterResistance: '',
    // Clothing/Shoes specific
    fit: '',
    pattern: '',
    heelType: '',
    closureType: '',
    // Kitchen specific
    capacity: '',
    powerWattage: '',
    voltage: '',
    // Additional fields
    weight: '',
    dimensions: '',
    warranty: '',
    // Variants
    variants: []
  });

  const [categories, setCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    subCategories: [''],
    brands: [''],
    fields: []
  });
  const [imageInputs, setImageInputs] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [generatedSKU, setGeneratedSKU] = useState('');
  const [generatedID, setGeneratedID] = useState('');
  const [showVariants, setShowVariants] = useState(false);

  const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

  // Predefined categories with subcategories, brands, and fields
  const defaultCategories = {
    "Electronics": {
      subcategories: ["Computers & Laptops", "Mobile Phones & Tablets", "Cameras & Photography", "Audio & Headphones", "TVs & Home Theater", "Gaming Consoles & Accessories", "Wearable Technology", "Smart Home Devices"],
      brands: ["Samsung", "Apple", "Sony", "LG", "Dell", "HP", "Lenovo", "ASUS", "Huawei", "Xiaomi", "2Wolf"],
      fields: ["processor", "ram", "storage", "screenSize", "color", "weight", "dimensions", "warranty"]
    },
    "Home & Kitchen": {
      subcategories: ["Hair Dryers", "Hair Straighteners", "Hair Curlers", "Shavers & Trimmers", "Electric Toothbrushes", "Coffee Makers", "Blenders & Mixers", "Air Fryers", "Microwave Ovens", "Refrigerators", "Vacuum Cleaners", "Water Purifiers", "Cookware Sets", "Kitchen Appliances", "Pressure Cookers", "Rice Cookers", "Juicers", "Food Processors"],
      brands: ["BLACK+DECKER", "Philips", "NINJA", "Braun", "Panasonic", "Kenwood", "Tefal", "Moulinex", "Remington", "Babyliss", "2Wolf"],
      fields: ["capacity", "powerWattage", "voltage", "material", "color", "weight", "dimensions", "warranty"]
    },
    "Fashion": {
      subcategories: ["Men's Clothing", "Women's Clothing", "Men's Shoes", "Women's Shoes", "Kids' Clothing", "Kids' Shoes", "Bags & Luggage", "Sunglasses", "Belts & Accessories", "Jewelry", "Hats & Caps"],
      brands: ["Nike", "Adidas", "Puma", "Zara", "H&M", "Levi's", "Gap", "Tommy Hilfiger", "Calvin Klein", "Ralph Lauren", "2Wolf"],
      fields: ["size", "color", "material", "gender", "fit", "pattern", "weight"]
    },
    "Watches": {
      subcategories: ["Men's Watches", "Women's Watches", "Smart Watches", "Sports Watches", "Luxury Watches", "Kids' Watches", "Digital Watches", "Analog Watches", "Chronograph Watches"],
      brands: ["Casio", "Fossil", "Tommy Hilfiger", "Diesel", "Titan", "Timex", "Seiko", "Citizen", "Rolex", "Omega", "Apple", "Samsung", "Garmin", "Fitbit", "2Wolf"],
      fields: ["movement", "bandMaterial", "caseStyle", "waterResistance", "gender", "color", "weight", "warranty"]
    },
    "Telecommunications": {
      subcategories: ["Landline Phones", "Cordless Phones", "Conference Phones", "Phone Accessories", "Answering Machines", "Caller ID Phones", "VoIP Phones"],
      brands: ["Panasonic", "Philips", "Gigaset", "Motorola", "VTech", "AT&T", "Uniden", "2Wolf"],
      fields: ["color", "material", "weight", "dimensions", "warranty"]
    },
    "Audio & Radio": {
      subcategories: ["Portable Radios", "Home Radio Systems", "Car Radios", "Internet Radios", "Two-Way Radios", "AM/FM Radios", "DAB Radios", "Vintage Radios"],
      brands: ["Sony", "Panasonic", "Philips", "JBL", "Bose", "Marshall", "Roberts", "Pure", "Sangean", "2Wolf"],
      fields: ["color", "powerWattage", "weight", "dimensions", "warranty"]
    },
    "Sports & Outdoors": {
      subcategories: ["Exercise Equipment", "Outdoor Recreation", "Team Sports", "Cycling", "Camping & Hiking", "Fitness Trackers", "Yoga & Pilates", "Swimming"],
      brands: ["Nike", "Adidas", "Under Armour", "Reebok", "Puma", "The North Face", "Columbia", "2Wolf"],
      fields: ["size", "color", "material", "gender", "weight", "warranty"]
    },
    "Beauty & Personal Care": {
      subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances", "Personal Care Appliances", "Nail Care", "Bath & Body", "Men's Grooming"],
      brands: ["L'Oreal", "Maybelline", "Nivea", "Dove", "Garnier", "Olay", "Neutrogena", "Clinique", "2Wolf"],
      fields: ["size", "color", "material", "gender", "weight"]
    },
    "Toys & Games": {
      subcategories: ["Action Figures", "Board Games", "Building Blocks", "Dolls & Accessories", "Educational Toys", "Electronic Toys", "Outdoor Play", "Puzzles"],
      brands: ["LEGO", "Barbie", "Hot Wheels", "Nerf", "Hasbro", "Mattel", "Fisher-Price", "2Wolf"],
      fields: ["size", "color", "material", "weight", "warranty"]
    },
    "Books": {
      subcategories: ["Fiction", "Non-Fiction", "Children's Books", "Educational", "Comics & Graphic Novels", "Religious Books", "Self-Help", "Biographies"],
      brands: ["Penguin", "HarperCollins", "Random House", "Simon & Schuster", "Oxford", "Cambridge", "2Wolf"],
      fields: ["weight", "dimensions"]
    },
    "Grocery & Food": {
      subcategories: ["Snacks", "Beverages", "Canned Goods", "Dairy Products", "Frozen Foods", "Bakery Items", "Condiments", "Breakfast Foods"],
      brands: ["Nestle", "Coca-Cola", "PepsiCo", "Kraft", "Kellogg's", "General Mills", "2Wolf"],
      fields: ["weight", "dimensions"]
    }
  };

  const availableFields = [
    { value: 'size', label: 'Size' },
    { value: 'color', label: 'Color' },
    { value: 'material', label: 'Material' },
    { value: 'gender', label: 'Gender' },
    { value: 'processor', label: 'Processor' },
    { value: 'ram', label: 'RAM' },
    { value: 'storage', label: 'Storage' },
    { value: 'screenSize', label: 'Screen Size' },
    { value: 'movement', label: 'Movement (Watch)' },
    { value: 'bandMaterial', label: 'Band Material' },
    { value: 'caseStyle', label: 'Case Style' },
    { value: 'waterResistance', label: 'Water Resistance' },
    { value: 'fit', label: 'Fit' },
    { value: 'pattern', label: 'Pattern' },
    { value: 'capacity', label: 'Capacity' },
    { value: 'powerWattage', label: 'Power (Wattage)' },
    { value: 'voltage', label: 'Voltage' },
    { value: 'weight', label: 'Weight' },
    { value: 'dimensions', label: 'Dimensions' },
    { value: 'warranty', label: 'Warranty' }
  ];

  useEffect(() => {
    fetchCategories();
    if (editProduct) {
      loadProductData(editProduct);
    } else {
      generateIDs();
    }
  }, [editProduct]);

  const generateIDs = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const productID = `PROD-${timestamp}-${random}`;
    setGeneratedID(productID);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`);
      const data = await response.json();
      if (data.success) {
        setCategories(data.flatList || []);
      }
      const savedCustomCategories = localStorage.getItem('customCategories');
      if (savedCustomCategories) {
        setCustomCategories(JSON.parse(savedCustomCategories));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadProductData = (product) => {
    setFormData({
      name: product.name || '',
      price: product.price || '',
      stock: product.stock || '',
      category: product.category || '',
      subCategory: product.subCategory || '',
      brand: product.brand || '2Wolf',
      description: product.description || '',
      discount: product.discount || 0,
      featured: product.featured || false,
      bestSeller: product.bestSeller || false,
      size: product.size || '',
      color: product.color || '',
      material: product.material || '',
      gender: product.gender || '',
      processor: product.processor || '',
      ram: product.ram || '',
      storage: product.storage || '',
      screenSize: product.screenSize || '',
      movement: product.movement || '',
      bandMaterial: product.bandMaterial || '',
      caseStyle: product.caseStyle || '',
      waterResistance: product.waterResistance || '',
      fit: product.fit || '',
      pattern: product.pattern || '',
      heelType: product.heelType || '',
      closureType: product.closureType || '',
      capacity: product.capacity || '',
      powerWattage: product.powerWattage || '',
      voltage: product.voltage || '',
      weight: product.weight || '',
      dimensions: product.dimensions || '',
      warranty: product.warranty || '',
      variants: product.variants || []
    });
    setImageInputs(product.images || ['']);
    setPreviewImages(product.images || []);
    setGeneratedID(product._id || '');
    setGeneratedSKU(product.sku || '');
  };

  const generateSKU = (category, name) => {
    const categoryPrefix = category.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, '') || 'CAT';
    const namePrefix = name.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, '') || 'PRO';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const sku = `${categoryPrefix}-${namePrefix}-${randomNum}`;
    setGeneratedSKU(sku);
    return sku;
  };

  useEffect(() => {
    if (formData.category && formData.name && !editProduct) {
      generateSKU(formData.category, formData.name);
    }
  }, [formData.category, formData.name, editProduct]);

  const handleAddCustomCategory = () => {
    if (!newCategory.name.trim()) {
      alert('Please enter a category name');
      return;
    }
    const newCat = {
      name: newCategory.name,
      subcategories: newCategory.subCategories.filter(s => s.trim() !== ''),
      brands: newCategory.brands.filter(b => b.trim() !== ''),
      fields: newCategory.fields || []
    };

    const updated = [...customCategories, newCat];
    setCustomCategories(updated);
    localStorage.setItem('customCategories', JSON.stringify(updated));

    setNewCategory({ name: '', subCategories: [''], brands: [''], fields: [] });
    setShowAddCategory(false);
    alert('Category added successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const validImages = imageInputs.filter(img => img.trim() !== '');
      const sku = editProduct ? editProduct.sku : generateSKU(formData.category, formData.name);

      const categoryData = defaultCategories[formData.category] || customCategories.find(c => c.name === formData.category);
      const relevantFields = categoryData?.fields || [];

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        subCategory: formData.subCategory,
        brand: formData.brand,
        images: validImages,
        sku,
        discount: parseInt(formData.discount) || 0,
        featured: formData.featured,
        bestSeller: formData.bestSeller,
        variants: formData.variants
      };

      relevantFields.forEach(field => {
        if (formData[field]) {
          productData[field] = formData[field];
        }
      });

      const url = editProduct
        ? `${API_URL}/api/products/${editProduct._id}`
        : `${API_URL}/api/products`;

      const method = editProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();
      if (response.ok) {
        alert(editProduct ? 'Product updated successfully!' : 'Product added successfully!');
        onAdd(data.product);
        onClose();
      } else {
        alert(data.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (index, value) => {
    const newImageInputs = [...imageInputs];
    newImageInputs[index] = value;
    setImageInputs(newImageInputs);

    const newPreviews = [...previewImages];
    if (value.trim()) {
      newPreviews[index] = value;
    } else {
      newPreviews[index] = null;
    }
    setPreviewImages(newPreviews);
  };

  const addImageInput = () => {
    if (imageInputs.length < 5) {
      setImageInputs([...imageInputs, '']);
    }
  };

  const removeImageInput = (index) => {
    setImageInputs(imageInputs.filter((_, i) => i !== index) || ['']);
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { name: '', value: '', priceAdjustment: 0, stock: 0 }]
    });
  };

  const removeVariant = (index) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index)
    });
  };

  const updateVariant = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const getCurrentCategoryData = () => {
    return defaultCategories[formData.category] || customCategories.find(c => c.name === formData.category);
  };

  const categoryData = getCurrentCategoryData();
  const shouldShowField = (fieldName) => categoryData?.fields?.includes(fieldName);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 md:p-8 max-w-6xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#1A1A1A] z-10 pb-4 border-b border-[#2A2A2A]">
          <div>
            <h2 className="text-2xl font-bold text-[#E5E5E5]">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            {generatedID && (
              <p className="text-sm text-[#9CA3AF] mt-1">
                Product ID: <span className="text-[#6D28D9] font-mono">{generatedID}</span>
              </p>
            )}
            {generatedSKU && (
              <p className="text-sm text-[#9CA3AF]">
                SKU: <span className="text-[#6D28D9] font-mono">{generatedSKU}</span>
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-white text-2xl transition">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-[#E5E5E5] mb-2 font-medium">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20"
            />
          </div>

          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[#E5E5E5] font-medium">
                  Category <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="text-xs text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1 transition"
                >
                  <FaPlus size={10} /> Add Category
                </button>
              </div>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: '' })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 cursor-pointer"
              >
                <option value="">Select Category</option>
                {Object.keys(defaultCategories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                {customCategories.map((cat, idx) => (
                  <option key={`custom-${idx}`} value={cat.name}>{cat.name} (Custom)</option>
                ))}
              </select>
            </div>

            {formData.category && categoryData && (
              <div>
                <label className="block text-[#E5E5E5] mb-2 font-medium">Subcategory</label>
                <select
                  value={formData.subCategory}
                  onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 cursor-pointer"
                >
                  <option value="">Select Subcategory</option>
                  {categoryData.subcategories?.map((sub, idx) => (
                    <option key={idx} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Add Custom Category Modal */}
          {showAddCategory && (
            <div className="bg-[#0A0A0A] border-2 border-[#6D28D9] rounded-lg p-6 space-y-4 animate-fadeIn">
              <h3 className="text-[#E5E5E5] font-semibold text-lg flex items-center gap-2">
                <FaPlus className="text-[#6D28D9]" /> Add New Category
              </h3>

              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Category Name (e.g., Furniture)"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none"
              />

              {/* Subcategories */}
              <div className="space-y-2">
                <label className="text-sm text-[#9CA3AF] font-medium">Subcategories</label>
                {newCategory.subCategories.map((sub, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={sub}
                      onChange={(e) => {
                        const updated = [...newCategory.subCategories];
                        updated[idx] = e.target.value;
                        setNewCategory({ ...newCategory, subCategories: updated });
                      }}
                      placeholder={`Subcategory ${idx + 1}`}
                      className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
                    />
                    {newCategory.subCategories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = newCategory.subCategories.filter((_, i) => i !== idx);
                          setNewCategory({ ...newCategory, subCategories: updated });
                        }}
                        className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setNewCategory({ ...newCategory, subCategories: [...newCategory.subCategories, ''] })}
                  className="text-sm text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1"
                >
                  <FaPlus size={10} /> Add Subcategory
                </button>
              </div>

              {/* Brands */}
              <div className="space-y-2">
                <label className="text-sm text-[#9CA3AF] font-medium">Brands</label>
                {newCategory.brands.map((brand, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => {
                        const updated = [...newCategory.brands];
                        updated[idx] = e.target.value;
                        setNewCategory({ ...newCategory, brands: updated });
                      }}
                      placeholder={`Brand ${idx + 1}`}
                      className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
                    />
                    {newCategory.brands.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = newCategory.brands.filter((_, i) => i !== idx);
                          setNewCategory({ ...newCategory, brands: updated });
                        }}
                        className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setNewCategory({ ...newCategory, brands: [...newCategory.brands, ''] })}
                  className="text-sm text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1"
                >
                  <FaPlus size={10} /> Add Brand
                </button>
              </div>

              {/* Fields Selection */}
              <div className="space-y-2">
                <label className="text-sm text-[#9CA3AF] font-medium">Product Fields</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableFields.map(field => (
                    <label key={field.value} className="flex items-center gap-2 text-sm text-[#E5E5E5] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newCategory.fields?.includes(field.value)}
                        onChange={(e) => {
                          const fields = newCategory.fields || [];
                          if (e.target.checked) {
                            setNewCategory({ ...newCategory, fields: [...fields, field.value] });
                          } else {
                            setNewCategory({ ...newCategory, fields: fields.filter(f => f !== field.value) });
                          }
                        }}
                        className="w-4 h-4 accent-[#6D28D9]"
                      />
                      {field.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleAddCustomCategory}
                  className="flex-1 px-4 py-3 bg-[#6D28D9] text-white rounded-lg hover:bg-[#5B21B6] transition font-semibold flex items-center justify-center gap-2"
                >
                  <FaCheck /> Save Category
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  className="px-4 py-3 bg-[#2A2A2A] text-[#E5E5E5] rounded-lg hover:bg-[#3A3A3A] transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Brand */}
          <div>
            <label className="block text-[#E5E5E5] mb-2 font-medium">Brand</label>
            {formData.category && categoryData ? (
              <div className="flex gap-2">
                <select
                  value={formData.brand === 'custom' ? 'custom' : formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value === 'custom' ? 'custom' : e.target.value })}
                  className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none cursor-pointer"
                >
                  <option value="">Select Brand</option>
                  {categoryData.brands?.map((brand, idx) => (
                    <option key={idx} value={brand}>{brand}</option>
                  ))}
                  <option value="custom">Other (Type below)</option>
                </select>
                {formData.brand === 'custom' && (
                  <input
                    type="text"
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Enter brand name"
                    className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
                  />
                )}
              </div>
            ) : (
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g., 2Wolf, Samsung, Apple"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
              />
            )}
          </div>

          {/* Price, Stock, Discount */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#E5E5E5] mb-2 font-medium">
                Price (AED) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
              />
            </div>
            <div>
              <label className="block text-[#E5E5E5] mb-2 font-medium">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
              />
            </div>
            <div>
              <label className="block text-[#E5E5E5] mb-2 font-medium">Discount (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#E5E5E5] mb-2 font-medium">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              rows="4"
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#6D28D9] focus:outline-none resize-none"
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-[#E5E5E5] mb-2 font-medium">
              Product Images <span className="text-sm text-[#9CA3AF]">(Up to 5 images)</span>
            </label>
            <div className="space-y-3">
              {imageInputs.map((img, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder={`Image URL ${index + 1}`}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] pr-10"
                    />
                    {previewImages[index] && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8">
                        <img
                          src={previewImages[index]}
                          alt="Preview"
                          className="w-full h-full object-cover rounded"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                  </div>
                  {imageInputs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageInput(index)}
                      className="px-3 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              {imageInputs.length < 5 && (
                <button
                  type="button"
                  onClick={addImageInput}
                  className="text-sm text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1"
                >
                  <FaImage /> Add Another Image
                </button>
              )}
            </div>
          </div>

          {/* Category-Specific Fields */}
          {formData.category && categoryData && (
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-6 space-y-4">
              <h3 className="text-[#E5E5E5] font-semibold text-lg">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shouldShowField('size') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Size</label>
                    <input type="text" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} placeholder="e.g., S, M, L, XL, 42" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('color') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Color</label>
                    <input type="text" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} placeholder="e.g., Black, White, Blue" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('material') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Material</label>
                    <input type="text" value={formData.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })} placeholder="e.g., Cotton, Leather, Plastic" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('gender') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Gender</label>
                    <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer">
                      <option value="">Select</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                      <option value="Boys">Boys</option>
                      <option value="Girls">Girls</option>
                    </select>
                  </div>
                )}
                {shouldShowField('processor') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Processor</label>
                    <input type="text" value={formData.processor} onChange={(e) => setFormData({ ...formData, processor: e.target.value })} placeholder="e.g., Intel Core i5" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('ram') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">RAM</label>
                    <input type="text" value={formData.ram} onChange={(e) => setFormData({ ...formData, ram: e.target.value })} placeholder="e.g., 8GB, 16GB" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('storage') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Storage</label>
                    <input type="text" value={formData.storage} onChange={(e) => setFormData({ ...formData, storage: e.target.value })} placeholder="e.g., 256GB SSD" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('screenSize') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Screen Size</label>
                    <input type="text" value={formData.screenSize} onChange={(e) => setFormData({ ...formData, screenSize: e.target.value })} placeholder="e.g., 15.6 inch" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('movement') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Movement</label>
                    <select value={formData.movement} onChange={(e) => setFormData({ ...formData, movement: e.target.value })} className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer">
                      <option value="">Select</option>
                      <option value="Quartz">Quartz</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="Solar">Solar</option>
                      <option value="Digital">Digital</option>
                    </select>
                  </div>
                )}
                {shouldShowField('bandMaterial') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Band Material</label>
                    <input type="text" value={formData.bandMaterial} onChange={(e) => setFormData({ ...formData, bandMaterial: e.target.value })} placeholder="e.g., Leather, Stainless Steel" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('caseStyle') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Case Style</label>
                    <input type="text" value={formData.caseStyle} onChange={(e) => setFormData({ ...formData, caseStyle: e.target.value })} placeholder="e.g., Round, Square" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('waterResistance') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Water Resistance</label>
                    <input type="text" value={formData.waterResistance} onChange={(e) => setFormData({ ...formData, waterResistance: e.target.value })} placeholder="e.g., 50m, 100m" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('capacity') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Capacity</label>
                    <input type="text" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} placeholder="e.g., 1.5L, 5L" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('powerWattage') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Power (Wattage)</label>
                    <input type="text" value={formData.powerWattage} onChange={(e) => setFormData({ ...formData, powerWattage: e.target.value })} placeholder="e.g., 1000W" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('voltage') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Voltage</label>
                    <input type="text" value={formData.voltage} onChange={(e) => setFormData({ ...formData, voltage: e.target.value })} placeholder="e.g., 220V" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('weight') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Weight</label>
                    <input type="text" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} placeholder="e.g., 500g, 2kg" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('dimensions') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Dimensions</label>
                    <input type="text" value={formData.dimensions} onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })} placeholder="e.g., 30x20x15 cm" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('warranty') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Warranty</label>
                    <input type="text" value={formData.warranty} onChange={(e) => setFormData({ ...formData, warranty: e.target.value })} placeholder="e.g., 1 Year" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
                {shouldShowField('fit') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Fit</label>
                    <select value={formData.fit} onChange={(e) => setFormData({ ...formData, fit: e.target.value })} className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] cursor-pointer">
                      <option value="">Select</option>
                      <option value="Slim Fit">Slim Fit</option>
                      <option value="Regular Fit">Regular Fit</option>
                      <option value="Loose Fit">Loose Fit</option>
                      <option value="Oversized">Oversized</option>
                    </select>
                  </div>
                )}
                {shouldShowField('pattern') && (
                  <div>
                    <label className="block text-[#E5E5E5] text-sm mb-2">Pattern</label>
                    <input type="text" value={formData.pattern} onChange={(e) => setFormData({ ...formData, pattern: e.target.value })} placeholder="e.g., Solid, Striped" className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Variants */}
          <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E5E5E5] font-semibold text-lg">Product Variants (Optional)</h3>
              <button
                type="button"
                onClick={() => setShowVariants(!showVariants)}
                className="text-sm text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1"
              >
                {showVariants ? 'Hide' : 'Show'} Variants
              </button>
            </div>

            {showVariants && (
              <div className="space-y-4">
                {formData.variants.map((variant, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-[#1A1A1A] rounded-lg">
                    <input type="text" value={variant.name} onChange={(e) => updateVariant(index, 'name', e.target.value)} placeholder="Variant Name (e.g., Color)" className="px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                    <input type="text" value={variant.value} onChange={(e) => updateVariant(index, 'value', e.target.value)} placeholder="Value (e.g., Red)" className="px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                    <input type="number" value={variant.priceAdjustment} onChange={(e) => updateVariant(index, 'priceAdjustment', e.target.value)} placeholder="Price +/- (AED)" className="px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                    <div className="flex gap-2">
                      <input type="number" value={variant.stock} onChange={(e) => updateVariant(index, 'stock', e.target.value)} placeholder="Stock" className="flex-1 px-4 py-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5]" />
                      <button type="button" onClick={() => removeVariant(index)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addVariant} className="text-sm text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1">
                  <FaPlus size={10} /> Add Variant
                </button>
              </div>
            )}
          </div>

          {/* Featured & Best Seller */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-[#E5E5E5] cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5 accent-[#6D28D9]" />
              <span className="font-medium">Featured Product</span>
            </label>
            <label className="flex items-center gap-2 text-[#E5E5E5] cursor-pointer">
              <input type="checkbox" checked={formData.bestSeller} onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })} className="w-5 h-5 accent-[#6D28D9]" />
              <span className="font-medium">Best Seller</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-[#2A2A2A]">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-[#6D28D9] to-[#5B21B6] text-white rounded-lg hover:from-[#5B21B6] hover:to-[#4C1D95] transition font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaCheck />
                  <span>{editProduct ? 'Update Product' : 'Add Product'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 bg-[#2A2A2A] text-[#E5E5E5] rounded-lg hover:bg-[#3A3A3A] transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;