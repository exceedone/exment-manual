# Change / delete "admin" included in URL
The value in front of the URLs of Exment (such as "/admin") is set by `ADMIN_ROUTE_PREFIX` in `.env`.

- **A site newly installed with v7.2.1 or later**: nothing by default. Example: http://localhost
- **A site installed with an older version**: "admin" (`ADMIN_ROUTE_PREFIX=admin`, or no setting and the old default). Example: http://localhost/admin . An update does not change it.

The URLs of this manual are for the default without a value. On a site with "admin" or another value, add it after the URL of the site (e.g. `(Exment URL)/auth/login` → `(Exment URL)/admin/auth/login`).

When installing, you can set it on the last page of the setup, "**Value in front of the URLs**" (empty for none; "admin" for the same as older versions). To change it later, edit `.env` as follows.

### Change procedure

- In the root directory of Exment, open the ".env" file.
- Write one of the following values:

~~~
### 1. Nothing in front (the default from v7.2.1)
ADMIN_ROUTE_PREFIX=
# "http://localhost" becomes the URL of Exment

### 2. "admin" (the same as a site of an older version)
ADMIN_ROUTE_PREFIX=admin
# "http://localhost/admin" becomes the URL of Exment

### 3. Another name
ADMIN_ROUTE_PREFIX=admin184628
# "http://localhost/admin184628" becomes the URL of Exment
~~~

- When a site that had "admin" is set to nothing, opening an old URL (`/admin/...`) goes to the same page (`/...`) (GET only, from v7.2.1). Bookmarks and links in mails keep working.
- With "admin", the URL without it ([http://localhost](http://localhost)) shows another page (the default page of the framework). A site for general users who do not log in can be built there (public site: see the Japanese manual).
![Prefix change](img/quickstart/route_prefix1.png)

### URLs after changing or removing "admin"
If you change or remove "admin", **all Exment URLs change, including the API and login callbacks**, not only the screen URLs.  
Also update the URLs registered in other systems (API authentication and execution, SSO callback URLs, LINE Webhook URL, plugin URLs, etc.). Only opening a page (GET) moves from an old `/admin/...`, so change the URLs of the API and webhooks.

| Usage | Nothing (default from v7.2.1) | "admin" (an older site) | Changed to "admin184628" |
| ---- | ---- | ---- | ---- |
| Login screen | (Exment URL)/auth/login | (Exment URL)/admin/auth/login | (Exment URL)/admin184628/auth/login |
| API token | (Exment URL)/oauth/token | (Exment URL)/admin/oauth/token | (Exment URL)/admin184628/oauth/token |
| API execution | (Exment URL)/api/data/(table name) | (Exment URL)/admin/api/data/(table name) | (Exment URL)/admin184628/api/data/(table name) |
| API app setting | (Exment URL)/api_setting | (Exment URL)/admin/api_setting | (Exment URL)/admin184628/api_setting |
| SSO (OAuth) callback | (Exment URL)/auth/login/(provider name)/callback | (Exment URL)/admin/auth/login/(provider name)/callback | (Exment URL)/admin184628/auth/login/(provider name)/callback |
| Plugin (page) | (Exment URL)/plugins/(URL) | (Exment URL)/admin/plugins/(URL) | (Exment URL)/admin184628/plugins/(URL) |
