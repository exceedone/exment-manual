# IP filter
This setting decides which IP addresses can access the Web pages and the API of Exment.

- You register only the IP addresses that are allowed (a white list).
- The addresses for the Web pages and for the API are registered separately. For example, you can "restrict the IP addresses only for the API".


### Setup steps
1. Set Exment to expert mode. If it is not in expert mode yet, open the ".env" file and add the following value.

~~~
EXMENT_EXPART_MODE=true
~~~

2. Open the System Setting screen. The "IP Filter Setting" items have been added.

![IP filter settings](img/quickstart/ip_filter.png)

#### Setting details

| What you want | How to enter it | Example |
| ---- | ---- | ---- |
| Allow one fixed IP address | Enter the IP address as it is | 123.4.5.6 |
| Allow a range of IP addresses | Enter it in subnet mask format | Example 1: 123.4.0.0/16 → access is allowed from 123.4.0.0 to 123.4.255.255<br>Example 2: 123.4.10.0/24 → access is allowed from 123.4.10.0 to 123.4.10.255 |
| Allow access from localhost on a server built on localhost | Enter "::1" | ::1 |
| Allow several IP addresses | Enter them on separate lines. Access is allowed when any one of them matches | |


#### Forcibly disable IP restrictions
These steps stop the IP restriction, for example when you set the IP addresses of the Web pages wrongly and can no longer access the site.

- Open the ".env" file and add the following value.

~~~
EXMENT_DISABLE_IP_FILTER=true
~~~


#### Users exempt from the IP filter (7.3.0)
From Exment 7.3.0 you can choose users who are exempt from the IP filter of the web pages, for example people who work from home or on a business trip.

- In System settings → [Advanced] → "IP Filter Setting", choose from the three items below. If nothing is chosen, nothing changes.

| Item | Who is exempt |
| ---- | ---- |
| Exempt users (web pages) | The chosen users |
| Exempt organizations (web pages) | The users of the chosen organizations and of the organizations below them |
| Exempt role groups (web pages) | The users of the chosen role groups (as a user or through an organization) |

- Only the web pages are affected. The API, the API keys and MCP keep the IP filter for the API.
- When an exempt user works from an address that is not allowed, the login history records "Out of the IP filter (exempt)", once per session and address.
- When a user who is not exempt logs in from an address that is not allowed, the login is refused. The login history records only a failure ("out of the IP filter"). It is not counted as a success, and no new-IP-address notice is sent.
- The IT audit report has two sections: "Exempt from the IP filter" and "Uses from out of the IP filter".

> [!WARNING]
> **For administrators:** while at least one exemption is set, the following pages can be opened from IP addresses that are not allowed:
> - the login page (with its images)
> - the forgotten-password, password-reset and password-change pages
> - the SSO (OAuth, SAML) login and callback pages
>
> A user who is not exempt cannot get past the login. But the login page is visible and logins can be tried (the usual lockout settings apply). When no exemption is set, these pages stay closed from outside, as before.
>
> The install pages and the file share links stay closed from outside even when exemptions are set.


[←Back to list of additional settings](/quickstart_more)
