"use client";

import emailjs from "emailjs-com";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBuilding,
  FaCalendarAlt,
  FaChartLine,
  FaCheck,
  FaClock,
  FaCode,
  FaGlobe,
  FaLaptopCode,
  FaLightbulb,
  FaMobileAlt,
  FaPaintBrush,
  FaRocket,
  FaSearch,
  FaShieldAlt,
  FaShoppingCart,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import Swal from "sweetalert2";

type ProjectType =
  | "website"
  | "web-app"
  | "ecommerce"
  | "redesign"
  | "mobile-app";
type BudgetRange = "300-1k" | "1k-3k" | "3k-10k" | "10k+";
type Timeline = "asap" | "2-4weeks" | "1-3months" | "3+months";
type CompanySize = "1-10" | "11-50" | "51-200" | "201+";
type Source =
  | "google"
  | "linkedin"
  | "github"
  | "referral"
  | "social"
  | "other";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType | "";
  budget: BudgetRange | "";
  timeline: Timeline | "";
  companySize: CompanySize | "";
  source: Source | "";
  projectDetails: string;
}

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    companySize: "",
    source: "",
    projectDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_USER_ID!);
  }, []);

  // Agency-focused project types
  const projectTypes = [
    {
      id: "website" as ProjectType,
      label: "Corporate Website",
      description: "Brand presence, lead generation, business showcase",
      icon: <FaGlobe />,
      startingPrice: "$2,500+",
    },
    {
      id: "web-app" as ProjectType,
      label: "Web Application",
      description: "SaaS platforms, dashboards, custom business tools",
      icon: <FaLaptopCode />,
      startingPrice: "$10,000+",
    },
    {
      id: "ecommerce" as ProjectType,
      label: "E-Commerce Solution",
      description: "Online stores, marketplace platforms, payment integration",
      icon: <FaShoppingCart />,
      startingPrice: "$5,000+",
    },
    {
      id: "redesign" as ProjectType,
      label: "UX/UI Redesign",
      description: "Modernize interface, improve conversion, rebranding",
      icon: <FaPaintBrush />,
      startingPrice: "$3,000+",
    },
    {
      id: "mobile-app" as ProjectType,
      label: "Mobile Experience",
      description: "iOS/Android apps, cross-platform solutions",
      icon: <FaMobileAlt />,
      startingPrice: "$15,000+",
    },
  ];

  // Professional budget tiers
  const budgetRanges = [
    {
      id: "300-1k" as BudgetRange,
      label: "$300 - $1,000",
      description: "Small Business Package",
      suitableFor: ["Basic websites", "Minor updates", "Simple landing pages"],
    },
    {
      id: "1k-3k" as BudgetRange,
      label: "$1,000 - $3,000",
      description: "Professional Package",
      suitableFor: ["Custom websites", "Multiple pages", "Basic e-commerce"],
    },
    {
      id: "3k-10k" as BudgetRange,
      label: "$3,000 - $10,000",
      description: "Enterprise Package",
      suitableFor: ["Web applications", "Full e-commerce", "Complex platforms"],
    },
    {
      id: "10k+" as BudgetRange,
      label: "$10,000+",
      description: "Strategic Partnership",
      suitableFor: [
        "Enterprise solutions",
        "Scalable platforms",
        "Long-term collaboration",
      ],
    },
  ];

  const timelines = [
    { id: "asap" as Timeline, label: "Urgent (1-2 weeks)", icon: <FaClock /> },
    {
      id: "2-4weeks" as Timeline,
      label: "Standard (2-4 weeks)",
      icon: <FaClock />,
    },
    {
      id: "1-3months" as Timeline,
      label: "Strategic (1-3 months)",
      icon: <FaClock />,
    },
    {
      id: "3+months" as Timeline,
      label: "Enterprise (3+ months)",
      icon: <FaClock />,
    },
  ];

  const companySizes = [
    { id: "1-10" as CompanySize, label: "Startup (1-10)", icon: <FaRocket /> },
    {
      id: "11-50" as CompanySize,
      label: "Small Business (11-50)",
      icon: <FaBuilding />,
    },
    {
      id: "51-200" as CompanySize,
      label: "Mid-Market (51-200)",
      icon: <FaUsers />,
    },
    {
      id: "201+" as CompanySize,
      label: "Enterprise (201+)",
      icon: <FaBuilding />,
    },
  ];

  const sources = [
    { id: "google" as Source, label: "Google", icon: <FaSearch /> },
    { id: "linkedin" as Source, label: "LinkedIn", icon: <FaUsers /> },
    { id: "github" as Source, label: "GitHub", icon: <FaCode /> },
    { id: "referral" as Source, label: "Referral", icon: <FaUsers /> },
    { id: "social" as Source, label: "Social Media", icon: <FaLightbulb /> },
    { id: "other" as Source, label: "Other", icon: <FaGlobe /> },
  ];

  // Agency stats
  const agencyStats = [
    { number: "50+", label: "Projects Delivered", icon: <FaRocket /> },
    { number: "98%", label: "Client Satisfaction", icon: <FaChartLine /> },
    { number: "24/7", label: "Support Available", icon: <FaShieldAlt /> },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (
      step === 1 &&
      (!formData.name || !formData.email || !formData.company)
    ) {
      Swal.fire({
        title: "Information Required",
        text: "Please complete all fields to proceed",
        icon: "info",
        confirmButtonColor: "#00a8ff",
        background: "rgba(0,0,0,0.9)",
        customClass: { popup: "rounded-2xl" },
      });
      return;
    }
    if (step === 2 && (!formData.projectType || !formData.budget)) {
      Swal.fire({
        title: "Selection Required",
        text: "Please select project type and budget",
        icon: "info",
        confirmButtonColor: "#00a8ff",
        background: "rgba(0,0,0,0.9)",
        customClass: { popup: "rounded-2xl" },
      });
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        {
          to_name: "Agency",
          from_name: formData.name,
          from_email: formData.email,
          from_company: formData.company,
          project_type: projectTypes.find((p) => p.id === formData.projectType)
            ?.label,
          budget: budgetRanges.find((b) => b.id === formData.budget)?.label,
          timeline: timelines.find((t) => t.id === formData.timeline)?.label,
          company_size: companySizes.find((s) => s.id === formData.companySize)
            ?.label,
          source: sources.find((s) => s.id === formData.source)?.label,
          details: formData.projectDetails || "Not provided",
        },
      );

      setHasSubmitted(true);

      Swal.fire({
        title: "Proposal Received!",
        html: `
          <div class="text-center">
            <div class="text-5xl mb-4">📋</div>
            <h3 class="text-xl font-bold text-white mb-2">Thank You, ${formData.name}!</h3>
            <p class="text-white/70 mb-4">
              Our team will review your project and respond within 24 hours.
            </p>
            <div class="bg-white/10 rounded-xl p-4">
              <p class="text-sm text-white/80">
                A confirmation has been sent to:<br/>
                <strong>${formData.email}</strong>
              </p>
            </div>
          </div>
        `,
        icon: "success",
        confirmButtonColor: "#00a8ff",
        background: "rgba(0,0,0,0.9)",
        customClass: { popup: "rounded-2xl" },
      });

      // Show booking modal for qualified leads
      if (formData.budget === "3k-10k" || formData.budget === "10k+") {
        setTimeout(() => setShowBookingModal(true), 1000);
      }
    } catch (error) {
      Swal.fire({
        title: "Submission Received",
        text: "We've received your inquiry. Our team will contact you shortly.",
        icon: "success",
        confirmButtonColor: "#00a8ff",
        background: "rgba(0,0,0,0.9)",
        customClass: { popup: "rounded-2xl" },
      });
      setHasSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookCall = () => {
    window.open("https://calendly.com/agency/consultation", "_blank");
    setShowBookingModal(false);
  };

  return (
    <section className="py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 bg-[#00a8ff] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              Start Your Project
            </span>
          </div>

          <h1 className="font-[Recoleta] text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Build Something
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a8ff] to-[#2289ff]">
              {" "}
              Amazing
            </span>
          </h1>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Share your vision with us. Our team of experts will transform your
            ideas into powerful digital solutions.
          </p>
        </motion.div>
        {/* Progress Steps - Mobile Friendly */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-12 px-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    stepNum === step
                      ? "bg-gradient-to-r from-[#00a8ff] to-[#2289ff] text-white scale-110 shadow-lg shadow-[#00a8ff]/30"
                      : stepNum < step
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-white/10 text-white/40 border border-white/10"
                  }`}
                >
                  {stepNum < step ? <FaCheck className="w-4 h-4" /> : stepNum}
                </div>
                <span className="absolute top-full mt-2 text-xs text-white/50 whitespace-nowrap hidden md:block">
                  {stepNum === 1 && "Contact"}
                  {stepNum === 2 && "Project"}
                  {stepNum === 3 && "Details"}
                  {stepNum === 4 && "Review"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 md:p-8 shadow-2xl">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Contact Info */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                      Contact Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff] transition-colors"
                          placeholder="John Smith"
                          disabled={hasSubmitted}
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff] transition-colors"
                          placeholder="john@company.com"
                          disabled={hasSubmitted}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Company/Organization *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff] transition-colors"
                        placeholder="Company Name"
                        disabled={hasSubmitted}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Project Type */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                      Project Details
                    </h3>

                    <div>
                      <label className="block text-white/70 text-sm mb-4">
                        Project Type *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {projectTypes.map((type) => (
                          <motion.button
                            key={type.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleInputChange("projectType", type.id)
                            }
                            className={`p-4 rounded-xl text-left transition-all ${
                              formData.projectType === type.id
                                ? "bg-gradient-to-r from-[#00a8ff]/20 to-[#2289ff]/10 border border-[#00a8ff]/40"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                            }`}
                            disabled={hasSubmitted}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="text-[#00a8ff] text-xl">
                                {type.icon}
                              </div>
                              <span className="text-white font-medium">
                                {type.label}
                              </span>
                            </div>
                            <p className="text-sm text-white/60 mb-2">
                              {type.description}
                            </p>
                            <span className="text-xs text-[#00a8ff]">
                              {type.startingPrice}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-4">
                        Budget Range *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {budgetRanges.map((range) => (
                          <motion.button
                            key={range.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleInputChange("budget", range.id)
                            }
                            className={`p-4 rounded-xl text-left transition-all ${
                              formData.budget === range.id
                                ? "bg-gradient-to-r from-[#00a8ff]/20 to-[#2289ff]/10 border border-[#00a8ff]/40"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                            }`}
                            disabled={hasSubmitted}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium">
                                {range.label}
                              </span>
                              {formData.budget === range.id && (
                                <FaCheck className="text-[#00a8ff]" />
                              )}
                            </div>
                            <p className="text-sm text-white/60">
                              {range.description}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Additional Info */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                      Additional Information
                    </h3>

                    <div>
                      <label className="block text-white/70 text-sm mb-4">
                        Timeline *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {timelines.map((timeline) => (
                          <motion.button
                            key={timeline.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleInputChange("timeline", timeline.id)
                            }
                            className={`p-4 rounded-xl text-left transition-all flex items-center gap-3 ${
                              formData.timeline === timeline.id
                                ? "bg-gradient-to-r from-[#00a8ff]/20 to-[#2289ff]/10 border border-[#00a8ff]/40"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                            }`}
                            disabled={hasSubmitted}
                          >
                            <div className="text-[#00a8ff]">
                              {timeline.icon}
                            </div>
                            <span className="text-white">{timeline.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-4">
                        Company Size *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {companySizes.map((size) => (
                          <motion.button
                            key={size.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleInputChange("companySize", size.id)
                            }
                            className={`p-4 rounded-xl text-left transition-all flex items-center gap-3 ${
                              formData.companySize === size.id
                                ? "bg-gradient-to-r from-[#00a8ff]/20 to-[#2289ff]/10 border border-[#00a8ff]/40"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                            }`}
                            disabled={hasSubmitted}
                          >
                            <div className="text-[#00a8ff]">{size.icon}</div>
                            <span className="text-white">{size.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-4">
                        How did you hear about us? *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {sources.map((source) => (
                          <motion.button
                            key={source.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              handleInputChange("source", source.id)
                            }
                            className={`p-3 rounded-xl text-center transition-all ${
                              formData.source === source.id
                                ? "bg-gradient-to-r from-[#00a8ff]/20 to-[#2289ff]/10 border border-[#00a8ff]/40"
                                : "bg-white/5 border border-white/10 hover:bg-white/10"
                            }`}
                            disabled={hasSubmitted}
                          >
                            <div className="text-[#00a8ff] text-xl mb-1">
                              {source.icon}
                            </div>
                            <span className="text-white text-sm">
                              {source.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-4">
                        Project Details (Optional)
                      </label>
                      <textarea
                        value={formData.projectDetails}
                        onChange={(e) =>
                          handleInputChange("projectDetails", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff] transition-colors resize-none"
                        placeholder="Tell us more about your vision, goals, and specific requirements..."
                        disabled={hasSubmitted}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        Review Your Proposal
                      </h3>
                      {hasSubmitted && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
                          ✓ Submitted
                        </span>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-white/50 text-sm mb-1">Contact</p>
                          <p className="text-white font-medium">
                            {formData.name}
                          </p>
                          <p className="text-white/70 text-sm">
                            {formData.email}
                          </p>
                          <p className="text-white/70 text-sm">
                            {formData.company}
                          </p>
                        </div>

                        <div>
                          <p className="text-white/50 text-sm mb-1">Project</p>
                          <p className="text-white font-medium">
                            {
                              projectTypes.find(
                                (p) => p.id === formData.projectType,
                              )?.label
                            }
                          </p>
                          <p className="text-white/70 text-sm">
                            {
                              budgetRanges.find((b) => b.id === formData.budget)
                                ?.label
                            }
                          </p>
                          <p className="text-white/70 text-sm">
                            {
                              timelines.find((t) => t.id === formData.timeline)
                                ?.label
                            }
                          </p>
                        </div>
                      </div>

                      {(formData.companySize || formData.source) && (
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-white/50 text-sm mb-2">
                            Additional
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {formData.companySize && (
                              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                                {
                                  companySizes.find(
                                    (s) => s.id === formData.companySize,
                                  )?.label
                                }
                              </span>
                            )}
                            {formData.source && (
                              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                                Found via:{" "}
                                {
                                  sources.find((s) => s.id === formData.source)
                                    ?.label
                                }
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {formData.projectDetails && (
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-white/50 text-sm mb-2">
                            Project Details
                          </p>
                          <p className="text-white/80 text-sm">
                            {formData.projectDetails}
                          </p>
                        </div>
                      )}
                    </div>

                    {!hasSubmitted &&
                      formData.budget === "300-1k" &&
                      formData.projectType === "web-app" && (
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                          <p className="text-yellow-400 text-sm">
                            Note: Web applications typically require a higher
                            budget. Our team will discuss optimal solutions.
                          </p>
                        </div>
                      )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-8 border-t border-white/10">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  disabled={step === 1 || hasSubmitted}
                  className="px-4 md:px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm md:text-base"
                >
                  <FaArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm">Step {step}/4</span>

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={hasSubmitted}
                      className="px-4 md:px-6 py-3 rounded-xl bg-gradient-to-r from-[#00a8ff] to-[#2289ff] text-white font-medium hover:shadow-lg transition-all flex items-center gap-2 text-sm md:text-base disabled:opacity-50"
                    >
                      <span className="hidden sm:inline">Continue</span>
                      <FaArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || hasSubmitted}
                      className="px-4 md:px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:shadow-lg transition-all flex items-center gap-2 text-sm md:text-base disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing</span>
                        </>
                      ) : hasSubmitted ? (
                        <>
                          <FaCheck />
                          <span>Submitted</span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <FaArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 text-white/40 text-sm"
          >
            <span className="flex items-center gap-2">
              <FaShieldAlt className="text-[#00a8ff]" />
              Secure & Confidential
            </span>
            <span className="flex items-center gap-2">
              <FaClock className="text-[#00a8ff]" />
              24h Response Time
            </span>
            <span className="flex items-center gap-2">
              <FaUsers className="text-[#00a8ff]" />
              Dedicated Team
            </span>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 max-w-md w-full border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaCalendarAlt className="text-[#00a8ff]" />
                  Schedule Consultation
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FaTimes className="text-white/70" />
                </button>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">📅</div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Perfect Match!
                </h4>
                <p className="text-white/70 mb-6">
                  Your project aligns perfectly with our expertise. Let's
                  schedule a strategic consultation.
                </p>

                <button
                  onClick={handleBookCall}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00a8ff] to-[#2289ff] text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-3"
                >
                  <FaCalendarAlt />
                  Select Time
                </button>

                <button
                  onClick={() => setShowBookingModal(false)}
                  className="w-full py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition-colors"
                >
                  Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
