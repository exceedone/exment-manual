# Batch input of large amount of data
A function that puts a large amount of data prepared as csv files into a custom table at once, with a command on the server (bulk insert; 1000 records or more are possible).  
Because speed comes first, detailed error checks are not done.

The flow is as follows.

1. Make the csv files ("Data preparation")
2. Put them in a folder on the server and run the command ("Method of operation")

## important point
Bulk insert puts speed first. Therefore, please note the following points.

- **Even if the csv you made or the contents of the data have defects, detailed error checks are not done.** Check the files well when you make them. When a problem occurs, check by, for example, putting a part of the data in with the import from the screen.

- "[Changing the method of specifying parent table data](/data_import_export?id=changing-the-method-of-specifying-parent-table-data)", which the [normal import](/data_import_export) can do, cannot be done with this function. Write the id in the column and import.


## Data preparation
First, make the csv files for import.

| Rule | Content |
| ---- | ---- |
| First row | The column names of the custom table |
| Second row onward | The data to put in |
| File name | **"(custom table name).csv"** (example: client.csv). When the data for one table is divided into several files, add a sequence number like **"(custom table name).sequence number.csv"** (example: client.01.csv) |
| Character code | <strong>UTF-8</strong> (without BOM) |

**When a file is made with EXCEL, the character code is Shift JIS at first. Be sure to convert the character code beforehand, with a text editor or the like.**  

### Values ​​that can be used as column names in custom tables
| Item | Description |
| ---- | ---- |
| id | Primary key (number). Enter only when you want to specify it |
| parent_type | The name of the parent table. Enter only for data of a child table |
| parent_id | The ID of the linked parent data. Enter only for data of a child table |
| deleted_at | The date and time the data was deleted. Enter only when you want to specify it |
| deleted_user_id | The ID of the user who deleted the data. Enter only when you want to specify it |
| value.(column name of the custom column) | The column name registered in the custom column setting. Be sure to put value. at the beginning |

- Unless there is a particular reason, write only custom columns in the csv file (the other items are entered automatically).  
- **Unlike the normal import, no update is done even if you specify the same id as existing data.**  

#### Sample file (client.csv)
- A sample that puts data into the customer table (client). It enters the customer code (client_code) and the customer name (client_name), and, only for the third record, the deletion date and time (deleted_at) and the deleting user ID (deleted_user_id).  

~~~
value.client_code,value.client_name,deleted_at,deleted_user_id
CUST001,Test customer name 001,,
CUST002,Test customer name 002,,
CUST003,Test customer name 003,2019/3/20,2
CUST004,Test customer name 004,,
CUST005,Test customer name 005,,
CUST006,Test customer name 006,,
CUST007,Test customer name 007,,
CUST008,Test customer name 008,,
CUST009,Test customer name 009,,
~~~

## Method of operation

1. Make a working folder in the following place on the server. A folder name that shows what this work is about, or a date, is recommended.  

~~~
(Project root directory)/storage/app/bulkinsert/(folder name)
~~~

2. Put the csv files you made (several are possible) in that folder.

#### Folder layout example
![Working folder for the bulk insert](img/bulkinsert/folder1.png)  

3. Run the following command on the command line.
~~~
php artisan exment:bulkinsert {folder name}
~~~

#### Command execution example
![Backup screen](img/bulkinsert/cmd1.png)  
