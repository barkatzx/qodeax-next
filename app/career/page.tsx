// app/careers/page.tsx
"use client";

import Glass from "@/components/ui/Glass";
import { getJobListings, type Career } from "@/sanity/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBuilding,
  FaBullhorn,
  FaChartLine,
  FaCode,
  FaExclamationTriangle,
  FaGlobe,
  FaLevelUpAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaintBrush,
  FaRedo,
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import Swal from "sweetalert2";

// Department icons mapping
const departmentIcons = {
  engineering: <FaCode />,
  design: <FaPaintBrush />,
  marketing: <FaBullhorn />,
  sales: <FaChartLine />,
  product: <FaShoppingCart />,
  operations: <FaBuilding />,
};

export default function CareersPage() {
  const [jobs, setJobs] = useState<Career[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    location: "",
    employmentType: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  // Add this temporarily in your page or a debug component
  useEffect(() => {
    console.log("📊 Environment Check:");
    console.log(
      "NEXT_PUBLIC_SANITY_PROJECT_ID:",
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    );
    console.log(
      "NEXT_PUBLIC_SANITY_DATASET:",
      process.env.NEXT_PUBLIC_SANITY_DATASET,
    );
    console.log(
      "NEXT_PUBLIC_SANITY_API_TOKEN exists:",
      !!process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
    );
    console.log(
      "NEXT_PUBLIC_SANITY_API_TOKEN length:",
      process.env.NEXT_PUBLIC_SANITY_API_TOKEN?.length,
    );
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, filters, searchTerm]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getJobListings();

      // Check if data is array
      if (!Array.isArray(data)) {
        console.error("❌ Data is not an array:", data);
        setError("Invalid data format received");
        setJobs([]);
        setFilteredJobs([]);
        return;
      }

      console.log(`✅ Found ${data.length} jobs`);
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error("❌ Error in fetchJobs:", error);
      setError("Failed to load job listings. Please try again.");

      Swal.fire({
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to load job listings",
        icon: "error",
        confirmButtonColor: "#00a8ff",
        background: "rgba(0,0,0,0.9)",
        customClass: { popup: "rounded-2xl" },
      });
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills?.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (filters.department) {
      filtered = filtered.filter(
        (job) => job.department === filters.department,
      );
    }

    if (filters.location) {
      filtered = filtered.filter((job) => job.location === filters.location);
    }

    if (filters.employmentType) {
      filtered = filtered.filter(
        (job) => job.employmentType === filters.employmentType,
      );
    }

    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setFilters({
      department: "",
      location: "",
      employmentType: "",
    });
    setSearchTerm("");
  };

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

  const isClosingDatePassed = (dateString?: string) => {
    if (!dateString) return false;

    const closingDate = new Date(dateString);
    if (Number.isNaN(closingDate.getTime())) return false;

    closingDate.setHours(23, 59, 59, 999);
    return closingDate < new Date();
  };

  if (error) {
    return (
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a0a] to-black py-20">
        <div className="container mx-auto px-4">
          <Glass variant="blue" className="max-w-2xl mx-auto p-12 text-center">
            <div className="text-6xl text-red-400 mb-6">
              <FaExclamationTriangle className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Failed to Load Jobs
            </h2>
            <p className="text-white/60 mb-8">{error}</p>
            <button
              onClick={fetchJobs}
              className="px-6 py-3 bg-gradient-to-r from-[#00a8ff] to-[#2289ff] rounded-xl text-white font-medium hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <FaRedo />
              Try Again
            </button>
          </Glass>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header - Same as before */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 bg-[#00a8ff] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              Join Our Team
            </span>
          </div>

          <h1 className="font-[Recoleta] text-4xl md:text-6xl font-bold text-white mb-6">
            Shape the Future with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a8ff] to-[#2289ff]">
              {" "}
              Qodeax
            </span>
          </h1>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Join a team of innovators, creators, and problem solvers. Build
            cutting-edge solutions that make a difference.
          </p>
        </motion.div>

        {/* Search and Filters - Same as before */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto mb-8"
        >
          <Glass variant="blue" className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Search positions, skills, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00a8ff] transition-colors"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white flex items-center justify-center gap-2"
              >
                <FaSearch />
                Filters
              </button>

              <div className="hidden md:flex gap-3">
                <select
                  value={filters.department}
                  onChange={(e) =>
                    setFilters({ ...filters, department: e.target.value })
                  }
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00a8ff]"
                >
                  <option value="">All Depts</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="product">Product</option>
                  <option value="operations">Operations</option>
                </select>

                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00a8ff]"
                >
                  <option value="">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>

                <select
                  value={filters.employmentType}
                  onChange={(e) =>
                    setFilters({ ...filters, employmentType: e.target.value })
                  }
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00a8ff]"
                >
                  <option value="">All Types</option>
                  <option value="fulltime">Full-time</option>
                  <option value="parttime">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden mt-4 space-y-3">
                <select
                  value={filters.department}
                  onChange={(e) =>
                    setFilters({ ...filters, department: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                >
                  <option value="">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="product">Product</option>
                  <option value="operations">Operations</option>
                </select>

                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                >
                  <option value="">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>

                <select
                  value={filters.employmentType}
                  onChange={(e) =>
                    setFilters({ ...filters, employmentType: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                >
                  <option value="">All Types</option>
                  <option value="fulltime">Full-time</option>
                  <option value="parttime">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            )}

            {/* Active Filters */}
            {(filters.department ||
              filters.location ||
              filters.employmentType ||
              searchTerm) && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10">
                <span className="text-sm text-white/50">Active filters:</span>
                {searchTerm && (
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white flex items-center gap-2">
                    Search: {searchTerm}
                    <button
                      onClick={() => setSearchTerm("")}
                      className="hover:text-[#00a8ff]"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.department && (
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white flex items-center gap-2">
                    Dept: {filters.department}
                    <button
                      onClick={() => setFilters({ ...filters, department: "" })}
                      className="hover:text-[#00a8ff]"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.location && (
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white flex items-center gap-2">
                    Location: {filters.location}
                    <button
                      onClick={() => setFilters({ ...filters, location: "" })}
                      className="hover:text-[#00a8ff]"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.employmentType && (
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white flex items-center gap-2">
                    Type: {filters.employmentType}
                    <button
                      onClick={() =>
                        setFilters({ ...filters, employmentType: "" })
                      }
                      className="hover:text-[#00a8ff]"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#00a8ff] hover:text-[#2289ff] ml-auto"
                >
                  Clear all
                </button>
              </div>
            )}
          </Glass>
        </motion.div>

        {/* Job Listings */}
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-[#00a8ff] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Positions Found
              </h3>
              <p className="text-white/60 mb-6">
                Try adjusting your filters or check back later
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-[#00a8ff] to-[#2289ff] rounded-xl text-white font-medium hover:shadow-lg transition-all"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Glass
                    variant="blue"
                    className={`group hover:border-[#00a8ff]/30 transition-all duration-300 ${
                      job.featured ? "border-yellow-500/30" : ""
                    }`}
                  >
                    <div className="p-6">
                      {job.featured && (
                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30 flex items-center gap-1">
                            <FaStar className="w-3 h-3" />
                            Featured
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getDepartmentColor(
                                job.department,
                              )} flex items-center justify-center text-white`}
                            >
                              {
                                departmentIcons[
                                  job.department as keyof typeof departmentIcons
                                ]
                              }
                            </div>
                            <div>
                              <h3 className="font-[Recoleta] text-xl md:text-2xl text-white group-hover:text-[#00a8ff] transition-colors">
                                {job.title}
                              </h3>
                              <p className="text-white/50 text-sm">
                                {job.department.charAt(0).toUpperCase() +
                                  job.department.slice(1)}{" "}
                                • {job.employmentType}
                              </p>
                            </div>
                          </div>

                          <p className="text-white/60 text-sm mb-4 line-clamp-2">
                            {job.summary}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm mb-4">
                            <span className="flex items-center gap-2 text-white/50">
                              {getLocationIcon(job.location)}
                              <span className="capitalize">{job.location}</span>
                            </span>
                            <span className="flex items-center gap-2 text-white/50">
                              <FaLevelUpAlt className="text-[#00a8ff]" />
                              <span className="capitalize">
                                {job.experienceLevel || "Not specified"}
                              </span>
                            </span>
                            {job.salary?.min && job.salary?.max && (
                              <span className="flex items-center gap-2 text-white/50">
                                <FaMoneyBillWave className="text-[#00a8ff]" />
                                {job.salary.currency} {job.salary.min}k -{" "}
                                {job.salary.max}k
                              </span>
                            )}
                          </div>

                          {job.skills && job.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {job.skills.slice(0, 4).map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/10"
                                >
                                  {skill}
                                </span>
                              ))}
                              {job.skills.length > 4 && (
                                <span className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/10">
                                  +{job.skills.length - 4} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex md:flex-col gap-3 mt-4 md:mt-0">
                          <Link href={`/career/${job.slug.current}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2"
                            >
                              View Details
                              <FaArrowRight className="w-4 h-4" />
                            </motion.button>
                          </Link>

                          {isClosingDatePassed(job.closingDate) ? (
                            <motion.button
                              disabled
                              className="w-full px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-white/40 font-medium transition-all cursor-not-allowed"
                            >
                              Closed
                            </motion.button>
                          ) : (
                            <Link href={`/career/${job.slug.current}/apply`}>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full px-6 py-3 bg-gradient-to-r from-[#00a8ff] to-[#2289ff] rounded-xl text-white font-medium hover:shadow-lg transition-all"
                              >
                                Apply Now
                              </motion.button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </Glass>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
