# Easy install (rental server)
How to put Exment on a rental server (Xserver, Sakura Internet and others) by **uploading one file and opening it in the browser**. No SSH and no composer.

To install it yourself with SSH, see [Rental server](/install_rental).

## What you need
- PHP 8.2 or later (chosen in the control panel of the server)
- An **empty** database: MySQL 8.0 or later, or MariaDB 10.11 or later
- FTP, or the file manager of the server (to upload and open files)
- About 400 MB of free space

## Steps
1. Download [exment-installer.zip](https://exment.net/downloads/installer/exment-installer.zip), unpack it, and take out `exment-installer.php`.
    The SHA-256 of the zip is shown in [exment-installer.zip.sha256](https://exment.net/downloads/installer/exment-installer.zip.sha256) (now `9954da9ff53685451ac2b9376063fd92fc6b5559bc9e010048ddde72b884e5f1`).
2. Upload `exment-installer.php` into the folder Exment should be in.
    - At the top of the domain: `public_html` (`www` on Sakura)
    - In a folder: `public_html/exment` and so on. Use an **empty folder**.
3. Open it in the browser (for example `https://example.com/exment-installer.php`).
4. **Enter the key.** The installer makes `exment-installer-key.php` in the same folder. Open that file by FTP or with the file manager and enter what follows `KEY:`.  
   This file shows nothing in a browser: only who can see the files (the owner of the server) can go on.
5. Look at the **server check**. For a ✗, change what it says and press "Check again" (the PHP version, memory_limit and so on). A ⚠ does not stop the install.
6. Press "Download". The installer downloads Exment from exment.net, checks its content (sha256), unpacks and places it. It takes a few minutes. If it stops, open the page again and press "Continue": it goes on where it stopped.
7. **Database**: make the database as the page says and press "Test the connection". The values are not kept.
8. Press "Go to the installer of Exment". The installer deletes itself (and its key and work files) and opens the installer of Exment. Then follow [Installation steps](/quickstart_easy).

## Where it puts Exment
- Exment itself goes into a folder **not published on the web** (for example `exment` next to `public_html`; for `public_html/t721`, `exment_t721`).
- Only the content of Exment's `public` goes into the published folder.
- On a server that allows writing only in the published folder, Exment goes into `exment-app` inside it, closed to the web by `.htaccess`.
- The `.env` gets a key of its own (APP_KEY), `APP_ENV=production` and `APP_DEBUG=false`.

## Notes for each server
### Xserver
- PHP version: server panel → "PHP Ver.切替"
- Database: in server panel → "MySQL設定", make a database and a user, and give the user access to the database. The host is the name shown in "MySQL設定".
- <span class="red bold">On the installer of Exment, choose "MariaDB" as the database.</span> The databases of Xserver are MariaDB; with "MySQL" it stops with "Your database is MariaDB, but MySQL is selected...".

### Sakura Internet
- PHP version: control panel → script settings
- Database: control panel → databases → add (character set utf8mb4). The user is your account name; the host is the `mysqlNNN.db.sakura.ne.jp` shown in the list.

## What the installer never does
- It never writes over an Exment or another site (it stops when the folder has files or Exment is already there). To update, see [Update](/update).
- It does not use a database with tables (the connection test refuses it).
- It takes files only from exment.net. A file whose content (sha256) is not the release is deleted, never used.
- It never keeps or shows the password of the database.
- Nothing of it stays at the end (if it cannot delete itself, delete it by FTP as the page says).

## When it does not work
- **"This release needs PHP 8.x or later"**: raise the PHP version in the control panel, open the page again and press "Continue".
- **Too many wrong keys**: wait about 10 minutes and enter it again.
- **To start again**: press "Start again" at the bottom of the page (the Exment files placed are deleted too).
- For other errors, see [Errors at install](/install_error).
