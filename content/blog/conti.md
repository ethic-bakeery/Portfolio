---
title: "Hunt ransomware"
date: 2025-02-01
description: "An Exchange server was compromised with ransomware. Use Splunk to investigate how the attackers compromised the server."
image: /ransomware/ransome.jpg
category: Incident Response
---

### SITREP
Several employees reported that they were unable to log into Outlook. Additionally, the Exchange system administrator discovered that they could not access the Exchange Admin Center. Upon initial triage, they found multiple suspicious README files on the Exchange server.

Below is a copy of the ransomware note:
![conti](/blog-images/ransomware/st.png)
<Warning>Warning: Do NOT attempt to visit or interact with any URLs displayed in the ransom note.</Warning>

Read the latest information on the Conti ransomware [here](https://www.bleepingcomputer.com/news/security/fbi-cisa-and-nsa-warn-of-escalating-conti-ransomware-attacks/).

### Exchange Server Compromised

Below are the error messages encountered by the Exchange administrator and employees when attempting to access Exchange or Outlook.

Exchange Control Panel:
![error1](/blog-images/ransomware/error1.png)

Outlook Web Access:
![error1](/blog-images/ransomware/error2.png)

**Task:** You have been assigned to investigate this incident. Use Splunk to answer the questions below regarding the Conti ransomware attack.

#### Question 1: Can you identify the location of the ransomware?
The hint suggests looking for a common Windows binary in an unusual location. To identify this, I launched Splunk and set the timestamp to `All time`. Among the four available sourcetypes, I selected `WinEventLog:Microsoft-Windows-Sysmon/Operational`. Searching for executable files within user directories, I found the ransomware under the Administrator's Documents folder disguised as `cmd.exe`—an unusual location.

Command used:
```Splunk
sourcetype="WinEventLog:Microsoft-Windows-Sysmon/Operational"
| search Users AND image: ".exe"
```

![ransomware](/blog-images/ransomware/q1.PNG)

#### **Answer:**
The ransomware location is:  
**C:\Users\Administrator\Documents\cmd.exe**

#### Question 2: What is the Sysmon event ID for the related file creation event?
The question asks for the event code associated with file creation. Sysmon logs file creation events under EventCode 11. We can confirm this by filtering events based on EventCode.

Command used:
```Splunk
sourcetype="WinEventLog:Microsoft-Windows-Sysmon/Operational"
| search Users AND image: ".exe" AND EventCode
```

![EventCode](/blog-images/ransomware/q2.PNG)

#### **Answer:**
The EvenID related to the file creation is:  
**11**

#### Question 3: Can you find the MD5 hash of the ransomware?
To retrieve the MD5 hash of the ransomware executable (`cmd.exe`), we can filter for hashes in the logs.

Command used:
```Splunk
sourcetype="WinEventLog:Microsoft-Windows-Sysmon/Operational"
| search Users AND image: "C:\Users\Administrator\Documents\cmd.exe" AND "Hashes"
```

![hash](/blog-images/ransomware/q3.PNG)

#### **Answer:**
The MD5 hash is:  
**290c7dfb01e50cea9e19da81a781af2c**

#### Question 4: What file was saved to multiple folder locations?
To determine which file was saved in multiple locations, I filtered logs for EventCode 11 and used the `table` command to display only the `TargetFileName` field.

Command used:
```Splunk
EventCode=11
| table TargetFileName
```

![dup files](/blog-images/ransomware/q4.PNG)

#### **Answer:**
The file duplicate file is:  
**readme.txt**

#### Question 5: What command did the attacker use to add a new user to the compromised system?
To find this, I searched for Sysmon logs where the command included `/add`.

Command used:
```Splunk
sourcetype="WinEventLog:Microsoft-Windows-Sysmon/Operational" AND "/add"
| table _time, CommandLine
```

![added user](/blog-images/ransomware/q5.PNG)

#### **Answer:**
The command is:  
**net user /add securityninja hardToHack123$**

#### Question 6: What was the migrated process image, and what was the original process image?
By filtering for EventCode 8, I identified the process migration details.

Command used:
```Splunk
sourcetype="WinEventLog:Microsoft-Windows-Sysmon/Operational" AND EventCode=8
```

![migrated](/blog-images/ransomware/q6.PNG)

#### **Answer:**
The images are is:  
**C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe, C:\Windows\System32\wbem\unsecapp.exe**

#### Question 7: What process image was used to retrieve system hashes?

From the logs, the `lsass.exe` process was used to retrieve system hashes.

![Targetimage](/blog-images/ransomware/q7.PNG)

#### **Answer:**
The image is:  
**C:\Windows\System32\lsass.exe**

#### Question 8: What web shell did the exploit deploy?
The hint suggests checking IIS logs for POST requests.

Command used:
```Splunk
sourcetype="WinEventLog:Application" AND "request"
```

![exploit](/blog-images/ransomware/q8.PNG)

#### **Answer:**
The exploit webshell is:  
**i3gfPctK1c2x.aspx**

#### Question 9: What command executed the web shell?
To locate this, I searched for command-line executions related to `i3gfPctK1c2x.aspx`.

![command](/blog-images/ransomware/q9.PNG)

#### **Answer:**
The command is:  
**attrib.exe -r \\win-aoqkg2as2q7.bellybear.local\C$\Program Files\Microsoft\Exchange Server\V15\FrontEnd\HttpProxy\owa\auth\i3gfPctK1c2x.aspx**

#### Question 10: What three CVEs were leveraged in this exploit?

#### **Answer:**
The three CVEs are:  
**CVE-2020-0796, CVE-2018-13374, CVE-2018-13379**

Congratulations, you have completed the walkthrough
