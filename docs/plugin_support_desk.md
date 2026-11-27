# Support Desk (official plugin)
"Exment Support Desk" is an **official plugin** of Exment for IT support and help desks. Requests from customers (mail, a request form, phone) and problems found by monitoring or error logs are managed as tickets, and **their progress is shared with the customer without login**. It is free.

- Source code and docs: [exceedone/exment-plugins (support-desk)](https://github.com/exceedone/exment-plugins/tree/main/support-desk)
- License: GPL-3.0 (the same as Exment)
- Name in the plugin list: Exment Plugin Support Desk（サポートデスク）. The internal name is `ExmentSupportDesk` and the URL is `/plugins/exment_support_desk`.

<!-- Screenshot: the agent desk (img/plugin_support_desk/sd_desk.png). Take it after 2b checks the page -->

## What it does
| Area | Content |
| --- | --- |
| Agent desk | A dedicated three-pane desk (queues with counts, the ticket list, the conversation and properties) that switches tickets without reloading. Keyboard shortcuts (`J`/`K` up and down, `R` reply, `N` internal note, `Ctrl+Enter` send, `A` assign to me, `E` resolve, `?` list), drafts saved automatically, dark mode, phone layout |
| Intake | **Mail** (IMAP every 5 minutes; ISO-2022-JP, Shift_JIS and attachments), a **request form** (no login, FAQ suggested first), **phone and visits** (entered by agents), **monitoring and error logs** (API; the same error is one ticket with a count), **IT asset expiry** (tickets made when maintenance, licenses, domains or certificates near their end) |
| Conversation | Replies reach the customer by mail; their reply goes into the same ticket. Quoted text is taken off. **Internal notes** are not shown to the customer. **Canned replies** and **knowledge suggestions** beside the reply box |
| No double work | The page shows when another agent is writing a reply to the same ticket |
| Sharing with customers | **Links without login** (one ticket per link, expiry and revoking, access log). For important tickets, a **one-time code** (6 digits by mail). Customers who log in use the **customer portal** (a company's manager sees all the company's tickets) |
| SLA | First reply and resolution targets per customer and priority, **counted in business hours and holidays**, **paused while waiting for the customer**. Agents are told when a target is near or past |
| Automation | Assignment per kind or to the agent with the fewest open tickets. A reminder while waiting → resolved → closed automatically. A satisfaction survey (5 levels) when resolved |
| Knowledge (FAQ) | Published articles appear on the customer FAQ page and the request form. Draft one from a ticket with one click |
| IT assets | Register the customer's PCs, servers, licenses and more, and link them to tickets |
| Reports | Intake, resolution, SLA rate, time to first reply, satisfaction and more. **Work time per customer against the contract** (for monthly reports), CSV |
| Search | Partial match on subject, body, conversation, mail and number. Spaces mean AND; tags can be AND or OR |
| Customizing | Every table is an Exment table, so fields, screens, lists, workflows and the API can be changed on Exment's pages. A ticket board (kanban) comes with it |

## Requirements
- Exment 7.0 or later (PHP 8.2 or later). No extra PHP extension.
- Receiving mail needs a mailbox for requests (IMAP). Sending uses Exment's [email sending settings](/mailsend_setting).
- The automation (receiving mail, SLA, waiting, closing, asset expiry) runs every 5 minutes. Set up the [task schedule](/additional_task_schedule).
- The screens are in Japanese only.

## Install
1. Install the plugin: from Feature Management on Exment v7.2.1 or later, by uploading the zip on older ones. See [Official plugins](/plugin_official).
2. On Exment v7.2.1 or later, turn on "Support Desk: agent desk" in "Admin Setting" > "[Feature Management](/feature)" (the setup page does not open while it is off). Choose the role groups that may use the desk. To use the customer door (`/support`), mail intake and tickets from monitoring, turn on "Support Desk: customer portal" too (it works only while the desk is on).
   - On a new site both are off at first. Sites that used Support Desk before Feature Management keep both on.
   - Setting the desk to "Don't use" also removes "サポートデスク" from the menu. The tables (tickets and so on) stay as data and can still be opened as ordinary Exment tables: by URL (such as `/data/sd_ticket`) or from "Admin Setting" > "Custom Table". To show them in the menu, add them in "Admin Setting" > "Menu". To hide them, remove the table permissions in the role groups.
3. Open "サポートデスク" in the menu (or `/plugins/exment_support_desk`) and press "セットアップする" (set up). Tables, menus, permissions, SLA, kinds, canned replies and sample FAQ are made.
   - The left menu has one entry, "サポートデスク", which opens the desk. Tickets (table), knowledge, customers, contacts, IT assets and canned replies open from the bar at the top of the desk; every table (kinds and SLA too) from "テーブル・権限" (tables and permissions) in "設定".
   - The "ITサポート" folder of 1.0.6 and before (the desk and 8 tables) is folded into that one entry the first time the desk is opened after the update to 1.0.7. Menus an administrator added stay.
4. In "設定" (settings), enter the mailbox for requests (IMAP) and the address of the desk, save, and press "IMAP につながるか試す" (test IMAP). To receive mail, also enter "差出人の確認" (sender check) and "受信サーバーの名前" (the name of the receiving server: the first name in Authentication-Results of received mail). Until then, tickets from mail are marked "possibly spoofed".
5. Put agents in the role group "サポートデスク 担当者". Customers who log in go in "サポートデスク お客様", linked by "Exment のユーザー" of "お客様の担当者".
6. Tell customers the URL of the desk (`https://your-exment/support`).

## How to use

### The desk
Open "サポートデスク" in the menu to see the desk (受付箱). It has three panes.

| Pane | Content |
| --- | --- |
| Left | The queues with counts: 対応が必要 (needs action), 自分の担当 (mine), 担当者なし (unassigned), お客様から返事 (customer replied), SLA 注意・超過 (SLA near or past), お客様の返事待ち (waiting for the customer), 保留 (on hold), 監視・エラー (monitoring and errors), 解決 (resolved), 完了 (closed), すべて (all). Below them: whether mail intake is on or off, and when the automation last ran |
| Middle | The ticket list. Search by subject, body, conversation, mail and number. Filter by status, priority, assignee, customer, kind and tags, and sort by due date, priority, newest, oldest or last update. Select several tickets to change their status, priority or assignee at once |
| Right | The conversation of the selected ticket and the reply box. Beside them: the fields (status, priority, assignee, kind, customer, tags, 「お客様に見せる」 show to the customer, 「開くときに確認のコード」 code to open), the SLA, the customer, the customer link, knowledge, files, other tickets of the same customer, and merging |

| Key | Action |
| --- | --- |
| `J` / `K` | Next / previous ticket |
| `/` | Search |
| `R` | Reply to the customer |
| `N` | Internal note |
| `Ctrl` + `Enter` | Send |
| `A` | Assign to me |
| `E` | Resolve |
| `\` | Show or hide the right pane |
| `?` | List of shortcuts |
| `Esc` | Close, or leave the input |

Phone calls, visits and things found in-house are entered from 「チケット」 (ticket) in the top bar (choose 「受付のメール」 to send the customer the number and the link).

### The ticket flow
There are six statuses:

新規 (new) → 対応中 (open) → お客様の返事待ち (waiting for the customer) / 保留（社内） (on hold, internal) → 解決 (resolved) → 完了 (closed)

- Tickets from mail and the request form start as 「新規」. When an agent replies to the customer, the ticket becomes 「対応中」. Tickets entered by agents start as 「対応中」.
- With 「送ったあとの状態」 (status after sending) in the reply box, the status changes when you send (for example, 「お客様の返事待ち」 after asking the customer a question).
- When the customer writes on a ticket that is 「お客様の返事待ち」, 「解決」 or 「完了」, it goes back to 「対応中」. If they write more than 14 days after it was closed, a new ticket is made that points to the old one.
- If the customer does not answer a ticket in 「お客様の返事待ち」, a reminder mail is sent 3 days after the last reply, and the ticket is resolved after 7 days.
- A ticket can also be resolved with the `E` key, with the status in the right pane, or with 「解決しました」 (it is solved) on the customer's link page. When it is resolved, the customer is asked for a rating (5 levels).
- 7 days after 「解決」, the ticket becomes 「完了」.
- The numbers of days are set in 「自動で進める」 (automation) in 「設定」 (0 turns the step off).

### Replies and internal notes
- 「お客様へ返信」 (reply to the customer) reaches the customer by mail. The ticket number is put at the head of the subject (for example `[SUP-00012]`), and the progress link is included. You can add CC.
- 「社内メモ」 (internal notes) are not shown to the customer, and no mail is sent.
- Each reply can carry the work time (minutes). It is added up per customer and compared with the contract hours.
- When the customer simply replies to the mail, the reply goes into the same ticket, found by the number in the subject or by the mail it answers (Message-ID). Quoted text is taken off. A reply from someone who is not the requester, a CC or a person of the same company does not go into the ticket.
- The page shows when another agent is writing a reply to the same ticket.

### Assignment
- Choose the person in 「担当者」 (assignee) in the right pane. The `A` key assigns the ticket to you. When you send a reply or an internal note on a ticket with no assignee, you become the assignee.
- For automatic assignment, choose in 「担当者の決め方」 (how to assign) in 「設定」:
    - 種類ごとの「最初の担当者」 (the first assignee of the kind; default): the person set on the ticket's kind.
    - 種類で決まらなければ、対応中が少ない人 (else the agent with the fewest open tickets): among the role group 「サポートデスク 担当者」, the person with the fewest tickets that are not finished.
    - 自動では決めない (do not assign automatically)

### Due times (SLA)
- Each ticket gets 「最初の返事の期限」 (first reply due) and 「解決の期限」 (resolution due). The targets are set in the 「SLA」 table, per priority (緊急 urgent, 高 high, 中 normal, 低 low): the first reply in minutes, resolution in hours.
- When the customer has no SLA, the SLA marked 「標準にする」 (default) is used. The setup adds 「標準」 (standard, counted in business hours only) and 「プレミアム（24 時間）」 (premium, 24 hours).
- An SLA with 「営業時間だけで数える」 (business hours only) counts only the business days, hours and holidays of 「営業時間（SLA の時計）」 (business hours, the SLA clock) in 「設定」. Japanese holidays for this year and next year are added at setup. Add year-end holidays and so on yourself.
- While the ticket is 「お客様の返事待ち」, the clock stops, and the resolution due time is moved later by the time it was stopped.
- When little time is left (less than a quarter of the whole time, or less than 30 minutes) and when the due time has passed, the assignee is told by bell and mail. When there is no assignee, all agents are told.

### Canned replies and knowledge
- Choose from 「定型文…」 (canned replies) in the reply box to put the text in the body. `{name}` (the customer's name), `{ticket_no}`, `{subject}` and `{link}` are replaced with the ticket's values. If the canned reply has a status, 「送ったあとの状態」 changes too. Add canned replies from 「定型文」 in the top bar.
- 「ナレッジ」 (knowledge) in the right pane shows articles that match the subject, and you can search. Click one to put it in the reply: the title and link for a published article, the body for others.
- 「このチケットからナレッジを作る」 (make knowledge from this ticket) makes a draft article.

### The customer side
The customer door is `https://your-exment/support` (while both "Support Desk: customer portal" and 「使う」 (use) in 「お客様の窓口（ログインなし）」 (customer door, no login) in 「設定」 are on).

| URL | Content |
| --- | --- |
| `/support` | The top of the door: search the FAQ, make a request, see my requests |
| `/support/request` | The request form (no login). Name, email address, subject and content are required; up to 5 files (10 MB each) |
| `/support/faq` | The published knowledge (FAQ) |
| `/support/mine` | See my requests. Enter an email address to get a link to the list of requests by mail (valid for 7 days) |
| `/support/t/…` | The page of one ticket, opened from the link in the mail |

- The ticket page shows how far the ticket has got (受付 received, 対応中, 解決, 完了) and the conversation (internal notes are not shown). The customer can send a reply and files, and press 「解決しました」.
- The link stops opening 30 days after the ticket is closed (「リンクの期限」 link expiry in 「設定」).
- A ticket with 「開くときに確認のコード」 on in the right pane opens only with a 6-digit code sent to the registered address.
- When a customer who logs in (role group 「サポートデスク お客様」) opens "サポートデスク", they see the list of their requests (`/plugins/exment_support_desk/my`). A contact with 「お客様の管理者」 (customer manager) sees all the company's requests.

### Mail intake
- In 「メールで受け付ける（IMAP）」 (receive by mail) in 「設定」, turn on 「受信する」 (receive), and enter the IMAP server, port and encryption (SSL/TLS or STARTTLS), user name, password and folder. The password is stored encrypted.
- Mail is received every 5 minutes (up to 50 mails at a time), or at once with 「いますぐ受信する」 (receive now). Unread mail is read and marked as read.
- Mail in ISO-2022-JP and Shift_JIS and attachments (up to 20 per mail) are taken in.
- A new mail becomes a 「新規」 ticket, and the customer gets a receipt mail (number and link). "Re:" and the like are taken off the subject. If the text has words such as 「至急」「緊急」「止まって」 (urgent, stopped), the priority is set to 「高」 (high).
- If the sender's address is a registered contact, the ticket belongs to that customer. If not, it goes to the customer whose 「メールのドメイン」 (mail domains) match the address's domain, and a contact is made. For unknown senders, 「知らない差出人」 (unknown senders) chooses between making a ticket (with no customer) and not taking the mail in.
- For replies by mail and for mail that may be spoofed, see "Replies and internal notes" above and "Safety" below.

## Tickets from monitoring and error logs
Monitoring can make tickets through the API. The key is on the settings page.

~~~sh
curl -X POST https://your-exment/support/intake/alert \
  -H "X-SD-Key: (the key on the settings page)" \
  -H "Content-Type: application/json" \
  -d '{"title":"Disk full on web01","source":"web01.example.co.jp","severity":"error","detail":"/var 98%"}'
~~~

| Field | Meaning |
| --- | --- |
| `title` (required) | Subject (`message` also works) |
| `source` | Where it happened (`host` also works). When its domain matches a customer's mail domain, the ticket belongs to that customer |
| `severity` | Becomes the priority (`level` also works): critical, emergency, alert, fatal → urgent; error, high → high; others → normal |
| `fingerprint` | Marks the same error (made from the source and the subject when missing) |
| `detail` | Body |
| `customer` | Customer code |

A system that can pass the original mail (as a Postfix pipe) can POST it to `/support/intake/mail` (the same key).

- Tickets from monitoring are hidden from the customer at first.
- When "Support Desk: customer portal" is off in Feature Management, `/support/intake/alert` and `/support/intake/mail` return 404.

## Safety
- Customer links are long numbers that cannot be guessed, and only their hashes are stored. A link shows that one ticket only (no internal notes, other customers or agents' addresses).
- One-time codes last 10 minutes, 5 tries, once. Per link, codes can be sent 5 times an hour and wrong codes are allowed 10 times a day (beyond that, the link's code cannot be used until the next day).
- A ticket number in a subject adds the mail to that ticket only from the requester, CC or the same company.
- By default (recommended), only mail that passed the receiving server's check (DMARC, or DKIM / SPF aligned with the From domain) is trusted. Mail that cannot be checked is taken in as "possibly spoofed": no Cc is added and no contact is made; a reply to an existing ticket becomes an internal note hidden from the customer (tag "要確認"). The setting can be changed to "suspect only mail that failed the check".
- The request form does not show a link on the page after sending: it mails the link to the address entered. Until that link is opened, the ticket has the tag "メール未確認" and no contact is made.
- Auto-replies, bounces and mail from its own address are not taken in.
- Opening a satisfaction link does not save a rating.
- Only users who may "edit all" of the ticket table (such as the role group "サポートデスク 担当者") can use the agent desk. "Edit own data only" is not enough.

### Pages without login
For safety, Exment does not let a plugin's `config.json` open a page without login. A help desk needs a door for customers without an account, so this plugin registers `/support/...` itself while Exment starts, the same idea as Exment's public forms: the secret in the URL opens one thing only.

## Related
- [Official plugins](/plugin_official)
- [Plugin](/plugin)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/support-desk/README.md)
