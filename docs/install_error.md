# If an error occurs during installation
An error may occur during installation, depending on your server environment and version.  
On this page, the response methods are summarized for each event.  

## If an error occurs during the command "php artisan exment: install"
When the command "php artisan exment: install" is executed, the following error may occur.  

~~~
 Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access
 violation: 1071 Specified key was too long; max key length is 767 bytes (SQL: a lter table `users` add unique `users_email_unique`(`email`))
~~~

Occurs when the MySQL version is less than 5.7.7.  
Update the MySQL version to 5.7.8 or higher and less than 8.0.0.  

## SQLSTATE [HY000] [202] Permission denied" error occurs when accessing the management screen after initial installation
To access MySQL from Apache, SELinux settings may be required.  

If the above phenomenon occurs, execute the command as follows.  

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


## On the rental server, when executing commands such as "composer require", "Killed" is displayed
This is an occasional phenomenon when memory is stressed.  
※Does not always occur  

If the above phenomenon occurs, execute the command as follows.  

~~~
nice -n 20 composer .....
~~~

Run composer with "nice -n 20" at the beginning of the command.  
This will execute the command with lower priority.  
※"Killed" may be displayed again even if the command is executed as described above. Please note.  