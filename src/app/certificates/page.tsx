"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const certificates = [
  {
    title: "SOC Level 1",
    provider: "TryHackMe",
    providerUrl: "https://tryhackme.com",
    url: "https://tryhackme.com/path/outline/soclevel1",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-3KMYIQRGCV.pdf",
    description: "The SOC Level 1 Certification trains individuals for Junior Security Analyst roles, covering cyber defense, threat intelligence, network and endpoint security, SIEM, and digital forensics. It focuses on practical skills for monitoring, investigating, and escalating security incidents. Capstone challenges offer real-world SOC experience.",
    image: "/soc1.PNG"
  },
  {
    title: "SOC Level 2",
    provider: "TryHackMe",
    providerUrl: "https://tryhackme.com",
    url: "https://tryhackme.com/path/outline/soclevel2",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-IRVMD2NRZC.pdf",
    description: "The SOC Level 2 Certification equips you with advanced skills in log analysis, SIEM tools, detection engineering, threat hunting, and malware analysis. It provides hands-on labs and real-world scenarios to enhance your capabilities in SOC operations. This path prepares you for higher-level roles in incident response and Blue Team tasks.",
    image: "/soc2.PNG"
  },
  {
    title: "Jr Penetration Tester",
    provider: "TryHackMe",
    providerUrl: "https://tryhackme.com",
    url: "https://tryhackme.com/path/outline/jrpenetrationtester",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-XJTBRUXPRP.pdf",
    description: "The Jr Penetration Tester Certification equips you with the skills to perform web application and infrastructure security assessments. It covers pentesting methodologies, tools like Burp Suite and Metasploit, and techniques for exploitation and privilege escalation. This hands-on path prepares you for real-world penetration testing challenges.",
    image: "/jr.PNG"
  },
  {
    title: "Cyber Defense",
    provider: "TryHackMe",
    providerUrl: "https://tryhackme.com",
    url: "https://tryhackme.com/path/outline/blueteam",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-HIMHMKU3WE.pdf",
    description: "The Cyber Defense Certification covers key areas like threat management, security monitoring, incident response, and malware analysis. It provides hands-on experience with tools such as Wireshark, Sysmon, and Splunk. This path builds the foundation for a career in defensive security and Blue Team specialization.",
    image: "/defense.PNG"
  },
  {
    title: "Cyber Security 101",
    provider: "TryHackMe",
    providerUrl: "https://tryhackme.com",
    url: "https://tryhackme.com/path/outline/cybersecurity101",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-UPRFNSQ9B9.pdf",
    description: "The Cyber Security 101 Certification provides foundational knowledge in both offensive and defensive security. It covers computer networking, cryptography, Linux, Windows, and Active Directory basics, along with tools like Metasploit and Burp Suite. This path prepares you for a career in cyber security, focusing on essential skills for both security attack and defense.",
    image: "/101.PNG"
  },
  {
    title: "Red Teaming",
    provider: "TryHackMe",
    providerUrl: "https://tryhackme.com",
    url: "https://tryhackme.com/path/outline/redteaming",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-TEAPGCIORL.pdf",
    description: "The Red Teaming Certification equips you with advanced skills to execute adversary attack emulations and challenge security defenses. You’ll learn techniques for initial access, privilege escalation, exploitation of Active Directory, and evading security measures. This path prepares you to perform complex Red Team engagements and pursue opportunities in offensive security.",
    image: "/red.PNG"
  },
  {
    title: "Network Defense",
    provider: "Cisco Networking Academy",
    providerUrl: "https://www.netacad.com",
    url: "https://www.netacad.com/courses/network-defense?courseLang=en-US",
    verifyUrl: "https://www.credly.com/badges/bc0820d2-9213-48dc-95ab-c9e5870c886c",
    description: "The Network Defense course teaches you how to monitor, protect, and evaluate security alerts within your network. You'll explore tools and techniques like firewalls, access control, cryptography, and cloud security to defend against attacks. The course emphasizes a defense-in-depth strategy, helping you react swiftly to network threats.",
    image: "/networkd.PNG"
  },
  {
    title: "Endpoint Security",
    provider: "Cisco Networking Academy",
    providerUrl: "https://www.netacad.com",
    url: "https://www.netacad.com/courses/endpoint-security?courseLang=en-US",
    verifyUrl: "https://www.credly.com/badges/f0f0e684-71e7-4b7e-92a0-e37f98c54ab8",
    description: "The Endpoint Security course teaches the essentials of protecting networks, operating systems, and endpoints. You'll learn to assess vulnerabilities, implement security measures, and maintain data integrity across devices. The course covers network security, operating system protection, and endpoint defense, making it ideal for aspiring Junior Cybersecurity Analysts.",
    image: "/endpoint.PNG"
  },
  {
    title: "AWS Academy Machine Learning",
    provider: "Amazon Web Services",
    providerUrl: "https://aws.amazon.com",
    url: "https://aws.amazon.com/training/awsacademy/",
    verifyUrl: "https://www.credly.com/badges/9541fbd0-099a-4d28-947c-adb9705abc9f",
    description: "Covers machine learning fundamentals with a focus on AWS ML services. Includes data preprocessing techniques and model training using cloud-based tools and infrastructure.",
    image: "/aws.PNG"
  },
  {
    title: "CS406: Information Security",
    provider: "Saylor Academy",
    providerUrl: "https://learn.saylor.org",
    url: "https://learn.saylor.org/course/view.php?id=453",
    verifyUrl: "",
    description: "The CS406: Information Security course teaches principles of information security, including protecting confidentiality, integrity, and availability. It covers threats, attacks, cryptographic models, access control, and network security. The course concludes with privacy laws and their implications, preparing you for a career in safeguarding information systems.",
    image: "/cs.jpg"
  },
  {
    title: "Computer Networking",
    provider: "Scaler Academy",
    providerUrl: "https://www.scaler.com",
    url: "https://www.scaler.com/topics/course/free-computer-networks-course/",
    verifyUrl: "",
    description: "The Master Computer Networking course covers the fundamentals of networking, including network design, troubleshooting, security, and protocols. You will learn to configure networks, address issues, and protect against vulnerabilities. The course also explores various protocols like TCP/IP, DNS, and DHCP, providing a solid foundation in network communication.",
    image: "/cert-placeholder.jpg"
  },
  {
    title: "Web Fundamentals",
    provider: "TryHackMe",
    providerUrl: "https://tryhackme.com",
    url: "https://tryhackme.com/path/outline/web/",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-1WBWYW7QFM.pdf",
    description: "The Web Fundamentals learning path teaches you how to attack web applications, starting with the basics of how they work. You'll learn industry-standard tools, exploit common vulnerabilities like SQL injection and XSS, and use Burp Suite for web security assessments. After completing this path, you'll be able to apply your skills in professional security assessments and interviews.",
    image: "/web.PNG"
  }
];

export default function CertificatesPage() {
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
    <main className="relative min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 py-24">
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
              <span className="text-[#4EC9B0]">certifications</span>{" "}
              <span className="text-[#D4D4D4]">=</span>{" "}
              <span className="text-[#CE9178]">"Professional Achievements"</span>
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-8 font-mono text-4xl font-bold tracking-tight"
          >
            Certifications & Training
          </motion.h1>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                variants={item}
                className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{cert.title}</h3>
                  
                  <div className="mb-4 flex items-center text-sm text-muted-foreground">
                    <span>Provider: </span>
                    {cert.providerUrl ? (
                      <a 
                        href={cert.providerUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-1 text-primary hover:underline"
                      >
                        {cert.provider}
                      </a>
                    ) : (
                      <span className="ml-1">{cert.provider}</span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-foreground/80">
                      {cert.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View Course
                      </a>
                    )}
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Verify Badge
                      </a>
                    )}
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
