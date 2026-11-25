# Data import / export (command)
This page explains how to import and export the data of a table with commands on the server.

| What you want to do | Command | Where to look |
|---|---|---|
| Put data out to a file | `php artisan exment:export` | "Data export" |
| Put data out in parts of a set number of records | `php artisan exment:chunkexport` | "Data export (chunk mode)" |
| Put data in from a file | `php artisan exment:import` | "Data import" |
| Put files into "Image" and "File" columns at once | `php artisan exment:file-import` | "Data import - attachments of image and file columns" |
| Put the attachments (documents) of data in at once | `php artisan exment:document-import` | "Data import - document (attachment) list" |

> For an overview of data import and export, see [Data import / export](/data_import_export).

## Data export
Exports (outputs) the data of a table to a file by command.  
The file format is csv or xlsx.  


### Method of operation

- Run the following command on the command line.

~~~
php artisan exment:export (table name)

# Example
php artisan exment:export information
~~~

- When this command is run, the csv data is output to the folder "(Exment root folder)/storage/app/export/(execution date and time: yyyyMMddHHiiss)".

### Command arguments

```
php artisan exment:export (table name) {--action=default} {--type=all} {--page=1} {--count=} {--format=csv} {--view=} {--dirpath=} {--add_setting=0} {--add_relation=0} {--add_comment=0}
```

- ##### table name  
(Required) The name (alphanumeric) of the table to output.

- ##### action  
(Optional) How the export is done.
    - default : Outputs all system columns and custom columns. The default value.
    - view : Outputs in the format of the specified view.

- ##### type  
(Optional) The kind (number) of data to export.
    - all : All data. The default value.
    - page : The specified page.

- ##### page    
(Optional) When type is page, the page number. An integer. When not specified, the first page is output.

- ##### count    
(Optional) When type is page, the maximum number of records to output. When not specified, the number of records specified in the target view.

- ##### format  
(Optional) The file format to export.
    - csv : CSV format. The default value.
    - xlsx : Xlsx (Excel) format.

- ##### view  
(Optional) The view to output. Specified by id or suuid. When not set, the all data view is used.

- ##### dirpath  
(Optional) The folder path to export to. A full path. When not set, (Exment root folder)/storage/app/export/(execution date and time: yyyyMMddHHiiss).

- ##### add_relation  
(Optional) Whether to output the relation data too. The default value is 0 (not output). Valid only in the Xlsx format and when action is default.

- ##### add_setting  
(Optional) Whether to output the setting data too. The default value is 0 (not output). Valid only in the Xlsx format and when action is default.

- ##### add_comment  
(Optional) Whether to output the comments of each record too. The default value is 0 (not output). When 1 is specified, the comments are output to the sheet (in the CSV format, the file) "comment". Valid only when action is default and the table has "Use Comment" of the custom table setting set to YES.

~~~
# Example: output in the Xlsx format, with the comments
php artisan exment:export information --format=xlsx --add_comment=1
~~~




<h2 id="export_chunk"><a href="#/data_cmd_import_export?id=export_chunk" data-id="export_chunk" class="anchor"><span>Data export (chunk mode)</span></a></h2>

The data is output in parts of a set number of records (default value: 1000). When outputting a large amount of data, the number of rows in one file can be kept small.  


### Method of operation

- Run the following command on the command line.

~~~
php artisan exment:chunkexport (table name)

# Example
php artisan exment:chunkexport information
~~~

- When this command is run, the csv data is output to the folder "(Exment root folder)/storage/app/export/(execution date and time: yyyyMMddHHiiss)".


### Command arguments

```
php artisan exment:chunkexport (table name) {--action=default} {--start=1} {--end=1000} {--count=1000} {--seqlength=1} {--delimiter=} {--format=csv} {--view=} {--dirpath=}
```

- ##### table name  
(Required) The name (alphanumeric) of the table to output.

- ##### action  
(Optional) How the export is done.
    - default : Outputs all system columns and custom columns. The default value.
    - view : Outputs in the format of the specified view.

- ##### start  
(Optional) The file number at which the output starts. When an export stopped partway, it can also be restarted from the specified sequence number. When not specified, 1.

- ##### end  
(Optional) The file number at which the output ends. When not specified, 1000.

- ##### count    
(Optional) The maximum number of records output to one file. When not specified, 1000.

- ##### seqlength    
(Optional) The number of digits of the zero-padded sequence number. For example, with "3" the sequence numbers are output as "001", "002". When not specified, 1.

- ##### delimiter    
(Optional) The character put between the table name and the sequence number in the file name. When not specified, "." (period).

