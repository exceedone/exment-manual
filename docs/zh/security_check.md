# 安全检查
确认让这个站点安全运行的设置。在“设置：系统”→“安全检查”（URL 是 `/security_check`）中，会以列表显示需要确认的设置和现在的状态。

※这个页面可以在 Exment v7.2.1 以后使用。  
※只有系统管理员可以看到这个页面。

![安全检查](../ja/img/security_check/security_check1.png)

## 页面的看法
- 每个项目，没有问题时带 ✓，需要修复的带 ✕，从这台服务器无法确认的带 ⚠。
- “请修复”的项目，请按其下方显示的修复方法进行设置。
- 有按钮的项目可以从这个页面修复。修复的记录会留在操作日志中。
- 点击“查看设置方法”，会打开该项目的设置方法。
- 服务器的设置（Web 服务器、php.ini、.env）请委托服务器管理员。

安装时，“检查系统要求”的页面中也会显示服务器的项目中最好修复的项目（只是显示。不会停止安装）。

## 项目
| 项目 | 确认的内容 |
|---|---|
| 重要文件的权限 | `.env` 和配置缓存中包含数据库密码等机密。要让服务器的其他用户无法读取（640 等）。storage 也不要设成任何人都能读写 |
| 调试模式（APP_DEBUG） | 在调试模式下，错误的详细内容会显示在页面上。正式环境中请设为 OFF |
| 应用程序密钥（APP_KEY） | 用于加密和会话签名的密钥。需要每个站点单独生成的值 |
| 运行环境（APP_ENV） | 正式运行的站点设为 `production` |
| https | 为了不让密码和数据在通信途中被读取，请用 https 使用。在 Web 服务器上安装证书，并把 `.env` 的 `APP_URL` 设为以 `https://` 开头的 URL |
| 安全相关的响应头 | 告诉浏览器“不在其他站点中显示、不猜测文件的种类、不过多发送来源链接、只使用 https”的响应头（X-Frame-Options、X-Content-Type-Options、Referrer-Policy、Strict-Transport-Security）。在 Web 服务器上设置 |
| 不应从外部访问的内容 | 让 `.env`、`.git`、`storage`、`vendor` 不能从浏览器打开（应为 403 或 404） |
| 系统管理员的密码 | 不使用初始设置时的密码，也不使用与用户代码相同的密码。在右上角用户菜单的“设置”中更改 |
| 双重验证 | 除密码外，还通过邮件或身份验证应用的验证码确认登录（[登录设置](/zh/login_setting)） |

### 安全相关的响应头的设置示例
在 Web 服务器中添加下面的行。添加后重新加载 Web 服务器（Apache 的 .htaccess 不用重新加载就会生效），然后在这个页面再确认一次。

~~~
# nginx（在 server { } 中）
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
# 只在 https 时
add_header Strict-Transport-Security "max-age=31536000" always;
~~~

~~~
# Apache（Exment 的 public/.htaccess 的开头，或 Apache 的设置。需要 mod_headers）
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    # 只在 https 时
    Header always set Strict-Transport-Security "max-age=31536000"
</IfModule>
~~~

- Strict-Transport-Security 只加在用 https 使用的站点上。加上后，浏览器在 1 年内只用 https 打开这个站点。
- nginx 中，`location { }` 里面也有 `add_header` 时，在那个 `location` 里面也要写同样的行（写在里面后，外面的 `add_header` 不会被使用）。
- 在租用服务器（Xserver 等）上，写在 .htaccess 中。

### 显示“无法检查”时
安全相关的响应头和不应从外部访问的内容，是由服务器向自己的站点发出请求来确认的。在服务器连不到自己站点的环境（Docker 内部、防火墙内侧等）中无法确认。这时，请用服务器外面的电脑的浏览器打开页面上显示的地址来确认。

## 相关项目
- [性能调优](/zh/tuning)
- [功能管理](/zh/feature)
- [登录设置](/zh/login_setting)
