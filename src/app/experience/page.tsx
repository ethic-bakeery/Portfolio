"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/Navbar";

const experiences = [
  {
    title: "Bug Bounty Hunter",
    company: "YesWeHack & Private Programs",
    period: "May 2023 – Present",
    description: [
      "I hunt for security bugs in real-world applications through platforms like YesWeHack. It's like being a digital detective - I look for vulnerabilities before the bad guys can exploit them.",
      "So far, I've uncovered and reported 15+ security flaws ranging from simple XSS issues to more serious problems like broken access controls.",
      "What really excites me is digging into application logic - finding those edge cases and race conditions that most automated scanners would miss.",
      "I take pride in writing clear, actionable reports that help developers understand and fix the issues."
    ],
    tech: [
      "IDOR/BOLA vulnerabilities",
      "Broken Access Control",
      "Remote Code Execution",
      "Business Logic Flaws",
      "XSS & CSRF"
    ]
  },
  {
    title: "CTF Player & Security Challenge Enthusiast",
    company: "TryHackMe, Hack The Box, PicoCTF",
    period: "Ongoing",
    description: [
      "I'm addicted to Capture The Flag challenges - they're like the gym for my cybersecurity skills.",
      "With 100+ challenges under my belt, I've tackled everything from web exploitation to reverse engineering.",
      "There's something magical about analyzing a PCAP file and uncovering hidden secrets.",
      "When I solve interesting challenges, I often write walkthroughs to share what I learned."
    ],
    tech: [
      "Wireshark",
      "Volatility",
      "CyberChef",
      "Ghidra",
      "Burp Suite"
    ]
  },
  {
    title: "Threat Hunter & Malware Analyst",
    company: "Freelance & Personal Labs",
    period: "Jan 2024 – Present",
    description: [
      "After completing SOC analyst training, I've been honing my threat hunting skills.",
      "I've developed custom YARA and Sigma rules that help identify malicious patterns.",
      "My malware analysis workflow has helped me dissect suspicious files more efficiently."
    ],
    tech: [
      "Splunk/ELK Stack",
      "YARA/Sigma rules",
      "Wireshark",
      "Volatility"
    ]
  },
  {
    title: "Developer & Automation Wizard",
    company: "Personal Projects",
    period: "Mar 2023 – Present",
    description: [
      "I build tools that make security work easier.",
      "Automating phishing report generation saved hours of manual work.",
      "My network monitoring tool evolved into a security tool with reputation checks."
    ],
    tech: [
      "Python",
      "Bash/PowerShell",
      "Django/Node.js",
      "React"
    ]
  },
  {
    title: "Security Auditor",
    company: "Independent Projects",
    period: "Dec 2023 – Present",
    description: [
      "I created audit scripts that check systems against CIS benchmarks.",
      "Generating reports in multiple formats means different teams can use the data how they need it.",
      "The time savings have been significant - what used to take hours now takes minutes."
    ],
    tech: [
      "Bash/PowerShell",
      "CIS Benchmarks",
      "Auditd/Sysmon"
    ]
  }
];

export default function ExperiencePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 py-24">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mx-auto max-w-4xl"
        >
          <motion.div variants={item} className="mb-12">
            <div className="inline-block rounded-lg bg-editor-background px-3 py-1 font-mono text-sm text-editor-text">
              <span className="text-[#569CD6]">const</span>{" "}
              <span className="text-[#4EC9B0]">experience</span>{" "}
              <span className="text-[#D4D4D4]">=</span>{" "}
              <span className="text-[#CE9178]">"Professional Journey"</span>
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-8 font-mono text-4xl font-bold tracking-tight"
          >
            Work Experience
          </motion.h1>

          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-px bg-border md:left-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`mb-12 md:flex ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="md:w-1/2">
                  <div
                    className={`relative rounded-lg border border-border bg-card p-6 ${index % 2 === 0 ? "md:ml-8" : "md:mr-8"}`}
                  >
                    <div
                      className={`absolute top-6 h-4 w-4 rounded-full border-4 border-background bg-primary ${index % 2 === 0
                        ? "left-0 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-1/2"
                        : "left-0 -translate-x-1/2"
                        }`}
                    />

                    <h3 className="mb-1 text-lg font-semibold">{exp.title}</h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {exp.company} • {exp.period}
                    </p>
                    <ul className="mb-4 list-disc space-y-1 pl-4 text-sm">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={item} className="mt-12 text-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}