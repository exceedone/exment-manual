# (For advanced users) Change file save destination
In Exment, by default, attachments are stored on the web server.  
However, you may want to save it somewhere other than the web server.   
For example:  

- Save backup file to FTP
- Save files to AWS S3 for redundancy

This section describes the setting method when you want to change the file save destination.  

## File type
Currently, Exment has the following file types.  
※The key name will be used in the settings described later.

- **Attachments** : Data attachments saved from the screen. Key name: exment
- **Backup** : Exment data backup file to be executed from the backup screen. Key name: backup
- **Plugin** : Plug-in file uploaded as an extension of Exment. Key name: plugin
- **Template** : Configuration files for Exment custom tables and columns. Key name: template


## Upload destination (driver) type
Currently, Exment supports the following upload destinations (drivers).  
※ The key name will be used in the settings described later

- **Local (default)** : Web server. Key name: local
- **FTP** : FTP. Key name : ftp
- **SFTP** : SFTP. Key name : sftp
- **Amazon S3** : Amazon S3. Key name : s3
- **Azure Blob** : Azure Blob. Key name : azure


## Setting method

### Common setting
- Open ".env" and specify the driver for each type of file you want to change.

~~~
EXMENT_DRIVER_EXMENT=(Key name of the driver you want to use in the attached file)
EXMENT_DRIVER_BACKUP=(Key name of the driver you want to use for backup)
EXMENT_DRIVER_TEMPLATE=(Key name of the driver you want to use in the template)
EXMENT_DRIVER_PLUGIN=(Key name of the driver you want to use in the plug-in)

// Example 1: When you want to use FTP only for the backup destination  
EXMENT_DRIVER_BACKUP=ftp

// Example 2: When you want to change all upload destinations to Amazon S3  
EXMENT_DRIVER_EXMENT=s3
EXMENT_DRIVER_BACKUP=s3
EXMENT_DRIVER_TEMPLATE=s3
EXMENT_DRIVER_PLUGIN=s3
~~~

### When the first installed version is less than v3.0.8
If the version of Exment installed for the first time is less than v3.0.8, the following modifications are required.  
(If you are not sure which version you have installed, please check it just in case)

- Open "config / exment.php" in the root folder of the project.

- Look for a description similar to the following:

~~~ php
    /*
    |--------------------------------------------------------------------------
    | driver
    |--------------------------------------------------------------------------
    |
    | file upload driver
    |
    */
    'driver' => [
        'default' => env('EXMENT_DRIVER_DEFAULT', 'local'),
    ],
~~~

- Change this description to:

~~~ php
    /*
    |--------------------------------------------------------------------------
    | driver
    |--------------------------------------------------------------------------
    |
    | file upload driver
    |
    */
    'driver' => [
        'exment' => env('EXMENT_DRIVER_EXMENT', 'local'), //Fix
        'backup' => env('EXMENT_DRIVER_BACKUP', 'local'), //add to
        'plugin' => env('EXMENT_DRIVER_PLUGIN', 'local'), //add to
        'template' => env('EXMENT_DRIVER_TEMPLATE', 'local'), //add to
    ],
~~~

### (1 recommended) Settings for each driver-config and .env settings
The description of config is the minimum and the method of describing the setting value in .env.  
Since the setting values can be reused for each file type, settings can be made relatively easily.  

#### FTP
- Open "config / filesystems.php" and check the setting value of "disks.ftp".  
If not, add the following settings:  

~~~php
    'disks' => [
        // Add here
        'ftp' => [
            'driver'   => 'ftp',
            'host'     => env('FTP_HOST'),
            'username' => env('FTP_USERNAME'),
            'password' => env('FTP_PASSWORD'),
    
            // FTP configuration options
            'port'     => env('FTP_PORT', 21),
            'ssl'      => env('FTP_SSL', false),
            'timeout'  => env('FTP_TIMEOUT', 30),
        ],
    ],
~~~

- Open ".env" and add the following content.

~~~
FTP_HOST=(FTP host name)
FTP_USERNAME=(FTP user name)
FTP_PASSWORD=(FTP password)
~~~

- Add the following settings for each type of file you want to use FTP.

~~~
FTP_ROOT_EXMENT=(FTP root path used for attachments)
FTP_ROOT_BACKUP=(FTP root path used for backup)
FTP_ROOT_TEMPLATE=(FTP root path used in template)
FTP_ROOT_PLUGIN=(FTP root path used by plugin)

// Example 1: Specify the backup FTP root path
FTP_ROOT_EXMENT=/var/foo/exment/ftp/backup

// Example 2: Specify all FTP root paths
FTP_ROOT_EXMENT=/var/foo/exment/ftp/admin
FTP_ROOT_BACKUP=/var/foo/exment/ftp/backup
FTP_ROOT_TEMPLATE=/var/foo/exment/ftp/template
FTP_ROOT_PLUGIN=/var/foo/exment/ftp/plugin
~~~



#### SFTP

- Execute the following command.

~~~
composer require league/flysystem-sftp ~1.0
~~~

- Open "config / filesystems.php" and check the setting value of "disks.sftp".  
If not, add the following settings:

~~~php
    'disks' => [

        // Add here
        'sftp' => [
            'driver'   => 'sftp',
            'host'     => env('SFTP_HOST'),
            'username' => env('SFTP_USERNAME'),
            'password' => env('SFTP_PASSWORD'),

            // SSH Setting up key-based authentication
            'privateKey' => env('SFTP_PRIVATE_KEY'),
            'password' => env('SFTP_PASSWORD'),

            // FTP configuration options
            'port' => env('SFTP_PORT', 22),
            'timeout' => env('SFTP_TIMEOUT', 30),
        ],
    ],
