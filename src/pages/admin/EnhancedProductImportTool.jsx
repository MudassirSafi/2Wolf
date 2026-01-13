// pages/admin/EnhancedProductImportTool.jsx - UPDATED WITH VIDEO SUPPORT
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ManualEntryMethod from '../../components/admin/import-methods/ManualEntryMethod';
import PasteTextMethod from '../../components/admin/import-methods/PasteTextMethod';
import ImageUrlsMethod from '../../components/admin/import-methods/ImageUrlsMethod';
import AIGenerateMethod from '../../components/admin/import-methods/AIGenerateMethod';
import ProductPreview from '../../components/admin/product-sections/ProductPreview';
import { 
  FaCloudUploadAlt, FaFileUpload, FaPaste, FaImages, FaRobot 
} from 'react-icons/fa';

const EnhancedProductImportTool = () => {
  const [activeMethod, setActiveMethod] = useState('manual');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [categories, setCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [imageInputs, setImageInputs] = useState(['', '', '', '', '', '', '', '', '', '']); // ✅ 10 images
  const [previewImages, setPreviewImages] = useState([]);
  const [generatedSKU, setGeneratedSKU] = useState('');
  const [generatedID, setGeneratedID] = useState('');

  const API_BASE_URL = 'http://localhost:5000';

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    subCategory: '',
    brand: '2Wolf',
    images: [],
    videos: [], // ✅ NEW: Videos array
    description: '',
    discount: 0,
    featured: false,
    bestSeller: false,
    size: '',
    color: '',
    material: '',
    gender: '',
    processor: '',
    ram: '',
    storage: '',
    screenSize: '',
    movement: '',
    bandMaterial: '',
    caseStyle: '',
    waterResistance: '',
    fit: '',
    pattern: '',
    heelType: '',
    closureType: '',
    capacity: '',
    powerWattage: '',
    voltage: '',
    weight: '',
    dimensions: '',
    warranty: '',
    variants: [],
    features: [''],
    productDetails: [],
    colors: [],
    originalPrice: '',
    modelNumber: '',
    department: 'Unisex',
    freeDelivery: false,
    sellingFast: false,
    lowestPrice: false,
    showRecentlySold: false,
    recentlySoldCount: 0
  });

  const [imageUrls, setImageUrls] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');

  // ✅ UPDATED: More brands added to each category
  const defaultCategories = {
    "Electronics": {
      subcategories: ["Computers & Laptops", "Mobile Phones & Tablets", "Cameras & Photography", "Audio & Headphones", "TVs & Home Theater", "Gaming Consoles & Accessories", "Wearable Technology", "Smart Home Devices"],
      brands: [
        "Samsung", "Apple", "Sony", "LG", "Dell", "HP", "Lenovo", "ASUS", 
        "Huawei", "Xiaomi", "OnePlus", "Oppo", "Vivo", "Realme", "Nokia",
        "Microsoft", "Acer", "MSI", "Razer", "Alienware", "Canon", "Nikon",
        "Panasonic", "TCL", "Hisense", "Philips", "Bose", "JBL", "Beats",
        "Sennheiser", "Audio-Technica", "Logitech", "Corsair", "SteelSeries",
        "HyperX", "Google", "Amazon", "Roku", "Nvidia", "AMD", "Intel",
        "Fitbit", "Garmin", "Fossil", "TicWatch", "Amazfit", "2Wolf"
      ],
      fields: ["processor", "ram", "storage", "screenSize", "color", "weight", "dimensions", "warranty"]
    },
    "Home & Kitchen": {
      subcategories: [
        "Hair Dryers", "Hair Straighteners", "Hair Curlers", "Shavers & Trimmers", 
        "Electric Toothbrushes", "Coffee Makers", "Blenders & Mixers", "Air Fryers", 
        "Microwave Ovens", "Refrigerators", "Vacuum Cleaners", "Water Purifiers", 
        "Cookware Sets", "Kitchen Appliances", "Pressure Cookers", "Rice Cookers", 
        "Juicers", "Food Processors", "Dishwashers", "Washing Machines", "Dryers"
      ],
      brands: [
        "BLACK+DECKER", "Philips", "NINJA", "Braun", "Panasonic", "Kenwood", 
        "Tefal", "Moulinex", "Remington", "Babyliss", "Dyson", "Shark",
        "iRobot", "Roomba", "Bosch", "Siemens", "Electrolux", "Whirlpool",
        "KitchenAid", "Cuisinart", "Hamilton Beach", "Oster", "Breville",
        "Instant Pot", "Crock-Pot", "De'Longhi", "Nespresso", "Keurig",
        "Ninja Foodi", "PowerXL", "NutriBullet", "Vitamix", "Blendtec",
        "Hoover", "Bissell", "Eureka", "Dirt Devil", "Miele", "Rowenta",
        "T-fal", "Farberware", "Calphalon", "All-Clad", "Lodge", "2Wolf"
      ],
      fields: ["capacity", "powerWattage", "voltage", "material", "color", "weight", "dimensions", "warranty"]
    },
    "Fashion": {
      subcategories: [
        "Men's Clothing", "Women's Clothing", "Men's Shoes", "Women's Shoes", 
        "Kids' Clothing", "Kids' Shoes", "Bags & Luggage", "Sunglasses", 
        "Belts & Accessories", "Jewelry", "Hats & Caps", "Scarves & Shawls",
        "Activewear", "Swimwear", "Formal Wear", "Casual Wear"
      ],
      brands: [
        "Nike", "Adidas", "Puma", "Zara", "H&M", "Levi's", "Gap", 
        "Tommy Hilfiger", "Calvin Klein", "Ralph Lauren", "Gucci", "Prada",
        "Louis Vuitton", "Versace", "Armani", "Dolce & Gabbana", "Burberry",
        "Michael Kors", "Coach", "Kate Spade", "Fossil", "Guess", "Lacoste",
        "Hugo Boss", "Diesel", "Vans", "Converse", "New Balance", "Reebok",
        "Under Armour", "Skechers", "Clarks", "Timberland", "Dr. Martens",
        "UGG", "Crocs", "Birkenstock", "Hush Puppies", "Ecco", "Geox",
        "Mango", "Forever 21", "American Eagle", "Abercrombie & Fitch",
        "Hollister", "Uniqlo", "Massimo Dutti", "Pull&Bear", "Bershka",
        "Stradivarius", "Topshop", "Topman", "Superdry", "Jack & Jones",
        "Only", "Vero Moda", "Selected", "Esprit", "Next", "Marks & Spencer",
        "2Wolf"
      ],
      fields: ["size", "color", "material", "gender", "fit", "pattern", "weight"]
    },
    "Watches": {
      subcategories: [
        "Men's Watches", "Women's Watches", "Smart Watches", "Sports Watches", 
        "Luxury Watches", "Kids' Watches", "Digital Watches", "Analog Watches", 
        "Chronograph Watches", "Dive Watches", "Pilot Watches"
      ],
      brands: [
        "Casio", "Fossil", "Tommy Hilfiger", "Diesel", "Titan", "Timex", 
        "Seiko", "Citizen", "Rolex", "Omega", "Apple", "Samsung", "Garmin", 
        "Fitbit", "Tag Heuer", "Breitling", "IWC", "Patek Philippe", "Audemars Piguet",
        "Cartier", "Bulgari", "Hublot", "Panerai", "Jaeger-LeCoultre", "Vacheron Constantin",
        "A. Lange & Söhne", "Blancpain", "Chopard", "Piaget", "Richard Mille",
        "Tissot", "Longines", "Hamilton", "Oris", "Rado", "Mido", "Certina",
        "Swatch", "Flik Flak", "Orient", "Bulova", "Invicta", "Movado",
        "Michael Kors", "Daniel Wellington", "MVMT", "Nixon", "G-Shock",
        "Amazfit", "Huawei Watch", "TicWatch", "Withings", "Polar", "Suunto",
        "2Wolf"
      ],
      fields: ["movement", "bandMaterial", "caseStyle", "waterResistance", "gender", "color", "weight", "warranty"]
    },
    "Telecommunications": {
      subcategories: [
        "Landline Phones", "Cordless Phones", "Conference Phones", 
        "Phone Accessories", "Answering Machines", "Caller ID Phones", 
        "VoIP Phones", "Intercom Systems", "Telephone Cables"
      ],
      brands: [
        "Panasonic", "Philips", "Gigaset", "Motorola", "VTech", "AT&T", 
        "Uniden", "BT", "Alcatel", "Siemens", "Polycom", "Cisco", "Avaya",
        "Yealink", "Grandstream", "Snom", "Fanvil", "Htek", "Plantronics",
        "Jabra", "Logitech", "Konftel", "ClearOne", "2Wolf"
      ],
      fields: ["color", "material", "weight", "dimensions", "warranty"]
    },
    "Sports & Outdoors": {
      subcategories: [
        "Exercise Equipment", "Outdoor Recreation", "Team Sports", "Cycling", 
        "Camping & Hiking", "Fitness Trackers", "Yoga & Pilates", "Swimming",
        "Running", "Golf", "Tennis", "Basketball", "Football", "Cricket"
      ],
      brands: [
        "Nike", "Adidas", "Under Armour", "Reebok", "Puma", "The North Face", 
        "Columbia", "Patagonia", "Arc'teryx", "Marmot", "Mountain Hardwear",
        "REI", "Osprey", "Deuter", "Gregory", "Kelty", "Big Agnes", "MSR",
        "Black Diamond", "Petzl", "Camp", "Wild Country", "DMM", "Mammut",
        "Salomon", "Merrell", "Keen", "La Sportiva", "Scarpa", "Asolo",
        "Lowa", "Vasque", "Oboz", "Altra", "Hoka One One", "Brooks",
        "Saucony", "New Balance", "Mizuno", "Asics", "Garmin", "Polar",
        "Suunto", "TomTom", "Wahoo", "Stages", "SRM", "PowerTap",
        "Specialized", "Trek", "Giant", "Cannondale", "Scott", "Merida",
        "Bianchi", "Cervelo", "Pinarello", "Colnago", "Look", "Shimano",
        "SRAM", "Campagnolo", "Wilson", "Spalding", "Rawlings", "Easton",
        "Louisville Slugger", "DeMarini", "Babolat", "Head", "Yonex",
        "Prince", "Dunlop", "Penn", "Titleist", "Callaway", "TaylorMade",
        "Ping", "Cobra", "Mizuno Golf", "2Wolf"
      ],
      fields: ["size", "color", "material", "gender", "weight", "warranty"]
    },
    "Beauty & Personal Care": {
      subcategories: [
        "Skincare", "Makeup", "Hair Care", "Fragrances", "Personal Care Appliances", 
        "Nail Care", "Bath & Body", "Men's Grooming", "Oral Care", "Shaving & Hair Removal"
      ],
      brands: [
        "L'Oreal", "Maybelline", "Nivea", "Dove", "Garnier", "Olay", "Neutrogena", 
        "Clinique", "Estée Lauder", "Lancôme", "MAC", "Bobbi Brown", "NARS",
        "Urban Decay", "Too Faced", "Anastasia Beverly Hills", "Benefit", "Tarte",
        "Stila", "Smashbox", "bareMinerals", "IT Cosmetics", "NYX", "ColourPop",
        "e.l.f.", "Wet n Wild", "Revlon", "CoverGirl", "Rimmel", "Bourjois",
        "Max Factor", "Sally Hansen", "OPI", "Essie", "China Glaze", "Zoya",
        "Pantene", "Head & Shoulders", "Herbal Essences", "TRESemmé", "Aussie",
        "Sunsilk", "Schwarzkopf", "Wella", "Redken", "Paul Mitchell", "Matrix",
        "Joico", "Kerastase", "Moroccanoil", "Living Proof", "Aveda", "Bumble and bumble",
        "The Body Shop", "Bath & Body Works", "Victoria's Secret", "Lush",
        "Kiehl's", "Origins", "Fresh", "Tatcha", "Drunk Elephant", "The Ordinary",
        "CeraVe", "Cetaphil", "La Roche-Posay", "Vichy", "Bioderma", "Eucerin",
        "Aveeno", "St. Ives", "Simple", "Pond's", "Vaseline", "Johnson & Johnson",
        "Gillette", "Schick", "Braun", "Philips Norelco", "Panasonic", "Remington",
        "Conair", "Wahl", "Andis", "Oster", "BaBylissPRO", "Hot Tools",
        "Chi", "GHD", "T3", "Dyson Airwrap", "Revlon Hair Tools", "2Wolf"
      ],
      fields: ["size", "color", "material", "gender", "weight"]
    },
    "Perfumes & Fragrances": {
      subcategories: [
        "Perfumes", "Attars", "Bakhoor", "Essential Oils", "Gift Sets", 
        "Body Mists", "Eau de Parfum", "Eau de Toilette", "Cologne"
      ],
      brands: [
        "Tom Ford", "Chanel", "Dior", "Versace", "Armani", "Gucci", "Prada",
        "Dolce & Gabbana", "Burberry", "Calvin Klein", "Ralph Lauren", "Hugo Boss",
        "Yves Saint Laurent", "Givenchy", "Hermès", "Paco Rabanne", "Jean Paul Gaultier",
        "Thierry Mugler", "Issey Miyake", "Kenzo", "Lancôme", "Estée Lauder",
        "Clinique", "Elizabeth Arden", "Marc Jacobs", "Michael Kors", "Coach",
        "Bulgari", "Cartier", "Montblanc", "Davidoff", "Carolina Herrera",
        "Viktor & Rolf", "Narciso Rodriguez", "Jo Malone", "Creed", "Acqua di Parma",
        "Byredo", "Le Labo", "Maison Francis Kurkdjian", "Diptyque", "Frederic Malle",
        "Serge Lutens", "Amouage", "Bond No. 9", "Roja Parfums", "Clive Christian",
        "Ajmal", "Rasasi", "Swiss Arabian", "Al Haramain", "Nabeel", "Ard Al Zaafaran",
        "Lattafa", "Afnan", "Armaf", "Paris Corner", "Khalis", "Al Rehab",
        "Arabian Oud", "Abdul Samad Al Qurashi", "Nasomatto", "Xerjoff", "Nishane",
        "Memo Paris", "Escentric Molecules", "Penhaligon's", "Comme des Garçons",
        "L'Artisan Parfumeur", "Annick Goutal", "Editions de Parfums", "Atelier Cologne",
        "Commodity", "Clean", "Philosophy", "Tocca", "Nest", "Derek Lam", "2Wolf"
      ],
      fields: ["size", "gender", "weight"]
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
    generateIDs();
  }, []);

  const generateIDs = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const productID = `PROD-${timestamp}-${random}`;
    setGeneratedID(productID);
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
    if (formData.category && formData.name) {
      generateSKU(formData.category, formData.name);
    }
  }, [formData.category, formData.name]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
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

  const getCurrentCategoryData = () => {
    return defaultCategories[formData.category] || customCategories.find(c => c.name === formData.category);
  };

  const handleManualSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const validImages = imageInputs.filter(img => img.trim() !== '');
      const sku = generateSKU(formData.category, formData.name);
      const categoryData = getCurrentCategoryData();
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
        videos: formData.videos.filter(v => v.url && v.url.trim() !== ''), // ✅ Include videos
        sku,
        discount: parseInt(formData.discount) || 0,
        featured: formData.featured,
        bestSeller: formData.bestSeller,
        variants: formData.variants,
        freeDelivery: formData.freeDelivery,
        sellingFast: formData.sellingFast,
        lowestPrice: formData.lowestPrice,
        showRecentlySold: formData.showRecentlySold,
        recentlySoldCount: formData.recentlySoldCount,
        features: formData.features.filter(f => f.trim() !== ''),
        productDetails: formData.productDetails.filter(d => d.label && d.value),
        colors: formData.colors.filter(c => c.name && c.image),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        modelNumber: formData.modelNumber,
        department: formData.department
      };

      relevantFields.forEach(field => {
        if (formData[field]) {
          productData[field] = formData[field];
        }
      });

      console.log('📦 Product data prepared:', {
        ...productData,
        videosCount: productData.videos.length,
        imagesCount: productData.images.length
      });

      setProduct(productData);
    } catch (err) {
      setError('Failed to process product data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUrlsImport = async () => {
    setLoading(true);
    setError('');

    try {
      const urls = imageUrls.split('\n').filter(url => url.trim());
      
      // ✅ Support up to 10 images
      const limitedUrls = urls.slice(0, 10);
      const newImageInputs = [...limitedUrls];
      while (newImageInputs.length < 10) {
        newImageInputs.push('');
      }
      
      setImageInputs(newImageInputs);
      setPreviewImages(limitedUrls);
      alert(`${limitedUrls.length} images imported successfully! (Max 10)`);
    } catch (err) {
      setError('Failed to import images');
    } finally {
      setLoading(false);
    }
  };

  const handleTextPaste = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/import-product-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productText: pastedText })
      });

      const data = await response.json();
      if (data.success) {
        setProduct(data.product);
      }
    } catch (err) {
      setError('Failed to parse text');
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/generate-product-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          prompt: aiPrompt,
          category: formData.category 
        })
      });

      const data = await response.json();
      if (data.success) {
        setProduct(data.product);
      } else {
        setError(data.message || 'AI generation failed');
      }
    } catch (err) {
      setError('AI generation error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async () => {
    try {
      const productToSave = product || formData;
      
      console.log('💾 Saving product:', {
        name: productToSave.name,
        imagesCount: productToSave.images?.length || 0,
        videosCount: productToSave.videos?.length || 0,
        featuresCount: productToSave.features?.length || 0
      });

      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productToSave)
      });

      if (response.ok) {
        alert('✅ Product saved successfully!');
        // Reset form
        setProduct(null);
        setFormData({
          name: '', price: '', stock: '', category: '', subCategory: '', 
          brand: '2Wolf', images: [], videos: [], description: '', discount: 0,
          featured: false, bestSeller: false, size: '', color: '', material: '',
          gender: '', processor: '', ram: '', storage: '', screenSize: '',
          movement: '', bandMaterial: '', caseStyle: '', waterResistance: '',
          fit: '', pattern: '', heelType: '', closureType: '', capacity: '',
          powerWattage: '', voltage: '', weight: '', dimensions: '', warranty: '',
          variants: [], features: [''], productDetails: [], colors: [],
          originalPrice: '', modelNumber: '', department: 'Unisex',
          freeDelivery: false, sellingFast: false, lowestPrice: false,
          showRecentlySold: false, recentlySoldCount: 0
        });
        setImageInputs(['', '', '', '', '', '', '', '', '', '']); // ✅ Reset to 10 empty slots
        setPreviewImages([]);
        setPastedText('');
        setImageUrls('');
        setAiPrompt('');
        generateIDs();
      } else {
        const errorData = await response.json();
        alert('❌ Failed to save product: ' + (errorData.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6D28D9] to-[#A855F7] rounded-lg flex items-center justify-center">
                  <FaCloudUploadAlt className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#E5E5E5]">Professional Product Import</h1>
                  <p className="text-[#A0A0A0] text-sm">Amazon-style product management system - Up to 10 images & video support</p>
                </div>
              </div>
              {generatedID && (
                <div className="text-right">
                  <p className="text-xs text-[#9CA3AF]">Product ID</p>
                  <p className="text-sm text-[#6D28D9] font-mono">{generatedID}</p>
                  {generatedSKU && (
                    <p className="text-xs text-[#9CA3AF] mt-1">SKU: <span className="text-[#6D28D9]">{generatedSKU}</span></p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Method Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setActiveMethod('manual')}
              className={`p-4 rounded-xl transition border ${
                activeMethod === 'manual'
                  ? 'bg-gradient-to-br from-[#6D28D9] to-[#A855F7] text-white border-transparent'
                  : 'bg-[#1A1A1A] text-[#E5E5E5] border-[#2A2A2A] hover:border-[#6D28D9]'
              }`}
            >
              <FaFileUpload className="text-2xl mb-2 mx-auto" />
              <p className="font-semibold text-sm">Detailed Entry</p>
            </button>

            <button
              onClick={() => setActiveMethod('paste')}
              className={`p-4 rounded-xl transition border ${
                activeMethod === 'paste'
                  ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white border-transparent'
                  : 'bg-[#1A1A1A] text-[#E5E5E5] border-[#2A2A2A] hover:border-[#10B981]'
              }`}
            >
              <FaPaste className="text-2xl mb-2 mx-auto" />
              <p className="font-semibold text-sm">Paste Text</p>
            </button>

            <button
              onClick={() => setActiveMethod('images')}
              className={`p-4 rounded-xl transition border ${
                activeMethod === 'images'
                  ? 'bg-gradient-to-br from-[#EC4899] to-[#DB2777] text-white border-transparent'
                  : 'bg-[#1A1A1A] text-[#E5E5E5] border-[#2A2A2A] hover:border-[#EC4899]'
              }`}
            >
              <FaImages className="text-2xl mb-2 mx-auto" />
              <p className="font-semibold text-sm">Image URLs</p>
            </button>

            <button
              onClick={() => setActiveMethod('ai')}
              className={`p-4 rounded-xl transition border ${
                activeMethod === 'ai'
                  ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white border-transparent'
                  : 'bg-[#1A1A1A] text-[#E5E5E5] border-[#2A2A2A] hover:border-[#F59E0B]'
              }`}
            >
              <FaRobot className="text-2xl mb-2 mx-auto" />
              <p className="font-semibold text-sm">AI Generate</p>
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Method Components */}
          {activeMethod === 'manual' && (
            <ManualEntryMethod 
              formData={formData}
              setFormData={setFormData}
              loading={loading}
              showAdvanced={showAdvanced}
              setShowAdvanced={setShowAdvanced}
              imageInputs={imageInputs}
              setImageInputs={setImageInputs}
              previewImages={previewImages}
              setPreviewImages={setPreviewImages}
              generatedSKU={generatedSKU}
              categories={categories}
              customCategories={customCategories}
              setCustomCategories={setCustomCategories}
              defaultCategories={defaultCategories}
              availableFields={availableFields}
              handleManualSubmit={handleManualSubmit}
            />
          )}

          {activeMethod === 'paste' && (
            <PasteTextMethod 
              pastedText={pastedText}
              setPastedText={setPastedText}
              handleTextPaste={handleTextPaste}
              loading={loading}
            />
          )}

          {activeMethod === 'images' && (
            <ImageUrlsMethod 
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              handleImageUrlsImport={handleImageUrlsImport}
              loading={loading}
              imageInputs={imageInputs}
            />
          )}

          {activeMethod === 'ai' && (
            <AIGenerateMethod 
              aiPrompt={aiPrompt}
              setAiPrompt={setAiPrompt}
              handleAIGenerate={handleAIGenerate}
              loading={loading}
            />
          )}

          {/* Product Preview */}
          {product && (
            <ProductPreview 
              product={product}
              setProduct={setProduct}
              saveProduct={saveProduct}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EnhancedProductImportTool;