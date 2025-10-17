# QuotationAI ⚡

A professional quotation generator powered by Google's Gemini AI. Generate structured, detailed quotations from simple client requirements.

## Features

- 🤖 **AI-Powered**: Uses Gemini API to generate professional quotations
- 💰 **Flexible Pricing**: Apply discounts (10%, 20%, 30%, 50%)
- 🌍 **Multi-Currency**: Support for INR, USD, EUR
- 📱 **Responsive Design**: Beautiful Tailwind CSS interface
- ⚡ **Real-time**: Instant quotation generation

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **AI**: Google Gemini API
- **No Backend**: Pure client-side application

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Usage

1. Enter your project requirements in the text area
2. Click "Generate Professional Quotation"
3. View the structured quotation with services breakdown
4. Apply discounts and change currency as needed

## Example Input

```
I want an ecommerce website for my clothing brand with admin panel and payment gateway
```

## Example Output

The AI generates a structured quotation with:
- Project title and summary
- Detailed services breakdown
- Realistic pricing in Indian Rupees
- Estimated timeline
- Professional notes

## Environment Variables

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key

## License

MIT