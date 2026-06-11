"use client";

import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaChartLine,
  FaChevronDown,
  FaCode,
  FaLightbulb,
  FaPaintBrush,
  FaRocket,
  FaShieldAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { FiArrowRight, FiX } from "react-icons/fi";
import { TiThMenu } from "react-icons/ti";
import { theme } from "./lib/theme";
import Glass from "./ui/Glass";

const services = [
  {
    name: "MVP Development",
    href: "/services/mvp-development",
    icon: <FaRocket />,
    description:
      "Launch faster with a minimum viable product tailored to your market",
  },
  {
    name: "Custom Applications",
    href: "/services/custom-applications",
    icon: <FaCode />,
    description:
      "Tailored software solutions built for your unique business needs",
  },
  {
    name: "Business Systems",
    href: "/services/business-systems",
    icon: <FaBriefcase />,
    description:
      "Streamline operations with integrated business management systems",
  },
  {
    name: "Commerce Solutions",
    href: "/services/commerce-solutions",
    icon: <FaShoppingCart />,
    description:
      "Scalable e-commerce platforms that drive sales and engagement",
  },
  {
    name: "UI/UX Design",
    href: "/services/uiux-design",
    icon: <FaPaintBrush />,
    description: "User-centered designs that captivate and convert",
  },
  {
    name: "Performance & Security",
    href: "/services/performance-security",
    icon: <FaShieldAlt />,
    description: "Robust security and optimization for peak performance",
  },
  {
    name: "Growth Analytics",
    href: "/services/growth-analytics",
    icon: <FaChartLine />,
    description: "Data-driven insights to accelerate your business growth",
  },
  {
    name: "Innovation Lab",
    href: "/services/innovation-lab",
    icon: <FaLightbulb />,
    description: "Explore cutting-edge technologies and future-proof solutions",
  },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "Why Us", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Our Work", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
];

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, y: -12, scale: 0.97 },
};

const servicesMenuVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, y: -8, scale: 0.97 },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 300,
      damping: 22,
    },
  }),
};

const buttonStyle = {
  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: `0 8px 32px ${theme.primary}30, 0 2px 8px rgba(255, 255, 255, 0.1) inset`,
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

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
        className="hidden md:block fixed z-50 top-3 left-6 right-6 container mx-auto"
      >
        <Glass variant="blue">
          <div className="px-8 py-3 flex items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-blue-400" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400" />
                </span>
                <span className="font-[Recoleta] text-white text-2xl tracking-tight">
                  Qodeax
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-1 bg-white/10 rounded-2xl border border-white/10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={navItemVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                  onHoverStart={() =>
                    item.hasDropdown && setIsServicesOpen(true)
                  }
                  onHoverEnd={() =>
                    item.hasDropdown && setIsServicesOpen(false)
                  }
                >
                  {item.hasDropdown ? (
                    <>
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          className="pl-5 pr-2 py-2.5 text-white/90 hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                        <button
                          className="pr-4 py-2.5 text-white/90 hover:text-white transition-colors"
                          aria-label="Toggle services menu"
                        >
                          <FaChevronDown
                            className={`w-3 h-3 transition-transform duration-300 mt-1 ${isServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            variants={servicesMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[680px] bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl"
                          >
                            <div className="p-5 grid grid-cols-2 gap-3">
                              {services.map((service, index) => (
                                <motion.div
                                  key={service.name}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.04 }}
                                  whileHover={{ x: 4 }}
                                >
                                  <Link
                                    href={service.href}
                                    className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                  >
                                    <div
                                      className="text-[#2289ff] text-lg p-2.5 rounded-xl shrink-0"
                                      style={{ backgroundColor: "#2289FF25" }}
                                    >
                                      {service.icon}
                                    </div>
                                    <div>
                                      <h4 className="text-white font-[Outfit-Regular] text-base mb-0.5">
                                        {service.name}
                                      </h4>
                                      <p className="text-white/55 text-sm line-clamp-2">
                                        {service.description}
                                      </p>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-5 py-2.5 text-white/90 hover:text-white block transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="group relative flex items-center gap-2.5 px-6 py-3 text-white font-[Outfit-Regular] text-base rounded-2xl overflow-hidden"
                style={buttonStyle}
              >
                Get in Touch
                <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />
              </Link>
            </motion.div>
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
        <div className="rounded-2xl border border-sky-400/20 bg-[#07111f]/90 shadow-[0_8px_32px_rgba(0,168,255,0.15)]">
          <div className="px-5 py-4 flex items-center justify-between">
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

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="gradient"
                onClick={() => setIsMenuOpen((v) => !v)}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FiX className="text-white" size={20} />
                ) : (
                  <TiThMenu className="text-white" size={20} />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-2 rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl overflow-hidden"
            >
              <nav className="py-3 max-h-[70vh] overflow-y-auto">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={navItemVariants}
                    custom={i}
                    className="px-4 font-[Outfit-Regular]"
                  >
                    {item.hasDropdown ? (
                      <>
                        <div className="flex items-center justify-between py-4">
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="text-base text-white/90 hover:text-white transition-colors"
                          >
                            {item.label}
                          </Link>
                          <button
                            onClick={() => setIsServicesOpen((v) => !v)}
                            className="p-1 text-white/60 hover:text-white transition-colors"
                            aria-label="Toggle services menu"
                          >
                            <FaChevronDown
                              className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        </div>

                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-0.5 pb-2">
                                {services.map((service, index) => (
                                  <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                  >
                                    <Link
                                      href={service.href}
                                      onClick={closeMenu}
                                      className="flex items-start gap-3 py-2.5 px-2 rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                      <div
                                        className="text-[#2289ff] text-base p-2 rounded-lg shrink-0"
                                        style={{ backgroundColor: "#2289FF25" }}
                                      >
                                        {service.icon}
                                      </div>
                                      <div>
                                        <h4 className="text-white text-sm font-medium mb-0.5">
                                          {service.name}
                                        </h4>
                                        <p className="text-white/50 text-xs line-clamp-1">
                                          {service.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="group flex items-center justify-between py-4 text-white/90 hover:text-white transition-colors"
                      >
                        <span className="text-base">{item.label}</span>
                        <FiArrowRight className="text-white/40 group-hover:text-[#00a8ff] group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 border-t border-white/10">
                <Link href="/contact" onClick={closeMenu}>
                  <Button
                    variant="gradient"
                    className="w-full py-3.5 flex items-center justify-center gap-2 text-base font-[Outfit-Regular] rounded-xl"
                  >
                    Get in Touch
                    <FiArrowRight />
                  </Button>
                </Link>
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
