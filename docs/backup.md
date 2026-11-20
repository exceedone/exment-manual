# Backup and Restore
Exment data can be backed up and restored.

## Overview
Exment allows you to backup and restore your data.  
For example, you can do the following:  

- Before making large data updates, make backups in advance and restore them if anything goes wrong.
- Keep a backup every day to guard against unexpected failures.
- Migrate all data from one environment to another. (Be sure to check the operation before implementation.)

The backup target is as follows.
- Database
- Plugin file
- Attachments
- logfile
- setting file 

## screen
- From the left menu, select "Admin Settings> Backup".
Or access the following URL.  
http(s)://(Exment URL)/admin/backup  
This will bring up the backup screen.  
![Backup screen](img/backup/backup1.png)

> Note: "admin" in the URLs is the default setting. If you have changed or removed it with `ADMIN_ROUTE_PREFIX` in `.env`, replace "admin" with that value (if removed, omit "/admin", e.g. `http(s)://(Exment URL)/oauth/token`). For details, see [Change / delete "admin" included in URL](/additional_prefix).

## Backup
There are two types of backup methods: "manual" and "automatic".  

### Perform manual backup
This is the procedure to perform backup manually.  
You can perform backup at any time.    

- Click the "Backup" button at the top right of the page.    
![Backup screen](img/backup/backup2.png)  

- A confirmation dialog is displayed. Click "Confirm" and wait.  
**※Backups are very time consuming. Please wait without operation.**
![Backup screen](img/backup/backup3.png)  

- When complete, a message is displayed.  
After that, a file with the creation date and time of execution is created in the backup list.  
![Backup screen](img/backup/backup4.png)  
![Backup screen](img/backup/backup5.png)  

- The created backup file can be downloaded.  
Click the "Download" link in the backup row.  
![Backup screen](img/backup/backup6.png)  


### Automatic backup execution
Exment allows you to automatically back up at a fixed time.  
By making regular backups, it is possible to restore data in the event of a major data update error.  
**※It is necessary to set [Task Schedule](/additional_task_schedule) in advance.**

    
As an example, it is a method of setting "backup for seven generations" at "3:00 at night", "every other day".  

- Select "YES" for "Auto Backup" from "Backup Settings".
![Backup screen](img/backup/backup7.png)  

- Change the option settings.
![Backup screen](img/backup/backup8.png)  

- Then, click the "Save" button at the bottom of the page.  

### (Advanced) Command backup
Backup by command is also possible. Execute the following command in the root directory of the project.

~~~
php artisan exment:backup
~~~

- If "--target=" is not specified, all targets (database, plugin files, attachment files, log files and config files) are backed up.
- To back up only some targets, specify the following keys in "--target=", separated by commas.
    - database : Database
    - plugin : Plugin File
    - attachment : Attachment File
    - log : Log File
    - config : Config File

~~~
# Example: back up only the database and the attachment files
php artisan exment:backup --target=database,attachment
~~~


## Restore
There are two ways to restore (restore) data: "Select from backup list" and "Upload".  

### Notes on Restoration
- If the version of Exment at the time of backup and the version of Exment currently installed are different, it is necessary to update the database after restoration.  
Example： Version at the time of backup: v1.1.6 Current version: v1.2.0 → Database needs to be updated.
In this case, execute the following command after restoration.

~~~
php artisan exment:update
~~~

- After restoration, you will be automatically signed out.  
Log in with the user ID and password that were backed up.


### Select from backup list
This is a method of restoring data by selecting a file to be backed up from a list of backups performed in the past.  

- From the backup list, click the "Restore" link.  
![Backup screen](img/backup/restore1.png)  

- A confirmation dialog is displayed. Click "Confirm" and wait.  
**※Restore is very time consuming. Please wait without operation.**
![Backup screen](img/backup/restore2.png)  

- When the completion message is displayed, the environment will be restored to the state at the time of backup.  
You will be automatically redirected to the login page.  
![Backup screen](img/backup/restore3.png)  

### Upload
This is a method to upload a locally stored backup to Exment and restore the data.  
**※If the size of the uploaded file is too large, it may not complete successfully.**  
In that case, please refer to the following menu "If the file size is too large to upload".    

- Click the "Restore" button at the top right of the page.  
![Backup screen](img/backup/restore4.png)  

- A file upload dialog will be displayed. Select the locally downloaded backup file and click "Send".  
![Backup screen](img/backup/restore5.png)  

- Click the "Send" button and wait.  
**※Restore is very time consuming. Please wait without operation.**

- When the completion message is displayed, the environment will be restored to the state at the time of backup.  
![Backup screen](img/backup/restore6.png)  



### When uploading is not possible due to large capacity
When restoring using the "Upload" method, if the size of the backup file is too large, the restoration may fail.  
In such a case, perform restoration according to the following procedure.  

- Place the downloaded backup file in the following path on the server:  

~~~
(Project root directory)/storage/app/backup/list
~~~

- Reload Backup screen.  

- The placed backup file has been added to the backup list. Restore from "Select from backup list" in the above menu.  

### (Advanced) Restore by command
Restoration by command is also possible. Execute the following command in the root directory of the project.

~~~
php artisan exment:restore (zip file name)
~~~

- If the zip file name is omitted, the backup list is displayed. Select the file to restore.
- A confirmation message is displayed before the restore starts. To run without the confirmation message, specify "--yes".

~~~
# Example: restore without the confirmation message
php artisan exment:restore (zip file name) --yes
~~~


### (For advanced users) Change backup destination
Normally, backup files are located on a web server.  
However, there may be requests to place the backup files in a different location.  
If you put it in another location, you can download a backup file from another location and restore Exment if the web server goes down for some reason and can't start.  
  
※The setting procedure has been moved to [here](/additional_file_saveplace).  


### Notes
- Depending on the server, the above backup destination change may not be possible.  

Especially in the case of a rental server, **There may be restrictions on FTP etc. depending on the setting of the provider.** Please note.