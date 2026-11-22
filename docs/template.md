# Template
Import or export Exment tables, columns, form information, menus, dashboards, and other information.  
By importing templates created by other users into this system, you can eliminate the need to create custom tables and other items.  
In addition, you can export custom tables created with this system as templates so that other users can use them.  

## Page display
- Select "Template" from the left menu.  
Or access the following URL.  
http(s)://(Exment URL)/admin/ template  
This will display the template screen.  
![Template screen](img/template/template1.png)  

> Note: "admin" in the URLs is the default setting. If you have changed or removed it with `ADMIN_ROUTE_PREFIX` in `.env`, replace "admin" with that value (if removed, omit "/admin", e.g. `http(s)://(Exment URL)/oauth/token`). For details, see [Change / delete "admin" included in URL](/additional_prefix).


## Export
Export the template.  
Fill out the necessary items in the "Export" item on the page and click "Send" to output a zip file with the required information.
![Template screen](img/template/template_export0.png)  

- Template name: Enter the name to be used in the system when exporting, using alphanumeric characters, "-" or "_".  
Enter a name that does not duplicate with other template files.  

- Template display name: Enter the template name to be displayed on the template screen.  

- Template description: Enter the description to be displayed on the template screen.  

- Thumbnail: Upload the thumbnail to be displayed on the template screen. The recommended size is 256px * 256px.  
If you do not upload, "No Image" image will be displayed on the template screen.

- Export target: Select what to export with this template. When you import a template, the selected items are imported into the system.  
The following targets can be selected: "Table", "Menu", "Dashboard", "Role group", "Workflow".  
※ "Workflow" can be selected in v7.0.0 or later.  
![Template screen](img/template/template_export1.png)  

- Export target table: When "Table", "Menu", "Role group" or "Workflow" is selected in "Export target", only the contents related to the table selected in this table will be exported.  
Select this if you want to create a template by exporting only the contents related to the table you created.  
※ If not selected, all items will be exported.
![Template screen](img/template/template_export2.png)  

- When you are finished, click Submit.  
The template file will be exported according to the entered information.  
The data format is a zip file.

## Import
Import the template.  
Currently, there are three types of templates that can be imported.  

- Templates provided by Exment
- Template uploaded from screen
- Templates uploaded in the past in the system (can be imported again)
![Template screen](img/template/template_import0.png)  

Execute the import using one of the following methods.  

- Installation templates:  
A list of templates prepared in Exment or templates uploaded in the past is displayed.  
From that, select the template you want to import.  

- Template upload:  
Please upload the Exment template file you have from the screen.  
The file format is zip.  

- After doing either of the above, click "Submit". This will import the selected or uploaded template into the system.  
As a result, information such as tables, forms, views, and dashboards defined in the template is installed on the system.

### Bundled template: Request pack
(From v7.2.1.) A template with approval requests, expense claims, business trip, payment and leave requests, together with an approval workflow. Import "Request pack" from "Install template".

| What it adds | Contents |
|---|---|
| Tables | Approval request (ringi), expense claim (lines: date, account, paid to, amount, receipt; from v7.3.0 also a **total** of the lines), business trip request, payment request, leave request |
| Workflow "申請・承認（標準）" | Shared by the five requests. Draft → [申請] → 申請中 → [承認] → 承認済み (no longer editable) / [差し戻し] (comment required) → 差し戻し → [再申請] → 申請中 |
| Role groups | Applicants (make and edit their own requests), Approvers (see every request) |
| Menu | Requests & approvals ▸ Pending tasks and the five requests |

#### After importing
1. In "Role Group", put the staff who make requests in **Applicants** and the people who approve in **Approvers**.
2. The "Requests & approvals" menu is shown only to the applicants and approvers (and system administrators) ([Role groups that see it](/menu?id=role-groups-that-see-it)). Right after importing nobody is an applicant, so only system administrators see it.

#### From a request to its approval
1. An applicant makes a request (for example an approval request), saves it and presses [申請], **choosing who approves it**.
2. It appears in "Pending tasks" of that person, who presses [承認] or [差し戻し].
3. When it is sent back, the applicant fixes it and presses [再申請].

※The approver is chosen when submitting, not set by a role group (workflow permissions are given to users, organizations, the creator or a column). To have fixed approvers, change who can run "承認" and "差し戻し" in [Workflow](/workflow_setting).
※The tables, forms and workflow can be changed like any custom table and workflow. The statuses and actions of the workflow are in Japanese.

### Bundled template: Sales pack
(From v7.3.0.) Customers, deals, quotes and contracts. Import "Sales pack" from "Install template".

| What it adds | Contents |
|---|---|
| Tables | Customers (lines: contacts), deals (stage: lead → proposal → quote → won / lost, expected amount, expected close date, probability), quotes (lines: item, quantity, unit, unit price, amount), contracts (start, end, auto renewal, amount, document) |
| Calculation | The **amount** of a quote line is quantity × unit price; the **total** of a quote adds up its lines (filled in as you type) |
| Role group | Sales (see, make and edit everything) |
| Menu | Sales & customers ▸ Customers, Deals, Quotes, Contracts (shown only to Sales and system administrators) |

After importing, put the sales staff in **Sales** in "Role Group".

### Bundled template: Asset pack
(From v7.3.0.) A register of assets and equipment, requests to buy, move or dispose of them, stocktaking and lending.

| What it adds | Contents |
|---|---|
| Tables | Assets (asset no., category, location, managing department, user, purchase date and price, status, photo), asset requests (purchase / transfer / disposal), stocktaking (lines: asset, result found / missing / damaged), lending (lent on, due, returned on) |
| 2D barcodes | The asset table uses 2D barcodes (QR). Make them with [二次元バーコード新規作成] on the list and stick them on the assets; scanning one opens its asset ([2D barcode](/2d_barcode)) |
| Workflow "資産の申請（標準）" | Asset requests only. The same flow as the Request pack; the approver is chosen when submitting |
| Role groups | Asset managers (see, make and edit everything), Asset users (see assets and lending, make asset requests) |
| Menu | Assets ▸ Assets, Asset requests, Stocktaking, Lending (shown only to the two role groups and system administrators) |

※An approved request does not change the status of the asset by itself; an asset manager updates it.

### Bundled template: HR pack
(From v7.3.0.) A staff list and the procedures for joining, leaving and transfers.

| What it adds | Contents |
|---|---|
| Tables | Staff (staff no., user, department, position, employment type, joined on, extension, work location, status active / on leave / left), joining & leaving (type, person, date, status to do / in progress / done; lines: task, assignee, due, done) |
| Role groups | HR & general affairs (see, make and edit everything), Staff (see the staff list) |
| Menu | HR & general affairs ▸ Staff, Joining & leaving (shown only to the two role groups and system administrators) |

The staff list is a table of its own linked by a "User" column; no column is added to the login users. For someone without a user yet (before joining), write the name in "Person".