- ##### format  
(Optional) The file format to export.
    - csv : CSV format. The default value.
    - xlsx : Xlsx (Excel) format.

- ##### view  
(Optional) The view to output. Specified by id or suuid. When not set, the all data view is used.

- ##### dirpath  
(Optional) The folder path to export to. A full path. When not set, (Exment root folder)/storage/app/export/(execution date and time: yyyyMMddHHiiss).



### Output specifications

- The files are output with sequence numbers, with names like **"(custom table name).sequence number.csv"** (example: client.1.csv).

```
#Example
client.1.csv
client.2.csv
client.3.csv

#Example (when seqlength=3 is specified)
client.001.csv
client.002.csv
client.003.csv
```

- Regardless of the number of records and the count option, at most 1000 files can be output in one run.



## Data import
Puts data into a custom table at once, from files placed in a set folder.

- The files that can be used are EXCEL files or csv files in the same format as for the import from the screen.  
- More than 5000 records, which is the limit on the screen, can also be put in.  

### important point
- CSV files compressed in the ZIP format cannot be imported.  

- The same error checks as for the import from the screen are done. Therefore, putting in a large amount of data can take a very long time.  

- The data is imported 100 records at a time. For example, if the first 100 records are registered correctly and then the next 100 records have a defect, the processing of the file is stopped there. The 100 records already registered cannot be undone. Delete them by hand, or remove the registered data from the file.  

- <span class="red">Even with the import by command, data with a very large number of records can cause an error because of insufficient memory.</span>  
We are currently working on improving this. To import a large amount of data, use the [bulk data insert](/data_bulk_insert).

- When importing by csv, at present only the data of that table can be imported. To import relation data too, import by xlsx.


### Data preparation
First, make the file for import. See [Template output](/data_import_export?id=template-output) for details.  

- The character code of csv files that can be imported is <strong>UTF-8</strong>.  

- Use one of the following formats for the file name.  
Note: the files in the folder are imported in order of name. Therefore, when the order of import matters, such as when importing related data at the same time, use method 3 and add sequence numbers in the order of import.

    1. "(custom table name).csv"    Example: client.csv
    2. "(custom table name).(sequence number).csv"   Example: client.1.csv, client.002.csv
    3. "(sequence number).(custom table name).csv"   Example: 01.client.csv, 02.estimate.csv

- <span class="small">Before v3.8.0, a file named "<span class="bold">sequence number<span class="red">#</span>(custom table name).csv</span>" could also be imported.  
In v3.8.0, [the library used on import was changed](/ja/update/v3_8) (Japanese), so a file with this name can no longer be imported.  
To import with sequence numbers, change the name to the format "<span class="bold">sequence number<span class="red">.</span>(custom table name).csv</span>" and import.</span>

### Method of operation

- Make a working folder in the following place on the server. A folder name that shows what this work is about, or a date, is recommended.  

~~~
(Project root directory)/storage/app/import/(folder name)
~~~

- Put the csv files or EXCEL files you made (several are possible) in that folder.

#### Folder layout example
![Working folder for the bulk import](ja/img/import/folder1.png)  

- Run the following command on the command line.
~~~
php artisan exment:import {folder name}
~~~

#### Command execution example
![Command execution example](ja/img/import/cmd1.png)  


### After the run is complete
- When the import is finished, delete the files placed in the "storage/app/import" folder as needed. (Note: they are not deleted automatically.)


<h2 id="import_file"><a href="#/data_cmd_import_export?id=import_file" data-id="import_file" class="anchor"><span>Data import - attachments of image and file columns</span></a></h2>
Attachments can be registered at once in columns whose custom column type is "Image" or "File". It is the part of the screen below.  

![File import](ja/img/import/file_import1.png)  

### Specifications
- When a new attachment is imported into a custom column that already has an attachment registered, the previous file is deleted.


### Preparing the import data

- Make a working folder in the following place on the server. A folder name that shows what this work is about, or a date, is recommended.  

~~~
(Project root directory)/storage/app/file-import/(folder name)
~~~

- Make a "files" folder in the folder you made.

- Put all the attachments you want to import in the "files" folder.

