"use client";

import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaAward,
  FaBolt,
  FaChevronRight,
  FaCrown,
  FaGlobe,
  FaHandshake,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { HiTrendingUp } from "react-icons/hi";
import { SiCardmarket } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import { theme } from "./lib/theme";
import Glass from "./ui/Glass";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 100,
    },
  },
};

const PARTICLE_POSITIONS = [
  { left: "5%", top: "15%", size: "w-2 h-2", delay: 0 },
  { left: "15%", top: "45%", size: "w-1 h-1", delay: 0.2 },
  { left: "25%", top: "75%", size: "w-3 h-3", delay: 0.4 },
  { left: "35%", top: "25%", size: "w-1.5 h-1.5", delay: 0.6 },
  { left: "45%", top: "55%", size: "w-2 h-2", delay: 0.8 },
  { left: "55%", top: "85%", size: "w-1 h-1", delay: 1 },
  { left: "65%", top: "35%", size: "w-2.5 h-2.5", delay: 1.2 },
  { left: "75%", top: "65%", size: "w-1.5 h-1.5", delay: 1.4 },
  { left: "85%", top: "15%", size: "w-2 h-2", delay: 1.6 },
  { left: "95%", top: "45%", size: "w-1 h-1", delay: 1.8 },
  { left: "10%", top: "90%", size: "w-2 h-2", delay: 2 },
  { left: "30%", top: "10%", size: "w-1.5 h-1.5", delay: 2.2 },
  { left: "50%", top: "40%", size: "w-2 h-2", delay: 2.4 },
  { left: "70%", top: "70%", size: "w-1 h-1", delay: 2.6 },
  { left: "90%", top: "30%", size: "w-2.5 h-2.5", delay: 2.8 },
];

