# Command list
A list of commands available in Exment.  
Includes commands used in the system and commands for development.

## Installation / Update

### Install

This is a command to install Exment manually.  
Please check [here](/quickstart_manual) for details.  
\* Installation requires work other than the following commands. When executing the installation, basically follow the contents of the link above.

```
php artisan exment:install
```

### Update
This is a command to update Exment manually.  
Please check [here](/update) for details.  
※Update requires work other than the following commands. When executing the update, basically follow the contents of the link above.

```
php artisan exment: publish
```

### Publish css / js files, etc.
Publish a set of css, js, image files, configuration files, etc. in the package to the default path of laravel.

```
php artisan exment: publish
```



## Data import / export / data deletion

### Data export
Export the data from the command.  
Please see [here](/data_cmd_import_export#data-export) for details.

~~~
php artisan exment: export (table name)
~~~

### Data export (chunk mode)
Export data (chunk mode, split output) from the command.  
Please see [here](/data_cmd_import_export#export_chunk) for details.

~~~
php artisan exment: chunkexport (table name)
~~~


### Data import
Import the data from the command.  
Please see [here](/data_cmd_import_export#data-import) for details.

~~~
php artisan exment: import {folder name}
~~~


### Data import - Import attachments for images and file columns
Attachments can be registered in a batch in the custom column type "Image" and "File" columns of Exment.  
For more information please check [here](/data_cmd_import_export#import_file).

```
php artisan exment:file-import {folder name}
```


### Data import - Document (Attachment) List
Files can be registered in a batch in the document (attached file) of the specified custom data.  
For more information please check [here](/data_cmd_import_export#import_document).

```
php artisan exment:document-import {folder name}
```


### Large amount of data batch input
Batch input of a large amount of data from a command.  
Please see [here](/data_bulk_insert) for details.

~~~
php artisan exment: bulkinsert {folder name}
~~~


### Refresh custom data
Refresh (collectively delete) the custom data registered in Exment.  
Please use it when you want to delete the test data while leaving only the table definition.  
Please check [here](/refresh_data) for details.

~~~
php artisan exment: refreshdata
~~~


### Refresh custom data (specified table)
Of the custom data registered in Exment, the data in the specified table is refreshed (collectively deleted).  
Please use it when you want to delete the test data while leaving only the table definition.  
Please check [here](/refresh_data) for details.

~~~
php artisan exment: refreshtable (table name)
~~~




## Backup / Restore

### Backup
Perform an Exment backup. It is the same function as the backup function executed from the screen.  
Please see [here](/backup#backup) for details.

```
php artisan exment: backup
```

### Restore
Perform an Exment restore. It is the same function as the restore function executed from the screen.  
Please see [here](/backup#restore) for details.

```
php artisan exment: restore (zip file name)
```


## Batch Schedule

### Plugin batch execution
Execute the batch registered in Exment.  
Please check [here](/plugin_quickstart_batch) for details.

~~~
php artisan exment: batch 1
~~~


### Schedule execution
The job is executed according to the scheduler registered in Exment.  
Please check [here](/additional_task_schedule) for details.

~~~
php artisan exment: schedule
~~~


### Execute notification (elapsed time)
Execution of notification The notification set in the trigger "Elapsed time" is executed immediately regardless of the "Notification time" setting.  
Please check [here](/notify) for details.

```
php artisan exment:notify {id?} {--name=}
```




## Others for development

### Exment Version
Showing Exment current version.

```
php artisan exment:version
```


### Password reset
Execute Exment login password reset from the command.  
Please check [here](/login_setting#password-reset-command) for details.

```
php artisan exment: resetpassword --email = (target user's email address) --password = (changed password)
```


### Test data creation
Create a set of Exment test data.  
<span class = "red"> * Please note that all registered data will be deleted. </span>

```
php artisan exment: inittest
```


### Email sending test
Performs an email sending test according to the email settings set in Exment.  
For details, see [here](/mailsend_setting#command) executed from the.

```
php artisan exment: notifytest --to = (mail destination)
```

### Language file support omission confirmation
Check the language / word that is not reflected in the package in the Laravel language file.

```
php artisan exment: checklang
```


### Data patch
This command is executed when the data registered in the database needs to be corrected.  
\* Basically, it is automatically executed when the data is updated.  
\* Please check the source "src/Console/PatchDataCommand.php" directly for the action to be taken.

```
php artisan exment: patchdata {implementation action}
```


### Database connection check
Check if you are connected to the database.  
Returns 1 if connected, 0 if not connected.

```
php artisan exment:check-connection
```
