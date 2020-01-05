# File upload upper limit size / memory size change

## Change file upload limit size
Exment has a function to upload files from the screen.  
The maximum file size that can be uploaded depends on the server.  
(The default limit depends on the server you have installed)  

To change the file size upper limit, perform one of the following procedures.  

### Setting procedure 1 (recommended) Modify .htaccess file
- Open the "public / .htaccess" file in the folder where Exment is installed.

- Add the following values:

~~~
#Maximum size allowed for POST data
php_value post_max_size 20M
 
#Maximum size allowed for one file upload
php_value upload_max_filesize 20M
~~~

- This will change the file upload size limit.

### Setting procedure 2 Modify php.ini
- Please execute this when the upper limit is not changed by modifying the .htaccess file. For advanced users.

- Open the "php.ini" file in the folder where you installed PHP.

- Modify the following values from the php.ini file.  
※ In many cases, a numerical value has already been set.  

~~~
#Maximum size allowed for POST data
post_max_size=20M
 
#Maximum size allowed for one file upload
upload_max_filesize=20M
~~~

- Restart the server.

- This will change the file upload size limit.


## Change memory amount
Change the amount of memory used by Exment (PHP).  
The larger the amount of memory, the faster the processing and the content that can be executed at a time fluctuate.  

To change that memory limit, do one of the following:  

### Setting procedure 1 (recommended) Modify .htaccess file
- Open the "public / .htaccess" file in the folder where Exment is installed.

- Add the following values:

~~~
#Maximum memory size
php_value memory_limit 256M
~~~

- This will change the memory size.

### Setting procedure 2 Modify php.ini
- Please execute this when the upper limit is not changed by modifying the .htaccess file. For advanced users.  

- Open the "php.ini" file in the folder where you installed PHP.

- Modify the following values from the php.ini file.  
※ In many cases, a numerical value has already been set.

~~~
#Maximum memory size
memory_limit 256M
~~~

- Restart the server.

- This changes the memory size limit.

[←Back to list of additional settings](/quickstart_more)