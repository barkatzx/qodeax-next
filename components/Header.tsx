"use client";

import { Button } from "@/components/ui/Button";
import logo from "@/public/img/logo.png";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
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
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
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
          <div className="relative z-10 mx-auto px-8 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/">
                  <Image
                    src={logo}
                    alt="Barkat Ullah"
                    width={96}
                    height={48}
                    priority
                  />
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="flex items-center">
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-lg rounded-2xl px-2 py-2 border border-white/10">
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
                        className="relative px-5 py-2.5 text-white/90 hover:text-white rounded-xl transition-all duration-300 group"
                      >
                        <span>{item.label}</span>
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#00a8ff] group-hover:w-3/5 transition-all duration-300 rounded-full" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Right Side - Social & CTA */}
              <div className="flex items-center gap-3">
                {/* Social Links */}
                <motion.div
                  className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-10 h-10 rounded-xl bg-white/20 border border-white/10 flex items-center justify-center group overflow-hidden"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00a8ff]/0 to-[#00a8ff]/0 group-hover:from-[#00a8ff]/20 group-hover:to-[#00a8ff]/10 transition-all duration-300" />
                      <span className="relative text-white/70 group-hover:text-white">
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
                    <Button
                      variant="gradient"
                      className="relative px-6 py-6 rounded-xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="font-[Recoleta] relative z-10 flex items-center gap-2">
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
        className="md:hidden fixed top-2 left-2 right-2 z-50 rounded-2xl"
      >
        <Glass variant="blue">
          <div className="relative z-10 px-5 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/">
                  <Image
                    src={logo}
                    alt="Barkat Ullah"
                    width={96}
                    height={40}
                    priority
                  />
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
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
                className="fixed inset-0 z-40"
              />

              {/* Mobile Menu Panel */}
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full left-4 right-4 z-50 overflow-hidden mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.9) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "24px",
                }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#00a8ff]/10 to-[#00a8ff]/5 animate-pulse"
                    style={{
                      left: `${mousePosition.x * 0.03}px`,
                      top: `${mousePosition.y * 0.03}px`,
                      filter: "blur(80px)",
                    }}
                  />
                </div>

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
                        className="w-full py-4 font-semibold flex items-center justify-center gap-2 font-[Recoleta]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
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
