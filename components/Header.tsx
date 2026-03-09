"use client";

import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiArrowRight, FiX } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { theme } from "./lib/theme";
import Glass from "./ui/Glass";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttonStyle = {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: `0 8px 32px ${theme.primary}30, 0 2px 8px rgba(255, 255, 255, 0.1) inset`,
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    exit: { opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" },
  };

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Case Study", href: "/blogs" },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/barkatzx",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      href: "https://linkedin.com/in/barkatzx",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter />,
      href: "https://twitter.com/barkatzx",
      label: "Twitter",
    },
  ];

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="hidden md:block fixed z-50 top-2 left-8 right-8 rounded-2xl container mx-auto"
      >
        <Glass variant="blue">
          <div className="mx-auto px-8 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/" className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ background: "#00a8ff" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ background: "#00a8ff" }}
                    />
                  </span>
                  <span className="font-[Recoleta] text-white text-2xl tracking-tight">
                    Qodeax
                  </span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="flex items-center">
                <div className="flex items-center gap-1 bg-white/10 rounded-2xl px-2 py-2 border border-white/10">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      variants={navItemVariants}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={item.href}
                        className="px-5 py-2.5 text-white/90 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Right Side - Social & CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 text-white font-[Outfit-Regular]  text-lg rounded-2xl overflow-hidden"
                style={buttonStyle}
              >
                <span className="flex items-center justify-center gap-3">
                  <Link href="/contact">Get in Touch</Link>
                  <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.button>
            </div>
          </div>
        </Glass>
      </motion.header>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed z-50 top-2 left-2 right-2 md:hidden"
      >
        <Glass variant="blue">
          <div className="px-5 py-5">
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/" className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ background: "#00a8ff" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ background: "#00a8ff" }}
                    />
                  </span>
                  <span className="font-[Recoleta] text-white text-2xl tracking-tight">
                    Qodeax
                  </span>
                </Link>
              </motion.div>

              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="gradient"
                  onClick={toggleMenu}
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <FiX className="text-white" size={24} />
                  ) : (
                    <TiThMenu className="text-white" size={24} />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </Glass>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="top-full left-8 right-8 z-50 overflow-hidden mt-2 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgb(37, 37, 37) 0%, rgb(0, 0, 0) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <nav className="relative z-10 py-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={navItemVariants}
                    custom={i}
                    className="px-6 font-[Outfit-Regular] text-lg"
                    whileHover={{ x: 8 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between py-4 group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00a8ff]/10 to-[#00a8ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                      <span className="relative text-lg font-semibold text-white/90 group-hover:text-white">
                        {item.label}
                      </span>
                      <FiArrowRight className="relative text-white/60 group-hover:text-[#00a8ff] group-hover:translate-x-2 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="relative z-10 p-6 bg-white/10 border-t border-white/10">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden rounded-xl font-[Outfit-Regular]"
                >
                  <Link href="/contact" onClick={closeMenu}>
                    <Button
                      variant="gradient"
                      className="w-full py-8 flex items-center justify-center gap-2 text-lg"
                    >
                      Get in Touch
                      <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-20 md:h-24" />
    </>
  );
}
