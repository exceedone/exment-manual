# 通知到 LINE WORKS

可以通过 **LINE WORKS** 的 Bot 将通知发送到聊天室或每个人（Exment 7.3.0 及以上）。
使用 LINE WORKS API 2.0 的 Bot。

- **LINE WORKS（聊天室）**：发送到 Bot 所在的聊天室（频道）
- **LINE WORKS（个人）**：逐个发送给通知对象用户，发送到用户的 LINE WORKS ID（默认为邮件地址），使用接收人的语言（[用户语言](/zh/user_locale)）
- 发送标题、正文（仅文本）和数据链接（最多 2000 个字符）

## 1. 在 LINE WORKS Developers Console 中准备

由 LINE WORKS 管理员进行。

1. 在 [LINE WORKS Developers Console](https://dev.worksmobile.com/) 中创建**应用**，记下 **Client ID** 和 **Client Secret**
2. 在应用的 **OAuth Scopes** 中添加 `bot`
3. 创建应用的 **Service Account**，并下载 **Private Key**。记下 Service Account（`xxxx.serviceaccount@...`）
4. 创建 **Bot**，记下 **Bot ID**
5. 在 LINE WORKS 管理页面中，将 Bot 添加到租户并对用户公开
6. 发送到聊天室时，将 Bot 邀请到该聊天室，并记下**频道 ID**

> Client Secret 和 Private Key 是秘密：拥有它们的人可以以 Bot 身份发送。

## 2. 在 Exment 中设置

由系统管理员进行。

1. 在[功能管理](/zh/feature)中打开 **“LINE WORKS 通知”**（初始为关闭）
2. 在“系统设置”→“详细设置”的 **“LINE WORKS（Bot）”** 中输入 Client ID、Client Secret、Service Account、Private Key 和 Bot ID 并保存
    - Private Key 请原样粘贴下载的密钥文件的内容
    - Client Secret 和 Private Key 会加密保存，保存后不再显示。要更改时输入新值，要删除时打开“清除”
3. 发送个人消息到不是邮件地址的 LINE WORKS ID 时，在 **“LINE WORKS ID 的列”** 中选择包含该 ID 的用户列

## 3. 创建通知

在[通知设置](/zh/notify)的“通知操作”中选择。

- **LINE WORKS（聊天室）**：在“LINE WORKS 聊天室 ID”中输入频道 ID
- **LINE WORKS（个人）**：选择“通知对象”，与邮件相同

## 未能发送时

- 会重新发送几次（有队列 worker 时：1 分钟后和 5 分钟后）
- 仍未能发送时，创建通知的人（不明时为系统管理员）会在画面通知中收到接收方和原因
- 发送地址的检查与 [Webhook](/zh/notify_webhook) 相同。请让服务器能够通过 https 连接到 `auth.worksmobile.com` 和 `www.worksapis.com`
