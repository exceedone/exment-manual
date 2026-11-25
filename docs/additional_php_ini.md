# File upload upper limit size / memory size change

These are the steps to change the PHP setting values. You can change these four.

| Setting | What changes |
| ---- | ---- |
| Change file upload limit size | The size of the files that can be uploaded from the screen changes |
| Change memory amount | The amount of memory that Exment (PHP) uses changes |
| Change the timeout time | Long processes are less likely to stop halfway |
| Maximum number of items in one POST | Screens with many items can be saved |

For how to change them, see "[How to set](/additional_php_ini?id=how-to-set)" below.


#### Change file upload limit size
Exment has a function to upload files from the screen.  
The size of a file that can be uploaded has an upper limit on each server.  
(The first limit depends on the server you installed on)  

#### Change memory amount
Change the amount of memory used by Exment (PHP).  
With more memory, processing gets faster and what can be run at one time changes. But if it is too large, it can affect how the server runs.

#### Change the timeout time
Change the timeout time of PHP (the time until a process is cut off).  
With a longer time, functions that take time, such as import, export and backup, run more reliably.  
Note: For the functions that take time, the Exment code already extends the timeout time. But in some environments this does not work. Make this setting when timeouts happen often.

#### Maximum number of items in one POST
This decides the upper limit of the number of items that can be sent in one POST (from a screen).  
On a screen where you enter data, if the number of items is over the limit, it may not work correctly.  
Note: Mainly on the following screens, the limit can be too low and cause an error.  

- In the workflow use setting, when there are many tables and workflows
- On the custom form setting screen, when there are very many column items to register
- On the custom data entry screen, when there are very many items




## How to set
Set it by either way 1 or way 2.


### Way 1: edit php.ini

1. Open the "php.ini" file in the folder where PHP is installed. * The place of the php.ini file depends on the environment.

2. Change the following values in the php.ini file. * In many cases a number is already set, so rewrite the number.

~~~
### Change file upload limit size
#Maximum size allowed for POST data
post_max_size=20M
#Maximum size allowed for one file upload
upload_max_filesize=20M


### Change memory amount
# To change to 512M
memory_limit=512M
# To change to unlimited
memory_limit=-1


### Change the timeout time
#To change to 240 seconds
max_execution_time=240
#To change to unlimited
max_execution_time=0


### Change the maximum number of items in one POST
#To change to 3000
max_input_vars=3000
~~~

3. Restart the server.


### Way 2: edit the .htaccess file
1. Open the "public/.htaccess" file in the folder where Exment is installed.

2. Add the following values.

~~~
### Change file upload limit size
#Maximum size allowed for POST data
php_value post_max_size 20M
#Maximum size allowed for one file upload
php_value upload_max_filesize 20M


### Change memory amount
# To change to 512M
php_value memory_limit 512M
# To change to unlimited
php_value memory_limit -1


### Change the timeout time
#To change to 240 seconds
php_value max_execution_time 240
#To change to unlimited
php_value max_execution_time 0


### Change the maximum number of items in one POST
#To change to 3000
php_value max_input_vars 3000
~~~

3. Restart the server.

[←Back to list of additional settings](/quickstart_more)
