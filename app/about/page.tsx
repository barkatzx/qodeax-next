"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaAward,
  FaBehance,
  FaBullseye,
  FaChartBar,
  FaChartLine,
  FaClock,
  FaCloud,
  FaCode,
  FaCogs,
  FaDatabase,
  FaDribbble,
  FaEye,
  FaGithub,
  FaGlobe,
  FaHeart,
  FaLightbulb,
  FaLinkedin,
  FaMobile,
  FaRobot,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaTwitter,
  FaUsers,
} from "react-icons/fa";

// Team members
const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & Lead Developer",
    image: "/team/alex.jpg",
    bio: "Full-stack developer with 8+ years of experience in building scalable web applications.",
    social: {
      github: "https://github.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
      twitter: "https://twitter.com/alexchen",
    },
  },
  {
    name: "Sarah Johnson",
    role: "UI/UX Director",
    image: "/team/sarah.jpg",
    bio: "Passionate about creating intuitive and beautiful user experiences that drive engagement.",
    social: {
      dribbble: "https://dribbble.com/sarahj",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      behance: "https://behance.net/sarahj",
    },
  },
  {
    name: "Marcus Rodriguez",
    role: "Senior Backend Engineer",
    image: "/team/marcus.jpg",
    bio: "Specializes in cloud architecture and building robust, scalable backend systems.",
    social: {
      github: "https://github.com/marcusr",
      linkedin: "https://linkedin.com/in/marcusrodriguez",
    },
  },
  {
    name: "Emily Zhang",
    role: "Lead Product Designer",
    image: "/team/emily.jpg",
    bio: "Crafts memorable brand experiences through thoughtful design and attention to detail.",
    social: {
      behance: "https://behance.net/emilyz",
      linkedin: "https://linkedin.com/in/emilyzhang",
      dribbble: "https://dribbble.com/emilyz",
    },
  },
  {
    name: "David Kim",
    role: "AI/ML Engineer",
    image: "/team/david.jpg",
    bio: "Expert in machine learning and AI integration, building intelligent solutions for complex problems.",
    social: {
      github: "https://github.com/davidkim",
      linkedin: "https://linkedin.com/in/davidkim",
    },
  },
  {
    name: "Lisa Patel",
    role: "Cloud Architect",
    image: "/team/lisa.jpg",
    bio: "Designs and implements robust cloud infrastructure solutions for enterprise-scale applications.",
    social: {
      linkedin: "https://linkedin.com/in/lisapatel",
      twitter: "https://twitter.com/lisapatel",
    },
  },
];

