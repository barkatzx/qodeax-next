"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaTimes, FaWhatsapp } from "react-icons/fa";

export default function WhatsappPopup() {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fix: Use NEXT_PUBLIC_ prefix for environment variables accessible in browser
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  // Professional message template
  const professionalMessage =
    "Hello! I'm interested in learning more about your services. " +
    "I'd like to discuss how we might collaborate on an upcoming project. " +
    "Looking forward to hearing from you.";

  // Add validation to prevent invalid WhatsApp links
  const whatsappUrl = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(professionalMessage)}`
    : "#";

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!phone) {
      e.preventDefault();
      console.error("WhatsApp phone number not configured");
      alert("WhatsApp number is not configured. Please contact support.");
    }
  };

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        popupRef.current &&
        buttonRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 rounded-2xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FaWhatsapp className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">WhatsApp Chat</h3>
                  <p className="text-white/80 text-xs">
                    Typically replies within 1 hour
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  👋 Hello! Thank you for your interest in our services. How can
                  we assist you today?
                </p>
                <span className="text-xs text-gray-400 mt-1 block">
                  Just now
                </span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Online • Available now
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="group relative flex items-center justify-between w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-all duration-300 overflow-hidden"
              >
                <span className="flex items-center gap-2 font-medium">
                  <FaWhatsapp className="text-lg" />
                  Start Conversation
                </span>
                <BsSend className="text-sm group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </a>

              <p className="text-xs text-gray-400 mt-3 text-center">
                By chatting, you agree to our{" "}
                <a href="/privacy" className="text-green-500 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`
          relative group flex items-center justify-center
          w-14 h-14 rounded-full shadow-lg 
          transition-all duration-300 overflow-hidden
          ${
            open
              ? "bg-red-500 hover:bg-red-600 rotate-90"
              : "bg-green-500 hover:bg-green-600"
          }
        `}
        aria-label={open ? "Close chat" : "Open WhatsApp chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Notification dot */}
        {!open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
          />
        )}

        {/* Icon with animation */}
        <motion.div
          animate={{ rotate: open ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {open ? (
            <FaTimes className="text-white text-xl" />
          ) : (
            <FaWhatsapp className="text-white text-2xl" />
          )}
        </motion.div>

        {/* Hover tooltip */}
        <AnimatePresence>
          {isHovered && !open && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-16 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
            >
              Chat with us
              <span className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={!open ? { scale: [0, 1.5, 2], opacity: [0.5, 0, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.button>

      {/* Fixed position indicator (optional) */}
      <div className="absolute -bottom-1 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
    </div>
  );
}
