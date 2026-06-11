// app/careers/[slug]/apply/ApplicationFormClient.tsx
"use client";

import Glass from "@/components/ui/Glass";
import { submitApplication } from "@/lib/submitApplication";
import { type Career } from "@/sanity/client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

interface ApplicationFormClientProps {
  job: Career;
}

interface FormData {
  applicantName: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  linkedin: string;
  github: string;
  yearsOfExperience: "0-1" | "1-3" | "3-5" | "5-8" | "8plus" | "";

  currentCompany: string;
  currentRole: string;
  noticePeriod: "immediate" | "1week" | "2weeks" | "1month" | "2plus" | "";
  expectedSalary: {
    amount: number | "";
    currency: "USD" | "EUR" | "GBP" | "BDT";
    period: "year" | "month" | "hour";
  };
  skills: string[];
  coverLetter: string;
  howDidYouHear:
    | "linkedin"
    | "indeed"
    | "website"
    | "referral"
    | "jobboard"
    | "social"
    | "other"
    | "";
  referral: string;
}

export default function ApplicationFormClient({
  job,
}: ApplicationFormClientProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    applicantName: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    linkedin: "",
    github: "",
    yearsOfExperience: "",
    currentCompany: "",
    currentRole: "",
    noticePeriod: "",
    expectedSalary: {
      amount: "",
      currency: "USD",
      period: "year",
    },
    skills: [],
    coverLetter: "",
    howDidYouHear: "",
    referral: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.applicantName || !formData.email)) {
      Swal.fire({
        title: "Required Fields",
        text: "Please fill in your name and email",
        icon: "warning",
        confirmButtonColor: "#00a8ff",
        background: "rgba(0,0,0,0.9)",
        customClass: { popup: "rounded-2xl" },
      });
      return;
    }
    if (step === 2 && !formData.coverLetter) {
      Swal.fire({
        title: "Cover Letter Required",
        text: "Please tell us why you want to join",
        icon: "warning",
        confirmButtonColor: "#00a8ff",
        background: "rgba(0,0,0,0.9)",
        customClass: { popup: "rounded-2xl" },
      });
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePreviousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare application data (without resume)
      const applicationData = {
        job: { _type: "reference", _ref: job._id },
        applicantName: formData.applicantName,
        email: formData.email,
        phone: formData.phone || undefined,
        location: formData.location || undefined,
        portfolio: formData.portfolio || undefined,
        linkedin: formData.linkedin || undefined,
        github: formData.github || undefined,
        yearsOfExperience: formData.yearsOfExperience || undefined,
        currentCompany: formData.currentCompany || undefined,
        currentRole: formData.currentRole || undefined,
        noticePeriod: formData.noticePeriod || undefined,
        expectedSalary: formData.expectedSalary.amount
          ? {
              amount: formData.expectedSalary.amount,
              currency: formData.expectedSalary.currency,
              period: formData.expectedSalary.period,
            }
          : undefined,
        skills: formData.skills,
        coverLetter: formData.coverLetter,
        howDidYouHear: formData.howDidYouHear || undefined,
        referral: formData.referral || undefined,
      };

      const result = await submitApplication(applicationData, resume);

      if (result.success) {
        Swal.fire({
          title: "Application Submitted!",
          html: `
          <div class="text-center">
            <div class="text-5xl mb-4">🎉</div>
            <h3 class="text-xl font-bold text-white mb-2">Thank You, ${formData.applicantName}!</h3>
            <p class="text-white/70 mb-4">
              Your application for ${job.title} has been received.
            </p>
          </div>
        `,
          icon: "success",
          confirmButtonColor: "#00a8ff",
        });
        router.push("/career");
      } else {
        throw new Error(result.error as string);
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to submit application",
        icon: "error",
        confirmButtonColor: "#00a8ff",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="text-center">
            <h1 className="font-[Recoleta] text-3xl md:text-4xl font-bold text-white/90 mb-2">
              Apply for {job.title}
            </h1>
            <p className="text-white/60">
              {job.department} • {job.location}
            </p>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 px-10">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex-1 flex items-center">
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    stepNum === step
                      ? "bg-gradient-to-r from-[#00a8ff] to-[#2289ff] text-white scale-110"
                      : stepNum < step
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-white/10 text-white/40 border border-white/10"
                  }`}
                >
                  {stepNum < step ? <FaCheck /> : stepNum}
                </div>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-white/50 whitespace-nowrap">
                  {stepNum === 1 && "Personal"}
                  {stepNum === 2 && "Application"}
                  {stepNum === 3 && "Review"}
                </span>
              </div>
              {stepNum < 3 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    stepNum < step
                      ? "bg-gradient-to-r from-[#00a8ff] to-[#2289ff]"
                      : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <Glass variant="blue" className="p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-[Outfit-Regular] text-xl font-bold text-white mb-6">
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.applicantName}
                        onChange={(e) =>
                          handleInputChange("applicantName", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="+1 234 567 890"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Portfolio / Website
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) =>
                        handleInputChange("portfolio", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) =>
                          handleInputChange("linkedin", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        GitHub
                      </label>
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) =>
                          handleInputChange("github", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Application Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-[Outfit-Regular] text-xl font-bold text-white mb-6">
                    Application Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Years of Experience
                      </label>
                      <select
                        value={formData.yearsOfExperience}
                        onChange={(e) =>
                          handleInputChange(
                            "yearsOfExperience",
                            e.target.value as
                              | "0-1"
                              | "1-3"
                              | "3-5"
                              | "5-8"
                              | "8plus"
                              | "",
                          )
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00a8ff]"
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-8">5-8 years</option>
                        <option value="8plus">8+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Notice Period
                      </label>
                      <select
                        value={formData.noticePeriod}
                        onChange={(e) =>
                          handleInputChange(
                            "noticePeriod",
                            e.target.value as
                              | "immediate"
                              | "1week"
                              | "2weeks"
                              | "1month"
                              | "2plus"
                              | "",
                          )
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00a8ff]"
                      >
                        <option value="">Select notice period</option>
                        <option value="immediate">Immediate</option>
                        <option value="1week">1 week</option>
                        <option value="2weeks">2 weeks</option>
                        <option value="1month">1 month</option>
                        <option value="2plus">2+ months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Current Company
                      </label>
                      <input
                        type="text"
                        value={formData.currentCompany}
                        onChange={(e) =>
                          handleInputChange("currentCompany", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="Current company"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Current Role
                      </label>
                      <input
                        type="text"
                        value={formData.currentRole}
                        onChange={(e) =>
                          handleInputChange("currentRole", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="Current role"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Expected Salary
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="number"
                        value={formData.expectedSalary.amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expectedSalary: {
                              ...formData.expectedSalary,
                              amount: e.target.value
                                ? Number(e.target.value)
                                : "",
                            },
                          })
                        }
                        className="col-span-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="Amount"
                      />
                      <select
                        value={formData.expectedSalary.currency}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expectedSalary: {
                              ...formData.expectedSalary,
                              currency: e.target.value as
                                | "USD"
                                | "EUR"
                                | "GBP"
                                | "BDT",
                            },
                          })
                        }
                        className="col-span-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00a8ff]"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="BDT">BDT</option>
                      </select>
                      <select
                        value={formData.expectedSalary.period}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expectedSalary: {
                              ...formData.expectedSalary,
                              period: e.target.value as
                                | "year"
                                | "month"
                                | "hour",
                            },
                          })
                        }
                        className="col-span-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00a8ff]"
                      >
                        <option value="year">Per Year</option>
                        <option value="month">Per Month</option>
                        <option value="hour">Per Hour</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Skills
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addSkill())
                        }
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="Add a skill (e.g., React, Python)"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-6 py-3 bg-[#00a8ff] hover:bg-[#2289ff] rounded-xl text-white transition-colors"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-2 bg-white/10 rounded-lg text-white text-sm flex items-center gap-2"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-white/50 hover:text-white"
                          >
                            <FaTimes className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Cover Letter *
                    </label>
                    <textarea
                      value={formData.coverLetter}
                      onChange={(e) =>
                        handleInputChange("coverLetter", e.target.value)
                      }
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff] resize-none"
                      placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Resume / CV *
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-[#00a8ff] file:to-[#2289ff] file:text-white hover:file:opacity-90"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      value={formData.howDidYouHear}
                      onChange={(e) =>
                        handleInputChange(
                          "howDidYouHear",
                          e.target.value as
                            | "linkedin"
                            | "indeed"
                            | "website"
                            | "referral"
                            | "jobboard"
                            | "social"
                            | "other"
                            | "",
                        )
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00a8ff]"
                    >
                      <option value="">Select an option</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="indeed">Indeed</option>
                      <option value="website">Company Website</option>
                      <option value="referral">Referral</option>
                      <option value="jobboard">Job Board</option>
                      <option value="social">Social Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {formData.howDidYouHear === "referral" && (
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Who referred you?
                      </label>
                      <input
                        type="text"
                        value={formData.referral}
                        onChange={(e) =>
                          handleInputChange("referral", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff]"
                        placeholder="Referrer name"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6">
                    Review Your Application
                  </h2>

                  <div className="bg-white/5 rounded-xl p-6 space-y-4">
                    <div>
                      <h3 className="text-[#00a8ff] font-semibold mb-2">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-white/50">Name:</span>
                        <span className="text-white">
                          {formData.applicantName}
                        </span>
                        <span className="text-white/50">Email:</span>
                        <span className="text-white">{formData.email}</span>
                        {formData.phone && (
                          <>
                            <span className="text-white/50">Phone:</span>
                            <span className="text-white">{formData.phone}</span>
                          </>
                        )}
                        {formData.location && (
                          <>
                            <span className="text-white/50">Location:</span>
                            <span className="text-white">
                              {formData.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h3 className="text-[#00a8ff] font-semibold mb-2">
                        Professional Details
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {formData.yearsOfExperience && (
                          <>
                            <span className="text-white/50">Experience:</span>
                            <span className="text-white">
                              {formData.yearsOfExperience}
                            </span>
                          </>
                        )}
                        {formData.currentCompany && (
                          <>
                            <span className="text-white/50">
                              Current Company:
                            </span>
                            <span className="text-white">
                              {formData.currentCompany}
                            </span>
                          </>
                        )}
                        {formData.currentRole && (
                          <>
                            <span className="text-white/50">Current Role:</span>
                            <span className="text-white">
                              {formData.currentRole}
                            </span>
                          </>
                        )}
                        {formData.noticePeriod && (
                          <>
                            <span className="text-white/50">
                              Notice Period:
                            </span>
                            <span className="text-white">
                              {formData.noticePeriod}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {formData.expectedSalary.amount && (
                      <div className="border-t border-white/10 pt-4">
                        <h3 className="text-[#00a8ff] font-semibold mb-2">
                          Expected Salary
                        </h3>
                        <p className="text-white">
                          {formData.expectedSalary.currency}{" "}
                          {formData.expectedSalary.amount} /{" "}
                          {formData.expectedSalary.period}
                        </p>
                      </div>
                    )}

                    {formData.skills.length > 0 && (
                      <div className="border-t border-white/10 pt-4">
                        <h3 className="text-[#00a8ff] font-semibold mb-2">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-white/10 rounded-lg text-white text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-white/10 pt-4">
                      <h3 className="text-[#00a8ff] font-semibold mb-2">
                        Cover Letter
                      </h3>
                      <p className="text-white/70 text-sm whitespace-pre-wrap">
                        {formData.coverLetter}
                      </p>
                    </div>

                    {resume && (
                      <div className="border-t border-white/10 pt-4">
                        <h3 className="text-[#00a8ff] font-semibold mb-2">
                          Resume
                        </h3>
                        <p className="text-white">{resume.name}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-white/10">
              <button
                type="button"
                onClick={handlePreviousStep}
                disabled={step === 1}
                className="px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-gradient-to-r from-[#00a8ff] to-[#2289ff] rounded-xl text-white font-semibold hover:shadow-lg transition-all"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </Glass>
      </div>
    </section>
  );
}
