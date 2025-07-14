---
title: "Bruteforce Analysis"
date: 2025-01-23
description: "Analyze Windows Security Event logs to investigate an attempted RDP bruteforce attack."
image: /letsdefend/bruteforce.png
category: "logs"
---

### Scenario
Can you analyze logs from an attempted RDP bruteforce attack?
One of our system administrators identified a large number of Audit Failure events in the Windows Security Event log.
There are a number of different ways to approach the analysis of these logs! Consider the suggested tools, but there are many others out there!
#### Source 
- [Blue Team Labs Online](https://blueteamlabs.online/)
- [Challenge -> Bruteforce](https://blueteamlabs.online/home/challenge/bruteforce-16629bf9a2)

#### Note: According to the platform's policy, answers should not be revealed. 

To successfully complete this room, ensure that the following tools are available:
- **grep**
- **Text Editor**
- **Excel**

However, I completed the challenge on a Linux machine, utilizing `grep` to answer all the questions. Therefore, if you are following along with this tutorial, **Text Editor** and **Excel** are optional tools.However its a good idea to open the CSV file and have a look at the log so you can have an idea on how it looks like because i did that xD

Let's begin...

#### Question 1: How many Audit Failure events are there? (Format: Count of Events)

To answer this question, we cannot simply use the `cat` command to output the content of the file and then filter the results with `grep`. Instead, we can directly filter the `Audit Failure` events and count the number of lines using the `wc -l` tool, which will return the total number of occurrences.

The command to achieve this is as follows: `cat BTLO_Bruteforce_Challenge.csv | grep 'Audit Failure' | wc -l`

![Question 1](/blog-images/BTLO/bruteforce/q1.PNG)

This will count the number of `Audit Failure` events in the provided CSV file.

#### Question 2: What is the username of the local account that is being targeted? (Format: Username)

Well, according to the challenge, this is a Windows machine, so we have an idea of what to grep, such as `C:\Users\`, `Account Name`, etc. We also need to look for audit alerts generated when the user was targeted. I filtered by the `Account Name` and found the targeted account.

The filter I used is:
`cat BTLO_Bruteforce_Challenge.csv | grep -E 'Audit Failure' | head -n 10`

I used `head -n 10` to filter the top 10 results, as it's a good idea to reduce the amount returned, which might be too much and could fill up your terminal.

![Question 2](/blog-images/BTLO/bruteforce/q2.PNG)

#### Question 3: What is the failure reason related to the Audit Failure logs? (Format: String)

Since the question is asking for the `Failure Reason`, we can filter the entire keyword or just one part of it, which will likely return the answer. I chose to filter by the keyword `Failure`, as it should provide the necessary context for the failure reason.

The filter I used is:
`cat BTLO_Bruteforce_Challenge.csv | grep -E 'Failure' | head -n 10`

This will capture all lines related to the failure reason in the logs.

![Question 3](/blog-images/BTLO/bruteforce/q3.PNG)

#### Question 4: What is the Windows Event ID associated with these logon failures? (Format: ID)
Easy question! we can see the event ID from the picture above, but i hide it xD

#### Question 5: What is the source IP conducting this attack? (Format: X.X.X.X)

I was considering what to filter in my `grep` command, and since the question specifically asks for the source IP, I kept that as my second option if the first one didn't work out. I filtered based on the keyword `Address`, as it appeared to be relevant to the source IP in the logs.

The filter I used is:
`cat BTLO_Bruteforce_Challenge.csv | grep -E 'Address' | head -n 10`

This will capture the lines containing the `Address` field, which should provide the source IP.

![Question 5](/blog-images/BTLO/bruteforce/q3.PNG)

#### Question 6: What country is this IP address associated with? (Format: Country)

This answer is not available directly in the logs. We need to look up the IP address information on a service like ipinfo.io or any platform of your choice. I used ipinfo.io to look up the IP information. There are two options for this: use the terminal or open the URL and search for the IP.

- **Using the terminal**, you can run the following command: `curl -X GET https://ipinfo.io/113.161.192.227`
![Question 6](/blog-images/BTLO/bruteforce/q6.PNG)
- **Alternatively, use the web interface** by visiting [ipinfo.io](https://ipinfo.io/) and entering the IP address to get the country information.

![Question 6](/blog-images/BTLO/bruteforce/q6-also.PNG)

#### Question 7: What is the range of source ports that were used by the attacker to make these login requests? (LowestPort-HighestPort - Ex: 100-541)

To answer this question, we will use `grep` to filter based on the source port and then utilize `awk` to print only the relevant values. This is one of the reasons I prefer using the terminal. First, I sorted the ports and then used `tail` and `head` to capture the first and last port numbers.

The filter I used for the **LowestPort** is: `cat BTLO_Bruteforce_Challenge.csv | grep -E 'Source Port' | awk '{print $3}' | sort -n | head -n 5`

Then, for the **HighestPort**, I used the following filter: `cat BTLO_Bruteforce_Challenge.csv | grep -E 'Source Port' | awk '{print $3}' | sort -n | tail -n 1`

This allowed me to identify the range of ports used by the attacker.

![Question 7](/blog-images/BTLO/bruteforce/q7.PNG)

#### Takeaway

Mastering the use of tools like `grep`, `awk`, and sorting techniques in the terminal is key to efficiently analyzing logs and identifying important details during security investigations. These skills are invaluable for both troubleshooting and security analysis tasks.
