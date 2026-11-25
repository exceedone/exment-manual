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


[←Back to list of additional settings](/quickstart_more)