// Technologies by category
const technologies = [
  // Frontend
  { name: "nextjs", label: "Next.js", category: "Frontend", icon: "nextjs" },
  { name: "react", label: "React", category: "Frontend", icon: "react" },
  { name: "vue", label: "Vue.js", category: "Frontend", icon: "vue" },
  { name: "angular", label: "Angular", category: "Frontend", icon: "angular" },
  { name: "svelte", label: "Svelte", category: "Frontend", icon: "svelte" },
  {
    name: "typescript",
    label: "TypeScript",
    category: "Frontend",
    icon: "typescript",
  },
  {
    name: "tailwind",
    label: "Tailwind",
    category: "Frontend",
    icon: "tailwind",
  },
  {
    name: "materialui",
    label: "Material UI",
    category: "Frontend",
    icon: "materialui",
  },
  { name: "redux", label: "Redux", category: "Frontend", icon: "redux" },
  { name: "graphql", label: "GraphQL", category: "Frontend", icon: "graphql" },

  // Backend
  { name: "nodejs", label: "Node.js", category: "Backend", icon: "nodejs" },
  { name: "python", label: "Python", category: "Backend", icon: "python" },
  { name: "django", label: "Django", category: "Backend", icon: "django" },
  { name: "flask", label: "Flask", category: "Backend", icon: "flask" },
  { name: "fastapi", label: "FastAPI", category: "Backend", icon: "fastapi" },
  { name: "ruby", label: "Ruby on Rails", category: "Backend", icon: "rails" },
  { name: "php", label: "PHP", category: "Backend", icon: "php" },
  { name: "laravel", label: "Laravel", category: "Backend", icon: "laravel" },
  { name: "go", label: "Golang", category: "Backend", icon: "go" },
  { name: "rust", label: "Rust", category: "Backend", icon: "rust" },
  { name: "java", label: "Java", category: "Backend", icon: "java" },
  { name: "spring", label: "Spring Boot", category: "Backend", icon: "spring" },
  { name: "csharp", label: "C#", category: "Backend", icon: "csharp" },
  { name: "dotnet", label: ".NET Core", category: "Backend", icon: "dotnet" },

  // Mobile
  { name: "flutter", label: "Flutter", category: "Mobile", icon: "flutter" },
  {
    name: "reactnative",
    label: "React Native",
    category: "Mobile",
    icon: "react",
  },
  { name: "swift", label: "Swift", category: "Mobile", icon: "swift" },
  { name: "kotlin", label: "Kotlin", category: "Mobile", icon: "kotlin" },
  { name: "android", label: "Android", category: "Mobile", icon: "android" },
  { name: "ionic", label: "Ionic", category: "Mobile", icon: "ionic" },
  { name: "xamarin", label: "Xamarin", category: "Mobile", icon: "xamarin" },

  // Database
  { name: "mongodb", label: "MongoDB", category: "Database", icon: "mongodb" },
  {
    name: "postgresql",
    label: "PostgreSQL",
    category: "Database",
    icon: "postgresql",
  },
  { name: "mysql", label: "MySQL", category: "Database", icon: "mysql" },
  { name: "redis", label: "Redis", category: "Database", icon: "redis" },
  {
    name: "elasticsearch",
    label: "Elasticsearch",
    category: "Database",
    icon: "elasticsearch",
  },
  {
    name: "influxdb",
    label: "InfluxDB",
    category: "Database",
    icon: "influxdb",
  },
  {
    name: "cassandra",
    label: "Cassandra",
    category: "Database",
    icon: "cassandra",
  },
  { name: "neo4j", label: "Neo4j", category: "Database", icon: "neo4j" },
  {
    name: "dynamodb",
    label: "DynamoDB",
    category: "Database",
    icon: "dynamodb",
  },
  {
    name: "firebase",
    label: "Firebase",
    category: "Database",
    icon: "firebase",
  },
  {
    name: "supabase",
    label: "Supabase",
    category: "Database",
    icon: "supabase",
  },

  // Cloud
  { name: "aws", label: "AWS", category: "Cloud", icon: "aws" },
  {
    name: "googlecloud",
    label: "Google Cloud",
    category: "Cloud",
    icon: "gcp",
  },
  { name: "azure", label: "Azure", category: "Cloud", icon: "azure" },
  {
    name: "digitalocean",
    label: "DigitalOcean",
    category: "Cloud",
    icon: "digitalocean",
  },
  { name: "heroku", label: "Heroku", category: "Cloud", icon: "heroku" },
  { name: "vercel", label: "Vercel", category: "Cloud", icon: "vercel" },
  { name: "netlify", label: "Netlify", category: "Cloud", icon: "netlify" },
  {
    name: "cloudflare",
    label: "Cloudflare",
    category: "Cloud",
    icon: "cloudflare",
  },

  // DevOps
  { name: "docker", label: "Docker", category: "DevOps", icon: "docker" },
  {
    name: "kubernetes",
    label: "Kubernetes",
    category: "DevOps",
    icon: "kubernetes",
  },
  { name: "jenkins", label: "Jenkins", category: "DevOps", icon: "jenkins" },
  {
    name: "githubactions",
    label: "GitHub Actions",
    category: "DevOps",
    icon: "githubactions",
  },
  { name: "gitlab", label: "GitLab CI", category: "DevOps", icon: "gitlab" },
  {
    name: "terraform",
    label: "Terraform",
    category: "DevOps",
    icon: "terraform",
  },
  { name: "ansible", label: "Ansible", category: "DevOps", icon: "ansible" },
  {
    name: "prometheus",
    label: "Prometheus",
    category: "DevOps",
    icon: "prometheus",
  },
  { name: "grafana", label: "Grafana", category: "DevOps", icon: "grafana" },
  { name: "nginx", label: "Nginx", category: "DevOps", icon: "nginx" },

  // AI
  {
    name: "tensorflow",
    label: "TensorFlow",
    category: "AI",
    icon: "tensorflow",
  },
  { name: "pytorch", label: "PyTorch", category: "AI", icon: "pytorch" },
  { name: "openai", label: "OpenAI", category: "AI", icon: "openai" },
  {
    name: "huggingface",
    label: "Hugging Face",
    category: "AI",
    icon: "huggingface",
  },
  { name: "langchain", label: "LangChain", category: "AI", icon: "langchain" },
  { name: "keras", label: "Keras", category: "AI", icon: "keras" },
  {
    name: "scikitlearn",
    label: "Scikit-learn",
    category: "AI",
    icon: "scikitlearn",
  },
  { name: "opencv", label: "OpenCV", category: "AI", icon: "opencv" },

  // Analytics
  { name: "tableau", label: "Tableau", category: "Analytics", icon: "tableau" },
  {
    name: "powerbi",
    label: "Power BI",
    category: "Analytics",
    icon: "powerbi",
  },
  { name: "looker", label: "Looker", category: "Analytics", icon: "looker" },
  {
    name: "snowflake",
    label: "Snowflake",
    category: "Analytics",
    icon: "snowflake",
  },
  {
    name: "databricks",
    label: "Databricks",
    category: "Analytics",
    icon: "databricks",
  },
  {
    name: "apachespark",
    label: "Apache Spark",
    category: "Analytics",
    icon: "spark",
  },
  { name: "hadoop", label: "Hadoop", category: "Analytics", icon: "hadoop" },
  { name: "kafka", label: "Kafka", category: "Analytics", icon: "kafka" },
];

