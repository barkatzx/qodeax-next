"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaChartLine,
  FaCheckCircle,
  FaCookieBite,
  FaLock,
  FaShieldAlt,
  FaSlidersH,
} from "react-icons/fa";

export default function CookiePolicyPage() {
  const glassStyle = (opacity: number = 0.1) => ({
    background: `linear-gradient(135deg, 
      rgba(255, 255, 255, ${opacity}) 0%, 
      rgba(255, 255, 255, ${opacity * 0.5}) 100%
    )`,
    backdropFilter: "blur(10px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.2),
      0 1px 0 rgba(255, 255, 255, 0.05) inset
    `,
  });

  const glassEffect = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  };

  const blueGlassEffect = {
    background: "rgba(0, 168, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 168, 255, 0.2)",
    boxShadow: "0 8px 32px rgba(0, 168, 255, 0.15)",
  };

  const cookiePrinciples = [
    {
      icon: <FaCookieBite className="text-xl" />,
      title: "Clear Usage",
      description: "We explain what cookies are used for on this website.",
    },
    {
      icon: <FaSlidersH className="text-xl" />,
      title: "Consent Control",
      description: "You can manage non-essential cookies through CookieYes.",
    },
    {
      icon: <FaChartLine className="text-xl" />,
      title: "Analytics",
      description: "Google Analytics helps us understand website performance.",
    },
    {
      icon: <FaShieldAlt className="text-xl" />,
      title: "Privacy Respect",
      description: "We do not use cookies to sell personal information.",
    },
  ];

  const cookieTypes = [
    {
      title: "Strictly Necessary Cookies",
      description:
        "These cookies are required for core website functions such as security, page navigation, consent storage, and basic site operation. They cannot usually be disabled through our consent banner.",
    },
    {
      title: "Analytics Cookies",
      description:
        "We use Google Analytics to understand how visitors use our website, which pages are viewed, how users arrive at the site, and how the website can be improved.",
    },
    {
      title: "Preference Cookies",
      description:
        "These cookies may remember choices you make, such as cookie consent preferences, so the website can provide a more consistent experience.",
    },
    {
      title: "Third-Party Cookies",
      description:
        "Some cookies may be set by trusted third-party services we use, including Google Analytics and CookieYes, subject to their own privacy and cookie policies.",
    },
  ];

  const rights = [
    "Accept or reject non-essential cookies where consent controls are available",
    "Change your cookie preferences through the CookieYes consent banner",
    "Disable or delete cookies using your browser settings",
    "Use browser privacy tools or analytics opt-out tools where available",
    "Contact us with questions about cookies or tracking technologies",
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00a8ff]/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00a8ff]/10 rounded-full blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                              linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            style={glassStyle(0.15)}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#00a8ff] rounded-full blur-sm opacity-50" />
              <div className="relative w-3 h-3 bg-[#00a8ff] rounded-full" />
            </div>
            <span className="text-sm font-semibold text-[#00a8ff]">
              Cookies & Tracking
            </span>
          </motion.div>

          <h1 className="font-[Recoleta] text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Cookie Policy</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a8ff] via-[#4dc3ff] to-[#80d4ff]">
              Transparent Website Tracking
            </span>
          </h1>

          <p className="text-white/70 text-xl max-w-3xl mx-auto mb-12">
            This Cookie Policy explains how Qodeax uses cookies and similar
            technologies to operate our website, improve performance, and
            understand visitor activity through Google Analytics.
          </p>

          <div
            style={glassStyle(0.1)}
            className="inline-block px-6 py-3 rounded-xl"
          >
            <span className="text-white/60 text-sm">Last Updated: </span>
            <span className="text-white font-medium">11th June 2026</span>
          </div>
        </motion.div>

        {/* Principles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {cookiePrinciples.map((principle, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              style={glassStyle(0.1)}
              className="rounded-2xl p-6 text-center hover:border-[#00a8ff]/30 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-[#00a8ff]/20 to-[#4dc3ff]/10">
                <div className="text-[#00a8ff]">{principle.icon}</div>
              </div>
              <h3 className="font-[Recoleta] text-xl font-semibold text-white mb-2">
                {principle.title}
              </h3>
              <p className="text-white/60 text-sm">{principle.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={glassStyle(0.1)}
            className="rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#00a8ff]/20 to-[#4dc3ff]/10">
                <FaCookieBite className="text-[#00a8ff]" />
              </div>
              <div>
                <h2 className="font-[Recoleta] text-2xl md:text-3xl font-bold text-white mb-2">
                  What Are Cookies?
                </h2>
                <p className="text-white/70">
                  Cookies are small text files stored on your device when you
                  visit a website. They help websites remember information,
                  operate securely, measure performance, and provide a better
                  browsing experience.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cookie Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            style={glassStyle(0.1)}
            className="rounded-3xl p-8 md:p-12"
          >
            <h2 className="font-[Recoleta] text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#00a8ff]/20 to-[#4dc3ff]/10">
                <FaSlidersH className="text-[#00a8ff]" />
              </div>
              Types of Cookies We Use
            </h2>

            <div className="space-y-5">
              {cookieTypes.map((type, index) => (
                <div
                  key={index}
                  className="pl-6 border-l-2 border-[#00a8ff]/30"
                >
                  <h3 className="font-[Recoleta] text-xl font-semibold text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-white/70">{type.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Google Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={blueGlassEffect}
            className="rounded-3xl p-8 md:p-12"
          >
            <h2 className="font-[Recoleta] text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#00a8ff]/20">
                <FaChartLine className="text-[#00a8ff]" />
              </div>
              Google Analytics
            </h2>

            <div className="space-y-6">
              <p className="text-white/75">
                We use Google Analytics to collect aggregated information about
                how visitors interact with our website. This may include pages
                visited, approximate location, browser type, device type,
                referral source, session duration, and other usage metrics.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div style={glassEffect} className="p-5 rounded-xl">
                  <h3 className="font-semibold text-white mb-2">
                    Why We Use It
                  </h3>
                  <p className="text-white/60 text-sm">
                    To understand website performance, improve content, measure
                    marketing effectiveness, and identify technical issues.
                  </p>
                </div>
                <div style={glassEffect} className="p-5 rounded-xl">
                  <h3 className="font-semibold text-white mb-2">
                    Measurement ID
                  </h3>
                  <p className="text-white/60 text-sm">
                    This website uses Google Analytics measurement ID{" "}
                    <span className="text-white">G-2Z897PR04V</span>.
                  </p>
                </div>
              </div>

              <p className="text-white/60 text-sm">
                Google may process analytics data according to its own privacy
                and data processing terms. You can learn more through Google
                Privacy & Terms or use Google&apos;s available browser opt-out
                tools where applicable.
              </p>
            </div>
          </motion.div>

          {/* CookieYes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            style={glassStyle(0.1)}
            className="rounded-3xl p-8 md:p-12"
          >
            <h2 className="font-[Recoleta] text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#00a8ff]/20 to-[#4dc3ff]/10">
                <FaLock className="text-[#00a8ff]" />
              </div>
              Cookie Consent Management
            </h2>

            <p className="text-white/70 mb-6">
              We use CookieYes to display our cookie consent banner and manage
              your cookie preferences. CookieYes may store your consent choices
              so that we can respect your selected preferences when you revisit
              our website.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div style={glassEffect} className="p-4 rounded-xl">
                <h3 className="font-semibold text-white mb-2">
                  Consent Storage
                </h3>
                <p className="text-white/60 text-sm">
                  CookieYes helps remember whether you accepted, rejected, or
                  customized cookie categories.
                </p>
              </div>
              <div style={glassEffect} className="p-4 rounded-xl">
                <h3 className="font-semibold text-white mb-2">
                  Preference Updates
                </h3>
                <p className="text-white/60 text-sm">
                  You can update your choices through the consent banner or by
                  clearing cookies in your browser.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Managing Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            style={glassStyle(0.1)}
            className="rounded-3xl p-8 md:p-12"
          >
            <h2 className="font-[Recoleta] text-2xl md:text-3xl font-bold text-white mb-6">
              Managing Your Cookie Preferences
            </h2>

            <p className="text-white/70 mb-6">
              You have control over how cookies are used. Blocking some cookies
              may affect website functionality, but analytics and other
              non-essential cookies can generally be managed through consent
              tools or browser settings.
            </p>

            <div className="space-y-3">
              {rights.map((right, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#00a8ff]/20 to-[#4dc3ff]/10 flex-shrink-0">
                    <FaCheckCircle className="text-[#00a8ff] text-sm" />
                  </div>
                  <span className="text-white/80">{right}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Changes and Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            style={blueGlassEffect}
            className="rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="font-[Recoleta] text-2xl md:text-3xl font-bold text-white mb-4">
              Questions About Cookies?
            </h2>

            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              If you have questions about this Cookie Policy, Google Analytics,
              CookieYes, or how we use tracking technologies, please contact
              us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:barkatullah.zx@gmail.com"
                style={glassEffect}
                className="px-6 py-3 rounded-xl font-semibold text-white hover:text-[#00a8ff] transition-colors duration-300"
              >
                Email Us
              </a>

              <Link
                href="/contact"
                style={glassEffect}
                className="px-6 py-3 rounded-xl font-semibold text-white hover:text-[#00a8ff] transition-colors duration-300"
              >
                Contact Form
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div
            style={glassStyle(0.05)}
            className="inline-block px-6 py-4 rounded-xl"
          >
            <p className="text-white/50 text-sm">
              We may update this Cookie Policy from time to time to reflect
              changes in technology, legal requirements, or our website
              practices.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="text-[#00a8ff] hover:text-[#4dc3ff] transition-colors duration-300 inline-flex items-center gap-2"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
