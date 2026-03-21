"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code,
  Briefcase,
  FolderKanban,
  GraduationCap,
  MessageCircle,
  Mail,
  Github,
  Linkedin,
  Sun,
  Moon,
  Wifi,
  Battery,
  Clock,
  Download,
  Send,
  X,
  ExternalLink,
  ChevronRight,
  MapPin,
  Calendar,
  Award,
  Terminal,
  Database,
  Cloud,
  Wrench,
  Minus,
  Maximize2,
} from "lucide-react";

const Plus = ({ size, strokeWidth, color }: any) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

import { DockItem } from "../components/docItem";

const portfolioData = {
  name: "Aashutosh Chouhan",
  role: "Software Engineer",
  tagline:
    "Building scalable solutions with modern technologies. Passionate about creating impactful software.",
  email: "aashutoshchouhan2@gmail.com",
  phone: "+91 7241106725",
  github: "https://github.com/Aashu-1",
  linkedin: "https://www.linkedin.com/in/aashutosh-chouhan-5396a7248",
  location: "Mumbai, India",
  yearsOfExperience: "2+ Years",
  openToWork: true,
  bio: "A passionate Backend Focused Software Engineer with expertise in building full-stack applications and AI-powered solutions. I love solving complex problems and delivering high-quality solutions. Experienced in developing scalable backend services, working with AI/LLM technologies, and building distributed systems.",
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "SQL"],
    frameworks: ["Node.js", "Express.js", "NestJS", "React.js", "FastAPI"],
    databases: ["MongoDB", "PostgreSQL", "Redis"],
    ai: ["RAG", "OpenAI Agents SDK", "Prompt Engineering"],
    cloud: ["AWS SQS", "AWS EC2", "S3"],
    tools: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "Jenkins",
      "JIRA",
      "Mongoose",
      "Cursor",
    ],
  },
  experience: [
    {
      company: "QuickAds.ai",
      role: "Software Engineer",
      location: "Bangalore",
      duration: "Nov 2025 - Jan 2026",
      achievements: [
        "Contributed to an AI-powered advertisement generation platform focused on automated ad discovery and optimization.",
        "Developed backend APIs using Python and FastAPI to support AI-driven ad generation, experimentation workflows, and performance analytics.",
        "Worked on the Discover Ads and Optimize Ads modules enabling intelligent ad selection and automated optimization based on engagement signals.",
      ],
    },
    {
      company: "Regenesys Education",
      role: "Software Engineer",
      location: "Remote",
      duration: "Jan 2025 - Oct 2025",
      achievements: [
        "Developed and maintained the backend architecture of the core product RMS (Regenesys Management System) using NestJS and TypeScript.",
        "Built and optimized APIs for examinations, applications, assessments, and real-time student data workflows.",
        "Performed code reviews to ensure code quality, maintainability, and adherence to engineering best practices.",
        "Improved system scalability by optimizing database queries and implementing efficient data models.",
      ],
    },
    {
      company: "Samyotech Pvt Ltd.",
      role: "Full Stack Developer",
      location: "On-Site",
      duration: "Nov 2023 - Dec 2024",
      achievements: [
        "Designed and developed multiple end-to-end full-stack applications including DurgaTempleVA, HotelCRM, and Client360.",
        "Built scalable backend services using NestJS, TypeScript, MERN/PERN stack, and PostgreSQL.",
        "Worked on enterprise backend services for Regenesys Management System (RMS) contributing to core product features.",
      ],
    },
  ],
  projects: [
    {
      name: "Distributed Communications Platform",
      description:
        "Built a distributed communications module supporting notifications and delayed API workflows across multiple services.",
      techStack: ["AWS SQS", "Postmark", "Node.js", "TypeScript"],
      // github: "https://github.com/aashutosh",
      live: null,
    },
    {
      name: "Hotel CRM",
      description:
        "Developed a web-based hotel management platform managing reservations, billing, and customer operations.",
      techStack: ["MERN Stack", "Redis", "Cron Jobs", "WhatsApp API"],
      // github: "https://github.com/aashutosh",
      live: null,
    },
  ],
  education: [
    {
      institution: "Vikram University",
      location: "Ujjain, Madhya Pradesh",
      degree: "Bachelor of Computer Application (BCA)",
      year: "2021 -- 2024",
      cgpa: null,
      coursework:
        "Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, Linear Algebra, Discrete Mathematics",
    },
  ],
  certifications: [
    {
      name: "Agentic AI",
      url: "https://www.udemy.com/certificate/UC-59c9d85b-cd52-420c-be78-a9a6736d857e/",
    },
    {
      name: "Spoken English",
    },
  ],
};

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Backend Developer",
  "Problem Solver",
];

