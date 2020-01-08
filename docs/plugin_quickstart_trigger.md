# Plugin (Trigger)
This is executed when a specific operation is performed on the screen of Exment, and processing such as updating the value can be performed.  
Alternatively, you can add a button to the list screen or form screen and process it when clicked.  
Specific operations include the following:

## Trigger type

| Name | Type | Description |
| ---- | ---- | ---- |
| saving | Immediately before saving | The process starts immediately before saving the data. |
| saved | After saving | After saving the data, the process starts. |
| grid_menubutton | Menu button on the list screen | Add a button at the top of the data list screen to generate an event when clicked. |
| form_menubutton_show | Menu button on data detail screen | Add a button at the top of the data detail screen to generate an event when clicked. |
| form_menubutton_create | Menu button on new data creation screen | Add a button at the top of the new data creation screen to generate an event when clicked. |
| form_menubutton_edit | Menu button on data update screen | Add a button at the top of the data update screen to fire an event when clicked. |
| workflow_action_executing | Immediately before workflow execution | Processing starts immediately before the workflow is executed. |
| workflow_action_executed | After executing the workflow | After the workflow is executed, the process starts. |

## How to make

### Create config.json
- Create the following config.json file.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Trigger",
    "description": "Plugin upload test",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "trigger",
    "event_triggers": "loaded,loading",

}
~~~

- plugin_name should be written in alphanumeric characters.  
- uuid is a character string of 32 characters + hyphen, totaling 36 characters. Used to make the plugin unique.  
Please create from the following URL etc.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type should be written as trigger.  
- When specifying event_triggers from the beginning, enter the names of "trigger types" separated by commas.  
- When specifying target_tables from the beginning, enter the table names of custom tables separated by commas.


### PHP file creation
- Create the following PHP file. The name should be "Plugin.php".  

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginTriggerBase;
class Plugin extends PluginTriggerBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
        admin_toastr('Plugin calling');
        return true;
    }
}
~~~
- namespace should be **App \ Plugins (plugin name)**.

- When the conditions of the trigger registered in the plugin management screen are met, the plugin is called and the execute function in Plugin.php is executed.

- The Plugin class inherits the class PluginTriggerBase.  
PluginTriggerBase has properties such as the custom table $ custom_table and table value $ custom_value of the caller, and when the
execute function is called, the value is assigned to the property.  
See the [plugin reference](plugin_reference.md) for details on the properties.

### Compress to zip
Compress the above two files into a zip with the minimum configuration.  
The zip file name should be "(plugin_name) .zip".
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php
    - (Other required PHP files, image files, etc.)


### Sample plugin
in preparation...
