"use client";

import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCode,
  FaRocket,
  FaShieldAlt,
  FaWordpress,
} from "react-icons/fa";
import Glass from "./ui/Glass";

const services = [
  {
    icon: <FaRocket className="w-8 h-8" />,
    title: "MVP Development",
    subtitle:
      "We help founders and startups turn ideas into real, usable products. From defining core features to building a scalable architecture, we focus on speed, clarity, and validation—so you can test your idea with real users and move forward confidently.",
    tags: [
      "Startup",
      "Product Validation",
      "Fast Launch",
      "Scalable Architecture",
    ],
    gradient: "from-purple-500 to-pink-500",
    duration: "4-6 weeks",
    link: "/services/mvp",
  },
  {
    icon: <FaCode className="w-8 h-8" />,
    title: "Custom Applications",
    subtitle:
      "We design and develop custom web applications tailored to your exact business needs—whether it's an internal dashboard, client portal, or data-driven system. Every solution is built with performance, security, and maintainability in mind.",
    tags: [
      "Business Systems",
      "Custom Workflows",
      "Secure & Scalable",
      "Automation",
    ],
    gradient: "from-blue-500 to-cyan-400",
    duration: "Custom",
    link: "/services/custom",
  },
  {
    icon: <FaWordpress className="w-8 h-8" />,
    title: "Business & CMS",
    subtitle:
      "We build structured, SEO-ready websites using modern CMS solutions that are easy to manage and built to grow. From marketing sites to content-driven platforms, we focus on speed, clarity, and conversion—so your website actually supports your business goals.",
    tags: [
      "SEO-Ready",
      "High Performance",
      "Easy Management",
      "Conversion-Focused",
    ],
    gradient: "from-emerald-500 to-teal-400",
    duration: "2-4 weeks",
    link: "/services/business",
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: "Performance & Security",
    subtitle:
      "We provide continuous optimization, security hardening, and technical support to ensure your platform remains stable and performant. This service is ideal for businesses that want peace of mind and a long-term technical partner.",
    tags: [
      "Speed Optimization",
      "Security",
      "Reliability",
      "Long-Term Support",
    ],
    gradient: "from-violet-500 to-purple-400",
    duration: "Ongoing",
    link: "/services/performance",
  },
];

export default function ServicesShowcase() {
  return (
    <section className="container mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-20"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm text-white/80">What We Deliver</span>
        </div>

        <h2 className="font-[Recoleta] text-4xl md:text-5xl mb-5 text-white">
          Growth-Ready Digital Products
        </h2>

        <p className="text-white/70 text-xl max-w-5xl mx-auto">
          We design and build scalable digital platforms that solve real
          business problems. By combining thoughtful design with robust
          engineering, we turn complex requirements into clean, reliable systems
          that support growth, performance, and long-term success.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Glass variant="blue" className="p-6 h-full">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}
              >
                <div className="text-white text-2xl">{service.icon}</div>
              </div>

              <h3 className="font-[Recoleta] text-xl text-white mb-3">
                {service.title}
              </h3>

              <p className="text-white/60 text-sm mb-6">{service.subtitle}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {service.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 bg-white/5 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <span className="text-xs text-white/50">
                  {service.duration}
                </span>

                <button
                  className="relative w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group overflow-hidden"
                  onClick={() => (window.location.href = service.link)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <FaArrowRight className="relative z-10 w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                </button>
              </div>
            </Glass>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
