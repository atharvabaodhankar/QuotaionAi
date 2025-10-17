function LoadingSpinner({ message = "Generating quotation..." }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated AI Brain */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-ping opacity-20"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            AI is working on your quotation
          </h3>
          <p className="text-gray-600">{message}</p>
        </div>
        
        {/* Progress Dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;