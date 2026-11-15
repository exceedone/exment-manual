# Installation procedure (manual installation)
These are the steps required to start Exment.  
※  This is a manual installation method.  
※ This page describes the installation procedure for Exment v7.0.0 or later. In Exment v6.x or earlier (Laravel 10.X, admin library laravel-admin), the Laravel version and the packages to install differ. For the differences between v6.x and v7.0.0, see [Update procedure v7.0.0](/update/v7_0_0).

## important point
- **If you do not have a web server, [set up the server](/server) first.**  
(If you do not know if you have built a server, please check it once)
- If an error occurs during installation, please refer to [Troubleshooting](/troubleshooting).
- ※We are very sorry, but we are not accepting individual inquiries regarding the installation procedure or server construction. If you would like individual support, please request paid support.

## Server settings
Exment requires PHP 8.2 or higher (`^8.2.0`). Also, MySQL 8.0 or higher, MariaDB 10.11 or higher, or SQL Server 13.0.0 or higher is required.  
XAMPP is recommended when building an environment with PHP, Apache, and MySQL as a development environment from the beginning.  
Please refer to [here](/install_xampp) for server settings.  
※ If you already have an environment, this setting is not required.

## composer introduction
Exment requires the introduction of composer. Please refer here for the introduction method.  
※ Those who have already introduced are unnecessary.
- [Official site](https://getcomposer.org/download/)
- [Windows version explanation site](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [Linux version explanation site](https://weblabo.oscasierra.net/php-composer-centos-install/)
- [Commentary site for Mac](https://weblabo.oscasierra.net/php-composer-macos-homebrew-install/)

## Laravel installation (project creation)
- At the command line, execute the following command:  
※ The folder of the created project is called "root directory" in this manual.  
※ Exment is currently only available for Laravel version 12.X. Please do not install on any other version.  

~~~
composer create-project "laravel/laravel=12.*" (Project name)
cd (Project name)
~~~

## Create database
- Create a database for Exment with your database engine (MySQL, MariaDB or SQL Server).


## .env change

- Open ".env" and add or change the following contents.  
 **※Note that the value of DB_CONNECTION differs depending on whether your database is MySQL, MariaDB or SQL Server.**  
 - SESSION_DRIVER, CACHE_STORE, QUEUE_CONNECTION: In Laravel 12, the default value of session, cache and queue is "database". With these defaults, opening the screen before installation causes an error, and notifications such as e-mails stay in the queue and are not sent. To make Exment work in the same way as v6.x or earlier (Laravel 10), change them to the values below. To use the queue, see [Delayed execution of notification processing](/additional_queue).
 - <span class="red bold">Change .env before "Exment installation" below.</span> In the default settings of Laravel 12, the database is "sqlite", so installing Exment before changing it shows an error.

~~~
# Required items below --------------------
# basic setting
APP_URL=http://XXXX.com # URL to access the site. "admin" not required

# Change database settings  
# For MySQL, the following settings (default)
DB_CONNECTION=mysql
# In case of MariaDB, modify to the following settings
DB_CONNECTION=mariadb
# In case of SQL Server, modify to the following settings
DB_CONNECTION=sqlsrv

DB_HOST=127.0.0.1 #Database host name
DB_PORT=3306 #Database port number
DB_DATABASE=homestead #Database name for Exment
DB_USERNAME=homestead #Database user name for Exment
DB_PASSWORD=secret #Database password for Exment

# Language and time zone settings (the example is Japanese and Japan time). Set by copy and paste
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja

# Session, cache and queue settings. Change them from the Laravel 12 default (database)
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync


# Optional items below --------------------

# add for https communication
ADMIN_HTTPS=true

# Cost (rounds) of bcrypt password hashing. Optional: the default is 12.
# OWASP recommends 10 or more. Set it only when you want to change the default.
# Passwords hashed with another cost are re-hashed at the user's next login.
# https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
BCRYPT_ROUNDS=12
~~~


## Exment installation
- In the root directory, execute the following commands.  
※ The admin library "exceedone/exment-admin-core" is installed automatically as a dependency of Exment. It does not need to be installed separately.  

~~~
composer config --no-plugins allow-plugins.kylekatarnls/update-helper true
composer require exceedone/exment=^7.0 -W

# If you want to specify the version of Exment, run the following instead. Example: v7.0.0
composer require exceedone/exment=7.0.0 -W
~~~


## Command execution
- Execute the following command.

~~~
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
php artisan passport:keys
php artisan exment:install
~~~

## Setting completed
After the installation is complete, continue with the [initial settings](/first_setting.md).

## Other initial settings
With the above operations, you can start Exment, but you may need to configure additional settings to use some functions.  
Please check the link below.  
- [Additional settings](/quickstart_more)