interface CounterProps {
  target: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({
  target,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
}: CounterProps) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp + delay * 1000;
        const elapsed = timestamp - startTimestamp;
        if (elapsed < 0) {
          requestAnimationFrame(step);
          return;
        }
        const progress = Math.min(elapsed / (duration * 1000), 1);
        setValue(Math.floor(target * progress));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setValue(target);
        }
      };
      requestAnimationFrame(step);
    }
  }, [inView, target, duration, delay, hasAnimated]);

  return (
    <span ref={ref} className="font-[Recoleta] text-4xl text-white">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function ModernHero() {
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    controls.start("visible");
    setIsLoaded(true);
  }, [controls]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const buttonStyle = {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: `0 8px 32px ${theme.primary}30, 0 2px 8px rgba(255, 255, 255, 0.1) inset`,
  };

  return (
    <section
      ref={containerRef}
      className="flex items-center justify-center overflow-hidden rounded-xl"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLE_POSITIONS.map((position, i) => (
          <motion.div
            key={i}
            className={`absolute ${position.size} bg-gradient-to-r from-[#00a8ff] to-[#4dc3ff] rounded-full`}
            style={{
              left: position.left,
              top: position.top,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              delay: position.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glowing Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.path
          d="M0,100 Q150,50 300,100 T600,100"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          animate={{
            d: [
              "M0,100 Q150,50 300,100 T600,100",
              "M0,150 Q150,200 300,150 T600,150",
              "M0,100 Q150,50 300,100 T600,100",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00a8ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00a8ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#00a8ff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Content Container */}
      <div ref={inViewRef} className="container mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="lg:col-span-7"
          >
            {/* Premium Badge */}
            <motion.div variants={itemVariants} className="py-10">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/10 bg-white/5 hover:border-[#00a8ff]/30 transition-all duration-300">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <FaCrown className="w-4 h-4 text-[#00a8ff]" />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 w-4 h-4 bg-[#00a8ff] rounded-full blur-md"
                  />
                </motion.div>
                <span className="text-sm font-medium text-white">
                  Your Partner in Digital Growth{" "}
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="max-w-3xl">
              <h1 className="font-[Recoleta] text-5xl text-white">
                Web platforms built to support Real business growth
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-white/70 max-w-2xl mt-5"
            >
              We partner with startups and growing companies to design and build
              fast, secure, and scalable web platforms. From high-performance
              websites to custom dashboards and internal tools, we focus on
              clean architecture, measurable outcomes, and long-term
              maintainability—so your technology supports your business, not
              slows it down.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 text-white font-[Outfit-Regular]  text-lg rounded-2xl overflow-hidden"
                style={buttonStyle}
              >
                <span className="flex items-center justify-center gap-3">
                  <Link href="/contact">Start Your Journey</Link>
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 text-white font-medium text-lg rounded-2xl border border-white/20 hover:border-[#00a8ff]/50 backdrop-blur-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Link href="https://calendly.com/barkatzx">
                    Book Consultation
                  </Link>
                  <FaChevronRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-8 mt-12 pt-5 border-t border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-black overflow-hidden"
                    >
                      <Image
                        src={`/img/avator-${i}.jpg`}
                        alt={`Client ${i}`}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-white/10 backdrop-blur flex items-center justify-center text-xs text-white">
                    +02
                  </div>
                </div>
                <span className="text-sm text-white/60">Happy Clients</span>
              </div>

              <div className="flex items-center gap-2">
                <FaAward className="w-5 h-5 text-[#00a8ff]" />
                <span className="text-sm text-white/60">
                  Award-Winning Team
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaGlobe className="w-5 h-5 text-[#00a8ff]" />
                <span className="text-sm text-white/60">Global Delivery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Stats & Visuals */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="lg:col-span-5"
          >
            <motion.div variants={itemVariants}>
              <Glass
                variant="blue"
                className="p-8 rounded-2xl transition-all duration-300"
              >
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      icon: SiCardmarket,
                      label: "Years in Market",
                      target: 1,
                      suffix: "+",
                    },
                    {
                      icon: FaRocket,
                      label: "Projects Delivered",
                      target: 5,
                      suffix: "+",
                      delay: 0.2,
                    },
                    {
                      icon: GiWorld,
                      label: "Global Clients",
                      target: 3,
                      suffix: "+",
                      delay: 0.4,
                    },
                    {
                      icon: HiTrendingUp,
                      label: "Success Rate",
                      target: 100,
                      suffix: "%",
                      delay: 0.6,
                    },
                  ].map(
                    ({ icon: Icon, label, target, suffix, delay = 0 }, i) => (
                      <motion.div
                        key={label}
                        whileHover={{ y: -5 }}
                        className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00a8ff]/30 transition-all duration-300"
                      >
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay,
                          }}
                          className="mb-3"
                        >
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#00a8ff]/20 to-[#4dc3ff]/10 flex items-center justify-center">
                            <Icon className="w-8 h-8 text-[#00a8ff]" />
                          </div>
                        </motion.div>
                        <Counter
                          target={target}
                          suffix={suffix}
                          delay={delay}
                        />
                        <div className="text-sm text-white/50 mt-1 font-[Outfit-Regular] ">
                          {label}
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>

                {/* Tech Stack Pills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 }}
                  className="mt-8 pt-6 border-t border-white/10"
                >
                  <p className="font-[Outfit-Regular] text-lg font-medium text-white/50 mb-4 text-center">
                    Trusted Technologies We Use
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Node.js",
                      "Python",
                      "AWS",
                      "GraphQL",
                      "Docker",
                    ].map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1.4 + i * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-2 text-xs font-medium text-white/90 rounded-full border border-white/10 hover:border-[#00a8ff]/50 hover:text-[#00a8ff] transition-all duration-300 cursor-default backdrop-blur-sm"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0, 168, 255, 0.1) 0%, rgba(0, 168, 255, 0.05) 100%)",
                          boxShadow: "0 2px 8px -4px rgba(0, 168, 255, 0.2)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </Glass>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 mt-6"
            >
              {[
                { icon: FaBolt, label: "Lightning Fast" },
                { icon: FaShieldAlt, label: "Bank-Level Security" },
                { icon: FaHandshake, label: "Dedicated Support" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 rounded-2xl border border-white/10 hover:border-[#00a8ff]/30 backdrop-blur-lg text-center group transition-all duration-300"
                  style={{
                    boxShadow: "0 4px 15px -8px rgba(0, 168, 255, 0.3)",
                  }}
                >
                  <feature.icon className="w-5 h-5 text-[#00a8ff] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-white/70">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-white/40 tracking-widest">
            DISCOVER MORE
          </span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-[#00a8ff] via-[#4dc3ff] to-transparent rounded-full" />
        </motion.div>
      </motion.div>

      {/* Floating Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-[#00a8ff]/20 to-[#4dc3ff]/10 blur-2xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-gradient-to-r from-[#7928ca]/5 to-[#ff0080]/5 blur-2xl"
      />
    </section>
  );
}
