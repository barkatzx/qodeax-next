"use client";

import { theme } from "@/components/lib/theme";
import Glass from "@/components/ui/Glass";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaEnvelope, FaHome } from "react-icons/fa";
import { FaSquareUpRight } from "react-icons/fa6";

export default function NotFound() {
  const buttonStyle = {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: `0 8px 32px ${theme.primary}30`,
  };

  return (
    <section className="py-5 flex items-center justify-center">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.primary}40 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Glass variant="blue" className="p-6 md:p-12">
            <div className="text-center">
              {/* 404 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-8xl md:text-[200px] font-bold leading-none mb-4"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                404
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-[Recoleta] text-4xl md:text-5xl text-white mb-3"
              >
                Page Not Found
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-base md:text-lg mb-8 px-4"
              >
                The page you're looking for doesn't exist or has been deleted or
                moved.
              </motion.p>

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center px-4"
              >
                <Link href="/" className="flex-1 sm:flex-none">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2"
                    style={buttonStyle}
                  >
                    <FaHome />
                    Home
                  </motion.button>
                </Link>

                <Link href="/projects" className="flex-1 sm:flex-none">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 rounded-xl text-white font-medium bg-white/10 border border-white/10 hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FaSquareUpRight />
                    Projects
                  </motion.button>
                </Link>

                <Link href="/contact" className="flex-1 sm:flex-none">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 rounded-xl text-white font-medium bg-white/10 border border-white/10 hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FaEnvelope />
                    Contact
                  </motion.button>
                </Link>
              </motion.div>

              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <button
                  onClick={() => window.history.back()}
                  className="text-white/40 hover:text-white/60 text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
                >
                  <FaArrowLeft className="w-3 h-3" />
                  Go Back
                </button>
              </motion.div>
            </div>
          </Glass>
        </div>
      </div>
    </section>
  );
}
