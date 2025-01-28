# Update
This is the procedure when the version of Exment has been updated and an update is required.  
Please check [here](/release_note)for the update history.  

- Updating from v3.X.X or lower to v4.0.X requires a manual update. Please check the contents of [here](/update/v4_0) once and then update.

- <span class="red bold">Updating from v4.3.X or lower to v4.4.X or higher requires a manual update. Please check the contents of [here](/update/v4_4) once and then update.</span>

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

## Run update batch
The update batch does the following:
  - Data backup
  - Obtain the latest source and reflect
  - Database update

## Update batch execution contents
The following contents are executed in the update batch.  
 - ata backup
 - Acquire and reflect the latest sources
 - Database update


## (Supplement) Screen display after update
If the latest version exists, the following is displayed on the dashboard screen.
![Custom table screen](img/update/show_version.png)

In order to display this screen, the "currently installed version" and the "latest version" are acquired by the system.  
This item is managed by a mechanism called "session" so that it is not acquired each time the screen is displayed, and retains its value until you log out.  

Therefore, **even if an update is performed, the notation of "There is a new version" does not disappear and remains displayed.**  
After the update, log out and log in again to get the latest version.

## (old) Manual update method
The following is the backup method for v1.3.0 or earlier. If you want to execute the update manually from the command, please execute this.  

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

- In the command line, execute the following command.  
  ※Immediately after the release, the latest version might not be detected. In that case, wait for about 10-20 minutes and then run the command again.  

~~~  
cd (Project’s root directory)  
composer update --ignore-platform-reqs`  
php artisan exment:update  
~~~