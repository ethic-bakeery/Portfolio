---
title: "Forensic"
date: 2025-02-08
description: "This memory dump originates from a compromised system. Perform in-depth forensics to explore its internals."
image: /Forensics/mem.png
category: "Digital Forensic"
---

### Task 1: Volatility Forensics
The provided file is a memory dump of an infected system. Download the attached file to begin your analysis.  
For this lab, we are using **Volatility version 2** for analysis.

#### Question 1: What is the Operating System of this Dump File?
To determine the operating system of the memory dump, we can utilize the `imageinfo` or `kdbgscan` plugins. These plugins assist in identifying the OS profile for the dump file.

```
vol2.py -f victim.raw imageinfo
vol2.py -f victim.raw kdbgscan
```

Both commands revealed that the dump corresponds to a **Windows 7 SP1 64-bit (Win7SP1x64)** system.

![OS Info](/blog-images/Forensics/Task1-q1.PNG)

**Answer:** `Windows 7 SP1 x64`

#### Question 2: What is the PID of SearchIndexer?
To identify the PID of the SearchIndexer process, we can examine the list of processes using various plugins. The relevant ones for listing processes include:

```
volatility --profile=PROFILE pstree -f file.dmp  # Get process tree (not hidden)
volatility --profile=PROFILE pslist -f file.dmp  # Get process list (EPROCESS)
volatility --profile=PROFILE psscan -f file.dmp  # Get hidden processes (malware)
volatility --profile=PROFILE psxview -f file.dmp  # Get hidden processes
```

In this case, the hint suggests examining terminated or hidden processes. We can use the `vol2.py -f victim.raw --profile=Win7SP1x64 psxview` plugin to identify the PID of SearchIndexer.

```
vol2.py -f victim.raw --profile=Win7SP1x64 psxview
```

From the output, we can find the SearchIndexer process with PID **2180**.

![SearchIndexer PID](/blog-images/Forensics/Task1-q2.PNG)

**Answer:** `2180`

#### Question 3: What is the last directory accessed by the user?
To identify the last directory accessed by the user, the hint refers to searching for "a bag full of shells in your backyard." This suggests using the **shellbags** plugin.

```
vol2.py -f victim.raw --profile=Win7SP1x64 shellbags
```

The **Shellbags** plugin helps identify recently accessed directories and files from the Windows registry. By analyzing the output, we find that the last accessed directory is `deleted_files`.

![Accessed Directory](/blog-images/Forensics/Task1-q3.PNG)

**Answer:** `deleted_files`

### Task 2: Dig a little more...

#### Question 4: There are many suspicious open ports; which one is it? (ANSWER format: protocol:port)
To identify suspicious open ports, we can use the **netscan** plugin to check for network connections.

```
vol2.py -f victim.raw --profile=Win7SP1x64 netscan
```

From the output, we can identify that the suspicious open port is **tcp:5005**.

![Suspicious Port](/blog-images/Forensics/Task2-q1.PNG)

**Answer:** `tcp:5005`

#### Question 5: Vads tag and execute protection are strong indicators of malicious processes; can you find which they are? (ANSWER format: Pid1;Pid2;Pid3)
This question asks us to find malicious processes. A quick Google search shows that we can use the **malfind** plugin.

![Google Malfind Search](/blog-images/Forensics/malfind.PNG)

```
vol2.py -f victim.raw --profile=Win7SP1x64 malfind | grep Process:
```

The output reveals that the malicious processes are associated with PIDs **1860**, **1820**, and **2464**.

![Malfind Results](/blog-images/Forensics/Task2-q2.PNG)

**Answer:** `1860;1820;2464`

### Task 3: IOC SAGA
In the previous task, we identified malicious processes. Now, let's dig deeper into these processes and extract Indicators of Compromise (IOCs).  

We start by extracting memory dumps from the identified malicious processes.

```
vol2.py -f victim.raw --profile=Win7SP1x64 memdump --pid=1860 --dump-dir=./
vol2.py -f victim.raw --profile=Win7SP1x64 memdump --pid=1820 --dump-dir=./
vol2.py -f victim.raw --profile=Win7SP1x64 memdump --pid=2464 --dump-dir=./
```

![Memory Dump](/blog-images/Forensics/Task3-mem-space.PNG)

Now, let's answer the IOC-related questions.

We can obtain all domains by running the following command:

```
strings -n 8 1820.dmp 1860.dmp 2464.dmp | grep -Eo 'www\.go[^.]*\.ru|www\.i[^.]*\.com|www\.ic[^.]*\.com'
```

This command extracts domain names associated with the identified processes.

![All Domains](/blog-images/Forensics/Task3-q1-3.PNG)

#### Question 6: 'www.go****.ru' (write full URL without any quotation marks)
**Answer:** `www.goporn.ru`

#### Question 7: 'www.i****.com' (write full URL without any quotation marks)
**Answer:** `www.ikaka.com`

#### Question 8: 'www.ic******.com'
**Answer:** `www.icsalabs.com`

For the IP addresses, we can use the following command:

```
strings -n 8 1820.dmp 1860.dmp 2464.dmp | grep -Eo '202\.[0-9]{1,3}\.233\.[0-9]{1,3}|[0-9]{1,3}\.200\.[0-9]{1,3}\.164|209\.190\.[0-9]{1,3}\.[0-9]{1,3}'
```

![IP Addresses](/blog-images/Forensics/Task3-q4-6.PNG)

#### Question 9: 202.***.233.*** (Write full IP)
**Answer:** `202.107.233.211`

#### Question 10: ***.200.**.164 (Write full IP)
**Answer:** `209.200.12.164`

#### Question 11: 209.190.***.***
**Answer:** `209.190.122.186`

#### Question 12: What is the unique environmental variable of PID 2464?
We can use the `envars` plugin with the `-p` flag to extract the unique environmental variable of the given PID.
![env](/blog-images/Forensics/Task3-q7.PNG)
by given the -p 2464 we can get the variable name

```
vol2.py -f victim.raw --profile=Win7SP1x64 envars -p 2464
```

**Answer:** `AOANOCACHE`

### Conclusion
Through the use of Volatility plugins, we successfully analyzed the memory dump of a compromised Windows system, identifying key indicators of compromise, including suspicious processes, open ports, and domains. By leveraging memory analysis tools, we were able to extract crucial information, contributing to a deeper understanding of the attack and its impact.
