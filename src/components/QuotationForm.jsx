import { useState, useEffect } from 'react';

function QuotationForm({ onGenerate, loading, initialValue = '' }) {
  const [requirement, setRequirement] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requirement.trim()) {
      onGenerate(requirement);
    }
  };

  // Update requirement when initialValue changes
  useEffect(() => {
    setRequirement(initialValue);
  }, [initialValue]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Describe Your Project Requirements
      </h2>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="e.g., I want an ecommerce website for my clothing brand with admin panel and payment gateway"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        
        <button
          type="submit"
          disabled={loading || !requirement.trim()}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating Quotation...
            </div>
          ) : (
            'Generate Professional Quotation'
          )}
        </button>
      </form>
    </div>
  );
}

export default QuotationForm;