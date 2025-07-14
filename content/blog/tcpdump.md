---
title: "Mastering TCPdump"
date: 2025-03-11
description: "This guide demonstrates how to use tcpdump to analyze and capture network traffic"
image: /tcpdump/tcpdump.png
category: "Network Traffic"
---

### TCPdump

Let's look at what [TCPdump](https://www.tcpdump.org/index.html#documentation) is and how we can utilize it to capture and analyze our network traffic in real time.
[TCPdump](https://www.tcpdump.org/index.html#documentation) is a tool used to capture and analyze network traffic on a computer or network. It lets you see the data that is being sent and received over a network in real time. You can think of it like a "network detective" that listens to the data packets moving through the network, helping you troubleshoot issues or understand how data flows.

It shows information like:

- The source and destination of the data.
- What type of data is being sent (e.g., web browsing, email, etc.).
- Details about the network connections.

#### Tips For Analysis
Here is a list of questions to guide you through the analysis process and help you stay focused.

1. What type of traffic do you see? (protocol, port, etc.)
2. Are there multiple conversations? (How many?)
3. How many unique hosts are involved?
4. What is the timestamp of the first conversation in the pcap (TCP traffic)?
5. What traffic can I filter out to clean up my view?
6. Who are the servers in the PCAP? (Identify those on well-known ports, like 53, 80, etc.)
7. What records were requested or methods used? (GET, POST, DNS A records, etc.)

### Basic Capture Options
Here is a table of common Tcpdump switches that allow us to customize our captures. These switches can be combined to adjust how the tool displays output in STDOUT and what is stored in the capture file. While this is not an exhaustive list, it covers the most frequently used and useful options.

| Parameter         | Explanation                                                       |
|-------------------|-------------------------------------------------------------------|
| `-i <interface>`   | Specifies the network interface to capture traffic from.         |
| `-n`               | Disables hostname resolution.                                    |
| `-v`               | Provides more detailed output.                                   |
| `-vv`              | Gives even more verbose output (more packet details).            |
| `-X`               | Displays the packet contents in both hex and ASCII format.       |
| `-c <count>`       | Captures a specific number of packets and then stops.            |
| `-w <file>`        | Writes the captured packets to a file for later analysis.        |
| `-r <file>`        | Reads packets from a file instead of live capture.               |
| `-s <snaplen>`     | Defines the snapshot length (how much of each packet to capture).|
| `-nn`              | Do not resolve hostnames or well-known ports.                    |
| `-t`               | Disables timestamp display on packets.                           |
| `-A`               | Prints packet data in ASCII format.                              |
| `-B <buffer_size>` | Specifies the buffer size for packet capture.                    |
| `-l`               | Enables line buffering (useful when output is being piped).      |
| `-f <expression>`  | Applies a filter expression to capture only specific traffic.    |
| `-e`               | Displays the link-layer header information.                      |
| `-T <type>`        | Specifies the output format (e.g., `json`, `pcap`, etc.).         |

Before we begin, it's important to understand the structure of a pcap file.
![default capture](/blog-images/tcpdump/st1.PNG)

### Structure of the TCPdump Capture

- **Timestamp (Light Green Text)**:  
  - Indicates when the packet was captured.

- **Source and Destination Addresses (Yellow Text)**:  
  - The source address always comes first, followed by the destination address.

- **TCP Flags, Sequence and Acknowledgment Numbers (Blue Text)**:  
  - Displays the flags, sequence numbers, and acknowledgment numbers used in the TCP connection. These are typically used to track the flow of data and ensure proper delivery of packets.


# TCP Flags Explanation

- **Flags [S]**:  
  - **SYN (Synchronize)**  
  - Used to initiate a TCP connection. It's part of the three-way handshake that establishes a connection between the client and server.

- **Flags [S.]**:  
  - **SYN-ACK**  
  - The SYN flag is set to initiate the connection, and the ACK flag is set to acknowledge the reception of the previous SYN packet.

- **Flags [.]**:  
  - **ACK (Acknowledgment)**  
  - The ACK flag is set to acknowledge the receipt of data. After the initial handshake, every subsequent packet (unless it carries data) usually has the ACK flag set.

Lets begin exploring the command filtering options which are use in tcpdump
#### Host Filtering 
# Traffic Analysis in the Captured PCAP File
I already have my captured PCAP file, which I will be using throughout the write-up.
The following protocols and activities were observed during the packet capture:

1. **SSH (Secure Shell)**  
   - Multiple login attempts were made, with at least two failed login attempts followed by a successful login.

2. **HTTP/HTTPS (Hypertext Transfer Protocol / Hypertext Transfer Protocol Secure)**  
   - The following websites were accessed through the browser:
     - [http://www.vapidlabs.com/](http://www.vapidlabs.com/)
     - [https://tryhackme.com/](https://tryhackme.com/)

3. **SMB (Server Message Block)**  
   - A connection was established to the SMB share:  
     `smb://192.168.10.6/sambashare`

4. **SCP (Secure Copy Protocol)**  
   - A file transfer occurred via SCP:  
     `scp secrets.txt remnux@192.168.10.4:/home/remnux/Desktop`

5. **ICMP (Internet Control Message Protocol)**  
   - A series of ICMP Echo Request messages (ping) was sent:  
     `ping -c 10 192.168.10.4`

6. **FTP (File Transfer Protocol)**  
   - An FTP connection was established to the server at:  
     `ftp 192.168.10.6`

# Identifying Available Network Interfaces

Before starting a capture with tcpdump, it's important to know the network interface names available on your system. You can achieve this by using the following command: `tcpdump -D` This command will list all the available network interfaces, showing their names and status. Here is an example output:
```plaintext 
tcpdump -D
1.enp0s3 [Up, Running, Connected]
2.any (Pseudo-device that captures on all interfaces) [Up, Running]
3.lo [Up, Running, Loopback]
4.enp0s8 [Up, Disconnected]
5.bluetooth-monitor (Bluetooth Linux Monitor) [Wireless]
6.nflog (Linux netfilter log (NFLOG) interface) [none]
7.nfqueue (Linux netfilter queue (NFQUEUE) interface) [none]
8.dbus-system (D-Bus system bus) [none]
9.dbus-session (D-Bus session bus) [none]
```
The interfaces that are available and running are indicated by the `Running` keyword. These are the interfaces you can use for capturing traffic.

#### Host Filter
We use a host filter with tcpdump in traffic analysis to capture packets specifically from or to a particular IP address, helping to focus on relevant traffic and reduce the amount of data being analyzed.
```plaintext
sudo tcpdump -i enp0s3 host 192.168.10.4
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on enp0s3, link-type EN10MB (Ethernet), capture size 262144 bytes
04:08:36.214620 IP remnux > 192.168.10.6: ICMP echo request, id 5, seq 1, length 64
04:08:36.215065 IP 192.168.10.6 > remnux: ICMP echo reply, id 5, seq 1, length 64
04:08:36.216006 IP remnux.44741 > 172.16.116.14.domain: 7494+ [1au] PTR? 6.10.168.192.in-addr.arpa. (54)
04:08:36.328468 IP 172.16.116.14.domain > remnux.44741: 7494 NXDomain* 0/1/1 (121)
04:08:36.328708 IP remnux.44741 > 172.16.116.14.domain: 7494+ PTR? 6.10.168.192.in-addr.arpa. (43)
04:08:36.331392 IP 172.16.116.14.domain > remnux.44741: 7494 NXDomain* 0/1/0 (110)
04:08:36.332403 IP remnux.60606 > 172.16.116.14.domain: 36932+ [1au] PTR? 4.10.168.192.in-addr.arpa. (54)
```
We use the above command to capture traffic to and from the IP address `192.168.10.5` on the network interface `eth0`.It filters the capture to show only packets involving that specific host, making it useful for monitoring or troubleshooting network communication with a particular device.Using `sudo` ensures the necessary permissions to capture traffic on the network interface

**Note: tcpdump resolves ip address by default, so in other to get the ip address and ports we use `-nn` parameter**
#### default capture.
```plaintext
tcpdump -c 1 -Xr capture.pcap tcp 
reading from file capture.pcap, link-type EN10MB (Ethernet), snapshot length 262144
19:16:03.006812 IP ubuntu.49778 > 191.144.160.34.bc.googleusercontent.com.https: Flags [S], seq 1754762058, win 64240, options [mss 1460,sackOK,TS val 374620885 ecr 0,nop,wscale 7], length 0
	0x0000:  4500 003c 0b82 4000 4006 b12c c0a8 0a06  E..<..@.@..,....
	0x0010:  22a0 90bf c272 01bb 6897 8b4a 0000 0000  "....r..h..J....
	0x0020:  a002 faf0 7e3c 0000 0204 05b4 0402 080a  ....~<..........
	0x0030:  1654 42d5 0000 0000 0103 0307            .TB.........
```
Note: i use `-c` to display only 1 packet  and `X` for Displaying the packet contents in both hex and ASCII format. Its worthy noting that the best practice is to combines the parameters with just a single dash 
 #### with `-nn` parameter 
 ```plaintext
 tcpdump -c 1 -Xnnr capture.pcap tcp 
reading from file capture.pcap, link-type EN10MB (Ethernet), snapshot length 262144
19:16:03.006812 IP 192.168.10.6.49778 > 34.160.144.191.443: Flags [S], seq 1754762058, win 64240, options [mss 1460,sackOK,TS val 374620885 ecr 0,nop,wscale 7], length 0
	0x0000:  4500 003c 0b82 4000 4006 b12c c0a8 0a06  E..<..@.@..,....
	0x0010:  22a0 90bf c272 01bb 6897 8b4a 0000 0000  "....r..h..J....
	0x0020:  a002 faf0 7e3c 0000 0204 05b4 0402 080a  ....~<..........
	0x0030:  1654 42d5 0000 0000 0103 0307            .TB.........
```
You see the host is not resolved here 

## Filtering and Advanced Syntax Options
Using advanced filtering options, as outlined below, allows us to limit the amount of traffic captured and outputted, reducing both disk space usage and buffer processing time. These filters, when combined with standard tcpdump syntax, help make data capture more efficient.
### **TCPDump Filters**

| **Filter** | **Result** |
| --- | --- |
| **host** | Filters traffic involving the designated host, bi-directional. |
| **src / dest** | Used to designate a source or destination host or port. |
| **net** | Filters traffic sourced from or destined to the specified network, using CIDR notation (e.g., `192.168.10.0/24`). |
| **proto** | Filters for a specific protocol type, such as ether, TCP, UDP, and ICMP. |
| **port** | Bi-directional filter that captures traffic with the specified port as the source or destination. |
| **portrange** | Filters traffic within a specified range of ports (e.g., `0-1024`). |
| **less / greater "< >"** | Used to filter packets of a specific size, for example, to look for larger packets. |
| **and / &&** | Combines two filters, such as filtering traffic from a specific source host *and* a specific port. |
| **or** | Allows a match on either of two conditions; both do not need to be true. |
| **not** | Excludes a specific filter condition; for example, `not UDP` will exclude UDP traffic. |


### Source/Destination Filter
The `src` and `dst` filters help narrow down traffic based on source and destination IP addresses. For example, in an incident where a host is contacting an external server, you can use these filters to isolate the traffic based on the source (the host) or the destination (the external server) to investigate the connection.
lets say we want to filter `ssh` traffic that only originates from `192.168.10.4` host

```plaintext
tcpdump -c 2 -Xnnr capture.pcap src 192.168.10.4 and port 22
reading from file capture.pcap, link-type EN10MB (Ethernet), snapshot length 262144
19:19:36.012069 IP 192.168.10.4.22 > 192.168.10.6.45918: Flags [S.], seq 2051875392, ack 3766583352, win 65160, options [mss 1460,sackOK,TS val 2906562838 ecr 4023072618,nop,wscale 7], length 0
	0x0000:  4500 003c 0000 4000 4006 a561 c0a8 0a04  E..<..@.@..a....
	0x0010:  c0a8 0a06 0016 b35e 7a4d 2240 e081 8038  .......^zM"@...8
	0x0020:  a012 fe88 8dc4 0000 0204 05b4 0402 080a  ................
	0x0030:  ad3e a116 efcb 376a 0103 0307            .>....7j....
19:19:36.016286 IP 192.168.10.4.22 > 192.168.10.6.45918: Flags [.], ack 43, win 509, options [nop,nop,TS val 2906562842 ecr 4023072622], length 0
	0x0000:  4500 0034 a844 4000 4006 fd24 c0a8 0a04  E..4.D@.@..$....
	0x0010:  c0a8 0a06 0016 b35e 7a4d 2241 e081 8062  .......^zM"A...b
	0x0020:  8010 01fd b8ea 0000 0101 080a ad3e a11a  .............>..
	0x0030:  efcb 376e                                ..7n
```
### Using tcpdump Filters for Traffic Analysis

In tcpdump, we can use various logical operators to refine the capture and focus on specific traffic. Below are some common operations:
- **`and`**:  
  - Used to filter traffic between two specific hosts.  
  - **Example**: To capture traffic where the source is `192.168.10.4` and the destination is `192.168.10.6`, use:  
    ```plaintext
    tcpdump -r capture.pcap src 192.168.10.4 and dst 192.168.10.6
    ```
- **`or`**:  
  - Used to capture traffic from either of two specific protocols or ports.  
  - **Example**: To capture traffic from either HTTP (port 80) or HTTPS (port 443), use:  
    ```plaintext
    tcpdump -r capture.pcap port 80 or port 443
    ```
- **`not`**:  
  - Used to exclude specific types of traffic.  
  - **Example**: To exclude ICMP traffic, use:  
    ```plaintext
    tcpdump -r capture.pcap not icmp
    ```
These operations help refine your capture to focus on relevant traffic, making analysis more efficient.

### Using Destination in Combination with the Net Filter
When analyzing traffic destined to a specific network, we can use the `net` keyword along with `CIDR` notation to capture all traffic within that network. For example, to capture all traffic destined for the `192.168.10.0/32` network, you can use the net filter. This is particularly useful in incident response when trying to determine how many hosts have been infected or have contacted a specific domain or `Command and Control` (C2) server
```plaintext
tcpdump -c 3 -r capture.pcap dst net 192.168.10.0/24
reading from file capture.pcap, link-type EN10MB (Ethernet), snapshot length 262144
19:15:51.863677 ARP, Request who-has 192.168.10.5 tell ubuntu, length 28
19:15:52.870443 ARP, Request who-has 192.168.10.5 tell ubuntu, length 28
19:15:53.895563 ARP, Request who-has 192.168.10.5 tell ubuntu, length 28
```
The above command will help you identify all the nodes that the traffic is destined for. This filter can leverage both the common protocol name or the protocol number for any IP, IPv6, or Ethernet protocol. For instance, you can use `tcp[6]`, `udp[17]`, or `icmp[1]` to specify different protocols. We can take a look at this [resource](https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml) for a helpful list covering protocol numbers.

#### UDP Traffic only 
```plaintext
 tcpdump -c 3 -r capture.pcap udp
reading from file capture.pcap, link-type EN10MB (Ethernet), snapshot length 262144
19:16:02.991906 IP ubuntu.37689 > 172.16.116.14.domain: 15860+ [1au] A? content-signature-2.cdn.mozilla.net. (64)
19:16:02.992197 IP ubuntu.47563 > 172.16.116.14.domain: 27504+ [1au] AAAA? content-signature-2.cdn.mozilla.net. (64)
19:16:02.994957 IP 172.16.116.14.domain > ubuntu.37689: 15860 3/4/9 CNAME content-signature-chains.prod.autograph.services.mozaws.net., CNAME prod.content-signature-chains.prod.webservices.mozgcp.net., A 34.160.144.191 (521)
```
#### TCP Traffic only 
```plaintext
tcpdump -c 3 -nnr capture.pcap tcp
reading from file capture.pcap, link-type EN10MB (Ethernet), snapshot length 262144
19:16:03.006812 IP 192.168.10.6.49778 > 34.160.144.191.443: Flags [S], seq 1754762058, win 64240, options [mss 1460,sackOK,TS val 374620885 ecr 0,nop,wscale 7], length 0
19:16:03.037885 IP 34.160.144.191.443 > 192.168.10.6.49778: Flags [S.], seq 224202, ack 1754762059, win 32768, options [mss 1460], length 0
19:16:03.037934 IP 192.168.10.6.49778 > 34.160.144.191.443: Flags [.], ack 1, win 64240, length 0
```

# Filtering Traffic Based on Protocol Numbers

In tcpdump, we can filter traffic based on protocol numbers using the `proto` parameter. This allows us to focus on specific protocols and capture only the relevant traffic. Below are some common protocol filters:

- **UDP**:  
  - **Example**: To filter UDP traffic, use:  
    ```plaintext
    tcpdump -r capture.pcap proto 17
    ```
- **TCP**:  
  - **Example**: To filter TCP traffic, use:  
    ```plaintext
    tcpdump -r capture.pcap proto 6
    ```
- **ICMP**:  
  - **Example**: To filter ICMP traffic, use:  
    ```plaintext
    tcpdump -r capture.pcap proto 1
    ```
### Port Range Filter
# Filtering Traffic Based on Port Range

In certain situations, you may want to filter traffic based on a specific range of ports, especially when you're interested in well-known ports. Instead of displaying traffic for all ports, you can use the `portrange` parameter to focus on a particular range.

- **Example**: To capture traffic within the port range `0-1024`, use the following command:  
  ```plaintext
  tcpdump -r capture.pcap portrange 0-1024
```
Additionally, you can combine the portrange filter with the greater or less parameters to detect anomalies or infiltration attempts in your network. For example, if you're looking for large packets within well-known ports, you can filter traffic with a packet size greater than 1000 bytes in the 0-1024 port range:

- **Example**: To capture packets larger than 1000 bytes within the port range 0-1024, use
```plaintext 
tcpdump -r capture.pcap portrange 0-1024 and greater 1000
```
This approach helps identify potential infiltrations by flagging unusually large packets on commonly used ports, which can be indicative of suspicious activity.

### Tips and Tricks
if we look at how this command `tcpdump -c 4 -nnAr capture.pcap port 443` 
```plaintext
tcpdump -c 4 -nnAr capture.pcap port 443
reading from file capture.pcap, link-type EN10MB (Ethernet), snapshot length 262144
19:16:03.006812 IP 192.168.10.6.49778 > 34.160.144.191.443: Flags [S], seq 1754762058, win 64240, options [mss 1460,sackOK,TS val 374620885 ecr 0,nop,wscale 7], length 0
E..<..@.@..,..
."....r..h..J........~<.........
.TB.........
19:16:03.037885 IP 34.160.144.191.443 > 192.168.10.6.49778: Flags [S.], seq 224202, ack 1754762059, win 32768, options [mss 1460], length 0
E..,......g.".....
....r..k.h..K`...v*........
19:16:03.037934 IP 192.168.10.6.49778 > 34.160.144.191.443: Flags [.], ack 1, win 64240, length 0
E..(..@.@..?..
."....r..h..K..k.P...~(..
19:16:03.038343 IP 192.168.10.6.49778 > 34.160.144.191.443: Flags [P.], seq 1:221, ack 1, win 64240, length 220
E.....@.@..b..
."....r..h..K..k.P..................8...{#..F.....).$..F?..".eDq.1.=....+./.....,.0.
.	........./.5.......(.&..#content-signature-2.cdn.mozilla.net..........
.
.................#.........h2.http/1.1.............................................@.
```
Notice how it has the ASCII values shown below each output line because of our use of -A. This can be helpful when quickly looking for something human-readable in the output.

### Piping a Capture to Grep
Lets extract info in our ASCII vallues
![tips](/blog-images/tcpdump/t.PNG)

Using `-l` in this way allowed us to examine the capture quickly and grep for keywords or formatting we suspected could be there. In this case, we used the `-l` to pass the output to grep and looking for any instance of the phrase `*.txt`. This shows us every line with our search in it, and we can see the results above. Using modifiers and redirecting output can be a quick way to scrape websites for email addresses, naming standards, and much more.

| **Link** | **Description** |
| --- | --- |
| [IP Protocol](https://tools.ietf.org/html/rfc791) | `RFC 791` describes IP and its functionality. |
| [ICMP Protocol](https://tools.ietf.org/html/rfc792) | `RFC 792` describes ICMP and its functionality. |
| [TCP Protocol](https://tools.ietf.org/html/rfc793) | `RFC 793` describes the TCP protocol and how it functions. |
| [UDP Protocol](https://tools.ietf.org/html/rfc768) | `RFC 768` describes UDP and how it operates. |
| [RFC Quick Links](https://en.wikipedia.org/wiki/List_of_RFCs#Topical_list) | This Wikipedia article contains a large list of protocols tied to the RFC that explains their implementation. |

### Conclusion

This overview covers the basics of **tcpdump**, providing an introduction to its capabilities. For more in-depth knowledge and advanced usage, I recommend exploring the official documentation. I hope you found this write-up informative and enjoyable.