~~~

- Open ".env" and add the following content.

~~~
SFTP_HOST=(FTP host name)
SFTP_USERNAME=(FTP user name)
SFTP_PASSWORD=(FTP password)
~~~

- Add the following settings for each type of file that you want to use SFTP.

~~~
SFTP_ROOT_EXMENT=(SFTP root path used for attachments)  
SFTP_ROOT_BACKUP=(Root path of SFTP used for backup)  
SFTP_ROOT_TEMPLATE=(Root path of SFTP used in template)  
SFTP_ROOT_PLUGIN=(Root path of SFTP used by plugin)  

// Example 1: Specify backup SFTP root path
SFTP_ROOT_EXMENT=/var/foo/exment/sftp/backup

// Example 2: Specifying all SFTP root paths
SFTP_ROOT_EXMENT=/var/foo/exment/sftp/admin
SFTP_ROOT_BACKUP=/var/foo/exment/sftp/backup
SFTP_ROOT_TEMPLATE=/var/foo/exment/sftp/template
SFTP_ROOT_PLUGIN=/var/foo/exment/sftp/plugin
~~~


#### Amazon S3
- Create AWS S3 bucket and IAM.
※Reference: [Super easy! How to use S3 with Laravel](https://qiita.com/tiwu_official/items/ecb115a92ebfebf6a92f)  
Please execute "Create IAM for S3" and "Create Bucket" of the above URL  
※ If you want to support multiple file types, create a separate bucket for each file type

- Execute the following command.

~~~
composer require league/flysystem-aws-s3-v3 ~1.0
~~~

- Open "config / filesystems.php" and check the setting value of "disks.s3".  
If not, add the following settings:

~~~php
    'disks' => [

        // Add here
        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
        ],
    ],
~~~

- Add the following content to ".env".

~~~
AWS_ACCESS_KEY_ID=(AWS S3 access key)  
AWS_SECRET_ACCESS_KEY=(AWS S3 secret access key)  
AWS_DEFAULT_REGION=(region of AWS S3)  
~~~

- Add the following settings for each file type that you want to use Amazon S3.

~~~
AWS_BUCKET_EXMENT=(AWS S3 bucket used for attachments)
AWS_BUCKET_BACKUP=(AWS S3 bucket used for backup)
AWS_BUCKET_TEMPLATE=(AWS S3 bucket used in the template)
AWS_BUCKET_PLUGIN=(AWS S3 bucket used by plugin)

// Example 1: Specifying a backup AWS S3 bucket
AWS_BUCKET_BACKUP=exment_backup

// Example 2: Specify all AWS S3 buckets
AWS_BUCKET_EXMENT=exment_default
AWS_BUCKET_BACKUP=exment_backup
AWS_BUCKET_TEMPLATE=exment_template
AWS_BUCKET_PLUGIN=exment_plugin
~~~


#### Azure Blob
- Create Azure Blob.  
※ If you want to support multiple file types, create a separate container for each file type.  

- Execute the following command.

~~~
composer require league/flysystem-azure-blob-storage ~0.1.6
~~~

- Open "config / filesystems.php" and check the setting value of "disks.azure".  
If not, add the following settings:  

~~~php
    'disks' => [
        // Add here
        'azure' => [
            'driver' => 'azure',
            'account' => env('AZURE_STORAGE_ACCOUNT'),
            'key' => env('AZURE_STORAGE_KEY'),
        ],
    ],
~~~

- Add the following content to ".env".

~~~
AZURE_STORAGE_ACCOUNT=(Azure Blob account)
AZURE_STORAGE_KEY=(Azure Blob access key)
~~~

- Add the following settings for each file type that you want to use Azure Blob.

~~~
AZURE_STORAGE_CONTAINER_EXMENT=(Azure Blob container used for attachments)
AZURE_STORAGE_CONTAINER_BACKUP=(Azure Blob container used for backup)
AZURE_STORAGE_CONTAINER_TEMPLATE=(Azure Blob container used in template)
AZURE_STORAGE_CONTAINER_PLUGIN=(Azure Blob container used by plugin)

// Example 1: Specifying a backup Azure Blob container  
AZURE_STORAGE_CONTAINER_BACKUP=exment_backup

// Example 2: Specify a container for all Azure Blobs  
AZURE_STORAGE_CONTAINER_EXMENT=exment_default
AZURE_STORAGE_CONTAINER_BACKUP=exment_backup
AZURE_STORAGE_CONTAINER_TEMPLATE=exment_template
AZURE_STORAGE_CONTAINER_PLUGIN=exment_plugin
~~~


### (2 not recommended) Settings for each driver-individually specified in config  
This is a method of setting each driver information in config for each file type.  

#### Example：FTP
- Open "config / filesystems.php" and add the following values.

~~~php
    'disks' => [
        // If the file type is backup, add from here
        'backup' => [ // Enter the file type key name
            'driver'   => 'ftp',
            'host'     => env('FTP_HOST'),
            'username' => env('FTP_USERNAME'),
            'password' => env('FTP_PASSWORD'),
            'root' => env('FTP_ROOT'),
    
            // FTP configuration options
            'port'     => env('FTP_PORT', 21),
            'ssl'      => env('FTP_SSL', false),
            'timeout'  => env('FTP_TIMEOUT', 30),
        ],

        // If you want to change the driver of another file type, describe the same setting here
    ],
~~~

- Open ".env" and add the settings described in the "env" function above.

- To change the driver for other file types, add the settings to the ".env" file.


### Notes
- Depending on the server, file saving may not be possible.  
Especially in the case of a rental server, 、**here may be restrictions on FTP etc. depending on the setting of the provider.** Please note.  

[←Back to list of additional settings](/quickstart_more)