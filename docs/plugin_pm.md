# Project Management (official plugin)

"Project Management" (「プロジェクト管理」) is an **official plugin** of Exment, made, tested and supported by Exceed One.  
It manages projects and tickets (issues) on Exment's own tables. It is free.

- Source code and docs: [exceedone/exment-plugins (project-management)](https://github.com/exceedone/exment-plugins/tree/main/project-management)
- License: GPL-3.0 (the same as Exment)
- Product page: [Project Management (exment.net)](https://exment.net/en/project-management/)
- Name in the plugin list: Exment Plugin PM（プロジェクト管理）. The zip and internal name is `ExmentPM` (`PmPortal` up to 1.2.0, `ExmentPluginPM` in 1.3.0).

## What it does

| Feature | Content |
| --- | --- |
| Projects | Each project has its issues, board, Gantt chart, wiki and files. Members are project managers, members or viewers (on Exment's role groups). |
| Issues | A list with filters and quick filters, a parent / child tree, inline editing in the list, bulk update and attachments. The body is written in Markdown, and images can be pasted. |
| Milestones | Issues per milestone, and a burndown chart. |
| Board and Gantt chart | Shows the issues on a board by status, or on a Gantt chart. |
| Wiki and files | Share the documents of the project with a wiki and files. |
| Comments | Comment on an issue. Name the users to notify (mentions) or ask for a review. |
| Read / unread | See who has read an issue. Issues you have not seen are tinted in the list. |
| Notifications | Bells on the screen, and mail on a new issue or comment, or with the "mail this issue" button (sent with Exment's mail settings). |
| Settings | In ⚙ Settings: the portal settings and the update of the data structure. System administrators can use "Data migration": export projects with comments, history and attachments to a ZIP and import it into another Exment (check first, then write). |

## Requirements
- Exment 7.0 or later (PHP 8.2 or later)

## Install

### 1. Download
Download the newest zip from [Releases](https://github.com/exceedone/exment-plugins/releases) on GitHub. Do not unzip it.

- Latest version (v1.4.0): [ExmentPM-1.4.0.zip](https://github.com/exceedone/exment-plugins/releases/download/ExmentPM-v1.4.0/ExmentPM-1.4.0.zip)

※Do not use the green "Code → Download ZIP" button: that is the whole repository, and Exment cannot read it.

### 2. Upload
- Log in to Exment as a system administrator.
- Open "Admin Setting" > "Plugin", choose the downloaded zip in "Plugin upload" and send it. See [Plugin](/plugin?id=plugin-upload) for details.

### 3. First-time setup
- Open "プロジェクト管理" (Project Management) in the left menu as a system administrator.
- Follow the screen to do the first-time setup. The tables used by Project Management are created.

※On Exment SaaS (`*.exments.com`), install it from the "Plugin market".

## Update
- Download the zip of the newer version and upload it the same way as the install. The plugin is replaced; your data stays.
- Open Project Management, and press "⚙ Settings" > "Update data structure" when the screen asks for it.

### Moving to 1.4.0 (if you have PmPortal or ExmentPluginPM)
In 1.4.0 the internal name became `ExmentPM` and the address `/admin/plugins/exment_pm`. On an Exment that already has PmPortal (1.2.0 or older) or ExmentPluginPM (1.3.0), uploading the zip as it is stops with "UUID exists but the plugin name is wrong". Do the steps in ["Moving to ExmentPM" in the README](https://github.com/exceedone/exment-plugins/blob/main/project-management/README.md#moving-to-exmentpm-from-pmportal-or-exmentpluginpm--exmentpm-への移行) once. Links and bookmarks to the old address (`/admin/plugins/pm_portal/...`) stop working.

※On Exment SaaS you do not need to do anything (Exceed One does it).

※From v1.2.0, data migration is part of this plugin. If you installed the separate data migration plugin with an older version, you can delete it in "Admin Setting" > "Plugin" after the update.

## See also
- [Plugin](/plugin)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/project-management/README.md)
