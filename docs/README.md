# Exment manual
<p align="center">
<img src="https://exment.net/docs/img/common/exment_logo_side.png" alt="Exment" style="border:none;">
</p>

**Exment is a free web database: you build your business apps on the screen, without code.** Plugins let you add any feature you need. From this page, open the guide for the feature you want to use.

[What Exment can do (overview)](/concept)　/　[New to Exment (quick start)](/quickstart)　/　[Settings for administrators](/system_setting)　/　[API](/api) and [plugins](/plugin)

## Main features
Click a name to open its guide. The tag on the right is the version you need ("Standard" means it has been there for a long time).

### The database

**🗂️ [Tables and columns](/table)**　`Standard`  
Make the tables that hold your data, and their items (columns), on the screen. Text, numbers, dates, choices, files and many more types.

**🔗 [Relations (linking tables)](/relation)**　`Standard`  
Link tables, such as "Company" and "Contact". One-to-many and many-to-many.

**📝 [Forms (input screens)](/form)**　`Standard`  
Decide the order and headings of the input screen. You can switch screens by person or by case.

**📋 [Views (list, summary, calendar, kanban, Gantt)](/view)**　`7.0`  
See the same data in many ways. Kanban and Gantt chart views are available from 7.0.

**🧰 [Data list tools](/data_grid_tools)**　`7.1`  
Show, pin and group columns, edit in place, use the keyboard as in Excel, and act on many rows at once.

**🎨 [Display presets](/cell_style_preset)**　`7.0`  
Save the color, shape and icon of cells under a name, and use them in many lists.

**📊 [Dashboard](/dashboard)**　`Standard`  
Put charts, lists and calendars on your home page. Click a chart to filter.

**🔍 [Search](/search) and [full-text search (Meilisearch)](/additional_meilisearch)**　`7.0`　`easy setup 7.2.2`  
Search all tables by words. With a lot of data, Meilisearch makes it faster.

**📥 [Import and export](/data_import_export)**　`Standard`  
Bring in many rows from Excel or CSV. You can also export a list to a file.

### Running your work

**✅ [Workflow (requests and approvals)](/workflow_setting)**　`7.0`  
Make the flow of request, approval and sending back. From 7.0, you can [draw the flow](/workflow_design).

**🔔 [Notifications (email, Slack, Teams, LINE)](/notify)**　`Standard`  
Tell people when data changes, when a due date is near, or when a request is approved. [LINE](/line) is from 7.1.

**🌐 [Public forms](/publicform)**　`Standard`  
Make a form that people outside your company can fill in without logging in.

**👥 [Permissions and organizations](/permission)**　`Standard`  
Decide who can see or change which tables and data, with [role groups](/role_group) and [organizations](/organization).

### Extending Exment (plugins and more)

**🔌 [Plugins](/plugin)**　`Standard`  
Add your own buttons, pages, views, batches, APIs and more. The most flexible way to extend Exment. See also [how to make one](/plugin_quickstart).

**📦 [Official plugins (project management, Support Desk, groupware)](/plugin_official)**　`NEW (7.2.1)`  
[Project management](/plugin_pm), [Support Desk](/plugin_support_desk) and [groupware](/plugin_groupware) come with Exment from 7.2.1. Just turn them on in "Features".

**🧩 [Studio (build screens and a phone app)](/studio)**　`NEW (7.2.1)`  
Place parts to make a table, its input screen and its list. The screens also work in the phone app.

**📁 [File sharing](/file_server)**　`NEW (7.2.1)`  
Share folders and files in a space for each team. You can go back to an older version and make share links.

**🤖 [API keys](/api_key) and [MCP (connect from AI)](/mcp)**　`NEW (7.2.1)`  
Users can make their own API keys. AI such as Claude can read Exment data with that user's permissions.

### Managing Exment

**⚙️ [Features](/feature)**　`NEW (7.2.1)`  
On one screen, decide whether to use each new feature and plugin, and who can use it.

**🚀 [Tuning](/tuning)**　`NEW (7.2.1)`  
See the settings that make Exment faster, and their state now. Some can be changed with a button on the screen.

**🛡️ [Security (two-factor login, IP limits, security check)](/security_check)**　`NEW (7.2.1)`  
Besides [two-factor login](/login_2factor) and the [IP filter](/additional_ip_filter), from 7.2.1 you can check on the screen for unsafe settings.

