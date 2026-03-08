"use client";

import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import Glass from "./ui/Glass";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Navigation variants
  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      filter: "blur(10px)",
    },
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
                  {/* Animated orb dot */}
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
                  <span className="font-[Recoleta] text-white text-2xl tracking-tight group-hover:text-[#00a8ff] transition-colors duration-300">
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
                        className="relative px-5 py-2.5 text-white/90 hover:text-white"
                      >
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Right Side - Social & CTA */}
              <div className="flex items-center gap-3">
                {/* Social Links */}
                <motion.div
                  className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group overflow-hidden"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-white/70 group-hover:text-white">
                        {social.icon}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>

                {/* Contact Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact">
                    <Button variant="gradient" className="px-6 py-6 rounded-xl">
                      <span className="flex items-center gap-2 font-bold">
                        Get In Touch
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                        </motion.span>
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
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
              {/* Mobile Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/" className="flex items-center gap-2.5">
                  {/* Animated orb dot */}
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
                  <span className="font-[Recoleta] text-white text-2xl tracking-tight group-hover:text-[#00a8ff] transition-colors duration-300">
                    Qodeax
                  </span>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
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
                    <FiMenu className="text-white" size={24} />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </Glass>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Mobile Menu Panel */}
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="top-full left-8 right-8 z-50 overflow-hidden mt-2 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.9) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Menu Items */}
                <nav className="relative z-10 py-6">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      variants={navItemVariants}
                      custom={i}
                      className="px-6"
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

                {/* Footer Section */}
                <div className="relative z-10 p-6 bg-black/80 border-t border-white/10">
                  {/* Social Links */}
                  <div className="flex justify-center gap-4 mb-6">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden group"
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="gradient"
                          className="w-full h-full flex items-center justify-center rounded-xl"
                        >
                          <span className="relative text-white/70 group-hover:text-white">
                            {social.icon}
                          </span>
                        </Button>
                      </motion.a>
                    ))}
                  </div>

                  {/* Contact Button */}
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <Link href="/contact" onClick={closeMenu}>
                      <Button
                        variant="gradient"
                        className="w-full py-4 font-semibold flex items-center justify-center gap-2"
                      >
                        Contact Me
                        <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-20 md:h-24" />
    </>
  );
}
