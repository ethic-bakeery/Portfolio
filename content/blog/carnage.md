---
title: "Carnage"
date: 2024-01-16
category: "Wireshark"
description: "Apply your analytical skills to analyze the malicious network traffic using Wireshark"
image: "/carnage/carnage.png"
---

# Investigation Report: Malicious Activity Analysis
### ROOM
[TrHackMe Carnage Room](https://tryhackme.com/r/room/c2carnage)

### Scenario
Eric Fischer, from the Purchasing Department at [Brad Duncan](https://www.malware-traffic-analysis.net/), received an email from a known contact with a Word document attachment. Upon opening the document, he accidentally clicked on "Enable Content." Soon after, the **SOC Department** received an alert from the endpoint agent, indicating that Eric's workstation was making suspicious outbound connections. A **PCAP (Packet Capture)** file was retrieved from the network sensor and handed to the security team for analysis.

This report details the analysis of the PCAP file, focusing on uncovering any malicious activities associated with the incident.

#### Credit
- The PCAP file was captured and shared by **Brad Duncan** and is credited for providing valuable insight to the InfoSec community.

### Note:
- **Do not directly interact with any domains and IP addresses in this challenge**.

### Objective
- Investigate the packet capture and identify any malicious activities, specifically focusing on suspicious connections made by Eric's workstation.

### Answering the Questions

#### Question: What was the date and time for the first HTTP connection to the malicious IP? (Answer format: yyyy-mm-dd hh:mm:ss)

To answer this question, we can filter the traffic to display only HTTP requests and identify the first one. However, by default, Wireshark uses a time format that might not be easily readable. To align with the specified format in the challenge, we need to adjust the time column to match the required format.

#### Step 1: Change the Time Format
1. Go to the **View** tab in Wireshark.
![View Tap](/blog-images/carnage/q1-st1.png)
2. Click on **Reference**, then select **Columns**.
3. Change the **Time** format to match the format requested in the challenge (the TryHackMe time format).
   
   ![Time Column Settings](/blog-images/carnage/q1-st2.png)

4. Click **OK** to save the changes.

##### Step 2: Filter HTTP Traffic
Once the time format has been updated, filter the traffic to show only HTTP requests. You can do this by entering `http` in the search bar.

   ![Filter HTTP Requests](/blog-images/carnage/q1-ans.png)

##### Answer:
The date and time for the first HTTP connection to the malicious IP was:  
**2021-09-24 16:44:38**

#### Question: What is the name of the zip file that was downloaded?

As shown in the image above, we have already found the relevant information. However, to streamline the process and make the search more efficient, we can use an advanced filter to search for HTTP requests containing `.zip` files. To quickly identify the `.zip` file, apply the following filter: `http.request.url contains ".zip"`

![zip file](/blog-images/carnage/q2-also.png)

This filter will narrow down the results to only those HTTP requests whose URLs contain .zip, making it easier to pinpoint the file in question.While there are various methods to extract this information, using this search filter provides the quickest and most efficient approach.


##### Answer:
The date and time for the first HTTP connection to the malicious IP was:  
**documents.zip**

#### Question: Identifying the Domain Hosting the Malicious ZIP File

This question asks us to identify the domain hosting the `document.zip` file. While we already know the IP address, the task is to resolve this IP to its corresponding domain name.

Thankfully, Wireshark provides a feature called *Resolve Network Address*, which automatically resolves IP addresses to their associated domain names.

#### Step 1: Enabling Name Resolution in Wireshark

To resolve the IP address to a domain name, follow these steps:

- Navigate to the **View** tab in Wireshark.
- Select **Name Resolution** from the dropdown menu.
- Check the option **Resolve Network Addresses**.

After doing so, Wireshark will attempt to resolve the IP addresses in the capture to their corresponding domain names.

![VIEW Tab](/blog-images/carnage/q3-step2.png)

#### Step 2: View the Resolved Domain Name

Once the network addresses are resolved, you will see the IP address translated into its domain name in the packet details.

![Resolved IP](/blog-images/carnage/q3.png)

#### Answer:
The domain hosting the malicious ZIP file is:  
**attirenepal.com**

#### Question: Without Downloading the File, What is the Name of the File in the ZIP File?

To answer this question without directly downloading the file, we can export the file from the packet capture and then examine its contents.

#### Step 1: Exporting the File from Wireshark

1. Open Wireshark and go to the **File** menu.
2. Select **Export Objects** from the dropdown menu.

![File](/blog-images/carnage/q4-step1.png)

3. In the dialog that appears, select the **HTTP** protocol (since the file was transferred over HTTP).
4. Locate the `document.zip` file in the list of HTTP objects.

![ZIP File](/blog-images/carnage/q4-step.png)

#### Step 2: Saving and Extracting the ZIP File

1. Click on **Save** to store the file in a folder of your choice.
2. Once saved, navigate to the folder where you saved the ZIP file and extract its contents.

![Extract ZIP File](/blog-images/carnage/q4.png)

After extracting the ZIP file, you can view its contents.

#### Answer:
The content of the ZIP file is:  
**chart-1530076591.xls**

#### Question: What is the Name of the Webserver of the Malicious IP from Which the ZIP File Was Downloaded?

To answer this question, we need to inspect the HTTP stream of the `document.zip` traffic. The webserver information can typically be found in the HTTP headers.

#### Step 1: Viewing the HTTP Stream

1. Right-click on the relevant HTTP traffic related to the `document.zip` download.
2. From the context menu, select **Follow** and then choose **HTTP Stream**.

![Follow](/blog-images/carnage/q5-step1.png)

This will open a window displaying the entire HTTP conversation for the `document.zip` request and response.

#### Step 2: Identifying the Webserver

In the HTTP stream, look for the **Server** header. This header will typically contain the name and version of the webserver hosting the file.

![HTTP Stream](/blog-images/carnage/q5-step1.png)

#### Answer:
The webserver name is:  
**LiteSpeed**

#### Question. What is the version of the webserver from the previous question?
From the above image we can see the webserver version.

#### Answer:
The webserver version is:  
**PHP/7.2.34**

#### Question. Malicious files were downloaded to the victim host from multiple domains. What were the three domains involved with this activity?
I had to use the hint, which says, "`Check HTTPS traffic. Narrow down the timeframe from 16:45:11 to 16:45:30`." That's a very good hint, isn't it? Then, I crafted this query: `tcp.port == 443 && frame.time >= "2021-09-24 16:45:11" && frame.time <= "2021-09-24 16:45:30" && tls.handshake.extensions_server_name`

![Filter](/blog-images/carnage/q6.png)

### Wireshark Display Filter Breakdown
This Wireshark display filter is used to show specific types of network traffic. Let's break it down:

1. **`tcp.port == 443`**:
    - This part filters the packets to show only those using TCP port 443. Port 443 is commonly used for **HTTPS** traffic, which is secure web traffic (for websites you visit with "https://").
  
2. **`frame.time >= "2021-09-24 16:45:11" && frame.time <= "2021-09-24 16:45:30"`**:
    - This part focuses on packets that were captured between **16:45:11 and 16:45:30** on **September 24, 2021**. given in the Hnt
    - It's useful when you want to zoom in on a specific time frame and examine what happened during that exact period.
  
3. **`tls.handshake.extensions_server_name`**:
    - This part looks at a specific field in the **TLS handshake** (the beginning of a secure HTTPS connection). 
    - The **Server Name Indication (SNI)** is included in the handshake and tells the server which **website domain** the client wants to connect to.
    - This filter helps you see which website (domain name) the client is trying to reach during the secure connection setup.


#### Answer:
The three domains involved are:  
**finejewels.com.au, thietbiagt.com, new.americold.com**

#### Question : Which Certificate Authority Issued the SSL Certificate to the First Domain from the Previous Question?

To answer this question, we need to examine the SSL/TLS certificate information in the HTTP stream.

#### Step 1: Viewing the HTTP Stream

1. Right-click on the relevant HTTP traffic related to the domain in question.
2. From the context menu, select **Follow** and then choose **HTTP Stream**.

#### Step 2: Identifying the Certificate Authority

In the HTTP stream, look for the certificate details. The **Certificate Authority (CA)** is usually listed in the response headers, often under the **Issuer** field or explicitly stated in the certificate chain.

In this case, the certificate issuer is clearly listed as **GoDaddy Secure Certificate Authority**.

![GoDaddy Cert](/blog-images/carnage/q7.png)

#### Answer:
The certificate authority that issued the SSL certificate is:  
**GoDaddy**

#### Question: What are the two IP addresses of the Cobalt Strike servers? Use VirusTotal (the Community tab) to confirm if IPs are identified as Cobalt Strike C2 servers. (answer format: enter the IP addresses in sequential order)

To answer this question, we need to identify the malicious IP addresses that contacted our server and confirm whether they are associated with Cobalt Strike servers using VirusTotal.

#### Step 1: Identify Malicious IPs

First, we will filter the traffic to identify the malicious IP addresses that have made connections to our server. To do this, use Wireshark’s filter feature.

![Filter malicious IPs](/blog-images/carnage/q9.png)

The IP addresses listed in the screenshot above are suspected to be malicious. We will now look up each IP on VirusTotal to confirm whether they are Cobalt Strike command-and-control (C2) servers.

#### Step 2: Look Up IPs on VirusTotal

- **IP 1: 185.106.96.158**

  When we look up this IP address on VirusTotal, we can see in the community section that this IP is identified as a Cobalt Strike server.

  ![IP1](/blog-images/carnage/q9-st1.png)

- **IP 2: 185.125.204.174**

  Similarly, this IP is also flagged on VirusTotal as a Cobalt Strike server.

  ![IP2](/blog-images/carnage/q9-st2.png)

#### Answer:
The two Cobalt Strike server IP addresses are:  
**185.106.96.158, 185.125.204.174**

#### Question: What is the Host header for the first Cobalt Strike IP address from the previous question?
Frome the above first picture we can see the Host Header
#### Answer:
The First Cobalt Strike server Header is:  
**ocsp.verisign.com**

#### Question: What is the domain name for the first IP address of the Cobalt Strike server? You may use VirusTotal to confirm if it's the Cobalt Strike server (check the Community tab).
In the First Image we can see the domain name as well
![Domain](/blog-images/carnage/q10.png)
#### Answer:
The First Cobalt Strike server domain name is:  
**survmeter.live**

#### Question: What is the domain name of the second Cobalt Strike server IP?  You may use VirusTotal to confirm if it's the Cobalt Strike server (check the Community tab).
![IP2](/blog-images/carnage/q9-st2.png)
#### Answer:
The second Cobalt Strike server domain name is:  
**securitybusinpuff.com**

#### What is the domain name of the post-infection traffic?
The Hint says: `Filter Post HTTP traffic`. Ahha Interesting. i filtered the post request as `http.request.method=='POST'`and there we go...
![POST traffic](/blog-images/carnage/q13.png)

#### Answer:
The post traffic domain name is:  
**maldivehost.net**

#### Question: What are the first eleven characters that the victim host sends out to the malicious domain involved in the post-infection traffic?

Ahha, Bug bounty knowledge helped me here. Just right-click on the traffic and go to **HTTP stream** to see it clearly. Although it can be seen from the above picture, for better visibility, I recommend checking the HTTP stream.

![First eleven characters](/blog-images/carnage/q14.png)

#### Answer:
The first eleven characters are:  
**zLIisQRWZI9**

#### Question: What was the length for the first packet sent out to the C2 server?
We just simple filter the POST request as `http.request.method==POST` and look for the first request: 
![length of http req](/blog-images/carnage/q15.png)

#### Answer:
The Length of the first packet is:  
**281**

#### Question: What was the Server header for the malicious domain from the previous question?

From the image above, we can clearly see the server header.

![Header](/blog-images/carnage/q14.png)

#### Answer:
The Server header is:  
**Apache/2.4.49 (cPanel) OpenSSL/1.1.1l mod_bwlimited/1.4**

#### Question: The malware used an API to check for the IP address of the victim’s machine. What was the date and time when the DNS query for the IP check domain occurred? (answer format: yyyy-mm-dd hh:mm:ss UTC)

To answer this, we can use the "Find" filter with a regex search. Simply search for any domain containing "api."

![API](/blog-images/carnage/q17.png)
#### Answer:
The time is:  
**2021-09-24 17:00:04**
#### Question: What was the domain in the DNS query from the previous question?
From the above image
#### Answer:
The domain is:  
**api.ipify.org**


#### Question: Looks like there was some malicious spam (malspam) activity going on. What was the first MAIL FROM address observed in the traffic?

To find the first "MAIL FROM" address, we need to filter for SMTP (Simple Mail Transfer Protocol), which is used for transferring emails. I applied a simple filter for the protocol and then examined the traffic.

![MALSPAM](/blog-images/carnage/q18.png)

#### Answer:
The first mail that was sent is:  
**api.ipify.org**

#### Question: How many packets were observed for the SMTP traffic?

From the above picture the number of packets can be easily observed in Wireshark by looking at the packet count displayed at the bottom of the window. In the "Packet List" pane, you will find the total number of packets captured in the current session. 

#### Answer:
The number of packets are:
**1439**

### Summary

Congratulations on completing the challenge!

In this exercise, we explored various techniques for analyzing network traffic using Wireshark to uncover malicious activities. From filtering traffic based on protocols like HTTP and SMTP to resolving IP addresses and inspecting DNS queries, we learned how to identify suspicious patterns indicative of malware infections.

Happy learning and stay secure!
