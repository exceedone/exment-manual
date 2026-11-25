# Command list
A list of the commands available in Exment.  
It includes commands used inside the system and commands for development.  
Where an item has a link to a detailed explanation, please check the linked page too.

## Installation / Update

### Install

This is a command to install Exment manually.  
Please check [here](/quickstart_manual) for details.  
※Installation needs other work besides this command. When you install, basically follow the steps of the page linked above.

```
php artisan exment:install
```

### Update
This is a command to update Exment manually.  
Please check [here](/update) for details.  
※An update needs other work besides this command. When you update, basically follow the steps of the page linked above.

```
php artisan exment:update
```

On a production site (`APP_ENV=production`), a question asks you to confirm before the database is changed. Where there is no terminal (scripts, cron, CI), run `php artisan exment:update --force`.

```
php artisan exment:update --force
```

### Publish css / js files, etc.
Publishes the set of css, js and image files, configuration files, etc. in the package to the default paths of laravel.

```
php artisan exment:publish
```

### Initial file / folder settings when setting up the server
Mainly for a Linux environment. Sets the owner and the permissions of the files and folders required to run Exment.  
Please check [here](/server?id=automatic-generation-of-initial-folders) for details.  

```
php artisan exment:setup-dir {--user=} {--group=} {--easy=0} {--easy_clear=0}
```

### Check system requirements
Checks whether the system requirements for running Exment are met, such as the PHP version, the PHP extensions and the write permissions of the folders, and displays the result.  
For details, see "Check system requirements" [here](/server).

```
php artisan exment:checkrequire
```



## Data import / export / data deletion

### Data export
Exports data from a command.  
Please see [here](/data_cmd_import_export?id=data-export) for details.

```
php artisan exment:export (table name)
```

### Data export (chunk mode)
Exports data (chunk mode, split output) from a command.  
Please see [here](/data_cmd_import_export?id=export_chunk) for details.

```
php artisan exment:chunkexport (table name)
```


### Data import
Imports data from a command.  
Please see [here](/data_cmd_import_export?id=data-import) for details.

```
php artisan exment:import {folder name}
```


### Data import - Import attachments for images and file columns
You can register attachments in a batch in the columns of the Exment custom column types "Image" and "File".  
Please see [here](/data_cmd_import_export?id=import_file) for details.

```
php artisan exment:file-import {folder name}
```


### Data import - Document (Attachment) List
You can register files in a batch in the documents (attached files) of the specified custom data.  
Please see [here](/data_cmd_import_export?id=import_document) for details.

```
php artisan exment:document-import {folder name}
```


### Large amount of data batch input
Inserts a large amount of data in a batch from a command.  
Please see [here](/data_bulk_insert) for details.

```
php artisan exment:bulkinsert {folder name}
```


### Refresh custom data
Refreshes (deletes in a batch) the custom data registered in Exment.  
Use it, for example, when you want to delete the test data and keep only the table definitions.  
Please check [here](/refresh_data) for details.

```
php artisan exment:refreshdata
```


### Refresh custom data (specified table)
Of the custom data registered in Exment, refreshes (deletes in a batch) the data of the specified table.  
Use it, for example, when you want to delete the test data and keep only the table definitions.  
Please check [here](/refresh_data) for details.

```
php artisan exment:refreshtable (table name)
```


### Delete operation logs
Deletes the data of the [operation logs](/logs). You can specify the following options.

- --keep-days=(Number of days. Deletes the operation logs older than the specified number of days. Specify an integer of 1 or more. If not specified, all operation logs are deleted)
- --force(If specified, runs without displaying the confirmation message before deletion)

<span class="red">※Please note that all operation logs are deleted if "--keep-days" is not specified.</span>  
※In an environment where the confirmation message cannot be displayed (cron, etc.), nothing is deleted unless "--force" is specified.

```
php artisan exment:log-clear {--keep-days=} {--force}

# To delete the operation logs older than 180 days without displaying the confirmation message
php artisan exment:log-clear --keep-days=180 --force
```







## Backup / Restore

### Backup
Runs an Exment backup. It does the same as the backup function run from the screen.  
Please see [here](/backup?id=backup_command) for details.  

```
php artisan exment:backup
```

### Restore
Runs an Exment restore. It does the same as the restore function run from the screen.  
Please see [here](/backup?id=restore_command) for details.  

```
php artisan exment:restore (zip file name)
```


## Batch Schedule
### Plugin batch execution
Runs a batch registered in Exment.  
Specify the plugin to run by the plugin ID ("1" in the example below), by "--name=(plugin name)" or by "--uuid=(uuid of the plugin)".  
Please check [here](/plugin_quickstart_batch) for details.

```
php artisan exment:batch 1
```


### Schedule execution
Runs the jobs according to the scheduler registered in Exment.  
Please check [here](/additional_task_schedule) for details.

