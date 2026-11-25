# Groupware（官方插件）
“Groupware”是 Exment 的协同办公**官方插件**。可以免费使用。目前有以下 2 项功能。

- **Web 邮件**：像 Outlook、Gmail 那样在浏览器中使用的邮件软件
- **Office**：用在浏览器中运行的 Office（ibis 株式会社的 [ibisOffice](https://github.com/ibisjp/ibis-office)）打开、编辑 Word（.docx）、Excel（.xlsx）、PowerPoint（.pptx）文件

- 源代码和说明：[exceedone/exment-plugins（groupware）](https://github.com/exceedone/exment-plugins/tree/main/groupware)
- 许可证：GPL-3.0（与 Exment 相同）。ibisOffice 为 AGPL-3.0-only（[ibisOffice 的许可证](/zh/plugin_groupware?id=ibisOffice-的许可证)）。
- 插件列表中显示的名称：Exment Plugin Groupware。内部名称为 `ExmentGroupware`，URL 为 `/plugins/exment_groupware`。

<!-- 页面截图：Web 邮件（img/plugin_groupware/gw_mail.png）和用 Office 打开的文件（img/plugin_groupware/gw_office.png）。请 d9 确认之后再截图 -->

## Web 邮件
Exment 没有邮件服务器。和 Outlook 一样，通过 **IMAP**（接收）和 **SMTP**（发送）连接公司现在使用的邮件服务器。邮件保留在服务器上，所以可以和 Outlook、手机的邮件并用。不会把邮件复制到 Exment。

- 文件夹、列表（从新到旧，每页 50 封）、阅读窗格、搜索（标题、发件人、收件人、正文。也可以用日语）、未读／带标记的筛选、标记、移动（也可以拖到文件夹）、垃圾邮件、删除到回收站、创建文件夹
- 新建、回复、全部回复、转发（连同附件）、Cc／Bcc、附件（每封最多 25MB）、简单的格式、签名、草稿。用 `Ctrl+Enter` 发送
- 1 个人可以使用多个账户。每分钟确认一次收件箱的未读数。
- 可以直接阅读日语的邮件（ISO-2022-JP、Shift_JIS）。

| 服务 | 登录 | 服务器 |
| --- | --- | --- |
| Xserver | 密码（用户名为电子邮件地址） | `sv****.xserver.jp`，IMAP 993／SMTP 465（SSL） |
| KAGOYA | 密码（用户名为邮件账户名） | IMAP `m***.kagoya.net` 993，SMTP `smtp.kagoya.net` 465（SSL） |
| Microsoft 365 | 用 Microsoft 登录（OAuth 2.0） | `outlook.office365.com` 993，`smtp.office365.com` 587（STARTTLS） |
| Gmail、Google Workspace | 用 Google 登录（OAuth 2.0），或应用专用密码 | `imap.gmail.com` 993，`smtp.gmail.com` 465 |
| 其他 | 密码 | 任何 IMAP、SMTP 服务器 |

### 使用 Microsoft 365、Google 时
由系统管理员登记一次应用，并填入插件的设置（“管理员设置”→“插件”→“Exment Plugin Groupware”→“設定”（设置））。设置页面上会显示要登记的重定向 URI（`…/plugins/exment_groupware/mail/oauth/callback`）。

- Microsoft：在 Azure portal 的“应用注册”中创建 Web 应用。需要 Office 365 Exchange Online 的委托权限 `IMAP.AccessAsUser.All`、`SMTP.Send`，以及 `offline_access openid email profile`。租户的管理员必须允许该用户使用 SMTP 认证（SMTP AUTH）。
- Google：在 Google Cloud console 中创建 OAuth 客户端 ID（Web 应用），范围为 `https://mail.google.com/`。如果是公司内部使用的 Google Workspace，把应用设为“内部”就不需要 Google 的审核。

### 使用方法
1. 打开左侧菜单的“メール”（邮件）（或 `/plugins/exment_groupware/mail`）。
2. 点击“アカウントを追加する”（添加账户），选择服务。
3. Xserver、KAGOYA、其他：填入密码。Microsoft 365、Google：点击“サインイン”（登录），在各自的页面上登录。

### 安全
- 密码和令牌用应用的密钥（`APP_KEY`）加密后保存。
- HTML 邮件会在服务器上去掉危险的部分，并在脚本不能运行的框架中显示。外部的图片在点击“画像を表示”（显示图片）之前不会加载。
- 能连接的只有互联网地址的邮件端口。要连接公司内部网络的邮件服务器时，由管理员打开设置中的“社内のネットワークのメールサーバーを許可する”（允许公司内部网络的邮件服务器）。

## Office
### 文件共享中的文件
[文件共享](/zh/file_server)中 Word、Excel、PowerPoint 文件的页面上，会出现“Office で開く”（在 Office 中打开）按钮。

- 点击后，会在新的标签页中打开编辑器。**保存**后成为文件的新版本（以前的版本保留在版本历史中）。
- 为了编辑而打开期间处于**签出**状态，其他人不能更改。关闭编辑器时签入。只有查看权限的人，以及其他人已签出的文件，以只读方式打开。
- 其间有其他人保存过时，会拒绝保存，所以不会因覆盖而丢失内容。
- 服务器上没有 LibreOffice 时，会在文件页面的预览栏中以只读方式嵌入编辑器。**不需要 LibreOffice**（ibisOffice 在浏览器中运行）。
- 点击右上角的关闭（×），会签入并离开编辑器。用“Office で開く”（在 Office 中打开）打开的标签页会关闭，否则返回文件的页面（从 0.4.4 起）。预览中不显示关闭。
- **内容为空的文件**（0 字节。用 Windows 的“新建 → Word 文档”创建的文件等）会按文件名的扩展名（docx、xlsx、pptx）的种类，作为新文档打开。保存后成为该名称的真正的文档（从 0.4.4 起。更早的版本是作为电子表格打开）。

### 数据的附件
附加在数据上的 Word、Excel、PowerPoint 也可以用浏览器中的 Office 查看（项目管理的课题、Wiki、项目的文件等）。没有文件共享也能运行。

- 只有可以下载该文件的人才能查看。
- 可以编辑该数据的人会看到“編集する”（编辑）。保存后，附件的内容更新，地址不变。数据上会以评论的形式留下谁编辑过，以及指向以前内容的链接。
- 在 Exment v7.2.1 及以上版本中，以前的内容作为附件的“旧版本”（“版本 n”）保留（[替换和旧版本](/zh/data_details)）。1 个附件最多保留 10 个（`EXMENT_DOCUMENT_VERSION_LIMIT`），超过时从旧的开始删除，删除附件时一并删除。
- 在更早的 Exment 中，以前的内容作为另一个文件保留，只能从评论中的链接打开。即使删除附件，这个文件也不会被删除。
- 可以编辑的只有附件（文件列的值不在范围内）。在 `EXMENT_FILE_DELETE_USERONLY` 为 `true` 的站点上，只有上传文件的人可以编辑。可以保存的大小最多为 50MB（Exment 的上传上限更小时，以该上限为准）。

## 功能管理（Exment v7.2.1 及以上版本）
- Web 邮件在“管理员设置”→“[功能管理](/zh/feature)”中显示为“メール”（邮件）（`exment_groupware.mail`）1 行。由系统管理员选择使用或不使用，以及可以使用的角色组。
- 在以前就安装了本插件的站点上，更新后仍为“使用”。**在新安装的站点上从“不使用”开始**，所以请在功能管理中把“メール”（邮件）设为“使用”（不使用期间，邮件的页面会返回 404）。
- Office 跟随文件共享的功能。文件共享为“不使用”时，文件共享中的“Office で開く”（在 Office 中打开）打不开。

## 运行要求
- Exment 7.1 及以上版本（已在 7.1、7.2 中确认）和 PHP 8.2 及以上版本。Web 邮件和数据的附件在这两个版本中都能运行。
- 要打开文件共享中的文件，需要带有文件共享的 Exment（v7.2.1 及以上版本）。没有时，只有这一部分不能运行。
- 安装 ibisOffice 需要 PHP 的 `zip` 扩展，以及可写入的站点的 `public/`（约 125MB）。
- 使用 Office 需要支持 WebGPU 的浏览器（Chrome、Edge，或 Safari 26 及以上版本）和 HTTPS 的站点。
- 不需要 LibreOffice 和 Docker。在 XServer 等租用服务器上也能运行（服务器只负责提供文件，Office 在浏览器中运行）。

## 安装
1. 安装插件。Exment v7.2.1 及以上版本从“功能管理”安装，更早的版本上传 zip。请参阅[官方插件](/zh/plugin_official)。
2. 使用 Office 时，用系统管理员打开插件的页面（`/plugins/exment_groupware`），点击“ibisOffice 0.8.9 をインストールする”（安装 ibisOffice 0.8.9）。会下载 ibisOffice 的发行包（约 40MB，解压后 125MB），确认与规定的 SHA-256 一致之后，放到站点的 `public/vendor/exment_groupware/ibisoffice/` 中。

有多台 Web 服务器时，或不能写入 `public/` 时，把解压后的发行包公开在别的位置，并在插件设置的“ibisOffice の場所（URL）”（ibisOffice 的位置（URL））中填入 `index.html` 所在文件夹的 URL。

### Web 服务器的设置
编辑器很大（`.wasm` 为 92MB，gzip 后约 24MB），所以压缩后发送并让浏览器缓存，下载就只有第一次。否则，每次打开可能都要等 10 秒左右。

**Apache（XServer 等租用服务器也一样）**
- 从 0.4.4 起，安装时会写入大文件的 `.gz` 副本和 `public/vendor/exment_groupware/ibisoffice/.htaccess`。内容是 `.wasm` 的类型、1 年的缓存、向能接收 gzip 的浏览器发送 `.gz` 副本（没有副本时用 `mod_deflate` 压缩）。
- 所有设置都在 `IfModule` 之中，所以没有的模块会被跳过。因此只需确认那里可以使用 `.htaccess`（`AllowOverride All`。Exment 自身的 `.htaccess` 也需要）。
- 用 0.4.3 及以前的版本安装的 ibisOffice，在更新到 0.4.4 之后，在插件的页面上重新安装一次，就会生成副本和 `.htaccess`。

**nginx**
nginx 不读取 `.htaccess`。请在站点的设置中加上以下内容，并重新加载设置。

```nginx
# 写在站点的 server { } 之中、location / 之前
location ^~ /vendor/exment_groupware/ibisoffice/ {
    gzip_static on;            # 发送安装时写入的 .gz 副本
    gzip on;                   # 没有副本的文件当场压缩
    gzip_types application/wasm text/javascript application/javascript text/css application/json image/svg+xml;
    types { application/wasm wasm; }
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    # 在 location 中写 add_header 会使 server { } 中的失效，所以再写一次
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    try_files $uri =404;
}
```

**任何 Web 服务器都一样**
- **X-Frame-Options 不要设为 `DENY`，而要设为 `SAMEORIGIN`。** 编辑器是同一站点的 `iframe`，所以设为 `DENY` 时浏览器会拒绝显示（页面一直是空的）。Content-Security-Policy 的 `frame-ancestors` 也设为 `'self'`。
- 设置了 Content-Security-Policy 的站点需要 `script-src 'self' 'wasm-unsafe-eval'`。
- 不需要 COOP、COEP 的响应头。

## ibisOffice 的许可证
ibisOffice 是 ibis 株式会社的软件，采用 AGPL-3.0-only 和商业许可证的双重许可。本插件把 ibisOffice 按发行包原样（不做修改）放在另一个框架中运行，插件中不包含它（从 ibis 的发行包下载）。编辑器的页面和插件的页面上会显示“Powered by ibisOffice”。

## 相关项目
- [官方插件](/zh/plugin_official)
- [文件共享](/zh/file_server)
- [README（GitHub）](https://github.com/exceedone/exment-plugins/blob/main/groupware/README.md)
