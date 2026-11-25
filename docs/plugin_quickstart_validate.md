# Plugin (validation)
This plugin runs your own validation (a check of what was entered) when custom data is saved and when custom data is deleted.
Checks of character types and numbers of digits can be done with the custom column settings. We recommend this plugin when you want more complex checks, or checks that relate several items to each other.

![Validation plugin example](img/plugin/plugin_validate1.png)   

> For a validation that simply compares two values, also try the [setting on the screen](/table?id=compare-two-columns).

![Compare two columns](img/table/compare1.png)    

## How to make

### Create config.json
- Create the following config.json file.  

~~~ json
{
    "plugin_name": "PluginDemoTrigger",
    "uuid": "63d80590-4aad-11e9-b475-0800200c9a66",
    "plugin_view_name": "Plugin Validator",
    "description": "Validates a custom table.",
    "author": "(Your Name)",
    "version": "1.0.0",
    "target_tables": "test_table",
    "plugin_type": "validator"
}
~~~

- plugin_name : enter it in single-byte alphanumeric characters.
- uuid : a string that tells plugins apart. It is 32 characters plus hyphens, 36 characters in total. Make sure it is not the same value as another plugin's.  
You can make one at the following URL, for example.  
https://www.famkruithof.net/uuid/uuidgen
- plugin_type : enter validator.  
- (Optional) target_tables : enter the name of the table to validate.  


### PHP file creation
- Create a PHP file like the one below. The name should be "Plugin.php".

~~~ php
<?php
namespace App\Plugins\PluginDemoTrigger;

use Exceedone\Exment\Services\Plugin\PluginValidatorBase;
class Plugin extends PluginValidatorBase
{
    /**
     * Plugin Validator
     */
    public function validate()
    {
        // Get the input values
        $xpos = array_get($this->input_value, 'xpos');
        $ypos = array_get($this->input_value, 'ypos');

        if (isset($xpos) && isset($ypos)) {
            if (intval($xpos) > intval($ypos)) {
                // Set the error message (key: column name, value: message)
                $this->messages['ypos'] = 'Please enter a value for Y greater than X.';
                // Return false (an error occurred)
                return false;
            }
        }

        // Return true (normal)
        return true;

        
        ///// (Added in v3.7.5) To get the kind of caller that called the validation. Use it, for example, to validate only for a specific way of calling
        \Log::debug($this->called_type);
        ///// The kinds of $this->called_type
        // form : screen
        // api : API
        // import : data import
        // null : others (other plugins, etc.)
    }

    public function validateDestroy($custom_value)
    {
        // (Added in v6.0.2) When false is returned, the data is not deleted and the error message set in 'message' is shown on the screen.
        if ($custom_value->getValue('priority') > 3) {
            return [
                'status'  => false,
                'message' =>  'Data with a high priority cannot be deleted.',
            ];
        } else {
            // When true is returned, the data is deleted.
            return [
                'status'  => true
            ];
        }
    }
}
~~~

- The namespace should be **App\Plugins\\(plugin name in Pascal case)**. [Click here for details](/plugin_quickstart?id=plugin-name-namespace)

- **When saving**: just before the data of the "target Table" set on the plugin management screen is saved, the plugin is called and the validate function in Plugin.php runs.
    - When the validate function returns true, the process continues.
    - When it returns false, the process is stopped and the error message set in the property $messages is shown on the screen.

- **When deleting**: just before the data of the "target Table" is deleted, the plugin is called and the validateDestroy function in Plugin.php runs.
    - When the validateDestroy function returns an array whose 'status' is true, the data is deleted.
    - When it returns an array whose 'status' is false, the process is stopped and the error message set in 'message' is shown on the screen.

- The Plugin class extends the class PluginValidatorBase.
PluginValidatorBase has the following properties, among others. You can refer to them in the validate function.
For details of the properties, see the [Plugin reference](/plugin_reference).
    - $custom_table: the custom table that called the plugin
    - $original_value: the custom data values before the change
    - $input_value: the values entered on the screen

### Compress to zip
Compress the above two files, as the minimum configuration, into a zip.  
The zip file name should be "(plugin_name).zip".  
- PluginDemoTrigger.zip
    - config.json
    - Plugin.php


### Sample plugin
[Information order validate](https://github.com/exment-git/plugin-sample/tree/main/validation/PluginValidatorTest)  
- A sample that makes it an error when the display order of the information table is over 100.  
