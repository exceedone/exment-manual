# Plug-in (button)
You can add a button to the Exment list screen or form screen, and run a process when it is clicked.  
This page explains how to make a plugin (button) with three examples (a normal button, your own button, and a file download).

![Button plugin example](img/plugin/plugin_button1.png)

## Button type

- ##### Normal button
A button is generated with the heading, color, icon and so on saved in the plugin settings, and placed on the screen.  
You implement the process after the button is clicked.

- ##### Original button (supported from v3.4.1)
You can display buttons in your own format.  
You implement the process when the button is displayed.


## Button display conditions

| Name | Type | Description |
| ---- | ---- | ---- |
| grid_menubutton | Menu button on the list screen | Adds a button at the top of the data list screen and raises an event when it is clicked. |
| form_menubutton_show | Menu button on the data details screen | Adds a button at the top of the data details screen and raises an event when it is clicked. |
| form_menubutton_create | Menu button on the new data creation screen | Adds a button at the top of the new data creation screen and raises an event when it is clicked. |
| form_menubutton_edit | Menu button on the data update screen | Adds a button at the top of the data update screen and raises an event when it is clicked. |

## How to make

### Create config.json
- Create the following config.json file.

~~~ json
{
    "plugin_name": "PluginDemoButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a66",
    "plugin_view_name": "Plugin Button",
    "description": "This is a test to execute a plugin button.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "grid_menubutton",
    "target_tables": "information"
}
~~~

- Enter plugin_name in half-width alphanumeric characters.
- uuid is a string of 32 characters + hyphens, 36 characters in total. It is used to make the plugin unique.  
Create one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- Enter button for plugin_type.
- To specify event_triggers (the button display conditions) from the beginning, enter the names in "Button display conditions", separated by commas.
- To specify target_tables from the beginning, enter the table names of the custom tables, separated by commas.


### PHP file creation
- Create a PHP file like the one below. Name it "Plugin.php".

~~~ php
<?php
namespace App\Plugins\PluginDemoButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        \Log::debug('Plugin calling');
        

        // Details of the screen transition by the return value ----------------------------------------------------
        // true : shows "Execution completed!" at the top right of the screen and reloads that screen
        return true;

        // true : shows your own message, "AAA completed successfully! Please do BBB next"
        // return [
        //     'result' => true,
        //     'swaltext' => 'AAA completed successfully! Please do BBB next',
        // ];

        // true : shows "Execution completed!" and redirects to another page
        // return redirect('https://github.com/exceedone/exment');
        // return admin_url('/');

        // false : shows your own error message, "An error of AAA occurred"
        // return [
        //     'result' => false,
        //     'swaltext' => 'An error of AAA occurred',
        // ];


        // (from v3.4.1) When called from the "Menu button on the list screen" ---------
        // The list of CustomValue objects of the data checked on the list screen. Type: \Illuminate\Support\Collection
        // $custom_values = $this->selected_custom_values; 
    }

    /**
    * (from v3.4.3) Decides whether the button is shown on the screen. The default is true
    * 
    * @return bool true: render, false: do not render
    */
    public function enableRender(){
        // Example 1: show the button when the id of the selected data is 2
        //return $this->custom_value->id % 2 === 0;

        // Show the button when the value of the custom column "status" is "active"
        return $this->custom_value->getValue('status')  === 'active';
    }
}
~~~
- The namespace should be **App\Plugins\\(Pascal case of plugin name)**. [Click here for details](/plugin_quickstart?id=plugin-name-namespace)

- When the trigger conditions registered on the plugin management screen are met, the plugin is called and the execute function in Plugin.php is executed.

- The Plugin class inherits the class PluginButtonBase.  
PluginButtonBase has properties such as the calling custom table $custom_table and the table value $custom_value,  
and values are assigned to those properties when the execute function is called.  
For details of the properties, see the [Plugin reference](/plugin_reference).

- (from v3.4.3) To control whether the button is shown by using the registered data, implement the method "enableRender".  
Return true to show the button, and false to hide it. (The default is true.)


### Compress to zip
Compress the above two files, as the minimum set, into a zip.  
The zip file name should be "(plugin_name).zip".
- PluginDemoButton.zip
    - config.json
    - Plugin.php
    - (Other necessary PHP files, image files, etc.)



## How to create (display your own button)

> This function is supported from v3.4.1.

You can display buttons in your own format. Use it for the following purposes.

- Display multiple buttons side by side.
- Display a drop-down button.
- Display the button only when certain conditions are met, with your own logic for judging the conditions.

Here we develop a sample that "shows the 'Previous' and 'Next' buttons of the data on the data details screen".


### Create config.json
It is the same as the normal way.

