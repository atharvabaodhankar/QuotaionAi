function SampleExamples({ onSelectExample, loading }) {
  const examples = [
    {
      title: "E-commerce Website",
      description: "I want an ecommerce website for my clothing brand with admin panel and payment gateway"
    },
    {
      title: "Mobile App",
      description: "I need a mobile app for food delivery with user registration, restaurant listings, and order tracking"
    },
    {
      title: "Portfolio Website",
      description: "I want a professional portfolio website for my photography business with gallery and contact form"
    },
    {
      title: "SaaS Dashboard",
      description: "I need a SaaS dashboard for project management with user authentication, team collaboration, and analytics"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Examples
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onSelectExample(example.description)}
            disabled={loading}
            className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="font-medium text-gray-800 text-sm">
              {example.title}
            </div>
            <div className="text-xs text-gray-600 mt-1 line-clamp-2">
              {example.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SampleExamples;