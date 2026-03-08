"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaTimes, FaWhatsapp } from "react-icons/fa";

const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;
const isConfigured = !!phone;

const professionalMessage =
  "Hello! I'm interested in learning more about your services. " +
  "I'd like to discuss how we might collaborate on an upcoming project. " +
  "Looking forward to hearing from you.";

const whatsappUrl = isConfigured
  ? `https://wa.me/${phone!.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(professionalMessage)}`
  : "#";

export default function WhatsappPopup() {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isConfigured) {
      e.preventDefault();
      alert(
        "We're experiencing a technical issue with our WhatsApp integration. " +
          "Please contact us directly at barkatullah.zx@gmail.com or use the contact form.",
      );
    }
  };

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
            className="mb-4 w-80 rounded-2xl shadow-2xl bg-gray-900 border border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div
              className={`p-4 ${isConfigured ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-gray-500 to-gray-600"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FaWhatsapp className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {isConfigured ? "WhatsApp Chat" : "Contact Us"}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {isConfigured
                      ? "Typically replies within 1 hour"
                      : "Alternative contact methods"}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
              {isConfigured ? (
                <>
                  <div className="bg-gray-800 rounded-xl p-3 shadow-sm mb-3">
                    <p className="text-sm text-gray-300">
                      👋 Hello! Thank you for your interest in our services. How
                      can we assist you today?
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      Just now
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online • Available now
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="group flex items-center justify-between w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors duration-300"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <FaWhatsapp className="text-lg" />
                      Start Conversation
                    </span>
                    <BsSend className="text-sm group-hover:translate-x-1 transition-transform" />
                  </a>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      ⚠️ WhatsApp chat is temporarily unavailable.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="mailto:barkatullah.zx@gmail.com"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      📧 barkatullah.zx@gmail.com
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      📝 Contact Form
                    </a>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-3 text-center">
                By contacting us, you agree to our{" "}
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
          relative flex items-center justify-center
          w-14 h-14 rounded-full shadow-lg
          transition-colors duration-300
          ${
            open
              ? "bg-red-500 hover:bg-red-600"
              : isConfigured
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-500 hover:bg-gray-600"
          }
        `}
        aria-label={open ? "Close chat" : "Open contact options"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {!open && isConfigured && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
          />
        )}

        {open ? (
          <FaTimes className="text-white text-xl" />
        ) : (
          <FaWhatsapp className="text-white text-2xl" />
        )}

        <AnimatePresence>
          {isHovered && !open && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-16 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
            >
              {isConfigured ? "Chat with us" : "Contact us"}
              <span className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