```
php artisan exment:schedule
```


### Execute notification (elapsed time)
Runs a notification whose Notify Trigger is "The Passage of Time" immediately, regardless of its "Notification Time" setting.  
Specify the notification by its ID, by "--name=(Notify Name)" or by "--suuid=(suuid of the notification)".  
※A notification whose Active Flg is NO is also run.  
Please check [here](/notify) for details.

```
php artisan exment:notify {id?} {--name=} {--suuid=}

# Example: run the notification whose ID is 3
php artisan exment:notify 3
```


### Execute notifications (elapsed time) according to the notification time
Of the notifications whose Notify Trigger is "The Passage of Time" and whose Active Flg is YES, runs those whose "Notification Time" matches the current time (hour).  
※Normally you do not need to run this command by itself, because "Schedule execution" (exment:schedule) does the same process.

```
php artisan exment:notifyschedule
```


### Safety check (checking earthquake information)
Gets earthquake information and, if there is an earthquake that meets the conditions for automatic sending, sends a [safety check](/safety_check).  
It is run every minute by the [task schedule](/additional_task_schedule).  
※Nothing is run when "Auto-send on Earthquake" in the system setting is NO.

```
php artisan exment:safetywatch
```



## Full-text search engine (Meilisearch)
These are the commands for when you use the full-text search engine "Meilisearch".  
Please check [here](/additional_meilisearch) for details of each command.

|Command|Description|
|---|---|
|php artisan exment:meili-index {--fresh} {--force}|Creates the index from the contents of the database. If "--fresh" is specified, the whole index is created again. Please check [here](/additional_meilisearch?id=recreating-the-index) for details.|
|php artisan exment:meili-reconcile {--dry-run} {--table=}|Repairs the difference between the database and the index. Please check [here](/additional_meilisearch?id=repairing-the-difference) for details.|
|php artisan exment:meili-settings {--show}|Applies the index settings (language, synonyms, stop words, etc.). If "--show" is specified, the current settings are displayed. Please check [here](/additional_meilisearch?id=reflecting-only-the-settings) for details.|
|php artisan exment:meili-health {--failed}|Displays the connection status with Meilisearch and the number of registered documents. If "--failed" is specified, the number of jobs waiting to be synced and the number of jobs that failed to sync are also displayed.|
|php artisan exment:meili-search (keyword) {--limit=10} {--table=} {--highlight} {--facets}|Searches with Meilisearch and displays the search results and the processing time. This is a command for checking the operation. Please check [here](/additional_meilisearch?id=operation-check) for details.|



## Others for development

### Exment Version
Displays the version of Exment that is currently installed.

```
php artisan exment:version
```


### Password reset
Resets an Exment login password from a command.  
Please check [here](/login_setting?id=password-reset-command) for details.

```
php artisan exment:resetpassword --email=(target user's email address) --password=(new password)
```

### List API clients
Displays the list of the clients registered in the [API settings](/api). For each client, the name, the type, the user ID, the Client ID, the Client Secret and the redirect URL are displayed.  
<span class="red">※The Client Secret is displayed. Handle the output with care.</span>

```
php artisan passport:clientlist
```

### Resetting workflow data
You can reset the data of a workflow in progress. Run it when a workflow cannot proceed for some reason.  
Please check [here](/workflow_execution?id=resetting-the-workflow-of-data) for details.

```
php artisan exment:workflow-clear (table name) (ID)
```


### Issuing a LINE link code
Issues a link code and a link URL (deep link) for linking the LINE account of the specified user.  
Open the link URL on a smartphone that has added the LINE Official Account as a friend, and send the message shown. The link is then complete.  
※Normally, each user should link their own account on the [LINE integration](/line?id=linking-a-line-account) screen.  
※For "user ID", specify the ID (number) of the user data, not the user code.  
<span class="red">※If you run this command for a user who has already linked a LINE account, the current link is removed.</span>

```
php artisan exment:line-linkcode (user ID)
```



### Test data creation
Creates a set of Exment test data.  
<span class="red">※Please note that all registered data will be deleted.</span>

```
php artisan exment:inittest
```


### Email sending test
Does an email sending test according to the email settings set in Exment.  
Please check [here](/mailsend_setting?id=execute-from-command) for details.

```
php artisan exment:notifytest --to=(mail destination)
```

### Language file support omission confirmation
Checks for languages and words in the Laravel language files that are not yet reflected in the package.

```
php artisan exment:checklang
```


### Data patch
This command is run when the data registered in the database needs to be corrected.  
※Basically, it is run automatically when the data is updated.  
※For the actions, please check the source "src/Console/PatchDataCommand.php" directly.

```
php artisan exment:patchdata {action}
```



### Database connection check
Checks whether the database is connected.  
Returns 1 if connected, 0 if not connected.

```
php artisan exment:check-connection
```
