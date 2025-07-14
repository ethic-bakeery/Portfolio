---
title: "Forensic Analysis of an Abandoned Hacker's Laptop"
date: 2025-04-11
description: "In this forensic walkthrough, we dive into a real-world scenario involving an abandoned Dell CPi notebook suspected of being used for wireless hacking activities. Using a multi-part disk image, we uncover traces of hacking tools, analyze usage artifacts, and attempt to link the digital evidence to the alleged hacker known as 'Mr. Evil.' Join me as we explore how digital forensics helps trace the footsteps of a cyber intruder and piece together their digital trail"
image: /caseb4/icon.png
category: "Digital Forensics"
---

## Scenario

On 09/20/04 , a Dell CPi notebook computer, serial # VLQLW, was found abandoned along with a wireless PCMCIA card and an external homemade 802.11b antennae. It is suspected that this computer was used for hacking purposes, although cannot be tied to a hacking suspect, G=r=e=g S=c=h=a=r=d=t. (The equal signs are just to prevent web crawlers from indexing this name; there are no equal signs in the image files.)  Schardt also goes by the online nickname of “Mr. Evil” and some of his associates have said that he would park his vehicle within range of Wireless Access Points (like Starbucks and other T-Mobile Hotspots) where he would then intercept internet traffic, attempting to get credit card numbers, usernames & passwords.

## Resources (Images)

