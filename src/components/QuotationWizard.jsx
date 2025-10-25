import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import useQuotationAI from "../hooks/useQuotationAI";
import QuotationDisplay from "./QuotationDisplay";
import LoadingSpinner from "./LoadingSpinner";

function QuotationWizard() {
  const { loading, quote, error, generateQuote } = useQuotationAI();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    customProjectType: "",
    techStack: [],
    customTech: "",
    projectScope: "",
    timeline: "",
    budget: "",
    features: [],
    customFeatures: "",
    clientType: "",
    additionalRequirements: "",
  });

  const totalSteps = 6;

  const projectTypes = [
    {
      id: "website",
      name: "Website",
      icon: "🌐",
      desc: "Static or dynamic websites",
    },
    {
      id: "webapp",
      name: "Web Application",
      icon: "💻",
      desc: "Interactive web applications",
    },
    {
      id: "mobile",
      name: "Mobile App",
      icon: "📱",
      desc: "iOS/Android applications",
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      icon: "🛒",
      desc: "Online stores & marketplaces",
    },
    {
      id: "saas",
      name: "SaaS Platform",
      icon: "☁️",
      desc: "Software as a Service",
    },
    {
      id: "api",
      name: "API/Backend",
      icon: "⚙️",
      desc: "Backend services & APIs",
    },
    {
      id: "custom",
      name: "Custom Project",
      icon: "🎯",
      desc: "Something else",
    },
  ];

  const techStacks = {
    website: [
      "React",
      "Vue.js",
      "Angular",
      "WordPress",
      "HTML/CSS/JS",
      "Next.js",
      "Gatsby",
    ],
    webapp: [
      "React",
      "Vue.js",
      "Angular",
      "Node.js",
      "Django",
      "Laravel",
      "Ruby on Rails",
    ],
    mobile: [
      "React Native",
      "Flutter",
      "Native iOS",
      "Native Android",
      "Ionic",
      "Xamarin",
    ],
    ecommerce: [
      "Shopify",
      "WooCommerce",
      "Magento",
      "Custom Build",
      "Stripe",
      "PayPal",
    ],
    saas: [
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "Kubernetes",
      "PostgreSQL",
    ],
    api: ["Node.js", "Python", "Java", "Go", "GraphQL", "REST API", "MongoDB"],
  };

  const commonFeatures = {
    website: [
      "Contact Form",
      "Blog",
      "SEO Optimization",
      "Analytics",
      "Social Media Integration",
    ],
    webapp: [
      "User Authentication",
      "Dashboard",
      "Real-time Updates",
      "File Upload",
      "Email Notifications",
    ],
    mobile: [
      "Push Notifications",
      "Offline Mode",
      "Camera Integration",
      "GPS/Location",
      "Social Login",
    ],
    ecommerce: [
      "Payment Gateway",
      "Inventory Management",
      "Order Tracking",
      "Reviews System",
      "Admin Panel",
    ],
    saas: [
      "Multi-tenancy",
      "Subscription Billing",
      "Analytics Dashboard",
      "API Access",
      "Team Management",
    ],
    api: [
      "Authentication",
      "Rate Limiting",
      "Documentation",
      "Monitoring",
      "Caching",
    ],
  };

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

  const handleSubmit = () => {
    const projectTypeDisplay =
      formData.projectType === "custom"
        ? formData.customProjectType
        : projectTypes.find((p) => p.id === formData.projectType)?.name;

    const techStackDisplay =
      formData.techStack.length > 0
        ? formData.techStack.join(", ")
        : formData.customTech;
    const featuresDisplay =
      formData.features.length > 0
        ? formData.features.join(", ")
        : formData.customFeatures;

    const requirement = `
Project Type: ${projectTypeDisplay}
Technology Stack: ${techStackDisplay}
Project Scope: ${formData.projectScope}
Timeline: ${formData.timeline}
Budget Range: ${formData.budget}
Key Features: ${featuresDisplay}
Client Type: ${formData.clientType}
Additional Requirements: ${formData.additionalRequirements}
    `.trim();

    generateQuote(requirement);
    setCurrentStep(totalSteps + 1); // Move to results step
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const getStepTitle = () => {
    const titles = {
      1: "What are you building?",
      2: "Choose your tech stack",
      3: "Project scope & timeline",
      4: "Key features",
      5: "Budget & client info",
      6: "Review & generate",
    };
    return titles[currentStep] || "Your Quotation";
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.projectType &&
          (formData.projectType !== "custom" || formData.customProjectType)
        );
      case 2:
        return formData.techStack.length > 0 || formData.customTech;
      case 3:
        return formData.projectScope && formData.timeline;
      case 4:
        return formData.features.length > 0 || formData.customFeatures;
      case 5:
        return formData.budget && formData.clientType;
      case 6:
        return true;
      default:
        return false;
    }
  };

  if (currentStep === totalSteps + 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-body">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8 animate-fadeInUp">
            <button
              onClick={() => {
                setCurrentStep(1);
                setFormData({
                  projectType: "",
                  customProjectType: "",
                  techStack: [],
                  customTech: "",
                  projectScope: "",
                  timeline: "",
                  budget: "",
                  features: [],
                  customFeatures: "",
                  clientType: "",
                  additionalRequirements: "",
                });
              }}
              className="inline-flex items-center px-4 py-2 text-red-600 hover:text-red-800 transition-colors font-medium hover-lift rounded-lg"
            >
              <span className="mr-2 material-symbols-outlined">refresh</span>
              Create New Quote
            </button>

            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg overflow-hidden bg-gradient-primary p-1">
                <img
                  src="/logo.png"
                  alt="QuotationAI"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <span className="font-display font-bold text-gray-800">
                QuotationAI
              </span>
            </div>

            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium hover-lift rounded-lg"
            >
              <span className="mr-2 material-symbols-outlined">home</span>
              Back to Home
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {loading && <LoadingSpinner />}
          {!loading && <QuotationDisplay quote={quote} />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-body">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fadeInUp">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-red-600 hover:text-red-800 transition-colors font-medium hover-lift rounded-lg"
          >
            <span className="mr-2 material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>

          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="size-10 rounded-lg overflow-hidden bg-gradient-primary p-1">
                <img
                  src="/logo.png"
                  alt="QuotationAI"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 font-display">
                QuotationAI Wizard
              </h1>
            </div>
            <p className="text-gray-600 mt-1 font-body">
              Professional quotations in 6 simple steps
            </p>
          </div>

          <div className="w-24"></div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8 animate-fadeInScale">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 font-body">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-600 font-body">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-primary h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto animate-fadeInUp">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift transition-all">
            {/* Step Header */}
            <div className="bg-gradient-primary text-white p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2 font-display">
                  {getStepTitle()}
                </h2>
                <p className="text-red-100 font-body">
                  Let's gather some details to create your perfect quotation
                </p>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-8 min-h-[400px]">
              {/* Step 1: Project Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => updateFormData("projectType", type.id)}
                        className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                          formData.projectType === type.id
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="text-3xl mb-3">{type.icon}</div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {type.name}
                        </h3>
                        <p className="text-sm text-gray-600">{type.desc}</p>
                      </button>
                    ))}
                  </div>

                  {formData.projectType === "custom" && (
                    <div className="mt-6">
                      <input
                        type="text"
                        placeholder="Describe your custom project type..."
                        value={formData.customProjectType}
                        onChange={(e) =>
                          updateFormData("customProjectType", e.target.value)
                        }
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Tech Stack */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {(techStacks[formData.projectType] || []).map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleArrayItem("techStack", tech)}
                        className={`p-4 rounded-lg border-2 transition-all text-sm font-medium ${
                          formData.techStack.includes(tech)
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300 text-gray-700"
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or specify custom technologies:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Custom framework, specific libraries..."
                      value={formData.customTech}
                      onChange={(e) =>
                        updateFormData("customTech", e.target.value)
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Scope & Timeline */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Scope & Description
                    </label>
                    <textarea
                      placeholder="Describe the project in detail - what it should do, who will use it, any specific requirements..."
                      value={formData.projectScope}
                      onChange={(e) =>
                        updateFormData("projectScope", e.target.value)
                      }
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) =>
                        updateFormData("timeline", e.target.value)
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select timeline...</option>
                      <option value="1-2 weeks">1-2 weeks (Rush job)</option>
                      <option value="3-4 weeks">
                        3-4 weeks (Fast delivery)
                      </option>
                      <option value="1-2 months">1-2 months (Standard)</option>
                      <option value="2-3 months">
                        2-3 months (Complex project)
                      </option>
                      <option value="3+ months">3+ months (Large scale)</option>
                      <option value="flexible">Flexible timeline</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Features */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(commonFeatures[formData.projectType] || []).map(
                      (feature) => (
                        <button
                          key={feature}
                          onClick={() => toggleArrayItem("features", feature)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            formData.features.includes(feature)
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-blue-300 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">
                              {formData.features.includes(feature)
                                ? "✅"
                                : "⬜"}
                            </span>
                            {feature}
                          </div>
                        </button>
                      )
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional custom features:
                    </label>
                    <textarea
                      placeholder="Any specific features not listed above..."
                      value={formData.customFeatures}
                      onChange={(e) =>
                        updateFormData("customFeatures", e.target.value)
                      }
                      className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Budget & Client */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => updateFormData("budget", e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select budget range...</option>
                      <option value="Under ₹50,000">Under ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">
                        ₹50,000 - ₹1,00,000
                      </option>
                      <option value="₹1,00,000 - ₹2,50,000">
                        ₹1,00,000 - ₹2,50,000
                      </option>
                      <option value="₹2,50,000 - ₹5,00,000">
                        ₹2,50,000 - ₹5,00,000
                      </option>
                      <option value="₹5,00,000 - ₹10,00,000">
                        ₹5,00,000 - ₹10,00,000
                      </option>
                      <option value="Above ₹10,00,000">Above ₹10,00,000</option>
                      <option value="Open to suggestions">
                        Open to suggestions
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Type
                    </label>
                    <select
                      value={formData.clientType}
                      onChange={(e) =>
                        updateFormData("clientType", e.target.value)
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select client type...</option>
                      <option value="Individual/Personal">
                        Individual/Personal
                      </option>
                      <option value="Small Business">Small Business</option>
                      <option value="Medium Business">Medium Business</option>
                      <option value="Large Enterprise">Large Enterprise</option>
                      <option value="Startup">Startup</option>
                      <option value="Non-profit">Non-profit</option>
                      <option value="Government">Government</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements
                    </label>
                    <textarea
                      placeholder="Any other specific requirements, constraints, or preferences..."
                      value={formData.additionalRequirements}
                      onChange={(e) =>
                        updateFormData("additionalRequirements", e.target.value)
                      }
                      className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Review Your Project Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">
                          Project Type:
                        </span>
                        <p className="text-gray-800">
                          {formData.projectType === "custom"
                            ? formData.customProjectType
                            : projectTypes.find(
                                (p) => p.id === formData.projectType
                              )?.name}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Tech Stack:
                        </span>
                        <p className="text-gray-800">
                          {formData.techStack.join(", ") || formData.customTech}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Timeline:
                        </span>
                        <p className="text-gray-800">{formData.timeline}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Budget:
                        </span>
                        <p className="text-gray-800">{formData.budget}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-600">
                          Features:
                        </span>
                        <p className="text-gray-800">
                          {formData.features.join(", ")}
                          {formData.customFeatures &&
                            (formData.features.length > 0 ? ", " : "") +
                              formData.customFeatures}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Ready to generate your professional quotation?
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        🤖 Our AI will analyze your requirements and create a
                        detailed, professional quotation with pricing breakdown,
                        timeline, and recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium rounded-lg hover:bg-gray-100"
              >
                <span className="material-symbols-outlined mr-2">
                  arrow_back
                </span>
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i + 1 <= currentStep
                        ? "bg-red-500 scale-110"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-lg hover-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Next
                  <span className="material-symbols-outlined ml-2">
                    arrow_forward
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="inline-flex items-center px-8 py-3 bg-gradient-primary text-white rounded-lg hover-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold animate-pulse"
                >
                  <span className="material-symbols-outlined mr-2">
                    auto_awesome
                  </span>
                  Generate Quotation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotationWizard;
