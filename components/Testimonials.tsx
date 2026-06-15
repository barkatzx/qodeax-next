"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import Glass from "./ui/Glass";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar: string;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "GrowthTech Inc.",
    content:
      "Qodeax delivered a complete full-stack solution that transformed our digital presence. Their team understood our business goals and built a scalable platform that improved performance and accelerated our growth.",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
    project: "Full Stack Platform",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Project Manager",
    company: "Tech Solutions Firm",
    content:
      "Working with Qodeax was an outstanding experience. Their developers built a powerful SaaS product with clean architecture, strong security practices, and excellent performance optimization.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    project: "SaaS Platform",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Startup Founder",
    company: "Innovate Labs",
    content:
      "Qodeax helped us turn our startup idea into a working MVP in record time. Their ability to move from concept to launch while maintaining code quality was impressive.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    project: "Startup MVP",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "CTO",
    company: "Digital Ventures",
    content:
      "The Qodeax team built a high-performance mobile application that runs flawlessly across devices. Their attention to performance, scalability, and user experience truly stands out.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    project: "Mobile Application",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Product Manager",
    company: "InnovateHub",
    content:
      "We needed a secure and scalable backend for our growing platform, and Qodeax delivered beyond expectations. Their expertise in system architecture and security gave us complete confidence.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    project: "Secure Backend System",
  },
  {
    id: 6,
    name: "David Kim",
    role: "CEO",
    company: "StartUp Labs",
    content:
      "Qodeax built our SaaS product with a modern tech stack and scalable infrastructure. The platform is fast, reliable, and designed to grow with our business.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    project: "SaaS Product Development",
  },
  {
    id: 7,
    name: "Rachel Green",
    role: "Creative Director",
    company: "Design Studio",
    content:
      "Qodeax has an incredible ability to transform product ideas into polished digital experiences. Their team balances design, engineering, and performance beautifully.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    project: "Product Development",
  },
  {
    id: 8,
    name: "Tom Harris",
    role: "Technical Lead",
    company: "DevCorp",
    content:
      "From architecture planning to deployment, Qodeax delivered a rock-solid full-stack solution. Clean code, secure infrastructure, and excellent collaboration throughout the project.",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face",
    project: "Full Stack System",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative w-[380px] flex-shrink-0"
    >
      <Glass
        variant="blue"
        solidMobile
        className="relative p-6 transition-all duration-300"
      >
        <div className="absolute top-4 right-4 text-blue-400/30">
          <FaQuoteLeft className="text-2xl" />
        </div>
        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        <div className="flex items-center gap-3">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-400/50 flex-shrink-0"
          />
          <div>
            <h4 className="text-white font-medium text-sm">
              {testimonial.name}
            </h4>
            <p className="text-white/40 text-xs">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
        </div>

        {testimonial.project && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <span className="text-xs text-blue-400/70">
              Project: {testimonial.project}
            </span>
          </div>
        )}
      </Glass>
    </motion.div>
  );
}

export default function TestimonialSlider() {
  const controls = useAnimation();

  const items = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    [],
  );

  const startAnimation = () =>
    controls.start({
      x: [0, -1920],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      },
    });

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <section className="container mx-auto py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-[#07111f]/90 md:bg-white/5 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </div>
          <span className="text-sm text-white/80">Client Success Stories</span>
        </div>

        <h2 className="font-[Recoleta] font-bold text-4xl md:text-5xl mb-5 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Trusted by Industry Leaders
        </h2>

        <p className="font-[Outfit-Regular] text-white/70 text-xl max-w-2xl mx-auto">
          Join hundreds of satisfied clients who&apos;ve transformed their
          digital presence
        </p>
      </motion.div>

      {/* Slider */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => startAnimation()}
        >
          <motion.div
            animate={controls}
            className="flex gap-6"
            style={{ width: "fit-content" }}
          >
            {items.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-white/40 text-sm">
          Join{" "}
          <span className="text-white font-semibold">
            50+ satisfied clients
          </span>{" "}
          who trust us with their digital success
        </p>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 text-xs text-white/30"
        >
          Hover to pause
        </motion.div>
      </motion.div>
    </section>
  );
}
