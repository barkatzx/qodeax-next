"use client";

import { motion } from "framer-motion";
import { FaRocket, FaSitemap } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { SiOctopusdeploy } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import Glass from "./ui/Glass";

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  duration: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery",
    description: "Understanding your goals and requirements",
    icon: HiOutlineLightBulb,
    features: [
      "Stakeholder interviews",
      "Market research",
      "Technical audit",
      "Goal definition",
    ],
    duration: "1-2 weeks",
  },
  {
    id: 2,
    title: "Strategy",
    description: "Planning architecture and product roadmap",
    icon: FaSitemap,
    features: [
      "Architecture design",
      "Technology selection",
      "Timeline planning",
      "Resource allocation",
    ],
    duration: "2-3 weeks",
  },
  {
    id: 3,
    title: "Development",
    description: "Building scalable, secure systems",
    icon: SiOctopusdeploy,
    features: [
      "Agile methodology",
      "Daily updates",
      "Quality assurance",
      "Security reviews",
    ],
    duration: "4-12 weeks",
  },
  {
    id: 4,
    title: "Launch & Growth",
    description: "Deploying and optimizing for long-term success",
    icon: FaRocket,
    features: [
      "Deployment strategy",
      "Performance monitoring",
      "User feedback",
      "Continuous improvement",
    ],
    duration: "Ongoing",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 15, stiffness: 100 },
  },
};

export default function ProcessSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-20 overflow-hidden">
      <div>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-white/80">
              Our Process
            </span>
          </div>

          <h2 className="font-[Recoleta] font-bold text-4xl md:text-5xl mb-5 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            From Your Idea to Product Launch
          </h2>

          <p className="font-[Outfit-Regular] text-white/70 text-xl max-w-5xl mx-auto">
            We combine strategy, design, and development to turn your concept
            into a powerful digital solution ready for real-world growth.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div ref={ref} className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid lg:grid-cols-4 gap-6 lg:gap-4"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute -top-3 left-6 z-10">
                  <div className="w-8 h-8 rounded-full bg-[#2289ff] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-white/10">
                    {step.id}
                  </div>
                </div>

                <Glass
                  variant="blue"
                  solidMobile
                  className="relative p-6 pt-8 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[#2289FF38] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-7 h-7 text-[#2289ff]" />
                    </div>
                  </div>

                  <h3 className="font-[Recoleta] font-bold text-xl text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    {step.description}
                  </p>

                  <ul className="space-y-2 mb-4 flex-grow">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2289ff]" />
                        <span className="text-white/60">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/40">Estimated time</span>
                      <span className="text-white/80 font-medium">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
