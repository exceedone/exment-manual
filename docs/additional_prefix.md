# Change / delete "admin" included in URL
By default, Exment includes the path "admin" in the URL.  
Example： http://localhost/admin  

Without "admin" ([http://localhost](http://localhost)), the following page will be displayed. This is the specification of the framework used.  
![Prefix change](img/quickstart/route_prefix1.png)  
By this specification, it is possible to build another site that can be viewed by general users who do not need to log in, if the URL does not have "admin".  
  
However, in some cases, there are also the following cases.  

1. If you want to configure Exment alone. When displaying Exment with a URL without "admin"
1. If you want to change the path name "admin"

Here are the steps for these cases.

### Change procedure

- In the root directory of Exment, open the ".env" file.

- Add one of the following values:

~~~
### 1.If you want to completely delete "admin"
ADMIN_ROUTE_PREFIX=
# "http://localhost" becomes the URL of Exment

### 2.To change "admin" to another name
ADMIN_ROUTE_PREFIX=admin184628
# "http://localhost/admin184628" becomes the URL of Exment
~~~

### URLs after changing or removing "admin"
If you change or remove "admin", **all Exment URLs change, including the API and login callbacks**, not only the screen URLs.  
Also update the URLs registered in other systems (API authentication and execution, SSO callback URLs, LINE Webhook URL, plugin URLs, etc.).

| Usage | Default (admin) | "admin" removed | Changed to "admin184628" |
| ---- | ---- | ---- | ---- |
| Login screen | (Exment URL)/admin/auth/login | (Exment URL)/auth/login | (Exment URL)/admin184628/auth/login |
| API token | (Exment URL)/admin/oauth/token | (Exment URL)/oauth/token | (Exment URL)/admin184628/oauth/token |
| API execution | (Exment URL)/admin/api/data/(table name) | (Exment URL)/api/data/(table name) | (Exment URL)/admin184628/api/data/(table name) |
| API app setting | (Exment URL)/admin/api_setting | (Exment URL)/api_setting | (Exment URL)/admin184628/api_setting |
| SSO (OAuth) callback | (Exment URL)/admin/auth/login/(provider name)/callback | (Exment URL)/auth/login/(provider name)/callback | (Exment URL)/admin184628/auth/login/(provider name)/callback |
| Plugin (page) | (Exment URL)/admin/plugins/(URL) | (Exment URL)/plugins/(URL) | (Exment URL)/admin184628/plugins/(URL) |

※This manual describes URLs with the default setting, which includes "admin". If you have changed or removed "admin", replace "admin" in the URLs of this manual with your value (if removed, omit "/admin").  


[←Back to list of additional settings](/quickstart_more)