### Filling in the import information
- Make the file for import. Download the import file from the following links.  
    - [xlsx format](https://exment.net/downloads/template/file_import_ja.xlsx)
    - [csv format](https://exment.net/downloads/template/file_import_ja.csv)

- The character code of csv files that can be imported is <strong>UTF-8</strong>.  

- Use one of the following formats for the file name.  
Note: the files in the folder are imported in order of name. Therefore, when the order of import matters, such as when importing related data at the same time, use method 3 and add sequence numbers in the order of import.

    1. "(custom table name).csv"    Example: client.csv
    2. "(custom table name).(sequence number).csv"   Example: client.1.csv, client.002.csv
    3. "(sequence number).(custom table name).csv"   Example: 01.client.csv, 02.estimate.csv

- For xlsx, the file name is free. Use the following format for the sheet name.  

    1. "(custom table name)"    Example: client

- Write the values in the sheet. Follow "List of import items" below.

- Put the import file you made in "(Project root directory)/storage/app/file-import/(folder name)".

#### List of import items

![File import](ja/img/import/file_import2.png)  

##### id (ID)  
The ID of the custom data the attachment is imported into. A positive integer numbered automatically in sequence when the data is registered.  

##### column_name (column name)  
The alphanumeric name of the custom column the attachment is imported into. (Example: estimate_file, avatar)  

##### file_name (attachment file name)  
Write the name of the attachment placed in the "files" folder.

##### display_file_name (attachment file name (screen display))  
The file name used when the attachment is shown on the screen and when it is downloaded. Note: it may be left out. When it is left out, the value of file_name is the file name on download.

### Folder structure before import
The folder structure at import is as follows.

```
(Project root directory)/storage/app/file-import/(folder name)
    - Import file (example: client.csv)
    - files
        - File to import (example: attachment1.pdf)
        - File to import (example: attachment2.pdf)
        - File to import (example: attachment3.jpg)
```

### Method of operation

- Run the following command on the command line.
~~~
php artisan exment:file-import {folder name}
~~~

### After the run is complete
- When the run is finished, the attachments placed in the "storage/app/file-import" folder have been copied to a place the application can download them from.  
Delete the files placed in the "storage/app/file-import" folder as needed. (Note: they are not deleted automatically.)



<h2 id="import_document"><a href="#/data_cmd_import_export?id=import_document" data-id="import_document" class="anchor"><span>Data import - document (attachment) list</span></a></h2>
Files can be registered at once as the documents (attachments) of custom data. It is the part of the screen below.  

![File import](ja/img/import/document_import1.png)  

### Specifications
- Several attachments can be added to the same custom data. Even when attachments are already registered, the previous files are not deleted.


### Preparing the import data

- Make a working folder in the following place on the server. A folder name that shows what this work is about, or a date, is recommended.  

~~~
(Project root directory)/storage/app/document-import/(folder name)
~~~

- Make a "documents" folder in the folder you made.

- Put all the attachments you want to import in the "documents" folder.

### Filling in the import information
- Make the file for import. Download the import file from the following links.  
    - [xlsx format](https://exment.net/downloads/template/document_import_ja.xlsx)
    - [csv format](https://exment.net/downloads/template/document_import_ja.csv)

- The character code of csv files that can be imported is <strong>UTF-8</strong>.  

- Use one of the following formats for the file name.  
Note: the files in the folder are imported in order of name. Therefore, when the order of import matters, such as when importing related data at the same time, use method 3 and add sequence numbers in the order of import.

    1. "(custom table name).csv"    Example: client.csv
    2. "(custom table name).(sequence number).csv"   Example: client.1.csv, client.002.csv
    3. "(sequence number).(custom table name).csv"   Example: 01.client.csv, 02.estimate.csv

- For xlsx, the file name is free. Use the following format for the sheet name.  

    1. "(custom table name)"    Example: client

- Write the values in the sheet. Follow "List of import items" below.

- Put the import file you made in "(Project root directory)/storage/app/document-import/(folder name)".

#### List of import items

![File import](ja/img/import/document_import2.png)  

##### id (ID)  
The ID of the custom data the attachment is imported into. A positive integer numbered automatically in sequence when the data is registered.  

##### file_name (attachment file name)  
Write the name of the attachment placed in the "documents" folder.

##### display_file_name (attachment file name (screen display))  
The file name used when the attachment is shown on the screen and when it is downloaded. Note: it may be left out. When it is left out, the value of file_name is the file name on download.

### Folder structure before import
The folder structure at import is as follows.

```
(Project root directory)/storage/app/document-import/(folder name)
    - Import file (example: client.csv)
    - documents
        - File to import (example: attachment1.pdf)
        - File to import (example: attachment2.pdf)
        - File to import (example: attachment3.jpg)
```

### Method of operation

- Run the following command on the command line.
~~~
php artisan exment:document-import {folder name}
~~~

### After the run is complete
- When the run is finished, the attachments placed in the "storage/app/document-import" folder have been copied to a place the application can download them from.  
Delete the files placed in the "storage/app/document-import" folder as needed. (Note: they are not deleted automatically.)
