---
title: "REvil Corp"
date: 2025-02-01
description: "You are involved in an incident response engagement and need to analyze an infected host using Redline"
image: /Revil-corp/icon.png
category: Incident Response
---

## Investigating the Compromised Endpoint

**Scenario**: One of the employees at Lockman Group contacted the IT department, frustrated that all his files had been renamed with an unfamiliar file extension. The IT team quickly identified the issue as a potential ransomware attack and escalated the case to the Incident Response team for further investigation.

As the incident responder, your task is to analyze the compromised host using Redline, a powerful memory analysis tool. Let’s dive into the investigation!

---

#### **Question 1: What is the compromised employee's full name?**  

To begin, load the saved memory analysis located in the `Desktop/analysis` folder. In Redline, click on **Open Previous Analysis** under the **Analyze Data** section, as shown below:  

![Initial Redline Setup](/blog-images/Revil-corp/1st.PNG)  

To answer Question 1, navigate to **System Information** in Redline. Here, you’ll find the currently logged-on user:  

![Question 1 Answer](/blog-images/Revil-corp/q1-and-q2.PNG)  

**Answer:** `John Coleman`  

---

#### **Question 2: What is the operating system of the compromised host?**  

From the same **System Information** section, you can identify the operating system of the compromised host.  

**Answer:** `Windows 7 Home Premium 7601 Service Pack 1`  

---

#### **Question 3: What is the name of the malicious executable that the user opened?**  

Navigate to **File Download History** in Redline. Here, you’ll find the malicious file that the user downloaded:  

![Question 3 Answer](/blog-images/Revil-corp/q3-and-q4.PNG)  

**Answer:** `WinRAR2021.exe`  

---

#### **Question 4: What is the full URL that the user visited to download the malicious binary?**  

From the **File Download History** section, you can see the full URL used to download the malicious file.  

**Answer:** `http://192.168.75.129:4748/Documents/WinRAR2021.exe`  

---

#### **Question 5: What is the MD5 hash of the binary?**  

To find the MD5 hash of the malicious binary, navigate to the user’s **Downloads** folder in Redline. In the **File System** section, go to **Users > John Coleman > Downloads**. Search for the executable file (`WinRAR2021.exe`) in the search bar:  

![Search for Executable](/blog-images/Revil-corp/q5-st1.PNG)  

Once you locate the file, double-click it to view its details. The MD5 hash will be displayed in the file information:  

![MD5 Hash](/blog-images/Revil-corp/q5.PNG)  

**Answer:** `890a58f200dfff23165df9e1b088e58f`  

---

#### **Question 6: What is the size of the binary in kilobytes?**  

From the same file details window, you can see the size of the binary in kilobytes.  

**Answer:** `164 KB`  

---

#### **Question 7: What is the extension to which the user's files got renamed?**  

Navigate to **File System > Users > John Coleman > Desktop** and look for files with modified dates. You’ll notice `password.txt...` was modified:  

![Modified File](/blog-images/Revil-corp/q6.PNG)  

**Answer:** `.t48s39la`  

---

#### **Question 8: What is the number of files that got renamed and changed to that extension?**  

Use the **Timeline** feature in Redline to count the number of files with the `.t48s39la` extension. Enable the **Modified** and **Changed** filters and search for the extension:  

![Modified File Count](/blog-images/Revil-corp/q7.PNG)  

**Answer:** `48`  

---

#### **Question 9: What is the full path to the wallpaper that got changed by an attacker, including the image name?**  

Search for `.bmp` in the **Timeline** and enable the **Modified** and **Changed** filters:  

![Wallpaper Path](/blog-images/Revil-corp/q8.PNG)  

**Answer:** `C:\Users\John Coleman\AppData\Local\Temp\hk8.bmp`  

---

#### **Question 10: The attacker left a note for the user on the Desktop; provide the name of the note with the extension.**  

On the user’s Desktop, you’ll find a file named `t48s39la-readme.txt`:  

![Left Note](/blog-images/Revil-corp/q9.PNG)  

**Answer:** `t48s39la-readme.txt`  

---

#### **Question 11: The attacker created a folder "Links for United States" under C:\Users\John Coleman\Favorites\ and left a file there. Provide the name of the file.**  

Navigate to **File System > Users > John Coleman > Favorites > Links for United States**. You’ll find a file with a Spanish term in its name:  

![File in Favorites](/blog-images/Revil-corp/q10.PNG)  

**Answer:** `GobiernoUSA.gov.url.t48s39la`  

---

#### **Question 12: There is a hidden file that was created on the user's Desktop that has 0 bytes. Provide the name of the hidden file.**  

Search for `.lock` files on the Desktop. You’ll find a hidden file with 0 bytes:  

![Hidden File](/blog-images/Revil-corp/q11.PNG)  

**Answer:** `d60dff40.lock`  

---

#### **Question 13: The user downloaded a decryptor hoping to decrypt all the files, but he failed. Provide the MD5 hash of the decryptor file.**  

On the user’s Desktop, locate the file named `d.e.c.r.yp.to.r.exe`. Double-click it to view its details, including the MD5 hash:  

![Decryptor MD5 Hash](/blog-images/Revil-corp/q12.PNG)  

**Answer:** `f617af8c0d276682fdf528bb3e72560b`  

---

#### **Question 14: What is the full URL from which the decryptor was downloaded?**  

In Redline, navigate to **Browser URL History** and search for `decr`. You’ll find the URL used to download the decryptor:  

![Decryptor URL](/blog-images/Revil-corp/q13.PNG)  

**Answer:** `http://decryptor.top/644E7C8EFA02FBB7`  

---

#### **Question 15: What are three names associated with the malware which infected this host? (enter the names in alphabetical order)**  

Perform external research using the MD5 hash from Question 5. A quick search reveals that the malware is associated with the REvil ransomware family:  

![REvil Malware](/blog-images/Revil-corp/q14.PNG)  

**Answer:** `REvil, Sodin, Sodinokibi`  

---

### **Conclusion**  

This concludes the walkthrough for the REvil Corp incident response challenge. By analyzing the system using Redline, you successfully identified key forensic artifacts, the attacker's methods, and the ransomware's impact. Continue exploring Redline and similar tools to strengthen your incident response skills!  
