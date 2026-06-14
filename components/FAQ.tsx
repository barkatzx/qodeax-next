"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Glass from "./ui/Glass";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "general" | "technical" | "pricing" | "support";
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What is the typical timeline for a project?",
    answer:
      "Project timelines vary depending on scope, complexity, and integrations. Marketing or launch websites generally take 1–2 weeks, business websites and growth platforms take around 2–4 weeks, while custom web applications or digital systems may require 4–12 weeks. During the discovery phase, we define a clear roadmap and delivery timeline before development begins.",
    category: "general",
  },
  {
    id: 2,
    question: "Which technologies do you specialize in?",
    answer:
      "We use modern, production-ready technologies selected according to the project's goals and scalability needs. Our primary stack includes Next.js, React, TypeScript, Node.js, and WordPress for CMS-driven platforms. We also work with robust databases, APIs, and cloud infrastructure to deliver secure, high-performance applications.",
    category: "technical",
  },
  {
    id: 3,
    question: "Do you provide support after the project is launched?",
    answer:
      "Yes. We provide post-launch support to ensure everything runs smoothly after deployment. For ongoing needs, we offer maintenance and support plans that include performance monitoring, security updates, feature enhancements, and technical assistance as your platform grows.",
    category: "support",
  },
  {
    id: 4,
    question: "How is project pricing determined?",
    answer:
      "Our pricing is scope-based and fully transparent. Standard website projects start from defined baseline budgets, while larger platforms, SaaS products, or custom applications are quoted after a discovery session. Final pricing depends on requirements, integrations, design complexity, and delivery timelines.",
    category: "pricing",
  },
  {
    id: 5,
    question: "Can you work with existing designs or ongoing projects?",
    answer:
      "Absolutely. We often collaborate with existing teams, designers, and codebases. Whether you have Figma designs ready, an existing platform that needs improvements, or a legacy system requiring optimization, we can integrate seamlessly and extend the project efficiently.",
    category: "technical",
  },
  {
    id: 6,
    question: "How do you ensure the quality of your work?",
    answer:
      "Quality assurance is built into every stage of our workflow. We follow structured development practices, maintain clean and scalable code, and conduct thorough testing across browsers, devices, and performance benchmarks. Security, reliability, and long-term maintainability are always prioritized.",
    category: "technical",
  },
  {
    id: 7,
    question: "Do you handle hosting, deployment, and infrastructure?",
    answer:
      "Yes. We manage the full deployment process, including hosting setup, server configuration, SSL installation, and performance optimization. Platforms are deployed using modern infrastructure designed for reliability, security, and scalability.",
    category: "support",
  },
  {
    id: 8,
    question: "How are feedback and revisions handled during the project?",
    answer:
      "Our workflow is collaborative and milestone-driven. Projects are delivered in phases with structured review checkpoints. This allows clients to provide feedback early and ensures revisions are handled efficiently while keeping the project aligned with the original objectives and timeline.",
    category: "general",
  },
];

export default function FAQComponent() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section>
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-[#07111f]/90 md:bg-white/5 mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm text-white/80">Knowledge Base</span>
          </div>

          <h1 className="font-[Recoleta] text-4xl md:text-5xl mb-5 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Question and Answer
          </h1>

          <p className="text-white/70 text-xl max-w-5xl mx-auto">
            Detailed insights about our services, process, and how we
            collaborate to deliver exceptional results
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Glass
                variant="blue"
                solidMobile
                className={`rounded-xl overflow-hidden transition-colors duration-300 ${openItem === item.id ? "border-blue-500/30" : ""}`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 flex items-start justify-between group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <span className="text-xs font-medium text-white/50">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-[Outfit-Regular] text-xl text-white text-left group-hover:text-blue-400 transition-colors duration-300 pr-8">
                      {item.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: openItem === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.02] group-hover:bg-white/5 ml-4 flex-shrink-0"
                  >
                    <FaChevronDown className="text-white group-hover:text-blue-400 transition-colors duration-300" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="pl-3 border-l-2 border-blue-500/30">
                          <p className="text-white/70 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
