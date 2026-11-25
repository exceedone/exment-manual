# Update
How to bring Exment to a newer version.  
See the [release notes](/release_note) for what changed in each version.

## The steps
1. **Check your current version**
2. **Take a backup**
3. **Update** (the steps depend on your current version)
4. **Check after the update**

## 1. Check your current version
- On the screen: "System Setting" → "System version information" → "Current version"
- In a file: the `version` of `exceedone/exment` in `composer.lock`

## 2. Take a backup
Take a backup of the data before the update. See [Backup](/backup) for details.

- Log in to Exment as an administrator and open "Admin Setting" → "Backup" in the left menu.
- Press the [Backup] button at the top right. A backup of the data and the attached files is made.
- Click the backup file and download it.

Note: the update batch below takes a backup by itself.

## 3. Update
### Which steps to use
It depends on your current version and the version you want.

| Current version | What to do |
|---|---|
| **v7.x** (a newer v7) | The "[usual update](/update?id=The-usual-update)" below |
| **v6.x or lower** | First the steps in "[Updating from an old version](/update?id=Updating-from-an-old-version)" below |

- From v7.0.x to v7.1.0 or higher, <span class="red bold">the screen design becomes "Modern".</span> To go back to the previous look, select "Classic" in the [Screen design](/system_setting?id=screen-design) of the system setting.

### The usual update
There are three ways. All of them do the same things (backup → get the new program → update the database).

| Way | For whom |
|---|---|
| **A. The update batch (recommended)** | You want to run one file on the server |
| **B. By commands** | You want to run each step yourself |
| **C. The auto update** | You want new versions installed every day by themselves ([auto update](/update_auto)) |

#### A. The update batch (recommended)
**(1) Download the batch (the first time only)**

Put it in the folder where Exment is installed (the root directory of the project).

| Server | What to do |
|---|---|
| Windows | Download [ExmentUpdateWindows.bat](https://exment.net/downloads/cmd/ExmentUpdateWindows.bat) and put it in the folder |
| Linux | The commands below (`ExmentUpdateLinux.sh`) |
| Xserver | The commands below (`ExmentUpdateLinuxXserver.sh`) |
| Sakura Internet | The commands below (`ExmentUpdateLinuxSakura.sh`) |
| Mac | Download [ExmentUpdateLinux.sh](https://exment.net/downloads/cmd/ExmentUpdateLinux.sh), put it in the folder and run `chmod 775 ExmentUpdateLinux.sh` |

On Linux, Xserver and Sakura Internet, run these commands in the folder (only the two lines of your server).

~~~
# Linux
wget https://exment.net/downloads/cmd/ExmentUpdateLinux.sh
chmod 775 ExmentUpdateLinux.sh

# Xserver
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxXserver.sh
chmod 775 ExmentUpdateLinuxXserver.sh

# Sakura Internet
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxSakura.sh
chmod 775 ExmentUpdateLinuxSakura.sh
~~~

Note: if your batch was downloaded before April 13, 2021, replace it with the new one.

**(2) Run the batch**

Run it in the folder.

~~~
# Linux / Mac
sh ExmentUpdateLinux.sh

# Xserver
sh ExmentUpdateLinuxXserver.sh

# Sakura Internet
sh ExmentUpdateLinuxSakura.sh

# Windows
ExmentUpdateWindows.bat
~~~

The batch does these in order.

- Backs up the data
- Gets the new program and puts it in place
- Updates the database

#### B. By commands
First do "2. Take a backup" above.  
Then run these commands in the folder.

~~~
cd (the root directory of the project)
composer update
php artisan exment:update
~~~

- Right after a release, the newest version may not be found yet. Wait 10 to 20 minutes and run the commands again.
- On a production site (`APP_ENV=production`), a question asks you to confirm before the database is changed. Where there is no terminal (scripts, cron, CI), use `php artisan exment:update --force`.

**On a rental server (Xserver, etc.)**

- On Xserver, run `composer update --ignore-platform-reqs` instead of `composer update`, because Xserver does not have the PHP Sodium extension by default (if you really need it installed, contact the Xserver support).
- `php` over SSH can be a different version from the PHP chosen on the control panel. Check with `php --version` that it is the same version. If not, link `~/bin/php` to that version, or run it by the full path, like `/usr/bin/php8.3 artisan exment:update` ([rental server](/install_rental)).

#### C. The auto update
Every day it checks for a new version and, when there is one, runs the update batch. See [auto update](/update_auto) for how to set it up.

- The auto update only goes as far as the usual update. **It does not cross a major version, such as v6 to v7**. See "[Version numbers and how far an update goes](/update?id=Version-numbers-and-how-far-an-update-goes)" below.

### Updating from an old version
These version borders have manual steps. The update batch and the auto update do not cross them.  
Please read the pages of every border between your current version and the newest one.

| Border | Page |
|---|---|
| v3.x or lower → v4.0.x | [Update to v4.0](/update/v4_0) |
| v4.3.x or lower → v4.4.x or higher | [Update to v4.4](/update/v4_4) |
| v4.4.x or lower → v5.0.0 or higher | [Update to v5.0](/update/v5_0_php8) |
| v5.0.x or lower → v6.0.0 or higher | [Update to v6.0](/update/v6_0_php8) |
| <span class="red bold">v6.x or lower → v7.0.0 or higher</span> | <span class="red bold">[Update to v7.0](/update/v7_0_0)</span> (the Laravel version and the namespace of the admin library change) |

- For how long each version gets fixes, see the [support policy](/support_policy).

## 4. Check after the update
- Press **Ctrl+F5** (super reload) in the browser to load the screens again.
- Check in "System Setting" → "System version information" that the version is the new one.
- If you get an error, see [Troubleshooting](/troubleshooting).

### The "new version" notice on the dashboard
When a newer version exists, the dashboard shows this.
![Custom table screen](img/update/show_version.png)

The "currently installed version" and the "latest version" are kept in the session, so that they are not looked up on every screen; the values stay until you log out.

Therefore, **even after an update, the notice "There is a new version" can stay**.  
Log out and log in again to refresh it.

## Version numbers and how far an update goes
An Exment version is "major . minor . patch" (for example v7.1.0). Which number goes up decides how you update.

| Kind | Example | What changes | How to update |
|---|---|---|---|
| Patch | v7.0.2 → v7.0.3 | Bug and security fixes only | The usual update |
| Minor | v7.0.x → v7.1.0 | New features; the screens may change a little | The usual update. Please read the [release notes](/release_note) first |
| Major | v6.x → v7.0 | The Laravel and PHP requirements and the structure of the program change a lot | **Not by the usual update**. Use "Updating from an old version" |

### Why a major version is not installed automatically
- The update batch and the auto update use `composer update`. It installs the newest version inside the range written in `composer.json`.
- For example, with `"exceedone/exment": "^7.0"` that is the newest v7.x, never v8. With `"^6.2"` it is the newest v6.x, even after v7 is out.
- If you stay on v6 with the auto update running, it sees that "a newer version (v7) exists" and runs the update batch every day (the version stays the newest v6.x). Update to v7, or stop the auto update until you do.

## Others
- Installing a development version, going back to an older version, or replacing the program for a while: [development and older versions](/update_tmp)
