"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import {
  CodeBracketIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";

const projects = [
  {
    title: "NURA Connect",
    description:
      " NURA Connect is a civic tech platform that empowers Nigerian youth by facilitating nationwide collaboration, civic education, and justice-driven action. It offers member registration, event management, secure messaging, and real-time updates to drive change across the nation.",
    image: "/projects/nura.PNG",
    technologies: [
      "Django Framework",
      "JavaScript",
      "Tailwind CSS",
      "Socket programming",
    ],
    sourceCode: "https://github.com/ethic-bakeery/NURAwebapp",
  },
  {
    title: "SOCer",
    description:
      "The SOCer is a Python-based SOAR-like automation solution designed for Security Operations Centers (SOC). It automates the enrichment of Indicators of Compromise (IOCs) by querying multiple Threat Intelligence (TI) sources, consolidating results, and applying risk scoring to accelerate investigations and reduce alert fatigue.",
    image: "/projects/icon.PNG",
    technologies: [
      "Python3",
    ],
    sourceCode: "https://github.com/ethic-bakeery/SOCer-Toolkit/",
  },
  {
    title: "SecureAudit",
    description:
      "SecureAudit is a comprehensive Linux and Windows audit script designed for Ubuntu 20.04 LTS, based on the CIS Benchmark, to assess security configurations and compliance. It generates detailed audit reports in various formats and offers customizable checks to ensure system integrity and hardening",
    image: "/projects/linux.jpeg",
    technologies: [
      "Bash",
      "Python",
      "Powershell"
    ],
    sourceCode: "https://github.com/ethic-bakeery/linux-audit-script",

  },
  {
    title: "Anomix",
    description:
      "Anomix is a CLI-based phishing email analysis tool that extracts and analyzes email components like headers, content, URLs, and attachments. It integrates threat intelligence sources and uses a risk-scoring system to assess email threats, generating reports in JSON, HTML, and PDF formats. The tool also supports machine learning to train custom phishing detection models.",
    image: "/projects/srm-red.PNG",
    technologies: [
      "Machine Learning",
      "Python",
      "HTML/Jinja2",
      "Threat Intel APIs"
    ],
    sourceCode: "https://github.com/ethic-bakeery/anomix",

  },
  {
    title: "PassSafe",
    description:
      "PassSafe is a straightforward Java password manager that securely stores and encrypts your passwords with a master key. It offers a simple, yet effective solution to safeguard your credentials.",
    image: "/projects/pass.jpg",
    technologies: [
      "Java"
    ],
    sourceCode: "https://github.com/ethic-bakeery/GUI-Password-manager",
  }
];

export default function ProjectsPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={item} className="mb-12">
            <div className="inline-block rounded-lg bg-editor-background px-3 py-1 font-mono text-sm text-editor-text">
              <span className="text-[#569CD6]">const</span>{" "}
              <span className="text-[#4EC9B0]">Projects</span>{" "}
              <span className="text-[#D4D4D4]">= () =&gt;</span>{" "}
              <span className="text-[#D4D4D4]">{ }</span>
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-8 font-mono text-4xl font-bold tracking-tight"
          >
            Featured Projects
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-12 max-w-2xl text-lg text-muted-foreground"
          >
            Here are some of my recent projects that showcase my skills in
            full-stack development, UI/UX design, and problem-solving.
          </motion.p>

          <motion.div
            variants={item}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href={project.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 inline-flex items-center justify-center space-x-2 rounded-md bg-primary/5 border border-border/50 px-4 py-2.5 text-sm font-medium text-foreground/80 transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <CodeBracketIcon className="h-4 w-4 text-primary/70 group-hover:text-primary-foreground" />
                      <span>Source Code</span>
                    </a>
                    <a

                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 inline-flex items-center justify-center space-x-2 rounded-md bg-primary/5 border border-border/50 px-4 py-2.5 text-sm font-medium text-foreground/80 transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-12 text-center">
            <a
              href="https://github.com/ethic-bakeery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <span>View more on github</span>
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
