# Update procedure v5.0.0
In Exment v5.0.0, the supported version of PHP will be changed.  
In v5.0.0 or less, PHP7.X was used, but since the security support deadline of PHP7.4 is approaching 2022/11, it will be changed to PHP8.0 or higher.  
In addition, in order to minimize future PHP / Laravel version changes as much as possible, the Laravel version will also be changed to the latest version, Laravel 9 at this stage.


## How to update PHP8.X

Previously, the PHP version was 7.4 at the highest, but now it will be PHP 8.0 or higher. As a result, all users will need to update to PHP 8.0 or higher.  
Therefore, the procedure for changing the PHP version is described.  
* Currently, PHP8.1 is recommended because there are problems such as unnecessary warnings being displayed in the log and PHP8.1 cannot be selected in some environments.


## Laravl9 update preparation
- Make sure the composer version is 2.    
Please check [here](/update_composer) for the confirmation procedure.

- Make a backup of Exment.  
Please check [here](/backup) for the backup method.

### Modify composer.json
- Open composer.json directly under the folder.

- Change the following description in "require".

```
#### Modify PHP
- After
        "php": "^8.0",

#### Modify Laravel framework
- After
        "laravel/framework": "^9.0",

#### Modify Exment
- After
        "exceedone/exment": "^5.0.0",

#### Other related library version changes
## It is necessary to partially change the version of the related library described in the Exment manual.
## If there is the following description, please change it. If not, no modification is required.
- After
        "laravel/browser-kit-testing": "~6.3",
        "laravel/tinker": "^2.7",
        "lcobucci/jwt": "^4.0",
        "league/flysystem-aws-s3-v3": "~3.0",
        "league/flysystem-azure-blob-storage": "~3.0",
        "league/flysystem-sftp": "~3.0",
## The following is the content that was also implemented in the update to v4.4.0 (update to Laravel 8). If you have updated from less than v4.4.0 to v5.0.0, please modify the following.
- After
        "arcanedev/no-captcha": "^12.0",
        "dms/phpunit-arraysubset-asserts": "~0.3",
        "exment-oauth/microsoft-graph": "~2.0",
        "symfony/css-selector": "~5.0",
## If there is the following description, please delete it. (It is no longer needed in Laravel 9. Please remove it regardless of version)
- Delete
        "fideloper/proxy": "XXXX",
```

- Change the following description in "require-dev".

```
#### Error report handler fix
- After
        "nunomaduro/collision": "^6.2",

#### PHP unit test fix
- After
        "phpunit/phpunit": "^9.5",

#### Add spatie/laravel-ignition
- Add
        "spatie/laravel-ignition": "^1.0",

## If there is the following description, please delete it. (It is no longer needed in Laravel 9. Please remove it regardless of version)
- Delete
        "facade/ignition": "XXXX",

```

### Execute command 1

- Execute the following command.

```
# Laravel framework, Exment, related library update implementation
composer update
```

### Modify TrustProxies.php

- Open the file "app/Http/Middleware/TrustProxies.php" and modify it as follows.  
*You may rewrite all the files.

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


### Execute command 2

- Execute the following command.

```
# Exment update content reflected
php artisan exment:update

# View cache clear
php artisan view:clear
```

### What to do if you have changed the save destination of the file
If you have [changed the save destination of the file](/additional_file_saveplace), additional work may be required.  
Please check the detailed procedure at the bottom of the page.

## Finish update
This completes the update.  


## What to do if you have changed the file save destination-Details
The required steps differ depending on what you have set up to that point.    
Please check each setting method and perform the work.

#### If the file is saved to FTP
Add the function with the following command.

```
composer require league/flysystem-ftp ~3.0
```
