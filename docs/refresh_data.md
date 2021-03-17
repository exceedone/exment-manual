# Refresh custom data
You can refresh Exment's custom data.  
It can be used for the following purposes.  

- After verifying the environment, I want to delete all registered data and perform verification again.  
- After migrating from the test environment to the production environment, delete all the data in the production environment and start operation.

There is a command to refresh the data in all custom tables at once, and a command to refresh only the data in the specified table.  

## Data for all tables
Refresh the data for all tables.  
By executing the command, all the following data will be deleted, and the id serial number will also be from 1.


### Data to be deleted (including internal tables)
- Access log
- Email address verification table
- Notification bar data
- Change log
- For workflow work users
- Workflow execution status
- Sharing custom data
- n:n relation data (organization-excluding users)
- Custom data (excluding users, organizations, notification templates)
- Custom data attachments (excluding users, organizations and notification templates)

### Data not deleted
- System setting
- Custom table settings
- Workflow settings
- Other system related settings
- Login information
- User information, organization information, notification template data
- Organization-User Affiliation Information

### Execution method
- Execute the following command.

~~~
php artisan exment:refreshdata
~~~

- <span class="red bold">* It is recommended to back up the data before executing this command.</span>


## Data in the specified custom table
Refreshes the data for the specified custom table.  
Not all are deleted at once, but the deletion method and deletion contents are controlled depending on the situation.  
\* User, organization, and notification template data cannot be refreshed.

### Data that deletes all and the id serial number becomes 1.
- Data in the specified custom table
- Data in a child custom table if the specified custom table is set to a 1: n parent relation
- If the specified custom table is set to the parent / child relation of n: n, the relation data information of n:n.   
\* The data itself in the relation destination custom table is not deleted.  

### Delete only the data related to the table to be deleted (including the internal table)
- Notification bar data
- Change log
- For workflow work users
- Workflow execution status
- Sharing custom data
- Custom data attachments, comments

### Updated to empty value
- If the table to be deleted is included in the custom column "Select (from table)" of another custom table, the referenced value will be empty for the data in that custom table. I will update it all at once.


### Execution method

- Execute the following command.

~~~
php artisan exment:refreshtable {table name. If there are multiple, enclose them in "" and separate them with commas.}

# Ex：Execute for one table
php artisan exment:refreshtable information

# Ex：Execute for multiple tables
php artisan exment:refreshtable "table1,table2,table3"
~~~

- <span class="red bold">\* It is recommended to back up the data before executing this command.</span>