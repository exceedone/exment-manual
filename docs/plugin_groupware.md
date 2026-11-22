# Groupware (official plugin)
"Groupware" is the **official plugin** for the groupware of Exment. It is free. It has two parts now:

- **Web mail**: a mail program in the browser, like Outlook or Gmail
- **Office**: open and edit Word (.docx), Excel (.xlsx) and PowerPoint (.pptx) files in an Office that runs in the browser ([ibisOffice](https://github.com/ibisjp/ibis-office) by ibis inc.)

- Source code and docs: [exceedone/exment-plugins (groupware)](https://github.com/exceedone/exment-plugins/tree/main/groupware)
- License: GPL-3.0 (the same as Exment). ibisOffice is AGPL-3.0-only ([The licence of ibisOffice](/plugin_groupware?id=the-licence-of-ibisoffice)).
- Name in the plugin list: Exment Plugin Groupware. The internal name is `ExmentGroupware` and the URL is `/admin/plugins/exment_groupware`.

<!-- Screenshots: web mail (img/plugin_groupware/gw_mail.png) and a file open in Office (img/plugin_groupware/gw_office.png). Take them after d9 checks the page -->

## Web mail
Exment does not run a mail server. Like Outlook, it connects to the server the company already uses over **IMAP** (read) and **SMTP** (send), so the same mailbox stays open in Outlook and on the phone. Nothing is copied into Exment.

- Folders, list (newest first, 50 a page), reading pane, search (subject, sender, recipient, body; Japanese works), unread and flagged filters, flags, move (also by dragging onto a folder), junk, delete to the trash, new folders.
- New, reply, reply all, forward (with attachments), Cc and Bcc, attachments (up to 25 MB a mail), simple formatting, signature, drafts. `Ctrl+Enter` sends.
- Several accounts per user. The unread count of each inbox is checked every minute.
- Japanese mail (ISO-2022-JP, Shift_JIS) as it is.

| Service | Sign-in | Servers |
| --- | --- | --- |
| Xserver | password (user name = the mail address) | `sv****.xserver.jp`, IMAP 993 / SMTP 465 (SSL) |
| KAGOYA | password (user name = the mail account name) | IMAP `m***.kagoya.net` 993, SMTP `smtp.kagoya.net` 465 (SSL) |
| Microsoft 365 | sign in with Microsoft (OAuth 2.0) | `outlook.office365.com` 993, `smtp.office365.com` 587 (STARTTLS) |
| Gmail / Google Workspace | sign in with Google (OAuth 2.0), or an app password | `imap.gmail.com` 993, `smtp.gmail.com` 465 |
| Others | password | any IMAP / SMTP server |

### Microsoft 365 and Google
A system administrator registers an app once and enters it in the plugin's settings ("Admin Setting" > "Plugin" > "Exment Plugin Groupware" > settings). The settings page shows the redirect URI to register (`…/admin/plugins/exment_groupware/mail/oauth/callback`).

- Microsoft: make a web app in "App registrations" of the Azure portal, with the delegated permissions of Office 365 Exchange Online `IMAP.AccessAsUser.All` and `SMTP.Send`, and `offline_access openid email profile`. The tenant administrator must allow SMTP AUTH for the user.
- Google: make an OAuth client ID (web application) in the Google Cloud console, with the scope `https://mail.google.com/`. For a Google Workspace used inside the company, an "internal" app needs no review by Google.

### How to use
1. Open "メール" (Mail) in the side menu (or `/admin/plugins/exment_groupware/mail`).
2. Press "アカウントを追加する" (add an account) and choose the service.
3. For Xserver, KAGOYA and others, enter the password. For Microsoft 365 and Google, press "サインイン" (sign in) and log in on their page.

### Security
- Passwords and tokens are stored encrypted with the app key (`APP_KEY`).
- HTML mail is cleaned on the server and shown in a frame without scripts. Images from outside are not loaded until "画像を表示" (show images) is pressed.
- Only public addresses on the mail ports can be used. For a mail server in the company network, the administrator turns on "社内のネットワークのメールサーバーを許可する" (allow mail servers in the company network) in the settings.

## Office
### Files of the file server
The page of a Word, Excel or PowerPoint file of the [file server](/file_server) gets an "Open in Office" button.

- It opens the editor in a new tab. **Save** adds a new version of the file (older ones stay in the version history).
- While the file is open for editing it is **checked out**, so nobody else can change it. It is checked in when the editor is closed. A user who may only view the file, or a file someone else has checked out, opens read-only.
- A save after someone else saved in between is refused, so nothing is overwritten.
- When the server has no LibreOffice, the editor is shown read-only in the preview of the file page. **LibreOffice is not needed** (ibisOffice runs in the browser).
- Close (× at the top right) checks the file in and leaves the editor: a tab opened by "Open in Office" is closed, otherwise the file page comes back (0.4.4 or later). The preview has no Close.
- **An empty file** (0 bytes, such as Windows makes with New > Word document) opens as a new document of the kind its extension says (docx, xlsx, pptx). Saving makes it a real document under that name (0.4.4 or later; before, it opened as a spreadsheet).

### Attachments of records
Word, Excel and PowerPoint files attached to records can also be seen in the browser's Office (as the files of issues, wiki pages and projects of Project Management). This works without the file server.

- Only those who may download the file can see it.
- Users who may edit the record get "編集する" (Edit). Saving replaces the content of the attachment and keeps its address. A comment on the record says who edited it, with a link to the previous content.
- On Exment v7.2.0 or later, the previous content is kept as an older version of the attachment ("Version n") ([Replace and older versions](/data_details)): up to 10 per attachment (`EXMENT_DOCUMENT_VERSION_LIMIT`), the oldest deleted first, and all deleted with the attachment.
- On older Exment, the previous content stays as a separate file, opened only from the link in the comment. It is not deleted when the attachment is deleted.
- Only attachments can be edited (not the values of file columns). With `EXMENT_FILE_DELETE_USERONLY` set to `true`, only the uploader of the file can. A save takes up to 50 MB (or Exment's upload limit, if smaller).

## Feature Management (Exment v7.2.0 or later)
- The web mail is one row, "メール" (`exment_groupware.mail`), in "Admin Setting" > "[Feature Management](/feature)". A system administrator turns it on or off and chooses the role groups that may use it.
- Sites that had the plugin before keep it on after updating. **On a new site it starts off**, so turn on "メール" in Feature Management (while it is off, the mail page returns 404).
- Office follows the file server feature: when the file server is off, "Open in Office" of the file server does not open.

## Requirements
- Exment 7.1 or later (checked on 7.1 and 7.2) and PHP 8.2 or later. The web mail and record attachments work on both.
- Opening files of the file server needs an Exment with the file server (v7.2.0 or later). Without it, only that part does nothing.
- Installing ibisOffice needs the `zip` extension of PHP and a writable `public/` of the site (about 125 MB).
- Office needs a browser with WebGPU (Chrome, Edge, or Safari 26 or later) and a site on HTTPS.
- Neither LibreOffice nor Docker is needed. It works on rental servers such as XServer (the server only hands out the files; Office runs in the browser).

## Install
1. Install the plugin: from Feature Management on Exment v7.2.0 or later, by uploading the zip on older ones. See [Official plugins](/plugin_official).
2. To use Office, open the plugin page (`/admin/plugins/exment_groupware`) as a system administrator and press "ibisOffice 0.8.9 をインストールする" (install ibisOffice). The release of ibisOffice (about 40 MB, 125 MB unpacked) is downloaded, checked against its fixed SHA-256 and put in `public/vendor/exment_groupware/ibisoffice/` of the site.

On a site with several web servers, or where `public/` cannot be written, serve the unpacked release elsewhere and enter the URL of the folder with `index.html` in "ibisOffice の場所（URL）" of the plugin's settings.

### The web server
The editor is large (the `.wasm` is 92 MB, about 24 MB gzipped). Sent compressed and kept by the browser, it is downloaded only once; otherwise every opening can wait about 10 seconds.

**Apache (rental servers such as XServer included)**
- From 0.4.4 the installer writes `.gz` copies of the large files and `public/vendor/exment_groupware/ibisoffice/.htaccess`: the `.wasm` type, a year's cache, and the `.gz` copies to browsers that accept gzip (`mod_deflate` when a copy is missing).
- Every rule sits in an `IfModule`, so a missing module is skipped. Check only that `.htaccess` is allowed there (`AllowOverride All`, which Exment's own `.htaccess` needs as well).
- An ibisOffice installed by 0.4.3 or older gets the copies and the `.htaccess` when you install it again from the plugin page after updating to 0.4.4.

**nginx**
nginx does not read `.htaccess`. Add this to the site and reload:

```nginx
# inside the site's server { }, before location /
location ^~ /vendor/exment_groupware/ibisoffice/ {
    gzip_static on;            # the .gz copies written at install
    gzip on;                   # compress anything without one
    gzip_types application/wasm text/javascript application/javascript text/css application/json image/svg+xml;
    types { application/wasm wasm; }
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    # add_header here drops the server { } ones: repeat them
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    try_files $uri =404;
}
```

**Any web server**
- **X-Frame-Options must be `SAMEORIGIN`, not `DENY`.** The editor is an `iframe` of the same site, and with `DENY` the browser refuses it (the screen stays empty). Set a Content-Security-Policy `frame-ancestors` to `'self'` as well.
- A site with a Content-Security-Policy needs `script-src 'self' 'wasm-unsafe-eval'`.
- No COOP / COEP headers are needed.

## The licence of ibisOffice
ibisOffice is software of ibis inc. under AGPL-3.0-only and a commercial licence. This plugin runs ibisOffice as it is released (not modified) in its own frame, and does not carry it (it is downloaded from the release of ibis inc.). The editor page and the plugin page show "Powered by ibisOffice".

## Related
- [Official plugins](/plugin_official)
- [File server](/file_server)
- [README (GitHub)](https://github.com/exceedone/exment-plugins/blob/main/groupware/README.md)