**💾 [Backup and restore](/backup)**　`Standard`  
Save your data and files, and bring them back later. It can also save automatically at a set time.

**🌏 [Language and time zone per user](/user_locale)**　`NEW (7.2.4)`  
Each user can choose the language and time zone of the screen.

## Find by what you want to do

| What you want to do | Page |
|---|---|
| Install Exment and start | [Installation flow](/quickstart) |
| Settings before you start | [Initial setting](/first_setting) |
| Make tables and columns | [Tables](/table) / [Columns](/column) |
| Arrange the input screen | [Forms](/form) |
| Bring in data from Excel or CSV | [Data import](/data_import_export?id=data-import) |
| See data as a list, kanban, Gantt chart or calendar | [Views](/view) |
| Put charts and summaries on the home page | [Dashboard](/dashboard) |
| Find data | [Search](/search) |
| Run requests and approvals | [Workflow](/workflow_setting) / [Request pack](/template?id=bundled-template-request-pack) |
| Tell people when something changes | [Notifications](/notify) / [LINE](/line) |
| Let people outside fill in a form | [Public forms](/publicform) |
| Add users and organizations | [Users](/user) / [Organizations](/organization) |
| Decide who can see what | [Permissions](/permission) / [Role groups](/role_group) |
| Decide how people log in (SSO, two-factor) | [Login settings](/login_setting) / [Two-factor login](/login_2factor) |
| Share files in a team | [File sharing](/file_server) |
| Choose the features to use | [Features](/feature) |
| Connect other systems | [API](/api) / [API keys](/api_key) |
| Read data from AI (such as Claude) | [MCP](/mcp) |
| Add your own features | [Plugins](/plugin) / [How to make one](/plugin_quickstart) |
| Bring back deleted data | [Deleted data](/deleted_data) |
| Back up | [Backup and restore](/backup) |
| When screens are slow | [Tuning](/tuning) |
| Update to a new version | [Update](/update) |
| When something does not work | [Troubleshooting](/troubleshooting) |

## What is Exment
### Move your work out of spreadsheets and scattered files.
Exment is a **free, open source web database for building your own business apps without code**. Bring customers, deals, requests and tasks into one place, and run them as a team.

- **No code, real results fast**: tables, forms, lists, kanban boards, Gantt charts and summaries, all set up on the screen.
- **From request to approval, as a team**: workflows, notifications, public forms and an API, built in.
- **Free, however many users you add**: open source (GPL), so the price never grows with your headcount.
- **On your server or in the cloud**: runs on your own server, a rental server, AWS, Azure and more, so your data stays yours.

## Try it now
- **Try the demo**: log in and try project management, deals, workflows and public forms. The login is on the <a href="https://exment.net/en/demo-env/" target="_blank">demo page</a>.
- **Start for free**: the install steps start [here](/quickstart).
- **See what it can do**: <a href="https://exment.net/en/functions/" target="_blank">functions and screenshots</a> / <a href="https://exment.net/en/whats-new/" target="_blank">What's new</a> (the new features of each version) / [Release notes](/release_note)
- **Talk to us**: <a href="https://exment.net/assets/exment-flyer-en.pdf" target="_blank">brochure (PDF)</a> / <a href="https://exment.net/en/inquiry/" target="_blank">contact us</a> (about starting with Exment or moving from another tool)

<a href="https://exment.net/en/" target="_blank">Exment official site</a>

## About this manual
This manual is always written for the newest version of Exment.
For a feature or a command added in a later version, it may not say from which version you can use it. Thank you for your understanding.


## Manual menu
Menus marked with "<span style="color:red;">*</span>" are particularly important.

