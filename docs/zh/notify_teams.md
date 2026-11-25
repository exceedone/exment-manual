# 通知到 Teams 的个人聊天

可以把通知直接发送到对方的 **Teams 个人聊天**（Exment 7.2.6 及以上版本）。
Exment 把通知内容发给 Teams 的**工作流**（Power Automate），工作流再以机器人（流机器人）的身份发布到对方的聊天中。

- 发送的内容是标题、正文和数据的链接。在 Teams 中，标题显示为粗体标题，正文保持段落和编号列表的形式，并以带有“打开”按钮的卡片（Adaptive Card）送达
- 通知模板的标题和正文，使用接收人的语言（[用户的语言](/zh/user_locale)）
- 发送目标的 Teams 账户，是 Exment 用户的**电子邮件地址**

> 目前发送到频道的方法（[Webhook](/zh/notify_webhook) 的 Microsoft Teams）依赖 Office 365 连接器，Microsoft 正在逐步停用它。用同一个工作流，也可以发送到频道（见下文“发送到频道时”）。

## 1. 在 Teams 中创建工作流

由 Teams 组织内的人创建（工作流以创建者的账户运行）。

1. 在 Teams 左侧的“应用”中打开**工作流**（Workflows），选择“创建”→“从空白开始创建”
2. 触发器选择 **“收到 Teams Webhook 请求时”**（When a Teams webhook request is received）
   - “可以触发流的用户”设为 **“任何人”**（Anyone）。对于来自 Exment 的请求，只凭是否知道地址来决定是否接受。**请对地址保密**
3. 在“新建步骤”中添加 **“在聊天或频道中发布卡片”**（Post card in a chat or channel）
   - 发布者：**流机器人**
   - 发布位置：**与流机器人聊天**
   - 收件人：在“表达式”中输入 `triggerBody()?['to_email']`
   - 自适应卡片：在“表达式”中输入 `triggerBody()?['card']`
4. 保存后，触发器中会生成 **HTTP POST 的 URL**。请复制它

### Exment 发送的 JSON

工作流会收到如下形式的 JSON。卡片（`card`）由 Exment 生成，工作流只需原样发布。

```json
{
  "to_email": "user1@example.com",
  "title": "课题已更新（ISS00423）",
  "body": "**无法登录**\n\n1. 已将状态改为“处理中”",
  "url": "https://exment.example.com/admin/data/pm_issue/423",
  "sender": "野吕 诚二",
  "locale": "zh_CN",
  "card": { "type": "AdaptiveCard", "version": "1.4", "body": [ ... ], "actions": [ ... ] }
}
```

使用触发器的“请求正文 JSON 架构”时，请填入以下内容。

```json
{
  "type": "object",
  "properties": {
    "to_email": { "type": "string" },
    "title": { "type": "string" },
    "body": { "type": "string" },
    "url": { "type": ["string", "null"] },
    "sender": { "type": ["string", "null"] },
    "locale": { "type": "string" },
    "card": { "type": "object" }
  }
}
```

## 2. 在 Exment 中设置

1. 在“管理员设置”→“功能管理”中，把 **“Teams 通知（个人聊天）”** 设为“使用”（初始为“不使用”）
2. 在“系统设置”（详细设置）的 **“Teams（工作流）”** 的“新地址”中，填入复制的 URL 并保存
   - 地址是保密的值，保存后不再显示在页面上（只显示“已设置（不显示）”）。留空保存时，继续使用当前的地址。要删除时，打开“删除地址”后保存
   - 地址也不会出现在操作日志中
3. 在通知的设置（[通知](/zh/notify)）中，“通知操作”选择 **“Teams（个人）”**，再选择通知对象（用户列、组织列、创建者等）

## 发送到频道时

把工作流的“发布位置”设为**频道**，并选择团队和频道（不需要收件人的表达式）。在 Exment 中，请把该通知的通知对象设为 1 人（每人发送 1 次，所以通知对象多时，同一张卡片会被发布多次）。

## 无法送达时

- Exment 的日志（storage/logs）中出现“the Teams workflow answered …”时，请在工作流的运行历史记录（Teams 的工作流 → 该流 → 运行历史记录）中查看原因
- 找不到收件人时，请确认 Exment 用户的电子邮件地址与 Teams 账户（组织的电子邮件地址）是否相同
- 没有任何反应时，请确认功能管理中“Teams 通知（个人聊天）”是否为“使用”，以及系统设置中是否已填入地址
