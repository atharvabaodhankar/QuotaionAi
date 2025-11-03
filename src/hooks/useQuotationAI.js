import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import analytics from "../utils/analytics";

function useQuotationAI() {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  async function generateQuote(requirement) {
    setLoading(true);
    setError(null);
    
    const prompt = `You are an expert quotation generator AI for a professional agency. Your job is to analyze client requirements and produce a complete, well-structured quotation with detailed cost breakdowns, timeline, and total.

Follow these exact rules:
1. Be formal, professional, and clear.
2. Show output in JSON format with the following structure:
{
  "projectTitle": "",
  "clientRequirementSummary": "",
  "services": [
    { "name": "", "description": "", "price": "" }
  ],
  "estimatedDuration": "",
  "totalCost": "",
  "notes": ""
}
3. Do not include any explanations or markdown formatting.
4. Currency should default to Indian Rupees (₹).
5. Keep the pricing affordable and budget-friendly. Total costs should typically be under ₹20,000 for most projects, with individual services priced between ₹1,000-₹5,000 each.
6. Write short, clear, human-like summaries.
7. IMPORTANT: If the App Name contains "To be decided" or "TBD", use EXACTLY that text as the projectTitle. Do not create or suggest any names.

Now generate the quotation for this requirement:
${requirement}`;

    try {
      console.log('API Key:', import.meta.env.VITE_GEMINI_API_KEY ? 'Present' : 'Missing');
      
      // Initialize the Google GenAI client
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      try {
        // Clean the response text to extract JSON
        const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const json = JSON.parse(cleanText);
        setQuote(json);
        
        // Track successful quotation generation
        const totalCost = json.totalCost ? parseInt(json.totalCost.replace(/[^\d]/g, '')) : 0;
        analytics.trackQuotationGenerated(json.projectTitle, totalCost);
      } catch (e) {
        console.error("Invalid JSON from Gemini:", text);
        setError("Failed to parse AI response. Please try again.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to generate quotation. Please check your API key and try again.");
    }
    
    setLoading(false);
  }

  return { loading, quote, error, generateQuote };
}

export default useQuotationAI;