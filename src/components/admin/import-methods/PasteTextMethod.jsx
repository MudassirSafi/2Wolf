import React from 'react';
import { FaPaste, FaSpinner } from 'react-icons/fa';

const PasteTextMethod = ({ 
  pastedText, 
  setPastedText, 
  handleTextPaste, 
  loading 
}) => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
      <h2 className="text-xl font-bold text-[#E5E5E5] mb-4">Paste Product Details</h2>
      <p className="text-[#A0A0A0] mb-6">
        Copy product details from anywhere and paste here. Our system will extract the data.
      </p>
      <textarea
        value={pastedText}
        onChange={(e) => setPastedText(e.target.value)}
        placeholder="Paste product details here..."
        rows="12"
        className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#10B981] focus:outline-none mb-4"
      />
      <button
        onClick={handleTextPaste}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaPaste />}
        {loading ? 'Processing...' : 'Parse & Preview'}
      </button>
    </div>
  );
};

export default PasteTextMethod;