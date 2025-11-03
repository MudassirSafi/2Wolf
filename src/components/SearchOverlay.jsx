import React, { useState } from "react";

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center z-[100] text-white">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-gray-300 hover:text-[#EAB308] text-3xl transition"
      >
        <i className="fas fa-times"></i>
      </button>

      {/* Search Input */}
      <div className="w-[90%] max-w-2xl text-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
          className="w-full py-4 px-6 rounded-xl text-xl text-black focus:outline-none"
        />
        <button
          className="mt-6 bg-[#EAB308] hover:bg-[#d4a007] text-black font-semibold px-8 py-3 rounded-lg transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
