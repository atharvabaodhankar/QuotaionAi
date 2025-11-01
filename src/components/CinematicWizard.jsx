import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { gsap } from "gsap";
import Confetti from "react-confetti";
import {
  Sparkles,
  Zap,
  Rocket,
  Crown,
  Star,
  Heart,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Home,
  RefreshCw,
  Wand2,
  Globe,
  Smartphone,
  ShoppingCart,
  Cloud,
  Target,
  Code,
  Database,
  Shield,
  CreditCard,
  BarChart3,
  Plug,
  MessageCircle,
  Bot,
  Zap as Lightning,
  Monitor,
  Plus,
  X,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiFirebase,
} from "react-icons/si";
import useQuotationAI from "../hooks/useQuotationAI";
import QuotationDisplay from "./QuotationDisplay";
import LoadingSpinner from "./LoadingSpinner";

function CinematicWizard() {
  const { loading, quote, error, generateQuote } = useQuotationAI();
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const backgroundRef = useRef(null);
  const [formData, setFormData] = useState({
    appName: "",
    projectType: "",
    techStack: [],
    features: [],
    customFeatures: [],
    timeline: "",
    budget: "",
  });

  const [newFeature, setNewFeature] = useState("");

  const totalSteps = 7;

  const timelineOptions = [
    {
      value: "1-2 weeks",
      label: "1-2 weeks",
      desc: "Rush delivery",
      icon: Lightning,
      color: "text-red-600",
    },
    {
      value: "3-4 weeks",
      label: "3-4 weeks",
      desc: "Fast delivery",
      icon: Zap,
      color: "text-orange-600",
    },
    {
      value: "1-2 months",
      label: "1-2 months",
      desc: "Standard timeline",
      icon: Star,
      color: "text-blue-600",
    },
    {
      value: "2-3 months",
      label: "2-3 months",
      desc: "Complex project",
      icon: Crown,
      color: "text-purple-600",
    },
    {
      value: "3+ months",
      label: "3+ months",
      desc: "Large scale",
      icon: Rocket,
      color: "text-green-600",
    },
  ];

  const budgetOptions = [
    {
      value: "Under ₹5,000",
      label: "Under ₹5,000",
      desc: "Small project",
      icon: Heart,
      color: "text-green-600",
    },
    {
      value: "₹5,000 - ₹10,000",
      label: "₹5,000 - ₹10,000",
      desc: "Medium project",
      icon: Star,
      color: "text-blue-600",
    },
    {
      value: "₹10,000 - ₹20,000",
      label: "₹10,000 - ₹20,000",
      desc: "Large project",
      icon: Crown,
      color: "text-purple-600",
    },
    {
      value: "Above ₹20,000",
      label: "Above ₹20,000",
      desc: "Enterprise project",
      icon: Rocket,
      color: "text-orange-600",
    },
  ];

  // Background ambient animation
  useEffect(() => {
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: "200% 200%",
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  // Step transition sound effect (visual feedback)
  useEffect(() => {
    if (currentStep > 1) {
      // Trigger a subtle visual "ping" effect
      const ping = document.createElement("div");
      ping.className =
        "fixed top-4 right-4 w-4 h-4 bg-red-500 rounded-full animate-ping pointer-events-none z-50";
      document.body.appendChild(ping);
      setTimeout(() => document.body.removeChild(ping), 1000);
    }
  }, [currentStep]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setTimelineOpen(false);
        setBudgetOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100, scale: 0.95 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: -100, scale: 1.05 },
  };

  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.6,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
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
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(255, 71, 66, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const projectTypes = [
    {
      id: "website",
      name: "Website",
      icon: Globe,
      desc: "Static or dynamic websites",
      gradient: "from-blue-500 to-cyan-500",
      glow: "shadow-blue-500/25",
    },
    {
      id: "webapp",
      name: "Web App",
      icon: Monitor,
      desc: "Interactive applications",
      gradient: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/25",
    },
    {
      id: "mobile",
      name: "Mobile App",
      icon: Smartphone,
      desc: "iOS/Android apps",
      gradient: "from-green-500 to-emerald-500",
      glow: "shadow-green-500/25",
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      icon: ShoppingCart,
      desc: "Online stores",
      gradient: "from-orange-500 to-red-500",
      glow: "shadow-orange-500/25",
    },
    {
      id: "saas",
      name: "SaaS Platform",
      icon: Cloud,
      desc: "Software as a Service",
      gradient: "from-indigo-500 to-purple-500",
      glow: "shadow-indigo-500/25",
    },
    {
      id: "custom",
      name: "Custom",
      icon: Target,
      desc: "Something unique",
      gradient: "from-pink-500 to-rose-500",
      glow: "shadow-pink-500/25",
    },
  ];

  const techStacks = [
    {
      name: "React",
      icon: SiReact,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      glow: "hover:shadow-blue-500/20",
      brandColor: "#61DAFB",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: "bg-gray-50 text-gray-800 border-gray-200",
      glow: "hover:shadow-gray-500/20",
      brandColor: "#000000",
    },
    {
      name: "Vue.js",
      icon: SiVuedotjs,
      color: "bg-green-50 text-green-600 border-green-200",
      glow: "hover:shadow-green-500/20",
      brandColor: "#4FC08D",
    },
    {
      name: "Angular",
      icon: SiAngular,
      color: "bg-red-50 text-red-600 border-red-200",
      glow: "hover:shadow-red-500/20",
      brandColor: "#DD0031",
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
      color: "bg-green-50 text-green-700 border-green-200",
      glow: "hover:shadow-green-500/20",
      brandColor: "#339933",
    },
    {
      name: "Python",
      icon: SiPython,
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
      glow: "hover:shadow-yellow-500/20",
      brandColor: "#3776AB",
    },
    {
      name: "Tailwind",
      icon: SiTailwindcss,
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
      glow: "hover:shadow-cyan-500/20",
      brandColor: "#06B6D4",
    },
    {
      name: "Firebase",
      icon: SiFirebase,
      color: "bg-orange-50 text-orange-600 border-orange-200",
      glow: "hover:shadow-orange-500/20",
      brandColor: "#FFCA28",
    },
  ];

  const commonFeatures = [
    {
      name: "Login System",
      icon: Shield,
      desc: "User authentication & management",
    },
    {
      name: "Payment Gateway",
      icon: CreditCard,
      desc: "Secure payment processing",
    },
    { name: "Admin Dashboard", icon: BarChart3, desc: "Management interface" },
    { name: "API Integration", icon: Plug, desc: "Third-party services" },
    {
      name: "Chat Support",
      icon: MessageCircle,
      desc: "Customer communication",
    },
    {
      name: "AI Integration",
      icon: Bot,
      desc: "Artificial intelligence features",
    },
    {
      name: "Real-time Updates",
      icon: Lightning,
      desc: "Live data synchronization",
    },
    {
      name: "Mobile Responsive",
      icon: Smartphone,
      desc: "Works on all devices",
    },
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

  const handleSubmit = async () => {
    setIsGenerating(true);

    // Screen flash effect
    const flash = document.createElement("div");
    flash.className = "fixed inset-0 bg-white pointer-events-none z-50";
    flash.style.opacity = "0";
    document.body.appendChild(flash);

    gsap.to(flash, {
      opacity: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => document.body.removeChild(flash),
    });

    const requirement = `
App Name: ${formData.appName}
Project Type: ${formData.projectType}
Technology Stack: ${formData.techStack.join(", ")}
Key Features: ${formData.features.join(", ")}
${formData.customFeatures.length > 0 ? `Custom Features: ${formData.customFeatures.join(", ")}` : ''}
Timeline: ${formData.timeline}
Budget Range: ${formData.budget}
    `.trim();

    await generateQuote(requirement);

    // Trigger confetti and move to results
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setCurrentStep(totalSteps + 1);
    setIsGenerating(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.appName.length > 0;
      case 2:
        return formData.projectType.length > 0;
      case 3:
        return formData.techStack.length > 0;
      case 4:
        return formData.features.length > 0;
      case 5:
        return true; // Custom features step is optional, always valid
      case 6:
        return formData.timeline && formData.budget;
      case 7:
        return true;
      default:
        return false;
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
              onClick={() => {
                setCurrentStep(1);
                setFormData({
                  appName: "",
                  projectType: "",
                  techStack: [],
                  features: [],
                  timeline: "",
                  budget: "",
                });
              }}
              className="inline-flex items-center px-6 py-3 text-red-600 hover:text-red-800 transition-colors font-medium hover-lift rounded-xl bg-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} className="mr-2" />
              Create New Quote
            </motion.button>

            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl overflow-hidden bg-gradient-primary p-1">
                <img
                  src="/logo.png"
                  alt="QuotationAI"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <span className="font-display font-bold text-gray-800 text-xl">
                QuotationAI
              </span>
            </div>

            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium hover-lift rounded-xl bg-white shadow-lg"
            >
              <Home size={16} className="mr-2" />
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-body overflow-hidden relative">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={["#FF4742", "#FF6B68", "#E63946", "#7E57C2", "#42A5F5"]}
        />
      )}

      {/* Ambient background */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 71, 66, 0.1) 0%, #ffffff 50%),
            radial-gradient(circle at 80% 20%, rgba(126, 87, 194, 0.1) 0%, #ffffff 50%),
            radial-gradient(circle at 40% 80%, rgba(66, 165, 245, 0.1) 0%, #ffffff 50%)
          `,
          backgroundSize: "100% 100%",
        }}
      />

      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              background: `linear-gradient(45deg, #FF4742, #7E57C2)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * -200 - 100],
              scale: [1, Math.random() * 1.5 + 0.5, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
        {/* Header - Mobile Responsive */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-red-600 hover:text-red-800 transition-colors font-medium hover-lift rounded-xl bg-white/80 backdrop-blur-sm shadow-lg text-sm sm:text-base"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="text-center flex-1 order-first sm:order-none">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3">
              <motion.div
                className="size-10 sm:size-12 rounded-xl overflow-hidden bg-gradient-primary p-1 shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/logo.png"
                  alt="QuotationAI"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </motion.div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 font-display">
                QuotationAI
              </h1>
            </div>
            <p className="text-sm sm:text-base text-gray-600 font-body">
              Cinematic quotation experience
            </p>
          </div>

          <div className="w-0 sm:w-32"></div>
        </motion.div>

        {/* Progress Bar - Mobile Responsive */}
        <motion.div
          className="max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-medium text-gray-600 font-body">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-600 font-body">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner">
            <motion.div
              className="bg-gradient-primary h-2 sm:h-3 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Main Content - Mobile Responsive */}
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            >
              {/* Step 1: App Name - Mobile Responsive */}
              {currentStep === 1 && (
                <motion.div
                  className="p-6 sm:p-12 text-center min-h-[400px] sm:min-h-[500px] flex flex-col justify-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
                    <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-red-50 text-red-600 text-xs sm:text-sm font-medium border border-red-200 mb-6 sm:mb-8">
                      <Rocket size={16} className="mr-2" />
                      Free & Open Source AI Tool
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 font-display mb-3 sm:mb-4">
                      Welcome to QuotationAI ✨
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 font-body">
                      Let's create something amazing together
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
                    <TypeAnimation
                      sequence={[
                        "What kind of app or project is this quotation for?",
                        1000,
                      ]}
                      wrapper="h3"
                      speed={50}
                      className="text-lg sm:text-2xl font-semibold text-gray-700 font-display px-4"
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="max-w-md mx-auto px-4 sm:px-0"
                  >
                    <div className="relative">
                      <motion.input
                        type="text"
                        placeholder="Enter your project name..."
                        value={formData.appName}
                        onChange={(e) =>
                          updateFormData("appName", e.target.value)
                        }
                        className="w-full p-4 sm:p-6 text-lg sm:text-xl border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-body bg-white/50 backdrop-blur-sm"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-purple-500/20 -z-10"
                        animate={{
                          opacity: formData.appName ? 1 : 0,
                          scale: formData.appName ? 1 : 0.95,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Project Type - Mobile Responsive */}
              {currentStep === 2 && (
                <motion.div
                  className="p-6 sm:p-12 min-h-[400px] sm:min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={itemVariants}
                    className="text-center mb-8 sm:mb-12 px-4 sm:px-0"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-display mb-3 sm:mb-4">
                      What type of project are you working on?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 font-body">
                      Choose the category that best fits your vision
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0"
                    variants={containerVariants}
                  >
                    {projectTypes.map((type, index) => {
                      const IconComponent = type.icon;
                      return (
                        <motion.button
                          key={type.id}
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateFormData("projectType", type.id)}
                          className={`p-8 rounded-2xl border-2 transition-all text-left relative overflow-hidden backdrop-blur-sm ${
                            formData.projectType === type.id
                              ? `border-red-500 bg-red-50/80 shadow-2xl ${type.glow}`
                              : "border-gray-200/50 bg-white/60 hover:border-red-300 hover:bg-white/80"
                          }`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${
                              type.gradient
                            } opacity-0 transition-all duration-500 ${
                              formData.projectType === type.id
                                ? "opacity-20"
                                : "hover:opacity-5"
                            }`}
                          />

                          {/* Glow effect */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 blur-xl`}
                            animate={{
                              opacity:
                                formData.projectType === type.id ? 0.3 : 0,
                            }}
                            transition={{ duration: 0.5 }}
                          />

                          <div className="relative z-10">
                            <motion.div
                              className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/50 backdrop-blur-sm"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <IconComponent
                                size={32}
                                className={`${
                                  formData.projectType === type.id
                                    ? "text-red-600"
                                    : "text-gray-600"
                                } transition-colors`}
                              />
                            </motion.div>
                            <h3 className="font-bold text-gray-800 mb-3 font-display text-lg">
                              {type.name}
                            </h3>
                            <p className="text-sm text-gray-600 font-body leading-relaxed">
                              {type.desc}
                            </p>

                            {/* Selection indicator */}
                            <motion.div
                              className="absolute top-4 right-4"
                              animate={{
                                scale: formData.projectType === type.id ? 1 : 0,
                                rotate:
                                  formData.projectType === type.id ? 0 : 180,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <CheckCircle2
                                size={24}
                                className="text-red-500"
                              />
                            </motion.div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Tech Stack - Mobile Responsive */}
              {currentStep === 3 && (
                <motion.div
                  className="p-6 sm:p-12 min-h-[400px] sm:min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={itemVariants}
                    className="text-center mb-8 sm:mb-12 px-4 sm:px-0"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-display mb-3 sm:mb-4">
                      Choose your tech stack
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 font-body">
                      Select the technologies you'd like to use (multiple
                      selection)
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-0"
                    variants={containerVariants}
                  >
                    {techStacks.map((tech, index) => {
                      const IconComponent = tech.icon;
                      return (
                        <motion.button
                          key={tech.name}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            toggleArrayItem("techStack", tech.name)
                          }
                          className={`p-4 sm:p-6 rounded-xl border-2 transition-all font-medium backdrop-blur-sm relative overflow-hidden ${
                            formData.techStack.includes(tech.name)
                              ? `border-red-500 bg-red-50/80 shadow-2xl ${tech.glow} scale-105`
                              : `border-gray-200/50 ${tech.color} hover:border-red-300 bg-white/60`
                          }`}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {/* Pulse effect for selected items with brand color */}
                          <motion.div
                            className="absolute inset-0 rounded-xl"
                            style={{
                              backgroundColor: `${tech.brandColor}10`,
                            }}
                            animate={{
                              scale: formData.techStack.includes(tech.name)
                                ? [1, 1.05, 1]
                                : 1,
                              opacity: formData.techStack.includes(tech.name)
                                ? [0.3, 0.6, 0.3]
                                : 0,
                            }}
                            transition={{
                              duration: 2,
                              repeat: formData.techStack.includes(tech.name)
                                ? Infinity
                                : 0,
                              ease: "easeInOut",
                            }}
                          />

                          <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                              className="mb-2 sm:mb-3 p-2 sm:p-3 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              style={{
                                backgroundColor: formData.techStack.includes(
                                  tech.name
                                )
                                  ? `${tech.brandColor}15`
                                  : "rgba(255, 255, 255, 0.7)",
                              }}
                            >
                              <IconComponent
                                size={24}
                                style={{
                                  color: formData.techStack.includes(tech.name)
                                    ? tech.brandColor
                                    : "#6B7280",
                                }}
                                className="transition-all duration-300"
                              />
                            </motion.div>
                            <div className="text-xs sm:text-sm font-body font-semibold text-gray-800 text-center">
                              {tech.name}
                            </div>

                            {/* Selection indicator with brand color */}
                            <motion.div
                              className="absolute -top-1 -right-1"
                              animate={{
                                scale: formData.techStack.includes(tech.name)
                                  ? 1
                                  : 0,
                                rotate: formData.techStack.includes(tech.name)
                                  ? 0
                                  : 180,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                                style={{ backgroundColor: tech.brandColor }}
                              >
                                <CheckCircle2
                                  size={14}
                                  className="text-white"
                                />
                              </div>
                            </motion.div>
                          </div>
                        </motion.button>
                      );
                    })}
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
                  <motion.div
                    variants={itemVariants}
                    className="text-center mb-12"
                  >
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
                    {commonFeatures.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <motion.button
                          key={feature.name}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            toggleArrayItem("features", feature.name)
                          }
                          className={`p-6 rounded-xl border-2 transition-all text-left backdrop-blur-sm relative overflow-hidden ${
                            formData.features.includes(feature.name)
                              ? "border-red-500 bg-red-50/80 shadow-2xl"
                              : "border-gray-200/50 bg-white/60 hover:border-red-300 hover:bg-white/80"
                          }`}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {/* Glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 opacity-0"
                            animate={{
                              opacity: formData.features.includes(feature.name)
                                ? 1
                                : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />

                          <div className="flex items-center relative z-10">
                            <motion.div
                              className="mr-4 p-3 rounded-xl bg-white/50 backdrop-blur-sm"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <IconComponent
                                size={24}
                                className={`${
                                  formData.features.includes(feature.name)
                                    ? "text-red-600"
                                    : "text-gray-600"
                                } transition-colors`}
                              />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 font-display mb-1">
                                {feature.name}
                              </h3>
                              <p className="text-sm text-gray-600 font-body">
                                {feature.desc}
                              </p>
                            </div>
                            <motion.div
                              className="ml-4"
                              animate={{
                                scale: formData.features.includes(feature.name)
                                  ? [1, 1.2, 1]
                                  : 1,
                              }}
                              transition={{
                                duration: 0.5,
                                repeat: formData.features.includes(feature.name)
                                  ? Infinity
                                  : 0,
                                repeatDelay: 2,
                              }}
                            >
                              {formData.features.includes(feature.name) ? (
                                <CheckCircle2
                                  size={24}
                                  className="text-red-500"
                                />
                              ) : (
                                <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                              )}
                            </motion.div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}

              {/* Step 5: Custom Features (Optional) */}
              {currentStep === 5 && (
                <motion.div
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={itemVariants}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      Add Custom Features
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      Want something specific? Add your custom requirements (Optional)
                    </p>
                  </motion.div>

                  <motion.div
                    className="max-w-2xl mx-auto"
                    variants={containerVariants}
                  >
                    {/* Add Feature Input */}
                    <motion.div
                      variants={itemVariants}
                      className="mb-8"
                    >
                      <div className="flex gap-3">
                        <motion.input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          placeholder="e.g., Dark mode toggle, Email notifications, Social login..."
                          className="flex-1 px-4 py-3 border-2 border-gray-200/50 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:border-red-500 focus:bg-white/80 transition-all font-body"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && newFeature.trim()) {
                              setFormData(prev => ({
                                ...prev,
                                customFeatures: [...prev.customFeatures, newFeature.trim()]
                              }));
                              setNewFeature('');
                            }
                          }}
                          whileFocus={{ scale: 1.02 }}
                        />
                        <motion.button
                          onClick={() => {
                            if (newFeature.trim()) {
                              setFormData(prev => ({
                                ...prev,
                                customFeatures: [...prev.customFeatures, newFeature.trim()]
                              }));
                              setNewFeature('');
                            }
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!newFeature.trim()}
                        >
                          <Plus size={20} />
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Custom Features List */}
                    <motion.div
                      variants={containerVariants}
                      className="space-y-3"
                    >
                      <AnimatePresence>
                        {formData.customFeatures.map((feature, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl group hover:bg-white/80 transition-all"
                          >
                            <motion.div
                              className="w-2 h-2 bg-red-500 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="flex-1 text-gray-800 font-body">
                              {feature}
                            </span>
                            <motion.button
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  customFeatures: prev.customFeatures.filter((_, i) => i !== index)
                                }));
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-all"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X size={16} />
                            </motion.button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      
                      {formData.customFeatures.length === 0 && (
                        <motion.div
                          variants={itemVariants}
                          className="text-center py-12 text-gray-500"
                        >
                          <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ✨ No custom features added yet
                          </motion.div>
                          <p className="mt-2 text-sm">
                            Add specific features you need for your project
                          </p>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Skip Option */}
                    <motion.div
                      variants={itemVariants}
                      className="text-center mt-8"
                    >
                      <motion.button
                        onClick={() => setCurrentStep(6)}
                        className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        Skip this step →
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 6: Timeline & Budget */}
              {currentStep === 6 && (
                <motion.div
                  className="p-12 min-h-[500px]"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={itemVariants}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl font-bold text-gray-800 font-display mb-4">
                      Timeline & Budget
                    </h2>
                    <p className="text-lg text-gray-600 font-body">
                      Help us understand your project constraints
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Timeline Dropdown */}
                    <motion.div
                      variants={itemVariants}
                      className="relative dropdown-container"
                    >
                      <label className="block text-lg font-semibold text-gray-700 mb-4 font-display">
                        Preferred Timeline
                      </label>

                      {/* Custom Dropdown Trigger */}
                      <motion.button
                        onClick={() => setTimelineOpen(!timelineOpen)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm text-left flex items-center justify-between hover:border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-body"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          {formData.timeline ? (
                            <>
                              {(() => {
                                const selected = timelineOptions.find(
                                  (opt) => opt.value === formData.timeline
                                );
                                const IconComponent = selected?.icon;
                                return (
                                  <>
                                    <IconComponent
                                      size={20}
                                      className={`mr-3 ${selected?.color}`}
                                    />
                                    <div>
                                      <div className="font-semibold">
                                        {selected?.label}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {selected?.desc}
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}
                            </>
                          ) : (
                            <span className="text-gray-500">
                              Select timeline...
                            </span>
                          )}
                        </div>
                        <motion.div
                          animate={{ rotate: timelineOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight
                            size={20}
                            className="text-gray-400 rotate-90"
                          />
                        </motion.div>
                      </motion.button>

                      {/* Custom Dropdown Menu */}
                      <AnimatePresence>
                        {timelineOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden"
                          >
                            {timelineOptions.map((option, index) => {
                              const IconComponent = option.icon;
                              return (
                                <motion.button
                                  key={option.value}
                                  onClick={() => {
                                    updateFormData("timeline", option.value);
                                    setTimelineOpen(false);
                                  }}
                                  className="w-full p-4 text-left hover:bg-red-50 transition-colors flex items-center border-b border-gray-100 last:border-b-0"
                                  whileHover={{
                                    x: 4,
                                    backgroundColor: "rgba(255, 71, 66, 0.05)",
                                  }}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <IconComponent
                                    size={20}
                                    className={`mr-3 ${option.color}`}
                                  />
                                  <div>
                                    <div className="font-semibold text-gray-800">
                                      {option.label}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {option.desc}
                                    </div>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Budget Dropdown */}
                    <motion.div
                      variants={itemVariants}
                      className="relative dropdown-container"
                    >
                      <label className="block text-lg font-semibold text-gray-700 mb-4 font-display">
                        Budget Range
                      </label>

                      {/* Custom Dropdown Trigger */}
                      <motion.button
                        onClick={() => setBudgetOpen(!budgetOpen)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm text-left flex items-center justify-between hover:border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all font-body"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          {formData.budget ? (
                            <>
                              {(() => {
                                const selected = budgetOptions.find(
                                  (opt) => opt.value === formData.budget
                                );
                                const IconComponent = selected?.icon;
                                return (
                                  <>
                                    <IconComponent
                                      size={20}
                                      className={`mr-3 ${selected?.color}`}
                                    />
                                    <div>
                                      <div className="font-semibold">
                                        {selected?.label}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {selected?.desc}
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}
                            </>
                          ) : (
                            <span className="text-gray-500">
                              Select budget...
                            </span>
                          )}
                        </div>
                        <motion.div
                          animate={{ rotate: budgetOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight
                            size={20}
                            className="text-gray-400 rotate-90"
                          />
                        </motion.div>
                      </motion.button>

                      {/* Custom Dropdown Menu */}
                      <AnimatePresence>
                        {budgetOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden"
                          >
                            {budgetOptions.map((option, index) => {
                              const IconComponent = option.icon;
                              return (
                                <motion.button
                                  key={option.value}
                                  onClick={() => {
                                    updateFormData("budget", option.value);
                                    setBudgetOpen(false);
                                  }}
                                  className="w-full p-4 text-left hover:bg-red-50 transition-colors flex items-center border-b border-gray-100 last:border-b-0"
                                  whileHover={{
                                    x: 4,
                                    backgroundColor: "rgba(255, 71, 66, 0.05)",
                                  }}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <IconComponent
                                    size={20}
                                    className={`mr-3 ${option.color}`}
                                  />
                                  <div>
                                    <div className="font-semibold text-gray-800">
                                      {option.label}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {option.desc}
                                    </div>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 7: Summary */}
              {currentStep === 7 && (
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

                  <motion.div
                    variants={itemVariants}
                    className="bg-gray-50 rounded-2xl p-8 mb-8 text-left max-w-2xl mx-auto"
                  >
                    <TypeAnimation
                      sequence={[
                        `You're building a ${formData.projectType} called "${
                          formData.appName
                        }" using ${formData.techStack
                          .slice(0, 3)
                          .join(", ")} with features like ${formData.features
                          .slice(0, 3)
                          .join(", ")}. Timeline: ${
                          formData.timeline
                        }. Budget: ${
                          formData.budget
                        }. Let's create your professional quotation! 💼`,
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
                      disabled={isGenerating}
                      className="px-12 py-6 bg-gradient-primary text-white rounded-2xl font-bold text-xl shadow-2xl relative overflow-hidden disabled:opacity-70"
                      whileHover={{ scale: isGenerating ? 1 : 1.05 }}
                      whileTap={{ scale: isGenerating ? 1 : 0.95 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/30 to-white/5"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500 blur-xl opacity-50"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      <div className="relative z-10 flex items-center justify-center w-full">
                        <motion.div
                          animate={{ rotate: isGenerating ? 360 : 0 }}
                          transition={{
                            duration: 1,
                            repeat: isGenerating ? Infinity : 0,
                            ease: "linear",
                          }}
                          className="mr-3 flex items-center justify-center"
                        >
                          {isGenerating ? (
                            <RefreshCw size={24} />
                          ) : (
                            <Wand2 size={24} />
                          )}
                        </motion.div>
                        <span className="font-bold text-center">
                          {isGenerating
                            ? "Generating Magic..."
                            : "Generate Quotation"}
                        </span>
                        {!isGenerating && (
                          <div className="ml-3 flex items-center justify-center">
                            <Sparkles size={20} />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="bg-gray-50/80 backdrop-blur-sm px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center border-t border-gray-200/50">
                <motion.button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium rounded-xl hover:bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                  whileHover={{
                    scale: currentStep === 1 ? 1 : 1.05,
                    x: currentStep === 1 ? 0 : -2,
                  }}
                  whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
                >
                  <ArrowLeft size={16} className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </motion.button>

                <div className="flex space-x-2 sm:space-x-3">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <motion.div
                      key={i}
                      className={`relative rounded-full transition-all duration-500 ${
                        i + 1 <= currentStep ? "bg-red-500" : "bg-gray-300"
                      }`}
                      animate={{
                        width: i + 1 === currentStep ? 32 : 12,
                        height: 12,
                        opacity: i + 1 <= currentStep ? 1 : 0.5,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {/* Pulse effect for current step */}
                      {i + 1 === currentStep && (
                        <motion.div
                          className="absolute inset-0 bg-red-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                {currentStep < totalSteps ? (
                  <motion.button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-gradient-primary text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg backdrop-blur-sm text-sm sm:text-base"
                    whileHover={{
                      scale: isStepValid() ? 1.05 : 1,
                      x: isStepValid() ? 2 : 0,
                      boxShadow: isStepValid()
                        ? "0 10px 25px rgba(255, 71, 66, 0.3)"
                        : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight size={16} className="ml-1 sm:ml-2" />
                  </motion.button>
                ) : (
                  <div className="w-0 sm:w-24"></div>
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
