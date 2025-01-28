# Update procedure v6.0.0
In Exment v6.0.0, the supported version of PHP will change.   
Before v6.0.0, we used PHP8.0, but as the security support period for PHP8.0 ended in November 2023, we will change to PHP8.2 or higher.   
Additionally, in order to minimize future PHP/Laravel version changes as much as possible, we have decided to change the Laravel version to Laravel 10, which is currently the latest version.   
MySQL has also been changed to MySQL 8.0, which is the latest version at this stage.

## How to upgrade MySQL version MySQL8.0

The previous MySQL version was 5.7 at most, but from now on it will be MySQL 8.0. As a result, all users will need to update to MySQL 8.0.   
For the update procedure, please check [here](/install_mysql).

## MariaDB version upgrade method MariaDB 10.4
If you are using MariaDB 10.4 or lower, you need to update to MariaDB 10.4.
### Update work for XAMPP environment
- In preparation for work, stop Apache and MySQL (MariaDB) and exit the XAMPP control panel.
- Rename mysql folder. (Example: Change the default name C:\xampp\mysql to C:\xampp\mysql-old)
- Download the new MariaDB in ZIP format.

   1. Access [MariaDB Download](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.4.33&os=windows&cpu=x86_64&pkg=zip)
   2. Download the file according to the OS and MariaDB version you want to use.   
      > Please select the zip file instead of the MSI.
   3. Unzip the ZIP file, change the unzipped folder name to mysql, and move to the XAMPP folder.
- Copy mysql-old\data to the mysql folder.
- Copy mysql-old\bin\my.ini to the mysql\bin folder.
- Start the XAMPP control panel and start "Apache" and "MySQL (MariaDB).".

## How to update PHP version PHP8.2

Previously, the maximum PHP version was 8.0, but from now on it will be PHP 8.2 or higher. As a result, all users will need to update to PHP 8.2 or higher.   
Therefore, we have included the steps to change the PHP version.

For some environment configurations, the following page describes how to update PHP.   
Please follow these steps to update your PHP version.   
※As much as possible, back up Exment and the server environment before updating PHP.   
※If it does not exist in the link below, we apologize for the inconvenience, but please do your own research and update your PHP version.

- [XAMPP construction (development/verification environment) Windows](/install_xampp)  

- [Build on Linux](/install_linux)  

- [Build on AWS(Amazon Linux2)](/install_aws_single)  

- [Build on AWS(Ubuntu)](/install_aws_ubuntu_single)  

- [Build on AWS - Redundancy](/install_aws)  

- [Build with Docker  ](/install_docker)  

- [Environment construction using Windows Server](/install_iis)  

- [XAMPP construction (development/verification environment) Mac](/install_xampp_mac)  

- [Rental server construction](/install_rental)  

## Laravel10 update preparation
- Make sure composer version is 2.   
For confirmation procedures, please check [here](/update_composer).

- Please back up your Exment.   
For information on how to perform a backup, please check [here](/backup).

### Composer.json modification
- Open composer.json directly under the folder.

- Change the following description in "require".

```
#### PHP fix
- Revised
        "php": ">=8.1",

#### Laravel framework fix
- Revised
        "laravel/framework": "^10.34.0",

#### Fixed Exment
- Revised
        "exceedone/exment": "^6.0.0",

#### Other related library version changes
## It is necessary to partially change the versions of related libraries listed in the Exment manual.
## Please change the following if any. If not, no modification is necessary.
- Revised
        "laravel/passport": "^11.0",
        "laravel/sanctum": "^3.2",
        "laravel/browser-kit-testing": "^7.0",
        "laravel/tinker": "^2.8",
        "lcobucci/jwt": "^5.0",
        "league/flysystem-aws-s3-v3": "^3.16",
        "league/flysystem-azure-blob-storage": "^3.16",
        "league/flysystem-sftp": "^3.15",

## The following is the content that was also implemented in the update to v4.4.0 (update to Laravel 8). If you update from v4.4.0 or lower to v6.xx, please correct the following.
- Revised
        "exceedone/no-captcha": "^1.0.1",
        "dms/phpunit-arraysubset-asserts": "^0.5.0",
        "exment-oauth/microsoft-graph": "~2.0",
        "symfony/css-selector": "^6.3",
```

