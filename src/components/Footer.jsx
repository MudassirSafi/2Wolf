import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-transparent text-gray-300 py-12 px-6 md:px-16 overflow-hidden backdrop-blur-xl">
      {/* Neon gradient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-indigo-900/10 to-transparent blur-3xl opacity-40 pointer-events-none"></div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 bg-white/5 p-8 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(138,43,226,0.4)] backdrop-blur-md">
        {/* Column 1: Logo and About */}
        <div>
          <h2 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_#a855f7] mb-3">2Wolf</h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Crafting futuristic web experiences — with precision, performance, and personality.  
            Every pixel, perfectly placed.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-purple-300 transition">About</a></li>
            <li><a href="#projects" className="hover:text-purple-300 transition">Projects</a></li>
            <li><a href="#experience" className="hover:text-purple-300 transition">Experience</a></li>
            <li><a href="#contact" className="hover:text-purple-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:info@2wolf.com" className="hover:text-purple-300">info@2wolf.com</a></li>
            <li>Phone: +92 300 1234567</li>
            <li>Location: Lahore, Pakistan</li>
          </ul>
        </div>

        {/* Column 4: Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-purple-400 transition-all duration-300 hover:drop-shadow-[0_0_6px_#a855f7]"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-purple-400 transition-all duration-300 hover:drop-shadow-[0_0_6px_#a855f7]"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-purple-400 transition-all duration-300 hover:drop-shadow-[0_0_6px_#a855f7]"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-purple-400 transition-all duration-300 hover:drop-shadow-[0_0_6px_#a855f7]"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="relative z-10 text-center text-sm text-gray-400 mt-10">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-4"></div>
        <p>© {new Date().getFullYear()} <span className="text-purple-400">2Wolf</span>. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