const categoryIcons = {
  Frontend: <FaCode />,
  Backend: <FaServer />,
  Mobile: <FaMobile />,
  Database: <FaDatabase />,
  Cloud: <FaCloud />,
  DevOps: <FaCogs />,
  AI: <FaRobot />,
  Analytics: <FaChartBar />,
};

const values = [
  {
    icon: <FaCode />,
    title: "Clean Architecture",
    description:
      "We write maintainable, scalable code that follows industry best practices and stands the test of time.",
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation First",
    description:
      "Constantly exploring emerging technologies to deliver cutting-edge solutions for our clients.",
  },
  {
    icon: <FaRocket />,
    title: "Performance Driven",
    description:
      "Optimizing every aspect of your application for lightning-fast speed and exceptional user experience.",
  },
  {
    icon: <FaUsers />,
    title: "Client Collaboration",
    description:
      "Working hand-in-hand with clients to transform their vision into reality through transparent communication.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Security First",
    description:
      "Implementing robust security measures to protect your data and ensure compliance with industry standards.",
  },
  {
    icon: <FaChartLine />,
    title: "Scalability Focused",
    description:
      "Building solutions that grow with your business, handling increased loads without compromising performance.",
  },
];

const stats = [
  { number: "100+", label: "Projects Delivered", icon: <FaCode /> },
  { number: "50+", label: "Happy Clients", icon: <FaUsers /> },
  { number: "8+", label: "Years Experience", icon: <FaClock /> },
  { number: "15+", label: "Industry Awards", icon: <FaAward /> },
  { number: "24/7", label: "Support Available", icon: <FaHeart /> },
  { number: "99.9%", label: "Client Satisfaction", icon: <FaGlobe /> },
];

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const primaryColor = "#00a8ff";
  const primaryColorLight = "#4dc3ff";

  const liquidGlassStyle = {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    backdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
  };

  const buttonStyle = {
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: `0 8px 32px ${primaryColor}20, 0 2px 8px rgba(255, 255, 255, 0.1) inset`,
  };

  const filteredTechnologies =
    activeCategory === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <main className="min-h-screen bg-black rounded-3xl overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-5 md:px-20 py-16 md:py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#00a8ff]/10 via-transparent to-[#00a8ff]/5 blur-3xl"
            style={{
              left: `${mousePosition.x * 0.01}px`,
              top: `${mousePosition.y * 0.01}px`,
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00a8ff]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00a8ff]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Agency Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={liquidGlassStyle}
          >
            <span className="w-2 h-2 bg-[#00a8ff] rounded-full animate-ping" />
            <span className="w-2 h-2 bg-[#00a8ff] rounded-full" />
            <span className="text-sm font-semibold text-[#00a8ff]">
              DIGITAL INNOVATION AGENCY
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="font-[Recoleta] text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                We Build Digital
              </span>
              <span className="block bg-gradient-to-r from-[#00a8ff] via-[#4dc3ff] to-[#80d4ff] bg-clip-text text-transparent mt-2">
                Experiences That Matter
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-4xl">
              We're a collective of passionate developers, designers, and
              strategists dedicated to crafting exceptional digital solutions.
              From startups to enterprises, we transform complex challenges into
              seamless, powerful experiences that drive real business growth.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              style={buttonStyle}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Our Portfolio
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0097e6] to-[#00a8ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 border border-white/20 text-white/90 font-semibold rounded-xl hover:border-[#00a8ff]/50 hover:shadow-lg transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
              }}
            >
              <span className="flex items-center gap-2">
                Start Your Project
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="px-5 md:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="rounded-3xl p-8 md:p-10 h-full"
                style={liquidGlassStyle}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                    }}
                  >
                    <FaBullseye className="text-white text-3xl" />
                  </div>
                  <h2 className="font-[Recoleta] text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    Our Mission
                  </h2>
                </div>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  To empower businesses with cutting-edge digital solutions that
                  drive growth, enhance user experiences, and create lasting
                  value. We strive to bridge the gap between complex technology
                  and business goals, making innovation accessible and impactful
                  for organizations of all sizes.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-[#00a8ff] mb-1">
                      100%
                    </div>
                    <div className="text-white/60 text-sm">
                      Client Commitment
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-[#00a8ff] mb-1">
                      24/7
                    </div>
                    <div className="text-white/60 text-sm">
                      Support & Maintenance
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="rounded-3xl p-8 md:p-10 h-full"
                style={liquidGlassStyle}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                    }}
                  >
                    <FaEye className="text-white text-3xl" />
                  </div>
                  <h2 className="font-[Recoleta] text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    Our Vision
                  </h2>
                </div>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  To be the global leader in digital innovation, recognized for
                  transforming ideas into reality through technology. We
                  envision a future where businesses seamlessly integrate
                  advanced technologies to create meaningful connections with
                  their audiences and achieve unprecedented success.
                </p>
                <div className="space-y-4 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#00a8ff] rounded-full" />
                    <span className="text-white/70">
                      Global digital transformation leader by 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#00a8ff] rounded-full" />
                    <span className="text-white/70">
                      1000+ successful projects delivered
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#00a8ff] rounded-full" />
                    <span className="text-white/70">
                      Innovation hub with R&D center
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="rounded-3xl p-8 md:p-10" style={liquidGlassStyle}>
              <h3 className="font-[Recoleta] text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Why Clients Trust Us
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-[#00a8ff] text-4xl mb-4">🔒</div>
                  <h4 className="text-white font-semibold mb-2">
                    Enterprise Security
                  </h4>
                  <p className="text-white/60 text-sm">
                    Bank-level security protocols and compliance with global
                    standards
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-[#00a8ff] text-4xl mb-4">⚡</div>
                  <h4 className="text-white font-semibold mb-2">
                    Agile Development
                  </h4>
                  <p className="text-white/60 text-sm">
                    Rapid delivery with continuous integration and deployment
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-[#00a8ff] text-4xl mb-4">📊</div>
                  <h4 className="text-white font-semibold mb-2">
                    Data-Driven Approach
                  </h4>
                  <p className="text-white/60 text-sm">
                    Every decision backed by analytics and user research
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-5 md:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 mx-auto"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}20 0%, ${primaryColorLight}10 100%)`,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="text-[#00a8ff] text-2xl">{stat.icon}</div>
                </div>
                <div className="font-[Recoleta] text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/60 text-xs md:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-5 md:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={liquidGlassStyle}
            >
              <span className="w-2 h-2 bg-[#00a8ff] rounded-full"></span>
              <span className="text-sm font-semibold text-[#00a8ff]">
                OUR PRINCIPLES
              </span>
            </div>
            <h2 className="font-[Recoleta] text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              What Drives Us Forward
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              These core values shape every decision we make and every line of
              code we write
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className="rounded-2xl hover:shadow-xl transition-all duration-500 p-6 h-full"
                  style={liquidGlassStyle}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`,
                    }}
                  >
                    <div className="text-white text-2xl">{value.icon}</div>
                  </div>
                  <h3 className="font-[Recoleta] text-2xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="px-5 md:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={liquidGlassStyle}
            >
              <span className="w-2 h-2 bg-[#00a8ff] rounded-full"></span>
              <span className="text-sm font-semibold text-[#00a8ff]">
                OUR TECHNOLOGY ECOSYSTEM
              </span>
            </div>
            <h2 className="font-[Recoleta] text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Cutting-Edge Tech Stack
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              We leverage the most advanced technologies to build robust,
              scalable, and future-proof solutions
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === "All"
                  ? "bg-[#00a8ff] text-white"
                  : "text-white/70 hover:text-white bg-white/5 hover:bg-white/10"
              }`}
            >
              All Technologies
            </button>
            {Object.keys(categoryIcons).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category
                    ? "bg-[#00a8ff] text-white"
                    : "text-white/70 hover:text-white bg-white/5 hover:bg-white/10"
                }`}
              >
                <span>
                  {categoryIcons[category as keyof typeof categoryIcons]}
                </span>
                {category}
              </button>
            ))}
          </motion.div>

          {/* Technologies Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div
                  className="rounded-xl border border-white/10 hover:border-[#00a8ff]/30 hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                  }}
                >
                  <div className="w-12 h-12 relative mb-2">
                    <Image
                      src={`https://skillicons.dev/icons?i=${tech.icon}`}
                      alt={tech.name}
                      width={48}
                      height={48}
                      className="w-full h-auto group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <span className="text-xs text-white/50 mb-1">
                    {tech.category}
                  </span>
                  <span className="text-sm font-medium text-white/80 group-hover:text-[#00a8ff] transition-colors text-center">
                    {tech.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Technology Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-[#00a8ff] mb-1">50+</div>
              <div className="text-white/60 text-sm">Technologies Mastered</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-[#00a8ff] mb-1">100%</div>
              <div className="text-white/60 text-sm">Cloud Certified</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-[#00a8ff] mb-1">24/7</div>
              <div className="text-white/60 text-sm">Monitoring</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-[#00a8ff] mb-1">
                99.9%
              </div>
              <div className="text-white/60 text-sm">Uptime Guarantee</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-5 md:px-20 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={liquidGlassStyle}
            >
              <span className="w-2 h-2 bg-[#00a8ff] rounded-full"></span>
              <span className="text-sm font-semibold text-[#00a8ff]">
                MEET THE EXPERTS
              </span>
            </div>
            <h2 className="font-[Recoleta] text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              The Minds Behind The Magic
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              A diverse team of experts passionate about creating exceptional
              digital experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
                  style={liquidGlassStyle}
                >
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                    {/* Placeholder for team member image */}
                    <div className="w-full h-full bg-gradient-to-br from-[#00a8ff]/20 to-[#4dc3ff]/10 flex items-center justify-center">
                      <span className="text-6xl text-white/30">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-[Recoleta] text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#00a8ff] text-sm mb-3">{member.role}</p>
                    <p className="text-white/60 text-sm mb-4">{member.bio}</p>
                    <div className="flex gap-3">
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-[#00a8ff] transition-colors"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-[#00a8ff] transition-colors"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-[#00a8ff] transition-colors"
                        >
                          <FaTwitter />
                        </a>
                      )}
                      {member.social.dribbble && (
                        <a
                          href={member.social.dribbble}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-[#00a8ff] transition-colors"
                        >
                          <FaDribbble />
                        </a>
                      )}
                      {member.social.behance && (
                        <a
                          href={member.social.behance}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-[#00a8ff] transition-colors"
                        >
                          <FaBehance />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
