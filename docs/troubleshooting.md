# Frequently Asked Questions, Troubleshooting
This page collects frequently asked questions about installing, updating and operating Exment, and what to do when you are in trouble.  
When an error occurs, first check what the error is in the "logfile" below, and then see the item that applies.  
The contents will be updated from time to time.  

## logfile
When an error or the like occurs, its contents are written to the log file.  
The log file is in the following place, based on the Exment root project folder.  
/storage/logs/laravel.log


## Installation / Update

### Permission Denied occurs on files and folders
A permission error may occur during the easy installation or when writing to the log file.  
Also, the following error may be displayed in the system requirements check.  

![Install screen_settings](ja/img/troubleshooting/file_permission1.png)  

The user that runs the web server (apache, www-data, etc.) may not have enough permission.  
Add write permission for this user to the following folders of the Exment project folder.  

- storage
- bootstrap/cache

For the "[easy installation](/quickstart)", which installs from the web screen, the same user also needs write permission to the following, in addition to the above.  
※It is needed only during installation. To set the permissions more strictly, remove the write permission from the folders after the easy installation.

- .env
- app
- config
- public

### composer require or update batch ends prematurely
When installing on Linux, the following may be displayed when you run the composer require command or the update batch.  

```
# Pattern 1
Killed

# Pattern 2
mmap() failed: [12] Cannot allocate memory
PHP Fatal error:  Out of memory (allocated XXXXX) (tried to allocate XXXXX bytes) in phar:///usr/local/bin/composer/src/Composer/Console/Application.php on line 82

# Pattern 3
Fatal error: Allowed memory size of XXXXXXXX bytes exhausted
```

This is an error caused by insufficient memory.  
Doing one of the following may solve it.

#### swap creation
Create swap (an area that uses the disk in place of memory when memory runs short) with the following commands, and then install or update again.  
※Add "sudo" to the beginning of the commands, depending on your environment.

~~~
dd if=/dev/zero of=/swapfile bs=2M count=2048
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
~~~

#### Change memory limit
Please do the following.

- Change memory_limit in the php.ini file.

```
memory_limit=000M #Make the size larger than it is now, as appropriate
memory_limit=-1 #Or this setting. Memory may be used without limit, so set it at your own risk
```

- Set the environment variable of composer (if the problem happens during an update, add it to the batch)

```
COMPOSER_MEMORY_LIMIT=-1 composer update
```


### A composer error occurs during manual installation or update

The following error may occur during a manual installation or an update.

```
Installation failed, reverting ./composer.json to its original content.

  [RuntimeException]
  Could not load package XXX/XXX in http://repo.packagist.org: [UnexpectedValueException] Could not parse version constraint ~4.*: Invalid version string "~4.*"
```

In this case, raising the version of composer may solve it. Update composer to the latest version.  
**※The way to update seems to differ depending on the environment. Please try updating composer by one of (1) to (3) below.**


#### (1) Execute the following command

```
composer selfupdate
```

#### (2) Execute the following command

```
composer self-update
```

#### (3) If neither of the above can be updated, follow the steps below.

- ##### composer deleted
Delete the composer that is already installed.

```
# For Linux and Mac
which composer
# For Windows
where composer
#Result example : /usr/bin/composer
###Run the following command
rm /usr/bin/composer
```

