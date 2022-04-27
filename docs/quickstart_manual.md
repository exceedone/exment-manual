# Installation procedure (manual installation)
These are the steps required to start Exment.  
※  This is a manual installation method.

## important point
- **If you do not have a web server, [set up the server](/server) first.**  
(If you do not know if you have built a server, please check it once)
- If an error occurs during installation, see If [an error occurs during installation](/install_error).
- For other inquiries, please feel free to [contact us](https://exment.net/inquiry) for free.

## Server settings
Exment requires PHP7.3.0 or higher. Also, MySQL 5.7.8 or more and less than 8.0.0 or MariaDB 10.2.7 or more is required.  
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
※ Exment is currently only available for version 8.X. Please do not install on any other version.  

~~~
composer create-project "laravel/laravel=8.*" (Project name)
cd (Project name)
~~~

## Create database
- Create a database for Exment with MySQL.


## .env change

- Open ".env" and add or change the following contents.  
 **※Note that the value of DB_CONNECTION differs depending on whether your database is MySQL or MariaDB.**  

~~~
# Required items below --------------------
# basic setting
APP_URL=http://XXXX.com # URL to access the site. "admin" not required

# Change database settings  
# For MySQL, the following settings (default)  
DB_CONNECTION = mysql  
# In case of MariaDB, modify to the following settings  
DB_CONNECTION = mariadb  

DB_HOST=127.0.0.1 #MySQL host name
DB_PORT=3306 #MySQL port number
DB_DATABASE=homestead #MySQL database name for Exment
DB_USERNAME=homestead #MySQL database user name for Exment
DB_PASSWORD=secret # 1 password of MySQL Exment database

# Japanese and Japanese time settings from v1.2.0. Set by copy and paste
APP_TIMEZONE=Asia/Tokyo
APP_LOCALE=ja


# Optional items below --------------------

# Change the settings for sending mail. Set when sending password reset emails, etc.
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io # Host name for mail server
MAIL_PORT=2525 #Port number for mail server
MAIL_USERNAME=null  # mail server user name
MAIL_PASSWORD=null # mail server password
MAIL_ENCRYPTION=null # Enter "ssl" when using ssl

# add for https communication
ADMIN_HTTPS=true

~~~

## Command execution
- Execute the following command.  

~~~
composer require exceedone/exment
php artisan vendor:publish --provider="Exceedone\Exment\ExmentServiceProvider"
~~~

## (Recommended) Add error page

- Open "app / Exceptions / Handler.php" and add the following to the "render" function.  
※ Depending on the content of the error, the error page controlled here may not be displayed, and a Laravel error may be displayed.  

~~~ php
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        // addition
        return \Exment::error($request, $exception, function($request, $exception){
            return parent::render($request, $exception);
        });
    }
~~~


## Command execution
- Execute the following command.

~~~
php artisan passport:keys
php artisan exment:install
~~~

## Setting completed
After the installation is complete, continue with the [initial settings](/first_setting.md).

## Other initial settings
With the above operations, you can start Exment, but you may need to configure additional settings to use some functions.  
Please check the link below.  
- [Change / delete "admin" included in URL](/quickstart_more.md#Change/delete-"admin"-included-in-URL)
- [Task schedule function](/quickstart_more.md#Task-schedule-function)
- [Server external communication off](/quickstart_more.md#Server-external=communication-off)
- [Change file upload limit size](/quickstart_more.md#Change-file-upload-limit-size)


## (old) config change
※ These settings are no longer required from v1.2.0.  
However, I keep a record of the settings in the past version. (Will be removed in the future)  

- Open "config/admin.php" and modify the key "auth.providers.admin.driver" as follows.

~~~ php
    'auth' => [
        'providers' => [
            'admin' => [
                // Exment Edit------s
                // 'driver' => 'eloquent',
                //'model'  => Encore\Admin\Auth\Database\Administrator::class,
                'driver' => 'exment-auth',
                // Exment Edit------e
            ],
        ],  
    ],
~~~

- If you want to change the language and time zone, open "config/app.php" and modify the following line.

~~~ php

    // 'timezone' => 'UTC',
    'timezone' => 'Asia/Tokyo',

    //'locale' => 'en',
     'locale' => 'ja',

~~~
