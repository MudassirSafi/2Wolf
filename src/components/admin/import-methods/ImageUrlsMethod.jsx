import React from 'react';
import { FaImages, FaSpinner } from 'react-icons/fa';

const ImageUrlsMethod = ({ 
  imageUrls, 
  setImageUrls, 
  handleImageUrlsImport, 
  loading,
  imageInputs 
}) => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
      <h2 className="text-xl font-bold text-[#E5E5E5] mb-4">Import Product Images</h2>
      <p className="text-[#A0A0A0] mb-6">
        Enter image URLs (one per line). We'll validate and import them.
      </p>
      <textarea
        value={imageUrls}
        onChange={(e) => setImageUrls(e.target.value)}
        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
        rows="8"
        className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#EC4899] focus:outline-none mb-4"
      />
      <button
        onClick={handleImageUrlsImport}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-[#EC4899] to-[#DB2777] text-white font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaImages />}
        {loading ? 'Importing...' : 'Import Images'}
      </button>

      {imageInputs.length > 1 && imageInputs.some(img => img.trim()) && (
        <div className="mt-6">
          <p className="text-[#E5E5E5] font-semibold mb-3">
            Imported Images ({imageInputs.filter(img => img.trim()).length}):
          </p>
          <div className="grid grid-cols-3 gap-3">
            {imageInputs.filter(img => img.trim()).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Import ${idx + 1}`}
                className="w-full h-32 object-cover rounded-lg border-2 border-[#2A2A2A]"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUrlsMethod;