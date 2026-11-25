# Language and time zone of each user
From v7.2.4, each user can choose the language of the pages and the time zone. Mails and notifications also use the language and the time zone of the person who receives them.

## Choosing the language
A user can choose the language in any of these places:

- The user menu at the top right
- "Language" in the Login User Setting (the user menu at the top right → "Login User Setting")
- The login page

The languages are 日本語, English, Tiếng Việt, 简体中文, 한국어, Deutsch and Español.

- The Vietnamese, Simplified Chinese, Korean, German and Spanish screens are machine translated. Please tell us about corrections on [GitHub](https://github.com/exceedone/exment/issues).
- Administrators can limit the languages users may choose (see "Settings for administrators" below).

### The order of the languages
Exment decides the language in this order:

1. The language the user chose in the Login User Setting
1. The language chosen on the login page
1. The language of the browser (when "Use the browser's language when a user has not chosen one" is YES in the System Setting; among the languages the users can choose)
1. The language of the site

Choosing "Automatic (the language of the browser)" for "Language" in the Login User Setting goes back to "not chosen".

> [!WARNING]
> After updating to v7.2.4, users who have not chosen a language and whose browser is not in the site language see Exment in the language of their browser.  
> To keep the site language for everyone, set System Setting → [Detail Setting] → "Use the browser's language when a user has not chosen one" to NO.

## Choosing the time zone
Choose the time zone in "Time zone" of the Login User Setting. The default is "The time zone of the site".

Date and times are shown and typed in that time zone: lists, details, forms, filters such as "today", calendar, Gantt chart, Kanban, comments, histories, notifications and operation logs.

### What stays in the time zone of the site
- The database keeps the time zone of the site.
- Columns of only a date (no time) are never converted.
- The API stays in the time zone of the site.
- Charts grouped by date and time (summary views and dashboards) are grouped in the site time and show it, for example "(site time: Asia/Tokyo)".
- Export uses the time zone of the site by default. Choose "Export with the date and times in your time zone (…)" to export in your own time zone.
- On import, "Time zone of the date and times of the file" tells whether the date and times of the file are in the site time zone or in yours.

## Mails and notifications
Mails and notifications are sent in the language and the time zone of the person who receives them. When that person has not chosen a language, the language of the site is used.

## Settings for administrators
Set these in System Setting → [Detail Setting] (see [System setting](/system_setting)).

| Item | Description | Default |
| --- | --- | --- |
| Languages the users can choose | The languages the users can choose in the menu at the top right, on the login page and in their settings. When empty, all the installed languages. The language of the site can always be chosen. | Empty (all) |
| Use the browser's language when a user has not chosen one | When YES, a user who has not chosen a language sees the pages in the language of the browser (among the languages the users can choose). When NO, in the language of the site. | YES |

The language and the time zone of the site are set as before with `APP_LOCALE` and `APP_TIMEZONE` in `.env`.
