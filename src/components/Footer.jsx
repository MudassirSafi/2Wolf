import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-gray-300 py-12 px-6 md:px-16 overflow-hidden">
      {/* ✨ Golden glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAB308]/10 via-[#FACC15]/5 to-transparent blur-3xl opacity-40 pointer-events-none"></div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 bg-[#111111]/70 p-8 rounded-2xl border border-[#EAB308]/10 shadow-[0_0_25px_rgba(234,179,8,0.25)] backdrop-blur-md">
        {/* Column 1: Logo and About */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#EAB308] drop-shadow-[0_0_10px_rgba(234,179,8,0.6)] mb-3">
            2Wolf
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Building next-generation web experiences — fast, bold, and visionary.
            Crafted for performance and perfection.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#FACC15] mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-[#EAB308] transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#returns" className="hover:text-[#EAB308] transition">
                Returns & Refunds Policy
              </a>
            </li>
            <li>
              <a href="#track" className="hover:text-[#EAB308] transition">
                Track My Order
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-[#EAB308] transition">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-[#EAB308] transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#FACC15] mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:info@2wolf.com"
                className="hover:text-[#EAB308] transition"
              >
                info@2wolf.com
              </a>
            </li>
            <li>Phone: +971 50 123 4567</li>
            <li>Location: Dubai, UAE</li>
          </ul>
        </div>

        {/* Column 4: Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#FACC15] mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="#"
              className="hover:text-[#EAB308] transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.8)]"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="hover:text-[#EAB308] transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.8)]"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="hover:text-[#EAB308] transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.8)]"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="hover:text-[#EAB308] transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.8)]"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="relative z-10 text-center text-sm text-gray-400 mt-10">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#EAB308]/40 to-transparent mb-4"></div>
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#EAB308] font-semibold">2Wolf</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
