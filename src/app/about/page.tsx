"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import {
  CodeBracketIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
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
          className="mx-auto max-w-4xl"
        >
          <motion.div variants={item} className="mb-12">
            <div className="inline-block rounded-lg bg-editor-background px-3 py-1 font-mono text-sm text-editor-text">
              <span className="text-[#569CD6]">class</span>{" "}
              <span className="text-[#4EC9B0]">About</span>{" "}
              <span className="text-[#D4D4D4]">{ }</span>
            </div>
          </motion.div>

          <div className="mb-12 flex flex-col items-center md:flex-row md:items-start md:space-x-8">
            <motion.div variants={item} className="mb-8 md:mb-0 md:w-1/3">
              <div className="relative h-64 w-64 overflow-hidden rounded-full">
                <Image
                  src="/profile.jpg"
                  alt="Abubakar Usman"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            <div className="md:w-2/3">
              <motion.h1
                variants={item}
                className="mb-8 font-mono text-4xl font-bold tracking-tight"
              >
                About Me
              </motion.h1>

              <motion.div
                variants={item}
                className="prose prose-lg dark:prose-invert"
              >
                <p>
                  I'm Abubakar Usman, a cybersecurity enthusiast and blue team specialist passionate about protecting digital environments. I specialize in threat hunting, incident response, malware analysis, and digital forensics, with hands-on experience using industry-grade tools and frameworks.
                </p>
                <p>
                  I love breaking down complex threats, automating security tasks, and building security-focused software that empowers teams to act faster and smarter. Whether analyzing logs, developing detection rules, or building secure platforms, I take a proactive, research-driven approach.
                </p>
                <p>
                  I’m currently pursuing my B.Tech in Computer Science and Engineering with a specialization in cybersecurity at SRM Institute of Science and Technology. I also hold a diploma in IT and have earned several industry certifications in SOC operations, red teaming, and defensive analysis.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={item}
            className="my-8 grid gap-6 md:grid-cols-3"
          >
            <div className="rounded-lg border border-border bg-card p-6">
              <CodeBracketIcon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Technical Expertise</h3>
              <p className="text-sm text-muted-foreground">
                Blue Team Ops, SIEM, Threat Hunting, Malware Analysis, Digital Forensics, and Secure Web App Development
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <AcademicCapIcon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Education</h3>
              <p className="text-sm text-muted-foreground">
                B.Tech in CSE with Cybersecurity specialization – SRM Institute (2026)<br />
                Diploma in Information Technology – Modibbo Adama University
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <BriefcaseIcon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Experience</h3>
              <p className="text-sm text-muted-foreground">
                SOC Analyst, Threat Hunter, Automation Developer, and Bug Bounty Hunter with real-world vulnerability disclosures
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="prose prose-lg dark:prose-invert"
          >
            <h2 className="mb-4 text-2xl font-bold">What I Do</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Hunt for threats and anomalies using MITRE ATT&CK, Sigma, and YARA</li>
              <li>Analyze memory dumps and disk images to trace malware behavior</li>
              <li>Automate incident triage, phishing analysis, and reporting workflows</li>
              <li>Write detection rules and scripts to improve SOC response time</li>
              <li>Contribute to bug bounty programs by identifying vulnerabilities</li>
              <li>Build security tools like audit scripts, network monitors, and analyzers</li>
            </ul>

            <h2 className="mb-4 mt-8 text-2xl font-bold">Core Values</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Threat-driven defense and proactive hunting</li>
              <li>Clean code, repeatable workflows, and well-documented solutions</li>
              <li>Knowledge sharing through blogs, writeups, and open source</li>
              <li>Resilience, curiosity, and always learning something new</li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="mt-12">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Let's Work Together
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}