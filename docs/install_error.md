# If an error occurs during installation
An error may occur during installation and at similar times, depending on your server environment and version.  
This page gives what to do for each error.  

## If an error occurs during the command "php artisan exment:install"
When the command "php artisan exment:install" is executed, the following error may occur.

~~~
 Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access
 violation: 1071 Specified key was too long; max key length is 767 bytes (SQL: alter table `users` add unique `users_email_unique`(`email`))
~~~

- Cause: it occurs when the MySQL version is lower than 5.7.7.
- What to do: update MySQL to version 8.0 or higher.

## SQLSTATE [HY000] [202] Permission denied" error occurs when accessing the management screen after initial installation
To access MySQL from Apache, a setting of SELinux (a security feature of Linux) may be required.  
When this error occurs, run the following command.

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


## On the rental server, when executing commands such as "composer require", "Killed" is displayed
This happens sometimes when memory is under load (it does not always happen).  
When it is displayed, run composer with "nice -n 20" at the beginning of the command. The command then runs with a lower priority.

~~~
nice -n 20 composer .....
~~~

※"Killed" may be displayed again even when you run the command this way. Please note.

