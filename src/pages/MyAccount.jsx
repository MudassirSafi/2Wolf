// src/pages/MyAccount.jsx - Main Container
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, FaShoppingBag, FaUser, FaMapMarkerAlt, FaHeart, 
  FaStar, FaCog, FaSignOutAlt
} from 'react-icons/fa';

// Import components
import Overview from '../components/myAccount/Overview';
import MyOrders from './MyOrders';
import Profile from '../components/myAccount/Profile';
import Settings from '../components/myAccount/Settings';
import OrderDetailModal from '../components/myAccount/OrderDetailModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function MyAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: null
  });
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin', { state: { from: '/my-account' } });
    } else {
      fetchUserProfile();
      fetchMyOrders();
      fetchWishlist();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserProfile({
          name: data.user?.name || '',
          email: data.user?.email || '',
          phone: data.user?.phone || '',
          avatar: data.user?.avatar || null
        });
        if (data.user?.avatar) {
          setProfileImage(data.user.avatar);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchMyOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setWishlistCount(data.wishlist?.products?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaHome />, component: Overview },
    { id: "orders", label: "My Orders", icon: <FaShoppingBag />, badge: orders.length, component: MyOrders },
    { id: "profile", label: "Profile", icon: <FaUser />, component: Profile },
    { id: "addresses", label: "Addresses", icon: <FaMapMarkerAlt /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart />, badge: wishlistCount },
    { id: "reviews", label: "Reviews", icon: <FaStar /> },
    { id: "settings", label: "Settings", icon: <FaCog />, component: Settings },
  ];

  const PlaceholderComponent = ({ title }) => (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🚧</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">This feature is coming soon!</p>
    </div>
  );

  const renderContent = () => {
    const activeTabData = tabs.find(t => t.id === activeTab);
    const Component = activeTabData?.component;

    if (Component) {
      const props = {
        orders,
        loading,
        wishlistCount,
        setActiveTab,
        setSelectedOrder,
        userProfile,
        setUserProfile,
        profileImage,
        setProfileImage
      };
      return <Component {...props} />;
    }

    return <PlaceholderComponent title={activeTabData?.label} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white rounded-lg shadow-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your orders, profile, and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              {/* Profile Summary */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold border-4 border-white/30 overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        userProfile.name?.charAt(0)?.toUpperCase() || '?'
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <h3 className="font-bold text-lg mb-1 truncate w-full">{userProfile.name || 'Guest User'}</h3>
                  <p className="text-sm text-white/80 truncate w-full">{userProfile.email}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left transition-all mb-2 ${
                      activeTab === tab.id
                        ? 'bg-orange-50 text-orange-600 font-semibold shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{tab.icon}</span>
                      <span className="text-sm">{tab.label}</span>
                    </div>
                    {tab.badge > 0 && (
                      <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-semibold flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="w-64 bg-white h-full overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Profile */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border-4 border-white/30 overflow-hidden mb-3">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        userProfile.name?.charAt(0)?.toUpperCase() || '?'
                      )}
                    </div>
                    <h3 className="font-bold mb-1">{userProfile.name}</h3>
                    <p className="text-sm text-white/80 truncate w-full">{userProfile.email}</p>
                  </div>
                </div>

                {/* Nav */}
                <nav className="p-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left transition-all mb-2 ${
                        activeTab === tab.id
                          ? 'bg-orange-50 text-orange-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{tab.icon}</span>
                        <span className="text-sm">{tab.label}</span>
                      </div>
                      {tab.badge > 0 && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>

                <div className="p-4 border-t">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Main Content */}
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}