<div class="container-fluid" style="margin-bottom:2em;">
    <div>
        <h4>1. First of all</h4>
        <div class="row">
            <div class="col-sm-6 tile tile">
                <a href="#/concept">
                    <div class="tile-inner">
                        <h5>Exment concept</h5>
                        <p>The ideas and the concept behind Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/start_flow">
                    <div class="tile-inner">
                        <h5>Flow until start of business</h5>
                        <p>The standard steps until you start your work with Exment.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>2. Installation and initial settings</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/quickstart">
                    <div class="tile-inner important-topic">
                        <h5>Getting started</h5>
                        <p>An overview of the steps to check first before you start using Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/server">
                    <div class="tile-inner important-topic">
                        <h5>Server settings</h5>
                        <p>Set up the web server and the database to install Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/quickstart_easy">
                    <div class="tile-inner important-topic">
                        <h5>Exment application installation procedure</h5>
                        <p>The installation steps needed to start Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/first_setting">
                    <div class="tile-inner important-topic">
                        <h5>Initial setting</h5>
                        <p>The first settings after the installation, such as the login ID of the first administrator.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/update">
                    <div class="tile-inner important-topic">
                        <h5>Update</h5>
                        <p>The steps to update Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/quickstart_more">
                    <div class="tile-inner">
                        <h5>Additional settings</h5>
                        <p>The steps for additional settings of Exment, such as changing the "/admin" path and setting the task schedule.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/mailsend_setting">
                    <div class="tile-inner">
                        <h5>Email sending settings</h5>
                        <p>The steps to send emails to users. It also describes how to send a test email.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>3. Login settings</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/login_setting">
                    <div class="tile-inner">
                        <h5>Login settings</h5>
                        <p>The various settings for logging in to Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/login_sso">
                    <div class="tile-inner">
                        <h5>SSO settings</h5>
                        <p>How an administrator sets up SSO login.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/login_2factor_setting">
                    <div class="tile-inner">
                        <h5>Two-factor authentication settings</h5>
                        <p>How an administrator sets up two-factor authentication.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/login_2factor">
                    <div class="tile-inner">
                        <h5>Login (two-factor authentication)</h5>
                        <p>The steps to log in with two-factor authentication.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>4. Table settings</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/table">
                    <div class="tile-inner important-topic">
                        <h5>Table settings</h5>
                        <p>The most basic setting of Exment. The steps to set up a custom table, where data is saved.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/column">
                    <div class="tile-inner important-topic">
                        <h5>Custom column settings</h5>
                        <p>The settings of the custom columns that belong to a custom table.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/relation">
                    <div class="tile-inner">
                        <h5>Relation settings</h5>
                        <p>The settings of relations, which connect one table to another.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/form">
                    <div class="tile-inner">
                        <h5>Custom form settings</h5>
                        <p>Manage the form items used on the data entry screen.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/view">
                    <div class="tile-inner important-topic">
                        <h5>Custom view settings</h5>
                        <p>Manage the view items used on the data list screen.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/operation">
                    <div class="tile-inner">
                        <h5>Data update event settings</h5>
                        <p>Update column values when data is created or updated, when a button is clicked, and so on.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>5. Data management</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/data">
                    <div class="tile-inner important-topic">
                        <h5>Data</h5>
                        <p>The steps to list, add, edit, show and delete data in the tables you made.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/data_grid">
                    <div class="tile-inner important-topic">
                        <h5>List of data</h5>
                        <p>Shows the saved data as a list.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/data_form">
                    <div class="tile-inner important-topic">
                        <h5>Data form (data details)</h5>
                        <p>Add and edit data in a table.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/data_import_export">
                    <div class="tile-inner">
                        <h5>Data import / export</h5>
                        <p>Add, update and delete data in a table in one go from a CSV or Excel file. Also writes the data of a table to a CSV or Excel file.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/data_cmd_import_export">
                    <div class="tile-inner">
                        <h5>Data import / export (command)</h5>
                        <p>Run the data import and export from commands.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/data_bulk_insert">
                    <div class="tile-inner">
                        <h5>Data import (large amount of data)</h5>
                        <p>Add CSV data to a table in one go. It handles a large amount of data.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/search">
                    <div class="tile-inner">
                        <h5>Data search</h5>
                        <p>The steps to search the saved data.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>6. User / Organization / Role Authority</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/permission">
                    <div class="tile-inner important-topic">
                        <h5>Overview of roles and authorities</h5>
                        <p>An overview of roles and permissions in Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/user">
                    <div class="tile-inner important-topic">
                        <h5>User and login user management</h5>
                        <p>The steps to manage user information and to set up logging in to the system.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/organization">
                    <div class="tile-inner important-topic">
                        <h5>Organization management</h5>
                        <p>The steps to set up the organizations that users belong to.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/role_group">
                    <div class="tile-inner">
                        <h5>Role group / Authority</h5>
                        <p>Settings so that only certain users can manage certain data and pages.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/multiuser">
                    <div class="tile-inner">
                        <h5>Settings for external portal sites</h5>
                        <p>Recommended when, on the data list and edit screens, you want to show only the organizations of the logged-in user and the users who belong to them.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>7. Workflow</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/workflow_setting">
                    <div class="tile-inner important-topic">
                        <h5>Workflow setting example</h5>
                        <p>Examples of workflow settings.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/workflow_example">
                    <div class="tile-inner">
                        <h5>Workflow settings</h5>
                        <p>The workflow settings made by an administrator.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/workflow_execution">
                    <div class="tile-inner">
                        <h5>Workflow execution</h5>
                        <p>The steps for each user to run a workflow.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/workflow_task">
                    <div class="tile-inner">
                        <h5>Pending tasks</h5>
                        <p>Check the workflow data waiting for your action, across all tables.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>8. Public form</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/publicform">
                    <div class="tile-inner">
                        <h5>Public form</h5>
                        <p>Set up a public form, where general users (users who are not logged in) can enter data.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>9. Other standard functions</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/template">
                    <div class="tile-inner">
                        <h5>Template</h5>
                        <p>Import or export information such as custom tables and columns.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/backup">
                    <div class="tile-inner">
                        <h5>Backup and restore</h5>
                        <p>Back up and restore the saved data and the database.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/menu">
                    <div class="tile-inner">
                        <h5>Menu</h5>
                        <p>Manage the items shown in the left menu.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/dashboard">
                    <div class="tile-inner">
                        <h5>Dashboard</h5>
                        <p>Manage the contents of the top page, shown first when you log in.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/mail">
                    <div class="tile-inner">
                        <h5>Notification template</h5>
                        <p>Set the subject and the body of the emails sent to users.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/notify">
                    <div class="tile-inner">
                        <h5>Notification</h5>
                        <p>The steps to set up sending emails when data is updated or when a button is clicked.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/line">
                    <div class="tile-inner">
                        <h5>LINE integration</h5>
                        <p>Connect a LINE Official Account to receive notifications and run workflow actions on LINE.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/safety_check">
                    <div class="tile-inner">
                        <h5>Safety check</h5>
                        <p>Check the safety of employees by LINE and email in an emergency such as an earthquake.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/logs">
                    <div class="tile-inner">
                        <h5>Logs</h5>
                        <p>About the various logs of Exment.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>10. Extension</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/api">
                    <div class="tile-inner">
                        <h5>API</h5>
                        <p>How to use the API to connect with other systems.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/plugin">
                    <div class="tile-inner">
                        <h5>Plugin</h5>
                        <p>How to manage the plugins you developed.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/plugin_quickstart">
                    <div class="tile-inner">
                        <h5>Plugin creation method</h5>
                        <p>How to make a plugin, for each type.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>11. Reference</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/params">
                    <div class="tile-inner">
                        <h5>Parameter variables</h5>
                        <p>The list of variables for replacing parameters with values, in auto numbering, document output and so on.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="https://exment.net/reference/webapi.html">
                    <div class="tile-inner">
                        <h5>API reference</h5>
                        <p>The Web API reference.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/func_reference">
                    <div class="tile-inner">
                        <h5>Function reference</h5>
                        <p>The reference of classes and functions such as custom tables, custom columns and custom data.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/column_reference">
                    <div class="tile-inner">
                        <h5>Custom column reference</h5>
                        <p>The detailed specification of custom columns, and the reference for getting and setting column values in a plugin.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/plugin_reference">
                    <div class="tile-inner">
                        <h5>Plugin reference</h5>
                        <p>The reference of the classes and functions used when you develop your own plugin.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/config">
                    <div class="tile-inner">
                        <h5>List of setting values</h5>
                        <p>The list of the values that can be set in Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/command">
                    <div class="tile-inner">
                        <h5>Command list</h5>
                        <p>The list of the commands that can be run in Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/release_note">
                    <div class="tile-inner">
                        <h5>Release notes</h5>
                        <p>The history of past releases.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/patch_weakness">
                    <div class="tile-inner">
                        <h5>Patch / Vulnerability List</h5>
                        <p>The list of past bugs that need manual steps, and of past vulnerabilities.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/troubleshooting">
                    <div class="tile-inner">
                        <h5>Troubleshooting</h5>
                        <p>How to solve problems with Exment, and answers to frequent technical questions about Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/license">
                    <div class="tile-inner">
                        <h5>License</h5>
                        <p>The open source libraries used in Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/develop_memo">
                    <div class="tile-inner">
                        <h5>Development notes</h5>
                        <p>A collection of notes on detailed specifications and other small things.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
