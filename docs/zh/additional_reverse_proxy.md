# 采用反向代理时的设置
这是在 Exment 的服务器前面放置反向代理（先接收 Web 请求，再交给 Web 服务器的服务器）时的设置。  
要进行 Exment 一侧的设置和反向代理服务器一侧的设置，共 2 项。

> 本步骤从 v3.7.2 起做了一部分修改。

## 前言
云服务的负载均衡器等接收 Web 请求的服务器(服务。以下称反向代理服务器)，有时与 Web 服务器是分开的。  
特别是，有时会设置成下面这样。  

- 从互联网到反向代理服务器的通信 : HTTPS 通信
- 从反向代理服务器到 Web 服务器的通信 : HTTP 通信

![反向代理](../img/quickstart/reverse_proxy1.png)


采用这种结构时，反向代理服务器和 Exment 需要的追加设置写在下面。  



### 设置步骤 - Exment

- 修改 .env 文件。

~~~
# （在已有的值上追加）到反向代理服务器为止的 URL。不需要 "admin"
APP_URL=https://XXXX.com 

# 互联网⇔反向代理服务器用 HTTPS、反向代理服务器⇔Web 服务器的通信用 HTTP 时，新添加
ADMIN_HTTPS=true

# 用上面 "APP_URL" 的值生成 URL
ADMIN_USE_APP_URL=true

# 允许 Proxy 的反向代理服务器的 IP 地址。可能有多个 IP 地址时，用逗号分隔
# ※IP 不固定时，或者通过区域设置使反向代理服务器以外没有访问时等，也可以用 "*" 指定
ADMIN_TRUST_PROXY_IPS=172.0.1.1,172.0.1.2
#ADMIN_TRUST_PROXY_IPS=*

# AWS ELB 时，添加下面的值
ADMIN_TRUST_PROXY_HEADERS=HEADER_X_FORWARDED_AWS_ELB
~~~

- 使用 [SAML 认证](/zh/login_saml)时，请在“选项设置”中把“使用代理”设为 YES。
![反向代理](../img/quickstart/reverse_proxy2.png)


### 设置步骤 - 反向代理服务器

- 从反向代理服务器(负载均衡器、Nginx 等)转发到 Web 服务器时，需要加上下面的请求头。  
请确认是否已加上请求头。  
※这些是传递到反向代理服务器为止的访问信息的请求头。由 Web 服务器一侧读取并使用。  
    - X-Forwarded-Host : 反向代理服务器的主机名
    - X-Forwarded-For : 客户端的 IP 地址
    - X-Forwarded-Proto : http 或 https
    - X-Forwarded-Port : 到反向代理服务器为止的端口

- 例：nginx 时

```
    location / {
        proxy_set_header X-Forwarded-Host localhost;
        proxy_set_header X-Forwarded-For XXXX;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Port 10443;
    }
```

- ※为了确认而想输出请求的值、请求头的值时，在根文件夹的“.env”中添加下面一行。会输出到 storage/logs/laravel.log。

```
EXMENT_DEBUG_MODE_REQUEST=1
```


[←返回追加设置一览](/zh/quickstart_more)
