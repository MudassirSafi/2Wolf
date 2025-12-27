import React from 'react';
import { FaRobot, FaSpinner } from 'react-icons/fa';

const AIGenerateMethod = ({ 
  aiPrompt, 
  setAiPrompt, 
  handleAIGenerate, 
  loading 
}) => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2A2A2A]">
      <h2 className="text-xl font-bold text-[#E5E5E5] mb-4">AI Product Generator</h2>
      <p className="text-[#A0A0A0] mb-6">
        Describe what product you want and AI will generate a complete listing!
      </p>
      <textarea
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        placeholder="Example: 'Create a luxury men's cologne inspired by Italian leather, warm spices, and tobacco. Target price around $120.'"
        rows="6"
        className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-[#E5E5E5] focus:border-[#F59E0B] focus:outline-none mb-4"
      />
      <button
        onClick={handleAIGenerate}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaRobot />}
        {loading ? 'AI Generating...' : 'Generate with AI'}
      </button>
      <p className="text-xs text-[#666] mt-3">
        💡 Requires ANTHROPIC_API_KEY in backend .env
      </p>
    </div>
  );
};

export default AIGenerateMethod;