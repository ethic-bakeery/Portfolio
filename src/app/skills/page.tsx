"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  SiPython,
  SiCplusplus,
  SiDocker,
  SiAmazon,
  SiPostgresql,
  SiGit,
  SiMysql,
  SiPostman,
  SiHtml5,
  SiJavascript,
  SiGithub,
  SiLinux,
  SiBootstrap,
  SiSpringboot,
} from 'react-icons/si';

import Navbar from "@/components/Navbar";
import { Database, Shield, Cpu, Network, Terminal, Bug, HardDrive, Code } from "lucide-react";

const skills = {
  "Programming Languages": {
    description: "Core programming languages I work with",
    icon: Code,
    items: [
      { name: "Python", icon: SiPython, level: 90 },
      { name: "C", icon: SiCplusplus, level: 85 },
      { name: "C++", icon: SiCplusplus, level: 80 },
      { name: "Bash", icon: Terminal, level: 85 },
      { name: "PowerShell", icon: Terminal, level: 80 },
      { name: "JavaScript", icon: SiJavascript, level: 75 },
    ],
  },
  "Cybersecurity Tools": {
    description: "Specialized tools for security operations",
    icon: Shield,
    items: [
      { name: "Burp Suite", icon: Bug, level: 85 },
      { name: "Metasploit", icon: Bug, level: 80 },
      { name: "Nmap", icon: Network, level: 90 },
      { name: "Wireshark", icon: Network, level: 85 },
      { name: "Splunk", icon: Database, level: 80 },
      { name: "ELK Stack", icon: Database, level: 75 },
      { name: "Wazuh", icon: Database, level: 70 },
    ],
  },
  "Malware Analysis": {
    description: "Tools for analyzing and reverse engineering malware",
    icon: Bug,
    items: [
      { name: "IDA Pro", icon: Cpu, level: 80 },
      { name: "Ghidra", icon: Cpu, level: 85 },
      { name: "Volatility", icon: HardDrive, level: 75 },
      { name: "YARA", icon: Shield, level: 85 },
      { name: "PEStudio", icon: Cpu, level: 70 },
      { name: "CyberChef", icon: Terminal, level: 75 },
    ],
  },
  "Forensics & IR": {
    description: "Digital forensics and incident response tools",
    icon: HardDrive,
    items: [
      { name: "Autopsy", icon: HardDrive, level: 80 },
      { name: "FTK Imager", icon: HardDrive, level: 75 },
      { name: "Velociraptor", icon: Shield, level: 70 },
      { name: "KAPE", icon: HardDrive, level: 75 },
      { name: "TheHive", icon: Database, level: 70 },
      { name: "MISP", icon: Database, level: 75 },
    ],
  },
  "System & Network": {
    description: "System administration and networking skills",
    icon: Network,
    items: [
      { name: "Linux", icon: SiLinux, level: 90 },
      { name: "Windows Security", icon: Shield, level: 85 },
      { name: "Docker", icon: SiDocker, level: 80 },
      { name: "Sysmon", icon: Network, level: 80 },
      { name: "OSQuery", icon: Terminal, level: 75 },
    ],
  },
  "Frameworks & Standards": {
    description: "Security frameworks and compliance standards",
    icon: Shield,
    items: [
      { name: "MITRE ATT&CK", icon: Shield, level: 85 },
      { name: "NIST CSF", icon: Shield, level: 80 },
      { name: "CIS Benchmarks", icon: Shield, level: 85 },
      { name: "OWASP Top 10", icon: Shield, level: 90 },
      { name: "ISO 27001", icon: Shield, level: 75 },
      { name: "PCI DSS", icon: Shield, level: 70 },
    ],
  },
};

export default function SkillsPage() {
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

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-blue-500";
    return "bg-yellow-500";
  };

  const getSkillLevelLabel = (level: number) => {
    if (level >= 80) return "Advanced";
    if (level >= 60) return "Intermediate";
    return "Basic";
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
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Technical Proficiency
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            My Skills & Expertise
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
          >
            Here's a comprehensive overview of my technical skills across programming,
            cybersecurity tools, frameworks, and methodologies.
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, { description, icon: CategoryIcon, items }]) => (
              <motion.div
                key={category}
                variants={item}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-4 flex items-center">
                  <div className="mr-3 rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                    <CategoryIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category}
                  </h2>
                </div>
                <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>

                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center">
                          {skill.icon && (
                            <skill.icon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          )}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {getSkillLevelLabel(skill.level)}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-2 rounded-full ${getSkillLevelColor(skill.level)}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={item} className="mt-12 text-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}