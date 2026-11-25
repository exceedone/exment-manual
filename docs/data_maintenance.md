# Data maintenance
A page where the administrators of a table tidy its data at once. Open "Data Maintenance" from "Table Detail Setting" at the top right of the table pages (URL `/data_maintenance/(table name)`).

Note: this page is in Exment v7.3.0 and later.  
Note: turn "Data maintenance" on in "Feature management". It is off at first.  
Note: the users who may use it are those with the "Table settings" permission of the table (system administrators included).

Tools on this page:
- [Delete the attachments at once](#delete-the-attachments-at-once)

## Delete the attachments at once
Deletes the attachments of this table at once, to free space on the server.

- **The data stays.** Only the files are deleted.
- Deleted files **cannot be brought back**. [Back up](/backup) the files you need first.

### What to delete
| Item | Content |
|---|---|
| The attachments of the data | The "Attachments" of the data details page. **Their older versions**, kept when an attachment was replaced, **are deleted too**. |
| The files of the file and image columns | The files of the file and image columns. The value of the column becomes empty. No notification or workflow runs, and "Updated at" and "Updated user" of the data do not change. |

At first, only "The attachments of the data" is chosen.

### Before
When a day is given, **only the files added before that day** are deleted. Empty: all the files.

- When the current file of an attachment was added on that day or later, the attachment stays, and **only its older versions** from before that day are deleted.

### Included, and not touched
- **The files of deleted data (in the trash) are included.** Restoring that data does not bring the files back.
- **The data change history stays.** It keeps the names of the files, not the files. After the deletion, an old history shows such a file as "(deleted)".
- The images in rich text (editor) columns and the comments are not deleted.

### How to use
1. Choose what to delete, give a day in "Before" if needed, and press "Count them".
1. "To delete" shows the number of attachments, older versions and column files, the number of data, and the total size. With more than 5,000 files, the total size is the size of the first 5,000.
1. To confirm, type the table name and press "Delete ○ files". The browser asks once more.
1. When it is done, "Deleted ○ files (○ MB) of ○ data." is shown.

What was deleted (the table, what, the day, the numbers and the size) is in the [operation log](/logs) as `data_maintenance/(table name)/attachments`.

## Deleting the data too
When the data may go too, "Permanently Delete" in [Deleted data](/deleted_data) also deletes the attachments of that data.

## Related
- [Feature management](/feature)
- [Deleted data](/deleted_data)
- [Backup](/backup)
