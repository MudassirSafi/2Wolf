import React, { useState } from "react";
import { motion } from "framer-motion";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState("orders");

  const tabs = [
    { id: "orders", label: "Order History" },
    { id: "profile", label: "Profile Info" },
    { id: "address", label: "Address Book" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex pt-24 px-8">
      {/* ✅ Sidebar */}
      <aside className="w-1/5 bg-white shadow-md rounded-2xl p-6 mr-10">
        <h2 className="text-xl font-semibold text-black mb-8">My Account</h2>
        <nav className="flex flex-col gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative text-left text-[16px] font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#6E2A6E] rounded-full"
                />
              )}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 bg-white shadow-md rounded-2xl p-8">
        {activeTab === "orders" && (
          <section>
            <h3 className="text-[18px] font-semibold text-black mb-6">
              Your Orders
            </h3>

            <div className="space-y-6">
              {/* Dummy Order 1 */}
              <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4">
                <div>
                  <h4 className="font-semibold text-black">Smart Watch Z1</h4>
                  <p className="text-sm text-gray-500">Ordered on Oct 20, 2025</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-[#6E2A6E] text-white text-sm px-3 py-1 rounded-md">
                    Delivered
                  </span>
                  <button className="border border-black text-[16px] px-3 py-1 rounded-md hover:bg-black hover:text-white transition">
                    View Details
                  </button>
                </div>
              </div>

              {/* Dummy Order 2 */}
              <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4">
                <div>
                  <h4 className="font-semibold text-black">Bluetooth Speaker X2</h4>
                  <p className="text-sm text-gray-500">Ordered on Sep 12, 2025</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-[#6E2A6E] text-white text-sm px-3 py-1 rounded-md">
                    Shipped
                  </span>
                  <button className="border border-black text-[16px] px-3 py-1 rounded-md hover:bg-black hover:text-white transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "profile" && (
          <section>
            <h3 className="text-[18px] font-semibold text-black mb-6">
              Edit Profile
            </h3>
            <form className="space-y-5 max-w-lg">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6E2A6E] outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6E2A6E] outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <button className="bg-[#6E2A6E] text-white px-5 py-2 rounded-lg hover:opacity-90">
                Save Changes
              </button>
            </form>
          </section>
        )}

        {activeTab === "address" && (
          <section>
            <h3 className="text-[18px] font-semibold text-black mb-6">
              Manage Address
            </h3>
            <form className="space-y-5 max-w-lg">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6E2A6E] outline-none"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">City</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6E2A6E] outline-none"
                  placeholder="New York"
                />
              </div>
              <button className="bg-[#6E2A6E] text-white px-5 py-2 rounded-lg hover:opacity-90">
                Save Address
              </button>
            </form>
          </section>
        )}

        {activeTab === "settings" && (
          <section>
            <h3 className="text-[18px] font-semibold text-black mb-6">
              Account Settings
            </h3>
            <p className="text-gray-500">Settings options coming soon...</p>
          </section>
        )}
      </main>
    </div>
  );
}