1. [1st part](https://cfreds-archive.nist.gov/images/4Dell%20Latitude%20CPi.E01)  
2. [2nd part](https://cfreds-archive.nist.gov/images/4Dell%20Latitude%20CPi.E02)

Download the images and ensure they are not corrupted. Use a stable internet connection for best results.  
Initially, I attempted to automate the download using PowerShell, but the files were getting corrupted.  
Therefore, I used `wget` on my Linux machine to download the files and then transferred them to my Windows machine, where I have **Autopsy** installed.

```plaintext
wget https://cfreds-archive.nist.gov/images/4Dell%20Latitude%20CPi.E01
wget https://cfreds-archive.nist.gov/images/4Dell%20Latitude%20CPi.E02
```
## Creating the Case in Autopsy

Before we begin answering the questions, we need to create a case in **Autopsy**. Since the images are already provided, there is no need for acquisition.

> ✨ **Make sure you have Autopsy installed on your system.**

Start Autopsy. Once it opens, navigate to the `Case` tab and create a new case. Follow the steps below:

### Step 1  
Click on **New Case**  
![Create](/blog-images/NIST/001.PNG)

---

### Step 2  
Give your case a name. In my case, I named it `NistHackingCase`.  
![Create](/blog-images/NIST/002.PNG)

---

### Step 3  
Provide some additional information.  
> ℹ️ These details are optional but important, especially in real-world investigations where documentation and case tracking are essential.  
![Create](/blog-images/NIST/003.PNG)

---

### Step 4  
Click **Next**, then select the data source type — in this case, choose **Disk Image or VM File**.  
![Create](/blog-images/NIST/004.PNG)

---

### Step 5  
Browse to the location of the disk image you downloaded.  
![Create](/blog-images/NIST/005.PNG)  
![Create](/blog-images/NIST/006.PNG)

---

### Step 6  
For practice purposes, select all the ingest modules (i.e., check all the boxes). This will ensure that Autopsy returns data from all relevant sources.  
![Create](/blog-images/blog-images/NIST/007.PNG)

---

### Step 7  
Wait for Autopsy to finish processing the data. This may take a few seconds to a minute, depending on your system.  
![Create](/blog-images/NIST/008.PNG)

---

### Dashboard View  
Once the data is loaded, you will see the Autopsy dashboard like this:  
![Create](/blog-images/NIST/window.PNG)

---
## Analysis and Answers

Now that we have our environment set up, let's begin answering the questions.

> 🔎 It's worth noting that **knowledge of the Windows Registry** is crucial for completing this case successfully, as many of the answers rely on parsing registry hives such as `SOFTWARE`, `SYSTEM`, and `SAM`.

---

### ❌ Q1. What is the image hash? Does the acquisition and verification hash match?

We will skip this question, as we were not involved in the acquisition process. The image was provided to us.

---

### ✅ Q2. What operating system was used on the computer?

Navigate to `Data Artifacts` > `Operating System Information`.  
From there, we can confirm that the system is running **Windows XP**.

![OS info](/blog-images/NIST/2.PNG)

---

### ✅ Q3. When was the install date?

The install date can be found in the following registry key:  
`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion`

Autopsy parses this key to extract the installation date.  
After converting the timestamp to UTC, the installation date is:

**Thursday, August 19, 2004 – 12:48:27 PM (UTC)**

![Install Date](/blog-images/NIST/3.PNG)

---

### ✅ Q4. What is the timezone setting?

We check the registry path:  
`HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Control\TimeZoneInformation`

This key contains information about the configured timezone.  
There are two control sets (`ControlSet001` and `ControlSet002`), but we use `ControlSet002` as it's marked as the LastKnownGood configuration.

![Timezone](/blog-images/NIST/4.PNG)

---

### ✅ Q5. Who is the registered owner?

Navigate back to:  
`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion`

The `RegisteredOwner` field shows the user who registered the OS:

**G=r=e=g S=c=h=a=r=d=t**

The use of `=` is a redaction technique to avoid search engine indexing.

![Registered Owner](/blog-images/NIST/5.PNG)

---

### ✅ Q6. What is the computer account name?

To retrieve the computer name, go to:  
`HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Control\ComputerName\ComputerName`

This is the standard location where Windows stores the assigned computer name.

![Computer Name](/blog-images/NIST/6.PNG)

---

### ✅ Q8. When was the last recorded computer shutdown date/time?

Registry path:  
`HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Control\Windows`

Look for the binary value `ShutdownTime`. Converting the hex value `C4 92 8E 51 86 8B C4 01` reveals:

**August 27, 2004 – 10:46:33**

![Shutdown Date](/blog-images/NIST/8.PNG)

---

### ✅ Q9. How many accounts are recorded (total number)?

The `SAM` hive stores local user account information.

Path to check:  
`SAM\Domains\Account\Users\Names`

Each subkey under `Names` corresponds to a user account. In this case, we see **5 accounts** listed.

![Users](/blog-images/NIST/9.PNG)

---

### ✅ Q10. What is the account name of the user who mostly uses the computer?

To determine the most active user, I examined the `logon count` values under the user keys.

`Mr.Evil` had **15 logons**, making him the primary user of the machine.

![Logon Count](/blog-images/NIST/10.PNG)

---

### ✅ Q11. Who was the last user to log on to the computer?

Registry path:  
`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon`

The value `DefaultUserName` holds the name of the last user who logged in.

![Last Logon](/blog-images/NIST/11.PNG)

---

### ✅ Q12. What file proves that “G=r=e=g S=c=h=a=r=d=t” is Mr. Evil and also the administrator?

A keyword search revealed a file named `irunin.ini`.  
It contains configuration information linking **Greg Schardt** to the **Mr.Evil** username and confirms administrative privileges.

![irunin.ini](/blog-images/NIST/12.PNG)

---

### ✅ Q13. List the network cards used by this computer.

We inspect the following registry path in both ControlSets:

`HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Class\{4D36E972-E325-11CE-BFC1-08002BE10318}`  
`HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Control\Class\{4D36E972-E325-11CE-BFC1-08002BE10318}`

This key lists all network adapters (physical or virtual) ever installed.  
Under the subkeys:

- **0010** → `Compaq WL110 Wireless LAN PC Card`
- **0001** → `Xircom Ethernet Adapter`

![Interface 1](/blog-images/NIST/13.02.PNG)  
![Interface 2](/blog-images/NIST/13.beforeExp.PNG)

---

### ✅ Q14. What is the IP address and MAC address of the computer?

Revisiting the `irunin.ini` file, we find both the **IP** and **MAC** addresses listed.

![IP and MAC](/blog-images/NIST/14.PNG)

This file was saved during the setup of a network tool and contains relevant interface details.

---

### ✅ Q15. Which NIC card was used during the installation of LOOK@LAN?

To identify the NIC vendor, extract the first 6 hex characters (OUI) of the MAC address found earlier:

**MAC:** `00:10:A4`

An online lookup or OUI database shows this belongs to:

**Vendor:** XIRCOM

![Vendor](/blog-images/NIST/15.02.PNG)
![MAC Lookup](/blog-images/NIST/15.01.PNG)  


This confirms that the **Xircom NIC** was active during LOOK@LAN installation and setup.

---

### Q16. Find 6 installed programs that may be used for hacking.

Honestly, I did something that should **not** be done in a real-world scenario — the software list is very old, and instead of manually evaluating them, I copied the installed programs and asked ChatGPT. 😅

**⚠️ Note:** In real investigations, **do not copy or paste forensic data online**. Follow proper analysis and policy procedures.

#### ✅ Potential Hacking / Penetration Testing Tools:
1. **Ethereal 0.10.6 (Wireshark predecessor)**
   - Network sniffer and analyzer.
   - Can capture/analyze network packets including sensitive data.

2. **Look@LAN**
   - Network monitoring tool, potentially used for footprinting.

3. **CuteFTP**
   - File transfer tool. Can be used to upload/download malicious files.

4. **Network Stumbler 0.4.0**
   - WiFi scanning tool.
   - Can be used for wardriving or locating weak wireless networks.

5. **123 Write All Stored Passwords**
   - Password dumping utility — definitely malicious intent.

6. **Cain & Abel v2.5 beta45**
   - Password cracking, ARP spoofing, MITM attacks.
   - Widely used in hacking and pentesting.

7. **Anonymizer Bar 2.0**
   - Hides IP addresses.
   - Helps maintain anonymity — not inherently malicious, but can aid hackers.

---

### Q17. What is the SMTP email address for Mr. Evil?

I used the search function with the keyword `EmailAddress` to locate any related entries in config files since the Data Artifact section didn't have a direct answer.

![Email Screenshot](/blog-images/NIST/17.PNG)

---

### Q18. What are the NNTP (news server) settings for Mr. Evil?

Used the keyword `NewsServer` in the search bar. The information appeared in the `AGENT.INI` file.

![News Server](/blog-images/NIST/18.PNG)

---

### Q19. What two installed programs show this information?

I copied the installed programs and prompted ChatGPT with:  
**"Among the installed softwares, which one uses NNTP (News Server)? Just list the names of the tools. No explanation."**

![News Server Tools](/blog-images/NIST/19.PNG)

📝 Again, avoid copying forensic data to AI tools in real investigations.

---

### Q20. List 5 newsgroups that Mr. Evil has subscribed to.

This was tricky until I decided to explore the Outlook directory. That revealed the list of subscribed groups.

![Newsgroups](/blog-images/NIST/20.PNG)

---

### Q21. What are the user settings shown in mIRC while online?

I searched for `mIRC` and found the `mirc.ini` file, which holds user and configuration settings.

`.ini` files typically store application settings.

![mIRC Settings](/blog-images/NIST/21.PNG)

---

### Q22. This IRC program logs chat sessions. List 3 IRC channels visited.

Easiest question. Navigated to the mIRC program folder and opened the `/logs` directory. It showed all accessed channels.

![mIRC Logs](/blog-images/NIST/22.PNG)  
📂 Location: `/img_4Dell Latitude CPi.E01/vol_vol2/Program Files/mIRC/logs`

---

### Q23. Ethereal intercepted data: what is the file name?

I followed the path mentioned:  
📁 `/img_4Dell Latitude CPi.E01/vol_vol2/Documents and Settings/Mr. Evil/`

The file was named `interception`.

![Intercepted Traffic](/blog-images/NIST/23.PNG)

---

### Q24. What wireless device was used by the victim?

Opened the intercepted file in a text editor. The headers revealed the device info:  
📱 **Windows CE (Pocket PC)** - Version 4.20

![Header](/blog-images/NIST/24.PNG)

---

### Q25. What websites was the victim accessing?

From the same intercepted traffic, the site accessed was:  
🌐 `Host: mobile.msn.com`

---

### Q26. What is the main user's web-based email address?

Checked the temporary internet files under Mr. Evil’s profile:  
📂 `/img_4Dell Latitude CPi.E01/vol_vol2/Documents and Settings/Mr. Evil/Local Settings/Temporary Internet Files`

Specifically:  
`/Content.IE5/HYU1BON0/ShowLetter[1]/ShowLetter[1]/0`

It revealed a Yahoo alert containing the user's email.

![Temp Internet Files](/blog-images/NIST/27.PNG)

---

### Q27. Yahoo mail saves email copies under what file name?

🗂 The folder was named `ShowLetter[1]`, and it contained `.html` files which preserved email content.

---

### Q28. How many executable files are in the Recycle Bin?

Accessed the old recycle bin folder (called **RECYCLER** in Windows 2000/XP):  
📂 `/img_4Dell Latitude CPi.E01/vol_vol2/RECYCLER/S-1-5-21-2000478354-688789844-1708537768-1003`

Found **4 executable files (.exe)**.

![Executables in Recycler](/blog-images/NIST/28.PNG)

## Conclusion 
This forensic investigation revealed several hacking tools, suspicious configurations, and evidence of malicious activity. Through methodical analysis of installed programs, configuration files, and internet artifacts, key insights were uncovered about the user's intent and actions. Such findings highlight the importance of proper digital forensic practices and maintaining chain of custody in real-world scenarios.