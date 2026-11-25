# Server external communication off
This setting stops communication from the Exment server to other servers.  
Use it in an environment that does not communicate with other servers, such as a completely on-premises environment.

Exment may communicate with other servers for the following purposes.

- To find out whether a newer version of Exment exists, it communicates with the package system and gets the latest version information.
- To show the "Exment new arrival information list" on the dashboard, it communicates with the official Exment site (exment.net) and gets the news.

### Setup steps 
> This procedure has been changed from v1.3.0.

1. From the left menu, open the "System Setting" screen.
2. In the list, set the "Perform server external communication" item to NO.  
![Server external communication off](img/quickstart/outside_api.png)
3. Save. The setting is now complete.


[←Back to list of additional settings](/quickstart_more)
