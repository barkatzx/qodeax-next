"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { BsCookie, BsShieldCheck } from "react-icons/bs";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaTwitter,
} from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";

const currentYear = new Date().getFullYear();

const services = [
  { name: "MVP Development", href: "/services/mvp-development" },
  { name: "Custom Applications", href: "/services/custom-applications" },
  { name: "Business Systems", href: "/services/business-systems" },
  { name: "Commerce Solutions", href: "/services/commerce-solutions" },
  { name: "UI/UX Design", href: "/services/uiux-design" },
  { name: "Performance & Security", href: "/services/performance-security" },
  { name: "Growth Analytics", href: "/services/growth-analytics" },
  { name: "Innovation Lab", href: "/services/innovation-lab" },
];

const menuItems = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Products", href: "/projects" },
  { name: "Case Studies", href: "/blogs" },
  { name: "Career", href: "/career" },
  { name: "Contact Us", href: "/contact" },
];

const legalItems = [
  { name: "Privacy Policy", href: "/privacy", icon: MdOutlinePrivacyTip },
  { name: "Terms & Conditions", href: "/terms", icon: TbFileDescription },
  { name: "Cookie Policy", href: "/cookies", icon: BsCookie },
];

const resources = [
  { name: "Documentation", href: "/documentation" },
  { name: "API Reference", href: "/api-reference" },
  { name: "Support", href: "/support" },
];

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com/qodeax", label: "Facebook" },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/company/qodeax",
    label: "LinkedIn",
  },
  { icon: FaGithub, href: "https://github.com/qodeax", label: "GitHub" },
  { icon: FaTwitter, href: "https://twitter.com/qodeax", label: "Twitter" },
  {
    icon: FaInstagram,
    href: "https://instagram.com/qodeax",
    label: "Instagram",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Main Footer Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-12 py-20 border-b border-white/10"
        >
          {/* Brand & Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="space-y-6">
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
                <span className="font-[Recoleta] font-bold text-white text-2xl tracking-tight">
                  Qodeax
                </span>
              </Link>

              <p className="font-[Outfit-Regular] text-white/70 leading-relaxed">
                We partner with forward-thinking brands to create digital
                experiences that drive growth, engage users, and deliver
                measurable results. Based in NYC, serving clients worldwide.
              </p>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">
                  Subscribe to our newsletter
                </label>
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 pr-28 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute right-2 top-2 px-4 py-3 bg-[#2289ff] rounded-lg text-white text-sm font-medium flex items-center gap-2 group"
                  >
                    {isSubscribed ? (
                      "Sent!"
                    ) : (
                      <>
                        Subscribe
                        <FaPaperPlane className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
                <p className="text-xs text-white/40">
                  Get monthly updates on industry trends and insights
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="font-[Recoleta] text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <motion.li
                  key={service.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={service.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Menu */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-[Recoleta] text-lg mb-6">Menu</h3>
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="font-[Recoleta] text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              {resources.map((item) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <BsShieldCheck className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">GDPR Compliant</p>
                <p className="text-xs text-white/40">Your data is protected</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-8 gap-4">
          <div className="text-white/40 text-sm">
            © {currentYear}{" "}
            <span className="text-white font-medium">Qodeax</span>. All rights
            reserved.
            <span className="mx-2">·</span>
            <Link
              href="/sitemap"
              className="hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {legalItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-white/40 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
