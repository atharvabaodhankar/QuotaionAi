import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import useQuotationAI from "../hooks/useQuotationAI";
import QuotationDisplay from "./QuotationDisplay";
import LoadingSpinner from "./LoadingSpinner";

function CinematicWizard() {
  const { loading, quote, error, generateQuote } = useQuotationAI();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    appName: '',
    projectType: '',
    techStack: [],
    features: [],
    timeline: '',
    budget: ''
  });

  const totalSteps = 6;

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100, scale: 0.95 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: -100, scale: 1.05 }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.6
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(255, 71, 66, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const projectTypes = [
    { id: 'website', name: 'Website', icon: '🌐', desc: 'Static or dynamic websites', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'webapp', name: 'Web App', icon: '💻', desc: 'Interactive applications', gradient: 'from-purple-500 to-pink-500' },
    { id: 'mobile', name: 'Mobile App', icon: '📱', desc: 'iOS/Android apps', gradient: 'from-green-500 to-emerald-500' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒', desc: 'Online stores', gradient: 'from-orange-500 to-red-500' },
    { id: 'saas', name: 'SaaS Platform', icon: '☁️', desc: 'Software as a Service', gradient: 'from-indigo-500 to-purple-500' },
    { id: 'custom', name: 'Custom', icon: '🎯', desc: 'Something unique', gradient: 'from-pink-500 to-rose-500' }
  ];

  const techStacks = [
    { name: 'React', icon: '⚛️', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Next.js', icon: '▲', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    { name: 'Vue.js', icon: '💚', color: 'bg-green-100 text-green-700 border-green-200' },
    { name: 'Angular', icon: '🅰️', color: 'bg-red-100 text-red-700 border-red-200' },
    { name: 'Node.js', icon: '🟢', color: 'bg-green-100 text-green-700 border-green-200' },
    { name: 'Python', icon: '🐍', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { name: 'Tailwind', icon: '🎨', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    { name: 'Firebase', icon: '🔥', color: 'bg-orange-100 text-orange-700 border-orange-200' }
  ];

  const commonFeatures = [
    { name: 'Login System', icon: '🔐', desc: 'User authentication & management' },
    { name: 'Payment Gateway', icon: '💳', desc: 'Secure payment processing' },
    { name: 'Admin Dashboard', icon: '📊', desc: 'Management interface' },
    { name: 'API Integration', icon: '🔌', desc: 'Third-party services' },
    { name: 'Chat Support', icon: '💬', desc: 'Customer communication' },
    { name: 'AI Integration', icon: '🤖', desc: 'Artificial intelligence features' },
    { name: 'Real-time Updates', icon: '⚡', desc: 'Live data synchronization' },
    { name: 'Mobile Responsive', icon: '📱', desc: 'Works on all devices' }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleSubmit = () => {
    const requirement = `
App Name: ${formData.appName}
Project Type: ${formData.projectType}
Technology Stack: ${formData.techStack.join(', ')}
Key Features: ${formData.features.join(', ')}
Timeline: ${formData.timeline}
Budget Range: ${formData.budget}
    `.trim();

    generateQuote(requirement);
    setCurrentStep(totalSteps + 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.appName.length > 0;
      case 2: return formData.projectType.length > 0;
      case 3: return formData.techStack.length > 0;
      case 4: return formData.features.length > 0;
      case 5: return formData.timeline && formData.budget;
      case 6: return true;
      default: return false;
    }
  };

  // Results page
  if (currentStep === totalSteps + 1) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button 
              onClick={() => {setCurrentStep(1); setFormData({appName: '', projectType: '', techStack: [], features: [], timeline: '', budget: ''});}}
              className="inline-flex items-center px-6 py-3 text-red-600 hover:text-red-800 transition-colors font-medium hover-lift rounded-xl bg-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2 material-symbols-outlined">refresh</span>
              Create New Quote
            </motion.button>
            
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl overflow-hidden bg-gradient-primary p-1">
                <img src="/logo.png" alt="QuotationAI" className="w-full h-full object-contain filter brightness-0 invert" />
              </div>
              <span className="font-display font-bold text-gray-800 text-xl">QuotationAI</span>
            </div>
            
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium hover-lift rounded-xl bg-white shadow-lg"
            >
              <span className="mr-2 material-symbols-outlined">home</span>
              Back to Home
            </Link>
          </motion.div>

          {error && (
            <motion.div 
              className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="flex items-center">
                <span className="text-red-500 mr-3 text-2xl">⚠️</span>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          {loading && <LoadingSpinner />}
          {!loading && <QuotationDisplay quote={quote} />}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-body overflow-hidden">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-200 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 text-red-600 hover:text-red-800 transition-colors font-medium hover-lift rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
          >
            <span className="mr-2 material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
          
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-4 mb-3">
              <motion.div 
                className="size-12 rounded-xl overflow-hidden bg-gradient-primary p-1 shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <img src="/logo.png" alt="QuotationAI" className="w-full h-full object-contain filter brightness-0 invert" />
              </motion.div>
              <h1 className="text-4xl font-bold text-gray-800 font-display">QuotationAI</h1>
            </div>
            <p className="text-gray-600 font-body">Cinematic quotation experience</p>
          </div>
          
          <div className="w-32"></div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 font-body">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-600 font-body">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
            <motion.div 
              className="bg-gradient-primary h-2 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            >
              {/* Step 1: App Name */}
              {currentStep === 1 && (
                <motion.div 
                  className="p-12 text-center min-h-[500px] flex flex-col justify-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 font-display mb-4">
                      Welcome to QuotationAI ✨
                    </h2>
                    <p className="text-xl text-gray-600 font-body">
                      Let's create something amazing together
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mb-8">
                    <TypeAnimation
                      sequence={[
                        'What kind of app or project is this quotation for?',
                        1000,
                      ]}
                      wrapper="h3"
                      speed={50}
                      className="text-2xl font-semibold text-gray-700 font-display"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="max-w-md mx-auto">
                    <div className="relative">
                      <motion.input
                        type="text"
                        placeholder="Enter your project name..."
                        value={formData.appName}
                        onChange={(e) => updateFormData('appName', e.target.value)}
                        className="w-full p-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-body bg-white/50 backdrop-blur-sm"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-purple-500/20 -z-10"
                        animate={{
                          opacity: formData.appName ? 1 : 0,
                          scale: formData.appName ? 1 : 0.95
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Project Type */}
              {currentStep === 2 && (
                <motion.div 
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      What type of project are you working on?
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      Choose the category that best fits your vision
                    </p>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                  >
                    {projectTypes.map((type, index) => (
                      <motion.button
                        key={type.id}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateFormData('projectType', type.id)}
                        className={`p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden ${
                          formData.projectType === type.id
                            ? 'border-red-500 bg-red-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-red-300'
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 transition-opacity ${
                          formData.projectType === type.id ? 'opacity-10' : ''
                        }`} />
                        <div className="relative z-10">
                          <div className="text-4xl mb-4">{type.icon}</div>
                          <h3 className="font-bold text-gray-800 mb-2 font-display">{type.name}</h3>
                          <p className="text-sm text-gray-600 font-body">{type.desc}</p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Tech Stack */}
              {currentStep === 3 && (
                <motion.div 
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      Choose your tech stack
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      Select the technologies you'd like to use (multiple selection)
                    </p>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    variants={containerVariants}
                  >
                    {techStacks.map((tech, index) => (
                      <motion.button
                        key={tech.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleArrayItem('techStack', tech.name)}
                        className={`p-4 rounded-xl border-2 transition-all font-medium ${
                          formData.techStack.includes(tech.name)
                            ? 'border-red-500 bg-red-50 shadow-lg scale-105'
                            : `border-gray-200 ${tech.color} hover:border-red-300`
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="text-2xl mb-2">{tech.icon}</div>
                        <div className="text-sm font-body">{tech.name}</div>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4: Features */}
              {currentStep === 4 && (
                <motion.div 
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      Select key features
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      What functionality does your project need?
                    </p>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={containerVariants}
                  >
                    {commonFeatures.map((feature, index) => (
                      <motion.button
                        key={feature.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleArrayItem('features', feature.name)}
                        className={`p-6 rounded-xl border-2 transition-all text-left ${
                          formData.features.includes(feature.name)
                            ? 'border-red-500 bg-red-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-red-300'
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-center">
                          <span className="text-3xl mr-4">{feature.icon}</span>
                          <div>
                            <h3 className="font-bold text-gray-800 font-display">{feature.name}</h3>
                            <p className="text-sm text-gray-600 font-body">{feature.desc}</p>
                          </div>
                          <div className="ml-auto">
                            {formData.features.includes(feature.name) ? '✅' : '⬜'}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Step 5: Timeline & Budget */}
              {currentStep === 5 && (
                <motion.div 
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      Timeline & Budget
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      Help us understand your project constraints
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <motion.div variants={itemVariants}>
                      <label className="block text-lg font-semibold text-gray-700 mb-4 font-display">
                        Preferred Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => updateFormData('timeline', e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-body bg-white"
                      >
                        <option value="">Select timeline...</option>
                        <option value="1-2 weeks">1-2 weeks (Rush)</option>
                        <option value="3-4 weeks">3-4 weeks (Fast)</option>
                        <option value="1-2 months">1-2 months (Standard)</option>
                        <option value="2-3 months">2-3 months (Complex)</option>
                        <option value="3+ months">3+ months (Large scale)</option>
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-lg font-semibold text-gray-700 mb-4 font-display">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => updateFormData('budget', e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-body bg-white"
                      >
                        <option value="">Select budget...</option>
                        <option value="Under ₹50,000">Under ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                        <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                        <option value="Above ₹5,00,000">Above ₹5,00,000</option>
                      </select>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Summary */}
              {currentStep === 6 && (
                <motion.div 
                  className="p-12 min-h-[500px] text-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-6">
                      Perfect! Let's generate your quotation ✨
                    </h2>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-8 mb-8 text-left max-w-2xl mx-auto">
                    <TypeAnimation
                      sequence={[
                        `You're building a ${formData.projectType} called "${formData.appName}" using ${formData.techStack.slice(0, 3).join(', ')} with features like ${formData.features.slice(0, 3).join(', ')}. Timeline: ${formData.timeline}. Budget: ${formData.budget}. Let's create your professional quotation! 💼`,
                        1000,
                      ]}
                      wrapper="p"
                      speed={70}
                      className="text-lg text-gray-700 font-body leading-relaxed"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      onClick={handleSubmit}
                      className="px-12 py-4 bg-gradient-primary text-white rounded-2xl font-bold text-xl shadow-2xl relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <span className="relative z-10 flex items-center">
                        <span className="material-symbols-outlined mr-3">auto_awesome</span>
                        Generate Quotation
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="bg-gray-50/80 backdrop-blur-sm px-8 py-6 flex justify-between items-center border-t border-gray-200/50">
                <motion.button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium rounded-xl hover:bg-white/50"
                  whileHover={{ scale: currentStep === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
                >
                  <span className="material-symbols-outlined mr-2">arrow_back</span>
                  Previous
                </motion.button>
                
                <div className="flex space-x-3">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <motion.div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i + 1 <= currentStep ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                      animate={{
                        scale: i + 1 === currentStep ? 1.3 : 1,
                        opacity: i + 1 <= currentStep ? 1 : 0.5
                      }}
                    />
                  ))}
                </div>
                
                {currentStep < totalSteps ? (
                  <motion.button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-xl hover-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                    whileHover={{ scale: isStepValid() ? 1.05 : 1 }}
                    whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
                  >
                    Next
                    <span className="material-symbols-outlined ml-2">arrow_forward</span>
                  </motion.button>
                ) : (
                  <div className="w-24"></div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default CinematicWizard;