# Project Management (official plugin)

"Project Management" (「プロジェクト管理」) is an **official plugin** of Exment, made, tested and supported by Exceed One.  
It manages projects and tickets (issues) on Exment's own tables. It is free.

- Source code and docs: [exceedone/exment-plugins (project-management)](https://github.com/exceedone/exment-plugins/tree/main/project-management)
- License: GPL-3.0 (the same as Exment)
- Product page: [Project Management (exment.net)](https://exment.net/en/project-management/)
- Name in the plugin list: Exment Plugin PM（プロジェクト管理）. The zip and internal name is `ExmentPM` (`PmPortal` up to 1.2.0, `ExmentPluginPM` in 1.3.0).

![The Project Management dashboard](img/plugin_pm/pm_dashboard.png)

?> The screens of this plugin are in Japanese only. On this page, the screen labels are given in Japanese with an English meaning, for example 「設定」 (Settings).

## What it does

| Feature | Content |
| --- | --- |
| Projects | Each project has its issues, board, Gantt chart, wiki and files. Members are project managers, members or viewers (on Exment's role groups). |
| Issues | A list with filters and quick filters, a parent / child tree, inline editing in the list, bulk update and attachments. The body is written in Markdown, and images can be pasted. After a save, the list and the detail are drawn again in place, without reloading the whole page (from 1.6.5). |
| Roles on an issue | Besides the assignees: sub-assignees, managers, reviewers, and a difficulty (easy, normal, hard). The issue detail also shows who raised it. Sub-assignees, managers and reviewers get the update notices like the assignees (from 1.6.0). |
| Milestones | Issues per milestone, and a burndown chart. |
| Board and Gantt chart | Shows the issues on a board by status, or on a Gantt chart. |
| Wiki and files | Share the documents of the project with a wiki and files. |
| Word, Excel and PowerPoint | 「表示」 (View) on the files of issues, comments, wiki pages and the project opens them on the screen without downloading. Those who may edit can edit and save them there (from 1.7.0 / 1.7.1; needs [Groupware](https://github.com/exceedone/exment-plugins/tree/main/groupware) 0.4.0 or later and a browser with WebGPU). Without it, the files download as before. |
| Comments | Comment on an issue. Name the users to notify (mentions) or ask for a review. |
| Read / unread | See who has read an issue. Issues you have not seen are tinted in the list. |
| Notifications | Bells on the screen, and mail on a new issue or comment, or with the "mail this issue" button (sent with Exment's mail settings). |
| Settings | In ⚙ Settings: the portal settings and the update of the data structure. System administrators can use "Data migration": export projects with comments, history and attachments to a ZIP and import it into another Exment (check first, then write). Imported issues also show their key, URL and author at the source, and its custom attributes (from 1.5.0). |

## Requirements
- Exment 7.0 or later (PHP 8.2 or later)
- To send mail, Exment's mail settings must work ([Email sending settings](/mailsend_setting)). Bell notifications need no settings.
- The screens are in Japanese only.

## Install
※From Exment v7.2.1, Project Management comes with Exment. No download or upload is needed: press "Use (install)" in "Free official plugins" of "Admin Setting" > "Feature Management", then go on to "[3. First-time setup](/plugin_pm?id=_3-first-time-setup)" below. Right after installing from Feature Management, there is no "Project Management" in the side menu yet (it appears after the first-time setup). See [Official plugins](/plugin_official).


### 1. Download
Download the newest zip from [Releases](https://github.com/exceedone/exment-plugins/releases) on GitHub. Do not unzip it.

- The latest version is `ExmentPM-(version).zip` under "ExmentPM-v(version)" in [Releases](https://github.com/exceedone/exment-plugins/releases).

※Do not use the green "Code → Download ZIP" button: that is the whole repository, and Exment cannot read it.

※On Exment SaaS (`*.exments.com`) you do not need to download anything. See [On Exment SaaS](/plugin_pm?id=on-exment-saas).

### 2. Upload
- Log in to Exment as a system administrator.
- Open "Admin Setting" > "Plugin", choose the downloaded zip in "Plugin upload" and press "Upload". See [Plugin](/plugin?id=plugin-upload) for details.

![Plugin upload](img/plugin_pm/pm_upload.png)

- When "ExmentPM" appears in the list below, the upload is done. No tables or menus exist yet.

### 3. First-time setup
- As a system administrator, open `/admin/plugins/exment_pm` (on Exment SaaS `/plugins/exment_pm`).
- The 「初期セットアップ」 (First-time setup) screen opens. Check the list of tables to be made and press 「テーブルを作成する」 (Create the tables).

![First-time setup](img/plugin_pm/pm_setup.png)

- If a table with the same name already exists, it is shown in red. Enter 「テーブル名の接頭辞」 (a table name prefix, for example `pm2_`) to make the tables under other names. The names on the screen stay the same.
- When it is done, the Project Management dashboard opens. One 「プロジェクト管理」 entry is added to the left menu (from 1.4.1). You normally open it from there.
- The setup also makes:
    - Role groups: プロジェクト管理者グループ (project administrators), プロジェクトメンバーグループ (project members), プロジェクト閲覧者グループ (project viewers)
    - A notification: 課題の登録・更新通知 (issue created / updated, bell)
    - Priorities (至急 urgent, 高 high, 中 normal, 低 low) and resolutions (対応済み fixed, 対応しない won't fix, 無効 invalid, 重複 duplicate, 再現しない cannot reproduce, 保留 on hold)

※Only a system administrator can run the setup.  
※No sample projects or issues are made.

## Getting started

The first time, set things up in this order:

1. Put the users in role groups
2. Make a project
3. Add the members to the project
4. Change the statuses, types and so on to fit the project (you can also use them as they are)
5. Check the notifications

### 1. Put users in role groups
Everyone who uses Project Management must be in one of its role groups. For a user who is not, the 「プロジェクト管理」 menu is not shown, and opening it shows 「権限がありません。」 (No permission). System administrators do not need this.

In "Admin Setting" > "Role group", add users or organizations to the groups the setup made. See [Role group](/role_group) for details.

| Role group | Name | What it allows |
| --- | --- | --- |
| プロジェクト管理者グループ (project administrators) | `pm_admin_group` | See and edit every project and issue. Can also edit the lists of statuses, types, priorities and so on. |
| プロジェクトメンバーグループ (project members) | `pm_member_group` | Add and edit issues in the projects they take part in. |
| プロジェクト閲覧者グループ (project viewers) | `pm_viewer_group` | Only see the projects they take part in. |

![Role groups](img/plugin_pm/pm_role_group.png)

※Being in a role group alone does not show any project. Also do "3. Add the members to the project".

### 2. Make a project
- On the Project Management dashboard, press 「＋プロジェクトの追加」 (Add a project). It is also in the 「プロジェクト」 (Projects) menu at the top.
- Enter 「プロジェクト名」 (project name) and 「プロジェクトキー」 (project key), and press 「作成する」 (Create).
    - The project key comes before the issue numbers (for example `WEB` gives `WEB-1`). It starts with an uppercase letter, has only uppercase letters, digits and `_`, and is up to 32 characters.
    - Choose 「親プロジェクト」 (parent project) to put projects in a tree.

![Add a project](img/plugin_pm/pm_project_add.png)

- After that, the project's 「設定」 (Settings) tab opens. The person who made the project becomes its project manager.

※A project can be made by anyone who can add data to the project table (system administrators, the project administrators group, and so on).

### 3. Add the members to the project
In the project's 「設定」 (Settings) tab > 「参加ユーザー」 (Members), choose who takes part, and press 「保存する」 (Save).

| Field | Content |
| --- | --- |
| プロジェクトマネージャ (project manager) | The person in charge. Can add and edit issues, and change the project settings. |
| メンバー（編集） (members, edit) | Can add and edit issues. |
| 参照メンバー（閲覧） (viewers) | Can only see. |
| メンバー組織（編集）・参照組織（閲覧） (member / viewer organizations) | Everyone in the organization (team) takes part with the same rights. |

![Members](img/plugin_pm/pm_members.png)

- A person taken off the list cannot open the project (including its issues and wiki) from the moment you save.
- System administrators and the project administrators group can open every project, even if they are not on the list.
- The project settings can be changed by the project manager and the project administrators group (and system administrators).

### 4. Lists of statuses, types and so on (masters)
The lists used on issues work as they are. You can change their names, colors and order to fit the project.

| List | Per | Where to change it | First values |
| --- | --- | --- | --- |
| 状態 (status) | project | the project's 「設定」 > 「状態」 | 未対応 open, 処理中 in progress, レビュー中 in review, 処理済み resolved, 完了 closed |
| 種別 (issue type) | project | the project's 「設定」 > 「種別」 | タスク task, バグ bug, 要望 request, 改善 improvement, その他 other |
| カテゴリー (category) | project | the project's 「設定」 > 「カテゴリー」 | (none) |
| マイルストーン (milestone) | project | the project's 「設定」 > 「マイルストーン」 | (none) |
| 優先度 (priority) | all projects | ⚙ プロジェクト管理の設定 > 「課題の選択肢」 | 至急, 高, 中, 低 |
| 完了理由 (resolution) | all projects | ⚙ プロジェクト管理の設定 > 「課題の選択肢」 | 対応済み, 対応しない, 無効, 重複, 再現しない, 保留 |

- A status with 「完了扱い」 (counts as done) ticked is counted as done in the burndown and in the overdue check.
- A row that is in use cannot be deleted.

![Statuses](img/plugin_pm/pm_status.png)

**⚙ プロジェクト管理の設定** (Project Management settings) opens from 「⚙ 設定」 at the top right of the Project Management screen. It holds the settings shared by all projects, and only system administrators can open it (others do not see 「⚙ 設定」).

![Project Management settings](img/plugin_pm/pm_settings.png)

### 5. Notifications
There are two kinds: the bell at the top right of the screen, and mail.

**Bell (arrives without doing anything)**
- When an issue is created or updated, or gets a comment, the bell goes to the assignee, the people in 「お知らせ先」 (notify), and the person who made the issue. It does not go to the person who made the change.
- It also goes to the people chosen in 「お知らせしたい人」 (people to notify) when writing a comment, and to everyone watching the issue (「ウォッチ」).
- Write `@` and a member's name in a comment to notify that person (mention).
- Tick 「確認を依頼する」 (ask for a review) to send a 「【確認依頼】」 (review request) bell to the people chosen. When one of them presses 「確認しました」 (reviewed), the author of the comment gets a bell.
- People who cannot see the issue get nothing.

![Comment and people to notify](img/plugin_pm/pm_comment.png)

![Bell notifications](img/plugin_pm/pm_bell.png)

**Mail (chosen when you send)**  
Mail is never sent by itself. Send it in one of these ways:
- Tick 「メールでも知らせる」 (also send mail) when you register an issue or a comment. The people who get the bell also get the same content by mail.
- On the issue screen, open 「…その他」 (More) > 「メールで知らせる」 (Mail this issue), choose the people in 「送る相手」 (send to), and press 「送信」 (Send). It goes only to people who can see the issue, with a part of the body and a link to the issue.

![Mail this issue](img/plugin_pm/pm_mail.png)

- Mail is sent with Exment's mail settings. Set up [Email sending settings](/mailsend_setting) first.
- A user without an email address gets no mail.
- The bell notification 「課題の登録・更新通知」 can be seen on Exment's [notification](/notify) screen.

### 6. AI and Git (only if you use them)
Both are off at first. Project Management works fine without them.

**AI auto-fill**  
The issue form gets a 「AI で自動入力」 (Fill with AI) button. It fills the empty 「種別」 (type), 「カテゴリー」 (category) and 「優先度」 (priority) with AI. People can check and change the values before saving.
- The AI is TypeSafe, an outside service. The subject and the details of the issue are sent to TypeSafe's server. Email addresses and phone numbers are masked before sending.
- A system administrator enters the API key in "Admin Setting" > "Plugin" > the settings of "Exment Plugin PM", section 「AI 自動入力（TypeSafe）」 (the server environment variable `TYPESAFE_KEY` comes first if it is set).
- In the project's 「設定」 > 「AI 自動入力」, tick 「AI 自動入力を使う」 (use AI auto-fill) and save. 「接続テスト」 (connection test) checks the connection.
- With 「担当者も自動入力する」 (also fill the assignee) on, an empty assignee is filled too. The assignee is chosen by a rule, not by the AI: the category's default assignee, otherwise the member with the fewest open issues.

![AI auto-fill (project settings)](img/plugin_pm/pm_ai.png)

![AI auto-fill (plugin settings)](img/plugin_pm/pm_ai_plugin.png)

**Git repository**  
Each project can ask for a Git repository (Gitea or Forgejo).
- The server administrator sets the Git server in the server environment variables (`PMPORTAL_GIT_PROVIDER`, `PMPORTAL_GIT_API_URL`, `PMPORTAL_GIT_API_TOKEN` and so on). It cannot be set on the screen.
- In the project's 「設定」 > 「Git リポジトリ」, press 「Git を有効にする」 (turn on Git). The project manager enters 「リポジトリ名」 (repository name) and presses 「リポジトリの作成をリクエスト」 (request the repository). Without a Git server, the request stays 「作成待ち」 (waiting).
- When the repository is made, each person presses 「HTTP クローン用パスワードを発行」 (issue a password for HTTP clone). The password is shown only once.

![Git repository](img/plugin_pm/pm_git.png)

## Update
- Download the zip of the newer version and upload it the same way as the install. The plugin is replaced; your data stays.
- As a system administrator, open 「⚙ 設定」 in Project Management and look at 「データ構造の更新」 (Update data structure). When an update is needed, administrators see 「データ構造の更新があります」 at the top of the screen (from 1.6.4); it opens the settings.
    - 「すでに最新の構造です。」 (already up to date): nothing to do.
    - 「データ構造の更新が必要です。」 (an update is needed): back up the database, then press 「更新を実行する」 (Run the update). This update cannot be undone.

![Update data structure](img/plugin_pm/pm_upgrade.png)

※On Exment SaaS, also see [On Exment SaaS](/plugin_pm?id=on-exment-saas).

### Moving to 1.4.0 (if you have PmPortal or ExmentPluginPM)
In 1.4.0 the internal name became `ExmentPM` and the address `/admin/plugins/exment_pm`. On an Exment that already has PmPortal (1.2.0 or older) or ExmentPluginPM (1.3.0), uploading the zip as it is stops with "UUID exists but the plugin name is wrong". Do the steps in ["Moving to ExmentPM" in the README](https://github.com/exceedone/exment-plugins/blob/main/project-management/README.md#moving-to-exmentpm-from-pmportal-or-exmentpluginpm--exmentpm-への移行) once. Links and bookmarks to the old address (`/admin/plugins/pm_portal/...`) stop working.

※On Exment SaaS, the operators do it for all sites, so you do not need to do anything.

※From v1.2.0, data migration is part of this plugin. If you installed the separate data migration plugin with an older version, you can delete it in "Admin Setting" > "Plugin" after the update.

## Moving from another Exment
You can move projects with their issues, wiki, comments, history and attachments to another Exment.  
Use 「データ移行」 (Data migration) in 「⚙ プロジェクト管理の設定」 on both the source and the target. **Only system administrators** can use it.

![Data migration](img/plugin_pm/pm_migrate.png)

### Before you start
- Install this plugin on both the source and the target, and finish the first-time setup. Use the same version on both if you can.
- On the target, the project, issue, wiki, milestone, category and related tables must be **empty** (the numbers are kept as they are). It is meant for moving into a newly prepared Exment.
- Make the users on the target first.
- Only MySQL and MariaDB are supported.
- Back up the target database.

### 1. Export (on the source)
- Tick the projects to move. For parent and child projects, choose the parent too.
- Press 「ZIP を書き出す」 (Export a ZIP). `pm-migrate-date-time.zip` is downloaded.
- Git passwords and AI logs are not exported.

### 2. Import (on the target)
1. Choose the exported ZIP in 「移行ファイル(ZIP)」 (migration file).
2. In 「ユーザー対応表」 (user mapping), write which target user each source user becomes: one per line, `old user code=new user code`. A line `*=user code` is used for everyone not listed.
    ```
    yamada=t.yamada
    sato=h.sato
    *=admin
    ```
    Assignees, members, comment authors, the people in the history and so on are replaced this way. A user code that does not exist on the target is an error.
3. In 「マスター（ステータス・課題種別・優先度・完了理由）」 (masters), choose what happens when the target has rows with different content:
    - 「移行先に違う内容の行があれば止める」 stop (the default)
    - 「移行先の行を削除して、移行元の内容で置き換える」 delete the target's rows and use the source's
4. Press 「確認のみ（書き込まない）」 (check only). The number of rows to write, errors and warnings are shown.
5. If all is well, tick 「移行先のデータベースのバックアップを取り、…確認しました」 (I backed up the target database and checked the result) and press 「実行（書き込む）」 (Run).
    - If there is an error, nothing is written.
    - If it fails on the way, everything is rolled back.

※`@user names` written in comments are not rewritten.  
※Organization permissions are not moved. Check the project's 「参加ユーザー」 (Members) on the target.

## On Exment SaaS
On Exment SaaS (`*.exments.com`), no zip download or upload is needed.

1. The system administrator of the tenant presses "Use (install)" for Project Management in "Free official plugins" of "Admin Setting" > "[Feature Management](/feature)". The install and the first-time setup (making the tables) are done automatically.
2. Open "Project Management" in the side menu (`/plugins/exment_pm`). After that, follow [Getting started](/plugin_pm?id=getting-started).

- The address is `https://(tenant name).exments.com/plugins/exment_pm` (without `/admin`).
- The operators update the plugin to new versions, and run the data structure update at the same time. The tenant administrator does not need to press 「更新を実行する」.

## FAQ and common pitfalls

### 「プロジェクト管理」 is not in the menu, or 「権限がありません。」 (No permission) is shown
The user is not in a Project Management role group. A system administrator should add the user to the project administrators, project members or project viewers group in "Admin Setting" > "Role group" ([Put users in role groups](/plugin_pm?id=_1-put-users-in-role-groups)).

### The screen opens, but the project is not shown
The user is not in the project's 「参加ユーザー」 (Members). The project manager or a system administrator should add the user in 「設定」 > 「参加ユーザー」 and save.

### There are two 「プロジェクト管理」 entries in the menu
A new install of 1.4.0 or earlier also made a folder 「プロジェクト管理」 that opens the tables inside (projects, issues, milestones, categories). After updating to 1.4.1 and pressing 「データ構造の更新」, this folder and the menus made by the plugin are removed (menus added by an administrator stay). The tables' screens and data stay as they are.

### I cannot find 「⚙ 設定」
「⚙ 設定」 (Project Management settings) is shown only to system administrators. The settings of each project are in the project's 「設定」 tab.

### After an update, the screen looks wrong or new features do not appear
Check 「⚙ 設定」 > 「データ構造の更新」. If it says 「データ構造の更新が必要です。」, back up the database and press 「更新を実行する」. From 1.6.4, administrators also see 「データ構造の更新があります」 at the top of the screen when an update is needed.

### Mail does not arrive
- Mail is never sent by itself. Tick 「メールでも知らせる」, or use 「メールで知らせる」.
- Check that Exment's [Email sending settings](/mailsend_setting) work and that the user has an email address.

### Tables are shown in red in the first-time setup
Tables with the same names already exist. Enter 「テーブル名の接頭辞」 (a table name prefix) to make them under other names.

### Old links do not open after 1.4.0
In 1.4.0 the address changed from `/admin/plugins/pm_portal` to `/admin/plugins/exment_pm` (on Exment SaaS, from `/plugins/pm_portal` to `/plugins/exment_pm`). Links and bookmarks to the old address end in "404 not found". The menu, the bells and newly sent mail use the new address. Links written in issue bodies, comments and wiki pages can be rewritten with `tools/rewrite-old-links.php` in the [README](https://github.com/exceedone/exment-plugins/blob/main/project-management/README.md).

### The plugin has a different name (PmPortal, ExmentPluginPM)
It is the same plugin. Its name changed from PmPortal (up to 1.2.0) to ExmentPluginPM (1.3.0) and to ExmentPM (from 1.4.0). To bring an Exment that still has an old name to 1.4.0, see [Moving to 1.4.0](/plugin_pm?id=moving-to-140-if-you-have-pmportal-or-exmentpluginpm).

## See also
- [Plugin](/plugin)
- [Role group](/role_group)
- [Email sending settings](/mailsend_setting)
- [Notification](/notify)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/project-management/README.md)
