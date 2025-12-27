// src/pages/admin/AdminLayout.jsx - COMPLETE WORKING VERSION
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {  // ✅ MUST have { children }
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/dashboard/products', label: 'Products', icon: '📦' },
    { path: '/dashboard/import', label: 'Import Products', icon: '📥' },
    { path: '/dashboard/orders', label: 'Orders', icon: '🛒' },
    { path: '/dashboard/customers', label: 'Customers', icon: '👥' },
    { path: '/dashboard/shipping', label: 'Shipping', icon: '🚚' },
    { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#1A1A1A] border-r border-[#2A2A2A] transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between">
          <h1 className={`text-2xl font-bold bg-gradient-to-r from-[#6D28D9] to-[#A855F7] bg-clip-text text-transparent ${!isSidebarOpen && 'hidden'}`}>
            2Wolf Admin
          </h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[#E5E5E5] hover:text-[#6D28D9] transition">
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? 'bg-[#6D28D9] text-white'
                  : 'text-[#E5E5E5] hover:bg-[#2A2A2A]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Back to Store */}
        <div className="p-4 border-t border-[#2A2A2A]">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#E5E5E5] hover:bg-[#2A2A2A] transition"
          >
            <span className="text-xl">🏠</span>
            {isSidebarOpen && <span className="font-medium">Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#1A1A1A] border-b border-[#2A2A2A] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-[#E5E5E5]" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              ☰
            </button>
            <h2 className="text-xl font-semibold text-[#E5E5E5]">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-[#E5E5E5] hover:text-[#6D28D9] transition">🔔</button>
            <div className="w-10 h-10 rounded-full bg-[#6D28D9] flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* ✅ CRITICAL: Page Content - MUST render children */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#0A0A0A]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;