``` json
{
    "plugin_name": "PluginCustomButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a12",
    "plugin_view_name": "Plugin Custom Button",
    "description": "This is a test to add your own plugin button.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### PHP file creation
- Create a PHP file like the one below. Name it "Plugin.php".

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\PluginCustomButton;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;
class Plugin extends PluginButtonBase
{
    /**
     * Plugin Trigger
     */
    public function execute()
    {
    }
    
    /**
     * Adds your own buttons in place of the default button
     *
     * @return void
     */
    public function render(){
        $buttons = [];

        // keys. true: "next", false: "previous"
        $keys = [true, false];
        foreach($keys as $key){
            // Get the next or previous value
            $value = $this->getNextOrPrevId($key);
            
            // If the value exists, add a button
            if(!is_null($value)){
                $buttons[] = [
                    'href' => $value->getUrl(),
                    'target' => '_top',
                    ($key ? 'icon_right' : 'icon') => $key ? 'fa-arrow-right' : 'fa-arrow-left',
                    'label' => $value->getLabel(),
                ];
            }
        }

        // Render the buttons with button.blade.php
        return $this->pluginView('buttons', ['buttons' => $buttons]);
    }

    /**
     * Get the next or the previous data
     *
     * @param boolean $isNext true: the next data, false: the previous data
     * @return CustomValue
     */
    protected function getNextOrPrevId(bool $isNext){
        $query = $this->custom_table->getValueModel()->query();   
        $query->where('id', ($isNext ? '>' : '<'), $this->custom_value->id);

        $query->orderBy('id', ($isNext ? 'asc' : 'desc'));

        return $query->first();
    }
}
~~~

- The basic rules, such as the namespace name, the inheritance of the Plugin class and the naming, are the same as for a normal button.

- When the trigger conditions registered on the plugin management screen are met, the plugin is called and the "render()" method in Plugin.php is called.

- In the render() method, a view in resources/views is displayed.

### PHP file (blade) creation

~~~ php
///// resources/views/buttons.blade.php
@foreach($buttons as $button)
<div class="btn-group pull-right" style="margin-right: 5px">
    <a href="{{ array_get($button, 'href')}}" class="btn btn-sm {{ array_get($button, 'btn_class', 'btn-default') }}" title="{{ array_get($button, 'label')}}" target="{{ array_get($button, 'target', '_blank')}}">
        @if(array_has($button, 'icon'))
        <i class="fa {{ array_get($button, 'icon') }}"></i>
        &nbsp;
        @endif

        <span class="hidden-xs">{{ array_get($button, 'label')}}</span>

        @if(array_has($button, 'icon_right'))
        &nbsp;
        <i class="fa {{ array_get($button, 'icon_right') }}"></i>
        @endif
    </a>
</div>
@endforeach
~~~

### Compress to zip
Zip it and upload it, in the same way as a normal button.


### Sample plugin
[Show "Next" and "Previous" buttons (your own button)](https://github.com/exment-git/plugin-sample/tree/main/button/PluginCustomButton)





## How to create (file download)

> This function is supported from v4.3.3.

This is a sample that downloads a file with a plugin.

Here, the user image that is shown when a user does not use an avatar is downloaded.


### Create config.json
It is the same as the normal way.

``` json
{
    "plugin_name": "TestPluginDownload",
    "uuid": "e9b18218-2cc6-acea-e5cf-36b88ced5a62",
    "plugin_view_name": "Plugin file download test",
    "description": "This is a test to download a file with a plugin.",
    "author": "Kajitori",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
```

### PHP file creation
- Create a PHP file like the one below. Name it "Plugin.php".

~~~ php
///// Plugin.php
<?php
namespace App\Plugins\TestPluginDownload;

use Exceedone\Exment\Services\Plugin\PluginButtonBase;

class Plugin extends PluginButtonBase
{
    /**
     * Plugin Button
     */
    public function execute()
    {
        // Return the base64 string, the Content-Type and the file name as an array
        $base_path = base_path('public/vendor/exment/images/user.png');
        $fileName = 'user.png';
        return [
            'fileBase64' => base64_encode(\File::get($base_path)),
            'fileContentType' => \File::mimeType($base_path),
            'fileName' => $fileName,
            
            // Optional: show the message "Download completed"
            'swaltext' => 'Download completed',
        ];
    }
}
~~~

- The basic rules, such as the namespace name, the inheritance of the Plugin class and the naming, are the same as for a normal button.

- As the return value of the execute function, return the following values as an array.
    - fileBase64 : the base64 string of the file
    - fileContentType : the Content-Type of the file
    - fileName : the file name when it is downloaded

### Compress to zip
Zip it and upload it, in the same way as a normal button.


### Sample plugin
[Download the anonymous user image](https://github.com/exment-git/plugin-sample/tree/main/button/TestPluginDownload)

