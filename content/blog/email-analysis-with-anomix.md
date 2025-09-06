---
title: "Analyzing a Malicious Email with Anomix"
date: 2025-09-24
category: "Email Analysis"
description: "Deep dive into phishing email analysis using Anomix, including headers, domains, threat intelligence, and full incident report."
image: "/anomix/icon.png"
---

# Analyzing a Malicious Email with Anomix

In this write-up, let’s analyze a malicious email using [Anomix](https://github.com/ethic-bakeery/anomix).  

`anomix` is an advanced **CLI-based phishing email analysis tool** that uses machine learning to automate investigation by:
- Extracting artifacts (headers, URLs, attachments).
- Comparing them with a trained model.
- Enriching them with Threat Intelligence (TI) sources.
- Generating a risk score and incident report.  

This tool makes email analysis much easier by analyzing the email, comparing it with the model, enriching IOCs with TI, and finally generating a professional report for documentation.

---

## Beginning the Analysis

We will be analyzing this [email sample](https://github.com/ethic-bakeery/Reports/blob/main/Reports/sample.eml).  

---

## Step Analyze suspicious email with anomix 
Since we are provided with the `.eml` file, let’s run it with `anomix`.

![anomix](/blog-images/anomix/anomix.png)

The tool made several findings, shown in the following breakdown:

### Risk Score Breakdown

| Risk Factor            | Score | Description                                |
|------------------------|-------|--------------------------------------------|
| Authentication Failure | 30    | SPF/DKIM/DMARC authentication failures     |
| Known Phishing Domain  | 40    | Domains known for phishing                 |
| Malicious URL          | 40    | Malicious URLs detected                    |
| Header Inconsistencies | 30    | Header inconsistencies found               |
| Domain Mismatch        | 25    | Domain mismatches between sender and links |
| Unusual Send Time      | 10    | Email sent at unusual hours                |
| Base64 Content         | 15    | Base64 encoded content found               |
| Tracking Pixel         | 5     | Tracking pixels found                      |
| **Total Score**        | **100** | **High Risk**                            |

---

### Red Flags Detected

| # | Type           | Description                                                                                  |
|---|----------------|----------------------------------------------------------------------------------------------|
| 1 | Authentication | DKIM authentication failed                                                                   |
| 2 | Authentication | DMARC authentication failed                                                                  |
| 3 | Behavioral     | Email sent outside business hours: 2:00                                                      |
| 4 | Content        | Base64 encoded content found                                                                 |
| 5 | Content        | Tracking pixels detected                                                                     |
| 6 | Threat Intel   | Malicious domain detected: **sefnet.net** (1 detection)                                      |
| 7 | Threat Intel   | Malicious URL detected: `http://sefnet.net/track/o7436EVFfO5968877utQY8065Q...` (4 detections) |

From this, we can already see the email is malicious. Let’s go through the report in more detail.

---

## Step 2: Email HTML Review

When we view the HTML:  
![email view](/blog-images/anomix/all.PNG)  

And look closer:  
![email view](/blog-images/anomix/email.PNG)  

We see the email **uses a tracking pixel** linked to a malicious domain.  

It also **claims to be from Microsoft**, but it is not.

---

## Step 3: Analyzing the Headers

The full report can be found here: [Microsoft unusual login report](https://github.com/ethic-bakeery/Reports/blob/main/Reports/microsoft-unsual-login.json).  

### Headers
![email header](/blog-images/anomix/header1.PNG)  

From the above, we can see:
- The email says it’s `from` Microsoft.  
- But the **reply-to domain is different**, proving a domain mismatch.  
- This usually happens when an attacker spoofs the domain.  

📌 **Note:** The "From" field can be spoofed, but the **Reply-To field** is much harder to fake. Always check it carefully.

Also, the **subject** says *“Microsoft account unusual sign in activity”*, which is impersonation of Microsoft to scare the user.

Other details like IPs and routing are included in the `anomix` generated report.

---

## Step 4: Authentication Results
![authentication](/blog-images/anomix/authentication.PNG)  

All authentication checks **failed** (SPF, DKIM, DMARC).  

---

## Step 5: Date & Time Check
![date](/blog-images/anomix/date.PNG)  

The report shows the email was sent at an unusual time (2:00 AM), supporting the suspicion.

---

## Step 6: Threat Intelligence
![virus total](/blog-images/anomix/vt.PNG)  

The URL found in the email is confirmed **malicious on VirusTotal**.  

---

## Key Takeaways

- `anomix` extracts every detail automatically and helps analysts quickly spot malicious behavior.  
- The more the model is trained, the better it becomes at detecting phishing attempts.  

---

## Escalation Report (Case File)

**Escalation Report: Suspected Phishing Email**  
- **Date:** November 3, 2022  
- **Analyst:** Junior SOC Analyst  
- **Subject:** Suspicious email with malicious domain and spoofed Microsoft branding  

### 1. Summary
A high-confidence phishing email was detected, pretending to be a Microsoft security notification. It used a malicious tracking domain (`sefnet.net`) confirmed by VirusTotal.

### 2. Key Indicators of Compromise (IOCs)

| Type            | Value                                | Notes                                   |
|-----------------|--------------------------------------|-----------------------------------------|
| Sending Domain  | nisihfjoz.co.uk                      | SPF: None, DKIM: Fail, DMARC: Fail      |
| Reply-To        | media-protection@usual-assist.com    | Suspicious, non-Microsoft domain        |
| Malicious Domain| sefnet.net                           | Found in HTML <img>, flagged by VT      |
| Source IP       | 103.167.154.120                      | Originating mail server                 |
| Subject         | Microsoft account unusual sign-in... | Impersonation of Microsoft              |

### 3. Analysis
- **Spoofing:** All email security checks failed (SPF, DKIM, DMARC).  
- **Social Engineering:** Email mimicked Microsoft branding to create urgency.  
- **Malicious Component:** Hidden 1x1 pixel image linked to malicious domain.  
- **Behavioral:** Sent outside normal business hours.  

### 4. Recommendations
1. Block the IOCs (`nisihfjoz.co.uk`, `usual-assist.com`, `sefnet.net`, `103.167.154.120`).  
2. Warn users about the phishing campaign.  
3. Investigate if any internal hosts communicated with these domains.  
4. Escalate to Threat Intel / Incident Response teams for further review.  

---
