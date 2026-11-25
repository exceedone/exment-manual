# Installation procedure (manual installation)
How to install Exment manually, one command at a time.  
※This page describes the installation procedure for Exment v7.0.0 or later. In Exment v6.x or earlier (Laravel10.X, admin library laravel-admin), the Laravel version and the packages to install differ. For the differences between v6.x and v7.0.0, see [Update procedure v7.0.0](/update/v7_0_0).  

## Flow of the installation
1. **Prepare the server** (web server and database)
2. **Create a Laravel project**
3. **Change `.env`** (database, language, time zone and so on)
4. **Install Exment**
5. **Run the commands**
6. **Do the initial settings**

<span class="red bold">Be sure to change `.env` (3) before step 4.</span>

## important point
- If an error occurs during installation, please refer to [Troubleshooting](/troubleshooting).
- ※We are very sorry, but at present we do not accept individual inquiries about the installation procedure or server construction. If you would like individual support, please request paid support.

## Server settings
If you have not built a server yet, prepare a web server and a database server.  
For how to build them, see [here](/server).


## Exment app settings
When the server is ready, set up the Exment app.

### Laravel installation (project creation)
- On the command line, run the following commands.  
※The folder of the created project is called the "root directory" in this manual.  
※Exment currently supports Laravel version 12.X only. Please do not install on any other version.  

~~~
composer create-project "laravel/laravel=12.*" (Project name)
cd (Project name)
~~~


### .env change

Open ".env" and add or change the contents below.

- <span class="red bold">Change .env before "Exment installation" below.</span> In the default settings of Laravel12, the database is "sqlite". If you install Exment before the change, an error is shown.
- <span class="red bold">In particular, check the following values.</span>

| Item | Description |
|---|---|
| DB_CONNECTION | The value differs depending on whether your database is MySQL, MariaDB or SQL Server |
| APP_TIMEZONE, APP_LOCALE | The language and the time zone. Set the values before the installation |
| SESSION_DRIVER, CACHE_STORE, QUEUE_CONNECTION | The session, cache and queue settings. Change them to the values below (see right below for the reason) |

- In Laravel12, the default value of the session, the cache and the queue is "database". With these defaults, opening the screen before the installation causes an error. Also, notifications such as sending e-mails stay in the queue and are not executed.
- To make it work in the same way as v6.x or earlier (Laravel10), change them to the values below. To use the queue, see [Delayed execution of notification processing](/additional_queue).

~~~
# Required items below --------------------
# Basic settings
APP_URL=http://XXXX.com # URL to access the site. "admin" is not needed

# Change the database settings
# For MySQL, the following setting (the default)
DB_CONNECTION=mysql
# For MariaDB, change to the following setting
DB_CONNECTION=mariadb
# For SQL Server, change to the following setting
DB_CONNECTION=sqlsrv

DB_HOST=127.0.0.1 #Database host name
DB_PORT=3306 #Database port number
DB_DATABASE=homestead #Database name for Exment
DB_USERNAME=homestead #Database user name for Exment
DB_PASSWORD=secret #Database password for Exment

# Language and time zone settings (the example is Japanese and Japan time). Set by copy and paste
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja

# Session, cache and queue settings. Change them from the Laravel12 default (database)
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync


# Optional items below --------------------

# Add for https communication
ADMIN_HTTPS=true

# Cost (rounds) of bcrypt password hashing. Optional: the default is 12.
# OWASP recommends 10 or more. Set it only when you want to change the default.
# Passwords hashed with another cost are re-hashed automatically at the user's next login.
# https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
BCRYPT_ROUNDS=12
~~~


### Exment installation
- In the root directory, run the following commands.  
※The admin library "exceedone/exment-admin-core" is installed automatically as a dependency of Exment. You do not need to install it separately.

~~~
composer config --no-plugins allow-plugins.kylekatarnls/update-helper true
composer require exceedone/exment=^7.0 -W

# If you want to specify the version of Exment, run the following instead. Example: v7.0.0
composer require exceedone/exment=7.0.0 -W
~~~


### Command execution
- Run the following commands.

~~~
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
php artisan passport:keys
php artisan exment:install
~~~

## Setting completed
After the installation is finished, continue with the [initial settings](/first_setting).  


## Other initial settings
With the work so far, you can start using Exment. However, some functions may need additional settings.  
Please check the link below.  
- [Additional settings](/quickstart_more)



[← Return to Installation - Overview](/quickstart)
