# Plug-in (button)
You can add a button to the Exment list screen or form screen and process it when you click it.

> This feature was added in v3.2.0.

## Button type

- ##### Normal button
Generate a button with the button heading, color, icon, etc. saved in the plug-in settings and place it on the screen.  
Implement the processing after clicking the button.  

- ##### Original button (supported from v3.4.1)
You can display the buttons in your own format.  
Implement the process when the button is displayed.


## Button display conditions

| Name | Type | Description |
| ---- | ---- | ---- |
| grid_menubutton | Menu button on the list screen | Add a button at the top of the data list screen to raise an event when clicked. |
| form_menubutton_show | Menu button on the data detail screen | Add a button at the top of the data detail screen to raise an event when clicked. |
| form_menubutton_create | Menu button on the new data creation screen | Add a button at the top of the new data creation screen to raise an event when clicked. |
| form_menubutton_edit | Menu button on the data update screen | Add a button at the top of the data update screen to raise an event when clicked. |

## How to make

### Create config.json
- Create the following config.json file.

~~~ json
{
    "plugin_name": "PluginDemoButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a66",
    "plugin_view_name": "Plugin Button",
    "description": "This is a test to execute a plugin button.",,
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "grid_menubutton",
    "target_tables": "information"
}
~~~

- Enter plugin_name in half-width alphanumeric characters.
- uuid is a string of 32 characters + hyphen, for a total of 36 characters.  
Used to make the plugin unique.  
Please create from the following URL.  
https://www.famkruithof.net/uuid/uuidgen
- Enter button for plugin_type.
- When specifying event_triggers from the beginning, enter the names of "trigger types" separated by commas.
- When specifying target_tables from the beginning, enter the table names of the custom table separated by commas.


### PHP file creation
- Create a PHP file like the one below. Name it "Plugin.php".

~~~ php
<? php
namespace App \ Plugins \ PluginDemoButton;

use Exceedone \ Exment \ Services \ Plugin \ PluginButtonBase;
class Plugin extends PluginButtonBase
{
    / **
     * Plugin Button
     * /
    public function execute ()
    {
        \ Log :: debug ('Plugin calling');
        

        // Details of screen transition by return value ----------------------------------------- -----------
        // true: "Execution completed!" Is displayed in the upper right corner of the screen, and reloading is performed on that screen.
        return true;

        // true: Display your own message saying "○○ has completed successfully! Please process XX after this"
        // return [
        //'result' => true,
        //'swaltext' =>' ○○ completed successfully! After this, please process XX',
        //];

        // true: Display "Execution completed!" And redirect to another page
        // return redirect ('https://github.com/exceedone/exment');
        // return admin_url ('/');

        // false: Display your own error message saying "An error of XX has occurred"
        // return [
        //'result' => false,
        //'swaltext' =>'○○ error occurred',
        //];


        // (Compatible with v3.4.1) When calling from the "Menu button on the list screen" ---------
        // CustomValue object list of the data checked on the list screen. \ Illuminate \ Support \ Collection type
        // $ custom_values ​​= $ this-> selected_custom_values;
    }