- Change the following description in "require-dev".

```
#### Fixed error report handler
- Revised
        "nunomaduro/collision": "^7.0",

#### PHP unit test fix
- Revised
        "phpunit/phpunit": "^10.1",

#### Update packages
- Revised
        "laravel/pint": "^1.0",
        "laravel/sail": "^1.18",
        "mockery/mockery": "^1.4.4",
        "spatie/laravel-ignition": "^2.0"

## Please delete any of the following entries. (It is no longer needed in Laravel 10. Please delete it regardless of the version)
- delete
        "facade/ignition": "XXXX",

```

### Command execution 1

- Run the following command.

```
# Update Laravel framework, Exment, and related libraries
composer update
```

※If the sodium extension is not implemented in php on the Xserver side, execute the following command.
```
composer update --ignore-platform-req=ext-sodium
```

### TrustProxies.php modification

- Open the file "app/Http/Middleware/TrustProxies.php" and modify it as below.   
※You may rewrite all files.

``` php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array|string
     */
    protected $proxies;

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO |
        Request::HEADER_X_FORWARDED_AWS_ELB;
}
```

### Handler.php modification

- Open the file "app/Exceptions/Handler.php" and modify it as below.   
※You may rewrite all files.

``` php
<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
```
### Migration Creation

- Delete password_reset_tokens table  
Open MySQL and execute the following command:

``` sql 
DROP TABLE IF EXISTS password_reset_tokens;
```

- Create Migration  
Execute the following command in the project's root directory to create the migration file:

```
php artisan make:migration create_password_reset_tokens_table
```

- Edit Migration File  
Open the generated migration file and edit it as follows.  
The file is typically located in the database/migrations directory.

``` php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('password_reset_tokens');
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password_reset_tokens');
    }
};

``` 
- Run Migration  
After saving the migration file, run the migration in the project's root directory:

```
php artisan migrate
```
### Command execution 2

- Run the following command.

```
# Reflect Exment update contents
php artisan exment:update

# Clear view cache
php artisan view:clear
```

### What to do if you have changed the file save destination
If you have changed [the file save location](/additional_file_saveplace), additional work may be required.   
[Click here](#what-to-do-if-you-have-changed-the-file-save-location---details) Please check the detailed procedure.

## Update completed
The update is now complete.   


## What to do if you have changed the file save location - details
The required steps differ depending on the settings you have made up to that point.   
Please check each setting method and perform the work.

#### If the file is saved to FTP
Please add the function using the command below.

```
composer require league/flysystem-ftp ~3.0
```

#### If you were using your own file driver
If you are using a proprietary file driver, such as Dropbox, you will need to modify it.   
[Click here](/additional_file_saveplace) [For advanced users/developers] Please create your own file driver again according to the contents described in Adding your own driver.   

## Other Errors
### "Illuminate\Database\QueryException" Error

- You may encounter errors such as "Table 'password_reset_tokens' already exists" / "Table 'failed_jobs' already exists" / "Table 'personal_access_tokens' already exists".

```
  Illuminate\Database\QueryException

  SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'password_reset_tokens' already exists 
```
```
  Illuminate\Database\QueryException

  SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'failed_jobs' already exists 
```
```
  Illuminate\Database\QueryException

  SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'personal_access_tokens' already exists 
```
- In this case, execute the following commands:

``` bash
sudo -u apache sed -i '14,18s/^/\/\//' database/migrations/2014_10_12_100000_create_password_reset_tokens_table.php
sudo -u apache sed -i '14,22s/^/\/\//' database/migrations/2019_08_19_000000_create_failed_jobs_table.php
sudo -u apache sed -i '14,23s/^/\/\//' database/migrations/2019_12_14_000001_create_personal_access_tokens_table.php
sudo -u apache php artisan migrate
sudo -u apache sed -i '14,18s/^\/\///' database/migrations/2014_10_12_100000_create_password_reset_tokens_table.php
sudo -u apache sed -i '14,22s/^\/\///' database/migrations/2019_08_19_000000_create_failed_jobs_table.php
sudo -u apache sed -i '14,23s/^\/\///' database/migrations/2019_12_14_000001_create_personal_access_tokens_table.php
```