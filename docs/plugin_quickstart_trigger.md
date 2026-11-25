# Plugin (Trigger)

> From v3.2.0, "Plugin (Trigger)" is deprecated.  
For new plugins, please use [Plugin (Button)](/plugin_quickstart_button) or [Plugin (Event)](/plugin_quickstart_event).  


A plugin (trigger) runs when a specific operation is done on an Exment screen. It can do processing such as updating values.  
It can also add a button to the list screen or the form screen and do processing when the button is clicked.  
This page explains the trigger types and how to make one (create config.json and Plugin.php and put them into a zip).  


## Trigger type

| Name | Type | Description |
| ---- | ---- | ---- |
| saving | Immediately before saving | The processing starts immediately before the data is saved. |
| saved | After saving | The processing starts after the data is saved. |
| grid_menubutton | Menu button on the list screen | Adds a button at the top of the data list screen and fires an event when it is clicked. |
| form_menubutton_show | Menu button on the data detail screen | Adds a button at the top of the data detail screen and fires an event when it is clicked. |
| form_menubutton_create | Menu button on the new data creation screen | Adds a button at the top of the new data creation screen and fires an event when it is clicked. |
| form_menubutton_edit | Menu button on the data update screen | Adds a button at the top of the data update screen and fires an event when it is clicked. |
| workflow_action_executing | Immediately before workflow execution | The processing starts immediately before the workflow is executed. |
| workflow_action_executed | After workflow execution | The processing starts after the workflow is executed. |
| notify_executing | Immediately before notification execution | The processing starts immediately before the notification is executed. |
| notify_executed | After notification execution | The processing starts after the notification is executed. |

## How to make

### Create config.json
- Create the following config.json file.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "fa7de170-992a-11e8-b568-0800200c9a66",
    "plugin_view_name": "Plugin Trigger",
    "description": "This is a test of uploading a plugin.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "trigger",
    "event_triggers": "loaded,loading"

}
~~~

- Write plugin_name in half-width alphanumeric characters.
- uuid is a string of 32 characters + hyphens, 36 characters in total. It is used to tell the plugin apart from all others.  
Create it at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- Write trigger for plugin_type.  
- To specify event_triggers from the beginning, write the "Name" values of "Trigger type" above, separated by commas.
- To specify target_tables from the beginning, write the table names of the custom tables, separated by commas.


### PHP file creation
- Create a PHP file like the following. Name it "Plugin.php".

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
- The namespace should be **App\Plugins\\(Pascal case of plugin name)**. [See here for details](/plugin_quickstart?id=plugin-name-namespace)

- When the conditions of the trigger registered on the plugin management screen are met, the plugin is called and the execute function of Plugin.php runs.  

- The Plugin class inherits the class PluginTriggerBase.  
PluginTriggerBase has properties such as the custom table of the caller, $custom_table, and the table value, $custom_value.  
When the execute function is called, these properties already hold their values.  
For the details of the properties, see the [plugin reference](/plugin_reference).  

### Compress to zip
Compress the two files above, as the minimum set, into a zip.  
Name the zip file "(plugin_name).zip".  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php
    - (Other PHP files, image files and so on that are needed)


### Sample plugin
In preparation...
