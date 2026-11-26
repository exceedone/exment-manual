# Trash
See the deleted data of all tables on one page. You can restore it or delete it for good.  
You can also have data deleted for good automatically at night, after the number of days you set.

Note: this feature is in Exment v7.3.0 and later.  
Note: the "Trash" page is off at first. Until a system administrator turns on "Trash" in [Feature management](/feature), the menu is hidden and the URL shows "not found".

## The Trash page
Open "Settings: Data and screens" -> "Trash" (URL `/admin/trash`).

### Data you can see
The deleted data of a table is shown when both of these are true.
- You have the "View deleted data" permission, or you are an administrator of the table.
- You can view the data of the table.

For how permissions work, see [Permissions](/permission).

### List
These items are shown, newest first, 30 per page.
- Table
- Data
- Deleted date and time
- Deleted by
- A link to the data

You can filter by:
- Table
- Deleted date (from / to)
- Deleted by

### Restore
Restore one row at a time, or select rows and restore them together.
- You can select up to 100 rows at once. A bulk action is all or nothing: if one row fails, nothing changes.
- You need the edit permission on the table and on the data.
- If the parent data is still deleted, a child cannot be restored alone. Restore the parent first.
- When you restore a parent, its child data comes back too.

### Delete for good
Delete one row at a time, or select rows and delete them together.
- Up to 100 rows at once, all or nothing.
- The change history, files and child data are deleted too.
- **It cannot be undone.** Check carefully before you do it.

See also [Deleted data](/deleted_data).

### Events for plugins
Plugins can receive events when data is restored or deleted for good (`CustomValueRestored`, `CustomValueForceDeleted`).

## Automatic purge
Data that was deleted more than the set number of days ago is deleted for good every night.

### Setting for each table
In [Custom table settings](/table), enter the number of days in "Days to keep deleted data" (the time from deleting to deleting for good).
- Empty or 0 means never. The default is empty.
- User, organization, comment and document tables do not have this setting.

### The nightly job
Every night at 03:50, `exment:trash-purge` runs. It deletes for good the data deleted more days ago than the setting.

**The automatic purge works even when the Trash page is turned off in Feature management.** It depends only on the table setting.

### Archive
Before deleting for good, a copy is saved in an archive.
- The data
- Child data
- Comments
- Change history
- Copies of the attached files

A row is kept, and tried again the next night, when:
- a file cannot be copied,
- the delete is stopped, or
- it still has child data that is not deleted.

Archives are removed after 365 days by default. You can change this in `.env`.

| Setting | Meaning |
| --- | --- |
| `EXMENT_DELETED_ARCHIVE_KEEP_DAYS` | Days to keep archives. Default 365. 0 keeps them forever. |
| `EXMENT_DELETED_ARCHIVE_DISK` | Where archives are saved. Empty means the same disk as the attachments. The folder is `archives/deleted`. |

Note: restoring from the archive is not available yet (it is planned).

### Check with the command
```
php artisan exment:trash-purge --dry-run
```
With `--dry-run`, nothing is changed. It only shows what would be purged and what would be skipped.  
Add `--table=<table name>` to check one table only.
