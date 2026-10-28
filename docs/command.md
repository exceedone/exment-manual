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
php artisan exment:update
```

### Publish css / js files, etc.
Publish a set of css, js, image files, configuration files, etc. in the package to the default path of laravel.

```
php artisan exment:publish
```

### Initial file / folder settings when setting up the server
Mainly in a Linux environment, set the owner and permissions of the files and folders required to run Exment.  
Please check [here](/server#file-permission-settings) for the folders that require write permission.  
- --user=(User name. If not specified, an input prompt is displayed after execution)
- --group=(Group name. If not specified, an input prompt is displayed after execution)
- --easy=(1 when installing Exment with the easy installation. Default is 0)
- --easy_clear=(1 when returning the folder permissions to the appropriate ones after the easy installation. Default is 0)

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}

# For manual installation
php artisan exment:setup-dir
# For easy installation
php artisan exment:setup-dir --easy=1
# To return the folder permissions to the original ones after the easy installation is completed
php artisan exment:setup-dir --easy_clear=1
```



## Data import / export / data deletion

### Data export
Export the data from the command.  
Please see [here](/data_cmd_import_export#data-export) for details.

~~~
php artisan exment:export (table name)
~~~

### Data export (chunk mode)
Export data (chunk mode, split output) from the command.  
Please see [here](/data_cmd_import_export#export_chunk) for details.

~~~
php artisan exment:chunkexport (table name)
~~~


### Data import
Import the data from the command.  
Please see [here](/data_cmd_import_export#data-import) for details.

~~~
php artisan exment:import {folder name}
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
php artisan exment:bulkinsert {folder name}
~~~


### Refresh custom data
Refresh (collectively delete) the custom data registered in Exment.  
Please use it when you want to delete the test data while leaving only the table definition.  
Please check [here](/refresh_data) for details.

~~~
php artisan exment:refreshdata
~~~


### Refresh custom data (specified table)
Of the custom data registered in Exment, the data in the specified table is refreshed (collectively deleted).  
Please use it when you want to delete the test data while leaving only the table definition.  
Please check [here](/refresh_data) for details.

~~~
php artisan exment:refreshtable (table name)
~~~


### Delete operation logs
Delete the data of the [operation logs](/logs).  
- --keep-days=(Number of days. Deletes the operation logs older than the specified number of days. Specify an integer of 1 or more. If not specified, all operation logs are deleted)
- --force(If specified, executes without displaying the confirmation message before deletion)

<span class="red">※ Please note that all operation logs are deleted if "--keep-days" is not specified.</span>  
※ In an environment where the confirmation message cannot be displayed (cron, etc.), nothing is deleted unless "--force" is specified.

```
php artisan exment:log-clear {--keep-days=} {--force}

# To delete the operation logs older than 180 days without displaying the confirmation message
php artisan exment:log-clear --keep-days=180 --force
```




## Backup / Restore

### Backup
Perform an Exment backup. It is the same function as the backup function executed from the screen.  
Please see [here](/backup#backup) for details.

```
php artisan exment:backup
```

### Restore
Perform an Exment restore. It is the same function as the restore function executed from the screen.  
Please see [here](/backup#restore) for details.

```
php artisan exment:restore (zip file name)
```


## Batch Schedule

### Plugin batch execution
Execute the batch registered in Exment.  
Please check [here](/plugin_quickstart_batch) for details.

~~~
php artisan exment:batch 1
~~~


### Schedule execution
The job is executed according to the scheduler registered in Exment.  
Please check [here](/additional_task_schedule) for details.

~~~
php artisan exment:schedule
~~~


### Execute notification (elapsed time)
Execution of notification The notification set in the trigger "Elapsed time" is executed immediately regardless of the "Notification time" setting.  
Please check [here](/notify) for details.

```
php artisan exment:notify {id?} {--name=}
```


### Safety check (checking earthquake information)
Gets earthquake information, and sends a [safety check](/safety_check) if there is an earthquake that meets the conditions for automatic sending.  
It is executed every minute by the [task schedule](/additional_task_schedule).  
※ Nothing is executed when "Auto-send on Earthquake" in the system settings is NO.

```
php artisan exment:safetywatch
```



## Full-text search engine (Meilisearch)
These are the commands used when using the full-text search engine "Meilisearch".  
Please check [here](/additional_meilisearch) for details of each command.

|Command|Description|
|---|---|
|php artisan exment:meili-index {--fresh} {--force}|Creates the index from the contents of the database. If "--fresh" is specified, the whole index is recreated. Please check [here](/additional_meilisearch?id=recreating-the-index) for details.|
|php artisan exment:meili-reconcile {--dry-run} {--table=}|Repairs the difference between the database and the index. Please check [here](/additional_meilisearch?id=repairing-the-difference) for details.|
|php artisan exment:meili-settings {--show}|Applies the index settings (language, synonyms, stop words, etc.). If "--show" is specified, the current settings are displayed. Please check [here](/additional_meilisearch?id=reflecting-only-the-settings) for details.|
|php artisan exment:meili-health {--failed}|Displays the connection status with Meilisearch and the number of registered documents. If "--failed" is specified, the numbers of jobs waiting to be synced and jobs that failed to sync are also displayed.|
|php artisan exment:meili-search (keyword) {--limit=10} {--table=} {--highlight} {--facets}|Searches with Meilisearch and displays the search results and the processing time. This is a command for the operation check. Please check [here](/additional_meilisearch?id=operation-check) for details.|




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
php artisan exment:resetpassword --email=(target user's email address) --password=(changed password)
```

### Resetting workflow data
You can reset the data of a workflow in progress. Please execute it when the workflow cannot proceed for some reason.  

```
php artisan exment:workflow-clear (table name) (ID)

# Example: To reset the workflow progress of the data with table name "estimate" and ID "6"
php artisan exment:workflow-clear estimate 6
```


### Issuing a LINE link code
Issues a link code and a link URL (deep link) for linking the LINE account of the specified user.  
Open the link URL on a smartphone that has added the LINE Official Account as a friend, and send the message shown to complete the link.  
※ Normally, each user should link their account on the [LINE Link](/line?id=linking-a-line-account) screen.  
※ For "user ID", specify the ID (number) of the user data, not the user code.  
<span class="red">※ If you run this command for a user who has already linked a LINE account, the current link is removed.</span>

```
php artisan exment:line-linkcode (user ID)
```


### Test data creation
Create a set of Exment test data.  
<span class="red">* Please note that all registered data will be deleted.</span>

```
php artisan exment:inittest
```


### Email sending test
Performs an email sending test according to the email settings set in Exment.  
For details, see [here](/mailsend_setting#command) executed from the.

```
php artisan exment:notifytest --to=(mail destination)
```

### Language file support omission confirmation
Check the language / word that is not reflected in the package in the Laravel language file.

```
php artisan exment:checklang
```


### Data patch
This command is executed when the data registered in the database needs to be corrected.  
\* Basically, it is automatically executed when the data is updated.  
\* Please check the source "src/Console/PatchDataCommand.php" directly for the action to be taken.

```
php artisan exment:patchdata {implementation action}
```


### Database connection check
Check if you are connected to the database.  
Returns 1 if connected, 0 if not connected.

```
php artisan exment:check-connection
```