- ##### composer reinstall
Reinstall composer by the steps below.
    - [Official site](https://getcomposer.org/download/)
    - [Explanation site for Windows](https://weblabo.oscasierra.net/php-composer-windows-install/)
    - [Explanation site for Linux](https://weblabo.oscasierra.net/php-composer-centos-install/)
    - [Explanation site for Mac](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)

### "LogicException Invalid key supplied" error when running composer update command  
When you run the composer update command, the following error may occur.

```
   LogicException	
	
  Invalid key supplied	
	
  at vendor/league/oauth2-server/src/CryptKey.php:67	
     63▕             if (!$this->isValidKey($this->keyContents, $this->passPhrase ?? '')) {	
     64▕                 throw new LogicException('Unable to read key from file ' . $keyPath);	
     65▕             }	
     66▕         } else {	
  ➜  67▕             throw new LogicException('Invalid key supplied');	
     68▕         }	
     69▕	
     70▕         if ($keyPermissionsCheck === true) {	
     71▕             // Verify the permissions of the key	
	
      +17 vendor frames	
	
  18  [internal]:0	
      Illuminate\Foundation\Application::Illuminate\Foundation\{closure}()	
      +5 vendor frames	
	
  24  artisan:35	
      Illuminate\Foundation\Console\Kernel::handle()	
```

#### In this case, please disable the use of the API and then create a Laravel key with the following command.

```
# Disable the use of the API.
UPDATE `systems` SET `system_value` = '0' WHERE `systems`.`system_name` = 'api_available';

# Create the Laravel keys
php artisan passport:keys	

# Enable the use of the API.
UPDATE `systems` SET `system_value` = '1' WHERE `systems`.`system_name` = 'api_available';
```

### "require ext-gd" , "require ext-sodium" , "require ext-zip" errors occur when running update batches or composer require commands
When you run the update batch or the composer require command, the following may be displayed.
```
  Problem 1
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-gd * -> it is missing from your system. Install or enable PHP's gd extension.
```
```
  Problem 1
    - lcobucci/jwt[5.0.0, ..., 5.3.0] require ext-sodium * -> it is missing from your system. Install or enable PHP's sodium extension.
```
```
  Problem 1
    - exceedone/exment[v5.0.0, ..., v5.0.11] require phpoffice/phpspreadsheet ^1.23.0 -> satisfiable by phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0].
    - phpoffice/phpspreadsheet[1.23.0, ..., 1.29.0] require ext-zip * -> it is missing from your system. Install or enable PHP's zip extension.
    - Root composer.json requires exceedone/exment ^5.0 -> satisfiable by exceedone/exment[v5.0.0, ..., v5.0.11].
```
In this case, enable the PHP extension that is displayed.
#### For Linux
~~~
# Ubuntu server
sudo apt-get install php8.2-gd php8.2-zip

# Centos server
sudo yum install gd gd-devel php-gd php-pecl-zip.x86_64
~~~

#### For Mac/Windows

##### (1) Get php.ini file path

~~~
# Run the following command. The path of the php.ini file is displayed in the "Loaded Configuration File" line.

php --ini
~~~

##### (2) Modify php.ini file

~~~
# Uncomment the line below
extension=gd

# Uncomment the line below
extension=sodium

# Uncomment the line below
extension=zip
~~~



### After the initial installation, when accessing the management screen, a "SQLSTATE [HY000] [202] Permission denied" error occurs.
To access MySQL from Apache, a setting of SELinux (a security feature of Linux) may be required.  
When this error occurs, run the following command.

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


### When updating, an error occurs with "Migrating: 2019_08_19_000000_create_failed_jobs_table"
While the update is changing the database, the following message may be output.  
~~~
Migrating: 2019_08_19_000000_create_failed_jobs_table  
SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'failed_jobs' already exists。  
~~~

In this case, do the following in order.

1. Delete the "2019_08_19_000000_create_failed_jobs_table" file in "installation folder\database\migrations".
2. Run the update again.


### "Killed" is displayed when executing a command such as "composer require" on the rental server.
This happens sometimes when memory is under load (it does not always happen).  
When it is displayed, run composer with "nice -n 20" at the beginning of the command. The command then runs with a lower priority.

~~~
nice -n 20 composer .....
~~~

※"Killed" may be displayed again even when you run the command this way. Please note.


### To pass the composer path
These are the steps to pass the composer path (to set where composer is).  

#### Add setting value
- Set the path to composer in "Composer path" of [this procedure](/config).

```
# Example: run the following command
which composer
#Output example: /usr/local/bin/composer

# Write the following value in .env
EXMENT_COMPOSER_PATH=/usr/local/bin/composer
```

- With this, the path to composer is set.


### Canceling maintenance mode
While a database restore is running, the system is in maintenance mode.  
When the restore ends, maintenance mode is canceled automatically. If it was not canceled for some reason, cancel it by hand with the following step.

- Run the following command in the root folder of the project.  

```
php artisan up
```



## Backup / Restore

### Backup / restore fails
A message like the following may be displayed on the backup screen or by the command.

![Backup screen](img/backup/backup_error.png)  

Or the following may be displayed on the installation screen.
![Backup screen](ja/img/backup/backup_error2.png)  

When this error is displayed, the settings needed for backup and restore may not have been made.  
Please check the two points below.

#### mysql-client is not installed on your web server and is not in your path
For backup and restore, Exment runs the following commands on the web server.  

- mysql command
- mysqldump command  

**If the commands are not installed**, install the mysql command and the mysqldump command.  
How to install them depends on your environment.  
Example: [Amazon Linux 2](http://tech-wiki.pomme-verte.net/?p=793)  

**If the path is not set** (the user that runs the web server cannot find where the mysql command and the mysqldump command are), make the commands run by their full path in the following way.  
※For details on changing the settings, see [here](/config).  

- Open the env file.  
- Add the following.  

```
EXMENT_MYSQL_BIN_DIR=(path to the folder where the "mysql" executable is)
#Example
EXMENT_MYSQL_BIN_DIR=/usr/bin
```
※If the path is enclosed in double quotes, like `EXMENT_MYSQL_BIN_DIR="C:\MySQL\bin"`, it may not be recognized correctly in some environments. We recommend writing it as it is, like `EXMENT_MYSQL_BIN_DIR=C:\MySQL\bin`.

#### Add "safe_mode = Off" in php.ini
※safe_mode is a setting that was removed in PHP 5.4. The current Exment (PHP 8.2 or higher) does not need this step. Check it only if you use an old environment.  

To run the mysql command and the mysqldump command from the server, safe_mode has to be Off.  
Please do the following.

- Open the php.ini file.
- Add the following.

```
safe_mode=Off
```

## Others
### Sending a large number of input items fails
At present, some setting screens may not work correctly when one screen has a very large number of input items.

- Cause: it occurs when the actual POST values exceed the PHP setting "max_input_vars" (the maximum number of values that can be POSTed at one time).
- What to do: [change the PHP settings](/additional_php_ini) and change the parameter value.
  
At present, we have confirmed that it happens easily in the following functions.

- In the workflow usage setting, when there are many tables and workflows
- On the custom form setting screen, when the number of column items to register is very large
- On the custom data input screen, when the number of items is very large

### Image output fails in document output using Excel as a template
When you output a document with the Exment plugin function (document output or export) using an Excel template that contains an image, the image may be missing from the created file.  
This can happen depending on the version of the library "PhpSpreadSheet" in use. Please do the following.  

※The steps below are for Exment v4.x or earlier (PHP7.X). With Exment v7.0.0, PhpSpreadSheet 1.29 or higher is installed automatically, so the steps below are not needed.

#### If the PHP version is 7.3 or 7.4
With 1.22.0, the latest version of PhpSpreadSheet at present (2022/02/25), this problem no longer occurs.  
Change PhpSpreadSheet to 1.22.0 by the following step.  

```
composer require phpoffice/phpspreadsheet=~1.22.0
```

#### If the PHP version is 7.2
PhpSpreadSheet 1.22.0 does not support PHP 7.2.  
Therefore, please update PHP to version 7.3 or higher.
