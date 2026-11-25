# Backup and Restore (SQL Server)
These are the steps to back up and restore (put back) the Exment data by hand when the database is SQL Server.  

## Overview
If you are using SQL Server, you cannot back up and restore from the Exment screen. Do the following two by hand.

| Target | How |
| ---- | ---- |
| Database | Back up and restore with Microsoft SQL Server Management Studio (SSMS) |
| Files (the four below) | Save each folder to another place with Explorer or similar. Put them back when needed |

- Plugin files
- Attachments
- Log files
- Setting files

## Database backup
This is the procedure for backing up SQL Server.  
You can run it at any time.  

- Start Microsoft SQL Server Management Studio (SSMS).  
**Note: be sure to log in as a member of the sysadmin server role, or of the db_owner or db_backupoperator database role.**
![Backup screen](img/backup/sqlserver1.png)  

- Right-click the database to back up and select Tasks → Back Up.  
![Backup screen](img/backup/sqlserver2.png)  

- On the Back Up Database screen, select "Backup type: Full" and click Add for the backup destination.  
![Backup screen](img/backup/sqlserver3.png)  

- The Select Backup Destination dialog appears. Decide a folder and a file name you like and click the OK button.  
![Backup screen](img/backup/sqlserver4.png)  

- Return to the Back Up Database screen and click the OK button. The backup starts. When it is finished, a message appears.   
![Backup screen](img/backup/sqlserver5.png)  

- Check that a backup file (.bak) has been made in the backup destination you decided.

## Backup of various files
The following files are in fixed folders on the server. Using Explorer or similar, save each folder to another folder or to external media.
  
~~~
Plugin files     : (Project root directory)/storage/app/plugins
Attachments      : (Project root directory)/storage/app/admin
Log files        : (Project root directory)/storage/logs
Setting files    : (Project root directory)/config
.env file        : (Project root directory)/.env
~~~
    
**Note: the .env file holds important Laravel settings. We recommend backing it up. But do not replace it as it is when restoring**.

## Database restore
This is the procedure for restoring a SQL Server backup.  
Be sure to check that no users are using Exment before you do this.  

- Start Microsoft SQL Server Management Studio (SSMS).  
**Note: be sure to log in as a member of the sysadmin or dbcreator server role, or as the database owner (dbo).**
![Backup screen](img/backup/sqlserver1.png)  

- Right-click the database to restore and select Tasks → Restore → Database.  
![Backup screen](img/backup/sqlserver6.png)  

- On the Restore Database screen, select "Source: Device" and click "..." to open the Select backup devices dialog.  
![Backup screen](img/backup/sqlserver7.png)  

- Click the Add button. The Locate Backup File dialog appears. Select the backup file you want to restore and click OK.  
![Backup screen](img/backup/sqlserver8.png)  

- Check that the selected file has been added to the Select backup devices dialog, and click OK again.  
![Backup screen](img/backup/sqlserver9.png)  

- You return to the Restore Database screen. Select "Select a page: Options" to open the Options tab. Check "Restore options: Overwrite the existing database" and "Server connections: Close existing connections to destination database", and click OK.  
![Backup screen](img/backup/sqlserver10.png)  

- When the restore is finished, a message appears.  
![Backup screen](img/backup/sqlserver11.png)  


### Notes on Restoration
- If the version of Exment at the time of the backup and the version of Exment installed now are different, the database must be updated after the restore.  
Example: Version at the time of backup: v1.1.6 Current version: v1.2.0 → the database must be updated  
In that case, run the following command after the restore.  

~~~
php artisan exment:update
~~~
    
**Note: a database backed up with a newer version of Exment cannot be restored to an older version of Exment**.


## Restore of various files
Using Explorer or similar, put the saved files back folder by folder.  

- Plugin files and attachments are linked with the data in the database. Restore the ones backed up at the same time, together with the database.
- We recommend that you do not overwrite log files as they are, but save them with a different name in the same folder.
  
~~~
Plugin files     : (Project root directory)/storage/app/plugins
Attachments      : (Project root directory)/storage/app/admin
Log files        : (Project root directory)/storage/logs
Setting files    : (Project root directory)/config
~~~
