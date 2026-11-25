# Refresh custom data
How to delete the registered custom data all together (refresh it) with a command.  
Only the data is deleted; the settings (table definitions, system settings and so on) stay. Use it in cases like these.

- After verifying an environment, you want to delete all the registered data and verify again.
- After moving from the test environment to the production environment, you want to delete all the data of the production environment and start operation.

There are two commands.

| What you want to do | Command | Where to look |
|---|---|---|
| Delete the data of all custom tables at once | `php artisan exment:refreshdata` | "Data for all tables" |
| Delete only the data of the specified tables | `php artisan exment:refreshtable` | "Data in the specified custom table" |

For both commands, we recommend taking a backup of the data before you run them.

## Data for all tables
All tables are the target.  
When you run the command, all of the "data to be deleted" below is deleted. The id serial numbers also start from 1 again.


### Data to be deleted (including internal tables)
- Access log
- Email address verification table
- Notification bar data
- Update history
- Target work users of workflows
- Workflow execution status
- Sharing of custom data
- n:n relation data (except organization-user)
- Custom data (except users, organizations and notification templates)
- Attached files of custom data (except users, organizations and notification templates)

### Data not deleted
- System settings
- Setting values of custom tables
- Workflow settings
- Other system-related setting values
- Login information
- Data of user information, organization information and notification templates
- Organization-user membership information

### Execution method
- <span class="red bold">※We recommend backing up the data before you run this command.</span>
- Run the following command.

~~~
php artisan exment:refreshdata
~~~


## Data in the specified custom table
The specified custom tables are the target.  
Not everything is deleted at once: how it is deleted depends on the kind of data (the three below).  
※The data of users, organizations and notification templates cannot be refreshed.

### Data that deletes all and the id serial number becomes 1.
- The data in the specified custom table
- If the specified custom table is the parent side of a 1:n relation, the data in the custom table on the child side
- If the specified custom table is the parent side or the child side of an n:n relation, the n:n relation data information. ※The data itself in the custom table at the other end of the relation is not deleted.

### Delete only the data related to the table to be deleted (including the internal table)
- Notification bar data
- Update history
- Target work users of workflows
- Workflow execution status
- Sharing of custom data
- Attached files and comments of custom data

### Updated to empty value
- If the table to be deleted is used in a custom column "Select (From Table)" of another custom table, the data in that custom table is updated all at once so that the referenced value becomes empty.


### Execution method

- <span class="red bold">※We recommend backing up the data before you run this command.</span>
- Run the following command.

~~~
php artisan exment:refreshtable {table name. For several, enclose them in "" and separate them with commas}

# Example: run for one table
php artisan exment:refreshtable information

# Example: run for several tables
php artisan exment:refreshtable "table1,table2,table3"
~~~
