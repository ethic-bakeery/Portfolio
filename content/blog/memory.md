---
title: "Memory Forensics Walkthrough"
date: 2025-02-01
description: "Using Volatility to Perform Memory Forensics and Extract Flags"
image: /memory/mem.png
category: Digital Forensic
---

[Challenge Room](https://tryhackme.com/room/memoryforensics)

Here are some resources I used. Check them out for more information:

- [Volatility](https://github.com/volatilityfoundation/volatility/)
- [Volatility Wiki](https://github.com/volatilityfoundation/volatility/wiki)
- [Cheatsheet](https://book.hacktricks.xyz/generic-methodologies-and-resources/basic-forensic-methodology/memory-dump-analysis/volatility-examples)
- [Room Icon Credit](https://book.cyberyozh.com/counter-forensics-anti-computer-forensics)

---

# Task 1: Memory Dump Initial Analysis

The on-site forensic investigator provided us with a memory dump from John's computer. Our job as secondary forensic analysts is to dig deep and find all necessary information.

### Step 1: Identifying the Memory Profile

Before diving into any analysis, we first need to determine the correct memory profile. We can achieve this using the `imageinfo` or `kdbgscan` plugin.

Command used:
```bash
vol.py -f Snapshot.vmem imageinfo
```

![imageinfo](/blog-images/memory/profile.PNG)

From the output, multiple suggested profiles appeared. We will select the first one: `Win7SP1x64`, which is typically the most accurate.

**Note:** All subsequent commands will now include the profile parameter `--profile=Win7SP1x64`.

---

# Task 2: Find John's Password

To retrieve John's password, we'll perform a hash dump and crack the obtained hashes.

### Step 2: Dumping Hashes

We use the `hashdump` plugin to extract password hashes.

Command used:
```bash
vol.py -f Snapshot.vmem --profile=Win7SP1x64 hashdump
```

![hashdump](/blog-images/memory/hashes.PNG)

The hash corresponding to the `john` user is captured.

### Step 3: Cracking the Hash

We can use tools like `hashcat` or `john the ripper` to crack the hash. In this case, I used `hashcat`.

![hashcat](/blog-images/memory/hashcat.PNG)

**Success!** The cracked password is displayed.

---

# Task 3: Investigating Last Shutdown and Console Commands

## Q2: When was the machine last shutdown?

First, we attempted to find the Last Known Good control set to gather shutdown time information.

### Step 4: Identifying the Last Control Set

Using the `printkey` plugin:
```plantext
vol.py -f Snapshot.vmem --profile=Win7SP1x64 printkey -K "Select"
```
![last good known](/blog-images/memory/lastcontrolset.PNG)

We found that `CurrentControlSet` was set to 2.

Then, we checked the `ControlSet002\Control\Windows` registry key:
```plaintext
vol.py -f Snapshot.vmem --profile=Win7SP1x64 printkey -K "ControlSet002\\Control\\Windows"
```

![datetime](/blog-images/memory/002.PNG)

We found the shutdown time recorded here.

**However, a better method exists!**

### Step 5: Using Shutdown Plugin

Volatility offers a plugin that simplifies shutdown time extraction.

Command:
```plaintext
vol.py -f Snapshot.vmem --profile=Win7SP1x64 shutdowntime
```

![shutdown time](/blog-images/memory/shutdown.PNG)

**Result:** The exact same shutdown timestamp is obtained.

## Q3: What did John write?

We now investigate what John was typing on his machine.

### Step 6: Console Command Extraction

The `consoles` plugin retrieves command-line inputs.

Command:
```plaintex
vol.py -f Snapshot.vmem --profile=Win7SP1x64 consoles
```

![console](/blog-images/memory/console.PNG)

**Result:** We found a command window showing "you found me" — an important flag.

---

# Task 4: Recovering TrueCrypt Passphrase

During the investigation, it was found that TrueCrypt was installed on the machine. Our goal is to find the encryption passphrase from memory.

### Step 7: Searching for TrueCrypt Keys

## Q4. What is the TrueCrypt Passphrase?

Whenever you're investigating something specific like TrueCrypt, the first step should always be to **check if a plugin exists** in Volatility.  
If a plugin is available, it makes the work way easier; otherwise, you'd have to extract and search manually.

So, I quickly did a Google search to see if Volatility has a TrueCrypt plugin available.

![Google Search](/blog-images/memory/plugin.PNG)

Good news, the plugin **does exist**!  
With that confirmed, I proceeded to use the plugin on the memory dump.

After running the appropriate Volatility command with the TrueCrypt plugin, I was able to successfully extract the passphrase:

![TrueCrypt Plugin Output](/blog-images/memory/pass.PNG)

As you can see above, the passphrase was recovered directly from the memory.  

---

# Conclusion

In this walkthrough, we methodically used Volatility to extract crucial forensic evidence from a memory dump. From determining the system profile, dumping and cracking password hashes, analyzing system shutdown events, extracting command history, and uncovering hidden encryption keys we demonstrated how memory forensics plays a critical role in modern cyber investigations.

Volatility, combined with methodical steps and the right mindset, proves itself to be an indispensable tool for any forensic investigator.

---


