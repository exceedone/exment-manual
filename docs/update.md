# Update
This is the procedure when the version of Exment has been updated and an update is required.  
Please check [here](/release_note)for the update history.  

## First: kinds of version updates and how to update
An Exment version number is "major . minor . patch" (e.g. v7.1.0). How you update depends on which number goes up.

| Kind | Example | What changes | How to update |
|---|---|---|---|
| Patch | v7.0.2 → v7.0.3 | Bug and security fixes only | The update batch and the auto update update it |
| Minor | v7.0.x → v7.1.0 | New features; the screens may change a little | The update batch and the auto update update it. Please read the [release note](/release_note) first |
| Major | v6.x → v7.0 | Laravel / PHP requirements and the structure of the program change a lot | **The update batch and the auto update do not update it.** Follow the manual update steps below |

### The update batch, the auto update and the manual update
| Method | When it runs | What it does | How far it updates |
|---|---|---|---|
| Update batch (recommended) | When you run it on the server | Backup (`exment:backup`) → `composer update` → `php artisan exment:update` | The newest version allowed by `composer.json` (e.g. `"exceedone/exment": "^7.0"` → the newest v7.x, never v8) |
| Auto update | Every day (cron / Task Scheduler) | Looks up the newest version on Packagist; if it is newer than the installed one, runs the update batch | Same as the update batch (only within `composer.json`) |
| Manual (commands) | When you run the commands | You run `composer update` etc. yourself | As you specify |

- **The auto update never updates to a new major version**, because `composer update` stays within the range in `composer.json`. For example, with v6 and `"exceedone/exment": "^6.2"`, it updates only to the newest v6.x even after v7 is out.
- In that case the auto update sees "a newer version (v7) exists" and runs the update batch every day (staying on the newest v6.x). Please update the major version, or stop the auto update until you do.
- You can check your version on the "System Setting" page, or as the `version` of `exceedone/exment` in `composer.lock`.

- Updating from v3.X.X or lower to v4.0.X requires a manual update. Please check the contents of [here](/update/v4_0) once and then update.

- <span class="red bold">Updating from v4.3.X or lower to v4.4.X or higher requires a manual update. Please check the contents of [here](/update/v4_4) once and then update.</span>

- <span class="red bold">Updating from v4.4.X or lower to v5.0.0 or higher requires a manual update. Please check the contents of [here](/update/v5_0_php8) once and then update.</span>

- <span class="red bold">Updating from v5.0.X or lower to v6.0.0 or higher requires a manual update. Please check the contents of [here](/update/v6_0_php8) once and then update.</span>

- <span class="red bold">Updating from v6.X.X or lower to v7.0.0 or higher requires a manual update. The Laravel version and the namespace of the admin library have changed. Please check the contents of [here](/update/v7_0_0) once and then update.</span>

- Updating from v7.0.X to v7.1.0 uses the usual update steps. <span class="red bold">After the update, the screen design becomes "Modern".</span> To go back to the previous look, select "Classic" in the [Screen design](/system_setting?id=screen-design) of the system setting. After the update, press Ctrl+F5 (super reload) in the browser.

- If you get an error during the update, please refer to [Troubleshooting](/troubleshooting).

## (First time only) Download update batch

### For Windows
- Download the following files:  
https://exment.net/downloads/cmd/ExmentUpdateWindows.bat

- Place the downloaded file in the project root directory.

### For Sakura Internet
- Execute the following command in the project root directory to download.

~~~
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxSakura.sh
chmod 775 ExmentUpdateLinuxSakura.sh
~~~

### For Xserver
- Execute the following command in the root directory of the project to download.

~~~
wget https://exment.net/downloads/cmd/ExmentUpdateLinuxXserver.sh
chmod 775 ExmentUpdateLinuxXserver.sh
~~~

### For Linux
- Execute the following command in the project root directory to download.  

~~~
wget https://exment.net/downloads/cmd/ExmentUpdateLinux.sh
chmod 775 ExmentUpdateLinux.sh
~~~


### For Mac
- Download the following files:  
https://exment.net/downloads/cmd/ExmentUpdateLinux.sh

- Place the downloaded file in the project root directory.

- Execute the following command.

~~~
chmod 775 ExmentUpdateLinux.sh
~~~

## Execute update batch
Execute the update batch.

### For Sakura Internet
- Execute the following command in the root directory of the project.  

~~~
sh ExmentUpdateLinuxSakura.sh
~~~

### Linux / Mac
- Execute the following command in the root directory of the project.  

~~~
sh ExmentUpdateLinux.sh
~~~

### For Windows
- Execute the following batch file.  

~~~
ExmentUpdateWindows.bat
~~~

## Update batch execution contents
The following contents are executed in the update batch.  
 - Data backup
 - Acquire and reflect the latest sources
 - Database update


## (Supplement) Screen display after update
If the latest version exists, the following is displayed on the dashboard screen.
![Custom table screen](img/update/show_version.png)

In order to display this screen, the "currently installed version" and the "latest version" are acquired by the system.  
This item is managed by a mechanism called "session" so that it is not acquired each time the screen is displayed, and retains its value until you log out.  

Therefore, **even if an update is performed, the notation of "There is a new version" does not disappear and remains displayed.**  
After the update, log out and log in again to get the latest version.

## Manual update method
If you want to execute the update manually from the command, please execute this.  

### (Recommended) Data backup
Perform a data backup. For more information [backup](/backup) Please confirm.  
- Log in to Exment as an administrator and select "Administrator Settings" → "Backup" from the left menu.
- Click the "Backup" button at the top right of the "Backup" page.
- A backup of the latest data as well as attachments is created.
- Then click on the backup file at the time of execution and download it.

### Get latest source, reflect, update database

- Currently, XServer does not support the default installation of the PHP Sodium extension.  
  ※If installation is absolutely necessary, you will need to contact XServer’s support team.  

- If you want to update Composer on XServer, you need to use a different command than the usual update command.  
  Normally: `composer update` <span style="color: red;">✖</span>  
  Actually: `composer update --ignore-platform-reqs`  
  → This command ignores the Sodium check and directly executes the Composer update.  

- On a rental server (Xserver, etc.), `php` over SSH can be a different version from the PHP chosen on the control panel. Check with `php --version` that it is the same version. If not, link `~/bin/php` to that version, or run it by the full path, like `/usr/bin/php8.3 artisan exment:update` ([rental server](/install_rental)).  

- In the command line, execute the following command.  
  ※Immediately after the release, the latest version might not be detected. In that case, wait for about 10-20 minutes and then run the command again.  

~~~
cd (Project’s root directory)
composer update
# For XServer, execute the following instead of "composer update"
# composer update --ignore-platform-reqs
php artisan exment:update
~~~

On a production site (`APP_ENV=production`), you are asked before the database is changed. With no terminal (scripts, cron, CI), run `php artisan exment:update --force`.  
