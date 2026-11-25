# 更改或删除 URL 中包含的“admin”
加在 Exment 页面 URL 开头的值（“/admin”等），由 `.env` 的 `ADMIN_ROUTE_PREFIX` 决定。

- **v7.2.1 以后新安装的站点**：默认什么也不加。例： http://localhost
- **用以前的版本安装的站点**：带有“admin”（`ADMIN_ROUTE_PREFIX=admin`，或者没有设置、保持以前的默认值）。例： http://localhost/admin 。更新后也不会改变。

本手册中的 URL，按什么也不加的默认设置来写。在带有“admin”等值的站点中，请在站点的 URL 后面加上这个值来读（例：`(Exment的URL)/auth/login` → `(Exment的URL)/admin/auth/login`）。

新安装时，可以在安装的最后一个页面的“**URL 前缀**”中决定（留空则不加。输入“admin”则与以前的版本相同）。以后想更改时，按下面的步骤修改 `.env`。

### 更改步骤

- 在 Exment 的根目录中，打开“.env”文件。
- 写入下面的值中的任意一个。

~~~
### 1.什么也不加（v7.2.1 以后的默认）
ADMIN_ROUTE_PREFIX=
# http://localhost 成为 Exment 的 URL

### 2.加上“admin”（与以前版本的站点相同）
ADMIN_ROUTE_PREFIX=admin
# http://localhost/admin 成为 Exment 的 URL

### 3.改为别的名称
ADMIN_ROUTE_PREFIX=admin184628
# http://localhost/admin184628 成为 Exment 的 URL
~~~

- 把带有“admin”的站点改为什么也不加的设置后，打开旧的 URL（`/admin/...`）时，会转到相同的页面（`/...`）（只限 GET。v7.2.1 以后）。书签和邮件中写的链接也可以打开。
- 加上“admin”后，不带“admin”的 URL（[http://localhost](http://localhost)）会显示与 Exment 不同的页面（所用框架的默认页面）。也可以在这里制作不需要登录的、面向一般使用者的站点（[面向使用者的站点](/zh/public_site)）。
![更改 Prefix](../img/quickstart/route_prefix1.png)

### 更改或删除后的 URL
更改或删除“admin”后，不只是页面的 URL，**API、登录的回调等 Exment 的所有 URL** 都会改变。  
登记在其他系统中的 URL（API 的认证和执行、SSO 的回调 URL、LINE 的 Webhook URL、插件的 URL 等）也请一起更改。只有打开页面（GET）时才会从旧的 `/admin/...` 转过去，所以请更改 API 和 Webhook 的 URL。

| 用途 | 什么也不加（v7.2.1 以后的默认） | “admin”（以前版本的站点） | 改为“admin184628”时 |
| ---- | ---- | ---- | ---- |
| 登录页面 | (Exment的URL)/auth/login | (Exment的URL)/admin/auth/login | (Exment的URL)/admin184628/auth/login |
| 获取 API 的令牌 | (Exment的URL)/oauth/token | (Exment的URL)/admin/oauth/token | (Exment的URL)/admin184628/oauth/token |
| 执行 API | (Exment的URL)/api/data/(表名) | (Exment的URL)/admin/api/data/(表名) | (Exment的URL)/admin184628/api/data/(表名) |
| API 应用设置 | (Exment的URL)/api_setting | (Exment的URL)/admin/api_setting | (Exment的URL)/admin184628/api_setting |
| SSO(OAuth) 的回调 | (Exment的URL)/auth/login/(provider名)/callback | (Exment的URL)/admin/auth/login/(provider名)/callback | (Exment的URL)/admin184628/auth/login/(provider名)/callback |
| 插件(页面) | (Exment的URL)/plugins/(URL) | (Exment的URL)/admin/plugins/(URL) | (Exment的URL)/admin184628/plugins/(URL) |


[←返回追加设置一览](/zh/quickstart_more)
