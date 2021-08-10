# Bug fix File deletion process linked to physically deleted data

### Bug occurrence version
v4.0.6 or less

## Background
- Originally, when physically deleting custom data, it was necessary to delete the files associated with that data (here, "attached files", "files" and "images" in custom columns).

- In v4.0.6 or lower, the process was not taken into consideration, and even if the data was deleted, the file remained.

- In this support, physical deletion has already been performed, and files that are no longer linked to any data will be deleted.

## Correspondence procedure

- Back up your data. For backup, perform [here] (/backup).

- This time, we also recommend manual backup because it involves deleting data. Copy the folder storage/app/admin folder to another folder (working folder, etc.) and keep a backup.

- Execute the following command.

```
php artisan exment:patchdata delete_junk_file (table name)

Ex：To delete a file in the "information" table
php artisan exment:patchdata delete_junk_file information
```

- This will delete the deleted data file.
* In order to clarify which table file to delete, the command is executed by specifying the table name each time.

## (Supplement) Details of internal processing
I will explain the internal processing.

### Delete physically deleted files data
Delete the row associated with the custom data that has already been physically deleted from the DB table "files (the table that holds the uploaded file name and the ID of the custom data associated with it)".

- Using the entered table name as a key, search the DB table "files" and get the list.

- For each data in files, search for custom data using the registered parent_id (custom data ID) as a key.

- If the custom data does not exist, it is considered as the data that has already been logically deleted, and the corresponding row is physically deleted from the files table.

### Delete files that are no longer linked
Deletes the files on the server that are related to the data that has already been physically deleted.

- Get a set of files in the "storage/app/admin/(table name)" folder and execute a loop with the file name.

- Search the DB table "files" using the file name as a key.

- If there is no corresponding data in the files table, delete the file.


## When restoring
- If you want to restore the data for any reason, restore the backup file you created or restore the set of files you copied locally to "storage / app / admin /".


## About v4.0.7 or later
- In v4.0.7 or later, the associated file is automatically deleted when the custom data is physically deleted.

- In the same update, we have added an option to always delete custom data physically.
For the setting method, please check [here] (/config).