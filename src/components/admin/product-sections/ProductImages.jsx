import React from 'react';
import { FaImages, FaTrash } from 'react-icons/fa';

const ProductImages = ({ 
  imageInputs, 
  setImageInputs, 
  previewImages, 
  setPreviewImages 
}) => {
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

  return (
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
                className="px-3 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
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
            <FaImages /> Add Another Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductImages;