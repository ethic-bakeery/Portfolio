---
title: "Digital Forensics Case"
date: 2025-02-08
description: "Acquire the critical skills of evidence preservation, disk imaging, and artefact analysis for use in court."
category: " Digital Forensic"
image: /BTLO/caseb64.png
draft: false
---

### Introduction

**Disclaimer**:  
This is a fictional scenario with invented names, characters, and events. It is not intended to suggest any connection to real people, places, structures, or products.


### Building on Intro to Digital Forensics

In the previous "Intro to Digital Forensics" module, we covered the types of investigations initiated by the public or private sectors, the digital forensic process, and practical examples of applying digital forensics knowledge.

In this room, we will simulate a real-life crime scenario, authorized by a court of law, where we will conduct a search, gather evidence, and analyze digital artifacts.


### Room Objectives

In this room, you will learn key skills to build confidence as a future **Forensics Lab Analyst**, **DFIR First Responder**, or **Digital Forensics Investigator**:

- Understand proper **Chain of Custody** procedures for transporting evidence to the Forensics Lab.
- Use **FTK Imager** to acquire forensic disk images and preserve digital artifacts.
- Analyze forensic artifacts for use in legal trials.


### Room Prerequisites

Before beginning, it's recommended to complete the following modules:

- [Intro to Digital Forensics](https://tryhackme.com/room/introdigitalforensics)
- [Introduction to Cryptography](https://tryhackme.com/room/cryptographyintro)


#### Suspect:
**William S. McClean** (also known as *William Super McClean*)

#### Nationality:
**British**

#### Charges Pressed / Accused Crimes:
- **Corporate espionage**
- **Theft of trade secrets**


### Scenario

As a **Forensics Lab Analyst**, you are responsible for analyzing artefacts from crime scenes. Today, your agency received an "intelligence report" from a trusted informant, connected to an international crime syndicate. The informant provided critical details about **William S. McClean** and his activities related to **Case #B4DM755**.

The informant revealed that McClean is currently at large in **Metro Manila, Philippines** and is planning a transaction with a local gang member today. The informant even knew the exact location of the meetup, along with the fact that McClean would be carrying incriminating materials at the time.

In response, the **law enforcement agency** obtained a **search warrant** for the investigation. The court issued the warrant on the same day, allowing law enforcement officers to search McClean’s residence based on the informant's tip.

As part of the operation, you have been assigned as the **DFIR First Responder** to ensure the correct acquisition of **digital artefacts and evidence**. The collected evidence will be sent to the **Forensics Lab** for further analysis and eventual use in court proceedings.

**Note**: In this understaffed agency, a single individual (you) is responsible for both the acquisition and analysis of evidence. This ensures the integrity of the evidence and the chain of custody.

### Questions:

1. **What is your official role?**  
   **Answer:** Forensics Lab Analyst

2. **What role was assigned to you for this specific scenario?**  
   **Answer:** DFIR First Responder

3. **What do you have to gather?**  
   **Answer:** Digital artefacts and evidence

4. **What document is needed before performing any legal search?**  
   **Answer:** Search warrant

### Forensic Acquisition Process for Digital Artefacts and Evidence

Different departments may have their unique protocols for acquiring digital artefacts and evidence. However, DFIR First Responders should follow these basic guidelines when dealing with computer systems at a crime scene:

1. **Image the RAM** – Make a snapshot of the system’s RAM to capture the current state of running processes and data.
2. **Check for Drive Encryption** – Determine whether the drives are encrypted and ensure proper steps are followed to preserve encrypted data.
3. **Image the Drive(s)** – Take a forensic image of the hard drive(s) to preserve the exact contents for further analysis.

### Process for Establishing Chain of Custody

While each department may have its own set of procedures for maintaining the chain of custody, DFIR First Responders should adhere to the following standard practices for handling digital artefacts and evidence before, during, and after the collection:

1. **Proper Documentation** – Ensure all seized materials are correctly documented as evidence (including devices and files).
2. **Hash and Copy Files** – Hash the obtained files and make copies to preserve the integrity of the originals.
3. **Avoid Proper Shutdown** – Do not perform a standard shutdown of suspect devices, as this could trigger anti-forensic measures. Instead, pull the power plug from the device to avoid data alteration.
4. **Bag, Seal, and Tag** – Properly bag, seal, and tag the obtained artefacts before sending them to the Forensics Laboratory for further examination.

### Handover of Evidence and Chain of Custody

When handing over digital artefacts and evidence, it’s important to follow these steps:

- **Verify Completeness** – Ensure that all artefacts and evidence are complete and accurate.
- **Field Operative and Analyst Verification** – Both the Field Operative and the Forensics Lab Analyst should verify the inventory and ensure that everything is accounted for.
- **Complete Chain of Custody Forms** – Ensure that all related Chain of Custody documentation is properly filled out to guarantee a transparent and secure transfer of artefacts and evidence.

### Questions:

1. **Before imaging drives, what must we check them for?**  
   **Answer:** Drive encryption

2. **What should be done to ensure and maintain the integrity of original files in the Chain of Custody?**  
   **Answer:** Hash and copy

3. **What must be done before sending obtained artefacts to the Forensics Laboratory?**  
   **Answer:** Bag, Seal, and Tag the obtained artefacts


### Scenario (continuation)

Unfortunately, law enforcement arrived late at the suspect's residence, where the transaction supposedly happened. Upon arrival, everyone appeared to have already left; there were indications of evidence eradication attempts, and a transaction between the nefarious elements had successfully occurred.
Shiny object under the suspect's desk

During a thorough search of the suspect's place, law enforcement officers discovered a flash drive under the desk. A key chain with the initials WSM was attached to the flash drive, which the team believes belongs to the suspect. It may have been left behind accidentally in their haste to vacate the place.
A DFIR First Responder picking up the shiny object which turns out to be a flash drive

As a DFIR First Responder accompanying the Field Operatives, you documented, labelled, and preserved the artefact found and completed the Chain of Custody form. You then transported the artefact to the Forensics Laboratory for further examination. 

## FTK Imager Overview

FTK Imager is a forensics tool that allows forensic specialists to acquire computer data and perform analysis without affecting the original evidence, preserving its authenticity, integrity, and validity for presentation during a trial in a court of law.

### NOTE:
In a real-world scenario, a Forensics Lab Analyst will use a **write-blocking device** to mount the suspect drive/forensic artefact to prevent accidental tampering.
![gadget](/blog-images/caseb4/gadget.png)

### FTK Imager - User Interface (UI)

FTK Imager includes key UI components that are essential for its functionality. These are:

1. **Evidence Tree Pane**: Displays a hierarchical view of the added evidence sources such as hard drives, flash drives, and forensic image files.
2. **File List Pane**: Displays a list of files and folders contained in the selected directory from the Evidence Tree Pane.
3. **Viewer Pane**: Displays the content of selected files in either the Evidence Tree Pane or the File List Pane.

![T1](/blog-images/caseb4/T1.png)

### Working with FTK Imager

#### OBJECTIVES: 

- Verify encryption
- Obtain a forensic disk image
- Analyse the recovered artefact

**IMPORTANT**: The VM contains an emulated flash drive, "\\PHYSICALDRIVE2 - Microsoft Virtual Disk [1GB SCSI]", which replicates the scenario of a physical drive connected to a write blocker for forensic analysis. The steps performed in this activity mimic real-world situations. The write-protected flash drive is automatically attached to the VM upon startup.


#### STEP 1: Detecting EFS Encryption with FTK Imager

**IMPORTANT**: The drive's file system must be NTFS to utilize EFS encryption. EFS encryption is not compatible with FAT32 or exFAT file systems.

A Forensics Lab Analyst can perform the following steps to detect the presence of EFS encryption on a physical drive:

1. Open **FTK Imager** and navigate to **File > Add Evidence Item**.
![T1](/blog-images/caseb4/T1.png)

2. Choose **Physical Drive** in the Select Source window, then click **Next**.
![T2](/blog-images/caseb4/T2.png)
3. Choose **Microsoft Virtual Disk** (our virtual flash drive) in the Select Drive window, then click **Finish**.
![T3](/blog-images/caseb4/T3.png)
4. Navigate and click **File > Detect EFS Encryption** to scan the drive and detect the presence of encryption.
![T4](/blog-images/caseb4/T4.png)
5. A message box will indicate whether or not EFS encryption is enabled on the attached drive.
![T5](/blog-images/caseb4/T5.png)

### Questions:

1. **What device will prevent tampering when acquiring a forensic disk image?**  
   **Answer:** Write-blocking device

2. **What is the UI element of FTK Imager which displays a hierarchical view of the added evidence sources?**  
   **Answer:** Evidence Tree Pane

3. **Is the attached flash drive encrypted? (Y/N)**  
   **Answer:** N

4. **What is the UI element of FTK Imager which displays a list of files and folders?**  
   **Answer:** File List Pane


### STEP 2: Creating a Forensic Disk Image with FTK Imager

A Forensics Lab Analyst can perform the following steps to create a forensic disk image from a physical drive:

1. Open **FTK Imager** and navigate to **File > Create Disk Image**
![T6](/blog-images/caseb4/T6.png)
2. Choose **Physical Drive** on the Select Source window, then click Next. 
![T7](/blog-images/caseb4/T7.png)
3. Choose **Microsoft Virtual Disk (our virtual flash drive)** on the Select **Drive window*, then click Finish. 
![T8](/blog-images/caseb4/T8.png)
4. Ensure you check **Verify images after they are created** and **Create directory listings of all files in the image after they are created** on the Create Image window. Press Add to open the Select **Image Type** window, choose **Raw (dd)**, then click Next. 
![T9](/blog-images/caseb4/T9.png)
5. Enter case details in the Evidence Item Information window, then click **Next**. 
![T10](/blog-images/caseb4/T10.png)
6. Enter the **Image Destination** Folder and **Image Filename**, then click **Finish**.
![T11](/blog-images/caseb4/T11.png)
7.Press **Start** to begin creating the **forensic disk image**. 
![T12](/blog-images/caseb4/T12.png)
![T13](/blog-images/caseb4/T13.png)
8. When you check **Verify images after they are created**, FTK Imager will hash both the physical drive and the forensic disk image after disk imaging. It will then **validate if both hashes are equal to confirm a match** 
![T14](/blog-images/caseb4/T14.png)
Note: You can go ahead and answer Question 1 and 2, then come back and follow along with the Step 3 section. 

### STEP 3: Mounting a Forensic Disk Image and Extracting Artefacts

A Forensics Lab Analyst can perform the following steps to mount a forensic disk image and extract artefacts using FTK Imager:

1. Open FTK Imager and navigate to File > **Add Evidence Item**
![T15](/blog-images/caseb4/T15.png)
2. Choose *Image File* on the **Select Source** window, then click **Next**. 
![T16](/blog-images/caseb4/T16.png)
3. *Set Evidence Source* to the path of the forensic disk image that we created previously and click *Finish*. 
![T17](/blog-images/caseb4/T17.png)

4. The **Evidence Tree Pane** will be populated, and artefacts will be visible on the **File List Pane**. The **Viewer Pane** will display the contents of selected elements for analysis.

*IMPORTANT*: During forensic analysis with FTK Imager, it is always crucial to analyse using the forensic disk image that has been created. It is also equally important to look for signs of deleted files (i.e., those with an x symbol), corrupted files (e.g., 0 file size) and obfuscation (e.g., conflicting information about a file's extension and header information). 
![T18](/blog-images/caseb4/T18.png)
5. To recover all deleted files, right-click on the target directory or file and press Export Files to save artefacts. 
![T19](/blog-images/caseb4/T19.png)
![T20](/blog-images/caseb4/T20.png)
![T21](/blog-images/caseb4/T21.png)

### Questions:

1. **What is the UI element of FTK Imager which displays the content of selected files?**  
   **Answer:** Viewer Pane

2. **What is the SHA1 hash of the physical drive and forensic image?**  
To answer this question quickly and accurately, open PowerShell and navigate to the directory where the physical drive and forensic image are stored. Use the built-in `Get-FileHash` command to generate the hash. You can use different hashing algorithms like MD5, SHA256, or SHA1, but for this task, we are particularly interested in the SHA1 hash.

![Filehash](/blog-images/caseb4/Task6-q2.png)

**Answer:** d82f393a67c6fc87a023b50c785a7247ab1ac395

3. **Including hidden files, how many files are currently stored on the flash drive?**  

To determine the total number of files, including hidden ones, simply open the file explorer and navigate to the USB flash drive. Make sure to check the "Hidden items" box in the "View" tab. This will display all files, including those that are normally hidden.

![Hidden Files](/blog-images/caseb4/Task6-q3.png)

**Answer:** 8

4. **How many files were deleted in total?**  

To find out how many files were deleted, compare the files in the file explorer to those in your copy of the USB drive image. In the image below, I’ve pointed out the deleted files for better understanding.

![Hidden Files](/blog-images/caseb4/Task6-q4.png)

**Answer:** 6

5. **How many recovered files are corrupted (e.g., 0 file size)?**  

To identify the number of corrupted files, open FTK Imager and sort the files by size. Any files with a size of 0 bytes will be displayed. These files are considered corrupted.

![Hidden Files](/blog-images/caseb4/Task6-q5.png)

As shown in the image, there are three files with no content.
**Answer:** 3

### Forensic Process for Case B4DM755

**Scenario (continuation):**  
Upon receiving the artefacts and evidence from the crime scene at the Forensics Lab, it is essential to verify their authenticity. Since the DFIR First Responders recovered only a flash drive, the following actions are undertaken:

1. **Verify and document every detail of the Chain of Custody form from the crime scene to the present.**
2. **Use FTK Imager to create a forensic disk image** of the seized flash drive from the suspect's (William S. McClean) residence in Case B4DM755.
3. **Match the cryptographic hashes** of the physical drive and the acquired forensic image to ensure the authenticity and integrity of the artefacts, making them admissible evidence in a court of law.
4. **Preserve the physical evidence (i.e., the flash drive)** for presentation in a court of law during trial after creating the forensic disk image.
5. **Perform any review and analysis** on the created forensic disk image to avoid tampering with evidence.
6. **Document all examination operations and activities** to guarantee the admissibility of evidence in court.
7. During the trial presentation, ensure that the **cryptographic hashes of the physical evidence and the forensic disk image MATCH**.

### Questions:

1. **Aside from FTK Imager, what is the directory name of the other tool located in the tools directory under Desktop?**  
By simply inspecting the directory, we can identify it as `exiftool`.
**Answer:** exiftool-12.47
2. **What is the visible extension of the "hideout" file?**  
In the root folder, we can observe that the hideout file has the extension `.pdf`.
![hideout](/blog-images/caseb4/Task7-q2.PNG)
**Answer:** .pdf
3. **View the metadata of the "hideout" file. What is its actual extension?**  

To view the metadata of the hideout file, we can use `exiftool`.  
First, right-click on the file and select `Export`.  
![export](/blog-images/caseb4/Task7-q3-st1.PNG)  
Save it to a path of your choice, then navigate to the `exiftool` folder. Open Command Prompt or PowerShell from there, then provide the path to the saved hideout file.  
![exiftool](/blog-images/caseb4/Task7-q3.PNG)  
In the metadata, we can see the extension is `.jpeg`.
**Answer:** .jpg

4. **A phone was used to photograph the "hideout." What is the phone's model?**  
Referring to the metadata of the hideout file, we can check the camera model.

![model](/blog-images/caseb4/Task7-q4.PNG)  
The camera model is obtained.
**Answer:** ONEPLUS A6013

5. **A phone was used to photograph the "warehouse." What is the phone's model?**  

The question asks us to investigate a different file called `warehouse`. First, export the file as done earlier.

![warehouse](/blog-images/caseb4/Task7-q5-st1.PNG)  
Then run the `exiftool` command on the warehouse file.

![model](/blog-images/caseb4/Task7-q5.PNG)  
As shown above, I piped the command to filter using `findstr` to return only the model string.
**Answer:** Mi 9 Lite
6. **Are there any indications that the suspect is involved in other illegal activity? (Y/N)**  

![export operational](/blog-images/caseb4/Task7-q6-st1.PNG)  
Then, use `exiftool` to check if it has a hidden extension.

![find extension](/blog-images/caseb4/Task7-q6-st2.PNG)  
It turns out that it's a `.zip` file. We can proceed with extraction.

![extract](/blog-images/caseb4/Task7-q6-st3.PNG)  
Upon extraction, several files were hidden inside. I began checking them for evidence that the suspect might be involved in illegal activity. One file contained a note indicating the suspect's involvement in illegal activity.

![note file](/blog-images/caseb4/Task7-q6-notes.PNG)  
The content of the note suggests the suspect is indeed involved in illegal activity.
   **Answer:** Y
7. **Who was the point of contact of Mr. William S. McClean in 2022?**  
From the above picture, we can see that the point of contact in 2022 was:
**Answer:** Karl Renato Abelardo
8. **A meetup occurred in 2022. What are the GPS coordinates during that time?**  
Referring to the same picture, the GPS coordinates are as follows:
**Answer:** 14°26'25.7"N 120°59'00.8"E

9. **What is the password to extract the contents of pandorasbox.zip?**  
Upon reviewing the notes file, we found the password for the zip file.
![password](/blog-images/caseb4/Task7-q8.PNG)
   **Answer:** DarkVault$Pandora=DONOTOPEN!K1ngCr1ms0n!
10. **From which company did the source code in the pandorasbox directory originate?**  
There is a zip file in the folder called `pandorasbox.zip`. We need to extract it to continue the analysis and answer the question.
![extract pandorasbox](/blog-images/caseb4/Task7-q9-st1.PNG)  
The password is the one we obtained earlier: `DarkVault$Pandora=DONOTOPEN!K1ngCr1ms0n!`.

![company](/blog-images/caseb4/Task7-q9.PNG)  
Once extracted, we opened the Python file and found the company name there.

![extract pandorasbox](/blog-images/caseb4/Task7-q9-st1.PNG)
**Answer:** SwiftSpend Financial
11. **In one of the documents that the suspect has yet to sign, who was listed as the beneficiary?**  
Open the "low investment beneficiaries" document.

![beneficiary](/blog-images/caseb4/Task7-q10-st1.PNG)  
![beneficiary name](/blog-images/caseb4/Task7-q10.PNG)  
By looking through the file, we can clearly see that the beneficiary is listed as:
**Answer:** Mr. Giovanni Vittorio DeVentura

12. **What is the hidden flag?**  
In the extracted folder, there is a folder called "do not open." I was curious, so I opened it.

![flag](/blog-images/caseb4/flag.PNG)
**Answer:** THM{sCr0LL_sCr0LL_cL1cK_cL1cK_4TT3NT10N_2_D3T41L5_15_CRUC14L!!}


### Post-Analysis of Evidence to Court Proceedings

If there is reasonable suspicion that the suspect possesses and distributes these materials, the law enforcement agency handling the case must follow these 4 Phases of Investigation. Additionally, the DFIR First Responder must observe the following steps before, during, and after acquiring digital artefacts and evidence:

#### Pre-search

- Send a request to preserve the data and logs of the suspect to social media networks (subscriber's information, traffic, and content data).
- Send a request to preserve the data and logs of the suspect to ISPs (subscriber's information, traffic, and content data).
- Obtain a warrant for search, seizure, and examination of the suspect's computer data for violation of domestic and international laws.
- Perform an inspection of the suspect's social media accounts and public profiles.

#### Search

- By a warrant issued by a court of law, obtain data requested from social media networks and ISPs.
- Perform search, seizure, and examination of the suspect's computer data.

#### Post-search

- Perform forensic analysis of acquired digital artefacts & evidence.

#### Trial

- Present forensic artefacts & evidence together with proper documentation during court proceedings.

### The End

#### Questions


1. **In which phase is a warrant obtained for search, seizure, and examination of the suspect's computer data due to violations of domestic and international laws?**  
   **Answer:** Pre-search

2. **In which phase is a forensic analysis performed on the acquired digital evidence requested from various sources?**  
   **Answer:** Post-search

3. **Which phase involves presenting forensic artefacts and evidence with proper documentation in a court of law?**  
   **Answer:** Trial

### Conclusion 
Final Note: This fictional scenario serves as an excellent training ground for aspiring forensic professionals, emphasizing the importance of meticulousness, technical expertise, and adherence to legal protocols in the field of digital forensics.