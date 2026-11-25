# Template
A "template" puts the settings of tables, columns, forms, menus, dashboards and so on together in one file. This page explains how to import and export templates.

| What you want to do | Where to look |
|---|---|
| Let other users use the tables and so on made in this system | Export |
| Take in a template made by someone else, or a template prepared by Exment | Import |
| Add a mechanism for requests and approvals all at once | Bundled template: Request pack |
| Write in Excel and create several tables at once | Import - Excel template |

When you import a template, you do not need to create custom tables and so on from scratch.

## Page display
- Select "Template" in the left menu.  
Or open the following URL.  
http(s)://(URL of Exment)/template  
The template screen is displayed.  
![Template screen](img/template/template1.png)  

> Note: the URL is for the default setting without "/admin" (a site newly installed with v7.2.1 or later). If `ADMIN_ROUTE_PREFIX` in `.env` has a value (a site installed with an older version has "admin"), add that value after the URL of the site (e.g. `http(s)://(URL of Exment)/admin/template`). For details, see [Change / delete "admin" included in URL](/additional_prefix).


## Export
Fill in the necessary items in "Export" toward the top of the page and click "Submit". A zip file containing the settings is output.  
![Template screen](img/template/template_export0.png)  

##### Template Name  
The name used inside the system. Enter it with half-width alphanumeric characters, "-" or "_".  
Use a name that does not overlap with other template files.

##### Template View Name  
Enter the template name shown on the template screen.

##### Template Description  
Enter the description shown on the template screen.

##### Thumbnail  
Upload the thumbnail shown on the template screen. The recommended size is 256px*256px.  
When you do not upload one, the "No Image" image is shown on the template screen.

##### Export Target  
Select what to put in this template. When the template is imported, the items selected here are taken into the system.  
The targets you can select are "Table", "Menu", "Dashboard", "Role group" and "Workflow".  
Note: "Workflow" can be selected in v7.0.0 or later.  
![Template screen](img/template/template_export1.png)  

##### Target Tables
When "Table", "Menu", "Role group" or "Workflow" is selected in "Export Target", only the contents related to the tables selected here are exported.  
Select them when you want to make a template only from the contents related to the tables you created.  
Note: when nothing is selected, all items are exported.
![Template screen](img/template/template_export2.png)  

##### Save
When you have finished entering, click [Submit]. The template file is exported with the entered contents. The data format is a zip file.


## Import
There are currently the following three kinds of templates that can be imported.
- Templates prepared by Exment
- Templates uploaded from the screen
- Templates uploaded to the system in the past (they can be imported again)
![Template screen](img/template/template_import0.png)  

Do the import in one of the following ways.

- ##### Install Template:
A list of the templates prepared by Exment and the templates uploaded in the past is shown.  
Select the template you want to import from it.

- ##### Template upload (zip):
Upload the Exment template file you have from the screen.  
The file format is zip.

- ##### Template upload (Excel):
Upload the Excel template file you made from the screen.  
The file format is xlsx.  
Note: for details, see ["Excel template"](#import-excel).

##### Save  
After doing one of the above, click "Submit". The selected template, or the uploaded template, is imported into the system.  
The information of the tables, forms, views, dashboards and so on defined in the template is installed in the system.


### Bundled template: Request pack
(From v7.2.1) A template that adds approval requests (ringi), expense claims, business trip requests, payment requests and leave requests, together with an approval workflow. Select "Request pack" in "Install Template" and import it.

| What it adds | Contents |
|---|---|
| Tables | Approval request (ringi), Expense claim (lines: date, account, paid to, amount, receipt), Business trip request, Payment request, Leave request |
| Workflow "Requests and approvals (standard)" | Shared by the five requests. "下書き" (Draft) → [申請] (Apply) → "申請中" (Applying) → [承認] (Approve) → "承認済み" (Approved; it can no longer be edited) / [差し戻し] (Send back; comment required) → "差し戻し" (Sent back) → [再申請] (Apply again) → "申請中" (Applying) |
| Role groups | Applicants (make and edit their own requests), Approvers (see all requests) |
| Menu | Requests & approvals ▸ Pending tasks, Approval request (ringi), Expense claim, Business trip request, Payment request, Leave request |

#### After importing
1. In "Role group", put the staff who make requests in **Applicants** and the people who approve in **Approvers**.
2. The "Requests & approvals" menu is shown only to the applicants and approvers (and system administrators) ([Role groups that see it](/menu?id=role-groups-that-see-it)). Right after importing there are no applicants, so it is shown only to system administrators.

#### From a request to its approval
1. An applicant makes an "Approval request (ringi)" or another request, saves it, and presses [申請] (Apply). At this time, the applicant **chooses the person who approves**.
2. It goes into the "Pending tasks" of the chosen person. That person looks at the contents and presses [承認] (Approve) or [差し戻し] (Send back).
3. When it is sent back, the applicant fixes it and presses [再申請] (Apply again).

Note: the approver is chosen at the time of the request. It is not decided by role group (the permissions of a workflow are decided by user, organization, created user or column). To have fixed people approve, change who executes the "承認" (Approve) and "差し戻し" (Send back) actions in "[Workflow](/workflow_setting)".  
Note: the tables, forms and workflow can be changed in the same way as ordinary custom tables and workflows.

<h3 id="import-excel"><a href="#/template?id=import-excel" data-id="import-excel" class="anchor"><span>Import - Excel template</span></a></h3>

You can fill in the necessary items in an Excel template file and import table settings and so on.  
Unlike creating them one by one on the screen, several tables and so on can be created at once.

![Template screen](ja/img/template/template_import_excel1.png)  


#### How to do it
- Download the [Excel template file](https://exment.net/downloads/template/exment_template.xlsx) and open it.

- Enter the setting values in the template file. The settings and the matching sheet names are as follows.
    - Custom table: custom_tables
    - Custom column: custom_columns
    - Custom table (extended settings): custom_column_multisettings
    - Relation settings: custom_relations
    - Menu: admin_menu

- After filling it in, select the Excel file you made in the "Upload (Excel)" item of the template screen and upload it.

![Template screen](ja/img/template/template_import_excel2.png)  

#### Notes
- At present, the following settings can be imported with an Excel template file. Set the other settings (forms, views and so on) from the screen.
    - Custom table
    - Custom column
    - Custom table (extended settings)
    - Relation settings
    - Menu

- Among custom columns, the "Calc Formula" setting is not supported.  
Do this setting from the screen.

- <span class="red">To add "User" and "Organization" columns as custom columns, write "user" and "organization" in column D "column_type" (column type) of the sheet "custom_columns".</span>  
When column D "column_type" is "select_table" and column AD "options.select_target_table_name" (the target table name of the options) is "user" or "organization", it does not work correctly.  
If you have already imported it that way, do the update on the [page of the fix steps](/ja/patch/select_table_user_org) (Japanese).

- Do not change the sheet names of the Excel file. Also, do not add Excel columns.  
(Adding sheets is no problem.)

- At present, the import process does not do validation (checking of the entered contents).  
We recommend trying it in a test environment first and then importing it into the production environment.

#### Template and sample
- [Excel template file](https://exment.net/downloads/template/exment_template.xlsx)

- [Excel template file - sample](https://exment.net/downloads/sample/template/exment_template_sample.xlsx)
