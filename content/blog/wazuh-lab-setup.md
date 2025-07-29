---
title: "Setup Wazuh Lab"
date: 2025-01-28
description: "Analyze Windows Security Event logs to investigate an attempted RDP brute-force attack."
image: /wazuh/wazuh.jpg
category: "Tooling"
---

### Requirements 
To install a Wazuh lab, certain requirements must be met as outlined on the official [Wazuh documentation site](https://documentation.wazuh.com/current/quickstart.html). Below are the key requirements:

![requirements](/blog-images/wazuh/req.png)

### Operating System
The central components of Wazuh require a 64-bit Intel or AMD Linux processor (x86_64/AMD64 architecture). Wazuh officially supports the following operating systems:
```
| **Operating System**            | **Supported Versions**                              |
|----------------------------------|----------------------------------------------------|
| **Amazon Linux**                | 2, 2023                                            |
| **CentOS**                      | 7, 8                                               |
| **Red Hat Enterprise Linux**    | 7, 8, 9                                            |
| **Ubuntu**                      | 16.04, 18.04, 20.04, 22.04, 24.04                  |
```
### Installing Wazuh
To perform a quick installation of Wazuh, you can use the Wazuh installation assistant. Execute the following command:

```bash
curl -sO https://packages.wazuh.com/4.10/wazuh-install.sh && sudo bash ./wazuh-install.sh -a
```

If the system does not meet the installation requirements, an error message will appear, as shown below:

![error](/blog-images/wazuh/error.PNG)

Once the installation is complete, the output will display access credentials and confirm a successful installation:

```plaintext
INFO: --- Summary ---
INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>
    User: admin
    Password: <ADMIN_PASSWORD>
INFO: Installation finished.
You now have installed and configured Wazuh.
```

Access the Wazuh web interface using the provided URL and credentials:
- **Username**: admin  
- **Password**: `<ADMIN_PASSWORD>`

Upon visiting the URL, you will see a login page:

![login](/blog-images/wazuh/login.PNG)

Enter your credentials to access the Wazuh dashboard.

### Wazuh Agent
The Wazuh agent is a lightweight software component installed on endpoints such as computers or servers. It collects data like logs, security events, and system activity, sending this information to the central Wazuh manager for analysis. This enables real-time monitoring, detection, and response to security incidents.

### Deploying the Wazuh Agent
1. On the Wazuh dashboard, click the three-line menu icon on the left-hand side and select **Summary**:

   ![summary](/blog-images/wazuh/summary.PNG)

2. Click on **Deploy new agent**. If agents are already deployed, you will see their status (e.g., active or disconnected):

   ![deploy](/blog-images/wazuh/diploy.PNG)

3. Fill in the required fields:

   ![Deploy new agent](/blog-images/wazuh/filldetails.PNG)
   ![Deploy new agent fields](/blog-images/wazuh/filldetails2.PNG)

   - Select the operating system of the endpoint (e.g., `DEB amd64` for Ubuntu).
   - Assign the Wazuh Manager IP address (e.g., `192.168.10.5`).
   - Optionally, specify an agent name.

4. Copy the generated command. For example:

   ```bash
   wget https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.10.1-1_amd64.deb \
   && sudo WAZUH_MANAGER='192.168.10.5' WAZUH_AGENT_NAME='ubuntu-server' dpkg -i ./wazuh-agent_4.10.1-1_amd64.deb
   ```

   ![Download](/blog-images/wazuh/run-command.PNG)

5. Once downloaded, configure the agent by editing the configuration file:

   ```bash
   sudo vim /var/ossec/etc/ossec.conf
   ```

   Add the Wazuh Manager IP address (e.g., `192.168.10.5`).

   ![edit server IP](/blog-images/wazuh/setup-server-ip.PNG)

6. Save the file and run the following commands to enable and start the Wazuh agent:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable wazuh-agent
   sudo systemctl start wazuh-agent
   ```

7. Verify the agent's status:

   ```bash
   sudo systemctl status wazuh-agent
   ```

   ![Successfully running](/blog-images/wazuh/agent-setup.PNG)

8. Navigate back to the Wazuh Manager dashboard. The agent should appear as active:

   ![Dashboard](/blog-images/wazuh/agent-show.PNG)

9. Click the agent name to view its events and additional details:

   ![Agent details](/blog-images/wazuh/scrolldown.PNG)

### Event Analysis and Compliance
1. On the agent detail page, explore compliance checks such as **PCI DSS**. You can simulate activity like SSH and FTP logins to generate events.

   - Simulate failed SSH login attempts:
     ![SSH Attack Simulation](/blog-images/wazuh/attacks.PNG)

   - Simulate FTP logins:
     ![FTP Login Simulation](/blog-images/wazuh/ftp-login.PNG)

2. Filter events by adjusting the time range (e.g., last 24 hours):

   ![Wazuh Logs](/blog-images/wazuh/wazuh-logs.PNG)

### Conclusion
Congratulations! You have successfully set up a Wazuh lab and captured security events. This environment is now ready for further exploration and analysis.