const CHAT_PANEL_WIDTH = 460;
const CHAT_PANEL_HEIGHT = 680;

const getDefaultChatPosition = () => {
  if (typeof window === "undefined") {
    return { x: 20, y: 40 };
  }

  return {
    x: Math.max(window.innerWidth - CHAT_PANEL_WIDTH - 20, 20),
    y: Math.max(window.innerHeight - CHAT_PANEL_HEIGHT - 100, 40),
  };
};

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [showChat, setShowChat] = useState(false);
  const [isChatMaximized, setIsChatMaximized] = useState(false);
  const [chatTab, setChatTab] = useState<"chat" | "links">("chat");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const chatToggleRef = useRef<HTMLButtonElement>(null);
  const [chatPosition, setChatPosition] = useState(getDefaultChatPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as
      | "light"
      | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    }
    document.documentElement.setAttribute("data-theme", savedTheme || "dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    if (!isDeleting) {
      if (displayedText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsDeleting(true), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, [displayedText, isDeleting, currentRoleIndex]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownloadResume = () => {
    showToast("Downloading Resume... ✅", "success");
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    link.click();
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chatPanelRef.current && !isChatMaximized) {
      const rect = chatPanelRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    if (!isDragging || isChatMaximized) return;

    const handleMouseMove = (e: MouseEvent) => {
      const panel = chatPanelRef.current;
      if (!panel) return;

      const panelWidth = panel.offsetWidth;
      const panelHeight = panel.offsetHeight;
      const nextLeft = e.clientX - dragOffset.x;
      const nextTop = e.clientY - dragOffset.y;
      const maxX = Math.max(window.innerWidth - panelWidth, 0);
      const maxY = Math.max(window.innerHeight - panelHeight, 0);

      setChatPosition({
        x: Math.min(Math.max(nextLeft, 0), maxX),
        y: Math.min(Math.max(nextTop, 0), maxY),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragOffset.x, dragOffset.y, isChatMaximized, isDragging]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateChatPosition = () => {
      const panel = chatPanelRef.current;
      const panelWidth = isChatMaximized
        ? window.innerWidth * 0.9
        : panel?.offsetWidth || CHAT_PANEL_WIDTH;
      const panelHeight = isChatMaximized
        ? window.innerHeight * 0.9
        : panel?.offsetHeight || CHAT_PANEL_HEIGHT;
      const maxX = Math.max(window.innerWidth - panelWidth, 0);
      const maxY = Math.max(window.innerHeight - panelHeight, 0);

      setChatPosition((current) => ({
        x: Math.min(Math.max(current.x, 20), maxX),
        y: Math.min(Math.max(current.y, 40), maxY),
      }));
    };

    updateChatPosition();
    window.addEventListener("resize", updateChatPosition);

    return () => {
      window.removeEventListener("resize", updateChatPosition);
    };
  }, [isChatMaximized]);

  const closeChatPanel = () => {
    setShowChat(false);
    setIsChatMaximized(false);
    setIsDragging(false);
  };

  const toggleChatMaximize = () => {
    setIsDragging(false);
    setIsChatMaximized((prev) => !prev);
  };

  const TrafficLights = ({
    isChat,
    onRed,
    onYellow,
    onGreen,
    isMaximized,
  }: any) => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const trafficButtonStyle = (isClickable: boolean) => ({
      cursor: isClickable ? "pointer" : "default",
      padding: 0,
      appearance: "none" as const,
      WebkitAppearance: "none" as const,
      border: "none",
      outline: "none",
    });

    return (
      <div
        className="traffic-lights"
        style={{ display: "flex", gap: "8px", cursor: isMaximized ? "default" : "grab" }}
      >
        <button
          type="button"
          className="traffic-light red"
          onMouseEnter={() => setHoveredButton("red")}
          onMouseLeave={() => setHoveredButton(null)}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRed?.();
          }}
          style={trafficButtonStyle(Boolean(onRed))}
        >
          {hoveredButton === "red" && (
            <X size={7} strokeWidth={4} color="rgba(0,0,0,0.5)" />
          )}
        </button>
        <button
          type="button"
          className="traffic-light yellow"
          onMouseEnter={() => setHoveredButton("yellow")}
          onMouseLeave={() => setHoveredButton(null)}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onYellow?.();
          }}
          style={trafficButtonStyle(Boolean(onYellow))}
        >
          {hoveredButton === "yellow" && (
            <Minus size={7} strokeWidth={4} color="rgba(0,0,0,0.5)" />
          )}
        </button>
        <button
          type="button"
          className="traffic-light green"
          onMouseEnter={() => setHoveredButton("green")}
          onMouseLeave={() => setHoveredButton(null)}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onGreen?.();
          }}
          style={trafficButtonStyle(Boolean(onGreen))}
        >
          {hoveredButton === "green" &&
            (isChat ? (
              isMaximized ? (
                <Minus size={7} strokeWidth={4} color="rgba(0,0,0,0.5)" />
              ) : (
                <Maximize2 size={7} strokeWidth={4} color="rgba(0,0,0,0.5)" />
              )
            ) : (
              <Plus size={7} strokeWidth={4} color="rgba(0,0,0,0.5)" />
            ))}
        </button>
      </div>
    );
  };

  const dockItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "skills", icon: Code, label: "Skills" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "projects", icon: FolderKanban, label: "Projects" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  const quickLinks = [
    { label: "GitHub", url: portfolioData.github, icon: Github },
    { label: "LinkedIn", url: portfolioData.linkedin, icon: Linkedin },
    { label: "Email", url: `mailto:${portfolioData.email}`, icon: Mail },
  ];

  return (
    <div className="min-h-screen">
      {/* Top Menu Bar */}
      <motion.header
        className="glass menu-bar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--top-bar-height)",
          padding: "0 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
          borderRadius: 0,
          margin: 0,
          backdropFilter: "blur(30px)",
          background: "var(--menu-bar-bg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
              color: "white",
              fontSize: "0.6rem",
              fontWeight: 700,
            }}
          >
            <img
              src="/profile.jpg"
              alt="profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <span
            className="menu-bar-name"
            style={{
              fontWeight: 600,
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
            }}
          >
            {portfolioData.name}
          </span>
        </div>
        <div
          className="menu-bar-icons"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
            }}
          >
            <Wifi size={12} />
            <Battery size={12} />
            <Clock size={12} />
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              background: "transparent",
              border: "none",
              padding: "4px 8px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              color: "var(--text-secondary)",
            }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main
        style={{
          padding:
            "calc(var(--top-bar-height) + 40px) 20px calc(var(--dock-height) + 40px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Hero Section */}
        <section
          id="home"
          style={{
            minHeight:
              "calc(100vh - var(--top-bar-height) - var(--dock-height))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "40px 16px",
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hero-avatar"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              padding: "4px", // creates gradient border effect
              background:
                "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              boxShadow: "0 12px 40px rgba(0, 122, 255, 0.35)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#111", // fallback bg
              }}
            >
              <img
                src="/profile.jpg"
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-name"
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            {portfolioData.name}
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-role"
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              marginBottom: "8px",
              minHeight: "32px",
              fontWeight: 500,
            }}
          >
            {displayedText}
            <span
              style={{
                animation: "pulse 1s infinite",
                color: "var(--accent-blue)",
              }}
            >
              |
            </span>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hero-tagline"
            style={{
              fontSize: "1rem",
              color: "var(--text-tertiary)",
              maxWidth: "500px",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}
          >
            {portfolioData.tagline}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hero-buttons"
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button className="btn-primary" onClick={handleDownloadResume}>
              <Download size={18} />
              Download Resume
            </button>
            <a 
              href={`mailto:${portfolioData.email}`}
              className="btn-secondary"
              style={{ textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${portfolioData.email}`;
              }}
            >
              <Mail size={18} />
              Email Me
            </a>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" style={{ marginBottom: "80px" }}>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="macos-window"
          >
            <div className="window-header">
              <TrafficLights />
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                }}
              >
                About Me
              </span>
            </div>
            <div style={{ padding: "24px" }}>
              <p
                style={{
                  lineHeight: "1.8",
                  marginBottom: "24px",
                  color: "var(--text-secondary)",
                }}
              >
                {portfolioData.bio}
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div className="skill-pill">
                  <MapPin size={14} />
                  {portfolioData.location}
                </div>
                <div className="skill-pill">
                  <Calendar size={14} />
                  {portfolioData.yearsOfExperience}
                </div>
                {portfolioData.openToWork && (
                  <span className="badge badge-success">
                    <Award size={12} />
                    Open to Work
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" style={{ marginBottom: "80px" }}>
          <h2 className="section-title">Skills</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            {Object.entries(portfolioData.skills).map(
              ([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="macos-window"
                >
                  <div className="window-header">
                    <TrafficLights />
                    <span
                      style={{
                        marginLeft: "12px",
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        textTransform: "capitalize",
                      }}
                    >
                      {category === "languages" && (
                        <Terminal
                          size={14}
                          style={{
                            marginRight: "6px",
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                      {category === "frameworks" && (
                        <Code
                          size={14}
                          style={{
                            marginRight: "6px",
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                      {category === "tools" && (
                        <Wrench
                          size={14}
                          style={{
                            marginRight: "6px",
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                      {category === "cloud" && (
                        <Cloud
                          size={14}
                          style={{
                            marginRight: "6px",
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                      {category}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    {skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + i * 0.05,
                        }}
                        className="skill-pill"
                        style={{ cursor: "default" }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" style={{ marginBottom: "80px" }}>
          <h2 className="section-title">Experience</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="macos-window"
              >
                <div className="window-header">
                  <TrafficLights />
                  <span
                    style={{
                      marginLeft: "12px",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {exp.company}
                  </span>
                </div>
                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "16px",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                        {exp.role}
                      </h3>
                      <p
                        style={{
                          color: "var(--text-tertiary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {exp.duration}
                      </p>
                    </div>
                  </div>
                  <ul
                    style={{
                      paddingLeft: "20px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        style={{ marginBottom: "8px", lineHeight: "1.6" }}
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" style={{ marginBottom: "80px" }}>
          <h2 className="section-title">Projects</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="macos-window"
                whileHover={{
                  y: -8,
                  boxShadow: "0 16px 48px rgba(0, 122, 255, 0.2)",
                }}
              >
                <div className="window-header">
                  <TrafficLights />
                  <span
                    style={{
                      marginLeft: "12px",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {project.name}
                  </span>
                </div>
                <div style={{ padding: "20px" }}>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "16px",
                      lineHeight: "1.6",
                    }}
                  >
                    {project.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="skill-pill"
                        style={{ fontSize: "0.75rem", padding: "4px 10px" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    {/* <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.9rem",
                      }}
                    >
                      <Github size={16} /> Code
                    </a> */}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "0.9rem",
                        }}
                      >
                        <ExternalLink size={16} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" style={{ marginBottom: "80px" }}>
          <h2 className="section-title">Education</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            {portfolioData.education.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="macos-window"
              >
                <div className="window-header">
                  <TrafficLights />
                  <span
                    style={{
                      marginLeft: "12px",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {edu.institution}
                  </span>
                </div>
                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                        {edu.degree}
                      </h3>
                      <p
                        style={{
                          color: "var(--text-tertiary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {edu.year}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" style={{ marginBottom: "80px" }}>
          <h2 className="section-title">Certifications</h2>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              gap: "16px",
              overflowX: "auto",
              paddingBottom: "16px",
              scrollbarWidth: "thin",
            }}
          >
            {portfolioData.certifications.map((cert: any, index) => (
              <motion.a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  flexShrink: 0,
                  background: "var(--bg-secondary)",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--glass-border)",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                <Award size={20} style={{ color: "var(--accent-yellow)" }} />
                <span style={{ fontWeight: 500 }}>{cert.name}</span>
                <ExternalLink
                  size={14}
                  style={{ color: "var(--text-tertiary)", marginLeft: "4px" }}
                />
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ marginBottom: "80px" }}>
          <h2 className="section-title">Contact</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            {/* Social Links */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="macos-window"
            >
              <div className="window-header">
                <TrafficLights />
                <span
                  style={{
                    marginLeft: "12px",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Connect With Me
                </span>
              </div>
              <div
                style={{
                  padding: "32px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                  flexWrap: "wrap",
                }}
              >
                {quickLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target={link.label === "Email" ? undefined : "_blank"}
                    rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                    onClick={(e) => {
                      if (link.label === "Email") {
                        e.preventDefault();
                        window.location.href = link.url;
                      }
                    }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "16px",
                        background: "var(--bg-tertiary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <link.icon size={28} />
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="macos-window"
            >
              <div className="window-header">
                <TrafficLights />
                <span
                  style={{
                    marginLeft: "12px",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  Send a Message
                </span>
              </div>
              <form
                style={{ padding: "24px", display: "grid", gap: "16px" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const body = formData.get('message');
                  window.location.href = `mailto:${portfolioData.email}?subject=Contact from ${name}&body=${body}`;
                  showToast("Opening Email Client... ✅", "success");
                }}
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid var(--glass-border)",
                    background: "var(--bg-tertiary)",
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid var(--glass-border)",
                    background: "var(--bg-tertiary)",
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  required
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid var(--glass-border)",
                    background: "var(--bg-tertiary)",
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ justifyContent: "center" }}
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Bottom Dock Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <div
          className="dock-nav"
          style={{
            pointerEvents: "auto",
            background: "rgba(28, 28, 30, 0.72)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "22px",
            padding: "8px 10px",
            display: "flex",
            gap: "4px",
            alignItems: "flex-end",
            boxShadow:
              "0 24px 64px rgba(0, 0, 0, 0.6), 0 2px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.4) inset",
            maxWidth: "90vw",
            overflowX: "auto",
            overflowY: "visible",
            scrollbarWidth: "none",
          }}
        >
          {dockItems.map((item) => (
            <DockItem
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={() =>
                item.id === "chat"
                  ? setShowChat(true)
                  : scrollToSection(item.id)
              }
            />
          ))}
        </div>
      </motion.nav>

      {/* Chat Panel */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            ref={chatPanelRef}
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="chat-panel macos-window"
            style={{
              position: "fixed",
              left: isChatMaximized ? "5vw" : `${chatPosition.x}px`,
              top: isChatMaximized ? "5vh" : `${chatPosition.y}px`,
              width: isChatMaximized ? "90vw" : `${CHAT_PANEL_WIDTH}px`,
              height: isChatMaximized ? "90vh" : `${CHAT_PANEL_HEIGHT}px`,
              maxWidth: "calc(100vw - 20px)",
              maxHeight: "calc(100vh - 20px)",
              background: "var(--bg-secondary)",
              borderRadius: "16px",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
              zIndex: 100,
              cursor:
                isDragging && !isChatMaximized
                  ? "grabbing"
                  : isChatMaximized
                    ? "default"
                    : "auto",
              transition:
                "width 0.3s cubic-bezier(0.23, 1, 0.32, 1), height 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <div className="window-header" style={{ cursor: "default" }}>
              <TrafficLights
                isChat
                isMaximized={isChatMaximized}
                onRed={closeChatPanel}
                onYellow={() => {
                  setIsDragging(false);
                  setIsChatMaximized(false);
                }}
                onGreen={toggleChatMaximize}
              />
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  flex: 1,
                }}
              >
                Ask me anything 💬
              </span>
              {/* <button
                onClick={() => setShowChat(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                }}
              >
                <X size={16} />
              </button> */}
            </div>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--glass-border)",
                background: "var(--bg-tertiary)",
              }}
            >
              <button
                onClick={() => setChatTab("chat")}
                style={{
                  flex: 1,
                  padding: "12px",
                  background:
                    chatTab === "chat" ? "var(--bg-secondary)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: chatTab === "chat" ? 600 : 400,
                  color:
                    chatTab === "chat"
                      ? "var(--accent-blue)"
                      : "var(--text-secondary)",
                  borderRadius: "8px 8px 0 0",
                  transition: "all 0.2s ease",
                }}
              >
                Chat
              </button>
              <button
                onClick={() => setChatTab("links")}
                style={{
                  flex: 1,
                  padding: "12px",
                  background:
                    chatTab === "links" ? "var(--bg-secondary)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: chatTab === "links" ? 600 : 400,
                  color:
                    chatTab === "links"
                      ? "var(--accent-blue)"
                      : "var(--text-secondary)",
                  borderRadius: "8px 8px 0 0",
                  transition: "all 0.2s ease",
                }}
              >
                Quick Links
              </button>
            </div>

            {/* Tab Content */}
            <div style={{ height: "calc(100% - 90px)" }}>
              {chatTab === "chat" ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "var(--bg-tertiary)",
                  }}
                >
                  <iframe
                    src="https://aashutosh724-gradioapp.hf.space/?__theme=dark"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: "0 0 12px 12px",
                    }}
                    title="AI Chat"
                    allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; hid; identity; magnetometer; microphone; midi; payment; usb; vr; wake-lock"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                  />
                </div>
              ) : (
                <div style={{ padding: "16px", display: "grid", gap: "12px" }}>
                  {quickLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target={link.label === "Email" ? undefined : "_blank"}
                      rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                      onClick={(e) => {
                        if (link.label === "Email") {
                          e.preventDefault();
                          window.location.href = link.url;
                        }
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        background: "var(--bg-tertiary)",
                        borderRadius: "12px",
                        textDecoration: "none",
                        color: "var(--text-primary)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <link.icon size={24} />
                      <span style={{ fontWeight: 500 }}>{link.label}</span>
                      <ChevronRight
                        size={16}
                        style={{
                          marginLeft: "auto",
                          color: "var(--text-tertiary)",
                        }}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        ref={chatToggleRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7 }}
        onClick={(e) => {
          e.stopPropagation();
          setShowChat((prev) => {
            const nextShowChat = !prev;
            if (nextShowChat) {
              setChatPosition(getDefaultChatPosition());
            } else {
              setIsChatMaximized(false);
              setIsDragging(false);
            }
            return nextShowChat;
          });
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="chat-toggle"
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0, 122, 255, 0.4)",
          zIndex: 99,
        }}
      >
        <MessageCircle size={28} color="white" />
      </motion.button>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`toast ${toast.type}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
