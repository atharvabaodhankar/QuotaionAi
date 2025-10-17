import { useState } from "react";
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
5. Keep the pricing realistic and consistent with software industry standards.
6. Write short, clear, human-like summaries.

Now generate the quotation for this requirement:
${requirement}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
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