# Official plugins
The official plugins are free plugins of Exment, made, tested and supported by Exceed One. Their source code is public ([exceedone/exment-plugins](https://github.com/exceedone/exment-plugins), GPL-3.0).

| Plugin | What it does |
| --- | --- |
| [Project Management](/plugin_pm) | Projects and issues (tickets), boards, Gantt charts, wiki and files |
| [IT Support](/plugin_it_support) | A help desk: requests by mail, a form or phone as tickets, with their progress shared with the customer without login |
| [Groupware](/plugin_groupware) | Web mail, and opening and editing Office files of File sharing in the browser |

## Install
### Exment v7.2.1 or later
The official plugins come with Exment. A system administrator presses "Use (install)" in "[Free official plugins (bundled with Exment)](/feature?id=free-official-plugins-bundled-with-exment)" of "Admin Setting" > "Feature Management". Nothing is installed or loaded until then.

- Exment 7.2.0 comes with Project Management (ExmentPM) 1.7.1, IT Support (ExmentITSupport) 1.0.6 and Groupware (ExmentGroupware) 0.4.2 (package exceedone/exment-plugins-release 7.2.1).
- A bundled plugin is installed only after its signature by Exceed One is checked.
- A newer version is only shown. "Update to this version" updates it, and "Back to the previous version (...)" puts it back.
- When a newer version includes a security fix, the system administrators are told. See [Feature Management](/feature?id=notices-of-security-fixes).
- Groupware makes the "Mail" menu in the side menu when it is installed.

### Older Exment
Download the zip from [Releases](https://github.com/exceedone/exment-plugins/releases) on GitHub and upload it in "Admin Setting" > "[Plugin](/plugin)". Do not unzip it (do not use the green "Code → Download ZIP" button).

### Exment SaaS
On Exment SaaS (`*.exments.com`) too, when the system administrator of the tenant presses "Use" in Feature Management, the install and the first-time setup are done automatically. The operators update them to new versions, together with the data structure update and the like.

## Related
- [Plugin](/plugin)
- [Feature Management](/feature)