    / **
    * (Compatible with v3.4.3) Judgment whether to display the button on the screen. The default is true
    *
    * @return bool true: Depict false Do not depict
    * /
    public function enableRender () {
        // Example 1: Display the button when the id of the selected data is 2.
        // return $ this-> custom_value-> id% 2 === 0;

        // Show button when custom column value "status" is "active"
        return $ this-> custom_value-> getValue ('status') ==='active';
    }
}
~~~
- The namespace should be ** App \ Plugins \\ (Pascal case of plugin name) **. [Click here for details](/plugin_quickstart#plugin-name-namespace)

- If the trigger conditions registered on the plugin management screen are met, the plugin will be called and the execute function in Plugin.php will be executed.

- The Plugin class inherits from the class PluginButtonBase.  
PluginButtonBase owns properties such as the calling custom table $ custom_table, table value $ custom_value, etc.  
A value is assigned to that property when the execute function is called.
For more information on properties, see Plugin Reference (plugin_reference.md).

- (V3.4.3 compatible) If you want to control the display / non-display of the button using the registered data, implement the method "enableRender".
Return true if you want to show the button, false if you want to hide it. (The default is true.)


### Compress to zip
Compress the above two files into a zip with the minimum configuration.  
The zip file name should be "(plugin_name) .zip".
- PluginDemoButton.zip
    - config.json
    - Plugin.php
    - (Other necessary PHP files, image files, etc.)



## How to create (display your own button)

> This function is supported from v3.4.1.

You can display the buttons in your own format. Please use it for the following purposes.

- Display multiple buttons side by side.
- Display a drop-down button.
- Display the button only when certain conditions are met. The judgment of the condition uses the original logic.  

Here, we will develop a sample that "displays the" Previous "and" Next "buttons for that data on the data details screen."


### Create config.json
It is the same as the normal creation method.

`` `` json
{
    "plugin_name": "PluginCustomButton",
    "uuid": "6f0777c0-8e36-11ea-ab12-0800200c9a12",
    "plugin_view_name": "Plugin Custom Button",
    "description": "This is a test to add your own plugin button.",,
    "author": "(Your Name)",
    "version": "1.0.0",
    "plugin_type": "button",
    "event_triggers": "form_menubutton_show",
    "target_tables": "information"
}
`` ```

### PHP file creation
- Create a PHP file like the one below. Name it "Plugin.php".

~~~ php
///// Plugin.php
<? php
namespace App \ Plugins \ PluginCustomButton;

use Exceedone \ Exment \ Services \ Plugin \ PluginButtonBase;
class Plugin extends PluginButtonBase
{
    / **
     * Plugin Trigger
     * /
    public function execute ()
    {
    }
    
    / **
     * The process of adding your own button instead of the default button display
     *
     * @return void
     * /
    public function render () {
        $ buttons = [];

        // keys. true: "next", false: "previous"
        $ keys = [true, false];
        foreach ($ keys as $ key) {
            // Get the values ​​before and after
            $ value = $ this-> getNextOrPrevId ($ key);
            
            // add a button if the value exists
            if (! is_null ($ value)) {
                $ buttons [] = [
                    'href' => $ value-> getUrl (),
                    'target' =>'_top',
                    ($ key?'Icon_right':'icon') => $ key?'fa-arrow-right':'fa-arrow-left',
                    'label' => $ value-> getLabel (),
                ];;
            }
        }

        // Draw a button in button.blade.php
        return $ this-> pluginView ('buttons', ['buttons' => $ buttons]);
    }

    / **
     * Get the next or previous data
     *
     * @param boolean $ isNext true: Next data, false: Previous data
     * @return CustomValue
     * /
    protected function getNextOrPrevId (bool $ isNext) {
        $ query = $ this-> custom_table-> getValueModel ()-> query ();
        $ query-> where ('id', ($ isNext?'>':'<'), $ This-> custom_value-> id);

        $ query-> orderBy ('id', ($ isNext?'Asc':'desc'));

        return $ query-> first ();
    }
}
~~~

- Basic rules such as namespace name, Plugin class inheritance, and naming are the same as when creating a normal button.

- If the trigger conditions registered on the plugin management screen are met, the plugin will be called and the "render ()" method in Plugin.php will be called.

- In the render () method, display the views in resources / views.

### PHP file (blade) creation

~~~ php
///// resources / views / buttons.blade.php
@foreach ($ buttons as $ button)
<div class = "btn-group pull-right" style = "margin-right: 5px">
    <a href="{{array_get($button,'href')}}" class="btn btn-sm {{array_get ($ button,'btn_class','btn-default')}} "title =" { {array_get ($ button,'label')}} "target =" {{array_get ($ button,'target','_ blank')}} ">
        @if (array_has ($ button,'icon'))
        <i class = "fa {{array_get ($ button,'icon')}}"> </ i>
        & nbsp;
        @endif

        <span class = "hidden-xs"> {{array_get ($ button,'label')}} </ span>

        @if (array_has ($ button,'icon_right'))
        & nbsp;
        <i class = "fa {{array_get ($ button,'icon_right')}}"> </ i>
        @endif
    </a>
</ div>
@endforeach
~~~

### Compress to zip
Zip it up and upload it just like a regular button.


### Sample plugin
[Display "Next" and "Previous" buttons (unique button)] (https://exment.net/downloads/sample/plugin/PluginCustomButton.zip)