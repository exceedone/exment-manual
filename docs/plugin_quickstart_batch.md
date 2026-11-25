# Plugin (batch)
This plugin runs your own process at a fixed interval, or at a time the administrator specifies.
We recommend it when you want to add, for example, a process that must run every day.


## How to make
The steps are explained with an example: a batch that "physically deletes the data that has been logically deleted".
Note: by default in Exment, data deleted on the screen is "logically deleted" and stays in the database.
This batch deletes that data completely (physical deletion).

### Create config.json
- Create the following config.json file.  

~~~ json
{
    "uuid": "b5c0a5d2-2716-4161-98d0-b490c1ebc521",
    "plugin_name": "harddelete_data",
    "plugin_view_name": "Physically delete data",
    "description": "Permanently delete all data that has been logically deleted.",
    "author":  "Kajitori",
    "version": "1.0.0",
    "plugin_type": "batch",
    "batch_hour": 0,
    "batch_cron": "0 0 * * *"
}
~~~

- plugin_name : the plugin name. Enter it in single-byte alphanumeric characters.
- uuid : a string that tells plugins apart. It is 32 characters plus hyphens, 36 characters in total. Make sure it is not the same value as another plugin's.  
You can make one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : enter batch.  
- batch_hour (optional) : the time (hour) at which the plugin runs every day. Enter an integer from 0 to 23.
- batch_cron (optional) : for advanced users. Enter when the plugin runs in cron notation. This lets you specify flexibly when the batch starts.

Note: batch_hour and batch_cron can be changed later on the screen. The values written in config.json become the initial values after the upload.


### PHP file creation
- Create a PHP file like the one below. The name should be "Plugin.php".

~~~ php
<?php
namespace App\Plugins\HarddeleteData;

use Exceedone\Exment\Services\Plugin\PluginBatchBase;
use Exceedone\Exment\Model\CustomTable;

class Plugin extends PluginBatchBase{
    /**
     * execute
     */
    public function execute() {
        $tables = CustomTable::all();

        foreach($tables as $table){
            $modelname = getModelName($table);
            if(!isset($modelname)){
                continue;
            }

            $modelname::onlyTrashed()
                ->forceDelete();
        }
    }
    
}
~~~
- The namespace should be **App\Plugins\\(plugin name in Pascal case)**. [Click here for details](/plugin_quickstart?id=plugin-name-namespace)

- When the conditions of the trigger registered on the plugin management screen are met, the plugin is called and the execute function in Plugin.php runs.

- The Plugin class extends the class PluginBatchBase.  

### Compress to zip
Compress the above two files, as the minimum configuration, into a zip.  
- HarddeleteData.zip
    - config.json
    - Plugin.php


### Upload
Upload the plugin. See [Plugin](/plugin) for how to upload.

- Right after the upload, the "Active Flg" of a batch is off and the batch does not run automatically. To run it, switch the "Active Flg" on the [Plugin](/plugin) screen.
- **Besides this setting, the task schedule must be set up**. For details, see [Task schedule](/additional_task_schedule).


### How to start a batch
There are three ways to start an uploaded batch.

| Way | When it runs |
| ---- | ---- |
| Batch execution time (hour) | Every day at the specified hour |
| Batch execution cron | At the times specified in cron notation |
| Command | When you run the command (by hand) |

#### Batch execution time (hour) specification
Enter 0 to 23 on the plugin setting screen.
The plugin runs every day at that hour. (Example: with "5", the plugin runs at 5:00 every day)
![Plugin screen](img/plugin/plugin_batch1.png)  

#### Batch execution cron specification
For advanced users. You can enter when the plugin runs in cron notation.
Note: when this setting is filled in, "Batch execution time(hour)" above is disabled.
![Plugin screen](img/plugin/plugin_batch2.png)  

#### Command execution
You can also run the batch by hand from the command line at any time.
Run one of the following commands.

~~~
# By plugin ID
php artisan exment:batch 1

# By plugin_name (plugin name)
php artisan exment:batch --name=harddelete_data

# By uuid
php artisan exment:batch --uuid=b5c0a5d2-2716-4161-98d0-b490c1ebc521
~~~


### Sample plugin
[Physical deletion plugin for data](https://github.com/exment-git/plugin-sample/tree/main/batch/HarddeleteBatch)  
- A batch that physically deletes the logically deleted data.  
  
[External database linkage](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch)  
- A batch that imports the information stored in an external database into an Exment table all at once.  
- As preparation, do the following.
    1. Import the [template](https://exment.net/downloads/sample/template/city_template.zip) from "Admin Setting" → "Template" of Exment.  
    2. Create an external database. This plugin uses the MySQL sample database "world". Download the zip from [the official website](https://dev.mysql.com/doc/index-other.html) and run the unzipped SQL in your MySQL (or MariaDB) environment.
![MySQL download page](img/plugin/plugin_event1.png)  
    3. Upload the [plugin](https://github.com/exment-git/plugin-sample/tree/main/batch/PluginSyncBatch) from "Admin Setting" → "Plugin" of Exment.  
    4. Open the setting screen of the plugin, enter the connection information of the external database made in step 2 and save.  
![Plugin setting page](img/plugin/plugin_event2.png)  
