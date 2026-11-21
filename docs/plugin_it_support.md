# IT Support (official plugin)
"IT Support" is an **official plugin** of Exment for IT support and help desks. Requests from customers (mail, a request form, phone) and problems found by monitoring or error logs are managed as tickets, and **their progress is shared with the customer without login**. It is free.

- Source code and docs: [exceedone/exment-plugins (it-support)](https://github.com/exceedone/exment-plugins/tree/main/it-support)
- License: GPL-3.0 (the same as Exment)
- Name in the plugin list: Exment Plugin IT Support（ITサポート）. The internal name is `ExmentITSupport` and the URL is `/admin/plugins/exment_it_support`.

<!-- Screenshot: the agent desk (img/plugin_it_support/its_desk.png). Take it after 2b checks the page -->

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
1. Install the plugin: from Feature Management on Exment v7.2.0 or later, by uploading the zip on older ones. See [Official plugins](/plugin_official).
2. On Exment v7.2.0 or later, turn on "ITサポート：受付箱" (IT Support: desk) in "Admin Setting" > "[Feature Management](/feature)" (the setup page does not open while it is off). Choose the role groups that may use the desk. To use the customer door (`/support`), mail intake and tickets from monitoring, turn on "ITサポート：お客様の窓口" (IT Support: customer door) too (it works only while the desk is on).
   - On a new site both are off at first. Sites that used IT Support before Feature Management keep both on.
3. Open "ITサポート" in the menu (or `/admin/plugins/exment_it_support`) and press "セットアップする" (set up). Tables, menus, permissions, SLA, kinds, canned replies and sample FAQ are made.
4. In "設定" (settings), enter the mailbox for requests (IMAP) and the address of the desk, save, and press "IMAP につながるか試す" (test IMAP). To receive mail, also enter "差出人の確認" (sender check) and "受信サーバーの名前" (the name of the receiving server: the first name in Authentication-Results of received mail). Until then, tickets from mail are marked "possibly spoofed".
5. Put agents in the role group "ITサポート 担当者". Customers who log in go in "ITサポート お客様", linked by "Exment のユーザー" of "お客様の担当者".
6. Tell customers the URL of the desk (`https://your-exment/support`).

## Tickets from monitoring and error logs
Monitoring can make tickets through the API. The key is on the settings page.

~~~sh
curl -X POST https://your-exment/support/intake/alert \
  -H "X-ITS-Key: (the key on the settings page)" \
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
- When "ITサポート：お客様の窓口" is off in Feature Management, `/support/intake/alert` and `/support/intake/mail` return 404.

## Safety
- Customer links are long numbers that cannot be guessed, and only their hashes are stored. A link shows that one ticket only (no internal notes, other customers or agents' addresses).
- One-time codes last 10 minutes, 5 tries, once. Per link, codes can be sent 5 times an hour and wrong codes are allowed 10 times a day (beyond that, the link's code cannot be used until the next day).
- A ticket number in a subject adds the mail to that ticket only from the requester, CC or the same company.
- By default (recommended), only mail that passed the receiving server's check (DMARC, or DKIM / SPF aligned with the From domain) is trusted. Mail that cannot be checked is taken in as "possibly spoofed": no Cc is added and no contact is made; a reply to an existing ticket becomes an internal note hidden from the customer (tag "要確認"). The setting can be changed to "suspect only mail that failed the check".
- The request form does not show a link on the page after sending: it mails the link to the address entered. Until that link is opened, the ticket has the tag "メール未確認" and no contact is made.
- Auto-replies, bounces and mail from its own address are not taken in.
- Opening a satisfaction link does not save a rating.
- Only users who may "edit all" of the ticket table (as the role group "ITサポート 担当者") can use the agent desk. "Edit own data only" is not enough.

### Pages without login
For safety, Exment does not let a plugin's `config.json` open a page without login. A help desk needs a door for customers without an account, so this plugin registers `/support/...` itself while Exment starts, the same idea as Exment's public forms: the secret in the URL opens one thing only.

## Related
- [Official plugins](/plugin_official)
- [Plugin](/plugin)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/it-support/README.md)
