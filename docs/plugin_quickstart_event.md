# Plugin (event)
It is executed when a specific operation (saving data, executing a workflow and so on) is done on an Exment screen, and can do processing such as updating values.  
This page explains how to make a plugin (event). You make config.json and Plugin.php, compress them into a zip and upload it.

> This feature was added in v3.2.0.

## Event type

| Name | Type | Description |
| ---- | ---- | ---- |
| loading | At the start of loading | The process starts at the beginning of the loading of the page. |
| loaded | At the end of loading | The process starts at the end of the loading of the page. |
| saving | Immediately before saving | The process starts just before the data is saved. |
| saved | After saving | The process starts after the data is saved. |
| deleted | After deleting | The process starts after the data is deleted. |
| workflow_action_executing | Immediately before workflow execution | The process starts just before the workflow is executed. |
| workflow_action_executed | After workflow execution | The process starts after the workflow is executed. |
| notify_executing | Immediately before notification execution | The process starts just before the notification is executed. |
| notify_executed | After executing the notification | The process starts after the notification is executed. |

## How to make

### Create config.json
- Create the following config.json file.

~~~ json
{
    "plugin_name": "PluginDemoEvent",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Event",
    "description": "This is a test to execute a plugin event.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "event",
    "event_triggers": "loaded"
}
~~~

- Enter plugin_name in half-width alphanumeric characters.
- uuid is a string of 32 characters + hyphens, 36 characters in total. It is used to make the plugin unique.  
Create one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- Enter event for plugin_type.
- To specify event_triggers from the beginning, enter the names in "Event type", separated by commas.
- To specify target_tables from the beginning, enter the table names of the custom tables, separated by commas.


### PHP file creation
- Create a PHP file like the one below. Name it "Plugin.php".

~~~ php
<?php
namespace App\Plugins\PluginDemoEvent;

use Exceedone\Exment\Services\Plugin\PluginEventBase;
class Plugin extends PluginEventBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        \Log::debug('Event called!');
        return true;
    }
}
~~~
- The namespace should be **App\Plugins\\(Pascal case of plugin name)**. [Click here for details](/plugin_quickstart?id=plugin-name-namespace)

- When the trigger conditions registered on the plugin management screen are met, the plugin is called and the execute function in Plugin.php is executed.

- The Plugin class inherits the class PluginEventBase.  
PluginEventBase has properties such as the calling custom table $custom_table and the table value $custom_value,  
and values are assigned to those properties when the execute function is called.  
For details of the properties, see the [Plugin reference](/plugin_reference).

### Compress to zip
Compress the above two files, as the minimum set, into a zip.  
The zip file name should be "(plugin_name).zip".
- PluginDemoEvent.zip
    - config.json
    - Plugin.php
    - (Other necessary PHP files, image files, etc.)


### Sample plugin
[External database linkage](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity)  
- This is a sample that links with an external database when custom data is saved.
- When you add, update or delete data in the city table of Exment, it is reflected in the city table of the external database.
- As preparation, do the following in order.
    1. Import the [template](https://exment.net/downloads/sample/template/city_template.zip) from "Admin Setting" → "Template" of Exment.
    2. Create the external database. This plugin uses the MySQL sample database "world". Download the zip from the [official site](https://dev.mysql.com/doc/index-other.html) and execute the unzipped SQL in your MySQL (or MariaDB) environment.
![MySQL download page](img/plugin/plugin_event1.png)  
    3. Upload the [plugin](https://github.com/exment-git/plugin-sample/tree/main/event/PluginSyncCity) from "Admin Setting" → "Plugin" of Exment.
    4. Open the settings screen of the plugin, enter the connection information of the external database set in 2. and save.  
![Plugin setting page](img/plugin/plugin_event2.png)
