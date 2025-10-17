import { useState } from 'react'
import useQuotationAI from './hooks/useQuotationAI'
import QuotationForm from './components/QuotationForm'
import QuotationDisplay from './components/QuotationDisplay'
import SampleExamples from './components/SampleExamples'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { loading, quote, error, generateQuote } = useQuotationAI();
  const [selectedExample, setSelectedExample] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            QuotationAI ⚡
          </h1>
          <p className="text-gray-600">
            Generate professional quotations instantly with AI
          </p>
        </div>

        {/* Sample Examples */}
        <SampleExamples 
          onSelectExample={setSelectedExample} 
          loading={loading} 
        />

        {/* Form */}
        <QuotationForm 
          onGenerate={generateQuote} 
          loading={loading} 
          initialValue={selectedExample}
        />

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Quotation Display */}
        {!loading && <QuotationDisplay quote={quote} />}

        {/* Footer */}
        <footer className="text-center mt-12 py-6 text-gray-500 text-sm">
          <p>Powered by Google Gemini AI • Built with React + Tailwind CSS</p>
          <p className="mt-1">Generate professional quotations in seconds ⚡</p>
        </footer>
      </div>
    </div>
  )
}

export default App
