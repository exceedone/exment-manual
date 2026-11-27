# Sales (CRM / SFA)
A feature that adds, at once, the tables, views, dashboard, menu and more to manage customers, deals, quotes, contracts and activities. It is a row of [Feature Management](/feature).

Note: this feature is in Exment v7.3.0 and later.  
Note: it is off at first. Turning it on makes what is listed under "What it adds" on the site.

## Turn it on
Turn it on in one of these ways.

- **In Feature Management**: log in as a system administrator and open "Admin Setting" → "[Feature Management](/feature)". Set "Sales (CRM / SFA)" under "Features of Exment" to "Use" and save.
- **On the initial setting screen**: on the [initial setting screen](/first_setting) of a new installation, check "Use Sales (CRM / SFA)?" under "Features". It is added after the initial setting is saved. You can also turn it on later in Feature Management.

When it is added, the message "The tables, views, dashboard, menu and more of "Sales (CRM / SFA)" were added. Add the users to its role group." is shown.  
Then add the users to the role group "Sales" on the [role group](/role_group) page.

Note: the "Who" column of Feature Management says "Set by the role groups it adds (the role group page)". Who may use it is set by the role group "Sales" (the permissions of the tables), not on this page.  
Note: the "Menu" column says "The menu it adds can be moved or removed on the menu page."

## What it adds

### Tables
| Table | Table name | Main columns |
| --- | --- | --- |
| Customers | `sales_customer` | Customer, type (prospect, customer, former customer), address, phone, email, website, owner |
| Customer contacts | `sales_customer_contact` | Name, department, title, phone, email (lines of a customer) |
| Deals | `sales_deal` | Deal, customer, stage (lead, proposal, quote, won, lost), expected amount, expected close date, probability, owner |
| Quotes | `sales_quote` | Subject, customer, deal, quote date, valid until, total |
| Quote lines | `sales_quote_detail` | Item, quantity, unit, unit price, amount (lines of a quote) |
| Contracts | `sales_contract` | Contract, customer, deal, contract date, start date, end date, auto renewal, amount, contract document |
| Activities | `sales_activity` | Type (visit, call, mail, next step), subject, date and time, customer, deal, owner (the login user by default), notes |

### Views
- **Kanban by stage** (deals): a [kanban view](/view_kanban) of the deals by stage, with the sum of the expected amounts of each stage. Moving a card changes its stage.
- The views used by the dashboard (its 5 boxes, below)

### Sales dashboard
"Sales dashboard" is added at the top of the menu "Sales & customers". It shows:

- Expected orders by month (a bar chart)
- Open deals by owner: the number of deals and the expected amounts
- Activities this month
- Quotes expiring soon (14 days)
- Contracts ending soon (30 days)

### Menu
The menu "Sales & customers" is added, with the sales dashboard, customers, deals, quotes, contracts and activities. It can be moved or removed on the [menu](/menu) page.

### Notice
"Contract ending soon (30 days before)": at 9:00, 30 days before the end date of a contract, the user who made the contract and the users who may see it get a notice in Exment. The days and more can be changed on the [notify](/notify) page.

### Role group "Sales"
A role group that may see, make and edit all the data of the 7 tables above. Add the users to it.

## Notes
- **If it fails partway**: what was made stays. The message "\"Sales (CRM / SFA)\" could not be added. Turn it on and save again; the log has the details." is shown, and the row is off again. Turning it on and saving again makes only what is missing. If it fails on the initial setting screen, the initial setting still finishes; turn it on later in Feature Management.
- **Turning it on any number of times** never makes the same thing twice. What the site changed (the names of the tables and views, the labels, the days of the notice, the role group, the menu) stays as it is.
- **What you deleted is made again**: if you delete a table or a view, then turn the feature off and on again, what you deleted is made again. To stop using something, remove it from the menu instead of deleting it.
- **Turning it off deletes nothing and hides nothing**: the tables, data, views, dashboard, menu, notice and role group stay, and the menu is still shown. To stop using it, remove it from the [menu](/menu) or remove the users from the role group.
- **If the site has tables with the same names**: if the site already has its own tables with the same names as the sales tables (`sales_customer`, `sales_deal` and the others starting with `sales_`), no new table is made; the missing columns are added to those tables. Their columns and data stay as they are.
- **Sites that installed the old sales template**: on a site that installed the old [template](/template) "Sales pack", only what is missing is added, as above. The stage column of the deals keeps its old name (「状態」 in Japanese; on a new installation it is 「段階」). To change it, use the [custom column](/column) page.

## Lock it on the server
With `sales` in `EXMENT_FEATURES_LOCKED` of the server's `.env`, this feature stays off and is not shown on the initial setting screen either. See [Lock features on the server](/feature?id=lock-features-on-the-server).

## Related
- [Feature Management](/feature)
- [Role group](/role_group)
- [Kanban view](/view_kanban)
- [Dashboard](/dashboard)
- [Menu](/menu)
- [Notify](/notify)
