import { useState } from 'react';
import ExportButton from './ExportButton';
import useCurrencyConverter from '../hooks/useCurrencyConverter';

function QuotationDisplay({ quote }) {
  const [discount, setDiscount] = useState(0);
  const [currency, setCurrency] = useState('INR');
  const { convertCurrency, symbols } = useCurrencyConverter();
  
  if (!quote) return null;

  // Extract numeric value from price strings
  const extractPrice = (priceStr) => {
    const match = priceStr.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, '')) : 0;
  };

  const totalOriginal = extractPrice(quote.totalCost);
  const discountAmount = (totalOriginal * discount) / 100;
  const finalTotal = totalOriginal - discountAmount;

  // Currency conversion using real-time rates
  const formatCurrency = (amount) => convertCurrency(amount, currency);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h2 className="text-2xl font-bold">{quote.projectTitle}</h2>
        <p className="text-blue-100 mt-2">{quote.clientRequirementSummary}</p>
      </div>

      {/* Controls */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount
            </label>
            <select
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value={0}>No Discount</option>
              <option value={10}>10% Off</option>
              <option value={20}>20% Off</option>
              <option value={30}>30% Off</option>
              <option value={50}>50% Off</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Services Breakdown</h3>
        <div className="space-y-4">
          {quote.services.map((service, index) => (
            <div key={index} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{service.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              </div>
              <div className="text-right ml-4">
                <span className="font-semibold text-gray-800">
                  {formatCurrency(extractPrice(service.price))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="p-6 bg-gray-50 border-t">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Estimated Duration:</span>
            <span className="font-medium">{quote.estimatedDuration}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatCurrency(totalOriginal)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({discount}%):</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
            <span>Total Cost:</span>
            <span>{formatCurrency(finalTotal)}</span>
          </div>
        </div>
        
        {quote.notes && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> {quote.notes}
            </p>
          </div>
        )}

        {/* Export Buttons */}
        <ExportButton quote={quote} discount={discount} currency={currency} />
      </div>
    </div>
  );
}

export default QuotationDisplay;