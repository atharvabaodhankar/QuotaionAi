import { useState, useEffect } from 'react';

function useCurrencyConverter() {
  const [rates, setRates] = useState({
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095
  });
  const [loading, setLoading] = useState(false);

  const symbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  // Fetch real exchange rates (using a free API)
  const fetchRates = async () => {
    setLoading(true);
    try {
      // Using exchangerate-api.com (free tier)
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
      const data = await response.json();
      
      if (data.rates) {
        setRates({
          INR: 1,
          USD: data.rates.USD || 0.012,
          EUR: data.rates.EUR || 0.011,
          GBP: data.rates.GBP || 0.0095
        });
      }
    } catch (error) {
      console.log('Using fallback exchange rates');
      // Keep default rates if API fails
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const convertCurrency = (amount, toCurrency = 'INR') => {
    const converted = amount * rates[toCurrency];
    return `${symbols[toCurrency]}${Math.round(converted).toLocaleString()}`;
  };

  return { rates, symbols, convertCurrency, loading, fetchRates };
}

export default useCurrencyConverter;