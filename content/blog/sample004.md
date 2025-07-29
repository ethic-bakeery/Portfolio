---
title: "Phishing Email Analysis – Livelo/Bradesco Spoof"
date: 2025-07-30
category: "Malicious Email Analysis"
description: "Detailed phishing email investigation revealing credential theft attempt via Base64-encoded HTML and malicious Google Cloud Run domain."
image: "/images/email/icon.jpeg"
---


> ⚠️ **WARNING**  
> Do **NOT** access or visit any of the URLs or domains listed in this report, especially:  
> `https://function-9-zka7zvb73a-rj.a.run.app`  
> These URLs are potentially malicious and may lead to phishing or malware.

---

## ✅ Step-by-Step Manual Email Analysis (Following [Checklist](http://website.com/checklist))

---

## 🔍 Initial Triage

We first determine whether the received email is malicious or a false positive.

- **Subject Line (translated):**  
  *"Your Livelo points will expire soon - PROTOCOL: 57949307."*

- **Sender:**  
  `Bradesco <sac@bradesco.com.br>`

- **Initial Checks:**
  - Email seems legitimate at first glance.
  - Looked up `sac@bradesco.com.br` on VirusTotal: **Not flagged**.
  - However, **authentication checks failed**:

    ```text
    Authentication-Results:
      spf=temperror (sender IP is 147.182.193.196)
      dkim=none (message not signed)
      dmarc=fail action=none
      compauth=fail reason=001
    ```

  - Sender IP: `147.182.193.196` → flagged **malicious** on [VirusTotal](https://www.virustotal.com/).
    ![Criminal IP](/blog-images/images/email/criminalIP.PNG)

- Found **Base64 encoded HTML**, decoded using CyberChef:
  ![Decoded](/blog-images/images/email/decode.PNG)
  Result: a **phishing link**, confirmed **malicious** on VirusTotal.
  ![Malicious URL](/blog-images/images/email/maliciousURL.PNG)

---

## ✉️ Email Header Analysis

Key findings from the headers:

- **From:** `Bradesco <sac@bradesco.com.br>`  
  Can be spoofed – not reliable.

- **Return-Path:** `root@ubuntu-s-1vcpu-512mb-10gb-sfo3-01`  
  Suggests email was sent from a Linux server (likely compromised).

- **Authentication Failures:**
    - SPF: temperror
    - DKIM: none
    - DMARC: fail
    - CompAuth: fail

- **Tools Used:** [MxToolbox Header Analyzer](https://mxtoolbox.com/Public/Tools/EmailHeaders.aspx?huid=9361be5a-e34a-4859-93be-8a726c9d0dcf)

  ![Headers](/blog-images/images/email/header.PNG)  
  ![Failed Authentication](/blog-images/images/email/failed.PNG)

---

## 📎 Attachment Analysis

- No traditional file attachments.
- The phishing content is embedded in **Base64-encoded HTML**.
- Decoded HTML contains this **malicious URL**:  
  `https://function-9-zka7zvb73a-rj.a.run.app`

  ![Decoded HTML](/blog-images/images/email/decode.PNG)

### Phishing Breakdown:
```
| Element         | Description |
|----------------|-------------|
| **Sender Name** | Appears to impersonate Livelo or Bradesco |
| **Target** | `rodrigo-f-p@hotmail.com` (personal email) |
| **Claim** | Livelo points are expiring |
| **Urgency** | "Points expire soon" |
| **Incentive** | Promises double points, miles, discounts |
| **Action** | "REDEEM NOW" – links to phishing page |
| **Result** | Likely credential theft |
```
### 🚩 Red Flags:

- Unusual sending server (`a.run.app`)
- Personal target, not mass mailing
- Urgency and emotional manipulation
- Encoded hidden HTML
- Request to click and log in
- Language inconsistencies

---

## 🔗 URL and Link Analysis

- **Malicious Link:**  
  `https://function-9-zka7zvb73a-rj.a.run.app`

- VirusTotal scan: **Flagged as malicious**
  ![VirusTotal](/blog-images/images/email/virustotal.PNG)

- URLScan.io result:
  - Verdict: *Not currently malicious* (returns 404)
  - Might be taken down or inactive temporarily
  ![URLScan](/blog-images/images/email/urlscan.PNG)

---

## 📝 Email Body Analysis

- **Language:** Portuguese (with grammar issues)
- **Impersonation:** Livelo and Banco Bradesco
- **Link:** Hidden inside HTML, masked as a legitimate rewards redemption button
- **Technique:** Uses urgency and reward incentives to bait the user

---

## 🛠 Infrastructure Analysis

- **Domain:** `function-9-zka7zvb73a-rj.a.run.app`
- **Host:** Google Cloud Run
  - Subdomains are dynamic and automatically issued
  - No WHOIS data (controlled by Google)
  - Likely deployed via serverless container

- **Abuse Reporting:**  
  If confirmed phishing, report to Google:  
  🔗 [Google Abuse Form](https://support.google.com/legal/troubleshooter/1114905)

### Suggested Evidence for Reporting:

- Screenshots of the phishing email
- URL of phishing page
- Timestamps of access
- Decoded HTML source

---

## 🧾 Conclusion

This email is a **confirmed phishing attempt** based on:

- Failed SPF, DKIM, and DMARC
- Malicious IP and domain flagged on VirusTotal
- Spoofed sender and hidden HTML
- Behavioral tactics (urgency, rewards, impersonation)
- Malicious link hosted on dynamic Google Cloud infrastructure

### ✅ Classification: **High Risk – Credential Phishing**

---

> ⚠️ **Reminder**  
> Do **NOT** click or visit any of the malicious URLs shown in this report.
