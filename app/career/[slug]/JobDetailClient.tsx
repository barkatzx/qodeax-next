// app/careers/[slug]/JobDetailClient.tsx
"use client";

import Glass from "@/components/ui/Glass";
import { type Career } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
  FaHeart,
  FaLevelUpAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaStar,
  FaUsers,
} from "react-icons/fa";

interface JobDetailClientProps {
  job: Career;
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const router = useRouter();

  const getDepartmentColor = (department: string) => {
    const colors = {
      engineering: "from-blue-500 to-cyan-500",
      design: "from-purple-500 to-pink-500",
      marketing: "from-green-500 to-emerald-500",
      sales: "from-yellow-500 to-orange-500",
      product: "from-indigo-500 to-purple-500",
      operations: "from-gray-500 to-slate-500",
    };
    return (
      colors[department as keyof typeof colors] || "from-blue-500 to-cyan-500"
    );
  };

  const getLocationIcon = (location: string) => {
    const icons = {
      remote: <FaGlobe className="text-green-400" />,
      hybrid: <FaUsers className="text-yellow-400" />,
      onsite: <FaBuilding className="text-blue-400" />,
    };
    return icons[location as keyof typeof icons] || <FaMapMarkerAlt />;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-10 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Glass variant="blue" className="p-8">
                {/* Header */}
                <div className="mb-8">
                  {job.featured && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30 mb-4">
                      <FaStar className="w-3 h-3" />
                      Featured Position
                    </span>
                  )}

                  <h1 className="font-[Recoleta] text-3xl md:text-4xl font-bold text-white mb-4">
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap gap-4 text-sm font-[Outfit-Regular]">
                    <span className="flex items-center gap-2 text-white/70">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getDepartmentColor(
                          job.department,
                        )} flex items-center justify-center text-white text-xs`}
                      >
                        {job.department.charAt(0).toUpperCase()}
                      </div>
                      <span className="capitalize">{job.department}</span>
                    </span>
                    <span className="flex items-center gap-2 text-white/70">
                      {getLocationIcon(job.location)}
                      <span className="capitalize">{job.location}</span>
                    </span>
                    <span className="flex items-center gap-2 text-white/70">
                      <FaBriefcase className="text-[#00a8ff]" />
                      <span className="capitalize">{job.employmentType}</span>
                    </span>
                    <span className="flex items-center gap-2 text-white/70">
                      <FaLevelUpAlt className="text-[#00a8ff]" />
                      <span className="capitalize">
                        {job.experienceLevel || "Not specified"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <FaUsers className="text-[#00a8ff] text-xl mx-auto mb-2" />
                    <div className="text-white font-semibold">
                      {job.applicationsCount || 0}
                    </div>
                    <div className="text-white/50 text-xs">Applicants</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <FaCalendarAlt className="text-[#00a8ff] text-xl mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">
                      {formatDate(job.publishedAt)
                        .split(",")
                        .slice(0, 2)
                        .join(",")}
                    </div>
                    <div className="text-white/50 text-xs">Posted</div>
                  </div>

                  {job.salary?.min && job.salary?.max && (
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <FaMoneyBillWave className="text-[#00a8ff] text-xl mx-auto mb-2" />
                      <div className="text-white font-semibold text-sm">
                        {job.salary.currency} {job.salary.min}k -{" "}
                        {job.salary.max}k
                      </div>
                      <div className="text-white/50 text-xs">Salary Range</div>
                    </div>
                  )}

                  {job.closingDate && (
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <FaClock className="text-[#00a8ff] text-xl mx-auto mb-2" />
                      <div className="text-white font-semibold text-sm">
                        {formatDate(job.closingDate)}
                      </div>
                      <div className="text-white/50 text-xs">Closing Date</div>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-4 font-[Outfit-Regular]">
                    Summary
                  </h2>
                  <p className="text-white/70">{job.summary}</p>
                </div>

                {/* Full Description */}
                <div className="mb-8">
                  <h2 className="font-[Outfit-Regular] text-xl font-bold text-white mb-4">
                    Description
                  </h2>
                  <div className="text-white/70">
                    <PortableText value={job.description} />
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="mb-8">
                  <h2 className="font-[Outfit-Regular] text-xl font-bold text-white mb-4">
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AiFillCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h2 className="font-[Outfit-Regular] text-xl font-bold text-white mb-4">
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AiFillCheckCircle className="w-5 h-5 text-[#00a8ff] flex-shrink-0 mt-0.5" />
                        <span className="text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nice to Have */}
                {job.niceToHave && job.niceToHave.length > 0 && (
                  <div className="mb-8">
                    <h2 className="font-[Outfit-Regular] text-xl font-bold text-white mb-4">
                      Nice to Have
                    </h2>
                    <ul className="space-y-3">
                      {job.niceToHave.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FaHeart className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div>
                    <h2 className="font-[Outfit-Regular] text-xl font-bold text-white mb-4">
                      Benefits
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {job.benefits.map((benefit, index) => (
                        <div key={index} className="bg-white/5 rounded-xl p-4">
                          <span className="text-white/70">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Glass>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky space-y-6">
              {/* Apply Card */}
              <Glass variant="blue" className="p-6">
                <h3 className="font-[Outfit-Regular] text-xl font-bold text-white mb-4">
                  Ready to Apply?
                </h3>
                <p className="text-white/60 text-sm mb-6">
                  Join our team and help us build amazing things. We'd love to
                  hear from you!
                </p>
                <Link href={`/career/${job.slug.current}/apply`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="font-[Outfit-Regular] w-full py-4 bg-gradient-to-r from-[#00a8ff] to-[#2289ff] rounded-xl text-white font-semibold hover:shadow-lg transition-all mb-3 cursor-pointer"
                  >
                    Apply for this position
                  </motion.button>
                </Link>
                <p className="text-white/30 text-xs text-center">
                  Applications close:{" "}
                  {formatDate(job.closingDate) || "Not specified"}
                </p>
              </Glass>

              {/* Skills Card */}
              {job.skills && job.skills.length > 0 && (
                <Glass variant="blue" className="p-6">
                  <h3 className="font-[Outfit-Regular] text-lg font-bold text-white mb-4">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-white/10 rounded-lg text-white text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Glass>
              )}

              {/* Share Card */}
              <Glass variant="blue" className="p-6">
                <h3 className="font-[Outfit-Regular] text-lg font-bold text-white mb-4">
                  Share this job
                </h3>
                <div className="flex gap-3">
                  {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
                    <button
                      key={platform}
                      className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </Glass>

              {/* Similar Jobs (Optional - would need to fetch similar jobs) */}
              <Glass variant="blue" className="p-6">
                <h3 className="font-[Outfit-Regular] text-lg font-bold text-white mb-4">
                  Similar Positions
                </h3>
                <p className="text-white/50 text-sm">
                  Check back for similar opportunities
                </p>
              </Glass>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
